<script lang="ts" generics="TResourceFields extends object">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Colors, Density, Sizes } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { GanttWorkloadCellPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttResource, GanttWorkloadBucket } from './ganttChart.types.js';

	let {
		resource,
		bucket,
		left,
		width,
		height,
		accessibleLabel,
		locale,
		size,
		density,
		color,
		disabled,
		classes,
		workloadCell
	}: {
		resource: GanttResource<TResourceFields>;
		bucket: GanttWorkloadBucket;
		left: number;
		width: number;
		height: number;
		accessibleLabel: string;
		locale: string;
		size: Sizes;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		workloadCell?: Snippet<[GanttWorkloadCellPayload<TResourceFields>]>;
	} = $props();

	const numberFormatter = $derived(new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }));
	const payload = $derived<GanttWorkloadCellPayload<TResourceFields>>({
		resource,
		bucket,
		defaultContent
	});
</script>

<div
	data-gantt-chart-part="workload-cell"
	data-resource-id={resource.id}
	data-over-allocated={bucket.isOverAllocated || undefined}
	class={classes.workloadCell({
		size,
		density,
		color,
		disabled,
		overAllocated: bucket.isOverAllocated,
		class: 'flex items-center justify-center overflow-hidden'
	})}
	style:left={`${left}px`}
	style:width={`${width}px`}
	style:height={`${height}px`}
	role="cell"
	aria-label={accessibleLabel}
>
	<Slot render={workloadCell ?? defaultContent} {payload} />
</div>

{#snippet defaultContent()}
	<span class="truncate px-1">
		{numberFormatter.format(bucket.assignedUnits)}/{numberFormatter.format(bucket.capacity)}
	</span>
{/snippet}
