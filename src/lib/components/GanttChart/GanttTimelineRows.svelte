<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import GanttDependencyLayer from './GanttDependencyLayer.svelte';
	import GanttDependencyPreview from './GanttDependencyPreview.svelte';
	import GanttDragPreview from './GanttDragPreview.svelte';
	import GanttTaskBar from './GanttTaskBar.svelte';
	import GanttTimeShadeLayer from './GanttTimeShadeLayer.svelte';
	import { positionGanttTask, type GanttTimeShade } from './ganttChart.layout.js';
	import {
		getGanttScaleCells,
		getGanttScalePixel,
		type GanttTimeScale
	} from './ganttChart.scale.js';
	import type {
		GanttBaselinePayload,
		GanttDeadlinePayload,
		GanttDependencyTooltipPayload,
		GanttDragPreviewPayload,
		GanttNonWorkingTimePayload,
		GanttProgressPayload,
		GanttTaskLabelPayload,
		GanttTaskPayload,
		GanttTaskTooltipPayload
	} from './ganttChart.props.js';
	import type { GanttRowModel, GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttAssignment,
		GanttRange,
		GanttResolvedDependency,
		GanttResource,
		GanttSelection
	} from './ganttChart.types.js';

	type TimelineSnippets = {
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
		dragPreview?: Snippet<[GanttDragPreviewPayload<TTaskFields>]>;
	};

	let {
		chart,
		rowModel,
		renderedRows,
		resolvedDependencies,
		resources,
		assignments,
		selection,
		scale,
		visibleRange,
		visiblePixels,
		viewportWidth,
		totalHeight,
		rowHeight,
		shades,
		projectRange,
		now,
		showTodayIndicator,
		showCritical,
		showBaselines,
		showDeadlines,
		showConstraints,
		messages,
		locale,
		timeZone,
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
		rowModel: GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		renderedRows: readonly GanttVirtualRow[];
		resolvedDependencies: readonly GanttResolvedDependency<TTaskFields, TDependencyFields>[];
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		selection: GanttSelection;
		scale: GanttTimeScale;
		visibleRange: GanttRange;
		visiblePixels: Readonly<{ start: number; end: number }>;
		viewportWidth: number;
		totalHeight: number;
		rowHeight: number;
		shades: readonly GanttTimeShade[];
		projectRange: GanttRange | null;
		now: Date | null;
		showTodayIndicator: boolean;
		showCritical: boolean;
		showBaselines: boolean;
		showDeadlines: boolean;
		showConstraints: boolean;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		classes: GanttChartClasses;
		snippets: TimelineSnippets;
		onTaskClick?: (task: (typeof rowModel.rows)[number], event: MouseEvent) => void;
		onTaskDoubleClick?: (task: (typeof rowModel.rows)[number], event: MouseEvent) => void;
		onDependencyClick?: (
			dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
			event: MouseEvent
		) => void;
	} = $props();

	const gridCells = $derived(
		getGanttScaleCells(scale, 'lower', visiblePixels, Math.max(160, viewportWidth / 2))
	);
	const rowIndexByTaskId = $derived(
		new Map(rowModel.rows.map((node, index) => [node.taskId, index]))
	);
	const visibleRows = $derived({
		start: renderedRows[0]?.start ?? 0,
		end: renderedRows.at(-1)?.end ?? Math.min(totalHeight, rowHeight * 10)
	});
	const projectStartLeft = $derived(
		projectRange ? getGanttScalePixel(scale, projectRange.start) : null
	);
	const projectEndLeft = $derived(
		projectRange ? getGanttScalePixel(scale, projectRange.end) : null
	);
	const todayLeft = $derived(now ? getGanttScalePixel(scale, now) : null);
	const rangeDrag: Attachment<HTMLElement> = (element) => chart.interaction.rangeDrag()(element);

	function isTaskSelected(taskId: string): boolean {
		return selection.kind === 'task' && selection.taskId === taskId;
	}

	function isTaskFocused(taskId: string): boolean {
		return (
			(selection.kind === 'task' && selection.taskId === taskId) ||
			(selection.kind === 'cell' && selection.taskId === taskId)
		);
	}
