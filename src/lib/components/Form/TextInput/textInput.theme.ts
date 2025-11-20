import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInput = cva({
	base: 'outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none placeholder:text-contrast-muted autofill:text-contrast-light',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-primary  ring-0 transition-all p-1',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const textInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer
};

export type TextInputTheme = typeof textInputTheme;
export type TextInputThemeProps = InferComponentTheme<TextInputTheme>;
export const setTextInputTheme = setComponentTheme<TextInputTheme>('textInput');
export const useTextInputTheme = useComponentTheme('textInput', textInputTheme);
