import type { WithAttachments } from '$lib/types/props.js';
import type { Colors } from '$lib/types/theme.js';
import type { ChartThemeProps } from './chart.theme.js';

export type ChartValue = number | string | Date;
export type ChartKey = string | number;
export type ChartColor = Colors | (string & {});

type ChartField<TRow, TValue> = {
	[TKey in Extract<keyof TRow, string>]-?: TRow[TKey] extends TValue | null | undefined
		? TKey
		: never;
}[Extract<keyof TRow, string>];

type ChartRequiredField<TRow, TValue> = {
	[TKey in Extract<keyof TRow, string>]-?: TRow[TKey] extends TValue ? TKey : never;
}[Extract<keyof TRow, string>];

export type ChartChannel<TRow, TValue> =
	| ChartField<TRow, TValue>
	| ((row: TRow, index: number, rows: readonly TRow[]) => TValue | null | undefined);

type ChartRequiredChannel<TRow, TValue> =
	ChartRequiredField<TRow, TValue> | ((row: TRow, index: number, rows: readonly TRow[]) => TValue);

export type ChartVisual<TRow, TValue> =
	TValue | ((row: TRow, index: number, rows: readonly TRow[]) => TValue);

export type ChartInitialDimensions = Readonly<{
	width: number;
	height: number;
}>;

export type ChartMargin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

type ChartContinuousScaleBase<TValue> = {
	domain?: readonly [TValue, TValue];
	clamp?: boolean;
};

export type ChartLinearScale = ChartContinuousScaleBase<number> & { type: 'linear' };
export type ChartSqrtScale = ChartContinuousScaleBase<number> & { type: 'sqrt' };
export type ChartPowerScale = ChartContinuousScaleBase<number> & {
	type: 'pow';
	exponent?: number;
};
export type ChartLogScale = ChartContinuousScaleBase<number> & {
	type: 'log';
	base?: number;
};
export type ChartSymlogScale = ChartContinuousScaleBase<number> & {
	type: 'symlog';
	constant?: number;
};
export type ChartTimeScale = ChartContinuousScaleBase<Date> & { type: 'time' };
export type ChartUtcScale = ChartContinuousScaleBase<Date> & { type: 'utc' };
export type ChartBandScale = {
	type: 'band';
	domain?: readonly ChartValue[];
	padding?: number;
	paddingInner?: number;
	paddingOuter?: number;
	align?: number;
};
export type ChartPointScale = {
	type: 'point';
	domain?: readonly ChartValue[];
	padding?: number;
	align?: number;
};

export type ChartScaleDefinition =
	| ChartLinearScale
	| ChartSqrtScale
	| ChartPowerScale
	| ChartLogScale
	| ChartSymlogScale
	| ChartTimeScale
	| ChartUtcScale
	| ChartBandScale
	| ChartPointScale;

export type ChartNumericScaleDefinition =
	ChartLinearScale | ChartSqrtScale | ChartPowerScale | ChartLogScale | ChartSymlogScale;

export type ChartAxisTicks = {
	count?: number;
	spacing?: number;
	values?: readonly ChartValue[];
	size?: number;
	padding?: number;
	format?: (value: ChartValue) => string;
};

export type ChartAxisTickLabels = {
	rotate?: number;
	thin?:
		| boolean
		| {
				minGap?: number;
				priority?: 'ends';
				keep?: readonly ChartValue[];
		  };
};

export type ChartAxisDefinition = {
	line?: boolean;
	ticks?: false | ChartAxisTicks;
	tickLabels?: false | ChartAxisTickLabels;
	label?: string | { text: string; offset?: number | 'auto' };
};

type ChartPositionBase = {
	reverse?: boolean;
	grid?: boolean;
	axis?: false | ChartAxisDefinition;
};

export type ChartPositionDefinition = ChartPositionBase &
	(
		| {
				scale: Exclude<ChartScaleDefinition, ChartBandScale | ChartPointScale>;
				nice?: boolean | number;
		  }
		| {
				scale: ChartBandScale | ChartPointScale;
				nice?: never;
		  }
	);

