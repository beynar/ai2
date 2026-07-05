import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AlertThemeProps } from './alert.theme.js';

export type AlertVariant = 'solid' | 'outline' | 'soft';

type AlertBaseProps = {
	/**
	 * Bindable reference to the root alert element.
	 */
	ref?: HTMLElement | null;
	/**
	 * The class name of the alert. First element that the component outputs in the DOM.
	 */
	class?: string;
	/**
	 * When true, prevents interaction and applies disabled styles.
	 */
	disabled?: boolean;
	/**
	 * Theme color token applied to the alert styling.
	 */
	color?: Colors;
	/**
	 * Visual style variant of the alert.
	 */
	variant?: AlertVariant;
	/**
	 * Size token controlling padding and typography.
	 */
	size?: Sizes;
	/**
	 * Theme overrides for the alert.
	 */
	theme?: AlertThemeProps;
};

type AlertSlotProps = WithSlot<AlertBaseProps, 'prefix' | 'title' | 'description' | 'children'>;

export type AlertProps = WithAttachments<AlertSlotProps>;
