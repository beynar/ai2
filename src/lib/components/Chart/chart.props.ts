import type { WithAttachments } from '$lib/types/props.js';
import type { ChartThemeProps } from './chart.theme.js';
import type {
	ChartColor,
	ChartInitialDimensions,
	ChartMargin,
	ChartPositionDefinition,
	ChartValue
} from './chart.core.js';
import type { ChartFrameDefinition } from './chart.geometry.props.js';
import type { ChartMark } from './chart.mark.props.js';
import type { ChartViewport } from './chart.viewport.props.js';

export type * from './chart.annotation.props.js';
export type * from './chart.analysis.props.js';
export type * from './chart.core.js';
export type * from './chart.geometry.props.js';
export type * from './chart.mark.props.js';
export type * from './chart.polar.props.js';
export type * from './chart.relation.props.js';
export type * from './chart.scatter.props.js';
export type * from './chart.series.props.js';
export type * from './chart.statistical.props.js';
export type * from './chart.viewport.props.js';

type ChartScalarField<TRow> = {
	[TKey in Extract<keyof TRow, string>]-?: NonNullable<TRow[TKey]> extends ChartValue
		? TKey
		: never;
}[Extract<keyof TRow, string>];

export type ChartTooltipField<TRow> = {
	[TKey in ChartScalarField<TRow>]: {
		field: TKey;
		label?: string;
		format?: (value: TRow[TKey], row: TRow) => string;
	};
}[ChartScalarField<TRow>];

export type ChartTooltipPlacement =
	| 'auto'
	| 'top'
	| 'top-right'
	| 'right'
	| 'bottom-right'
	| 'bottom'
	| 'bottom-left'
	| 'left'
	| 'top-left';

export type ChartTooltipDefinition<TRow> = {
	fields?: readonly [ChartTooltipField<TRow>, ...ChartTooltipField<TRow>[]];
	groupBy?: 'x' | 'y' | false;
	placement?: ChartTooltipPlacement;
	offset?: number;
};

export type ChartProps<TRow extends object> = WithAttachments<{
	data: readonly TRow[];
	marks: readonly [ChartMark<TRow>, ...ChartMark<TRow>[]];
	x?: ChartPositionDefinition;
	y?: ChartPositionDefinition;
	guides?: boolean;
	clip?: boolean;
	frame?: boolean | ChartFrameDefinition;
	margin?: number | Partial<ChartMargin>;
	palette?: readonly [ChartColor, ...ChartColor[]];
	tooltip?: boolean | ChartTooltipDefinition<TRow>;
	viewport?: ChartViewport;
	ariaLabel: string;
	ariaDescription?: string;
	initialDimensions?: ChartInitialDimensions;
	ref?: HTMLElement | null;
	class?: string;
	theme?: ChartThemeProps;
}>;
