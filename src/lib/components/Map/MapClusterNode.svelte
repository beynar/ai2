<script lang="ts" generics="TData = unknown">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { cx as cn } from '$lib/utils/cva/index.js';
	import { removeMapClusterHull, syncMapClusterHull } from './map-cluster-hull.js';
	import { toMapError } from './map-errors.js';
	import type { MapClusterSnippetArg } from './map-types.js';
	import type { MapLibreMap, MapLibreMarker, MapLibreMarkerConstructor } from './maplibre-types.js';

	type Props<TData = unknown> = {
		map: MapLibreMap;
		Marker: MapLibreMarkerConstructor;
		cluster: MapClusterSnippetArg<TData>;
		content?: Snippet<[MapClusterSnippetArg<TData>]>;
		zoomOnClick: boolean;
		onclusterclick?: (cluster: MapClusterSnippetArg<TData>) => void;
		onerror?: (error: Error) => void;
	};

	let { map, Marker, cluster, content, zoomOnClick, onclusterclick, onerror }: Props<TData> = $props();

	let element: HTMLDivElement | undefined;
	let mapMarker: MapLibreMarker | null = null;
	let lngLat = $derived(cluster.coordinates);
	let defaultClusterClass = $derived(getDefaultClusterClass(cluster.count));

	function getDefaultClusterClass(count: number): string {
		if (count >= 100) {
			return 'size-14 bg-danger text-danger-contrast ring-danger/25';
		}

		if (count >= 25) {
			return 'size-12 bg-primary text-primary-contrast ring-primary/25';
		}

		return 'size-10 bg-background text-foreground ring-primary/30';
	}

	function handleClusterClick(event: MouseEvent): void {
		event.stopPropagation();
		onclusterclick?.(cluster);

		if (zoomOnClick) {
			cluster.expand();
		}
	}

	function handleClusterMouseEnter(): void {
		try {
			syncMapClusterHull(map, cluster.markers);
		} catch (error) {
			onerror?.(toMapError(error, 'Failed to draw map cluster hull.'));
		}
	}

	function handleClusterMouseLeave(): void {
		try {
			removeMapClusterHull(map);
		} catch (error) {
			onerror?.(toMapError(error, 'Failed to clear map cluster hull.'));
		}
	}

	function resetMarkerRootAccessibility(markerElement: HTMLElement): void {
		markerElement.removeAttribute('aria-label');
		markerElement.removeAttribute('role');
		markerElement.removeAttribute('tabindex');
	}

	onMount(() => {
		if (!element) {
			return;
		}

		element.addEventListener('click', handleClusterClick);
		element.addEventListener('mouseenter', handleClusterMouseEnter);
		element.addEventListener('mouseleave', handleClusterMouseLeave);
		mapMarker = new Marker({ element, anchor: 'center' }).setLngLat(cluster.coordinates).addTo(map);
		resetMarkerRootAccessibility(element);

		return () => {
			element?.removeEventListener('click', handleClusterClick);
			element?.removeEventListener('mouseenter', handleClusterMouseEnter);
			element?.removeEventListener('mouseleave', handleClusterMouseLeave);
			handleClusterMouseLeave();
			mapMarker?.remove();
			mapMarker = null;
		};
	});

	$effect(() => {
		mapMarker?.setLngLat(lngLat);
	});
</script>

<div bind:this={element} data-slot="map-cluster-marker" class="flex items-center justify-center">
	{#if content}
		{@render content(cluster)}
	{:else}
		<button
			type="button"
			class={cn(
				'flex items-center justify-center rounded-full border-2 border-background text-sm font-semibold tabular-nums shadow-md ring-4 outline-none transition-transform hover:scale-105 focus-visible:ring-primary',
				defaultClusterClass
			)}
			aria-label={`Cluster of ${cluster.count} markers`}
		>
			{cluster.count}
		</button>
	{/if}
</div>
