import type { Colors } from '$lib/types/theme.js';

export type EventCalendarColor = Colors | (string & {});
export type EventCalendarWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type EventCalendarDateOnly = `${number}-${number}-${number}`;
export type EventCalendarView = 'month' | 'week' | 'day' | 'days' | 'agenda' | 'resource';

export type EventCalendarRange = {
	start: Date;
	end: Date;
};

type EventCalendarSlotBase = {
	view: EventCalendarView;
	resourceId?: string;
};

export type EventCalendarSlot =
	| (EventCalendarSlotBase & { allDay: false; start: Date; end: Date })
	| (EventCalendarSlotBase & {
			allDay: true;
			start: EventCalendarDateOnly;
			end: EventCalendarDateOnly;
	  });

export type EventCalendarBusinessHours = {
	daysOfWeek?: EventCalendarWeekday[];
	start: string;
	end: string;
};

export type EventCalendarOffDaysConfig = {
	weekdays?: EventCalendarWeekday[];
	dates?: EventCalendarDateOnly[];
	isOffDay?: (date: EventCalendarDateOnly) => boolean;
};

export type EventCalendarCreateActivation = {
	distancePx: number;
	touchDelayMs: number;
	touchTolerancePx: number;
};

type EventCalendarRecurrenceWeekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export type EventCalendarRecurrenceRule<
	TDate extends Date | EventCalendarDateOnly = Date | EventCalendarDateOnly
> = {
	freq: 'daily' | 'weekly' | 'monthly' | 'yearly';
	interval?: number;
	count?: number;
	until?: TDate;
	byWeekday?: Array<
		EventCalendarRecurrenceWeekday | { day: EventCalendarRecurrenceWeekday; ordinal: number }
	>;
	byMonthDay?: number[];
	byMonth?: number[];
	weekStart?: EventCalendarRecurrenceWeekday;
	exDates?: TDate[];
	rDates?: TDate[];
};

type EventCalendarItemBase = {
	id: string;
	title: string;
	display?: 'auto' | 'background';
	color?: EventCalendarColor;
	readOnly?: boolean;
	draggable?: boolean;
	resizable?: boolean;
	priority?: number;
	resourceId?: string;
};

type EventCalendarResourceBase = {
	id: string;
	title: string;
	parentId?: string;
	color?: EventCalendarColor;
};

type EventCalendarOwnedItemKey =
	| keyof EventCalendarItemBase
	| 'start'
	| 'end'
	| 'allDay'
	| 'recurrence'
	| 'recurrenceTimeZone'
	| 'recurringItemId'
	| 'originalStart';

type EventCalendarOwnedResourceKey = keyof EventCalendarResourceBase;

type EventCalendarCustomFields<
	TFields extends object,
	TOwnedKey extends PropertyKey
> = TFields extends unknown
	? string extends keyof TFields
		? never
		: Extract<keyof TFields, TOwnedKey> extends never
			? TFields
			: never
	: never;

type EventCalendarTimedPlacement = {
	start: Date;
	end: Date;
	allDay?: false;
};

type EventCalendarAllDayPlacement = {
	start: EventCalendarDateOnly;
	end: EventCalendarDateOnly;
	allDay: true;
};

type EventCalendarTimedSourceIdentity =
	| {
			recurrence?: never;
			recurrenceTimeZone?: never;
			recurringItemId?: never;
			originalStart?: never;
	  }
	| {
			recurrence: EventCalendarRecurrenceRule<Date> | string;
			recurrenceTimeZone: string;
			recurringItemId?: never;
			originalStart?: never;
	  };

type EventCalendarAllDaySourceIdentity = {
	recurrence?: EventCalendarRecurrenceRule<EventCalendarDateOnly> | string;
	recurrenceTimeZone?: never;
	recurringItemId?: never;
	originalStart?: never;
};

type EventCalendarExceptionIdentity = {
	recurrence?: never;
	recurrenceTimeZone?: never;
	recurringItemId: string;
	originalStart: Date | EventCalendarDateOnly;
};

