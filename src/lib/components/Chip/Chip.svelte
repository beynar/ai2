<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { ChipProps } from './chip.props.js';
	import { useChipTheme } from './chip.theme.js';
	const {
		color = 'primary',
		variant = 'solid',
		children,
		size = 'normal',
		class: className = '',
		onClick,
		onenter,
		onleave,
		suffix,
		target,
		rel,
		prefix,
		href,
		theme,
		prefixProps,
		suffixProps,
		childrenProps,
		...attachments
	}: ChipProps = $props();

	const classes = $derived(useChipTheme(theme));
	const as = $derived(href ? 'a' : onClick || onenter || onleave ? 'button' : 'div');
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
	onclick={onClick}
	class={classes.chip({ color, variant, size, className })}
	{...attachments}
>
	<Slot render={prefix} class={classes.prefix({ size })} props={prefixProps} />
	<Slot render={children} props={childrenProps} />
	<Slot render={suffix} class={classes.suffix({ size })} props={suffixProps} />
</svelte:element>
