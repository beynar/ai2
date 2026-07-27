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
	import {
		createEventCalendarAgendaGroups,
		type EventCalendarAgendaEntry
	} from './eventCalendar.agenda.js';
	import { getEventCalendarItemColor } from './eventCalendar.color.js';
	import { getCachedDateTimeFormatter, startOfZonedDay } from './eventCalendar.date.js';
	import type {
		EventCalendarAgendaDetailsPayload,
		EventCalendarAgendaItemPayload,
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
		scrollbars,
		classes,
		agendaItem,
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
		scrollbars: 'custom' | 'native';
		classes: EventCalendarClasses;
		agendaItem?: Snippet<[EventCalendarAgendaItemPayload<TItemFields>]>;
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
	const dayFormatter = $derived(
		getCachedDateTimeFormatter(calendar.locale, calendar.timeZone, {
			weekday: 'long',
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

	function getSummaryColors(
		entries: readonly EventCalendarAgendaEntry<TItemFields>[]
	): readonly string[] {
		return [
			...new Set(entries.map((entry) => getEventCalendarItemColor(entry.occurrence, color)))
		].slice(0, 5);
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
			{@const dayLabel = dayFormatter.format(startOfZonedDay(group.day, calendar.timeZone))}
			{@const summaryColors = getSummaryColors(group.entries)}
			<div role="listitem">
				<details
					open
					data-event-calendar-part="agenda-day"
					data-day={group.day}
					data-count={group.entries.length}
					class={classes.agendaDay({ density, color, view: 'agenda', disabled })}
				>
					<summary
						aria-disabled={disabled}
						tabindex={disabled ? -1 : 0}
						data-event-calendar-agenda-date-gutter
						class="state-layer sticky top-[var(--event-calendar-sticky-offset)] z-20 flex min-h-11 cursor-pointer list-none items-center gap-3 bg-surface-raised px-3 py-2 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60 [&::-webkit-details-marker]:hidden"
						onclick={preventDisabledDisclosure}
						onkeydown={preventDisabledDisclosure}
						{@attach registerAgendaDay(group.day)}
					>
						<time datetime={group.day} class="min-w-0 flex-1 truncate font-semibold"
							>{dayLabel}</time
						>
						<span class="flex shrink-0 items-center -space-x-1" aria-hidden="true">
							{#each summaryColors as summaryColor (summaryColor)}
								<span
									class="size-2.5 rounded-full border border-surface-raised"
									style:background={summaryColor}
								></span>
							{/each}
						</span>
						<span
							class="shrink-0 rounded-full bg-neutral-muted px-2 py-0.5 text-xs font-medium tabular-nums"
						>
							<span aria-hidden="true">{group.entries.length}</span>
							<span class="sr-only">{messages.eventCalendarEventCount(group.entries.length)}</span>
						</span>
					</summary>

					<ol class="divide-y divide-neutral-muted">
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
								{agendaItem}
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

{#if scrollMode === 'contained' && scrollbars === 'custom'}
	<ScrollArea class="h-full min-h-0" ariaLabel={profile.title}>
		{@render agendaContent()}
	</ScrollArea>
{:else}
	<div class={scrollMode === 'contained' ? 'h-full min-h-0 overflow-auto' : 'overflow-visible'}>
		{@render agendaContent()}
	</div>
{/if}
