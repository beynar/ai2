import type { TableOfContentsItem, TableOfContentsLevel } from './tableOfContents.props.js';

export type TableOfContentsRailPosition = {
	id: string;
	level: TableOfContentsLevel;
	top: number;
	bottom: number;
	center: number;
	x: number;
	connectorStart: number;
	connectorEnd: number;
};

export type TableOfContentsRailGeometry = {
	height: number;
	width: number;
	path: string;
	positions: TableOfContentsRailPosition[];
};

export type TableOfContentsActiveRange = {
	top: number;
	bottom: number;
};

export type TableOfContentsRailGutter = 'none' | 'rail' | 'marker' | 'connector';

const BASE_LINE_X = 10;
const CONNECTOR_LENGTH = 18;
const TEXT_GAP = 15;
const COMPACT_TEXT_GAP = 8;

export function normalizeTableOfContentsLevels(
	levels: readonly TableOfContentsLevel[]
): TableOfContentsLevel[] {
	return [...new Set(levels)].filter((level) => level >= 1 && level <= 6).sort((a, b) => a - b);
}

export function getTableOfContentsItemOffset(
	level: TableOfContentsLevel,
	levels: readonly TableOfContentsLevel[],
	indentSize: number,
	sizeScale = 1,
	railGutter: TableOfContentsRailGutter = 'connector'
): number {
	const scale = normalizeScale(sizeScale);
	if (railGutter === 'none') {
		const baseLevel = levels[0] ?? level;
		return Math.max(0, level - baseLevel) * normalizeSize(indentSize) * scale;
	}

	const lineX = getTableOfContentsLineX(level, levels, indentSize, scale);
	if (railGutter === 'connector') {
		return getTableOfContentsConnectorEnd(lineX, scale) + TEXT_GAP * scale;
	}

	const markerRadius = railGutter === 'marker' ? getTableOfContentsMarkerRadius(level, scale) : 0;
	return lineX + markerRadius + COMPACT_TEXT_GAP * scale;
}

export function getTableOfContentsLineX(
	level: TableOfContentsLevel,
	levels: readonly TableOfContentsLevel[],
	indentSize: number,
	sizeScale = 1
): number {
	const scale = normalizeScale(sizeScale);
	const baseLevel = levels[0] ?? level;
	return BASE_LINE_X * scale + Math.max(0, level - baseLevel) * normalizeSize(indentSize) * scale;
}

export function getTableOfContentsConnectorEnd(lineX: number, sizeScale = 1): number {
	return lineX + CONNECTOR_LENGTH * normalizeScale(sizeScale);
}

export function getTableOfContentsMarkerRadius(level: TableOfContentsLevel, sizeScale = 1): number {
	return Math.max(0, 4.5 - (level - 1) * 0.5) * normalizeScale(sizeScale);
}

export function measureTableOfContentsRail(
	list: HTMLOListElement,
	items: TableOfContentsItem[],
	levels: readonly TableOfContentsLevel[],
	indentSize: number,
	indentRadius: number,
	sizeScale = 1
): TableOfContentsRailGeometry | null {
	const scale = normalizeScale(sizeScale);
	const listRect = list.getBoundingClientRect();
	if (listRect.width === 0 && listRect.height === 0) return null;

	const links = new Map(
		Array.from(list.querySelectorAll<HTMLElement>('a[data-toc-id]')).map((link) => [
			link.dataset.tocId,
			link
		])
	);
	const positions = items.flatMap((item): TableOfContentsRailPosition[] => {
		const link = links.get(item.id);
		if (!link) return [];

		const rect = link.getBoundingClientRect();
		const styles = getComputedStyle(link);
		const paddingTop = finiteNumber(styles.paddingTop);
		const paddingBottom = finiteNumber(styles.paddingBottom);
		const top = rect.top - listRect.top + list.scrollTop + paddingTop;
		const bottom = rect.bottom - listRect.top + list.scrollTop - paddingBottom;
		if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom <= top) return [];

		const x = getTableOfContentsLineX(item.level, levels, indentSize, scale);
		return [
			{
				id: item.id,
				level: item.level,
				top: Math.max(0, top),
				bottom: Math.max(1, bottom),
				center: (Math.max(0, top) + Math.max(1, bottom)) / 2,
				x,
				connectorStart: x,
				connectorEnd: getTableOfContentsConnectorEnd(x, scale)
			}
		];
	});

	if (!positions.length) return null;

	return {
		height: Math.max(1, ...positions.map((position) => position.bottom)),
		width: Math.max(...positions.map((position) => position.connectorEnd)) + 2 * scale,
		path: buildRailPath(positions, normalizeRadius(indentRadius) * scale),
		positions
	};
}

export function getTableOfContentsActiveRange(
	positions: TableOfContentsRailPosition[],
	highlightedIds: Set<string>
): TableOfContentsActiveRange | null {
	const activePositions = positions.filter((position) => highlightedIds.has(position.id));
	if (!activePositions.length) return null;

	return {
		top: activePositions[0].top,
		bottom: activePositions.at(-1)?.bottom ?? activePositions[0].bottom
	};
}

function buildRailPath(positions: TableOfContentsRailPosition[], radius: number): string {
	const first = positions[0];
	const path = [
		`M${point(first.x)} ${point(first.top)}`,
		`L${point(first.x)} ${point(first.bottom)}`
	];

	for (let index = 1; index < positions.length; index += 1) {
		const previous = positions[index - 1];
		const current = positions[index];
		const gap = Math.max(0, current.top - previous.bottom);

		if (current.x === previous.x || gap === 0) {
			path.push(`L${point(current.x)} ${point(current.top)}`);
			path.push(`L${point(current.x)} ${point(current.bottom)}`);
			continue;
		}

		const direction = Math.sign(current.x - previous.x);
		const midpoint = previous.bottom + gap / 2;
		const bendRadius = Math.min(radius, Math.abs(current.x - previous.x) / 2, gap / 2);

		path.push(`L${point(previous.x)} ${point(midpoint - bendRadius)}`);
		if (bendRadius > 0) {
			path.push(
				`Q${point(previous.x)} ${point(midpoint)} ${point(previous.x + direction * bendRadius)} ${point(midpoint)}`
			);
		}
		path.push(`L${point(current.x - direction * bendRadius)} ${point(midpoint)}`);
		if (bendRadius > 0) {
			path.push(
				`Q${point(current.x)} ${point(midpoint)} ${point(current.x)} ${point(midpoint + bendRadius)}`
			);
		}
		path.push(`L${point(current.x)} ${point(current.top)}`);
		path.push(`L${point(current.x)} ${point(current.bottom)}`);
	}

	return path.join(' ');
}

function finiteNumber(value: string): number {
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeRadius(radius: number): number {
	return Number.isFinite(radius) ? Math.max(0, radius) : 0;
}

function normalizeSize(size: number): number {
	return Number.isFinite(size) ? Math.max(0, size) : 0;
}

function normalizeScale(scale: number): number {
	return Number.isFinite(scale) ? Math.max(0, scale) : 1;
}

function point(value: number): string {
	return Number(value.toFixed(2)).toString();
}
