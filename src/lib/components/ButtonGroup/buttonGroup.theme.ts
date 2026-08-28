import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultButtonGroup = cva({
	// Joined segments: collapse adjacent 1px borders with -ml-px, square inner corners,
	// lift the focused segment so its ring isn't clipped, and disable the per-button
	// press-translate (a single segment sinking looks broken in a group).
	base: 'flex items-center first-child:rounded-r-none last-child:rounded-l-none not-first-not-last-child:rounded-none not-first-child:-ml-px [&>*:focus-visible]:z-10 [&>*]:active:translate-y-0'
});

export const buttonGroupTheme = {
	root: defaultButtonGroup
};

export type ButtonGroupTheme = typeof buttonGroupTheme;
export type ButtonGroupThemeProps = InferComponentTheme<ButtonGroupTheme>;
export const setButtonGroupTheme = setComponentTheme<ButtonGroupTheme>('buttonGroup');
export const useButtonGroupTheme = useComponentTheme<ButtonGroupTheme>(
	'buttonGroup',
	buttonGroupTheme
);
