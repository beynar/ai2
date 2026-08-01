<script lang="ts">
	import { Select } from '$lib/components/Form/Select/index.js';
	import { Chart } from 'svelai/chart';
	import {
		chartUsageItems,
		chartUsageMetadata,
		isGeometryChartUsageType,
		isMetricChartUsageType,
		type ChartUsageType
	} from './chartUsageCatalog.js';
	import {
		donutChartUsageExample,
		geometryChartUsageExamples,
		mapChartUsageExample,
		metricChartUsageExamples
	} from './chartUsageExamples.js';

	let selectedType = $state<ChartUsageType>('line');
	const activeMetadata = $derived(chartUsageMetadata[selectedType]);
</script>

<div class="grid w-full gap-5">
	<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
		<div class="w-full md:max-w-64">
			<Select label="Chart type" items={chartUsageItems} bind:value={selectedType} size="small" />
		</div>
		<p class="text-neutral/60 max-w-2xl text-sm leading-6">{activeMetadata.description}</p>
	</div>

	<div class="min-w-0">
		{#if isMetricChartUsageType(selectedType)}
			{@const example = metricChartUsageExamples[selectedType]}
			<Chart
				data={example.data}
				{...example.props}
				ariaLabel={activeMetadata.ariaLabel}
				initialDimensions={{ width: 960, height: 480 }}
				class="w-full"
			/>
		{:else if isGeometryChartUsageType(selectedType)}
			{@const example = geometryChartUsageExamples[selectedType]}
			<Chart
				data={example.data}
				{...example.props}
				ariaLabel={activeMetadata.ariaLabel}
				initialDimensions={{ width: 960, height: 480 }}
				class="w-full"
			/>
		{:else if selectedType === 'donut'}
			<Chart
				data={donutChartUsageExample.data}
				{...donutChartUsageExample.props}
				ariaLabel={activeMetadata.ariaLabel}
				initialDimensions={{ width: 960, height: 480 }}
				class="w-full"
			/>
		{:else}
			<Chart
				data={mapChartUsageExample.data}
				{...mapChartUsageExample.props}
				ariaLabel={activeMetadata.ariaLabel}
				initialDimensions={{ width: 960, height: 480 }}
				class="w-full"
			/>
		{/if}
	</div>
</div>
