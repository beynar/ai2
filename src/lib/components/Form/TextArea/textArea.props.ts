import type { InputProps } from '../Field/field.js';
import type { TextAreaThemeProps } from './textArea.theme.js';
import type { FieldState } from '../Field/field.state.svelte.js';

export type TextAreaProps = InputProps<'textarea'> & {
	/** Hint text shown in the empty textarea. */
	placeholder?: string;
	/** Theme overrides for the textarea element and its field container. */
	theme?: TextAreaThemeProps & InputProps<'textarea'>['theme'];
	/** Number of visible text rows in the textarea. */
	rows?: number;
	/** Maximum number of characters the user may enter. */
	maxLength?: number;
	/** Called when Enter is pressed without Shift; default submission is prevented. */
	onPressEnter?: (field: FieldState<'textarea'>) => void;
};
