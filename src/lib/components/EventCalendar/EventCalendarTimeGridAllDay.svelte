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
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Snippet } from 'svelte';
	import EventCalendarItem from './EventCalendarItem.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { getEventCalendarItemColor } from './eventCalendar.color.js';
	import { startOfZonedDay } from './eventCalendar.date.js';
	import type { EventCalendarLaneLayout } from './eventCalendar.layout.js';
	import { serializeEventCalendarTarget } from './eventCalendar.interactions.svelte.js';
	import type {
		EventCalendarAllDayPayload,
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarSnapshot
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarTimeGridDayGeometry } from './eventCalendar.timeGrid.js';
	import type {
		EventCalendarDateOnly,
		EventCalendarOccurrence,
		EventCalendarSegment
	} from './eventCalendar.types.js';

	let {
		view,
		calendar,
		snapshot,
		a11y,
		dayGeometries,
		allDayBackgroundSegments,
		allDayLayout,
		allDayHeight,
		gridTemplateColumns,
		allDayPayload,
		offDaysByDay,
		messages,
		longDayFormatter,
		columnLabels,
		density,
		color,
		classes,
		disabled,
		showItemTooltip,
		selectionKey,
		allDay,
		item,
		itemTooltip,
		registerTimeTarget,
		handleTargetKeydown,
		handleAllDayClick,
		handleItemActivate,
		onItemDoubleClick
	}: {
		view: 'week' | 'day' | 'days' | 'resource';
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		dayGeometries: readonly EventCalendarTimeGridDayGeometry<TItemFields>[];
		allDayBackgroundSegments: ReadonlyMap<string, readonly EventCalendarSegment<TItemFields>[]>;
		allDayLayout: EventCalendarLaneLayout<TItemFields>;
		allDayHeight: string;
		gridTemplateColumns: string;
		allDayPayload: EventCalendarAllDayPayload<TItemFields>;
		offDaysByDay: ReadonlyMap<EventCalendarDateOnly, boolean>;
		messages: Messages;
		longDayFormatter: Intl.DateTimeFormat;
		columnLabels: ReadonlyMap<string, string>;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		disabled: boolean;
		showItemTooltip: boolean;
		selectionKey: string | null;
		allDay?: Snippet<[EventCalendarAllDayPayload<TItemFields>]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		registerTimeTarget: (targetKey: string) => (node: HTMLElement) => () => void;
		handleTargetKeydown: (event: KeyboardEvent, targetKey: string, activate?: boolean) => void;
		handleAllDayClick: (day: EventCalendarDateOnly, event: MouseEvent, resourceId?: string) => void;
		handleItemActivate: (segment: EventCalendarSegment<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
	} = $props();
</script>

<div
	data-event-calendar-part="all-day-row"
	class={classes.allDayRow({ density, color, view, disabled })}
	style:grid-template-columns={gridTemplateColumns}
>
	<div data-event-calendar-part="time-gutter" class={classes.timeGutter({ density, color, view })}>
		<Slot render={allDay ?? allDayPayload.defaultContent} payload={allDayPayload} />
	</div>
	{#each dayGeometries as geometry (geometry.key)}
		{@const isOff = offDaysByDay.get(geometry.day) ?? false}
		{@const targetKey = `all-day:${geometry.key}`}
		{@const isSelected =
			snapshot.selection.kind === 'slot' &&
			snapshot.selection.slot.allDay &&
			snapshot.selection.slot.start === geometry.day &&
			snapshot.selection.slot.resourceId === geometry.resourceId}
		{@const dropTarget = {
			key: `${view}:all-day:${geometry.key}`,
			view,
			allDay: true as const,
			day: geometry.day,
			resourceId: geometry.resourceId
		}}
		<div
			role="group"
			aria-label={columnLabels.get(geometry.key)}
			data-event-calendar-part="all-day-cell"
			data-day={geometry.day}
			data-resource-id={geometry.resourceId}
			data-off-day={isOff || undefined}
			class={classes.allDayCell({
				density,
				color,
				view,
				selected: isSelected,
				offDay: isOff,
				disabled,
				invalid: calendar.interaction.isInvalidTarget(dropTarget.key)
			})}
			style:height={allDayHeight}
			style:min-width={view === 'resource' ? 'var(--event-calendar-resource-min-width)' : undefined}
			data-event-calendar-target={serializeEventCalendarTarget(dropTarget)}
			data-calendar-instance-id={calendar.interaction.instanceId}
			data-event-calendar-target-key={dropTarget.key}
			{@attach disabled ? null : calendar.interaction.dropTarget(dropTarget)}
		>
			<button
				type="button"
				tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(targetKey)}
				aria-label={`${messages.eventCalendarAllDay}, ${longDayFormatter.format(startOfZonedDay(geometry.day, calendar.timeZone))}`}
				aria-pressed={isSelected}
				{disabled}
				data-event-calendar-all-day-hit-area
				data-event-calendar-drop-target="all-day"
				data-drop-view={view}
				data-drop-all-day="true"
				data-drop-disabled={disabled || undefined}
				class="absolute inset-0 z-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60"
				onfocus={() => a11y.handleTimeTargetFocus(targetKey)}
				onclick={(event) => handleAllDayClick(geometry.day, event, geometry.resourceId)}
				onkeydown={(event) => handleTargetKeydown(event, targetKey, true)}
				{@attach disabled ? null : registerTimeTarget(targetKey)}
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
			{#each allDayBackgroundSegments.get(geometry.key) ?? [] as segment (segment.key)}
				<div
					aria-hidden="true"
					data-event-calendar-background
					data-occurrence-key={segment.occurrence.key}
					class="pointer-events-none absolute inset-0 opacity-20"
					style:background={getEventCalendarItemColor(segment.occurrence, color)}
				></div>
			{/each}
			{#each allDayLayout.placements.filter((placement) => placement.startIndex === geometry.column) as placement (placement.key)}
				{@const segment = getPlacementSegment(placement.segments)}
				{@const itemTargetKey = `all-day-item:${placement.key}`}
				<div
					class="pointer-events-auto absolute z-10 px-0.5"
					style:top={`calc(${placement.lane} * var(--event-calendar-item-min-height))`}
					style:inset-inline-start="0"
					style:width={`calc(${placement.endIndex - placement.startIndex} * 100%)`}
				>
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
						isSelected={selectionKey === placement.occurrence.key}
						{disabled}
						{showItemTooltip}
						{item}
						{itemTooltip}
						tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(itemTargetKey)}
						registerControl={disabled ? undefined : registerTimeTarget(itemTargetKey)}
						onControlFocus={() => a11y.handleTimeTargetFocus(itemTargetKey)}
						onControlKeydown={(event) => handleTargetKeydown(event, itemTargetKey)}
						onActivate={(event) => handleItemActivate(segment, event)}
						onDoubleClick={(event) => onItemDoubleClick?.(segment.occurrence, event)}
					/>
				</div>
			{/each}
		</div>
	{/each}
</div>
