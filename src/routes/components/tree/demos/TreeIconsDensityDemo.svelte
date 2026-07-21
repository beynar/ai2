<script lang="ts">
	import type { FileTreeDensity, FileTreeIcons } from '@pierre/trees';
	import Button from '$lib/components/Button/Button.svelte';
	import Tree from '$lib/components/Tree/Tree.svelte';
	import { gitStatus, workspaceTreePaths } from '../tree-demo-data.js';

	type DensityOption = {
		label: string;
		value: FileTreeDensity;
	};

	const densityOptions: DensityOption[] = [
		{ label: 'Compact', value: 'compact' },
		{ label: 'Default', value: 'default' },
		{ label: 'Relaxed', value: 'relaxed' }
	];

	let density = $state<FileTreeDensity>('compact');
	let coloredIcons = $state(true);

	const icons = $derived<FileTreeIcons>({
		set: 'complete',
		colored: coloredIcons,
		byFileName: {
			'Tree.svelte': 'tree'
		},
		byFileExtension: {
			svelte: 'svelte',
			ts: 'typescript'
		}
	});
</script>

{#snippet segmented(
	current: FileTreeDensity,
	options: DensityOption[],
	onSelect: (value: FileTreeDensity) => void
)}
	<div class="flex flex-wrap gap-1">
		{#each options as option (String(option.value))}
			<Button
				size="small"
				variant={current === option.value ? 'solid' : 'ghost'}
				color="neutral"
				onClick={() => onSelect(option.value)}
			>
				{option.label}
			</Button>
		{/each}
	</div>
{/snippet}

<div class="grid w-full max-w-2xl gap-3">
	<div
		class="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-muted bg-surface p-2"
	>
		{@render segmented(density, densityOptions, (value) => (density = value))}
		<Button
			size="small"
			variant={coloredIcons ? 'solid' : 'outline'}
			color="neutral"
			onClick={() => (coloredIcons = !coloredIcons)}
		>
			Color icons
		</Button>
	</div>
	<Tree
		id="docs-tree-icons-density"
		paths={workspaceTreePaths}
		height={320}
		{density}
		{icons}
		{gitStatus}
		initialExpansion="open"
		initialSelectedPaths={['src/lib/components/Tree/Tree.svelte']}
	/>
</div>
