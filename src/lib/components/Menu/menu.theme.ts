import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import type { ButtonThemeProps } from '../Button/button.theme.js';
import type { MenuOptionThemeProps } from '../MenuOption/menuOption.theme.js';
import type { SeparatorThemeProps } from '../Separator/separator.theme.js';

const defaultMenu = cva({
	base: 'flex flex-col w-full',
	variants: {
		gap: {
			none: 'gap-0',
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-2'
		}
	},
	defaultVariants: {
		gap: 'small'
	}
});

const defaultMenuHeader = cva({
	base: ''
});

const defaultMenuFooter = cva({
	base: ''
});

export const menuTheme = {
	root: defaultMenu,
	header: defaultMenuHeader,
	footer: defaultMenuFooter
};

export type MenuTheme = typeof menuTheme;

export type MenuThemeProps = InferComponentTheme<MenuTheme> & {
	button?: ButtonThemeProps;
	option?: MenuOptionThemeProps;
	separator?: SeparatorThemeProps;
	submenu?: MenuOptionThemeProps;
};

export const setMenuTheme = setComponentTheme<MenuTheme>('menu');
export const useMenuTheme = useComponentTheme<MenuTheme>('menu', menuTheme);
