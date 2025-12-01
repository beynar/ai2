import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonThemeProps } from './button.theme.js';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
export type ButtonPrimitiveProps =
	WithAttachments<
		WithSlot<
			{
				payload?: any;
				label?: string;
				ref?: HTMLElement | null;
				href?: string;
				loading?: boolean;
				squared?: boolean;
				color?: Colors;
				variant?: ButtonVariant;
				size?: Sizes;
				fullWidth?: boolean;
				disabled?: boolean;
				onClick?: ((payload: any) => void) | null | undefined;
				onEnter?: ((payload: any) => void) | null | undefined;
				onLeave?: ((payload: any) => void) | null | undefined;
				/**
				 * The class name of the button. First element that the component outputs in the DOM.
				 */
				class?: string;
				target?: string;
				rel?: string;
				as?: 'string';
				theme?: ButtonThemeProps;
			},
			'suffix' | 'prefix' | 'children'
		>
	>;

export type ButtonProps = Omit<
	ButtonPrimitiveProps,
	'as'
>;

