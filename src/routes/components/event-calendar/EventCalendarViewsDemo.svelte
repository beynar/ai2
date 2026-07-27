<script lang="ts">
	import { EventCalendar } from '$lib/components/EventCalendar/index.js';
	import { createDemoItems, createDemoResources } from './eventCalendarDemoData.js';

	let items = $state(createDemoItems());
	let resources = $state(createDemoResources());
	let date = $state(new Date('2026-07-15T10:00:00.000Z'));
	let view = $state<'month' | 'week' | 'day' | 'days' | 'agenda' | 'resource'>('week');
	let dayCount = $state(3);
</script>

<EventCalendar
	bind:items
	{resources}
	bind:date
	bind:view
	bind:dayCount
	timeZone="Europe/Paris"
	dayStartHour={6}
	dayEndHour={23}
	scrollToHour={8}
	agendaDayCount={14}
	showDatePicker
	showWeekNumbers
	class="h-[38rem] w-full"
/>
