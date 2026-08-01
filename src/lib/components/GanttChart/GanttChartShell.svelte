<script lang="ts" module>
	function validateGridMetrics(
		gridWidth: number,
		minGridWidth: number,
		maxGridWidth: number,
		rowHeight: number,
		overscan: number
	): void {
		if (
			Number.isFinite(gridWidth) &&
			Number.isFinite(minGridWidth) &&
			Number.isFinite(maxGridWidth) &&
			Number.isFinite(rowHeight) &&
			Number.isInteger(overscan) &&
			minGridWidth > 0 &&
			gridWidth >= minGridWidth &&
			maxGridWidth >= gridWidth &&
			rowHeight >= 24 &&
			overscan >= 0
		) {
			return;
		}
		throw new RangeError(
			'gridWidth must be within positive minGridWidth/maxGridWidth bounds, rowHeight must be at least 24, and overscan must be a non-negative integer.'
		);
	}

	function resolvePanelSizes(
		gridWidth: number,
		minGridWidth: number,
		maxGridWidth: number,
		containerWidth: number
	): number[] {
		const minimum = resolveMinimumPercent(minGridWidth, containerWidth);
		const maximum = resolveMaximumPercent(maxGridWidth, containerWidth);
		const gridPercent = Math.min(maximum, Math.max(minimum, (gridWidth / containerWidth) * 100));
		return [gridPercent, 100 - gridPercent];
	}

	function resolveMinimumPercent(minGridWidth: number, containerWidth: number): number {
		if (containerWidth <= 0) return 15;
		return Math.min(85, (minGridWidth / containerWidth) * 100);
	}

	function resolveMaximumPercent(maxGridWidth: number, containerWidth: number): number {
		if (containerWidth <= 0) return 85;
		return Math.max(15, Math.min(85, (maxGridWidth / containerWidth) * 100));
	}

	function findPageScrollElement(element: HTMLElement): HTMLElement {
		for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
			const overflowY = getComputedStyle(ancestor).overflowY;
			if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
				return ancestor;
			}
		}
		const scrollingElement = document.scrollingElement;
		if (scrollingElement instanceof HTMLElement) return scrollingElement;
		return document.documentElement;
	}

	function getPageScrollMargin(viewport: HTMLElement, scrollElement: HTMLElement): number {
		const scheduleHeader = viewport.querySelector<HTMLElement>(
			'[data-gantt-chart-part="grid-header"], [data-gantt-chart-part="time-header"]'
		);
		return (
			viewport.getBoundingClientRect().top -
			scrollElement.getBoundingClientRect().top +
			scrollElement.scrollTop +
			(scheduleHeader?.getBoundingClientRect().height ?? 56)
		);
	}
</script>

