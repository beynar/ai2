<script lang="ts" generics="Items extends ToggleButtonGroupItems = ToggleButtonGroupItems">
	import ToggleButton from '../ToggleButton/ToggleButton.svelte';
	import type {
		ToggleButtonGroupItems,
		ToggleButtonGroupProps
	} from './toggleButtonGroup.props.js';
	import { useToggleButtonGroupTheme } from './toggleButtonGroup.theme.js';

	let {
		items,
		ariaLabel,
		size,
		value = $bindable({}),
		color,
		variant,
		disabled,
		joined = false,
		theme,
		class: className,
		onChange,
		...attachments
	}: ToggleButtonGroupProps<Items> = $props();

	const classes = $derived(useToggleButtonGroupTheme(theme));
</script>

<div
	role="group"
	aria-label={ariaLabel}
	data-color={color}
	class={classes.root({ className, joined })}
	{...attachments}
>
	{#each Object.entries(items) as [key, button]}
		<ToggleButton
			{size}
			{color}
			{variant}
			{...button}
			disabled={disabled || button.disabled}
			checked={value[key] ?? false}
			onChange={(checked) => {
				button.onChange?.(checked);
				value = { ...value, [key]: checked };
				onChange?.(value);
			}}
		/>
	{/each}
</div>
