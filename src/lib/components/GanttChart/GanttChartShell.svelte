<script lang="ts" module>
	function validateGridMetrics(
		gridWidth: number,
		minGridWidth: number,
		maxGridWidth: number,
		rowHeight: number
	): void {
		if (
			Number.isFinite(gridWidth) &&
			Number.isFinite(minGridWidth) &&
			Number.isFinite(maxGridWidth) &&
			Number.isFinite(rowHeight) &&
			minGridWidth > 0 &&
			gridWidth >= minGridWidth &&
			maxGridWidth >= gridWidth &&
			rowHeight >= 24
		) {
			return;
		}
		throw new RangeError(
			'gridWidth must be within positive minGridWidth/maxGridWidth bounds and rowHeight must be at least 24.'
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
	import { caretDownIcon } from '$lib/components/Icons/caretDown.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import Resizable from '$lib/components/Resizable/Resizable.svelte';
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type {
		GanttEmptyPayload,
		GanttLoadingPayload,
		GanttSnapshot
	} from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttResolvedTaskNode, GanttSelection } from './ganttChart.types.js';
	import type { Snippet } from 'svelte';

	type ShellSnippets = {
		empty?: Snippet<[GanttEmptyPayload]>;
		loadingContent?: Snippet<[GanttLoadingPayload]>;
	};

	let {
		chart,
		snapshot,
		messages,
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
		scrollMode,
		scrollbars,
		classes,
		snippets
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		snapshot: GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		messages: Messages;
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
		scrollMode: 'contained' | 'page';
		scrollbars: 'custom' | 'native';
		classes: GanttChartClasses;
		snippets: ShellSnippets;
	} = $props();

	let containerWidth = $state(0);
	let panelSizes = $state([38, 62]);
	let lastPublishedGridWidth = $state(gridWidth);
	const visibleTasks = $derived(snapshot.resolvedTasks.filter((node) => node.isVisible));
	const contentHeight = $derived(Math.max(rowHeight * visibleTasks.length, rowHeight * 6));
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
		validateGridMetrics(gridWidth, minGridWidth, maxGridWidth, rowHeight);
		if (containerWidth <= 0 || gridWidth === lastPublishedGridWidth) return;
		panelSizes = resolvePanelSizes(gridWidth, minGridWidth, maxGridWidth, containerWidth);
	});

	function publishGridWidth(sizes: number[]): void {
		if (containerWidth <= 0) return;
		const nextWidth = Math.round((sizes[0] / 100) * containerWidth);
		if (nextWidth === gridWidth) return;
		lastPublishedGridWidth = nextWidth;
		gridWidth = nextWidth;
	}

	function selectTask(taskId: string): void {
		if (disabled || loading) return;
		chart.select({ kind: 'task', taskId, dependencyId: null, cell: null });
	}

	function isTaskSelected(selection: GanttSelection, taskId: string): boolean {
		return (
			(selection.kind === 'task' && selection.taskId === taskId) ||
			(selection.kind === 'cell' && selection.taskId === taskId)
		);
	}
</script>

<div
	bind:clientWidth={containerWidth}
	data-gantt-chart-part="content"
	data-scroll-mode={scrollMode}
	data-scrollbars={scrollbars}
	data-empty={visibleTasks.length === 0 || undefined}
	data-loading={loading || undefined}
	aria-busy={loading}
	class={classes.content({ density, color, disabled })}
	style:--gantt-row-height={`${rowHeight}px`}
