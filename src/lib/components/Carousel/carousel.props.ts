import type { Snippet } from 'svelte';
import type { Colors } from '$lib/types/theme.js';
import type { CarouselThemeProps } from './carousel.theme.js';
import type { CarouselState, ResponsiveProperty, Sizes } from './carousel.state.svelte.js';

/** ARIA attributes passed to a custom navigation button snippet. */
type NavigationButton = {
	'aria-controls': string;
	'aria-label': string;
};

/** A pagination dot's active state and the attributes to spread onto its control. */
type Dot = {
	active: boolean;
	attributes: {
		'data-active': boolean;
		'aria-controls': string;
		'aria-label': string;
		'aria-selected': boolean;
		onclick: () => void;
	};
};

export interface CarouselProps {
	/** CSS classes applied to the carousel's root element. */
	class?: string;
	/** Allow free-form dragging instead of snapping to slide boundaries. */
	dragFree?: boolean;
	/** The slides, rendered as direct children of the scroll track. */
	children?: Snippet<[CarouselState]>;
	/** How slides align within the viewport when snapped. */
	snapAlign?: 'start' | 'center' | 'end';
	/**
	 * Pagination dots: a snippet for full control, or an object to style the
	 * built-in dots by color and size.
	 */
	dots?:
		| Snippet<[CarouselState, Dot[]]>
		| {
				color?: Colors;
				size?: Sizes;
		  };
	/**
	 * Prev/next navigation: an object to style the built-in buttons, or a snippet
	 * receiving the button attributes and direction for full control.
	 */
	navigationButton?:
		| {
				color?: Colors;
				size?: Sizes;
		  }
		| Snippet<[CarouselState, NavigationButton, 'prev' | 'next']>;
	/** Theme overrides for the carousel's structural parts. */
	theme?: CarouselThemeProps;

	/** Number of slides visible per breakpoint. */
	layout?: ResponsiveProperty;
	/** Gap between slides in pixels, per breakpoint. */
	gaps?: ResponsiveProperty;
	/** Fraction of the adjacent slide to reveal (partial peek), per breakpoint. */
	partialDelta?: ResponsiveProperty;
}
