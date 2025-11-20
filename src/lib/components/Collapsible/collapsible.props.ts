import type { Sizes } from '$lib/types/theme.js';
import type { WithSlot, Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { CollapsibleThemeProps } from './collapsible.theme.js';

type CollapsibleBaseProps = {
	ref?: HTMLElement | null;
	/**
	 * The class name of the collapsible container.
	 */
	class?: string;
	/**
	 * Whether the collapsible is open (controlled).
	 */
	open?: boolean;
	/**
	 * Whether the collapsible is open by default (uncontrolled).
	 */
	defaultOpen?: boolean;
	/**
	 * Whether the collapsible is disabled.
	 */
	disabled?: boolean;
	/**
	 * Callback fired when the open state changes.
	 */
	onOpenChange?: ((open: boolean) => void) | null | undefined;
	/**
	 * Size variant of the collapsible.
	 */
	size?: Sizes;
	/**
	 * The icon to display. Can be 'chevron', 'caret', a Slot, or false to hide.
	 */
	icon?: 'chevron' | 'caret' | Slot | false;
	/**
	 * Theme configuration overrides.
	 */
	theme?: CollapsibleThemeProps;
};

type CollapsibleSlotProps = WithSlot<
	CollapsibleBaseProps,
	'trigger' | 'children' | 'icon',
	{ isOpen: boolean }
>;

export type CollapsibleProps = WithAttachments<CollapsibleSlotProps>;
