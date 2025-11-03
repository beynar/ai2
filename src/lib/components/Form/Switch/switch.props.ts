import type { InputProps } from '../Field/field.js';
import type { SwitchInputThemeProps } from './switch.theme.js';

export type SwitchInputProps = InputProps<'switch'> & {
	theme?: SwitchInputThemeProps & InputProps<'switch'>['theme'];
};

