import type { WithAttachments } from '$lib/types/props.js';
import type { Sizes } from '$lib/types/theme.js';
import type { Messages } from '$lib/i18n/en.js';
import type { ColorFormat } from './colorPicker.state.svelte.js';
import type { ColorPickerThemeProps } from './colorPicker.theme.js';

export type { ColorFormat } from './colorPicker.state.svelte.js';

export type ColorPickerProps = WithAttachments<{
	/** The selected color (bindable). Canonical output is hex — `#rrggbb`, or `#rrggbbaa` when alpha < 1 — but any parseable CSS color is accepted as input. */
	value?: string;
	/** The text representation shown in the input (bindable). The bound `value` stays hex regardless. */
	format?: ColorFormat;
	/** Size token scaling the panel width, slider heights, thumb sizes and text. */
	size?: Sizes;
	/** Disables every control and dims the panel. */
	disabled?: boolean;
	/** Fires on every committed change, including continuously while dragging. Receives the canonical hex. */
	onChange?: (value: string) => void;
	/** Extra classes merged onto the root panel. */
	class?: string;
	/** Theme overrides for the panel parts (root, area, sliders, inputs, …). */
	theme?: ColorPickerThemeProps;
	/** Per-instance i18n overrides merged over the global catalog. */
	i18n?: Partial<Messages>;
}>;
