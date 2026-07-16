import type { TableOfContentsItem, TableOfContentsLevel } from './tableOfContents.props.js';

export function normalizeTableOfContentsItems(
	items: readonly TableOfContentsItem[] | undefined,
	levels: readonly TableOfContentsLevel[]
): TableOfContentsItem[] | null {
	if (items === undefined) return null;

	const includedLevels = new Set(levels);
	const usedIds = new Set<string>();
	const normalizedItems: TableOfContentsItem[] = [];

	for (const item of items) {
		const id = item.id.trim();
		const title = item.title.replace(/\s+/g, ' ').trim();
		if (!id || !title || !includedLevels.has(item.level) || usedIds.has(id)) continue;

		usedIds.add(id);
		normalizedItems.push({ id, level: item.level, title });
	}

	return normalizedItems;
}
