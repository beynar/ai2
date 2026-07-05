<script lang="ts">
	import Tree from '$lib/components/Tree/Tree.svelte';
	import { preparedLargeTreeInput } from '../tree-demo-data.js';
</script>

<div class="w-full max-w-2xl">
	<Tree
		id="docs-tree-large"
		preparedInput={preparedLargeTreeInput}
		height={360}
		initialExpansion={2}
		initialVisibleRowCount={16}
		overscan={8}
		stickyFolders
	/>
</div>