>
	{#if scrollMode === 'contained' && scrollbars === 'custom'}
		<ScrollArea class="h-full" ariaLabel={messages.ganttChartScrollableContent} type="hover">
			{@render splitContent()}
		</ScrollArea>
	{:else}
		<div
			class={scrollMode === 'contained'
				? 'relative h-full min-h-0 overflow-y-auto overflow-x-hidden'
				: 'relative min-h-0 overflow-visible'}
			role="group"
			aria-label={messages.ganttChartScrollableContent}
		>
			{@render splitContent()}
		</div>
	{/if}

	{#if visibleTasks.length === 0}
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
			class={classes.loading({ density, color, disabled })}
			role="status"
			aria-live="polite"
		>
			<Slot render={snippets.loadingContent ?? defaultLoading} payload={loadingPayload} />
		</div>
	{/if}
</div>

{#snippet splitContent()}
	<div class="relative min-h-full min-w-0" inert={loading ? true : undefined}>
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
	<div
		data-gantt-chart-part="grid-pane"
		class={classes.gridPane({ density, color, disabled })}
		role="treegrid"
		aria-label={messages.ganttChartGrid}
		aria-rowcount={visibleTasks.length}
		aria-colcount="2"
	>
		<div
			data-gantt-chart-part="grid-header"
			class={classes.gridHeader({ density, color, disabled })}
			role="row"
		>
			<div class="w-16 shrink-0 px-2" role="columnheader">{messages.ganttChartColumnWbs}</div>
			<div class="min-w-0 flex-1 px-2" role="columnheader">
				{messages.ganttChartColumnTitle}
			</div>
		</div>
		<div
			data-gantt-chart-part="rows"
			class={classes.rows({ density, color, disabled })}
			style:height={`${contentHeight}px`}
		>
			{#each visibleTasks as node, rowIndex (node.taskId)}
				<div
					data-gantt-chart-part="row"
					data-task-id={node.taskId}
					class={classes.row({
						density,
						color,
						disabled,
						selected: isTaskSelected(snapshot.selection, node.taskId)
					})}
					style:top={`${rowIndex * rowHeight}px`}
					role="row"
					aria-rowindex={rowIndex + 1}
				>
					<div
						class={classes.treeCell({ density, color, disabled })}
						role="gridcell"
						aria-colindex="1"
						style:width="4rem"
					>
						{node.wbs}
					</div>
					<div
						class={classes.treeCell({ density, color, disabled })}
						role="gridcell"
						aria-colindex="2"
						aria-selected={isTaskSelected(snapshot.selection, node.taskId)}
						style:padding-inline-start={`${8 + node.depth * 16}px`}
					>
						{#if node.type === 'summary'}
							<button
								type="button"
								class={classes.expander({ density, color, disabled })}
								aria-label={node.isExpanded
									? messages.ganttChartCollapseTask(node.task.title)
									: messages.ganttChartExpandTask(node.task.title)}
								aria-expanded={node.isExpanded}
								{disabled}
								onclick={() => chart.toggleTask(node.taskId)}
							>
								{@render (node.isExpanded ? caretDownIcon : caretRightIcon)({ size: 12 })}
							</button>
						{:else}
							<span class="size-6 shrink-0" aria-hidden="true"></span>
						{/if}
						<button
							type="button"
							class="min-w-0 flex-1 truncate text-start outline-none focus-visible:underline"
							aria-label={messages.ganttChartTaskLabel(node.task.title, node.wbs)}
							{disabled}
							onclick={() => selectTask(node.taskId)}
						>
							{node.task.title}
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
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
		<div
			class="relative min-w-full overflow-x-auto overflow-y-hidden"
			style:height={`${contentHeight}px`}
		>
			<div
				data-gantt-chart-part="timeline-rows"
				class={classes.timelineRows({ density, color, disabled })}
				style:height={`${contentHeight}px`}
			>
				{#each visibleTasks as node, rowIndex (node.taskId)}
					{@render timelineRow(node, rowIndex)}
				{/each}
			</div>
		</div>
	</div>
{/snippet}

{#snippet timelineRow(node: GanttResolvedTaskNode<TTaskFields>, rowIndex: number)}
	<div
		data-gantt-chart-part="timeline-row"
		data-task-id={node.taskId}
		class={classes.timelineRow({
			density,
			color,
			disabled,
			selected: isTaskSelected(snapshot.selection, node.taskId)
		})}
		style:top={`${rowIndex * rowHeight}px`}
		aria-hidden="true"
	></div>
{/snippet}

{#snippet defaultEmpty()}
	<div class="text-sm text-neutral/65">{messages.ganttChartEmpty}</div>
{/snippet}

{#snippet defaultLoading()}
	<Spinner text={messages.ganttChartLoading} />
{/snippet}
