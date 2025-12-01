<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';

	let disabled = $state(false);
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		{#each variants.concat(['ghost', 'link']) as variant}
			<h1>{variant}</h1>
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
