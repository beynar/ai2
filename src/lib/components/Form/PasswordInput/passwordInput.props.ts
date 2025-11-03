import type { InputProps } from '../Field/field.js';
import type { PasswordInputThemeProps } from './passwordInput.theme.js';

export type PasswordInputProps = InputProps<'password'> & {
	placeholder?: string;
	theme?: PasswordInputThemeProps & InputProps<'password'>['theme'];
};

