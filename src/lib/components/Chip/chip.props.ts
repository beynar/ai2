import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ChipThemeProps } from './chip.theme.js';

export type ChipProps = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name of the chip. First element that the component outputs in the DOM.
			 */
			class?: string;
			/** Theme color token applied to the chip styling. */
			color?: Colors;
			/** Size token controlling padding, height, and typography. */
			size?: Sizes;
			/** Visual style variant of the chip. */
			variant?: 'solid' | 'outline' | 'soft';
			/** URL rendered as a link when set; chip becomes an anchor. */
			href?: string;
			/** Link target attribute when href is set. */
			target?: string;
			/** Link rel attribute when href is set. */
			rel?: string;
			/** Click handler; renders as a button when set without href. */
			onClick?: (event: MouseEvent) => void;
			/** Pointer enter handler. */
			onEnter?: (event: PointerEvent) => void;
			/** Pointer leave handler. */
			onLeave?: (event: PointerEvent) => void;
			/** Theme overrides for the chip, prefix, and suffix parts. */
			theme?: ChipThemeProps;
		},
		'children' | 'suffix' | 'prefix'
	>
>;
