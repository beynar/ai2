import {
	RESOURCE_MIME_TYPE,
	getToolUiResourceUri
} from '@modelcontextprotocol/ext-apps/app-bridge';
import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import {
	CallToolResultSchema,
	type CallToolResult,
	type Tool
} from '@modelcontextprotocol/sdk/types.js';
import type { AIToolCall } from '../AITool/aiTool.props.js';
import type { AIMcpAppResource, AIMcpToolCall } from './aiMcpApp.props.js';
import { aiMcpResourceCspSchema, aiMcpResourcePermissionsSchema } from './aiMcpProtocol.js';

type UnknownRecord = Record<string, unknown>;

export function hasAIMcpAppResource(tool: AIToolCall): boolean {
	const meta = tool._meta;
	if (!meta) return false;
	const ui = isRecord(meta.ui) ? meta.ui : undefined;
	return (
		ui?.resourceUri !== undefined ||
		meta['ui/resourceUri'] !== undefined ||
		meta['openai/outputTemplate'] !== undefined
	);
}

export function isAIMcpToolCall(tool: AIToolCall): tool is AIMcpToolCall {
	if (!hasAIMcpAppResource(tool) || typeof tool.name !== 'string' || !tool.name.trim())
		return false;
	if (tool.input !== undefined && !isRecord(tool.input)) return false;
	return tool.result === undefined || CallToolResultSchema.safeParse(tool.result).success;
}

export function getAIMcpAppResourceUri(tool: AIToolCall): string | undefined {
	const standardUri = getToolUiResourceUri({ _meta: tool._meta } satisfies Partial<Tool>);
	if (standardUri) return assertUiUri(standardUri);
	const compatibilityUri = tool._meta?.['openai/outputTemplate'];
	if (compatibilityUri === undefined) return undefined;
	if (typeof compatibilityUri !== 'string') {
		throw new Error('MCP App openai/outputTemplate metadata must be a string.');
	}
	return assertUiUri(compatibilityUri);
}

export async function resolveAIMcpAppResource(
	client: Client,
	uri: string,
	signal?: AbortSignal
): Promise<AIMcpAppResource> {
	assertUiUri(uri);
	const response = await client.readResource({ uri }, { signal });
	if (response.contents.length !== 1) {
		throw new Error(`MCP App resource "${uri}" must contain exactly one content item.`);
	}
	const content = response.contents[0];
	if (!content) throw new Error(`MCP App resource "${uri}" is empty.`);
	if (content.uri !== uri) {
		throw new Error(
			`MCP App resource response returned "${content.uri}" for requested resource "${uri}".`
		);
	}
	if (content.mimeType !== RESOURCE_MIME_TYPE) {
		throw new Error(
			`MCP App resource "${uri}" has MIME type "${content.mimeType ?? 'missing'}"; expected "${RESOURCE_MIME_TYPE}".`
		);
	}
	const html = decodeResourceHtml(content);
	const contentUi = readUiMeta(content, `MCP App resource "${uri}" content`);
	const listingUi = shouldReadListingMetadata(contentUi)
		? await readListingUiMeta(client, uri, signal)
		: undefined;
	const ui = mergeUiMeta(listingUi, contentUi);
	return validateAIMcpAppResource(uri, {
		uri,
		html,
		csp: parseCsp(ui?.csp),
		permissions: parsePermissions(ui?.permissions),
		domain: parseDomain(ui?.domain),
		prefersBorder: parsePrefersBorder(ui?.prefersBorder)
	});
}

export function validateAIMcpAppResource(uri: string, value: unknown): AIMcpAppResource {
	if (!isRecord(value))
		throw new Error(`MCP App resolver returned an invalid resource for "${uri}".`);
	if (value.uri !== uri) {
		throw new Error(
			`MCP App resolver returned "${String(value.uri)}" for requested resource "${uri}".`
		);
	}
	if (typeof value.html !== 'string' || !value.html.trim()) {
		throw new Error(`MCP App resource "${uri}" contains empty HTML.`);
	}
	return {
		uri,
		html: value.html,
		csp: parseCsp(value.csp),
		permissions: parsePermissions(value.permissions),
		domain: parseDomain(value.domain),
		prefersBorder: parsePrefersBorder(value.prefersBorder)
	};
}

