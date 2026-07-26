import {
	cva,
	setComponentTheme,
	type InferComponentTheme,
	useComponentTheme
} from '$lib/utils/cva/index.js';

type DensityClasses = Record<'small' | 'normal' | 'large', string>;

const densityVariants: DensityClasses = {
	small: '',
	normal: '',
	large: ''
};

const eventCalendarVariants = {
	density: densityVariants,
	color: {
		primary: '',
		secondary: '',
		danger: '',
		success: '',
		warning: '',
		info: '',
		neutral: ''
	},
	view: {
		month: '',
		week: '',
		day: '',
		days: '',
		agenda: '',
		resource: ''
	},
	selected: { true: 'ring-2 ring-color/60', false: '' },
	dragging: { true: 'cursor-grabbing opacity-70', false: '' },
	invalid: { true: 'ring-2 ring-danger/70', false: '' },
	disabled: { true: '', false: '' },
	today: { true: 'bg-color-muted/30', false: '' },
	outside: { true: 'text-neutral/70', false: '' },
	offDay: { true: 'bg-surface-recessed/70', false: '' },
	display: { auto: '', background: 'pointer-events-none opacity-40' },
	isStart: { true: '', false: 'rounded-s-none' },
	isEnd: { true: '', false: 'rounded-e-none' },
	continuesBefore: { true: 'border-s-2 border-s-[var(--event-calendar-item-color)]', false: '' },
	continuesAfter: { true: 'border-e-2 border-e-[var(--event-calendar-item-color)]', false: '' }
} as const;

const defaultVariants = {
	density: 'normal',
	color: 'primary',
	view: 'month',
	selected: false,
	dragging: false,
	invalid: false,
	disabled: false,
	today: false,
	outside: false,
	offDay: false,
	display: 'auto',
	isStart: true,
	isEnd: true,
	continuesBefore: false,
	continuesAfter: false
} as const;

function createEventCalendarPart(base: string, density: DensityClasses = densityVariants) {
	return cva({
		base,
		variants: { ...eventCalendarVariants, density },
		defaultVariants
	});
}

const root = createEventCalendarPart(
	'relative isolate flex min-w-0 flex-col rounded-lg border border-neutral-muted bg-surface text-neutral [container-type:inline-size] [--event-calendar-slot-height:3rem] [--event-calendar-time-gutter-width:4rem] [--event-calendar-day-min-width:8rem] [--event-calendar-resource-min-width:10rem] [--event-calendar-item-min-height:1.5rem] [--event-calendar-sticky-offset:0px] [--event-calendar-item-color:var(--color)]',
	{
		small:
			'[--event-calendar-slot-height:2.5rem] [--event-calendar-time-gutter-width:3.5rem] [--event-calendar-item-min-height:1.25rem]',
		normal: '',
		large:
			'[--event-calendar-slot-height:3.5rem] [--event-calendar-time-gutter-width:4.5rem] [--event-calendar-item-min-height:1.75rem]'
	}
);
const header = createEventCalendarPart(
	'flex min-w-0 flex-wrap items-center border-b border-neutral-muted bg-surface-raised',
	{
		small: 'gap-1.5 p-2',
		normal: 'gap-2 p-3',
		large: 'gap-3 p-4'
	}
);
const navigation = createEventCalendarPart('flex shrink-0 items-center', {
	small: 'gap-1',
	normal: 'gap-1.5',
	large: 'gap-2'
});
const title = createEventCalendarPart('min-w-0 flex-1 truncate font-semibold', {
	small: 'text-sm',
	normal: 'text-base',
	large: 'text-lg'
});
const viewSwitcher = createEventCalendarPart('ms-auto shrink-0');
const actions = createEventCalendarPart('flex shrink-0 items-center', {
	small: 'gap-1',
	normal: 'gap-2',
	large: 'gap-3'
});
const content = createEventCalendarPart('relative min-h-0 flex-1');
const viewport = createEventCalendarPart('relative h-full min-h-0 w-full');
const loading = createEventCalendarPart(
	'absolute inset-0 z-50 grid place-items-center bg-surface/75 backdrop-blur-[1px]'
);
const empty = createEventCalendarPart('text-center text-neutral/70', {
	small: 'p-2 text-xs',
	normal: 'p-3 text-sm',
	large: 'p-4 text-base'
});

const month = createEventCalendarPart('relative flex h-full min-w-0 flex-col');
const monthHeader = createEventCalendarPart('grid shrink-0 border-b border-neutral-muted');
const dayHeader = createEventCalendarPart('min-w-0 truncate px-1 py-1.5 text-center font-medium', {
	small: 'text-xs',
	normal: 'text-sm',
	large: 'py-2 text-base'
});
const monthGrid = createEventCalendarPart(
	'grid min-h-0 min-w-0 flex-1 auto-rows-[minmax(6rem,1fr)]'
);
const weekRow = createEventCalendarPart('relative grid min-h-24 min-w-0');
const weekNumber = createEventCalendarPart('grid place-items-center text-center text-neutral/70', {
	small: 'text-[0.625rem]',
	normal: 'text-xs',
	large: 'text-sm'
});
const monthCell = createEventCalendarPart(
	'relative min-w-0 cursor-default overflow-visible border-e border-b border-neutral-muted p-1 outline-none focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60'
);
const dayNumber = createEventCalendarPart(
	'inline-flex min-h-6 min-w-6 items-center justify-center rounded-full'
);
const barLayer = createEventCalendarPart('pointer-events-none absolute inset-0 min-w-0');

