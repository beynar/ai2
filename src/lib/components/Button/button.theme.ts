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
			background: 'bg-background-dark text-color-contrast',
			primary: 'bg-primary text-primary-contrast',
			secondary: 'bg-secondary text-secondary-contrast',
			foreground: 'bg-foreground text-foreground-contrast',
			danger: 'bg-danger text-danger-contrast',
			success: 'bg-success text-success-contrast',
			warning: 'bg-warning text-warning-contrast',
			info: 'bg-info text-info-contrast'
		},
		variant: {
			solid: 'bg-color text-color-contrast hover:bg-color/90 active:bg-color/80',
			outline:
				'bg-color/0 border border-color hover:bg-color/10 text-color-readable active:bg-color/20',
			soft: 'text-color-muted-readable hover:bg-color/30  bg-color-muted active:bg-color/20',
			ghost: 'text-color-readable hover:bg-color-muted bg-color/0 active:bg-color-muted/70',
			link: 'bg-transparent hover:bg-opacity-60 text-color-readable hover:underline active:bg-color-muted/60'
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
			true: '!w-full flex-1 flex-[0_0_100%] max-w-full'
		}
	},
	defaultVariants: {
		color: 'foreground',
		variant: 'solid',
		size: 'normal'
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'outline',
			class: 'border-background-muted text-foreground hover:bg-background-lighter'
		},
		{
			color: 'background',
			variant: 'solid',
			class: 'active:bg-background-light'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'bg-background-lighter text-color-contrast hover:bg-background-light'
		},
		{
			color: 'foreground',
			variant: 'ghost',
			class: 'hover:bg-foreground-muted/20 active:bg-foreground-muted/20'
		},
		{
			color: 'background',
			variant: 'ghost',
			class: 'active:bg-background-muted/10 hover:bg-background-muted/20'
		},
		{
			color: 'foreground',
			variant: 'link',
			class: 'active:bg-foreground-muted/10 text-foreground'
		},
		{
			color: 'background',
			variant: 'link',
			class: 'active:bg-background-muted/10'
		}
	]
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
