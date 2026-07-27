<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { untrack, type Snippet } from 'svelte';
	import type { EventCalendarAgendaEntry } from './eventCalendar.agenda.js';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import {
		getEventCalendarItemColor,
		isEventCalendarSemanticColor
	} from './eventCalendar.color.js';
	import type {
		EventCalendarAgendaDetailsPayload,
		EventCalendarAgendaItemPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarOccurrence } from './eventCalendar.types.js';

	let {
		entry,
		a11y,
		messages,
		timeFormatter,
		accessibleDateTimeFormatter,
		zonedTimeFormatter,
		accessibleDateFormatter,
		density,
		color,
		classes,
		isSelected,
		disabled,
		agendaItem,
		agendaDetails,
		onActivate,
		onDoubleClick
	}: {
		entry: EventCalendarAgendaEntry<TItemFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		messages: Messages;
		timeFormatter: Intl.DateTimeFormat;
		accessibleDateTimeFormatter: Intl.DateTimeFormat;
		zonedTimeFormatter: Intl.DateTimeFormat;
		accessibleDateFormatter: Intl.DateTimeFormat;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		isSelected: boolean;
		disabled: boolean;
		agendaItem?: Snippet<[EventCalendarAgendaItemPayload<TItemFields>]>;
		agendaDetails?: Snippet<[EventCalendarAgendaDetailsPayload<TItemFields>]>;
		onActivate: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onDoubleClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
	} = $props();

	const occurrence = $derived(entry.occurrence);
	const semanticColor = $derived(
		isEventCalendarSemanticColor(occurrence.item.color) ? occurrence.item.color : color
	);
	const itemColor = $derived(getEventCalendarItemColor(occurrence, color));
	const timeLabel = $derived.by(() => {
		if (occurrence.allDay) return messages.eventCalendarAllDay;
		const startZone = getTimeZoneName(zonedTimeFormatter, entry.segment.start);
		const endZone = getTimeZoneName(zonedTimeFormatter, entry.segment.end);
		if (startZone === endZone) {
			return `${timeFormatter.format(entry.segment.start)} – ${timeFormatter.format(entry.segment.end)}`;
		}
		return `${zonedTimeFormatter.format(entry.segment.start)} – ${zonedTimeFormatter.format(entry.segment.end)}`;
	});
	const accessibleLabel = $derived.by(() => {
		const formatter = occurrence.allDay ? accessibleDateFormatter : accessibleDateTimeFormatter;
		const inclusiveEnd = occurrence.allDay
			? new Date(Math.max(occurrence.start.getTime(), occurrence.end.getTime() - 1))
			: occurrence.end;
		let rangeLabel: string;
		if (occurrence.start.getTime() === inclusiveEnd.getTime()) {
			rangeLabel = formatter.format(occurrence.start);
		} else if (occurrence.allDay) {
			rangeLabel = formatter.formatRange(occurrence.start, inclusiveEnd);
		} else {
			rangeLabel = `${formatter.format(occurrence.start)} – ${formatter.format(inclusiveEnd)}`;
		}
		return `${occurrence.item.title}, ${rangeLabel}`;
	});
	const itemPayload = $derived<EventCalendarAgendaItemPayload<TItemFields>>({
		occurrence,
		defaultContent
	});

	function preventDisabledDisclosure(event: Event): void {
		if (!disabled) return;
		if (event.type === 'keydown' && !['Enter', ' '].includes((event as KeyboardEvent).key)) return;
		event.preventDefault();
	}

	function getTimeZoneName(formatter: Intl.DateTimeFormat, instant: Date): string {
		return (
			formatter.formatToParts(instant).find((part) => part.type === 'timeZoneName')?.value ?? ''
		);
	}

	function registerItemControl(node: HTMLElement): () => void {
		return untrack(() => a11y.registerOccurrenceControl(occurrence.key, node));
	}
</script>

<li
	data-event-calendar-part="agenda-item"
	data-occurrence-key={occurrence.key}
	data-segment-key={entry.segment.key}
	data-selected={isSelected || undefined}
	data-color={semanticColor}
	style:--event-calendar-item-color={itemColor}
	class={classes.agendaItem({
		density,
		color: semanticColor,
		view: 'agenda',
		selected: isSelected,
		disabled
	})}
>
	<div class="flex min-w-0 items-start gap-1 p-1.5">
		<button
			type="button"
			aria-label={accessibleLabel}
			aria-pressed={isSelected}
			{disabled}
			data-event-calendar-agenda-control
			class={classes.itemControl({
				density,
				color: semanticColor,
				view: 'agenda',
				selected: isSelected,
				disabled,
				class: 'min-h-10 flex-1 px-2 py-1.5'
			})}
			onclick={(event) => onActivate(occurrence, event)}
			ondblclick={(event) => onDoubleClick?.(occurrence, event)}
			onfocus={() => a11y.handleOccurrenceFocus(occurrence.key, entry.segment.day)}
			{@attach registerItemControl}
		>
			<Slot render={agendaItem ?? defaultContent} payload={itemPayload} />
		</button>

		{#if agendaDetails}
			<details class="w-10 shrink-0 open:w-[min(20rem,70%)]" data-event-calendar-agenda-disclosure>
				<summary
					aria-label={messages.eventCalendarDetails(occurrence.item.title)}
					aria-disabled={disabled}
					tabindex={disabled ? -1 : 0}
					class="state-layer grid size-10 cursor-pointer list-none place-items-center rounded outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-color/60 [&::-webkit-details-marker]:hidden"
					onclick={preventDisabledDisclosure}
					onkeydown={preventDisabledDisclosure}
				>
					<span aria-hidden="true">•••</span>
				</summary>
				<div
					data-event-calendar-part="agenda-details"
					class={classes.agendaDetails({
						density,
						color: semanticColor,
						view: 'agenda',
						disabled,
						class: 'mt-1 border-t border-neutral-muted px-2 py-2'
					})}
				>
					<Slot
						render={agendaDetails}
						payload={{ occurrence } satisfies EventCalendarAgendaDetailsPayload<TItemFields>}
					/>
				</div>
			</details>
		{/if}
	</div>
</li>

{#snippet defaultContent()}
	<span class="flex min-w-0 items-baseline gap-2">
		<time
			datetime={entry.segment.start.toISOString()}
			class="w-28 shrink-0 text-xs text-neutral/75 tabular-nums"
		>
			{timeLabel}
		</time>
		<span class="min-w-0 truncate font-medium">{occurrence.item.title}</span>
	</span>
{/snippet}
