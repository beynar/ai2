<script
	lang="ts"
	generics="Items extends Record<string, Omit<ToggleButtonProps, 'variant' | 'color' | 'size'>>"
>
	import ToggleButton from '../ToggleButton/ToggleButton.svelte';
	import { type ToggleButtonProps } from '../ToggleButton/index.js';
	import type { ToggleButtonGroupProps } from './toggleButtonGroup.props.js';
	import { useToggleButtonGroupTheme } from './toggleButtonGroup.theme.js';

	let {
		items = $bindable(),
		size,
		value = $bindable(
			Object.keys(items).reduce(
				(acc, key) => {
					Object.assign(acc, {
						[key]: items[key].checked || false
					});
					return acc;
				},
				{} as { [key in keyof Items]: boolean }
			)
		),
		color,
		variant,
		disabled,
		joined,
		theme,
		class: className,
		onChange,
		...attachments
	}: ToggleButtonGroupProps<Items> = $props();

	const classes = $derived(useToggleButtonGroupTheme(theme));
</script>

<div data-color={color} class={classes.root({ className, joined })} {...attachments}>
	{#each Object.entries(items) as [key, button]}
		<ToggleButton
			{size}
			{color}
			{variant}
			{disabled}
			{...button}
			checked={value[key]}
			onChange={(checked) => {
				button.checked = checked;
				button.onChange?.(checked);
				// Update only the toggled key: `value` is the single source of truth.
				value = { ...value, [key]: checked };
				onChange?.(value);
			}}
		/>
	{/each}
</div>
