<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density, Sizes } from '$lib/types/theme.js';
	import { onMount, tick, untrack, type Snippet } from 'svelte';
	import GanttTimeHeader from './GanttTimeHeader.svelte';
	import GanttTimelineRows from './GanttTimelineRows.svelte';
	import GanttWorkloadPanel from './GanttWorkloadPanel.svelte';
	import { getCalendarRuntime } from './ganttChart.calendar.js';
	import { GanttChartError } from './ganttChart.error.js';
	import { resolveGanttTimeShades } from './ganttChart.layout.js';
	import type {
		GanttDisplayOptions,
		GanttDragPreviewPayload,
		GanttSnapshot,
		GanttTimeHeaderPayload,
		GanttTaskPayload,
		GanttTaskLabelPayload,
		GanttTaskTooltipPayload,
		GanttDependencyTooltipPayload,
		GanttProgressPayload,
		GanttBaselinePayload,
		GanttDeadlinePayload,
		GanttNonWorkingTimePayload,
		GanttResourceAssignmentsPayload,
		GanttWorkloadCellPayload
	} from './ganttChart.props.js';
	import type { GanttResolvedResourceView } from './ganttChart.resourceView.js';
	import type { GanttRowModel, GanttVirtualRow } from './ganttChart.rows.js';
	import {
		createGanttTimeScale,
		getGanttScaleInstantAtPixel,
		getGanttScrollLeft,
		getGanttVisibleRange
	} from './ganttChart.scale.js';
	import type { GanttChartState, GanttTimelineNavigation } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttHoliday,
		GanttRange,
		GanttResolvedDependency,
		GanttScaleDefinition,
		GanttZoomLevel
	} from './ganttChart.types.js';

	type TimelineSnippets = {
		timeHeaderUpper?: Snippet<[GanttTimeHeaderPayload]>;
		timeHeaderLower?: Snippet<[GanttTimeHeaderPayload]>;
		task?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		summaryTask?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		milestone?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		taskLabel?: Snippet<[GanttTaskLabelPayload<TTaskFields>]>;
		taskTooltip?: Snippet<
			[GanttTaskTooltipPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
		dependencyTooltip?: Snippet<[GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>]>;
		progress?: Snippet<[GanttProgressPayload<TTaskFields>]>;
		baseline?: Snippet<[GanttBaselinePayload<TTaskFields>]>;
		deadline?: Snippet<[GanttDeadlinePayload<TTaskFields>]>;
		resourceAssignments?: Snippet<
			[GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
		workloadCell?: Snippet<[GanttWorkloadCellPayload<TResourceFields>]>;
		nonWorkingTime?: Snippet<[GanttNonWorkingTimePayload]>;
		dragPreview?: Snippet<[GanttDragPreviewPayload<TTaskFields>]>;
	};

	let {
		chart,
		snapshot,
		rowModel,
		renderedRows,
		totalHeight,
		rowHeight,
		scales,
		validRange,
		holidays,
		showTodayIndicator,
		showWeekends,
		display,
		resourceView,
		messages,
		locale,
		timeZone,
		size,
		density,
		color,
		direction,
		disabled,
		classes,
		snippets,
		onTaskClick,
		onTaskDoubleClick,
		onDependencyClick
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		snapshot: GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		rowModel: GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		renderedRows: readonly GanttVirtualRow[];
		totalHeight: number;
		rowHeight: number;
		scales: readonly GanttScaleDefinition[];
		validRange: GanttRange | undefined;
		holidays: readonly GanttHoliday[];
		showTodayIndicator: boolean;
		showWeekends: boolean;
		display: GanttDisplayOptions;
		resourceView: GanttResolvedResourceView<TResourceFields>;
		messages: Messages;
		locale: string;
		timeZone: string;
		size: Sizes;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		classes: GanttChartClasses;
		snippets: TimelineSnippets;
		onTaskClick?: (task: (typeof snapshot.resolvedTasks)[number], event: MouseEvent) => void;
		onTaskDoubleClick?: (task: (typeof snapshot.resolvedTasks)[number], event: MouseEvent) => void;
		onDependencyClick?: (
			dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
			event: MouseEvent
		) => void;
	} = $props();

	let horizontalViewport = $state<HTMLDivElement | null>(null);
	let viewportWidth = $state(0);
	let scrollLeft = $state(0);
	let now = $state<Date | null>(null);
	let isMounted = $state(false);
	let pendingAnchor = $state<Readonly<{ date: Date; offset: number }> | null>(null);
	let lastScaleKey = $state('');
	let lastViewportWidth = $state(0);
	let lastPublishedRange = $state<GanttRange | null>(null);
	let visibleRangeFrame: number | null = null;
	let pinchZoomIdleTimer: ReturnType<typeof setTimeout> | null = null;
	let isPinchZoomLocked = false;
	const PINCH_ZOOM_IDLE_MS = 180;
	const FIT_PROJECT_EDGE_INSET = 16;
	const fallbackViewportWidth = 960;
	const effectiveViewportWidth = $derived(viewportWidth || fallbackViewportWidth);
	const fitProjectWidth = $derived(
		Math.max(1, effectiveViewportWidth - FIT_PROJECT_EDGE_INSET * 2)
	);
	const projectRange = $derived(chart.schedule.analysis.projectRange);
	const emptyCanvasRange = untrack(() => snapshot.visibleRange);
	let projectCanvasRange = $state<GanttRange | null>(
		untrack(() => (projectRange ? cloneRange(projectRange) : null))
	);
	let fittedProjectRange = $state<GanttRange | null>(null);
	const canvasSourceRange = $derived(validRange ?? projectCanvasRange ?? emptyCanvasRange);
	const scale = $derived(
		createGanttTimeScale({
			range: canvasSourceRange,
			zoom: snapshot.zoom,
			timeZone,
			locale,
			direction,
			scales,
			minimumWidth: fittedProjectRange ? fitProjectWidth : effectiveViewportWidth,
			pad: validRange === undefined,
			fitRange: fittedProjectRange ?? undefined
		})
	);
	const visiblePixels = $derived({
		start: Math.max(0, scrollLeft),
		end: Math.min(scale.totalWidth, scrollLeft + effectiveViewportWidth)
	});
	const visibleRange = $derived(
		getGanttVisibleRange(scale, visiblePixels.start, effectiveViewportWidth)
	);
	const projectCalendar = $derived(getCalendarRuntime(chart.schedule.model.projectCalendar));
	const shades = $derived(
		resolveGanttTimeShades({
			scale,
			visibleRange,
			projectCalendar,
			holidays,
			showWeekends,
			showNonWorkingTime: display.nonWorkingTime
		})
	);
	const resolvedDependencies = $derived(
		chart.schedule.analysis.dependencies as readonly GanttResolvedDependency<
			TTaskFields,
			TDependencyFields
		>[]
	);
	const scaleKey = $derived(
		`${snapshot.zoom}:${scale.canvasRange.start.getTime()}:${scale.canvasRange.end.getTime()}:${scale.totalWidth}:${direction}`
	);
	const workloadPanelHeight = $derived(
		display.workload && resourceView.resources.length > 0 ? resourceView.workloadHeight : 0
	);

	const navigation: GanttTimelineNavigation = {
		fitProject: fitProjectInViewport,
		prepareZoom,
		scrollToDate
	};

	$effect(() => {
		if (validRange || !projectRange) return;
		if (!projectCanvasRange) {
			projectCanvasRange = cloneRange(projectRange);
			return;
		}
		const currentRange = untrack(() => projectCanvasRange);
		if (!currentRange) return;
		const nextStart = Math.min(currentRange.start.getTime(), projectRange.start.getTime());
		const nextEnd = Math.max(currentRange.end.getTime(), projectRange.end.getTime());
		if (nextStart === currentRange.start.getTime() && nextEnd === currentRange.end.getTime()) {
			return;
		}
		projectCanvasRange = { start: new Date(nextStart), end: new Date(nextEnd) };
	});

	$effect(() => {
		const key = scaleKey;
		if (!isMounted || !horizontalViewport || key === lastScaleKey) return;
		const anchorRange = untrack(() => lastPublishedRange ?? snapshot.visibleRange);
		const anchor = pendingAnchor ?? {
			date: new Date((anchorRange.start.getTime() + anchorRange.end.getTime()) / 2),
			offset: effectiveViewportWidth / 2
		};
		lastScaleKey = key;
		pendingAnchor = null;
		void tick().then(() => applyScrollAnchor(anchor));
	});

	$effect(() => {
		chart.interaction.reconcileScale(scale);
	});

	$effect(() => {
		const width = viewportWidth;
		if (!isMounted || width <= 0) return;
		const previousWidth = untrack(() => lastViewportWidth);
		lastViewportWidth = width;
		if (previousWidth <= 0) {
			queueVisibleRangePublish();
			return;
		}
		const anchorRange = untrack(() => lastPublishedRange ?? snapshot.visibleRange);
		const anchor = {
			date: new Date((anchorRange.start.getTime() + anchorRange.end.getTime()) / 2),
			offset: width / 2
		};
		void tick().then(() => applyScrollAnchor(anchor));
	});

	onMount(() => {
		isMounted = true;
		now = new Date();
		lastScaleKey = scaleKey;
		const viewport = horizontalViewport;
		if (!viewport) {
			throw new GanttChartError(
				'invalid-operation',
				'GanttChart timeline mounted without its horizontal viewport.'
			);
		}
		const disconnectNavigation = chart.connectTimelineNavigation(navigation);
		const disconnectInteractions = chart.interaction.connectTimeline({
			get scale() {
				return scale;
			},
			viewport,
			get rowHeight() {
				return rowHeight;
			}
		});
		const initialAnchor = projectRange?.start ?? snapshot.visibleRange.start;
		void tick().then(() => {
			scrollToDate(initialAnchor, { align: 'start' });
		});
		return () => {
			isMounted = false;
			disconnectNavigation();
			disconnectInteractions();
			if (visibleRangeFrame !== null) cancelAnimationFrame(visibleRangeFrame);
			resetPinchZoomGesture();
		};
	});

	function handleScroll(): void {
		if (!horizontalViewport) return;
		scrollLeft = horizontalViewport.scrollLeft;
		queueVisibleRangePublish();
	}

	function handleWheel(event: WheelEvent): void {
		if (!horizontalViewport || disabled) return;
		if (chart.interaction.isActive) return;
		if (event.ctrlKey || event.metaKey) {
			event.preventDefault();
			if (event.deltaY === 0) return;
			holdPinchZoomGesture();
			if (isPinchZoomLocked) return;
			isPinchZoomLocked = true;
			const bounds = horizontalViewport.getBoundingClientRect();
			const offset = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
			const anchor = getGanttScaleInstantAtPixel(scale, scrollLeft + offset);
			pendingAnchor = { date: anchor, offset };
			if (event.deltaY < 0) chart.zoomIn(anchor);
			else if (event.deltaY > 0) chart.zoomOut(anchor);
			return;
		}
		if (!event.shiftKey || event.deltaX !== 0 || event.deltaY === 0) return;
		event.preventDefault();
		horizontalViewport.scrollLeft += event.deltaY;
	}

	function holdPinchZoomGesture(): void {
		if (pinchZoomIdleTimer !== null) clearTimeout(pinchZoomIdleTimer);
		pinchZoomIdleTimer = setTimeout(resetPinchZoomGesture, PINCH_ZOOM_IDLE_MS);
	}

	function resetPinchZoomGesture(): void {
		if (pinchZoomIdleTimer !== null) clearTimeout(pinchZoomIdleTimer);
		pinchZoomIdleTimer = null;
		isPinchZoomLocked = false;
	}

	function queueVisibleRangePublish(): void {
		if (visibleRangeFrame !== null) return;
		visibleRangeFrame = requestAnimationFrame(() => {
			visibleRangeFrame = null;
			const range = getGanttVisibleRange(scale, scrollLeft, effectiveViewportWidth);
			lastPublishedRange = range;
			chart.setVisibleRange(range);
		});
	}

	function scrollToDate(date: Date, options?: { align?: 'start' | 'center' | 'end' }): boolean {
		if (!horizontalViewport) return false;
		const nextScrollLeft = getGanttScrollLeft(scale, date, effectiveViewportWidth, options?.align);
		horizontalViewport.scrollLeft = nextScrollLeft;
		scrollLeft = nextScrollLeft;
		queueVisibleRangePublish();
		return true;
	}

	function prepareZoom(anchorDate: Date): void {
		fittedProjectRange = null;
		if (pendingAnchor?.date.getTime() === anchorDate.getTime()) return;
		pendingAnchor = { date: new Date(anchorDate), offset: effectiveViewportWidth / 2 };
	}

	function fitProjectInViewport(): boolean {
		if (!projectRange) return false;
		const center = new Date((projectRange.start.getTime() + projectRange.end.getTime()) / 2);
		const zoom = resolveFitZoom(projectRange);
		const isZoomChange = zoom !== snapshot.zoom;
		pendingAnchor = { date: center, offset: effectiveViewportWidth / 2 };
		if (!validRange) {
			projectCanvasRange = cloneRange(projectRange);
		}
		if (isZoomChange) chart.setZoom(zoom, center);
		fittedProjectRange = cloneRange(projectRange);
		if (!isZoomChange) void tick().then(() => applyScrollAnchor(pendingAnchor));
		return true;
	}

	function resolveFitZoom(range: GanttRange): GanttZoomLevel {
		const duration = range.end.getTime() - range.start.getTime();
		for (const zoom of chart.enabledZoomLevels) {
			const candidate = createGanttTimeScale({
				range,
				zoom,
				timeZone,
				locale,
				direction,
				scales,
				minimumWidth: 0,
				pad: false
			});
			if (duration * candidate.pixelsPerMillisecond <= fitProjectWidth) return zoom;
		}
		return chart.enabledZoomLevels.at(-1) ?? snapshot.zoom;
	}

	function applyScrollAnchor(anchor: Readonly<{ date: Date; offset: number }> | null): void {
		if (!anchor || !horizontalViewport) return;
		const pixel =
			scale.direction === 'rtl'
				? scale.totalWidth -
					(anchor.date.getTime() - scale.canvasRange.start.getTime()) * scale.pixelsPerMillisecond
				: (anchor.date.getTime() - scale.canvasRange.start.getTime()) * scale.pixelsPerMillisecond;
		const nextScrollLeft = Math.max(
			0,
			Math.min(scale.totalWidth - effectiveViewportWidth, pixel - anchor.offset)
		);
		horizontalViewport.scrollLeft = nextScrollLeft;
		scrollLeft = nextScrollLeft;
		queueVisibleRangePublish();
	}

	function cloneRange(range: GanttRange): GanttRange {
		return { start: new Date(range.start), end: new Date(range.end) };
	}
</script>

<div
	data-gantt-chart-part="timeline-pane"
	class={classes.timelinePane({ size, density, color, disabled })}
	role="group"
	aria-label={messages.ganttChartTimeline}
>
	<div
		class="sticky top-0 z-30 h-[var(--gantt-header-height)] overflow-x-clip bg-surface-raised/95 backdrop-blur"
		dir={direction}
	>
		<div
			style:width={`${scale.totalWidth}px`}
			style:transform={`translate3d(${-scrollLeft}px, 0, 0)`}
		>
			<GanttTimeHeader
				{scale}
				{visiblePixels}
				{viewportWidth}
				{size}
				{density}
				{color}
				{disabled}
				{classes}
				timeHeaderUpper={snippets.timeHeaderUpper}
				timeHeaderLower={snippets.timeHeaderLower}
			/>
		</div>
	</div>
	<div
		bind:clientWidth={viewportWidth}
		dir="ltr"
		data-gantt-chart-part="timeline-viewport"
		data-scrollbars="custom"
		data-compressed={scale.isCompressed || undefined}
		data-interaction-invalid={chart.interaction.isInvalid || undefined}
		data-visible-start={visibleRange.start.toISOString()}
		data-visible-end={visibleRange.end.toISOString()}
		class={classes.viewport({
			size,
			density,
			color,
			disabled,
			invalid: chart.interaction.isInvalid,
			class: 'h-auto'
		})}
		style:height={`${totalHeight + workloadPanelHeight}px`}
		onwheel={handleWheel}
	>
		<ScrollArea
			bind:viewportRef={horizontalViewport}
			class="h-full min-w-0"
			ariaLabel={messages.ganttChartTimeline}
			type="hover"
			onScroll={handleScroll}
		>
			<div
				class="relative overflow-x-clip"
				style:width={`${scale.totalWidth}px`}
				style:height={`${totalHeight + workloadPanelHeight}px`}
				dir={direction}
			>
				<GanttTimelineRows
					{chart}
					{rowModel}
					{renderedRows}
					{resolvedDependencies}
					resources={snapshot.resources}
					assignments={snapshot.assignments}
					workload={chart.schedule.workload}
					selection={snapshot.selection}
					{scale}
					{visibleRange}
					{visiblePixels}
					{viewportWidth}
					{totalHeight}
					{rowHeight}
					{shades}
					{projectRange}
					{now}
					{showTodayIndicator}
					showCritical={display.criticalPath}
					showBaselines={display.baselines}
					showDeadlines={display.deadlines}
					showConstraints={display.constraints}
					{messages}
					{locale}
					{timeZone}
					{size}
					{density}
					{color}
					{direction}
					{disabled}
					{classes}
					{snippets}
					{onTaskClick}
					{onTaskDoubleClick}
					{onDependencyClick}
				/>
				{#if workloadPanelHeight > 0}
					<GanttWorkloadPanel
						{resourceView}
						workload={chart.schedule.workload}
						{scale}
						{visiblePixels}
						{viewportWidth}
						height={workloadPanelHeight}
						{messages}
						{locale}
						{size}
						{density}
						{color}
						{direction}
						{disabled}
						{classes}
						workloadCell={snippets.workloadCell}
					/>
				{/if}
			</div>
		</ScrollArea>
	</div>
</div>
