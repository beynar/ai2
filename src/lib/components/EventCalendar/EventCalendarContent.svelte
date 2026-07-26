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
	import type {
		EventCalendarEmptyPayload,
		EventCalendarSnapshot,
		EventCalendarViewPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';

	let {
		snapshot,
		messages,
		density,
		color,
		loading,
		disabled,
		scrollMode,
		classes,
		empty,
		loadingContent
	}: {
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		messages: Messages;
		density: Density;
		color: Colors;
		loading: boolean;
		disabled: boolean;
		scrollMode: 'contained' | 'page';
		classes: EventCalendarClasses;
		empty?: Snippet<[EventCalendarEmptyPayload]>;
		loadingContent?: Snippet<[EventCalendarViewPayload]>;
	} = $props();

	const viewPayload = $derived<EventCalendarViewPayload>({
		view: snapshot.view,
		visibleRange: snapshot.range.renderRange,
		visibleDays: snapshot.range.visibleDays
	});
	// Until Phase 3 owns the occurrence index, only an empty source collection proves an empty range.
	const hasProvableEmptyRange = $derived(snapshot.items.length === 0);
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
		></div>
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
	<Spinner {color} label={messages.eventCalendarLoading} text={messages.eventCalendarLoading} />
{/snippet}
