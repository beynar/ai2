import type { InputProps } from '../Field/field.js';
import type { TextInputThemeProps } from './textInput.theme.js';

export type TextInputProps = InputProps<'text'> & {
	placeholder?: string;
	theme?: TextInputThemeProps & InputProps<'text'>['theme'];
};

