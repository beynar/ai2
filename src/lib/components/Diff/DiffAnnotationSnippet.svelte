<script lang="ts">
	import type { DiffLineAnnotation } from '@pierre/diffs';
	import type { Snippet } from 'svelte';

	let {
		annotation,
		children
	}: {
		annotation: DiffLineAnnotation<undefined>;
		children: Snippet<[DiffLineAnnotation<undefined>]>;
	} = $props();
</script>

{@render children(annotation)}
