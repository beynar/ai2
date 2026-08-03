<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Empty from '$lib/components/Empty/Empty.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { onMount } from 'svelte';
	import EventCalendarAgendaView from './EventCalendarAgendaView.svelte';
	import EventCalendarMonthView from './EventCalendarMonthView.svelte';
	import EventCalendarTimeGrid from './EventCalendarTimeGrid.svelte';
	import type {
		EventCalendarEmptyPayload,
		EventCalendarLoadingPayload,
		EventCalendarViewPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';

	let {
		calendar
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
	} = $props();

	let timeGrid = $state<{ scrollToTime(dateOrMinutes: Date | number): boolean } | null>(null);
	const navigation = {
		scrollToTime(dateOrMinutes: Date | number): boolean {
			return timeGrid?.scrollToTime(dateOrMinutes) ?? false;
		}
	};
	const snapshot = $derived(calendar.snapshot);

	onMount(() => calendar.connectContentNavigation(navigation));

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
		mode: emptyMode,
		defaultContent: defaultEmpty
	});
	const loadingPayload = $derived<EventCalendarLoadingPayload>({
		...viewPayload,
		defaultContent: defaultLoading
	});
</script>

<div
	data-event-calendar-part="content"
	data-view={snapshot.view}
	data-loading={calendar.loading || undefined}
	data-empty={hasProvableEmptyRange || undefined}
	aria-busy={calendar.loading}
	class={calendar.classes.content({
		density: calendar.density,
		view: snapshot.view,
		disabled: calendar.disabled,
		class: calendar.scrollMode === 'page' ? 'overflow-visible' : 'overflow-hidden'
	})}
>
	{#if snapshot.view === 'agenda' && hasProvableEmptyRange}
		<div
			role="status"
			aria-live="polite"
			aria-atomic="true"
			data-event-calendar-part="empty"
			data-empty-mode="agenda-replacement"
			inert={calendar.loading ? true : undefined}
			class={calendar.classes.empty({
				density: calendar.density,
				view: snapshot.view,
				disabled: calendar.disabled
			})}
		>
			<Empty>
				<Slot
					render={calendar.renderers.empty ?? emptyPayload.defaultContent}
					payload={emptyPayload}
				/>
			</Empty>
		</div>
	{:else}
		<div
			data-event-calendar-part="viewport"
			data-view={snapshot.view}
			inert={calendar.loading ? true : undefined}
			class={calendar.classes.viewport({
				density: calendar.density,
				view: snapshot.view,
				disabled: calendar.disabled
			})}
		>
			{#if snapshot.view === 'month'}
				<EventCalendarMonthView {calendar} />
			{:else if snapshot.view === 'week' || snapshot.view === 'day' || snapshot.view === 'days'}
				<EventCalendarTimeGrid bind:this={timeGrid} view={snapshot.view} {calendar} />
			{:else if snapshot.view === 'agenda'}
				<EventCalendarAgendaView {calendar} />
			{:else if snapshot.view === 'resource'}
				<EventCalendarTimeGrid bind:this={timeGrid} view="resource" {calendar} />
			{/if}
		</div>
		{#if hasProvableEmptyRange}
			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				data-event-calendar-part="empty"
				data-empty-mode="grid-status"
				inert={calendar.loading ? true : undefined}
				class={calendar.classes.empty({
					density: calendar.density,
					view: snapshot.view,
					disabled: calendar.disabled
				})}
			>
				<Slot
					render={calendar.renderers.empty ?? emptyPayload.defaultContent}
					payload={emptyPayload}
				/>
			</div>
		{/if}
	{/if}

	{#if calendar.loading}
		<div
			data-event-calendar-part="loading"
			class={calendar.classes.loading({ density: calendar.density, view: snapshot.view })}
		>
			<Slot
				render={calendar.renderers.loadingContent ?? loadingPayload.defaultContent}
				payload={loadingPayload}
			/>
		</div>
	{/if}
</div>

{#snippet defaultEmpty()}
	{calendar.messages.eventCalendarEmpty}
{/snippet}

{#snippet defaultLoading()}
	<Spinner
		label={calendar.messages.eventCalendarLoading}
		text={calendar.messages.eventCalendarLoading}
		theme={{ label: { base: 'text-neutral/75' } }}
	/>
{/snippet}
