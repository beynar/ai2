import type { Sizes } from '$lib/types/theme.js';
import type { WithSlot, Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { MarqueeThemeProps } from './marquee.theme.js';

type MarqueeBaseProps = {
	/**
	 * Direction of the marquee animation
	 * @default 'left'
	 */
	direction?: 'left' | 'up';
	/**
	 * Reverse the animation direction
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * Animation speed - can be 'fast', 'normal', 'slow', or a number (in seconds)
	 * @default 'fast'
	 */
	speed?: 'fast' | 'normal' | 'slow' | number;
	/**
	 * Pause animation on hover
	 * @default true
	 */
	pauseOnHover?: boolean;
	/**
	 * Add fade effect at edges
	 * @default false
	 */
	fade?: boolean;
	/**
	 * Number of times to duplicate the content for seamless loop
	 * @default 2
	 */
	numberOfCopies?: number;
	/**
	 * Size of the marquee items
	 * @default 'normal'
	 */
	size?: Sizes;
	/**
	 * Additional CSS class for the marquee container
	 */
	class?: string;
	/**
	 * Additional CSS class for each copy of the content
	 */
	innerClass?: string;
	/**
	 * Theme configuration overrides
	 */
	theme?: MarqueeThemeProps;
};

type MarqueeSlotProps = WithSlot<MarqueeBaseProps, 'children'>;

export type MarqueeProps = WithAttachments<MarqueeSlotProps>;
