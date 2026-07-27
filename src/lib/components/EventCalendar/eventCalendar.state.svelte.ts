/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unsafe-declaration-merging -- Descriptor binding follows the established Svelai state-class pattern. */
/* eslint-disable svelte/prefer-svelte-reactivity -- Dates are immutable snapshots; Maps and Sets are non-reactive local validation indexes. */
import { untrack } from 'svelte';
import { bind } from '$lib/utils/state.svelte.js';
import {
	addCivilDays,
	assertDateOnly,
	assertValidInstant,
	assertValidRange,
	assertValidTimeZone,
	createDateProfile,
	type EventCalendarDateProfile,
	getHiddenWeekdays,
	getNavigationDate,
	getZonedDay,
	isSupportedDateDomainError,
	isDateOnly,
	MAX_EVENT_CALENDAR_DAY,
	normalizeLocale,
	parseDateOnly,
	reconcileAnchorDay,
	startOfZonedDay
} from './eventCalendar.date.js';
import { EventCalendarError } from './eventCalendar.error.js';
import {
	EventCalendarInteractionsController,
	type EventCalendarInteractionStatus
} from './eventCalendar.interactions.svelte.js';
import {
	createEventCalendarItemIndex,
	createRecurringOccurrenceKey,
	decodeRecurringOccurrenceKey,
	type EventCalendarItemIndex
} from './eventCalendar.items.js';
import {
	EventCalendarResourceIndex,
	type EventCalendarResourceModel
} from './eventCalendar.resources.js';
import type {
	EventCalendarBusinessHours,
	EventCalendarChange,
	EventCalendarCreateActivation,
	EventCalendarDateOnly,
	EventCalendarItem,
	EventCalendarOccurrence,
	EventCalendarInteractionBlockedInfo,
	EventCalendarInteractions,
	EventCalendarOffDaysConfig,
	EventCalendarRange,
	EventCalendarRangeChangeInfo,
	EventCalendarRecurrenceExpander,
	EventCalendarResource,
	EventCalendarSelection,
	EventCalendarSlot,
	EventCalendarProposedUpdate,
	EventCalendarUpdateAdjustment,
	EventCalendarUpdateResult,
	EventCalendarOverlapPredicate,
	EventCalendarView,
	EventCalendarWeekday
} from './eventCalendar.types.js';

const EVENT_CALENDAR_VIEWS: readonly EventCalendarView[] = [
	'month',
	'week',
	'day',
	'days',
	'agenda',
	'resource'
];
const VIEW_SET = new Set<EventCalendarView>(EVENT_CALENDAR_VIEWS);

type EventCalendarRuntimeItem = {
	id: string;
	title: string;
	resourceId?: string;
	start: unknown;
	end: unknown;
	allDay?: unknown;
	recurrence?: unknown;
	recurrenceTimeZone?: unknown;
	recurringItemId?: unknown;
	originalStart?: unknown;
};

type EventCalendarRuntimeRecurrenceRule = {
	freq: unknown;
	interval?: unknown;
	count?: unknown;
	until?: unknown;
	exDates?: unknown;
	rDates?: unknown;
};

export const EMPTY_EVENT_CALENDAR_SELECTION: EventCalendarSelection = Object.freeze({
	kind: null,
	itemKey: null,
	slot: null
});

export type EventCalendarStateOptions<
	TItemFields extends object,
	TResourceFields extends object
> = {
	get items(): EventCalendarItem<TItemFields>[];
	set items(value: EventCalendarItem<TItemFields>[]);
	get view(): EventCalendarView;
	set view(value: EventCalendarView);
	views: EventCalendarView[];
	get date(): Date;
	set date(value: Date);
	get dayCount(): number;
	set dayCount(value: number);
	get selection(): EventCalendarSelection;
	set selection(value: EventCalendarSelection);
	resources: EventCalendarResource<TResourceFields>[];
	timeZone: string;
	locale: string;
	weekStartsOn: EventCalendarWeekday;
	fixedWeeks: boolean;
	showOutsideDays: boolean;
	showWeekends: boolean;
	weekendDays: EventCalendarWeekday[];
	agendaDayCount: number;
	validRange?: EventCalendarRange;
	dayStartHour: number;
	dayEndHour: number;
	interval: number;
	slotDuration: number;
	snapDuration: number;
	defaultTimedItemDuration: number;
	defaultAllDayItemDuration: number;
	scrollToHour: number;
	nowIndicatorInterval: number;
	maxItemsPerCell: number | 'auto';
	createActivation: EventCalendarCreateActivation;
	businessHours: EventCalendarBusinessHours[];
	offDays: boolean | EventCalendarOffDaysConfig;
	disabled: boolean;
	loading: boolean;
	direction: 'ltr' | 'rtl';
	interactions: EventCalendarInteractions;
	allowOverlap: boolean | EventCalendarOverlapPredicate<TItemFields>;
	constrainToBusinessHours: boolean;
	canUpdateItem?: (proposal: EventCalendarProposedUpdate<TItemFields>) => boolean;
	onItemUpdate?: (proposal: EventCalendarProposedUpdate<TItemFields>) => EventCalendarUpdateResult;
	canSelectSlot?: (slot: EventCalendarSlot) => boolean;
	recurrenceEditScope: 'occurrence' | 'series' | 'disabled';
	getOccurrenceExceptionId?: (
		seriesItem: EventCalendarItem<TItemFields>,
		occurrence: EventCalendarOccurrence<TItemFields>
	) => string;
	expandRecurrence?: EventCalendarRecurrenceExpander<TItemFields>;
	onOccurrenceKeysRemap?: (remap: (key: string) => string) => void;
	onInteractionStatus?: (status: EventCalendarInteractionStatus<TItemFields>) => void;
	onItemsChange?: (
		items: EventCalendarItem<TItemFields>[],
		change: EventCalendarChange<TItemFields>
	) => void;
	onSlotSelect?: (slot: EventCalendarSlot) => void;
	onInteractionBlocked?: (info: EventCalendarInteractionBlockedInfo<TItemFields>) => void;
	onRangeChange?: (info: EventCalendarRangeChangeInfo) => void;
	onViewChange?: (view: EventCalendarView) => void;
	onDateChange?: (date: Date) => void;
	onDayCountChange?: (dayCount: number) => void;
	onSelectionChange?: (selection: EventCalendarSelection) => void;
};

