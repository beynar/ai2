<script lang="ts" generics="TData = unknown">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { onMount } from 'svelte';
	import MapMarkerDefault from './MapMarkerDefault.svelte';
	import MapMarkerPopup from './MapMarkerPopup.svelte';
	import MapMarkerTooltip from './MapMarkerTooltip.svelte';
	import { applyMapMarkerTriggerAccessibility } from './map-marker-accessibility.js';
	import { getPlainHtmlText } from './map-html.js';
	import type { MapMarker } from './map-data.js';
	import type {
		MapMarkerPopupContentArg,
		MapMarkerSnippetArg,
		MapMarkerTooltipContentArg
	} from './map-types.js';
	import type { MapLibreMap, MapLibreMarker, MapLibreMarkerConstructor } from './maplibre-types.js';

	type Props<TData = unknown> = {
		map: MapLibreMap;
		Marker: MapLibreMarkerConstructor;
		marker: MapMarker<TData>;
		content?: Snippet<[MapMarkerSnippetArg<TData>]>;
		popup?: boolean | Snippet<[MapMarkerPopupContentArg<TData>]>;
		tooltip?: boolean | Snippet<[MapMarkerTooltipContentArg<TData>]>;
		onmarkerclick?: (marker: MapMarker<TData>) => void;
	};

	let { map, Marker, marker, content, popup, tooltip, onmarkerclick }: Props<TData> = $props();

	let element: HTMLDivElement | undefined;
	let mapMarker: MapLibreMarker | null = null;
	let popupOpen = $state(false);
	let markerColor = $derived(marker.color ?? 'var(--foreground)');
	let lngLat = $derived<[number, number]>([marker.lng, marker.lat]);
	let snippetArg = $derived<MapMarkerSnippetArg<TData>>({
		marker,
		data: marker.data,
		map,
		lngLat
	});
	let popupContent = $derived(popup === true ? true : popup ?? marker.popup);
	let tooltipContent = $derived(tooltip === true ? true : tooltip ?? marker.tooltip);
	let hasPopup = $derived(popup !== false && popupContent != null);
	let hasTooltip = $derived(tooltip !== false && tooltipContent != null);
	let plainLabel = $derived(marker.label ? getPlainHtmlText(marker.label) : String(marker.id));
	let isInteractive = $derived(hasPopup || !!onmarkerclick);
	let isFocusable = $derived(isInteractive || hasTooltip);
	let triggerLabel = $derived(
		plainLabel
			? `${isInteractive ? 'Open' : 'Map'} marker ${plainLabel}`
			: `${isInteractive ? 'Open' : 'Map'} marker ${marker.id}`
	);
	const noopAttachment: Attachment<HTMLElement> = () => {};

	function handleContainerClick(event: MouseEvent): void {
		if (!isInteractive || !(event.target instanceof Node)) {
			if (hasTooltip) {
				event.stopPropagation();
			}
			return;
		}

		event.stopPropagation();
		// svelai's Popover only auto-wires open-on-click for ButtonProps triggers, not
		// snippet triggers, so we toggle the (bound) popup open state ourselves on click
		// — mirroring the keyboard-activation path.
		if (hasPopup) {
			popupOpen = !popupOpen;
		}
		notifyMarkerClick();
	}

	function notifyMarkerClick(): void {
		onmarkerclick?.(marker);
	}

	function activateCustomTriggerFromKeyboard(): void {
		if (hasPopup) {
			popupOpen = !popupOpen;
		}

		notifyMarkerClick();
	}

	function resetMarkerRootAccessibility(markerElement: HTMLElement): void {
		markerElement.removeAttribute('aria-label');
		markerElement.removeAttribute('role');
		markerElement.removeAttribute('tabindex');
	}

	function createCustomTriggerAttachment(
		popupAttach: Attachment<HTMLElement>,
		tooltipAttach: Attachment<HTMLElement>
	): Attachment<HTMLElement> {
		return (node) => {
			const removeAccessibility = applyMapMarkerTriggerAccessibility(node, {
				isInteractive,
				isFocusable,
				label: triggerLabel,
				activate: activateCustomTriggerFromKeyboard
			});
			const removePopup = popupAttach(node);
			const removeTooltip = tooltipAttach(node);

			return () => {
				removeTooltip?.();
				removePopup?.();
				removeAccessibility();
			};
		};
	}

	onMount(() => {
		if (!element) {
			return;
		}

		element.addEventListener('click', handleContainerClick);
		mapMarker = new Marker({ element, anchor: 'bottom' }).setLngLat([marker.lng, marker.lat]).addTo(map);
		resetMarkerRootAccessibility(element);

		return () => {
			element?.removeEventListener('click', handleContainerClick);
			mapMarker?.remove();
			mapMarker = null;
		};
	});

	$effect(() => {
		mapMarker?.setLngLat(lngLat);
	});
</script>

{#snippet markerVisual()}
	{#if content}
		{@render content(snippetArg)}
	{:else}
		<MapMarkerDefault {marker} color={markerColor} />
	{/if}
{/snippet}

{#snippet markerTrigger(popupAttach: Attachment<HTMLElement>, tooltipAttach: Attachment<HTMLElement>)}
	{#if content}
		<div
			data-slot="map-marker-trigger"
			class="group flex max-w-40 flex-col items-center outline-none"
			{@attach createCustomTriggerAttachment(popupAttach, tooltipAttach)}
		>
			{@render markerVisual()}
		</div>
	{:else if isFocusable}
		<button
			type="button"
			data-slot="map-marker-trigger"
			class="group flex max-w-40 flex-col items-center outline-none"
			aria-label={triggerLabel}
			{@attach popupAttach}
			{@attach tooltipAttach}
		>
			{@render markerVisual()}
		</button>
	{:else}
		<div
			data-slot="map-marker-trigger"
			class="group flex max-w-40 flex-col items-center outline-none"
			role="img"
			aria-label={triggerLabel}
		>
			{@render markerVisual()}
		</div>
	{/if}
{/snippet}

<div bind:this={element} data-slot="map-marker" class="flex flex-col items-center">
	{#if hasPopup && popupContent}
		<MapMarkerPopup args={snippetArg} content={popupContent} bind:open={popupOpen}>
			{#snippet children(popupAttach)}
				{#if hasTooltip && tooltipContent}
					<MapMarkerTooltip args={snippetArg} content={tooltipContent} disabled={popupOpen}>
						{#snippet children(tooltipAttach)}
							{@render markerTrigger(popupAttach, tooltipAttach)}
						{/snippet}
					</MapMarkerTooltip>
				{:else}
					{@render markerTrigger(popupAttach, noopAttachment)}
				{/if}
			{/snippet}
		</MapMarkerPopup>
	{:else if hasTooltip && tooltipContent}
		<MapMarkerTooltip args={snippetArg} content={tooltipContent}>
			{#snippet children(tooltipAttach)}
				{@render markerTrigger(noopAttachment, tooltipAttach)}
			{/snippet}
		</MapMarkerTooltip>
	{:else}
		{@render markerTrigger(noopAttachment, noopAttachment)}
	{/if}
</div>
