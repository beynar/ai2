<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import { Card } from '$lib/components/Card/index.js';
	import { TextInput } from '$lib/components/Form/TextInput/index.js';
	import ComponentGallery from './ComponentGallery.svelte';
	import MapCardPreview from './MapCardPreview.svelte';

	const spacingSamples = [
		{ label: 'p-2', padding: 'p-2' },
		{ label: 'p-4', padding: 'p-4' },
		{ label: 'p-6', padding: 'p-6' }
	] as const;
</script>

<section class="grid min-w-0 gap-6">
	<div class="grid gap-3">
		<div>
			<h2 class="text-xl font-semibold">Component preview</h2>
			<p class="text-neutral/60 text-sm">
				Every sample uses ordinary Tailwind classes and existing svelai components.
			</p>
		</div>

		<Card class="w-full" variant="solid" showBorders>
			{#snippet title()}Runtime theme{/snippet}
			{#snippet description()}
				Spacing, radius, and typography update without changing component props.
			{/snippet}
			{#snippet action()}
				<Button size="small" variant="ghost">Edit</Button>
			{/snippet}
			<div class="grid gap-4">
				<TextInput label="Workspace name" value="Design systems" />
				<div class="flex flex-wrap gap-2">
					<Button>Save changes</Button>
					<Button variant="outline">Cancel</Button>
					<Button variant="soft" color="success">Published</Button>
				</div>
			</div>
		</Card>
	</div>

	<MapCardPreview />

	<div class="grid gap-3">
		<h2 class="text-xl font-semibold">Spacing and radius</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			{#each spacingSamples as sample (sample.label)}
				<div class="raised-md grid gap-3 rounded-xl bg-surface-raised p-4">
					<div class="bg-primary/15 rounded-lg {sample.padding}">
						<div class="bg-primary h-8 rounded-md"></div>
					</div>
					<div>
						<strong class="text-sm">{sample.label}</strong>
						<p class="text-neutral/60 text-xs">Uses the active spacing multiplier.</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="grid gap-3">
		<h2 class="text-xl font-semibold">Typography</h2>
		<div class="border-neutral-muted grid gap-3 rounded-xl border bg-surface p-5">
			<p class="text-xs">Extra small interface text</p>
			<p class="text-sm">Small supporting text</p>
			<p class="text-base">Base body text</p>
			<p class="text-lg">Large body text</p>
			<p class="text-xl font-medium">Section heading</p>
			<p class="text-2xl font-semibold">Page heading</p>
			<p class="text-3xl font-semibold">Display heading</p>
		</div>
	</div>

	<ComponentGallery />
</section>
