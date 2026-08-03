import type { ChartDataMarkProps } from './chart.annotation.props.js';
import type {
	ChartChannel,
	ChartColor,
	ChartCurve,
	ChartNumericScaleDefinition,
	ChartScaleDefinition,
	ChartValue
} from './chart.core.js';
import type {
	ChartBasicStrokeStyle,
	ChartFillStyle,
	ChartSeriesChannels,
	ChartStrokeStyle
} from './chart.series.props.js';

export type ChartPolarVariant = 'circular' | 'radar' | 'radial-bar' | 'rose';

type ChartPolarBase<TRow> = ChartDataMarkProps<TRow> &
	ChartSeriesChannels<TRow> & {
		type: 'polar';
		angle: ChartChannel<TRow, ChartValue>;
		radius: ChartChannel<TRow, number>;
		angleScale?: ChartScaleDefinition;
		radiusScale?: ChartNumericScaleDefinition;
		domain?: readonly [minimum: number, maximum: number];
		guides?: boolean;
		color?: ChartColor;
		startAngle?: number;
		endAngle?: number;
		inset?: number;
		radiusRatio?: number;
	};

type ChartPolarPathMark<TRow> = ChartPolarBase<TRow> &
	ChartFillStyle<TRow> &
	ChartStrokeStyle<TRow> & {
		variant: 'circular' | 'radar';
		area?: boolean;
		line?: boolean;
		points?: boolean;
		curve?: ChartCurve;
		pointRadius?: number;
	};

type ChartPolarBarMark<TRow> = ChartPolarBase<TRow> &
	ChartFillStyle<TRow> &
	ChartBasicStrokeStyle<TRow> & {
		variant: 'radial-bar' | 'rose';
		innerRadius?: number;
		padAngle?: number;
		cornerRadius?: number;
	};

export type ChartPolarMark<TRow> = ChartPolarPathMark<TRow> | ChartPolarBarMark<TRow>;
