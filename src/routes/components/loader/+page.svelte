<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';

	import ComponentCard from '../../ComponentCard.svelte';

	let loadingText = $state('Loading...');
	let isLoading = $state(true);
	let show = $state(true);
</script>

<DocPage
	title="Loader"
	subtitle="Overlay a spinner on any element while async work runs."
	features={[
		'Svelte {@attach} on any element',
		'Fade in/out overlay animation',
		'Theme default and per-instance Spinner variants',
		'Animated loading text updates',
		'Auto-positions parent relatively'
	]}
>
	<ComponentCard
		description="Overlay a spinner on an element while async work runs. The animation follows Theme."
		code={`<div
	{@attach spinnerOverlay({
		loading: true,
		text: 'Loading...'
	})}
>
	<Button fullWidth>Submit</Button>
</div>`}
		{@attach spinnerOverlay({
			loading: isLoading,
			text: loadingText
		})}
		class="raised bg-amber-100 p-2"
	>
		<Button fullWidth>Submit caca</Button>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Toggle loading state and text interactively."
			class="raised bg-amber-100 p-2"
		>
			<div class="flex w-full flex-col gap-4">
				<input placeholder="Loading text" bind:value={loadingText} />
				<input type="checkbox" bind:checked={isLoading} />
				<label for="isLoading"></label>

				{#if show}
					<div
						class="w-full"
						{@attach spinnerOverlay({
							loading: isLoading,
							text: loadingText
						})}
					>
						<Button fullWidth>Submit caca</Button>
					</div>
				{/if}

				<Button fullWidth onClick={() => (show = !show)}>Show loader</Button>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
