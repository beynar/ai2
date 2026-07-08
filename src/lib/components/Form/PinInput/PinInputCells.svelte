<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import type { PinInputState } from './pinInput.state.svelte.js';
	import type { usePinInputTheme } from './pinInput.theme.js';

	type PinInputClasses = ReturnType<typeof usePinInputTheme>;

	let {
		state,
		classes,
		size,
		disabled,
		mask = false
	}: {
		state: PinInputState;
		classes: PinInputClasses;
		size?: Sizes;
		disabled?: boolean;
		mask?: boolean;
	} = $props();

	const displayValue = (char: string | null) => (mask && char ? '•' : char);
</script>

{#each state.cells as cell (cell.index)}
	<div
		data-slot="pin-input-cell"
		data-active={cell.isActive}
		data-empty={cell.char === null}
		aria-hidden="true"
		class={classes.cell({
			size,
			active: cell.isActive,
			disabled
		})}
	>
		{#if cell.hasFakeCaret}
			<span data-slot="pin-input-caret" class={classes.caret()}></span>
		{:else}
			<span data-slot="pin-input-character" class={classes.character()}>
				{displayValue(cell.char)}
			</span>
		{/if}
	</div>
{/each}
