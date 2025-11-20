import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { MenuOptionThemeProps } from './menuOption.theme.js';

export type MenuOptionProps = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name of the menu option. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * The color of the menu option.
			 * @default 'primary'
			 */
			color?: Colors;
			/**
			 * The size of the menu option.
			 * @default 'normal'
			 */
			size?: Sizes;
			/**
			 * URL to navigate to. If provided, renders as an anchor element.
			 */
			href?: string;
			/**
			 * Link target attribute (only used when href is provided).
			 */
			target?: string;
			/**
			 * Link rel attribute (only used when href is provided).
			 */
			rel?: string;
			/**
			 * Click event handler.
			 */
			onClick?: (event: MouseEvent) => void;
			/**
			 * Pointer enter event handler.
			 */
			onEnter?: (event: MouseEvent) => void;
			/**
			 * Pointer leave event handler.
			 */
			onLeave?: (event: MouseEvent) => void;
			/**
			 * Custom element type to render. Overrides automatic element detection.
			 */
			as?: 'button' | 'a' | 'div';
			/**
			 * Custom theme overrides.
			 */
			theme?: MenuOptionThemeProps;
		},
		'children' | 'title' | 'description' | 'prefix' | 'suffix'
	>
>;