export type ChartCurve =
	| 'linear'
	| 'linear-closed'
	| 'step'
	| 'step-before'
	| 'step-after'
	| 'basis'
	| 'basis-closed'
	| 'cardinal'
	| 'cardinal-closed'
	| 'catmull-rom'
	| 'catmull-rom-closed'
	| 'monotone-x'
	| 'monotone-y'
	| 'natural';

type ChartMarkBase<TRow> = {
	id?: string;
	key?: ChartRequiredChannel<TRow, ChartKey>;
	series?: ChartChannel<TRow, ChartKey>;
	colorBy?: ChartChannel<TRow, ChartKey>;
};

type ChartFillStyle<TRow> = {
	fill?: ChartVisual<TRow, ChartColor>;
	fillOpacity?: number;
};

type ChartStrokeStyle<TRow> = {
	stroke?: ChartVisual<TRow, ChartColor>;
	strokeOpacity?: number;
	strokeWidth?: number;
	strokeDasharray?: string;
};

type ChartBasicStrokeStyle<TRow> = Omit<ChartStrokeStyle<TRow>, 'strokeDasharray'>;

export type ChartLineMark<TRow> = ChartMarkBase<TRow> &
	ChartStrokeStyle<TRow> & {
		type: 'line';
		x: ChartChannel<TRow, ChartValue>;
		y: ChartChannel<TRow, number>;
		curve?: ChartCurve;
		points?: boolean;
	};

export type ChartStackLayout = {
	type: 'stack';
	order?: 'input' | 'ascending' | 'descending' | readonly ChartKey[];
	offset?: 'diverging' | 'normalize' | 'center' | 'wiggle';
	reverse?: boolean;
};

export type ChartGroupLayout = {
	type: 'group';
	padding?: number;
};

type ChartVerticalInterval<TRow, TLayout> =
	| {
			x: ChartChannel<TRow, ChartValue>;
			y: ChartChannel<TRow, number>;
			baseline?: number | ChartChannel<TRow, number>;
			y1?: never;
			y2?: never;
			layout?: never;
	  }
	| {
			x: ChartChannel<TRow, ChartValue>;
			y: ChartChannel<TRow, number>;
			baseline?: never;
			y1?: never;
			y2?: never;
			layout: TLayout;
	  }
	| {
			x: ChartChannel<TRow, ChartValue>;
			y?: never;
			baseline?: never;
			y1: number | ChartChannel<TRow, number>;
			y2: number | ChartChannel<TRow, number>;
			layout?: never;
	  };

type ChartHorizontalInterval<TRow, TLayout> =
	| {
			y: ChartChannel<TRow, ChartValue>;
			x: ChartChannel<TRow, number>;
			baseline?: number | ChartChannel<TRow, number>;
			x1?: never;
			x2?: never;
			layout?: never;
	  }
	| {
			y: ChartChannel<TRow, ChartValue>;
			x: ChartChannel<TRow, number>;
			baseline?: never;
			x1?: never;
			x2?: never;
			layout: TLayout;
	  }
	| {
			y: ChartChannel<TRow, ChartValue>;
			x?: never;
			baseline?: never;
			x1: number | ChartChannel<TRow, number>;
			x2: number | ChartChannel<TRow, number>;
			layout?: never;
	  };

type ChartGroupedChannels<TRow> =
	| {
			series: ChartRequiredChannel<TRow, ChartKey>;
			colorBy?: ChartChannel<TRow, ChartKey>;
	  }
	| {
			series?: never;
			colorBy: ChartRequiredChannel<TRow, ChartKey>;
	  };

type ChartVerticalGroupedInterval<TRow> = ChartGroupedChannels<TRow> & {
	x: ChartChannel<TRow, ChartValue>;
	y: ChartChannel<TRow, number>;
	baseline?: never;
	y1?: never;
	y2?: never;
	layout: ChartGroupLayout;
};

