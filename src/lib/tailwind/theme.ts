import plugin, { type ThemeConfig } from 'tailwindcss/plugin.js';
import { getTypeScale, type TypeScale } from './typeScale.js';
import { generateColorPalette, toTailwindCssTheme, type ColorTheme } from './colors.js';
import { radius, type RadiusSize } from './radius.js';
import { spacing, type Spacing } from './spacing.js';
import type { Spinner } from './spinnner.js';

export type ThemeOptions = Partial<{
	name: string;
	default: boolean;
	luminance?: number;
	saturation?: number;
	colorScheme?: 'light' | 'dark';
	'primary-tint-intensity'?: number;
	'radius-inert-elements'?: number;
	'radius-interactive-elements'?: number;
	spacing?: Spacing;
	'border-width'?: number;
	'raised-with-border'?: boolean;
	scale?: TypeScale;
	prefersDark?: boolean;
	radius?: RadiusSize;
	spinner?: Spinner;
}> &
	ColorTheme;

export default plugin.withOptions<ThemeOptions>(
	(theme = {}) => {
		return ({ addBase, addComponents, addUtilities }) => {
			const { cssVariables } = generateColorPalette(theme);
			const root = theme.name && !theme.default ? `html[data-theme="${theme.name}"]` : 'html';
			const roots = [root, theme.name ? `.${theme.name}` : ''].filter(Boolean);
			const rootBase = Object.fromEntries(roots.map((root) => [root, cssVariables]));
			addBase(rootBase);

			if (theme.prefersDark) {
				addBase({
					'@media (prefers-color-scheme: dark)': {
						rootBase
					}
				});
			}

			// RAISED UTILITY
			if (theme['raised-with-border'] !== false) {
				addBase({
					[`html[data-theme="${theme.name}"]`]: {
						'--raised-border': '1px solid var(--current-border, var(--color-surface-muted))'
					},
					[`.${theme.name}`]: {
						'--raised-border': '1px solid var(--current-border, var(--color-surface-muted))'
					}
				});
			}
		};
	},
	(options) => ({
		theme: {
			extend: {
				colors: toTailwindCssTheme(),
				radius: radius(options?.radius),
				spacing: spacing(options?.spacing || 'small')
				// fontSize: getTypeScale({
				// 	baseMinPx: 14,
				// 	baseMaxPx: 16,
				// 	scale: 'majorThird'
				// })
			}
		}
	})
);
