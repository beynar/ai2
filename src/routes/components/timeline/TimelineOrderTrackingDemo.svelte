<script lang="ts">
	import {
		Timeline,
		type TimelineItem,
		type TimelineItemPayload,
		type TimelineOrientation,
		type TimelinePlacement,
		type TimelineVariant
	} from '$lib/components/Timeline/index.js';
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { packageIcon } from '$lib/components/Icons/package.js';
	import type { Density, Sizes } from '$lib/types/theme.js';

	let {
		orientation = 'vertical',
		placement = 'end',
		variant = 'ghost',
		size = 'large',
		density = 'large',
		loading = false
	}: {
		orientation?: TimelineOrientation;
		placement?: TimelinePlacement;
		variant?: TimelineVariant;
		size?: Sizes;
		density?: Density;
		loading?: boolean;
	} = $props();

	type OrderEvent = TimelineItem & {
		time: string;
		status: 'complete' | 'current' | 'upcoming';
	};

	const orderEvents: OrderEvent[] = [
		{
			id: 'placed',
			title: 'Your order has been placed.',
			date: '22 July, 2026',
			datetime: '2026-07-22',
			time: '3:00 PM',
			status: 'complete',
			icon: checkIcon,
			color: 'success',
			connectorColor: 'success'
		},
		{
			id: 'verified',
			title: 'Your order is verified.',
			date: '23 July, 2026',
			datetime: '2026-07-23',
			time: '7:32 PM',
			status: 'complete',
			icon: checkIcon,
			color: 'success',
			connectorColor: 'success'
		},
		{
			id: 'packed',
			title: 'Packed and ready for dispatch.',
			date: '24 July, 2026',
			datetime: '2026-07-24',
			time: '5:32 PM',
			status: 'current',
			icon: packageIcon,
			color: 'primary'
		},
		{
			id: 'transit',
			title: 'Courier is en route with your package.',
			date: '25 July, 2026',
			datetime: '2026-07-25',
			time: '2:00 PM',
			status: 'upcoming'
		},
		{
			id: 'delivery',
			title: 'Expected delivery to your address.',
			date: '28 July, 2026',
			datetime: '2026-07-28',
			time: '5:00 PM',
			status: 'upcoming'
		}
	];

	const timelineItems = $derived(
		orderEvents.map((orderEvent) =>
			orderEvent.status === 'current' ? { ...orderEvent, loading } : orderEvent
		)
	);
	const eventTimeSizeClass = $derived(
		{
			small: 'text-[0.6875rem]',
			normal: 'text-[0.8125rem]',
			large: 'text-[0.9375rem]'
		}[size]
	);
</script>

{#snippet eventTime(item: OrderEvent, isDateRow: boolean)}
	<time
		class:opacity-55={item.status === 'upcoming'}
		class:col-start-2={isDateRow}
		class:row-start-1={isDateRow}
		class:justify-self-end={isDateRow}
		class="{eventTimeSizeClass} whitespace-nowrap tabular-nums {variant === 'soft'
			? 'text-color-muted-readable/70'
			: 'text-neutral/60'}"
	>
		{item.time}
	</time>
{/snippet}

{#snippet orderItem({ item, defaultContent }: TimelineItemPayload<OrderEvent>)}
	<div class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4">
		<div
			class:col-span-2={orientation === 'horizontal' && placement !== 'alternate'}
			class:opacity-55={item.status === 'upcoming'}
			class="min-w-0"
		>
			{@render defaultContent()}
		</div>
		{#if orientation !== 'horizontal' || placement !== 'alternate'}
			{@render eventTime(item, orientation === 'horizontal')}
		{/if}
	</div>
{/snippet}

{#snippet orderMarker({ item, color, defaultMarker }: TimelineItemPayload<OrderEvent>)}
	{#if item.status === 'current'}
		<span
			data-color={color}
			class="relative z-10 grid size-[var(--timeline-marker-size)] shrink-0 place-items-center rounded-full bg-color text-color-contrast shadow-[0_0_0_4px_var(--color-surface)] [&>svg]:size-[58%]"
		>
			{@render packageIcon()}
		</span>
	{:else}
		{@render defaultMarker()}
	{/if}
{/snippet}

{#snippet orderOpposite({ item, defaultOpposite }: TimelineItemPayload<OrderEvent>)}
	{#if orientation === 'horizontal'}
		<div class="flex items-baseline gap-2 whitespace-nowrap">
			{@render defaultOpposite()}
			{@render eventTime(item, false)}
		</div>
	{:else}
		{@render defaultOpposite()}
	{/if}
{/snippet}

<div class="w-full max-w-5xl rounded-2xl bg-surface p-4 sm:p-7">
	<p class="mb-7 text-lg font-semibold text-neutral">Arriving on Tuesday, 28 July</p>

	{#if placement === 'alternate'}
		<Timeline
			items={timelineItems}
			{orientation}
			placement="alternate"
			{variant}
			{size}
			{density}
			item={orderItem}
			marker={orderMarker}
			opposite={orderOpposite}
			aria-label="Order progress"
		/>
	{:else}
		<Timeline
			items={timelineItems}
			{orientation}
			{placement}
			{variant}
			{size}
			{density}
			item={orderItem}
			marker={orderMarker}
			aria-label="Order progress"
		/>
	{/if}
</div>
