import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultTextArea = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent text-sm resize-none placeholder:text-foreground-muted autofill:text-foreground-light appearance-none leading-normal',
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
	}
});

const defaultTextAreaContainer = cva({
	base: 'px-2 bg-background-light border border-background-muted rounded text-foreground-light w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'min-h-20',
			normal: 'min-h-24',
			large: 'min-h-32'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	}
});

export const textAreaTheme = {
	input: defaultTextArea,
	inputContainer: defaultTextAreaContainer
};

export type TextAreaTheme = typeof textAreaTheme;
export type TextAreaThemeProps = InferComponentTheme<TextAreaTheme>;
export const setTextAreaTheme = setComponentTheme<TextAreaTheme>('textArea');
export const useTextAreaTheme = useComponentTheme('textArea', textAreaTheme);
