import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

export const defaultPopover = cva({
	base: 'z-[+50] fixed bg-surface-light w-fit rounded-large raised isolate h-fit ',
	variants: {
		size: {
			small: 'max-w-3xs w-full p-2',
			normal: 'max-w-xs w-full p-3',
			large: 'max-w-sm w-full p-4'
		}
	}
});

export const popoverTheme = {
	popover: defaultPopover
};

export type PopoverTheme = typeof popoverTheme;
export type PopoverThemeProps = InferComponentTheme<PopoverTheme>;
export const setPopoverTheme = setComponentTheme<PopoverTheme>('popover');
export const usePopoverTheme = useComponentTheme('popover', popoverTheme);
