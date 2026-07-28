<script lang="ts">
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { GanttDependencyInteractionStatus } from './ganttChart.dependencyInteraction.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';

	let {
		status,
		totalWidth,
		totalHeight,
		density,
		color,
		disabled,
		classes
	}: {
		status: GanttDependencyInteractionStatus;
		totalWidth: number;
		totalHeight: number;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
	} = $props();

	const middleX = $derived((status.fromX + status.toX) / 2);
	const path = $derived(
		`M ${status.fromX} ${status.fromY} C ${middleX} ${status.fromY}, ${middleX} ${status.toY}, ${status.toX} ${status.toY}`
	);
</script>

<svg
	data-gantt-chart-part="dependency-preview"
	data-dependency-type={status.type ?? undefined}
	data-valid={status.isValid || undefined}
	class="pointer-events-none absolute inset-0 z-40 overflow-visible"
	width={totalWidth}
	height={totalHeight}
	viewBox={`0 0 ${totalWidth} ${totalHeight}`}
	aria-hidden="true"
>
	<path
		d={path}
		class={classes.connector({
			density,
			color,
			disabled,
			selected: status.isValid,
			class: 'stroke-color/70 stroke-2 [stroke-dasharray:5_4]'
		})}
	></path>
	{#if status.isValid && status.targetTaskId}
		<circle cx={status.toX} cy={status.toY} r="5" class="fill-color stroke-surface stroke-2"
		></circle>
	{/if}
</svg>
