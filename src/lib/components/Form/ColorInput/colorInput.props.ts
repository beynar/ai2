import type { InputProps } from '../Field/field.js';
import type { Messages } from '$lib/i18n/en.js';
import type { ColorFormat } from '../ColorPicker/index.js';
import type { ColorInputThemeProps } from './colorInput.theme.js';

export type { ColorFormat } from '../ColorPicker/index.js';

export type ColorInputProps = InputProps<'color'> & {
	/** Hint text shown in the empty color input; defaults to the selected format's pattern (e.g. `#rrggbb`, `rgb(r, g, b)`). */
	placeholder?: string;
	/** Text representation shown in the input and the picker's format select (bindable, forwarded to the ColorPicker). The bound `value` stays canonical hex regardless. */
	format?: ColorFormat;
	/** Per-instance i18n overrides merged over the global catalog. */
	i18n?: Partial<Messages>;
	/** Theme overrides for the color input, its field container, the popover panel and the swatch. */
	theme?: ColorInputThemeProps & InputProps<'color'>['theme'];
};
