export type Spacing = 'small' | 'normal' | 'large' | number;

// The knob is a single multiplier applied to Tailwind's native spacing scale, so
// one value proportionally tightens or loosens a theme. `normal` keeps the native
// defaults; `small` is denser, `large` is roomier.
const spacingScale = {
	small: 0.8,
	normal: 1,
	large: 1.2
};

// Tailwind v4 default spacing scale (rem). `0` and `px` are intentionally left to
// Tailwind's defaults — they are absolute anchors that should never scale.
const nativeScale = {
	'0.5': 0.125,
	'1': 0.25,
	'1.5': 0.375,
	'2': 0.5,
	'2.5': 0.625,
	'3': 0.75,
	'3.5': 0.875,
	'4': 1,
	'4.5': 1.125,
	'5': 1.25,
	'5.5': 1.375,
	'6': 1.5,
	'7': 1.75,
	'8': 2,
	'9': 2.25,
	'10': 2.5,
	'11': 2.75,
	'12': 3,
	'14': 3.5,
	'16': 4,
	'20': 5,
	'24': 6,
	'28': 7,
	'32': 8,
	'36': 9,
	'40': 10,
	'44': 11,
	'48': 12,
	'52': 13,
	'56': 14,
	'60': 15,
	'64': 16,
	'72': 18,
	'80': 20,
	'96': 24
} as const;

// Distinct namespace so the per-theme values never collide with Tailwind's native
// spacing (a `.` is illegal in a custom-property ident, so `0.5` becomes `0_5`).
const cssVarName = (token: string) => `--ui-spacing-${token.replace('.', '_')}`;

// Per-theme CSS variables computed from the knob — injected under each theme root,
// so light/dark (or any named theme) can each set their own density.
export const spacingCssVariables = (size: Spacing = 'normal') => {
	const factor = typeof size === 'number' ? size : spacingScale[size];
	return Object.fromEntries(
		Object.entries(nativeScale).map(([token, rem]) => [cssVarName(token), `${rem * factor}rem`])
	);
};

// Static scale that references the per-theme variables. Registered once (global),
// while the resolved value follows whichever theme root is active.
export const spacingTheme = () =>
	Object.fromEntries(
		Object.keys(nativeScale).map((token) => [token, `var(${cssVarName(token)})`])
	) as Record<keyof typeof nativeScale, string>;
