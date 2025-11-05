<script lang="ts">
	import { CarouselState, type Snippets, type CarouselProps } from './carousel.state.svelte.js';

	let {
		class: className,
		withGrabCursor = true,
		axis = { default: 'x' },
		dragFree = false,
		disableNativeScroll = { default: false },
		oneAtTime = false,
		autoHeight = false,
		autoPlay = 0,
		pauseOnHover = false,
		layout = { default: 1 },
		gaps: gap = { default: 20 },
		partialDelta = { default: 0 },
		pagination: paginationSnippet,
		prev: prevSnippet,
		next: nextSnippet,
		progress: progressSnippet,
		dots: dotsSnippet,
		children
	}: CarouselProps & Snippets = $props();

	let id = $props.id();

	const carousel = new CarouselState(
		{
			get withGrabCursor() {
				return withGrabCursor;
			},
			get axis() {
				return axis;
			},
			get dragFree() {
				return dragFree;
			},
			get disableNativeScroll() {
				return disableNativeScroll;
			},
			get oneAtTime() {
				return oneAtTime;
			},
			get autoHeight() {
				return autoHeight;
			},
			get autoPlay() {
				return autoPlay;
			},
			get pauseOnHover() {
				return pauseOnHover;
			},
			get layout() {
				return layout;
			},
			get gaps() {
				return gap;
			},
			get partialDelta() {
				return partialDelta;
			}
		},
		id
	);

	const buttonA11y = (type: 'prev' | 'next') => ({
		'aria-controls': `${id}-slides`,
		'aria-label': type === 'prev' ? 'Previous slide' : 'Next slide'
	});
</script>

