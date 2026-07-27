/* eslint-disable svelte/prefer-svelte-reactivity -- Dates, Sets, and ranges here are immutable schedule snapshots, not reactive collection owners. */
import { assertScheduleInstant, assertScheduleRange } from '$lib/scheduling/scheduleRange.js';
import { calculateGanttWorkload } from './ganttChart.workload.js';
import { GanttChartError } from './ganttChart.error.js';
import { resolveGanttSchedule, type ResolvedGanttSchedule } from './ganttChart.schedule.js';
import type {
	GanttAssignment,
	GanttCalendar,
	GanttChartApi,
	GanttDependency,
	GanttRange,
	GanttResolvedTaskNode,
	GanttResource,
	GanttScheduleAnalysis,
	GanttSelection,
	GanttTask,
	GanttWorkloadBucket,
	GanttZoomLevel
} from './ganttChart.types.js';

export const EMPTY_GANTT_SELECTION: GanttSelection = Object.freeze({
	kind: null,
	taskId: null,
	dependencyId: null,
	cell: null
});

export const DEFAULT_GANTT_ZOOM_LEVELS: readonly GanttZoomLevel[] = Object.freeze([
	'hour',
	'day',
	'week',
	'month',
	'quarter',
	'year'
]);

const BUILT_IN_ZOOM_LEVELS = new Set(DEFAULT_GANTT_ZOOM_LEVELS);
const EMPTY_RANGE_ANCHOR = new Date(0);
const DEFAULT_RANGE_SPAN_MS = 14 * 24 * 60 * 60 * 1000;

type GanttChartStateOptions<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = {
	tasks: GanttTask<TTaskFields>[];
	dependencies: GanttDependency<TDependencyFields>[];
	readonly resources: readonly GanttResource<TResourceFields>[];
	assignments: GanttAssignment<TAssignmentFields>[];
	readonly calendars: readonly GanttCalendar[];
	expandedTaskIds: string[];
	selection: GanttSelection;
	zoom: GanttZoomLevel;
	readonly timeZone: string;
	readonly projectCalendarId: string | undefined;
	readonly validRange: GanttRange | undefined;
	readonly initialScrollDate: Date | undefined;
	readonly zoomLevels: readonly GanttZoomLevel[];
	readonly customScaleIds: ReadonlySet<GanttZoomLevel>;
	readonly loading: boolean;
	readonly disabled: boolean;
	readonly onExpansionChange: ((expandedTaskIds: string[]) => void) | undefined;
	readonly onSelectionChange: ((selection: GanttSelection) => void) | undefined;
	readonly onZoomChange: ((zoom: GanttZoomLevel) => void) | undefined;
	readonly onVisibleRangeChange:
		| ((info: {
				range: GanttRange;
				projectRange: GanttRange | null;
				zoom: GanttZoomLevel;
				timeZone: string;
		  }) => void)
		| undefined;
};

type ScheduleCache<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = {
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	calendars: readonly GanttCalendar[];
	expandedTaskIds: readonly string[];
	timeZone: string;
	projectCalendarId: string | undefined;
	value: ResolvedGanttSchedule<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
};

