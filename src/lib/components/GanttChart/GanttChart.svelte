<script lang="ts" module>
	const REMOVED_GANTT_PROP_KEYS = new Set([
		'color',
		'dir',
		'locale',
		'projectCalendarId',
		'validRange',
		'zoomLevels',
		'scales',
		'initialScrollDate',
		'showTodayIndicator',
		'showWeekends',
		'holidays',
		'snapDuration',
		'touchActivation',
		'rowHeight',
		'overscan',
		'scrollMode',
		'scrollbars',
		'stickyHeader',
		'showHeader',
		'showGrid',
		'minGridWidth',
		'maxGridWidth',
		'columns',
		'createDependency',
		'autoSchedule',
		'moveDependencies',
		'display',
		'resourceView',
		'header',
		'actions',
		'gridHeader',
		'columnHeader',
		'treeCell',
		'taskRow',
		'timeHeaderUpper',
		'timeHeaderLower',
		'task',
		'summaryTask',
		'milestone',
		'taskLabel',
		'taskTooltip',
		'dependencyTooltip',
		'progress',
		'baseline',
		'deadline',
		'nonWorkingTime',
		'resourceAssignments',
		'workloadCell',
		'dragPreview',
		'empty',
		'loadingContent',
		'canUpdateTask',
		'onTaskUpdate',
		'canUpdateDependency',
		'onDependencyUpdate',
		'canUpdateAssignment',
		'onAssignmentUpdate',
		'canCreateRange',
		'historyLimit',
		'getPasteId',
		'onTasksChange',
		'onDependenciesChange',
		'onAssignmentsChange',
		'onSelectionChange',
		'onExpansionChange',
		'onZoomChange',
		'onVisibleRangeChange',
		'onTaskClick',
		'onTaskDoubleClick',
		'onDependencyClick',
		'onEmptyRangeSelect',
		'onInteractionBlocked',
		'onScheduleViolations'
	]);

	function filterGanttRootAttributes(attributes: Record<string, unknown>): Record<string, unknown> {
		const rootAttributes: Record<string, unknown> = { ...attributes };
		for (const key of REMOVED_GANTT_PROP_KEYS) delete rootAttributes[key];
		return rootAttributes;
	}
</script>

<script
	lang="ts"
	generics="TTaskFields extends object = Record<never, never>, TDependencyFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>, TAssignmentFields extends object = Record<never, never>"
