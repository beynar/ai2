import type { fieldTheme, InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva/index.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { ButtonProps } from '$lib/components/Button/index.js';
import type { Snippet } from 'svelte';
import type { Event, CalendarType } from './useCalendar.svelte.js';
import type { calendarTheme } from './calendar.theme.js';
import type { ChipProps } from '$lib/components/Chip/chip.props.js';

// Re-export types and values from useCalendar
export type { Event, Cell, CalendarType } from './useCalendar.svelte.js';
export { CalendarState } from './useCalendar.svelte.js';

export type CalendarPrimitiveProps<E extends Event, T extends CalendarType> = BaseCalendarProps<E> &
	(T extends 'calendar'
		? {
				/** Sets the input mode to single-date selection. */
				type: 'calendar';
				/** Currently selected date, or null when none is chosen. */
				value?: Date | null;
				/** Called when the selected date changes. */
				onChange?: (value: Date | null) => void;
			}
		: {
				/** Sets the input mode to date-range selection. */
				type: 'calendar-range';
				/** Selected start and end dates, or null when the range is cleared. */
				value?: [Date | null, Date | null] | null;
				/** Called when the selected date range changes. */
				onChange?: (value: [Date | null, Date | null] | null) => void;
			});

export type BaseCalendarProps<E extends Event> = WithSlot<
	{
		/** Events associated with calendar dates. */
		events?: E[];
		/** When true, the week starts on Monday instead of Sunday. */
		weekStartsOnMonday?: boolean;
		/** Earliest date that can be selected. */
		minDate?: Date;
		/** Latest date that can be selected. */
		maxDate?: Date;
		/** Shows one month or two months side by side. */
		view?: 'single' | 'double';
		/** Additional CSS classes for the calendar container. */
		class?: string;
		/** Length format for weekday header labels. */
		weekdayLength?: 'narrow' | 'short';
		/** Individual dates or inclusive ranges that cannot be selected. */
		disabledDates?: (Date | [Date, Date])[];
		/** Theme overrides for the calendar component. */
		theme?: InferComponentTheme<typeof calendarTheme>;
		/** Custom snippet renderer for each day cell. */
		cell?: Snippet<[import('./useCalendar.svelte.js').Cell]>;
		/** Chip props applied to mark the current day. */
		todayBadge?: Pick<ChipProps, 'size' | 'color' | 'class'>;
		/** Button props for month navigation, shared or split per direction. */
		buttons?:
			| {
					/** Props for the previous-month button. */
					prev: ButtonProps;
					/** Props for the next-month button. */
					next: ButtonProps;
			  }
			| ButtonProps;
		/** Called after month navigation with the newly visible month range. */
		onViewChange?: (params: {
			/** Year of the first visible month. */
			startYear: number;
			/** Month index (0–11) of the first visible month. */
			startMonth: number;
			/** Year of the last visible month. */
			endYear: number;
			/** Month index (0–11) of the last visible month. */
			endMonth: number;
		}) => void;
	},
	'header'
>;

export type CalendarInputProps<T extends 'calendar' | 'calendar-range'> = CalendarPrimitiveProps<
	any,
	T
> &
	Omit<InputProps<T>, 'children' | 'type' | 'theme'> & {
		/** Theme overrides for the calendar and its field wrapper. */
		theme?: {
			/** Theme overrides for the calendar grid. */
			calendar: InferComponentTheme<typeof calendarTheme>;
			/** Theme overrides for the surrounding field. */
			field: InferComponentTheme<typeof fieldTheme>;
		};
	};
