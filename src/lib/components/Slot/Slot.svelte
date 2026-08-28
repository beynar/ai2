<script lang="ts" generics="Payload extends any|undefined = undefined">
	import { type Slot } from './slot.js';
	import type { Snippet } from 'svelte';
	import type { WithAttachments } from '$lib/types/props.js';
	let {
		render,
		class: className = '',
		children,
		style = '',
		attrs = {},
		as = 'div',
		renderIf = true,
		payload,
		...attachments
	}: WithAttachments<{
		class?: string;
		as?: string;
		attrs?: Record<string, any>;
		children?: Snippet<[]>;
		style?: string;
		render?: Slot<Payload>;
		renderIf?: boolean;
		payload?: Payload;
	}> = $props();
</script>

{#snippet slot()}
	{#if typeof render === 'string'}
		{render}
	{:else if render}
		{@render render?.(payload)}
	{/if}
{/snippet}

{#if renderIf || render}
	<!-- If no class is pass, we assume that we don't want to wrap it inside a div -->
	{#if render}
		{#if !className && render}
			{@render slot()}
		{:else if render}
			<svelte:element this={as} {style} {...attrs} class={className} {...attachments}>
				{@render slot()}
			</svelte:element>
		{/if}
	{:else if children}
		{#if className}
			<svelte:element this={as} {style} {...attrs} class={className} {...attachments}>
				{@render children()}
			</svelte:element>
		{:else}
			{@render children()}
		{/if}
	{/if}
{/if}
