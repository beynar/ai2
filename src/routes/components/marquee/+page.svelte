<script lang="ts">
	import { Marquee } from '$lib/components/Marquee/index.js';
	import ComponentCard from '../../ComponentCard.svelte';

	const testimonials = $state([
		{ id: 1, author: 'John Doe', quote: 'Amazing product! Highly recommended.' },
		{ id: 2, author: 'Jane Smith', quote: "Best purchase I've ever made." },
		{ id: 3, author: 'Bob Johnson', quote: 'Exceeded all my expectations.' },
		{ id: 4, author: 'Alice Williams', quote: 'Outstanding quality and service.' },
		{ id: 5, author: 'Charlie Brown', quote: "Couldn't be happier with this!" }
	]);

	const logos = $state([
		{ id: 1, name: 'Company 1', color: 'bg-primary' },
		{ id: 2, name: 'Company 2', color: 'bg-secondary' },
		{ id: 3, name: 'Company 3', color: 'bg-success' },
		{ id: 4, name: 'Company 4', color: 'bg-warning' },
		{ id: 5, name: 'Company 5', color: 'bg-danger' }
	]);

	const simpleItems = $state([
		{ id: 1, text: 'Item 1' },
		{ id: 2, text: 'Item 2' },
		{ id: 3, text: 'Item 3' },
		{ id: 4, text: 'Item 4' },
		{ id: 5, text: 'Item 5' }
	]);
</script>

<div class="grid gap-10">
	<!-- Basic Marquee -->

	<Marquee class="w-full max-w-[90vw]">
		{#each simpleItems as item}
			<div class="bg-surface border-surface-muted rounded-lg border px-6 py-4">
				{item.text}
			</div>
		{/each}
	</Marquee>

	<!-- Testimonials -->
	<Marquee class="w-full">
		{#each testimonials as item}
			<div
				class="bg-surface border-surface-muted w-[400px] flex-shrink-0 rounded-xl border px-8 py-6"
			>
				<p class="mb-2 text-lg font-semibold">"{item.quote}"</p>
				<p class="text-contrast-muted text-sm">— {item.author}</p>
			</div>
		{/each}
	</Marquee>

	<div
		class="bg-surface-muted text-contrast-muted flex h-10 w-full max-w-[90vw] items-center justify-center"
	>
		<p class="text-sm">This is a test of the marquee component.</p>
	</div>
</div>
