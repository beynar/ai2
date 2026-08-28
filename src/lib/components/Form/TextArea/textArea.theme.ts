import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultTextArea = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent text-sm resize-none placeholder:text-neutral/60 autofill:text-neutral appearance-none leading-normal',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
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
	base: 'w-full items-start rounded border border-neutral-muted bg-surface-raised px-3 py-2 text-neutral ring-0 transition-all focus-within:ring-1 focus-within:ring-primary',
	variants: {
		size: {
			small: 'min-h-20 py-1.5 text-xs',
			normal: 'min-h-20 py-1.5 text-sm',
			large: 'min-h-24 py-2 text-sm'
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