>
	import { useI18n, useI18nDirection } from '$lib/i18n/context.svelte.js';
	import { onMount } from 'svelte';
	import GanttChartHeader from './GanttChartHeader.svelte';
	import GanttChartShell from './GanttChartShell.svelte';
	import type { GanttChartProps, GanttScaleOption } from './ganttChart.props.js';
	import { resolveGanttScaleSnapDuration } from './ganttChart.scale.js';
	import {
		DEFAULT_GANTT_ZOOM_LEVELS,
		DEFAULT_GANTT_INTERACTIONS,
		EMPTY_GANTT_SELECTION,
		GanttChartState
	} from './ganttChart.state.svelte.js';
	import { useGanttChartTheme } from './ganttChart.theme.js';
	import type {
		GanttAssignment,
		GanttDependency,
		GanttRange,
		GanttResource,
		GanttScaleDefinition,
		GanttScheduleAnalysis,
		GanttSelection,
		GanttTask,
		GanttWorkloadBucket,
		GanttZoomLevel
	} from './ganttChart.types.js';

	const defaultResources: never[] = [];
	const defaultCalendars: never[] = [];
	const defaultScaleOptions: GanttScaleOption[] = [...DEFAULT_GANTT_ZOOM_LEVELS];
	const defaultHolidays: never[] = [];
	const DEFAULT_TOUCH_ACTIVATION = {
		distancePx: 4,
		touchDelayMs: 300,
		touchTolerancePx: 8
	} as const;
	const DEFAULT_ROW_HEIGHT = { small: 28, normal: 32, large: 36 } as const;
	const DEFAULT_GRID_MIN_WIDTH = 64;
	const DEFAULT_GRID_MAX_WIDTH = 640;
	const DEFAULT_OVERSCAN = 6;
	const color = 'primary';
	const rootId = $props.id();

	let {
		tasks = $bindable<GanttTask<TTaskFields>[]>([]),
		dependencies = $bindable<GanttDependency<TDependencyFields>[]>([]),
		resources = defaultResources,
		assignments = $bindable<GanttAssignment<TAssignmentFields>[]>([]),
		calendars = defaultCalendars,
		expandedTaskIds = $bindable<string[]>(
			tasks.flatMap((task) => (task.type === 'summary' ? [task.id] : []))
		),
		selection = $bindable<GanttSelection>(EMPTY_GANTT_SELECTION),
		zoom = $bindable<GanttZoomLevel>('week'),
		timeZone,
		i18n,
		size = 'normal',
		density = 'normal',
		class: className,
		ref = $bindable<HTMLElement | null>(null),
		theme,
		loading = false,
		disabled = false,
		gridWidth = $bindable(352),
		schedule,
		timeline,
		layout,
		interactions,
		mutations,
		events,
		render,
		onkeydown: consumerKeydown,
		...unfilteredRootAttributes
	}: GanttChartProps<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> = $props();

	const rootAttributes = $derived(filterGanttRootAttributes(unfilteredRootAttributes));
	const messages = $derived(useI18n(i18n));
	const resolvedLocale = $derived(messages.locale);
	const resolvedResources = $derived(resources.length === 0 ? defaultResources : resources);
	const resolvedCalendars = $derived(calendars.length === 0 ? defaultCalendars : calendars);
	const scaleOptions = $derived(timeline?.scales ?? defaultScaleOptions);
	const scales = $derived(
		scaleOptions.filter((scale): scale is GanttScaleDefinition => typeof scale !== 'string')
	);
	const zoomLevels = $derived(
		scaleOptions.map((scale) => (typeof scale === 'string' ? scale : scale.id))
	);
	const customScaleIds = $derived(new Set(scales.map((scale) => scale.id)));
	const resolvedSnapDuration = $derived(
		timeline?.snapDuration ?? resolveGanttScaleSnapDuration(zoom, scales)
	);
	const resolvedInteractions = $derived({
		moveTask: interactions?.moveTask ?? DEFAULT_GANTT_INTERACTIONS.moveTask,
		resizeStart: interactions?.resizeStart ?? DEFAULT_GANTT_INTERACTIONS.resizeStart,
		resizeEnd: interactions?.resizeEnd ?? DEFAULT_GANTT_INTERACTIONS.resizeEnd,
		resizeProgress: interactions?.resizeProgress ?? DEFAULT_GANTT_INTERACTIONS.resizeProgress,
		createDependency:
			interactions?.dependencyCreation !== false && !!interactions?.dependencyCreation,
		reorderRows: interactions?.reorderRows ?? DEFAULT_GANTT_INTERACTIONS.reorderRows,
		indent: interactions?.indent ?? DEFAULT_GANTT_INTERACTIONS.indent,
		outdent: interactions?.outdent ?? DEFAULT_GANTT_INTERACTIONS.outdent,
		createRange: interactions?.createRange ?? DEFAULT_GANTT_INTERACTIONS.createRange,
		keyboard: interactions?.keyboard ?? DEFAULT_GANTT_INTERACTIONS.keyboard,
		touch: interactions?.touch ?? DEFAULT_GANTT_INTERACTIONS.touch,
		clipboard: interactions?.clipboard !== false,
		history: interactions?.history !== false
	});
	const resolvedDisplay = $derived({
		criticalPath: false,
		baselines: true,
		deadlines: true,
		constraints: true,
		nonWorkingTime: true,
		workload: false,
		...timeline?.display
	});
	const propagation = $derived(schedule?.propagation ?? 'manual');
	const projectCalendarId = $derived(schedule?.calendarId);
	const validRange = $derived(schedule?.validRange);
	const showTodayIndicator = $derived(timeline?.todayIndicator ?? true);
	const showWeekends = $derived(timeline?.weekends ?? true);
	const holidays = $derived(timeline?.holidays ?? defaultHolidays);
	const resourceView = $derived(timeline?.resourceView);
	const rowHeight = $derived(layout?.rowHeight ?? DEFAULT_ROW_HEIGHT[density]);
	const scrollMode = $derived(layout?.scrollMode ?? 'contained');
	const showGrid = $derived(layout?.grid !== false);
	const columns = $derived(layout?.grid === false ? undefined : layout?.grid?.columns);
	const showHeader = $derived(render?.header !== false);
	const header = $derived(render?.header === false ? undefined : render?.header);
	const createDependency = $derived(
		interactions?.dependencyCreation === false
			? undefined
			: interactions?.dependencyCreation?.create
	);
	const getPasteId = $derived(
		interactions?.clipboard === false ? undefined : interactions?.clipboard?.getId
	);
	const historyLimit = $derived(
		interactions?.history === false ? 0 : (interactions?.history?.limit ?? 50)
	);
	const classes = $derived(useGanttChartTheme(theme));
	const contextualDirection = $derived(useI18nDirection());
	const directionAttributes = $derived(contextualDirection ? { dir: contextualDirection } : {});
	let ambientDirection = $state<'ltr' | 'rtl' | null>(null);
	const resolvedDirection = $derived(contextualDirection ?? ambientDirection ?? 'ltr');
	const rootAriaLabel = $derived(
		typeof rootAttributes['aria-label'] === 'string'
			? rootAttributes['aria-label']
			: messages.ganttChartLabel
	);

	const chart = new GanttChartState<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>({
		get tasks() {
			return tasks;
		},
		set tasks(value) {
			tasks = value;
		},
		get dependencies() {
			return dependencies;
		},
		set dependencies(value) {
			dependencies = value;
		},
		get resources() {
			return resolvedResources;
		},
		get assignments() {
			return assignments;
		},
		set assignments(value) {
			assignments = value;
		},
		get calendars() {
			return resolvedCalendars;
		},
		get expandedTaskIds() {
			return expandedTaskIds;
		},
		set expandedTaskIds(value) {
			expandedTaskIds = value;
		},
		get selection() {
			return selection;
		},
		set selection(value) {
			selection = value;
		},
		get zoom() {
			return zoom;
		},
		set zoom(value) {
			zoom = value;
		},
		get timeZone() {
			return timeZone;
		},
		get locale() {
			return resolvedLocale;
		},
		get direction() {
			return resolvedDirection;
		},
		get messages() {
			return messages;
		},
		rootId,
		get projectCalendarId() {
			return projectCalendarId;
		},
		get validRange() {
			return validRange;
		},
		get zoomLevels() {
			return zoomLevels;
		},
		get customScaleIds() {
			return customScaleIds;
		},
		get loading() {
			return loading;
		},
		get disabled() {
			return disabled;
		},
		get autoSchedule() {
			return propagation === 'auto';
		},
		get moveDependencies() {
			return propagation === 'move-successors';
		},
		get interactions() {
			return resolvedInteractions;
		},
		get createDependency() {
			return createDependency;
		},
		get snapDuration() {
			return resolvedSnapDuration;
		},
		get touchActivation() {
			return DEFAULT_TOUCH_ACTIVATION;
		},
		get canUpdateTask() {
			return mutations?.task?.validate;
		},
		get onTaskUpdate() {
			return mutations?.task?.resolve;
		},
		get canUpdateDependency() {
			return mutations?.dependency?.validate;
		},
		get onDependencyUpdate() {
			return mutations?.dependency?.resolve;
		},
		get canUpdateAssignment() {
			return mutations?.assignment?.validate;
		},
		get onAssignmentUpdate() {
			return mutations?.assignment?.resolve;
		},
		get canCreateRange() {
			return mutations?.range?.validate;
		},
		get historyLimit() {
			return historyLimit;
		},
		get getPasteId() {
			return getPasteId;
		},
		get onTasksChange() {
			return mutations?.task?.onChange;
		},
		get onDependenciesChange() {
			return mutations?.dependency?.onChange;
		},
		get onAssignmentsChange() {
			return mutations?.assignment?.onChange;
		},
		get onInteractionBlocked() {
			return events?.interactionBlocked;
		},
		get onScheduleViolations() {
			return events?.scheduleViolations;
		},
		get onExpansionChange() {
			return events?.expansionChange;
		},
		get onSelectionChange() {
			return events?.selectionChange;
		},
		get onEmptyRangeSelect() {
			return events?.emptyRangeSelect;
		},
		get onZoomChange() {
			return events?.zoomChange;
		},
		get onVisibleRangeChange() {
			return events?.visibleRangeChange;
		}
	});

	const snapshot = $derived(chart.snapshot);

	function handleRootKeydown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }
	): void {
		if (typeof consumerKeydown === 'function') consumerKeydown(event);
		if (event.key !== 'Escape' && !event.defaultPrevented) chart.a11y.handleRootKeydown(event);
	}

	function handleRootKeydownCapture(event: KeyboardEvent): void {
		if (event.key === 'Escape') chart.a11y.scheduleDismissFocus();
	}

	function handleRootClickCapture(event: MouseEvent): void {
		chart.a11y.handleRootClick(event);
	}

	export function fitProject(): boolean {
		return chart.fitProject();
	}

	export function zoomIn(anchorDate?: Date): boolean {
		return chart.zoomIn(anchorDate);
	}

	export function zoomOut(anchorDate?: Date): boolean {
		return chart.zoomOut(anchorDate);
	}

	export function setZoom(nextZoom: GanttZoomLevel, anchorDate?: Date): void {
		chart.setZoom(nextZoom, anchorDate);
	}

	export function scrollToDate(
		date: Date,
		options?: { align?: 'start' | 'center' | 'end' }
	): boolean {
		return chart.scrollToDate(date, options);
	}

	export function scrollToTask(
		taskId: string,
		options?: { align?: 'start' | 'center' | 'end' }
	): boolean {
		return chart.scrollToTask(taskId, options);
	}

	export function getVisibleRange(): GanttRange {
		return chart.getVisibleRange();
	}

	export function getTask(taskId: string): GanttTask<TTaskFields> | null {
		return chart.getTask(taskId);
	}

	export function getResolvedTask(taskId: string) {
		return chart.getResolvedTask(taskId);
	}

	export function getVisibleTasks() {
		return chart.getVisibleTasks();
	}

	export function getDependency(dependencyId: string): GanttDependency<TDependencyFields> | null {
		return chart.getDependency(dependencyId);
	}

	export function getAssignment(assignmentId: string): GanttAssignment<TAssignmentFields> | null {
		return chart.getAssignment(assignmentId);
	}

	export function getResources(): readonly GanttResource<TResourceFields>[] {
		return chart.getResources();
	}

	export function getScheduleAnalysis(): GanttScheduleAnalysis<TTaskFields, TDependencyFields> {
		return chart.getScheduleAnalysis();
	}

	export function getWorkload(range?: GanttRange): readonly GanttWorkloadBucket[] {
		return chart.getWorkload(range);
	}

	export function expandTask(taskId: string): void {
		chart.expandTask(taskId);
	}

	export function collapseTask(taskId: string): void {
		chart.collapseTask(taskId);
	}

	export function toggleTask(taskId: string): void {
		chart.toggleTask(taskId);
	}

	export function expandAll(): void {
		chart.expandAll();
	}

	export function collapseAll(): void {
		chart.collapseAll();
	}

	export function select(nextSelection: GanttSelection): void {
		chart.select(nextSelection);
	}

	export function clearSelection(): void {
		chart.clearSelection();
	}

	export function addTask(task: GanttTask<TTaskFields>): void {
		chart.addTask(task);
	}

	export function updateTask(task: GanttTask<TTaskFields>): void {
		chart.updateTask(task);
	}

	export function removeTask(taskId: string): void {
		chart.removeTask(taskId);
	}

	export function addDependency(dependency: GanttDependency<TDependencyFields>): void {
		chart.addDependency(dependency);
	}

	export function updateDependency(dependency: GanttDependency<TDependencyFields>): void {
		chart.updateDependency(dependency);
	}

	export function removeDependency(dependencyId: string): void {
		chart.removeDependency(dependencyId);
	}

	export function addAssignment(assignment: GanttAssignment<TAssignmentFields>): void {
		chart.addAssignment(assignment);
	}

	export function updateAssignment(assignment: GanttAssignment<TAssignmentFields>): void {
		chart.updateAssignment(assignment);
	}

	export function removeAssignment(assignmentId: string): void {
		chart.removeAssignment(assignmentId);
	}

	export function copySelection(): boolean {
		return chart.copySelection();
	}

	export function paste(): boolean {
		return chart.paste();
	}

	export function undo(): boolean {
		return chart.undo();
	}

	export function redo(): boolean {
		return chart.redo();
	}

	export function canUndo(): boolean {
		return chart.canUndo();
	}

	export function canRedo(): boolean {
		return chart.canRedo();
	}

	export function cancelInteraction(): void {
		chart.cancelInteraction();
	}

	onMount(() => {
		if (!ref) throw new Error('GanttChart root did not mount.');
		const disconnectA11y = chart.a11y.connectRoot(ref);
		const rootElement = ref;
		const updateAmbientDirection = () => {
			ambientDirection = getComputedStyle(rootElement).direction === 'rtl' ? 'rtl' : 'ltr';
		};
		updateAmbientDirection();
		const observer = new MutationObserver(updateAmbientDirection);
		for (
			let ancestor: HTMLElement | null = rootElement;
			ancestor;
			ancestor = ancestor.parentElement
		) {
			observer.observe(ancestor, {
				attributes: true,
				attributeFilter: ['class', 'dir', 'style']
			});
		}
		return () => {
			disconnectA11y();
			observer.disconnect();
		};
	});
