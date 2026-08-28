<script lang="ts">
	import type { AIToolValueTreeNode } from './toolValueTree.js';
	import { buildToolValueTree } from './toolValueTree.js';
	import { useAIToolTheme } from './aiTool.theme.js';
	import type { AIToolThemeProps } from './aiTool.theme.js';

	let {
		value,
		tone = 'default',
		maxDepth = 8,
		maxEntries = 80,
		theme
	}: {
		value: unknown;
		tone?: 'default' | 'error';
		maxDepth?: number;
		maxEntries?: number;
		theme?: AIToolThemeProps;
	} = $props();
	const nodes = $derived(buildToolValueTree(value, maxDepth, maxEntries));
	const classes = $derived(useAIToolTheme(theme));
</script>

{#snippet treeNode(node: AIToolValueTreeNode)}
	<li data-slot="ai-tool-value-tree-node" class={classes.treeNode()}>
		{#if node.kind === 'branch'}
			<div data-slot="ai-tool-value-tree-branch" class={classes.treeBranch()}>
				<span data-slot="ai-tool-value-tree-key" class={classes.treeKey()}>{node.key}</span><span
					data-slot="ai-tool-value-tree-summary"
					class={classes.treeSummary()}>{node.summary}</span
				>
			</div>
			<ul data-slot="ai-tool-value-tree-children" class={classes.treeChildren()}>
				{#each node.children as child, index (`${child.key}-${index}`)}{@render treeNode(
						child
					)}{/each}
			</ul>
		{:else}
			<div data-slot="ai-tool-value-tree-leaf" class={classes.treeLeaf()}>
				<span data-slot="ai-tool-value-tree-key" class={classes.treeKey()}
					>{node.key || 'value'}</span
				><span
					data-slot="ai-tool-value-tree-value"
					class={classes.treeValue({ kind: node.valueKind, tone })}>{node.value}</span
				>
			</div>
		{/if}
	</li>
{/snippet}

<ul data-slot="ai-tool-value-tree" class={classes.tree()}>
	{#each nodes as node, index (`${node.key}-${index}`)}{@render treeNode(node)}{/each}
</ul>
