import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const MAX_HTML_BYTES = 512 * 1024;

type LinkMetadata = {
	url: string;
	title?: string;
	description?: string;
	siteName?: string;
	image?: string;
	favicon?: string;
};

class LinkMetadataError extends Error {
	constructor(
		readonly status: number,
		message: string
	) {
		super(message);
	}
}

export const GET: RequestHandler = async ({ url, fetch: requestFetch }) => {
	try {
		const targetUrl = getTargetUrl(url.searchParams.get('url'));
		let response: Response;
		try {
			response = await requestFetch(targetUrl, {
				redirect: 'follow',
				headers: {
					accept: 'text/html, application/xhtml+xml;q=0.9, */*;q=0.1'
				}
			});
		} catch (value) {
			throw new LinkMetadataError(502, getErrorMessage(value, 'Unable to fetch link metadata.'));
		}

		validateFinalUrl(response.url || targetUrl.toString());
		validateHtmlResponse(response);
		const html = await readHtmlPreview(response);
		const metadata = extractLinkMetadata(html, response.url || targetUrl.toString());

		return json(metadata, {
			headers: {
				'cache-control': 'public, max-age=3600'
			}
		});
	} catch (value) {
		if (value instanceof LinkMetadataError) {
			return json({ message: value.message }, { status: value.status });
		}
		throw value;
	}
};

function getTargetUrl(rawUrl: string | null) {
	if (!rawUrl) {
		throw new LinkMetadataError(400, 'Missing url query parameter.');
	}

	let targetUrl: URL;
	try {
		targetUrl = new URL(rawUrl);
	} catch {
		throw new LinkMetadataError(400, 'Link preview URL must be absolute.');
	}

	validateAllowedUrl(targetUrl);
	return targetUrl;
}

function validateFinalUrl(rawUrl: string) {
	let finalUrl: URL;
	try {
		finalUrl = new URL(rawUrl);
	} catch {
		throw new LinkMetadataError(502, 'Link preview response URL is invalid.');
	}
	validateAllowedUrl(finalUrl);
}

function validateAllowedUrl(targetUrl: URL) {
	if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
		throw new LinkMetadataError(400, 'Link preview URL must use http or https.');
	}
	if (isBlockedHostname(targetUrl.hostname)) {
		throw new LinkMetadataError(400, 'Link preview URL host is not allowed.');
	}
}

function isBlockedHostname(hostname: string) {
	const normalizedHostname = hostname
		.toLowerCase()
		.replace(/^\[|\]$/g, '')
		.replace(/\.$/, '');
	if (
		normalizedHostname === 'localhost' ||
		normalizedHostname.endsWith('.localhost') ||
		normalizedHostname === '::1' ||
		normalizedHostname === '0:0:0:0:0:0:0:1'
	) {
		return true;
	}

	const octets = normalizedHostname.split('.').map(Number);
	const isIpv4 =
		octets.length === 4 &&
		octets.every((octet) => Number.isInteger(octet) && octet >= 0 && octet <= 255);
	if (!isIpv4) return false;

	const [first, second] = octets;
	return (
		first === 0 ||
		first === 10 ||
		first === 127 ||
		(first === 169 && second === 254) ||
		(first === 172 && second >= 16 && second <= 31) ||
		(first === 192 && second === 168)
	);
}

function validateHtmlResponse(response: Response) {
	if (!response.ok) {
		throw new LinkMetadataError(
			response.status >= 500 ? 502 : 422,
			`Link preview request failed (${response.status}).`
		);
	}

	const contentType = response.headers.get('content-type') ?? '';
	if (
		contentType &&
		!contentType.includes('text/html') &&
		!contentType.includes('application/xhtml+xml')
	) {
		throw new LinkMetadataError(415, 'Link preview URL did not return HTML.');
	}
}

