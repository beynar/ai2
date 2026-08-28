<script lang="ts" generics="TData = unknown">
	import { mapPinIcon } from '../Icons/mapPin.js';
	import type { MapMarker } from './map-data.js';

	type Props<TData = unknown> = {
		marker: MapMarker<TData>;
		color: string;
	};

	let { marker, color }: Props<TData> = $props();
</script>

<span
	class="flex size-9 items-center justify-center text-surface drop-shadow-md ring-offset-surface group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2"
	style:color
>
	<span class="inline-flex items-center justify-center [&_svg]:size-9" aria-hidden="true"
		>{@render mapPinIcon()}</span
	>
</span>
{#if marker.label}
	<span
		class="mt-1 max-w-full truncate rounded-md bg-surface-floating/95 px-2 py-0.5 text-xs font-medium text-neutral shadow-sm ring-1 ring-neutral-muted"
	>
		{@html marker.label}
	</span>
{/if}
