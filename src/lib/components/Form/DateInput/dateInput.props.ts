import type { InputProps } from '../Field/field.js';
import type { DateInputThemeProps } from './dateInput.theme.js';
import type { DateInputType } from '../Field/field.js';

export type DateFormat =
	'dd/mm/yyyy' | 'mm/dd/yyyy' | 'mm/yy' | 'mm/yyyy' | 'yyyy' | 'yyyy/mm' | 'yyyy/mm/dd';

export type DateInputProps = InputProps<'date' | 'datetime'> & {
	/** Logical date input type and validation schema used by FieldState. */
	type?: DateInputType;
	/** Hint text shown in the empty date input; defaults to the format prop. */
	placeholder?: string;
	/** Date mask pattern controlling input masking and value parsing (e.g. dd/mm/yyyy). */
	format?: DateFormat;
	/** Locale identifier for date formatting. */
	locale?: string;
	/** Separator character between date segments. */
	separator?: string;
	/** Theme overrides for the date input element and its field container. */
	theme?: DateInputThemeProps & InputProps<'date' | 'datetime'>['theme'];
};
