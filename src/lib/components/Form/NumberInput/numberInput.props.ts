import type { InputProps } from '../Field/field.js';
import type { NumberInputThemeProps } from './numberInput.theme.js';

export type NumberInputProps = InputProps<'number'> & {
	/** Hint text shown in the empty number input. */
	placeholder?: string;
	/** Minimum allowed value; passed to the native input and checked during validation. */
	min?: number;
	/** Maximum allowed value; passed to the native input and checked during validation. */
	max?: number;
	/** Step increment for the native number input spinner and keyboard changes. */
	step?: number;
	/** Amount changed by the +/- buttons; defaults to step, then 1. */
	increment?: number;
	/** Theme overrides for the number input element and its field container. */
	theme?: NumberInputThemeProps & InputProps<'number'>['theme'];
};
