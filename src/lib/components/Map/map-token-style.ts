import { getContrast, mix } from 'color2k';
import { toMapLibreColor } from './map-css-color.js';
import type { MapLibreStyleSpecification } from './maplibre-types.js';

const POSITRON_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

type MapStyleColorName =
	| 'background'
	| 'backgroundMuted'
	| 'landcover'
	| 'residential'
	| 'road'
	| 'roadCase'
	| 'detail'
	| 'building'
	| 'boundary'
	| 'label'
	| 'water'
	| 'waterLine'
	| 'waterLabel'
	| 'poi'
	| 'halo';

type MapStyleColors = Record<MapStyleColorName, string>;
type MapStyleTokenName =
	| 'background'
	| 'card'
	| 'foreground'
	| 'muted'
	| 'mutedForeground'
	| 'accent'
	| 'primary'
	| 'destructive'
	| 'sidebar'
	| 'sidebarAccent'
	| 'sidebarBorder'
	| 'chart1'
	| 'chart2'
	| 'chart3'
	| 'chart4'
	| 'chart5';
type MapStyleTokens = Record<MapStyleTokenName, string>;

const FALLBACK_COLORS: MapStyleColors = {
	background: '#fafaf8',
	backgroundMuted: '#f5f5f3',
	landcover: 'rgb(234, 241, 233)',
	residential: 'rgb(237, 237, 237)',
	road: '#fff',
	roadCase: '#ddd',
	detail: '#e6e6e6',
	building: '#ededed',
	boundary: '#ead5d7',
	label: '#697b89',
	water: '#d4dadc',
	waterLine: '#d1dbdf',
	waterLabel: '#7a96a0',
	poi: '#7d9c83',
	halo: 'rgba(255,255,255,0.5)'
};

const POSITRON_COLOR_MAP: Record<string, MapStyleColorName> = {
	'#fafaf8': 'background',
	'#f5f5f3': 'backgroundMuted',
	'#fff': 'road',
	'#ffffff': 'road',
	'#fdfdfd': 'road',
	'#eee': 'road',
	'#eeeeee': 'road',
	'#e6e6e6': 'detail',
	'#ededed': 'building',
	'#e8e8e8': 'building',
	'#f3efed': 'roadCase',
	'#ead5d7': 'boundary',
	'#e1c5c7': 'boundary',
	'#f2e6e7': 'boundary',
	'#ebd6d8': 'boundary',
	'#ddd': 'roadCase',
	'#dddddd': 'roadCase',
	'#dfdfdf': 'roadCase',
	'#d5d5d5': 'roadCase',
	'#d4dadc': 'water',
	'#d1dbdf': 'waterLine',
	'#abb6be': 'waterLabel',
	'#7a96a0': 'waterLabel',
	'#697b89': 'label',
	'#838383': 'label',
	'#97a4ae': 'label',
	'#8a99a4': 'label',
	'#a1adb6': 'label',
	'#b9c2c9': 'label',
	'#7d9c83': 'poi',
	'rgba(238,238,238,1)': 'road',
	'rgba(255,255,255,0.5)': 'halo'
};

let positronStylePromise: Promise<MapLibreStyleSpecification> | null = null;

export async function createTokenizedPositronStyle(root: HTMLElement): Promise<{
	style: MapLibreStyleSpecification;
	signature: string;
}> {
	const style = await loadPositronStyle();
	const colors = readMapStyleColors(root);
	const themedStyle = replaceStyleColors(style, colors) as MapLibreStyleSpecification;
	themedStyle.name = 'Svelte Pro Positron';
	return { style: themedStyle, signature: createMapStyleSignature(colors) };
}

export function bindMapStyleTokenChanges(root: HTMLElement, callback: () => void): () => void {
	let tokenSignature = createMapStyleSignature(readMapStyleColors(root));
	let frame = 0;

	function scheduleTokenCheck(): void {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const nextSignature = createMapStyleSignature(readMapStyleColors(root));
			if (nextSignature === tokenSignature) return;
			tokenSignature = nextSignature;
			callback();
		});
	}

	const observer = new MutationObserver(scheduleTokenCheck);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class', 'style', 'data-theme']
	});
	observer.observe(document.head, { childList: true, subtree: true, characterData: true });

	return () => {
		cancelAnimationFrame(frame);
		observer.disconnect();
	};
}

async function loadPositronStyle(): Promise<MapLibreStyleSpecification> {
	positronStylePromise ??= fetchPositronStyle().catch((error: unknown) => {
		positronStylePromise = null;
		throw error;
	});
	return positronStylePromise;
}

async function fetchPositronStyle(): Promise<MapLibreStyleSpecification> {
	const response = await fetch(POSITRON_STYLE_URL);
	if (!response.ok) {
		throw new Error(`Failed to load Positron map style from ${POSITRON_STYLE_URL}.`);
	}

	const style: unknown = await response.json();
	if (!isMapLibreStyle(style)) {
		throw new Error('Positron map style response is not a valid MapLibre style.');
	}

	return style;
}