export interface EventCalendarState<
	TItemFields extends object,
	TResourceFields extends object
> extends EventCalendarStateOptions<TItemFields, TResourceFields> {}

/** Bindable calendar coordinator. It is deliberately free of DOM and layout access. */
export class EventCalendarState<
	TItemFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>
> {
	readonly interaction: EventCalendarInteractionsController<TItemFields, TResourceFields>;
	isMounted = $state(false);
	todayInstant = $state<Date | null>(null);
	nowInstant = $state<Date | null>(null);
	private pendingViewChange: EventCalendarView | null = null;
	private pendingDateChange: Date | null = null;
	private lastRangeSignature: string | null = null;
	private readonly resourceIndex = new EventCalendarResourceIndex<TResourceFields>();
	private validatedItems: readonly EventCalendarItem<TItemFields>[] | null = null;
	private validatedRecurrenceExpander?: EventCalendarRecurrenceExpander<TItemFields>;
	private cachedDateProfile: EventCalendarDateProfile | null = null;
	private cachedDateProfileInputs: readonly unknown[] | null = null;

	get enabledViews(): readonly EventCalendarView[] {
		return getEnabledViews(this.views, this.validateResourceCollection() > 0);
	}

	get resourceModel(): EventCalendarResourceModel<TResourceFields> {
		return this.resourceIndex.get(this.resources);
	}

	get dateProfile(): EventCalendarDateProfile {
		const inputs = this.getDateProfileInputs();
		if (
			this.cachedDateProfile &&
			this.cachedDateProfileInputs?.every((value, index) => value === inputs[index])
		) {
			return this.cachedDateProfile;
		}
		this.cachedDateProfile = this.createProfile(this.view, this.date, this.dayCount);
		this.cachedDateProfileInputs = inputs;
		return this.cachedDateProfile;
	}

	private getDateProfileInputs(): readonly unknown[] {
		return [
			this.view,
			this.date,
			this.dayCount,
			this.timeZone,
			this.locale,
			this.weekStartsOn,
			this.fixedWeeks,
			this.showOutsideDays,
			this.showWeekends,
			this.weekendDays,
			this.agendaDayCount,
			this.validRange
		];
	}

	get itemIndex(): EventCalendarItemIndex<TItemFields> {
		const profile = this.dateProfile;
		return createEventCalendarItemIndex({
			items: this.items,
			range: profile.activeRange,
			displayTimeZone: this.timeZone,
			profileKey: getItemProfileKey(profile),
			visibleDays: profile.visibleDays,
			expandRecurrence: this.expandRecurrence
		});
	}

	private createProfile(
		view: EventCalendarView,
		date: Date,
		dayCount: number
	): EventCalendarDateProfile {
		return createDateProfile({
			view,
			date,
			timeZone: this.timeZone,
			locale: this.locale,
			weekStartsOn: this.weekStartsOn,
			fixedWeeks: this.fixedWeeks,
			showOutsideDays: this.showOutsideDays,
			showWeekends: this.showWeekends,
			weekendDays: this.weekendDays,
			dayCount,
			agendaDayCount: this.agendaDayCount,
			validRange: this.validRange
		});
	}

	constructor(
		instanceId: string,
		options: EventCalendarStateOptions<TItemFields, TResourceFields>
	) {
		bind(this, options);
		this.interaction = new EventCalendarInteractionsController(instanceId, this);
		this.synchronize(false);

		$effect.pre(() => {
			this.trackBoundaryInputs();
			untrack(() => this.synchronize(this.isMounted));
		});

		$effect(() => {
			const profile = this.dateProfile;
			const isMounted = this.isMounted;
			untrack(() => {
				if (isMounted) this.publishRange(profile);
			});
		});
	}

	/** Activates client-only clock data and publishes deferred SSR reconciliation callbacks. */
	mount(now = new Date()): void {
		assertValidInstant(now, 'now');
		if (this.isMounted) return;
		const pendingViewChange = this.pendingViewChange;
		const pendingDateChange = this.pendingDateChange;
		this.pendingViewChange = null;
		this.pendingDateChange = null;
		this.todayInstant = new Date(now);
		this.nowInstant = new Date(now);
		this.isMounted = true;

		if (pendingViewChange) this.onViewChange?.(pendingViewChange);
		if (pendingDateChange) this.onDateChange?.(new Date(pendingDateChange));
		this.publishRange(this.dateProfile);
	}

	unmount(): void {
		this.interaction.destroy();
		this.isMounted = false;
		this.todayInstant = null;
		this.nowInstant = null;
		this.lastRangeSignature = null;
	}

	validateCandidateItems(items: EventCalendarItem<TItemFields>[]): void {
		validateItems(items);
		void this.getCandidateOccurrences(items);
	}

	getCandidateOccurrences(
		items: EventCalendarItem<TItemFields>[]
	): readonly EventCalendarOccurrence<TItemFields>[] {
		const profile = this.dateProfile;
		return createEventCalendarItemIndex({
			items,
			range: profile.activeRange,
			displayTimeZone: this.timeZone,
			profileKey: `${getItemProfileKey(profile)}:candidate`,
			visibleDays: profile.visibleDays,
			expandRecurrence: this.expandRecurrence
		}).occurrences;
	}

	hasRecurringOccurrence(
		items: EventCalendarItem<TItemFields>[],
		key: string,
		seriesId: string
	): boolean {
		const decoded = decodeRecurringOccurrenceKey(key);
		if (!decoded || decoded.seriesId !== seriesId) return false;
		const source = items.find((item) => item.id === seriesId);
		if (!source || source.recurrence === undefined || source.recurringItemId !== undefined) {
			return false;
		}
		if (
			items.some(
				(item) =>
					item.recurringItemId === seriesId &&
					item.originalStart !== undefined &&
					createRecurringOccurrenceKey(seriesId, item.originalStart) === key
			)
		) {
			return true;
		}
		if (
			typeof decoded.originalStart === 'string' &&
			decoded.originalStart > MAX_EVENT_CALENDAR_DAY
		) {
			return false;
		}
		const range =
			typeof decoded.originalStart === 'string'
				? {
						start: startOfZonedDay(decoded.originalStart, this.timeZone),
						end: startOfZonedDay(addCivilDays(decoded.originalStart, 1), this.timeZone)
					}
				: {
						start: new Date(decoded.originalStart),
						end: new Date(decoded.originalStart.getTime() + 1)
					};
		return (
			createEventCalendarItemIndex({
				items,
				range,
				displayTimeZone: this.timeZone,
				profileKey: `selection:${key}`,
				expandRecurrence: this.expandRecurrence
			}).getOccurrence(key) !== null
		);
	}

	isSelectionInRecurringSeries(seriesId: string): boolean {
		if (this.selection.kind !== 'item') return false;
		return decodeRecurringOccurrenceKey(this.selection.itemKey)?.seriesId === seriesId;
	}

	addItem(item: EventCalendarItem<TItemFields>): void {
		this.interaction.addItem(item);
	}

	updateItem(item: EventCalendarItem<TItemFields>): void {
		this.interaction.updateItem(item);
	}

	updateOccurrence(
		key: string,
		adjustment: EventCalendarUpdateAdjustment,
		options?: { scope?: 'occurrence' | 'series' }
	): void {
		this.interaction.updateOccurrence(key, adjustment, options);
	}

	removeItem(id: string): void {
		this.interaction.removeItem(id);
	}

	refreshNow(now = new Date()): void {
		assertValidInstant(now, 'now');
		if (!this.isMounted) return;
		this.todayInstant = new Date(now);
		this.nowInstant = new Date(now);
	}

	next(): void {
		this.navigate(1);
	}

	previous(): void {
		this.navigate(-1);
	}

	today(): void {
		if (this.disabled || !this.isMounted) return;
		const now = new Date();
		this.refreshNow(now);
		this.goTo(now);
	}

	goTo(value: Date | EventCalendarDateOnly): void {
		if (this.disabled) return;
		const target = typeof value === 'string' ? startOfZonedDay(value, this.timeZone) : value;
		assertValidInstant(target, 'date');
		this.commitDate(this.reconcileDateFor(target, this.view), true);
	}

	setView(view: EventCalendarView, options?: { dayCount?: number }): void {
		if (this.disabled) return;
		assertView(view);
		if (!this.enabledViews.includes(view)) {
			throw new EventCalendarError('invalid-view', `View is not enabled: ${view}.`, { view });
		}
		if (options?.dayCount !== undefined && view !== 'days') {
			throw new EventCalendarError(
				'invalid-view',
				'The setView dayCount option is valid only for the days view.',
				{ view }
			);
		}
		const nextDayCount = options?.dayCount ?? this.dayCount;
		assertPositiveInteger(nextDayCount, 'dayCount');
		const nextDate = this.reconcileDateFor(this.date, view);
		this.createProfile(view, nextDate, nextDayCount);
		const didDayCountChange = nextDayCount !== this.dayCount;
		const didViewChange = view !== this.view;
		const didDateChange = nextDate.getTime() !== this.date.getTime();
		if (!didDayCountChange && !didViewChange && !didDateChange) return;

		if (didDayCountChange) this.dayCount = nextDayCount;
		if (didViewChange) this.view = view;
		if (didDateChange) this.date = new Date(nextDate);
		if (didDayCountChange) this.onDayCountChange?.(nextDayCount);
		if (didViewChange) this.onViewChange?.(view);
		if (didDateChange) this.onDateChange?.(new Date(nextDate));
	}

	setDayCount(dayCount: number): void {
		assertPositiveInteger(dayCount, 'dayCount');
		if (this.dayCount === dayCount) return;
		this.createProfile(this.view, this.date, dayCount);
		this.dayCount = dayCount;
		this.onDayCountChange?.(dayCount);
	}

	select(selection: EventCalendarSelection): void {
		if (this.disabled) return;
		validateSelection(selection);
		if (selectionsEqual(this.selection, selection)) return;
		this.selection = selection;
		this.onSelectionChange?.(selection);
	}

	clearSelection(): void {
		this.select(EMPTY_EVENT_CALENDAR_SELECTION);
	}

	applyOccurrenceKeyRemap(remap: (key: string) => string): {
		previousSelection: EventCalendarSelection;
		committedSelection: EventCalendarSelection;
	} | null {
		this.onOccurrenceKeysRemap?.(remap);
		if (this.selection.kind !== 'item') return null;
		const itemKey = remap(this.selection.itemKey);
		if (itemKey === this.selection.itemKey) return null;
		const previousSelection = this.selection;
		const selection: EventCalendarSelection = { kind: 'item', itemKey, slot: null };
		this.selection = selection;
		return { previousSelection, committedSelection: this.selection };
	}

	clearSelectionForCollection(): {
		previousSelection: EventCalendarSelection;
		committedSelection: EventCalendarSelection;
	} | null {
		if (this.selection.kind === null) return null;
		const previousSelection = this.selection;
		this.selection = EMPTY_EVENT_CALENDAR_SELECTION;
		return { previousSelection, committedSelection: this.selection };
	}

	clearMissingRecurringSelection(
		items: EventCalendarItem<TItemFields>[],
		seriesId: string
	): {
		previousSelection: EventCalendarSelection;
		committedSelection: EventCalendarSelection;
	} | null {
		if (
			this.selection.kind !== 'item' ||
			!this.isSelectionInRecurringSeries(seriesId) ||
			this.hasRecurringOccurrence(items, this.selection.itemKey, seriesId)
		) {
			return null;
		}
		return this.clearSelectionForCollection();
	}

	restoreOccurrenceKeyRemap(
		selectionTransaction: {
			previousSelection: EventCalendarSelection;
			committedSelection: EventCalendarSelection;
		} | null,
		remap?: (key: string) => string
	): void {
		if (selectionTransaction && this.selection !== selectionTransaction.committedSelection) {
			throw new EventCalendarError(
				'stale-transaction',
				'The EventCalendar selection changed after its recurrence transaction.'
			);
		}
		if (remap) this.onOccurrenceKeysRemap?.(remap);
		if (!selectionTransaction) return;
		this.selection = selectionTransaction.previousSelection;
		this.onSelectionChange?.(selectionTransaction.previousSelection);
	}

	notifySelectionChange(selection: EventCalendarSelection): void {
		this.onSelectionChange?.(selection);
	}

	getVisibleRange(): EventCalendarRange {
		return cloneRange(this.dateProfile.renderRange);
	}

	getActiveRange(): EventCalendarRange {
		return cloneRange(this.dateProfile.activeRange);
	}

	getVisibleDays(): readonly EventCalendarDateOnly[] {
		return [...this.dateProfile.visibleDays];
	}

	getOccurrence(key: string) {
		return this.itemIndex.getOccurrence(key);
	}

	getOccurrences(range?: EventCalendarRange) {
		if (!range) return this.itemIndex.occurrences;
		assertValidRange(range, 'occurrence query range');
		return createEventCalendarItemIndex({
			items: this.items,
			range,
			displayTimeZone: this.timeZone,
			profileKey: `query:${range.start.getTime()}:${range.end.getTime()}`,
			expandRecurrence: this.expandRecurrence
		}).occurrences;
	}

	getOccurrencesForDay(day: EventCalendarDateOnly) {
		assertDateOnly(day, 'day');
		let endDay: EventCalendarDateOnly;
		try {
			endDay = addCivilDays(day, 1);
		} catch (error) {
			if (!isSupportedDateDomainError(error)) throw error;
			throw new EventCalendarError(
				'invalid-prop',
				`Cannot query ${day} because its exclusive day boundary exceeds the supported civil-date domain.`,
				{ ...error.details, method: 'getOccurrencesForDay', day }
			);
		}
		const range = {
			start: startOfZonedDay(day, this.timeZone),
			end: startOfZonedDay(endDay, this.timeZone)
		};
		return createEventCalendarItemIndex({
			items: this.items,
			range,
			displayTimeZone: this.timeZone,
			profileKey: `day-query:${day}`,
			expandRecurrence: this.expandRecurrence
		}).occurrences;
	}

	private navigate(direction: -1 | 1): void {
		if (this.disabled) return;
		const hiddenWeekdays = getHiddenWeekdays(this);
		const target = getNavigationDate(this.dateProfile, direction, hiddenWeekdays);
		if (!target) return;
		try {
			this.commitDate(this.reconcileDateFor(target, this.view), true);
		} catch (error) {
			if (isSupportedDateDomainError(error)) return;
			throw error;
		}
	}

	private synchronize(notify: boolean): void {
		validateConfiguration(this);
		const resourceLeafCount = this.validateCollections();
		validateSelection(this.selection);
		const enabledViews = getEnabledViews(this.views, resourceLeafCount > 0);
		const nextView = enabledViews.includes(this.view) ? this.view : enabledViews[0];
		const nextDate = this.reconcileDateFor(this.date, nextView);
		this.createProfile(nextView, nextDate, this.dayCount);
		const didViewChange = nextView !== this.view;
		const didDateChange = nextDate.getTime() !== this.date.getTime();
		if (!didViewChange && !didDateChange) return;

		if (didViewChange) this.view = nextView;
		if (didDateChange) this.date = new Date(nextDate);
		if (notify) {
			if (didViewChange) this.onViewChange?.(nextView);
			if (didDateChange) this.onDateChange?.(new Date(nextDate));
			return;
		}
		if (didViewChange) this.pendingViewChange = nextView;
		if (didDateChange) this.pendingDateChange = new Date(nextDate);
	}

	private validateResourceCollection(): number {
		return this.resourceModel.structure.leaves.length;
	}

	private validateCollections(): number {
		const resourceLeafCount = this.validateResourceCollection();
		if (
			this.validatedItems !== this.items ||
			this.validatedRecurrenceExpander !== this.expandRecurrence
		) {
			validateItems(this.items);
			void this.itemIndex;
			this.validatedItems = this.items;
			this.validatedRecurrenceExpander = this.expandRecurrence;
		}
		return resourceLeafCount;
	}

	private reconcileDateFor(date: Date, view: EventCalendarView): Date {
		assertValidInstant(date);
		const shouldReconcileHiddenDay =
			view === 'day' || view === 'days' || view === 'agenda' || view === 'resource';
		if (!shouldReconcileHiddenDay && !this.validRange) return new Date(date);

		const hiddenWeekdays = shouldReconcileHiddenDay
			? getHiddenWeekdays(this)
			: new Set<EventCalendarWeekday>();
		const day = reconcileAnchorDay(
			getZonedDay(date, this.timeZone),
			this.timeZone,
			hiddenWeekdays,
			this.validRange
		);
		if (day === getZonedDay(date, this.timeZone)) return new Date(date);
		return startOfZonedDay(day, this.timeZone);
	}

	private commitDate(date: Date, notify: boolean): void {
		if (date.getTime() === this.date.getTime()) return;
		this.createProfile(this.view, date, this.dayCount);
		this.date = new Date(date);
		if (notify) this.onDateChange?.(new Date(date));
	}

	private publishRange(profile: EventCalendarDateProfile): void {
		const signature = getRangeSignature(profile);
		if (signature === this.lastRangeSignature) return;
		this.lastRangeSignature = signature;
		this.onRangeChange?.(cloneProfile(profile));
	}

	private trackBoundaryInputs(): void {
		void this.items;
		void this.resources;
		void this.view;
		void this.views;
		void this.date;
		void this.dayCount;
		void this.selection;
		void this.timeZone;
		void this.locale;
		void this.weekStartsOn;
		void this.fixedWeeks;
		void this.showOutsideDays;
		void this.showWeekends;
		void this.weekendDays;
		void this.agendaDayCount;
		void this.validRange;
		void this.dayStartHour;
		void this.dayEndHour;
		void this.interval;
		void this.slotDuration;
		void this.snapDuration;
		void this.defaultTimedItemDuration;
		void this.defaultAllDayItemDuration;
		void this.scrollToHour;
		void this.nowIndicatorInterval;
		void this.maxItemsPerCell;
		void this.createActivation;
		void this.loading;
		void this.direction;
		void this.interactions;
		void this.allowOverlap;
		void this.constrainToBusinessHours;
		void this.canUpdateItem;
		void this.onItemUpdate;
		void this.canSelectSlot;
		void this.recurrenceEditScope;
		void this.getOccurrenceExceptionId;
		void this.businessHours;
		void this.offDays;
		void this.expandRecurrence;
	}
}

