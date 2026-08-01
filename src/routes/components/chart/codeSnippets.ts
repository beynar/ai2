export const usageCode = `<script lang="ts">
  import { Chart } from 'svelai/chart';

  type Revenue = {
    quarter: string;
    product: string;
    value: number;
  };

  const revenue: readonly Revenue[] = [
    { quarter: 'Q1', product: 'Platform', value: 42 },
    { quarter: 'Q2', product: 'Platform', value: 51 },
    { quarter: 'Q1', product: 'Services', value: 29 },
    { quarter: 'Q2', product: 'Services', value: 34 }
  ];

  const x = { scale: { type: 'point' }, axis: { label: 'Quarter' } } as const;
  const y = { scale: { type: 'linear' }, grid: true } as const;
  const marks = [{
      type: 'line',
      x: 'quarter',
      y: 'value',
      series: 'product',
      colorBy: 'product',
      points: true
    }] as const;
</script>

<Chart
  data={revenue}
  {x}
  {y}
  {marks}
  tooltip
  ariaLabel="Quarterly revenue line chart"
  initialDimensions={{ width: 960, height: 480 }}
/>`;

export const layeredCode = `<script lang="ts">
  import { Chart } from 'svelai/chart';

  type Revenue = {
    month: Date;
    actual: number;
    forecast: number;
  };

  const revenue: readonly Revenue[] = [
    { month: new Date('2026-01-01'), actual: 42, forecast: 40 },
    { month: new Date('2026-02-01'), actual: 48, forecast: 45 },
    { month: new Date('2026-03-01'), actual: 46, forecast: 52 }
  ];

  const x = { scale: { type: 'utc' }, axis: { label: 'Month' } } as const;
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
  initialDimensions={{ width: 960, height: 420 }}
/>`;

export const barsCode = `<script lang="ts">
  import { Chart } from 'svelai/chart';

  type Revenue = {
    quarter: string;
    product: string;
    revenue: number;
  };

  const revenue: readonly Revenue[] = [
    { quarter: 'Q1', product: 'Platform', revenue: 38 },
    { quarter: 'Q1', product: 'Services', revenue: 24 },
    { quarter: 'Q2', product: 'Platform', revenue: 45 },
    { quarter: 'Q2', product: 'Services', revenue: 29 }
  ];

  const position = {
    x: { scale: { type: 'band', padding: 0.18 } },
    y: { scale: { type: 'linear' }, grid: true }
  } as const;

  const groupedMarks = [{
      type: 'bar',
      direction: 'vertical',
      x: 'quarter',
      y: 'revenue',
      series: 'product',
      colorBy: 'product',
      layout: { type: 'group', padding: 0.12 }
    }] as const;

  const stackedMarks = [{
      type: 'bar',
      direction: 'vertical',
      x: 'quarter',
      y: 'revenue',
      series: 'product',
      colorBy: 'product',
      layout: { type: 'stack' }
    }] as const;
</script>

<div class="grid lg:grid-cols-2">
  <Chart
    data={revenue}
    x={position.x}
    y={position.y}
    marks={groupedMarks}
    tooltip
    ariaLabel="Revenue grouped by product"
    initialDimensions={{ width: 520, height: 360 }}
  />
  <Chart
    data={revenue}
    x={position.x}
    y={position.y}
    marks={stackedMarks}
    tooltip
    ariaLabel="Revenue stacked by product"
    initialDimensions={{ width: 520, height: 360 }}
  />
</div>`;

export const polarCode = `<script lang="ts">
  import { Chart } from 'svelai/chart';

  type Capability = { name: string; score: number };

  const capabilities: readonly Capability[] = [
    { name: 'Research', score: 82 },
    { name: 'Design', score: 74 },
    { name: 'Delivery', score: 91 },
    { name: 'Quality', score: 78 },
    { name: 'Operations', score: 68 }
  ];

  const marks = [{
      type: 'polar',
      angle: 'name',
      radius: 'score',
      domain: [0, 100],
      area: true,
      line: true,
      points: true,
      color: 'secondary'
    }] as const;
</script>

<Chart
  data={capabilities}
  {marks}
  ariaLabel="Product capability profile"
  initialDimensions={{ width: 640, height: 480 }}
/>`;

export const clientOnlyCode = `<script lang="ts">
  import { Chart } from 'svelai/chart';

  type ResponseTime = { minute: number; milliseconds: number };

  const responseTimes: readonly ResponseTime[] = [
    { minute: 0, milliseconds: 182 },
    { minute: 5, milliseconds: 169 },
    { minute: 10, milliseconds: 214 }
  ];

  const x = { scale: { type: 'linear' }, axis: { label: 'Minute' } } as const;
  const y = {
      scale: { type: 'linear' },
      axis: { label: 'Response time (ms)' },
      grid: true
    } as const;
  const marks = [{
      type: 'line',
      x: 'minute',
      y: 'milliseconds',
      curve: 'monotone-x',
      stroke: 'info'
    }] as const;
</script>

<!-- No initialDimensions: the SVG mounts only in the browser. -->
<Chart
  data={responseTimes}
  {x}
  {y}
  {marks}
  tooltip
  ariaLabel="API response time"
/>`;
