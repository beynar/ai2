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
	<ComponentCard code={`<ToggleButton>Toggle me</ToggleButton>`}>
		<ToggleButton>Toggle me</ToggleButton>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Every variant and semantic color. Each pair shows the resting and pressed states."
		>
			<div class="grid w-full gap-6">
				{#each variants as variant (variant)}
					<div class="grid gap-3">
						<p class="text-foreground/60 text-sm font-medium capitalize">{variant}</p>
						<div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
							{#each colors as color (color)}
								<div class="flex min-w-0 items-center justify-between gap-2">
									<span class="text-foreground/70 truncate text-sm capitalize">{color}</span>
									<div class="flex shrink-0 gap-1.5">
										<ToggleButton
											{variant}
											{color}
											prefix={eyeClosedIcon}
											aria-label={`${color} ${variant} resting`}
										/>
										<ToggleButton
											{variant}
											{color}
											prefix={eyeClosedIcon}
											aria-label={`${color} ${variant} pressed`}
											checked
										/>
									</div>
								</div>
							{/each}
						</div>
					</div>
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
