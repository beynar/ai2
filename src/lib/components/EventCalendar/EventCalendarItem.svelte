<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { useResizeObserver } from '$lib/utils/useResizeObserver.svelte.js';
	import { untrack, type Snippet } from 'svelte';
	import { isEventCalendarSemanticColor } from './eventCalendar.color.js';
	import { getCachedDateTimeFormatter } from './eventCalendar.date.js';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import type {
		EventCalendarItemPayload,
		EventCalendarItemTooltipPayload
	} from './eventCalendar.props.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarInteractionsController } from './eventCalendar.interactions.svelte.js';
	import type { EventCalendarSegment, EventCalendarView } from './eventCalendar.types.js';

	let {
		segment,
		view,
		locale,
		timeZone,
		density,
		color,
		classes,
		a11y,
		interaction,
		isSelected,
		isDragging = false,
		allowResize = true,
		disabled = false,
		showItemTooltip = false,
		item,
		itemTooltip,
		class: className,
		compactContent = false,
		tabindex,
		registerControl,
		onControlFocus,
		onControlKeydown,
		resizeStart,
		resizeEnd,
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
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		interaction?: EventCalendarInteractionsController<TItemFields, TResourceFields>;
		isSelected: boolean;
		isDragging?: boolean;
		allowResize?: boolean;
		disabled?: boolean;
		showItemTooltip?: boolean;
		item?: Snippet<[EventCalendarItemPayload<TItemFields>]>;
		itemTooltip?: Snippet<[EventCalendarItemTooltipPayload<TItemFields>]>;
		class?: string;
		compactContent?: boolean;
		tabindex?: 0 | -1;
		registerControl?: (node: HTMLElement) => () => void;
		onControlFocus?: () => void;
		onControlKeydown?: (event: KeyboardEvent) => void;
		resizeStart?: Snippet;
		resizeEnd?: Snippet;
		onActivate: (event: MouseEvent) => void;
		onDoubleClick?: (event: MouseEvent) => void;
	} = $props();

	let isCompact = $state(false);
	const contentResizeObserver = useResizeObserver({
		isActive: () => compactContent,
		callback: (entry) => {
			const nextCompact = entry.contentRect.height < 44;
			if (isCompact !== nextCompact) isCompact = nextCompact;
		}
	});
	$effect(() => {
		if (!compactContent) isCompact = false;
	});

	const occurrence = $derived(segment.occurrence);
	const semanticColor = $derived(
		isEventCalendarSemanticColor(occurrence.item.color) ? occurrence.item.color : color
	);
	const itemColor = $derived(
		occurrence.item.color && !isEventCalendarSemanticColor(occurrence.item.color)
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
	const isTimedGridItem = $derived(!occurrence.allDay && view !== 'month' && view !== 'agenda');
	const timeRangeLabel = $derived.by(() => {
		const proposal = interaction?.proposal;
		if (
			proposal?.occurrence?.key === occurrence.key &&
			(proposal.kind === 'resize-start' || proposal.kind === 'resize-end') &&
			proposal.item.allDay !== true
		) {
			return timeFormatter.formatRange(proposal.item.start, proposal.item.end);
		}
		return timeFormatter.formatRange(segment.start, segment.end);
	});
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
	const canMove = $derived(Boolean(interaction?.canMove(occurrence)) && !disabled);
	const canResize = $derived(
		allowResize && Boolean(interaction?.canResize(occurrence)) && !disabled
	);
	const isHorizontalResize = $derived(view === 'month' || occurrence.allDay);
	const hasKeyboardActions = $derived(
		Boolean(
			interaction &&
			(['move', 'resize-start', 'resize-end'] as const).some(
				(operation) =>
					(operation === 'move' || allowResize) &&
					interaction.canBeginAssistedItem(occurrence, operation, 'keyboard')
			)
		)
	);

	function registerItemControl(node: HTMLElement): () => void {
		return untrack(() => {
			const unregisterOccurrence = a11y.registerOccurrenceControl(occurrence.key, node);
			const unregisterTarget = registerControl?.(node);
			return () => {
				unregisterOccurrence();
				unregisterTarget?.();
			};
		});
	}
</script>

<div
	data-event-calendar-part="item"
	data-occurrence-key={occurrence.key}
	data-segment-key={segment.key}
	data-display="auto"
	data-selected={isSelected || undefined}
	data-dragging={isDragging || undefined}
	data-compact={isCompact || undefined}
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
		continuesAfter: segment.continuesAfter,
		class: className
	})}
	{@attach canMove && interaction ? interaction.draggableItem(segment, 'move') : null}
	{@attach compactContent ? contentResizeObserver.reference : null}
