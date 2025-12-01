import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ToggleButtonProps, ToggleButtonVariant } from '../ToggleButton/index.js';
import type { ToggleButtonGroupThemeProps } from './toggleButtonGroup.theme.js';

export type ToggleButtonGroupProps<
	Buttons extends Record<string, Omit<ToggleButtonProps, 'checked' | 'variant' | 'color' | 'size'>>
> = WithAttachments<{
	buttons: Buttons;
	size?: Sizes;
	color?: Colors;
	variant?: ToggleButtonVariant;
	disabled?: boolean;
	class?: string;
	theme?: ToggleButtonGroupThemeProps;
	value?: {
		[key in keyof Buttons]: boolean;
	};
	onChange?: (value: {
		[key in keyof Buttons]: boolean;
	}) => void;
}>;

