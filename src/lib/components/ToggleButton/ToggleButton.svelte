<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import {
		toggleButtonTheme,
		type ToggleButtonProps
	} from '$lib/components/ToggleButton/toggleButton.js';
	export const setButtonTheme = setComponentTheme<typeof toggleButtonTheme>('toggleButton');
	export const useButtonTheme = useComponentTheme('toggleButton', toggleButtonTheme);
</script>

<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	let {
		onChange = null,
		prefixProps,
		suffixProps,
		class: className,
		color = 'surface',
		prefix,
		suffix,
		children,
		size = 'normal',
		ref = $bindable(),
		disabled = false,
		theme,
		childrenProps,
		checked = $bindable(false),
		variant = 'ghost',
		...attachments
	}: ToggleButtonProps = $props();

	const isSquared = $derived(
		!!((!children && prefix && !suffix) || (!children && !prefix && suffix))
	);

	const classes = $derived(useButtonTheme(theme));
</script>

<button
	bind:this={ref}
	data-color={color}
	data-checked={checked}
	{disabled}
	class={classes.button({
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
	<Slot
		payload={{ checked }}
		render={prefix}
		class={classes.prefix({ size, checked })}
		props={prefixProps}
	/>
	<Slot payload={{ checked }} render={children} props={childrenProps} />
	<Slot
		payload={{ checked }}
		render={suffix}
		class={classes.suffix({ size, checked })}
		props={suffixProps}
	/>
</button>
