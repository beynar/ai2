import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultButton = cva({
	base: 'rounded focus:ring-1 focus:ring-color focus:ring-offset-1 ring-offset-surface cursor-pointer inline-flex whitespace-nowrap items-center justify-center relative transition-all duration-100 ease-in-out transform-origin-center overflow-hidden outline-none text-sm leading-[1.5rem]',
	variants: {
		size: {
			small: 'px-2.5 py-1 text-sm gap-1.5 leading-4',
			normal: 'px-4 py-1  text-base gap-2 leading-5',
			large: 'px-5.5 py-1 text-md gap-2.5 leading-6'
		},
		color: {
			surface: 'bg-surface-dark text-color-fg',
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			danger: 'bg-danger text-danger-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg'
		},
		variant: {
			solid: 'bg-color text-color-fg hover:bg-color/90 active:bg-color/80',
			outline: 'bg-color/0 border border-color hover:bg-color/10 text-color active:bg-color/20',
			soft: 'text-color hover:bg-color/30  bg-color-muted active:bg-color/20',
			ghost: 'text-color hover:bg-color-muted bg-color/0 active:bg-color-muted/70',
			link: 'bg-transparent hover:bg-opacity-60 text-color hover:underline active:bg-color-muted/60'
		},
		loading: {
			true: 'cursor-default pointer-events-none',
			false: null
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed',
			false: null
		},
		squared: {
			true: 'p-1 aspect-square',
			false: null
		},
		fullWidth: {
			true: '!w-full flex-1 flex-[0_0_100%] max-w-full'
		}
	},
	defaultVariants: {
		color: 'contrast',
		variant: 'solid',
		size: 'normal'
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-muted text-contrast hover:bg-surface-lighter'
		},
		{
			color: 'surface',
			variant: 'solid',
			class: 'active:bg-surface-light'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg hover:bg-surface-light'
		},
		{
			color: 'contrast',
			variant: 'ghost',
			class: 'hover:bg-contrast-muted/20 active:bg-contrast-muted/20'
		},
		{
			color: 'surface',
			variant: 'ghost',
			class: 'active:bg-surface-muted/10 text-surface-muted hover:bg-surface-muted/20'
		},
		{
			color: 'contrast',
			variant: 'link',
			class: 'active:bg-contrast-muted/10 text-contrast'
		},
		{
			color: 'surface',
			variant: 'link',
			class: 'active:bg-surface-muted/10 text-surface-muted'
		}
	]
});

const defaultButtonPrefix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultButtonSuffix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const buttonTheme = {
	button: defaultButton,
	prefix: defaultButtonPrefix,
	suffix: defaultButtonSuffix
};

export type ButtonTheme = typeof buttonTheme;
export type ButtonThemeProps = InferComponentTheme<ButtonTheme>;
export const setButtonTheme = setComponentTheme<ButtonTheme>('button');
export const useButtonTheme = useComponentTheme('button', buttonTheme);
