import type { PluginAPI } from 'tailwindcss/plugin';

type CssRule = {
	[key: string]: string | string[] | CssRule | CssRule[];
};

type UtilityRules = Record<string, CssRule | CssRule[]>;

type BareValue = {
	value: string;
};

type MatchUtilityValues = Record<string, string> & {
	__BARE_VALUE__?: (value: BareValue) => string | undefined;
};

const withBareValue = (
	values: Record<string, string>,
	getBareValue: (value: BareValue) => string | undefined
) => {
	// Tailwind declares __BARE_VALUE__ beside a string index signature; this hook is
	// valid at runtime but impossible to express without a narrow assertion.
	return {
		...values,
		__BARE_VALUE__: getBareValue
	} as MatchUtilityValues;
};

const integerValue = ({ value }: BareValue) => (/^\d+$/.test(value) ? value : undefined);

const spacingValue = ({ value }: BareValue) =>
	/^\d+$/.test(value) ? `calc(var(--spacing) * ${value})` : undefined;

export const shimmerKeyframes = {
	'tw-shimmer': {
		from: {
			'background-position': '100% 0'
		},
		to: {
			'background-position': '0 0'
		}
	}
};

const shimmerProperties: CssRule = {
	'@property --shimmer-angle': {
		syntax: '"<angle>"',
		inherits: 'true',
		'initial-value': '20deg'
	},
	'@property --shimmer-image': {
		syntax: '"*"',
		inherits: 'false'
	},
	'@property --shimmer-text-fill': {
		syntax: '"*"',
		inherits: 'false'
	},
	'@media (prefers-reduced-motion: reduce)': {
		'.shimmer': {
			animation: 'none',
			'background-image': 'none',
			'-webkit-text-fill-color': 'currentColor'
		}
	}
};

const shimmerUtilities: UtilityRules = {
	'.shimmer': {
		'--_spread': 'var(--shimmer-spread, calc(3ch + 40px))',
		'--_base': 'currentColor',
		'--_highlight': 'var(--shimmer-color, oklch(from currentColor l c h / calc(alpha * 0.2)))',
		'background-image':
			'var(--shimmer-image, linear-gradient(calc(90deg + var(--shimmer-angle)), var(--_base) calc(50% - var(--_spread)), color-mix(in oklch, var(--_highlight), var(--_base) 50%) calc(50% - var(--_spread) * 0.5), var(--_highlight) 50%, color-mix(in oklch, var(--_highlight), var(--_base) 50%) calc(50% + var(--_spread) * 0.5), var(--_base) calc(50% + var(--_spread))))',
		'background-repeat': 'no-repeat',
		'background-size': 'calc(200% + var(--_spread) * 2) 100%',
		'background-position': '0 0',
		'background-clip': 'text',
		'-webkit-background-clip': 'text',
		'-webkit-text-fill-color': 'var(--shimmer-text-fill, transparent)',
		animation: 'tw-shimmer var(--shimmer-duration, 2s) linear infinite',
		'html[data-theme="dark"] &, .dark &, [data-color-scheme="dark"] &': {
			'--_highlight':
				'var(--shimmer-color, oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4)))'
		},
		'&:where([dir="rtl"], [dir="rtl"] *)': {
			'animation-direction': 'reverse'
		}
	},
	'.shimmer-once': {
		'animation-iteration-count': '1'
	},
	'.shimmer-reverse': {
		'animation-direction': 'reverse'
	},
	'.shimmer-none': {
		'--shimmer-image': 'none',
		'--shimmer-text-fill': 'currentColor'
	}
};

export const addShimmerUtilities = ({
	addBase,
	addUtilities,
	matchUtilities,
	theme
}: PluginAPI) => {
	addBase(shimmerProperties);
	addUtilities(shimmerUtilities);

	matchUtilities(
		{
			'shimmer-color': (value) => ({
				'--shimmer-color': value
			})
		},
		{
			values: theme('colors'),
			type: 'color',
			modifiers: theme('opacity')
		}
	);

	matchUtilities(
		{
			'shimmer-duration': (value) => ({
				'--shimmer-duration': `calc(${value} * 1ms)`
			})
		},
		{
			values: withBareValue({}, integerValue),
			type: 'integer'
		}
	);

	matchUtilities(
		{
			'shimmer-spread': (value) => ({
				'--shimmer-spread': value
			})
		},
		{
			values: withBareValue(theme('spacing'), spacingValue),
			type: ['length', 'percentage']
		}
	);

	matchUtilities(
		{
			'shimmer-angle': (value) => ({
				'--shimmer-angle': `calc(${value} * 1deg)`
			})
		},
		{
			values: withBareValue({}, integerValue),
			type: 'integer'
		}
	);
};
