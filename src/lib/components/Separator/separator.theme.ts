import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultSeparator = cva({
	base: 'relative flex items-center text-contrast/70 text-xs text-center',
	variants: {
		orientation: {
			horizontal:
				'w-full my-2 before:flex-1 before:border-t before:[border-top-width:var(--separator-border-width,1px)] after:flex-1 after:border-t after:[border-top-width:var(--separator-border-width,1px)] [&:has(*)]:before:mr-2 [&:has(*)]:after:ml-2',
			vertical:
				'h-full mx-2 flex-col before:flex-1 before:border-l before:[border-width:var(--separator-border-width,1px)] after:flex-1 after:border-l after:[border-width:var(--separator-border-width,1px)] [&:has(*)]:before:mb-2 [&:has(*)]:after:mt-2'
		},
		color: {
			primary: 'before:border-primary after:border-primary',
			secondary: 'before:border-secondary after:border-secondary',
			contrast: 'before:border-contrast after:border-contrast',
			surface: 'before:border-surface-muted after:border-surface-muted',
			danger: 'before:border-danger after:border-danger',
			success: 'before:border-success after:border-success',
			warning: 'before:border-warning after:border-warning',
			info: 'before:border-info after:border-info'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		color: 'surface'
	}
});

const defaultSeparatorLabel = cva({
	base: 'whitespace-nowrap text-[0.75rem] leading-tight flex-shrink-0',
	variants: {
		orientation: {
			horizontal: '',
			vertical: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export const separatorTheme = {
	separator: defaultSeparator,
	label: defaultSeparatorLabel
};

export type SeparatorTheme = typeof separatorTheme;
export type SeparatorThemeProps = InferComponentTheme<SeparatorTheme>;
export const setSeparatorTheme = setComponentTheme<SeparatorTheme>('separator');
export const useSeparatorTheme = useComponentTheme('separator', separatorTheme);