type EventCalendarSchedule =
	| (EventCalendarTimedPlacement & EventCalendarTimedSourceIdentity)
	| (EventCalendarAllDayPlacement & EventCalendarAllDaySourceIdentity)
	| ((EventCalendarTimedPlacement | EventCalendarAllDayPlacement) & EventCalendarExceptionIdentity);

export type EventCalendarItem<TItemFields extends object = Record<never, never>> =
	EventCalendarCustomFields<TItemFields, EventCalendarOwnedItemKey> &
		EventCalendarItemBase &
		EventCalendarSchedule;

export type EventCalendarResource<TResourceFields extends object = Record<never, never>> =
	EventCalendarCustomFields<TResourceFields, EventCalendarOwnedResourceKey> &
		EventCalendarResourceBase;

export type EventCalendarOccurrence<TItemFields extends object = Record<never, never>> = {
	key: string;
	item: EventCalendarItem<TItemFields>;
	start: Date;
	end: Date;
	allDay: boolean;
	isRecurring: boolean;
	originalStart: Date | EventCalendarDateOnly;
};

export type EventCalendarSegment<TItemFields extends object = Record<never, never>> = {
	key: string;
	occurrence: EventCalendarOccurrence<TItemFields>;
	day: EventCalendarDateOnly;
	start: Date;
	end: Date;
	isStart: boolean;
	isEnd: boolean;
	continuesBefore: boolean;
	continuesAfter: boolean;
};

export type EventCalendarSelection =
	| { kind: null; itemKey: null; slot: null }
	| { kind: 'item'; itemKey: string; slot: null }
	| { kind: 'slot'; itemKey: null; slot: EventCalendarSlot };

export type EventCalendarMutationSource =
	'drag' | 'resize-start' | 'resize-end' | 'keyboard' | 'single-pointer' | 'api';

export type EventCalendarProposedUpdate<TItemFields extends object = Record<never, never>> = {
	kind: 'move' | 'resize-start' | 'resize-end' | 'update';
	source: EventCalendarMutationSource;
	occurrence?: EventCalendarOccurrence<TItemFields>;
	previousItem: EventCalendarItem<TItemFields>;
	item: EventCalendarItem<TItemFields>;
};

export type EventCalendarInteractions = {
	drag: boolean;
	resize: boolean;
	selectSlot: boolean;
	keyboard: boolean;
	singlePointer: boolean;
	maintainDurationOnAllDayChange: boolean;
};

export type EventCalendarRangeChangeInfo = {
	view: EventCalendarView;
	date: Date;
	timeZone: string;
	currentRange: EventCalendarRange;
	renderRange: EventCalendarRange;
	activeRange: EventCalendarRange;
	fetchRange: EventCalendarRange;
	visibleDays: readonly EventCalendarDateOnly[];
};

export type EventCalendarExpandedOccurrence =
	| { allDay: false; start: Date; end: Date; originalStart: Date }
	| {
			allDay: true;
			start: EventCalendarDateOnly;
			end: EventCalendarDateOnly;
			originalStart: EventCalendarDateOnly;
	  };

export type EventCalendarOverlapPredicate<TItemFields extends object = Record<never, never>> = (
	info:
		| {
				kind: 'item';
				proposal: EventCalendarProposedUpdate<TItemFields>;
				conflictingOccurrence: EventCalendarOccurrence<TItemFields>;
		  }
		| {
				kind: 'slot';
				slot: EventCalendarSlot;
				conflictingOccurrence: EventCalendarOccurrence<TItemFields>;
		  }
) => boolean;

export type EventCalendarRecurrenceExpander<TItemFields extends object = Record<never, never>> =
	(info: {
		item: EventCalendarItem<TItemFields>;
		range: EventCalendarRange;
		displayTimeZone: string;
		recurrenceTimeZone: string | null;
	}) => readonly EventCalendarExpandedOccurrence[];

