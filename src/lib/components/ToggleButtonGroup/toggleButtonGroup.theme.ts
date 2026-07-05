import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultToggleButtonGroup = cva({
	base: 'flex items-center',
	variants: {
		joined: {
			// Segmented control, nova-style: square inner corners, drop the left border of
			// non-first segments (single 1px divider for outline, no background overlap for
			// tinted variants), tighten item padding, lift the focused segment's ring, and
			// disable the per-button press-translate.
			true: 'first-child:rounded-r-none last-child:rounded-l-none not-first-not-last-child:rounded-none not-first-child:border-l-0 [&>button]:px-2 [&>*:focus-visible]:z-10 [&>*]:active:translate-y-0',
			false: 'gap-1'
		}
	},
	defaultVariants: {
		joined: false
	}
});

export const toggleButtonGroupTheme = {
	root: defaultToggleButtonGroup
};

export type ToggleButtonGroupTheme = typeof toggleButtonGroupTheme;
export type ToggleButtonGroupThemeProps = InferComponentTheme<ToggleButtonGroupTheme>;
export const setToggleButtonGroupTheme =
	setComponentTheme<ToggleButtonGroupTheme>('toggleButtonGroup');
export const useToggleButtonGroupTheme = useComponentTheme<ToggleButtonGroupTheme>(
	'toggleButtonGroup',
	toggleButtonGroupTheme
);
