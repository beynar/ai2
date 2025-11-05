<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { calendarTheme } from '$lib/components/Form/Calendar/calendar.theme.js';
	export const setCalendarTheme = setComponentTheme<typeof calendarTheme>('calendar');
	export const useCalendarTheme = useComponentTheme('calendar', calendarTheme);
</script>

<script lang="ts">
	import type { CalendarPrimitiveProps, CalendarType } from './calendarInput.props.js';
	import type { Event } from './useCalendar.svelte.js';
	import { CalendarState } from './useCalendar.svelte.js';
	import Button from '../../Button/Button.svelte';
	import Slot from '../../Slot/Slot.svelte';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import Badge from '$lib/components/Badge/Badge.svelte';

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
		class: className,
		cell: renderCell,
		buttons,
		minDate,
		maxDate,
		header,
		headerProps,
		onChange,
		theme
	}: CalendarPrimitiveProps<CalendarEvent, T> = $props();

	const calendar = new CalendarState<CalendarEvent, T>({
		get events() {
			return events || [];
		},
		get disabledDates() {
			return disabledDates;
		},
		get minDate() {
			return minDate;
		},
		get maxDate() {
			return maxDate;
		},
		get view() {
			return view;
		},
		get weekStartsOnMonday() {
			return weekStartsOnMonday;
		},
		get type() {
			return (type || 'calendar') as T;
		},
		get onChange() {
			return onChange as any;
		},
		get value() {
			return value as any;
		},
		set value(v: any) {
			value = v;
		}
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

	const classes = $derived(useCalendarTheme(theme));
	if (calendar.rangeStart) {
		const monthOfValue = calendar.rangeStart.getMonth();

		if (calendar.currentMonth !== monthOfValue) {
			calendar.date = new Date(calendar.date.getFullYear(), monthOfValue, 1);
		}
	}
</script>

<div
	class={classes.container({ class: className })}
	style="display: grid; grid-template-columns: repeat({view === 'single'
		? '1'
		: '2'}, minmax(0, 1fr)) "
	{@attach calendar.calendar}
>
	<Slot
		render={header}
		class={classes.header()}
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
			{@render caretRightIcon()}
		</Button>
		{calendar.displayedMonthLabel}
		<Button
			squared
			size="small"
			variant="ghost"
			{...buttonProps.next}
			onClick={calendar.goNextMonth}
		>
			{@render caretRightIcon()}
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
		class={classes.grid()}
	>
		{#each Array(7) as _d, day}
			{@const colPosition =
				day === (calendar.weekStartsOnMonday ? 0 : 6)
					? 7
					: calendar.weekStartsOnMonday
						? day
						: day + 1}
			<span style="grid-row-start: 1; grid-column-start: {colPosition};" class={classes.weekday()}>
				{new Date(0, 0, day).toLocaleDateString(undefined, { weekday: weekdayLength })}
			</span>
		{/each}

		{#each rows as { cells }}
			{#each cells as cell}
				{#if cell.visible}
					<button
						{...cell.attributes}
						class={classes.day({
							selected: cell.selected,
							disabled: cell.disabled,
							inMonth: cell.inMonth,
							inRange: cell.isInRange,
							today: cell.isToday,
							startOfRange: cell.isStartOfRange,
							endOfRange: cell.isEndOfRange,
							isPast: cell.isInPreviousMonth
						})}
					>
						{#if cell.isToday}
							<Badge
								size="small"
								color="danger"
								class="top-1 right-1 aspect-square !size-2 min-h-2 min-w-2"
							/>
						{/if}
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
