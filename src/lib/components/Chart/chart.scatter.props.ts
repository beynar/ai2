import type { ChartDataMarkProps } from './chart.annotation.props.js';
import type { ChartScatterAnalysis } from './chart.analysis.props.js';
import type { ChartChannel, ChartColor, ChartValue } from './chart.core.js';
import type {
	ChartBasicStrokeStyle,
	ChartFillStyle,
	ChartPointShape,
	ChartSeriesChannels
} from './chart.series.props.js';

export type ChartScatterSizeScaleShortcut = 'linear' | 'sqrt' | 'log' | 'exp';

type ChartScatterSizeScaleBase = {
	domain?: readonly [minimum: number, maximum: number];
	range?: readonly [minimumRadius: number, maximumRadius: number];
};

export type ChartScatterSizeScale =
	| ChartScatterSizeScaleShortcut
	| (ChartScatterSizeScaleBase & { type: 'linear' | 'sqrt' })
	| (ChartScatterSizeScaleBase & { type: 'log' | 'exp'; base?: number });

type ChartScatterSize<TRow> =
	| {
			size?: number;
			sizeScale?: never;
	  }
	| {
			size: ChartChannel<TRow, number>;
			sizeScale?: ChartScatterSizeScale;
	  };

type ChartPointScatterMark<TRow> = ChartDataMarkProps<TRow> &
	ChartSeriesChannels<TRow> &
	ChartFillStyle<TRow> &
	ChartBasicStrokeStyle<TRow> & {
		type: 'scatter';
		variant?: 'points';
		x: ChartChannel<TRow, ChartValue>;
		y: ChartChannel<TRow, ChartValue>;
		shape?: ChartPointShape;
		opacity?: number;
		analysis?: readonly [ChartScatterAnalysis, ...ChartScatterAnalysis[]];
	} & ChartScatterSize<TRow>;

type ChartHexbinScatterMark<TRow> = ChartDataMarkProps<TRow> & {
	type: 'scatter';
	variant: 'hexbin';
	x: ChartChannel<TRow, number>;
	y: ChartChannel<TRow, number>;
	radius?: number;
	color?: ChartColor;
	analysis?: readonly [ChartScatterAnalysis, ...ChartScatterAnalysis[]];
};

export type ChartScatterMark<TRow> = ChartPointScatterMark<TRow> | ChartHexbinScatterMark<TRow>;
