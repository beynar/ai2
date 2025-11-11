import type { Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { SeparatorThemeProps } from './separator.theme.js';

export type SeparatorProps = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name of the separator. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * Whether the separator is decorative (no semantic meaning).
			 * @default false
			 */
			decorative?: boolean;
			/**
			 * The orientation of the separator.
			 * @default 'horizontal'
			 */
			orientation?: 'horizontal' | 'vertical';
			/**
			 * The color of the separator.
			 * @default 'surface'
			 */
			color?: Colors | 'surface';
			/**
			 * The size (thickness) of the separator in pixels.
			 * @default 1
			 */
			size?: number;
			/**
			 * Custom theme overrides.
			 */
			theme?: SeparatorThemeProps;
		},
		'children',
		undefined
	>
>;

