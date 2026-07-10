import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none autofill:text-foreground-light appearance-none text-sm leading-normal',
	variants: {
		size: {
			small: 'text-xs placeholder:text-xs h-5',
			normal: 'text-sm placeholder:text-sm h-5',
			large: 'text-sm placeholder:text-sm h-6'
		},
		hasValue: {
			true: 'placeholder:text-foreground',
			false: 'placeholder:text-foreground-muted'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultInputContainer = cva({
	base: 'px-3 bg-background-light border border-background-muted rounded text-foreground w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex items-center py-2',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-1.5 text-sm',
			large: 'py-2 text-sm'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultLoading = cva({
	base: 'text-foreground-muted p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

const defaultError = cva({
	base: 'text-danger p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

const defaultNoOptions = cva({
	base: 'text-foreground-muted p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

export const comboboxTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	loading: defaultLoading,
	error: defaultError,
	noOptions: defaultNoOptions
};

export type ComboboxTheme = typeof comboboxTheme;
export type ComboboxThemeProps = InferComponentTheme<ComboboxTheme>;
export const setComboboxTheme = setComponentTheme<ComboboxTheme>('combobox');
export const useComboboxTheme = useComponentTheme('combobox', comboboxTheme);
