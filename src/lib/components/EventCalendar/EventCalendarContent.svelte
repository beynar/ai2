<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Empty from '$lib/components/Empty/Empty.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import EventCalendarAgendaView from './EventCalendarAgendaView.svelte';
	import EventCalendarMonthView from './EventCalendarMonthView.svelte';
	import EventCalendarResourceView from './EventCalendarResourceView.svelte';
	import EventCalendarTimeGrid from './EventCalendarTimeGrid.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import type {
		EventCalendarAgendaDetailsPayload,
		EventCalendarAgendaItemPayload,
		EventCalendarAllDayPayload,
		EventCalendarDayHeaderPayload,
		EventCalendarEmptyPayload,
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarMonthCellPayload,
		EventCalendarOverflowContentPayload,
		EventCalendarOverflowPayload,
		EventCalendarResourceHeaderPayload,
		EventCalendarSnapshot,
		EventCalendarViewPayload,
		EventCalendarTimeGutterPayload,
		EventCalendarNowIndicatorPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type {
		EventCalendarDateOnly,
		EventCalendarOccurrence,
		EventCalendarOffDaysConfig,
		EventCalendarSlot
	} from './eventCalendar.types.js';

	let {
		calendar,
		snapshot,
		a11y,
		messages,
		direction,
		density,
		color,
		loading,
		disabled,
		scrollMode,
		scrollbars,
		classes,
		nowIndicator,
		showWeekNumbers,
		maxItemsPerCell,
		offDays,
		showItemTooltip,
		monthCell,
		dayHeader,
		timeGutter,
		allDay,
		nowIndicatorContent,
		agendaItem,
		agendaDetails,
		resourceHeader,
		item,
		itemTooltip,
		overflow,
		overflowContent,
		empty,
		loadingContent,
		onItemClick,
		onItemDoubleClick,
		onSlotClick,
		onMoreClick
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y;
		messages: Messages;
		direction: 'ltr' | 'rtl';
		density: Density;
		color: Colors;
		loading: boolean;
		disabled: boolean;
		scrollMode: 'contained' | 'page';
		scrollbars: 'custom' | 'native';
		classes: EventCalendarClasses;
		nowIndicator: boolean;
		showWeekNumbers: boolean;
		maxItemsPerCell: number | 'auto';
		offDays: boolean | EventCalendarOffDaysConfig;
		showItemTooltip: boolean;
		monthCell?: Snippet<[EventCalendarMonthCellPayload<TItemFields>]>;
		dayHeader?: Snippet<[EventCalendarDayHeaderPayload]>;
		timeGutter?: Snippet<[EventCalendarTimeGutterPayload]>;
		allDay?: Snippet<[EventCalendarAllDayPayload<TItemFields>]>;
		nowIndicatorContent?: Snippet<[EventCalendarNowIndicatorPayload]>;
		agendaItem?: Snippet<[EventCalendarAgendaItemPayload<TItemFields>]>;
		agendaDetails?: Snippet<[EventCalendarAgendaDetailsPayload<TItemFields>]>;
		resourceHeader?: Snippet<[EventCalendarResourceHeaderPayload<TResourceFields>]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		overflow?: Snippet<[EventCalendarOverflowPayload<TItemFields>]>;
		overflowContent?: Snippet<[EventCalendarOverflowContentPayload<TItemFields>]>;
		empty?: Snippet<[EventCalendarEmptyPayload]>;
		loadingContent?: Snippet<[EventCalendarViewPayload]>;
		onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
		onSlotClick?: (slot: EventCalendarSlot, event: MouseEvent) => void;
		onMoreClick?: (
			day: EventCalendarDateOnly,
			occurrences: readonly EventCalendarOccurrence<TItemFields>[],
			event: MouseEvent
		) => false | void;
	} = $props();

	let timeGrid = $state<{ scrollToTime(dateOrMinutes: Date | number): boolean } | null>(null);

	export function scrollToTime(dateOrMinutes: Date | number): boolean {
		return timeGrid?.scrollToTime(dateOrMinutes) ?? false;
	}

	const viewPayload = $derived<EventCalendarViewPayload>({
		view: snapshot.view,
		visibleRange: snapshot.range.renderRange,
		visibleDays: snapshot.range.visibleDays
	});
	const hasProvableEmptyRange = $derived.by(() => {
		if (snapshot.view !== 'agenda') return calendar.itemIndex.occurrences.length === 0;
		return !snapshot.range.visibleDays.some(
			(day) => (calendar.itemIndex.segmentsByDay.get(day)?.foreground.length ?? 0) > 0
		);
	});
	const emptyMode = $derived(snapshot.view === 'agenda' ? 'agenda-replacement' : 'grid-status');
	const emptyPayload = $derived<EventCalendarEmptyPayload>({
		...viewPayload,
		mode: emptyMode
	});
