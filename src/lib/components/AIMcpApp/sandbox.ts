import { aiMcpResourceCspSchema } from './aiMcpProtocol.js';
import type { AIMcpAppResourceCsp } from './aiMcpProtocol.js';

export type CreateAIMcpSandboxResponseOptions = {
	allowedHostOrigins: readonly string[];
};

export function createAIMcpSandboxResponse(
	request: Request,
	{ allowedHostOrigins }: CreateAIMcpSandboxResponseOptions
): Response {
	const normalizedOrigins = normalizeAllowedOrigins(allowedHostOrigins);
	const referrer = request.headers.get('referer');
	if (!referrer) return textResponse('Missing sandbox referrer.', 403);
	let hostOrigin: string;
	try {
		hostOrigin = getOrigin(referrer, 'sandbox referrer');
	} catch (error) {
		return textResponse(error instanceof Error ? error.message : 'Invalid sandbox referrer.', 403);
	}
	if (!normalizedOrigins.includes(hostOrigin)) {
		return textResponse('Sandbox referrer origin is not allowed.', 403);
	}
	if (hostOrigin === new URL(request.url).origin) {
		return textResponse('Sandbox and host origins must be different.', 403);
	}
	const destination = request.headers.get('sec-fetch-dest');
	if (destination !== 'iframe') {
		return textResponse('Direct sandbox navigation is not allowed.', 403);
	}

	let csp: AIMcpAppResourceCsp | undefined;
	try {
		csp = parseCsp(new URL(request.url).searchParams.get('csp'));
	} catch (error) {
		return textResponse(error instanceof Error ? error.message : 'Invalid sandbox CSP.', 400);
	}
	const contentSecurityPolicy = buildSandboxCsp(csp, [hostOrigin]);
	return new Response(createSandboxHtml(hostOrigin), {
		status: 200,
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'content-security-policy': contentSecurityPolicy,
			'cache-control': 'no-store, max-age=0',
			pragma: 'no-cache',
			'x-content-type-options': 'nosniff',
			'cross-origin-resource-policy': 'cross-origin',
			'referrer-policy': 'no-referrer'
		}
	});
}

function normalizeAllowedOrigins(origins: readonly string[]): string[] {
	if (origins.length === 0) throw new Error('allowedHostOrigins must contain at least one origin.');
	return origins.map((origin) => {
		assertSingleCspToken(origin);
		const parsed = new URL(origin);
		if (!['http:', 'https:'].includes(parsed.protocol)) {
			throw new Error(`Allowed host origin must use http or https: "${origin}".`);
		}
		if (parsed.origin !== origin.replace(/\/$/, '')) {
			throw new Error(`Allowed host value must be an origin without a path: "${origin}".`);
		}
		return parsed.origin;
	});
}

function getOrigin(value: string, label: string): string {
	try {
		return new URL(value).origin;
	} catch {
		throw new Error(`Invalid ${label}.`);
	}
}

function parseCsp(serialized: string | null): AIMcpAppResourceCsp | undefined {
	if (!serialized) return undefined;
	if (serialized.length > 16_384) throw new Error('Sandbox CSP metadata is too large.');
	let value: unknown;
	try {
		value = JSON.parse(serialized);
	} catch {
		throw new Error('Sandbox CSP metadata is not valid JSON.');
	}
	const parsed = aiMcpResourceCspSchema.safeParse(value);
	if (!parsed.success) throw new Error(`Invalid sandbox CSP metadata: ${parsed.error.message}`);
	return {
		...parsed.data,
		connectDomains: normalizeCspOrigins(parsed.data.connectDomains, [
			'http:',
			'https:',
			'ws:',
			'wss:'
		]),
		resourceDomains: normalizeCspOrigins(parsed.data.resourceDomains, ['http:', 'https:']),
		frameDomains: normalizeCspOrigins(parsed.data.frameDomains, ['http:', 'https:']),
		baseUriDomains: normalizeCspOrigins(parsed.data.baseUriDomains, ['http:', 'https:'])
	};
}

function normalizeCspOrigins(
	origins: readonly string[] | undefined,
	allowedProtocols: readonly string[]
): string[] | undefined {
	return origins?.map((origin) => normalizeCspOrigin(origin, allowedProtocols));
}

function normalizeCspOrigin(origin: string, allowedProtocols: readonly string[]): string {
	assertSingleCspToken(origin);
	const wildcard = /^[a-z][a-z\d+.-]*:\/\/\*\./i.test(origin);
	const candidate = wildcard ? origin.replace('://*.', '://wildcard.') : origin;
	let parsed: URL;
	try {
		parsed = new URL(candidate);
	} catch {
		throw new Error(`Invalid CSP origin "${origin}".`);
	}
	if (!allowedProtocols.includes(parsed.protocol)) {
		throw new Error(`Unsupported CSP origin protocol in "${origin}".`);
	}
	if (
		parsed.username ||
		parsed.password ||
		parsed.pathname !== '/' ||
		parsed.search ||
		parsed.hash
	) {
		throw new Error(`CSP value must be a single origin: "${origin}".`);
	}
	if (!wildcard) return parsed.origin;
	if (!parsed.hostname.startsWith('wildcard.') || parsed.hostname === 'wildcard.') {
		throw new Error(`Invalid CSP wildcard origin "${origin}".`);
	}
	const hostname = parsed.hostname.slice('wildcard.'.length);
	return `${parsed.protocol}//*.${hostname}${parsed.port ? `:${parsed.port}` : ''}`;
}

