import type { FieldValue } from '../Field/field.js';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type { TextInputProps } from '../TextInput/textInput.props.js';
import type { NumberInputProps } from '../NumberInput/numberInput.props.js';
import type { TextAreaProps } from '../TextArea/textArea.props.js';
import type { SelectProps } from '../Select/select.props.js';
import type { ComboboxProps } from '../Combobox/combobox.props.js';
import type { RadioInputProps } from '../RadioInput/radioInput.props.js';
import type { CheckBoxesInputProps } from '../CheckboxesInput/checkBoxesInput.props.js';
import type { SwitchInputProps } from '../Switch/switch.props.js';
import type { PhoneInputProps } from '../PhoneInput/phoneInput.props.js';
import type { CalendarInputProps } from '../Calendar/calendarInput.props.js';
import type { DateInputProps } from '../DateInput/dateInput.props.js';
import type { FileInputProps } from '../File/fileInput.props.js';
import type { TimeInputProps } from '../TimeInput/timeInput.props.js';

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
