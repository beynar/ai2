<script lang="ts">
	import {
		GanttChart,
		type GanttDependency,
		type GanttDependencyCreationRequest,
		type GanttTask
	} from '$lib/components/GanttChart/index.js';
	import type { Density } from '$lib/types/theme.js';
	import { parisProjectCalendar } from './ganttChartDemoData.js';

	type DemoState = 'ready' | 'loading' | 'disabled';

	let {
		density = 'normal',
		height = 544,
		demoState = 'ready',
		showGrid = true,
		showTodayIndicator = true,
		showWeekends = true,
		showCriticalPath = false
	}: {
		density?: Density;
		height?: number;
		demoState?: DemoState;
		showGrid?: boolean;
		showTodayIndicator?: boolean;
		showWeekends?: boolean;
		showCriticalPath?: boolean;
	} = $props();

	let nextDependencyId = 0;

	let tasks = $state<GanttTask[]>([
		{ id: 'discovery', title: 'Discovery', type: 'summary', color: 'info' },
		{
			id: 'research',
			parentId: 'discovery',
			title: 'User research',
			start: new Date('2026-07-27T07:00:00.000Z'),
			end: new Date('2026-07-30T15:00:00.000Z'),
			progress: 1,
			color: 'success'
		},
		{
			id: 'brief',
			parentId: 'discovery',
			title: 'Product brief',
			start: new Date('2026-07-31T07:00:00.000Z'),
			end: new Date('2026-08-04T15:00:00.000Z'),
			progress: 0.5,
			color: 'info'
		},
		{ id: 'delivery', title: 'Delivery', type: 'summary', color: 'secondary' },
		{
			id: 'implementation',
			parentId: 'delivery',
			title: 'Implementation',
			start: new Date('2026-08-05T07:00:00.000Z'),
			end: new Date('2026-08-18T15:00:00.000Z'),
			progress: 0.2,
			color: 'secondary'
		},
		{
			id: 'launch',
			parentId: 'delivery',
			title: 'Launch',
			type: 'milestone',
			start: new Date('2026-08-19T09:00:00.000Z'),
			end: new Date('2026-08-19T09:00:00.000Z'),
			color: 'warning'
		}
	]);

	let dependencies = $state<GanttDependency[]>([
		{
			id: 'research-to-brief',
			fromTaskId: 'research',
			toTaskId: 'brief',
			type: 'finish-start'
		},
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
			type: 'finish-start',
			lag: { value: 2, unit: 'hour' }
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
	calendars={[parisProjectCalendar]}
	timeZone="Europe/Paris"
	{density}
	loading={demoState === 'loading'}
	disabled={demoState === 'disabled'}
	schedule={{ calendarId: parisProjectCalendar.id }}
	timeline={{
		todayIndicator: showTodayIndicator,
		weekends: showWeekends,
		display: { criticalPath: showCriticalPath, nonWorkingTime: false }
	}}
	layout={{ grid: showGrid ? {} : false }}
	interactions={{ dependencyCreation: { create: createDependency } }}
	style={`height: ${height}px`}
	class="w-full"
/>