type ChartHorizontalGroupedInterval<TRow> = ChartGroupedChannels<TRow> & {
	y: ChartChannel<TRow, ChartValue>;
	x: ChartChannel<TRow, number>;
	baseline?: never;
	x1?: never;
	x2?: never;
	layout: ChartGroupLayout;
};

export type ChartAreaMark<TRow> = ChartMarkBase<TRow> &
	ChartFillStyle<TRow> & {
		stroke?: ChartVisual<TRow, ChartColor>;
		strokeWidth?: number;
	} & (
		| ({ type: 'area'; direction: 'vertical'; curve?: ChartCurve } & ChartVerticalInterval<
				TRow,
				ChartStackLayout
		  >)
		| ({ type: 'area'; direction: 'horizontal'; curve?: ChartCurve } & ChartHorizontalInterval<
				TRow,
				ChartStackLayout
		  >)
	);

export type ChartBarMark<TRow> = ChartMarkBase<TRow> &
	ChartFillStyle<TRow> &
	(
		| ({
				type: 'bar';
				direction: 'vertical';
				inset?: number;
				radius?: number;
		  } & (ChartVerticalInterval<TRow, ChartStackLayout> | ChartVerticalGroupedInterval<TRow>))
		| ({
				type: 'bar';
				direction: 'horizontal';
				inset?: number;
				radius?: number;
		  } & (ChartHorizontalInterval<TRow, ChartStackLayout> | ChartHorizontalGroupedInterval<TRow>))
	);

export type ChartBandMark<TRow> = ChartMarkBase<TRow> &
	ChartFillStyle<TRow> & {
		type: 'band';
		inset?: number;
		radius?: number;
	} & (
		| { axis: 'x'; value: ChartChannel<TRow, ChartValue> }
		| {
				axis: 'y';
				value: ChartChannel<TRow, ChartValue>;
		  }
	);

export type ChartRectMark<TRow> = ChartMarkBase<TRow> & {
	type: 'rect';
	fill?: ChartColor;
	fillOpacity?: number;
	stroke?: ChartColor;
	strokeWidth?: number;
	inset?: number;
	radius?: number;
} & (
		| {
				x: ChartChannel<TRow, ChartValue>;
				y: ChartChannel<TRow, ChartValue>;
				x1?: never;
				x2?: never;
				y1?: never;
				y2?: never;
		  }
		| {
				x?: never;
				y?: never;
				x1: ChartChannel<TRow, ChartValue>;
				x2: ChartChannel<TRow, ChartValue>;
				y1: ChartChannel<TRow, ChartValue>;
				y2: ChartChannel<TRow, ChartValue>;
		  }
	);

export type ChartCellMark<TRow> = ChartMarkBase<TRow> & {
	type: 'cell';
	x: ChartChannel<TRow, ChartValue>;
	y: ChartChannel<TRow, ChartValue>;
	fill?: ChartColor;
	fillOpacity?: number;
	stroke?: ChartColor;
	strokeWidth?: number;
	inset?: number;
	radius?: number;
};

type ChartPointMarkBase<TRow> = ChartMarkBase<TRow> & {
	type: 'point';
	x: ChartChannel<TRow, ChartValue>;
	y: ChartChannel<TRow, ChartValue>;
	radius?: number | ChartChannel<TRow, number>;
	fillOpacity?: number;
	strokeOpacity?: number;
	strokeWidth?: number;
};

export type ChartPointMark<TRow> = ChartPointMarkBase<TRow> &
	(
		| { shape: 'circle'; fill?: ChartColor; stroke?: ChartColor }
		| {
				shape: 'hexagon';
				fill?: ChartVisual<TRow, ChartColor>;
				stroke?: ChartVisual<TRow, ChartColor>;
		  }
	);

export type ChartRuleMark<TRow> = Pick<ChartMarkBase<TRow>, 'id' | 'colorBy'> &
	ChartStrokeStyle<TRow> & {
		type: 'rule';
	} & (
		| { axis: 'x'; value: ChartChannel<TRow, ChartValue> }
		| {
				axis: 'y';
				value: ChartChannel<TRow, ChartValue>;
		  }
	);

