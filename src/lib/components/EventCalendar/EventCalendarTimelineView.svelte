<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { get } from 'svelte/store';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import EventCalendarItem from './EventCalendarItem.svelte';
	import type { EventCalendarA11y, EventCalendarTimeTarget } from './eventCalendar.a11y.svelte.js';
	import { getEventCalendarItemColor } from './eventCalendar.color.js';
	import {
		addCivilDays,
		getCachedDateTimeFormatter,
		getZonedDay,
		resolveZonedMinutesOnDay,
		startOfZonedDay
	} from './eventCalendar.date.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarResourceHeaderPayload,
		EventCalendarSnapshot
	} from './eventCalendar.props.js';
	import { filterEventCalendarBucketByResource } from './eventCalendar.resources.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type {
		EventCalendarDateOnly,
		EventCalendarOccurrence,
		EventCalendarSegment,
		EventCalendarSlot
	} from './eventCalendar.types.js';

	let {
		calendar,
		snapshot,
		a11y,
		messages,
		density,
		color,
		classes,
		disabled,
		rowHeight,
		slotWidth,
		overscan,
		showItemTooltip,
		resourceHeader,
		item,
		itemTooltip,
		onItemClick,
		onItemDoubleClick,
		onSlotClick
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		messages: Messages;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		disabled: boolean;
		rowHeight: number;
		slotWidth: number;
		overscan: number;
		showItemTooltip: boolean;
		resourceHeader?: Snippet<[EventCalendarResourceHeaderPayload<TResourceFields>]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
		onSlotClick?: (slot: EventCalendarSlot, event: MouseEvent) => void;
	} = $props();

	type TimelineSlot = {
		key: string;
		day: EventCalendarDateOnly;
		start: Date;
		end: Date;
		left: number;
	};

	let viewportRef = $state<HTMLDivElement | null>(null);
	const resourceWidth = 176;
	const slotsPerDay = $derived(
		Math.ceil(((calendar.dayEndHour - calendar.dayStartHour) * 60) / calendar.snapDuration)
	);
	const dayWidth = $derived(slotsPerDay * slotWidth);
	const timelineWidth = $derived(snapshot.range.visibleDays.length * dayWidth);
	const rows = $derived(calendar.resourceModel.columns);
	const timelineSlots = $derived.by(() => {
		const slots: TimelineSlot[] = [];
		for (const [dayIndex, day] of snapshot.range.visibleDays.entries()) {
			for (let slotIndex = 0; slotIndex < slotsPerDay; slotIndex += 1) {
				const minute = calendar.dayStartHour * 60 + slotIndex * calendar.snapDuration;
				const nextMinute = Math.min(calendar.dayEndHour * 60, minute + calendar.snapDuration);
				const start = resolveTimelineMinute(day, minute);
				const end = resolveTimelineMinute(day, nextMinute);
				slots.push({
					key: `${day}:${minute}`,
					day,
					start,
					end,
					left: (dayIndex * slotsPerDay + slotIndex) * slotWidth
				});
			}
		}
		return slots;
	});
	const dayFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		})
	);
	const timeFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			hour: 'numeric',
			minute: '2-digit'
		})
	);

	const rowVirtualizerStore = createVirtualizer<HTMLElement, HTMLElement>({
		count: 0,
		getScrollElement: () => null,
		estimateSize: () => 48,
		overscan: 6
	});
	$effect(() => {
		const currentRows = rows;
		const scrollElement = viewportRef;
		const size = rowHeight;
		const extra = overscan;
		get(rowVirtualizerStore).setOptions({
			count: currentRows.length,
			getScrollElement: () => scrollElement,
			estimateSize: () => size,
			overscan: extra,
			getItemKey: (index) => currentRows[index]?.key ?? index
		});
	});
	const virtualRows = $derived($rowVirtualizerStore.getVirtualItems());
	const totalRowsHeight = $derived($rowVirtualizerStore.getTotalSize());
	const timeTargets = $derived.by(() =>
		virtualRows.flatMap((virtualRow) => {
			const row = rows[virtualRow.index];
			if (!row) return [];
			const slotTargets: EventCalendarTimeTarget[] = timelineSlots.map((slot, column) => ({
				key: getTimelineTarget(row.key, row.resourceId, slot).key,
				day: slot.day,
				column,
				row: virtualRow.index,
				verticalOrder: 0,
				kind: 'time-slot',
				dropTarget: getTimelineTarget(row.key, row.resourceId, slot)
			}));
			const itemTargets: EventCalendarTimeTarget[] = getSegments(row.resourceId).map((segment) => ({
				key: getTimelineItemTargetKey(row.key, segment),
				day: segment.day,
				column: getSegmentColumn(segment),
				row: virtualRow.index,
				verticalOrder: 1,
				kind: 'item'
			}));
			return [...slotTargets, ...itemTargets];
		})
	);
	$effect(() => {
		a11y.configureTimeGrid({
			targets: timeTargets,
			direction: 'ltr',
			onPage: (direction) => {
				const previousDate = calendar.date.getTime();
				if (direction < 0) calendar.previous();
				else calendar.next();
				return previousDate !== calendar.date.getTime();
			}
		});
	});

	export function scrollToTime(dateOrMinutes: Date | number): boolean {
		if (!viewportRef) return false;
		const minutes =
			typeof dateOrMinutes === 'number' ? dateOrMinutes : getWallMinutes(dateOrMinutes);
		const left = Math.max(
			0,
			((minutes - calendar.dayStartHour * 60) / calendar.snapDuration) * slotWidth
		);
		viewportRef.scrollTo({ left, behavior: 'smooth' });
		return true;
	}

	function resolveTimelineMinute(day: EventCalendarDateOnly, minute: number): Date {
		if (minute === 24 * 60) return startOfZonedDay(addCivilDays(day, 1), calendar.timeZone);
		return resolveZonedMinutesOnDay(day, minute, calendar.timeZone);
	}

	function getWallMinutes(instant: Date): number {
		const parts = new Intl.DateTimeFormat('en-US', {
			timeZone: calendar.timeZone,
			hour: 'numeric',
			minute: 'numeric',
			hourCycle: 'h23'
		}).formatToParts(instant);
		return (
			Number(parts.find((part) => part.type === 'hour')?.value ?? 0) * 60 +
			Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
		);
	}

	function getSegments(resourceId?: string): EventCalendarSegment<TItemFields>[] {
		return snapshot.range.visibleDays.flatMap((day) => {
			const bucket = filterEventCalendarBucketByResource(
				calendar.itemIndex.segmentsByDay.get(day),
				calendar.resourceModel,
				resourceId
			);
			return bucket?.foreground ?? [];
		});
	}

	function getBackgroundSegments(resourceId?: string): EventCalendarSegment<TItemFields>[] {
		return snapshot.range.visibleDays.flatMap((day) => {
			const bucket = filterEventCalendarBucketByResource(
				calendar.itemIndex.segmentsByDay.get(day),
				calendar.resourceModel,
				resourceId
			);
			return bucket?.background ?? [];
		});
	}

	function getSegmentHorizontalStyle(segment: EventCalendarSegment<TItemFields>): string {
		const dayIndex = snapshot.range.visibleDays.indexOf(segment.day);
		const dayStart = calendar.dayStartHour * 60;
		const dayEnd = calendar.dayEndHour * 60;
		const startMinute =
			segment.occurrence.allDay || getZonedDay(segment.start, calendar.timeZone) < segment.day
				? dayStart
				: getWallMinutes(segment.start);
		const endMinute =
			segment.occurrence.allDay || getZonedDay(segment.end, calendar.timeZone) > segment.day
				? dayEnd
				: getWallMinutes(segment.end);
		const clippedStart = Math.max(dayStart, Math.min(dayEnd, startMinute));
		const clippedEnd = Math.max(clippedStart + calendar.snapDuration, Math.min(dayEnd, endMinute));
		const left =
			dayIndex * dayWidth + ((clippedStart - dayStart) / calendar.snapDuration) * slotWidth;
		const width = Math.max(
			slotWidth / 2,
			((clippedEnd - clippedStart) / calendar.snapDuration) * slotWidth
		);
		return `left:${left}px;width:${width}px;`;
	}

	function getSegmentStyle(segment: EventCalendarSegment<TItemFields>): string {
		return `${getSegmentHorizontalStyle(segment)}top:${segment.occurrence.allDay ? 2 : 20}px;height:24px;`;
	}

	function getSegmentColumn(segment: EventCalendarSegment<TItemFields>): number {
		const dayIndex = snapshot.range.visibleDays.indexOf(segment.day);
		const startMinute = segment.occurrence.allDay
			? calendar.dayStartHour * 60
			: getWallMinutes(segment.start);
		const slotIndex = Math.max(
			0,
			Math.min(
				slotsPerDay - 1,
				Math.floor((startMinute - calendar.dayStartHour * 60) / calendar.snapDuration)
			)
		);
		return dayIndex * slotsPerDay + slotIndex;
	}

	function getTimelineTarget(rowKey: string, resourceId: string | undefined, slot: TimelineSlot) {
		return {
			key: `timeline:${rowKey}:${slot.key}`,
			view: 'timeline' as const,
			allDay: false as const,
			start: slot.start,
			end: slot.end,
			resourceId
		};
	}

	function getTimelineItemTargetKey(
		rowKey: string,
		segment: EventCalendarSegment<TItemFields>
	): string {
		return `timeline-item:${rowKey}:${segment.key}`;
	}

	function registerTimeTarget(targetKey: string): (node: HTMLElement) => () => void {
		return (node) => a11y.registerTimeTarget(targetKey, node);
	}

	function getResourcePayload(
		resourceId: string | undefined,
		defaultContent: Snippet
	): EventCalendarResourceHeaderPayload<TResourceFields> {
		const resource = calendar.resourceModel.resolveLeaf(resourceId);
		return {
			resource,
			depth: resourceId ? (rows.find((row) => row.resourceId === resourceId)?.depth ?? 0) : 0,
			isUnassigned: resourceId === undefined,
			defaultContent
		};
	}

	function handleItemActivate(segment: EventCalendarSegment<TItemFields>, event: MouseEvent): void {
		calendar.select({ kind: 'item', itemKey: segment.occurrence.key, slot: null });
		onItemClick?.(segment.occurrence, event);
	}

	function handleSlotClick(slot: EventCalendarSlot, event: MouseEvent | null): void {
		if (calendar.interaction.shouldSuppressSlotClick()) return;
		if (calendar.interaction.selectSinglePointerSlot(slot)) return;
		calendar.select({ kind: 'slot', itemKey: null, slot });
		if (event) onSlotClick?.(slot, event);
	}
