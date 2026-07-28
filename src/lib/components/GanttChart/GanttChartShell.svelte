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
	import GanttTreeGrid from './GanttTreeGrid.svelte';
	import { resolveGanttColumns } from './ganttChart.columns.js';
	import type {
		GanttColumnHeaderPayload,
		GanttEmptyPayload,
		GanttGridHeaderPayload,
		GanttLoadingPayload,
		GanttSnapshot,
		GanttTaskRowPayload,
		GanttTreeCellPayload
	} from './ganttChart.props.js';
	import { resolveGanttRows, type GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttColumnDefinition,
		GanttInteractions,
		GanttSortDirection
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
		classes,
		snippets
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
		scrollMode: 'contained' | 'page';
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
		classes: GanttChartClasses;
		snippets: ShellSnippets;
	} = $props();

	let containerWidth = $state(0);
	let panelSizes = $state([38, 62]);
	let lastPublishedGridWidth = $state(gridWidth);
	let viewportRef = $state<HTMLDivElement | null>(null);
	let sortOverrides = $state<Record<string, GanttSortDirection | null>>({});
	const baseColumns = $derived(resolveGanttColumns(columns));
	const resolvedColumns = $derived(
		baseColumns.map((column) =>
			Object.prototype.hasOwnProperty.call(sortOverrides, column.id)
				? { ...column, sortDirection: sortOverrides[column.id] }
				: column
		)
	);
	const rowModel = $derived(
		resolveGanttRows({
			nodes: snapshot.resolvedTasks,
			columns: resolvedColumns,
			dependencies: snapshot.dependencies,
			resources: snapshot.resources,
			assignments: snapshot.assignments
		})
	);
	const rowVirtualizerStore = createVirtualizer<HTMLDivElement, HTMLElement>({
		count: 0,
		getScrollElement: () => null,
		estimateSize: () => 36,
		overscan: 6
	});

	$effect(() => {
		const rows = rowModel.rows;
		const scrollElement = viewportRef;
		const estimate = rowHeight;
		const extra = overscan;
		get(rowVirtualizerStore).setOptions({
			count: rows.length,
			getScrollElement: () => scrollElement,
			estimateSize: () => estimate,
			overscan: extra,
			getItemKey: (index) => rows[index]?.taskId ?? index
		});
	});

	const virtualRows = $derived($rowVirtualizerStore.getVirtualItems());
	const fallbackRowCount = $derived(
		Math.min(
			rowModel.rows.length,
			Math.ceil((viewportRef?.clientHeight ?? rowHeight * 10) / rowHeight) + overscan
		)
	);
	const renderedRows = $derived.by((): readonly GanttVirtualRow[] => {
		if (virtualRows.length > 0) return virtualRows;
		return Array.from({ length: fallbackRowCount }, (_, index) => ({
			index,
			key: rowModel.rows[index]?.taskId ?? index,
			start: index * rowHeight,
			end: (index + 1) * rowHeight,
			size: rowHeight
		}));
	});
	const totalRowsHeight = $derived(
		get(rowVirtualizerStore).getTotalSize() || rowModel.rows.length * rowHeight
	);
	const contentHeight = $derived(Math.max(totalRowsHeight, rowHeight * 6));
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

	function isTaskSelected(taskId: string): boolean {
		return (
			(snapshot.selection.kind === 'task' && snapshot.selection.taskId === taskId) ||
			(snapshot.selection.kind === 'cell' && snapshot.selection.taskId === taskId)
		);
	}
</script>

<div
	bind:clientWidth={containerWidth}
	data-gantt-chart-part="content"
	data-scroll-mode={scrollMode}
	data-scrollbars={scrollbars}
	data-empty={rowModel.rows.length === 0 || undefined}
	data-loading={loading || undefined}
	aria-busy={loading}
	class={classes.content({ density, color, disabled })}
	style:--gantt-row-height={`${rowHeight}px`}
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
	<div class="relative min-h-full min-w-0" style:min-height={`${contentHeight + 56}px`}>
		{#if showGrid}
			<Resizable
				bind:sizes={panelSizes}
				orientation="horizontal"
				dir={direction}
				withHandle
				showLines
				panels={[
					{
						id: 'gantt-grid',
						content: gridPane,
						defaultSize: panelSizes[0],
						minSize: resolveMinimumPercent(minGridWidth, containerWidth),
						maxSize: resolveMaximumPercent(maxGridWidth, containerWidth)
					},
					{ id: 'gantt-timeline', content: timelinePane, defaultSize: panelSizes[1], minSize: 15 }
				]}
				class="min-h-full"
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
		{classes}
		{snippets}
		onToggleSort={toggleSort}
		{scrollToRow}
	/>
{/snippet}

{#snippet timelinePane()}
	<div
		data-gantt-chart-part="timeline-pane"
		class={classes.timelinePane({ density, color, disabled })}
		role="group"
		aria-label={messages.ganttChartTimeline}
	>
		<div
			data-gantt-chart-part="time-header"
			class={classes.timeHeader({ density, color, disabled })}
		>
			<div class="grid h-full place-items-center text-xs font-semibold text-neutral/70">
				{messages.ganttChartTimeline}
			</div>
		</div>
		<div class="relative min-w-full overflow-x-auto overflow-y-visible">
			<div
				data-gantt-chart-part="timeline-rows"
				class={classes.timelineRows({ density, color, disabled })}
				style:height={`${contentHeight}px`}
			>
				{#each renderedRows as virtualRow (virtualRow.key)}
					{@const node = rowModel.rows[virtualRow.index]}
					{#if node}
						<div
							data-gantt-chart-part="timeline-row"
							data-task-id={node.taskId}
							data-index={virtualRow.index}
							class={classes.timelineRow({
								density,
								color,
								disabled,
								selected: isTaskSelected(node.taskId)
							})}
							style:top={`${virtualRow.start}px`}
							aria-hidden="true"
						></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/snippet}

{#snippet defaultEmpty()}
	<div class="text-sm text-neutral/65">{messages.ganttChartEmpty}</div>
{/snippet}

{#snippet defaultLoading()}
	<Spinner text={messages.ganttChartLoading} />
{/snippet}
