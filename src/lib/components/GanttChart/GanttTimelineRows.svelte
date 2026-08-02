<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import type { Attachment } from 'svelte/attachments';
	import GanttDependencyLayer from './GanttDependencyLayer.svelte';
	import GanttDependencyPreview from './GanttDependencyPreview.svelte';
	import GanttDragPreview from './GanttDragPreview.svelte';
	import GanttTaskBar from './GanttTaskBar.svelte';
	import GanttTimeShadeLayer from './GanttTimeShadeLayer.svelte';
	import { positionGanttTask, type GanttTimeShade } from './ganttChart.layout.js';
	import { indexGanttOverAllocations } from './ganttChart.resourceView.js';
	import {
		getGanttScaleCells,
		getGanttScalePixel,
		type GanttTimeScale
	} from './ganttChart.scale.js';
	import type { GanttRowModel, GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttRange } from './ganttChart.types.js';

	let {
		chart,
		rowModel,
		renderedRows,
		scale,
		visibleRange,
		visiblePixels,
		viewportWidth,
		totalHeight,
		shades,
		projectRange,
		now
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		rowModel: GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		renderedRows: readonly GanttVirtualRow[];
		scale: GanttTimeScale;
		visibleRange: GanttRange;
		visiblePixels: Readonly<{ start: number; end: number }>;
		viewportWidth: number;
		totalHeight: number;
		shades: readonly GanttTimeShade[];
		projectRange: GanttRange | null;
		now: Date | null;
	} = $props();

	const gridCells = $derived(
		getGanttScaleCells(scale, 'lower', visiblePixels, Math.max(160, viewportWidth / 2))
	);
	const visibleRows = $derived({
		start: renderedRows[0]?.start ?? 0,
		end: renderedRows.at(-1)?.end ?? Math.min(totalHeight, chart.rowHeight * 10)
	});
	const projectStartLeft = $derived(
		projectRange ? getGanttScalePixel(scale, projectRange.start) : null
	);
	const projectEndLeft = $derived(
		projectRange ? getGanttScalePixel(scale, projectRange.end) : null
	);
	const todayLeft = $derived(now ? getGanttScalePixel(scale, now) : null);
	const overAllocatedResourceIdsByTaskId = $derived(
		indexGanttOverAllocations(chart.schedule.workload)
	);
	const emptyResourceIds = new Set<string>();
	const activeInteraction = $derived(chart.interaction.active);
	const rangeDrag: Attachment<HTMLElement> = (element) => chart.interaction.rangeDrag()(element);

	function isTaskFocused(taskId: string): boolean {
		return (
			(chart.selection.kind === 'task' && chart.selection.taskId === taskId) ||
			(chart.selection.kind === 'cell' && chart.selection.taskId === taskId)
		);
	}
</script>

<div
	data-gantt-chart-part="timeline-rows"
	class={chart.classes.timelineRows(chart.themeVariants)}
	style:width={`${scale.totalWidth}px`}
	style:height={`${totalHeight}px`}
