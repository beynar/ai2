import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultButton = cva({
	base: 'group/toggle relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-lg border border-transparent bg-clip-padding text-sm font-medium outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/35 [&_svg:not([class*=size-])]:size-4',
	variants: {
		checked: {
			true: '',
			false: null
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed pointer-events-none',
			false: null
		},
		color: {
			background: 'focus-visible:ring-foreground/25',
			primary: '',
			secondary: '',
			foreground: 'focus-visible:ring-foreground/25',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		variant: {
			outline:
				'state-layer border-color/35 bg-transparent text-color-readable hover:border-color/50',
			ghost: 'state-layer border-transparent bg-transparent text-color-readable'
		},
		squared: {
			true: 'aspect-square !px-0',
			false: null
		},
		size: {
			small: 'h-7 min-w-7 px-2.5 gap-1 text-xs',
			normal: 'h-8 min-w-8 px-2.5 gap-1 text-sm',
			large: 'h-9 min-w-9 px-2.5 gap-1 text-sm'
		}
	},
	defaultVariants: {
		checked: false
	},
	compoundVariants: [
		{
			variant: 'ghost',
			checked: true,
			class: 'bg-color/20'
		},
		{
			variant: 'outline',
			checked: true,
			class: 'bg-color/20'
		},
		{
			variant: 'outline',
			checked: true,
			class: 'border-color/55 hover:border-color/70'
		},
		{
			color: 'background',
			checked: false,
			class: '!bg-transparent text-foreground'
		},
		{
			color: 'background',
			checked: true,
			class: '!bg-background-lighter/70 text-foreground'
		},
		{
			color: 'foreground',
			checked: false,
			class: '!bg-transparent text-foreground'
		},
		{
			color: 'foreground',
			checked: true,
			class: '!bg-foreground/16 text-foreground'
		},
		{
			variant: 'outline',
			color: 'background',
			checked: [true, false],
			class: '!border-background-muted hover:!border-background-muted'
		},
		{
			variant: 'outline',
			color: 'foreground',
			checked: false,
			class: '!border-foreground/20 hover:!border-foreground/30'
		},
		{
			variant: 'outline',
			color: 'foreground',
			checked: true,
			class: '!border-foreground/35 hover:!border-foreground/45'
		}
	]
});

const defaultToggleButtonPrefix = cva({
	base: 'inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full',
	variants: {
		size: {
			normal: 'size-4',
			large: 'size-5',
			small: 'size-3.5'
		},
		checked: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultToggleButtonSuffix = cva({
	base: 'inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full',
	variants: {
		size: {
			normal: 'size-4',
			large: 'size-5',
			small: 'size-3.5'
		},
		checked: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const toggleButtonTheme = {
	root: defaultButton,
	prefix: defaultToggleButtonPrefix,
	suffix: defaultToggleButtonSuffix
};

export type ToggleButtonTheme = typeof toggleButtonTheme;
export type ToggleButtonThemeProps = InferComponentTheme<ToggleButtonTheme>;
export const setToggleButtonTheme = setComponentTheme<ToggleButtonTheme>('toggleButton');
export const useToggleButtonTheme = useComponentTheme<ToggleButtonTheme>(
	'toggleButton',
	toggleButtonTheme
);
