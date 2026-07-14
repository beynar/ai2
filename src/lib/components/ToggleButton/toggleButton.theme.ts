import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultButton = cva({
	base: 'group/toggle relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-lg border border-transparent bg-clip-padding text-sm font-medium outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-color/35 [&_svg:not([class*=size-])]:size-4',
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
				'border-color/35 bg-transparent text-color-readable hover:border-color/50 hover:bg-color/8 active:bg-color/12',
			soft: 'border-transparent bg-color/8 text-color-readable hover:bg-color/12 active:bg-color/16',
			ghost:
				'border-transparent bg-transparent text-color-readable hover:bg-color/8 active:bg-color/12'
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
			variant: 'outline',
			checked: true,
			class:
				'border-color/55 bg-color/12 hover:border-color/70 hover:bg-color/16 active:bg-color/20'
		},
		{
			variant: 'soft',
			checked: true,
			class: 'bg-color/14 hover:bg-color/18 active:bg-color/22'
		},
		{
			variant: 'ghost',
			checked: true,
			class: 'bg-color/10 hover:bg-color/14 active:bg-color/18'
		},
		{
			variant: 'outline',
			color: 'background',
			checked: false,
			class:
				'!border-background-muted !bg-transparent text-foreground hover:!border-background-muted hover:!bg-background-lighter/50 active:!bg-background-lighter/70'
		},
		{
			variant: 'outline',
			color: 'background',
			checked: true,
			class:
				'!border-background-muted !bg-background-lighter/70 text-foreground hover:!bg-background-muted/70 active:!bg-background-muted'
		},
		{
			variant: 'soft',
			color: 'background',
			checked: false,
			class:
				'!bg-background-light/70 text-foreground hover:!bg-background-lighter active:!bg-background-muted/70'
		},
		{
			variant: 'soft',
			color: 'background',
			checked: true,
			class:
				'!bg-background-lighter text-foreground hover:!bg-background-muted/70 active:!bg-background-muted'
		},
		{
			variant: 'ghost',
			color: 'background',
			checked: false,
			class:
				'!bg-transparent text-foreground hover:!bg-background-light/70 active:!bg-background-lighter'
		},
		{
			variant: 'ghost',
			color: 'background',
			checked: true,
			class:
				'!bg-background-lighter/70 text-foreground hover:!bg-background-muted/60 active:!bg-background-muted/80'
		},
		{
			variant: 'outline',
			color: 'foreground',
			checked: false,
			class:
				'!border-foreground/20 !bg-transparent text-foreground hover:!border-foreground/30 hover:!bg-foreground/5 active:!bg-foreground/8'
		},
		{
			variant: 'outline',
			color: 'foreground',
			checked: true,
			class:
				'!border-foreground/35 !bg-foreground/10 text-foreground hover:!border-foreground/45 hover:!bg-foreground/14 active:!bg-foreground/18'
		},
		{
			variant: 'soft',
			color: 'foreground',
			checked: false,
			class: '!bg-foreground/5 text-foreground hover:!bg-foreground/8 active:!bg-foreground/12'
		},
		{
			variant: 'soft',
			color: 'foreground',
			checked: true,
			class: '!bg-foreground/10 text-foreground hover:!bg-foreground/14 active:!bg-foreground/18'
		},
		{
			variant: 'ghost',
			color: 'foreground',
			checked: false,
			class: '!bg-transparent text-foreground hover:!bg-foreground/5 active:!bg-foreground/8'
		},
		{
			variant: 'ghost',
			color: 'foreground',
			checked: true,
			class: '!bg-foreground/8 text-foreground hover:!bg-foreground/12 active:!bg-foreground/16'
		}
	]
});

const defaultToggleButtonPrefix = cva({
	base: 'max-w-4 max-h-4',
	variants: {
		size: {
			normal: 'max-w-4 max-h-4',
			large: 'max-w-5 max-h-5',
			small: 'max-w-3.5 max-h-3.5'
		},
		checked: {
			true: '',
			false: ''
		}
	}
});

const defaultToggleButtonSuffix = cva({
	base: 'max-w-4 max-h-4',
	variants: {
		size: {
			normal: 'max-w-4 max-h-4',
			large: 'max-w-5 max-h-5',
			small: 'max-w-3.5 max-h-3.5'
		},
		checked: {
			true: '',
			false: ''
		}
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