>
	{#if canResize && interaction && segment.isStart}
		<div
			aria-hidden="true"
			data-event-calendar-part="resize-handle"
			data-edge="start"
			class={classes.resizeHandle({
				class: isHorizontalResize
					? 'inset-y-0 start-0 grid w-1.5 cursor-ew-resize place-items-center'
					: 'inset-x-0 top-0 grid h-1.5 -translate-y-1/2 cursor-ns-resize place-items-center'
			})}
			{@attach interaction.draggableItem(segment, 'resize-start')}
		>
			{#if resizeStart}
				<Slot render={resizeStart} />
			{:else}
				<span
					class={isHorizontalResize
						? 'pointer-events-none h-3 w-0.5 rounded-full bg-current'
						: 'pointer-events-none h-0.5 w-5 rounded-full bg-current'}
				></span>
			{/if}
		</div>
	{/if}
	<button
		type="button"
		aria-label={defaultAccessibleLabel}
		aria-describedby={hasKeyboardActions ? `${a11y.liveRegionId}-instructions` : undefined}
		aria-pressed={isSelected}
		{disabled}
		{tabindex}
		class={classes.itemControl({
			density,
			color: semanticColor,
			view,
			selected: isSelected,
			dragging: isDragging,
			disabled,
			class: isTimedGridItem ? (isCompact ? 'px-1.5 py-0' : 'px-2 py-1.5') : undefined
		})}
		onclick={(event) => {
			event.stopPropagation();
			if (interaction?.activateAssistedPoint(event.clientX, event.clientY)) return;
			if (interaction?.shouldSuppressClick(occurrence.key)) return;
			onActivate(event);
		}}
		ondblclick={(event) => {
			event.stopPropagation();
			onDoubleClick?.(event);
		}}
		onfocus={() => {
			a11y.handleOccurrenceFocus(occurrence.key, segment.day);
			onControlFocus?.();
		}}
		onkeydown={(event) => {
			if (a11y.handleItemKeydown(event, occurrence, allowResize)) return;
			onControlKeydown?.(event);
		}}
		{@attach registerItemControl}
		{@attach showItemTooltip ? itemTooltipAttachment : null}
	>
		<Slot render={item ?? defaultContent} payload={itemPayload} />
	</button>
	{#if canResize && interaction && segment.isEnd}
		<div
			aria-hidden="true"
			data-event-calendar-part="resize-handle"
			data-edge="end"
			class={classes.resizeHandle({
				class: isHorizontalResize
					? 'inset-y-0 end-0 grid w-1.5 cursor-ew-resize place-items-center'
					: 'inset-x-0 bottom-0 grid h-1.5 translate-y-1/2 cursor-ns-resize place-items-center'
			})}
			{@attach interaction.draggableItem(segment, 'resize-end')}
		>
			{#if resizeEnd}
				<Slot render={resizeEnd} />
			{:else}
				<span
					class={isHorizontalResize
						? 'pointer-events-none h-3 w-0.5 rounded-full bg-current'
						: 'pointer-events-none h-0.5 w-5 rounded-full bg-current'}
				></span>
			{/if}
		</div>
	{/if}
</div>

{#snippet defaultContent()}
	<span
		class={classes.itemContent({
			density,
			color: semanticColor,
			view,
			class: isTimedGridItem ? 'flex-col items-start justify-start gap-0.5' : undefined
		})}
	>
		{#if isTimedGridItem}
			<span class={classes.itemTitle({ density, color: semanticColor, view })}>
				{occurrence.item.title}
			</span>
			{#if !isCompact}
				<span
					class={classes.itemTime({
						density,
						color: semanticColor,
						view,
						class: 'ms-0'
					})}>{timeRangeLabel}</span
				>
			{/if}
		{:else}
			{#if view === 'month'}
				<span
					aria-hidden="true"
					class="size-1.5 shrink-0 rounded-full bg-[var(--event-calendar-item-color)]"
				></span>
			{/if}
			<span class={classes.itemTitle({ density, color: semanticColor, view })}>
				{occurrence.item.title}
			</span>
			{#if view === 'month' && !isCompact && !occurrence.allDay && segment.isStart}
				<span class={classes.itemTime({ density, color: semanticColor, view })}>{timeLabel}</span>
			{/if}
		{/if}
	</span>
{/snippet}

{#snippet defaultTooltip()}
	{defaultAccessibleLabel}
{/snippet}

{#snippet resolvedTooltip()}
	<Slot render={itemTooltip ?? defaultTooltip} payload={tooltipPayload} />
{/snippet}
