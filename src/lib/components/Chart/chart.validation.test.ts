import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { describe, expect, test } from 'vitest';
import Chart from './Chart.svelte';
import type { ChartProps } from './chart.props.js';

type ChartConfiguration<TRow extends object> = Pick<
	ChartProps<TRow>,
	'marks' | 'x' | 'y' | 'guides' | 'clip' | 'margin' | 'palette' | 'tooltip'
>;

type Row = {
	category: string;
	group: string;
	value: number;
	end: number;
};

const rows: readonly Row[] = [
	{ category: 'A', group: 'First', value: 2, end: 4 },
	{ category: 'B', group: 'Second', value: 3, end: 5 }
];

const RowChart = Chart as Component<ChartProps<Row>>;

function compileInvalidDefinition(definition: unknown): unknown {
	try {
		const output = render(RowChart, {
			props: {
				data: rows,
				...(definition as ChartConfiguration<Row>),
				ariaLabel: 'Invalid chart',
				initialDimensions: { width: 640, height: 360 }
			}
		});
		void output.body;
	} catch (error) {
		return error;
	}
	throw new Error('Expected the Chart definition to fail.');
}

describe('Chart configuration errors', () => {
	test.each([
		['empty marks', { marks: [] }, '[Chart] marks must contain at least one mark.'],
		[
			'unknown mark',
			{ marks: [{ type: 'spark' }] },
			'[Chart] marks[0].type "spark" is not supported.'
		],
		[
			'missing axis',
			{
				x: { scale: { type: 'band' } },
				marks: [{ type: 'bar', direction: 'vertical', x: 'category', y: 'value' }]
			},
			'[Chart] y is required by marks[0].'
		],
		[
			'duplicate IDs',
			{
				marks: [
					{ type: 'frame', id: 'plot' },
					{ type: 'frame', id: 'plot' }
				]
			},
			'[Chart] marks[1].id duplicates marks[0].id "plot".'
		],
		[
			'empty palette',
			{ marks: [{ type: 'frame' }], palette: [] },
			'[Chart] palette must contain at least one color.'
		],
		[
			'categorical nicening',
			{
				x: { scale: { type: 'band' }, nice: true },
				marks: [{ type: 'band', axis: 'x', value: 'category' }]
			},
			'[Chart] x.nice is not supported by the "band" scale.'
		],
		[
			'group without a channel',
			{
				x: { scale: { type: 'band' } },
				y: { scale: { type: 'linear' } },
				marks: [
					{
						type: 'bar',
						direction: 'vertical',
						x: 'category',
						y: 'value',
						layout: { type: 'group' }
					}
				]
			},
			'[Chart] marks[0].layout with type "group" requires marks[0].series or marks[0].colorBy.'
		],
		[
			'endpoints with a layout',
			{
				x: { scale: { type: 'band' } },
				y: { scale: { type: 'linear' } },
				marks: [
					{
						type: 'bar',
						direction: 'vertical',
						x: 'category',
						y1: 'value',
						y2: 'end',
						layout: { type: 'stack' }
					}
				]
			},
			'[Chart] marks[0].layout cannot be combined with explicit y-axis endpoints.'
		]
	] as const)('rejects %s', (_name, definition, message) => {
		const error = compileInvalidDefinition(definition);
		expect(error).toBeInstanceOf(TypeError);
		expect((error as Error).message).toBe(message);
	});

	test.each([
		[
			'centered rect',
			{
				x: { scale: { type: 'linear' } },
				y: { scale: { type: 'band' } },
				marks: [{ type: 'rect', x: 'value', y: 'group' }]
			},
			'[Chart] marks[0].x requires x.scale.type to be "band".'
		],
		[
			'cell',
			{
				x: { scale: { type: 'band' } },
				y: { scale: { type: 'point' } },
				marks: [{ type: 'cell', x: 'category', y: 'group' }]
			},
			'[Chart] marks[0].y requires y.scale.type to be "band".'
		]
	] as const)('rejects an invisible %s configuration', (_name, definition, message) => {
		const error = compileInvalidDefinition(definition);
		expect(error).toBeInstanceOf(TypeError);
		expect((error as Error).message).toBe(message);
	});
});
