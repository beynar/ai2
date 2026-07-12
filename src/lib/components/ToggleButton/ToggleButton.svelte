<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { ToggleButtonProps } from './toggleButton.props.js';
	import { useToggleButtonTheme } from './toggleButton.theme.js';
	let {
		onChange = null,
		class: className,
		color = 'background',
		prefix,
		suffix,
		children,
		size = 'normal',
		ref = $bindable(),
		disabled = false,
		theme,
		checked = $bindable(false),
		variant = 'ghost',
		...attachments
	}: ToggleButtonProps = $props();

	const isSquared = $derived(
		!!((!children && prefix && !suffix) || (!children && !prefix && suffix))
	);

	const classes = $derived(useToggleButtonTheme(theme));
</script>

<button
	bind:this={ref}
	data-color={color}
	data-checked={checked}
	{disabled}
	class={classes.root({
		color,
		checked,
		squared: isSquared,
		variant,
		size,
		disabled,
		className
	})}
	onclick={() => {
		if (!disabled) {
			checked = !checked;
			onChange?.(checked);
		}
	}}
	{...attachments}
>
	<Slot render={prefix} class={classes.prefix({ size, checked })} />
	<!-- <Slot render={children} /> -->
	{variant} - {color}
	<Slot render={suffix} class={classes.suffix({ size, checked })} />
</button>
