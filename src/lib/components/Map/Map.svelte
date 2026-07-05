<script lang="ts" module>
	export type { MapMarker } from './map-data.js';
	export type * from './map-types.js';
</script>

<script lang="ts" generics="TData = unknown">
	import { onDestroy, onMount } from 'svelte';
	import { useTheme } from '../Theme/theme.state.svelte.js';
	import { useMapTheme } from './map.theme.js';
	import MapContent from './MapContent.svelte';
	import MapShapeLayer from './MapShapeLayer.svelte';
	import MapSkeleton from './MapSkeleton.svelte';
	import MapViewport from './MapViewport.svelte';
	import { resolveMapClusterConfig } from './map-cluster.js';
	import { normalizeMapMarkers } from './map-data.js';
	import { reportMapError, toMapError } from './map-errors.js';
	import { applyMapInteractivity, getMapInteractionOptions } from './map-interactivity.js';
	import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, resolveDefaultMapTheme, resolveMapStyle } from './map-theme.js';
	import { bindMapStyleTokenChanges } from './map-token-style.js';
	import { bindMapViewEvents } from './map-view-events.js';
	import { getMapMarkerBounds, normalizeMapBounds } from './map-viewport.js';
	import { loadMapLibreFromCdn } from './maplibre-cdn.js';
	import type { NormalizedMapMarkers } from './map-data.js';
	import type { MapProps } from './map.props.js';
	import type { MapLibreErrorEvent, MapLibreMap, MapLibreMapOptions, MapLibreMarkerConstructor } from './maplibre-types.js';

	let {
		markers,
		styleUrl,
		styles,
		center = DEFAULT_MAP_CENTER,
		zoom = DEFAULT_MAP_ZOOM,
		bounds,
		minZoom,
		maxZoom,
		fitMarkersOnMount,
		fitMarkersPadding,
		interactive,
		showAttribution = true,
		cluster,
		controls = true,
		controlPosition,
		geolocation,
		userLocationMarker,
		marker,
		clusterMarker,
		controlButton,
		popup,
		tooltip,
		shapes,
		onmarkerclick,
		onclusterclick,
		onmapready,
		onviewchange,
		onmoveend,
		onzoomend,
		onerror,
		size = 'normal',
		theme: mapTheme,
		class: className,
		...rest
	}: MapProps<TData> = $props();

	const theme = useTheme();
	const classes = $derived(useMapTheme(mapTheme));

	let container: HTMLDivElement | undefined;
	let map = $state.raw<MapLibreMap | null>(null);
	let MarkerConstructor = $state.raw<MapLibreMarkerConstructor | null>(null);
	let isMapLoaded = $state(false);
	// Surfaced when the map fails to create (e.g. MapLibre CDN unreachable) so the
	// skeleton doesn't hang forever with no indication of what went wrong.
	let loadError = $state<Error | null>(null);
	let isMounted = false;
	let appliedStyleSignature: string | undefined;
	let styleRequestId = 0;
	let unbindStyleTokenChanges: (() => void) | undefined;
	let normalizedMarkers: NormalizedMapMarkers<TData> = $derived(normalizeMapMarkers(markers));
	let markerNodes = $derived(Array.from(normalizedMarkers.markerLookup.values()));
	let markerBounds = $derived(getMapMarkerBounds(markerNodes));
	let normalizedBounds = $derived(bounds ? normalizeMapBounds(bounds) : null);
	let resolvedMapTheme = $derived(resolveDefaultMapTheme((theme.resolvedTheme === 'dark')));
	let clusterConfig = $derived(resolveMapClusterConfig(cluster));

	function reportError(error: Error): void {
		reportMapError(error, onerror);
	}

	function handleMapError(event: MapLibreErrorEvent | { error?: unknown }): void {
		const payload = event && typeof event === 'object' && 'error' in event ? event.error : event;
		reportError(toMapError(payload, 'MapLibre emitted a non-Error error payload.'));
	}

	async function createMap(): Promise<void> {
		if (!container || map) {
			return;
		}
		loadError = null;

		try {
			const [maplibre, initialStyle] = await Promise.all([
				loadMapLibreFromCdn(),
				resolveMapStyle(resolvedMapTheme, container, styleUrl, styles)
			]);
			if (!isMounted || !container || map) {
				return;
			}

			MarkerConstructor = maplibre.Marker;
			const mapOptions: MapLibreMapOptions = {
				container,
				style: initialStyle.style,
				center,
				zoom,
				minZoom,
				maxZoom,
				attributionControl: showAttribution ? {} : false,
				...getMapInteractionOptions(interactive)
			};
			const mapInstance = new maplibre.Map(mapOptions);

			mapInstance.on('error', handleMapError);
			mapInstance.on('load', () => {
				if (!isMounted || map !== mapInstance) {
					return;
				}

				isMapLoaded = true;
				onmapready?.(mapInstance);
			});

			appliedStyleSignature = initialStyle.signature;
			map = mapInstance;
		} catch (error) {
			const mapError = toMapError(error, 'Failed to create MapLibre map.');
			loadError = mapError;
			reportError(mapError);
		}
	}

	async function applyResolvedStyle(): Promise<void> {
		if (!map || !container) return;
		const requestId = ++styleRequestId;

		try {
			const nextStyle = await resolveMapStyle(resolvedMapTheme, container, styleUrl, styles);
			if (!isMounted || !map || requestId !== styleRequestId || appliedStyleSignature === nextStyle.signature) return;
			map.setStyle(nextStyle.style);
			appliedStyleSignature = nextStyle.signature;
		} catch (error) {
			reportError(toMapError(error, 'Failed to apply MapLibre map style.'));
		}
	}

	function removeMap(): void {
		if (!map) {
			return;
		}

		map.remove();
		map = null;
		MarkerConstructor = null;
		isMapLoaded = false;
	}

	onMount(() => {
		isMounted = true;
		if (container) {
			unbindStyleTokenChanges = bindMapStyleTokenChanges(container, () => void applyResolvedStyle());
		}
		void createMap();
	});

	onDestroy(() => {
		isMounted = false;
		unbindStyleTokenChanges?.();
		removeMap();
	});

	$effect(() => {
		resolvedMapTheme;
		styleUrl;
		styles;
		void applyResolvedStyle();
	});

	$effect(() => {
		if (!map || (!onviewchange && !onmoveend && !onzoomend)) {
			return;
		}

		return bindMapViewEvents(map, {
			onviewchange,
			onmoveend,
			onzoomend
		});
	});

	$effect(() => {
		if (!map) {
			return;
		}

		applyMapInteractivity(map, interactive);
	});
