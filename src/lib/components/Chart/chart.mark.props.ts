import type { ChartKey, ChartRequiredChannel } from './chart.core.js';
import type { ChartMatrixMark } from './chart.geometry.props.js';
import type { ChartPolarMark } from './chart.polar.props.js';
import type { ChartRelationMark } from './chart.relation.props.js';
import type { ChartScatterMark } from './chart.scatter.props.js';
import type { ChartBarMark, ChartSeriesMark } from './chart.series.props.js';
import type { ChartDistributionMark, ChartProportionMark } from './chart.statistical.props.js';

export type ChartFacetMark<TRow extends object> = {
	type: 'facet';
	id?: string;
	by: ChartRequiredChannel<TRow, ChartKey>;
	marks: readonly [ChartMark<TRow>, ...ChartMark<TRow>[]];
	columns?: number;
	minWidth?: number;
	gap?: number;
	label?: boolean | ((key: ChartKey) => string);
	axes?: 'outer' | 'cell';
};

export type ChartMark<TRow extends object> =
	| ChartSeriesMark<TRow>
	| ChartScatterMark<TRow>
	| ChartBarMark<TRow>
	| ChartDistributionMark<TRow>
	| ChartProportionMark<TRow>
	| ChartPolarMark<TRow>
	| ChartRelationMark<TRow>
	| ChartMatrixMark<TRow>
	| ChartFacetMark<TRow>;
