<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import {
		buttonGroupTheme,
		type ButtonGroupProps
	} from '$lib/components/ButtonGroup/buttonGroup.js';
	export const setButtonTheme = setComponentTheme<typeof buttonGroupTheme>('buttonGroup');
	export const useButtonTheme = useComponentTheme('buttonGroup', buttonGroupTheme);
</script>

<script lang="ts" generics="Payload extends Record<string, any>| undefined = undefined">
	import Button from '../Button/Button.svelte';

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

	const classes = $derived(useButtonTheme(theme));
</script>

<div class={classes.buttonGroup({ className })} {...attachments}>
	{#each buttons as button}
		<Button {size} {color} {variant} {disabled} {...button} />
	{/each}
</div>
