import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { LayoutRootAttributes } from '../Layout/layoutAttributes.js';
import type { LayoutSpacing } from '../Layout/layoutSpacing.js';
import type { StackThemeProps } from './stack.theme.js';

export type StackOrientation = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type StackElement =
	| 'div'
	| 'span'
	| 'section'
	| 'article'
	| 'aside'
	| 'main'
	| 'nav'
	| 'header'
	| 'footer'
	| 'form'
	| 'fieldset'
	| 'ul'
	| 'ol'
	| 'li';
export type StackSizeValue = number | string;

export type StackProps = WithAttachments<
	WithSlot<
		LayoutRootAttributes & {
			/** Bindable reference to the root element. */
			ref?: HTMLElement | null;
			/** Additional classes merged onto the root element. */
			class?: string;
			/** Semantic container element rendered by the stack. */
			as?: StackElement;
			/** Flex direction. `'horizontal'` renders `flex-row`, `'vertical'` renders `flex-col`. */
			orientation?: StackOrientation;
			/** Cross-axis alignment (`items-*`). */
			align?: StackAlign;
			/** Main-axis alignment (`justify-*`). */
			justify?: StackJustify;
			/** Spacing between children on the active theme spacing scale. */
			gap?: LayoutSpacing;
			/** Padding on both axes. Axis-specific values take precedence. */
			padding?: LayoutSpacing;
			/** Inline-axis padding, overriding `padding` for that axis. */
			paddingInline?: LayoutSpacing;
			/** Block-axis padding, overriding `padding` for that axis. */
			paddingBlock?: LayoutSpacing;
			/** Controls whether children wrap onto additional lines. */
			wrap?: StackWrap;
			/** Enables native overflow scrolling. */
			isScrollable?: boolean;
			/** Explicit width. Numbers are interpreted as pixels. */
			width?: StackSizeValue;
			/** Explicit height. Numbers are interpreted as pixels. */
			height?: StackSizeValue;
			/** Maximum width. Numbers are interpreted as pixels. */
			maxWidth?: StackSizeValue;
			/** Minimum height. Numbers are interpreted as pixels. */
			minHeight?: StackSizeValue;
			/** Theme overrides. */
			theme?: StackThemeProps;
		},
		'children'
	>
>;