</script>

<div
	bind:this={viewportRef}
	data-event-calendar-part="timeline"
	class={classes.timeline({ density, color, view: 'timeline', disabled })}
	style:--event-calendar-timeline-resource-width={`${resourceWidth}px`}
	{@attach calendar.interaction.autoScroll('contained')}
>
	<div class={classes.timelineHeader({ density, color, view: 'timeline', disabled })}>
		<div class={classes.timelineResourceColumn({ density, color, view: 'timeline', disabled })}>
			<span class="flex h-12 items-center px-3 text-xs font-medium text-neutral/60">
				{messages.eventCalendarResourceView}
			</span>
		</div>
		<div dir="ltr" class="relative h-12 shrink-0" style:width={`${timelineWidth}px`}>
			{#each snapshot.range.visibleDays as day, dayIndex (day)}
				<div
					class="absolute inset-y-0 border-e border-neutral-muted"
					style:left={`${dayIndex * dayWidth}px`}
					style:width={`${dayWidth}px`}
				>
					<div class="h-6 border-b border-neutral-muted px-2 text-xs font-medium text-neutral/70">
						{dayFormatter.format(startOfZonedDay(day, calendar.timeZone))}
					</div>
					<div class="flex h-6">
						{#each timelineSlots.filter((slot) => slot.day === day) as slot (slot.key)}
							<div
								class="shrink-0 border-e border-neutral-muted/40 px-1 text-[0.625rem] text-neutral/50"
								style:width={`${slotWidth}px`}
							>
								{timeFormatter.format(slot.start)}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative min-w-max" style:height={`${totalRowsHeight}px`}>
		{#each virtualRows as virtualRow (virtualRow.key)}
			{@const row = rows[virtualRow.index]}
			{#if row}
				<div
					data-index={virtualRow.index}
					data-resource-id={row.resourceId}
					class={classes.timelineRow({ density, color, view: 'timeline', disabled })}
					style:height={`${rowHeight}px`}
					style:top="0"
					style:transform={`translateY(${virtualRow.start}px)`}
				>
					<div
						class={classes.timelineResourceColumn({ density, color, view: 'timeline', disabled })}
					>
						<div class="flex h-full items-center px-3 text-xs text-neutral/75">
							{#snippet defaultResourceHeader()}
								{row.resource?.title ?? messages.eventCalendarUnassignedResource}
							{/snippet}
							{#if resourceHeader}
								{@render resourceHeader(getResourcePayload(row.resourceId, defaultResourceHeader))}
							{:else}
								{@render defaultResourceHeader()}
							{/if}
						</div>
					</div>
					<div dir="ltr" class="relative flex shrink-0" style:width={`${timelineWidth}px`}>
						{#each timelineSlots as slot (slot.key)}
							{@const target = getTimelineTarget(row.key, row.resourceId, slot)}
							<button
								type="button"
								tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(target.key)}
								aria-label={`${row.resource?.title ?? messages.eventCalendarUnassignedResource}, ${dayFormatter.format(slot.start)}, ${timeFormatter.format(slot.start)}`}
								{disabled}
								data-event-calendar-target={JSON.stringify(target)}
								data-calendar-instance-id={calendar.interaction.instanceId}
								class={classes.timelineSlot({ density, color, view: 'timeline', disabled })}
								style:width={`${slotWidth}px`}
								onclick={(event) =>
									handleSlotClick(
										{
											view: 'timeline',
											allDay: false,
											start: slot.start,
											end: slot.end,
											resourceId: row.resourceId
										},
										event
									)}
								onfocus={() => a11y.handleTimeTargetFocus(target.key)}
								onkeydown={(event) => {
									if (a11y.handleTimeTargetKeydown(event, target.key)) return;
									if (event.key !== 'Enter' && event.key !== ' ') return;
									event.preventDefault();
									handleSlotClick(
										{
											view: 'timeline',
											allDay: false,
											start: slot.start,
											end: slot.end,
											resourceId: row.resourceId
										},
										null
									);
								}}
								{@attach calendar.interaction.dropTarget(target)}
								{@attach calendar.interaction.slotDrag(target)}
								{@attach disabled ? null : registerTimeTarget(target.key)}
							></button>
						{/each}
						{#each snapshot.range.visibleDays as day, dayIndex (day)}
							{@const allDayTarget = {
								key: `timeline-all-day:${row.key}:${day}`,
								view: 'timeline' as const,
								allDay: true as const,
								day,
								resourceId: row.resourceId
							}}
							<div
								data-event-calendar-target={JSON.stringify(allDayTarget)}
								data-calendar-instance-id={calendar.interaction.instanceId}
								class="absolute top-0 z-[2] h-[18px]"
								style:left={`${dayIndex * dayWidth}px`}
								style:width={`${dayWidth}px`}
								{@attach calendar.interaction.dropTarget(allDayTarget)}
								{@attach calendar.interaction.slotDrag(allDayTarget)}
							></div>
						{/each}
						<div
							class={classes.timelineEventLayer({ density, color, view: 'timeline', disabled })}
							style:width={`${timelineWidth}px`}
						>
							{#each getBackgroundSegments(row.resourceId) as segment (`background:${row.key}:${segment.key}`)}
								<div
									aria-hidden="true"
									data-event-calendar-background
									data-occurrence-key={segment.occurrence.key}
									class="pointer-events-none absolute inset-y-0 opacity-15"
									style={getSegmentHorizontalStyle(segment)}
									style:background={getEventCalendarItemColor(segment.occurrence, color)}
								></div>
							{/each}
							{#each getSegments(row.resourceId) as segment (`${row.key}:${segment.key}`)}
								{@const targetKey = getTimelineItemTargetKey(row.key, segment)}
								<div class="pointer-events-auto absolute z-10" style={getSegmentStyle(segment)}>
									<EventCalendarItem
										{segment}
										view="timeline"
										locale={calendar.locale}
										timeZone={calendar.timeZone}
										{density}
										{color}
										{classes}
										{a11y}
										interaction={calendar.interaction}
										projectionResourceId={row.resourceId}
										isSelected={snapshot.selection.kind === 'item' &&
											snapshot.selection.itemKey === segment.occurrence.key}
										isDragging={calendar.interaction.isDragging(segment.occurrence.key)}
										{disabled}
										{showItemTooltip}
										{item}
										{itemTooltip}
										class="h-full min-h-0"
										compactContent
										tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(targetKey)}
										registerControl={disabled ? undefined : registerTimeTarget(targetKey)}
										onControlFocus={() => a11y.handleTimeTargetFocus(targetKey)}
										onControlKeydown={(event) => a11y.handleTimeTargetKeydown(event, targetKey)}
										onActivate={(event) => handleItemActivate(segment, event)}
										onDoubleClick={(event) => onItemDoubleClick?.(segment.occurrence, event)}
									/>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
