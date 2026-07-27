<script lang="ts" module>
	import type { EventCalendarSegment as ModuleSegment } from './eventCalendar.types.js';

	function getPlacementSegment<TItemFields extends object>(
		segments: readonly ModuleSegment<TItemFields>[]
	): ModuleSegment<TItemFields> {
		const first = segments[0];
		const last = segments[segments.length - 1];
		if (first === last) return first;
		return { ...first, end: last.end, isEnd: last.isEnd, continuesAfter: last.continuesAfter };
	}
</script>

<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { untrack, type Snippet } from 'svelte';
	import EventCalendarItem from './EventCalendarItem.svelte';
	import EventCalendarMonthOverflow from './EventCalendarMonthOverflow.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import {
		getEventCalendarItemColor,
		isEventCalendarSemanticColor
	} from './eventCalendar.color.js';
	import {
		addCivilDays,
		getCachedDateTimeFormatter,
		isEventCalendarOffDay,
		getWeekNumber,
		startOfZonedDay
	} from './eventCalendar.date.js';
	import type { EventCalendarLaneLayout } from './eventCalendar.layout.js';
	import { serializeEventCalendarTarget } from './eventCalendar.interactions.svelte.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarMonthCellPayload,
		EventCalendarOverflowContentPayload,
		EventCalendarOverflowPayload,
		EventCalendarSnapshot
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type {
		EventCalendarDateOnly,
		EventCalendarOccurrence,
		EventCalendarOffDaysConfig,
		EventCalendarSegment
	} from './eventCalendar.types.js';

	let {
		calendar,
		snapshot,
		a11y,
		messages,
		days,
		layout,
		visibleLaneCount,
		insertion,
		draggingOccurrenceKey,
		leadingEmptyCells,
		trailingEmptyCells,
		weekIndex,
		gridTemplateColumns,
		visibleDaySet,
		enabledDays,
		currentStartDay,
		currentEndDay,
		todayDay,
		showWeekNumbers,
		density,
		color,
		classes,
		disabled,
		offDays,
		showItemTooltip,
		monthCell,
		item,
		itemTooltip,
		overflow,
		overflowContent,
		onItemClick,
		onItemDoubleClick,
		onSlotClick,
		onMoreClick
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		messages: Messages;
		days: readonly EventCalendarDateOnly[];
		layout: EventCalendarLaneLayout<TItemFields>;
		visibleLaneCount: number;
		insertion: { startIndex: number; endIndex: number; lane: number } | null;
		draggingOccurrenceKey: string | null;
		leadingEmptyCells: number;
		trailingEmptyCells: number;
		weekIndex: number;
		gridTemplateColumns: string;
		visibleDaySet: ReadonlySet<EventCalendarDateOnly>;
		enabledDays: ReadonlySet<EventCalendarDateOnly>;
		currentStartDay: EventCalendarDateOnly;
		currentEndDay: EventCalendarDateOnly;
		todayDay: EventCalendarDateOnly | null;
		showWeekNumbers: boolean;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		disabled: boolean;
		offDays: boolean | EventCalendarOffDaysConfig;
		showItemTooltip: boolean;
		monthCell?: Snippet<[EventCalendarMonthCellPayload<TItemFields>]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		overflow?: Snippet<[EventCalendarOverflowPayload<TItemFields>]>;
		overflowContent?: Snippet<[EventCalendarOverflowContentPayload<TItemFields>]>;
		onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
		onSlotClick?: (
			slot: {
				view: 'month';
				allDay: true;
				start: EventCalendarDateOnly;
				end: EventCalendarDateOnly;
			},
			event: MouseEvent
		) => void;
		onMoreClick?: (
			day: EventCalendarDateOnly,
			occurrences: readonly EventCalendarOccurrence<TItemFields>[],
			event: MouseEvent
		) => false | void;
	} = $props();

	const itemIndex = $derived(calendar.itemIndex);
	const selectionKey = $derived(
		snapshot.selection.kind === 'item' ? snapshot.selection.itemKey : null
	);
	const fullDayFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
	const dayNumberFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, { day: 'numeric' })
	);

	function isOffDay(day: EventCalendarDateOnly): boolean {
		return isEventCalendarOffDay(day, offDays, calendar.weekendDays);
	}

	function getDayLabel(day: EventCalendarDateOnly): string {
		return fullDayFormatter.format(startOfZonedDay(day, calendar.timeZone));
	}

	function getDaySegments(
		day: EventCalendarDateOnly
	): readonly EventCalendarSegment<TItemFields>[] {
		return itemIndex.segmentsByDay.get(day)?.all ?? [];
	}

	function getHiddenSegments(
		day: EventCalendarDateOnly,
		gridDayIndex: number
	): readonly EventCalendarSegment<TItemFields>[] {
		return layout.placements
			.filter(
				(placement) =>
					(placement.lane >= visibleLaneCount ||
						calendar.interaction.isDraggingFromOverflow(placement.occurrence.key)) &&
					placement.startIndex <= gridDayIndex &&
					placement.endIndex > gridDayIndex
			)
			.map((placement) => placement.segments.find((segment) => segment.day === day))
			.filter((segment): segment is EventCalendarSegment<TItemFields> => segment !== undefined);
	}

	function handleItemActivate(segment: EventCalendarSegment<TItemFields>, event: MouseEvent): void {
		calendar.interaction.resetSinglePointerSlot();
		onItemClick?.(segment.occurrence, event);
		if (event.defaultPrevented) return;
		calendar.select({ kind: 'item', itemKey: segment.occurrence.key, slot: null });
	}

	function handleItemDoubleClick(
		segment: EventCalendarSegment<TItemFields>,
		event: MouseEvent
	): void {
		onItemDoubleClick?.(segment.occurrence, event);
	}

	function handleDayClick(day: EventCalendarDateOnly, event: MouseEvent): void {
		if (a11y.activateMutationTarget({ key: `month:${day}`, view: 'month', allDay: true, day }))
			return;
		if (calendar.interaction.shouldSuppressSlotClick()) return;
		if (!enabledDays.has(day)) return;
		(event.currentTarget as HTMLElement).focus();
		const slot = {
			view: 'month' as const,
			allDay: true as const,
			start: day,
			end: addCivilDays(day, 1)
		};
		onSlotClick?.(slot, event);
		if (event.defaultPrevented) {
			calendar.interaction.resetSinglePointerSlot();
			return;
		}
		if (calendar.interaction.selectSinglePointerSlot(slot)) return;
		calendar.select({ kind: 'slot', itemKey: null, slot });
	}

	function registerDay(day: EventCalendarDateOnly) {
		return (node: HTMLElement) => untrack(() => a11y.registerDay(day, node));
	}
