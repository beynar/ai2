import type { InputProps } from '../Field/field.js';
import type { NumberInputThemeProps } from './numberInput.theme.js';

export type NumberInputProps = InputProps<'number'> & {
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	theme?: NumberInputThemeProps & InputProps<'number'>['theme'];
};

