<script
	lang="ts"
	generics="Buttons extends Record<string, Omit<ToggleButtonProps, 'variant' | 'color' | 'size'>>"
>
	import ToggleButton from '../ToggleButton/ToggleButton.svelte';
	import { type ToggleButtonProps } from '../ToggleButton/index.js';
	import type { ToggleButtonGroupProps } from './toggleButtonGroup.props.js';
	import { useToggleButtonGroupTheme } from './toggleButtonGroup.theme.js';

	let {
		buttons = $bindable(),
		size,
		value = $bindable(
			Object.keys(buttons).reduce(
				(acc, key) => {
					Object.assign(acc, {
						[key]: buttons[key].checked || false
					});
					return acc;
				},
				{} as { [key in keyof Buttons]: boolean }
			)
		),
		color,
		variant,
		disabled,
		theme,
		class: className,
		onChange,
		...attachments
	}: ToggleButtonGroupProps<Buttons> = $props();

	const classes = $derived(useToggleButtonGroupTheme(theme));
</script>

<div data-color={color} class={classes.buttonGroup({ className })} {...attachments}>
	{#each Object.entries(buttons) as [key, button]}
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
				value =Object.entries(buttons).reduce((acc, [key, button]) => {
					Object.assign(acc, {
						[key]: button.checked||false
					});
					return acc;
				}, {} as { [key in keyof Buttons]: boolean })
				onChange?.(value);
			}}
		/>
	{/each}
</div>
