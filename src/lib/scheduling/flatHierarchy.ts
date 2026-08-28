export type FlatHierarchyEntry = Readonly<{ id: string; parentId?: string }>;
export type FlatHierarchyErrorCode =
	'invalid-id' | 'duplicate-id' | 'missing-parent' | 'self-parent' | 'cycle';

export class FlatHierarchyError extends Error {
	readonly name = 'FlatHierarchyError';

	constructor(
		readonly code: FlatHierarchyErrorCode,
		message: string,
		readonly details: Readonly<{ id: string; parentId?: string }>
	) {
		super(message);
	}
}

export type FlatHierarchyNode = Readonly<{
	id: string;
	parentId: string | null;
	childIds: readonly string[];
	depth: number;
	preorderIndex: number;
	isLeaf: boolean;
	leafStart: number;
	leafSpan: number;
}>;

export type FlatHierarchy = Readonly<{
	nodes: readonly FlatHierarchyNode[];
	roots: readonly FlatHierarchyNode[];
	leaves: readonly FlatHierarchyNode[];
	nodesById: ReadonlyMap<string, FlatHierarchyNode>;
	maxDepth: number;
}>;

type MutableHierarchyNode = {
	id: string;
	parentId: string | null;
	childIds: readonly string[];
	depth: number;
	preorderIndex: number;
	isLeaf: boolean;
	leafStart: number;
	leafSpan: number;
};

export function buildFlatHierarchy(entries: readonly FlatHierarchyEntry[]): FlatHierarchy {
	const entriesById = indexEntries(entries);
	const childIdsByParent = buildChildIndex(entries, entriesById);
	assertAcyclic(entries, entriesById);

	const mutableNodes: MutableHierarchyNode[] = [];
	const leaves: MutableHierarchyNode[] = [];
	const mutableNodesById = new Map<string, MutableHierarchyNode>();
	let maxDepth = 0;
	const roots = childIdsByParent.get(null) ?? [];
	const stack: Array<
		{ phase: 'enter'; id: string; depth: number } | { phase: 'exit'; id: string }
	> = [];
	for (let index = roots.length - 1; index >= 0; index -= 1) {
		stack.push({ phase: 'enter', id: roots[index], depth: 0 });
	}

	while (stack.length > 0) {
		const frame = stack.pop();
		if (!frame) break;
		if (frame.phase === 'exit') {
			const node = getRequiredMutableNode(mutableNodesById, frame.id);
			if (node.isLeaf) {
				leaves.push(node);
				maxDepth = Math.max(maxDepth, node.depth);
			}
			node.leafSpan = node.isLeaf ? 1 : leaves.length - node.leafStart;
			continue;
		}

		const entry = getRequiredEntry(entriesById, frame.id);
		const childIds = childIdsByParent.get(frame.id) ?? [];
		const node: MutableHierarchyNode = {
			id: frame.id,
			parentId: entry.parentId ?? null,
			childIds,
			depth: frame.depth,
			preorderIndex: mutableNodes.length,
			isLeaf: childIds.length === 0,
			leafStart: leaves.length,
			leafSpan: 0
		};
		mutableNodes.push(node);
		mutableNodesById.set(node.id, node);
		stack.push({ phase: 'exit', id: node.id });
		for (let index = childIds.length - 1; index >= 0; index -= 1) {
			stack.push({ phase: 'enter', id: childIds[index], depth: frame.depth + 1 });
		}
	}

	const nodes = mutableNodes as readonly FlatHierarchyNode[];
	const nodesById = mutableNodesById as ReadonlyMap<string, FlatHierarchyNode>;
	return {
		nodes,
		roots: roots.map((id) => getRequiredNode(nodesById, id)),
		leaves,
		nodesById,
		maxDepth
	};
}

function indexEntries(
	entries: readonly FlatHierarchyEntry[]
): ReadonlyMap<string, FlatHierarchyEntry> {
	const entriesById = new Map<string, FlatHierarchyEntry>();
	for (const entry of entries) {
		if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
			throw new FlatHierarchyError('invalid-id', 'Hierarchy entries need non-empty string IDs.', {
				id: typeof entry?.id === 'string' ? entry.id : ''
			});
		}
		if (entriesById.has(entry.id)) {
			throw new FlatHierarchyError('duplicate-id', `Duplicate hierarchy id: ${entry.id}.`, {
				id: entry.id
			});
		}
		entriesById.set(entry.id, entry);
	}
	return entriesById;
}

function buildChildIndex(
	entries: readonly FlatHierarchyEntry[],
	entriesById: ReadonlyMap<string, FlatHierarchyEntry>
): ReadonlyMap<string | null, readonly string[]> {
	const childIdsByParent = new Map<string | null, string[]>();
	for (const entry of entries) {
		if (entry.parentId === entry.id) {
			throw new FlatHierarchyError(
				'self-parent',
				`Hierarchy entry ${entry.id} is its own parent.`,
				{
					id: entry.id,
					parentId: entry.parentId
				}
			);
		}
		if (entry.parentId !== undefined && !entriesById.has(entry.parentId)) {
			throw new FlatHierarchyError(
				'missing-parent',
				`Hierarchy entry ${entry.id} references missing parent ${entry.parentId}.`,
				{ id: entry.id, parentId: entry.parentId }
			);
		}
		const parentId = entry.parentId ?? null;
		const childIds = childIdsByParent.get(parentId) ?? [];
		childIds.push(entry.id);
		childIdsByParent.set(parentId, childIds);
	}
	return childIdsByParent;
}

function assertAcyclic(
	entries: readonly FlatHierarchyEntry[],
	entriesById: ReadonlyMap<string, FlatHierarchyEntry>
): void {
	const visited = new Set<string>();
	for (const entry of entries) {
		if (visited.has(entry.id)) continue;
		const path = new Set<string>();
		let current: FlatHierarchyEntry | undefined = entry;
		while (current && !visited.has(current.id)) {
			if (path.has(current.id)) {
				throw new FlatHierarchyError('cycle', 'Hierarchy contains a cycle.', {
					id: entry.id,
					parentId: current.id
				});
			}
			path.add(current.id);
			current = current.parentId ? entriesById.get(current.parentId) : undefined;
		}
		for (const id of path) visited.add(id);
	}
}

function getRequiredEntry(
	entriesById: ReadonlyMap<string, FlatHierarchyEntry>,
	id: string
): FlatHierarchyEntry {
	const entry = entriesById.get(id);
	if (entry) return entry;
	throw new Error(`Hierarchy entry ${id} disappeared during traversal.`);
}

function getRequiredMutableNode(
	nodesById: ReadonlyMap<string, MutableHierarchyNode>,
	id: string
): MutableHierarchyNode {
	const node = nodesById.get(id);
	if (node) return node;
	throw new Error(`Hierarchy node ${id} disappeared during traversal.`);
}

function getRequiredNode(
	nodesById: ReadonlyMap<string, FlatHierarchyNode>,
	id: string
): FlatHierarchyNode {
	const node = nodesById.get(id);
	if (node) return node;
	throw new Error(`Hierarchy root ${id} disappeared during traversal.`);
}
