import type { InputProps } from '../Field/field.js';
import type { SwitchThemeProps } from './switch.theme.js';

export type SwitchProps = InputProps<'switch'> & {
	/** Accessible name for switches without a visible label. */
	ariaLabel?: string;
	/** Theme overrides for the switch toggle, thumb, input container, and field parts. */
	theme?: SwitchThemeProps & InputProps<'switch'>['theme'];
};
