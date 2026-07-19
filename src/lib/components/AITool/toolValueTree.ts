export type AIToolValueTreeNode =
	| {
			kind: 'branch';
			key: string;
			valueKind: 'object' | 'array';
			summary: string;
			children: AIToolValueTreeNode[];
	  }
	| {
			kind: 'leaf';
			key: string;
			value: string;
			valueKind: 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'empty' | 'unknown';
	  };

const DEFAULT_MAX_DEPTH = 8;
const DEFAULT_MAX_ENTRIES = 80;

export function buildToolValueTree(
	value: unknown,
	maxDepth = DEFAULT_MAX_DEPTH,
	maxEntries = DEFAULT_MAX_ENTRIES
): AIToolValueTreeNode[] {
	const tree = buildNode(
		'',
		value,
		new WeakSet(),
		0,
		normalizeLimit(maxDepth, DEFAULT_MAX_DEPTH),
		normalizeLimit(maxEntries, DEFAULT_MAX_ENTRIES)
	);
	return tree.kind === 'branch' && tree.key === '' ? tree.children : [tree];
}

function buildNode(
	key: string,
	value: unknown,
	seen: WeakSet<object>,
	depth: number,
	maxDepth: number,
	maxEntries: number
): AIToolValueTreeNode {
	if (value === null || typeof value !== 'object') return leafNode(key, value);
	if (value instanceof Date) {
		return leafNode(key, Number.isNaN(value.getTime()) ? 'Invalid Date' : value.toISOString());
	}
	if (value instanceof Error) return leafNode(key, `${value.name}: ${value.message}`);
	if (depth >= maxDepth) return leafNode(key, 'Max depth reached', 'unknown');
	if (seen.has(value)) return leafNode(key, 'Circular reference', 'unknown');

	seen.add(value);
	const node = Array.isArray(value)
		? arrayNode(key, value, seen, depth, maxDepth, maxEntries)
		: objectNode(key, value, seen, depth, maxDepth, maxEntries);
	seen.delete(value);
	return node;
}

function arrayNode(
	key: string,
	value: unknown[],
	seen: WeakSet<object>,
	depth: number,
	maxDepth: number,
	maxEntries: number
): AIToolValueTreeNode {
	const children = value
		.slice(0, maxEntries)
		.map((entry, index) => buildNode(`[${index}]`, entry, seen, depth + 1, maxDepth, maxEntries));
	if (value.length > maxEntries) {
		children.push(leafNode('...', `${value.length - maxEntries} more`, 'unknown'));
	}
	return {
		kind: 'branch',
		key,
		valueKind: 'array',
		summary: value.length === 0 ? 'Empty array' : `${value.length} items`,
		children
	};
}

function objectNode(
	key: string,
	value: object,
	seen: WeakSet<object>,
	depth: number,
	maxDepth: number,
	maxEntries: number
): AIToolValueTreeNode {
	const { keys, hasMore } = collectEnumerableKeys(value, maxEntries);
	if (keys.length === 0) return leafNode(key, objectLabel(value), 'empty');

	const children = keys.map((entryKey) =>
		buildNode(entryKey, readProperty(value, entryKey), seen, depth + 1, maxDepth, maxEntries)
	);
	if (hasMore) {
		children.push(leafNode('...', 'More entries', 'unknown'));
	}
	return {
		kind: 'branch',
		key,
		valueKind: 'object',
		summary: hasMore ? `${maxEntries}+ keys` : `${keys.length} keys`,
		children
	};
}

function collectEnumerableKeys(
	value: object,
	maxEntries: number
): { keys: string[]; hasMore: boolean } {
	const keys: string[] = [];
	for (const key in value) {
		if (!Object.prototype.hasOwnProperty.call(value, key)) continue;
		if (keys.length === maxEntries) return { keys, hasMore: true };
		keys.push(key);
	}
	return { keys, hasMore: false };
}

function readProperty(value: object, key: string): unknown {
	try {
		return Reflect.get(value, key);
	} catch (error) {
		return error instanceof Error ? error : new Error('Unable to read property.');
	}
}

function leafNode(
	key: string,
	value: unknown,
	valueKind = primitiveKind(value)
): Extract<AIToolValueTreeNode, { kind: 'leaf' }> {
	return { kind: 'leaf', key, value: formatValue(value), valueKind };
}

function primitiveKind(
	value: unknown
): Extract<AIToolValueTreeNode, { kind: 'leaf' }>['valueKind'] {
	if (value === null) return 'null';
	if (value === undefined) return 'undefined';
	if (typeof value === 'string') return 'string';
	if (typeof value === 'number' || typeof value === 'bigint') return 'number';
	if (typeof value === 'boolean') return 'boolean';
	return 'unknown';
}

function formatValue(value: unknown): string {
	if (value === null) return 'null';
	if (value === undefined) return 'undefined';
	if (typeof value === 'symbol') {
		return value.description ? `Symbol(${value.description})` : 'Symbol';
	}
	if (typeof value === 'function') return value.name ? `Function ${value.name}` : 'Function';
	return String(value);
}

function objectLabel(value: object): string {
	const name = value.constructor?.name;
	if (!name || name === 'Object') return 'Empty object';
	return name;
}

function normalizeLimit(value: number, fallback: number): number {
	if (!Number.isFinite(value)) return fallback;
	return Math.max(1, Math.floor(value));
}
