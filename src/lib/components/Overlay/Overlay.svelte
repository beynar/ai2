<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { OverlayProps } from './overlay.props.js';
	import { useOverlayTheme } from './overlay.theme.js';

	let {
		ref = $bindable(),
		class: className,
		position = 'fill',
		align = 'center',
		showOn = 'always',
		open = true,
		scrim = true,
		size = 'normal',
		title,
		description,
		content,
		actions,
		children,
		theme,
		...attachments
	}: OverlayProps = $props();

	const classes = $derived(useOverlayTheme(theme));
</script>

<div
	bind:this={ref}
	data-svelai-overlay
	data-open={open}
	data-show-on={showOn}
	data-position={position}
	aria-hidden={!open}
	inert={!open ? true : undefined}
	class={classes.root({ position, open, showOn, className })}
	{...attachments}
>
	{#if scrim && position === 'fill'}
		<div aria-hidden="true" class={classes.scrim({ position })}></div>
	{/if}

	<div data-overlay-content class={classes.content({ size, align, position, open, showOn })}>
		{#if scrim && position !== 'fill'}
			<div aria-hidden="true" class={classes.scrim({ position })}></div>
		{/if}

		{#if children}
			{@render children()}
		{:else}
			{#if title != null || description != null}
				<div class={classes.header({ size })}>
					<Slot render={title} class={classes.title({ size })} />
					<Slot render={description} class={classes.description({ size })} />
				</div>
			{/if}

			<Slot render={content} class={classes.body({ size })} />

			{#if actions?.length}
				<div class={classes.actions({ size, align })}>
					{#each actions as action, index (index)}
						{@const { content: label, ...buttonProps } = action}
						<Button {...buttonProps}>{label}</Button>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	:global(:where(*:has(> [data-svelai-overlay]:first-child))) {
		position: relative;
		isolation: isolate;
	}

	:global(:where(*:has(> [data-svelai-overlay]:first-child)):hover)
		> [data-svelai-overlay][data-open='true'][data-show-on='hover'],
	:global(:where(*:has(> [data-svelai-overlay]:first-child)):focus-within)
		> [data-svelai-overlay][data-open='true'][data-show-on='hover'],
	:global(:where(*:has(> [data-svelai-overlay]:first-child)):focus-within)
		> [data-svelai-overlay][data-open='true'][data-show-on='focus'] {
		opacity: 1;
	}

	:global(:where(*:has(> [data-svelai-overlay]:first-child)):hover)
		> [data-svelai-overlay][data-open='true'][data-show-on='hover']
		> [data-overlay-content],
	:global(:where(*:has(> [data-svelai-overlay]:first-child)):focus-within)
		> [data-svelai-overlay][data-open='true'][data-show-on='hover']
		> [data-overlay-content],
	:global(:where(*:has(> [data-svelai-overlay]:first-child)):focus-within)
		> [data-svelai-overlay][data-open='true'][data-show-on='focus']
		> [data-overlay-content] {
		pointer-events: auto;
		translate: 0;
	}

	@media (hover: none) {
		:global([data-svelai-overlay][data-open='true'][data-show-on='hover']) {
			opacity: 1;
		}

		:global(
			[data-svelai-overlay][data-open='true'][data-show-on='hover'] > [data-overlay-content]
		) {
			pointer-events: auto;
			translate: 0;
		}
	}
</style>
