<script lang="ts" module>
	function resolveDensityHeaderHeight(density: 'small' | 'normal' | 'large'): number {
		if (density === 'small') return 40;
		if (density === 'large') return 56;
		return 48;
	}

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
	import type { Density } from '$lib/types/theme.js';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { get } from 'svelte/store';
	import GanttTimeline from './GanttTimeline.svelte';
	import GanttTreeGrid from './GanttTreeGrid.svelte';
	import { resolveGanttColumns } from './ganttChart.columns.js';
	import type { GanttEmptyPayload, GanttLoadingPayload } from './ganttChart.props.js';
	import { resolveGanttResourceView } from './ganttChart.resourceView.js';
	import { resolveGanttRows, type GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttSortDirection } from './ganttChart.types.js';

	let {
		chart
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	} = $props();

	let containerWidth = $state(0);
	let containerHeight = $state(0);
	let panelSizes = $state([38, 62]);
	let viewportRef = $state<HTMLDivElement | null>(null);
	let pageScrollElement = $state<HTMLElement | null>(null);
	let pageScrollMargin = $state(0);
	let measuredScheduleHeader = $state<Readonly<{ density: Density; height: number }> | undefined>();
	const scheduleHeaderHeight = $derived.by(() => {
		const measuredHeader = measuredScheduleHeader;
		return measuredHeader?.density === chart.density
			? measuredHeader.height
			: resolveDensityHeaderHeight(chart.density);
	});
	let sortOverrides = $state<Record<string, GanttSortDirection | null>>({});
	const baseColumns = $derived(resolveGanttColumns(chart.columns));
	const resolvedColumns = $derived(
		baseColumns.map((column) =>
			Object.prototype.hasOwnProperty.call(sortOverrides, column.id)
				? { ...column, sortDirection: sortOverrides[column.id] }
				: column
		)
	);
	const resolvedResourceView = $derived(
		resolveGanttResourceView(
			chart.resourceView,
			chart.schedule.model.resources,
			chart.schedule.model.resourceHierarchy
		)
	);
	const rowModel = $derived(
		resolveGanttRows({
			nodes: chart.schedule.resolvedTasks,
			columns: resolvedColumns,
			dependencies: chart.dependencies,
			resources: chart.resources,
			assignments: chart.assignments,
			resourceView: resolvedResourceView
		})
	);
	$effect(() => {
		chart.a11y.setNavigationModel(
			rowModel.rows.map((node) => node.taskId),
			rowModel.visibleColumns.map((column) => column.id),
			chart.schedule.analysis.dependencies.map((dependency) => dependency.dependency.id),
			chart.rowHeight
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
		const mode = chart.scrollMode;
		const layoutWidth = containerWidth;
		const layoutHeight = containerHeight;
		const headerHeight = scheduleHeaderHeight;
		const estimate = chart.rowHeight;
		const extra = chart.overscan;
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
		const mode = chart.scrollMode;
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
		const currentDensity = chart.density;
		void layoutWidth;
		const header = viewport?.querySelector<HTMLElement>(
			'[data-gantt-chart-part="grid-header"], [data-gantt-chart-part="time-header"]'
		);
		const height = header?.getBoundingClientRect().height;
		const measuredHeader = measuredScheduleHeader;
		if (
			height &&
			(!measuredHeader ||
				measuredHeader.density !== currentDensity ||
				measuredHeader.height !== height)
		) {
			measuredScheduleHeader = { density: currentDensity, height };
		}
	});

	const virtualRows = $derived($rowVirtualizerStore.getVirtualItems());
	const fallbackRowCount = $derived(
		Math.min(
			rowModel.rows.length,
			Math.ceil(
				((chart.scrollMode === 'page'
					? pageScrollElement?.clientHeight
					: viewportRef?.clientHeight) ?? chart.rowHeight * 10) / chart.rowHeight
			) + chart.overscan
		)
	);
	const renderedRows = $derived.by((): readonly GanttVirtualRow[] => {
		if (virtualRows.length > 0) {
			const offset = chart.scrollMode === 'page' ? pageScrollMargin : 0;
			return virtualRows.map((row) => ({
				...row,
				start: row.start - offset,
				end: row.end - offset
			}));
		}
		return Array.from({ length: fallbackRowCount }, (_, index) => ({
			index,
			key: rowModel.rows[index]?.taskId ?? index,
			start: index * chart.rowHeight,
			end: (index + 1) * chart.rowHeight,
			size: chart.rowHeight
		}));
	});
	const totalRowsHeight = $derived(
		$rowVirtualizerStore.getTotalSize() || rowModel.rows.length * chart.rowHeight
	);
	const contentHeight = $derived(Math.max(totalRowsHeight, chart.rowHeight * 6));
	const workloadPanelHeight = $derived(
		chart.display.workload && resolvedResourceView.resources.length > 0
			? resolvedResourceView.workloadHeight
			: 0
	);
	const emptyPayload = $derived<GanttEmptyPayload>({
		visibleRange: chart.visibleRange,
		zoom: chart.zoom,
		defaultContent: defaultEmpty
	});
	const loadingPayload = $derived<GanttLoadingPayload>({
		visibleRange: chart.visibleRange,
		zoom: chart.zoom,
		defaultContent: defaultLoading
	});

	$effect.pre(() => {
		validateGridMetrics(
			chart.gridWidth,
			chart.minGridWidth,
			chart.maxGridWidth,
			chart.rowHeight,
			chart.overscan
		);
		if (containerWidth <= 0) return;
		panelSizes = resolvePanelSizes(
			chart.gridWidth,
			chart.minGridWidth,
			chart.maxGridWidth,
			containerWidth
		);
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
		if (nextWidth === chart.gridWidth) return;
		chart.gridWidth = nextWidth;
	}

	function toggleSort(columnId: string, additive: boolean): void {
		const column = resolvedColumns.find((candidate) => candidate.id === columnId);
		if (!column?.sortable || chart.disabled) return;
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
	data-scroll-mode={chart.scrollMode}
	data-scrollbars="custom"
	data-empty={rowModel.rows.length === 0 || undefined}
	data-loading={chart.loading || undefined}
	aria-busy={chart.loading}
	class={chart.classes.content(chart.themeVariants)}
	style:--gantt-row-height={`${chart.rowHeight}px`}
	style:--gantt-min-grid-width={`${chart.minGridWidth}px`}
	style:--gantt-max-grid-width={`${chart.maxGridWidth}px`}
>
	{#if chart.scrollMode === 'contained'}
		<ScrollArea
			bind:viewportRef
			class="h-full"
			ariaLabel={chart.messages.ganttChartScrollableContent}
			type="hover"
		>
			{@render splitContent()}
		</ScrollArea>
	{:else}
		<div
			bind:this={viewportRef}
			class="relative min-h-0 overflow-visible"
			role="group"
			aria-label={chart.messages.ganttChartScrollableContent}
		>
			{@render splitContent()}
		</div>
	{/if}

	{#if rowModel.rows.length === 0}
		<div
			data-gantt-chart-part="empty"
			class={chart.classes.empty(chart.themeVariants)}
			role="status"
			aria-live="polite"
		>
			<Empty>
				<Slot render={chart.renderers?.empty ?? defaultEmpty} payload={emptyPayload} />
			</Empty>
		</div>
	{/if}

	{#if chart.loading}
		<div
			data-gantt-chart-part="loading"
			class={chart.classes.loading({
				...chart.themeVariants,
				class: 'pointer-events-none'
			})}
			role="status"
			aria-live="polite"
		>
			<Slot render={chart.renderers?.loadingContent ?? defaultLoading} payload={loadingPayload} />
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
		{#if chart.showGrid}
			<Resizable
				bind:sizes={panelSizes}
				orientation="horizontal"
				dir={chart.direction}
				showLines
				panels={[
					{
						id: 'gantt-grid',
						content: gridPane,
						class: 'overflow-visible',
						defaultSize: panelSizes[0],
						minSize: resolveMinimumPercent(chart.minGridWidth, containerWidth),
						maxSize: resolveMaximumPercent(chart.maxGridWidth, containerWidth)
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
				theme={{ handle: { base: chart.classes.splitter(chart.themeVariants) } }}
				getHandleAriaLabel={() => chart.messages.ganttChartResizePanels}
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
		onToggleSort={toggleSort}
		{scrollToRow}
	/>
{/snippet}

{#snippet timelinePane()}
	<GanttTimeline
		{chart}
		{rowModel}
		{renderedRows}
		totalHeight={contentHeight}
		resourceView={resolvedResourceView}
	/>
{/snippet}

{#snippet defaultEmpty()}
	<div class="text-neutral/65">{chart.messages.ganttChartEmpty}</div>
{/snippet}

{#snippet defaultLoading()}
	<Spinner text={chart.messages.ganttChartLoading} size={chart.size} />
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
