import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultHoverCardTrigger = cva({
	base: 'inline-flex w-fit max-w-full outline-none',
	variants: {
		disabled: {
			true: 'pointer-events-none opacity-55',
			false: null
		}
	},
	defaultVariants: {
		disabled: false
	}
});

const defaultHoverCardPopover = cva({
	base: 'bg-transparent p-0 shadow-none ring-0'
});

const defaultHoverCardCard = cva({
	base: 'max-w-[calc(100vw-2rem)]',
	variants: {
		size: {
			small: 'w-64',
			normal: 'w-72',
			large: 'w-96'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const hoverCardTheme = {
	trigger: defaultHoverCardTrigger,
	popover: defaultHoverCardPopover,
	card: defaultHoverCardCard
};

export type HoverCardTheme = typeof hoverCardTheme;
export type HoverCardThemeProps = InferComponentTheme<HoverCardTheme>;
export const setHoverCardTheme = setComponentTheme<HoverCardTheme>('hover-card');
export const useHoverCardTheme = useComponentTheme<HoverCardTheme>('hover-card', hoverCardTheme);
