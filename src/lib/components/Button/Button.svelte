<script lang="ts" generics="Payload extends Record<string, any>| undefined = undefined">
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import Slot from '../Slot/Slot.svelte';
	import type { ButtonPrimitiveProps } from './button.props.js';
	import { useButtonTheme } from './button.theme.js';

	let {
		as,
		payload,
		loading = false,
		onClick = null,
		prefixProps,
		onEnter = null,
		onLeave = null,
		suffixProps,
		href,
		squared,
		class: className,
		color = 'primary',
		prefix,
		suffix,
		children,
		variant = 'solid',
		size = 'normal',
		ref = $bindable(),
		fullWidth = false,
		disabled = false,
		theme,
		rel,
		target,
		childrenProps,
		label,
		...attachments
	}: ButtonPrimitiveProps<Payload> = $props();

	const isSquared = $derived(
		squared ?? !!((!children && prefix && !suffix) || (!children && !prefix && suffix))
	);

	const classes = $derived(useButtonTheme(theme));
</script>

<svelte:element
	this={as || href ? 'a' : 'button'}
	aria-label={label}
	role={as || href ? 'link' : 'button'}
	{href}
	{rel}
	{target}
	bind:this={ref}
	data-color={color}
	{disabled}
	class={classes.button({
		color,
		squared: isSquared,
		variant,
		size,
		loading,
		disabled,
		className,
		fullWidth
	})}
	{@attach spinnerOverlay({ loading })}
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
	<Slot {payload} render={prefix} class={classes.prefix({ size })} props={prefixProps} />
	<Slot {payload} render={children} props={childrenProps} />
	<Slot {payload} render={suffix} class={classes.suffix({ size })} props={suffixProps} />
</svelte:element>
