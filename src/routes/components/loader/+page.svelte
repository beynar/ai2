<script lang="ts">
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';

	import ComponentCard from '../../ComponentCard.svelte';

	let loadingText = $state('Loading...');
	let isLoading = $state(true);
	let show = $state(true);
</script>

<input placeholder="Loading text" bind:value={loadingText} />
<input type="checkbox" bind:checked={isLoading} />
<label for="isLoading"></label>

{#if show}
	<ComponentCard
		{@attach spinnerOverlay({
			loading: isLoading,
			text: loadingText
		})}
		title="Loader"
		class="raised flex !items-center bg-amber-100 p-2 "
	>
		<Button fullWidth>Submit caca</Button>
	</ComponentCard>
{/if}

<Button fullWidth onClick={() => (show = !show)}>Show loader</Button>
