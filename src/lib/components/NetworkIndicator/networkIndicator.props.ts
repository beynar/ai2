import type { Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { NetworkIndicatorThemeProps } from './networkIndicator.theme.js';
import type { Easing } from '$lib/transitions/easingFunctions.js';

export type NetworkIndicatorProps = WithAttachments<{
	/**
	 * The color scheme of the network indicator.
	 * @default 'contrast'
	 */
	color?: Colors;
	/**
	 * The height of the network indicator in pixels.
	 * @default 3
	 */
	size?: number;
	/**
	 * The animation delay/duration in milliseconds.
	 * @default 300
	 */
	delay?: number;
	/**
	 * The easing function to use for animations.
	 * @default 'cubicInOut'
	 */
	easing?: Easing;
	/**
	 * Additional CSS classes for the network indicator.
	 */
	class?: string;
	/**
	 * Custom theme overrides.
	 */
	theme?: NetworkIndicatorThemeProps;
}>;
