<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { onMount } from 'svelte';
	import EventCalendarContent from './EventCalendarContent.svelte';
	import EventCalendarHeader from './EventCalendarHeader.svelte';
	import { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { getLocaleWeekStartsOn } from './eventCalendar.dateJump.js';
	import { EventCalendarError } from './eventCalendar.error.js';
	import type { EventCalendarProps, EventCalendarSnapshot } from './eventCalendar.props.js';
	import {
		EMPTY_EVENT_CALENDAR_SELECTION,
		EventCalendarState
	} from './eventCalendar.state.svelte.js';
	import { useEventCalendarTheme } from './eventCalendar.theme.js';
	import type {
		EventCalendarApi,
		EventCalendarCreateActivation,
		EventCalendarDateOnly,
		EventCalendarItem,
		EventCalendarOccurrence,
		EventCalendarRange,
		EventCalendarSelection,
		EventCalendarUpdateAdjustment,
		EventCalendarView
	} from './eventCalendar.types.js';

	const DEFAULT_VIEWS: EventCalendarView[] = ['month', 'week', 'day', 'days', 'agenda', 'resource'];
	const DEFAULT_CREATE_ACTIVATION: EventCalendarCreateActivation = {
		distancePx: 5,
		touchDelayMs: 300,
		touchTolerancePx: 8
	};

	let {
		items = $bindable<EventCalendarItem<TItemFields>[]>([]),
		view = $bindable<EventCalendarView>('month'),
		views = [...DEFAULT_VIEWS],
		date = $bindable(),
		dayCount = $bindable(3),
		selection = $bindable<EventCalendarSelection>(EMPTY_EVENT_CALENDAR_SELECTION),
		resources = [],
		loading = false,
		disabled = false,
		density = 'normal',
		color = 'primary',
		class: className,
		ref = $bindable<HTMLElement | null>(null),
		theme,
		timeZone,
		locale,
		i18n,
		dir,
		weekStartsOn,
		validRange,
		fixedWeeks = true,
		showOutsideDays = true,
		showWeekends = true,
		weekendDays = [0, 6],
		showWeekNumbers = false,
		maxItemsPerCell = 'auto',
		dayStartHour = 0,
		dayEndHour = 24,
		interval = 60,
		slotDuration = 30,
		snapDuration = 15,
		defaultTimedItemDuration = 60,
		defaultAllDayItemDuration = 1,
		scrollToHour = 7,
		agendaDayCount = 30,
		nowIndicator = true,
		nowIndicatorInterval = 30000,
		offDays = false,
		businessHours = [],
		scrollMode = 'contained',
		scrollbars = 'custom',
		stickyHeader = false,
		showHeader = true,
		showDatePicker = false,
		showItemTooltip = false,
		interactions,
		createActivation,
		allowOverlap = true,
		constrainToBusinessHours = false,
		canUpdateItem,
		onItemUpdate,
		canSelectSlot,
		recurrenceEditScope = 'occurrence',
		getOccurrenceExceptionId,
		expandRecurrence,
		header,
		actions,
		item,
		itemTooltip,
		monthCell,
		dayHeader,
		timeGutter,
		allDay,
		overflow,
		overflowContent,
		agendaItem,
		agendaDetails,
		resourceHeader,
		nowIndicatorContent,
		dragPreview,
		empty,
		loadingContent,
		onRangeChange,
		onItemsChange,
		onViewChange,
		onDateChange,
		onDayCountChange,
		onSelectionChange,
		onItemClick,
		onItemDoubleClick,
		onSlotClick,
		onSlotSelect,
		onMoreClick,
		onInteractionBlocked,
		...rootAttributes
	}: EventCalendarProps<TItemFields, TResourceFields> = $props();

	const messages = $derived(useI18n(i18n));
	const componentId = $props.id();
	const a11y = new EventCalendarA11y(`${componentId}-status`);
	const resolvedLocale = $derived(locale ?? messages.locale);
	const resolvedWeekStartsOn = $derived(weekStartsOn ?? getLocaleWeekStartsOn(resolvedLocale));
	const resolvedCreateActivation = $derived({
		...DEFAULT_CREATE_ACTIVATION,
		...createActivation
	});
	let ambientDirection = $state<'ltr' | 'rtl' | null>(null);
	const resolvedDirection = $derived(dir ?? ambientDirection ?? 'ltr');
	const classes = $derived(useEventCalendarTheme(theme));
	let contentComponent = $state<{
		scrollToTime(dateOrMinutes: Date | number): boolean;
	} | null>(null);

	const calendar = new EventCalendarState<TItemFields, TResourceFields>({
		get items() {
			return items;
		},
		set items(value) {
			items = value;
		},
		get view() {
			return view;
		},
		set view(value) {
			view = value;
		},
		get views() {
			return views;
		},
		get date() {
			return date;
		},
		set date(value) {
			date = value;
		},
		get dayCount() {
			return dayCount;
		},
		set dayCount(value) {
			dayCount = value;
		},
		get selection() {
			return selection;
		},
		set selection(value) {
			selection = value;
		},
		get resources() {
			return resources;
		},
		get timeZone() {
			return timeZone;
		},
		get locale() {
			return resolvedLocale;
		},
		get weekStartsOn() {
			return resolvedWeekStartsOn;
		},
		get fixedWeeks() {
			return fixedWeeks;
		},
		get showOutsideDays() {
			return showOutsideDays;
		},
		get showWeekends() {
			return showWeekends;
		},
		get weekendDays() {
			return weekendDays;
		},
		get agendaDayCount() {
			return agendaDayCount;
		},
		get validRange() {
			return validRange;
		},
		get dayStartHour() {
			return dayStartHour;
		},
		get dayEndHour() {
			return dayEndHour;
		},
		get interval() {
			return interval;
		},
		get slotDuration() {
			return slotDuration;
		},
		get snapDuration() {
			return snapDuration;
		},
		get defaultTimedItemDuration() {
			return defaultTimedItemDuration;
		},
		get defaultAllDayItemDuration() {
			return defaultAllDayItemDuration;
		},
		get scrollToHour() {
			return scrollToHour;
		},
		get nowIndicatorInterval() {
			return nowIndicatorInterval;
		},
		get maxItemsPerCell() {
			return maxItemsPerCell;
		},
		get createActivation() {
			return resolvedCreateActivation;
		},
		get businessHours() {
			return businessHours;
		},
		get offDays() {
			return offDays;
		},
		get disabled() {
			return disabled;
		},
		get expandRecurrence() {
			return expandRecurrence;
		},
		get onRangeChange() {
			return onRangeChange;
		},
		get onViewChange() {
			return onViewChange;
		},
		get onDateChange() {
			return onDateChange;
		},
		get onDayCountChange() {
			return onDayCountChange;
		},
		get onSelectionChange() {
			return onSelectionChange;
		}
	});

	export function next(): void {
		calendar.next();
	}

	export function previous(): void {
		calendar.previous();
	}

	export function today(): void {
		calendar.today();
	}

	export function goTo(value: Date | EventCalendarDateOnly): void {
		calendar.goTo(value);
	}

	export function setView(nextView: EventCalendarView, options?: { dayCount?: number }): void {
		calendar.setView(nextView, options);
	}

	export function scrollToTime(dateOrMinutes: Date | number): boolean {
		if (calendar.view === 'month' || calendar.view === 'agenda') return false;
		return contentComponent?.scrollToTime(dateOrMinutes) ?? false;
	}

	export function getVisibleRange(): EventCalendarRange {
		return calendar.getVisibleRange();
	}

	export function getActiveRange(): EventCalendarRange {
		return calendar.getActiveRange();
	}

	export function getVisibleDays(): readonly EventCalendarDateOnly[] {
		return calendar.getVisibleDays();
	}

	export function getOccurrence(key: string): EventCalendarOccurrence<TItemFields> | null {
		return calendar.getOccurrence(key);
	}

	export function getOccurrences(
		range?: EventCalendarRange
	): readonly EventCalendarOccurrence<TItemFields>[] {
		return calendar.getOccurrences(range);
	}

	export function getOccurrencesForDay(
		day: EventCalendarDateOnly
	): readonly EventCalendarOccurrence<TItemFields>[] {
		return calendar.getOccurrencesForDay(day);
	}

	export function select(nextSelection: EventCalendarSelection): void {
		calendar.select(nextSelection);
	}

	export function clearSelection(): void {
		calendar.clearSelection();
	}

	function unavailableItemMutation(method: string, details?: Record<string, unknown>): never {
		throw new EventCalendarError(
			'invalid-item',
			`${method} mutation is unavailable until the EventCalendar interaction engine is active.`,
			{ method, phase: 3, ...details }
		);
	}

	const api: EventCalendarApi<TItemFields> = {
		next,
		previous,
		today,
		goTo,
		setView,
		scrollToTime,
		getVisibleRange,
		getActiveRange,
		getVisibleDays,
		getOccurrence,
		getOccurrences,
		getOccurrencesForDay,
		addItem(item: EventCalendarItem<TItemFields>): void {
			unavailableItemMutation('addItem', { id: item.id });
		},
		updateItem(item: EventCalendarItem<TItemFields>): void {
			unavailableItemMutation('updateItem', { id: item.id });
		},
		updateOccurrence(
			key: string,
			adjustment: EventCalendarUpdateAdjustment,
			options?: { scope?: 'occurrence' | 'series' }
		): void {
			void adjustment;
			void options;
			unavailableItemMutation('updateOccurrence', { key });
		},
		removeItem(id: string): void {
			unavailableItemMutation('removeItem', { id });
		},
		select,
		clearSelection,
		cancelInteraction(): void {
			// No interaction controller exists before Phase 7, so cancellation is already complete.
		}
	};

	const snapshot = $derived<EventCalendarSnapshot<TItemFields, TResourceFields>>({
		items,
		resources,
		view: calendar.view,
		date: calendar.date,
		range: calendar.dateProfile,
		selection: calendar.selection,
		loading,
		disabled,
		api
	});

	onMount(() => {
		calendar.mount();
		const parentElement = ref?.parentElement;
		const updateAmbientDirection = () => {
			if (!parentElement) return;
			ambientDirection = getComputedStyle(parentElement).direction === 'rtl' ? 'rtl' : 'ltr';
		};
		updateAmbientDirection();

		const observer = new MutationObserver(updateAmbientDirection);
		for (let ancestor = parentElement; ancestor; ancestor = ancestor.parentElement) {
			observer.observe(ancestor, {
				attributes: true,
				attributeFilter: ['class', 'dir', 'style']
			});
		}

		return () => {
			observer.disconnect();
			a11y.destroy();
			calendar.unmount();
		};
	});

	$effect(() => {
		if (!calendar.isMounted || !nowIndicator) return;
		const refreshInterval = nowIndicatorInterval;
		let timer: number | null = null;

		const stopTimer = () => {
			if (timer === null) return;
			window.clearInterval(timer);
			timer = null;
		};
		const startTimer = () => {
			stopTimer();
			if (document.visibilityState === 'hidden') return;
			calendar.refreshNow();
			timer = window.setInterval(() => calendar.refreshNow(), refreshInterval);
		};
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') {
				stopTimer();
				return;
			}
			startTimer();
		};

		startTimer();
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			stopTimer();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});

	function consumeFuturePhaseProps(): void {
		void scrollbars;
		void interactions;
		void allowOverlap;
		void constrainToBusinessHours;
		void canUpdateItem;
		void onItemUpdate;
		void canSelectSlot;
		void recurrenceEditScope;
		void getOccurrenceExceptionId;
		void resourceHeader;
		void dragPreview;
		void onItemsChange;
		void onSlotSelect;
		void onInteractionBlocked;
	}

	consumeFuturePhaseProps();
