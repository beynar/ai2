import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ToggleButtonThemeProps } from './toggleButton.theme.js';

export type ToggleButtonVariant = 'outline' | 'soft' | 'ghost';
export type ToggleButtonProps = WithAttachments<
	WithSlot<
		{
			ref?: HTMLElement | null;
			color?: Colors;
			variant?: ToggleButtonVariant;
			size?: Sizes;
			disabled?: boolean;
			class?: string;
			theme?: ToggleButtonThemeProps;
			checked?: boolean;
			onChange?: ((checked: boolean) => void) | null | undefined;
		},
		'prefix' | 'children' | 'suffix'
	>
>;