function getItemProfileKey(profile: EventCalendarDateProfile): string {
	return JSON.stringify([
		profile.view,
		profile.activeRange.start.getTime(),
		profile.activeRange.end.getTime()
	]);
}

function validateConfiguration<TItemFields extends object, TResourceFields extends object>(
	state: EventCalendarState<TItemFields, TResourceFields>
): void {
	assertValidInstant(state.date);
	assertValidTimeZone(state.timeZone);
	normalizeLocale(state.locale);
	assertView(state.view);
	validateViews(state.views);
	assertWeekday(state.weekStartsOn, 'weekStartsOn');
	validateWeekdays(state.weekendDays, 'weekendDays');
	assertPositiveInteger(state.dayCount, 'dayCount');
	assertPositiveInteger(state.agendaDayCount, 'agendaDayCount');
	assertPositiveInteger(state.interval, 'interval');
	assertPositiveInteger(state.slotDuration, 'slotDuration');
	assertPositiveInteger(state.snapDuration, 'snapDuration');
	assertPositiveInteger(state.defaultTimedItemDuration, 'defaultTimedItemDuration');
	assertPositiveInteger(state.defaultAllDayItemDuration, 'defaultAllDayItemDuration');
	assertPositiveInteger(state.nowIndicatorInterval, 'nowIndicatorInterval');
	validateHourRange(state.dayStartHour, state.dayEndHour, state.scrollToHour);
	if (state.maxItemsPerCell !== 'auto') {
		assertNonNegativeInteger(state.maxItemsPerCell, 'maxItemsPerCell');
	}
	validateCreateActivation(state.createActivation);
	validateBusinessHours(state.businessHours);
	validateOffDays(state.offDays);
	if (state.validRange) assertValidRange(state.validRange, 'validRange');
	if (!state.showWeekends && state.weekendDays.length === 7) {
		throw new EventCalendarError('invalid-prop', 'At least one weekday must remain visible.');
	}
}

