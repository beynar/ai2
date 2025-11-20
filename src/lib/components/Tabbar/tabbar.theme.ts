import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultTabbar = cva({
	base: 'flex w-full',
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col w-fit'
		},
		alignment: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end'
		},
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		},
		fullWidth: {
			true: 'w-full',
			false: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		alignment: 'start',
		size: 'normal'
	}
});

const defaultTab = cva({
	base: 'rounded relative cursor-pointer inline-flex items-center justify-center relative transition-all duration-150 ease-in-out outline-none whitespace-nowrap text-contrast/70',
	variants: {
		size: {
			small: 'px-2 py-1 text-xs gap-1',
			normal: 'px-3 py-1 text-sm gap-2 ',
			large: 'px-4 py-1 text-base gap-2.5 '
		},
		color: {
			surface: '',
			primary: '',
			secondary: '',
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		active: {
			true: '',
			false: ''
		},
		focused: {
			true: 'bg-surface-muted/50 text-contrast',
			false: ''
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed pointer-events-none',
			false: ''
		},
		orientation: {
			horizontal: '',
			vertical: 'w-full'
		},
		position: {
			top: '',
			bottom: '',
			left: '',
			right: ''
		},
		fullWidth: {
			true: 'w-full',
			false: ''
		}
	},
	defaultVariants: {
		color: 'primary',
		size: 'normal',
		active: false,
		focused: false,
		disabled: false,
		orientation: 'horizontal',
		position: 'top'
	},
	compoundVariants: [
		// Top position (horizontal) - indicator at bottom
		{
			active: true,
			position: 'top',
			class:
				'before:content-["\x82"] before:block before:h-[2px] before:rounded-full before:w-full before:absolute before:bottom-0 before:left-0 before:bg-color'
		},
		// Bottom position (horizontal) - indicator at top
		{
			active: true,
			position: 'bottom',
			class:
				'before:content-["\x82"] before:block before:h-[2px] before:rounded-full before:w-full before:absolute before:top-0 before:left-0 before:bg-color'
		},
		// Left position (vertical) - indicator at right
		{
			active: true,
			position: 'left',
			class:
				'before:content-["\x82"] before:block before:h-full before:w-[2px] before:rounded-full before:absolute before:right-0 before:top-0 before:bg-color'
		},
		// Right position (vertical) - indicator at left
		{
			active: true,
			position: 'right',
			class:
				'before:content-["\x82"] before:block before:h-full before:w-[2px] before:rounded-full before:absolute before:left-0 before:top-0 before:bg-color'
		}
	]
});

const defaultTabPrefix = cva({
	base: '',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultTabSuffix = cva({
	base: '',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const tabbarTheme = {
	tabbar: defaultTabbar,
	tab: defaultTab,
	prefix: defaultTabPrefix,
	suffix: defaultTabSuffix
};

export type TabbarTheme = typeof tabbarTheme;
export type TabbarThemeProps = InferComponentTheme<TabbarTheme>;
export const setTabbarTheme = setComponentTheme<TabbarTheme>('tabbar');
export const useTabbarTheme = useComponentTheme('tabbar', tabbarTheme);
