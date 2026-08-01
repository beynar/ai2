<script lang="ts" generics="Item extends TimelineItem = TimelineItem">
	import TimelineEntry from './TimelineEntry.svelte';
	import { resolveTimelineItems } from './timeline.items.js';
	import type { TimelineItem, TimelineProps } from './timeline.props.js';
	import { useTimelineTheme } from './timeline.theme.js';

	let {
		ref = $bindable(null),
		items,
		orientation = 'vertical',
		placement = 'end',
		variant = 'ghost',
		size = 'normal',
		density = 'normal',
		color = 'neutral',
		connectorColor = 'neutral',
		scrollFade = true,
		item: itemRenderer,
		marker: markerRenderer,
		opposite: oppositeRenderer,
		tabindex,
		class: className,
		theme,
		...rootAttributes
	}: TimelineProps<Item> = $props();

	const classes = $derived(useTimelineTheme(theme));
	const resolvedItems = $derived(
		resolveTimelineItems(items, orientation, placement, color, connectorColor)
	);

	let isOverflowing = $state(false);
	const scrollFadeAxis = $derived(
		scrollFade && orientation === 'horizontal' && isOverflowing ? 'x' : 'none'
	);
	const resolvedTabindex = $derived(
		tabindex ?? (orientation === 'horizontal' && isOverflowing ? 0 : undefined)
	);

	$effect(() => {
		const node = ref;
		if (!node || orientation !== 'horizontal') {
			isOverflowing = false;
			return;
		}

		let frame: number | undefined;
		const measure = () => {
			frame = undefined;
			isOverflowing = node.scrollWidth > node.clientWidth + 1;
		};
		const schedule = () => {
			if (frame !== undefined) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(measure);
		};
		const resizeObserver = new ResizeObserver(schedule);
		const observeLayout = () => {
			resizeObserver.disconnect();
			resizeObserver.observe(node);
			node
				.querySelectorAll<HTMLElement>('[data-slot="timeline-item"]')
				.forEach((timelineItem) => resizeObserver.observe(timelineItem));
			schedule();
		};
		const mutationObserver = new MutationObserver(observeLayout);

		mutationObserver.observe(node, { childList: true, characterData: true, subtree: true });
		observeLayout();

		return () => {
			if (frame !== undefined) cancelAnimationFrame(frame);
			mutationObserver.disconnect();
			resizeObserver.disconnect();
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<ol
	{...rootAttributes}
	bind:this={ref}
	tabindex={resolvedTabindex}
	data-slot="timeline"
	data-orientation={orientation}
	data-placement={placement}
	data-color={color}
	data-variant={variant}
	data-size={size}
	data-density={density}
	data-overflowing={isOverflowing ? 'true' : undefined}
	data-scroll-fade={scrollFadeAxis === 'none' ? undefined : scrollFadeAxis}
	class={classes.root({
		orientation,
		size,
		density,
		scrollFade: scrollFadeAxis,
		className
	})}
>
	{#each resolvedItems as entry (entry.key)}
		<TimelineEntry
			{entry}
			{placement}
			{variant}
			{size}
			{density}
			{classes}
			{itemRenderer}
			{markerRenderer}
			{oppositeRenderer}
		/>
	{/each}
</ol>
