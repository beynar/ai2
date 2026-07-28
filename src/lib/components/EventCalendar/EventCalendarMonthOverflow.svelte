<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Popover from '$lib/components/Popover/Popover.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import EventCalendarItem from './EventCalendarItem.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarOverflowContentPayload,
		EventCalendarOverflowPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarInteractionsController } from './eventCalendar.interactions.svelte.js';
	import type {
		EventCalendarDateOnly,
		EventCalendarOccurrence,
		EventCalendarSegment
	} from './eventCalendar.types.js';

	let {
		day,
		dayLabel,
		hiddenSegments,
		messages,
		a11y,
		locale,
		timeZone,
		density,
		color,
		classes,
		interaction,
		disabled,
		selectionKey,
		showItemTooltip,
		overflow,
		overflowContent,
		item,
		itemTooltip,
		onMoreClick,
		onItemActivate,
		onItemDoubleClick
	}: {
		day: EventCalendarDateOnly;
		dayLabel: string;
		hiddenSegments: readonly EventCalendarSegment<TItemFields>[];
		messages: Messages;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		interaction: EventCalendarInteractionsController<TItemFields, TResourceFields>;
		disabled: boolean;
		selectionKey: string | null;
		showItemTooltip: boolean;
		overflow?: Snippet<[EventCalendarOverflowPayload<TItemFields>]>;
		overflowContent?: Snippet<[EventCalendarOverflowContentPayload<TItemFields>]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		onMoreClick?: (
			day: EventCalendarDateOnly,
			occurrences: readonly EventCalendarOccurrence<TItemFields>[],
			event: MouseEvent
		) => false | void;
		onItemActivate: (segment: EventCalendarSegment<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick: (segment: EventCalendarSegment<TItemFields>, event: MouseEvent) => void;
	} = $props();

	let triggerElement = $state<HTMLButtonElement | null>(null);
	const hiddenOccurrences = $derived(hiddenSegments.map((segment) => segment.occurrence));
	const overflowPayload = $derived<EventCalendarOverflowPayload<TItemFields>>({
		day,
		hiddenOccurrences,
		count: hiddenOccurrences.length,
		defaultContent
	});
</script>

<Popover
	position="bottom-start"
	lockScroll={false}
	openOnClick={false}
	class={classes.overflowPopover({ density, color, view: 'month' })}
	onClose={() => triggerElement?.focus()}
>
	{#snippet trigger(popoverState)}
		<button
			type="button"
			bind:this={triggerElement}
			aria-label={`${messages.eventCalendarMore(hiddenOccurrences.length)}, ${dayLabel}`}
			aria-haspopup="dialog"
			aria-expanded={popoverState.isOpen}
			{disabled}
			data-event-calendar-part="overflow"
			class={classes.overflow({ density, color, view: 'month', disabled })}
			onpointerdown={(event) => event.stopPropagation()}
			onclick={(event) => {
				event.stopPropagation();
				if (onMoreClick?.(day, hiddenOccurrences, event) === false) return;
				popoverState.toggle();
			}}
			{@attach popoverState.reference}
		>
			<Slot render={overflow ?? defaultContent} payload={overflowPayload} />
		</button>
	{/snippet}

	{#snippet children(popoverState)}
		{@const contentPayload = {
			day,
			hiddenOccurrences,
			close: () => popoverState.close(),
			defaultContent: defaultPopoverContent
		} satisfies EventCalendarOverflowContentPayload<TItemFields>}
		<Slot render={overflowContent ?? contentPayload.defaultContent} payload={contentPayload} />
	{/snippet}
</Popover>

{#snippet defaultContent()}
	{messages.eventCalendarMore(hiddenOccurrences.length)}
{/snippet}

{#snippet defaultPopoverContent()}
	<div data-event-calendar-overflow-content class="grid gap-1" aria-label={dayLabel}>
		<div class="mb-1 font-medium">{dayLabel}</div>
		{#each hiddenSegments as segment (segment.occurrence.key)}
			<EventCalendarItem
				{segment}
				{a11y}
				view="month"
				{locale}
				{timeZone}
				{density}
				{color}
				{classes}
				{interaction}
				isDragging={interaction.isDragging(segment.occurrence.key)}
				allowResize={false}
				isSelected={selectionKey === segment.occurrence.key}
				{disabled}
				{showItemTooltip}
				{item}
				{itemTooltip}
				onActivate={(event) => onItemActivate(segment, event)}
				onDoubleClick={(event) => onItemDoubleClick(segment, event)}
			/>
		{/each}
	</div>
{/snippet}
