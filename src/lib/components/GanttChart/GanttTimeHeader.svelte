<script lang="ts">
	import type { Colors, Density, Sizes } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import GanttTimeHeaderCell from './GanttTimeHeaderCell.svelte';
	import { getGanttScaleCells, type GanttTimeScale } from './ganttChart.scale.js';
	import type { GanttTimeHeaderPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';

	let {
		scale,
		visiblePixels,
		viewportWidth,
		size,
		density,
		color,
		disabled,
		classes,
		timeHeaderUpper,
		timeHeaderLower
	}: {
		scale: GanttTimeScale;
		visiblePixels: Readonly<{ start: number; end: number }>;
		viewportWidth: number;
		size: Sizes;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		timeHeaderUpper?: Snippet<[GanttTimeHeaderPayload]>;
		timeHeaderLower?: Snippet<[GanttTimeHeaderPayload]>;
	} = $props();

	const overscanPixels = $derived(Math.max(160, viewportWidth / 2));
	const upperCells = $derived(getGanttScaleCells(scale, 'upper', visiblePixels, overscanPixels));
	const lowerCells = $derived(getGanttScaleCells(scale, 'lower', visiblePixels, overscanPixels));
</script>

<div
	data-gantt-chart-part="time-header"
	class={classes.timeHeader({ size, density, color, disabled })}
	style:width={`${scale.totalWidth}px`}
>
	{#each upperCells as positioned (`upper:${positioned.cell.index}`)}
		<GanttTimeHeaderCell
			{positioned}
			level="upper"
			{size}
			{density}
			{color}
			{disabled}
			{classes}
			snippet={timeHeaderUpper}
		/>
	{/each}
	{#each lowerCells as positioned (`lower:${positioned.cell.index}`)}
		<GanttTimeHeaderCell
			{positioned}
			level="lower"
			{size}
			{density}
			{color}
			{disabled}
			{classes}
			snippet={timeHeaderLower}
		/>
	{/each}
</div>
