import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonProps, ButtonVariant } from '../Button/index.js';
import type { ButtonGroupThemeProps } from './buttonGroup.theme.js';

export type ButtonGroupProps = WithAttachments<{
	/** Items rendered in order inside the group. */
	items: ButtonProps[];
	/** Size applied to every button in the group. */
	size?: Sizes;
	/** Color applied to every button in the group. */
	color?: Colors;
	/** Visual variant applied to every button in the group. */
	variant?: ButtonVariant;
	/** When true, disables all buttons in the group. */
	disabled?: boolean;
	/** Class name on the root group container element. */
	class?: string;
	/** Theme overrides for the group container layout. */
	theme?: ButtonGroupThemeProps;
}>;
