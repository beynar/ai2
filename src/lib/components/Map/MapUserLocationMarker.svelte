<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import type { MapUserLocation, MapUserLocationSnippetArg } from './map-types.js';
	import type { MapLibreMap, MapLibreMarker, MapLibreMarkerConstructor } from './maplibre-types.js';

	type Props = {
		map: MapLibreMap;
		Marker: MapLibreMarkerConstructor;
		location: MapUserLocation;
		content?: Snippet<[MapUserLocationSnippetArg]>;
	};

	let { map, Marker, location, content }: Props = $props();

	let element: HTMLDivElement | undefined;
	let mapMarker: MapLibreMarker | null = null;
	let lngLat = $derived(location.lngLat);
	let snippetArg = $derived({ ...location, map });

	function resetMarkerRootAccessibility(markerElement: HTMLElement): void {
		markerElement.removeAttribute('aria-label');
		markerElement.removeAttribute('role');
		markerElement.removeAttribute('tabindex');
	}

	onMount(() => {
		if (!element) {
			return;
		}

		mapMarker = new Marker({ element, anchor: 'center' }).setLngLat(location.lngLat).addTo(map);
		resetMarkerRootAccessibility(element);

		return () => {
			mapMarker?.remove();
			mapMarker = null;
		};
	});

	$effect(() => {
		mapMarker?.setLngLat(lngLat);
	});
</script>

<div bind:this={element} data-slot="map-user-location" class="flex items-center justify-center">
	{#if content}
		{@render content(snippetArg)}
	{:else}
		<div
			role="img"
			aria-label="User location"
			class="relative flex size-8 items-center justify-center rounded-full"
		>
			<span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-35"></span>
			<span class="absolute size-7 rounded-full bg-primary/20"></span>
			<span class="relative size-4 rounded-full border-2 border-background bg-primary shadow-md"></span>
		</div>
	{/if}
</div>
