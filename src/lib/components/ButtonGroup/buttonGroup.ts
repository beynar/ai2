import type { Sizes, Colors } from '$lib/types/theme.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonProps, ButtonVariant } from '../Button/button.js';

export type ButtonGroupProps<Payload extends Record<string, any> | undefined = undefined> =
	WithAttachments<{
		buttons: ButtonProps<Payload>[];
		size?: Sizes;
		color?: Colors;
		variant?: ButtonVariant;
		disabled?: boolean;
		class?: string;
		theme?: InferComponentTheme<typeof buttonGroupTheme>;
	}>;

const defaultButtonGroup = cva({
	base: 'flex items-center  first-child:rounded-r-none last-child:rounded-l-none not-first-not-last-child:rounded-none not-first-not-last-child:border-l-none not-first-not-last-child:border-r-none first-child:border-r-none last-child:border-l-none'
});

export const buttonGroupTheme = {
	buttonGroup: defaultButtonGroup
};