type ChartEndpoints<TRow> = {
	x1: ChartChannel<TRow, ChartValue>;
	y1: ChartChannel<TRow, ChartValue>;
	x2: ChartChannel<TRow, ChartValue>;
	y2: ChartChannel<TRow, ChartValue>;
};

export type ChartLinkMark<TRow> = ChartMarkBase<TRow> &
	ChartStrokeStyle<TRow> &
	ChartEndpoints<TRow> & {
		type: 'link';
		curve?: ChartCurve;
		lineCap?: 'butt' | 'round' | 'square';
	};

export type ChartArrowMark<TRow> = ChartMarkBase<TRow> &
	ChartBasicStrokeStyle<TRow> &
	ChartEndpoints<TRow> & {
		type: 'arrow';
		headLength?: number;
		headAngle?: number;
	};

export type ChartVectorMark<TRow> = ChartMarkBase<TRow> &
	ChartBasicStrokeStyle<TRow> & {
		type: 'vector';
		x: ChartChannel<TRow, ChartValue>;
		y: ChartChannel<TRow, ChartValue>;
		length?: number | ChartChannel<TRow, number>;
		rotate?: number | ChartChannel<TRow, number>;
		anchor?: 'start' | 'middle' | 'end';
		headLength?: number;
		headAngle?: number;
	};

export type ChartTickMark<TRow> = ChartMarkBase<TRow> &
	ChartBasicStrokeStyle<TRow> & {
		type: 'tick';
		axis: 'x' | 'y';
		x: ChartChannel<TRow, ChartValue>;
		y: ChartChannel<TRow, ChartValue>;
		length?: number;
		inset?: number;
	};

export type ChartTextMark<TRow> = ChartMarkBase<TRow> & {
	type: 'text';
	x: ChartChannel<TRow, ChartValue>;
	y: ChartChannel<TRow, ChartValue>;
	text: ChartChannel<TRow, string | number>;
	fill?: ChartVisual<TRow, ChartColor>;
	fontSize?: number;
	fontWeight?: number;
	anchor?: ChartVisual<TRow, 'start' | 'middle' | 'end'>;
	rotate?: ChartVisual<TRow, number>;
	dx?: ChartVisual<TRow, number>;
	dy?: ChartVisual<TRow, number>;
};

export type ChartFrameMark = {
	type: 'frame';
	id?: string;
	fill?: ChartColor;
	fillOpacity?: number;
	stroke?: ChartColor;
	strokeOpacity?: number;
	strokeWidth?: number;
	inset?: number;
	radius?: number;
};

export type ChartFacetMark<TRow extends object> = {
	type: 'facet';
	id?: string;
	by: ChartRequiredChannel<TRow, ChartKey>;
	definition: ChartFacetDefinition<TRow>;
	columns?: number;
	minWidth?: number;
	gap?: number;
	label?: boolean | ((key: ChartKey) => string);
	axes?: 'outer' | 'cell';
};

type ChartPolarMarkBase<TRow> = ChartMarkBase<TRow>;

export type ChartPolarArcMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartFillStyle<TRow> &
	ChartStrokeStyle<TRow> & {
		type: 'arc';
		startAngle: ChartChannel<TRow, number>;
		endAngle: ChartChannel<TRow, number>;
		padAngle?: ChartChannel<TRow, number>;
		innerRadius?: number;
		outerRadius?: number;
		cornerRadius?: number;
		opacity?: number;
	};

type ChartPolarPath<TRow> = {
	angle: number | ChartChannel<TRow, ChartValue>;
	radius: number | ChartChannel<TRow, number>;
};

export type ChartPolarLineMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartStrokeStyle<TRow> &
	ChartPolarPath<TRow> & {
		type: 'line';
		curve?: ChartCurve;
		points?: boolean;
		opacity?: number;
	};

export type ChartPolarAreaMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartFillStyle<TRow> &
	ChartStrokeStyle<TRow> &
	ChartPolarPath<TRow> & {
		type: 'area';
		radius1?: number | ChartChannel<TRow, number>;
		curve?: ChartCurve;
		opacity?: number;
	};

