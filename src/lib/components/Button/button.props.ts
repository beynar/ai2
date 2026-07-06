import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonThemeProps } from './button.theme.js';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
type ButtonForwardedAttributes = Pick<
	HTMLButtonAttributes,
	| 'id'
	| 'type'
	| 'tabindex'
	| 'onpointermove'
	| 'aria-haspopup'
	| 'aria-expanded'
	| 'aria-controls'
	| 'aria-selected'
>;
export type ButtonPrimitiveProps = WithAttachments<
	WithSlot<
		{
			/**
			 * Value passed to onClick, onEnter, and onLeave handlers when they fire.
			 */
			payload?: any;
			/**
			 * Accessible label applied as aria-label on the root element.
			 */
			label?: string;
			/**
			 * ARIA role override. Defaults to `button` (or `link` when `href`/`as` is set).
			 * Pass `menuitem` when the button is an item inside a `menu`.
			 */
			role?: string;
			/**
			 * Bindable reference to the root button or anchor element.
			 */
			ref?: HTMLElement | null;
			/**
			 * When set, renders as an anchor link instead of a button.
			 */
			href?: string;
			/**
			 * When true, shows a spinner overlay and disables pointer events.
			 */
			loading?: boolean;
			/**
			 * When true, applies square aspect-ratio padding.
			 */
			squared?: boolean;
			/**
			 * Theme color token applied to the button styling.
			 */
			color?: Colors;
			/**
			 * Visual style variant of the button.
			 */
			variant?: ButtonVariant;
			/**
			 * Size token controlling padding, typography, and icon spacing.
			 */
			size?: Sizes;
			/**
			 * When true, expands the button to full container width.
			 */
			fullWidth?: boolean;
			/**
			 * When true, prevents interaction and applies disabled styles.
			 */
			disabled?: boolean;
			/**
			 * Click handler called with payload when not disabled.
			 */
			onClick?: ((payload: any) => void) | null | undefined;
			/**
			 * Pointer enter handler called with payload when not disabled.
			 */
			onEnter?: ((payload: any) => void) | null | undefined;
			/**
			 * Pointer leave handler called with payload when not disabled.
			 */
			onLeave?: ((payload: any) => void) | null | undefined;
			/**
			 * The class name of the button. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * Link target attribute when href is set.
			 */
			target?: string;
			/**
			 * Link rel attribute when href is set.
			 */
			rel?: string;
			/**
			 * When set, renders the root element as an anchor instead of a button.
			 */
			as?: 'string';
			/**
			 * Theme overrides for button parts such as prefix and suffix.
			 */
			theme?: ButtonThemeProps;
		} & ButtonForwardedAttributes,
		'suffix' | 'prefix' | 'children'
	>
>;

export type ButtonProps = Omit<ButtonPrimitiveProps, 'as'>;
