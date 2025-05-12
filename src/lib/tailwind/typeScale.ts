// https://github.com/AleksandrHovhannisyan/fluid-type-scale-calculator

export type TypeScale = Record<
	'xs' | 's' | 'DEFAULT' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
	string
>;
const scales = {
	minorSecond: 1.067,
	majorSecond: 1.125,
	minorThird: 1.2,
	majorThird: 1.25,
	perfectFourth: 1.32,
	augmentedFourth: 1.414,
	perfectFifth: 1.5,
	goldenRatio: 1.618
} as const;

type Scale = keyof typeof scales;
export type BreakpointConfig = {
	/** The font size (in pixels) at this breakpoint */
	fontSize?: number;
	/** The viewport width corresponding to this breakpoint. */
	screenWidth?: number;
	/** The modular type scale ratio to use at this breakpoint to scale the base font size up/down. */
	ratio?: Scale;
};

/** Given a form state representing user input for the various parameters, returns
 * the corresponding type scale mapping each step to its min/max/preferred font sizes.
 */
type TypeScaleParams = {
	/** The minimum (mobile) config, describing how the font size should behave when the viewport width is narrower than the desktop breakpoint. */
	min?: BreakpointConfig;
	/** The maximum (desktop) config, describing how the font size should behave when the viewport width is >= this breakpoint. */
	max?: BreakpointConfig;

	/** The pixel value of 1rem. */
	remValueInPx?: number;
	scale: Scale;
};

export const getTypeScale = (state: TypeScaleParams): TypeScale => {
	const typeScaleSteps = {
		all: ['xs', 's', 'DEFAULT', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
		base: 'DEFAULT'
	} as const;

	/** Appends the correct unit to a unitless value. */
	const withUnit = (unitlessValue: number) => `${unitlessValue}rem`;

	/** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
	const round = (val: number) => Number(val.toFixed(2));

	/** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
	const convertToDesiredUnit = (px: number) => px / (state.remValueInPx || 16);

	// Get the index of the base modular step to compute exponents relative to the base index (up/down)
	const baseStepIndex = typeScaleSteps.all.indexOf(typeScaleSteps.base);

	// Reshape the data so we map each step name to a config describing its fluid font sizing values.
	// Do this on every render because it's essentially derived state; no need for a useEffect.
	// Note that some state variables are not necessary for this calculation, but it's simple enough that it's not expensive.
	return typeScaleSteps.all.reduce((steps, step, i) => {
		const min = {
			fontSize:
				(state.min?.fontSize || 14) *
				Math.pow(scales[state.min?.ratio || 'perfectFourth'], i - baseStepIndex),
			breakpoint: state.min?.screenWidth
		};
		const max = {
			fontSize:
				(state.max?.fontSize || 16) *
				Math.pow(scales[state.max?.ratio || 'perfectFourth'], i - baseStepIndex),
			breakpoint: state.max?.screenWidth
		};
		const slope =
			(max.fontSize - min.fontSize) / ((max.breakpoint || 1024) - (min.breakpoint || 640));
		const slopeVw = `${round(slope * 100)}vw`;
		const intercept = min.fontSize - slope * (min.breakpoint || 640);
		const minV = withUnit(round(convertToDesiredUnit(min.fontSize)));
		const maxV = withUnit(round(convertToDesiredUnit(max.fontSize)));
		const preferred = `${slopeVw} + ${withUnit(round(convertToDesiredUnit(intercept)))}`;
		const value = `clamp(${minV}, ${preferred}, ${maxV})`;

		Object.assign(steps, {
			[step]: [value, `calc(${value} * 1.1)`]
		});
		return steps;
		// NOTE: Using a Map instead of an object to preserve key insertion order.
	}, {} as TypeScale);
};
