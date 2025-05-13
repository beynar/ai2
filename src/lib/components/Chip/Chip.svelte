<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { chipTheme, type ChipProps } from './chip.js';
	export const setChipTheme = setComponentTheme<typeof chipTheme>('chip');
	export const useChipTheme = useComponentTheme('chip', chipTheme);
</script>

<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	const {
		color = 'primary',
		variant = 'solid',
		children,
		size = 'normal',
		class: className = '',
		onclick,
		onenter,
		onleave,
		suffix,
		target,
		rel,
		prefix,
		href,
		theme,
		prefixProps,
		suffixProps
	}: ChipProps = $props();

	const classes = $derived(useChipTheme(theme));
	const as = $derived(href ? 'a' : onclick || onenter || onleave ? 'button' : 'div');

	function tooltip(content: string) {
		return (node: HTMLElement) => {
			console.log(node, content);
		};
	}
</script>

<svelte:element
	this={as}
	role={as === 'button' ? 'button' : as === 'a' ? 'link' : 'none'}
	data-variant={variant}
	data-color={color}
	data-size={size}
	{rel}
	{target}
	{href}
	{onclick}
	class={classes.chip({ color, variant, size, className })}
>
	<Slot render={prefix} class={classes.prefix({ size })} props={prefixProps} />
	<Slot render={children} />
	<Slot render={suffix} class={classes.suffix({ size })} props={suffixProps} />
</svelte:element>
