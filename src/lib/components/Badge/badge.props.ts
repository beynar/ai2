import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { BadgeThemeProps } from './badge.theme.js';

export type BadgeProps = WithAttachments<{
	/** Theme color token applied to the badge styling. */
	color?: Colors;
	/** Corner anchor for the absolutely positioned badge. */
	position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
	/** Size token controlling padding, height, and typography. */
	size?: Sizes;
	/** Visual style variant of the badge. */
	variant?: 'soft' | 'solid' | 'outline';
	/**
	 * The class name of the badge. First element that the component outputs in the DOM.
	 */
	class?: string;
	/** Content rendered inside the badge. */
	children?: Slot;
	/** Theme overrides for the badge. */
	theme?: BadgeThemeProps;
}>;

