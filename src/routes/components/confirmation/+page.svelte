<script lang="ts">
	import { confirmation } from '$lib/components/Confirmation/confirmation.state.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let lastResult = $state<string>('—');

	async function confirmDelete() {
		const { confirmed } = await confirmation({
			title: 'Delete item',
			description: 'Are you sure you want to delete this item? This action cannot be undone.',
			confirm: { text: 'Delete', color: 'danger' },
			cancel: 'Cancel'
		});
		lastResult = confirmed ? 'Confirmed' : 'Cancelled';
	}

	async function confirmAsync() {
		const { confirmed, result } = await confirmation({
			title: 'Publish changes',
			description: 'This runs an async task and shows a loading state until it resolves.',
			confirm: { text: 'Publish', color: 'primary' },
			cancel: 'Cancel',
			onConfirm: async () => {
				await new Promise((r) => setTimeout(r, 1200));
				return 'published';
			}
		});
		lastResult = confirmed ? `Confirmed → ${result}` : 'Cancelled';
	}
</script>

<DocPage
	title="Confirmation"
	subtitle="An imperative, promise-based confirm dialog. Call confirmation() and await the outcome."
	features={[
		'Promise-based imperative API — no local state',
		'Async onConfirm with an automatic loading state',
		'Modal: cannot be dismissed by escape or click-outside',
		'Rendered by a single <Confirmation /> mounted at the app root'
	]}
>
	<ComponentCard
		code={`import { confirmation } from 'svelai/confirmation';

const { confirmed } = await confirmation({
	title: 'Delete item',
	description: 'This action cannot be undone.',
	confirm: { text: 'Delete', color: 'danger' },
	cancel: 'Cancel'
});`}
	>
		<div class="flex flex-col items-center gap-4">
			<Button color="danger" onClick={confirmDelete}>Delete item</Button>
			<p class="text-foreground/60 text-sm">Last result: {lastResult}</p>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Async onConfirm: the confirm button shows a loading state until the promise resolves, and its return value comes back as result."
			code={`const { confirmed, result } = await confirmation({
	title: 'Publish changes',
	description: 'Runs an async task.',
	confirm: { text: 'Publish', color: 'primary' },
	cancel: 'Cancel',
	onConfirm: async () => {
		await publish();
		return 'published';
	}
});`}
		>
			<div class="flex flex-col items-center gap-4">
				<Button color="primary" onClick={confirmAsync}>Publish changes</Button>
				<p class="text-foreground/60 text-sm">Last result: {lastResult}</p>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Setup: mount <Confirmation /> once, near the root of your app. The confirmation() function talks to it via events, so you never render it at the call site."
			code={`// +layout.svelte — import and render once, near the root:
import { Confirmation } from 'svelai/confirmation';

// ...then in the markup:
// <slot />
// <Confirmation />`}
		>
			<p class="text-foreground/60 text-sm">Already mounted in this docs app's root layout.</p>
		</ComponentCard>
	{/snippet}
</DocPage>
