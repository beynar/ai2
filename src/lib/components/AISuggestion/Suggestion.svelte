<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { SuggestionProps } from './aiSuggestion.props.js';
	import { useAISuggestionTheme } from './aiSuggestion.theme.js';

	let {
		ref = $bindable(),
		suggestion,
		selected = false,
		disabled = false,
		variant = 'soft',
		size = 'small',
		type = 'button',
		onSelect,
		onclick,
		children,
		class: className,
		theme,
		...buttonProps
	}: SuggestionProps = $props();
	const classes = $derived(useAISuggestionTheme(theme));
	const forwardedButtonProps = $derived({ ...buttonProps, 'data-slot': 'ai-suggestion' });

	function select() {
		onclick?.(suggestion);
		onSelect?.(suggestion);
	}
</script>

<Button
	bind:ref
	{type}
	{variant}
	{size}
	{disabled}
	aria-pressed={selected}
	data-active={selected ? 'true' : undefined}
	onClick={select}
	class={classes.suggestion({ className })}
	{...forwardedButtonProps}
>
	<Slot render={children ?? suggestion} />
</Button>