<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Empty from '$lib/components/Empty/Empty.svelte';
	import Resizable from '$lib/components/Resizable/Resizable.svelte';
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { get } from 'svelte/store';
	import GanttTimeline from './GanttTimeline.svelte';
	import GanttTreeGrid from './GanttTreeGrid.svelte';
	import { resolveGanttColumns } from './ganttChart.columns.js';
	import type {
		GanttColumnHeaderPayload,
		GanttEmptyPayload,
		GanttGridHeaderPayload,
		GanttLoadingPayload,
		GanttBaselinePayload,
		GanttDeadlinePayload,
		GanttDependencyTooltipPayload,
		GanttDisplayOptions,
		GanttDragPreviewPayload,
		GanttNonWorkingTimePayload,
		GanttProgressPayload,
		GanttResourceAssignmentsPayload,
		GanttResourceView,
		GanttSnapshot,
		GanttTaskLabelPayload,
		GanttTaskPayload,
		GanttTaskTooltipPayload,
		GanttTaskRowPayload,
		GanttTimeHeaderPayload,
		GanttTreeCellPayload,
		GanttWorkloadCellPayload
	} from './ganttChart.props.js';
	import { resolveGanttResourceView } from './ganttChart.resourceView.js';
	import { resolveGanttRows, type GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttColumnDefinition,
		GanttHoliday,
		GanttInteractions,
		GanttRange,
		GanttResolvedDependency,
		GanttScaleDefinition,
		GanttScrollMode,
		GanttSortDirection,
		GanttTouchActivation
	} from './ganttChart.types.js';
	import type { Snippet } from 'svelte';

	type ShellSnippets = {
		gridHeader?: Snippet<
			[GanttGridHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		columnHeader?: Snippet<
			[GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		treeCell?: Snippet<
			[GanttTreeCellPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		taskRow?: Snippet<[GanttTaskRowPayload<TTaskFields>]>;
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
		nonWorkingTime?: Snippet<[GanttNonWorkingTimePayload]>;
		resourceAssignments?: Snippet<
			[GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
		workloadCell?: Snippet<[GanttWorkloadCellPayload<TResourceFields>]>;
		dragPreview?: Snippet<[GanttDragPreviewPayload<TTaskFields>]>;
		empty?: Snippet<[GanttEmptyPayload]>;
		loadingContent?: Snippet<[GanttLoadingPayload]>;
	};

	let {
		chart,
		snapshot,
		messages,
		locale,
		timeZone,
		density,
		color,
		direction,
		loading,
		disabled,
		showGrid,
		gridWidth = $bindable(),
		minGridWidth,
		maxGridWidth,
		rowHeight,
		overscan,
		scrollMode,
		scrollbars,
		columns,
		interactions,
		touchActivation,
		scales,
		validRange,
		initialScrollDate,
		holidays,
		showTodayIndicator,
		showWeekends,
		display,
		resourceView,
		classes,
		snippets,
		onTaskClick,
		onTaskDoubleClick,
		onDependencyClick
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		snapshot: GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		loading: boolean;
		disabled: boolean;
		showGrid: boolean;
		gridWidth: number;
		minGridWidth: number;
		maxGridWidth: number;
		rowHeight: number;
		overscan: number;
		scrollMode: GanttScrollMode;
		scrollbars: 'custom' | 'native';
		columns:
			| readonly GanttColumnDefinition<
					TTaskFields,
					TDependencyFields,
					TResourceFields,
					TAssignmentFields
			  >[]
			| undefined;
		interactions: GanttInteractions;
		touchActivation: GanttTouchActivation;
		scales: readonly GanttScaleDefinition[];
		validRange: GanttRange | undefined;
		initialScrollDate: Date | undefined;
		holidays: readonly GanttHoliday[];
		showTodayIndicator: boolean;
		showWeekends: boolean;
		display: GanttDisplayOptions;
		resourceView: GanttResourceView | undefined;
		classes: GanttChartClasses;
		snippets: ShellSnippets;
		onTaskClick?: (task: (typeof snapshot.resolvedTasks)[number], event: MouseEvent) => void;
		onTaskDoubleClick?: (task: (typeof snapshot.resolvedTasks)[number], event: MouseEvent) => void;
		onDependencyClick?: (
			dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
			event: MouseEvent
		) => void;
	} = $props();

	let containerWidth = $state(0);
	let containerHeight = $state(0);
	let panelSizes = $state([38, 62]);
	let lastPublishedGridWidth = $state(gridWidth);
	let viewportRef = $state<HTMLDivElement | null>(null);
	let pageScrollElement = $state<HTMLElement | null>(null);
	let pageScrollMargin = $state(0);
	let scheduleHeaderHeight = $state(56);
	let sortOverrides = $state<Record<string, GanttSortDirection | null>>({});
	const baseColumns = $derived(resolveGanttColumns(columns));
	const resolvedColumns = $derived(
		baseColumns.map((column) =>
			Object.prototype.hasOwnProperty.call(sortOverrides, column.id)
				? { ...column, sortDirection: sortOverrides[column.id] }
				: column
		)
	);
	const resolvedResourceView = $derived(
		resolveGanttResourceView(
			resourceView,
			chart.schedule.model.resources,
			chart.schedule.model.resourceHierarchy
		)
	);
	const rowModel = $derived(
		resolveGanttRows({
			nodes: snapshot.resolvedTasks,
			columns: resolvedColumns,
			dependencies: snapshot.dependencies,
			resources: snapshot.resources,
			assignments: snapshot.assignments,
			resourceView: resolvedResourceView
		})
	);
	$effect(() => {
		chart.a11y.setNavigationModel(
			rowModel.rows.map((node) => node.taskId),
			rowModel.visibleColumns.map((column) => column.id),
			chart.schedule.analysis.dependencies.map((dependency) => dependency.dependency.id),
			rowHeight
		);
	});
	const rowVirtualizerStore = createVirtualizer<HTMLElement, HTMLElement>({
		count: 0,
		getScrollElement: () => null,
		estimateSize: () => 32,
		overscan: 6
	});

	$effect(() => {
		const rows = rowModel.rows;
		const viewport = viewportRef;
		const mode = scrollMode;
		const layoutWidth = containerWidth;
		const layoutHeight = containerHeight;
		const headerHeight = scheduleHeaderHeight;
		const estimate = rowHeight;
		const extra = overscan;
		void layoutWidth;
		void layoutHeight;
		void headerHeight;
		const scrollElement = mode === 'page' && viewport ? findPageScrollElement(viewport) : viewport;
		const scrollMargin =
			mode === 'page' && viewport && scrollElement
				? getPageScrollMargin(viewport, scrollElement)
				: 0;
		pageScrollElement = mode === 'page' ? scrollElement : null;
		pageScrollMargin = scrollMargin;
		get(rowVirtualizerStore).setOptions({
			count: rows.length,
			getScrollElement: () => scrollElement,
			estimateSize: () => estimate,
			overscan: extra,
			scrollMargin,
			getItemKey: (index) => rows[index]?.taskId ?? index
		});
	});

	$effect(() => {
		const mode = scrollMode;
		const scrollOwner = mode === 'page' ? pageScrollElement : viewportRef;
		if (!scrollOwner) return;
		return chart.interaction.connectVerticalScrollOwner(scrollOwner, mode);
	});

	$effect(() => {
		const rows = rowModel.rows;
		return chart.connectRowNavigation({
			scrollToTask(taskId, options) {
				const rowIndex = rows.findIndex((row) => row.taskId === taskId);
				if (rowIndex < 0) return false;
				get(rowVirtualizerStore).scrollToIndex(rowIndex, {
					align: options?.align ?? 'auto'
				});
				return true;
			}
		});
	});

	$effect(() => {
		const viewport = viewportRef;
		const layoutWidth = containerWidth;
		void layoutWidth;
		const header = viewport?.querySelector<HTMLElement>(
			'[data-gantt-chart-part="grid-header"], [data-gantt-chart-part="time-header"]'
		);
		const height = header?.getBoundingClientRect().height;
		if (height && height !== scheduleHeaderHeight) scheduleHeaderHeight = height;
	});

	const virtualRows = $derived($rowVirtualizerStore.getVirtualItems());
	const fallbackRowCount = $derived(
		Math.min(
			rowModel.rows.length,
			Math.ceil(
				((scrollMode === 'page' ? pageScrollElement?.clientHeight : viewportRef?.clientHeight) ??
					rowHeight * 10) / rowHeight
			) + overscan
		)
	);
	const renderedRows = $derived.by((): readonly GanttVirtualRow[] => {
		if (virtualRows.length > 0) {
			const offset = scrollMode === 'page' ? pageScrollMargin : 0;
			return virtualRows.map((row) => ({
				...row,
				start: row.start - offset,
				end: row.end - offset
			}));
		}
		return Array.from({ length: fallbackRowCount }, (_, index) => ({
			index,
			key: rowModel.rows[index]?.taskId ?? index,
			start: index * rowHeight,
			end: (index + 1) * rowHeight,
			size: rowHeight
		}));
	});
	const totalRowsHeight = $derived(
		$rowVirtualizerStore.getTotalSize() || rowModel.rows.length * rowHeight
	);
	const contentHeight = $derived(Math.max(totalRowsHeight, rowHeight * 6));
	const workloadPanelHeight = $derived(
		display.workload && resolvedResourceView.resources.length > 0
			? resolvedResourceView.workloadHeight
			: 0
	);
	const emptyPayload = $derived<GanttEmptyPayload>({
		visibleRange: snapshot.visibleRange,
		zoom: snapshot.zoom,
		defaultContent: defaultEmpty
	});
	const loadingPayload = $derived<GanttLoadingPayload>({
		visibleRange: snapshot.visibleRange,
		zoom: snapshot.zoom,
		defaultContent: defaultLoading
	});

	$effect.pre(() => {
		validateGridMetrics(gridWidth, minGridWidth, maxGridWidth, rowHeight, overscan);
		if (containerWidth <= 0 || gridWidth === lastPublishedGridWidth) return;
		panelSizes = resolvePanelSizes(gridWidth, minGridWidth, maxGridWidth, containerWidth);
	});

	$effect(() => {
		const validIds = new Set(baseColumns.map((column) => column.id));
		const entries = Object.entries(sortOverrides).filter(([columnId]) => validIds.has(columnId));
		if (entries.length === Object.keys(sortOverrides).length) return;
		sortOverrides = Object.fromEntries(entries);
	});

	function publishGridWidth(sizes: number[]): void {
		if (containerWidth <= 0) return;
		const nextWidth = Math.round((sizes[0] / 100) * containerWidth);
		if (nextWidth === gridWidth) return;
		lastPublishedGridWidth = nextWidth;
		gridWidth = nextWidth;
	}

	function toggleSort(columnId: string, additive: boolean): void {
		const column = resolvedColumns.find((candidate) => candidate.id === columnId);
		if (!column?.sortable || disabled) return;
		const current = column.sortDirection ?? null;
		const next = current === null ? 'ascending' : current === 'ascending' ? 'descending' : null;
		sortOverrides = {
			...(additive ? sortOverrides : {}),
			[columnId]: next
		};
	}

	function scrollToRow(rowIndex: number): void {
		get(rowVirtualizerStore).scrollToIndex(rowIndex, { align: 'auto' });
	}
</script>

<div
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	data-gantt-chart-part="content"
	data-scroll-mode={scrollMode}
	data-scrollbars={scrollbars}
	data-empty={rowModel.rows.length === 0 || undefined}
	data-loading={loading || undefined}
	aria-busy={loading}
	class={classes.content({ density, color, disabled })}
	style:--gantt-row-height={`${rowHeight}px`}
	style:--gantt-min-grid-width={`${minGridWidth}px`}
	style:--gantt-max-grid-width={`${maxGridWidth}px`}
>
	{#if scrollMode === 'contained' && scrollbars === 'custom'}
		<ScrollArea
			bind:viewportRef
			class="h-full"
			ariaLabel={messages.ganttChartScrollableContent}
			type="hover"
		>
			{@render splitContent()}
		</ScrollArea>
	{:else}
		<div
			bind:this={viewportRef}
			class={scrollMode === 'contained'
				? 'relative h-full min-h-0 overflow-y-auto overflow-x-hidden'
				: 'relative min-h-0 overflow-visible'}
			role="group"
			aria-label={messages.ganttChartScrollableContent}
		>
			{@render splitContent()}
		</div>
	{/if}

	{#if rowModel.rows.length === 0}
		<div
			data-gantt-chart-part="empty"
			class={classes.empty({ density, color, disabled })}
			role="status"
			aria-live="polite"
		>
			<Empty>
				<Slot render={snippets.empty ?? defaultEmpty} payload={emptyPayload} />
			</Empty>
		</div>
	{/if}

	{#if loading}
		<div
			data-gantt-chart-part="loading"
			class={classes.loading({ density, color, disabled, class: 'pointer-events-none' })}
			role="status"
			aria-live="polite"
		>
			<Slot render={snippets.loadingContent ?? defaultLoading} payload={loadingPayload} />
		</div>
	{/if}
</div>

{#snippet splitContent()}
	<div
		class="relative min-h-full min-w-0"
		style:width={containerWidth > 0 ? `${containerWidth}px` : '100%'}
		style:height={`${Math.max(containerHeight, contentHeight + scheduleHeaderHeight + workloadPanelHeight)}px`}
		style:contain="inline-size"
	>
		{#if showGrid}
			<Resizable
				bind:sizes={panelSizes}
				orientation="horizontal"
				dir={direction}
				showLines
				panels={[
					{
						id: 'gantt-grid',
						content: gridPane,
						class: 'overflow-visible',
						defaultSize: panelSizes[0],
						minSize: resolveMinimumPercent(minGridWidth, containerWidth),
						maxSize: resolveMaximumPercent(maxGridWidth, containerWidth)
					},
					{
						id: 'gantt-timeline',
						content: timelinePane,
						class: 'overflow-visible',
						defaultSize: panelSizes[1],
						minSize: 15
					}
				]}
				class="min-h-full overflow-visible"
				theme={{ handle: { base: classes.splitter({ density, color, disabled }) } }}
				getHandleAriaLabel={() => messages.ganttChartResizePanels}
				onLayoutChanged={(sizes, meta) => {
					if (meta.isUserInteraction) publishGridWidth(sizes);
				}}
			/>
		{:else}
			{@render timelinePane()}
		{/if}
	</div>
{/snippet}

{#snippet gridPane()}
	<GanttTreeGrid
		{chart}
		{rowModel}
		{renderedRows}
		totalHeight={contentHeight}
		selection={snapshot.selection}
		{messages}
		{locale}
		{timeZone}
		{density}
		{color}
		{direction}
		{disabled}
		{loading}
		{interactions}
		{touchActivation}
		{classes}
		{snippets}
		onToggleSort={toggleSort}
		{scrollToRow}
	/>
{/snippet}

{#snippet timelinePane()}
	<GanttTimeline
		{chart}
		{snapshot}
		{rowModel}
		{renderedRows}
		totalHeight={contentHeight}
		{rowHeight}
		{scales}
		{validRange}
		{initialScrollDate}
		{holidays}
		{showTodayIndicator}
		{showWeekends}
		{display}
		resourceView={resolvedResourceView}
		{messages}
		{locale}
		{timeZone}
		{density}
		{color}
		{direction}
		{disabled}
		{scrollbars}
		{classes}
		{snippets}
		{onTaskClick}
		{onTaskDoubleClick}
		{onDependencyClick}
	/>
{/snippet}

{#snippet defaultEmpty()}
	<div class="text-sm text-neutral/65">{messages.ganttChartEmpty}</div>
{/snippet}

{#snippet defaultLoading()}
	<Spinner text={messages.ganttChartLoading} />
{/snippet}

<style>
	:global(
		[data-gantt-chart-part='content']
			> [data-scroll-area]
			> [data-scroll-area-viewport]
			> [data-scroll-area-content]
	) {
		height: 100%;
	}

	:global([data-gantt-chart-part='content'] [data-panel='gantt-grid']) {
		min-width: min(var(--gantt-min-grid-width), 85%);
		max-width: min(var(--gantt-max-grid-width), 85%);
	}
</style>
