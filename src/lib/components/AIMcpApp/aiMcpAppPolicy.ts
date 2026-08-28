import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import type {
	AIMcpAppHostConfig,
	AIMcpAppPermission,
	AIMcpAppPermissionPolicy,
	AIMcpAppToolPolicy
} from './aiMcpApp.props.js';
import type { AIMcpAppResourcePermissions } from './aiMcpProtocol.js';

const permissionNames = [
	'camera',
	'microphone',
	'geolocation',
	'clipboardWrite'
] as const satisfies readonly AIMcpAppPermission[];

export function approveAIMcpAppPermissions(
	requested: AIMcpAppResourcePermissions | undefined,
	policy: AIMcpAppPermissionPolicy | undefined
): AIMcpAppResourcePermissions | undefined {
	if (!requested) return undefined;
	const allowedPermissions = validatePermissionPolicy(policy);
	const approved: AIMcpAppResourcePermissions = {};
	for (const permission of permissionNames) {
		if (requested[permission] !== undefined && allowedPermissions.has(permission)) {
			approved[permission] = {};
		}
	}
	return Object.keys(approved).length > 0 ? approved : undefined;
}

export function validateAIMcpAppToolPolicy(host: AIMcpAppHostConfig): readonly string[] {
	const allowedTools = validateToolPolicy(host.appToolPolicy);
	if (allowedTools.length === 0 && host.onAppToolCall) {
		throw new Error('MCP App onAppToolCall requires a non-empty appToolPolicy allowlist.');
	}
	if (allowedTools.length > 0 && !host.onAppToolCall) {
		throw new Error('MCP App appToolPolicy requires an onAppToolCall handler.');
	}
	if (allowedTools.length > 0 && !host.client.getServerCapabilities()?.tools) {
		throw new Error('MCP App appToolPolicy requires an MCP server with tool capabilities.');
	}
	return allowedTools;
}

export async function listAuthorizedAIMcpAppTools(
	client: Client,
	allowedToolNames: readonly string[],
	signal: AbortSignal
): Promise<Tool[]> {
	const allowedTools = new Set(allowedToolNames);
	const tools: Tool[] = [];
	const seenCursors = new Set<string>();
	let cursor: string | undefined;
	do {
		const response = await client.listTools(cursor ? { cursor } : undefined, { signal });
		for (const tool of response.tools) {
			if (allowedTools.has(tool.name) && isAIMcpAppVisibleTool(tool)) tools.push(tool);
		}
		cursor = response.nextCursor;
		if (cursor && seenCursors.has(cursor)) {
			throw new Error('MCP App tools/list returned a repeated pagination cursor.');
		}
		if (cursor) seenCursors.add(cursor);
	} while (cursor);
	return tools;
}

function validatePermissionPolicy(
	policy: AIMcpAppPermissionPolicy | undefined
): Set<AIMcpAppPermission> {
	const allowedPermissions = new Set<AIMcpAppPermission>();
	for (const permission of policy?.allowedPermissions ?? []) {
		if (!permissionNames.includes(permission)) {
			throw new Error(`Unsupported MCP App permission policy value "${String(permission)}".`);
		}
		allowedPermissions.add(permission);
	}
	return allowedPermissions;
}

function validateToolPolicy(policy: AIMcpAppToolPolicy | undefined): string[] {
	const allowedTools: string[] = [];
	const seenNames = new Set<string>();
	for (const name of policy?.allowedTools ?? []) {
		if (typeof name !== 'string' || !name.trim() || name !== name.trim()) {
			throw new Error('MCP App tool policy names must be non-empty trimmed strings.');
		}
		if (seenNames.has(name)) throw new Error(`Duplicate MCP App tool policy name "${name}".`);
		seenNames.add(name);
		allowedTools.push(name);
	}
	return allowedTools;
}

function isAIMcpAppVisibleTool(tool: Tool): boolean {
	const ui = isRecord(tool._meta?.ui) ? tool._meta.ui : undefined;
	const visibility = ui?.visibility;
	if (visibility === undefined) return true;
	if (
		!Array.isArray(visibility) ||
		visibility.some((scope) => scope !== 'model' && scope !== 'app')
	) {
		throw new Error(`MCP tool "${tool.name}" has invalid ui.visibility metadata.`);
	}
	return visibility.includes('app');
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
