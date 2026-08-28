import type { Sizes } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { MarqueeThemeProps } from './marquee.theme.js';
import type { HTMLAttributes } from 'svelte/elements';

type MarqueeRootAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

type MarqueeBaseProps = MarqueeRootAttributes & {
	/** Bindable reference to the marquee container. */
	ref?: HTMLDivElement | null;
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
	 * Applies the shared scroll-fade utility at the marquee edges
	 * @default true
	 */
	fade?: boolean;
	/**
	 * Minimum number of copies used for the seamless loop. The component adds copies
	 * when the rendered content is narrower or shorter than its viewport.
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
