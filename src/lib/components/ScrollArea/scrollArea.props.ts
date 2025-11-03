import type { Snippet } from 'svelte';
import type { ScrollAreaThemeProps } from './scrollArea.theme.js';

export type ScrollAreaProps = {
	type: 'auto' | 'always' | 'scroll' | 'hover';
	scrollOnEdges?: boolean;
	delay?: number;
	children?: Snippet;
	class?: string;
	theme?: ScrollAreaThemeProps;
};

