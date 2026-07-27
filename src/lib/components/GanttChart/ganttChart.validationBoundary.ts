import {
	FlatHierarchyError,
	buildFlatHierarchy,
	type FlatHierarchy
} from '$lib/scheduling/flatHierarchy.js';
import { assertScheduleInstant } from '$lib/scheduling/scheduleRange.js';
import { GanttChartError, type GanttChartErrorCode } from './ganttChart.error.js';

export function assertGanttCollection(
	value: unknown,
	name: string
): asserts value is readonly unknown[] {
	if (Array.isArray(value)) return;
	throw new GanttChartError('invalid-prop', `${name} must be an array.`, { prop: name });
}

export function assertGanttRecord(
	value: unknown,
	message: string,
	code: GanttChartErrorCode
): asserts value is Record<PropertyKey, unknown> {
	if (value && typeof value === 'object') return;
	throw new GanttChartError(code, message);
}

export function assertGanttIdentifier(value: unknown, kind: string): asserts value is string {
	if (typeof value === 'string' && value.length > 0) return;
	throw new GanttChartError('invalid-prop', `Every ${kind} needs a non-empty id.`, { kind });
}

export function assertGanttInstant(value: Date, name: string, code: GanttChartErrorCode): void {
	try {
		assertScheduleInstant(value, name);
	} catch (error) {
		throw new GanttChartError(code, `${name} must be a valid Date instant.`, {
			cause: error instanceof Error ? error.message : String(error)
		});
	}
}

export function parseGanttClock(value: string, allowEnd: boolean): number {
	if (typeof value !== 'string') return Number.NaN;
	const match = /^(\d{2}):(\d{2})$/.exec(value);
	if (!match) return Number.NaN;
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	if (minutes < 0 || minutes > 59 || hours < 0 || hours > (allowEnd ? 24 : 23)) {
		return Number.NaN;
	}
	if (hours === 24 && minutes !== 0) return Number.NaN;
	return hours * 60 + minutes;
}

export function buildGanttHierarchy<TEntry extends { id: string; parentId?: string }>(
	entries: readonly TEntry[],
	kind: 'task' | 'resource'
): FlatHierarchy {
	try {
		return buildFlatHierarchy(entries);
	} catch (error) {
		if (!(error instanceof FlatHierarchyError)) throw error;
		const code =
			kind === 'task'
				? error.code === 'cycle'
					? 'task-hierarchy-cycle'
					: 'missing-task-parent'
				: error.code === 'cycle'
					? 'resource-hierarchy-cycle'
					: 'missing-resource-parent';
		throw new GanttChartError(
			code,
			`${kind} hierarchy is invalid: ${error.message}`,
			error.details
		);
	}
}
