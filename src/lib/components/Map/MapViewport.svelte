<script lang="ts">
	import { getMapFitBoundsOptions, mapBoundsEqual } from './map-viewport.js';
	import type { MapLibreBounds, MapLibreMap } from './maplibre-types.js';

	type Props = {
		map: MapLibreMap;
		isMapLoaded: boolean;
		center: [number, number];
		zoom: number;
		minZoom?: number;
		maxZoom?: number;
		bounds: MapLibreBounds | null;
		markerBounds: MapLibreBounds | null;
		fitMarkersOnMount?: boolean;
		fitMarkersPadding?: number;
	};

	const POSITION_EPSILON = 0.0000001;
	const ZOOM_EPSILON = 0.000001;

	let {
		map,
		isMapLoaded,
		center,
		zoom,
		minZoom,
		maxZoom,
		bounds,
		markerBounds,
		fitMarkersOnMount,
		fitMarkersPadding
	}: Props = $props();

	let appliedBounds: MapLibreBounds | undefined;
	// svelte-ignore state_referenced_locally
	let appliedCenter: [number, number] | undefined = [...center];
	// svelte-ignore state_referenced_locally
	let appliedZoom: number | undefined = zoom;
	// svelte-ignore state_referenced_locally
	let appliedMinZoom: number | undefined = minZoom;
	// svelte-ignore state_referenced_locally
	let appliedMaxZoom: number | undefined = maxZoom;
	let didFitMarkersOnMount = false;

	function applyBounds(nextBounds: MapLibreBounds): void {
		if (mapBoundsEqual(appliedBounds, nextBounds)) {
			return;
		}

		map.fitBounds(nextBounds, getMapFitBoundsOptions(fitMarkersPadding));
		appliedBounds = [...nextBounds];
		appliedCenter = undefined;
		appliedZoom = undefined;
	}

	function fitMarkersAfterLoad(): void {
		if (didFitMarkersOnMount || bounds || !fitMarkersOnMount || !markerBounds) {
			return;
		}

		didFitMarkersOnMount = true;
		applyBounds(markerBounds);
	}

	function centerChanged(nextCenter: [number, number]): boolean {
		return (
			!appliedCenter ||
			Math.abs(nextCenter[0] - appliedCenter[0]) > POSITION_EPSILON ||
			Math.abs(nextCenter[1] - appliedCenter[1]) > POSITION_EPSILON
		);
	}

	$effect(() => {
		if (!isMapLoaded || !bounds) {
			return;
		}

		applyBounds(bounds);
		didFitMarkersOnMount = true;
	});

	$effect(() => {
		if (!isMapLoaded || bounds) {
			return;
		}

		appliedBounds = undefined;
		fitMarkersAfterLoad();
	});

	$effect(() => {
		if (bounds) {
			return;
		}

		appliedBounds = undefined;

		if (centerChanged(center)) {
			map.setCenter(center);
			appliedCenter = [...center];
		}

		if (appliedZoom === undefined || Math.abs(zoom - appliedZoom) > ZOOM_EPSILON) {
			map.setZoom(zoom);
			appliedZoom = zoom;
		}

		if (minZoom !== appliedMinZoom) {
			map.setMinZoom(minZoom ?? null);
			appliedMinZoom = minZoom;
		}

		if (maxZoom !== appliedMaxZoom) {
			map.setMaxZoom(maxZoom ?? null);
			appliedMaxZoom = maxZoom;
		}
	});
</script>
