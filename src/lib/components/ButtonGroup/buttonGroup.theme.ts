import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultButtonGroup = cva({
	base: 'flex items-center  first-child:rounded-r-none last-child:rounded-l-none not-first-not-last-child:rounded-none not-first-not-last-child:border-l-none not-first-not-last-child:border-r-none first-child:border-r-none last-child:border-l-none'
});

export const buttonGroupTheme = {
	buttonGroup: defaultButtonGroup
};

export type ButtonGroupTheme = typeof buttonGroupTheme;
export type ButtonGroupThemeProps = InferComponentTheme<ButtonGroupTheme>;
export const setButtonGroupTheme = setComponentTheme<ButtonGroupTheme>('buttonGroup');
export const useButtonGroupTheme = useComponentTheme('buttonGroup', buttonGroupTheme);

