import plugin from 'tailwindcss/plugin.js';
import { generateColorPalette, toTailwindCssTheme, type ColorTheme } from './colors.js';
import type { Spinner } from './spinner.js';
import { applyGlobalEngine, globalKeyframes } from './global.js';

export type ThemeOptions = Partial<{
	name: string;
	default: boolean;
	luminance?: number;
	saturation?: number;
	colorscheme?: 'light' | 'dark';
	'state-hover-opacity'?: number;
	'state-pressed-opacity'?: number;
	prefersDark?: boolean;
	spinner?: Spinner;
}> &
	ColorTheme;

export default plugin.withOptions<ThemeOptions>(
	(theme = {}) => {
		return (api) => {
			const { addBase } = api;
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

			addBase({
				'*': {
					'-webkit-font-smoothing': 'subpixel-antialiased'
				}
			});

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
				// Keyframes belong to the engine — register them once, from the default theme.
				...(options?.default ? { keyframes: globalKeyframes(options) } : {})
			}
		}
	})
);
