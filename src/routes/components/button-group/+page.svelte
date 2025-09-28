<script lang="ts">
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
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
							<ButtonGroup
								{size}
								{color}
								{variant}
								{disabled}
								buttons={[
									{
										children: 'Button 1'
									},
									{
										children: 'Button 2'
									},
									{
										children: 'Button 3'
									}
								]}
							/>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
