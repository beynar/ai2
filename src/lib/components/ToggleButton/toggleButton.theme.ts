import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultButton = cva({
	base: 'group/toggle inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap relative overflow-hidden cursor-pointer rounded-lg border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all duration-100 ease-in-out focus-visible:ring-2 focus-visible:ring-color/50 active:translate-y-px [&_svg:not([class*=size-])]:size-4',
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
			background: '',
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		variant: {
			outline: 'bg-color/0 border-color text-color-readable active:bg-color/20 checked:bg-color/20',
			soft: 'text-color-muted-readable bg-color-muted active:bg-color/30 checked:bg-color/30',
			ghost: 'text-color-readable bg-color/0 active:bg-color/20 checked:bg-color/20'
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
			checked: false,
			class: 'hover:bg-color/10'
		},
		{
			variant: 'soft',
			checked: false,
			class: 'hover:bg-color/20'
		},
		{
			variant: 'ghost',
			checked: false,
			class: 'hover:bg-color-muted'
		},
		{
			variant: 'soft',
			color: 'background',
			checked: false,
			class: '!bg-background hover:!bg-background-light text-foreground'
		},
		{
			variant: 'soft',
			color: 'background',
			checked: true,
			class: '!bg-background-muted text-foreground'
		},
		{
			variant: 'ghost',
			color: 'background',
			checked: false,
			class: 'hover:!bg-background-lighter/20 active:!bg-background-lighter/30 text-foreground'
		},
		{
			variant: 'ghost',
			color: 'background',
			checked: true,
			class: '!bg-background-lighter/30 text-foreground'
		},
		{
			variant: 'outline',
			color: 'background',
			checked: false,
			class:
				'hover:!bg-background-lighter/20 active:!bg-background-lighter/30 border-background-lighter text-foreground'
		},
		{
			variant: 'outline',
			color: 'background',
			checked: true,
			class: '!bg-background-lighter/30 border-background-lighter text-foreground'
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
