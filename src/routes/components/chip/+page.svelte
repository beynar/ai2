<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
</script>

<div class="grid gap-10">
	<div
		class="border-surface-lighter relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		{#each variants as variant}
			<div class="grid gap-4">
				{#each colors as color}
					<div class="flex items-center justify-center gap-4">
						{#each sizes as size}
							<Chip {color} {size} {variant}>
								{variant} - {color} - {size}
							</Chip>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
