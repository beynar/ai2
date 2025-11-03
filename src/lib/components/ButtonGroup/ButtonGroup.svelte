<script lang="ts" generics="Payload extends Record<string, any>| undefined = undefined">
	import Button from '../Button/Button.svelte';
	import type { ButtonGroupProps } from './buttonGroup.props.js';
	import { useButtonGroupTheme } from './buttonGroup.theme.js';

	let {
		buttons,
		size,
		color,
		variant,
		disabled,
		theme,
		class: className,
		...attachments
	}: ButtonGroupProps<Payload> = $props();

	const classes = $derived(useButtonGroupTheme(theme));
</script>

<div class={classes.buttonGroup({ className })} {...attachments}>
	{#each buttons as button}
		<Button {size} {color} {variant} {disabled} {...button} />
	{/each}
</div>