</script>

<div
	{...rootAttributes}
	{...directionAttributes}
	bind:this={ref}
	role="region"
	aria-label={rootAriaLabel}
	aria-describedby={chart.a11y.instructionsId}
	onclickcapture={handleRootClickCapture}
	onkeydowncapture={handleRootKeydownCapture}
	onkeydown={handleRootKeydown}
	data-gantt-chart-part="root"
	data-size={size}
	data-density={density}
	data-color="primary"
	data-direction={resolvedDirection}
	data-zoom={zoom}
	data-loading={loading || undefined}
	data-disabled={disabled || undefined}
	class={classes.root({
		size,
		density,
		color,
		disabled,
		class: [scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden', className]
	})}
>
	{#if showHeader}
		<GanttChartHeader
			{chart}
			{snapshot}
			{messages}
			locale={resolvedLocale}
			{timeZone}
			{size}
			{density}
			{color}
			{disabled}
			stickyHeader={scrollMode === 'page'}
			{scrollMode}
			{classes}
			{header}
			actions={render?.actions}
		/>
	{/if}
	<GanttChartShell
		{chart}
		{snapshot}
		{messages}
		{size}
		{density}
		{color}
		direction={resolvedDirection}
		{loading}
		{disabled}
		{showGrid}
		bind:gridWidth
		minGridWidth={DEFAULT_GRID_MIN_WIDTH}
		maxGridWidth={Math.max(DEFAULT_GRID_MAX_WIDTH, gridWidth)}
		{rowHeight}
		overscan={DEFAULT_OVERSCAN}
		{scrollMode}
		{columns}
		interactions={resolvedInteractions}
		touchActivation={DEFAULT_TOUCH_ACTIVATION}
		{scales}
		{validRange}
		{holidays}
		{showTodayIndicator}
		{showWeekends}
		display={resolvedDisplay}
		{resourceView}
		locale={resolvedLocale}
		{timeZone}
		{classes}
		snippets={{
			gridHeader: render?.gridHeader,
			columnHeader: render?.columnHeader,
			treeCell: render?.treeCell,
			taskRow: render?.taskRow,
			timeHeaderUpper: render?.timeHeader,
			timeHeaderLower: render?.timeHeader,
			task: render?.task,
			summaryTask: render?.task,
			milestone: render?.task,
			taskLabel: render?.taskLabel,
			taskTooltip: render?.taskTooltip,
			dependencyTooltip: render?.dependencyTooltip,
			progress: render?.progress,
			baseline: render?.baseline,
			deadline: render?.deadline,
			nonWorkingTime: render?.nonWorkingTime,
			resourceAssignments: render?.resourceAssignments,
			workloadCell: render?.workloadCell,
			dragPreview: render?.dragPreview,
			empty: render?.empty,
			loadingContent: render?.loadingContent
		}}
		onTaskClick={events?.taskClick}
		onTaskDoubleClick={events?.taskDoubleClick}
		onDependencyClick={events?.dependencyClick}
	/>
	<div
		id={chart.a11y.liveRegionId}
		data-gantt-chart-part="live-region"
		class={classes.liveRegion({ size, density, color, disabled })}
		aria-live="polite"
		aria-atomic="true"
	>
		{chart.a11y.announcement}
	</div>
	<div id={chart.a11y.instructionsId} class="sr-only">
		{messages.ganttChartKeyboardInstructions}
	</div>
</div>
