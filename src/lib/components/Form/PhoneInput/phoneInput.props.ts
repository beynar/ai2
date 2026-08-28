import type { InputProps } from '../Field/field.js';
import type { PhoneInputThemeProps } from './phoneInput.theme.js';
import type intlTelInput from 'intl-tel-input';

export type PhoneInputProps = InputProps<'phone'> & {
	/** Hint text shown in the empty phone input. */
	placeholder?: string;
	/** Initial or bindable ISO country code for the country selector. */
	country?: string;
	/** When true, enables intl-tel-input strict mode for number validation. */
	strict?: boolean;
	/** Optional separator string. */
	separator?: string;
	/** Placeholder text for the country dropdown search field. */
	searchPlaceholder?: string;
	/** Bindable intl-tel-input instance created when the input mounts. */
	iti?: ReturnType<typeof intlTelInput>;
	/** Theme overrides for the phone input element and its field container. */
	theme?: PhoneInputThemeProps & InputProps<'phone'>['theme'];
};

