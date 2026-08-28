import type { AIMcpAppHostConfig, AIMcpToolCall } from './aiMcpApp.props.js';

export function createAIMcpToolSessionKey(tool: AIMcpToolCall): string {
	const meta = tool._meta;
	const ui = isRecord(meta?.ui) ? meta.ui : undefined;
	return JSON.stringify([
		identityValue(tool.id),
		identityValue(tool.name),
		identityValue(ui?.resourceUri),
		identityValue(meta?.['ui/resourceUri']),
		identityValue(meta?.['openai/outputTemplate'])
	]);
}

export function createAIMcpHostSessionKey(host: AIMcpAppHostConfig): string {
	return JSON.stringify([
		JSON.stringify(host.hostInfo),
		identityValue(host.sandboxUrl),
		policyValues(host.permissionPolicy?.allowedPermissions),
		policyValues(host.appToolPolicy?.allowedTools),
		modalityValues(host.messageModalities),
		modalityValues(host.modelContextModalities),
		host.onMessage ? 'message' : '',
		host.onModelContext ? 'context' : '',
		host.onAppToolCall ? 'tool' : '',
		host.onOpenLink ? 'link' : '',
		host.onDownloadFile ? 'download' : '',
		host.onLog ? 'log' : '',
		host.onDisplayMode ? 'display' : ''
	]);
}

function modalityValues(value: AIMcpAppHostConfig['messageModalities']): string {
	return JSON.stringify(
		['text', 'image', 'audio', 'resource', 'resourceLink', 'structuredContent'].filter(
			(modality) => value?.[modality as keyof typeof value] !== undefined
		)
	);
}

function policyValues(values: readonly unknown[] | undefined): string {
	return JSON.stringify([...(values ?? [])].map(String).sort());
}

function identityValue(value: unknown): string {
	if (value === undefined) return '';
	return `${typeof value}:${String(value)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
