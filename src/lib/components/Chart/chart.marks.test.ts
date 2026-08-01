import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { describe, expect, test } from 'vitest';
import Chart from './Chart.svelte';
import type { ChartGeoFeature, ChartProps } from './chart.props.js';

type ChartConfiguration<TRow extends object> = Pick<
	ChartProps<TRow>,
	'marks' | 'x' | 'y' | 'guides' | 'clip' | 'margin' | 'palette' | 'tooltip'
>;

type Row = {
	category: string;
	group: string;
	x: number;
	y: number;
	x2: number;
	y2: number;
	label: string;
	angle: number;
	radius: number;
};

const rows: readonly Row[] = [
	{
		category: 'A',
		group: 'First',
		x: 1,
		y: 3,
		x2: 1.8,
		y2: 4,
		label: 'Alpha',
		angle: 0,
		radius: 3
	},
	{
		category: 'B',
		group: 'First',
		x: 2,
		y: 5,
		x2: 2.8,
		y2: 6,
		label: 'Beta',
		angle: 1,
		radius: 5
	},
	{
		category: 'C',
		group: 'Second',
		x: 3,
		y: 4,
		x2: 3.8,
		y2: 5,
		label: 'Gamma',
		angle: 2,
		radius: 4
	}
];

const xy = {
	x: { scale: { type: 'linear' } },
	y: { scale: { type: 'linear' } }
} as const;

