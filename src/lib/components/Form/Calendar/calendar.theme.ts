import { cva } from '$lib/utils/cva.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';

const defaultContainer = cva({
	base: 'flex flex-col gap-4 p-2 rounded-lg bg-surface-light border border-surface-muted w-full'
});

const defaultHeader = cva({
	base: 'flex items-center justify-between gap-2 font-semibold text-contrast px-2'
});

const defaultGrid = cva({
	base: 'grid grid-cols-7 gap-0.5'
});

const defaultWeekday = cva({
	base: 'text-center text-xs font-medium text-contrast-muted uppercase py-2'
});

const defaultDay = cva({
	base: 'aspect-square max-h-10 w-full hover:z-[+1] flex items-center justify-center rounded-md text-sm transition-colors hover:ring-2 hover:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
	variants: {
		selected: {
			true: 'bg-primary-lighter !text-primary-dark font-semibold hover:bg-primary-lighter'
		},
		inMonth: {
			true: 'text-contrast',
			false: 'text-contrast-muted opacity-50'
		},
		inRange: {
			true: 'bg-primary-lighter text-primary '
		},
		today: {
			true: ''
		},
		disabled: {
			true: 'opacity-30 cursor-not-allowed hover:bg-transparent'
		},
		startOfRange: {
			true: `relative rounded-r-none before:content-["|"] before:text-primary-dark before:text-sm before:font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2`
		},
		endOfRange: {
			true: `relative rounded-l-none before:content-["|"] before:text-primary-dark before:text-sm before:font-semibold before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2`
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
			class: 'scale-x-105 rounded-none'
		}
	]
});

export const calendarTheme = {
	container: defaultContainer,
	header: defaultHeader,
	grid: defaultGrid,
	weekday: defaultWeekday,
	day: defaultDay
};

export type CalendarTheme = typeof calendarTheme;
export type CalendarThemeProps = InferComponentTheme<CalendarTheme>;
export const setCalendarInputTheme = setComponentTheme<CalendarTheme>('calendar');
export const useCalendarInputTheme = useComponentTheme('calendar', calendarTheme);

