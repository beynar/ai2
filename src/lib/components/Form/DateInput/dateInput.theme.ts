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
	base: 'w-[18rem] max-w-[calc(100vw-2rem)] p-0'
});

export const dateInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	popover: defaultPopover
};

export type DateInputTheme = typeof dateInputTheme;
export type DateInputThemeProps = InferComponentTheme<DateInputTheme>;
export const setDateInputTheme = setComponentTheme<DateInputTheme>('dateInput');
export const useDateInputTheme = useComponentTheme('dateInput', dateInputTheme);