function assertSingleCspToken(value: string): void {
	const hasControlCharacter = [...value].some((character) => {
		const codePoint = character.codePointAt(0) ?? 0;
		return codePoint <= 0x1f || codePoint === 0x7f;
	});
	if (hasControlCharacter || /[\s;'"]/u.test(value)) {
		throw new Error(`CSP value must be a single origin: "${value}".`);
	}
}

function buildSandboxCsp(csp: AIMcpAppResourceCsp | undefined, hostOrigins: string[]): string {
	const resources = (csp?.resourceDomains ?? []).join(' ');
	const connections = sourceList(csp?.connectDomains);
	const frames = sourceList(csp?.frameDomains);
	const baseUris = csp?.baseUriDomains?.length ? csp.baseUriDomains.join(' ') : "'self'";
	return [
		"default-src 'none'",
		`script-src 'self' 'unsafe-inline' ${resources}`.trim(),
		`style-src 'self' 'unsafe-inline' ${resources}`.trim(),
		`img-src 'self' data: blob: ${resources}`.trim(),
		`font-src 'self' data: blob: ${resources}`.trim(),
		`media-src 'self' data: blob: ${resources}`.trim(),
		"worker-src 'none'",
		`connect-src ${connections}`,
		`frame-src ${frames}`,
		"form-action 'none'",
		"object-src 'none'",
		`base-uri ${baseUris}`,
		`frame-ancestors ${hostOrigins.join(' ')}`
	].join('; ');
}

function sourceList(domains: readonly string[] | undefined): string {
	return domains?.length ? domains.join(' ') : "'none'";
}

function createSandboxHtml(hostOrigin: string): string {
	const expectedHostOrigin = JSON.stringify(hostOrigin);
	return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="color-scheme" content="light dark"><title>MCP App Sandbox</title><style>html,body{margin:0;width:100%;height:100%;background:transparent}*{box-sizing:border-box}body{display:flex}iframe{width:100%;height:100%;flex:1;border:0;background:transparent;color-scheme:inherit}</style></head><body><script>
(() => {
  'use strict';
  if (window.self === window.top) throw new Error('MCP App sandbox requires iframe embedding.');
  const expectedHostOrigin = ${expectedHostOrigin};
  const ownOrigin = window.location.origin;
  const reservedPrefix = 'ui/notifications/sandbox-';
  const resourceReadyMethod = 'ui/notifications/sandbox-resource-ready';
  const inner = document.createElement('iframe');
  inner.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
  document.body.appendChild(inner);
  const sandboxTokens = new Set(['allow-scripts', 'allow-same-origin', 'allow-forms']);
	  function applySandbox(value) {
	    if (typeof value !== 'string') return;
	    const tokens = value.split(/\\s+/).filter(Boolean);
	    if (tokens.some((token) => !sandboxTokens.has(token))) throw new Error('Unsupported inner sandbox permission.');
	    if (!tokens.includes('allow-scripts')) throw new Error('Inner sandbox override must include allow-scripts.');
	    if (!tokens.includes('allow-same-origin')) throw new Error('Inner sandbox override must include allow-same-origin for origin-filtered messaging.');
	    inner.setAttribute('sandbox', tokens.join(' '));
	  }
  function applyPermissions(permissions) {
    if (!permissions || typeof permissions !== 'object') return;
    const features = [];
    if (permissions.camera) features.push('camera');
    if (permissions.microphone) features.push('microphone');
    if (permissions.geolocation) features.push('geolocation');
    if (permissions.clipboardWrite) features.push('clipboard-write');
	    if (features.length) inner.setAttribute('allow', features.join('; '));
	    else inner.removeAttribute('allow');
	  }
	window.addEventListener('message', (event) => {
	  const method = event.data && event.data.method;
	  if (event.source === window.parent) {
      if (event.origin !== expectedHostOrigin) return;
      if (method === resourceReadyMethod) {
        const params = event.data.params || {};
        applySandbox(params.sandbox);
        applyPermissions(params.permissions);
        if (typeof params.html !== 'string') throw new Error('MCP App resource HTML is missing.');
        const doc = inner.contentDocument || (inner.contentWindow && inner.contentWindow.document);
        if (!doc) throw new Error('MCP App inner document is unavailable.');
        doc.open(); doc.write(params.html); doc.close();
        return;
      }
	  if (typeof method === 'string' && method.startsWith(reservedPrefix)) return;
		  if (inner.contentWindow) inner.contentWindow.postMessage(event.data, ownOrigin);
		return;
	  }
	  if (event.source !== inner.contentWindow || event.origin !== ownOrigin) return;
    if (typeof method === 'string' && method.startsWith(reservedPrefix)) return;
    window.parent.postMessage(event.data, expectedHostOrigin);
  });
  window.parent.postMessage({jsonrpc:'2.0',method:'ui/notifications/sandbox-proxy-ready',params:{}}, expectedHostOrigin);
})();
</script></body></html>`;
}

function textResponse(message: string, status: number): Response {
	return new Response(message, {
		status,
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'no-store',
			'x-content-type-options': 'nosniff'
		}
	});
}
