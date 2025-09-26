<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';

	let disabled = $state(false);
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		{#each variants as variant}
			<div class="grid gap-4">
				{#each colors as color}
					<div class="flex items-center justify-center gap-4">
						{#each sizes as size}
							<Button {color} {size} {variant} {disabled}>
								{variant} - {color} - {size}
							</Button>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
