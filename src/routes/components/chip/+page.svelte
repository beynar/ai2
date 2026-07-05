<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
</script>

<DocPage
	title="Chip"
	subtitle="Compact elements for tags, filters, or selections."
	component="Chip"
	features={[
		'Auto picks div, button, or link',
		'role set per rendered element',
		'Prefix & suffix icon slots',
		'Solid, outline & soft variants'
	]}
>
	<ComponentCard
		code={`<Chip>Chip</Chip>`}
	>
		<Chip>Chip</Chip>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Solid, outline, and soft variants.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each variants as variant (variant)}
					<Chip {variant}>{variant}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Eight semantic colors, shown here in the solid variant.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each colors as color (color)}
					<Chip {color}>{color}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Three sizes to match surrounding density.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each sizes as size (size)}
					<Chip {size}>{size}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Prefix and suffix icon slots.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Chip prefix={eyeClosedIcon}>Prefix</Chip>
				<Chip suffix={eyeClosedIcon}>Suffix</Chip>
				<Chip prefix={eyeClosedIcon} suffix={eyeClosedIcon}>Both</Chip>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
