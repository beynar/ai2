import { areaY, lineY } from '@tanstack/charts';
import {
	assertSingleNumericKind,
	groupAnalysisRows,
	readFiniteNumber,
	readNumericChartValue,
	resolveAnalysisPaint,
	restoreNumericChartValue,
	type AnalysisGroupAccessor
} from './chart.analysis.data.js';
import { compileChannel } from './chart.channels.js';
import type { CompiledMark } from './chart.cartesian.js';
import { withoutTooltipPoints } from './chart.mark.js';
import type {
	ChartChannel,
	ChartKey,
	ChartRegressionAnalysis,
	ChartValue
} from './chart.props.js';

type RegressionDatum = {
	readonly identity: string;
	readonly group: ChartKey | null;
	readonly x: number | Date;
	readonly y: number;
	readonly lower?: number;
	readonly upper?: number;
};

type CompileRegressionAnalysisInput<TRow extends object> = {
	readonly data: readonly TRow[];
	readonly analysis: ChartRegressionAnalysis;
	readonly x: ChartChannel<TRow, ChartValue>;
	readonly y: ChartChannel<TRow, ChartValue>;
	readonly group?: AnalysisGroupAccessor<TRow>;
	readonly path: string;
	readonly id: string;
};

const CRITICAL_VALUES = {
	0.9: 1.645,
	0.95: 1.96,
	0.99: 2.576
} as const;

export function compileRegressionAnalysis<TRow extends object>({
	data,
	analysis,
	x,
	y,
	group,
	path,
	id
}: CompileRegressionAnalysisInput<TRow>): readonly CompiledMark[] {
	validateRegressionAnalysis(analysis, path);
	const xAccessor = compileChannel(x);
	const yAccessor = compileChannel(y);
	const groupedRows = groupAnalysisRows(data, group, analysis.scope, path);
	const samples = analysis.samples ?? 64;
	const rows = groupedRows.groups.flatMap((sourceGroup) => {
		const observations = sourceGroup.rows.flatMap(({ row, index }) => {
			const xValue = readNumericChartValue(xAccessor(row, index, data), `${path}.x`);
			const yValue = readFiniteNumber(yAccessor(row, index, data), `${path}.y`);
			return xValue && yValue !== undefined ? [{ x: xValue, y: yValue }] : [];
		});
		if (observations.length === 0) return [];
		if (observations.length < 2) {
			throw new TypeError(`[Chart] ${path} requires at least two observations per scope.`);
		}
		const xKind = assertSingleNumericKind(
			observations.map((observation) => observation.x),
			`${path}.x`
		);
		if (!xKind) return [];
		const fit = linearRegression(
			observations.map((observation) => ({ x: observation.x.numeric, y: observation.y })),
			analysis,
			path
		);
		return Array.from({ length: samples }, (_value, index) => {
			const ratio = samples === 1 ? 0 : index / (samples - 1);
			const numericX = fit.minimumX + (fit.maximumX - fit.minimumX) * ratio;
			const estimate = fit.intercept + fit.slope * numericX;
			const spread = regressionSpread(fit, numericX, analysis);
			return {
				identity: `${sourceGroup.identity}:${index}`,
				group: sourceGroup.key,
				x: restoreNumericChartValue(numericX, xKind),
				y: estimate,
				lower: spread === undefined ? undefined : estimate - spread,
				upper: spread === undefined ? undefined : estimate + spread
			} satisfies RegressionDatum;
		});
	});
	if (rows.length === 0) return [];
	const paint = resolveAnalysisPaint(analysis, groupedRows.isGrouped, 'primary');
	const channels = {
		z: paint.groupChannel,
		color: paint.colorChannel,
		key: 'identity' as const
	};
	const line = withoutTooltipPoints(
		lineY(rows, {
			...channels,
			id,
			x: 'x',
			y: 'y',
			stroke: paint.paint,
			strokeOpacity: analysis.strokeOpacity ?? 0.92,
			strokeWidth: analysis.strokeWidth ?? 2,
			strokeDasharray: analysis.strokeDasharray
		})
	);
	if (!analysis.interval) return [line];
	const band = withoutTooltipPoints(
		areaY(rows, {
			...channels,
			id: `${id}:interval`,
			x: 'x',
			y1: 'lower',
			y2: 'upper',
			fill: paint.paint,
			fillOpacity: analysis.interval.fillOpacity ?? 0.14
		})
	);
	return [band, line];
}

