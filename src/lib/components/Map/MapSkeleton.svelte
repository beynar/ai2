<script lang="ts">
	import Skeleton from '../Skeleton/Skeleton.svelte';
</script>

<div
	data-slot="map-skeleton"
	role="status"
	aria-label="Loading map"
	class="pointer-events-none absolute inset-0 z-10"
>
	<Skeleton class="h-full w-full rounded-none" />
</div>
