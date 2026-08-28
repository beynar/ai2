<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { GanttTimeShade } from './ganttChart.layout.js';
	import type { GanttNonWorkingTimePayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';

	let {
		chart,
		shades,
		totalHeight
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		shades: readonly GanttTimeShade[];
		totalHeight: number;
	} = $props();
</script>

{#each shades as shade (`${shade.kind}:${shade.range.start.getTime()}:${shade.range.end.getTime()}`)}
	{@const payload = {
		range: shade.range,
		left: shade.left,
		width: shade.width,
		isWeekend: shade.isWeekend,
		holiday: shade.holiday,
		defaultContent
	} satisfies GanttNonWorkingTimePayload}
	<div
		data-gantt-chart-part={shade.kind === 'holiday' ? 'holiday' : 'non-working-time'}
		data-kind={shade.kind}
		data-weekend={shade.isWeekend || undefined}
		class={(shade.kind === 'holiday' ? chart.classes.holiday : chart.classes.nonWorkingTime)({
			...chart.themeVariants,
			nonWorking: true
		})}
		style:left={`${shade.left}px`}
		style:width={`${shade.width}px`}
		style:height={`${totalHeight}px`}
		title={shade.holiday?.title}
		aria-hidden="true"
	>
		<Slot render={chart.renderers?.nonWorkingTime ?? defaultContent} {payload} />
	</div>
{/each}

{#snippet defaultContent()}{/snippet}
