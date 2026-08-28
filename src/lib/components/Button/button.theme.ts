import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultButton = cva({
	base: 'group/button inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap relative overflow-hidden cursor-pointer rounded-lg border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all duration-100 ease-in-out focus-visible:ring-2 focus-visible:ring-color/50 active:translate-y-px [&_svg:not([class*=size-])]:size-4',
	variants: {
		size: {
			small: 'h-7 px-2.5 gap-1.5 text-xs',
			normal: 'h-8 px-3.5 gap-2 text-sm',
			large: 'h-9 px-4 gap-2 text-sm'
		},
		color: {
			primary: 'bg-primary text-primary-contrast',
			secondary: 'bg-secondary text-secondary-contrast',
			neutral: 'bg-neutral text-neutral-contrast',
			danger: 'bg-danger text-danger-contrast',
			success: 'bg-success text-success-contrast',
			warning: 'bg-warning text-warning-contrast',
			info: 'bg-info text-info-contrast'
		},
		variant: {
			solid: 'state-layer bg-color text-color-contrast',
			outline: 'state-layer bg-color/0 border border-color text-color-readable',
			soft: 'state-layer text-color-muted-readable bg-color-muted',
			ghost: 'state-layer text-color-readable bg-color/0',
			link: 'bg-transparent text-color-readable hover:underline'
		},
		loading: {
			true: 'cursor-default pointer-events-none',
			false: null
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed pointer-events-none',
			false: null
		},
		squared: {
			true: 'aspect-square !px-0',
			false: null
		},
		fullWidth: {
			true: 'w-full max-w-full'
		}
	},
	defaultVariants: {
		color: 'neutral',
		variant: 'solid',
		size: 'normal'
	},
	compoundVariants: []
});

const defaultButtonPrefix = cva({
	base: 'inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full',
	variants: {
		size: {
			normal: 'size-4',
			large: 'size-5',
			small: 'size-3.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultButtonSuffix = cva({
	base: 'inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full',
	variants: {
		size: {
			normal: 'size-4',
			large: 'size-5',
			small: 'size-3.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const buttonTheme = {
	root: defaultButton,
	prefix: defaultButtonPrefix,
	suffix: defaultButtonSuffix
};

export type ButtonTheme = typeof buttonTheme;
export type ButtonThemeProps = InferComponentTheme<ButtonTheme>;
export const setButtonTheme = setComponentTheme<ButtonTheme>('button');
export const useButtonTheme = useComponentTheme<ButtonTheme>('button', buttonTheme);
