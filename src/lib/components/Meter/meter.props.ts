import type { Snippet } from 'svelte';
import type { Colors, Sizes } from '../../types/theme.js';
import type { Slot, WithSlot } from '../Slot/slot.js';
import type { MeterThemeProps } from './meter.theme.js';

export type MeterStep<T extends Record<string, any> | undefined> = {
	label?: string;
	color?: Colors;
	icon?: Snippet<[]>;
	position?: 'top' | 'bottom';
	value: number;
	data?: T;
};

type Step<T extends Record<string, any> | undefined> = {
	start: number;
	end?: number;
	position?: 'top' | 'bottom';
	class?: string;
	labelClass?: string;
	color: Colors;
	label: Slot;
	data?: T;
};

export type MeterProps<
	T extends Record<string, any> | undefined,
	S extends Record<string, any> | undefined
> = WithSlot<
	WithSlot<
		{
			class?: string;
			showIndicatorAs?: 'value' | 'percentage';
			value: MeterStep<T> | MeterStep<T>[];
			steps?: Step<S>[];
			showLegend?: boolean;
			stiffness?: number;
			soft?: number;
			damping?: number;
			precision?: number;
			min?: number;
			max?: number;
			size?: Sizes;
			theme?: MeterThemeProps;
		},
		'label' | 'description' | 'helper' | 'header'
	>,
	'indicator'
>;
