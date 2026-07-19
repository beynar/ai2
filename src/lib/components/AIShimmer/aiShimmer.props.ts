import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AIShimmerThemeProps } from './aiShimmer.theme.js';
import type { HTMLAttributes } from 'svelte/elements';

export type ShimmerProps = WithAttachments<
	Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> & {
		/** Bindable reference to the rendered element. */
		ref?: HTMLElement | null;
		/** HTML element rendered by the wrapper. */
		as?: string;
		/** Text rendered when no custom children are provided. */
		text?: string;
		/** Animation cycle duration in seconds. */
		duration?: number;
		/** Highlight spread multiplier passed to the shared shimmer utility. */
		spread?: number;
		/** Custom content rendered by the shimmer element. */
		children?: Slot;
		/** Class applied to the rendered element. */
		class?: string;
		/** Theme overrides for the shimmer text treatment. */
		theme?: AIShimmerThemeProps;
	}
>;
