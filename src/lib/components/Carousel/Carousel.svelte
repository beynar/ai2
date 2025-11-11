<script lang="ts">
	import type { WithAttachments } from '$lib/types/props.js';
	import { caretLeftIcon } from '../Icons/caretLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import { CarouselState, type CarouselProps } from './carousel.state.svelte.js';
	import { useCarouselTheme } from './carousel.theme.js';

	let {
		class: className,
		dragFree = false,
		layout = { default: 1 },
		gaps: gap = { default: 20 },
		partialDelta = { default: 0 },
		dots: dotsSnippet,
		theme,
		children,
		navigationButton,
		snapAlign = 'center',
		...attachments
	}: WithAttachments<CarouselProps> = $props();

	let id = $props.id();

	const carousel = new CarouselState(
		{
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

	const classes = $derived(useCarouselTheme(theme));

	const percent = (n: number) => {
		return (100 / n).toFixed(2);
	};

	const canNavigate = $derived(carousel.dots.length > 1);
</script>

<!-- {carousel.currentSlide?.index} -->
<div data-carousel class={classes.container({ class: className })} {...attachments}>
	<div
		{id}
		aria-roledescription="carousel"
		{@attach carousel.attachment}
		data-carousel-slider
		data-drag-free={dragFree}
		data-can-scroll-next={carousel.canScrollNext}
		data-can-scroll-prev={carousel.canScrollPrev}
		data-axis={'x'}
		class={classes.slider()}
		style:--gap-xs={`${gap.xs ?? gap.default ?? 20}px`}
		style:--gap-sm={`${gap.sm ?? gap.default ?? 20}px`}
		style:--gap-md={`${gap.md ?? gap.default ?? 20}px`}
		style:--gap-lg={`${gap.lg ?? gap.default ?? 20}px`}
		style:--gap-xl={`${gap.xl ?? gap.default ?? 20}px`}
		style:--layout-xs={`${percent(layout.xs ?? layout.default ?? 1)}%`}
		style:--layout-sm={`${percent(layout.sm ?? layout.default ?? 2)}%`}
		style:--layout-md={`${percent(layout.md ?? layout.default ?? 2)}%`}
		style:--layout-lg={`${percent(layout.lg ?? layout.default ?? 3)}%`}
		style:--layout-xl={`${percent(layout.xl ?? layout.default ?? 4)}%`}
		style:--partial-delta-xs={`${partialDelta.xs ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-sm={`${partialDelta.sm ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-md={`${partialDelta.md ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-lg={`${partialDelta.lg ?? partialDelta.default ?? 0}px`}
		style:--partial-delta-xl={`${partialDelta.xl ?? partialDelta.default ?? 0}px`}
		style:width="100%"
		style:--snap-align={snapAlign}
	>
		{@render children?.(carousel)}
	</div>

	{#if navigationButton && canNavigate}
		{#if typeof navigationButton === 'object'}
			<button
				data-color={navigationButton.color || 'primary'}
				{...carousel.prevButton}
				class={classes.navigationButton({
					...navigationButton,
					disabled: carousel.prevButton.disabled,
					direction: 'previous'
				})}
			>
				{@render caretLeftIcon()}
			</button>

			<button
				data-color={navigationButton.color || 'primary'}
				{...carousel.nextButton}
				class={classes.navigationButton({
					...navigationButton,
					disabled: carousel.nextButton.disabled,
					direction: 'next'
				})}
			>
				{@render caretRightIcon()}
			</button>
		{:else}
			{@render navigationButton(
				carousel,
				{
					'aria-controls': `${carousel.id}-slides`,
					'aria-label': 'Previous slide'
				},
				'prev'
			)}

			{@render navigationButton(
				carousel,
				{
					'aria-controls': `${carousel.id}-slides`,
					'aria-label': 'Next slide'
				},
				'next'
			)}
		{/if}
	{/if}

	{#if dotsSnippet && canNavigate}
		{#if typeof dotsSnippet === 'object'}
			<div class={classes.dots()}>
				{#each carousel.dots as dotItem}
					<button
						data-color={dotsSnippet.color || 'primary'}
						{...dotItem.attributes}
						class={classes.dot({
							...dotsSnippet,
							active: dotItem.active
						})}
					>
					</button>
				{/each}
			</div>
		{:else}
			{@render dotsSnippet(carousel, carousel.dots)}
		{/if}
	{/if}
</div>

<style>
	[data-carousel-slider]:not([data-drag-free='true']) {
		scroll-snap-type: x mandatory;

		:global(& > *) {
			scroll-snap-align: var(--snap-align);
		}
	}

	[data-carousel-slider] {
		display: grid;
		position: relative;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: clip;
		scroll-behavior: smooth;
		overscroll-behavior-x: contain;
		inline-size: 100%;
		max-inline-size: 100vw;
		box-sizing: border-box;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}

		:global(&[has-repeat='true']) {
			scroll-padding-inline: 50% !important;
			padding-inline: 50% !important;
		}

		:global(&[has-overflow='true']) {
			cursor: grab;

			&:active {
				cursor: grabbing;
				@media (pointer: fine) {
					scroll-snap-type: none !important;
				}
			}
		}

		:global(&[has-snap='true']) {
			scroll-snap-type: var(--snap-type) !important;
		}

		:global(& > *) {
			display: inline-block;
			white-space: initial;
			vertical-align: top;
		}

		/* prevent drag interaction on children */
		:global(& *) {
			-webkit-user-drag: none;
			-webkit-touch-callout: none;
			user-select: none;
		}
	}

	[data-carousel-slider][data-axis='x'] {
		grid-auto-flow: column;
	}
	[data-carousel-slider][data-axis='y'] {
		grid-auto-flow: row;
	}

	/* xs */
	@media (max-width: 640px) {
		[data-carousel-slider][data-axis='x'] {
			grid-auto-columns: calc(var(--layout-xs) - calc(var(--gap-xs)) - var(--partial-delta-xs));
			column-gap: var(--gap-xs);
		}
	}

	/* sm */
	@media (min-width: 640px) {
		[data-carousel-slider][data-axis='x'] {
			grid-auto-columns: calc(var(--layout-sm) - calc(var(--gap-sm)) - var(--partial-delta-sm));
			column-gap: var(--gap-sm);
		}
	}

	/* md */
	@media (min-width: 768px) {
		[data-carousel-slider][data-axis='x'] {
			grid-auto-columns: calc(var(--layout-md) - calc(var(--gap-md)) - var(--partial-delta-md));
			column-gap: var(--gap-md);
		}
	}

	/* lg */
	@media (min-width: 1024px) {
		[data-carousel-slider][data-axis='x'] {
			grid-auto-columns: calc(var(--layout-lg) - calc(var(--gap-lg)) - var(--partial-delta-lg));
			column-gap: var(--gap-lg);
		}
	}

	/* xl */
	@media (min-width: 1280px) {
		[data-carousel-slider][data-axis='x'] {
			grid-auto-columns: calc(var(--layout-xl) - calc(var(--gap-xl)) - var(--partial-delta-xl));

			column-gap: var(--gap-xl);
		}
	}

	:global([data-carousel-slider] img) {
		user-select: none;
	}
</style>