</script>

<div
	role="row"
	data-event-calendar-part="week-row"
	class={classes.weekRow({ density, color, view: 'month', disabled })}
	style:grid-template-columns={gridTemplateColumns}
>
	{#if showWeekNumbers}
		{@const week = getWeekNumber(days[0], calendar.weekStartsOn)}
		<div
			role="rowheader"
			aria-label={messages.eventCalendarWeekNumber(week)}
			data-event-calendar-part="week-number"
			class={classes.weekNumber({ density, color, view: 'month' })}
		>
			{week}
		</div>
	{/if}

	{#each Array.from({ length: leadingEmptyCells }, (_, index) => index) as placeholderIndex (placeholderIndex)}
		<div
			role="gridcell"
			aria-disabled="true"
			data-event-calendar-part="month-cell"
			data-domain-placeholder
			class={classes.monthCell({
				density,
				color,
				view: 'month',
				disabled: true,
				outside: true
			})}
		></div>
	{/each}

	{#each days as day, dayIndex (day)}
		{@const gridDayIndex = dayIndex + leadingEmptyCells}
		{@const isRenderedDay = visibleDaySet.has(day)}
		{@const isOutside = day < currentStartDay || day >= currentEndDay}
		{@const isToday = todayDay === day}
		{@const isOff = isOffDay(day)}
		{@const isDisabled = disabled || !enabledDays.has(day)}
		{@const segments = isRenderedDay ? getDaySegments(day) : []}
		{@const hiddenSegments = isRenderedDay ? getHiddenSegments(day, gridDayIndex) : []}
		{@const isSlotSelected =
			snapshot.selection.kind === 'slot' &&
			snapshot.selection.slot.allDay &&
			snapshot.selection.slot.start === day}
		{@const cellPayload = {
			day,
			segments,
			isToday,
			isOutside,
			isOffDay: isOff,
			isDisabled,
			overflowCount: hiddenSegments.length,
			defaultContent: defaultMonthCell
		} satisfies EventCalendarMonthCellPayload<TItemFields>}
		{@const dropTarget = {
			key: `month:${day}`,
			view: 'month' as const,
			allDay: true as const,
			day
		}}
		<div
			role="gridcell"
			aria-label={isRenderedDay ? getDayLabel(day) : undefined}
			aria-disabled={isDisabled}
			aria-selected={isSlotSelected}
			tabindex={isRenderedDay ? a11y.getDayTabIndex(day) : -1}
			data-event-calendar-part="month-cell"
			data-day={day}
			data-outside={isOutside || undefined}
			data-today={isToday || undefined}
			data-off-day={isOff || undefined}
			data-disabled={isDisabled || undefined}
			data-event-calendar-drop-target={isRenderedDay ? 'month-day' : undefined}
			data-drop-view={isRenderedDay ? 'month' : undefined}
			data-drop-all-day={isRenderedDay ? 'true' : undefined}
			data-drop-disabled={isDisabled || undefined}
			data-event-calendar-target={isRenderedDay
				? serializeEventCalendarTarget(dropTarget)
				: undefined}
			data-calendar-instance-id={calendar.interaction.instanceId}
			data-event-calendar-target-key={dropTarget.key}
			class={classes.monthCell({
				density,
				color,
				view: 'month',
				selected: isSlotSelected,
				disabled: isDisabled,
				today: isToday,
				outside: isOutside,
				offDay: isOff,
				invalid: calendar.interaction.isInvalidTarget(dropTarget.key)
			})}
			onfocus={() => isRenderedDay && a11y.handleDayFocus(day)}
			onclick={(event) => isRenderedDay && handleDayClick(day, event)}
			onkeydown={(event) => {
				if (!isRenderedDay) return;
				if (a11y.handleDayKeydown(event, day)) return;
				if (event.key !== 'Enter' && event.key !== ' ') return;
				event.preventDefault();
				(event.currentTarget as HTMLElement).click();
			}}
			{@attach isRenderedDay ? registerDay(day) : null}
			{@attach isRenderedDay && !isDisabled ? calendar.interaction.dropTarget(dropTarget) : null}
			{@attach isRenderedDay && !isDisabled ? calendar.interaction.slotDrag(dropTarget) : null}
		>
			{#if isRenderedDay}
				{#if calendar.interaction.isSlotDraftTarget(dropTarget)}
					<div
						aria-hidden="true"
						data-event-calendar-part="slot-selection"
						class={classes.slotSelection({
							density,
							color,
							view: 'month',
							invalid: calendar.interaction.isValid === false,
							class: 'absolute inset-0'
						})}
					></div>
				{/if}
				<Slot render={monthCell ?? defaultMonthCell} payload={cellPayload} />

				{#each segments.filter((segment) => segment.occurrence.item.display === 'background') as segment (segment.key)}
					<div
						aria-hidden="true"
						data-event-calendar-background
						data-occurrence-key={segment.occurrence.key}
						class="pointer-events-none absolute inset-x-0 bottom-0 top-7 bg-[var(--event-calendar-item-color)] opacity-20"
						style:--event-calendar-item-color={getEventCalendarItemColor(segment.occurrence, color)}
					></div>
				{/each}

				{#if insertion?.startIndex === gridDayIndex && insertion.lane < visibleLaneCount}
					{@const proposal = calendar.interaction.proposal}
					{#if proposal}
						{@const indicatorColor = isEventCalendarSemanticColor(proposal.item.color)
							? proposal.item.color
							: color}
						{@const indicatorItemColor =
							proposal.item.color && !isEventCalendarSemanticColor(proposal.item.color)
								? proposal.item.color
								: 'var(--color)'}
						<div
							aria-hidden="true"
							class="pointer-events-none absolute inset-inline-start-0 z-20 h-[var(--event-calendar-item-min-height)] px-0.5 transition-[top] duration-150 motion-reduce:transition-none"
							style:top={`calc(1.75rem + ${insertion.lane} * var(--event-calendar-item-min-height))`}
							style:width={`calc(${insertion.endIndex - insertion.startIndex} * 100%)`}
						>
							<div
								data-event-calendar-part="drop-indicator"
								data-invalid={calendar.interaction.isValid === false || undefined}
								class={classes.dropIndicator({
									density,
									color: indicatorColor,
									view: 'month',
									invalid: calendar.interaction.isValid === false,
									class: 'h-full w-full'
								})}
								style:--event-calendar-item-color={indicatorItemColor}
							></div>
						</div>
					{/if}
				{/if}

				{#each layout.placements.filter((placement) => placement.startIndex === gridDayIndex && placement.lane < visibleLaneCount) as placement (`${weekIndex}:${placement.key}`)}
					{@const segment = getPlacementSegment(placement.segments)}
					<div
						class="pointer-events-auto absolute inset-inline-start-0 z-10 h-[var(--event-calendar-item-min-height)] px-0.5 transition-[top,opacity] duration-150 motion-reduce:transition-none"
						class:pointer-events-none={placement.occurrence.key === draggingOccurrenceKey}
						class:opacity-0={placement.occurrence.key === draggingOccurrenceKey}
						style:top={`calc(1.75rem + ${placement.lane} * var(--event-calendar-item-min-height))`}
						style:width={`calc(${placement.endIndex - placement.startIndex} * 100%)`}
					>
						<EventCalendarItem
							{segment}
							{a11y}
							view="month"
							locale={calendar.locale}
							timeZone={calendar.timeZone}
							{density}
							{color}
							{classes}
							interaction={calendar.interaction}
							isDragging={calendar.interaction.isDragging(segment.occurrence.key)}
							allowResize={segment.occurrence.allDay}
							isSelected={selectionKey === placement.occurrence.key}
							{disabled}
							{showItemTooltip}
							{item}
							{itemTooltip}
							class="h-full min-h-0"
							onActivate={(event) => handleItemActivate(segment, event)}
							onDoubleClick={(event) => handleItemDoubleClick(segment, event)}
						/>
					</div>
				{/each}

				{#if hiddenSegments.length > 0}
					<div class="absolute inset-x-1 bottom-1 z-20">
						<EventCalendarMonthOverflow
							{day}
							{a11y}
							dayLabel={getDayLabel(day)}
							{hiddenSegments}
							{messages}
							locale={calendar.locale}
							timeZone={calendar.timeZone}
							{density}
							{color}
							{classes}
							interaction={calendar.interaction}
							{disabled}
							{selectionKey}
							{showItemTooltip}
							{overflow}
							{overflowContent}
							{item}
							{itemTooltip}
							{onMoreClick}
							onItemActivate={handleItemActivate}
							onItemDoubleClick={handleItemDoubleClick}
						/>
					</div>
				{/if}
			{/if}
		</div>

		{#snippet defaultMonthCell()}
			<span
				data-event-calendar-part="day-number"
				class={classes.dayNumber({ density, color, view: 'month', today: isToday })}
			>
				{dayNumberFormatter.format(startOfZonedDay(day, calendar.timeZone))}
			</span>
		{/snippet}
	{/each}

	{#each Array.from({ length: trailingEmptyCells }, (_, index) => index) as placeholderIndex (placeholderIndex)}
		<div
			role="gridcell"
			aria-disabled="true"
			data-event-calendar-part="month-cell"
			data-domain-placeholder
			class={classes.monthCell({
				density,
				color,
				view: 'month',
				disabled: true,
				outside: true
			})}
		></div>
	{/each}
</div>
