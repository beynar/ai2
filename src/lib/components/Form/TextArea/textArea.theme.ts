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
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultTextAreaContainer = cva({
	base: 'px-3 py-2 bg-background-light border border-background-muted rounded text-foreground w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all',
	variants: {
		size: {
			small: 'min-h-20 py-1.5 text-xs',
			normal: 'min-h-24 py-2 text-sm',
			large: 'min-h-32 py-2.5 text-base'
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

export const textAreaTheme = {
	input: defaultTextArea,
	inputContainer: defaultTextAreaContainer
};

export type TextAreaTheme = typeof textAreaTheme;
export type TextAreaThemeProps = InferComponentTheme<TextAreaTheme>;
export const setTextAreaTheme = setComponentTheme<TextAreaTheme>('textArea');
export const useTextAreaTheme = useComponentTheme('textArea', textAreaTheme);
