import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInput = cva({
	base: 'py-1 outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none  autofill:text-contrast-light',
	variants: {
		size: {
			small: 'text-xs placeholder:text-xs',
			normal: 'text-sm placeholder:text-sm',
			large: 'text-base placeholder:text-base'
		},
		hasValue: {
			true: 'placeholder:text-contrast',
			false: 'placeholder:text-contrast-muted'
		}
	}
});

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-primary  ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'h-4',
			normal: 'h-6',
			large: 'h-8'
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
