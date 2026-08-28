<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { GanttWorkloadCellPayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttResource, GanttWorkloadBucket } from './ganttChart.types.js';

	let {
		chart,
		resource,
		bucket,
		left,
		width,
		height,
		accessibleLabel
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		resource: GanttResource<TResourceFields>;
		bucket: GanttWorkloadBucket;
		left: number;
		width: number;
		height: number;
		accessibleLabel: string;
	} = $props();

	const numberFormatter = $derived(
		new Intl.NumberFormat(chart.messages.locale, { maximumFractionDigits: 2 })
	);
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
	class={chart.classes.workloadCell({
		...chart.themeVariants,
		overAllocated: bucket.isOverAllocated,
		class: 'flex items-center justify-center overflow-hidden'
	})}
	style:left={`${left}px`}
	style:width={`${width}px`}
	style:height={`${height}px`}
	role="cell"
	aria-label={accessibleLabel}
>
	<Slot render={chart.renderers?.workloadCell ?? defaultContent} {payload} />
</div>

{#snippet defaultContent()}
	<span class="truncate px-1">
		{numberFormatter.format(bucket.assignedUnits)}/{numberFormatter.format(bucket.capacity)}
	</span>
{/snippet}
