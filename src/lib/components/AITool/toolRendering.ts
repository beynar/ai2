import type { Colors } from '$lib/types/theme.js';
import type { AIToolCall, AIToolStatus } from './aiTool.props.js';

export type AIToolStatusTone = 'active' | 'success' | 'error' | 'cancelled' | 'default';

const activeStatuses = new Set<AIToolStatus>(['pending', 'loading', 'running', 'streaming']);

export function resolveAIToolStatus(tool: AIToolCall): AIToolStatus {
	if (tool.status) return tool.status;
	if (tool.error !== undefined || isErrorResult(tool.result)) return 'error';
	if (
		tool.output !== undefined ||
		tool.structuredContent !== undefined ||
		tool.result !== undefined
	) {
		return 'success';
	}
	return 'pending';
}

export function resolveAIToolGroupStatus(tools: readonly AIToolCall[]): AIToolStatus {
	const statuses = tools.map(resolveAIToolStatus);
	return (
		statuses.find((status) => status === 'error') ??
		statuses.find(isActiveAIToolStatus) ??
		statuses.find((status) => status === 'cancelled') ??
		(statuses.every((status) => status === 'success') ? 'success' : statuses[0]) ??
		'pending'
	);
}

export function isActiveAIToolStatus(status: AIToolStatus): boolean {
	return activeStatuses.has(status);
}

export function formatAIToolStatus(status: AIToolStatus): string {
	return status
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

export function getAIToolStatusColor(status: AIToolStatus): Colors {
	if (status === 'success') return 'success';
	if (status === 'error') return 'danger';
	if (status === 'cancelled') return 'neutral';
	return 'info';
}

export function getAIToolStatusTone(status: AIToolStatus): AIToolStatusTone {
	if (status === 'success') return 'success';
	if (status === 'error') return 'error';
	if (status === 'cancelled') return 'cancelled';
	if (isActiveAIToolStatus(status)) return 'active';
	return 'default';
}

export function hasRenderableAIToolValue(value: unknown): boolean {
	return value !== undefined && value !== '';
}

export function getAIToolOutputValue(tool: AIToolCall): unknown {
	if (tool.output !== undefined) return tool.output;
	if (tool.structuredContent !== undefined) return tool.structuredContent;
	return tool.result;
}

export function getAIToolErrorValue(tool: AIToolCall): unknown {
	if (tool.error !== undefined) return tool.error;
	return isErrorResult(tool.result) ? tool.result : undefined;
}

export function getAIToolCallValue(tool: AIToolCall, index: number): string {
	return `${getAIToolValue(tool, index)}:${index}`;
}

export function getAIToolGroupValue(tools: readonly AIToolCall[]): string {
	const firstTool = tools[0];
	return firstTool ? getAIToolValue(firstTool, 0) : 'tools';
}

function getAIToolValue(tool: AIToolCall, index: number): string {
	return String(tool.id ?? index);
}

function isErrorResult(result: unknown): boolean {
	return Boolean(
		result &&
		typeof result === 'object' &&
		'isError' in result &&
		(result as { isError?: unknown }).isError === true
	);
}
