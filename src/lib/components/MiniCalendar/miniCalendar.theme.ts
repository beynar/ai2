import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'inline-flex w-fit items-center rounded-2xl border bg-background',
	variants: {
		size: {
			small: 'gap-0.5 p-0.5',
			normal: 'gap-1 p-1',
			large: 'gap-1.5 p-1.5'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultNavButton = cva({
	base: 'state-layer inline-flex shrink-0 items-center justify-center rounded-xl text-foreground-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none',
	variants: {
		size: {
			small: 'size-7',
			normal: 'size-9',
			large: 'size-11'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

// A single-cell grid so the outgoing and incoming tracks overlap during the slide; the
// padding/negative-margin pair keeps focus rings visible inside the overflow clip.
const defaultDays = cva({
	base: 'grid -m-0.5 overflow-hidden p-0.5'
});

const defaultTrack = cva({
	base: 'col-start-1 row-start-1 flex items-center',
	variants: {
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultDay = cva({
	base: 'state-layer relative inline-flex shrink-0 flex-col items-center justify-center rounded-xl leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none',
	variants: {
		size: {
			small: 'min-w-11 gap-0.5 px-2 py-1',
			normal: 'min-w-14 gap-0.5 px-3 py-1.5',
			large: 'min-w-16 gap-1 px-4 py-2'
		},
		color: {
			primary: '',
			secondary: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			foreground: '',
			background: ''
		},
		selected: {
			true: 'raised',
			false: 'text-foreground'
		},
		today: {
			true: '',
			false: ''
		},
		disabled: {
			true: '',
			false: 'cursor-pointer'
		}
	},
	compoundVariants: [
		// Selected day: elevated, filled with the accent color.
		{ selected: true, color: 'primary', class: 'bg-primary text-primary-contrast' },
		{ selected: true, color: 'secondary', class: 'bg-secondary text-secondary-contrast' },
		{ selected: true, color: 'danger', class: 'bg-danger text-danger-contrast' },
		{ selected: true, color: 'success', class: 'bg-success text-success-contrast' },
		{ selected: true, color: 'warning', class: 'bg-warning text-warning-contrast' },
		{ selected: true, color: 'info', class: 'bg-info text-info-contrast' },
		{ selected: true, color: 'foreground', class: 'bg-foreground text-foreground-contrast' },
		{ selected: true, color: 'background', class: 'bg-background-dark text-foreground' },
		// Today (when not selected): a subtle accent tint.
		{ selected: false, today: true, color: 'primary', class: 'bg-primary/10 text-primary' },
		{ selected: false, today: true, color: 'secondary', class: 'bg-secondary/10 text-secondary' },
		{ selected: false, today: true, color: 'danger', class: 'bg-danger/10 text-danger' },
		{ selected: false, today: true, color: 'success', class: 'bg-success/10 text-success' },
		{ selected: false, today: true, color: 'warning', class: 'bg-warning/10 text-warning' },
		{ selected: false, today: true, color: 'info', class: 'bg-info/10 text-info' },
		{
			selected: false,
			today: true,
			color: 'foreground',
			class: 'bg-foreground/10 text-foreground'
		},
		{
			selected: false,
			today: true,
			color: 'background',
			class: 'bg-background-muted text-foreground'
		}
	],
	defaultVariants: {
		size: 'normal',
		color: 'primary',
		selected: false,
		today: false,
		disabled: false
	}
});

const defaultDayMonth = cva({
	base: 'font-medium uppercase tracking-wide opacity-70',
	variants: {
		size: {
			small: 'text-[10px]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultDayNumber = cva({
	base: 'font-semibold tabular-nums',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-lg'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const miniCalendarTheme = {
	root: defaultRoot,
	navButton: defaultNavButton,
	days: defaultDays,
	track: defaultTrack,
	day: defaultDay,
	dayMonth: defaultDayMonth,
	dayNumber: defaultDayNumber
};

export type MiniCalendarTheme = typeof miniCalendarTheme;
export type MiniCalendarThemeProps = InferComponentTheme<MiniCalendarTheme>;
export const setMiniCalendarTheme = setComponentTheme<MiniCalendarTheme>('miniCalendar');
export const useMiniCalendarTheme = useComponentTheme('miniCalendar', miniCalendarTheme);