const cartesianCases = [
	['line', { ...xy, marks: [{ type: 'line', x: 'x', y: 'y' }] } satisfies ChartConfiguration<Row>],
	[
		'area',
		{
			...xy,
			marks: [{ type: 'area', direction: 'vertical', x: 'x', y: 'y' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'bar',
		{
			x: { scale: { type: 'band' } },
			y: { scale: { type: 'linear' } },
			marks: [{ type: 'bar', direction: 'vertical', x: 'category', y: 'y' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'band',
		{
			x: { scale: { type: 'linear' } },
			marks: [{ type: 'band', axis: 'x', value: 'x' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'rect',
		{
			...xy,
			marks: [{ type: 'rect', x1: 'x', x2: 'x2', y1: 'y', y2: 'y2' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'cell',
		{
			x: { scale: { type: 'band' } },
			y: { scale: { type: 'band' } },
			marks: [{ type: 'cell', x: 'category', y: 'group' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'point',
		{
			...xy,
			marks: [{ type: 'point', shape: 'circle', x: 'x', y: 'y' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'rule',
		{
			y: { scale: { type: 'linear' } },
			marks: [{ type: 'rule', axis: 'y', value: 'y' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'link',
		{
			...xy,
			marks: [{ type: 'link', x1: 'x', y1: 'y', x2: 'x2', y2: 'y2' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'arrow',
		{
			...xy,
			marks: [{ type: 'arrow', x1: 'x', y1: 'y', x2: 'x2', y2: 'y2' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'vector',
		{
			...xy,
			marks: [{ type: 'vector', x: 'x', y: 'y', length: 'radius' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'tick',
		{
			...xy,
			marks: [{ type: 'tick', axis: 'x', x: 'x', y: 'y' }]
		} satisfies ChartConfiguration<Row>
	],
	[
		'text',
		{
			...xy,
			marks: [{ type: 'text', x: 'x', y: 'y', text: 'label' }]
		} satisfies ChartConfiguration<Row>
	],
	['frame', { marks: [{ type: 'frame', stroke: 'neutral' }] } satisfies ChartConfiguration<Row>],
	[
		'facet',
		{
			marks: [
				{
					type: 'facet',
					by: 'group',
					axes: 'cell',
					definition: {
						...xy,
						marks: [{ type: 'line', x: 'x', y: 'y' }]
					}
				}
			]
		} satisfies ChartConfiguration<Row>
	]
] as const;

const barLayoutCases = [
	[
		'group',
		{
			x: { scale: { type: 'band' } },
			y: { scale: { type: 'linear' } },
			marks: [
				{
					type: 'bar',
					direction: 'vertical',
					x: 'category',
					y: 'y',
					series: 'group',
					layout: { type: 'group' }
				}
			]
		} satisfies ChartConfiguration<Row>
	],
	[
		'stack',
		{
			x: { scale: { type: 'band' } },
			y: { scale: { type: 'linear' } },
			marks: [
				{
					type: 'bar',
					direction: 'vertical',
					x: 'category',
					y: 'y',
					series: 'group',
					layout: { type: 'stack' }
				}
			]
		} satisfies ChartConfiguration<Row>
	]
] as const;

function renderDefinition<TRow extends object>(
	data: readonly TRow[],
	definition: ChartConfiguration<TRow>,
	ariaLabel: string
): string {
	const TypedChart = Chart as Component<ChartProps<TRow>>;
	return render(TypedChart, {
		props: {
			data,
			...definition,
			ariaLabel,
			initialDimensions: { width: 640, height: 360 }
		}
	}).body;
}

function getOuterPolarGridCenter(body: string): readonly [number, number] {
	const polar = body.match(/class="ts-chart__polar"[^>]*transform="translate\(([-\d.]+) ([-\d.]+)\)"/);
	const grid = body.match(/class="ts-chart__radial-grid"[^>]*>(.*?)<\/g>/);
	if (!polar || !grid) throw new Error('Polar chart did not render its translated radial grid.');
	const paths = [...grid[1].matchAll(/<path[^>]*d="([^"]+)"/g)];
	const bounds = paths.map((path) => {
		const coordinates = [...path[1].matchAll(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)].map(Number);
		const xs = coordinates.filter((_coordinate, index) => index % 2 === 0);
		const ys = coordinates.filter((_coordinate, index) => index % 2 === 1);
		return {
			centerX: (Math.min(...xs) + Math.max(...xs)) / 2,
			centerY: (Math.min(...ys) + Math.max(...ys)) / 2,
			span: Math.max(...xs) - Math.min(...xs) + Math.max(...ys) - Math.min(...ys)
		};
	});
	const outer = bounds.sort((left, right) => right.span - left.span)[0];
	if (!outer) throw new Error('Polar chart did not render a polygon grid path.');
	return [Number(polar[1]) + outer.centerX, Number(polar[2]) + outer.centerY];
}

describe('Chart mark rendering', () => {
	test.each(cartesianCases)('renders the %s mark', (name, definition) => {
		const body = renderDefinition(rows, definition, `${name} chart`);
		expect(body).toContain('<svg');
		expect(body).toContain(`aria-label="${name} chart"`);
	});

	test('preserves definition order when marks share one plot', () => {
		const definition = {
			...xy,
			marks: [
				{ type: 'area', direction: 'vertical', x: 'x', y: 'y', fill: 'primary' },
				{ type: 'line', x: 'x', y: 'y', stroke: 'secondary' },
				{ type: 'point', shape: 'circle', x: 'x', y: 'y', fill: 'info' }
			]
		} satisfies ChartConfiguration<Row>;

		const body = renderDefinition(rows, definition, 'Layered marks');
		expect(body.indexOf('ts-chart__area')).toBeLessThan(body.indexOf('ts-chart__line'));
		expect(body.indexOf('ts-chart__line')).toBeLessThan(body.indexOf('ts-chart__dot'));
	});

	test.each(barLayoutCases)('renders the %s bar layout', (layout, definition) => {
		const body = renderDefinition(rows, definition, `${layout} bars`);
		expect(body).toContain('ts-chart__bar');
	});

	test('renders a polar mark and its radial children', () => {
		const definition = {
			marks: [
				{
					type: 'polar',
					angle: { scale: { type: 'linear' } },
					radius: { scale: { type: 'linear' } },
					marks: [
						{
							type: 'arc',
							startAngle: 'angle',
							endAngle: (row) => row.angle + 0.4,
							fill: 'secondary'
						},
						{ type: 'area', angle: 'angle', radius: 'radius', fill: 'primary' },
						{ type: 'line', angle: 'angle', radius: 'radius', stroke: 'primary' },
						{ type: 'point', angle: 'angle', radius: 'radius', fill: 'primary' },
						{ type: 'text', angle: 'angle', radius: 'radius', text: 'label' },
						{ type: 'rule', angle: 'angle', radius2: 'radius' }
					],
					guides: [{ type: 'radial-grid', ticks: 3 }, { type: 'angle-grid' }]
				}
			]
		} satisfies ChartConfiguration<Row>;

		const body = renderDefinition(rows, definition, 'Polar chart');
		expect(body).toContain('ts-chart__polar');
		expect(body).toContain('ts-chart__radial-area');
	});

	test('renders the compact polar radar preset with themed guides', () => {
		const definition = {
			marks: [
				{
					type: 'polar',
					angle: 'category',
					radius: 'y',
					domain: [0, 10],
					area: true,
					line: true,
					points: true,
					color: 'secondary'
				}
			]
		} satisfies ChartConfiguration<Row>;

		const body = renderDefinition(rows, definition, 'Compact polar chart');
		expect(body).toContain('ts-chart__radial-area');
		expect(body).toContain('ts-chart__radial-line');
		expect(body).toContain('ts-chart__radial-dot');
		expect(body).toContain('ts-chart__radial-grid');
		expect(body).toContain('stroke="var(--color-neutral)" stroke-opacity="0.14"');
		const [centerX, centerY] = getOuterPolarGridCenter(body);
		expect(centerX).toBeCloseTo(320, 1);
		expect(centerY).toBeCloseTo(180, 1);
	});

	test('renders a structural GeoJSON mark', () => {
		type Place = ChartGeoFeature<{ name: string }>;
		const places: readonly Place[] = [
			{
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [2.35, 48.85] },
				properties: { name: 'Paris' }
			}
		];
		const definition = {
			marks: [
				{
					type: 'geo-shape',
					projection: { type: 'mercator', fit: 'data' },
					fill: 'primary'
				}
			]
		} satisfies ChartConfiguration<Place>;

		const body = renderDefinition(places, definition, 'Places');
		expect(body).toContain('ts-chart__geo');
	});
});