function isMapLibreStyle(value: unknown): value is MapLibreStyleSpecification {
	return (
		typeof value === 'object' &&
		value !== null &&
		'version' in value &&
		(value as { version: unknown }).version === 8 &&
		'sources' in value &&
		typeof (value as { sources: unknown }).sources === 'object' &&
		'layers' in value &&
		Array.isArray((value as { layers: unknown }).layers)
	);
}

function readMapStyleColors(root: HTMLElement): MapStyleColors {
	const probe = document.createElement('span');
	probe.style.position = 'fixed';
	probe.style.pointerEvents = 'none';
	probe.style.opacity = '0';
	root.append(probe);

	try {
		const tokens = readMapStyleTokens(probe);
		// svelai's Theme writes `color-scheme: dark` on <html> for every dark theme —
		// including custom-named ones (data-theme="midnight") — so read that first, and
		// fall back to the `.dark` / data-theme="dark" defaults.
		const root = document.documentElement;
		const isDarkScheme =
			getComputedStyle(root).colorScheme === 'dark' ||
			root.classList.contains('dark') ||
			root.getAttribute('data-theme') === 'dark';
		if (isDarkScheme) {
			return getDarkMapStyleColors(tokens);
		}

		return getLightMapStyleColors(tokens);
	} finally {
		probe.remove();
	}
}

// Token reads translated from shadcn/ui variables to the svelai `--color-*` design
// tokens. Each is coerced to sRGB via `color-mix(in srgb, …)` in readCssColor, so
// tokens that resolve to oklab()/color-mix() still come back as concrete rgb.
// The MapStyleTokenName keys keep their original (shadcn-derived) names — only the
// CSS variable each one reads changes — so the light/dark derivation math below is
// untouched. svelai has no chart palette, so chart1..5 map onto the semantic colors
// that best match each cartographic role (water→info/primary, land/poi→success,
// boundary→danger).
function readMapStyleTokens(probe: HTMLElement): MapStyleTokens {
	return {
		background: readCssColor(probe, 'var(--color-background)', FALLBACK_COLORS.background),
		card: readCssColor(probe, 'var(--color-background-light)', FALLBACK_COLORS.background),
		foreground: readCssColor(probe, 'var(--color-foreground)', FALLBACK_COLORS.road),
		muted: readCssColor(probe, 'var(--color-background-muted)', FALLBACK_COLORS.backgroundMuted),
		mutedForeground: readCssColor(probe, 'var(--color-foreground-muted)', FALLBACK_COLORS.label),
		accent: readCssColor(probe, 'var(--color-secondary)', FALLBACK_COLORS.backgroundMuted),
		primary: readCssColor(probe, 'var(--color-primary)', FALLBACK_COLORS.water),
		destructive: readCssColor(probe, 'var(--color-danger)', FALLBACK_COLORS.boundary),
		sidebar: readCssColor(probe, 'var(--color-background-light)', FALLBACK_COLORS.background),
		sidebarAccent: readCssColor(probe, 'var(--color-background-muted)', FALLBACK_COLORS.backgroundMuted),
		sidebarBorder: readCssColor(probe, 'var(--color-background-muted)', FALLBACK_COLORS.roadCase),
		chart1: readCssColor(probe, 'var(--color-info)', FALLBACK_COLORS.water),
		chart2: readCssColor(probe, 'var(--color-primary)', FALLBACK_COLORS.waterLine),
		chart3: readCssColor(probe, 'var(--color-success)', FALLBACK_COLORS.landcover),
		chart4: readCssColor(probe, 'var(--color-success)', FALLBACK_COLORS.poi),
		chart5: readCssColor(probe, 'var(--color-danger)', FALLBACK_COLORS.boundary)
	};
}

function getLightMapStyleColors(tokens: MapStyleTokens): MapStyleColors {
	const base = tokens.background;

	return {
		background: base,
		backgroundMuted: mixToContrast(base, tokens.sidebarAccent, base, 1.03, 0.12, tokens.muted),
		landcover: mixToContrast(base, tokens.chart3, base, 1.04, 0.1, tokens.sidebarAccent),
		residential: mixToContrast(base, tokens.sidebar, base, 1.03, 0.12, tokens.muted),
		road: mixToContrast(base, tokens.foreground, base, 1.08, 0.08),
		roadCase: mixToContrast(base, tokens.sidebarBorder, base, 1.15, 0.34, tokens.foreground),
		detail: mixToContrast(base, tokens.mutedForeground, base, 1.08, 0.12),
		building: mixToContrast(base, tokens.foreground, base, 1.08, 0.12),
		boundary: mixToContrast(base, tokens.chart5, base, 1.14, 0.24, tokens.destructive),
		label: mixToContrast(base, tokens.mutedForeground, base, 2.35, 0.88, tokens.foreground),
		water: mixToContrast(base, tokens.chart1, base, 1.06, 0.16, tokens.primary),
		waterLine: mixToContrast(base, tokens.chart2, base, 1.12, 0.24, tokens.primary),
		waterLabel: mixToContrast(tokens.mutedForeground, tokens.chart2, base, 2.2, 0.32, tokens.foreground),
		poi: mixToContrast(base, tokens.chart4, base, 1.2, 0.34, tokens.primary),
		halo: withAlpha(base, 0.76)
	};
}

