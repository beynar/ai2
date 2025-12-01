import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
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

export const menuTheme = {
	menu: defaultMenu
};

export type MenuTheme = typeof menuTheme;

export type MenuThemeProps = InferComponentTheme<typeof menuTheme> & {
	button?: ButtonThemeProps;
	option?: MenuOptionThemeProps;
	separator?: SeparatorThemeProps;
	submenu?: MenuOptionThemeProps;
};

export const setMenuTheme = setComponentTheme<MenuTheme>('menu');
export const useMenuTheme = useComponentTheme<MenuTheme>('menu', menuTheme);
