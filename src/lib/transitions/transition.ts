import { use_theme } from '$lib/theme.svelte.js';
import type { TransitionConfig } from 'svelte/transition';
import { easingFunctions, type Easing } from './easingFunctions.js';
import type { DialogType } from '$lib/Components/Dialog/dialog.types.js';
import type { ToastPosition } from '$lib/Components/Toast/toast.js';
import type { Placement } from '@floating-ui/dom';

const split_css_unit = (value: string | number): [number, string] => {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return (split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px']) as [number, string];
};
const resolveEasing = (easing?: Easing) => {
	const theme = use_theme();
	const baseEasing = theme.transitions.easing || 'cubicInOut';
	return easingFunctions[easing || baseEasing];
};

const resolveDuration = (duration?: number) => {
	const theme = use_theme();
	if (theme.preferReducesMotion) {
		return 0;
	}
	return duration ?? (theme.transitions.duration || 200);
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
	  }
	| undefined;

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

export const fso = (node: HTMLElement, params: FSOParams): TransitionConfig => {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - (params.opacity ?? 1));

	return {
		delay: params.delay,
		duration: resolveDuration(params.duration),
		easing: resolveEasing(params.easing),
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

type BgFadeOptions = {
	delay?: number;
	duration?: number;
	easing?: Easing;
};
export function bgFade(node: HTMLElement, options: BgFadeOptions) {
	const rgba = getComputedStyle(node).backgroundColor;
	const [r, g, b, target_opacity] = rgba.match(/\d+(\.\d+)?/g)!.map(Number);

	const od = target_opacity * (1 - 0);
	return {
		delay: options.delay,
		duration: resolveDuration(options.duration),
		easing: resolveEasing(options.easing),
		css: (t: number, u: number) => {
			const value = `background-color: rgba(${r},${g},${b},${target_opacity - od * u})`;
			return value;
		}
	};
}

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
		duration: resolveDuration(duration),
		easing: resolveEasing(easing),
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

export const resolveTransitionParams = <T extends FSOProps | SlideTransitionProps>(
	transitions?: T
): {
	inParams: T extends FSOProps ? FSOParams : SlideTransitionParams;
	outParams: T extends FSOProps ? FSOParams : SlideTransitionParams;
} => {
	const inParams =
		transitions && 'in' in transitions ? transitions.in || {} : ((transitions || {}) as T);
	const outParams =
		transitions && 'out' in transitions ? transitions.out || {} : ((transitions || {}) as T);
	return {
		inParams,
		outParams
	} as {
		inParams: T extends FSOProps ? FSOParams : SlideTransitionParams;
		outParams: T extends FSOProps ? FSOParams : SlideTransitionParams;
	};
};

export type TypedTransitionProps<Ty extends string, Tr extends 'slide' | 'fso'> = {
	[K in Ty]?: Tr extends 'slide' ? SlideTransitionProps : FSOProps;
};

export const resolveTypedTransitionParams = <
	C extends 'dialog' | 'toast' | 'popover',
	Tr extends 'slide' | 'fso',
	Ct extends C extends 'dialog' ? DialogType : C extends 'popover' ? Placement : ToastPosition
>(
	component: C,
	componentType: Ct,
	transitionType: Tr,
	override?: Tr extends 'slide' ? SlideTransitionProps : FSOProps
): {
	in: Tr extends 'slide' ? SlideTransitionParams : FSOParams;
	out: Tr extends 'slide' ? SlideTransitionParams : FSOParams;
} => {
	const theme = use_theme();
	const globalTransitionForComponent = (
		component === 'dialog'
			? theme.dialogTransitions
			: component === 'popover'
				? theme.popoverTransitions
				: theme.toastTransitions
	) as TypedTransitionProps<Ct, 'fso'>;

	const base =
		override ||
		(globalTransitionForComponent
			? globalTransitionForComponent[componentType] ||
				(transitionType === 'slide' ? defaultSlideTransitionParams : defaultFsoParams)
			: defaultFsoParams);

	const params = structuredClone({
		in: 'in' in base ? base.in : base,
		out: 'out' in base ? base.out : base
	}) as {
		in: Tr extends 'slide' ? SlideTransitionParams : FSOParams;
		out: Tr extends 'slide' ? SlideTransitionParams : FSOParams;
	};

	return params;
};

// I want
// - transition for each type of dialogs to be set on the theme level
// - transition to be reset on the dialog level when it's called in the template
// - the in and out transition to be set separately
// - the transition to be resolved nicely and dynamically based on the current type of the dialog
