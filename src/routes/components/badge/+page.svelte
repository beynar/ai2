<script lang="ts">
	import Badge from '$lib/components/Badge/Badge.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
</script>

<div class="grid gap-10">
	<div
		class="border-surface-lighter relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
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
	</div>
</div>
