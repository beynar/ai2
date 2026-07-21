<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { KbdProps } from './kbd.props.js';
	import { useKbdTheme } from './kbd.theme.js';

	const {
		keys,
		separator,
		size = 'normal',
		color = 'neutral',
		class: className = '',
		children,
		theme,
		...attachments
	}: KbdProps = $props();

	const classes = $derived(useKbdTheme(theme));
</script>

{#if keys && keys.length > 0}
	<kbd
		data-size={size}
		data-color={color}
		class={classes.group({ size, className })}
		{...attachments}
	>
		{#each keys as key, index (index)}
			{#if separator !== undefined && index > 0}
				<Slot as="span" render={separator} class={classes.separator({ size })} />
			{/if}
			<kbd data-size={size} data-color={color} class={classes.root({ size, color })}>
				<Slot render={key} />
			</kbd>
		{/each}
	</kbd>
{:else}
	<kbd
		data-size={size}
		data-color={color}
		class={classes.root({ size, color, className })}
		{...attachments}
	>
		<Slot render={children} />
	</kbd>
{/if}
