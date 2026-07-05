<script lang="ts">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Sizes } from '$lib/types/theme.js';
	import type { SliderProps } from './slider.props.js';
	import type { SliderState } from './slider.state.svelte.js';
	import type { useSliderTheme } from './slider.theme.js';

	type SliderClasses = ReturnType<typeof useSliderTheme>;

	let {
		slider,
		classes,
		size,
		valueLabel,
		rangeLabel
	}: {
		slider: SliderState;
		classes: SliderClasses;
		size?: Sizes;
		valueLabel?: SliderProps['valueLabel'];
		rangeLabel?: SliderProps['rangeLabel'];
	} = $props();
</script>

<div class={classes.valueLabels({ orientation: slider.orientationValue })}>
	{#if slider.isRange && rangeLabel}
		<Slot
			as="span"
			render={rangeLabel}
			payload={slider.rangePayload}
			class={classes.valueLabel({ size })}
		>
			{slider.rangePayload.formatted}
		</Slot>
	{:else}
		{#each slider.valuePayloads as payload (payload.index)}
			<Slot as="span" render={valueLabel} {payload} class={classes.valueLabel({ size })}>
				{payload.formatted}
			</Slot>
		{/each}
	{/if}
</div>
