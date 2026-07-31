<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { untrack, type Snippet } from 'svelte';
	import EventCalendarAgendaItem from './EventCalendarAgendaItem.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { createEventCalendarAgendaGroups } from './eventCalendar.agenda.js';
	import { getCachedDateTimeFormatter, startOfZonedDay } from './eventCalendar.date.js';
	import type {
		EventCalendarAgendaDetailsPayload,
		EventCalendarItemPayload,
		EventCalendarSnapshot
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarDateOnly, EventCalendarOccurrence } from './eventCalendar.types.js';

	let {
		calendar,
		snapshot,
		a11y,
		messages,
		density,
		color,
		disabled,
		scrollMode,
		classes,
		item,
		agendaDetails,
		onItemClick,
		onItemDoubleClick
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		messages: Messages;
		density: Density;
		color: Colors;
		disabled: boolean;
		scrollMode: 'contained' | 'page';
		classes: EventCalendarClasses;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		agendaDetails?: Snippet<[EventCalendarAgendaDetailsPayload<TItemFields>]>;
		onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
	} = $props();

	const profile = $derived(calendar.dateProfile);
	const groups = $derived(createEventCalendarAgendaGroups(profile.visibleDays, calendar.itemIndex));
	const selectedItemKey = $derived(
		snapshot.selection.kind === 'item' ? snapshot.selection.itemKey : null
	);
	const dayLabelFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
	const weekdayFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, { weekday: 'long' })
	);
	const dateFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
	const timeFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	const accessibleDateTimeFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'shortOffset'
		})
	);
	const zonedTimeFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'shortOffset'
		})
	);
	const accessibleDateFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	$effect(() => {
		const days = groups.map((group) => group.day);
		untrack(() => a11y.configureAgenda({ days }));
	});

	function handleItemActivate(
		occurrence: EventCalendarOccurrence<TItemFields>,
		event: MouseEvent
	): void {
		calendar.interaction.resetSinglePointerSlot();
		onItemClick?.(occurrence, event);
		if (event.defaultPrevented) return;
		calendar.select({ kind: 'item', itemKey: occurrence.key, slot: null });
	}

	function preventDisabledDisclosure(event: Event): void {
		if (!disabled) return;
		if (event.type === 'keydown' && !['Enter', ' '].includes((event as KeyboardEvent).key)) return;
		event.preventDefault();
	}

	function registerAgendaDay(day: EventCalendarDateOnly) {
		return (node: HTMLElement) => untrack(() => a11y.registerDay(day, node));
	}
</script>

{#snippet agendaContent()}
	<div
		role="list"
		aria-label={`${messages.eventCalendarAgendaView}: ${profile.title}`}
		data-event-calendar-part="agenda"
		data-time-zone={calendar.timeZone}
		data-day-count={profile.visibleDays.length}
		class={classes.agenda({ density, color, view: 'agenda', disabled })}
	>
		{#each groups as group (group.day)}
			{@const dayStart = startOfZonedDay(group.day, calendar.timeZone)}
			{@const dayLabel = dayLabelFormatter.format(dayStart)}
			<div role="listitem">
				<details
					open
					data-event-calendar-part="agenda-day"
					data-day={group.day}
					data-count={group.entries.length}
					class={classes.agendaDay({ density, color, view: 'agenda', disabled })}
				>
					<summary
						aria-label={`${dayLabel}, ${messages.eventCalendarEventCount(group.entries.length)}`}
						aria-disabled={disabled}
						tabindex={disabled ? -1 : 0}
						data-event-calendar-agenda-date-gutter
						class="state-layer sticky top-[var(--event-calendar-sticky-offset)] z-20 flex min-h-10 cursor-pointer list-none items-center justify-between gap-4 bg-surface-raised/45 px-4 py-2 text-xs outline-none marker:content-none [--state-hover-opacity:0] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60 [&::-webkit-details-marker]:hidden"
						onclick={preventDisabledDisclosure}
						onkeydown={preventDisabledDisclosure}
						{@attach registerAgendaDay(group.day)}
					>
						<time datetime={group.day} class="contents" aria-hidden="true">
							<span class="min-w-0 truncate font-semibold text-neutral/90">
								{weekdayFormatter.format(dayStart)}
							</span>
							<span class="shrink-0 text-neutral/55 tabular-nums">
								{dateFormatter.format(dayStart)}
							</span>
						</time>
					</summary>

					<ol>
						{#each group.entries as entry (`${group.day}:${entry.occurrence.key}`)}
							<EventCalendarAgendaItem
								{entry}
								{a11y}
								{messages}
								{timeFormatter}
								{accessibleDateTimeFormatter}
								{zonedTimeFormatter}
								{accessibleDateFormatter}
								{density}
								{color}
								{classes}
								isSelected={selectedItemKey === entry.occurrence.key}
								{disabled}
								{item}
								{agendaDetails}
								onActivate={handleItemActivate}
								onDoubleClick={onItemDoubleClick}
							/>
						{/each}
					</ol>
				</details>
			</div>
		{/each}
	</div>
{/snippet}

{#if scrollMode === 'contained'}
	<ScrollArea class="h-full min-h-0" ariaLabel={profile.title}>
		{@render agendaContent()}
	</ScrollArea>
{:else}
	<div class="overflow-visible">
		{@render agendaContent()}
	</div>
{/if}
