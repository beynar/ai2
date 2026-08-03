<script lang="ts" generics="TRow extends object">
	import type { ChartProps } from './chart.props.js';
	import { ChartState } from './chart.state.svelte.js';

	let {
		data,
		marks,
		x,
		y,
		guides,
		clip,
		frame,
		margin,
		palette,
		tooltip,
		viewport,
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
	const chart = new ChartState<TRow>({
		get data() {
			return data;
		},
		get marks() {
			return marks;
		},
		get x() {
			return x;
		},
		get y() {
			return y;
		},
		get guides() {
			return guides;
		},
		get clip() {
			return clip;
		},
		get frame() {
			return frame;
		},
		get margin() {
			return margin;
		},
		get palette() {
			return palette;
		},
		get tooltip() {
			return tooltip;
		},
		get viewport() {
			return viewport;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get ariaDescription() {
			return ariaDescription;
		},
		get initialDimensions() {
			return initialDimensions;
		},
		get theme() {
			return theme;
		},
		get className() {
			return className;
		},
		get idPrefix() {
			return idPrefix;
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="chart"
	data-chart-viewport-axis={chart.viewportState.axis}
	class={chart.rootClass}
	style={chart.rootStyle}
	{...attachments}
>
	<div {@attach chart.host} data-chart-host class={chart.plotClass} style="width:100%;height:100%">
		{@html chart.initialMarkup}
	</div>
	<div
		{@attach chart.interactionSurface}
		data-chart-interaction-surface
		aria-hidden="true"
		class="absolute inset-0 z-10"
	></div>
	{#if chart.viewportState.brushStyle}
		<div
			data-chart-brush
			aria-hidden="true"
			class="border-primary bg-primary/15 pointer-events-none absolute z-20 rounded-sm border shadow-sm"
			style={chart.viewportState.brushStyle}
		></div>
	{/if}
	{#if chart.viewportState.showReset}
		<button
			type="button"
			data-chart-viewport-reset
			class="border-neutral-muted bg-surface-floating text-neutral hover:bg-surface-muted focus-visible:ring-primary absolute top-2 right-2 z-30 rounded-md border px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
			onclick={chart.viewportState.reset}
		>
			Reset zoom
		</button>
	{/if}
	<span class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{chart.viewportState.status}
	</span>
</div>

<style>
	[data-slot='chart'] :global(svg.ts-chart) {
		outline: none;
	}

	[data-slot='chart'][data-chart-viewport-axis='x'] [data-chart-interaction-surface] {
		cursor: crosshair;
		touch-action: pan-y;
	}

	[data-slot='chart'][data-chart-viewport-axis='y'] [data-chart-interaction-surface] {
		cursor: crosshair;
		touch-action: pan-x;
	}

	[data-slot='chart'][data-chart-viewport-axis='both'] [data-chart-interaction-surface] {
		cursor: crosshair;
		touch-action: none;
	}
</style>
