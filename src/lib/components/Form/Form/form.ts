import type { FieldValue } from '../Field/field.js';
import type { FieldState } from '../Field/field.state.svelte.js';
import type { TextInputProps } from '../TextInput/textInput.props.js';
import type { NumberInputProps } from '../NumberInput/numberInput.props.js';
import type { RatingInputProps } from '../RatingInput/ratingInput.props.js';
import type { SliderProps } from '../Slider/slider.props.js';
import type { TextAreaProps } from '../TextArea/textArea.props.js';
import type { SelectProps } from '../Select/select.props.js';
import type { ComboboxProps } from '../Combobox/combobox.props.js';
import type { RadioInputProps } from '../RadioInput/radioInput.props.js';
import type { CheckboxesInputProps } from '../CheckboxesInput/checkboxesInput.props.js';
import type { SwitchProps } from '../Switch/switch.props.js';
import type { PhoneInputProps } from '../PhoneInput/phoneInput.props.js';
import type { CalendarInputProps } from '../Calendar/calendarInput.props.js';
import type { DateInputProps } from '../DateInput/dateInput.props.js';
import type { FileInputProps } from '../File/fileInput.props.js';
import type { TagGroupProps } from '../TagGroup/tagGroup.props.js';
import type { TimeInputProps } from '../TimeInput/timeInput.props.js';
import type { RichTextInputProps } from '../../RichTextInput/richTextInput.props.js';

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
			type: 'rating';
	  } & RatingInputProps)
	| ({
			type: 'slider';
	  } & SliderProps)
	| ({
			type: 'slider-range';
	  } & SliderProps)
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
			type: 'textarea';
	  } & TextAreaProps)
	| ({
			type: 'rich-text';
	  } & RichTextInputProps)
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
	  } & CheckboxesInputProps)
	| ({
			type: 'switch';
	  } & SwitchProps)
	| ({
			type: 'file';
	  } & FileInputProps<'single'>)
	| ({
			type: 'files';
	  } & FileInputProps<'multiple'>)
	| ({
			type: 'tag-group';
	  } & TagGroupProps);

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
//   } & SwitchProps)
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
//   } & CheckboxesInputProps);

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
