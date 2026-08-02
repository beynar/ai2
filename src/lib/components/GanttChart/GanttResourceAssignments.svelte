<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { getGanttTaskColor } from './ganttChart.color.js';
	import type { GanttResourceAssignmentsPayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type {
		GanttAssignment,
		GanttResolvedTaskNode,
		GanttResource
	} from './ganttChart.types.js';

	let {
		chart,
		node,
		resources,
		assignments,
		overAllocatedResourceIds
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		node: GanttResolvedTaskNode<TTaskFields>;
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		overAllocatedResourceIds: ReadonlySet<string>;
	} = $props();

	const isOverAllocated = $derived(
		resources.some((resource) => overAllocatedResourceIds.has(resource.id))
	);
	const percentFormatter = $derived(
		new Intl.NumberFormat(chart.messages.locale, { style: 'percent', maximumFractionDigits: 0 })
	);
	const assignmentUnitsByResourceId = $derived.by(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity -- Rebuilt immutable lookup for one derived snapshot.
		const unitsByResourceId = new Map<string, number>();
		for (const assignment of assignments) {
			unitsByResourceId.set(
				assignment.resourceId,
				(unitsByResourceId.get(assignment.resourceId) ?? 0) + assignment.units
			);
		}
		return unitsByResourceId;
	});
	const payload = $derived<
		GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>
	>({ node, resources, assignments, isOverAllocated, defaultContent });
</script>

{#if resources.length > 0 || chart.renderers?.resourceAssignments}
	<span
		data-gantt-chart-part="resource-assignments"
		data-task-id={node.taskId}
		data-over-allocated={isOverAllocated || undefined}
		class={chart.classes.resourceAssignments({
			...chart.themeVariants,
			overAllocated: isOverAllocated
		})}
	>
		<Slot render={chart.renderers?.resourceAssignments ?? defaultContent} {payload} />
		{#if isOverAllocated}
			<span
				data-gantt-chart-part="over-allocation"
				class={chart.classes.overAllocation({
					...chart.themeVariants,
					overAllocated: true
				})}
				title={chart.messages.ganttChartOverAllocated(
					resources
						.filter((resource) => overAllocatedResourceIds.has(resource.id))
						.map((resource) => resource.title)
						.join(', ')
				)}
			></span>
		{/if}
	</span>
{/if}

{#snippet defaultContent()}
	{#each resources as resource (resource.id)}
		{@const assignedUnits = assignmentUnitsByResourceId.get(resource.id)}
		<span
			class="inline-flex max-w-28 items-center gap-1 truncate"
			title={assignedUnits === undefined
				? resource.title
				: `${resource.title}, ${percentFormatter.format(assignedUnits)}`}
		>
			<span
				class="size-1.5 shrink-0 rounded-full"
				style:background-color={getGanttTaskColor(resource.color, chart.color)}
			></span>
			<span class="truncate">{resource.title}</span>
		</span>
	{/each}
{/snippet}
