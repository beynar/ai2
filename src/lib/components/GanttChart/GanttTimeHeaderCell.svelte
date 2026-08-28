<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { GanttPositionedScaleCell } from './ganttChart.scale.js';
	import type { GanttTimeHeaderPayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';

	let {
		chart,
		positioned,
		level
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		positioned: GanttPositionedScaleCell;
		level: 'upper' | 'lower';
	} = $props();

	const payload = $derived<GanttTimeHeaderPayload>({
		cell: positioned.cell,
		level,
		defaultLabel: positioned.label,
		defaultContent
	});
	const partClass = $derived(
		level === 'upper' ? chart.classes.timeHeaderUpper : chart.classes.timeHeaderLower
	);
</script>

<div
	data-gantt-chart-part={level === 'upper' ? 'time-header-upper' : 'time-header-lower'}
	data-cell-index={positioned.cell.index}
	data-start={positioned.cell.start.toISOString()}
	data-end={positioned.cell.end.toISOString()}
	class={partClass(chart.themeVariants)}
	style:left={`${positioned.left}px`}
	style:width={`${positioned.width}px`}
	title={positioned.label}
>
	<Slot render={chart.renderers?.timeHeader ?? defaultContent} {payload} />
</div>

{#snippet defaultContent()}
	{positioned.label}
{/snippet}
