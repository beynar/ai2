<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import type { SpinnerVariant } from '$lib/components/Spinner/spinner.props.js';
	import { colors, sizes } from '$lib/utils/tokens.js';

	const spinnerVariants: SpinnerVariant[] = [
		'default',
		'grid',
		'pulse',
		'puff',
		'lines',
		'circles'
	];
</script>

<DocPage
	title="Spinner"
	subtitle="Standalone indeterminate loading indicators with theme-aware color and sizing."
	component="Spinner"
	features={[
		'Global default through Theme',
		'Five opt-in motion variants',
		'Status semantics by default',
		'size & color design tokens',
		'Optional visible label'
	]}
>
	<ComponentCard
		description="A compact loading status with visible text. Its animation follows the Theme default."
		code={`<Spinner text="Loading" />`}
	>
		<Spinner text="Loading" />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Variants"
			description="Choose a loader per instance while the default continues to use the global spinner theme."
			code={`<Spinner variant="default" />
<Spinner variant="grid" />
<Spinner variant="pulse" />
<Spinner variant="puff" />
<Spinner variant="lines" />
<Spinner variant="circles" />`}
			class="!min-h-fit"
		>
			<div class="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
				{#each spinnerVariants as variant}
					<div class="flex min-w-0 flex-col items-center gap-3">
						<Spinner {variant} size="large" color="primary" label={`${variant} loader`} />
						<span class="text-foreground-muted text-xs font-medium capitalize">{variant}</span>
					</div>
				{/each}
			</div>
		</ComponentCard>

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
