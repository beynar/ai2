import type { InputProps } from '../Field/field.js';
import type { DateInputThemeProps } from './dateInput.theme.js';

export type DateFormat =
	| 'dd/mm/yyyy'
	| 'mm/dd/yyyy'
	| 'mm/yy'
	| 'mm/yyyy'
	| 'yyyy'
	| 'yyyy/mm'
	| 'yyyy/mm/dd';

export type DateInputProps = InputProps<'date' | 'datetime'> & {
	placeholder?: string;
	format?: DateFormat;
	locale?: string;
	separator?: string;
	theme?: DateInputThemeProps & InputProps<'date' | 'datetime'>['theme'];
};

