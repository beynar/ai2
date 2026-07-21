export const carouselDescription = `
# Carousel Component

Carousel renders a scrollable collection from items. Its public data contract matches Stepper and Tabs: pass items, then render one generated slide with children({ carousel, item, index }).

The component owns the direct slide wrappers. Do not put a consumer-owned repeated slide loop directly inside Carousel.

## Basic Usage

<script lang="ts">
	import { Carousel } from 'svelai/carousel';

	const items = [
		{ title: 'Signal', description: 'Collect the first insight.' },
		{ title: 'Orbit', description: 'Review the second item.' },
		{ title: 'Focus', description: 'Finish with the third item.' }
	];
</script>

<Carousel items={items} navigationButton={{ color: 'primary' }} dots={{ color: 'primary' }}>
	{#snippet children({ item, index, carousel })}
		<article>
			<p>Slide {index + 1}</p>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
			<button onclick={() => carousel.next()}>Next</button>
		</article>
	{/snippet}
</Carousel>

## Core Props

- items: Item[] - the collection used to generate one slide per item.
- children: Snippet<[CarouselRenderPayload<Item>]> - renders content inside each generated slide wrapper.
- layout: ResponsiveProperty - number of slides visible at each breakpoint. Default: { default: 1 }.
- gaps: ResponsiveProperty - gap in pixels between generated slides. Default: { default: 20 }.
- partialDelta: ResponsiveProperty - pixels to reveal from the adjacent slide. Default: { default: 0 }.
- dragFree: boolean - disables strict snap behavior when true.
- navigationButton: object or snippet - built-in prev/next controls or custom controls.
- dots: object or snippet - built-in pagination dots or custom pagination.
- class: string - classes for the root container.
- theme: CarouselThemeProps - theme overrides for public parts.

## Render Payload

children receives:

- carousel: CarouselState - state and navigation helpers.
- item: Item - the current item, preserving the caller's item shape.
- index: number - zero-based generated slide index.

Use item fields directly. For example, if items contains { title, image }, item.title and item.image are typed inside the snippet.

## Responsive Example

<Carousel
	items={items}
	layout={{ default: 1, sm: 2, lg: 3 }}
	gaps={{ default: 16, lg: 24 }}
	partialDelta={{ default: 48 }}
	navigationButton={{ color: 'primary' }}
	dots={{ color: 'primary' }}
>
	{#snippet children({ item })}
		<div class="rounded bg-surface p-6">
			<h3>{item.title}</h3>
			<p>{item.description}</p>
		</div>
	{/snippet}
</Carousel>

## Custom Navigation

<Carousel items={items} dots={{ color: 'primary' }}>
	{#snippet navigationButton(carousel, attributes, direction)}
		<button
			{...attributes}
			onclick={() => direction === 'prev' ? carousel.prev() : carousel.next()}
		>
			{direction === 'prev' ? 'Previous' : 'Next'}
		</button>
	{/snippet}

	{#snippet children({ item })}
		<div>{item.title}</div>
	{/snippet}
</Carousel>

## Custom Dots

<Carousel items={items} navigationButton={{ color: 'primary' }}>
	{#snippet dots(carousel, dotItems)}
		<div class="flex justify-center gap-2">
			{#each dotItems as dot, index}
				<button {...dot.attributes}>
					<span class="sr-only">Slide {index + 1}</span>
				</button>
			{/each}
		</div>
	{/snippet}

	{#snippet children({ item })}
		<div>{item.title}</div>
	{/snippet}
</Carousel>

## CarouselState

- currentSlide - currently visible slide.
- lastSlideInView - last visible slide in the viewport.
- canScrollNext - whether next navigation is possible.
- canScrollPrev - whether previous navigation is possible.
- sortedSlides - generated slide records in DOM order.
- dots - pagination dot records with active state and attributes.
- breakpoint - current responsive breakpoint.
- resolvedLayout - active slides-per-view value.
- resolvedGaps - active gap value.
- next(count?) - move forward by count slides, defaulting to the active layout size.
- prev(count?) - move backward by count slides, defaulting to the active layout size.
- nextButton and prevButton - attributes for custom button composition.

## Theme Parts

- root - outer carousel container.
- slider - scrollable track.
- slide - generated direct slide wrapper.
- navigationButton - built-in previous and next buttons.
- dots - built-in dots container.
- dot - built-in dot button.

Use the slide theme part to style every generated wrapper consistently:

<Carousel
	items={items}
	theme={{ slide: { base: 'rounded-lg bg-surface p-4' } }}
>
	{#snippet children({ item })}
		<h3>{item.title}</h3>
	{/snippet}
</Carousel>
`;
