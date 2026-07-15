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
import type { DateSelectorInputProps } from '../DateSelector/dateSelector.props.js';
import type { ColorInputProps } from '../ColorInput/colorInput.props.js';
import type { ColorPickerInputProps } from '../ColorPicker/colorPicker.props.js';
import type { FileInputProps } from '../File/fileInput.props.js';
import type { TagGroupProps } from '../TagGroup/tagGroup.props.js';
import type { TimeInputProps } from '../TimeInput/timeInput.props.js';
import type { RichTextInputProps } from '../../RichTextInput/richTextInput.props.js';
import type { PasswordInputProps } from '../PasswordInput/passwordInput.props.js';
import type { CheckboxProps } from '../Checkbox/checkbox.props.js';
import type { TagsInputProps } from '../TagsInput/tagsInput.props.js';
import type { KeyValueInputProps } from '../KeyValueInput/keyValueInput.props.js';
import type { PinInputProps } from '../PinInput/pinInput.props.js';

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
			display?: undefined;
	  } & CalendarInputProps<'calendar' | 'calendar-range'>)
	| ({
			type: 'calendar-range';
			/** Renders the popover DateSelector (range mode) instead of the inline calendar. */
			display: 'selector';
	  } & Omit<DateSelectorInputProps<'range'>, 'mode'>)
	| ({
			type: 'date' | 'datetime';
			display?: undefined;
	  } & DateInputProps)
	| ({
			type: 'date';
			/** Renders the popover DateSelector instead of the text date input. */
			display: 'selector';
	  } & Omit<DateSelectorInputProps<'date'>, 'mode'>)
	| ({
			type: 'color';
			display?: undefined;
	  } & ColorInputProps)
	| ({
			type: 'color';
			/** Renders the inline ColorPicker panel instead of the swatch text input. */
			display: 'picker';
	  } & ColorPickerInputProps)
	| ({
			type: 'text' | 'email' | 'url';
	  } & TextInputProps)
	| ({
			type: 'password';
	  } & PasswordInputProps)
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
			type: 'checkbox';
	  } & CheckboxProps)
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
	  } & TagGroupProps)
	| ({
			type: 'tag';
	  } & TagsInputProps)
	| ({
			type: 'keyvalue';
	  } & KeyValueInputProps)
	| ({
			type: 'pin';
	  } & PinInputProps);

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
