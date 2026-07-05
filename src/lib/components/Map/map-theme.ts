import type { MapStyleOverrides, MapStyleTheme } from './map-types.js';
import { createTokenizedPositronStyle } from './map-token-style.js';
import type { MapLibreStyle } from './maplibre-types.js';

export const DEFAULT_MAP_THEME: MapStyleTheme = 'positron';
export const DEFAULT_DARK_MAP_THEME: MapStyleTheme = 'dark';
export const DEFAULT_MAP_CENTER: [number, number] = [2.3522, 48.8566];
export const DEFAULT_MAP_ZOOM = 5;

export type ResolvedMapStyle = {
	style: MapLibreStyle;
	signature: string;
};

export function resolveDefaultMapTheme(isDarkScheme: boolean): MapStyleTheme {
	return isDarkScheme ? DEFAULT_DARK_MAP_THEME : DEFAULT_MAP_THEME;
}

export async function resolveMapStyle(
	theme: MapStyleTheme,
	root: HTMLElement,
	styleUrl?: string,
	styles?: MapStyleOverrides
): Promise<ResolvedMapStyle> {
	if (styleUrl !== undefined && styles !== undefined) {
		throw new Error('Map styleUrl and styles cannot both be set.');
	}

	if (styleUrl !== undefined) {
		if (styleUrl.trim() === '') {
			throw new Error('Map styleUrl cannot be an empty string.');
		}

		return { style: styleUrl, signature: `url:${styleUrl}` };
	}

	if (styles) {
		for (const [styleTheme, override] of Object.entries(styles)) {
			if (override !== undefined && override.trim() === '') {
				throw new Error(`Map styles.${styleTheme} cannot be an empty string.`);
			}
		}
	}

	const styleOverride = styles?.[theme];
	if (styleOverride !== undefined) {
		return { style: styleOverride, signature: `${theme}:${styleOverride}` };
	}

	return createTokenizedPositronStyle(root);
}
