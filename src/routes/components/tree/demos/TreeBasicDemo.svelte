<script lang="ts">
	import Tree from '$lib/components/Tree/Tree.svelte';
	import { basicTreePaths } from '../tree-demo-data.js';
</script>

<div class="w-full max-w-2xl">
	<Tree
		id="docs-tree-basic"
		paths={basicTreePaths}
		height={320}
		initialExpansion="open"
		initialSelectedPaths={['src/lib/components/Tree/Tree.svelte']}
		search
		initialSearchQuery="Tree"
		searchBlurBehavior="retain"
	/>
</div>