export type ChartPolarPointMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartFillStyle<TRow> &
	ChartPolarPath<TRow> & {
		type: 'point';
		shape?: 'circle';
		radiusSize?: number | ChartChannel<TRow, number>;
		stroke?: ChartColor;
		strokeOpacity?: number;
		strokeWidth?: number;
		opacity?: number;
	};

export type ChartPolarTextMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartPolarPath<TRow> & {
		type: 'text';
		text: ChartChannel<TRow, string | number>;
		fill?: ChartVisual<TRow, ChartColor>;
		fontSize?: number;
		fontWeight?: number;
		anchor?: ChartVisual<TRow, 'start' | 'middle' | 'end'>;
		baseline?: ChartVisual<TRow, 'auto' | 'middle' | 'hanging'>;
		rotate?: ChartVisual<TRow, number>;
		dx?: ChartVisual<TRow, number>;
		dy?: ChartVisual<TRow, number>;
	};

export type ChartPolarRuleMark<TRow> = ChartPolarMarkBase<TRow> &
	ChartStrokeStyle<TRow> & {
		type: 'rule';
		angle: number | ChartChannel<TRow, ChartValue>;
		radius1?: number | ChartChannel<TRow, number>;
		radius2?: number | ChartChannel<TRow, number>;
		opacity?: number;
	};

export type ChartPolarChildMark<TRow> =
	| ChartPolarArcMark<TRow>
	| ChartPolarLineMark<TRow>
	| ChartPolarAreaMark<TRow>
	| ChartPolarPointMark<TRow>
	| ChartPolarTextMark<TRow>
	| ChartPolarRuleMark<TRow>;

type ChartPolarScale =
	| {
			scale: Exclude<ChartScaleDefinition, ChartBandScale | ChartPointScale>;
			nice?: boolean | number;
	  }
	| {
			scale: ChartBandScale | ChartPointScale;
			nice?: never;
	  };

export type ChartPolarGuide =
	| {
			type: 'radial-grid';
			values?: readonly ChartValue[];
			ticks?: number;
			shape?: 'circle' | 'polygon';
			labels?: boolean;
			format?: (value: ChartValue) => string;
			labelAngle?: number;
			labelOffset?: number;
	  }
	| {
			type: 'angle-grid';
			values?: readonly ChartValue[];
			labels?: boolean;
			format?: (value: ChartValue) => string;
			labelOffset?: number;
	  };

type ChartPolarAdvancedMark<TRow> = {
	type: 'polar';
	id?: string;
	marks: readonly [ChartPolarChildMark<TRow>, ...ChartPolarChildMark<TRow>[]];
	guides?: readonly ChartPolarGuide[];
	angle?: ChartPolarScale & { wrap?: boolean };
	radius?: Omit<ChartPolarScale, 'scale'> & { scale: ChartNumericScaleDefinition };
	startAngle?: number;
	endAngle?: number;
	inset?: number;
	radiusRatio?: number;
};

export type ChartPolarRadarMark<TRow> = {
	type: 'polar';
	id?: string;
	angle: ChartChannel<TRow, ChartValue>;
	radius: ChartChannel<TRow, number>;
	domain?: readonly [minimum: number, maximum: number];
	area?: boolean;
	line?: boolean;
	points?: boolean;
	color?: ChartColor;
	curve?: ChartCurve;
	guides?: boolean;
	marks?: never;
	inset?: number;
	radiusRatio?: number;
};

export type ChartPolarMark<TRow> = ChartPolarAdvancedMark<TRow> | ChartPolarRadarMark<TRow>;

export type ChartGeoPosition = readonly number[];
type ChartGeoBounds = { bbox?: readonly number[] };

export type ChartGeoGeometry = ChartGeoBounds &
	(
		| { type: 'Point'; coordinates: ChartGeoPosition }
		| { type: 'MultiPoint'; coordinates: readonly ChartGeoPosition[] }
		| { type: 'LineString'; coordinates: readonly ChartGeoPosition[] }
		| { type: 'MultiLineString'; coordinates: readonly (readonly ChartGeoPosition[])[] }
		| { type: 'Polygon'; coordinates: readonly (readonly ChartGeoPosition[])[] }
		| { type: 'MultiPolygon'; coordinates: readonly (readonly (readonly ChartGeoPosition[])[])[] }
		| { type: 'GeometryCollection'; geometries: readonly ChartGeoGeometry[] }
	);

