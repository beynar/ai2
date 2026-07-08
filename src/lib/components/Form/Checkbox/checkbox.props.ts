import type { InputProps } from '../Field/field.js';
import type { CheckboxMode } from '../CheckboxesInput/checkboxesInput.props.js';
import type { CheckboxesInputThemeProps } from '../CheckboxesInput/checkboxesInput.theme.js';

export type CheckboxProps = InputProps<'checkbox'> & {
	/** Display mode: 'normal' for an inline row, 'card' for a card-style row. */
	mode?: CheckboxMode;
	/** Called when the checkbox is toggled. */
	onClick?: (checked: boolean) => void;
	/** Theme overrides for the checkbox row and field parts. */
	theme?: CheckboxesInputThemeProps & InputProps<'checkbox'>['theme'];
};
