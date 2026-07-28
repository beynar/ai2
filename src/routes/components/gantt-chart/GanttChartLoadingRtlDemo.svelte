<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import { GanttChart, type GanttTask } from '$lib/components/GanttChart/index.js';
	import { newYorkProjectCalendar } from './ganttChartDemoData.js';

	let loading = $state(false);
	let direction = $state<'ltr' | 'rtl'>('rtl');
	let tasks = $state<GanttTask[]>([
		{
			id: 'migration',
			title: 'DST migration window',
			start: new Date('2026-03-06T14:00:00.000Z'),
			end: new Date('2026-03-09T21:00:00.000Z'),
			progress: 0.4
		},
		{
			id: 'verification',
			title: 'Post-change verification',
			start: new Date('2026-03-10T13:00:00.000Z'),
			end: new Date('2026-03-11T21:00:00.000Z'),
			progress: 0.1
		}
	]);
</script>

<div class="grid w-full gap-3">
	<div class="flex flex-wrap items-center justify-between gap-2">
		<p class="text-neutral/65 text-sm">
			America/New_York crosses the spring DST boundary on March 8, 2026.
		</p>
		<div class="flex flex-wrap gap-2">
			<Button
				size="small"
				variant="outline"
				onClick={() => (direction = direction === 'rtl' ? 'ltr' : 'rtl')}
			>
				Direction: {direction.toUpperCase()}
			</Button>
			<Button size="small" variant="outline" onClick={() => (loading = !loading)}>
				Loading: {loading ? 'on' : 'off'}
			</Button>
		</div>
	</div>
	<GanttChart
		bind:tasks
		{loading}
		dir={direction}
		locale={direction === 'rtl' ? 'ar' : 'en'}
		calendars={[newYorkProjectCalendar]}
		projectCalendarId={newYorkProjectCalendar.id}
		timeZone="America/New_York"
		zoom="day"
		initialScrollDate={new Date('2026-03-08T17:00:00.000Z')}
		class="h-[30rem] w-full"
	/>
</div>
