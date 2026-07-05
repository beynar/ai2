import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultSwitchToggle = cva({
	base: 'relative inline-flex shrink-0 border cursor-pointer items-center rounded-full transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-md',
	variants: {
		checked: {
			true: 'bg-primary-light border-primary shadow-sm',
			false: 'bg-background-light border-background-muted border '
		},
		size: {
			small: 'h-[20px] w-[36px]',
			normal: 'h-[24px] w-[44px]',
			large: 'h-[28px] w-[52px]'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50 hover:shadow-none',
			false: ''
		}
	}
});

const defaultSwitchThumb = cva({
	base: 'pointer-events-none block rounded-full shadow-lg ring-0 transition-all duration-200 ease-in-out transform',
	variants: {
		checked: {
			true: 'border-primary border bg-background',
			false: 'bg-background-lighter border-background-muted border'
		},
		size: {
			small: 'h-4 w-4',
			normal: 'h-5 w-5',
			large: 'h-6 w-6'
		}
	},
	compoundVariants: [
		// Small size translations
		{
			size: 'small',
			checked: false,
			class: '-translate-x-0.5'
		},
		{
			size: 'small',
			checked: true,
			class: 'translate-x-4'
		},
		// Normal size translations
		{
			size: 'normal',
			checked: false,
			class: '-translate-x-0.5'
		},
		{
			size: 'normal',
			checked: true,
			class: 'translate-x-5'
		},
		// Large size translations
		{
			size: 'large',
			checked: false,
			class: '-translate-x-0.5'
		},
		{
			size: 'large',
			checked: true,
			class: 'translate-x-6'
		}
	]
});

const defaultSwitchContainer = cva({
	base: 'flex items-center gap-4 justify-start select-none px-0',
	variants: {
		size: {
			small: 'gap-2',
			normal: 'gap-4',
			large: 'gap-6'
		},
		disabled: {
			true: 'opacity-50',
			false: ''
		}
	}
});

export const switchTheme = {
	toggle: defaultSwitchToggle,
	thumb: defaultSwitchThumb,
	inputContainer: defaultSwitchContainer
};

export type SwitchTheme = typeof switchTheme;
export type SwitchThemeProps = InferComponentTheme<SwitchTheme>;
export const setSwitchTheme = setComponentTheme<SwitchTheme>('switch');
export const useSwitchTheme = useComponentTheme('switch', switchTheme);
