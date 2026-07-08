<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import type { ButtonPrimitiveProps } from '$lib/components/Button/button.props.js';
	import { useFieldTheme } from './Field.svelte';

	type FieldActionButtonEdge = 'start' | 'end' | 'none';
	type FieldActionButtonProps = Pick<
		ButtonPrimitiveProps,
		| 'aria-controls'
		| 'aria-expanded'
		| 'aria-haspopup'
		| 'aria-pressed'
		| 'class'
		| 'color'
		| 'disabled'
		| 'label'
		| 'onClick'
		| 'prefix'
		| 'size'
		| 'type'
	> & {
		active?: boolean;
		edge?: FieldActionButtonEdge;
	};

	let {
		active = false,
		class: className,
		color,
		disabled,
		edge = 'end',
		label,
		onClick,
		prefix,
		size,
		type = 'button',
		'aria-controls': ariaControls,
		'aria-expanded': ariaExpanded,
		'aria-haspopup': ariaHaspopup,
		'aria-pressed': ariaPressed
	}: FieldActionButtonProps = $props();

	const classes = $derived(useFieldTheme());
	const effectiveColor = $derived(color ?? (active ? 'primary' : 'foreground'));
</script>

<Button
	{type}
	variant="ghost"
	color={effectiveColor}
	{size}
	squared={false}
	{label}
	aria-haspopup={ariaHaspopup}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
	aria-pressed={ariaPressed}
	{disabled}
	class={classes.actionButton({ size, edge, active, class: className })}
	{prefix}
	{onClick}
/>
