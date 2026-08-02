<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import GanttTimeHeaderCell from './GanttTimeHeaderCell.svelte';
	import { getGanttScaleCells, type GanttTimeScale } from './ganttChart.scale.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';

	let {
		chart,
		scale,
		visiblePixels,
		viewportWidth
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		scale: GanttTimeScale;
		visiblePixels: Readonly<{ start: number; end: number }>;
		viewportWidth: number;
	} = $props();

	const overscanPixels = $derived(Math.max(160, viewportWidth / 2));
	const upperCells = $derived(getGanttScaleCells(scale, 'upper', visiblePixels, overscanPixels));
	const lowerCells = $derived(getGanttScaleCells(scale, 'lower', visiblePixels, overscanPixels));
</script>

<div
	data-gantt-chart-part="time-header"
	class={chart.classes.timeHeader(chart.themeVariants)}
	style:width={`${scale.totalWidth}px`}
>
	{#each upperCells as positioned (`upper:${positioned.cell.index}`)}
		<GanttTimeHeaderCell {chart} {positioned} level="upper" />
	{/each}
	{#each lowerCells as positioned (`lower:${positioned.cell.index}`)}
		<GanttTimeHeaderCell {chart} {positioned} level="lower" />
	{/each}
</div>
