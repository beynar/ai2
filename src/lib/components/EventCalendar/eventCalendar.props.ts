import type { Messages } from '$lib/i18n/en.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Density } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { EventCalendarThemeProps } from './eventCalendar.theme.js';
import type {
	EventCalendarApi,
	EventCalendarBusinessHours,
	EventCalendarChange,
	EventCalendarCreateActivation,
	EventCalendarDateOnly,
	EventCalendarInteractionBlockedInfo,
	EventCalendarInteractions,
	EventCalendarItem,
	EventCalendarOccurrence,
	EventCalendarOffDaysConfig,
	EventCalendarOverlapPredicate,
	EventCalendarProposedUpdate,
	EventCalendarRange,
	EventCalendarRangeChangeInfo,
	EventCalendarRecurrenceExpander,
	EventCalendarResource,
	EventCalendarSegment,
	EventCalendarSelection,
	EventCalendarSlot,
	EventCalendarSlotSelectInfo,
	EventCalendarUpdateResult,
	EventCalendarView,
	EventCalendarWeekday
} from './eventCalendar.types.js';

export type { EventCalendarThemeProps } from './eventCalendar.theme.js';

export type EventCalendarSnapshot<
	TItemFields extends object,
	TResourceFields extends object
> = Readonly<{
	items: readonly EventCalendarItem<TItemFields>[];
	resources: readonly EventCalendarResource<TResourceFields>[];
	view: EventCalendarView;
	date: Date;
	range: EventCalendarRangeChangeInfo;
	selection: EventCalendarSelection;
	loading: boolean;
	disabled: boolean;
	api: EventCalendarApi<TItemFields>;
}>;

export type EventCalendarHeaderPayload<
	TItemFields extends object,
	TResourceFields extends object
> = Readonly<
	EventCalendarSnapshot<TItemFields, TResourceFields> & {
		previous: Snippet;
		today: Snippet;
		next: Snippet;
		title: Snippet;
		viewSwitcher: Snippet;
		datePicker: Snippet;
		actions: Snippet;
	}
>;

export type EventCalendarItemPayload<TItemFields extends object> = Readonly<{
	occurrence: EventCalendarOccurrence<TItemFields>;
	segment: EventCalendarSegment<TItemFields>;
	view: EventCalendarView;
	isSelected: boolean;
	isDragging: boolean;
	defaultContent: Snippet;
	markerContent: Snippet;
	titleContent: Snippet;
	timeContent: Snippet;
}>;

export type EventCalendarItemTooltipPayload<TItemFields extends object> = Readonly<{
	occurrence: EventCalendarOccurrence<TItemFields>;
	segment: EventCalendarSegment<TItemFields>;
	view: EventCalendarView;
	defaultAccessibleLabel: string;
	defaultContent: Snippet;
}>;

export type EventCalendarMonthCellPayload<TItemFields extends object> = Readonly<{
	day: EventCalendarDateOnly;
	segments: readonly EventCalendarSegment<TItemFields>[];
	isToday: boolean;
	isOutside: boolean;
	isOffDay: boolean;
	isDisabled: boolean;
	overflowCount: number;
	defaultContent: Snippet;
}>;

export type EventCalendarDayHeaderPayload = Readonly<{
	day: EventCalendarDateOnly;
	view: EventCalendarView;
	isToday: boolean;
	defaultLabel: string;
	defaultContent: Snippet;
}>;

export type EventCalendarTimeGutterPayload = Readonly<{
	instant: Date;
	defaultLabel: string;
	defaultContent: Snippet;
}>;

export type EventCalendarAllDayPayload<TItemFields extends object> = Readonly<{
	visibleDays: readonly EventCalendarDateOnly[];
	segments: readonly EventCalendarSegment<TItemFields>[];
	defaultContent: Snippet;
}>;

export type EventCalendarOverflowPayload<TItemFields extends object> = Readonly<{
	day: EventCalendarDateOnly;
	hiddenOccurrences: readonly EventCalendarOccurrence<TItemFields>[];
	count: number;
	defaultContent: Snippet;
}>;

export type EventCalendarOverflowContentPayload<TItemFields extends object> = Readonly<{
	day: EventCalendarDateOnly;
	hiddenOccurrences: readonly EventCalendarOccurrence<TItemFields>[];
	close: () => void;
	defaultContent: Snippet;
}>;

export type EventCalendarAgendaDetailsPayload<TItemFields extends object> = Readonly<{
	occurrence: EventCalendarOccurrence<TItemFields>;
}>;

export type EventCalendarResourceHeaderPayload<TResourceFields extends object> = Readonly<{
	resource: EventCalendarResource<TResourceFields> | null;
	depth: number;
	isUnassigned: boolean;
	defaultContent: Snippet;
}>;

export type EventCalendarNowIndicatorPayload = Readonly<{
	now: Date;
	defaultContent: Snippet;
}>;

export type EventCalendarDragPreviewPayload<TItemFields extends object> = Readonly<{
	proposal: EventCalendarProposedUpdate<TItemFields>;
	isValid: boolean;
	defaultContent: Snippet;
}>;

