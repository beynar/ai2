<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import EventCalendarCompositionDemo from './EventCalendarCompositionDemo.svelte';
	import EventCalendarGuide from './EventCalendarGuide.svelte';
	import EventCalendarInteractionsDemo from './EventCalendarInteractionsDemo.svelte';
	import EventCalendarLoadingRtlDemo from './EventCalendarLoadingRtlDemo.svelte';
	import EventCalendarResourcesDemo from './EventCalendarResourcesDemo.svelte';
	import EventCalendarViewsDemo from './EventCalendarViewsDemo.svelte';
	import {
		compositionCode,
		interactionCode,
		loadingRtlCode,
		resourcesCode,
		viewsCode
	} from './codeSnippets.js';
</script>

<DocPage
	title="Event calendar"
	subtitle="A complete scheduling surface with typed recurrence, resources, immutable transactions, and accessible pointer or keyboard interaction."
	component="EventCalendar"
	features={[
		'Month, week, day, N-day, agenda, resource-day, and virtualized timeline views',
		'Timed, all-day, multi-day, background, and recurring items',
		'Move, resize, range creation, keyboard, touch, and two-click selection',
		'Explicit IANA time zones with DST-safe civil-day math',
		'Typed snippets, resources, callbacks, and imperative API',
		'Multi-resource assignment, per-resource constraints, copy/paste, and undo/redo',
		'Consumer-owned loading and persistence with guarded revert'
	]}
>
	<EventCalendarGuide />

	<ComponentCard
		title="One model, seven views"
		description="Use the built-in switcher to inspect the same timed, all-day, background, multi-day, recurring, and resource-assigned definitions in every view."
		code={viewsCode}
		class="min-h-0 items-stretch p-3 md:p-5"
	>
		<EventCalendarViewsDemo />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Validation and reversible mutations"
			description="Drag an item or focus it and press M, S, or E. Use Mod+C/Mod+V to duplicate the selected occurrence and Mod+Z/Mod+Shift+Z for bounded history. Drag across empty slots to select a create range."
			code={interactionCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<EventCalendarInteractionsDemo />
		</ComponentCard>

		<ComponentCard
			title="Owned semantics, custom content"
			description="Header and cell snippets compose ready-made defaults; item content stays inside the calendar-owned activation button and retains interaction and accessibility behavior."
			code={compositionCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<EventCalendarCompositionDemo />
		</ComponentCard>

		<ComponentCard
			title="Virtual resource timeline"
			description="Virtual leaf rows share a horizontal time axis. Multi-assigned events project into every row; local hours and read-only resources reuse the same mutation validator. Switch to resource-day to compare the vertical projection."
			code={resourcesCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<EventCalendarResourcesDemo />
		</ComponentCard>

		<ComponentCard
			title="Consumer loading, RTL, and a non-hour zone"
			description="The range callback exposes the exact fetch envelope. Loading keeps navigation available, RTL mirrors physical controls without reversing time, and Asia/Kathmandu exercises a 45-minute offset."
			code={loadingRtlCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<EventCalendarLoadingRtlDemo />
		</ComponentCard>
	{/snippet}
</DocPage>
