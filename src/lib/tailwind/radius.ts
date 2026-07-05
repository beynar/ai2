export type RadiusSize = 'none' | 'subtile' | 'small' | 'normal' | 'large' | 'round' | number;

// The knob is a single multiplier applied to Tailwind's native radius scale, so
// one value proportionally rounds a theme. `normal` keeps the native defaults.
const radiusScale = {
	none: 0,
	subtile: 0.5,
	small: 0.75,
	normal: 1,
	large: 1.5,
	round: 2.5
};

// Tailwind v4 default radius scale (rem). Each native token is rescaled by the knob.
const nativeScale = {
	xs: 0.125,
	sm: 0.25,
	DEFAULT: 0.25,
	md: 0.375,
	lg: 0.5,
	xl: 0.75,
	'2xl': 1,
	'3xl': 1.5,
	'4xl': 2
} as const;

// Distinct namespace so the per-theme values never collide with Tailwind's native
// `--radius-*` (which live in `:root` and would win on specificity).
const cssVarName = (token: string) => (token === 'DEFAULT' ? '--ui-radius' : `--ui-radius-${token}`);

// Per-theme CSS variables computed from the knob — injected under each theme root,
// so light/dark (or any named theme) can each set their own radius.
export const radiusCssVariables = (size: RadiusSize = 'normal') => {
	const factor = typeof size === 'number' ? size : radiusScale[size];
	return Object.fromEntries(
		Object.entries(nativeScale).map(([token, rem]) => [cssVarName(token), `${rem * factor}rem`])
	);
};

// Static utilities that reference the per-theme variables. Registered once (global),
// while the resolved value follows whichever theme root is active.
export const radiusTheme = () =>
	Object.fromEntries(
		Object.keys(nativeScale).map((token) => [token, `var(${cssVarName(token)})`])
	) as Record<keyof typeof nativeScale, string>;
