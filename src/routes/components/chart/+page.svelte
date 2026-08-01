<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import ChartBarsDemo from './ChartBarsDemo.svelte';
	import ChartClientOnlyDemo from './ChartClientOnlyDemo.svelte';
	import ChartLayeredDemo from './ChartLayeredDemo.svelte';
	import ChartPolarDemo from './ChartPolarDemo.svelte';
	import ChartUsageDemo from './ChartUsageDemo.svelte';
	import { barsCode, clientOnlyCode, layeredCode, polarCode, usageCode } from './codeSnippets.js';
</script>

<DocPage
	title="Chart"
	subtitle="Typed top-level props for layering cartesian, polar, faceted, and geographic marks without exposing the rendering library."
	component="Chart"
	features={[
		'One shared typed dataset with ordered, layered marks',
		'Direct scale, axis, mark, color, curve, and tooltip props',
		'Optional deterministic SSR with initial dimensions',
		'Responsive SVG rendering after mount',
		'Grouped pointer and keyboard tooltip interaction'
	]}
>
	<section class="grid gap-3">
		<h2 class="text-neutral text-xl font-semibold">Direct props, no renderer imports</h2>
		<p class="text-neutral/60 max-w-3xl text-sm leading-6">
			Import <code>Chart</code> and its local types from <code>svelai/chart</code>. Every mark reads
			from the same data array and renders in mark order, so area, line, and point layers share one
			plot without exposing TanStack or D3 objects.
		</p>
		<p class="text-neutral/60 max-w-3xl text-sm leading-6">
			Pass <code>initialDimensions</code> when the server must emit the initial SVG. Omit it for a stable
			empty server host that mounts the chart only in the browser.
		</p>
		<p class="text-neutral/60 max-w-3xl text-sm leading-6">
			Enable <code>tooltip</code> to compare every series at the focused category or date. The same grouped
			rows are available from pointer and keyboard input. Every enabled line point on that axis value
			is highlighted together, and the tooltip escapes clipped containers through its viewport portal.
		</p>
	</section>

	<ComponentCard
		title="Chart type catalog"
		description="Switch between every chart family exposed by the public marks prop. The examples cover every top-level mark without presenting annotation primitives as standalone charts."
		code={usageCode}
		class="min-h-0 items-stretch p-3 md:p-5"
	>
		<ChartUsageDemo />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Layered revenue forecast"
			description="An SSR-ready area and line plot with line points enabled. The ordered marks reuse one typed monthly dataset and the default tooltip."
			code={layeredCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<ChartLayeredDemo />
		</ComponentCard>

		<ComponentCard
			title="Grouped and stacked bars"
			description="The same quarterly rows render as grouped and stacked bars by changing only the marks prop."
			code={barsCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<ChartBarsDemo />
		</ComponentCard>

		<ComponentCard
			title="Polar marks"
			description="A polar mark maps angle and radius channels without importing projection, scale, or mark factories."
			code={polarCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<ChartPolarDemo />
		</ComponentCard>

		<ComponentCard
			title="Client-only chart"
			description="Without initialDimensions, the server and first hydration render only the stable host. TanStack mounts the SVG after the component reaches the browser."
			code={clientOnlyCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<ChartClientOnlyDemo />
		</ComponentCard>
	{/snippet}
</DocPage>
