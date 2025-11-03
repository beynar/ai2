import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { BadgeThemeProps } from './badge.theme.js';

export type BadgeProps = WithAttachments<{
	color?: Colors;
	position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
	size?: Sizes;
	variant?: 'soft' | 'solid' | 'outline';
	/**
	 * The class name of the badge. First element that the component outputs in the DOM.
	 */
	class?: string;
	children?: Slot;
	theme?: BadgeThemeProps;
}>;

