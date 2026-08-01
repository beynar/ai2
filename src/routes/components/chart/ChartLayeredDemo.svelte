<script lang="ts">
	import { Chart } from 'svelai/chart';

	type Revenue = {
		month: Date;
		actual: number;
		forecast: number;
	};

	const revenue: readonly Revenue[] = [
		{ month: new Date('2026-01-01T00:00:00.000Z'), actual: 42, forecast: 40 },
		{ month: new Date('2026-02-01T00:00:00.000Z'), actual: 48, forecast: 45 },
		{ month: new Date('2026-03-01T00:00:00.000Z'), actual: 46, forecast: 52 },
		{ month: new Date('2026-04-01T00:00:00.000Z'), actual: 59, forecast: 57 },
		{ month: new Date('2026-05-01T00:00:00.000Z'), actual: 63, forecast: 62 },
		{ month: new Date('2026-06-01T00:00:00.000Z'), actual: 71, forecast: 68 }
	];

	const x = {
		scale: { type: 'utc' },
		axis: { label: 'Month' }
	} as const;
	const y = {
		scale: { type: 'linear' },
		axis: { label: 'Revenue (€k)' },
		grid: true
	} as const;
	const marks = [
		{
			type: 'area',
			direction: 'vertical',
			x: 'month',
			y: 'forecast',
			fill: 'primary',
			fillOpacity: 0.14
		},
		{
			type: 'line',
			x: 'month',
			y: 'actual',
			stroke: 'primary',
			strokeWidth: 2.5,
			points: true
		}
	] as const;
</script>

<Chart
	data={revenue}
	{x}
	{y}
	{marks}
	tooltip
	ariaLabel="Monthly actual and forecast revenue"
	ariaDescription="Actual revenue is shown as a line and points over the forecast area."
	initialDimensions={{ width: 960, height: 420 }}
	class="w-full"
/>
