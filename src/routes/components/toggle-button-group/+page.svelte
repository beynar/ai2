<script lang="ts">
	import ToggleButtonGroup from '$lib/components/ToggleButtonGroup/ToggleButtonGroup.svelte';
	import { colors, sizes } from '$lib/utils/tokens.js';

	const variants = ['outline', 'soft', 'ghost'] as const;
	let disabled = $state(false);
	let value = $state({});
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		{JSON.stringify(value || {})}
		<ToggleButtonGroup
			bind:value
			{disabled}
			onChange={(value) => {
				console.log(value);
			}}
			buttons={{
				button1: {
					children: 'Button 1'
				},
				button2: {
					children: 'Button 2'
				},
				button3: {
					children: 'Button 3'
				}
			}}
		/>
		<!-- {#each variants as variant}
			<div class="grid gap-4">
				{#each colors as color}
					<div class="flex items-center justify-center gap-4">
						{#each sizes as size}
							<ToggleButtonGroup
								{size}
								{color}
								{variant}
								{disabled}
								onChange={(value) => {
									console.log(value);
								}}
								buttons={{
									button1: {
										children: 'Button 1'
									},
									button2: {
										children: 'Button 2'
									},
									button3: {
										children: 'Button 3'
									}
								}}
							/>
						{/each}
					</div>
				{/each}
			</div>
		{/each} -->
	</div>
</div>
