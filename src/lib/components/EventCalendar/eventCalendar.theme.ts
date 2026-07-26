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
	outside: { true: 'text-neutral/45', false: '' },
	offDay: { true: 'bg-surface-recessed/70', false: '' },
	display: { auto: '', background: 'pointer-events-none opacity-40' },
	isStart: { true: '', false: 'rounded-s-none' },
	isEnd: { true: '', false: 'rounded-e-none' },
	continuesBefore: { true: 'border-s-2 border-s-color', false: '' },
	continuesAfter: { true: 'border-e-2 border-e-color', false: '' }
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
const viewport = createEventCalendarPart('relative min-h-0 w-full');
const loading = createEventCalendarPart(
	'absolute inset-0 z-50 grid place-items-center bg-surface/75 backdrop-blur-[1px]'
);
const empty = createEventCalendarPart('text-center text-neutral/70', {
	small: 'p-2 text-xs',
	normal: 'p-3 text-sm',
	large: 'p-4 text-base'
});

const month = createEventCalendarPart('relative min-w-0');
const monthHeader = createEventCalendarPart('grid');
const dayHeader = createEventCalendarPart('min-w-0 truncate font-medium');
const monthGrid = createEventCalendarPart('grid min-w-0');
const weekRow = createEventCalendarPart('grid min-w-0');
const weekNumber = createEventCalendarPart('text-center text-neutral/50');
const monthCell = createEventCalendarPart('relative min-w-0 border-neutral-muted');
const dayNumber = createEventCalendarPart(
	'inline-flex min-h-6 min-w-6 items-center justify-center rounded-full'
);
const barLayer = createEventCalendarPart('relative min-w-0');

const timeGrid = createEventCalendarPart('relative min-w-0');
const timeHeader = createEventCalendarPart(
	'sticky top-[var(--event-calendar-sticky-offset)] z-20 grid bg-surface-raised'
);
const timeGutter = createEventCalendarPart('w-[var(--event-calendar-time-gutter-width)] shrink-0');
const timeLabel = createEventCalendarPart('text-neutral/55 tabular-nums');
const allDayRow = createEventCalendarPart('grid border-b border-neutral-muted');
const allDayCell = createEventCalendarPart('relative min-w-0');
const dayColumn = createEventCalendarPart('relative min-w-[var(--event-calendar-day-min-width)]');
const timeSlot = createEventCalendarPart(
	'h-[var(--event-calendar-slot-height)] border-b border-neutral-muted/60'
);
const nowIndicator = createEventCalendarPart('pointer-events-none absolute z-30 h-px bg-danger');

const item = createEventCalendarPart(
	'relative min-h-[var(--event-calendar-item-min-height)] min-w-0'
);
const itemControl = createEventCalendarPart(
	'state-layer h-full w-full min-w-0 rounded bg-[var(--event-calendar-item-color)] text-start outline-none focus-visible:ring-2 focus-visible:ring-color/60'
);
const itemContent = createEventCalendarPart('flex min-w-0 flex-col overflow-hidden');
const itemTitle = createEventCalendarPart('truncate font-medium');
const itemTime = createEventCalendarPart('truncate text-xs opacity-75 tabular-nums');
const overflow = createEventCalendarPart('state-layer rounded text-color-readable');
const overflowPopover = createEventCalendarPart('min-w-56');
const dragPreview = createEventCalendarPart(
	'pointer-events-none rounded bg-color text-color-contrast shadow-lg'
);
const dropIndicator = createEventCalendarPart('pointer-events-none absolute z-40 bg-color');
const slotSelection = createEventCalendarPart(
	'pointer-events-none absolute z-20 border border-color bg-color/15'
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
