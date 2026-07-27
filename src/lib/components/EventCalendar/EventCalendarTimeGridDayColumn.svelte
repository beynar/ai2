<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import EventCalendarItem from './EventCalendarItem.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { getEventCalendarItemColor } from './eventCalendar.color.js';
	import { startOfZonedDay } from './eventCalendar.date.js';
	import { serializeEventCalendarTarget } from './eventCalendar.interactions.svelte.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarNowIndicatorPayload,
		EventCalendarSnapshot,
		EventCalendarTimeGutterPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import {
		getEventCalendarElapsedMinutes,
		type EventCalendarTimeGridDayGeometry,
		type EventCalendarTimeSlot
	} from './eventCalendar.timeGrid.js';
	import type { EventCalendarOccurrence, EventCalendarSegment } from './eventCalendar.types.js';

	let {
		view,
		calendar,
		snapshot,
		a11y,
		geometry,
		columnLabel,
		density,
		color,
		classes,
		disabled,
		isOffDay,
		showItemTooltip,
		selectionKey,
		longDayFormatter,
		accessibleTimeFormatter,
		localTimeLabels,
		timeGutter,
		nowPayload,
		nowIndicatorContent,
		item,
		itemTooltip,
		registerTimeTarget,
		handleTargetKeydown,
		handleTimedSlotClick,
		handleItemActivate,
		onItemDoubleClick
	}: {
		view: 'week' | 'day' | 'days' | 'resource';
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		geometry: EventCalendarTimeGridDayGeometry<TItemFields>;
		columnLabel: string;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		disabled: boolean;
		isOffDay: boolean;
		showItemTooltip: boolean;
		selectionKey: string | null;
		longDayFormatter: Intl.DateTimeFormat;
		accessibleTimeFormatter: Intl.DateTimeFormat;
		localTimeLabels?: readonly EventCalendarTimeGutterPayload[];
		timeGutter?: Snippet<[EventCalendarTimeGutterPayload]>;
		nowPayload: EventCalendarNowIndicatorPayload | null;
		nowIndicatorContent?: Snippet<[EventCalendarNowIndicatorPayload]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		registerTimeTarget: (targetKey: string) => (node: HTMLElement) => () => void;
		handleTargetKeydown: (event: KeyboardEvent, targetKey: string, activate?: boolean) => void;
		handleTimedSlotClick: (
			slot: EventCalendarTimeSlot,
			event: MouseEvent,
			resourceId?: string
		) => void;
		handleItemActivate: (segment: EventCalendarSegment<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
	} = $props();

	function isTimedSlotSelected(slot: EventCalendarTimeSlot): boolean {
		return (
			snapshot.selection.kind === 'slot' &&
			!snapshot.selection.slot.allDay &&
			snapshot.selection.slot.start.getTime() === slot.start.getTime() &&
			snapshot.selection.slot.resourceId === geometry.resourceId
		);
	}

	function getTimedPlacementStyle(
		placement: EventCalendarTimeGridDayGeometry<TItemFields>['timedPlacements'][number]
	): string {
		const top =
			getEventCalendarElapsedMinutes(geometry.windowStart, placement.visualStart) /
			calendar.interval;
		const clippedVisualEnd = new Date(
			Math.min(placement.visualEnd.getTime(), geometry.windowEnd.getTime())
		);
		const height = Math.max(
			0.125,
			getEventCalendarElapsedMinutes(placement.visualStart, clippedVisualEnd) / calendar.interval
		);
		const inset = placement.column / placement.columnCount;
		const width = placement.span / placement.columnCount;
		return `top:calc(${top} * var(--event-calendar-slot-height));height:calc(${height} * var(--event-calendar-slot-height));inset-inline-start:${inset * 100}%;width:${width * 100}%`;
	}
	const columnDropTarget = $derived({
		key: `${view}:timed-column:${geometry.key}`,
		view,
		allDay: false as const,
		start: geometry.windowStart,
		end: geometry.windowEnd,
		resourceId: geometry.resourceId
	});
</script>

<div
	role="group"
	aria-label={columnLabel}
	data-event-calendar-part="day-column"
	data-day={geometry.day}
	data-resource-id={geometry.resourceId}
	data-minute-count={geometry.minuteCount}
	data-off-day={isOffDay || undefined}
	class={classes.dayColumn({ density, color, view, offDay: isOffDay, disabled })}
	style:min-width={view === 'resource' ? 'var(--event-calendar-resource-min-width)' : undefined}
	style:height={`calc(${geometry.minuteCount / calendar.interval} * var(--event-calendar-slot-height))`}
	data-event-calendar-target={serializeEventCalendarTarget(columnDropTarget)}
	data-calendar-instance-id={calendar.interaction.instanceId}
	data-event-calendar-target-key={columnDropTarget.key}
	{@attach disabled ? null : calendar.interaction.dropTarget(columnDropTarget)}
>
	{#each localTimeLabels ?? [] as localTimeLabel (localTimeLabel.instant.getTime())}
		<time
			datetime={localTimeLabel.instant.toISOString()}
			data-event-calendar-part="time-label"
			data-event-calendar-local-time-label
			class={classes.timeLabel({
				density,
				color,
				view,
				class:
					'pointer-events-none absolute inset-inline-start-0 z-[2] w-[var(--event-calendar-time-gutter-width)] bg-surface/90'
			})}
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, localTimeLabel.instant) / calendar.interval} * var(--event-calendar-slot-height))`}
			style:height="var(--event-calendar-slot-height)"
		>
			<Slot render={timeGutter ?? defaultLocalTimeGutter} payload={localTimeLabel} />
		</time>

		{#snippet defaultLocalTimeGutter()}
			{localTimeLabel.defaultLabel}
		{/snippet}
	{/each}

	{#each geometry.businessWindows as businessWindow (businessWindow.key)}
		<div
			aria-hidden="true"
			data-event-calendar-business-hours
			data-start={businessWindow.start.toISOString()}
			data-end={businessWindow.end.toISOString()}
			class="pointer-events-none absolute inset-x-0 bg-color-muted/25"
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, businessWindow.start) / calendar.interval} * var(--event-calendar-slot-height))`}
			style:height={`calc(${getEventCalendarElapsedMinutes(businessWindow.start, businessWindow.end) / calendar.interval} * var(--event-calendar-slot-height))`}
		></div>
	{/each}

	{#each geometry.backgroundSegments as segment (segment.key)}
		<div
			aria-hidden="true"
			data-event-calendar-background
			data-occurrence-key={segment.occurrence.key}
			class="pointer-events-none absolute inset-x-0 opacity-20"
			style:background={getEventCalendarItemColor(segment.occurrence, color)}
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, segment.start) / calendar.interval} * var(--event-calendar-slot-height))`}
			style:height={`calc(${Math.max(0.125, getEventCalendarElapsedMinutes(segment.start, segment.end) / calendar.interval)} * var(--event-calendar-slot-height))`}
		></div>
	{/each}

	{#each geometry.slots as slot (slot.key)}
		{@const isSelected = isTimedSlotSelected(slot)}
		{@const dropTarget = {
			key: `${view}:timed:${slot.key}`,
			view,
			allDay: false as const,
			start: slot.start,
			end: slot.end,
			resourceId: geometry.resourceId
		}}
		<button
			type="button"
			tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(slot.key)}
			aria-label={`${longDayFormatter.format(startOfZonedDay(geometry.day, calendar.timeZone))}, ${accessibleTimeFormatter.format(slot.start)}`}
			aria-pressed={isSelected}
			{disabled}
			data-event-calendar-part="time-slot"
			data-slot-start={slot.start.toISOString()}
			data-slot-end={slot.end.toISOString()}
			data-resource-id={geometry.resourceId}
			data-event-calendar-drop-target="time-slot"
			data-drop-view={view}
			data-drop-all-day="false"
			data-drop-disabled={disabled || undefined}
			data-event-calendar-target={serializeEventCalendarTarget(dropTarget)}
			data-calendar-instance-id={calendar.interaction.instanceId}
			data-event-calendar-target-key={dropTarget.key}
			class={classes.timeSlot({
				density,
				color,
				view,
				selected: isSelected,
				disabled,
				invalid: calendar.interaction.isInvalidTarget(dropTarget.key)
			})}
			style:position="absolute"
			style:inset-inline="0"
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, slot.start) / calendar.interval} * var(--event-calendar-slot-height))`}
			style:height={`calc(${getEventCalendarElapsedMinutes(slot.start, slot.end) / calendar.interval} * var(--event-calendar-slot-height))`}
			onfocus={() => a11y.handleTimeTargetFocus(slot.key)}
			onclick={(event) => handleTimedSlotClick(slot, event, geometry.resourceId)}
			onkeydown={(event) => handleTargetKeydown(event, slot.key, true)}
			{@attach disabled ? null : registerTimeTarget(slot.key)}
			{@attach disabled ? null : calendar.interaction.slotDrag(dropTarget)}
		>
			{#if calendar.interaction.isSlotDraftTarget(dropTarget)}
				<span
					aria-hidden="true"
					data-event-calendar-part="slot-selection"
					class={classes.slotSelection({
						density,
						color,
						view,
						invalid: calendar.interaction.isValid === false,
						class: 'absolute inset-0'
					})}
				></span>
			{/if}
		</button>
	{/each}

	{#each geometry.intervalInstants as instant (instant.getTime())}
		<div
			aria-hidden="true"
			data-event-calendar-time-line
			data-line-instant={instant.toISOString()}
			class="pointer-events-none absolute inset-x-0 z-[1] border-t border-neutral-muted/60"
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, instant) / calendar.interval} * var(--event-calendar-slot-height))`}
		></div>
	{/each}

	{#each geometry.timedPlacements as placement (placement.key)}
		{@const segment = placement.segment}
		{@const targetKey = `time-item:${segment.key}`}
		<div class="absolute z-10 min-w-0 px-px" style={getTimedPlacementStyle(placement)}>
			<EventCalendarItem
				{segment}
				{a11y}
				{view}
				locale={calendar.locale}
				timeZone={calendar.timeZone}
				{density}
				{color}
				{classes}
				interaction={calendar.interaction}
				isDragging={calendar.interaction.isDragging(segment.occurrence.key)}
				isSelected={selectionKey === segment.occurrence.key}
				{disabled}
				{showItemTooltip}
				{item}
				{itemTooltip}
				class="h-full min-h-0 overflow-hidden"
				compactContent
				tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(targetKey)}
				registerControl={disabled ? undefined : registerTimeTarget(targetKey)}
				onControlFocus={() => a11y.handleTimeTargetFocus(targetKey)}
				onControlKeydown={(event) => handleTargetKeydown(event, targetKey)}
				onActivate={(event) => handleItemActivate(segment, event)}
				onDoubleClick={(event) => onItemDoubleClick?.(segment.occurrence, event)}
			/>
		</div>
	{/each}

	{#if nowPayload && nowPayload.now >= geometry.windowStart && nowPayload.now < geometry.windowEnd}
		<div
			role="img"
			aria-label={accessibleTimeFormatter.format(nowPayload.now)}
			data-event-calendar-part="now-indicator"
			class={classes.nowIndicator({ density, color, view })}
			style:inset-inline="0"
			style:top={`calc(${getEventCalendarElapsedMinutes(geometry.windowStart, nowPayload.now) / calendar.interval} * var(--event-calendar-slot-height))`}
		>
			<Slot render={nowIndicatorContent ?? defaultNowIndicator} payload={nowPayload} />
		</div>
	{/if}
</div>

{#snippet defaultNowIndicator()}
	<span class="sr-only">{nowPayload ? accessibleTimeFormatter.format(nowPayload.now) : ''}</span>
{/snippet}
