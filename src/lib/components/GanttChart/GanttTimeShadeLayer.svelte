<script lang="ts">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { GanttTimeShade } from './ganttChart.layout.js';
	import type { GanttNonWorkingTimePayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';

	let {
		shades,
		totalHeight,
		density,
		color,
		disabled,
		classes,
		nonWorkingTime
	}: {
		shades: readonly GanttTimeShade[];
		totalHeight: number;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		nonWorkingTime?: Snippet<[GanttNonWorkingTimePayload]>;
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
		class={(shade.kind === 'holiday' ? classes.holiday : classes.nonWorkingTime)({
			density,
			color,
			disabled,
			nonWorking: true
		})}
		style:left={`${shade.left}px`}
		style:width={`${shade.width}px`}
		style:height={`${totalHeight}px`}
		title={shade.holiday?.title}
		aria-hidden="true"
	>
		<Slot render={nonWorkingTime ?? defaultContent} {payload} />
	</div>
{/each}

{#snippet defaultContent()}{/snippet}
