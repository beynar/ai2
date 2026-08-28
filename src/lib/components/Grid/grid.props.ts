import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { LayoutRootAttributes } from '../Layout/layoutAttributes.js';
import type { LayoutSpacing } from '../Layout/layoutSpacing.js';
import type { GridThemeProps } from './grid.theme.js';

export type GridAlignment = 'start' | 'center' | 'end' | 'stretch';
export type GridRepeat = 'fill' | 'fit';
export type GridColumns =
	| number
	| {
			/** Minimum width of each responsive column, in pixels. */
			minWidth: number;
			/** Maximum number of columns while allowing present tracks to fill the row. */
			max?: number;
			/** `fill` preserves empty tracks; `fit` collapses them. */
			repeat?: GridRepeat;
	  };

export type GridProps = WithAttachments<
	WithSlot<
		LayoutRootAttributes<HTMLDivElement> & {
			/** Bindable reference to the root grid element. */
			ref?: HTMLDivElement | null;
			/** Additional classes merged onto the root grid element. */
			class?: string;
			/** Fixed column count or responsive minimum-width configuration. */
			columns?: GridColumns;
			/** Spacing between rows and columns. */
			gap?: LayoutSpacing;
			/** Row spacing, overriding `gap` on that axis. */
			rowGap?: LayoutSpacing;
			/** Column spacing, overriding `gap` on that axis. */
			columnGap?: LayoutSpacing;
			/** Height of implicit rows in pixels, useful with `GridSpan rows`. */
			rowHeight?: number;
			/** Vertical alignment of items inside their grid areas. */
			align?: GridAlignment;
			/** Horizontal alignment of items inside their grid areas. */
			justify?: GridAlignment;
			/** Explicit width. Numbers are interpreted as pixels. */
			width?: number | string;
			/** Explicit height. Numbers are interpreted as pixels. */
			height?: number | string;
			/** Maximum width. Numbers are interpreted as pixels. */
			maxWidth?: number | string;
			/** Minimum height. Numbers are interpreted as pixels. */
			minHeight?: number | string;
			/** Theme overrides for the grid root. */
			theme?: GridThemeProps;
		},
		'children'
	>
>;
