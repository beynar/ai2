<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fromAction, type Attachment } from 'svelte/attachments';
	import type { MapUserLocation, MapUserLocationSnippetArg } from './map-types.js';
	import type { MapLibreMap, MapLibreMarker, MapLibreMarkerConstructor } from './maplibre-types.js';

	type Props = {
		map: MapLibreMap;
		Marker: MapLibreMarkerConstructor;
		location: MapUserLocation;
		content?: Snippet<[MapUserLocationSnippetArg]>;
	};

	type UserLocationMarkerAttachmentParams = {
		map: MapLibreMap;
		Marker: MapLibreMarkerConstructor;
		lngLat: [number, number];
	};

	let { map, Marker, location, content }: Props = $props();

	let lngLat = $derived(location.lngLat);
	let snippetArg = $derived({ ...location, map });

	function resetMarkerRootAccessibility(markerElement: HTMLElement): void {
		markerElement.removeAttribute('aria-label');
		markerElement.removeAttribute('role');
		markerElement.removeAttribute('tabindex');
	}

	function createUserLocationMarker(
		node: HTMLDivElement,
		params: UserLocationMarkerAttachmentParams
	): MapLibreMarker {
		const markerInstance = new params.Marker({ element: node, anchor: 'center' })
			.setLngLat(params.lngLat)
			.addTo(params.map);
		resetMarkerRootAccessibility(node);
		return markerInstance;
	}

	function attachUserLocationMarkerAction(
		node: HTMLDivElement,
		params: UserLocationMarkerAttachmentParams
	) {
		let currentParams = params;
		let markerInstance = createUserLocationMarker(node, currentParams);

		return {
			update(nextParams: UserLocationMarkerAttachmentParams) {
				const shouldRecreateMarker =
					nextParams.map !== currentParams.map || nextParams.Marker !== currentParams.Marker;

				if (shouldRecreateMarker) {
					markerInstance.remove();
					markerInstance = createUserLocationMarker(node, nextParams);
				} else {
					markerInstance.setLngLat(nextParams.lngLat);
				}

				currentParams = nextParams;
			},
			destroy() {
				markerInstance.remove();
			}
		};
	}

	const attachUserLocationMarker: Attachment<HTMLDivElement> = fromAction(
		attachUserLocationMarkerAction,
		() => ({
			map,
			Marker,
			lngLat
		})
	);
</script>

<div
	{@attach attachUserLocationMarker}
	data-slot="map-user-location"
	class="flex items-center justify-center"
>
	{#if content}
		{@render content(snippetArg)}
	{:else}
		<div
			role="img"
			aria-label="User location"
			class="relative flex size-8 items-center justify-center rounded-full"
		>
			<span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-35"
			></span>
			<span class="absolute size-7 rounded-full bg-primary/20"></span>
			<span class="relative size-4 rounded-full border-2 border-background bg-primary shadow-md"
			></span>
		</div>
	{/if}
</div>
