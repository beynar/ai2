/* eslint-disable svelte/prefer-svelte-reactivity -- Dates, Sets, and ranges here are immutable schedule snapshots, not reactive collection owners. */
import { assertScheduleInstant, assertScheduleRange } from '$lib/scheduling/scheduleRange.js';
import type { Messages } from '$lib/i18n/en.js';
import { applyGanttColumnEdit } from './ganttChart.columns.js';
import { GanttChartA11y } from './ganttChart.a11y.svelte.js';
import { calculateGanttWorkload } from './ganttChart.workload.js';
import { GanttChartClipboard } from './ganttChart.clipboard.js';
import { GanttChartError } from './ganttChart.error.js';
import { GanttChartHistory } from './ganttChart.history.svelte.js';
import { GanttChartInteractions } from './ganttChart.interactions.svelte.js';
import { GanttChartMutations } from './ganttChart.mutations.js';
import type { GanttSnapshot } from './ganttChart.props.js';
import { createGanttColumnContext } from './ganttChart.rows.js';
import { resolveGanttSchedule, type ResolvedGanttSchedule } from './ganttChart.schedule.js';
import type {
	GanttAssignment,
	GanttAssignmentProposal,
	GanttAssignmentUpdateResult,
	GanttAssignmentsChange,
	GanttCalendar,
	GanttChartApi,
	GanttColumnDefinition,
	GanttConstraintViolation,
	GanttDependency,
	GanttDependencyCreationRequest,
	GanttDependencyProposal,
	GanttDependencyUpdateResult,
	GanttDependenciesChange,
	GanttDuration,
	GanttInteractionBlockedInfo,
	GanttInteractions,
	GanttMutationSource,
	GanttPasteIdRequest,
	GanttRange,
	GanttRangeProposal,
	GanttResolvedTaskNode,
	GanttResource,
	GanttScheduleAnalysis,
	GanttSelection,
	GanttTask,
	GanttTaskProposal,
	GanttTasksChange,
	GanttTaskUpdateResult,
	GanttTouchActivation,
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

export const DEFAULT_GANTT_INTERACTIONS: GanttInteractions = Object.freeze({
	moveTask: true,
	resizeStart: true,
	resizeEnd: true,
	resizeProgress: true,
	createDependency: true,
	reorderRows: true,
	indent: true,
	outdent: true,
	createRange: true,
	keyboard: true,
	touch: true,
	clipboard: true,
	history: true
});

const BUILT_IN_ZOOM_LEVELS = new Set(DEFAULT_GANTT_ZOOM_LEVELS);
const EMPTY_RANGE_ANCHOR = new Date(0);
const DEFAULT_RANGE_SPAN_MS = 14 * 24 * 60 * 60 * 1000;

export type GanttChartStateOptions<
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
	readonly locale: string;
	readonly direction: 'ltr' | 'rtl';
	readonly messages: Messages;
	readonly rootId: string;
	readonly projectCalendarId: string | undefined;
	readonly validRange: GanttRange | undefined;
	readonly zoomLevels: readonly GanttZoomLevel[];
	readonly customScaleIds: ReadonlySet<GanttZoomLevel>;
	readonly loading: boolean;
	readonly disabled: boolean;
	readonly autoSchedule: boolean;
	readonly moveDependencies: boolean;
	readonly interactions: GanttInteractions;
	readonly createDependency:
		((request: GanttDependencyCreationRequest) => GanttDependency<TDependencyFields>) | undefined;
	readonly snapDuration: GanttDuration;
	readonly touchActivation: GanttTouchActivation;
	readonly canUpdateTask: ((proposal: GanttTaskProposal<TTaskFields>) => boolean) | undefined;
	readonly onTaskUpdate:
		((proposal: GanttTaskProposal<TTaskFields>) => GanttTaskUpdateResult<TTaskFields>) | undefined;
	readonly canUpdateDependency:
		((proposal: GanttDependencyProposal<TDependencyFields>) => boolean) | undefined;
	readonly onDependencyUpdate:
		| ((
				proposal: GanttDependencyProposal<TDependencyFields>
		  ) => GanttDependencyUpdateResult<TDependencyFields>)
		| undefined;
	readonly canUpdateAssignment:
		((proposal: GanttAssignmentProposal<TAssignmentFields>) => boolean) | undefined;
	readonly onAssignmentUpdate:
		| ((
				proposal: GanttAssignmentProposal<TAssignmentFields>
		  ) => GanttAssignmentUpdateResult<TAssignmentFields>)
		| undefined;
	readonly canCreateRange: ((proposal: GanttRangeProposal) => boolean) | undefined;
	readonly historyLimit: number;
	readonly getPasteId: ((request: GanttPasteIdRequest) => string) | undefined;
	readonly onTasksChange:
		((tasks: GanttTask<TTaskFields>[], change: GanttTasksChange<TTaskFields>) => void) | undefined;
	readonly onDependenciesChange:
		| ((
				dependencies: GanttDependency<TDependencyFields>[],
				change: GanttDependenciesChange<TDependencyFields>
		  ) => void)
		| undefined;
	readonly onAssignmentsChange:
		| ((
				assignments: GanttAssignment<TAssignmentFields>[],
				change: GanttAssignmentsChange<TAssignmentFields>
		  ) => void)
		| undefined;
	readonly onInteractionBlocked: ((info: GanttInteractionBlockedInfo) => void) | undefined;
	readonly onScheduleViolations:
		| ((
				violations: readonly GanttConstraintViolation[],
				source: 'validation' | 'task-change' | 'dependency-change' | 'calendar-change'
		  ) => void)
		| undefined;
	readonly onExpansionChange: ((expandedTaskIds: string[]) => void) | undefined;
	readonly onSelectionChange: ((selection: GanttSelection) => void) | undefined;
	readonly onEmptyRangeSelect: ((proposal: GanttRangeProposal) => void) | undefined;
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

export type GanttTimelineNavigation = Readonly<{
	fitProject: () => boolean;
	prepareZoom: (anchorDate: Date) => void;
	scrollToDate: (date: Date, options?: { align?: 'start' | 'center' | 'end' }) => boolean;
}>;

export type GanttRowNavigation = Readonly<{
	scrollToTask: (taskId: string, options?: { align?: 'start' | 'center' | 'end' }) => boolean;
}>;

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
	#visibleRange = $state<GanttRange | null>(null);
	#timelineNavigation: GanttTimelineNavigation | null = null;
	#rowNavigation: GanttRowNavigation | null = null;
	#mutations: GanttChartMutations<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	#clipboard: GanttChartClipboard<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	#history: GanttChartHistory<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	readonly interaction: GanttChartInteractions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	readonly a11y: GanttChartA11y<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;

	constructor(
		options: GanttChartStateOptions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) {
		this.#options = options;
		this.#history = new GanttChartHistory(options, (target, commit, direction) =>
			this.#mutations.restoreSnapshot(target, commit, direction)
		);
		this.#clipboard = new GanttChartClipboard(options);
		this.#mutations = new GanttChartMutations(options, (commit) => {
			const forgetHistory = this.#history.record(commit);
			this.a11y.announceCommit(commit);
			return () => {
				forgetHistory?.();
				this.a11y.announceRevert(commit.title);
			};
		});
		this.interaction = new GanttChartInteractions(options, this.#mutations, () => this.schedule);
		this.a11y = new GanttChartA11y(options, this.interaction, () => this.schedule, {
			select: (selection) => this.select(selection),
			clearSelection: () => this.clearSelection(),
			removeTask: (taskId) => this.removeTaskFromKeyboard(taskId),
			removeDependency: (dependencyId) => this.removeDependencyFromKeyboard(dependencyId),
			copySelection: () => this.copySelection(),
			paste: () => this.paste(),
			undo: () => this.undo(),
			redo: () => this.redo(),
			scrollToTask: (taskId) => this.scrollToTask(taskId)
		});
		$effect(() => {
			void options.tasks;
			void options.dependencies;
			void options.resources;
			void options.assignments;
			void options.calendars;
			this.interaction.reconcileControlledState();
		});
		$effect(() => {
			this.a11y.syncInteractionStatus(this.interaction.status, this.interaction.dependencyStatus);
		});
		$effect(() => {
			this.a11y.syncSelection(options.selection);
		});
	}

	readonly schedule: ResolvedGanttSchedule<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> = $derived.by(() => {
		const options = this.#options;
		return resolveGanttSchedule({
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
	});

	readonly snapshot: GanttSnapshot<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> = $derived.by(() => {
		const options = this.#options;
		return {
			tasks: options.tasks,
			dependencies: options.dependencies,
			resources: options.resources,
			assignments: options.assignments,
			resolvedTasks: this.schedule.resolvedTasks,
			expandedTaskIds: options.expandedTaskIds,
			selection: options.selection,
			zoom: options.zoom,
			visibleRange: this.visibleRange,
			loading: options.loading,
			disabled: options.disabled,
			api: this
		};
	});

	get visibleRange(): GanttRange {
		if (this.#visibleRange) return cloneRange(this.#visibleRange);
		const validRange = this.#options.validRange;
		if (validRange) {
			assertRange(validRange, 'validRange');
			return cloneRange(validRange);
		}
		const projectRange = this.schedule.analysis.projectRange;
		if (projectRange) return cloneRange(projectRange);
		return {
			start: new Date(EMPTY_RANGE_ANCHOR.getTime() - DEFAULT_RANGE_SPAN_MS / 2),
			end: new Date(EMPTY_RANGE_ANCHOR.getTime() + DEFAULT_RANGE_SPAN_MS / 2)
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
		if (this.#timelineNavigation) return this.#timelineNavigation.fitProject();
		const projectRange = this.schedule.analysis.projectRange;
		if (!projectRange) return false;
		this.setVisibleRange(projectRange);
		return true;
	}

	zoomIn(anchorDate?: Date): boolean {
		if (anchorDate) assertInstant(anchorDate, 'anchorDate');
		return this.#stepZoom(-1, anchorDate);
	}

	zoomOut(anchorDate?: Date): boolean {
		if (anchorDate) assertInstant(anchorDate, 'anchorDate');
		return this.#stepZoom(1, anchorDate);
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
		const currentRange = this.visibleRange;
		this.#timelineNavigation?.prepareZoom(
			anchorDate ?? new Date((currentRange.start.getTime() + currentRange.end.getTime()) / 2)
		);
		this.#options.zoom = zoom;
		this.#options.onZoomChange?.(zoom);
	}

	scrollToDate(date: Date, options?: { align?: 'start' | 'center' | 'end' }): boolean {
		this.#assertNavigationEnabled();
		assertInstant(date, 'date');
		if (this.#timelineNavigation) return this.#timelineNavigation.scrollToDate(date, options);
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
		this.#assertNavigationEnabled();
		const task = this.getResolvedTask(taskId);
		if (!task) return false;
		const didScrollRow = this.#rowNavigation?.scrollToTask(taskId, options) ?? false;
		if (!task.resolvedStart || !task.resolvedEnd) return didScrollRow;
		const align = options?.align ?? 'center';
		const date =
			align === 'start'
				? task.resolvedStart
				: align === 'end'
					? task.resolvedEnd
					: new Date((task.resolvedStart.getTime() + task.resolvedEnd.getTime()) / 2);
		return this.scrollToDate(date, { align }) || didScrollRow;
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

	connectTimelineNavigation(navigation: GanttTimelineNavigation): () => void {
		this.#timelineNavigation = navigation;
		return () => {
			if (this.#timelineNavigation === navigation) this.#timelineNavigation = null;
		};
	}

	connectRowNavigation(navigation: GanttRowNavigation): () => void {
		this.#rowNavigation = navigation;
		return () => {
			if (this.#rowNavigation === navigation) this.#rowNavigation = null;
		};
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

	addTask(task: GanttTask<TTaskFields>): void {
		this.#requireAccepted(this.#mutations.addTask(task, 'api'), 'addTask');
	}

	updateTask(task: GanttTask<TTaskFields>): void {
		this.#requireAccepted(this.#mutations.updateTask(task, 'api'), 'updateTask');
	}

	removeTask(taskId: string): void {
		this.#requireAccepted(this.#mutations.removeTask(taskId, 'api'), 'removeTask');
	}

	removeTaskFromKeyboard(taskId: string): boolean {
		if (!this.#options.interactions.keyboard) return false;
		const accepted = this.#mutations.removeTask(taskId, 'keyboard');
		if (accepted && this.#options.selection.kind !== null) this.clearSelection();
		return accepted;
	}

	addDependency(dependency: GanttDependency<TDependencyFields>): void {
		this.#requireAccepted(this.#mutations.addDependency(dependency, 'api'), 'addDependency');
	}

	updateDependency(dependency: GanttDependency<TDependencyFields>): void {
		this.#requireAccepted(this.#mutations.updateDependency(dependency, 'api'), 'updateDependency');
	}

	removeDependency(dependencyId: string): void {
		this.#requireAccepted(
			this.#mutations.removeDependency(dependencyId, 'api'),
			'removeDependency'
		);
	}

	removeDependencyFromKeyboard(dependencyId: string): boolean {
		if (!this.#options.interactions.keyboard) return false;
		const accepted = this.#mutations.removeDependency(dependencyId, 'keyboard');
		if (accepted && this.#options.selection.kind === 'dependency') this.clearSelection();
		return accepted;
	}

	updateDependencyFromInline(dependency: GanttDependency<TDependencyFields>): boolean {
		return this.#mutations.updateDependency(dependency, 'inline-edit');
	}

	addAssignment(assignment: GanttAssignment<TAssignmentFields>): void {
		this.#requireAccepted(this.#mutations.addAssignment(assignment, 'api'), 'addAssignment');
	}

	updateAssignment(assignment: GanttAssignment<TAssignmentFields>): void {
		this.#requireAccepted(this.#mutations.updateAssignment(assignment, 'api'), 'updateAssignment');
	}

	removeAssignment(assignmentId: string): void {
		this.#requireAccepted(
			this.#mutations.removeAssignment(assignmentId, 'api'),
			'removeAssignment'
		);
	}

	updateTaskFromColumn(
		node: GanttResolvedTaskNode<TTaskFields>,
		column: GanttColumnDefinition<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		value: unknown
	): boolean {
		const context = createGanttColumnContext(
			node,
			this.#options.dependencies,
			this.#options.resources,
			this.#options.assignments
		);
		const task = applyGanttColumnEdit(column, context, value);
		return this.#mutations.updateTask(task, 'inline-edit');
	}

	reorderTask(
		taskId: string,
		targetTaskId: string,
		position: 'before' | 'after',
		source: Extract<GanttMutationSource, 'pointer' | 'keyboard'> = 'pointer'
	): boolean {
		if (!this.#options.interactions.reorderRows) return false;
		return this.#mutations.reorderTask(taskId, targetTaskId, position, source);
	}

	indentTask(
		taskId: string,
		previousTaskId: string | null,
		source: GanttMutationSource = 'keyboard'
	): boolean {
		if (!this.#options.interactions.indent || !previousTaskId) return false;
		return this.#mutations.indentTask(taskId, previousTaskId, source);
	}

	outdentTask(taskId: string, source: GanttMutationSource = 'keyboard'): boolean {
		if (!this.#options.interactions.outdent) return false;
		return this.#mutations.outdentTask(taskId, source);
	}

	blockInteraction(info: GanttInteractionBlockedInfo): void {
		this.#options.onInteractionBlocked?.(info);
	}

	copySelection(): boolean {
		const accepted = this.#clipboard.copySelection();
		const title = this.#clipboard.copiedRootTitle;
		if (accepted && title) {
			this.a11y.announce(
				this.#options.messages.ganttChartCopiedTask(title, this.#clipboard.omittedDependencyCount)
			);
		}
		return accepted;
	}

	paste(): boolean {
		const records = this.#clipboard.preparePaste();
		const accepted = this.#mutations.pasteSubtree(records);
		if (accepted) this.#clipboard.markPasted(records.copyIndex);
		return accepted;
	}

	undo(): boolean {
		return this.#history.undo();
	}

	redo(): boolean {
		return this.#history.redo();
	}

	canUndo(): boolean {
		return this.#history.canUndo();
	}

	canRedo(): boolean {
		return this.#history.canRedo();
	}

	cancelInteraction(): void {
		if (!this.a11y.cancelKeyboardMode()) this.interaction.cancel();
	}

	#stepZoom(direction: -1 | 1, anchorDate?: Date): boolean {
		this.#assertNavigationEnabled();
		const zoomLevels = this.enabledZoomLevels;
		const index = zoomLevels.indexOf(this.#options.zoom);
		const nextIndex = index + direction;
		if (nextIndex < 0 || nextIndex >= zoomLevels.length) return false;
		this.setZoom(zoomLevels[nextIndex], anchorDate);
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

	#requireAccepted(isAccepted: boolean, method: string): void {
		if (isAccepted) return;
		throw new GanttChartError('rejected', `${method} was rejected by the consumer policy.`, {
			method
		});
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
