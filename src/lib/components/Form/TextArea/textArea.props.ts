import type { InputProps } from '../Field/field.js';
import type { TextAreaThemeProps } from './textArea.theme.js';
import type { FieldState } from '../Field/fieldState.svelte.js';

export type TextAreaProps = InputProps<'text'> & {
	/** Hint text shown in the empty textarea. */
	placeholder?: string;
	/** Theme overrides for the textarea element and its field container. */
	theme?: TextAreaThemeProps & InputProps<'text'>['theme'];
	/** Number of visible text rows in the textarea. */
	rows?: number;
	/** Maximum number of characters the user may enter. */
	maxLength?: number;
	/** Called when Enter is pressed without Shift; default submission is prevented. */
	onPressEnter?: (field: FieldState<'text'>) => void;
};