const timeGrid = createEventCalendarPart('relative min-h-full min-w-0');
const timeHeader = createEventCalendarPart('grid bg-surface-raised');
const timeGutter = createEventCalendarPart(
	'relative w-[var(--event-calendar-time-gutter-width)] shrink-0 border-e border-neutral-muted bg-surface'
);
const timeLabel = createEventCalendarPart(
	'block whitespace-nowrap pe-2 text-end text-xs text-neutral/75 tabular-nums'
);
const allDayRow = createEventCalendarPart('relative grid border-b border-neutral-muted bg-surface');
const allDayCell = createEventCalendarPart(
	'relative min-w-0 border-e border-neutral-muted outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60'
);
const dayColumn = createEventCalendarPart(
	'relative min-w-[var(--event-calendar-day-min-width)] border-e border-neutral-muted'
);
const timeSlot = createEventCalendarPart(
	'h-[var(--event-calendar-slot-height)] w-full bg-transparent outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60'
);
const nowIndicator = createEventCalendarPart('pointer-events-none absolute z-30 h-px bg-danger');

const item = createEventCalendarPart(
	'relative min-h-[var(--event-calendar-item-min-height)] min-w-0'
);
const itemControl = createEventCalendarPart(
	'state-layer h-full w-full min-w-0 rounded bg-[color-mix(in_oklab,var(--event-calendar-item-color)_18%,var(--color-surface))] px-1.5 py-0.5 text-start text-neutral outline-none focus-visible:ring-2 focus-visible:ring-color/60'
);
const itemContent = createEventCalendarPart('flex min-w-0 items-baseline gap-1 overflow-hidden');
const itemTitle = createEventCalendarPart('truncate font-medium');
const itemTime = createEventCalendarPart(
	'truncate bg-[color-mix(in_oklab,var(--event-calendar-item-color)_18%,var(--color-surface))] text-xs text-neutral tabular-nums'
);
const overflow = createEventCalendarPart(
	'state-layer min-h-6 w-full truncate rounded px-1 text-start text-xs font-medium text-neutral outline-none focus-visible:ring-2 focus-visible:ring-color/60'
);
const overflowPopover = createEventCalendarPart('min-w-56 max-w-80 p-2');
const dragPreview = createEventCalendarPart(
	'pointer-events-none z-50 -translate-x-1/2 translate-y-3 rounded bg-color px-2 py-1 text-sm text-color-contrast shadow-lg'
);
const dropIndicator = createEventCalendarPart('pointer-events-none z-40 bg-color');
const slotSelection = createEventCalendarPart(
	'pointer-events-none z-20 border border-color bg-color/15'
);
const resizeHandle = createEventCalendarPart(
	'absolute z-30 touch-none outline-none focus-visible:ring-2 focus-visible:ring-color'
);
const actionTrigger = createEventCalendarPart('shrink-0');

const agenda = createEventCalendarPart('relative min-w-0');
const agendaDay = createEventCalendarPart('border-b border-neutral-muted');
const agendaItem = createEventCalendarPart('min-w-0');
const agendaDetails = createEventCalendarPart('min-w-0 text-neutral/70');
const resourceHeader = createEventCalendarPart(
	'min-w-[var(--event-calendar-resource-min-width)] truncate font-medium'
);

export const eventCalendarTheme = {
	root,
	header,
	navigation,
	title,
	viewSwitcher,
	actions,
	content,
	viewport,
	loading,
	empty,
	month,
	monthHeader,
	dayHeader,
	monthGrid,
	weekRow,
	weekNumber,
	monthCell,
	dayNumber,
	barLayer,
	timeGrid,
	timeHeader,
	timeGutter,
	timeLabel,
	allDayRow,
	allDayCell,
	dayColumn,
	timeSlot,
	nowIndicator,
	item,
	itemControl,
	itemContent,
	itemTitle,
	itemTime,
	overflow,
	overflowPopover,
	dragPreview,
	dropIndicator,
	slotSelection,
	resizeHandle,
	actionTrigger,
	agenda,
	agendaDay,
	agendaItem,
	agendaDetails,
	resourceHeader
};

export type EventCalendarTheme = typeof eventCalendarTheme;
export type EventCalendarThemeProps = InferComponentTheme<EventCalendarTheme>;
export const setEventCalendarTheme = setComponentTheme<EventCalendarTheme>('eventCalendar');
export const useEventCalendarTheme = useComponentTheme<EventCalendarTheme>(
	'eventCalendar',
	eventCalendarTheme
);
export type EventCalendarClasses = ReturnType<typeof useEventCalendarTheme>;