</script>

<div
	{...rootAttributes}
	bind:this={ref}
	{dir}
	role="region"
	aria-label={rootAttributes['aria-label'] ?? messages.eventCalendarLabel}
	data-event-calendar-part="root"
	data-density={density}
	data-color={color}
	data-view={calendar.view}
	data-direction={resolvedDirection}
	data-loading={loading || undefined}
	data-disabled={disabled || undefined}
	class={classes.root({
		density,
		color,
		view: calendar.view,
		disabled,
		class: [scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden', className]
	})}
>
	{#if showHeader}
		<EventCalendarHeader
			{calendar}
			{snapshot}
			{messages}
			direction={resolvedDirection}
			{showDatePicker}
			{density}
			{color}
			{disabled}
			{classes}
			{header}
			{actions}
			{stickyHeader}
			{scrollMode}
		/>
	{/if}
	<EventCalendarContent
		bind:this={contentComponent}
		{calendar}
		{snapshot}
		{a11y}
		{messages}
		direction={resolvedDirection}
		{density}
		{color}
		{loading}
		{disabled}
		{scrollMode}
		{scrollbars}
		{classes}
		{nowIndicator}
		{showWeekNumbers}
		{maxItemsPerCell}
		{offDays}
		{showItemTooltip}
		{monthCell}
		{dayHeader}
		{timeGutter}
		{allDay}
		{nowIndicatorContent}
		{agendaItem}
		{agendaDetails}
		{item}
		{itemTooltip}
		{overflow}
		{overflowContent}
		{empty}
		{loadingContent}
		{onItemClick}
		{onItemDoubleClick}
		{onSlotClick}
		{onMoreClick}
	/>
	<span id={a11y.liveRegionId} class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{a11y.announcement}
	</span>
</div>
