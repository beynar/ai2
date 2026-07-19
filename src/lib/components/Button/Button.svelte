<script lang="ts">
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import Slot from '../Slot/Slot.svelte';
	import type { ButtonPrimitiveProps } from './button.props.js';
	import { useButtonTheme } from './button.theme.js';

	let {
		as,
		payload,
		loading = false,
		onClick = null,
		onEnter = null,
		onLeave = null,
		href,
		squared,
		class: className,
		color = 'primary',
		prefix,
		suffix,
		children,
		variant = 'solid',
		type,
		size = 'normal',
		ref = $bindable(),
		fullWidth = false,
		disabled = false,
		theme,
		rel,
		target,
		download,
		label,
		role,
		'aria-haspopup': ariaHaspopup,
		'aria-expanded': ariaExpanded,
		'aria-controls': ariaControls,
		'aria-selected': ariaSelected,
		'aria-pressed': ariaPressed,
		'data-active': dataActive,
		'data-highlighted': dataHighlighted,
		'data-slot': dataSlot,
		...attachments
	}: ButtonPrimitiveProps = $props();

	const isSquared = $derived(
		squared ?? !!((!children && prefix && !suffix) || (!children && !prefix && suffix))
	);

	const classes = $derived(useButtonTheme(theme));
</script>

<svelte:element
	this={as || href ? 'a' : 'button'}
	aria-label={label}
	aria-haspopup={ariaHaspopup}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
	aria-selected={ariaSelected}
	aria-pressed={ariaPressed}
	role={role ?? (as || href ? 'link' : 'button')}
	{href}
	{rel}
	{target}
	{download}
	{type}
	bind:this={ref}
	data-active={dataActive}
	data-highlighted={dataHighlighted}
	data-slot={dataSlot}
	data-color={color}
	{disabled}
	class={classes.root({
		color,
		squared: isSquared,
		variant,
		size,
		loading,
		disabled,
		className,
		fullWidth
	})}
	{@attach spinnerOverlay({ loading, size })}
	onclick={onClick &&
		(() => {
			if (!disabled) {
				onClick(payload);
			}
		})}
	onpointerenter={onEnter &&
		(() => {
			if (!disabled) {
				onEnter(payload);
			}
		})}
	onpointerleave={onLeave &&
		(() => {
			if (!disabled) {
				onLeave(payload);
			}
		})}
	{...attachments}
>
	<Slot render={prefix} as="span" class={classes.prefix({ size })} />
	<Slot render={children} />
	<Slot render={suffix} as="span" class={classes.suffix({ size })} />
</svelte:element>
