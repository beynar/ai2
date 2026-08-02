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
	import type { GanttChartProps } from './ganttChart.props.js';
	import { EMPTY_GANTT_SELECTION, GanttChartState } from './ganttChart.state.svelte.js';
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
		get resourceDefinitions() {
			return resources;
		},
		get assignments() {
			return assignments;
		},
		set assignments(value) {
			assignments = value;
		},
		get calendarDefinitions() {
			return calendars;
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
		get gridWidth() {
			return gridWidth;
		},
		set gridWidth(value) {
			gridWidth = value;
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
		get size() {
			return size;
		},
		get density() {
			return density;
		},
		get classes() {
			return classes;
		},
		rootId,
		get loading() {
			return loading;
		},
		get disabled() {
			return disabled;
		},
		get scheduleOptions() {
			return schedule;
		},
		get timelineOptions() {
			return timeline;
		},
		get layoutOptions() {
			return layout;
		},
		get interactionOptions() {
			return interactions;
		},
		get mutationPolicy() {
			return mutations;
		},
		get eventHandlers() {
			return events;
		},
		get renderers() {
			return render;
		}
	});

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
	data-size={chart.size}
	data-density={chart.density}
	data-color={chart.color}
	data-direction={chart.direction}
	data-zoom={chart.zoom}
	data-loading={chart.loading || undefined}
	data-disabled={chart.disabled || undefined}
	class={chart.classes.root({
		...chart.themeVariants,
		class: [chart.scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden', className]
	})}
>
	{#if chart.showHeader}
		<GanttChartHeader {chart} />
	{/if}
	<GanttChartShell {chart} />
	<div
		id={chart.a11y.liveRegionId}
		data-gantt-chart-part="live-region"
		class={chart.classes.liveRegion(chart.themeVariants)}
		aria-live="polite"
		aria-atomic="true"
	>
		{chart.a11y.announcement}
	</div>
	<div id={chart.a11y.instructionsId} class="sr-only">
		{chart.messages.ganttChartKeyboardInstructions}
	</div>
</div>
