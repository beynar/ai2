import type { ChartGeoFeature, ChartProps } from 'svelai/chart';
import type { GeometryChartUsageType, MetricChartUsageType } from './chartUsageCatalog.js';

type ChartUsageExample<TRow extends object> = {
	data: readonly TRow[];
	props: Pick<
		ChartProps<TRow>,
		'marks' | 'x' | 'y' | 'guides' | 'clip' | 'margin' | 'palette' | 'tooltip'
	>;
};

type MetricRow = {
	quarter: string;
	product: string;
	value: number;
};

const metricRows: readonly MetricRow[] = [
	{ quarter: 'Q1', product: 'Platform', value: 42 },
	{ quarter: 'Q2', product: 'Platform', value: 51 },
	{ quarter: 'Q3', product: 'Platform', value: 58 },
	{ quarter: 'Q4', product: 'Platform', value: 67 },
	{ quarter: 'Q1', product: 'Services', value: 29 },
	{ quarter: 'Q2', product: 'Services', value: 34 },
	{ quarter: 'Q3', product: 'Services', value: 41 },
	{ quarter: 'Q4', product: 'Services', value: 48 },
	{ quarter: 'Q1', product: 'Partners', value: 18 },
	{ quarter: 'Q2', product: 'Partners', value: 27 },
	{ quarter: 'Q3', product: 'Partners', value: 33 },
	{ quarter: 'Q4', product: 'Partners', value: 39 }
];

const metricCartesianPosition = {
	x: {
		scale: { type: 'point', padding: 0.5 },
		axis: { label: 'Quarter' }
	},
	y: {
		scale: { type: 'linear', domain: [0, 80] },
		axis: { label: 'Revenue (€k)' },
		grid: true
	}
} as const;

export const metricChartUsageExamples = {
	line: {
		data: metricRows,
		props: {
			...metricCartesianPosition,
			marks: [
				{
					type: 'line',
					x: 'quarter',
					y: 'value',
					series: 'product',
					colorBy: 'product',
					strokeWidth: 2.5,
					points: true
				}
			],
			tooltip: true
		}
	},
	area: {
		data: metricRows,
		props: {
			x: metricCartesianPosition.x,
			y: {
				...metricCartesianPosition.y,
				scale: { type: 'linear', domain: [0, 180] }
			},
			marks: [
				{
					type: 'area',
					direction: 'vertical',
					x: 'quarter',
					y: 'value',
					series: 'product',
					colorBy: 'product',
					layout: { type: 'stack' },
					fillOpacity: 0.7,
					strokeWidth: 1.5
				}
			],
			tooltip: true
		}
	},
	bars: {
		data: metricRows,
		props: {
			x: {
				scale: { type: 'band', padding: 0.18 },
				axis: { label: 'Quarter' }
			},
			y: metricCartesianPosition.y,
			marks: [
				{
					type: 'bar',
					direction: 'vertical',
					x: 'quarter',
					y: 'value',
					series: 'product',
					colorBy: 'product',
					layout: { type: 'group', padding: 0.12 },
					radius: 3
				}
			],
			tooltip: true
		}
	},
	scatter: {
		data: metricRows,
		props: {
			...metricCartesianPosition,
			marks: [
				{
					type: 'point',
					shape: 'circle',
					x: 'quarter',
					y: 'value',
					colorBy: 'product',
					radius: (row) => 3 + row.value / 12,
					fillOpacity: 0.75,
					stroke: 'var(--color-surface)',
					strokeWidth: 2
				}
			],
			tooltip: true
		}
	},
	'cell-matrix': {
		data: metricRows,
		props: {
			x: {
				scale: { type: 'band', padding: 0.08 },
				axis: { label: 'Quarter' }
			},
			y: {
				scale: { type: 'band', padding: 0.08 },
				axis: { label: 'Product' }
			},
			marks: [
				{
					type: 'cell',
					x: 'quarter',
					y: 'product',
					colorBy: 'product',
					inset: 2,
					radius: 5,
					stroke: 'var(--color-surface)',
					strokeWidth: 2
				}
			],
			tooltip: true
		}
	},
	facets: {
		data: metricRows,
		props: {
			marks: [
				{
					type: 'facet',
					by: 'product',
					columns: 3,
					axes: 'cell',
					label: true,
					definition: {
						...metricCartesianPosition,
						marks: [
							{
								type: 'line',
								x: 'quarter',
								y: 'value',
								stroke: 'primary',
								strokeWidth: 2,
								points: true
							}
						]
					}
				}
			],
			tooltip: true
		}
	},
	radar: {
		data: metricRows,
		props: {
			marks: [
				{
					type: 'polar',
					angle: { scale: { type: 'point', padding: 0 } },
					radius: { scale: { type: 'linear', domain: [0, 80] } },
					marks: [
						{
							type: 'area',
							angle: 'quarter',
							radius: 'value',
							series: 'product',
							colorBy: 'product',
							curve: 'linear-closed',
							fillOpacity: 0.12
						},
						{
							type: 'line',
							angle: 'quarter',
							radius: 'value',
							series: 'product',
							colorBy: 'product',
							curve: 'linear-closed',
							strokeWidth: 2,
							points: true
						}
					],
					guides: [
						{ type: 'radial-grid', ticks: 4, shape: 'polygon', labels: true },
						{ type: 'angle-grid', labels: true }
					]
				}
			],
			tooltip: true
		}
	}
} satisfies Record<MetricChartUsageType, ChartUsageExample<MetricRow>>;

