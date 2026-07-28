<script lang="ts">
	import {
		GanttChart,
		type GanttDependency,
		type GanttDependencyCreationRequest,
		type GanttTask
	} from '$lib/components/GanttChart/index.js';

	let nextDependencyId = 0;

	let tasks = $state<GanttTask[]>([
		{ id: 'discovery', title: 'Discovery', type: 'summary', progress: 0.75 },
		{
			id: 'research',
			parentId: 'discovery',
			title: 'User research',
			start: new Date('2026-07-27T07:00:00.000Z'),
			end: new Date('2026-07-30T16:00:00.000Z'),
			progress: 1
		},
		{
			id: 'brief',
			parentId: 'discovery',
			title: 'Product brief',
			start: new Date('2026-07-31T07:00:00.000Z'),
			end: new Date('2026-08-04T16:00:00.000Z'),
			progress: 0.5
		},
		{ id: 'delivery', title: 'Delivery', type: 'summary' },
		{
			id: 'implementation',
			parentId: 'delivery',
			title: 'Implementation',
			start: new Date('2026-08-05T07:00:00.000Z'),
			end: new Date('2026-08-18T16:00:00.000Z'),
			progress: 0.2
		},
		{
			id: 'launch',
			parentId: 'delivery',
			title: 'Launch',
			type: 'milestone',
			start: new Date('2026-08-19T09:00:00.000Z'),
			end: new Date('2026-08-19T09:00:00.000Z')
		}
	]);

	let dependencies = $state<GanttDependency[]>([
		{
			id: 'brief-to-build',
			fromTaskId: 'brief',
			toTaskId: 'implementation',
			type: 'finish-start'
		},
		{
			id: 'build-to-launch',
			fromTaskId: 'implementation',
			toTaskId: 'launch',
			type: 'finish-start'
		}
	]);

	function createDependency(request: GanttDependencyCreationRequest): GanttDependency {
		nextDependencyId += 1;
		return {
			id: `dependency-${nextDependencyId}`,
			fromTaskId: request.fromTaskId,
			toTaskId: request.toTaskId,
			type: request.type
		};
	}
</script>

<GanttChart
	bind:tasks
	bind:dependencies
	{createDependency}
	timeZone="Europe/Paris"
	initialScrollDate={new Date('2026-08-05T10:00:00.000Z')}
	class="h-[34rem] w-full"
/>
