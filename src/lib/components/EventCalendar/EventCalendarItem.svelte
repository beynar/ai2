<script lang="ts" generics="TItemFields extends object = Record<never, never>">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import { getCachedDateTimeFormatter } from './eventCalendar.date.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarSegment, EventCalendarView } from './eventCalendar.types.js';

	const SEMANTIC_COLORS: ReadonlySet<string> = new Set<Colors>([
		'primary',
		'secondary',
		'danger',
		'success',
		'warning',
		'info',
		'neutral'
	]);

	function isSemanticColor(value: string | undefined): value is Colors {
		return value !== undefined && SEMANTIC_COLORS.has(value);
	}

	let {
		segment,
		view,
		locale,
		timeZone,
		density,
		color,
		classes,
		isSelected,
		isDragging = false,
		disabled = false,
		showItemTooltip = false,
		item,
		itemTooltip,
		resizeStart,
		resizeEnd,
		actionTrigger,
		onActivate,
		onDoubleClick
	}: {
		segment: EventCalendarSegment<TItemFields>;
		view: EventCalendarView;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		classes: EventCalendarClasses;
		isSelected: boolean;
		isDragging?: boolean;
		disabled?: boolean;
		showItemTooltip?: boolean;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		resizeStart?: Snippet;
		resizeEnd?: Snippet;
		actionTrigger?: Snippet;
		onActivate: (event: MouseEvent) => void;
		onDoubleClick?: (event: MouseEvent) => void;
	} = $props();

	const occurrence = $derived(segment.occurrence);
	const semanticColor = $derived(
		isSemanticColor(occurrence.item.color) ? occurrence.item.color : color
	);
	const itemColor = $derived(
		occurrence.item.color && !isSemanticColor(occurrence.item.color)
			? occurrence.item.color
			: 'var(--color)'
	);
	const timeFormatter = $derived(
		getCachedDateTimeFormatter(locale, timeZone, { hour: 'numeric', minute: '2-digit' })
	);
	const dateTimeFormatter = $derived(
		getCachedDateTimeFormatter(locale, timeZone, {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	const dateFormatter = $derived(
		getCachedDateTimeFormatter(locale, timeZone, { month: 'short', day: 'numeric' })
	);
	const timeLabel = $derived(timeFormatter.format(segment.start));
	const defaultAccessibleLabel = $derived.by(() => {
		const formatter = occurrence.allDay ? dateFormatter : dateTimeFormatter;
		const inclusiveEnd = occurrence.allDay
			? new Date(Math.max(occurrence.start.getTime(), occurrence.end.getTime() - 1))
			: occurrence.end;
		const rangeLabel =
			occurrence.start.getTime() === inclusiveEnd.getTime()
				? formatter.format(occurrence.start)
				: formatter.formatRange(occurrence.start, inclusiveEnd);
		return `${occurrence.item.title}, ${rangeLabel}`;
	});
	const itemPayload = $derived<EventCalendarItemPayload<TItemFields>>({
		occurrence,
		segment,
		view,
		isSelected,
		isDragging,
		defaultContent
	});
	const tooltipPayload = $derived<EventCalendarItemTooltipPayload<TItemFields>>({
		occurrence,
		segment,
		view,
		defaultAccessibleLabel
	});
	const itemTooltipAttachment = tooltip({
		get content() {
			return resolvedTooltip;
		},
		position: 'top',
		delay: 350
	});
</script>

<div
	data-event-calendar-part="item"
	data-occurrence-key={occurrence.key}
	data-segment-key={segment.key}
	data-display="auto"
	data-selected={isSelected || undefined}
	data-dragging={isDragging || undefined}
	data-start={segment.isStart || undefined}
	data-end={segment.isEnd || undefined}
	data-continues-before={segment.continuesBefore || undefined}
	data-continues-after={segment.continuesAfter || undefined}
	data-color={semanticColor}
	style:--event-calendar-item-color={itemColor}
	class={classes.item({
		density,
		color: semanticColor,
		view,
		selected: isSelected,
		dragging: isDragging,
		disabled,
		display: 'auto',
		isStart: segment.isStart,
		isEnd: segment.isEnd,
		continuesBefore: segment.continuesBefore,
		continuesAfter: segment.continuesAfter
	})}
>
	{#if resizeStart}
		<div data-event-calendar-part="resize-handle" data-edge="start" class={classes.resizeHandle()}>
			<Slot render={resizeStart} />
		</div>
	{/if}
	<button
		type="button"
		aria-label={defaultAccessibleLabel}
		aria-pressed={isSelected}
		{disabled}
		class={classes.itemControl({
			density,
			color: semanticColor,
			view,
			selected: isSelected,
			dragging: isDragging,
			disabled
		})}
		onclick={(event) => {
			event.stopPropagation();
			onActivate(event);
		}}
		ondblclick={(event) => {
			event.stopPropagation();
			onDoubleClick?.(event);
		}}
		{@attach showItemTooltip ? itemTooltipAttachment : null}
	>
		<Slot render={item ?? defaultContent} payload={itemPayload} />
	</button>
	{#if resizeEnd}
		<div data-event-calendar-part="resize-handle" data-edge="end" class={classes.resizeHandle()}>
			<Slot render={resizeEnd} />
		</div>
	{/if}
	{#if actionTrigger}
		<div data-event-calendar-part="action-trigger" class={classes.actionTrigger()}>
			<Slot render={actionTrigger} />
		</div>
	{/if}
</div>

{#snippet defaultContent()}
	<span class={classes.itemContent({ density, color: semanticColor, view })}>
		{#if !occurrence.allDay && segment.isStart}
			<span class={classes.itemTime({ density, color: semanticColor, view })}>{timeLabel}</span>
		{/if}
		<span class={classes.itemTitle({ density, color: semanticColor, view })}>
			{occurrence.item.title}
		</span>
	</span>
{/snippet}

{#snippet defaultTooltip()}
	{defaultAccessibleLabel}
{/snippet}

{#snippet resolvedTooltip()}
	<Slot render={itemTooltip ?? defaultTooltip} payload={tooltipPayload} />
{/snippet}
