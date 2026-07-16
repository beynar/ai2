import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { LayoutRootAttributes } from '../Layout/layoutAttributes.js';
import type { GridSpanThemeProps } from './gridSpan.theme.js';

export type GridSpanProps = WithAttachments<
	WithSlot<
		LayoutRootAttributes<HTMLDivElement> & {
			/** Bindable reference to the root span element. */
			ref?: HTMLDivElement | null;
			/** Additional classes merged onto the root span element. */
			class?: string;
			/** Number of columns to span, or `full` for the complete row. */
			columns?: number | 'full';
			/** Number of implicit grid rows to span. */
			rows?: number;
			/** Theme overrides for the grid span root. */
			theme?: GridSpanThemeProps;
		},
		'children'
	>
>;
