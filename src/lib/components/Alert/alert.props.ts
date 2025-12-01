import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AlertThemeProps } from './alert.theme.js';

export type AlertVariant = 'solid' | 'outline' | 'soft';

type AlertBaseProps = {
	ref?: HTMLElement | null;
	/**
	 * The class name of the alert. First element that the component outputs in the DOM.
	 */
	class?: string;
	disabled?: boolean;
	color?: Colors;
	variant?: AlertVariant;
	size?: Sizes;
	theme?: AlertThemeProps;
};

type AlertSlotProps = WithSlot<AlertBaseProps, 'prefix' | 'title' | 'description' | 'children'>;

export type AlertProps = WithAttachments<AlertSlotProps>;
