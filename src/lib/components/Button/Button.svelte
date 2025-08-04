<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { buttonTheme, type ButtonPrimitiveProps } from '$lib/components/Button/button.js';
	export const setButtonTheme = setComponentTheme<typeof buttonTheme>('button');
	export const useButtonTheme = useComponentTheme('button', buttonTheme);
</script>

<script lang="ts" generics="Payload extends Record<string, any>| undefined = undefined">
	import { loader } from '$lib/actions/loader.js';
	import Slot from '../Slot/Slot.svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		as,
		payload,
		loading = false,
		onclick = null,
		prefixProps,
		onenter = null,
		onleave = null,
		suffixProps,
		href,
		squared,
		class: className,
		color = 'contrast',
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
		...attachments
	}: ButtonPrimitiveProps<Payload> = $props();

	const isSquared = $derived(
		squared ?? !!((!children && prefix && !suffix) || (!children && !prefix && suffix))
	);

	const classes = $derived(useButtonTheme(theme));
</script>

<svelte:element
	this={as || href ? 'a' : 'button'}
	role={as || href ? 'link' : 'button'}
	{href}
	{rel}
	{target}
	bind:this={ref}
	data-squared={isSquared}
	data-loading={loading}
	data-color={color}
	data-variant={variant}
	data-size={size}
	data-full-width={fullWidth}
	data-disabled={disabled}
	{disabled}
	class={classes.button({ color, squared: isSquared, variant, size, loading, disabled, className })}
	use:loader={{ loading }}
	onclick={onclick &&
		(() => {
			if (!disabled) {
				onclick(payload);
			}
		})}
	onpointerenter={onenter &&
		(() => {
			if (!disabled) {
				onenter(payload);
			}
		})}
	onpointerleave={onleave &&
		(() => {
			if (!disabled) {
				onleave(payload);
			}
		})}
	{...attachments}
>
	<Slot {payload} render={prefix} class={classes.prefix({ size })} props={prefixProps} />
	<Slot {payload} render={children} props={childrenProps} />
	<Slot {payload} render={suffix} class={classes.suffix({ size })} props={suffixProps} />
</svelte:element>