</script>

<div
	data-gantt-chart-part="timeline-rows"
	class={classes.timelineRows({ density, color, disabled })}
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
		{density}
		{color}
		{disabled}
		{classes}
		nonWorkingTime={snippets.nonWorkingTime}
	/>

	{#each gridCells as positioned (positioned.cell.index)}
		<div
			data-gantt-chart-part="grid-line"
			class={classes.gridLine({ density, color, disabled })}
			style:left={`${positioned.left}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/each}

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
					selected: isTaskFocused(node.taskId)
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
			class={classes.projectLine({ density, color, disabled })}
			style:left={`${projectStartLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}
	{#if projectEndLeft !== null && projectEndLeft >= 0 && projectEndLeft <= scale.totalWidth}
		<div
			data-gantt-chart-part="project-line"
			data-edge="end"
			class={classes.projectLine({ density, color, disabled })}
			style:left={`${projectEndLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}
	{#if showTodayIndicator && todayLeft !== null && todayLeft >= 0 && todayLeft <= scale.totalWidth}
		<div
			data-gantt-chart-part="today-indicator"
			class={classes.todayIndicator({ density, color, disabled, today: true })}
			style:left={`${todayLeft}px`}
			style:height={`${totalHeight}px`}
			aria-hidden="true"
		></div>
	{/if}

	<div
		data-gantt-chart-part="task-layer"
		class={classes.taskLayer({ density, color, disabled })}
		style:width={`${scale.totalWidth}px`}
		style:height={`${totalHeight}px`}
	>
		{#each renderedRows as virtualRow (virtualRow.key)}
			{@const node = rowModel.rows[virtualRow.index]}
			{@const positioned = node
				? positionGanttTask({
						node,
						rowTop: virtualRow.start,
						rowHeight,
						scale,
						visibleRange,
						visiblePixels
					})
				: null}
			{#if positioned}
				<GanttTaskBar
					{positioned}
					rowTop={virtualRow.start}
					{chart}
					{resources}
					{assignments}
					{messages}
					{locale}
					{timeZone}
					{density}
					{color}
					{direction}
					{disabled}
					showBaseline={showBaselines}
					showDeadline={showDeadlines}
					showConstraint={showConstraints}
					{showCritical}
					isSelected={isTaskSelected(positioned.node.taskId)}
					isFocused={isTaskFocused(positioned.node.taskId)}
					{classes}
					{snippets}
					{onTaskClick}
					{onTaskDoubleClick}
				/>
			{/if}
		{/each}
	</div>

	{#if chart.interaction.status}
		<GanttDragPreview
			status={chart.interaction.status}
			{rowModel}
			{scale}
			{visibleRange}
			{visiblePixels}
			{rowHeight}
			{locale}
			{timeZone}
			{density}
			{color}
			{disabled}
			{classes}
			dragPreview={snippets.dragPreview}
		/>
	{/if}

	{#if chart.interaction.dependencyStatus}
		<GanttDependencyPreview
			status={chart.interaction.dependencyStatus}
			{totalHeight}
			totalWidth={scale.totalWidth}
			{density}
			{color}
			{disabled}
			{classes}
		/>
	{/if}

	<GanttDependencyLayer
		dependencies={resolvedDependencies}
		{rowIndexByTaskId}
		{rowHeight}
		{totalHeight}
		{scale}
		{visiblePixels}
		{visibleRows}
		{selection}
		{messages}
		{density}
		{color}
		{disabled}
		{showCritical}
		{classes}
		dependencyTooltip={snippets.dependencyTooltip}
		onSelect={(dependencyId) =>
			chart.select({ kind: 'dependency', taskId: null, dependencyId, cell: null })}
		onDelete={(dependencyId) => chart.removeDependencyFromKeyboard(dependencyId)}
		onUpdate={(dependency) => chart.updateDependencyFromInline(dependency)}
		{onDependencyClick}
	/>
</div>
