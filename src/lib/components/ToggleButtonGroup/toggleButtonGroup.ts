import type { Sizes, Colors } from '$lib/types/theme.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ToggleButtonProps, ToggleButtonVariant } from '../ToggleButton/toggleButton.js';

export type ToggleButtonGroupProps<
	Buttons extends Record<string, Omit<ToggleButtonProps, 'checked' | 'variant' | 'color' | 'size'>>
> = WithAttachments<{
	buttons: Buttons;
	size?: Sizes;
	color?: Colors;
	variant?: ToggleButtonVariant;
	disabled?: boolean;
	class?: string;
	theme?: InferComponentTheme<typeof toggleButtonGroupTheme>;
	value?: {
		[key in keyof Buttons]: boolean;
	};
	onChange?: (value: {
		[key in keyof Buttons]: boolean;
	}) => void;
}>;

const defaultToggleButtonGroup = cva({
	base: 'flex items-center gap-1'
});

export const toggleButtonGroupTheme = {
	buttonGroup: defaultToggleButtonGroup
};