</script>

<div
	bind:this={container}
	data-slot="map"
	class={classes.root({ size, className })}
	{...rest}
>
	{#if loadError}
		<div
			role="alert"
			class="text-danger bg-background absolute inset-0 z-10 flex items-center justify-center p-6 text-center text-sm"
		>
			{loadError.message}
		</div>
	{:else if !isMapLoaded}
		<MapSkeleton />
	{/if}

	{#if map}
		<MapShapeLayer {map} {shapes} {onerror} />
		<MapViewport
			{map}
			{isMapLoaded}
			{center}
			{zoom}
			{minZoom}
			{maxZoom}
			bounds={normalizedBounds}
			{markerBounds}
			{fitMarkersOnMount}
			{fitMarkersPadding}
		/>
	{/if}

	{#if map && MarkerConstructor}
		<MapContent
			{map}
			Marker={MarkerConstructor}
			{normalizedMarkers}
			markers={markerNodes}
			{clusterConfig}
			{controls}
			{controlPosition}
			{geolocation}
			{center}
			{zoom}
			bounds={normalizedBounds}
			{fitMarkersPadding}
			{marker}
			{popup}
			{tooltip}
			{clusterMarker}
			{userLocationMarker}
			{controlButton}
			{onmarkerclick}
			{onclusterclick}
			{onerror}
		/>
	{/if}
</div>
