<script lang="ts">
	import type { CalendarPrimitiveProps, CalendarType } from './calendarInput.js';
	import type { Event } from './calendarInput.js';
	import { CalendarState } from './useCalendar.svelte.js';
	import Button from '../../Button/Button.svelte';
	import Slot from '../../Slot/Slot.svelte';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';

	type T = $$Generic<CalendarType>;
	type CalendarEvent = $$Generic<Event>;
	let {
		type,
		events,
		value = $bindable(null),
		disabledDates,
		view = 'single',
		weekStartsOnMonday = true,
		weekdayLength = 'narrow',
		containerClass = '',
		headerClass = '',
		dayClass = '',
		weekdayClass = '',
		gridClass = '',
		cell: renderCell,
		buttons,
		minDate,
		maxDate,
		header,
		headerProps,
		onChange
	}: CalendarPrimitiveProps<CalendarEvent, T> = $props();

	const calendar = new CalendarState<CalendarEvent, T>({
		events: (events || []) as CalendarEvent[],
		disabledDates,
		minDate,
		maxDate,
		view,
		weekStartsOnMonday,
		type: (type || 'calendar') as T,
		onChange: onChange as any,
		value: value as any
	});

	const buttonProps = $derived(
		buttons
			? 'prev' in buttons
				? buttons
				: { prev: buttons, next: buttons }
			: {
					prev: {},
					next: {}
				}
	);

	$effect(() => {
		if (type === 'calendar-range' && Array.isArray(value)) {
			calendar.setRange(value[0], value[1]);
		} else if (typeof value === 'object' && value !== null) {
			// Handle case where value might be an array but not detected as such
			calendar.setRange(null, null);
		} else {
			calendar.setRange(value as Date | null, null);
		}
	});
	if (calendar.rangeStart) {
		const monthOfValue = calendar.rangeStart.getMonth();

		if (calendar.currentMonth !== monthOfValue) {
			calendar.date = new Date(calendar.date.getFullYear(), monthOfValue, 1);
		}
	}
</script>

<div
	class={containerClass}
	style="display: grid; grid-template-columns: repeat({view === 'single'
		? '1'
		: '2'}, minmax(0, 1fr)) "
	{@attach calendar.calendar}
>
	<Slot
		render={header}
		class={headerClass}
		props={headerProps}
		style={view === 'single' ? '' : 'grid-column-start: 1; grid-column-end: 3;'}
	>
		<Button
			squared
			size="small"
			variant="ghost"
			class="rotate-180"
			{...buttonProps.prev}
			onClick={calendar.goPrevMonth}
		>
			{@html caretRightIcon}
		</Button>
		{calendar.displayedMonthLabel}
		<Button
			squared
			size="small"
			variant="ghost"
			{...buttonProps.next}
			onClick={calendar.goNextMonth}
		>
			{@html caretRightIcon}
		</Button>
	</Slot>
	{@render calendarPart(calendar.rows)}
	{#if view === 'double'}
		{@render calendarPart(calendar.nextMonthRows)}
	{/if}
</div>

{#snippet calendarPart(rows: typeof calendar.rows)}
	<div
		style="grid-template-columns: repeat(7, minmax(0, 1fr)); display: grid; grid-template-rows: repeat({view ===
		'double'
			? Math.max(calendar.rows.length, calendar.nextMonthRows.length) + 1
			: calendar.rows.length + 1}, minmax(0, 1fr));"
		class={gridClass}
	>
		{#each Array(7) as _d, day}
			{@const colPosition =
				day === (calendar.weekStartsOnMonday ? 0 : 6)
					? 7
					: calendar.weekStartsOnMonday
						? day
						: day + 1}
			<span style="grid-row-start: 1; grid-column-start: {colPosition};" class={weekdayClass}>
				{new Date(0, 0, day).toLocaleDateString(undefined, { weekday: weekdayLength })}
			</span>
		{/each}

		{#each rows as { cells }}
			{#each cells as cell}
				{#if cell.visible}
					<button {...cell.attributes} class={dayClass}>
						<abbr
							aria-label={cell.date.toLocaleDateString(undefined, {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						>
							{#if renderCell}
								{@render renderCell(cell)}
							{:else}
								{cell.day}
							{/if}
						</abbr>
					</button>
				{/if}
			{/each}
		{/each}
	</div>
{/snippet}