type GeometryRow = {
	id: string;
	label: string;
	x: number;
	y: number;
	x2: number;
	y2: number;
	length: number;
	rotate: number;
};

const geometryRows: readonly GeometryRow[] = [
	{ id: 'alpha', label: 'Alpha', x: 1, y: 2, x2: 2.4, y2: 4.8, length: 44, rotate: -35 },
	{ id: 'beta', label: 'Beta', x: 2.3, y: 5.4, x2: 4.2, y2: 6.8, length: 35, rotate: 20 },
	{ id: 'gamma', label: 'Gamma', x: 3.7, y: 2.8, x2: 5.5, y2: 4.4, length: 52, rotate: -12 },
	{ id: 'delta', label: 'Delta', x: 5.2, y: 6.2, x2: 6.7, y2: 7.1, length: 40, rotate: 32 }
];

const geometryPosition = {
	x: {
		scale: { type: 'linear', domain: [0, 8] },
		axis: { label: 'X' },
		grid: true
	},
	y: {
		scale: { type: 'linear', domain: [0, 9] },
		axis: { label: 'Y' },
		grid: true
	}
} as const;

export const geometryChartUsageExamples = {
	range: {
		data: geometryRows,
		props: {
			...geometryPosition,
			marks: [
				{
					type: 'rect',
					x1: 'x',
					y1: 'y',
					x2: 'x2',
					y2: 'y2',
					key: 'id',
					fill: 'primary',
					fillOpacity: 0.3,
					stroke: 'primary',
					strokeWidth: 2,
					radius: 4
				}
			],
			tooltip: true
		}
	},
	connections: {
		data: geometryRows,
		props: {
			...geometryPosition,
			marks: [
				{
					type: 'link',
					x1: 'x',
					y1: 'y',
					x2: 'x2',
					y2: 'y2',
					key: 'id',
					stroke: 'secondary',
					strokeWidth: 5,
					strokeOpacity: 0.25,
					curve: 'basis'
				},
				{
					type: 'arrow',
					x1: 'x',
					y1: 'y',
					x2: 'x2',
					y2: 'y2',
					key: 'id',
					stroke: 'primary',
					strokeWidth: 2,
					headLength: 9,
					headAngle: 28
				}
			],
			tooltip: true
		}
	},
	'vector-field': {
		data: geometryRows,
		props: {
			...geometryPosition,
			marks: [
				{
					type: 'vector',
					x: 'x',
					y: 'y',
					key: 'id',
					length: 'length',
					rotate: 'rotate',
					anchor: 'middle',
					stroke: 'primary',
					strokeWidth: 2,
					headLength: 8
				}
			],
			tooltip: true
		}
	},
	layers: {
		data: geometryRows,
		props: {
			...geometryPosition,
			marks: [
				{
					type: 'band',
					axis: 'x',
					value: 'x',
					fill: 'primary',
					fillOpacity: 0.08
				},
				{
					type: 'rule',
					axis: 'y',
					value: 'y',
					stroke: 'secondary',
					strokeOpacity: 0.45,
					strokeDasharray: '5 5'
				},
				{
					type: 'tick',
					axis: 'x',
					x: 'x',
					y: 'y',
					key: 'id',
					length: 12,
					stroke: 'primary',
					strokeWidth: 2
				},
				{
					type: 'text',
					x: 'x',
					y: 'y',
					key: 'id',
					text: 'label',
					fill: 'neutral',
					fontSize: 13,
					fontWeight: 600,
					anchor: 'middle',
					dy: -15
				},
				{
					type: 'frame',
					stroke: 'primary',
					strokeOpacity: 0.5,
					strokeWidth: 2,
					inset: 4,
					radius: 8
				}
			],
			tooltip: true
		}
	}
} satisfies Record<GeometryChartUsageType, ChartUsageExample<GeometryRow>>;