</script>

<div
	data-event-calendar-part="content"
	data-view={snapshot.view}
	data-loading={loading || undefined}
	data-empty={hasProvableEmptyRange || undefined}
	aria-busy={loading}
	class={classes.content({
		density,
		color,
		view: snapshot.view,
		disabled,
		class: scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden'
	})}
>
	{#if snapshot.view === 'agenda' && hasProvableEmptyRange}
		<div
			role="status"
			aria-live="polite"
			aria-atomic="true"
			data-event-calendar-part="empty"
			data-empty-mode="agenda-replacement"
			inert={loading ? true : undefined}
			class={classes.empty({ density, color, view: snapshot.view, disabled })}
		>
			<Empty>
				<Slot render={empty ?? defaultEmpty} payload={emptyPayload} />
			</Empty>
		</div>
	{:else}
		<div
			data-event-calendar-part="viewport"
			data-view={snapshot.view}
			inert={loading ? true : undefined}
			class={classes.viewport({ density, color, view: snapshot.view, disabled })}
		>
			{#if snapshot.view === 'month'}
				<EventCalendarMonthView
					{calendar}
					{snapshot}
					{a11y}
					{messages}
					{direction}
					{density}
					{color}
					{classes}
					{disabled}
					{showWeekNumbers}
					{maxItemsPerCell}
					{offDays}
					{showItemTooltip}
					{monthCell}
					{dayHeader}
					{item}
					{itemTooltip}
					{overflow}
					{overflowContent}
					{onItemClick}
					{onItemDoubleClick}
					{onSlotClick}
					{onMoreClick}
				/>
			{:else if snapshot.view === 'week' || snapshot.view === 'day' || snapshot.view === 'days'}
				<EventCalendarTimeGrid
					bind:this={timeGrid}
					view={snapshot.view}
					{calendar}
					{snapshot}
					{a11y}
					{messages}
					{direction}
					{density}
					{color}
					{classes}
					{disabled}
					{offDays}
					{scrollMode}
					{scrollbars}
					{nowIndicator}
					{showItemTooltip}
					{dayHeader}
					{timeGutter}
					{allDay}
					{nowIndicatorContent}
					{item}
					{itemTooltip}
					{onItemClick}
					{onItemDoubleClick}
					{onSlotClick}
				/>
			{:else if snapshot.view === 'agenda'}
				<EventCalendarAgendaView
					{calendar}
					{snapshot}
					{messages}
					{density}
					{color}
					{disabled}
					{scrollMode}
					{scrollbars}
					{classes}
					{agendaItem}
					{agendaDetails}
					{onItemClick}
					{onItemDoubleClick}
				/>
			{:else if snapshot.view === 'resource'}
				<EventCalendarResourceView
					bind:this={timeGrid}
					{calendar}
					{snapshot}
					{a11y}
					{messages}
					{direction}
					{density}
					{color}
					{classes}
					{disabled}
					{offDays}
					{scrollMode}
					{scrollbars}
					{nowIndicator}
					{showItemTooltip}
					{timeGutter}
					{allDay}
					{resourceHeader}
					{nowIndicatorContent}
					{item}
					{itemTooltip}
					{onItemClick}
					{onItemDoubleClick}
					{onSlotClick}
				/>
			{/if}
		</div>
		{#if hasProvableEmptyRange}
			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				data-event-calendar-part="empty"
				data-empty-mode="grid-status"
				inert={loading ? true : undefined}
				class={classes.empty({ density, color, view: snapshot.view, disabled })}
			>
				<Slot render={empty ?? defaultEmpty} payload={emptyPayload} />
			</div>
		{/if}
	{/if}

	{#if loading}
		<div
			data-event-calendar-part="loading"
			class={classes.loading({ density, color, view: snapshot.view })}
		>
			<Slot render={loadingContent ?? defaultLoading} payload={viewPayload} />
		</div>
	{/if}
</div>

{#snippet defaultEmpty()}
	{messages.eventCalendarEmpty}
{/snippet}

{#snippet defaultLoading()}
	<Spinner
		{color}
		label={messages.eventCalendarLoading}
		text={messages.eventCalendarLoading}
		theme={{ label: { base: 'text-neutral/75' } }}
	/>
{/snippet}
