<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { SpinnerProps } from './spinner.props.js';
	import { useSpinnerTheme } from './spinner.theme.js';

	let {
		ref = $bindable(),
		class: className,
		color = 'foreground',
		size = 'normal',
		text,
		label = 'Loading',
		decorative = false,
		children,
		theme,
		...attachments
	}: SpinnerProps = $props();

	const classes = $derived(useSpinnerTheme(theme));
	const hasText = $derived(typeof text === 'string' ? text.length > 0 : text != null);
	const hasVisibleLabel = $derived(hasText || children != null);
	const ariaLabel = $derived(decorative || hasVisibleLabel ? undefined : label);
</script>

<span
	bind:this={ref}
	data-slot="spinner"
	data-color={color}
	data-size={size}
	role={decorative ? undefined : 'status'}
	aria-hidden={decorative ? 'true' : undefined}
	aria-label={ariaLabel}
	aria-live={decorative ? undefined : 'polite'}
	class={classes.root({ size, color, className })}
	{...attachments}
>
	<span data-slot="spinner-indicator" aria-hidden="true" class={classes.indicator({ size })}></span>
	{#if hasVisibleLabel}
		<Slot as="span" render={children ?? text} class={classes.label({ size })} />
	{/if}
</span>
