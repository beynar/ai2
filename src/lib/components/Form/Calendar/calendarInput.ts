import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { ButtonProps } from '$lib/components/Button/button.js';
import type { Snippet } from 'svelte';
import type { Event, Cell, CalendarType } from './useCalendar.svelte.js';

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
		weekdayLength?: 'narrow' | 'short';
		disabledDates?: (Date | [Date, Date])[];
		containerClass?: string;
		headerClass?: string;
		dayClass?: string;
		weekdayClass?: string;
		gridClass?: string;
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
	Omit<InputProps<T>, 'children' | 'type'> & {
		theme?: InferComponentTheme<typeof calendarInputTheme> & InputProps<T>['theme'];
	};

const defaultContainer = cva({
	base: 'flex flex-col gap-4 p-4 rounded-lg bg-surface-light border border-surface-muted w-full'
});

const defaultHeader = cva({
	base: 'flex items-center justify-between gap-2 font-semibold text-contrast px-2'
});

const defaultGrid = cva({
	base: 'grid grid-cols-7 gap-1'
});

const defaultWeekday = cva({
	base: 'text-center text-xs font-medium text-contrast-muted uppercase py-2'
});

const defaultDay = cva({
	base: 'aspect-square flex items-center justify-center rounded-md text-sm transition-colors hover:bg-surface-muted cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
	variants: {
		selected: {
			true: 'bg-primary text-primary-contrast font-semibold hover:bg-primary-dark'
		},
		inMonth: {
			true: 'text-contrast',
			false: 'text-contrast-muted opacity-50'
		},
		inRange: {
			true: 'bg-primary-light text-contrast'
		},
		today: {
			true: 'ring-2 ring-primary ring-inset'
		},
		disabled: {
			true: 'opacity-30 cursor-not-allowed hover:bg-transparent'
		},
		startOfRange: {
			true: 'rounded-r-none'
		},
		endOfRange: {
			true: 'rounded-l-none'
		},
		isPast: {
			true: ''
		}
	},
	compoundVariants: [
		{
			inRange: true,
			startOfRange: false,
			endOfRange: false,
			class: 'rounded-none'
		}
	]
});

export const calendarInputTheme = {
	container: defaultContainer,
	header: defaultHeader,
	grid: defaultGrid,
	weekday: defaultWeekday,
	day: defaultDay
};
