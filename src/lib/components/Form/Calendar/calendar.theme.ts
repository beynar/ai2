import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultContainer = cva({
	base: 'flex w-full flex-col gap-3 rounded-lg border border-background-muted bg-background-light p-2'
});

const defaultHeader = cva({
	base: 'flex min-h-8 items-center gap-2 px-1 font-semibold text-foreground',
	variants: {
		picker: {
			true: 'justify-center',
			false: 'justify-between'
		}
	},
	defaultVariants: {
		picker: false
	}
});

const defaultViewTrigger = cva({
	base: 'min-w-0 max-w-full px-2 font-semibold'
});

const defaultViewport = cva({
	base: 'relative grid overflow-hidden'
});

const defaultViewPanel = cva({
	base: 'col-start-1 row-start-1 min-w-0 w-full'
});

const defaultMonths = cva({
	base: 'col-start-1 row-start-1 grid min-w-0 gap-3',
	variants: {
		view: {
			single: 'grid-cols-1',
			double: 'grid-cols-2'
		}
	},
	defaultVariants: {
		view: 'single'
	}
});

const defaultGrid = cva({
	base: 'grid min-w-0 grid-cols-7 gap-0.5'
});

const defaultPicker = cva({
	base: 'grid min-h-0 grid-cols-2 gap-2'
});

const defaultPickerColumn = cva({
	base: 'grid min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-1'
});

const defaultPickerLabel = cva({
	base: 'px-2 text-center text-xs font-medium text-foreground-muted'
});

const defaultPickerScrollArea = cva({
	base: 'flex h-48 min-h-0 flex-col'
});

const defaultPickerOptions = cva({
	base: 'flex min-w-0 flex-col gap-0.5 p-0.5'
});

const defaultPickerOption = cva({
	base: 'w-full cursor-pointer rounded-md px-2 py-1.5 text-center text-sm text-foreground outline-none transition-colors hover:bg-background-muted focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40',
	variants: {
		selected: {
			true: 'bg-primary-lighter font-semibold text-primary-dark hover:bg-primary-lighter',
			false: null
		},
		disabled: {
			true: 'pointer-events-none',
			false: null
		}
	}
});

const defaultWeekday = cva({
	base: 'text-center text-xs font-medium text-foreground-muted uppercase py-2'
});

const defaultDay = cva({
	base: 'relative flex aspect-square max-h-10 w-full cursor-pointer items-center justify-center rounded-md text-sm ring-inset outline-none transition-colors hover:z-[1] hover:ring-2 hover:ring-primary focus-visible:z-[2] focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
	variants: {
		selected: {
			true: 'bg-primary-lighter !text-primary-dark font-semibold hover:bg-primary-lighter'
		},
		inMonth: {
			true: 'text-foreground',
			false: 'text-foreground-muted opacity-50'
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
	root: defaultContainer,
	header: defaultHeader,
	viewTrigger: defaultViewTrigger,
	viewport: defaultViewport,
	viewPanel: defaultViewPanel,
	months: defaultMonths,
	grid: defaultGrid,
	picker: defaultPicker,
	pickerColumn: defaultPickerColumn,
	pickerLabel: defaultPickerLabel,
	pickerScrollArea: defaultPickerScrollArea,
	pickerOptions: defaultPickerOptions,
	pickerOption: defaultPickerOption,
	weekday: defaultWeekday,
	day: defaultDay
};

export type CalendarTheme = typeof calendarTheme;
export type CalendarThemeProps = InferComponentTheme<CalendarTheme>;
export const setCalendarInputTheme = setComponentTheme<CalendarTheme>('calendar');
export const useCalendarInputTheme = useComponentTheme<CalendarTheme>('calendar', calendarTheme);
