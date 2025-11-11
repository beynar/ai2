<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { MenuOptionProps } from './menuOption.props.js';
	import { useMenuOptionTheme } from './menuOption.theme.js';

	let {
		color = 'contrast',
		size = 'normal',
		class: className = '',
		onClick,
		onEnter,
		onLeave,
		href,
		target,
		rel,
		as,
		title,
		description,
		children,
		prefix,
		suffix,
		theme,
		prefixProps,
		suffixProps,
		titleProps,
		descriptionProps,
		childrenProps,
		...attachments
	}: MenuOptionProps = $props();

	const classes = $derived(useMenuOptionTheme(theme));

	// Determine element type: custom 'as', link if href, button if interactive, otherwise div
	const elementType = $derived(as || (href ? 'a' : 'button'));

	// Determine role based on element type
	const role = $derived(
		elementType === 'button' ? 'button' : elementType === 'a' ? 'link' : 'menuitem'
	);
</script>

<svelte:element
	this={elementType}
	{role}
	{href}
	{target}
	{rel}
	data-color={color}
	data-size={size}
	onclick={onClick}
	onpointerenter={onEnter}
	onpointerleave={onLeave}
	class={classes.menuOption({
		color,
		size,
		className
	})}
	{...attachments}
>
	<Slot
		render={prefix}
		class={classes.prefix({ size, align: title && description ? 'start' : 'center' })}
		props={prefixProps}
	/>

	{#if children}
		<Slot render={children} props={childrenProps} />
	{:else if title || description}
		<div class={classes.content({ size })}>
			{#if title}
				<Slot render={title} class="{classes.title({ size })} leading-none" props={titleProps} />
			{/if}
			{#if description}
				<Slot render={description} class={classes.description({ size })} props={descriptionProps} />
			{/if}
		</div>
	{/if}

	<Slot render={suffix} class={classes.suffix({ size })} props={suffixProps} />
</svelte:element>
