import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none autofill:text-contrast-light appearance-none text-sm leading-normal',
	variants: {
		size: {
			small: 'text-xs placeholder:text-xs h-5',
			normal: 'text-sm placeholder:text-sm h-6',
			large: 'text-base placeholder:text-base h-7'
		},
		hasValue: {
			true: 'placeholder:text-contrast',
			false: 'placeholder:text-contrast-muted'
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
		}
	}
});

const defaultLoading = cva({
	base: 'text-contrast-muted p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-2',
			large: 'text-base p-2.5'
		}
	}
});

const defaultError = cva({
	base: 'text-danger p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-2',
			large: 'text-base p-2.5'
		}
	}
});

const defaultNoOptions = cva({
	base: 'text-contrast-muted p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-2',
			large: 'text-base p-2.5'
		}
	}
});

const defaultOption = cva({
	base: 'hover:bg-surface flex w-full cursor-pointer flex-col gap-0.5 rounded p-2 text-left text-sm',
	variants: {
		highlighted: {
			true: 'bg-surface',
			false: ''
		},
		selected: {
			true: '',
			false: ''
		}
	}
});

const defaultOptionLabel = cva({
	base: 'text-sm font-medium',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultOptionDescription = cva({
	base: 'text-contrast-muted text-xs',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-xs',
			large: 'text-sm'
		}
	}
});

export const comboboxTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	loading: defaultLoading,
	error: defaultError,
	noOptions: defaultNoOptions,
	option: defaultOption,
	optionLabel: defaultOptionLabel,
	optionDescription: defaultOptionDescription
};

export type ComboboxTheme = typeof comboboxTheme;
export type ComboboxThemeProps = InferComponentTheme<ComboboxTheme>;
export const setComboboxTheme = setComponentTheme<ComboboxTheme>('combobox');
export const useComboboxTheme = useComponentTheme('combobox', comboboxTheme);
