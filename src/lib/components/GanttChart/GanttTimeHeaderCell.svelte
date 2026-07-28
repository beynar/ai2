<script lang="ts">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { GanttPositionedScaleCell } from './ganttChart.scale.js';
	import type { GanttTimeHeaderPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';

	let {
		positioned,
		level,
		density,
		color,
		disabled,
		classes,
		snippet
	}: {
		positioned: GanttPositionedScaleCell;
		level: 'upper' | 'lower';
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		snippet?: Snippet<[GanttTimeHeaderPayload]>;
	} = $props();

	const payload = $derived<GanttTimeHeaderPayload>({
		cell: positioned.cell,
		level,
		defaultLabel: positioned.label,
		defaultContent
	});
	const partClass = $derived(level === 'upper' ? classes.timeHeaderUpper : classes.timeHeaderLower);
</script>

<div
	data-gantt-chart-part={level === 'upper' ? 'time-header-upper' : 'time-header-lower'}
	data-cell-index={positioned.cell.index}
	data-start={positioned.cell.start.toISOString()}
	data-end={positioned.cell.end.toISOString()}
	class={partClass({ density, color, disabled })}
	style:left={`${positioned.left}px`}
	style:width={`${positioned.width}px`}
	title={positioned.label}
>
	<Slot render={snippet ?? defaultContent} {payload} />
</div>

{#snippet defaultContent()}
	{positioned.label}
{/snippet}
