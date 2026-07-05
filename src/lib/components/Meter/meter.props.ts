import type { Snippet } from 'svelte';
import type { Colors, Sizes } from '../../types/theme.js';
import type { Slot, WithSlot } from '../Slot/slot.js';
import type { MeterThemeProps } from './meter.theme.js';

export type MeterStep<T extends Record<string, any> | undefined> = {
	/**
	 * Label shown for this segment in the legend when `showLegend` is enabled.
	 */
	label?: string;
	/**
	 * Theme color applied to the segment bar and legend swatch.
	 */
	color?: Colors;
	/**
	 * Icon snippet rendered beside the label in the legend.
	 */
	icon?: Snippet<[]>;
	/**
	 * Vertical placement of the value indicator relative to the track.
	 */
	position?: 'top' | 'bottom';
	/**
	 * Numeric value represented by this meter segment.
	 */
	value: number;
	/**
	 * Arbitrary metadata attached to this meter segment.
	 */
	data?: T;
};

type Step<T extends Record<string, any> | undefined> = {
	/**
	 * Scale value where this background step segment begins.
	 */
	start: number;
	/**
	 * Scale value where this background step segment ends.
	 */
	end?: number;
	/**
	 * Vertical placement of the step label relative to the track.
	 */
	position?: 'top' | 'bottom';
	/**
	 * Additional CSS classes for the step segment element.
	 */
	class?: string;
	/**
	 * Additional CSS classes for the step label element.
	 */
	labelClass?: string;
	/**
	 * Theme color of the step segment.
	 */
	color: Colors;
	/**
	 * Slot content rendered as the step label.
	 */
	label: Slot;
	/**
	 * Arbitrary metadata attached to this step definition.
	 */
	data?: T;
};

export type MeterProps<
	T extends Record<string, any> | undefined,
	S extends Record<string, any> | undefined
> = WithSlot<
	WithSlot<
		{
			/**
			 * Additional CSS classes for the root meter container.
			 */
			class?: string;
			/**
			 * Controls the indicator label: raw value, percentage, or hidden when undefined.
			 */
			showIndicatorAs?: 'value' | 'percentage';
			/**
			 * One meter segment or a stacked set of segments to render on the track.
			 */
			value: MeterStep<T> | MeterStep<T>[];
			/**
			 * Colored range segments overlaid along the meter scale.
			 */
			steps?: Step<S>[];
			/**
			 * When true, renders a legend listing each segment's label and percentage.
			 */
			showLegend?: boolean;
			/**
			 * Spring animation stiffness passed to the value and width springs.
			 */
			stiffness?: number;
			/**
			 * Soft-landing factor applied when spring targets update.
			 */
			soft?: number;
			/**
			 * Spring animation damping passed to the value and width springs.
			 */
			damping?: number;
			/**
			 * Convergence threshold for spring-animated values.
			 */
			precision?: number;
			/**
			 * Minimum value of the meter scale.
			 */
			min?: number;
			/**
			 * Maximum value of the meter scale used for percentage calculations.
			 */
			max?: number;
			/**
			 * Visual size variant of the meter track, labels, and legend.
			 */
			size?: Sizes;
			/**
			 * Custom theme overrides for meter sub-elements.
			 */
			theme?: MeterThemeProps;
		},
		'label' | 'description' | 'helper' | 'header'
	>,
	'indicator'
>;
