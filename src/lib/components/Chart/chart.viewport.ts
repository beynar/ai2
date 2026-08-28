import type {
	ChartAnimationOptions,
	ResolvedScale,
	ChartValue as TanStackValue
} from '@tanstack/charts';
import type { ChartPositionDefinition, ChartValue } from './chart.core.js';
import { invertChartContinuousScale } from './chart.scale.js';
import type {
	ChartViewport,
	ChartViewportAxis,
	ChartViewportTransition
} from './chart.viewport.props.js';

export type ResolvedChartViewport = {
	readonly axis: ChartViewportAxis;
	readonly reset: boolean;
	readonly animation: false | ChartAnimationOptions;
};

const DEFAULT_TRANSITION = {
	duration: 280,
	easing: 'ease-out'
} as const satisfies ChartViewportTransition;

export function resolveChartViewport(
	input: ChartViewport | undefined,
	x: ChartPositionDefinition | undefined,
	y: ChartPositionDefinition | undefined
): ResolvedChartViewport | undefined {
	if (input === undefined || input === false) return undefined;
	if (input !== true && (typeof input !== 'object' || input === null)) {
		throw new TypeError('[Chart] viewport must be a boolean or viewport definition.');
	}
	const definition = input === true ? {} : input;
	const axis = definition.axis ?? 'x';
	if (axis !== 'x' && axis !== 'y' && axis !== 'both') {
		throw new TypeError(`[Chart] viewport.axis "${String(axis)}" is not supported.`);
	}
	if (definition.drag !== undefined && definition.drag !== 'brush-zoom') {
		throw new TypeError(`[Chart] viewport.drag "${String(definition.drag)}" is not supported.`);
	}
	if ((axis === 'x' || axis === 'both') && !x) {
		throw new TypeError(`[Chart] viewport.axis "${axis}" requires the x prop.`);
	}
	if ((axis === 'y' || axis === 'both') && !y) {
		throw new TypeError(`[Chart] viewport.axis "${axis}" requires the y prop.`);
	}
	return {
		axis,
		reset: definition.reset ?? true,
		animation: resolveAnimation(definition.transition)
	};
}

export function resolveChartViewportDomain(
	position: ChartPositionDefinition | undefined,
	scale: ResolvedScale | undefined,
	firstCoordinate: number,
	secondCoordinate: number,
	path: string
): readonly ChartValue[] | undefined {
	if (!position || !scale || scale.domain.length === 0) return undefined;
	if (position.scale.type === 'band' || position.scale.type === 'point') {
		return discreteDomain(scale, firstCoordinate, secondCoordinate);
	}
	if (scale.domain.length !== 2) {
		throw new TypeError(`[Chart] ${path} must resolve to a two-value continuous domain.`);
	}
	const domainStart = scale.domain[0];
	const domainEnd = scale.domain[1];
	if (domainStart === undefined || domainEnd === undefined) return undefined;
	const rangeStart = scale.map(domainStart);
	const rangeEnd = scale.map(domainEnd);
	if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd)) return undefined;
	const minimum = Math.min(firstCoordinate, secondCoordinate);
	const maximum = Math.max(firstCoordinate, secondCoordinate);
	const first = invertChartContinuousScale(
		position.scale,
		scale.domain,
		[rangeStart, rangeEnd],
		minimum,
		`${path}.domain`
	);
	const second = invertChartContinuousScale(
		position.scale,
		scale.domain,
		[rangeStart, rangeEnd],
		maximum,
		`${path}.domain`
	);
	return orderedDomain(first, second, domainStart, domainEnd);
}

export function applyChartViewportDomain(
	position: ChartPositionDefinition | undefined,
	domain: readonly ChartValue[] | undefined,
	axis: 'x' | 'y'
): ChartPositionDefinition | undefined {
	if (!position || !domain) return position;
	switch (position.scale.type) {
		case 'linear':
		case 'sqrt':
		case 'pow':
		case 'log':
		case 'symlog': {
			const resolved = numericPair(domain, `viewport.${axis}`);
			return { ...position, scale: { ...position.scale, domain: resolved } };
		}
		case 'time':
		case 'utc': {
			const resolved = datePair(domain, `viewport.${axis}`);
			return { ...position, scale: { ...position.scale, domain: resolved } };
		}
		case 'band':
			return {
				reverse: position.reverse,
				grid: position.grid,
				axis: position.axis,
				scale: { ...position.scale, domain }
			};
		case 'point':
			return {
				reverse: position.reverse,
				grid: position.grid,
				axis: position.axis,
				scale: { ...position.scale, domain }
			};
	}
}

