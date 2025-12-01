import type { InputProps } from '../Field/field.js';
import type { SelectThemeProps } from './select.theme.js';

export type SelectProps = InputProps<'select'> & {
	placeholder?: string;
	theme?: SelectThemeProps & InputProps<'select'>['theme'];
	options?: {
		value: string;
		label: string;
	}[];
};