<div aria-roledescription="carousel" {id} class={className} data-carousel-container>
	<div
		data-carousel-slider
		data-carousel-with-grab-cursor={withGrabCursor}
		data-drag-free={dragFree}
		{@attach carousel.attachment}
		style:--padding-xs={`${(axis.xs || axis.default) === 'x' ? '0 ' : ''}${
			gap.xs ?? gap.default ?? 20
		}px ${(axis.xs || axis.default) === 'x' ? '' : '0'}`}
		style:--padding-sm={`${(axis.sm || axis.default) === 'x' ? '0 ' : ''}${
			gap.sm ?? gap.default ?? 20
		}px ${(axis.sm || axis.default) === 'x' ? '' : '0'}`}
		style:--padding-md={`${(axis.md || axis.default) === 'x' ? '0 ' : ''}${
			gap.md ?? gap.default ?? 20
		}px ${(axis.md || axis.default) === 'x' ? '' : '0'}`}
		style:--padding-lg={`${(axis.lg || axis.default) === 'x' ? '0 ' : ''}${
			gap.lg ?? gap.default ?? 20
		}px ${(axis.lg || axis.default) === 'x' ? '' : '0'}`}
		style:--padding-xl={`${(axis.xl || axis.default) === 'x' ? '0 ' : ''}${
			gap.xl ?? gap.default ?? 20
		}px ${(axis.xl || axis.default) === 'x' ? '' : '0'}`}
		style:--overflow-xs={axis.xs === 'x'
			? `${(disableNativeScroll.xs ?? disableNativeScroll.default) ? 'hidden' : 'auto'} visible`
			: `visible ${(disableNativeScroll.xs ?? disableNativeScroll.default) ? 'hidden' : 'auto'}`}
		style:--overflow-sm={axis.sm === 'x'
			? `${(disableNativeScroll.sm ?? disableNativeScroll.default) ? 'hidden' : 'auto'} visible`
			: `visible ${(disableNativeScroll.sm ?? disableNativeScroll.default) ? 'hidden' : 'auto'}`}
		style:--overflow-md={axis.md === 'x'
			? `${(disableNativeScroll.md ?? disableNativeScroll.default) ? 'hidden' : 'auto'} visible`
			: `visible ${(disableNativeScroll.md ?? disableNativeScroll.default) ? 'hidden' : 'auto'}`}
		style:--overflow-lg={axis.lg === 'x'
			? `${(disableNativeScroll.lg ?? disableNativeScroll.default) ? 'hidden' : 'auto'} visible`
			: `visible ${(disableNativeScroll.lg ?? disableNativeScroll.default) ? 'hidden' : 'auto'}`}
		style:--overflow-xl={axis.xl === 'x'
			? `${(disableNativeScroll.xl ?? disableNativeScroll.default) ? 'hidden' : 'auto'} visible`
			: `visible ${(disableNativeScroll.xl ?? disableNativeScroll.default) ? 'hidden' : 'auto'}`}
		style:--layout-xs={`${100 / (layout.xs ?? layout.default ?? 1)}%`}
		style:--layout-sm={`${100 / (layout.sm ?? layout.default ?? 2)}%`}
		style:--layout-md={`${100 / (layout.md ?? layout.default ?? 2)}%`}
		style:--layout-lg={`${100 / (layout.lg ?? layout.default ?? 3)}%`}
		style:--layout-xl={`${100 / (layout.xl ?? layout.default ?? 4)}%`}
		style:--partial-delta-xs={`${partialDelta.xs ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-sm={`${partialDelta.sm ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-md={`${partialDelta.md ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-lg={`${partialDelta.lg ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-xl={`${partialDelta.xl ?? partialDelta.default ?? 0}px`}
		data-axis-xs={axis.xs || axis.default || 'x'}
		data-axis-sm={axis.sm || axis.default || 'x'}
		data-axis-md={axis.md || axis.default || 'x'}
		data-axis-lg={axis.lg || axis.default || 'x'}
		data-axis-xl={axis.xl || axis.default || 'x'}
		style:transform={autoHeight ? 'scaleY(0%)' : ''}
		id={`${id}-slides`}
	>
		<!-- style:--flex-direction={axis === 'x' ? 'row' : 'column'}
			style:--display={axis === 'x' ? 'flex' : 'grid'}
			style:--snap-type={axis === 'x' ? 'x mandatory' : 'y mandatory'} -->
		{@render children(carousel)}
	</div>

	{@render progressSnippet?.(carousel)}
	{@render dotsSnippet?.(carousel, {
		'aria-label': 'Slides',
		role: 'tablist'
	})}
	{@render paginationSnippet?.(carousel)}
	{@render nextSnippet?.(carousel, buttonA11y('next'))}
	{@render prevSnippet?.(carousel, buttonA11y('prev'))}
</div>

<style>
	[data-carousel-container] {
		position: relative;
		overflow: visible;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		min-width: 100%;
	}

	[data-carousel-slider] {
		display: flex;
		flex-direction: row;
		user-select: none;
		position: relative;
		flex-wrap: nowrap;
		max-height: 100%;
		max-width: 100%;
	}
	:global([data-carousel-slider][data-dragging='false'][data-drag-free='false']) {
		scroll-snap-type: x mandatory;
	}
	[data-carousel-with-grab-cursor='true'] {
		cursor: grab;
	}
	[data-carousel-with-grab-cursor='true']:active {
		cursor: grabbing;
	}
	[data-carousel-slide] {
		height: auto;
	}

	@media (max-width: 640px) {
		[data-carousel-slider] {
			overflow: var(--overflow-xs);
		}
		[data-carousel-slider] > * {
			flex: 0 0 calc(var(--layout-xs) - var(--partial-delta-xs));
			padding: var(--padding-xs);
		}
		:global([data-carousel-slider][data-axis-xs='y']) {
			flex-direction: column !important;
		}
		:global(
			[data-carousel-slider][data-axis-xs='y'][data-dragging='false'][data-drag-free='false']
		) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 640px) {
		[data-carousel-slider] {
			overflow: var(--overflow-sm);
		}
		:global([data-carousel-slider] > *) {
			flex: 0 0 calc(var(--layout-sm) - var(--partial-delta-sm));
			padding: var(--padding-sm);
		}
		:global([data-carousel-slider][data-axis-sm='y']) {
			flex-direction: column !important;
		}
		:global(
			[data-carousel-slider][data-axis-sm='y'][data-dragging='false'][data-drag-free='false']
		) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 768px) {
		[data-carousel-slider] {
			overflow: var(--overflow-md);
		}
		:global([data-carousel-slider] > *) {
			flex: 0 0 calc(var(--layout-md) - var(--partial-delta-md));
			padding: var(--padding-md);
		}
		:global([data-carousel-slider][data-axis-md='y']) {
			flex-direction: column !important;
		}
		:global(
			[data-carousel-slider][data-axis-md='y'][data-dragging='false'][data-drag-free='false']
		) {
			scroll-snap-type: y mandatory;
		}
	}

	@media (min-width: 1024px) {
		[data-carousel-slider] {
			overflow: var(--overflow-lg);
		}
		:global([data-carousel-slider] > *) {
			flex: 0 0 calc(var(--layout-lg) - var(--partial-delta-lg));
			padding: var(--padding-lg);
		}
		:global([data-carousel-slider][data-axis-lg='y']) {
			flex-direction: column !important;
		}
		:global(
			[data-carousel-slider][data-axis-lg='y'][data-dragging='false'][data-drag-free='false']
		) {
			scroll-snap-type: y mandatory;
		}
	}
	@media (min-width: 1280px) {
		[data-carousel-slider] {
			overflow: var(--overflow-xl);
		}
		:global([data-carousel-slider] > *) {
			flex: 0 0 calc(var(--layout-xl) - var(--partial-delta-xl));
			padding: var(--padding-xl);
		}
		:global([data-carousel-slider][data-axis-xl='y']) {
			flex-direction: column !important;
		}
		:global(
			[data-carousel-slider][data-axis-xl='y'][data-dragging='false'][data-drag-free='false']
		) {
			scroll-snap-type: y mandatory;
		}
	}

	:global([data-carousel-slider] img) {
		user-select: none;
	}

	[data-carousel-slider]::-webkit-scrollbar {
		display: none;
	}
	[data-carousel-slider] {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	:global([data-carousel-slider][data-dragging='false'][data-drag-free='false']) {
		scroll-snap-type: mandatory;
		scroll-behavior: smooth;
	}
	:global([data-carousel-slider][data-dragging='false'][data-drag-free='false'] > *) {
		scroll-snap-align: start;
	}
</style>
