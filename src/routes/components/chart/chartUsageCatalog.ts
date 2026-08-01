import type { SelectItems } from '$lib/components/Form/Select/index.js';

export const chartUsageTypes = [
	'line',
	'area',
	'bars',
	'scatter',
	'range',
	'cell-matrix',
	'connections',
	'vector-field',
	'facets',
	'radar',
	'donut',
	'map',
	'layers'
] as const;

export type ChartUsageType = (typeof chartUsageTypes)[number];
export type MetricChartUsageType =
	'line' | 'area' | 'bars' | 'scatter' | 'cell-matrix' | 'facets' | 'radar';
export type GeometryChartUsageType = 'range' | 'connections' | 'vector-field' | 'layers';

type ChartUsageMetadata = {
	label: string;
	description: string;
	ariaLabel: string;
};

export const chartUsageMetadata = {
	line: {
		label: 'Line',
		description: 'Multiple series share one point scale, with visible points enabled on each line.',
		ariaLabel: 'Quarterly revenue line chart'
	},
	area: {
		label: 'Area',
		description: 'Stacked areas compare the contribution of each product over time.',
		ariaLabel: 'Quarterly revenue area chart'
	},
	bars: {
		label: 'Bars',
		description: 'Grouped bars place each product beside its peers for every quarter.',
		ariaLabel: 'Quarterly revenue bar chart'
	},
	scatter: {
		label: 'Scatter / bubble',
		description: 'Points use a data channel for position and another channel for their radius.',
		ariaLabel: 'Quarterly revenue bubble chart'
	},
	range: {
		label: 'Range',
		description: 'Rectangles use explicit endpoints to show two-dimensional ranges.',
		ariaLabel: 'Explicit range chart'
	},
	'cell-matrix': {
		label: 'Cell matrix',
		description: 'Two band scales form a categorical matrix, with color identifying each series.',
		ariaLabel: 'Quarterly revenue cell matrix'
	},
	connections: {
		label: 'Connections',
		description:
			'Links and arrows render explicit relationships without assuming a network layout.',
		ariaLabel: 'Connection link and arrow chart'
	},
	'vector-field': {
		label: 'Vector field',
		description: 'Each datum controls the origin, length, and rotation of one vector.',
		ariaLabel: 'Vector field chart'
	},
	facets: {
		label: 'Facets',
		description: 'The same line mark repeats over data subsets selected by a facet channel.',
		ariaLabel: 'Quarterly revenue faceted chart'
	},
	radar: {
		label: 'Radar',
		description: 'Polar area and line marks compare several series on shared radial guides.',
		ariaLabel: 'Quarterly revenue radar chart'
	},
	donut: {
		label: 'Donut',
		description: 'Polar arcs receive explicit start and end angles, with no hidden pie transform.',
		ariaLabel: 'Revenue share donut chart'
	},
	map: {
		label: 'Map',
		description: 'Structural GeoJSON features render through local projection options.',
		ariaLabel: 'Regional map chart'
	},
	layers: {
		label: 'Annotation layers',
		description: 'Bands, rules, ticks, text, and a frame compose as ordered annotation layers.',
		ariaLabel: 'Annotated coordinate chart'
	}
} satisfies Record<ChartUsageType, ChartUsageMetadata>;

function chartUsageOption(type: ChartUsageType) {
	return { value: type, label: chartUsageMetadata[type].label };
}

export const chartUsageItems: SelectItems = [
	{
		label: 'Cartesian',
		items: [
			chartUsageOption('line'),
			chartUsageOption('area'),
			chartUsageOption('bars'),
			chartUsageOption('scatter'),
			chartUsageOption('range'),
			chartUsageOption('cell-matrix')
		]
	},
	{
		label: 'Composition',
		items: [
			chartUsageOption('connections'),
			chartUsageOption('vector-field'),
			chartUsageOption('facets'),
			chartUsageOption('layers')
		]
	},
	{
		label: 'Polar and geographic',
		items: [chartUsageOption('radar'), chartUsageOption('donut'), chartUsageOption('map')]
	}
];

export function isMetricChartUsageType(type: ChartUsageType): type is MetricChartUsageType {
	switch (type) {
		case 'line':
		case 'area':
		case 'bars':
		case 'scatter':
		case 'cell-matrix':
		case 'facets':
		case 'radar':
			return true;
		default:
			return false;
	}
}

export function isGeometryChartUsageType(type: ChartUsageType): type is GeometryChartUsageType {
	switch (type) {
		case 'range':
		case 'connections':
		case 'vector-field':
		case 'layers':
			return true;
		default:
			return false;
	}
}