function validateViews(views: readonly EventCalendarView[]): void {
	if (!Array.isArray(views) || views.length === 0) {
		throw new EventCalendarError('invalid-view', 'views must be a non-empty array.');
	}
	const seen = new Set<EventCalendarView>();
	for (const view of views) {
		assertView(view);
		if (seen.has(view)) {
			throw new EventCalendarError('invalid-view', `views contains a duplicate: ${view}.`, {
				view
			});
		}
		seen.add(view);
	}
}

function getEnabledViews(
	views: readonly EventCalendarView[],
	hasResourceLeaf: boolean
): readonly EventCalendarView[] {
	validateViews(views);
	const enabled = views.filter((view) => view !== 'resource' || hasResourceLeaf);
	if (enabled.length === 0) {
		throw new EventCalendarError(
			'invalid-view',
			'No configured view is currently enabled. Resource view requires a resource leaf.'
		);
	}
	return enabled;
}

function validateItems<TItemFields extends object>(
	items: readonly EventCalendarItem<TItemFields>[]
): void {
	if (!Array.isArray(items)) {
		throw new EventCalendarError('invalid-item', 'items must be an array.');
	}
	const itemsById = new Map<string, EventCalendarRuntimeItem>();
	for (const item of items) {
		if (!item || typeof item !== 'object') {
			throw new EventCalendarError('invalid-item', 'Every item must be an object.');
		}
		if (typeof item.id !== 'string' || item.id.length === 0) {
			throw new EventCalendarError('invalid-item', 'Every item must have a non-empty string id.');
		}
		if (itemsById.has(item.id)) {
			throw new EventCalendarError('duplicate-item-id', `Duplicate item id: ${item.id}.`, {
				id: item.id
			});
		}
		if (typeof item.title !== 'string') {
			throw new EventCalendarError('invalid-item', `Item ${item.id} must have a string title.`, {
				id: item.id
			});
		}
		validateItemPlacement(item);
		itemsById.set(item.id, item);
	}

	const exceptionOrigins = new Set<string>();
	for (const item of items) validateItemIdentity(item, itemsById, exceptionOrigins);
}

