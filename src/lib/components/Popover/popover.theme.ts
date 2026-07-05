import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// The portaled positioning wrapper (fixed, placed by floating-ui). Resets <dialog> defaults so
// it's an invisible box hugging the panel; the panel inside carries the visuals + transition.
const defaultPopoverContainer = cva({
	base: 'fixed top-0 left-0 z-[+50] m-0 h-fit w-fit border-none bg-transparent p-0 outline-none'
});

// The visible, animated panel.
const defaultPopover = cva({
	base: 'ring-foreground/10 bg-background isolate h-fit w-fit rounded-lg text-sm shadow-md ring-1',
	variants: {
		size: {
			small: 'max-w-3xs w-full p-1',
			normal: 'max-w-xs w-full p-2.5',
			large: 'max-w-sm w-full p-4'
		}
	}
});

export const popoverTheme = {
	root: defaultPopoverContainer,
	popover: defaultPopover
};

export type PopoverTheme = typeof popoverTheme;
export type PopoverThemeProps = InferComponentTheme<PopoverTheme>;
export const setPopoverTheme = setComponentTheme<PopoverTheme>('popover');
export const usePopoverTheme = useComponentTheme<PopoverTheme>('popover', popoverTheme);
