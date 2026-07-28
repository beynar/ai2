<script
	lang="ts"
	generics="TTaskFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import { getGanttTaskColor } from './ganttChart.color.js';
	import type { GanttResourceAssignmentsPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttAssignment,
		GanttResolvedTaskNode,
		GanttResource
	} from './ganttChart.types.js';

	let {
		node,
		resources,
		assignments,
		overAllocatedResourceIds,
		messages,
		locale,
		density,
		color,
		disabled,
		classes,
		resourceAssignments
	}: {
		node: GanttResolvedTaskNode<TTaskFields>;
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		overAllocatedResourceIds: ReadonlySet<string>;
		messages: Messages;
		locale: string;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		resourceAssignments?: Snippet<
			[GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
	} = $props();

	const isOverAllocated = $derived(
		resources.some((resource) => overAllocatedResourceIds.has(resource.id))
	);
	const percentFormatter = $derived(
		new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 })
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

{#if resources.length > 0 || resourceAssignments}
	<span
		data-gantt-chart-part="resource-assignments"
		data-task-id={node.taskId}
		data-over-allocated={isOverAllocated || undefined}
		class={classes.resourceAssignments({
			density,
			color,
			disabled,
			overAllocated: isOverAllocated
		})}
	>
		<Slot render={resourceAssignments ?? defaultContent} {payload} />
		{#if isOverAllocated}
			<span
				data-gantt-chart-part="over-allocation"
				class={classes.overAllocation({ density, color, disabled, overAllocated: true })}
				title={messages.ganttChartOverAllocated(
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
				style:background-color={getGanttTaskColor(resource.color, color)}
			></span>
			<span class="truncate">{resource.title}</span>
		</span>
	{/each}
{/snippet}