function validateItemPlacement(item: EventCalendarRuntimeItem): void {
	if (item.allDay === true) {
		assertItemDateOnly(item.start, item.id, 'start');
		assertItemDateOnly(item.end, item.id, 'end');
		if (item.end <= item.start) {
			throw new EventCalendarError(
				'invalid-item',
				`All-day item ${item.id} must have a positive half-open range.`,
				{ id: item.id }
			);
		}
		return;
	}
	if (item.allDay !== undefined && item.allDay !== false) {
		throw new EventCalendarError('invalid-item', `Item ${item.id} has an invalid allDay value.`, {
			id: item.id
		});
	}
	assertItemInstant(item.start, item.id, 'start');
	assertItemInstant(item.end, item.id, 'end');
	if (item.end.getTime() < item.start.getTime()) {
		throw new EventCalendarError('invalid-item', `Timed item ${item.id} ends before it starts.`, {
			id: item.id
		});
	}
}

function validateItemIdentity(
	item: EventCalendarRuntimeItem,
	itemsById: ReadonlyMap<string, EventCalendarRuntimeItem>,
	exceptionOrigins: Set<string>
): void {
	const recurrence = item.recurrence;
	const recurrenceTimeZone = item.recurrenceTimeZone;
	const recurringItemId = item.recurringItemId;
	const originalStart = item.originalStart;
	const isException = recurringItemId !== undefined || originalStart !== undefined;

	if (isException) {
		if (
			typeof recurringItemId !== 'string' ||
			recurringItemId.length === 0 ||
			originalStart === undefined
		) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Exception item ${item.id} requires recurringItemId and originalStart.`,
				{ id: item.id }
			);
		}
		if (recurrence !== undefined || recurrenceTimeZone !== undefined) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Exception item ${item.id} cannot define recurrence fields.`,
				{ id: item.id }
			);
		}
		const source = itemsById.get(recurringItemId);
		if (
			!source ||
			source.id === item.id ||
			source.recurringItemId !== undefined ||
			source.recurrence === undefined
		) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Exception item ${item.id} must reference a recurring source in the same collection.`,
				{ id: item.id, recurringItemId }
			);
		}
		validateExceptionOrigin(item.id, source, originalStart);
		const originKey = `${recurringItemId}\u0000${canonicalOrigin(originalStart)}`;
		if (exceptionOrigins.has(originKey)) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Multiple exceptions target the same origin in series ${recurringItemId}.`,
				{ recurringItemId, originalStart: canonicalOrigin(originalStart) }
			);
		}
		exceptionOrigins.add(originKey);
		return;
	}

	if (recurrence === undefined) {
		if (recurrenceTimeZone !== undefined) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Item ${item.id} cannot define recurrenceTimeZone without recurrence.`,
				{ id: item.id }
			);
		}
		return;
	}

	validateRecurrenceRule(recurrence, item.allDay === true, item.id);
	if (item.allDay === true) {
		if (recurrenceTimeZone !== undefined) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`All-day recurring item ${item.id} cannot define recurrenceTimeZone.`,
				{ id: item.id }
			);
		}
		return;
	}
	if (typeof recurrenceTimeZone !== 'string') {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Timed recurring item ${item.id} requires recurrenceTimeZone.`,
			{ id: item.id }
		);
	}
	try {
		assertValidTimeZone(recurrenceTimeZone);
	} catch (error) {
		if (!(error instanceof EventCalendarError)) throw error;
		throw new EventCalendarError(
			'invalid-recurrence',
			`Timed recurring item ${item.id} has an invalid recurrenceTimeZone.`,
			{ id: item.id, recurrenceTimeZone }
		);
	}
}

