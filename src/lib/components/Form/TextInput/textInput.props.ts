import type { InputProps } from '../Field/field.js';
import type { TextInputThemeProps } from './textInput.theme.js';

export type TextInputProps = InputProps<'text'> & {
	/** Hint text shown in the empty text input. */
	placeholder?: string;
	/** Theme overrides for the text input element and its field container. */
	theme?: TextInputThemeProps & InputProps<'text'>['theme'];
};

