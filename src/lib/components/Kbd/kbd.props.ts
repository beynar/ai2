import type { Snippet } from 'svelte';
import type { Colors, Sizes } from '$lib/types/index.js';
import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { KbdThemeProps } from './kbd.theme.js';

export type KbdProps = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name of the kbd. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * Renders multiple keys side by side inside a group. Each entry is a string label or a snippet for rich content (icons, etc). When set, `children` is ignored.
			 */
			keys?: (string | Snippet)[];
			/**
			 * Separator rendered between adjacent keys when `keys` is set (e.g. `"+"` for `Ctrl + B`).
			 */
			separator?: Slot;
			/**
			 * Size token controlling key height, padding, and typography.
			 */
			size?: Sizes;
			/**
			 * Color of the keys. `background` (default) is the neutral keycap; semantic colors use their muted tint.
			 */
			color?: Colors;
			/**
			 * Theme overrides for the kbd, group, and separator parts.
			 */
			theme?: KbdThemeProps;
		},
		'children'
	>
>;
