// Simplified fluid type scale utility

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

/** Simplified type scale configuration */
type TypeScaleParams = {
	/** Base font size minimum (mobile) in pixels */
	baseMinPx?: number;
	/** Base font size maximum (desktop) in pixels */
	baseMaxPx?: number;
	/** Minimum viewport width in pixels */
	minViewport?: number;
	/** Maximum viewport width in pixels */
	maxViewport?: number;
	/** Scale ratio for sizing up/down from base */
	scale?: Scale;
	/** The pixel value of 1rem */
	remValueInPx?: number;
};

export const getTypeScale = (params: TypeScaleParams = {}): TypeScale => {
	// Default values with improved mobile-first approach
	const baseMinPx = params.baseMinPx ?? 16;
	const baseMaxPx = params.baseMaxPx ?? 18;
	const minViewport = params.minViewport ?? 375; // iPhone SE width
	const maxViewport = params.maxViewport ?? 1440; // Common desktop breakpoint
	const scale = params.scale ?? 'majorThird';
	const remValueInPx = params.remValueInPx ?? 16;

	const typeScaleSteps = ['xs', 's', 'DEFAULT', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
	const baseIndex = 2; // 'DEFAULT' is at index 2

	/** Rounds to 3 decimal places for better precision */
	const round = (val: number) => Number(val.toFixed(3));

	/** Converts pixels to rems */
	const pxToRem = (px: number) => px / remValueInPx;

	/** Creates a fluid clamp value */
	const createFluidValue = (minPx: number, maxPx: number) => {
		const minRem = round(pxToRem(minPx));
		const maxRem = round(pxToRem(maxPx));

		// Calculate the slope for the fluid scaling
		const slope = (maxPx - minPx) / (maxViewport - minViewport);
		const slopeVw = round(slope * 100);
		const intercept = minPx - slope * minViewport;
		const interceptRem = round(pxToRem(intercept));

		return `clamp(${minRem}rem, ${slopeVw}vw + ${interceptRem}rem, ${maxRem}rem)`;
	};

	const result: Record<string, string> = {};
	const ratio = scales[scale];

	for (let i = 0; i < typeScaleSteps.length; i++) {
		const step = typeScaleSteps[i];
		const multiplier = Math.pow(ratio, i - baseIndex);

		// Calculate min and max sizes for this step
		const minSize = baseMinPx * multiplier;
		const maxSize = baseMaxPx * multiplier;

		// Ensure minimum readable sizes, especially for smaller text
		const adjustedMinSize = i < baseIndex ? Math.max(minSize, 10) : minSize;
		const adjustedMaxSize = i < baseIndex ? Math.max(maxSize, 12) : maxSize;

		result[step] = createFluidValue(adjustedMinSize, adjustedMaxSize);
	}

	return result as TypeScale;
};

/** Preset configurations for common use cases */
export const typeScalePresets = {
	/** Compact scale - good for data-heavy interfaces */
	compact: {
		baseMinPx: 14,
		baseMaxPx: 16,
		scale: 'minorThird' as Scale
	},
	/** Default scale - balanced for most applications */
	default: {
		baseMinPx: 16,
		baseMaxPx: 18,
		scale: 'majorThird' as Scale
	},
	/** Comfortable scale - good for content-heavy sites */
	comfortable: {
		baseMinPx: 16,
		baseMaxPx: 20,
		scale: 'majorThird' as Scale
	},
	/** Large scale - good for marketing sites */
	large: {
		baseMinPx: 18,
		baseMaxPx: 22,
		scale: 'perfectFourth' as Scale
	}
} as const;

/** Helper function to create a type scale from a preset */
export const getTypeScaleFromPreset = (
	preset: keyof typeof typeScalePresets,
	overrides?: Partial<TypeScaleParams>
) => {
	return getTypeScale({ ...typeScalePresets[preset], ...overrides });
};
