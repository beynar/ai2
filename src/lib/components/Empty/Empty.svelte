<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import Button from '../Button/Button.svelte';
	import type { EmptyProps } from './empty.props.js';
	import { useEmptyTheme } from './empty.theme.js';

	let {
		mediaVariant = 'default',
		mode = 'normal',
		bordered = false,
		size = 'normal',
		media,
		title,
		description,
		content,
		actions,
		note,
		footer,
		children,
		class: className,
		theme,
		...attachments
	}: EmptyProps = $props();

	const classes = $derived(useEmptyTheme(theme));
</script>

<div
	data-size={size}
	data-mode={mode}
	data-bordered={bordered}
	class={classes.root({ size, mode, bordered, className })}
	{...attachments}
>
	{#if children}
		{@render children()}
	{:else}
		{#if media != null || title != null || description != null}
			<div class={classes.header({ size })}>
				<Slot render={media} class={classes.media({ size, mediaVariant })} />
				<Slot render={title} class={classes.title({ size })} />
				<Slot render={description} class={classes.description({ size })} />
			</div>
		{/if}
		{#if content != null || note != null || actions?.length}
			<div class={classes.content({ size })}>
				{#if actions?.length}
					<div class={classes.actions({ size })}>
						{#each actions as action, index (index)}
							{@const { content: label, ...buttonProps } = action}
							<Button {...buttonProps}>{label}</Button>
						{/each}
					</div>
				{/if}
				<Slot render={content} />
				<Slot render={note} class={classes.description({ size })} />
			</div>
		{/if}
		<Slot render={footer} class={classes.footer({ size })} />
	{/if}
</div>
