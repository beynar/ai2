<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { onMount } from 'svelte';
	import EventCalendarContent from './EventCalendarContent.svelte';
	import EventCalendarHeader from './EventCalendarHeader.svelte';
	import { isEventCalendarSemanticColor } from './eventCalendar.color.js';
	import {
		addCivilDays,
		getCachedDateTimeFormatter,
		startOfZonedDay
	} from './eventCalendar.date.js';
	import type { EventCalendarProps, EventCalendarSnapshot } from './eventCalendar.props.js';
	import {
		EMPTY_EVENT_CALENDAR_SELECTION,
		EventCalendarState
	} from './eventCalendar.state.svelte.js';
	import { useEventCalendarTheme } from './eventCalendar.theme.js';
	import type {
		EventCalendarApi,
		EventCalendarDateOnly,
		EventCalendarItem,
		EventCalendarOccurrence,
		EventCalendarRange,
		EventCalendarSelection,
		EventCalendarUpdateAdjustment,
		EventCalendarView
	} from './eventCalendar.types.js';

	const DEFAULT_VIEWS: EventCalendarView[] = ['month', 'week', 'day', 'days', 'agenda', 'resource'];

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
		class: className,
		ref = $bindable<HTMLElement | null>(null),
		theme,
		timeZone,
		locale,
		i18n,
		dir,
		weekStartsOn,
		validRange,
		month,
		showWeekends = true,
		weekendDays = [0, 6],
		timeGrid,
		allDayConversion,
		agendaDayCount = 30,
		availability,
		scrollMode = 'contained',
		stickyHeader = false,
		showDatePicker = false,
		interactions,
		allowOverlap = true,
		validateItemUpdate,
		resolveItemUpdate,
		validateSlotSelection,
		recurrence,
		historyLimit = 50,
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
		agendaDetails,
		resourceHeader,
		nowIndicator,
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
		onkeydown: onRootKeydown,
		...rootAttributes
	}: EventCalendarProps<TItemFields, TResourceFields> = $props();

	const messages = $derived(useI18n(i18n));
	const componentId = $props.id();
	const showHeader = $derived(header !== false);
	const resolvedHeader = $derived(header === false ? undefined : header);
	const showItemTooltip = $derived(itemTooltip !== false);
	const resolvedItemTooltip = $derived(itemTooltip === false ? undefined : itemTooltip);
	const showNowIndicator = $derived(nowIndicator !== false);
	const resolvedNowIndicator = $derived(nowIndicator === false ? undefined : nowIndicator);
	let ambientDirection = $state<'ltr' | 'rtl' | null>(null);
	const resolvedDirection = $derived(dir ?? ambientDirection ?? 'ltr');
	const classes = $derived(useEventCalendarTheme(theme));
	let contentComponent = $state<{
		scrollToTime(dateOrMinutes: Date | number): boolean;
	} | null>(null);
	const calendar = new EventCalendarState<TItemFields, TResourceFields>(componentId, {
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
		get messages() {
			return messages;
		},
		get density() {
			return density;
		},
		get classes() {
			return classes;
		},
		get localeOption() {
			return locale;
		},
		get weekStartsOnOption() {
			return weekStartsOn;
		},
		get monthOptions() {
			return month;
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
		get timeGridOptions() {
			return timeGrid;
		},
		get allDayConversionOptions() {
			return allDayConversion;
		},
		get availabilityOptions() {
			return availability;
		},
		get disabled() {
			return disabled;
		},
		get loading() {
			return loading;
		},
		get direction() {
			return resolvedDirection;
		},
		get interactionOptions() {
			return interactions;
		},
		get allowOverlap() {
			return allowOverlap;
		},
		get canUpdateItem() {
			return validateItemUpdate;
		},
		get onItemUpdate() {
			return resolveItemUpdate;
		},
		get canSelectSlot() {
			return validateSlotSelection;
		},
		get recurrenceOptions() {
			return recurrence;
		},
		get historyLimit() {
			return historyLimit;
		},
		get onItemsChange() {
			return onItemsChange;
		},
		get onSlotSelect() {
			return onSlotSelect;
		},
		get onInteractionBlocked() {
			return onInteractionBlocked;
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
	const a11y = calendar.a11y;
	const dragPreviewDateTimeFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	const dragPreviewDateFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

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

	export function addItem(item: EventCalendarItem<TItemFields>): void {
		calendar.addItem(item);
	}

	export function updateItem(item: EventCalendarItem<TItemFields>): void {
		calendar.updateItem(item);
	}

	export function updateOccurrence(
		key: string,
		adjustment: EventCalendarUpdateAdjustment,
		options?: { scope?: 'occurrence' | 'series' }
	): void {
		calendar.updateOccurrence(key, adjustment, options);
	}

	export function removeItem(id: string): void {
		calendar.removeItem(id);
	}

	export function copySelection(): boolean {
		return calendar.copySelection();
	}

	export function paste(): boolean {
		return calendar.paste();
	}

	export function undo(): boolean {
		return calendar.undo();
	}

	export function redo(): boolean {
		return calendar.redo();
	}

	export function canUndo(): boolean {
		return calendar.canUndo();
	}

	export function canRedo(): boolean {
		return calendar.canRedo();
	}

	export function cancelInteraction(): void {
		calendar.interaction.cancel();
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
		addItem,
		updateItem,
		updateOccurrence,
		removeItem,
		copySelection,
		paste,
		undo,
		redo,
		canUndo,
		canRedo,
		select,
		clearSelection,
		cancelInteraction
	};

	function handleRootKeydown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }
	): void {
		onRootKeydown?.(event);
		if (event.defaultPrevented || (!event.metaKey && !event.ctrlKey) || event.altKey) return;
		const target = event.target;
		if (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		) {
			return;
		}
		const key = event.key.toLowerCase();
		let handled = false;
		if (key === 'c' && !event.shiftKey) handled = copySelection();
		else if (key === 'v' && !event.shiftKey) handled = paste();
		else if (key === 'z' && event.shiftKey) handled = redo();
		else if (key === 'z' && !event.shiftKey) handled = undo();
		else if (key === 'y' && !event.shiftKey) handled = redo();
		if (handled) event.preventDefault();
	}

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
		calendar.interaction.mount();
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
			calendar.unmount();
		};
	});

	$effect(() => {
		if (!calendar.isMounted || !showNowIndicator) return;
		const refreshInterval = calendar.nowIndicatorInterval;
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
</script>

<div
	{...rootAttributes}
	onkeydowncapture={handleRootKeydown}
	bind:this={ref}
	{dir}
	role="region"
	aria-label={rootAttributes['aria-label'] ?? messages.eventCalendarLabel}
	data-event-calendar-part="root"
	data-density={density}
	data-color="primary"
	data-view={calendar.view}
	data-direction={resolvedDirection}
	data-loading={loading || undefined}
	data-disabled={disabled || undefined}
	data-interaction-kind={calendar.interaction.gesture?.kind}
	data-interaction-input={calendar.interaction.gesture?.inputMode}
	data-interaction-valid={calendar.interaction.isValid ?? undefined}
	class={classes.root({
		density,
		view: calendar.view,
		disabled,
		class: [scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden', className]
	})}
	{@attach scrollMode === 'page' ? calendar.interaction.autoScroll('page') : null}
>
	{#if showHeader}
		<EventCalendarHeader
			{calendar}
			{snapshot}
			{messages}
			direction={resolvedDirection}
			{showDatePicker}
			{density}
			{disabled}
			{classes}
			header={resolvedHeader}
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
		{loading}
		{disabled}
		{scrollMode}
		{classes}
		nowIndicator={showNowIndicator}
		showWeekNumbers={calendar.showWeekNumbers}
		maxItemsPerCell={calendar.maxItemsPerCell}
		offDays={calendar.offDays}
		{showItemTooltip}
		{monthCell}
		{dayHeader}
		{timeGutter}
		{allDay}
		nowIndicatorContent={resolvedNowIndicator}
		{agendaDetails}
		{resourceHeader}
		{item}
		itemTooltip={resolvedItemTooltip}
		{overflow}
		{overflowContent}
		{empty}
		{loadingContent}
		{onItemClick}
		{onItemDoubleClick}
		{onSlotClick}
		{onMoreClick}
	/>
	{#if calendar.interaction.proposal && calendar.interaction.gesture?.inputMode === 'pointer'}
		{@const proposal = calendar.interaction.proposal}
		{@const previewPayload = {
			proposal,
			isValid: calendar.interaction.isValid === true,
			defaultContent: defaultDragPreview
		}}
		<div
			aria-hidden="true"
			data-event-calendar-part="drag-preview"
			data-invalid={calendar.interaction.isValid === false || undefined}
			class={classes.dragPreview({
				density,
				view: calendar.view,
				invalid: calendar.interaction.isValid === false
			})}
			style:position="fixed"
			style:left={`${calendar.interaction.gesture?.pointerX ?? 0}px`}
			style:top={`${calendar.interaction.gesture?.pointerY ?? 0}px`}
		>
			<Slot render={dragPreview ?? defaultDragPreview} payload={previewPayload} />
		</div>
	{/if}
	{#if calendar.interaction.proposal && calendar.interaction.gesture?.inputMode === 'pointer'}
		{@const proposal = calendar.interaction.proposal}
		{@const indicatorRect = calendar.interaction.getDropIndicatorRect()}
		{@const eventColor =
			calendar.interaction.gesture.kind !== 'slot-create'
				? (calendar.interaction.gesture.occurrence.item.color ?? proposal.item.color)
				: proposal.item.color}
		{@const indicatorColor = isEventCalendarSemanticColor(eventColor) ? eventColor : 'neutral'}
		{@const indicatorItemColor =
			eventColor && !isEventCalendarSemanticColor(eventColor) ? eventColor : 'var(--color)'}
		{#if indicatorRect && calendar.interaction.isValid === true}
			<div
				aria-hidden="true"
				data-event-calendar-part="drop-indicator"
				data-color={indicatorColor}
				class={classes.dropIndicator({
					density,
					color: indicatorColor,
					view: calendar.view,
					class: 'fixed'
				})}
				style:--event-calendar-item-color={indicatorItemColor}
				style:left={`${indicatorRect.left}px`}
				style:top={`${indicatorRect.top}px`}
				style:width={`${indicatorRect.width}px`}
				style:height={`${indicatorRect.height}px`}
				style:clip-path={indicatorRect.clipPath}
			></div>
		{/if}
	{/if}
	<span id={a11y.liveRegionId} class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{a11y.announcement}
	</span>
	<span id={`${a11y.liveRegionId}-instructions`} class="sr-only">
		{messages.eventCalendarKeyboardInstructions}
	</span>
	<span class="sr-only" data-event-calendar-interaction-status>{a11y.interactionStatus}</span>
</div>

{#snippet defaultDragPreview()}
	{@const proposal = calendar.interaction.proposal}
	{#if proposal}
		<span class="block max-w-64 truncate font-medium">{proposal.item.title}</span>
		{#if proposal.item.allDay}
			{@const start = startOfZonedDay(proposal.item.start, calendar.timeZone)}
			{@const inclusiveEnd = startOfZonedDay(
				addCivilDays(proposal.item.end, -1),
				calendar.timeZone
			)}
			<span
				data-event-calendar-part="drag-preview-date"
				class="block whitespace-nowrap text-[0.6875rem] leading-4 text-neutral/60 tabular-nums"
			>
				{dragPreviewDateFormatter.formatRange(start, inclusiveEnd)}
			</span>
		{:else}
			<span
				data-event-calendar-part="drag-preview-time"
				class="block whitespace-nowrap text-[0.6875rem] leading-4 text-neutral/60 tabular-nums"
			>
				{dragPreviewDateTimeFormatter.formatRange(proposal.item.start, proposal.item.end)}
			</span>
		{/if}
	{/if}
{/snippet}