function validateRecurrenceRule(rule: unknown, isAllDay: boolean, itemId: string): void {
	if (typeof rule === 'string') {
		if (rule.trim().length > 0) return;
		throw new EventCalendarError(
			'invalid-recurrence',
			`Item ${itemId} has an empty recurrence rule.`,
			{
				id: itemId
			}
		);
	}
	if (!isRecurrenceRule(rule)) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Item ${itemId} has an invalid recurrence rule.`,
			{
				id: itemId
			}
		);
	}
	if (
		typeof rule.freq !== 'string' ||
		!['daily', 'weekly', 'monthly', 'yearly'].includes(rule.freq)
	) {
		throw new EventCalendarError('invalid-recurrence', `Item ${itemId} has an invalid frequency.`, {
			id: itemId
		});
	}
	if (rule.interval !== undefined)
		assertRecurrencePositiveInteger(rule.interval, itemId, 'interval');
	if (rule.count !== undefined) assertRecurrencePositiveInteger(rule.count, itemId, 'count');
	if (rule.until !== undefined) validateRecurrenceDate(rule.until, isAllDay, itemId, 'until');
	validateRecurrenceDateList(rule.exDates, isAllDay, itemId, 'exDates');
	validateRecurrenceDateList(rule.rDates, isAllDay, itemId, 'rDates');
}

function validateRecurrenceDate(
	date: unknown,
	isAllDay: boolean,
	itemId: string,
	field: string
): void {
	if (isAllDay && isDateOnly(date)) return;
	if (!isAllDay && date instanceof Date && Number.isFinite(date.getTime())) return;
	throw new EventCalendarError(
		'invalid-recurrence',
		`Recurring item ${itemId} has a ${field} value with the wrong representation.`,
		{ id: itemId, field }
	);
}

function validateRecurrenceDateList(
	dates: unknown,
	isAllDay: boolean,
	itemId: string,
	field: string
): void {
	if (dates === undefined) return;
	if (!Array.isArray(dates)) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Recurring item ${itemId} requires ${field} to be an array.`,
			{ id: itemId, field }
		);
	}
	for (const date of dates) validateRecurrenceDate(date, isAllDay, itemId, field);
}

function validateExceptionOrigin(
	itemId: string,
	source: EventCalendarRuntimeItem,
	originalStart: unknown
): asserts originalStart is Date | EventCalendarDateOnly {
	if (source.allDay === true && isDateOnly(originalStart)) return;
	if (
		source.allDay !== true &&
		originalStart instanceof Date &&
		Number.isFinite(originalStart.getTime())
	) {
		return;
	}
	throw new EventCalendarError(
		'invalid-recurrence',
		`Exception item ${itemId} has an origin representation that does not match its source.`,
		{ id: itemId, recurringItemId: source.id }
	);
}

