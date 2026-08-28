import { lineY } from '@tanstack/charts';
import { mean, median } from 'd3-array';
import {
	groupAnalysisRows,
	readChartValue,
	readFiniteNumber,
	resolveAnalysisPaint,
	type AnalysisGroupAccessor
} from './chart.analysis.data.js';
import { compileChannel } from './chart.channels.js';
import type { CompiledMark } from './chart.cartesian.js';
import { withoutTooltipPoints } from './chart.mark.js';
import type {
	ChartChannel,
	ChartKey,
	ChartRollingAnalysis,
	ChartValue
} from './chart.props.js';

type RollingDatum = {
	readonly identity: string;
	readonly group: ChartKey | null;
	readonly x: ChartValue;
	readonly y: number;
};

type CompileRollingAnalysisInput<TRow extends object> = {
	readonly data: readonly TRow[];
	readonly analysis: ChartRollingAnalysis;
	readonly x: ChartChannel<TRow, ChartValue>;
	readonly y: ChartChannel<TRow, number>;
	readonly group?: AnalysisGroupAccessor<TRow>;
	readonly path: string;
	readonly id: string;
};

export function compileRollingAnalysis<TRow extends object>({
	data,
	analysis,
	x,
	y,
	group,
	path,
	id
}: CompileRollingAnalysisInput<TRow>): readonly CompiledMark[] {
	if (analysis.statistic !== 'mean' && analysis.statistic !== 'median') {
		throw new TypeError(
			`[Chart] ${path}.statistic "${String(analysis.statistic)}" is not supported.`
		);
	}
	if (!Number.isInteger(analysis.window) || analysis.window < 2) {
		throw new TypeError(`[Chart] ${path}.window must be an integer greater than or equal to 2.`);
	}
	const xAccessor = compileChannel(x);
	const yAccessor = compileChannel(y);
	const groupedRows = groupAnalysisRows(data, group, analysis.scope, path);
	const rows = groupedRows.groups.flatMap((sourceGroup) => {
		const observations = sourceGroup.rows.flatMap(({ row, index }) => {
			const xValue = readChartValue(xAccessor(row, index, data), `${path}.x`);
			const yValue = readFiniteNumber(yAccessor(row, index, data), `${path}.y`);
			return xValue !== undefined && yValue !== undefined ? [{ x: xValue, y: yValue }] : [];
		});
		return observations.flatMap((observation, index) => {
			if (index + 1 < analysis.window) return [];
			const values = observations
				.slice(index + 1 - analysis.window, index + 1)
				.map((candidate) => candidate.y);
			const yValue = analysis.statistic === 'mean' ? mean(values) : median(values);
			if (yValue === undefined) return [];
			return [
				{
					identity: `${sourceGroup.identity}:${index}`,
					group: sourceGroup.key,
					x: observation.x,
					y: yValue
				} satisfies RollingDatum
			];
		});
	});
	if (rows.length === 0) return [];
	const paint = resolveAnalysisPaint(analysis, groupedRows.isGrouped, 'secondary');
	return [
		withoutTooltipPoints(
			lineY(rows, {
				id,
				x: 'x',
				y: 'y',
				z: paint.groupChannel,
				color: paint.colorChannel,
				key: 'identity',
				stroke: paint.paint,
				strokeOpacity: analysis.strokeOpacity ?? 0.92,
				strokeWidth: analysis.strokeWidth ?? 2,
				strokeDasharray: analysis.strokeDasharray ?? '4 3'
			})
		)
	];
}
