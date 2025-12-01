<script lang="ts">
	import type { MeterProps, MeterStep } from './meter.props.js';
	import { useMeterTheme } from './meter.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import { useSpringState } from '$lib/utils/spring.svelte.js';

	type T = $$Generic<Record<string, any> | undefined>;
	type S = $$Generic<Record<string, any> | undefined>;
	let {
		value,
		steps,
		class: className,
		showIndicatorAs = 'percentage',
		showLegend = false,
		indicator,
		size = 'normal',
		stiffness = 0.05,
		damping = 1,
		precision = 0.001,
		min = 0,
		soft = 0.1,
		max = 100,
		header,
		label,
		helper,
		description,
		theme
	}: MeterProps<T, S> = $props();

	const spring = useSpringState({
		stiffness,
		damping,
		precision
	});

	let springs = $state(
		(Array.isArray(value) ? value : [value]).map((v) => {
			const percentage = (v.value / max) * 100;
			return {
				percentage,
				value: spring(v.value),
				width: spring(percentage)
			};
		})
	);

	$effect(() => {
		(Array.isArray(value) ? value : [value]).forEach((v, i) => {
			springs[i].percentage = (v.value / max) * 100;
			springs[i].value.set(v.value || 0, { soft });
			springs[i].width!.set((v.value / max) * 100, { soft });
		});
	});

	const classes = $derived(useMeterTheme(theme));

	const labelsPositions = $derived(
		Array.isArray(value) ? value.map((v) => v.position || 'top') : [value?.position || 'top']
	);
	const labelsPosition: 'top' | 'bottom' | 'both' | undefined = $derived(
		labelsPositions.includes('top') && labelsPositions.includes('bottom')
			? 'both'
			: labelsPositions.includes('top')
				? 'top'
				: undefined
	);
</script>

{#snippet meter(index: number, meter: MeterStep<T>)}
	{@const spring = springs[index]}
	<div
		data-first={index === 0}
		data-last={index === springs.length - 1}
		data-color={meter.color || 'info'}
		style:width="{spring.width.current}%"
		class={classes.container({ first: index === 0, last: index === springs.length - 1 })}
	>
		{#snippet indicatorContent()}
			{showIndicatorAs === 'value'
				? meter.value.toFixed(0)
				: showIndicatorAs === 'percentage'
					? `${spring.percentage.toFixed(0)}%`
					: ''}
		{/snippet}
		<Slot
			as="span"
			class={classes.indicator({ size, position: meter.position || 'top' })}
			render={indicator}
			children={showIndicatorAs ? indicatorContent : undefined}
			attrs={{
				'data-position': meter.position || 'top'
			}}
		/>

		<div class={classes.progress({ size })}></div>
	</div>
{/snippet}

{#snippet headerSnippet()}
	<Slot class={classes.label({ size })} render={label} />
	<Slot class={classes.helper({ size })} render={helper} />
{/snippet}
<div class={classes.meter({ size, className })}>
	<Slot
		class={classes.header({ size })}
		renderIf={!!(header || label || helper)}
		render={header ? header : label || helper ? headerSnippet : undefined}
	/>
	<div class={classes.track({ size, labelsPosition })}>
		{#if !Array.isArray(value)}
			{@render meter(0, value)}
		{:else}
			{#each value as v, i}
				{@render meter(i, v)}
			{/each}
		{/if}
	</div>
	{#if showLegend}
		<div class={classes.legend({ size })}>
			{#each Array.isArray(value) ? value : [value] as meterItem, i}
				{@const percentage = (meterItem.value / max) * 100}
				<div data-color={meterItem.color || 'info'} class={classes.legendItem({ size })}>
					{#if meterItem.icon}
						<div class={classes.legendIcon({ size })}>
							{@render meterItem.icon()}
						</div>
					{/if}
					{#if meterItem.label}
						<span class={classes.legendLabel({ size })}>{meterItem.label}</span>
					{/if}
					<span class={classes.legendPercentage({ size })}>
						{percentage.toFixed(0)}%
					</span>
				</div>
			{/each}
		</div>
	{/if}
	<Slot class={classes.description({ size })} render={description} />
</div>
