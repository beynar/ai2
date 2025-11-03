import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonProps, ButtonVariant } from '../Button/index.js';
import type { ButtonGroupThemeProps } from './buttonGroup.theme.js';

export type ButtonGroupProps<Payload extends Record<string, any> | undefined = undefined> =
	WithAttachments<{
		buttons: ButtonProps<Payload>[];
		size?: Sizes;
		color?: Colors;
		variant?: ButtonVariant;
		disabled?: boolean;
		class?: string;
		theme?: ButtonGroupThemeProps;
	}>;

