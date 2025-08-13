import type { Snippet } from 'svelte';
import type { FieldValue } from '../Field/field.js';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type { TextInputProps } from '../TextInput/textInput.js';
import { cva } from '$lib/utils/cva.js';
import type { TextAreaProps } from '../TextArea/textArea.js';
import type { SelectProps } from '../Select/select.js';

export type MaybePromise<T> = T | Promise<T>;

export type FormInputs = Record<string, FormInput>;

export type FormInput =
	| ({
			type: 'text' | 'email' | 'url';
	  } & TextInputProps)
	| ({
			type: 'password';
	  } & TextInputProps)
	| ({
			type: 'textarea';
	  } & TextAreaProps)
	| ({
			type: 'select';
	  } & SelectProps);

// | ({
// 		type: 'switch';
//   } & SwitchInputProps)
// | ({
// 		type: 'textarea';
//   } & TextAreaProps)
// | ({
// 		type: 'select';
//   } & SelectProps<BaseOption>)
// | ({
// 		type: 'color';
//   } & ColorInputProps)
// | ({
// 		type: 'tag';
//   } & TagInputProps)
// | ({
// 		type: 'date' | 'datetime';
//   } & DateInputProps)
// | ({
// 		type: CalendarType;
//   } & CalendarProps<any, CalendarType>)
// | ({
// 		type: 'number';
//   } & NumberInputProps)
// | ({
// 		type: 'file';
//   } & FileInputProps<'file'>)
// | ({
// 		type: 'files';
//   } & FileInputProps<'files'>)
// | ({
// 		type: 'radios';
//   } & RadiosInputProps)
// | ({
// 		type: 'checkboxes';
//   } & CheckBoxesInputProps);

type FormState<T extends FormInputs> = {
	[K in keyof T]: T[K] extends FormInput ? FieldState<T[K]['type']> : never;
};

export type InferFormValue<T extends FormInputs> = {
	[K in keyof T]: T[K]['required'] extends true
		? NonNullable<FieldValue<T[K]['type']>>
		: FieldValue<T[K]['type']> | null;
};

export type FormSubmitHandler<T extends FormInputs> = (
	value: InferFormValue<T>
) => MaybePromise<any | void>;

export type FormProps<
	I extends FormInputs,
	S extends FormSubmitHandler<I> = FormSubmitHandler<I>
> = {
	inputs: I;
	onSubmit?: S;
	value?: InferFormValue<I>;
	children?: Snippet<[FormState<I>]>;
	// Bindable
	form?: FormState<I>;
	class?: string;
};

const defaultForm = cva({
	// The 'base' property defines the default CSS classes for the form layout:
	// - 'grid': applies CSS grid layout to the form container.
	// - 'gap-4': sets a consistent gap (spacing) of 1rem between grid items.
	// - 'grid-cols-2': creates two columns in the grid.
	// - '[&>div:not(.col-span-2)]:col-span-2': by default, all direct child <div> elements
	//    that do NOT already have the 'col-span-2' class will span both columns (col-span-2).
	//    This ensures that form fields are full-width unless explicitly overridden.
	base: `grid gap-y-4 gap-x-2 grid-cols-2 [&>div:not(.col-span-1)]:col-span-2`,
	variants: {
		size: {
			small: `gap-2`,
			normal: `gap-4`,
			large: `gap-6`
		}
	}
});

export const formTheme = {
	form: defaultForm
};
