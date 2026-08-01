<script lang="ts" generics="TRow extends object">
	import { createChartAdapter } from '@tanstack/charts/adapter';
	import { onMount, untrack } from 'svelte';
	import { createChartOptions } from './chart.adapter.js';
	import type { ChartProps } from './chart.props.js';
	import { useChartTheme } from './chart.theme.js';

	let {
		data,
		marks,
		x,
		y,
		guides,
		clip,
		margin,
		palette,
		tooltip,
		ariaLabel,
		ariaDescription,
		initialDimensions,
		class: className,
		ref = $bindable(null),
		theme,
		...attachments
	}: ChartProps<TRow> = $props();

	const generatedId = $props.id();
	const idPrefix = `svelai-chart-${generatedId.replaceAll(/[^a-zA-Z0-9_-]/g, '')}`;
	const classes = $derived(useChartTheme(theme));

	function getChartOptions() {
		return createChartOptions({
			data,
			marks,
			x,
			y,
			guides,
			clip,
			margin,
			palette,
			tooltip,
			ariaLabel,
			ariaDescription,
			idPrefix,
			initialDimensions,
			tooltipClassName: classes.tooltip()
		});
	}

	const options = $derived(getChartOptions());
	const rootStyle = $derived(
		initialDimensions
			? `position:relative;width:100%;aspect-ratio:${initialDimensions.width}/${initialDimensions.height}`
			: 'position:relative;width:100%;height:320px'
	);

	const adapter = untrack(() => createChartAdapter(getChartOptions()));
	const initialMarkup = untrack(() => (initialDimensions ? adapter.prerender() : ''));
	let container!: HTMLDivElement;

	$effect(() => adapter.update(options));

	onMount(() => {
		adapter.mount(container);
		return () => adapter.destroy();
	});
</script>

<div
	bind:this={ref}
	data-slot="chart"
	class={classes.root({ className })}
	style={rootStyle}
	{...attachments}
>
	<div bind:this={container} data-chart-host class={classes.plot()} style="width:100%;height:100%">
		{@html initialMarkup}
	</div>
</div>
