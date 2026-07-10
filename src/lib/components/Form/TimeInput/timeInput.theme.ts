import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none placeholder:text-foreground-muted autofill:text-foreground-light appearance-none text-sm leading-normal',
	variants: {
		size: {
			small: 'text-xs h-5',
			normal: 'text-sm h-5',
			large: 'text-sm h-6'
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
		size: 'normal'
	}
});

const defaultPopover = cva({
	base: 'w-48 max-w-[calc(100vw-2rem)]'
});

const defaultPicker = cva({
	base: 'grid w-full grid-cols-2 gap-2'
});

const defaultPickerColumn = cva({
	base: 'min-w-0'
});

const defaultPickerLabel = cva({
	base: 'text-foreground-muted px-1.5 pb-1 font-medium',
	variants: {
		size: {
			small: 'text-[0.6875rem]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPickerScrollArea = cva({
	base: 'flex max-h-44 flex-col'
});

const defaultPickerOption = cva({
	base: 'w-full rounded font-mono text-center tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary',
	variants: {
		size: {
			small: 'px-1.5 py-1 text-xs',
			normal: 'px-2 py-1 text-sm',
			large: 'px-2 py-1.5 text-sm'
		},
		selected: {
			true: 'bg-primary text-primary-contrast',
			false: 'text-foreground hover:bg-background-muted'
		}
	},
	defaultVariants: {
		size: 'normal',
		selected: false
	}
});

export const timeInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	popover: defaultPopover,
	picker: defaultPicker,
	pickerColumn: defaultPickerColumn,
	pickerLabel: defaultPickerLabel,
	pickerScrollArea: defaultPickerScrollArea,
	pickerOption: defaultPickerOption
};

export type TimeInputTheme = typeof timeInputTheme;
export type TimeInputThemeProps = InferComponentTheme<TimeInputTheme>;
export const setTimeInputTheme = setComponentTheme<TimeInputTheme>('timeInput');
export const useTimeInputTheme = useComponentTheme('timeInput', timeInputTheme);
