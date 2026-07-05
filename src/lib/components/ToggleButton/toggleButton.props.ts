import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ToggleButtonThemeProps } from './toggleButton.theme.js';

export type ToggleButtonVariant = 'outline' | 'soft' | 'ghost';
export type ToggleButtonProps = WithAttachments<
	WithSlot<
		{
			/** Bindable reference to the root button element. */
			ref?: HTMLElement | null;
			/** Theme color token applied to the button styling. */
			color?: Colors;
			/** Visual style variant of the toggle button. */
			variant?: ToggleButtonVariant;
			/** Size token controlling padding, height, and typography. */
			size?: Sizes;
			/** When true, prevents toggling and applies disabled styles. */
			disabled?: boolean;
			/**
			 * The class name of the button. First element that the component outputs in the DOM.
			 */
			class?: string;
			/** Theme overrides for the button, prefix, and suffix parts. */
			theme?: ToggleButtonThemeProps;
			/** Bindable checked state toggled on each click when not disabled. */
			checked?: boolean;
			/** Called after the checked state changes from a user click. */
			onChange?: ((checked: boolean) => void) | null | undefined;
		},
		'prefix' | 'children' | 'suffix'
	>
>;
