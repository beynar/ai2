<script lang="ts">
	import ToggleButton from '$lib/components/ToggleButton/ToggleButton.svelte';
	import { colors, sizes } from '$lib/utils/tokens.js';

	const variants = ['outline', 'soft', 'ghost'] as const;
	let disabled = $state(false);
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		{#each variants as variant}
			<h1>{variant}</h1>
			<div class="grid gap-4">
				{#each colors as color}
					<div class="flex items-center justify-center gap-4">
						{#each sizes as size}
							<ToggleButton {color} {size} {variant} {disabled}>
								{variant} - {color} - {size}
							</ToggleButton>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