export function createAIMcpCallToolResult(tool: AIMcpToolCall): CallToolResult | undefined {
	if (tool.result !== undefined) {
		const parsedResult = CallToolResultSchema.safeParse(tool.result);
		if (!parsedResult.success) {
			throw new Error(`Invalid MCP App tool result: ${parsedResult.error.message}`);
		}
		return parsedResult.data;
	}
	if (
		tool.status === 'pending' ||
		tool.status === 'loading' ||
		tool.status === 'running' ||
		tool.status === 'streaming'
	) {
		return undefined;
	}
	const hasResult =
		tool.output !== undefined ||
		tool.structuredContent !== undefined ||
		tool.error !== undefined ||
		tool.status === 'success' ||
		tool.status === 'error';
	if (!hasResult) return undefined;
	const structuredContent = isRecord(tool.structuredContent) ? tool.structuredContent : undefined;
	const output = tool.error ?? tool.output;
	return {
		content: output === undefined ? [] : [{ type: 'text', text: stringifyToolOutput(output) }],
		structuredContent,
		isError: tool.status === 'error' || tool.error !== undefined,
		_meta: tool._meta
	};
}

function assertUiUri(uri: string): string {
	if (!uri.startsWith('ui://')) {
		throw new Error(`MCP App resource URI must use the ui:// scheme; received "${uri}".`);
	}
	return uri;
}

function decodeResourceHtml(content: { text?: string; blob?: string }): string {
	if (typeof content.text === 'string') return content.text;
	if (typeof content.blob !== 'string') {
		throw new Error('MCP App resource content must provide text or base64 blob HTML.');
	}
	const binary = atob(content.blob);
	const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
	return new TextDecoder().decode(bytes);
}

function readUiMeta(value: unknown, label: string): UnknownRecord | undefined {
	if (!isRecord(value)) return undefined;
	if (value._meta === undefined) return undefined;
	if (!isRecord(value._meta)) throw new Error(`${label} metadata must be an object.`);
	if (value._meta.ui === undefined) return undefined;
	if (!isRecord(value._meta.ui)) throw new Error(`${label} _meta.ui must be an object.`);
	return value._meta.ui;
}

async function readListingUiMeta(
	client: Client,
	uri: string,
	signal: AbortSignal | undefined
): Promise<UnknownRecord | undefined> {
	if (!client.getServerCapabilities()?.resources) return undefined;
	const seenCursors = new Set<string>();
	let cursor: string | undefined;
	do {
		const listing = await client.listResources(cursor ? { cursor } : undefined, { signal });
		const resource = listing.resources.find((candidate) => candidate.uri === uri);
		if (resource) return readUiMeta(resource, `MCP App resource "${uri}" listing`);
		cursor = listing.nextCursor;
		if (cursor && seenCursors.has(cursor)) {
			throw new Error('MCP App resources/list returned a repeated pagination cursor.');
		}
		if (cursor) seenCursors.add(cursor);
	} while (cursor);
	return undefined;
}

function shouldReadListingMetadata(contentUi: UnknownRecord | undefined): boolean {
	if (!contentUi) return true;
	return ['csp', 'permissions', 'domain', 'prefersBorder'].some(
		(property) => contentUi[property] === undefined
	);
}

function mergeUiMeta(
	listingUi: UnknownRecord | undefined,
	contentUi: UnknownRecord | undefined
): UnknownRecord | undefined {
	if (!listingUi && !contentUi) return undefined;
	const merged = { ...listingUi };
	for (const [property, value] of Object.entries(contentUi ?? {})) {
		if (value !== undefined) merged[property] = value;
	}
	return merged;
}

function parseCsp(value: unknown) {
	if (value === undefined) return undefined;
	const parsed = aiMcpResourceCspSchema.safeParse(value);
	if (!parsed.success) throw new Error(`Invalid MCP App CSP metadata: ${parsed.error.message}`);
	return parsed.data;
}

function parsePermissions(value: unknown) {
	if (value === undefined) return undefined;
	const parsed = aiMcpResourcePermissionsSchema.safeParse(value);
	if (!parsed.success) {
		throw new Error(`Invalid MCP App permission metadata: ${parsed.error.message}`);
	}
	return parsed.data;
}

function parseDomain(value: unknown): string | undefined {
	if (value === undefined) return undefined;
	if (typeof value !== 'string' || !value.trim() || value !== value.trim()) {
		throw new Error('Invalid MCP App domain metadata: expected a non-empty trimmed string.');
	}
	return value;
}

function parsePrefersBorder(value: unknown): boolean | undefined {
	if (value === undefined) return undefined;
	if (typeof value !== 'boolean') {
		throw new Error('Invalid MCP App prefersBorder metadata: expected a boolean.');
	}
	return value;
}

function stringifyToolOutput(output: unknown): string {
	if (typeof output === 'string') return output;
	const serialized = JSON.stringify(output);
	if (serialized === undefined) throw new Error('MCP App tool output is not serializable.');
	return serialized;
}

function isRecord(value: unknown): value is UnknownRecord {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
