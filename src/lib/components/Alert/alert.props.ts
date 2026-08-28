import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AlertThemeProps } from './alert.theme.js';
import type { Messages } from '$lib/i18n/en.js';

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
	 * Visual style variant of the alert. `soft` is the tinted "toast" look: a muted
	 * surface with a colored border and a legible on-tint accent (readable in light and
	 * dark), plus an automatic filled status icon (success/info/warning/danger) when no
	 * `prefix` is provided.
	 */
	variant?: AlertVariant;
	/**
	 * When true, shows a close button; clicking it calls `onDismiss`.
	 */
	dismissible?: boolean;
	/**
	 * Called when the close button is clicked. The alert's visibility is owned by the
	 * caller — hide it in this handler.
	 */
	onDismiss?: () => void;
	/**
	 * Size token controlling padding and typography.
	 */
	size?: Sizes;
	/**
	 * Per-instance i18n overrides, merged over the global catalog.
	 */
	i18n?: Partial<Messages>;
	/**
	 * Theme overrides for the alert.
	 */
	theme?: AlertThemeProps;
};

type AlertSlotProps = WithSlot<AlertBaseProps, 'prefix' | 'title' | 'description' | 'children'>;

export type AlertProps = WithAttachments<AlertSlotProps>;
