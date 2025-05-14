import plugin, { type ThemeConfig } from 'tailwindcss/plugin.js';
import type { TypeScale } from './typeScale.js';
import { generateColorPalette, toTailwindCssTheme, type ColorTheme } from './colors.js';

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
}> &
	ColorTheme;

// export default plugin.withOptions<ThemeOptions>((theme = {}) => {
// 	return ({ addBase, addComponents, addUtilities, theme: t }) => {
// 		console.log('hello yo');

// 		addBase({
// 			body: {
// 				backgroundColor: 'red',
// 				color: '#000'
// 			},
// 			'@layer theme': {
// 				':root': {
// 					'--color-danger': 'oklch(.558 .288 302.321)'
// 				}
// 			}
// 		});

// 		return {
// 			theme: {
// 				extend: {
// 					colors: {
// 						'--color-danger': 'oklch(.558 .288 302.321)'
// 					}
// 				}
// 			}
// 		} satisfies ThemeConfig;
// 	};
// });

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
	() => ({
		theme: {
			extend: {
				colors: toTailwindCssTheme()
			}
		}
	})
);