function validateRegressionAnalysis(analysis: ChartRegressionAnalysis, path: string): void {
	if (analysis.method !== undefined && analysis.method !== 'linear') {
		throw new TypeError(`[Chart] ${path}.method "${String(analysis.method)}" is not supported.`);
	}
	if (analysis.samples !== undefined && (!Number.isInteger(analysis.samples) || analysis.samples < 2)) {
		throw new TypeError(`[Chart] ${path}.samples must be an integer greater than or equal to 2.`);
	}
	if (
		analysis.interval !== undefined &&
		analysis.interval.type !== 'confidence' &&
		analysis.interval.type !== 'prediction'
	) {
		throw new TypeError(
			`[Chart] ${path}.interval.type "${String(analysis.interval.type)}" is not supported.`
		);
	}
	if (
		analysis.interval?.level !== undefined &&
		analysis.interval.level !== 0.9 &&
		analysis.interval.level !== 0.95 &&
		analysis.interval.level !== 0.99
	) {
		throw new TypeError(`[Chart] ${path}.interval.level must be 0.9, 0.95, or 0.99.`);
	}
}

type LinearFit = {
	readonly count: number;
	readonly meanX: number;
	readonly sumSquaredX: number;
	readonly minimumX: number;
	readonly maximumX: number;
	readonly intercept: number;
	readonly slope: number;
	readonly residualStandardError?: number;
};

function linearRegression(
	observations: readonly { x: number; y: number }[],
	analysis: ChartRegressionAnalysis,
	path: string
): LinearFit {
	const count = observations.length;
	const meanX = observations.reduce((total, observation) => total + observation.x, 0) / count;
	const meanY = observations.reduce((total, observation) => total + observation.y, 0) / count;
	let sumSquaredX = 0;
	let sumCrossProducts = 0;
	let minimumX = Number.POSITIVE_INFINITY;
	let maximumX = Number.NEGATIVE_INFINITY;
	for (const observation of observations) {
		const centeredX = observation.x - meanX;
		sumSquaredX += centeredX * centeredX;
		sumCrossProducts += centeredX * (observation.y - meanY);
		minimumX = Math.min(minimumX, observation.x);
		maximumX = Math.max(maximumX, observation.x);
	}
	if (sumSquaredX === 0) {
		throw new TypeError(`[Chart] ${path} requires at least two distinct x values.`);
	}
	const slope = sumCrossProducts / sumSquaredX;
	const intercept = meanY - slope * meanX;
	let residualStandardError: number | undefined;
	if (analysis.interval) {
		if (count < 3) {
			throw new TypeError(`[Chart] ${path}.interval requires at least three observations per scope.`);
		}
		const residualSumSquares = observations.reduce((total, observation) => {
			const residual = observation.y - (intercept + slope * observation.x);
			return total + residual * residual;
		}, 0);
		residualStandardError = Math.sqrt(residualSumSquares / (count - 2));
	}
	return {
		count,
		meanX,
		sumSquaredX,
		minimumX,
		maximumX,
		intercept,
		slope,
		residualStandardError
	};
}

function regressionSpread(
	fit: LinearFit,
	x: number,
	analysis: ChartRegressionAnalysis
): number | undefined {
	if (!analysis.interval || fit.residualStandardError === undefined) return undefined;
	const level = analysis.interval.level ?? 0.95;
	const prediction = analysis.interval.type === 'prediction' ? 1 : 0;
	const leverage = 1 / fit.count + (x - fit.meanX) ** 2 / fit.sumSquaredX;
	return CRITICAL_VALUES[level] * fit.residualStandardError * Math.sqrt(prediction + leverage);
}
