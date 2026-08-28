import plugin, { type Config } from 'tailwindcss/plugin';
import type { ThemeOptions } from './theme.js';
import { applyGlobalEngine, globalKeyframes } from './global.js';

export default plugin.withOptions<ThemeOptions>(
	(options) => (api) => applyGlobalEngine(api, options),
	(options) =>
		({
			theme: {
				extend: {
					keyframes: globalKeyframes(options)
				}
			}
		}) satisfies Config
);
