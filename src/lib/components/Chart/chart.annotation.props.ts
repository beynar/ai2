import type { ChartColor, ChartKey, ChartRequiredChannel, ChartVisual } from './chart.core.js';

export type ChartAnnotationTarget<TRow> =
	| { key: ChartKey; series?: ChartKey; where?: never }
	| {
			where: (row: TRow, index: number, rows: readonly TRow[]) => boolean;
			key?: never;
			series?: never;
	  };

type ChartAnnotationBase<TRow> = {
	id?: string;
	target: ChartAnnotationTarget<TRow>;
	placement?: 'under' | 'over';
	color?: ChartColor;
	opacity?: number;
};

export type ChartArrowAnnotation<TRow> = ChartAnnotationBase<TRow> & {
	type: 'arrow';
	offset?: Readonly<{ x: number; y: number }>;
	label?: ChartVisual<TRow, string | number>;
	strokeWidth?: number;
	headLength?: number;
};

export type ChartLabelAnnotation<TRow> = ChartAnnotationBase<TRow> & {
	type: 'label';
	text: ChartVisual<TRow, string | number>;
	offset?: Readonly<{ x: number; y: number }>;
	anchor?: 'start' | 'middle' | 'end';
	fontSize?: number;
	fontWeight?: number;
};

export type ChartRuleAnnotation<TRow> = ChartAnnotationBase<TRow> & {
	type: 'rule';
	axis: 'x' | 'y';
	strokeWidth?: number;
	strokeDasharray?: string;
};

export type ChartBandAnnotation<TRow> = ChartAnnotationBase<TRow> & {
	type: 'band';
	axis: 'x' | 'y';
	size?: number;
	inset?: number;
	radius?: number;
	fillOpacity?: number;
};

export type ChartMarkerAnnotation<TRow> = ChartAnnotationBase<TRow> & {
	type: 'marker';
	radius?: number;
	fill?: ChartColor;
	stroke?: ChartColor;
	strokeWidth?: number;
};

export type ChartAnnotation<TRow> =
	| ChartArrowAnnotation<TRow>
	| ChartLabelAnnotation<TRow>
	| ChartRuleAnnotation<TRow>
	| ChartBandAnnotation<TRow>
	| ChartMarkerAnnotation<TRow>;

export type ChartDataMarkProps<TRow> = {
	id?: string;
	key?: ChartRequiredChannel<TRow, ChartKey>;
	annotations?: readonly ChartAnnotation<TRow>[];
};
