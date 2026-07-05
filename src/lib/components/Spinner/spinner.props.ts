import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { Colors, Sizes } from '$lib/types/index.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { SpinnerThemeProps } from './spinner.theme.js';

type SpinnerBaseProps = {
	/**
	 * Bindable reference to the root spinner element.
	 */
	ref?: HTMLElement | null;
	/**
	 * The class name of the spinner. First element that the component outputs in the DOM.
	 */
	class?: string;
	/**
	 * Size token controlling the indicator dimension and label typography.
	 */
	size?: Sizes;
	/**
	 * Color token applied to the indicator.
	 */
	color?: Colors;
	/**
	 * Visible text rendered after the indicator. Ignored when `children` is provided.
	 */
	text?: Slot;
	/**
	 * Accessible label used when no visible text is rendered.
	 */
	label?: string;
	/**
	 * When true, marks the spinner as decorative and removes status semantics.
	 */
	decorative?: boolean;
	/**
	 * Theme overrides for the spinner, indicator, and label parts.
	 */
	theme?: SpinnerThemeProps;
};

export type SpinnerProps = WithAttachments<WithSlot<SpinnerBaseProps, 'children'>>;
