<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import EventCalendarTimeGrid from './EventCalendarTimeGrid.svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import type {
		EventCalendarAllDayPayload,
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload,
		EventCalendarNowIndicatorPayload,
		EventCalendarResourceHeaderPayload,
		EventCalendarSnapshot,
		EventCalendarTimeGutterPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type {
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
		classes,
		disabled,
		offDays,
		scrollMode,
		scrollbars,
		nowIndicator,
		showItemTooltip,
		timeGutter,
		allDay,
		resourceHeader,
		nowIndicatorContent,
		item,
		itemTooltip,
		onItemClick,
		onItemDoubleClick,
		onSlotClick
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		a11y: EventCalendarA11y;
		messages: Messages;
		direction: 'ltr' | 'rtl';
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		disabled: boolean;
		offDays: boolean | EventCalendarOffDaysConfig;
		scrollMode: 'contained' | 'page';
		scrollbars: 'custom' | 'native';
		nowIndicator: boolean;
		showItemTooltip: boolean;
		timeGutter?: Snippet<[EventCalendarTimeGutterPayload]>;
		allDay?: Snippet<[EventCalendarAllDayPayload<TItemFields>]>;
		resourceHeader?: Snippet<[EventCalendarResourceHeaderPayload<TResourceFields>]>;
		nowIndicatorContent?: Snippet<[EventCalendarNowIndicatorPayload]>;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		onItemClick?: (occurrence: EventCalendarOccurrence<TItemFields>, event: MouseEvent) => void;
		onItemDoubleClick?: (
			occurrence: EventCalendarOccurrence<TItemFields>,
			event: MouseEvent
		) => void;
		onSlotClick?: (slot: EventCalendarSlot, event: MouseEvent) => void;
	} = $props();

	let timeGrid = $state<{ scrollToTime(dateOrMinutes: Date | number): boolean } | null>(null);

	export function scrollToTime(dateOrMinutes: Date | number): boolean {
		return timeGrid?.scrollToTime(dateOrMinutes) ?? false;
	}
</script>

<EventCalendarTimeGrid
	bind:this={timeGrid}
	view="resource"
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
	resourceModel={calendar.resourceModel}
	unassignedResourceLabel={messages.eventCalendarUnassignedResource}
	{nowIndicatorContent}
	{item}
	{itemTooltip}
	{onItemClick}
	{onItemDoubleClick}
	{onSlotClick}
/>
