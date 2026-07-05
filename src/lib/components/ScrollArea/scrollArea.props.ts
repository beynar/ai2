import type { Snippet } from 'svelte';
import type { ScrollAreaThemeProps } from './scrollArea.theme.js';

export type ScrollAreaProps = {
	/** Controls when the vertical scrollbar is shown (`hover`, `always`, `scroll`, or `auto`). */
	type: 'auto' | 'always' | 'scroll' | 'hover';
	/** Enables auto-scroll and up/down indicators when the pointer rests near the viewport edges. */
	scrollOnEdges?: boolean;
	/** Milliseconds to wait before hover mode treats the scroll area as hovered. */
	delay?: number;
	/** Content rendered inside the scrollable viewport. */
	children?: Snippet;
	/** Class name applied to the root scroll area element. */
	class?: string;
	/** Theme overrides for the scroll area, viewport, scrollbar, and thumb. */
	theme?: ScrollAreaThemeProps;
};
