import type { InputProps } from '../Field/field.js';
import type { TextInputThemeProps } from './textInput.theme.js';

export type TextInputType = 'text' | 'email' | 'url';

export type TextInputProps = InputProps<TextInputType> & {
	/** Native input type and validation schema used by FieldState. */
	type?: TextInputType;
	/** Hint text shown in the empty text input. */
	placeholder?: string;
	/** Theme overrides for the text input element and its field container. */
	theme?: TextInputThemeProps & InputProps<TextInputType>['theme'];
};