function validateSelection(selection: EventCalendarSelection): void {
	if (!selection || typeof selection !== 'object') {
		throw new EventCalendarError('invalid-prop', 'selection must be a discriminated selection.');
	}
	if (selection.kind === null && selection.itemKey === null && selection.slot === null) return;
	if (
		selection.kind === 'item' &&
		typeof selection.itemKey === 'string' &&
		selection.itemKey.length > 0 &&
		selection.slot === null
	) {
		return;
	}
	if (selection.kind === 'slot' && selection.itemKey === null && selection.slot) {
		validateSlot(selection.slot);
		return;
	}
	throw new EventCalendarError('invalid-prop', 'selection has an invalid discriminated shape.');
}

function validateSlot(slot: EventCalendarSlot): void {
	assertView(slot.view);
	if (slot.allDay === true) {
		assertDateOnly(slot.start, 'selection.slot.start');
		assertDateOnly(slot.end, 'selection.slot.end');
		if (slot.end <= slot.start) {
			throw new EventCalendarError('invalid-prop', 'An all-day slot must have positive length.');
		}
		return;
	}
	if (slot.allDay !== false) {
		throw new EventCalendarError('invalid-prop', 'A slot requires a boolean allDay discriminator.');
	}
	assertValidInstant(slot.start, 'selection.slot.start');
	assertValidInstant(slot.end, 'selection.slot.end');
	if (slot.end.getTime() < slot.start.getTime()) {
		throw new EventCalendarError('invalid-prop', 'A timed slot cannot end before it starts.');
	}
}

function validateHourRange(dayStartHour: number, dayEndHour: number, scrollToHour: number): void {
	for (const [name, value] of [
		['dayStartHour', dayStartHour],
		['dayEndHour', dayEndHour],
		['scrollToHour', scrollToHour]
	] as const) {
		if (!Number.isFinite(value) || !Number.isInteger(value * 60)) {
			throw new EventCalendarError('invalid-prop', `${name} must resolve to whole minutes.`, {
				prop: name,
				value
			});
		}
	}
	if (dayStartHour < 0 || dayStartHour >= dayEndHour || dayEndHour > 24) {
		throw new EventCalendarError(
			'invalid-prop',
			'dayStartHour and dayEndHour must form a non-empty interval within 0..24.',
			{ dayStartHour, dayEndHour }
		);
	}
	if (scrollToHour < dayStartHour || scrollToHour >= dayEndHour) {
		throw new EventCalendarError('invalid-prop', 'scrollToHour must fall inside displayed hours.', {
			scrollToHour,
			dayStartHour,
			dayEndHour
		});
	}
}

function validateCreateActivation(activation: EventCalendarCreateActivation): void {
	if (!activation || typeof activation !== 'object' || Array.isArray(activation)) {
		throw new EventCalendarError(
			'invalid-prop',
			'createActivation must be a configuration object.',
			{
				prop: 'createActivation'
			}
		);
	}
	for (const name of ['distancePx', 'touchDelayMs', 'touchTolerancePx'] as const) {
		const value = activation[name];
		if (Number.isFinite(value) && value > 0) continue;
		throw new EventCalendarError(
			'invalid-prop',
			`createActivation.${name} must be finite and positive.`,
			{
				prop: `createActivation.${name}`,
				value
			}
		);
	}
}

function validateBusinessHours(entries: readonly EventCalendarBusinessHours[]): void {
	if (!Array.isArray(entries)) {
		throw new EventCalendarError('invalid-prop', 'businessHours must be an array.');
	}
	const windows = new Set<string>();
	for (const entry of entries) {
		if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
			throw new EventCalendarError('invalid-prop', 'Every businessHours entry must be an object.', {
				prop: 'businessHours'
			});
		}
		const days = entry.daysOfWeek ?? [0, 1, 2, 3, 4, 5, 6];
		validateWeekdays(days, 'businessHours.daysOfWeek');
		const start = parseWallMinutes(entry.start, false, 'businessHours.start');
		const end = parseWallMinutes(entry.end, true, 'businessHours.end');
		if (start >= end) {
			throw new EventCalendarError('invalid-prop', 'Business hours must be a same-day range.', {
				start: entry.start,
				end: entry.end
			});
		}
		for (const day of days) {
			const key = `${day}:${entry.start}-${entry.end}`;
			if (windows.has(key)) {
				throw new EventCalendarError('invalid-prop', 'businessHours contains a duplicate window.', {
					day,
					start: entry.start,
					end: entry.end
				});
			}
			windows.add(key);
		}
	}
}

function validateOffDays(offDays: boolean | EventCalendarOffDaysConfig): void {
	if (typeof offDays === 'boolean') return;
	if (!offDays || typeof offDays !== 'object' || Array.isArray(offDays)) {
		throw new EventCalendarError('invalid-prop', 'offDays must be a boolean or configuration.');
	}
	if (offDays.weekdays !== undefined) validateWeekdays(offDays.weekdays, 'offDays.weekdays');
	if (offDays.dates !== undefined && !Array.isArray(offDays.dates)) {
		throw new EventCalendarError('invalid-prop', 'offDays.dates must be an array.', {
			prop: 'offDays.dates'
		});
	}
	if (offDays.isOffDay !== undefined && typeof offDays.isOffDay !== 'function') {
		throw new EventCalendarError('invalid-prop', 'offDays.isOffDay must be a function.', {
			prop: 'offDays.isOffDay'
		});
	}
	const dates = new Set<EventCalendarDateOnly>();
	for (const date of offDays.dates ?? []) {
		if (typeof date !== 'string') {
			throw new EventCalendarError('invalid-prop', 'offDays.dates must contain date strings.', {
				prop: 'offDays.dates',
				date
			});
		}
		parseDateOnly(date, 'offDays.dates');
		if (dates.has(date)) {
			throw new EventCalendarError('invalid-prop', 'offDays.dates must not contain duplicates.', {
				date
			});
		}
		dates.add(date);
	}
}

