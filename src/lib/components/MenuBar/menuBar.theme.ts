import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultMenuBar = cva({
	base: 'bg-background inline-flex w-fit max-w-full items-center overflow-x-auto rounded-lg scrollbar-none',
	variants: {
		size: {
			small: 'gap-0.5 p-0.5',
			normal: 'gap-0.5 p-1',
			large: 'gap-1 p-1'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMenuBarTrigger = cva({
	base: 'focus-visible:ring-inset',
	variants: {
		active: {
			true: 'bg-background-muted text-foreground',
			false: ''
		}
	},
	defaultVariants: {
		active: false
	}
});

export const menuBarTheme = {
	root: defaultMenuBar,
	trigger: defaultMenuBarTrigger
};

export type MenuBarTheme = typeof menuBarTheme;
export type MenuBarThemeProps = InferComponentTheme<MenuBarTheme>;
export const setMenuBarTheme = setComponentTheme<MenuBarTheme>('menuBar');
export const useMenuBarTheme = useComponentTheme<MenuBarTheme>('menuBar', menuBarTheme);
