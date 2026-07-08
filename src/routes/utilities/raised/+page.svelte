<script lang="ts">
	import Code from '$lib/components/Code/Code.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';
	import ComponentCard from '../../ComponentCard.svelte';

	const usageCode = `<div class="raised rounded-lg bg-background p-4">
	Content
</div>`;

	const scaleCode = `<div class="raised-sm">Small elevation</div>
<div class="raised">Default elevation</div>
<div class="raised-lg">Large elevation</div>
<div class="raised-none">No elevation</div>`;

	const configCode = `@plugin './lib/tailwind/theme' {
	name: light;
	default: true;
	raised-with-border: true;
}`;

	const utilityRows = [
		['raised', 'Applies the default theme shadow and optional raised border.'],
		['raised-sm | raised-md | raised-lg', 'Uses the matching Tailwind shadow scale.'],
		['raised-xl | raised-2xl', 'Applies stronger elevation for prominent surfaces.'],
		['raised-none', 'Removes the raised shadow and border.'],
		['raised-with-border', 'Theme option that controls the light-mode border.']
	];
</script>

{#snippet ic(text: string)}
	<code class="bg-background-muted rounded px-1 py-0.5 text-sm">{text}</code>
{/snippet}

<article class="text-foreground mx-auto grid max-w-3xl gap-4 pb-20">
	<header class="grid gap-2">
		<h1 class="text-3xl font-semibold">Raised</h1>
		<p class="text-foreground-muted text-balance">
			Tailwind utilities for giving surfaces theme-aware elevation.
		</p>
	</header>

	<ComponentCard
		description="Use raised on cards, popovers, and floating surfaces that need depth."
		code={usageCode}
		class="!min-h-[240px]"
	>
		<div class="raised bg-background rounded-lg p-4 text-sm">Content</div>
	</ComponentCard>

	<Separator class="my-2" children="Usage" />

	<p class="text-foreground-muted">
		Use {@render ic('raised')} on a surface. The utility maps to the Tailwind shadow scale and uses theme
		variables for borders in light and dark modes.
	</p>
	<Code language="html" code={usageCode} />

	<div class="border-background-muted overflow-hidden rounded-xl border">
		{#each utilityRows as [name, description], index (name)}
			<div
				class="grid gap-2 p-3 md:grid-cols-[14rem_1fr] {index % 2 === 0
					? 'bg-background'
					: 'bg-background-dark'}"
			>
				<code class="text-primary text-sm font-medium">{name}</code>
				<p class="text-foreground-muted text-sm">{description}</p>
			</div>
		{/each}
	</div>

	<Separator class="my-2" children="Examples" />

	<ComponentCard
		description="The suffix follows Tailwind's box-shadow scale."
		code={scaleCode}
		class="!min-h-[280px]"
	>
		<div class="grid w-full gap-3 text-sm sm:grid-cols-2">
			<div class="raised-sm bg-background rounded-lg p-4">raised-sm</div>
			<div class="raised bg-background rounded-lg p-4">raised</div>
			<div class="raised-lg bg-background rounded-lg p-4">raised-lg</div>
			<div class="raised-none bg-background rounded-lg p-4">raised-none</div>
		</div>
	</ComponentCard>

	<Separator class="my-2" children="Theme option" />

	<p class="text-foreground-muted">
		Set {@render ic('raised-with-border')} on the default theme plugin when light-mode raised surfaces
		should include a border.
	</p>
	<Code language="css" code={configCode} />
</article>
