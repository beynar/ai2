<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TreeContextMenuSnippetData } from './TreeSnippetRenderer.js';

	let {
		children,
		data
	}: {
		children: Snippet<[TreeContextMenuSnippetData]>;
		data: TreeContextMenuSnippetData;
	} = $props();
</script>

{@render children(data)}
