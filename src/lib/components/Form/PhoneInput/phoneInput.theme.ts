import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none placeholder:text-contrast-muted autofill:text-contrast-light appearance-none text-sm leading-normal',
	variants: {
		size: {
			small: 'text-xs h-5',
			normal: 'text-sm h-6',
			large: 'text-base h-7'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	}
});

const defaultInputContainer = cva({
	base: 'px-3 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex items-center py-2',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-2 text-sm',
			large: 'py-2.5 text-base'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	}
});

export const phoneInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer
};

export type PhoneInputTheme = typeof phoneInputTheme;
export type PhoneInputThemeProps = InferComponentTheme<PhoneInputTheme>;
export const setPhoneInputTheme = setComponentTheme<PhoneInputTheme>('phoneInput');
export const usePhoneInputTheme = useComponentTheme('phoneInput', phoneInputTheme);
