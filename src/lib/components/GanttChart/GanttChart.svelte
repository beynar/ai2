<script lang="ts" module>
	const DEFERRED_GANTT_PROP_KEYS = new Set([
		'showTodayIndicator',
		'showWeekends',
		'holidays',
		'snapDuration',
		'touchActivation',
		'display',
		'resourceView',
		'canCreateRange',
		'historyLimit',
		'getPasteId',
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
		'onTaskClick',
		'onTaskDoubleClick',
		'onDependencyClick',
		'onEmptyRangeSelect',
		'onkeydown'
	]);

	function filterGanttChartAttributes(
		attributes: Record<string, unknown>
	): Record<string, unknown> {
		return Object.fromEntries(
			Object.entries(attributes).filter(([key]) => !DEFERRED_GANTT_PROP_KEYS.has(key))
		);
	}
</script>

<script
	lang="ts"
	generics="TTaskFields extends object = Record<never, never>, TDependencyFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>, TAssignmentFields extends object = Record<never, never>"
>
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { onMount } from 'svelte';
	import GanttChartHeader from './GanttChartHeader.svelte';
	import GanttChartShell from './GanttChartShell.svelte';
	import type { GanttChartProps, GanttSnapshot } from './ganttChart.props.js';
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
		GanttScheduleAnalysis,
		GanttSelection,
		GanttTask,
		GanttWorkloadBucket,
		GanttZoomLevel
	} from './ganttChart.types.js';

	const defaultResources: never[] = [];
	const defaultCalendars: never[] = [];
	const defaultZoomLevels = [...DEFAULT_GANTT_ZOOM_LEVELS];
	const defaultScales: never[] = [];
	const defaultHolidays: never[] = [];
	const defaultSnapDuration = { value: 1, unit: 'day' } as const;
	const defaultTouchActivation = {};
	const defaultInteractions = {};
	const defaultDisplay = {};
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
		locale,
		i18n,
		dir,
		density = 'normal',
		color = 'primary',
		class: className,
		ref = $bindable<HTMLElement | null>(null),
		theme,
		loading = false,
		disabled = false,
		projectCalendarId,
		validRange,
		zoomLevels = defaultZoomLevels,
		scales = defaultScales,
		initialScrollDate,
		showTodayIndicator = true,
		showWeekends = true,
		holidays = defaultHolidays,
		snapDuration = defaultSnapDuration,
		touchActivation = defaultTouchActivation,
		rowHeight = 36,
		overscan = 6,
		scrollMode = 'contained',
		scrollbars = 'custom',
		stickyHeader = false,
		showHeader = true,
		showGrid = true,
		gridWidth = $bindable(352),
		minGridWidth = 240,
		maxGridWidth = 640,
		columns,
		interactions = defaultInteractions,
		createDependency,
		autoSchedule = false,
		moveDependencies = false,
		display = defaultDisplay,
		resourceView,
		header,
		actions,
		gridHeader,
		columnHeader,
		treeCell,
		taskRow,
		timeHeaderUpper,
		timeHeaderLower,
		task,
		summaryTask,
		milestone,
		taskLabel,
		taskTooltip,
		dependencyTooltip,
		progress,
		baseline,
		deadline,
		nonWorkingTime,
		resourceAssignments,
		workloadCell,
		dragPreview,
		empty,
		loadingContent,
		canUpdateTask,
		onTaskUpdate,
		canUpdateDependency,
		onDependencyUpdate,
		canUpdateAssignment,
		onAssignmentUpdate,
		canCreateRange,
		historyLimit = 50,
		getPasteId,
		onTasksChange,
		onDependenciesChange,
		onAssignmentsChange,
		onSelectionChange,
		onExpansionChange,
		onZoomChange,
		onVisibleRangeChange,
		onTaskClick,
		onTaskDoubleClick,
		onDependencyClick,
		onEmptyRangeSelect,
		onInteractionBlocked,
		onScheduleViolations,
		...remainingProps
	}: GanttChartProps<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> = $props();

	const messages = $derived(useI18n(i18n));
	const resolvedLocale = $derived(locale ?? messages.locale);
	const resolvedResources = $derived(resources.length === 0 ? defaultResources : resources);
	const resolvedCalendars = $derived(calendars.length === 0 ? defaultCalendars : calendars);
	const customScaleIds = $derived(new Set(scales.map((scale) => scale.id)));
	const resolvedInteractions = $derived({ ...DEFAULT_GANTT_INTERACTIONS, ...interactions });
	const resolvedTouchActivation = $derived({
		distancePx: 5,
		touchDelayMs: 300,
		touchTolerancePx: 8,
		...touchActivation
	});
	const resolvedDisplay = $derived({
		criticalPath: false,
		baselines: true,
		deadlines: true,
		constraints: true,
		nonWorkingTime: true,
		workload: false,
		...display
	});
	const classes = $derived(useGanttChartTheme(theme));
	let ambientDirection = $state<'ltr' | 'rtl' | null>(null);
	const resolvedDirection = $derived(dir ?? ambientDirection ?? 'ltr');
	const rootAttributes = $derived(filterGanttChartAttributes(remainingProps));
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
		get initialScrollDate() {
			return initialScrollDate;
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
			return autoSchedule;
		},
		get moveDependencies() {
			return moveDependencies;
		},
		get interactions() {
			return resolvedInteractions;
		},
		get createDependency() {
			return createDependency;
		},
		get snapDuration() {
			return snapDuration;
		},
		get touchActivation() {
			return resolvedTouchActivation;
		},
		get canUpdateTask() {
			return canUpdateTask;
		},
		get onTaskUpdate() {
			return onTaskUpdate;
		},
		get canUpdateDependency() {
			return canUpdateDependency;
		},
		get onDependencyUpdate() {
			return onDependencyUpdate;
		},
		get canUpdateAssignment() {
			return canUpdateAssignment;
		},
		get onAssignmentUpdate() {
			return onAssignmentUpdate;
		},
		get canCreateRange() {
			return canCreateRange;
		},
		get historyLimit() {
			return historyLimit;
		},
		get getPasteId() {
			return getPasteId;
		},
		get onTasksChange() {
			return onTasksChange;
		},
		get onDependenciesChange() {
			return onDependenciesChange;
		},
		get onAssignmentsChange() {
			return onAssignmentsChange;
		},
		get onInteractionBlocked() {
			return onInteractionBlocked;
		},
		get onScheduleViolations() {
			return onScheduleViolations;
		},
		get onExpansionChange() {
			return onExpansionChange;
		},
		get onSelectionChange() {
			return onSelectionChange;
		},
		get onEmptyRangeSelect() {
			return onEmptyRangeSelect;
		},
		get onZoomChange() {
			return onZoomChange;
		},
		get onVisibleRangeChange() {
			return onVisibleRangeChange;
		}
	});

	const snapshot = $derived.by(
		(): GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> => ({
			tasks,
			dependencies,
			resources: resolvedResources,
			assignments,
			resolvedTasks: chart.schedule.resolvedTasks,
			expandedTaskIds,
			selection,
			zoom,
			visibleRange: chart.visibleRange,
			loading,
			disabled,
			api: chart
		})
	);

	$effect(() => {
		void tasks;
		void dependencies;
		void resources;
		void assignments;
		void calendars;
		chart.interaction.reconcileControlledState();
	});

	$effect(() => {
		chart.a11y.syncInteractionStatus(chart.interaction.status, chart.interaction.dependencyStatus);
	});

	$effect(() => {
		chart.a11y.syncSelection(selection);
	});

	function handleRootKeydown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }
	): void {
		const consumerHandler = remainingProps.onkeydown;
		if (typeof consumerHandler === 'function') consumerHandler(event);
		if (!event.defaultPrevented) chart.a11y.handleRootKeydown(event);
	}

	function handleRootKeydownCapture(event: KeyboardEvent): void {
		if (event.key === 'Escape' && chart.a11y.keyboardMode) chart.a11y.handleRootKeydown(event);
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
		const parentElement = ref?.parentElement;
		const updateAmbientDirection = () => {
			if (!parentElement) return;
			ambientDirection = getComputedStyle(parentElement).direction === 'rtl' ? 'rtl' : 'ltr';
		};
		updateAmbientDirection();
		const observer = new MutationObserver(updateAmbientDirection);
		for (let ancestor = parentElement; ancestor; ancestor = ancestor.parentElement) {
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
	bind:this={ref}
	dir={resolvedDirection}
	role="region"
	aria-label={rootAriaLabel}
	aria-describedby={chart.a11y.instructionsId}
	onkeydowncapture={handleRootKeydownCapture}
	onkeydown={handleRootKeydown}
	data-gantt-chart-part="root"
	data-density={density}
	data-color={color}
	data-direction={resolvedDirection}
	data-zoom={zoom}
	data-loading={loading || undefined}
	data-disabled={disabled || undefined}
	class={classes.root({
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
			{density}
			{color}
			{disabled}
			{stickyHeader}
			{scrollMode}
			{classes}
			{header}
			{actions}
		/>
	{/if}
	<GanttChartShell
		{chart}
		{snapshot}
		{messages}
		{density}
		{color}
		direction={resolvedDirection}
		{loading}
		{disabled}
		{showGrid}
		bind:gridWidth
		{minGridWidth}
		{maxGridWidth}
		{rowHeight}
		{overscan}
		{scrollMode}
		{scrollbars}
		{columns}
		interactions={resolvedInteractions}
		touchActivation={resolvedTouchActivation}
		{scales}
		{validRange}
		{initialScrollDate}
		{holidays}
		{showTodayIndicator}
		{showWeekends}
		display={resolvedDisplay}
		{resourceView}
		locale={resolvedLocale}
		{timeZone}
		{classes}
		snippets={{
			gridHeader,
			columnHeader,
			treeCell,
			taskRow,
			timeHeaderUpper,
			timeHeaderLower,
			task,
			summaryTask,
			milestone,
			taskLabel,
			taskTooltip,
			dependencyTooltip,
			progress,
			baseline,
			deadline,
			nonWorkingTime,
			resourceAssignments,
			workloadCell,
			dragPreview,
			empty,
			loadingContent
		}}
		{onTaskClick}
		{onTaskDoubleClick}
		{onDependencyClick}
	/>
	<div
		id={chart.a11y.liveRegionId}
		data-gantt-chart-part="live-region"
		class={classes.liveRegion({ density, color, disabled })}
		aria-live="polite"
		aria-atomic="true"
	>
		{chart.a11y.announcement}
	</div>
	<div id={chart.a11y.instructionsId} class="sr-only">
		{messages.ganttChartKeyboardInstructions}
	</div>
</div>
