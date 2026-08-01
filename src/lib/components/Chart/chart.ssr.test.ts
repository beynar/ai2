import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { describe, expect, test } from 'vitest';
import Chart from './Chart.svelte';
import type { ChartProps } from './chart.props.js';

type Revenue = {
	month: Date;
	value: number | null;
};

const data: readonly Revenue[] = [
	{ month: new Date('2026-01-01T00:00:00.000Z'), value: 12 },
	{ month: new Date('2026-02-01T00:00:00.000Z'), value: 18 },
	{ month: new Date('2026-03-01T00:00:00.000Z'), value: null }
];

const chart = {
	x: { scale: { type: 'utc' } },
	y: { scale: { type: 'linear' } },
	marks: [{ type: 'line', x: 'month', y: 'value' }]
} satisfies Pick<ChartProps<Revenue>, 'marks' | 'x' | 'y'>;

const RevenueChart = Chart as Component<ChartProps<Revenue>>;

describe('Chart SSR', () => {
	test('prerenders an accessible SVG at the requested initial dimensions', () => {
		const output = render(RevenueChart, {
			props: {
				data,
				...chart,
				ariaLabel: 'Monthly revenue',
				initialDimensions: { width: 800, height: 400 }
			}
		});

		expect(output.body).toContain('data-slot="chart"');
		expect(output.body).toContain('<svg');
		expect(output.body).toContain('aria-label="Monthly revenue"');
		expect(output.body).toContain('viewBox="0 0 800 400"');
	});

	test('renders only a stable host when initial dimensions are absent', () => {
		const output = render(RevenueChart, {
			props: { data, ...chart, ariaLabel: 'Monthly revenue' }
		});

		expect(output.body).toContain('data-slot="chart"');
		expect(output.body).toContain('data-chart-host');
		expect(output.body).not.toContain('<svg');
	});

	test('keeps empty datasets valid', () => {
		const output = render(RevenueChart, {
			props: {
				data: [],
				...chart,
				ariaLabel: 'Empty revenue',
				initialDimensions: { width: 800, height: 400 }
			}
		});

		expect(output.body).toContain('<svg');
		expect(output.body).toContain('aria-label="Empty revenue"');
	});

	test('rejects non-positive initial dimensions', () => {
		let thrown: unknown;
		try {
			const output = render(RevenueChart, {
				props: {
					data,
					...chart,
					ariaLabel: 'Monthly revenue',
					initialDimensions: { width: 0, height: 400 }
				}
			});
			void output.body;
		} catch (error) {
			thrown = error;
		}

		expect(thrown).toBeInstanceOf(TypeError);
		expect((thrown as Error).message).toBe(
			'[Chart] initialDimensions.width must be a finite number greater than 0.'
		);
	});
});
