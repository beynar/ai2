import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ToggleButtonProps, ToggleButtonVariant } from '../ToggleButton/index.js';
import type { ToggleButtonGroupThemeProps } from './toggleButtonGroup.theme.js';

export type ToggleButtonGroupProps<
	Items extends Record<string, Omit<ToggleButtonProps, 'checked' | 'variant' | 'color' | 'size'>>
> = WithAttachments<{
	/** Items keyed by value, excluding group-level checked, variant, color, and size. */
	items: Items;
	/** Size applied to every button in the group. */
	size?: Sizes;
	/** Color applied to every button in the group. */
	color?: Colors;
	/** Visual variant applied to every button in the group. */
	variant?: ToggleButtonVariant;
	/** When true, disables all buttons in the group. */
	disabled?: boolean;
	/** When true, renders the buttons as joined segments in a single container. */
	joined?: boolean;
	/** Class name on the root group container element. */
	class?: string;
	/** Theme overrides for the group container layout. */
	theme?: ToggleButtonGroupThemeProps;
	/** Bindable checked state keyed by each entry in `items`. */
	value?: {
		[key in keyof Items]: boolean;
	};
	/** Called when any button toggles, with the updated checked map. */
	onChange?: (value: {
		[key in keyof Items]: boolean;
	}) => void;
}>;