>
	<div
		data-gantt-chart-part="range-surface"
		class="absolute inset-0 z-0"
		aria-hidden="true"
		{@attach rangeDrag}
	></div>
	<GanttTimeShadeLayer
		{shades}
		{totalHeight}
		size={chart.size}
		density={chart.density}
		color={chart.color}
		disabled={chart.disabled}
		classes={chart.classes}
		nonWorkingTime={chart.renderers?.nonWorkingTime}
	/>

	{#each gridCells as positioned (positioned.cell.index)}
		<div
			data-gantt-chart-part="grid-line"
			class={chart.classes.gridLine(chart.themeVariants)}
			style:left={`${positioned.left}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/each}

	{#each renderedRows as virtualRow (virtualRow.key)}
		{@const node = rowModel.rows[virtualRow.index]}
		{#if node}
			{@const resourceGroup = rowModel.resourceGroupByTaskId.get(node.taskId)}
			{@const isResourceGroupStart = rowModel.resourceGroupStartTaskIds.has(node.taskId)}
			<div
				data-gantt-chart-part="timeline-row"
				data-task-id={node.taskId}
				data-index={virtualRow.index}
				data-resource-group={resourceGroup?.id}
				data-resource-group-start={isResourceGroupStart || undefined}
				class={chart.classes.timelineRow({
					...chart.themeVariants,
					class: [
						isTaskFocused(node.taskId) ? 'bg-color/4' : undefined,
						isResourceGroupStart ? 'border-t border-t-neutral/20' : undefined
					]
				})}
				style:top={`${virtualRow.start}px`}
				aria-hidden="true"
			></div>
		{/if}
	{/each}

	{#if projectStartLeft !== null && projectStartLeft >= 0 && projectStartLeft <= scale.totalWidth}
		<div
			data-gantt-chart-part="project-line"
			data-edge="start"
			class={chart.classes.projectLine(chart.themeVariants)}
			style:left={`${projectStartLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}
	{#if projectEndLeft !== null && projectEndLeft >= 0 && projectEndLeft <= scale.totalWidth}
		<div
			data-gantt-chart-part="project-line"
			data-edge="end"
			class={chart.classes.projectLine(chart.themeVariants)}
			style:left={`${projectEndLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}
	{#if chart.showTodayIndicator && todayLeft !== null && todayLeft >= 0 && todayLeft <= scale.totalWidth}
		<div
			data-gantt-chart-part="today-indicator"
			class={chart.classes.todayIndicator({ ...chart.themeVariants, today: true })}
			style:left={`${todayLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}

	<div
		data-gantt-chart-part="task-layer"
		class={chart.classes.taskLayer(chart.themeVariants)}
		style:width={`${scale.totalWidth}px`}
		style:height={`${totalHeight}px`}
	>
		{#each renderedRows as virtualRow (virtualRow.key)}
			{@const node = rowModel.rows[virtualRow.index]}
			{@const positioned = node
				? positionGanttTask({
						node,
						rowTop: virtualRow.start,
						rowHeight: chart.rowHeight,
						size: chart.size,
						scale,
						visibleRange,
						visiblePixels
					})
				: null}
			{#if positioned}
				<GanttTaskBar
					{positioned}
					{visiblePixels}
					rowTop={virtualRow.start}
					{chart}
					overAllocatedResourceIds={overAllocatedResourceIdsByTaskId.get(positioned.node.taskId) ??
						emptyResourceIds}
				/>
			{/if}
		{/each}
	</div>

	{#if activeInteraction?.kind === 'task' || activeInteraction?.kind === 'range'}
		<GanttDragPreview
			{chart}
			status={activeInteraction}
			{rowModel}
			{scale}
			{visibleRange}
			{visiblePixels}
			{totalHeight}
			dragPreview={chart.renderers?.dragPreview}
		/>
	{:else if activeInteraction?.kind === 'dependency'}
		<GanttDependencyPreview
			status={activeInteraction}
			{totalHeight}
			totalWidth={scale.totalWidth}
			size={chart.size}
			density={chart.density}
			color={chart.color}
			disabled={chart.disabled}
			classes={chart.classes}
		/>
	{/if}

	<GanttDependencyLayer
		dependencies={chart.schedule.analysis.dependencies}
		rowIndexByTaskId={rowModel.rowIndexByTaskId}
		rowHeight={chart.rowHeight}
		{totalHeight}
		{scale}
		{visiblePixels}
		{visibleRows}
		selection={chart.selection}
		messages={chart.messages}
		instructionsId={chart.a11y.instructionsId}
		size={chart.size}
		density={chart.density}
		color={chart.color}
		disabled={chart.disabled}
		showCritical={chart.display.criticalPath}
		classes={chart.classes}
		dependencyTooltip={chart.renderers?.dependencyTooltip}
		onSelect={(dependencyId) => chart.a11y.setDependencyTarget(dependencyId)}
		isTabStop={(dependencyId) => chart.a11y.isDependencyTabStop(dependencyId)}
		onFocus={(dependencyId) => chart.a11y.setDependencyTarget(dependencyId)}
		onDelete={(dependencyId) => chart.removeDependencyFromKeyboard(dependencyId)}
		onUpdate={(dependency) => chart.updateDependencyFromInline(dependency)}
		onDependencyClick={chart.onDependencyClick}
	/>
</div>
