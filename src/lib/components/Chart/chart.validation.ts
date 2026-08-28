import type { ChartInitialDimensions, ChartMark } from './chart.props.js';

export function validateInitialDimensions(dimensions: ChartInitialDimensions | undefined): void {
	if (dimensions === undefined) return;
	if (!Number.isFinite(dimensions.width) || dimensions.width <= 0) {
		throw new TypeError('[Chart] initialDimensions.width must be a finite number greater than 0.');
	}
	if (!Number.isFinite(dimensions.height) || dimensions.height <= 0) {
		throw new TypeError('[Chart] initialDimensions.height must be a finite number greater than 0.');
	}
}

export function validateMarkId<TRow extends object>(
	mark: ChartMark<TRow>,
	index: number,
	path: string,
	seen: Map<string, number>
): void {
	validateExplicitId(mark.id, index, path, seen);
}

export function validateExplicitId(
	id: string | undefined,
	index: number,
	path: string,
	seen: Map<string, number>
): void {
	if (id === undefined) return;
	const previousIndex = seen.get(id);
	if (previousIndex !== undefined) {
		const previousPath = path.replace(/\[\d+\]$/, `[${previousIndex}]`);
		throw new TypeError(`[Chart] ${path}.id duplicates ${previousPath}.id "${id}".`);
	}
	seen.set(id, index);
}
