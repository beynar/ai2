import { prepareFileTreeInput, type GitStatusEntry } from '@pierre/trees';

export const basicTreePaths = [
	'app.html',
	'src/app.css',
	'src/lib/components/Button.svelte',
	'src/lib/components/Tree/Tree.svelte',
	'src/routes/+layout.svelte',
	'src/routes/+page.svelte',
	'vite.config.ts'
] as const;

export const workspaceTreePaths = [
	'.github/workflows/check.yml',
	'package.json',
	'pnpm-lock.yaml',
	'src/lib/components/Tree/Tree.svelte',
	'src/lib/components/Tree/tree-input.ts',
	'src/lib/components/Tree/tree.props.ts',
	'src/lib/components/Tree/tree.theme.ts',
	'src/routes/components/tree/+page.svelte',
	'tests/tree.spec.ts'
] as const;

export const gitStatus: GitStatusEntry[] = [
	{ path: 'src/lib/components/Tree/Tree.svelte', status: 'modified' },
	{ path: 'src/lib/components/Tree/tree-input.ts', status: 'modified' },
	{ path: 'src/routes/components/tree/+page.svelte', status: 'added' },
	{ path: 'tests/tree.spec.ts', status: 'untracked' },
	{ path: 'pnpm-lock.yaml', status: 'ignored' }
];

const largeTreePaths = Array.from({ length: 220 }, (_, index) => {
	const packageIndex = Math.floor(index / 22) + 1;
	const fileIndex = String(index + 1).padStart(3, '0');
	return `packages/package-${packageIndex}/src/features/feature-${fileIndex}/index.ts`;
});

export const preparedLargeTreeInput = prepareFileTreeInput(largeTreePaths, {
	sort: 'default'
});