function validateWeekdays(weekdays: readonly number[], name: string): void {
	if (!Array.isArray(weekdays)) {
		throw new EventCalendarError('invalid-prop', `${name} must be an array.`, { prop: name });
	}
	const seen = new Set<number>();
	for (const weekday of weekdays) {
		assertWeekday(weekday, name);
		if (seen.has(weekday)) {
			throw new EventCalendarError('invalid-prop', `${name} must not contain duplicates.`, {
				prop: name,
				weekday
			});
		}
		seen.add(weekday);
	}
}

function parseWallMinutes(value: unknown, allowEnd: boolean, name: string): number {
	if (typeof value !== 'string') {
		throw new EventCalendarError('invalid-prop', `${name} must use strict HH:mm form.`, {
			prop: name,
			value
		});
	}
	const match = /^(\d{2}):(\d{2})$/.exec(value);
	if (!match) {
		throw new EventCalendarError('invalid-prop', `${name} must use strict HH:mm form.`, {
			prop: name,
			value
		});
	}
	const hour = Number(match[1]);
	const minute = Number(match[2]);
	if (minute > 59 || hour > 24 || (hour === 24 && (!allowEnd || minute !== 0))) {
		throw new EventCalendarError('invalid-prop', `${name} is outside its valid wall-time range.`, {
			prop: name,
			value
		});
	}
	return hour * 60 + minute;
}

function assertItemInstant(
	value: unknown,
	itemId: string,
	field: 'start' | 'end'
): asserts value is Date {
	try {
		if (!(value instanceof Date)) throw new EventCalendarError('invalid-item', 'Invalid instant.');
		assertValidInstant(value, `items[${itemId}].${field}`);
	} catch (error) {
		if (!(error instanceof EventCalendarError)) throw error;
		throw new EventCalendarError(
			'invalid-item',
			`Item ${itemId} has an invalid ${field} instant.`,
			{
				id: itemId,
				field
			}
		);
	}
}

function assertItemDateOnly(
	value: unknown,
	itemId: string,
	field: 'start' | 'end'
): asserts value is EventCalendarDateOnly {
	try {
		assertDateOnly(value, `items[${itemId}].${field}`);
	} catch (error) {
		if (!(error instanceof EventCalendarError)) throw error;
		throw new EventCalendarError(
			'invalid-item',
			`Item ${itemId} has an invalid ${field} civil date.`,
			{ id: itemId, field }
		);
	}
}

function assertView(value: EventCalendarView): void {
	if (VIEW_SET.has(value)) return;
	throw new EventCalendarError('invalid-view', `Unsupported calendar view: ${String(value)}.`, {
		view: value
	});
}

function assertWeekday(value: number, name: string): asserts value is EventCalendarWeekday {
	if (Number.isInteger(value) && value >= 0 && value <= 6) return;
	throw new EventCalendarError('invalid-prop', `${name} must contain values from 0 through 6.`, {
		prop: name,
		value
	});
}

function assertPositiveInteger(value: number, name: string): void {
	if (Number.isInteger(value) && value > 0) return;
	throw new EventCalendarError('invalid-prop', `${name} must be a positive integer.`, {
		prop: name,
		value
	});
}

function assertNonNegativeInteger(value: number, name: string): void {
	if (Number.isInteger(value) && value >= 0) return;
	throw new EventCalendarError('invalid-prop', `${name} must be a non-negative integer.`, {
		prop: name,
		value
	});
}

function assertRecurrencePositiveInteger(value: unknown, itemId: string, field: string): void {
	if (typeof value === 'number' && Number.isInteger(value) && value > 0) return;
	throw new EventCalendarError(
		'invalid-recurrence',
		`Recurring item ${itemId} requires a positive ${field}.`,
		{ id: itemId, field, value }
	);
}

function isRecurrenceRule(value: unknown): value is EventCalendarRuntimeRecurrenceRule {
	return typeof value === 'object' && value !== null && 'freq' in value;
}

function canonicalOrigin(value: Date | EventCalendarDateOnly): string {
	return value instanceof Date ? value.toISOString() : value;
}

function selectionsEqual(left: EventCalendarSelection, right: EventCalendarSelection): boolean {
	if (left.kind !== right.kind) return false;
	if (left.kind === null && right.kind === null) return true;
	if (left.kind === 'item' && right.kind === 'item') return left.itemKey === right.itemKey;
	if (left.kind !== 'slot' || right.kind !== 'slot') return false;
	if (left.slot.allDay !== right.slot.allDay) return false;
	if (left.slot.view !== right.slot.view || left.slot.resourceId !== right.slot.resourceId)
		return false;
	if (left.slot.allDay && right.slot.allDay) {
		return left.slot.start === right.slot.start && left.slot.end === right.slot.end;
	}
	if (!left.slot.allDay && !right.slot.allDay) {
		return (
			left.slot.start.getTime() === right.slot.start.getTime() &&
			left.slot.end.getTime() === right.slot.end.getTime()
		);
	}
	return false;
}

function getRangeSignature(profile: EventCalendarDateProfile): string {
	return JSON.stringify([
		profile.view,
		profile.date.getTime(),
		profile.timeZone,
		profile.currentRange.start.getTime(),
		profile.currentRange.end.getTime(),
		profile.renderRange.start.getTime(),
		profile.renderRange.end.getTime(),
		profile.activeRange.start.getTime(),
		profile.activeRange.end.getTime(),
		profile.visibleDays
	]);
}

function cloneProfile(profile: EventCalendarDateProfile): EventCalendarRangeChangeInfo {
	return {
		view: profile.view,
		date: new Date(profile.date),
		timeZone: profile.timeZone,
		currentRange: cloneRange(profile.currentRange),
		renderRange: cloneRange(profile.renderRange),
		activeRange: cloneRange(profile.activeRange),
		fetchRange: cloneRange(profile.fetchRange),
		visibleDays: [...profile.visibleDays]
	};
}

function cloneRange(range: EventCalendarRange): EventCalendarRange {
	return { start: new Date(range.start), end: new Date(range.end) };
}
