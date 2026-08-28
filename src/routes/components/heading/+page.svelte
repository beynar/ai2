<script lang="ts">
	import Heading from '$lib/components/Heading/Heading.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const sizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
	const weights = ['light', 'normal', 'bold'] as const;
	const aligns = ['left', 'center', 'right'] as const;
</script>

<DocPage
	title="Heading"
	subtitle="Semantic, styled headings with size, weight, alignment, and cap-trim controls."
	component="Heading"
	features={[
		'Renders semantic h1–h6 elements',
		'Decouple visual size from semantic level via as',
		'Balanced line breaks and cap trimming',
		'weight, align, underline, and muted variants'
	]}
>
	<ComponentCard
		code={`<Heading size="h1">The quick brown fox</Heading>`}
	>
		<Heading size="h1">The quick brown fox</Heading>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Every visual size (h1–h6).">
			<div class="flex w-full flex-col gap-3">
				{#each sizes as size}
					<Heading {size}>{size} — The quick brown fox</Heading>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Font weights.">
			<div class="flex w-full flex-col gap-3">
				{#each weights as weight}
					<Heading size="h3" {weight}>{weight} weight</Heading>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Alignment.">
			<div class="flex w-full flex-col gap-3">
				{#each aligns as align}
					<Heading size="h3" {align} class="w-full">{align} aligned</Heading>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Underline and muted modifiers.">
			<div class="flex w-full flex-col gap-3">
				<Heading size="h3" underline>Underlined heading</Heading>
				<Heading size="h3" muted>Muted heading</Heading>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Visual size decoupled from semantic level: an h1-sized element rendered as an h3."
		>
			<Heading size="h1" as="h3">Looks like h1, is an h3</Heading>
		</ComponentCard>
	{/snippet}
</DocPage>
