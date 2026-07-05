<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import ToggleButton from '$lib/components/ToggleButton/ToggleButton.svelte';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';
	import { colors, sizes } from '$lib/utils/tokens.js';

	const variants = ['outline', 'soft', 'ghost'] as const;
</script>

<DocPage
	title="Toggle button"
	subtitle="A button that toggles between pressed and unpressed states."
	component="ToggleButton"
	features={[
		'Bindable checked state',
		'Auto square layout for icon-only',
		'data-checked reflects pressed state',
		'Prefix, suffix & children slots'
	]}
>
	<ComponentCard
		code={`<ToggleButton>Toggle me</ToggleButton>`}
	>
		<ToggleButton>Toggle me</ToggleButton>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Outline, soft, and ghost variants. Click to toggle the pressed state.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each variants as variant (variant)}
					<ToggleButton {variant} color="foreground">{variant}</ToggleButton>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Eight semantic colors, shown pressed in the soft variant.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each colors as color (color)}
					<ToggleButton {color} variant="soft" checked>{color}</ToggleButton>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Three sizes to match surrounding density.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each sizes as size (size)}
					<ToggleButton {size} color="foreground">{size}</ToggleButton>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="With only an icon and no label, the toggle renders squared.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<ToggleButton prefix={eyeClosedIcon} />
				<ToggleButton prefix={eyeClosedIcon} checked />
			</div>
		</ComponentCard>

		<ComponentCard description="Disabled toggles are dimmed and ignore interaction.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<ToggleButton disabled>Off</ToggleButton>
				<ToggleButton disabled checked>On</ToggleButton>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
