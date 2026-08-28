import type { ChartPoint, SceneNode } from '@tanstack/charts';
import { compileChannel, compileColor } from './chart.channels.js';
import type { CompiledMark, CompiledMarkResult } from './chart.cartesian.js';
import type { ChartScatterMark } from './chart.props.js';

type HexbinScatterMark<TRow> = Extract<ChartScatterMark<TRow>, { variant: 'hexbin' }>;

export type ChartHexbinDatum<TRow extends object = object> = {
	readonly __svelaiHexbin: true;
	readonly __svelaiSourceRows: readonly TRow[];
	readonly count: number;
	readonly x: number;
	readonly y: number;
};

type ScreenObservation<TRow extends object> = {
	readonly row: TRow;
	readonly xValue: number;
	readonly yValue: number;
	readonly x: number;
	readonly y: number;
};

type HexbinBucket<TRow extends object> = {
	readonly q: number;
	readonly r: number;
	readonly observations: ScreenObservation<TRow>[];
};

export function compileHexbinScatterMark<TRow extends object>(
	data: readonly TRow[],
	mark: HexbinScatterMark<TRow>,
	path: string
): CompiledMarkResult {
	const radius = mark.radius ?? 12;
	if (!Number.isFinite(radius) || radius <= 0) {
		throw new TypeError(`[Chart] ${path}.radius must be a finite number greater than 0.`);
	}
	const x = compileChannel(mark.x);
	const y = compileChannel(mark.y);
	const fill = compileColor(mark.color ?? 'primary');
	const id = mark.id ?? `${path}:hexbin`;
	const xValues = data.map((row, index) => x(row, index, data));
	const yValues = data.map((row, index) => y(row, index, data));
	const hexbin: CompiledMark = {
		initialize() {
			return {
				id,
				channels: {
					x: { scale: 'x', values: xValues.filter(isFiniteNumber) },
					y: { scale: 'y', values: yValues.filter(isFiniteNumber) }
				},
				render({ chart, scales }) {
					const observations = data.flatMap((row, index) => {
						const xValue = xValues[index];
						const yValue = yValues[index];
						if (!isFiniteNumber(xValue) || !isFiniteNumber(yValue)) return [];
						return [
							{
								row,
								xValue,
								yValue,
								x: scales.x.map(xValue),
								y: scales.y.map(yValue)
							}
						];
					});
					const buckets = binObservations(observations, chart.x, chart.y, radius);
					const maximumCount = Math.max(...buckets.map((bucket) => bucket.observations.length), 1);
					const nodes: SceneNode[] = [];
					const points: ChartPoint<ChartHexbinDatum<TRow>, number, number>[] = [];
					buckets.forEach((bucket, index) => {
						const center = hexCenter(bucket.q, bucket.r, chart.x, chart.y, radius);
						if (
							center.x < chart.x ||
							center.x > chart.x + chart.width ||
							center.y < chart.y ||
							center.y > chart.y + chart.height
						) {
							return;
						}
						const count = bucket.observations.length;
						const xValue = mean(bucket.observations.map((observation) => observation.xValue));
						const yValue = mean(bucket.observations.map((observation) => observation.yValue));
						const datum: ChartHexbinDatum<TRow> = {
							__svelaiHexbin: true,
							__svelaiSourceRows: bucket.observations.map((observation) => observation.row),
							count,
							x: xValue,
							y: yValue
						};
						const key = `${id}:${bucket.q}:${bucket.r}`;
						nodes.push({
							kind: 'area',
							key,
							points: hexagonVertices(center.x, center.y, radius - 0.75),
							style: {
								fill,
								fillOpacity: 0.16 + 0.78 * Math.sqrt(count / maximumCount)
							}
						});
						points.push({
							key,
							markId: id,
							group: null,
							groupLabel: 'Observations',
							datum,
							datumIndex: index,
							xValue,
							yValue,
							x: center.x,
							y: center.y,
							color: fill
						});
					});
					return {
						nodes: [
							{
								kind: 'group',
								key: id,
								className: 'ts-chart__hexbin',
								ariaHidden: true,
								clip: chart,
								children: nodes
							}
						],
						points
					};
				}
			};
		}
	};
	return { mark: hexbin, annotationMarks: [hexbin], requiresX: true, requiresY: true };
}

export function isHexbinDatum(value: unknown): value is ChartHexbinDatum {
	return typeof value === 'object' && value !== null && Reflect.get(value, '__svelaiHexbin') === true;
}

function binObservations<TRow extends object>(
	observations: readonly ScreenObservation<TRow>[],
	originX: number,
	originY: number,
	radius: number
): readonly HexbinBucket<TRow>[] {
	const buckets = new Map<string, HexbinBucket<TRow>>();
	for (const observation of observations) {
		const coordinate = roundAxial(
			(observation.x - originX) / radius,
			(observation.y - originY) / radius
		);
		const identity = `${coordinate.q}:${coordinate.r}`;
		const bucket = buckets.get(identity);
		if (bucket) bucket.observations.push(observation);
		else buckets.set(identity, { ...coordinate, observations: [observation] });
	}
	return [...buckets.values()];
}

function roundAxial(scaledX: number, scaledY: number): { q: number; r: number } {
	const q = (Math.sqrt(3) * scaledX - scaledY) / 3;
	const r = (2 * scaledY) / 3;
	let roundedQ = Math.round(q);
	let roundedR = Math.round(r);
	const roundedS = Math.round(-q - r);
	const qDifference = Math.abs(roundedQ - q);
	const rDifference = Math.abs(roundedR - r);
	const sDifference = Math.abs(roundedS + q + r);
	if (qDifference > rDifference && qDifference > sDifference) roundedQ = -roundedR - roundedS;
	else if (rDifference > sDifference) roundedR = -roundedQ - roundedS;
	return { q: roundedQ, r: roundedR };
}

function hexCenter(
	q: number,
	r: number,
	originX: number,
	originY: number,
	radius: number
): { x: number; y: number } {
	return {
		x: originX + radius * Math.sqrt(3) * (q + r / 2),
		y: originY + radius * 1.5 * r
	};
}

function hexagonVertices(x: number, y: number, radius: number): readonly (readonly [number, number])[] {
	return Array.from({ length: 6 }, (_value, vertex) => {
		const angle = ((vertex * 60 - 90) * Math.PI) / 180;
		return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius] as const;
	});
}

function mean(values: readonly number[]): number {
	return values.reduce((total, value) => total + value, 0) / values.length;
}

function isFiniteNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value);
}