function getDarkMapStyleColors(tokens: MapStyleTokens): MapStyleColors {
	const base = tokens.background;

	return {
		background: base,
		backgroundMuted: mixToContrast(base, tokens.sidebarAccent, base, 1.08, 0.32, tokens.muted),
		landcover: mixToContrast(base, tokens.chart3, base, 1.1, 0.16, tokens.sidebarAccent),
		residential: mixToContrast(base, tokens.sidebar, base, 1.06, 0.28, tokens.muted),
		road: mixToContrast(tokens.muted, tokens.foreground, base, 1.45, 0.28),
		roadCase: mixToContrast(tokens.muted, tokens.sidebarBorder, base, 1.25, 0.42, tokens.foreground),
		detail: mixToContrast(tokens.muted, tokens.foreground, base, 1.16, 0.14),
		building: mixToContrast(base, tokens.foreground, base, 1.18, 0.2),
		boundary: mixToContrast(base, tokens.chart5, base, 1.28, 0.3, tokens.destructive),
		label: mixToContrast(base, tokens.mutedForeground, base, 2.25, 0.78),
		water: mixToContrast(base, tokens.chart1, base, 1.45, 0.58, tokens.primary),
		waterLine: mixToContrast(base, tokens.chart2, base, 1.72, 0.72, tokens.primary),
		waterLabel: mixToContrast(tokens.mutedForeground, tokens.chart2, base, 2.5, 0.48, tokens.foreground),
		poi: mixToContrast(tokens.muted, tokens.chart4, base, 1.35, 0.32, tokens.primary),
		halo: withAlpha(base, 0.64)
	};
}

function mixToContrast(
	baseColor: string,
	pairColor: string,
	backgroundColor: string,
	targetContrast: number,
	maxPairWeight: number,
	fallbackPairColor?: string
): string {
	const pairedColor = findContrastMix(baseColor, pairColor, backgroundColor, targetContrast, maxPairWeight);

	if (pairedColor) {
		return pairedColor;
	}

	return fallbackPairColor
		? findContrastMix(baseColor, fallbackPairColor, backgroundColor, targetContrast, maxPairWeight) ?? pairedColor ?? baseColor
		: baseColor;
}

function findContrastMix(
	baseColor: string,
	pairColor: string,
	backgroundColor: string,
	targetContrast: number,
	maxPairWeight: number
): string | null {
	const stepCount = 20;

	for (let step = 0; step <= stepCount; step += 1) {
		const pairWeight = (maxPairWeight * step) / stepCount;
		const candidate = mixColors(baseColor, pairColor, pairWeight);

		if (getContrast(candidate, backgroundColor) >= targetContrast) {
			return candidate;
		}
	}

	return null;
}

function mixColors(baseColor: string, pairColor: string, pairWeight: number): string {
	return mix(baseColor, pairColor, pairWeight);
}

function readCssColor(probe: HTMLElement, expression: string, fallback: string): string {
	// Seed a sentinel first: if `expression` references an undefined var(), the
	// color-mix() is invalid-at-computed-value-time and the assignment is rejected,
	// leaving the sentinel in place. That lets us return the intended FALLBACK_COLORS
	// instead of the inherited black that an unresolved token would otherwise yield.
	const SENTINEL = 'rgb(255, 0, 1)';
	probe.style.color = SENTINEL;
	probe.style.color = `color-mix(in srgb, ${expression} 100%, transparent)`;
	const resolved = getComputedStyle(probe).color;
	if (resolved === SENTINEL) return fallback;
	return toMapLibreColor(resolved) ?? fallback;
}

function replaceStyleColors(value: unknown, colors: MapStyleColors): unknown {
	if (typeof value === 'string') {
		const color = normalizeStyleColor(value);
		return getDynamicStyleColor(color, colors) ?? colors[POSITRON_COLOR_MAP[color]] ?? value;
	}

	if (Array.isArray(value)) {
		return value.map((item) => replaceStyleColors(item, colors));
	}

	if (typeof value === 'object' && value !== null) {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, replaceStyleColors(item, colors)])
		);
	}

	return value;
}

function getDynamicStyleColor(color: string, colors: MapStyleColors): string | undefined {
	const residentialMatch = /^rgba\(237,237,237,([\d.]+)\)$/.exec(color);
	if (residentialMatch) return withAlpha(colors.residential, Number(residentialMatch[1]));
	if (color === 'rgba(234,241,233,0.5)') return withAlpha(colors.landcover, 0.5);
}

function withAlpha(color: string, alpha: number): string {
	const match = /^rgba?\(([^,]+),([^,]+),([^,)]+)(?:,[^)]+)?\)$/.exec(color);
	if (!match || !Number.isFinite(alpha)) return color;
	return `rgba(${match[1].trim()}, ${match[2].trim()}, ${match[3].trim()}, ${alpha})`;
}

function normalizeStyleColor(color: string): string {
	return color.toLowerCase().replace(/\s+/g, '');
}

function createMapStyleSignature(colors: MapStyleColors): string {
	return Object.entries(colors).map(([name, color]) => `${name}:${color}`).join('|');
}
