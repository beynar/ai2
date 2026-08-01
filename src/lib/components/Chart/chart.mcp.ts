export const chartDescription = `
# Chart Component

Chart renders ordered, layered cartesian, polar, faceted, or geographic marks from one typed data array. Consumers import only from \`svelai/chart\`; TanStack Charts and D3 remain private implementation dependencies.

## Basic usage

\`\`\`svelte
<script lang="ts">
  import { Chart } from 'svelai/chart'

  type Row = { month: Date; actual: number; forecast: number }
  const x = { scale: { type: 'utc' }, axis: { label: 'Month' } } as const
  const y = { scale: { type: 'linear' }, grid: true } as const
  const marks = [
      { type: 'area', direction: 'vertical', x: 'month', y: 'forecast', fill: 'primary' },
      { type: 'line', x: 'month', y: 'actual', stroke: 'primary' }
    ] as const
</script>

<Chart
  data={rows}
  {x}
  {y}
  {marks}
  tooltip
  ariaLabel="Monthly revenue"
  initialDimensions={{ width: 800, height: 400 }}
/>
\`\`\`

## Contract

- \`data\` is one immutable array shared by every mark.
- \`marks\` is a required non-empty discriminated union; array order is paint order.
- Position scales use local string discriminants such as \`linear\`, \`utc\`, and \`band\`.
- \`tooltip: true\` groups cartesian series on the categorical or x axis, highlights every enabled line point in the active group, renders native color rows, and uses a viewport portal.
- Tooltip objects can override grouping with \`groupBy: 'x'\`, \`groupBy: 'y'\`, or \`groupBy: false\`.
- \`ariaLabel\` is required and \`ariaDescription\` is optional.
- With \`initialDimensions\`, Chart emits deterministic SVG during SSR and preserves that aspect ratio responsively.
- Without \`initialDimensions\`, SSR emits a stable empty host and the SVG mounts only in the browser.
- Replace \`data\`, \`marks\`, or another configuration prop to update a mounted chart. In-place mutation is not an update contract.
- Configuration errors throw a prefixed \`TypeError\`; dependency and accessor errors propagate.
`;
