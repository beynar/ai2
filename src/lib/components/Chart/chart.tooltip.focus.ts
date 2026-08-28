import type { ChartFocusStrategy, ChartPoint, ChartValue } from '@tanstack/charts';
import type { ChartPositionDefinition } from './chart.props.js';

export type ChartTooltipPositions = Readonly<{
	x?: ChartPositionDefinition;
	y?: ChartPositionDefinition;
}>;

export function compileVisibleTooltipFocus<TRow extends object>(
	groupBy: 'x' | 'y' | undefined,
	positions: ChartTooltipPositions | undefined
): ChartFocusStrategy<TRow> | undefined {
	const xDomain = positions?.x?.scale.domain;
	const yDomain = positions?.y?.scale.domain;
	if (!xDomain && !yDomain) return undefined;

	const visible = (point: ChartPoint<TRow>) =>
		isValueInDomain(point.xValue, xDomain, positions?.x) &&
		isValueInDomain(point.yValue, yDomain, positions?.y);
	const visiblePoints = (points: readonly ChartPoint<TRow>[]) => points.filter(visible);

	return {
		resolve(points, x, y, maxDistance) {
			const candidates = visiblePoints(points);
			return groupBy
				? resolveAxisFocus(candidates, x, y, maxDistance, groupBy)
				: resolveNearestFocus(candidates, x, y, maxDistance);
		},
		group(points, point) {
			if (!visible(point)) return [];
			const candidates = visiblePoints(points);
			return groupBy ? groupAxisPoints(candidates, point, groupBy) : [point];
		},
		navigation(points) {
			const candidates = visiblePoints(points).toSorted(
				(left, right) => left.x - right.x || left.y - right.y
			);
			if (!groupBy) return candidates;
			const unique = new Map<string, ChartPoint<TRow>>();
			for (const point of candidates) {
				const key = chartValueKey(axisValue(point, groupBy));
				if (!unique.has(key)) unique.set(key, point);
			}
			return [...unique.values()];
		}
	};
}

function resolveAxisFocus<TRow extends object>(
	points: readonly ChartPoint<TRow>[],
	x: number,
	y: number,
	maxDistance: number,
	axis: 'x' | 'y'
): readonly ChartPoint<TRow>[] {
	const target = axis === 'x' ? x : y;
	let nearest: ChartPoint<TRow> | undefined;
	let distance = maxDistance;
	for (const point of points) {
		const nextDistance = Math.abs(axisCoordinate(point, axis) - target);
		if (nextDistance >= distance) continue;
		nearest = point;
		distance = nextDistance;
	}
	if (!nearest) return [];
	const grouped = groupAxisPoints(points, nearest, axis);
	const secondaryTarget = axis === 'x' ? y : x;
	const primary = grouped.reduce((closest, candidate) =>
		Math.abs(secondaryCoordinate(candidate, axis) - secondaryTarget) <
		Math.abs(secondaryCoordinate(closest, axis) - secondaryTarget)
			? candidate
			: closest
	);
	return [primary, ...grouped.filter((point) => point !== primary)];
}

function resolveNearestFocus<TRow extends object>(
	points: readonly ChartPoint<TRow>[],
	x: number,
	y: number,
	maxDistance: number
): readonly ChartPoint<TRow>[] {
	let nearest: ChartPoint<TRow> | undefined;
	let distance = maxDistance;
	for (const point of points) {
		const nextDistance = Math.hypot(point.x - x, point.y - y);
		if (nextDistance >= distance) continue;
		nearest = point;
		distance = nextDistance;
	}
	return nearest ? [nearest] : [];
}

function groupAxisPoints<TRow extends object>(
	points: readonly ChartPoint<TRow>[],
	point: ChartPoint<TRow>,
	axis: 'x' | 'y'
): readonly ChartPoint<TRow>[] {
	const axisKey = chartValueKey(axisValue(point, axis));
	const unique = new Map<string, ChartPoint<TRow>>();
	unique.set(chartValueKey(point.group), point);
	for (const candidate of points) {
		if (chartValueKey(axisValue(candidate, axis)) !== axisKey) continue;
		const groupKey = chartValueKey(candidate.group);
		if (!unique.has(groupKey)) unique.set(groupKey, candidate);
	}
	const sorted = [...unique.values()].sort((left, right) => left.y - right.y);
	return [point, ...sorted.filter((candidate) => candidate !== point)];
}

function isValueInDomain(
	value: ChartValue,
	domain: readonly ChartValue[] | undefined,
	position: ChartPositionDefinition | undefined
): boolean {
	if (!domain) return true;
	if (position?.scale.type === 'band' || position?.scale.type === 'point') {
		return domain.some((candidate) => sameChartValue(value, candidate));
	}
	const first = domain[0];
	const last = domain.at(-1);
	if (first === undefined || last === undefined) return false;
	const numericValue = chartValueNumber(value);
	const numericFirst = chartValueNumber(first);
	const numericLast = chartValueNumber(last);
	if (![numericValue, numericFirst, numericLast].every(Number.isFinite)) return false;
	return (
		numericValue >= Math.min(numericFirst, numericLast) &&
		numericValue <= Math.max(numericFirst, numericLast)
	);
}

function axisCoordinate<TRow extends object>(point: ChartPoint<TRow>, axis: 'x' | 'y'): number {
	return axis === 'x' ? point.x : point.y;
}

function secondaryCoordinate<TRow extends object>(
	point: ChartPoint<TRow>,
	axis: 'x' | 'y'
): number {
	return axis === 'x' ? point.y : point.x;
}

function axisValue<TRow extends object>(point: ChartPoint<TRow>, axis: 'x' | 'y'): ChartValue {
	return axis === 'x' ? point.xValue : point.yValue;
}

function sameChartValue(left: ChartValue, right: ChartValue): boolean {
	if (left instanceof Date || right instanceof Date) {
		return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
	}
	return Object.is(left, right);
}

function chartValueNumber(value: ChartValue): number {
	if (value instanceof Date) return value.getTime();
	return typeof value === 'number' ? value : Number.NaN;
}

function chartValueKey(value: ChartValue | null): string {
	if (value instanceof Date) return `date:${value.getTime()}`;
	return `${typeof value}:${String(value)}`;
}
