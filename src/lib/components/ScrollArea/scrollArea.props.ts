import type { Snippet } from 'svelte';
import type { ScrollAreaThemeProps } from './scrollArea.theme.js';

export type ScrollAreaProps = {
	/** Bindable reference to the root scroll-area element. */
	ref?: HTMLElement | null;
	/** Bindable reference to the native scrolling viewport. */
	viewportRef?: HTMLElement | null;
	/** Accessible label applied to the native scrolling viewport. */
	ariaLabel?: string;
	/**
	 * Controls when the vertical scrollbar is shown (`hover`, `always`, `scroll`, or `auto`).
	 * @default 'hover'
	 */
	type?: 'auto' | 'always' | 'scroll' | 'hover';
	/**
	 * Enables auto-scroll and up/down indicators when the pointer rests near the viewport edges.
	 * @default false
	 */
	scrollOnEdges?: boolean;
	/**
	 * Applies the shared scroll-fade utility to the scrollable viewport.
	 * @default false
	 */
	scrollFade?: boolean;
	/**
	 * Milliseconds to wait before hover mode treats the scroll area as hovered.
	 * @default 0
	 */
	delay?: number;
	/** Content rendered inside the scrollable viewport. */
	children?: Snippet;
	/** Class name applied to the root scroll area element. */
	class?: string;
	/** Theme overrides for the scroll area, viewport, scrollbar, and thumb. */
	theme?: ScrollAreaThemeProps;
};
