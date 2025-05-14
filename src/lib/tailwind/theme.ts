import plugin, { type ThemeConfig } from 'tailwindcss/plugin.js';
import type { TypeScale } from './typeScale.js';
import { generateColorPalette, toTailwindCssTheme, type ColorTheme } from './colors.js';
import { radius } from './radius.js';
import { spacing } from './spacing.js';

export type ThemeOptions = Partial<{
	name: string;
	default: boolean;
	luminance?: number;
	saturation?: number;
	colorScheme?: 'light' | 'dark';
	'primary-tint-intensity'?: number;
	'radius-inert-elements'?: number;
	'radius-interactive-elements'?: number;
	spacing?: number;
	'border-width'?: number;
	'raised-with-border'?: boolean;
	scale?: TypeScale;
	prefersDark?: boolean;
	radius?: number;
}> &
	ColorTheme;

export default plugin.withOptions<ThemeOptions>(
	(theme = {}) => {
		return ({ addBase, addComponents, addUtilities }) => {
			const { cssVariables } = generateColorPalette(theme);
			const root = theme.name && !theme.default ? `html[data-theme="${theme.name}"]` : 'html';
			addBase({
				[root]: {
					...cssVariables
				}
			});

			if (theme.prefersDark) {
				addBase({
					'@media (prefers-color-scheme: dark)': {
						[root]: {
							...cssVariables
						}
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
				spacing: spacing(options?.spacing)
			}
		}
	})
);
