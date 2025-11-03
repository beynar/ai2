import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInput = cva({
	base: 'py-1 outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none placeholder:text-contrast-muted autofill:text-contrast-light',
	variants: {
		size: {
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-lg'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	}
});

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast-light w-full focus-within:ring-1 focus-within:ring-primary  ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'h-4',
			medium: 'h-6',
			large: 'h-8'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	}
});

export const selectTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer
};

export type SelectTheme = typeof selectTheme;
export type SelectThemeProps = InferComponentTheme<SelectTheme>;
export const setSelectTheme = setComponentTheme<SelectTheme>('select');
export const useSelectTheme = useComponentTheme('select', selectTheme);
