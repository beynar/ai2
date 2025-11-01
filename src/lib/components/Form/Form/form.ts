import type { Snippet } from 'svelte';
import type { FieldValue } from '../Field/field.js';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type { TextInputProps } from '../TextInput/textInput.js';
import type { NumberInputProps } from '../NumberInput/numberInput.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { TextAreaProps } from '../TextArea/textArea.js';
import type { SelectProps } from '../Select/select.js';
import type { ComboboxProps } from '../Combobox/combobox.props.js';
import type { RadioInputProps } from '../RadioInput/radioInput.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { CheckBoxesInputProps } from '../CheckboxesInput/checkBoxesInput.def.js';
import type { SwitchInputProps } from '../Switch/switch.js';
import type { FormState as FS } from './formState.svelte.js';
import type { PhoneInputProps } from '../PhoneInput/phoneInput.js';
import type { CalendarInputProps } from '../Calendar/calendarInput.js';
import type { DateInputProps } from '../DateInput/dateInput.js';
import type { FileInputProps } from '../File/fileInput.js';
import type { TimeInputProps } from '../TimeInput/timeInput.def.js';
import type { ButtonProps } from '$lib/components/Button/button.js';
export type MaybePromise<T> = T | Promise<T>;

// Base FormInput type without dynamic visibility
type BaseFormInput =
	| ({
			type: 'time';
	  } & TimeInputProps)
	| ({
			type: 'phone';
	  } & PhoneInputProps)
	| ({
			type: 'number';
	  } & NumberInputProps)
	| ({
			type: 'calendar' | 'calendar-range';
	  } & CalendarInputProps<'calendar' | 'calendar-range'>)
	| ({
			type: 'date' | 'datetime';
	  } & DateInputProps)
	| ({
			type: 'text' | 'email' | 'url';
	  } & TextInputProps)
	| ({
			type: 'password';
	  } & TextInputProps)
	| ({
			type: 'number';
	  } & NumberInputProps)
	| ({
			type: 'textarea';
	  } & TextAreaProps)
	| ({
			type: 'select';
	  } & SelectProps)
	| ({
			type: 'combobox';
	  } & ComboboxProps)
	| ({
			type: 'radio';
	  } & RadioInputProps)
	| ({
			type: 'checkboxes';
	  } & CheckBoxesInputProps)
	| ({
			type: 'switch';
	  } & SwitchInputProps)
	| ({
			type: 'file';
	  } & FileInputProps<'single'>)
	| ({
			type: 'files';
	  } & FileInputProps<'multiple'>);

// FormInput with dynamic visibility support
// The visibility property can be a boolean or a function that receives the form value
export type FormInput = BaseFormInput extends infer T
	? T extends { visible?: boolean }
		? Omit<T, 'visible'> & {
				visible?: boolean | ((value: Record<string, any>) => boolean);
			}
		: T
	: never;

export type FormInputs = Record<string, FormInput>;
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
//   } & RadioInputProps)
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

export type FormProps<I extends FormInputs> = WithSlot<
	{
		inputs: I;
		onSubmit?: FormSubmitHandler<I>;
		value?: InferFormValue<I>;
		children?: Snippet<[form: FS<I>]>;
		// Bindable
		form?: FS<I>;
		class?: string;
		theme?: InferComponentTheme<typeof formTheme>;
		submitButton?: ButtonProps | null;
	},
	'header' | 'title' | 'description' | 'footer',
	[FS<I>]
>;

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
	base: 'text-lg font-bold text-contrast'
});

const defaultFormDescription = cva({
	base: 'text-base text-contrast-muted'
});

export const formTheme = {
	form: defaultForm,
	formHeader: defaultFormHeader,
	formTitle: defaultFormTitle,
	formDescription: defaultFormDescription
};