export function sameChartViewportDomain(
	left: readonly ChartValue[],
	right: readonly TanStackValue[] | undefined
): boolean {
	if (!right || left.length !== right.length) return false;
	return left.every((value, index) => sameValue(value, right[index]));
}

function resolveAnimation(
	transition: ChartViewportTransition | boolean | undefined
): false | ChartAnimationOptions {
	if (transition === false) return false;
	const definition =
		transition === undefined || transition === true ? DEFAULT_TRANSITION : transition;
	const duration = definition.duration ?? DEFAULT_TRANSITION.duration;
	const easing = definition.easing ?? DEFAULT_TRANSITION.easing;
	if (!Number.isFinite(duration) || duration < 0) {
		throw new TypeError(
			'[Chart] viewport.transition.duration must be a finite non-negative number.'
		);
	}
	if (
		easing !== 'linear' &&
		easing !== 'ease' &&
		easing !== 'ease-in' &&
		easing !== 'ease-out' &&
		easing !== 'ease-in-out'
	) {
		throw new TypeError(`[Chart] viewport.transition.easing "${String(easing)}" is not supported.`);
	}
	return { duration, easing, respectReducedMotion: true, resize: false };
}

function discreteDomain(
	scale: ResolvedScale,
	firstCoordinate: number,
	secondCoordinate: number
): readonly ChartValue[] | undefined {
	const positions = scale.domain.flatMap((value, index) => {
		const position = scale.map(value);
		return Number.isFinite(position) ? [{ index, position: position + scale.bandwidth / 2 }] : [];
	});
	if (positions.length === 0) return undefined;
	const first = nearestPosition(positions, firstCoordinate);
	const second = nearestPosition(positions, secondCoordinate);
	if (!first || !second) return undefined;
	return scale.domain.slice(
		Math.min(first.index, second.index),
		Math.max(first.index, second.index) + 1
	);
}

function nearestPosition(
	positions: readonly { index: number; position: number }[],
	coordinate: number
): { index: number; position: number } | undefined {
	return positions.reduce<{ index: number; position: number } | undefined>((nearest, candidate) => {
		if (!nearest) return candidate;
		return Math.abs(candidate.position - coordinate) < Math.abs(nearest.position - coordinate)
			? candidate
			: nearest;
	}, undefined);
}

function orderedDomain(
	first: number | Date,
	second: number | Date,
	originalFirst: TanStackValue,
	originalSecond: TanStackValue
): readonly [number, number] | readonly [Date, Date] {
	if (first instanceof Date && second instanceof Date) {
		const isAscending = valueNumber(originalFirst) <= valueNumber(originalSecond);
		const ordered: readonly [Date, Date] =
			first.getTime() <= second.getTime() ? [first, second] : [second, first];
		return isAscending ? ordered : [ordered[1], ordered[0]];
	}
	if (typeof first === 'number' && typeof second === 'number') {
		const isAscending = valueNumber(originalFirst) <= valueNumber(originalSecond);
		const ordered: readonly [number, number] = first <= second ? [first, second] : [second, first];
		return isAscending ? ordered : [ordered[1], ordered[0]];
	}
	throw new TypeError('[Chart] viewport resolved incompatible continuous domain values.');
}

function numericPair(values: readonly ChartValue[], path: string): readonly [number, number] {
	if (values.length === 2 && typeof values[0] === 'number' && typeof values[1] === 'number') {
		return [values[0], values[1]];
	}
	throw new TypeError(`[Chart] ${path} must contain two numbers.`);
}

function datePair(values: readonly ChartValue[], path: string): readonly [Date, Date] {
	if (values.length === 2 && values[0] instanceof Date && values[1] instanceof Date) {
		return [values[0], values[1]];
	}
	throw new TypeError(`[Chart] ${path} must contain two dates.`);
}

function sameValue(left: ChartValue, right: TanStackValue | undefined): boolean {
	if (left instanceof Date || right instanceof Date) {
		return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
	}
	return left === right;
}

function valueNumber(value: ChartValue | TanStackValue | undefined): number {
	if (value instanceof Date) return value.getTime();
	if (typeof value === 'number') return value;
	return Number.NaN;
}