export type EventCalendarViewPayload = Readonly<{
	view: EventCalendarView;
	visibleRange: EventCalendarRange;
	visibleDays: readonly EventCalendarDateOnly[];
}>;

export type EventCalendarEmptyPayload = Readonly<
	EventCalendarViewPayload & {
		mode: 'grid-status' | 'agenda-replacement';
		defaultContent: Snippet;
	}
>;

export type EventCalendarLoadingPayload = Readonly<
	EventCalendarViewPayload & {
		defaultContent: Snippet;
	}
>;

export type EventCalendarSnippetProps<
	TItemFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>
> = {
	header?: Snippet<[EventCalendarHeaderPayload<TItemFields, TResourceFields>]>;
	actions?: Snippet<[EventCalendarSnapshot<TItemFields, TResourceFields>]>;
	item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
	itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
	monthCell?: Snippet<[EventCalendarMonthCellPayload<TItemFields>]>;
	dayHeader?: Snippet<[EventCalendarDayHeaderPayload]>;
	timeGutter?: Snippet<[EventCalendarTimeGutterPayload]>;
	allDay?: Snippet<[EventCalendarAllDayPayload<TItemFields>]>;
	overflow?: Snippet<[EventCalendarOverflowPayload<TItemFields>]>;
	overflowContent?: Snippet<[EventCalendarOverflowContentPayload<TItemFields>]>;
	agendaDetails?: Snippet<[EventCalendarAgendaDetailsPayload<TItemFields>]>;
	resourceHeader?: Snippet<[EventCalendarResourceHeaderPayload<TResourceFields>]>;
	nowIndicatorContent?: Snippet<[EventCalendarNowIndicatorPayload]>;
	dragPreview?: Snippet<[EventCalendarDragPreviewPayload<TItemFields>]>;
	empty?: Snippet<[EventCalendarEmptyPayload]>;
	loadingContent?: Snippet<[EventCalendarLoadingPayload]>;
};

export type EventCalendarCallbackProps<TItemFields extends object = Record<never, never>> = {
	onRangeChange?: (info: EventCalendarRangeChangeInfo) => void;
	onItemsChange?: (
		items: EventCalendarItem<TItemFields>[],
		change: EventCalendarChange<TItemFields>
	) => void;
	onViewChange?: (view: EventCalendarView) => void;
	onDateChange?: (date: Date) => void;
	onDayCountChange?: (dayCount: number) => void;
	onSelectionChange?: (selection: EventCalendarSelection) => void;
	onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
	onItemDoubleClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
	onSlotClick?: (slot: EventCalendarSlot, event: MouseEvent) => void;
	onSlotSelect?: (slot: EventCalendarSlot, info: EventCalendarSlotSelectInfo) => void;
	onMoreClick?: (
		day: EventCalendarDateOnly,
		occurrences: readonly EventCalendarOccurrence<TItemFields>[],
		event: MouseEvent
	) => false | void;
	onInteractionBlocked?: (info: EventCalendarInteractionBlockedInfo<TItemFields>) => void;
};

type EventCalendarOwnProps<
	TItemFields extends object,
	TResourceFields extends object
