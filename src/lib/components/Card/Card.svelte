<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import Button from '../Button/Button.svelte';
	import type { CardProps, CardActionSlot } from './card.props.js';
	import type { ButtonProps } from '../Button/button.props.js';
	import { useCardTheme } from './card.theme.js';

	let {
		ref = $bindable(),
		class: className,
		disabled = false,
		color = 'surface',
		variant = 'solid',
		size = 'normal',
		href,
		target,
		rel,
		onClick = null,
		onEnter = null,
		onLeave = null,
		showBorders = false,
		theme,
		header,
		title,
		description,
		action,
		content,
		footer,
		children,
		...attachments
	}: CardProps = $props();

	const classes = $derived(useCardTheme(theme));

	const hasHeader = $derived(!!(header || title || description || action));
	const hasContent = $derived(!!(content || children));
	const hasFooter = $derived(!!footer);
	const hasBorderBottom = $derived(showBorders && hasFooter);
	const hasBorderTop = $derived(showBorders && hasHeader);
	const hasAction = $derived(!!action);

	const element = $derived(href ? 'a' : 'div');
	const role = $derived(href ? 'link' : onClick ? 'button' : undefined);

	const handleClick = () => {
		if (!disabled && onClick) onClick();
	};
	const handleEnter = () => {
		if (!disabled && onEnter) onEnter();
	};
	const handleLeave = () => {
		if (!disabled && onLeave) onLeave();
	};

	const isButtonProps = (value: CardActionSlot | undefined): value is Omit<ButtonProps, 'as'> => {
		if (!value) return false;
		// Snippets are functions, strings are strings
		if (typeof value === 'function' || typeof value === 'string') return false;
		// Objects with Button-like properties are ButtonProps
		return typeof value === 'object' && value !== null;
	};
</script>

<svelte:element
	this={element}
	bind:this={ref}
	data-slot="card"
	data-color={color}
	data-size={size}
	data-variant={variant}
	{href}
	{target}
	{rel}
	{role}
	class={classes.card({ color, variant, size, disabled, className })}
	onclick={handleClick}
	onpointerenter={handleEnter}
	onpointerleave={handleLeave}
	aria-disabled={disabled}
	{...attachments}
>
	<Slot
		renderIf={hasHeader}
		render={header}
		attrs={{
			'data-color': color
		}}
		class={classes.header({ size, hasAction, hasBorder: hasBorderTop, variant })}
	>
		<Slot render={title} class={classes.title({ size, variant })} />
		<Slot render={description} class={classes.description({ size, variant })} />

		{#if action}
			{#if isButtonProps(action)}
				{@const actionClass = classes.action({ class: action.class })}
				{@const { class: _, ...actionWithoutClass } = action}
				<Button size={'small'} variant="ghost" {...actionWithoutClass} class={actionClass} />
			{:else}
				<Slot render={action} class={classes.action()} />
			{/if}
		{/if}
	</Slot>

	<Slot
		renderIf={hasContent}
		render={content}
		class={classes.content({ size, hasBorderBottom, hasBorderTop })}
	>
		<Slot render={children} />
	</Slot>

	<Slot render={footer} class={classes.footer({ size, hasBorder: hasBorderBottom })} />
</svelte:element>