export type ChartGeoFeature<TProperties extends object | null = object | null> = ChartGeoBounds & {
	type: 'Feature';
	geometry: ChartGeoGeometry | null;
	properties: TProperties;
	id?: ChartKey;
};

export type ChartGeoFeatureCollection<TProperties extends object | null = object | null> =
	ChartGeoBounds & {
		type: 'FeatureCollection';
		features: readonly ChartGeoFeature<TProperties>[];
	};

export type ChartGeoObject = ChartGeoGeometry | ChartGeoFeature | ChartGeoFeatureCollection;

export type ChartGeoProjection =
	| 'albers'
	| 'albers-usa'
	| 'azimuthal-equal-area'
	| 'azimuthal-equidistant'
	| 'conic-conformal'
	| 'conic-equal-area'
	| 'conic-equidistant'
	| 'equal-earth'
	| 'equirectangular'
	| 'gnomonic'
	| 'identity'
	| 'mercator'
	| 'natural-earth-1'
	| 'orthographic'
	| 'stereographic'
	| 'transverse-mercator';

export type ChartGeoShapeMark<TRow extends ChartGeoObject> = Pick<
	ChartMarkBase<TRow>,
	'id' | 'key' | 'colorBy'
> &
	ChartFillStyle<TRow> &
	ChartStrokeStyle<TRow> & {
		type: 'geo-shape';
		projection: {
			type: ChartGeoProjection;
			fit?: 'data' | 'sphere';
			inset?: number;
		};
		radius?: number | ChartChannel<TRow, number>;
		opacity?: number;
		anchor?: (
			row: TRow,
			index: number,
			rows: readonly TRow[]
		) => readonly [longitude: number, latitude: number];
	};

type ChartCartesianMark<TRow extends object> =
	| ChartLineMark<TRow>
	| ChartAreaMark<TRow>
	| ChartBarMark<TRow>
	| ChartBandMark<TRow>
	| ChartRectMark<TRow>
	| ChartCellMark<TRow>
	| ChartPointMark<TRow>
	| ChartRuleMark<TRow>
	| ChartLinkMark<TRow>
	| ChartArrowMark<TRow>
	| ChartVectorMark<TRow>
	| ChartTickMark<TRow>
	| ChartTextMark<TRow>
	| ChartFrameMark
	| ChartFacetMark<TRow>
	| ChartPolarMark<TRow>;

export type ChartMark<TRow extends object> =
	ChartCartesianMark<TRow> | (TRow extends ChartGeoObject ? ChartGeoShapeMark<TRow> : never);

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
	sticky?: boolean;
};

export type ChartFacetDefinition<TRow extends object> = {
	marks: readonly [ChartMark<TRow>, ...ChartMark<TRow>[]];
	x?: ChartPositionDefinition;
	y?: ChartPositionDefinition;
	guides?: boolean;
	clip?: boolean;
	margin?: number | Partial<ChartMargin>;
	palette?: readonly [ChartColor, ...ChartColor[]];
};

export type ChartProps<TRow extends object> = WithAttachments<{
	data: readonly TRow[];
	marks: readonly [ChartMark<TRow>, ...ChartMark<TRow>[]];
	x?: ChartPositionDefinition;
	y?: ChartPositionDefinition;
	guides?: boolean;
	clip?: boolean;
	margin?: number | Partial<ChartMargin>;
	palette?: readonly [ChartColor, ...ChartColor[]];
	tooltip?: boolean | ChartTooltipDefinition<TRow>;
	ariaLabel: string;
	ariaDescription?: string;
	initialDimensions?: ChartInitialDimensions;
	ref?: HTMLElement | null;
	class?: string;
	theme?: ChartThemeProps;
}>;
