import { describe, expect, expectTypeOf, it } from 'vitest';
import type {
	ChartGeoFeature,
	ChartLineMark,
	ChartMark,
	ChartProps,
	ChartTooltipField
} from './chart.props.js';

type ChartConfiguration<TRow extends object> = Pick<
	ChartProps<TRow>,
	'marks' | 'x' | 'y' | 'guides' | 'clip' | 'margin' | 'palette' | 'tooltip'
>;

type Revenue = {
	month: Date;
	actual: number;
	forecast: number | null;
	series: string;
	metadata: { source: string };
};

const definition = {
	x: { scale: { type: 'utc' }, axis: { label: 'Month' } },
	y: { scale: { type: 'linear' }, grid: true },
	marks: [
		{
			type: 'area',
			direction: 'vertical',
			x: 'month',
			y: 'forecast',
			series: 'series',
			fill: 'primary'
		},
		{ type: 'line', x: 'month', y: 'actual', stroke: 'primary' },
		{ type: 'point', shape: 'circle', x: 'month', y: 'actual', fill: 'primary' }
	],
	tooltip: {
		groupBy: 'x',
		fields: [
			{
				field: 'actual',
				format: (value, row) => `${row.series}: ${value.toFixed(2)}`
			}
		]
	}
} satisfies ChartConfiguration<Revenue>;

const invalidTooltipField = {
	// @ts-expect-error Object fields are not valid tooltip scalar fields.
	field: 'metadata'
} satisfies ChartTooltipField<Revenue>;

const invalidNullableKey = {
	type: 'line',
	x: 'month',
	y: 'actual',
	// @ts-expect-error Stable keys cannot use a nullable channel.
	key: 'forecast'
} satisfies ChartLineMark<Revenue>;

const invalidCategoricalNice = {
	x: {
		// @ts-expect-error Band and point scales cannot be nicened.
		scale: { type: 'band' },
		nice: true
	},
	y: { scale: { type: 'linear' } },
	marks: [{ type: 'line', x: 'series', y: 'actual' }]
} satisfies ChartConfiguration<Revenue>;

const invalidGroupedBar = {
	x: { scale: { type: 'band' } },
	y: { scale: { type: 'linear' } },
	marks: [
		// @ts-expect-error Grouped bars require a non-null series or color channel.
		{
			type: 'bar',
			direction: 'vertical',
			x: 'series',
			y: 'actual',
			layout: { type: 'group' }
		}
	]
} satisfies ChartConfiguration<Revenue>;

const invalidStackedEndpoints = {
	x: { scale: { type: 'band' } },
	y: { scale: { type: 'linear' } },
	marks: [
		{
			type: 'bar',
			direction: 'vertical',
			x: 'series',
			y1: 0,
			y2: 'actual',
			// @ts-expect-error Explicit endpoints and stacking are mutually exclusive.
			layout: { type: 'stack' }
		}
	]
} satisfies ChartConfiguration<Revenue>;

const compactPolar = {
	marks: [
		{
			type: 'polar',
			angle: 'series',
			radius: 'actual',
			domain: [0, 100],
			area: true,
			line: true,
			points: true,
			color: 'secondary'
		}
	]
} satisfies ChartConfiguration<Revenue>;

void invalidTooltipField;
void invalidNullableKey;
void invalidCategoricalNice;
void invalidGroupedBar;
void invalidStackedEndpoints;
void compactPolar;

describe('Chart public type contract', () => {
	it('accepts Svelai-native layered definitions', () => {
		expect(definition.marks.map((mark) => mark.type)).toEqual(['area', 'line', 'point']);
	});

	it('keeps scalar tooltip formatters field-aware', () => {
		expectTypeOf<ChartTooltipField<Revenue>>().not.toEqualTypeOf<{
			field: 'metadata';
		}>();
	});

	it('contains every public mark discriminant', () => {
		type Discriminant = ChartMark<ChartGeoFeature>['type'];
		expectTypeOf<Discriminant>().toEqualTypeOf<
			| 'line'
			| 'area'
			| 'bar'
			| 'band'
			| 'rect'
			| 'cell'
			| 'point'
			| 'rule'
			| 'link'
			| 'arrow'
			| 'vector'
			| 'tick'
			| 'text'
			| 'frame'
			| 'facet'
			| 'polar'
			| 'geo-shape'
		>();
	});

	it('accepts structural GeoJSON without external types', () => {
		const feature = {
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [2.35, 48.85] },
			properties: { city: 'Paris' }
		} satisfies ChartGeoFeature;

		expect(feature.properties.city).toBe('Paris');
	});

	it('accepts standard mutable GeoJSON positions and nullable properties', () => {
		type StandardFeature = {
			type: 'Feature';
			bbox?: number[];
			geometry: { type: 'Point'; coordinates: number[] };
			properties: null;
		};
		const feature: StandardFeature = {
			type: 'Feature',
			bbox: [2.3, 48.8, 2.4, 48.9],
			geometry: { type: 'Point', coordinates: [2.35, 48.85] },
			properties: null
		};
		const geoDefinition = {
			marks: [{ type: 'geo-shape', projection: { type: 'mercator' } }]
		} satisfies ChartConfiguration<StandardFeature>;

		expect(geoDefinition.marks[0].type).toBe('geo-shape');
		expect(feature.geometry.coordinates).toEqual([2.35, 48.85]);
	});
});
