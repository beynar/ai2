<script lang="ts" generics="TData = unknown">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import Popover from '../Popover/Popover.svelte';
	import type { MapMarkerPopupContentArg, MapMarkerSnippetArg } from './map-types.js';

	type Props<TData = unknown> = {
		args: MapMarkerSnippetArg<TData>;
		content: true | string | Snippet<[MapMarkerPopupContentArg<TData>]>;
		open?: boolean;
		children: Snippet<[Attachment<HTMLElement>]>;
	};

	let { args, content, open = $bindable(false), children }: Props<TData> = $props();

	function close(): void {
		open = false;
	}

	const popupArg = $derived<MapMarkerPopupContentArg<TData>>({
		...args,
		open,
		close
	});
</script>

<Popover
	bind:open
	position="top"
	offset={10}
	openOnClick
	closeOnClickOutside
	closeOnEscape
	class="z-50 w-72 rounded-md border border-background-muted bg-background p-3 text-sm text-foreground shadow-md outline-none"
>
	{#snippet trigger(popover)}
		{@render children(popover.reference)}
	{/snippet}

	{#if content === true}
		<div class="space-y-1">
			<p class="font-medium leading-none">
				{#if args.marker.label}
					{@html args.marker.label}
				{:else}
					{args.marker.id}
				{/if}
			</p>
			{#if args.marker.description}
				<p class="text-foreground-muted">{args.marker.description}</p>
			{/if}
		</div>
	{:else if typeof content === 'string'}
		{@html content}
	{:else}
		{@render content(popupArg)}
	{/if}
</Popover>
