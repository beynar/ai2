import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultToggleButtonGroup = cva({
	base: 'flex items-center gap-1'
});

export const toggleButtonGroupTheme = {
	buttonGroup: defaultToggleButtonGroup
};

export type ToggleButtonGroupTheme = typeof toggleButtonGroupTheme;
export type ToggleButtonGroupThemeProps = InferComponentTheme<ToggleButtonGroupTheme>;
export const setToggleButtonGroupTheme = setComponentTheme<ToggleButtonGroupTheme>('toggleButtonGroup');
export const useToggleButtonGroupTheme = useComponentTheme('toggleButtonGroup', toggleButtonGroupTheme);

