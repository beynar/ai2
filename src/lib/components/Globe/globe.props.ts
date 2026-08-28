import type { Colors } from '$lib/types/index.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { GlobeThemeProps } from './globe.theme.js';

/** A theme color token, or an explicit normalized RGB triple (each channel 0–1). */
export type GlobeColor = Colors | [number, number, number];

/** A point on the globe. */
export type GlobeMarker = {
	/** `[latitude, longitude]` in degrees. */
	location: [number, number];
	/** Dot size (roughly 0–1). */
	size: number;
	/** Optional per-marker RGB (0–1); falls back to `markerColor`. */
	color?: [number, number, number];
};

/** Imperatively rotate the globe to face a coordinate. Bound via `bind:scrollTo`. */
export type GlobeScrollTo = (latitude: number, longitude: number) => void;

export type GlobeProps = WithAttachments<{
	/**
	 * Classes applied to the `<canvas>`. The default theme sizes it to 400px square.
	 */
	class?: string;
	/**
	 * Theme overrides for the canvas.
	 */
	theme?: GlobeThemeProps;
	/**
	 * Color of the landmass dots — a theme token or an RGB triple (0–1).
	 */
	baseColor?: GlobeColor;
	/**
	 * Color of the marker dots — a theme token or an RGB triple (0–1).
	 */
	markerColor?: GlobeColor;
	/**
	 * Color of the atmospheric glow — a theme token or an RGB triple (0–1).
	 */
	glowColor?: GlobeColor;
	/**
	 * Idle auto-rotation speed. `0` disables it. Negative reverses direction.
	 */
	autoRotate?: number;
	/**
	 * Shading darkness, `0` (flat) to `1` (default — a shaded 3D sphere). Pass a negative value to
	 * follow the app theme instead (dark -> 1, light -> 0).
	 */
	dark?: number;
	/**
	 * Markers plotted on the globe (`[lat, lng]` + size).
	 */
	markers?: GlobeMarker[];
	/**
	 * Globe offset in pixels or viewport-relative percentages: `[x, y]`.
	 */
	offset?: [number, number] | [`${number}%`, `${number}%`];
	/**
	 * Globe scale relative to the canvas. `1` fills it.
	 */
	scale?: number;
	/**
	 * Diffuse lighting intensity.
	 */
	diffuse?: number;
	/**
	 * Number of dots sampled for the map (0–100000).
	 */
	mapSamples?: number;
	/**
	 * Brightness of the map dots.
	 */
	mapBrightness?: number;
	/**
	 * Brightness of samples that fall outside the landmass.
	 */
	mapBaseBrightness?: number;
	/**
	 * Opacity of the globe texture (0–1).
	 */
	opacity?: number;
	/**
	 * Render resolution multiplier. Defaults to the device pixel ratio.
	 */
	devicePixelRatio?: number;
	/**
	 * Initial horizontal angle (φ), 0 ≤ phi ≤ 2π.
	 */
	phi?: number;
	/**
	 * Initial vertical angle (θ), -π ≤ theta ≤ π.
	 */
	theta?: number;
	/**
	 * Whether the globe can be dragged to rotate.
	 */
	draggable?: boolean;
	/**
	 * Axis along which dragging rotates the globe.
	 */
	dragAxis?: 'x' | 'y' | 'xy';
	/**
	 * How fast dragging rotates the globe.
	 */
	dragSpeed?: number;
	/**
	 * Spring stiffness for drag momentum.
	 */
	dragStiffness?: number;
	/**
	 * Spring damping for drag momentum.
	 */
	dragDamping?: number;
	/**
	 * Bindable rotation function — `bind:scrollTo` to get a `(lat, lng) => void` you can call.
	 */
	scrollTo?: GlobeScrollTo;
	/**
	 * Called once the globe has rendered its first frame.
	 */
	onReady?: () => void;
}>;
