<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import { colors, sizes } from '$lib/utils/tokens.js';
</script>

<DocPage
	title="Spinner"
	subtitle="Standalone indeterminate loading indicator using the theme spinner engine."
	component="Spinner"
	features={[
		'Global spinner animation',
		'Status semantics by default',
		'size & color design tokens',
		'Optional visible label'
	]}
>
	<ComponentCard
		description="A compact loading status with visible text."
		code={`<Spinner text="Loading" />`}
	>
		<Spinner text="Loading" />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Icon-only spinner with an accessible label." class="!min-h-fit">
			<Spinner label="Loading account" />
		</ComponentCard>

		<ComponentCard
			description="Size tokens adjust the indicator and visible label."
			class="!min-h-fit"
		>
			<div class="flex flex-wrap items-center justify-center gap-6">
				{#each sizes as size}
					<Spinner {size} text={size} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Color tokens apply semantic color to the indicator."
			class="!min-h-fit"
		>
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each colors as color}
					<Spinner {color} label={`${color} loading`} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Rich label content can be passed through the children slot."
			class="!min-h-fit"
		>
			<Spinner color="primary">
				{#snippet children()}
					<span class="text-foreground text-sm font-medium">Syncing workspace</span>
				{/snippet}
			</Spinner>
		</ComponentCard>

		<ComponentCard
			description="Use decorative when surrounding UI already announces loading."
			class="!min-h-fit"
		>
			<div
				class="border-background-muted bg-background flex items-center gap-3 rounded-lg border px-4 py-3"
			>
				<Spinner decorative size="small" color="primary" />
				<span class="text-foreground text-sm" aria-busy="true">Saving changes</span>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
