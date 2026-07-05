<script lang="ts" generics="TData = unknown">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { arrowsInIcon } from '../Icons/arrowsIn.js';
	import { gpsFixIcon } from '../Icons/gpsFix.js';
	import { minusIcon } from '../Icons/minus.js';
	import { plusIcon } from '../Icons/plus.js';
	import { arrowsCounterClockwiseIcon } from '../Icons/arrowsCounterClockwise.js';
	import { customMapControlEvents, stopMapControlEvent } from './map-control-events.js';
	import { getCurrentMapUserLocation, getMapGeolocationZoom } from './map-geolocation.js';
	import {
		getMapControlActionLabel,
		isMapControlActionDisabled,
		resolveMapControlActions
	} from './map-controls.js';
	import { reportMapError, toMapError } from './map-errors.js';
	import { getMapFitBoundsOptions, getMapMarkerBounds } from './map-viewport.js';
	import type { MapMarker } from './map-data.js';
	import type {
		MapControlAction,
		MapControlButtonSnippetArg,
		MapControlPosition,
		MapUserLocation
	} from './map-types.js';
	import type { ResolvedMapGeolocationConfig } from './map-geolocation.js';
	import type { MapLibreBounds, MapLibreControl, MapLibreMap } from './maplibre-types.js';

	type Props<TData = unknown> = {
		map: MapLibreMap;
		controls: true | MapControlAction[];
		markers: MapMarker<TData>[];
		center: [number, number];
		zoom: number;
		bounds: MapLibreBounds | null;
		fitMarkersPadding?: number;
		controlPosition?: MapControlPosition;
		geolocationConfig: ResolvedMapGeolocationConfig;
		controlButton?: Snippet<[MapControlButtonSnippetArg]>;
		onuserlocationchange?: (location: MapUserLocation) => void;
		onerror?: (error: Error) => void;
	};

	let {
		map,
		controls,
		markers,
		center,
		zoom,
		bounds,
		fitMarkersPadding,
		controlPosition,
		geolocationConfig,
		controlButton,
		onuserlocationchange,
		onerror
	}: Props<TData> = $props();

	let element: HTMLDivElement | undefined;
	let mapControl: MapLibreControl | null = null;
	let isControlAttached = false;
	let isLocating = false;
	let hasUserLocation = false;
	let actionList = $derived(resolveMapControlActions(controls));

	function reportError(error: Error): void {
		reportMapError(error, onerror);
	}

	function isActionDisabled(action: MapControlAction): boolean {
		return isMapControlActionDisabled(action, markers.length) || (action === 'geolocate' && isLocating);
	}

	function isActionActive(action: MapControlAction): boolean {
		return action === 'geolocate' && (isLocating || hasUserLocation);
	}

	function getButtonArg(action: MapControlAction, disabled: boolean): MapControlButtonSnippetArg {
		return {
			action,
			disabled,
			active: isActionActive(action),
			label: getMapControlActionLabel(action),
			onclick: (event: MouseEvent) => handleActionClick(event, action, disabled)
		};
	}

	function handleActionClick(event: MouseEvent, action: MapControlAction, disabled: boolean): void {
		event.preventDefault();
		event.stopPropagation();

		if (disabled) {
			return;
		}

		void runActionSafely(action);
	}

	async function runActionSafely(action: MapControlAction): Promise<void> {
		try {
			await runAction(action);
		} catch (error) {
			reportError(toMapError(error, `Failed to run map control action "${action}".`));
		}
	}

	async function runAction(action: MapControlAction): Promise<void> {
		switch (action) {
			case 'zoom-in':
				map.zoomIn();
				return;
			case 'zoom-out':
				map.zoomOut();
				return;
			case 'fit-markers':
				fitMarkers();
				return;
			case 'geolocate':
				await geolocate();
				return;
			case 'reset':
				resetMapView();
				return;
		}

		throw new Error(`Unknown map control action "${action}".`);
	}

	async function geolocate(): Promise<void> {
		isLocating = true;

		try {
			const location = await getCurrentMapUserLocation();
			hasUserLocation = true;
			onuserlocationchange?.(location);
			map.easeTo({ center: location.lngLat, zoom: getMapGeolocationZoom(map, geolocationConfig.zoom) });
		} finally {
			isLocating = false;
		}
	}

	function fitMarkers(): void {
		const bounds = getMapMarkerBounds(markers);

		if (!bounds) {
			return;
		}

		map.fitBounds(bounds, getMapFitBoundsOptions(fitMarkersPadding));
	}

	function resetMapView(): void {
		if (bounds) {
			map.fitBounds(bounds, getMapFitBoundsOptions(fitMarkersPadding));
			return;
		}

		map.easeTo({ center, zoom });
	}

	function attachControl(): void {
		if (!element || mapControl) {
			return;
		}

		const control: MapLibreControl = {
			onAdd: () => {
				if (!element) {
					throw new Error('Map control element was not initialized.');
				}

				isControlAttached = true;
				return element;
			},
			onRemove: () => {
				isControlAttached = false;
				element?.remove();
			},
			getDefaultPosition: () => 'top-right'
		};

		mapControl = control;
		map.addControl(control, controlPosition);
	}

	function detachControl(): void {
		if (!mapControl || !isControlAttached) {
			mapControl = null;
			return;
		}

		try {
			map.removeControl(mapControl);
		} catch (error) {
			reportError(toMapError(error, 'Failed to remove map control.'));
		} finally {
			mapControl = null;
			isControlAttached = false;
		}
	}

	onMount(() => {
		attachControl();
		return detachControl;
	});
</script>

<div
	bind:this={element}
	data-slot="map-control"
	role="group"
	aria-label="Map controls"
	class="maplibregl-ctrl flex flex-col overflow-hidden rounded-md border border-background-muted bg-background text-foreground shadow-sm"
>
	{#each actionList as action (action)}
		{@const disabled = isActionDisabled(action)}
		{@const buttonArg = getButtonArg(action, disabled)}
		{#if controlButton}
			<div use:customMapControlEvents={buttonArg.onclick} class="border-b border-background-muted last:border-b-0">
				{@render controlButton(buttonArg)}
			</div>
		{:else}
			<button
				type="button"
				class="flex size-8 items-center justify-center border-b border-background-muted bg-background outline-none transition-colors last:border-b-0 hover:bg-background-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:hover:text-foreground"
				aria-label={buttonArg.label}
				{disabled}
				onpointerdown={stopMapControlEvent}
				onmousedown={stopMapControlEvent}
				ontouchstart={stopMapControlEvent}
				ondblclick={stopMapControlEvent}
				onwheel={stopMapControlEvent}
				onclick={buttonArg.onclick}
			>
				{#if action === 'zoom-in'}
					<span class="inline-flex items-center justify-center [&_svg]:size-4" aria-hidden="true">{@render plusIcon()}</span>
				{:else if action === 'zoom-out'}
					<span class="inline-flex items-center justify-center [&_svg]:size-4" aria-hidden="true">{@render minusIcon()}</span>
				{:else if action === 'fit-markers'}
					<span class="inline-flex items-center justify-center [&_svg]:size-4" aria-hidden="true">{@render arrowsInIcon()}</span>
				{:else if action === 'geolocate'}
					<span class="inline-flex items-center justify-center [&_svg]:size-4" aria-hidden="true">{@render gpsFixIcon()}</span>
				{:else}
					<span class="inline-flex items-center justify-center [&_svg]:size-4" aria-hidden="true">{@render arrowsCounterClockwiseIcon()}</span>
				{/if}
			</button>
		{/if}
	{/each}
</div>
