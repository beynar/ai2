import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultKbd = cva({
	base: 'border-neutral/20 shadow-neutral/20 pointer-events-none inline-flex w-fit items-center justify-center rounded-sm border font-sans font-medium shadow-[0_1px_0] select-none',
	variants: {
		size: {
			small: 'h-4 min-w-4 gap-0.5 px-1 text-[0.625rem] [&_svg:not([class*=size-])]:size-2.5',
			normal: 'h-5 min-w-5 gap-1 px-1 text-xs [&_svg:not([class*=size-])]:size-3',
			large: 'h-6 min-w-6 gap-1 px-1.5 text-sm [&_svg:not([class*=size-])]:size-3.5'
		},
		color: {
			// Neutral keycap; semantic colors resolve through the data-color CSS vars (soft tint).
			neutral: 'bg-color-muted text-color-muted-readable',
			primary: 'bg-color-muted text-color-muted-readable',
			secondary: 'bg-color-muted text-color-muted-readable',
			danger: 'bg-color-muted text-color-muted-readable',
			success: 'bg-color-muted text-color-muted-readable',
			warning: 'bg-color-muted text-color-muted-readable',
			info: 'bg-color-muted text-color-muted-readable'
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'neutral'
	}
});

const defaultKbdGroup = cva({
	base: 'inline-flex items-center',
	variants: {
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultKbdSeparator = cva({
	base: 'text-neutral/60 select-none',
	variants: {
		size: {
			small: 'text-[0.625rem]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const kbdTheme = {
	root: defaultKbd,
	group: defaultKbdGroup,
	separator: defaultKbdSeparator
};

export type KbdTheme = typeof kbdTheme;
export type KbdThemeProps = InferComponentTheme<KbdTheme>;
export const setKbdTheme = setComponentTheme<KbdTheme>('kbd');
export const useKbdTheme = useComponentTheme<KbdTheme>('kbd', kbdTheme);
