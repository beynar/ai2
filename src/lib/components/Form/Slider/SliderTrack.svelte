<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import { SliderDragEngine } from './slider.drag.js';
	import type { SliderMark } from './slider.props.js';
	import type { SliderState } from './slider.state.svelte.js';
	import SliderMarks from './SliderMarks.svelte';
	import SliderThumb from './SliderThumb.svelte';
	import type { useSliderTheme } from './slider.theme.js';

	type SliderClasses = ReturnType<typeof useSliderTheme>;

	let {
		id,
		slider,
		classes,
		color,
		disabled,
		size,
		marks,
		dragRange,
		groupLabel,
		getThumbLabel,
		onThumbFocus,
		onThumbBlur
	}: {
		id: string;
		slider: SliderState;
		classes: SliderClasses;
		color: Colors;
		disabled?: boolean;
		size?: Sizes;
		marks: SliderMark[];
		dragRange: boolean;
		groupLabel?: string;
		getThumbLabel: (index: number) => string | undefined;
		onThumbFocus: (index: number) => void;
		onThumbBlur: () => void;
	} = $props();

	const drag = new SliderDragEngine({
		getSlider: () => slider,
		isDisabled: () => !!disabled,
		isRangeDragEnabled: () => dragRange,
		onThumbFocus: (index) => onThumbFocus(index),
		onThumbBlur: () => onThumbBlur()
	});

	const instructionsId = $derived(`${id}-instructions`);
	const instructions = $derived(
		slider.isRange
			? 'Use arrow keys to adjust the active thumb. Shift plus arrow keys move by a larger step.'
			: 'Use arrow keys to adjust the value. Shift plus arrow keys move by a larger step.'
	);
	const rangeStyle = $derived(
		slider.orientationValue === 'vertical'
			? `bottom: ${slider.startPercentage}%; height: ${Math.max(0, slider.endPercentage - slider.startPercentage)}%;`
			: `left: ${slider.startPercentage}%; width: ${Math.max(0, slider.endPercentage - slider.startPercentage)}%;`
	);
</script>

<div class={slider.orientationValue === 'vertical' ? 'relative w-auto' : 'relative w-full'}>
	<span id={instructionsId} class="sr-only">{instructions}</span>
	<div
		{@attach drag.track}
		role="group"
		class={classes.track({
			orientation: slider.orientationValue,
			color,
			disabled
		})}
		aria-label={groupLabel}
		aria-disabled={disabled}
		aria-describedby={instructionsId}
	>
		<div class={classes.trackBackground({ orientation: slider.orientationValue })}></div>
		<div
			{@attach drag.range}
			role="presentation"
			class={classes.range({
				orientation: slider.orientationValue,
				dragRange: dragRange && slider.isRange
			})}
			style={rangeStyle}
		></div>

		{#each slider.valuePayloads as payload (payload.index)}
			<SliderThumb
				id={payload.index === 0 ? id : `${id}-thumb-${payload.index}`}
				{payload}
				label={getThumbLabel(payload.index)}
				describedBy={instructionsId}
				orientation={slider.orientationValue}
				{disabled}
				{size}
				{classes}
				attachment={drag.thumb(payload.index)}
			/>
		{/each}
	</div>

	<SliderMarks {marks} {slider} {classes} {size} />
</div>
