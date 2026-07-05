import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultForm = cva({
	// The 'base' property defines the default CSS classes for the form layout:
	// - 'grid': applies CSS grid layout to the form container.
	// - 'gap-4': sets a consistent gap (spacing) of 1rem between grid items.
	// - 'grid-cols-2': creates two columns in the grid.
	// - '[&>div:not(.col-span-2)]:col-span-2': by default, all direct child <div> elements
	//    that do NOT already have the 'col-span-2' class will span both columns (col-span-2).
	//    This ensures that form fields are full-width unless explicitly overridden.
	base: `grid gap-y-4 gap-x-2 grid-cols-2 [&>*:not(.col-span-1)]:col-span-2`,
	variants: {
		size: {
			small: `gap-2`,
			normal: `gap-4`,
			large: `gap-6`
		}
	}
});

const defaultFormHeader = cva({
	base: 'flex flex-col gap-2'
});

const defaultFormTitle = cva({
	base: 'text-lg font-bold text-foreground'
});

const defaultFormDescription = cva({
	base: 'text-base text-foreground-muted'
});

export const formTheme = {
	root: defaultForm,
	formHeader: defaultFormHeader,
	formTitle: defaultFormTitle,
	formDescription: defaultFormDescription
};

export type FormTheme = typeof formTheme;
export type FormThemeProps = InferComponentTheme<FormTheme>;
export const setFormTheme = setComponentTheme<FormTheme>('form');
export const useFormTheme = useComponentTheme<FormTheme>('form', formTheme);
