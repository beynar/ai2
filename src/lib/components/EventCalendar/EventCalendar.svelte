<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { onMount } from 'svelte';
	import EventCalendarContent from './EventCalendarContent.svelte';
	import EventCalendarHeader from './EventCalendarHeader.svelte';
	import { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { isEventCalendarSemanticColor } from './eventCalendar.color.js';
	import type { EventCalendarInteractionStatus } from './eventCalendar.interactions.svelte.js';
	import {
		addCivilDays,
		getCachedDateTimeFormatter,
		startOfZonedDay
	} from './eventCalendar.date.js';
	import { getLocaleWeekStartsOn } from './eventCalendar.dateJump.js';
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
		EventCalendarInteractions,
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
	const DEFAULT_INTERACTIONS: EventCalendarInteractions = {
		drag: true,
		resize: true,
		selectSlot: true,
		keyboard: true,
		singlePointer: true,
		maintainDurationOnAllDayChange: false
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
		showItemTooltip = true,
		interactions,
		createActivation,
		allowOverlap = true,
		constrainToBusinessHours = false,
		canUpdateItem,
		onItemUpdate,
		canSelectSlot,
		recurrenceEditScope = 'occurrence',
		clipboard = true,
		historyLimit = 50,
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
		onkeydown: onRootKeydown,
		...rootAttributes
	}: EventCalendarProps<TItemFields, TResourceFields> = $props();

	const messages = $derived(useI18n(i18n));
	const componentId = $props.id();
	const a11y = new EventCalendarA11y<TItemFields, TResourceFields>(`${componentId}-status`);
	const resolvedLocale = $derived(locale ?? messages.locale);
	const resolvedWeekStartsOn = $derived(weekStartsOn ?? getLocaleWeekStartsOn(resolvedLocale));
	const resolvedCreateActivation = $derived({
		...DEFAULT_CREATE_ACTIVATION,
		...createActivation
	});
	const resolvedInteractions = $derived({ ...DEFAULT_INTERACTIONS, ...interactions });
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
		get loading() {
			return loading;
		},
		get direction() {
			return resolvedDirection;
		},
		get interactions() {
			return resolvedInteractions;
		},
		get allowOverlap() {
			return allowOverlap;
		},
		get constrainToBusinessHours() {
			return constrainToBusinessHours;
		},
		get canUpdateItem() {
			return canUpdateItem;
		},
		get onItemUpdate() {
			return onItemUpdate;
		},
		get canSelectSlot() {
			return canSelectSlot;
		},
		get recurrenceEditScope() {
			return recurrenceEditScope;
		},
		get clipboard() {
			return clipboard;
		},
		get historyLimit() {
			return historyLimit;
		},
		get getOccurrenceExceptionId() {
			return getOccurrenceExceptionId;
		},
		get expandRecurrence() {
			return expandRecurrence;
		},
		onOccurrenceKeysRemap: (remap) => a11y.remapOccurrenceKeys(remap),
		onInteractionStatus: (status) => handleInteractionStatus(status),
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
		},
		onMissingSelection(occurrenceKey) {
			a11y.restoreFocusAfterOccurrenceRemoval(occurrenceKey);
		}
	});
	$effect.pre(() => {
		a11y.configureView(calendar.view);
	});
	$effect(() => {
		a11y.configureMutations({
			controller: calendar.interaction,
			view: calendar.view,
			direction: resolvedDirection,
			snapDuration: calendar.snapDuration
		});
	});
	let previousFocusContext = '';
	$effect(() => {
		const focusContext = `${calendar.view}:${calendar.date.getTime()}:${calendar.dayCount}`;
		if (previousFocusContext && previousFocusContext !== focusContext) {
			const occurrenceKey = a11y.getFocusedOccurrenceKey();
			const occurrence = occurrenceKey ? calendar.getOccurrence(occurrenceKey) : null;
			if (occurrence) {
				a11y.restoreOccurrenceFocus(occurrence.key);
				a11y.announce(messages.eventCalendarFocusRestored(occurrence.item.title));
			} else if (occurrenceKey) {
				a11y.restoreFocusAfterOccurrenceRemoval(occurrenceKey);
			}
		}
		previousFocusContext = focusContext;
	});
	$effect(() => {
		const hasItems = items.length > 0;
		const occurrenceKey = a11y.getFocusedOccurrenceKey();
		if (!occurrenceKey) return;
		if (!hasItems || !calendar.getOccurrence(occurrenceKey)) {
			a11y.restoreFocusAfterOccurrenceRemoval(occurrenceKey);
		}
	});
	const statusDateFormatter = $derived(
		getCachedDateTimeFormatter(resolvedLocale, calendar.timeZone, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'shortOffset'
		})
	);
	const dragPreviewDateTimeFormatter = $derived(
		getCachedDateTimeFormatter(resolvedLocale, calendar.timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	const dragPreviewDateFormatter = $derived(
		getCachedDateTimeFormatter(resolvedLocale, calendar.timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

	function handleInteractionStatus(status: EventCalendarInteractionStatus<TItemFields>): void {
		if (status.type === 'mode') {
			const operation = getOperationLabel(status.operation);
			a11y.announce(
				status.source === 'keyboard'
					? messages.eventCalendarKeyboardMode(operation, status.occurrence.item.title)
					: messages.eventCalendarPointerMode(operation, status.occurrence.item.title)
			);
			return;
		}
		if (status.type === 'proposal') {
			a11y.announce(
				messages.eventCalendarProposedPlacement(getPlacementLabel(status.proposal.item))
			);
			return;
		}
		if (status.type === 'invalid') {
			a11y.announce(messages.eventCalendarMutationInvalid());
			return;
		}
		const title = status.item?.title ?? messages.eventCalendarLabel;
		if (status.type === 'commit') {
			a11y.finishItemMutation();
			a11y.announce(messages.eventCalendarMutationCommitted(title));
			return;
		}
		if (status.type === 'revert') {
			a11y.announce(messages.eventCalendarMutationReverted(title));
			return;
		}
		a11y.finishItemMutation();
		a11y.announce(messages.eventCalendarMutationCancelled(title));
	}

	function getOperationLabel(operation: 'move' | 'resize-start' | 'resize-end'): string {
		if (operation === 'move') return messages.eventCalendarMoveAction;
		if (operation === 'resize-start') return messages.eventCalendarResizeStartAction;
		return messages.eventCalendarResizeEndAction;
	}

	function getPlacementLabel(item: EventCalendarItem<TItemFields>): string {
		let placement: string;
		if (item.allDay === true) {
			placement = `${item.start} – ${item.end}`;
		} else {
			placement = statusDateFormatter.formatRange(item.start, item.end);
		}
		const resourceTitles = calendar.resourceModel
			.resolveItemLeafIds(item)
			.map((resourceId) => calendar.resourceModel.resolveLeaf(resourceId)?.title)
			.filter((title): title is string => Boolean(title));
		if (resourceTitles.length > 0) return `${placement}, ${resourceTitles.join(', ')}`;
		return calendar.view === 'resource'
			? `${placement}, ${messages.eventCalendarUnassignedResource}`
			: placement;
	}
	const localizedInteractionStatus = $derived.by(() => {
		const gesture = calendar.interaction.gesture;
		if (!gesture) return '';
		let gestureLabel = messages.eventCalendarSelectRangeGesture;
		if (gesture.kind === 'move') gestureLabel = messages.eventCalendarMoveGesture;
		if (gesture.kind === 'resize-start') {
			gestureLabel = messages.eventCalendarResizeStartGesture;
		}
		if (gesture.kind === 'resize-end') gestureLabel = messages.eventCalendarResizeEndGesture;
		const labels = [
			gestureLabel,
			gesture.isValid ? messages.eventCalendarValidTarget : messages.eventCalendarInvalidTarget,
			messages.eventCalendarTimeZone(calendar.timeZone)
		];
		if (calendar.interaction.proposal?.occurrence?.isRecurring) {
			labels.unshift(messages.eventCalendarRecurringEvent);
		}
		if (
			calendar.view === 'resource' &&
			gesture.kind === 'move' &&
			gesture.isValid &&
			calendar.interaction.proposal
		) {
			labels.push(getResourceMoveAnnouncement(calendar.interaction.proposal.item));
		}
		return labels.join('. ');
	});
	let announcedResourceTarget = '';
	$effect(() => {
		const gesture = calendar.interaction.gesture;
		const proposal = calendar.interaction.proposal;
		if (
			calendar.view !== 'resource' ||
			!gesture ||
			gesture.kind !== 'move' ||
			!gesture.isValid ||
			!proposal
		) {
			announcedResourceTarget = '';
			return;
		}
		const resourceTarget =
			calendar.resourceModel.resolveItemLeafIds(proposal.item).join(',') || 'unassigned';
		if (resourceTarget === announcedResourceTarget) return;
		announcedResourceTarget = resourceTarget;
		a11y.announce(getResourceMoveAnnouncement(proposal.item));
	});

	function getResourceMoveAnnouncement(item: EventCalendarItem<TItemFields>): string {
		const resources = calendar.resourceModel
			.resolveItemLeafIds(item)
			.map((resourceId) => calendar.resourceModel.resolveLeaf(resourceId)?.title)
			.filter((title): title is string => Boolean(title));
		return messages.eventCalendarResourceMoveAnnouncement(
			resources.join(', ') || messages.eventCalendarUnassignedResource
		);
	}

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
			a11y.destroy();
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
	data-color={color}
	data-view={calendar.view}
	data-direction={resolvedDirection}
	data-loading={loading || undefined}
	data-disabled={disabled || undefined}
	data-interaction-kind={calendar.interaction.gesture?.kind}
	data-interaction-input={calendar.interaction.gesture?.inputMode}
	data-interaction-valid={calendar.interaction.isValid ?? undefined}
	class={classes.root({
		density,
		color,
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
		{agendaDetails}
		{resourceHeader}
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
				color,
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
	{#if calendar.interaction.gesture?.inputMode === 'pointer'}
		{#if calendar.interaction.proposal}
			{@const proposal = calendar.interaction.proposal}
			{@const indicatorRect = calendar.interaction.getDropIndicatorRect()}
			{@const eventColor =
				calendar.interaction.gesture.kind !== 'slot-create'
					? (calendar.interaction.gesture.occurrence.item.color ?? proposal.item.color)
					: proposal.item.color}
			{@const indicatorColor = isEventCalendarSemanticColor(eventColor) ? eventColor : color}
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
		{#if calendar.interaction.gesture.kind === 'slot-create'}
			<div
				aria-hidden="true"
				data-event-calendar-part="slot-selection"
				data-invalid={calendar.interaction.isValid === false || undefined}
				class={classes.slotSelection({
					density,
					color,
					view: calendar.view,
					invalid: calendar.interaction.isValid === false,
					class: 'fixed h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded'
				})}
				style:left={`${calendar.interaction.gesture.pointerX}px`}
				style:top={`${calendar.interaction.gesture.pointerY}px`}
			></div>
		{/if}
	{/if}
	<span id={a11y.liveRegionId} class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{a11y.announcement}
	</span>
	<span id={`${a11y.liveRegionId}-instructions`} class="sr-only">
		{messages.eventCalendarKeyboardInstructions}
	</span>
	<span class="sr-only" data-event-calendar-interaction-status>{localizedInteractionStatus}</span>
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
