<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { meterTheme } from './meter.js';
	export const setMeterTheme = setComponentTheme<typeof meterTheme>('meter');
	export const useMeterTheme = useComponentTheme('meter', meterTheme);
</script>

<script lang="ts">
	import type { MeterProps, Meter } from './meter.js';
	import Slot from '../Slot/Slot.svelte';
	import { useSpringState } from '$lib/utils/spring.svelte.js';
	import { untrack } from 'svelte';

	type T = $$Generic<Record<string, any> | undefined>;
	type S = $$Generic<Record<string, any> | undefined>;
	let {
		value,
		steps,
		class: className,
		showIndicatorAs = 'percentage',
		indicator,
		indicatorProps,
		size = 'normal',
		stiffness = 0.05,
		damping = 1,
		precision = 0.001,
		min = 0,
		soft = 0.1,
		max = 100,
		header,
		headerProps,
		label,
		labelProps,
		helper,
		helperProps,
		description,
		descriptionProps,
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
</script>

{#snippet meter(index: number, meter: Meter<T>)}
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
				? value
				: showIndicatorAs === 'percentage'
					? `${spring.percentage.toFixed(0)}%`
					: ''}
		{/snippet}
		<Slot
			as="span"
			class={classes.indicator({ size, position: meter.position || 'top' })}
			render={indicator}
			props={{ ...indicatorProps, value }}
			children={showIndicatorAs ? indicatorContent : undefined}
			payload={{ ...meter, percentage: spring.percentage, min, max }}
			attrs={{
				'data-position': meter.position || 'top'
			}}
		/>
		<!-- <meter {min} {max} class={classes.progress({ size })} value={spring.value.current}></meter> -->
		<div class={classes.progress({ size })}></div>
	</div>
{/snippet}

{#snippet headerSnippet()}
	<Slot class={classes.label({ size })} render={label} props={labelProps} />
	<Slot class={classes.helper({ size })} props={helperProps} render={helper} />
{/snippet}
<div data-size={size} class={classes.meter({ size, className })}>
	<Slot
		props={headerProps}
		class={classes.header({ size })}
		render={header ? header : label || helper ? headerSnippet : undefined}
	/>
	<div class={classes.track({ size })}>
		{#if steps}
			{#each steps as step, i}
				{@const next = steps[i + 1]}
				{@const end = step.end || (next ? next.start : 100)}
				{@const width = ((end - step.start) / max) * 100}
				{@const percentageFromLeft = (step.start / max) * 100}
				<div
					data-color={step.color}
					data-position={step.position || 'top'}
					class={classes.step({ size, position: step.position })}
					style:left={percentageFromLeft + '%'}
					style:width={width + '%'}
				>
					<Slot
						class={classes.stepLabel({ size, position: step.position || 'top' })}
						render={step.label}
						props={step}
					/>
				</div>
			{/each}
		{/if}
		{#if !Array.isArray(value)}
			{@render meter(0, value)}
		{:else}
			{#each value as v, i}
				{@render meter(i, v)}
			{/each}
		{/if}
	</div>
	<Slot class={classes.description({ size })} props={descriptionProps} render={description} />
</div>
