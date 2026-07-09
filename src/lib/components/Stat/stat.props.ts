import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Colors, Sizes } from '$lib/types/theme.js';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { SeparatorProps } from '../Separator/separator.props.js';
import type { StatThemeProps } from './stat.theme.js';

export type StatVariant = 'solid' | 'outline' | 'soft' | 'ghost';
export type StatIndicatorVariant = 'default' | 'icon' | 'badge' | 'action';
export type StatTrendDirection = 'up' | 'down' | 'neutral';

type StatBaseProps = {
	/** Bindable reference to the root stat element. */
	ref?: HTMLElement | null;
	/** Additional CSS classes for the root stat element. */
	class?: string;
	/** Theme color token applied to the stat surface. */
	color?: Colors;
	/** Visual treatment of the stat surface. */
	variant?: StatVariant;
	/** Size token controlling padding, spacing, and typography. */
	size?: Sizes;
	/** Theme overrides for stat parts. */
	theme?: StatThemeProps;
};

export type StatProps = WithAttachments<
	WithSlot<
		StatBaseProps & {
			/** Tone applied to the convenience `trend` slot. */
			trendDirection?: StatTrendDirection;
			/** Presentation variant for the convenience `indicator` slot. */
			indicatorVariant?: StatIndicatorVariant;
			/** Semantic color token for the convenience `indicator` slot. */
			indicatorColor?: Colors;
			/** Renders a separator between primary and supporting content when using convenience slots. */
			showSeparator?: boolean;
		},
		'children' | 'label' | 'value' | 'indicator' | 'trend' | 'description'
	>
>;

export type StatPartProps = WithAttachments<
	WithSlot<
		{
			/** Additional CSS classes for the stat part element. */
			class?: string;
			/** Size override for this part; defaults to the parent Stat size. */
			size?: Sizes;
			/** Theme overrides for stat parts. */
			theme?: StatThemeProps;
		},
		'children'
	>
>;

export type StatIndicatorProps = WithAttachments<
	WithSlot<
		{
			/** Additional CSS classes for the indicator element. */
			class?: string;
			/** Size override for this indicator; defaults to the parent Stat size. */
			size?: Sizes;
			/** Indicator presentation style. */
			variant?: StatIndicatorVariant;
			/** Semantic color token applied to icon, badge, or action states. */
			color?: Colors;
			/** Click handler; renders the indicator as a native button when present. */
			onClick?: (event: MouseEvent) => void;
			/** Native button type when `onClick` renders the indicator as a button. */
			type?: HTMLButtonAttributes['type'];
			/** Disabled state for clickable indicators. */
			disabled?: HTMLButtonAttributes['disabled'];
			/** Accessible name for icon-only clickable indicators. */
			'aria-label'?: HTMLButtonAttributes['aria-label'];
			/** Theme overrides for stat parts. */
			theme?: StatThemeProps;
		},
		'children'
	>
>;

export type StatTrendProps = WithAttachments<
	WithSlot<
		{
			/** Additional CSS classes for the trend element. */
			class?: string;
			/** Size override for this trend; defaults to the parent Stat size. */
			size?: Sizes;
			/** Directional tone applied to the trend content. */
			trend?: StatTrendDirection;
			/** Theme overrides for stat parts. */
			theme?: StatThemeProps;
		},
		'children'
	>
>;

export type StatSeparatorProps = Omit<SeparatorProps, 'theme'> & {
	/** Size override for separator spacing; defaults to the parent Stat size. */
	statSize?: Sizes;
	/** Theme overrides for stat parts. */
	theme?: StatThemeProps;
	/** Optional separator label. */
	children?: Slot;
};
