import type { Snippet } from 'svelte';
import type { PopoverState } from './popover.state.svelte.js';
import type { ResponsiveProps } from '../Theme/theme.js';
import { cva } from '$lib/utils/cva.js';
import type { ButtonProps } from '../Button/button.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import { type Placement } from '@floating-ui/dom';
import type { WithAttachments } from '$lib/types/props.js';

export type PopoverProps = WithAttachments<{
	id?: string;
	isOpen?: boolean;
	onClose?: (popover: PopoverState) => void;
	onOpen?: (popover: PopoverState) => void;
	size?: ResponsiveProps<'small' | 'normal' | 'large'>;
	offset?: number;
	ref?: HTMLElement | null;
	position?: ResponsiveProps<Placement>;
	openOnClick?: boolean;
	openOnHover?: boolean;
	hoverDelay?: number;
	directedTransition?: boolean;
	transition?: ResponsiveProps<FSOProps>;
	children?: Snippet<[PopoverState]>;
	trigger?: Snippet<[PopoverState]> | (ButtonProps & { content?: string }) | false;
	closeOnClickOutside?: boolean;
	closeOnEscape?: boolean;
	closeOnMouseLeave?: boolean;
	lockScroll?: boolean;
	class?: string;
}>;

export const defaultPopover = cva({
	base: 'z-[+50] fixed bg-surface-light w-fit rounded-large raised isolate h-fit p-4',
	variants: {
		size: {
			small: 'max-w-xs w-full',
			normal: 'max-w-sm w-full',
			large: 'max-w-md w-full'
		}
	}
});

export const popoverTheme = {
	popover: defaultPopover
};
