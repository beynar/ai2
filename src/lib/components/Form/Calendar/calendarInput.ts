import type { fieldTheme, InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { ButtonProps } from '$lib/components/Button/button.js';
import type { Snippet } from 'svelte';
import type { Event, Cell, CalendarType } from './useCalendar.svelte.js';
import type { calendarTheme } from './calendar.theme.js';

// Re-export types and values from useCalendar
export type { Event, Cell, CalendarType } from './useCalendar.svelte.js';
export { CalendarState } from './useCalendar.svelte.js';

export type CalendarPrimitiveProps<E extends Event, T extends CalendarType> = BaseCalendarProps<E> &
	(T extends 'calendar'
		? {
				type: 'calendar';
				value?: Date | null;
				onChange?: (value: Date | null) => void;
			}
		: {
				type: 'calendar-range';
				value?: [Date | null, Date | null] | null;
				onChange?: (value: [Date | null, Date | null] | null) => void;
			});

export type BaseCalendarProps<E extends Event> = WithSlot<
	{
		events?: E[];
		weekStartsOnMonday?: boolean;
		minDate?: Date;
		maxDate?: Date;
		view?: 'single' | 'double';
		class?: string;
		weekdayLength?: 'narrow' | 'short';
		disabledDates?: (Date | [Date, Date])[];
		theme?: InferComponentTheme<typeof calendarTheme>;
		cell?: Snippet<[import('./useCalendar.svelte.js').Cell]>;
		buttons?:
			| {
					prev: ButtonProps;
					next: ButtonProps;
			  }
			| ButtonProps;
	},
	'header',
	never
>;

export type CalendarInputProps<T extends 'calendar' | 'calendar-range'> = CalendarPrimitiveProps<
	any,
	T
> &
	Omit<InputProps<T>, 'children' | 'type' | 'theme'> & {
		theme?: {
			calendar: InferComponentTheme<typeof calendarTheme>;
			field: InferComponentTheme<typeof fieldTheme>;
		};
	};