export class GanttChartState<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> implements GanttChartApi<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	#options: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	#scheduleCache:
		ScheduleCache<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> | undefined;
	#visibleRange = $state<GanttRange | null>(null);

	constructor(
		options: GanttChartStateOptions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) {
		this.#options = options;
	}

	get schedule(): ResolvedGanttSchedule<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> {
		const options = this.#options;
		const cache = this.#scheduleCache;
		if (
			cache &&
			cache.tasks === options.tasks &&
			cache.dependencies === options.dependencies &&
			cache.resources === options.resources &&
			cache.assignments === options.assignments &&
			cache.calendars === options.calendars &&
			cache.expandedTaskIds === options.expandedTaskIds &&
			cache.timeZone === options.timeZone &&
			cache.projectCalendarId === options.projectCalendarId
		) {
			return cache.value;
		}
		const value = resolveGanttSchedule({
			tasks: options.tasks,
			dependencies: options.dependencies,
			resources: options.resources,
			assignments: options.assignments,
			calendars: options.calendars,
			expandedTaskIds: options.expandedTaskIds,
			timeZone: options.timeZone,
			projectCalendarId: options.projectCalendarId,
			autoSchedule: false
		});
		this.#scheduleCache = {
			tasks: options.tasks,
			dependencies: options.dependencies,
			resources: options.resources,
			assignments: options.assignments,
			calendars: options.calendars,
			expandedTaskIds: options.expandedTaskIds,
			timeZone: options.timeZone,
			projectCalendarId: options.projectCalendarId,
			value
		};
		return value;
	}

	get visibleRange(): GanttRange {
		if (this.#visibleRange) return cloneRange(this.#visibleRange);
		const validRange = this.#options.validRange;
		if (validRange) {
			assertRange(validRange, 'validRange');
			return cloneRange(validRange);
		}
		const projectRange = this.schedule.analysis.projectRange;
		if (projectRange) return cloneRange(projectRange);
		const anchor = this.#options.initialScrollDate ?? EMPTY_RANGE_ANCHOR;
		assertInstant(anchor, 'initialScrollDate');
		return {
			start: new Date(anchor.getTime() - DEFAULT_RANGE_SPAN_MS / 2),
			end: new Date(anchor.getTime() + DEFAULT_RANGE_SPAN_MS / 2)
		};
	}

	get enabledZoomLevels(): readonly GanttZoomLevel[] {
		const zoomLevels = this.#options.zoomLevels;
		if (
			!Array.isArray(zoomLevels) ||
			zoomLevels.length === 0 ||
			new Set(zoomLevels).size !== zoomLevels.length
		) {
			throw new GanttChartError(
				'invalid-zoom-level',
				'zoomLevels must be a non-empty ordered unique array.'
			);
		}
		for (const zoom of zoomLevels) {
			if (typeof zoom !== 'string' || zoom.length === 0) {
				throw new GanttChartError('invalid-zoom-level', 'Every zoom level needs a non-empty id.');
			}
			if (!BUILT_IN_ZOOM_LEVELS.has(zoom) && !this.#options.customScaleIds.has(zoom)) {
				throw new GanttChartError(
					'invalid-zoom-level',
					`Custom zoom level ${zoom} needs a matching scale definition.`,
					{ zoom }
				);
			}
		}
		if (!zoomLevels.includes(this.#options.zoom)) {
			throw new GanttChartError(
				'invalid-zoom-level',
				`zoom must be present in zoomLevels: ${this.#options.zoom}.`,
				{ zoom: this.#options.zoom }
			);
		}
		return zoomLevels;
	}

	fitProject(): boolean {
		this.#assertNavigationEnabled();
		const projectRange = this.schedule.analysis.projectRange;
		if (!projectRange) return false;
		this.setVisibleRange(projectRange);
		return true;
	}

	zoomIn(anchorDate?: Date): boolean {
		if (anchorDate) assertInstant(anchorDate, 'anchorDate');
		return this.#stepZoom(-1);
	}

	zoomOut(anchorDate?: Date): boolean {
		if (anchorDate) assertInstant(anchorDate, 'anchorDate');
		return this.#stepZoom(1);
	}

	setZoom(zoom: GanttZoomLevel, anchorDate?: Date): void {
		this.#assertNavigationEnabled();
		if (anchorDate) assertInstant(anchorDate, 'anchorDate');
		if (!this.enabledZoomLevels.includes(zoom)) {
			throw new GanttChartError('invalid-zoom-level', `Zoom level ${zoom} is not enabled.`, {
				zoom
			});
		}
		if (zoom === this.#options.zoom) return;
		this.#options.zoom = zoom;
		this.#options.onZoomChange?.(zoom);
	}

	scrollToDate(date: Date, options?: { align?: 'start' | 'center' | 'end' }): boolean {
		this.#assertNavigationEnabled();
		assertInstant(date, 'date');
		const range = this.visibleRange;
		const duration = range.end.getTime() - range.start.getTime();
		const align = options?.align ?? 'center';
		const start =
			align === 'start'
				? date.getTime()
				: align === 'end'
					? date.getTime() - duration
					: date.getTime() - duration / 2;
		this.setVisibleRange({ start: new Date(start), end: new Date(start + duration) });
		return true;
	}

	scrollToTask(taskId: string, options?: { align?: 'start' | 'center' | 'end' }): boolean {
		const task = this.getResolvedTask(taskId);
		if (!task?.resolvedStart || !task.resolvedEnd) return false;
		const align = options?.align ?? 'center';
		const date =
			align === 'start'
				? task.resolvedStart
				: align === 'end'
					? task.resolvedEnd
					: new Date((task.resolvedStart.getTime() + task.resolvedEnd.getTime()) / 2);
		return this.scrollToDate(date, { align });
	}

	getVisibleRange(): GanttRange {
		return this.visibleRange;
	}

	setVisibleRange(range: GanttRange): void {
		assertRange(range, 'visibleRange');
		const nextRange = this.#clipRange(range);
		const currentRange = this.visibleRange;
		if (
			currentRange.start.getTime() === nextRange.start.getTime() &&
			currentRange.end.getTime() === nextRange.end.getTime()
		) {
			return;
		}
		this.#visibleRange = cloneRange(nextRange);
		this.#options.onVisibleRangeChange?.({
			range: cloneRange(nextRange),
			projectRange: cloneNullableRange(this.schedule.analysis.projectRange),
			zoom: this.#options.zoom,
			timeZone: this.#options.timeZone
		});
	}

	getTask(taskId: string): GanttTask<TTaskFields> | null {
		return this.schedule.model.tasksById.get(taskId) ?? null;
	}

	getResolvedTask(taskId: string): GanttResolvedTaskNode<TTaskFields> | null {
		return this.schedule.resolvedTasks.find((task) => task.taskId === taskId) ?? null;
	}

	getVisibleTasks(): readonly GanttResolvedTaskNode<TTaskFields>[] {
		return this.schedule.visibleTasks;
	}

	getDependency(dependencyId: string): GanttDependency<TDependencyFields> | null {
		return this.schedule.model.dependenciesById.get(dependencyId) ?? null;
	}

	getAssignment(assignmentId: string): GanttAssignment<TAssignmentFields> | null {
		return this.schedule.model.assignmentsById.get(assignmentId) ?? null;
	}

	getResources(): readonly GanttResource<TResourceFields>[] {
		return this.#options.resources;
	}

	getScheduleAnalysis(): GanttScheduleAnalysis<TTaskFields, TDependencyFields> {
		return this.schedule.analysis;
	}

	getWorkload(range?: GanttRange): readonly GanttWorkloadBucket[] {
		if (!range) return this.schedule.workload;
		assertRange(range, 'range');
		return calculateGanttWorkload(this.schedule.model, this.schedule.resolvedTasks, range);
	}

	expandTask(taskId: string): void {
		this.#setTaskExpansion(taskId, true);
	}

	collapseTask(taskId: string): void {
		this.#setTaskExpansion(taskId, false);
	}

	toggleTask(taskId: string): void {
		this.#setTaskExpansion(taskId, !this.#options.expandedTaskIds.includes(taskId));
	}

	expandAll(): void {
		this.#assertNavigationEnabled();
		this.#publishExpansion(
			this.schedule.resolvedTasks
				.filter((node) => node.type === 'summary')
				.map((node) => node.taskId)
		);
	}

	collapseAll(): void {
		this.#assertNavigationEnabled();
		this.#publishExpansion([]);
	}

	select(selection: GanttSelection): void {
		this.#assertNavigationEnabled();
		this.#validateSelection(selection);
		if (sameSelection(selection, this.#options.selection)) return;
		this.#options.selection = selection;
		this.#options.onSelectionChange?.(selection);
	}

	clearSelection(): void {
		this.select(EMPTY_GANTT_SELECTION);
	}

	addTask(task: GanttTask<TTaskFields>): never {
		return this.#unavailableMutation('addTask', { taskId: task.id });
	}

	updateTask(task: GanttTask<TTaskFields>): never {
		return this.#unavailableMutation('updateTask', { taskId: task.id });
	}

	removeTask(taskId: string): never {
		return this.#unavailableMutation('removeTask', { taskId });
	}

	addDependency(dependency: GanttDependency<TDependencyFields>): never {
		return this.#unavailableMutation('addDependency', { dependencyId: dependency.id });
	}

	updateDependency(dependency: GanttDependency<TDependencyFields>): never {
		return this.#unavailableMutation('updateDependency', { dependencyId: dependency.id });
	}

	removeDependency(dependencyId: string): never {
		return this.#unavailableMutation('removeDependency', { dependencyId });
	}

	addAssignment(assignment: GanttAssignment<TAssignmentFields>): never {
		return this.#unavailableMutation('addAssignment', { assignmentId: assignment.id });
	}

	updateAssignment(assignment: GanttAssignment<TAssignmentFields>): never {
		return this.#unavailableMutation('updateAssignment', { assignmentId: assignment.id });
	}

	removeAssignment(assignmentId: string): never {
		return this.#unavailableMutation('removeAssignment', { assignmentId });
	}

	copySelection(): never {
		return this.#unavailableMutation('copySelection');
	}

	paste(): never {
		return this.#unavailableMutation('paste');
	}

	undo(): never {
		return this.#unavailableMutation('undo');
	}

	redo(): never {
		return this.#unavailableMutation('redo');
	}

	canUndo(): never {
		return this.#unavailableMutation('canUndo');
	}

	canRedo(): never {
		return this.#unavailableMutation('canRedo');
	}

	cancelInteraction(): never {
		return this.#unavailableMutation('cancelInteraction');
	}

	#stepZoom(direction: -1 | 1): boolean {
		this.#assertNavigationEnabled();
		const zoomLevels = this.enabledZoomLevels;
		const index = zoomLevels.indexOf(this.#options.zoom);
		const nextIndex = index + direction;
		if (nextIndex < 0 || nextIndex >= zoomLevels.length) return false;
		this.setZoom(zoomLevels[nextIndex]);
		return true;
	}

	#setTaskExpansion(taskId: string, isExpanded: boolean): void {
		this.#assertNavigationEnabled();
		const task = this.getResolvedTask(taskId);
		if (!task || task.type !== 'summary') {
			throw new GanttChartError('invalid-operation', `Task ${taskId} is not a summary.`, {
				taskId
			});
		}
		const expandedTaskIds = this.#options.expandedTaskIds;
		if (expandedTaskIds.includes(taskId) === isExpanded) return;
		this.#publishExpansion(
			isExpanded
				? [...expandedTaskIds, taskId]
				: expandedTaskIds.filter((expandedTaskId) => expandedTaskId !== taskId)
		);
	}

	#publishExpansion(expandedTaskIds: string[]): void {
		this.#options.expandedTaskIds = expandedTaskIds;
		this.#options.onExpansionChange?.(expandedTaskIds);
	}

	#validateSelection(selection: GanttSelection): void {
		if (!selection || typeof selection !== 'object') {
			throw new GanttChartError('invalid-selection', 'selection must be a GanttSelection.');
		}
		if (selection.kind === null) return;
		if (selection.kind === 'task' && this.getTask(selection.taskId)) return;
		if (selection.kind === 'dependency' && this.getDependency(selection.dependencyId)) return;
		if (
			selection.kind === 'cell' &&
			this.getTask(selection.taskId) &&
			selection.cell.taskId === selection.taskId &&
			selection.cell.columnId.length > 0
		) {
			return;
		}
		throw new GanttChartError('invalid-selection', 'selection references an unknown record.', {
			selection
		});
	}

	#clipRange(range: GanttRange): GanttRange {
		const validRange = this.#options.validRange;
		if (!validRange) return cloneRange(range);
		assertRange(validRange, 'validRange');
		const duration = range.end.getTime() - range.start.getTime();
		const validDuration = validRange.end.getTime() - validRange.start.getTime();
		if (duration >= validDuration) return cloneRange(validRange);
		if (range.start.getTime() < validRange.start.getTime()) {
			return {
				start: new Date(validRange.start),
				end: new Date(validRange.start.getTime() + duration)
			};
		}
		if (range.end.getTime() > validRange.end.getTime()) {
			return {
				start: new Date(validRange.end.getTime() - duration),
				end: new Date(validRange.end)
			};
		}
		return cloneRange(range);
	}

	#assertNavigationEnabled(): void {
		if (!this.#options.disabled) return;
		throw new GanttChartError('disabled', 'GanttChart is disabled.');
	}

	#unavailableMutation(method: string, details?: Readonly<Record<string, unknown>>): never {
		if (this.#options.disabled) {
			throw new GanttChartError('disabled', 'GanttChart is disabled.');
		}
		if (this.#options.loading) {
			throw new GanttChartError('invalid-operation', 'GanttChart is loading.');
		}
		throw new GanttChartError(
			'invalid-operation',
			`${method} is not available until the controlled mutation pipeline is mounted.`,
			{ method, ...details }
		);
	}
}