async function readHtmlPreview(response: Response) {
	const reader = response.body?.getReader();
	if (!reader) return response.text();

	const chunks: Uint8Array[] = [];
	let receivedBytes = 0;
	let canceledReader = false;

	while (receivedBytes < MAX_HTML_BYTES) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;

		const remainingBytes = MAX_HTML_BYTES - receivedBytes;
		const chunk = value.byteLength > remainingBytes ? value.slice(0, remainingBytes) : value;
		chunks.push(chunk);
		receivedBytes += chunk.byteLength;

		if (value.byteLength > remainingBytes) {
			await reader.cancel();
			canceledReader = true;
			break;
		}
	}
	if (!canceledReader && receivedBytes >= MAX_HTML_BYTES) {
		await reader.cancel();
	}

	const bytes = new Uint8Array(receivedBytes);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return new TextDecoder().decode(bytes);
}

function extractLinkMetadata(html: string, pageUrl: string): LinkMetadata {
	const title =
		getMetaContent(html, ['og:title', 'twitter:title']) ?? getTitleContent(html) ?? undefined;
	const description =
		getMetaContent(html, ['og:description', 'twitter:description', 'description']) ?? undefined;
	const siteName = getMetaContent(html, ['og:site_name', 'application-name']) ?? undefined;
	const image = resolveUrl(
		getMetaContent(html, ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src']),
		pageUrl
	);
	const favicon = resolveUrl(getFaviconHref(html), pageUrl);

	return {
		url: pageUrl,
		...(title ? { title } : {}),
		...(description ? { description } : {}),
		...(siteName ? { siteName } : {}),
		...(image ? { image } : {}),
		...(favicon ? { favicon } : {})
	};
}

function getMetaContent(html: string, keys: string[]) {
	const normalizedKeys = new Set(keys.map((key) => key.toLowerCase()));
	const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

	for (const tag of metaTags) {
		const name = getAttribute(tag, 'name')?.toLowerCase();
		const property = getAttribute(tag, 'property')?.toLowerCase();
		const itemprop = getAttribute(tag, 'itemprop')?.toLowerCase();
		if (!name && !property && !itemprop) continue;
		if (
			!normalizedKeys.has(name ?? '') &&
			!normalizedKeys.has(property ?? '') &&
			!normalizedKeys.has(itemprop ?? '')
		) {
			continue;
		}
		const content = normalizeText(getAttribute(tag, 'content') ?? '');
		if (content) return content;
	}

	return null;
}

function getTitleContent(html: string) {
	const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
	return titleMatch ? normalizeText(titleMatch[1]) : null;
}

function getFaviconHref(html: string) {
	const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
	for (const tag of linkTags) {
		const rel = getAttribute(tag, 'rel')?.toLowerCase();
		if (!rel) continue;
		const tokens = rel.split(/\s+/);
		if (!tokens.includes('icon') && !tokens.includes('apple-touch-icon')) continue;
		const href = normalizeText(getAttribute(tag, 'href') ?? '');
		if (href) return href;
	}
	return null;
}

function getAttribute(tag: string, name: string) {
	const attributePattern = new RegExp(
		`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`,
		'i'
	);
	const match = tag.match(attributePattern);
	return match ? decodeHtml(match[1] ?? match[2] ?? match[3] ?? '') : null;
}

function normalizeText(value: string) {
	return decodeHtml(value).replace(/\s+/g, ' ').trim();
}

function decodeHtml(value: string) {
	const namedEntities: Record<string, string> = {
		amp: '&',
		lt: '<',
		gt: '>',
		quot: '"',
		apos: "'",
		nbsp: ' '
	};

	return value
		.replace(/&#(\d+);/g, (_, codePoint: string) => decodeCodePoint(codePoint, 10))
		.replace(/&#x([\da-f]+);/gi, (_, codePoint: string) => decodeCodePoint(codePoint, 16))
		.replace(/&([a-z]+);/gi, (entity, name: string) => namedEntities[name] ?? entity);
}

function decodeCodePoint(value: string, radix: number) {
	const codePoint = Number.parseInt(value, radix);
	if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return '';
	return String.fromCodePoint(codePoint);
}

function resolveUrl(rawUrl: string | null, pageUrl: string) {
	if (!rawUrl) return undefined;
	try {
		return new URL(rawUrl, pageUrl).toString();
	} catch {
		return undefined;
	}
}

function getErrorMessage(value: unknown, fallback: string) {
	return value instanceof Error && value.message ? value.message : fallback;
}
