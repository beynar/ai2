<script lang="ts">
	import {
		EventCalendar,
		type EventCalendarProposedUpdate
	} from '$lib/components/EventCalendar/index.js';
	import {
		createDemoItems,
		createDemoResources,
		type MeetingFields
	} from './eventCalendarDemoData.js';

	const timeZone = 'Europe/Paris';
	const civilDayFormatter = new Intl.DateTimeFormat('en', { timeZone, dateStyle: 'short' });

	let items = $state(createDemoItems());
	let resources = $state(createDemoResources());
	let date = $state(new Date('2026-07-15T10:00:00.000Z'));
	let view = $state<'month' | 'week' | 'day' | 'days' | 'agenda' | 'resource' | 'timeline'>('week');
	let dayCount = $state(3);

	function canUpdateItem(proposal: EventCalendarProposedUpdate<MeetingFields>): boolean {
		if (proposal.kind !== 'move' || !proposal.occurrence?.isRecurring) return true;
		if (proposal.item.allDay === true) return false;
		const occurrenceDay = civilDayFormatter.format(proposal.occurrence.start);
		const inclusiveEnd = new Date(proposal.item.end.getTime() - 1);
		return (
			civilDayFormatter.format(proposal.item.start) === occurrenceDay &&
			civilDayFormatter.format(inclusiveEnd) === occurrenceDay
		);
	}
</script>

<EventCalendar
	bind:items
	{resources}
	bind:date
	bind:view
	bind:dayCount
	{timeZone}
	{canUpdateItem}
	recurrenceEditScope="occurrence"
	dayStartHour={6}
	dayEndHour={23}
	scrollToHour={8}
	agendaDayCount={14}
	showDatePicker
	showWeekNumbers
	class="h-[38rem] w-full"
/>
