import plugin, { type ThemeConfig } from 'tailwindcss/plugin.js';
import { getTypeScale, type TypeScale } from './typeScale.js';
import { generateColorPalette, toTailwindCssTheme, type ColorTheme } from './colors.js';
import { radiusCssVariables, radiusTheme, type RadiusSize } from './radius.js';
import { spacingCssVariables, spacingTheme, type Spacing } from './spacing.js';
import type { Spinner } from './spinnner.js';
import { applyGlobalEngine, globalKeyframes } from './global.js';

export type ThemeOptions = Partial<{
	name: string;
	default: boolean;
	luminance?: number;
	saturation?: number;
	colorScheme?: 'light' | 'dark';
	'primary-tint-intensity'?: number;
	spacing?: Spacing;
	'border-width'?: number;
	'raised-with-border'?: boolean;
	'overlay-hover'?: string;
	'overlay-pressed'?: string;
	scale?: TypeScale;
	prefersDark?: boolean;
	radius?: RadiusSize;
	spinner?: Spinner;
}> &
	ColorTheme;

export default plugin.withOptions<ThemeOptions>(
	(theme = {}) => {
		return (api) => {
			const { addBase } = api;
			const { cssVariables } = generateColorPalette(theme);
			// Radius and spacing are per-theme scales (CSS vars), so light/dark can each
			// round and breathe differently.
			const themeVariables = {
				...cssVariables,
				...radiusCssVariables(theme.radius),
				...spacingCssVariables(theme.spacing)
			};
			const root = theme.name && !theme.default ? `html[data-theme="${theme.name}"]` : 'html';
			const roots = [root, theme.name ? `.${theme.name}` : ''].filter(Boolean);
			const rootBase = Object.fromEntries(roots.map((root) => [root, themeVariables]));
			addBase(rootBase);

			if (theme.prefersDark) {
				addBase({
					'@media (prefers-color-scheme: dark)': {
						rootBase
					}
				});
			}

			addBase({
				'*': {
					'-webkit-font-smoothing': 'subpixel-antialiased'
				}
			});

			// RAISED UTILITY
			if (theme['raised-with-border'] !== false) {
				addBase({
					[`html[data-theme="${theme.name}"]`]: {
						'--raised-border': '1px solid var(--current-border, var(--color-background-muted))'
					},
					[`.${theme.name}`]: {
						'--raised-border': '1px solid var(--current-border, var(--color-background-muted))'
					}
				});
			}

			// The default theme bootstraps the palette-agnostic engine (utilities,
			// variants, spinner, raised-*) so a single @plugin declaration is enough.
			if (theme.default) {
				applyGlobalEngine(api, theme);
			}
		};
	},
	(options) => ({
		theme: {
			extend: {
				colors: toTailwindCssTheme(),
				radius: radiusTheme(),
				spacing: spacingTheme(),
				// Keyframes belong to the engine — register them once, from the default theme.
				...(options?.default ? { keyframes: globalKeyframes(options) } : {})
				// fontSize: getTypeScale({
				// 	baseMinPx: 14,
				// 	baseMaxPx: 16,
				// 	scale: 'majorThird'
				// })
			}
		}
	})
);
