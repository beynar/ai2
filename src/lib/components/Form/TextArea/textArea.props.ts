import type { InputProps } from '../Field/field.js';
import type { TextAreaThemeProps } from './textArea.theme.js';
import type { FieldState } from '../Field/fieldState.svelte.js';

export type TextAreaProps = InputProps<'text'> & {
	placeholder?: string;
	theme?: TextAreaThemeProps & InputProps<'text'>['theme'];
	rows?: number;
	maxLength?: number;
	onPressEnter?: (field: FieldState<'text'>) => void;
};