> = EventCalendarSnippetProps<TItemFields, TResourceFields> &
	EventCalendarCallbackProps<TItemFields> & {
		/** Bindable immutable item definitions. Defaults to `[]`. */
		items?: EventCalendarItem<TItemFields>[];
		/** Bindable active view. Defaults to `month`. */
		view?: EventCalendarView;
		/** Ordered, unique views. Defaults to `['month', 'week', 'day', 'days', 'agenda', 'resource']`. */
		views?: EventCalendarView[];
		/** Required bindable anchor instant. */
		date: Date;
		/** Bindable visible-day count for the `days` view. Defaults to `3`. */
		dayCount?: number;
		/** Bindable item or slot selection. Defaults to the empty selection. */
		selection?: EventCalendarSelection;
		/** Immutable flat resources whose `parentId` values form groups. Defaults to `[]`. */
		resources?: EventCalendarResource<TResourceFields>[];
		/** Marks content busy and blocks content interactions. Defaults to `false`. */
		loading?: boolean;
		/** Disables navigation, selection, and mutations. Defaults to `false`. */
		disabled?: boolean;
		/** Chrome and item spacing, independent of the time scale. Defaults to `normal`. */
		density?: Density;
		/** Root classes; contained scrolling requires an explicit height here. Defaults to none. */
		class?: string;
		/** Bindable root element reference. Defaults to none. */
		ref?: HTMLElement | null;
		/** Per-instance stable-part CVA overrides. Defaults to none. */
		theme?: EventCalendarThemeProps;
		/** Required IANA display time zone or `UTC`. */
		timeZone: string;
		/** BCP-47 formatting locale. Defaults to the active Svelai catalog locale. */
		locale?: string;
		/** Per-instance Svelai message overrides. Defaults to none. */
		i18n?: Partial<Messages>;
		/** Explicit reading direction; otherwise inherits the ambient direction. */
		dir?: 'ltr' | 'rtl';
		/** Explicit first weekday; otherwise derives from the active locale. */
		weekStartsOn?: EventCalendarWeekday;
		/** Half-open navigation, selection, and mutation boundary. Defaults to unbounded. */
		validRange?: EventCalendarRange;
		/** Renders six month rows when true. Defaults to `true`. */
		fixedWeeks?: boolean;
		/** Shows leading and trailing month dates. Defaults to `true`. */
		showOutsideDays?: boolean;
		/** Includes configured weekend columns. Defaults to `true`. */
		showWeekends?: boolean;
		/** Weekend weekday numbers. Defaults to `[0, 6]`. */
		weekendDays?: EventCalendarWeekday[];
		/** Shows the month week-number gutter. Defaults to `false`. */
		showWeekNumbers?: boolean;
		/** Month overflow threshold. Defaults to `auto`. */
		maxItemsPerCell?: number | 'auto';
		/** First displayed wall hour. Defaults to `0`. */
		dayStartHour?: number;
		/** Exclusive last displayed wall hour. Defaults to `24`. */
		dayEndHour?: number;
		/** Time-grid gutter interval in minutes. Defaults to `60`. */
		interval?: number;
		/** Empty-slot click duration in minutes. Defaults to `30`. */
		slotDuration?: number;
		/** Move, resize, and selection granularity in minutes. Defaults to `15`. */
		snapDuration?: number;
		/** Timed duration used for all-day conversion. Defaults to `60`. */
		defaultTimedItemDuration?: number;
		/** Civil-day duration used for timed conversion. Defaults to `1`. */
		defaultAllDayItemDuration?: number;
		/** Initial wall-hour scroll target. Defaults to `7`. */
		scrollToHour?: number;
		/** Count of rendered agenda days. Defaults to `30`. */
		agendaDayCount?: number;
		/** Enables the current-time line. Defaults to `true`. */
		nowIndicator?: boolean;
		/** Current-time refresh cadence in milliseconds. Defaults to `30000`. */
		nowIndicatorInterval?: number;
		/** Non-working-day appearance policy. Defaults to `false`. */
		offDays?: boolean | EventCalendarOffDaysConfig;
		/** Same-day display-zone availability windows. Defaults to `[]`. */
		businessHours?: EventCalendarBusinessHours[];
		/** Internal or document scrolling. Defaults to `contained`. */
		scrollMode?: 'contained' | 'page';
		/** Makes the default header sticky in page-scroll mode. Defaults to `false`. */
		stickyHeader?: boolean;
		/** Renders the default header. Defaults to `true`. */
		showHeader?: boolean;
		/** Adds the default date-jump popover. Defaults to `false`. */
		showDatePicker?: boolean;
		/** Enables the accessible default item hover card. Defaults to `true`. */
		showItemTooltip?: boolean;
		/** Fine-grained policy; drag, resize, slot, keyboard, and pointer features default on; duration preservation defaults off. */
		interactions?: Partial<EventCalendarInteractions>;
		/** Empty-slot drag-create policy. Defaults to `{ distancePx: 5, touchDelayMs: 300, touchTolerancePx: 8 }`. */
		createActivation?: Partial<EventCalendarCreateActivation>;
		/** Foreground overlap policy. Defaults to `true`. */
		allowOverlap?: boolean | EventCalendarOverlapPredicate<TItemFields>;
		/** Restricts mutations to `businessHours`. Defaults to `false`. */
		constrainToBusinessHours?: boolean;
		/** Synchronous live item-proposal validator. Defaults to allowing proposals. */
		canUpdateItem?: (proposal: EventCalendarProposedUpdate<TItemFields>) => boolean;
		/** Synchronous item-proposal commit policy and adjustment hook. Defaults to accept. */
		onItemUpdate?: (
			proposal: EventCalendarProposedUpdate<TItemFields>
		) => EventCalendarUpdateResult;
		/** Synchronous slot-range validator. Defaults to allowing slots. */
		canSelectSlot?: (slot: EventCalendarSlot) => boolean;
		/** Recurring mutation scope. Defaults to `occurrence`. */
		recurrenceEditScope?: 'occurrence' | 'series' | 'disabled';
		/** Enables internal copy/paste shortcuts and API methods. Defaults to `true`. */
		clipboard?: boolean;
		/** Maximum undo entries; `0` disables history. Defaults to `50`. */
		historyLimit?: number;
		/** Produces a new exception ID. Defaults to the built-in origin-based strategy. */
		getOccurrenceExceptionId?: (
			seriesItem: EventCalendarItem<TItemFields>,
			occurrence: EventCalendarOccurrence<TItemFields>
		) => string;
		/** Synchronous bounded recurrence expansion escape hatch. Defaults to the built-in expander. */
		expandRecurrence?: EventCalendarRecurrenceExpander<TItemFields>;
	};

/** Public props for the two-generic EventCalendar component. */
export type EventCalendarProps<
	TItemFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>
> = WithAttachments<
	Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> &
		EventCalendarOwnProps<TItemFields, TResourceFields>
>;