type DonutRow = {
	label: string;
	startAngle: number;
	endAngle: number;
};

const donutRows: readonly DonutRow[] = [
	{ label: 'Platform', startAngle: 0, endAngle: 2.5 },
	{ label: 'Services', startAngle: 2.5, endAngle: 4.2 },
	{ label: 'Partners', startAngle: 4.2, endAngle: 5.45 },
	{ label: 'Other', startAngle: 5.45, endAngle: Math.PI * 2 }
];

export const donutChartUsageExample = {
	data: donutRows,
	props: {
		marks: [
			{
				type: 'polar',
				marks: [
					{
						type: 'arc',
						startAngle: 'startAngle',
						endAngle: 'endAngle',
						colorBy: 'label',
						innerRadius: 72,
						outerRadius: 150,
						cornerRadius: 6,
						stroke: 'var(--color-surface)',
						strokeWidth: 3
					}
				]
			}
		],
		tooltip: true
	}
} satisfies ChartUsageExample<DonutRow>;

type RegionProperties = {
	name: string;
	group: string;
};

type RegionFeature = ChartGeoFeature<RegionProperties>;

const regionFeatures: readonly RegionFeature[] = [
	{
		type: 'Feature',
		properties: { name: 'West', group: 'Coastal' },
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[-7, 42],
					[-7, 50],
					[1, 50],
					[1, 42],
					[-7, 42]
				]
			]
		}
	},
	{
		type: 'Feature',
		properties: { name: 'Central', group: 'Continental' },
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[1, 43],
					[1, 51],
					[10, 51],
					[10, 43],
					[1, 43]
				]
			]
		}
	},
	{
		type: 'Feature',
		properties: { name: 'South', group: 'Mediterranean' },
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[-4, 36],
					[-4, 43],
					[9, 43],
					[9, 36],
					[-4, 36]
				]
			]
		}
	}
];

export const mapChartUsageExample = {
	data: regionFeatures,
	props: {
		marks: [
			{
				type: 'geo-shape',
				projection: { type: 'mercator', fit: 'data', inset: 28 },
				key: (feature) => feature.properties.name,
				colorBy: (feature) => feature.properties.group,
				fillOpacity: 0.75,
				stroke: 'var(--color-surface)',
				strokeWidth: 3
			}
		]
	}
} satisfies ChartUsageExample<RegionFeature>;
