<script lang="ts">
	import Badge from '$lib/components/Badge/Badge.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
</script>

<DocPage
	title="Badge"
	subtitle="Compact status markers for labels, counts, and categorization."
	component="Badge"
	features={[
		'Corner position variants on host',
		'color, variant, and size tokens',
		'Overlays parent via absolute positioning'
	]}
>
	<ComponentCard
		code={`<div class="raised aspect-square size-10">
	<Badge color="primary" size="normal" variant="solid">Badge</Badge>
</div>`}
	>
		<div class="raised aspect-square size-10">
			<Badge color="primary" size="normal" variant="solid">Badge</Badge>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="All color, size, and variant combinations.">
			{#each variants as variant}
				<div class="grid w-full gap-4">
					{#each colors as color}
						<div class="flex items-center justify-center gap-4">
							{#each sizes as size}
								<div class="raised aspect-square size-10">
									<Badge {color} {size} {variant}>
										{variant}
									</Badge>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</ComponentCard>
	{/snippet}
</DocPage>
