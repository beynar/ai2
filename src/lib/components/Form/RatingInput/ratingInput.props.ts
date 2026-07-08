import type { InputProps } from '../Field/field.js';
import type { Colors } from '$lib/types/theme.js';
import type { Messages } from '$lib/i18n/en.js';
import type { RatingInputThemeProps } from './ratingInput.theme.js';

export type RatingInputProps = InputProps<'rating'> & {
	/** Number of stars, which is also the maximum selectable value. */
	max?: number;
	/** When true the value snaps to 0.5 increments (half stars). */
	allowHalf?: boolean;
	/** Displays the value without allowing interaction. */
	readonly?: boolean;
	/** When true, clicking the current value clears it back to null. */
	clearable?: boolean;
	/** Reading direction override; inherits the ambient direction when omitted. */
	dir?: 'ltr' | 'rtl';
	/** Color of the filled stars; defaults to the gold star color `warning`. */
	color?: Colors;
	/** Per-instance i18n overrides merged over the global catalog. */
	i18n?: Partial<Messages>;
	/** Theme overrides for the rating stars and its field container. */
	theme?: RatingInputThemeProps & InputProps<'rating'>['theme'];
};