function assertInstant(value: Date, name: string): void {
	try {
		assertScheduleInstant(value, name);
	} catch (error) {
		throw new GanttChartError('invalid-date', `${name} must be a valid Date instant.`, {
			name,
			cause: error instanceof Error ? error.message : String(error)
		});
	}
}

function assertRange(range: GanttRange, name: string): void {
	try {
		assertScheduleRange(range, name);
	} catch (error) {
		throw new GanttChartError('invalid-range', `${name} must be a valid half-open range.`, {
			name,
			cause: error instanceof Error ? error.message : String(error)
		});
	}
}

function cloneRange(range: GanttRange): GanttRange {
	return { start: new Date(range.start), end: new Date(range.end) };
}

function cloneNullableRange(range: GanttRange | null): GanttRange | null {
	return range ? cloneRange(range) : null;
}

function sameSelection(left: GanttSelection, right: GanttSelection): boolean {
	if (left.kind !== right.kind) return false;
	if (left.kind === null && right.kind === null) return true;
	if (left.kind === 'task' && right.kind === 'task') return left.taskId === right.taskId;
	if (left.kind === 'dependency' && right.kind === 'dependency') {
		return left.dependencyId === right.dependencyId;
	}
	return (
		left.kind === 'cell' &&
		right.kind === 'cell' &&
		left.taskId === right.taskId &&
		left.cell.columnId === right.cell.columnId
	);
}
