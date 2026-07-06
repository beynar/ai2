<script lang="ts">
	import { clockIcon } from '../../Icons/clock.js';
	import Button from '../../Button/Button.svelte';
	import type { Sizes } from '$lib/types/theme.js';

	type TimeInputTriggerProps = {
		open: boolean;
		disabled?: boolean;
		controls: string;
		size?: Sizes;
		onToggle: () => void;
	};

	let { open, disabled, controls, size, onToggle }: TimeInputTriggerProps = $props();

	const triggerSizeClass = $derived.by(() => {
		if (size === 'small') return '!size-5';
		if (size === 'large') return '!size-7';
		return '!size-6';
	});
</script>

<Button
	type="button"
	variant="ghost"
	color={open ? 'primary' : 'foreground'}
	{size}
	squared
	label="Choose time"
	aria-haspopup="dialog"
	aria-expanded={open}
	aria-controls={open ? controls : undefined}
	{disabled}
	class={triggerSizeClass}
	prefix={clockIcon}
	onClick={onToggle}
/>
