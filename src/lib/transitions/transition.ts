import type { TransitionConfig } from 'svelte/transition';
import { easingFunctions, type Easing } from './easingFunctions.js';
import { useTheme } from '$lib/components/Theme/theme.state.svelte.js';
import type { ThemeState } from '$lib/components/Theme/theme.state.svelte.js';

const split_css_unit = (value: string | number): [number, string] => {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return (split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px']) as [number, string];
};
const resolveEasing = (easing: Easing | undefined, theme: ThemeState) => {
	return easingFunctions[easing || theme.transition.easing];
};

const resolveDuration = (duration: number | undefined, theme: ThemeState) => {
	if (theme.preferReducesMotion) {
		return 0;
	}
	return duration ?? theme.transition.duration;
};

export type BaseTransitionParams = {
	delay?: number;
	duration?: number;
	easing?: Easing;
};

export type SlideTransitionParams = FSOParams & {
	axis?: 'x' | 'y';
};

export type FSOParams = BaseTransitionParams & {
	x?: number | `${number}%`;
	y?: number | `${number}%`;
	scale?: number;
	opacity?: number;
};

export type SlideTransitionProps =
	| SlideTransitionParams
	| {
			in?: Partial<SlideTransitionParams>;
			out?: Partial<SlideTransitionParams>;
	  }
	| undefined;

export type FSOProps =
	| FSOParams
	| {
			in?: FSOParams;
			out?: FSOParams;
	  };

const styleToString = (style: Record<string, number | string | undefined>): string => {
	return Object.keys(style).reduce((str, key) => {
		if (style[key] === undefined) return str;
		return str + `${key}:${style[key]};`;
	}, '');
};
const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
	const [minA, maxA] = scaleA;
	const [minB, maxB] = scaleB;

	const percentage = (valueA - minA) / (maxA - minA);
	const valueB = percentage * (maxB - minB) + minB;

	return valueB;
};

const percentageToNumber = (
	node: HTMLElement,
	params: string | number,
	measurement: 'width' | 'height'
) => {
	if (typeof params === 'number') return params;

	const value = parseFloat(params);
	const direction =
		value < 0
			? measurement === 'width'
				? 'left'
				: 'top'
			: measurement === 'width'
				? 'right'
				: 'bottom';
	const delta = parseFloat(getComputedStyle(node)[direction]) * (value < 0 ? -1 : 0);
	const parentSize = node.getBoundingClientRect()[measurement];
	return (value / 100) * parentSize + delta;
};

export const fso = () => {
	const theme = useTheme();
	return (node: HTMLElement, params: FSOParams): TransitionConfig => {
		const style = getComputedStyle(node);
		const target_opacity = +style.opacity;
		const transform = style.transform === 'none' ? '' : style.transform;
		const od = target_opacity * (1 - (params.opacity ?? 1));

		return {
			delay: params.delay,
			duration: resolveDuration(params.duration, theme),
			easing: resolveEasing(params.easing, theme),
			css: (t: number, u: number) => {
				const y = scaleConversion(
					t,
					[0, 1],
					[percentageToNumber(node, params.y ?? 0, 'height') ?? 0, 0]
				);
				const x = scaleConversion(
					t,
					[0, 1],
					[percentageToNumber(node, params.x ?? 0, 'width') ?? 0, 0]
				);
				const scale = scaleConversion(t, [0, 1], [params.scale ?? 1, 1]);
				return styleToString({
					transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
					opacity: `${target_opacity - od * u}`
				});
			}
		};
	};
};

type BgFadeOptions = {
	delay?: number;
	duration?: number;
	easing?: Easing;
};
export const bgFade = () => {
	const theme = useTheme();
	return (node: HTMLElement, options: BgFadeOptions) => {
		const rgba = getComputedStyle(node).backgroundColor;
		const [r = 255, g = 255, b = 255, target_opacity = 1] = rgba.match(/\d+(\.\d+)?/g)!.map(Number);
		node.style.removeProperty('background-color');

		const od = target_opacity * (1 - 0);
		return {
			delay: options.delay,
			duration: resolveDuration(options.duration, theme),
			easing: resolveEasing(options.easing, theme),
			css: (t: number, u: number) => {
				const value = `background-color: rgba(${r},${g},${b},${target_opacity - od * u})`;
				// console.log(value);
				return value;
			}
		};
	};
};

export const slide = (
	node: HTMLElement,
	{
		delay = 0,
		duration,
		easing,
		axis = 'y',
		x = 0,
		scale = 1,
		y = 0,
		opacity = 0.2
	}: SlideTransitionParams = {}
) => {
	const theme = useTheme();
	const style = getComputedStyle(node);
	const primary_property = axis === 'y' ? 'height' : 'width';
	const primary_property_value = parseFloat(style[primary_property]);
	const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
	const capitalized_secondary_properties = secondary_properties.map(
		(e) => `${e[0].toUpperCase()}${e.slice(1)}`
	) as ('Left' | 'Right' | 'Top' | 'Bottom')[];
	const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
	const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
	const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
	const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
	const border_width_start_value = parseFloat(
		style[`border${capitalized_secondary_properties[0]}Width`]
	);
	const border_width_end_value = parseFloat(
		style[`border${capitalized_secondary_properties[1]}Width`]
	);

	const target_opacity = +style.opacity;

	const transform = style.transform === 'none' ? '' : style.transform;
	const sd = 1 - scale;
	const od = target_opacity * (1 - (opacity ?? 1));

	const [x_value, x_unit] = split_css_unit(x);
	const [y_value, y_unit] = split_css_unit(y);

	return {
		delay,
		duration: resolveDuration(duration, theme),
		easing: resolveEasing(easing, theme),
		css: (t: number, u: number) => {
			return (
				// 'z-index: -1;' +
				'overflow: hidden;' +
				`${primary_property}: ${t * primary_property_value}px;` +
				`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
				`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
				`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
				`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
				`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
				`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;` +
				`transform: ${transform} scale(${1 - sd * u}) translate(${(1 - t) * x_value}${x_unit}, ${
					(1 - t) * y_value
				}${y_unit});` +
				`opacity: ${target_opacity - od * u};` +
				`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
			);
		}
	};
};

export const defaultBaseTransitionParams = {
	delay: 0,
	duration: 200,
	easing: 'cubicInOut'
} satisfies BaseTransitionParams;

export const defaultFsoParams = Object.assign({}, defaultBaseTransitionParams, {
	x: 0,
	y: 0,
	scale: 1,
	opacity: 1
}) satisfies FSOParams;

export const defaultSlideTransitionParams = Object.assign(defaultFsoParams, {
	axis: 'y' as const
}) satisfies SlideTransitionParams;
