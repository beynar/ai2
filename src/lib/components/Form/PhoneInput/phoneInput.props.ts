import type { InputProps } from '../Field/field.js';
import type { PhoneInputThemeProps } from './phoneInput.theme.js';
import type intlTelInput from 'intl-tel-input';

export type PhoneInputProps = InputProps<'phone'> & {
	placeholder?: string;
	country?: string;
	strict?: boolean;
	separator?: string;
	searchPlaceholder?: string;
	iti?: ReturnType<typeof intlTelInput>;
	theme?: PhoneInputThemeProps & InputProps<'phone'>['theme'];
};

