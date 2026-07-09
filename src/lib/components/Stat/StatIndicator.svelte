<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { getStatContext, resolveStatSize, resolveStatTheme } from './stat.context.js';
	import type { StatIndicatorProps } from './stat.props.js';
	import { useStatTheme } from './stat.theme.js';

	let {
		class: className,
		size,
		variant = 'default',
		color = 'foreground',
		theme,
		onClick,
		type = 'button',
		disabled,
		'aria-label': ariaLabel,
		children,
		...attachments
	}: StatIndicatorProps = $props();

	const context = getStatContext();
	const resolvedSize = $derived(resolveStatSize(size, context));
	const classes = $derived(useStatTheme(resolveStatTheme(theme, context)));
	const element = $derived(onClick ? 'button' : 'div');
</script>

<svelte:element
	this={element}
	data-slot="stat-indicator"
	data-variant={variant}
	data-color={color}
	data-size={resolvedSize}
	type={element === 'button' ? type : undefined}
	disabled={element === 'button' ? disabled : undefined}
	aria-label={ariaLabel}
	onclick={onClick}
	class={classes.indicator({ size: resolvedSize, variant, color, className })}
	{...attachments}
>
	<Slot render={children} />
</svelte:element>
