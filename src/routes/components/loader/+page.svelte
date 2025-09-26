<script lang="ts">
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import { Button } from '$lib/index.js';
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

<!--
<ComponentCard title="Accordion Outlined" class="flex !items-start">
	<div class="w-[300px] my-10 grid gap-10">
		<AccordionGroup {size} variant="outlined" openedIndices={openedIndex} {items} />
		<AccordionGroup {size} variant="outlined" splitted openedIndices={openedIndex} {items} />

	</div>
</ComponentCard>

<ComponentCard title="Accordion Card" class="flex !items-start">
	<div class="w-[300px] my-10 grid gap-10">
		<AccordionGroup {size} variant="card" openedIndices={openedIndex} {items} />
		<AccordionGroup {size} variant="card" splitted openedIndices={openedIndex} {items} />
		<Accordion
			{size}
			variant="card"
			title="title"
			description="description"
			content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
		/>
	</div>
</ComponentCard> -->