export type EventCalendarInteractionBlockedInfo<TItemFields extends object = Record<never, never>> =
	{
		reason:
			| 'disabled'
			| 'read-only'
			| 'invalid-target'
			| 'valid-range'
			| 'business-hours'
			| 'overlap'
			| 'custom-policy'
			| 'stale';
		source: EventCalendarMutationSource | 'drag-create' | 'slot-click';
		proposal?: EventCalendarProposedUpdate<TItemFields>;
		slot?: EventCalendarSlot;
	};

type EventCalendarChangeBase = {
	source: EventCalendarMutationSource;
	revert: () => void;
};

export type EventCalendarChange<TItemFields extends object = Record<never, never>> =
	| (EventCalendarChangeBase & {
			kind: 'add';
			item: EventCalendarItem<TItemFields>;
	  })
	| (EventCalendarChangeBase & {
			kind: 'remove';
			previousItems: EventCalendarItem<TItemFields>[];
	  })
	| (EventCalendarChangeBase & {
			kind: 'update' | 'move' | 'resize';
			item: EventCalendarItem<TItemFields>;
			previousItem: EventCalendarItem<TItemFields>;
	  })
	| (EventCalendarChangeBase & {
			kind: 'recurrence-series-update';
			operation: 'move' | 'resize-start' | 'resize-end' | 'convert';
			seriesItem: EventCalendarItem<TItemFields>;
			previousSeriesItem: EventCalendarItem<TItemFields>;
			exceptionItems: EventCalendarItem<TItemFields>[];
			previousExceptionItems: EventCalendarItem<TItemFields>[];
	  })
	| (EventCalendarChangeBase & {
			kind: 'recurrence-exception-add';
			seriesItem: EventCalendarItem<TItemFields>;
			item: EventCalendarItem<TItemFields>;
	  })
	| (EventCalendarChangeBase & {
			kind: 'recurrence-exception-update';
			seriesItem: EventCalendarItem<TItemFields>;
			item: EventCalendarItem<TItemFields>;
			previousItem: EventCalendarItem<TItemFields>;
	  });

type EventCalendarResourceAdjustment = { resourceId?: string | null };

export type EventCalendarUpdateAdjustment = EventCalendarResourceAdjustment &
	(
		| { allDay?: never; start?: Date; end?: Date }
		| { allDay: false; start: Date; end: Date }
		| {
				allDay?: never;
				start?: EventCalendarDateOnly;
				end?: EventCalendarDateOnly;
		  }
		| {
				allDay: true;
				start: EventCalendarDateOnly;
				end: EventCalendarDateOnly;
		  }
	);

export type EventCalendarUpdateResult = false | true | void | EventCalendarUpdateAdjustment;

export type EventCalendarApi<TItemFields extends object = Record<never, never>> = {
	next(): void;
	previous(): void;
	today(): void;
	goTo(date: Date | EventCalendarDateOnly): void;
	setView(view: EventCalendarView, options?: { dayCount?: number }): void;
	scrollToTime(dateOrMinutes: Date | number): boolean;
	getVisibleRange(): EventCalendarRange;
	getActiveRange(): EventCalendarRange;
	getVisibleDays(): readonly EventCalendarDateOnly[];
	getOccurrence(key: string): EventCalendarOccurrence<TItemFields> | null;
	getOccurrences(range?: EventCalendarRange): readonly EventCalendarOccurrence<TItemFields>[];
	getOccurrencesForDay(day: EventCalendarDateOnly): readonly EventCalendarOccurrence<TItemFields>[];
	addItem(item: EventCalendarItem<TItemFields>): void;
	updateItem(item: EventCalendarItem<TItemFields>): void;
	updateOccurrence(
		key: string,
		adjustment: EventCalendarUpdateAdjustment,
		options?: { scope?: 'occurrence' | 'series' }
	): void;
	removeItem(id: string): void;
	select(selection: EventCalendarSelection): void;
	clearSelection(): void;
	cancelInteraction(): void;
};
