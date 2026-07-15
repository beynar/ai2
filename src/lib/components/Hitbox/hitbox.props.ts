import type { WithAttachments } from '$lib/types/props.js';
import type { Sizes } from '$lib/types/theme.js';
import type { HitboxThemeProps } from './hitbox.theme.js';

export type HitboxProps = WithAttachments<{
	/** Bindable reference to the transparent hitbox element. */
	ref?: HTMLSpanElement | null;
	/** Target dimensions centered over the positioned interactive parent. */
	size?: Sizes;
	/** CSS classes applied to the hitbox element. */
	class?: string;
	/** Theme overrides for the hitbox element. */
	theme?: HitboxThemeProps;
}>;
