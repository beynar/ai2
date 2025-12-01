import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot, Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { CardThemeProps } from './card.theme.js';
import type { ButtonProps } from '../Button/button.props.js';

export type CardVariant = 'solid' | 'outline' | 'soft' | 'ghost';

export type CardActionSlot = Slot | Omit<ButtonProps, 'as'>;

type CardBaseProps = {
	ref?: HTMLElement | null;
	/**
	 * The class name of the card. First element that the component outputs in the DOM.
	 */
	class?: string;
	disabled?: boolean;
	color?: Colors;
	variant?: CardVariant;
	size?: Sizes;
	href?: string;
	target?: string;
	rel?: string;
	onClick?: (() => void) | null | undefined;
	onEnter?: (() => void) | null | undefined;
	onLeave?: (() => void) | null | undefined;
	/**
	 * Show subtle borders between sections (header/content, content/footer)
	 * Default: false (borders are hidden by default)
	 */
	showBorders?: boolean;
	theme?: CardThemeProps;
};

type CardSlotProps = WithSlot<
	CardBaseProps,
	'header' | 'title' | 'description' | 'content' | 'footer' | 'children'
>;

export type CardProps = WithAttachments<
	CardSlotProps & {
		action?: CardActionSlot;
	}
>;
