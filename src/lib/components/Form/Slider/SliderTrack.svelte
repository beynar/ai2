<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import type { Messages } from '$lib/i18n/en.js';
	import type { SliderMark, SliderVariant } from './slider.props.js';
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
		variant,
		size,
		marks,
		groupLabel,
		getThumbLabel,
		t
	}: {
		id: string;
		slider: SliderState;
		classes: SliderClasses;
		color: Colors;
		variant: SliderVariant;
		size?: Sizes;
		marks: SliderMark[];
		groupLabel?: string;
		getThumbLabel: (index: number) => string | undefined;
		t: Messages;
	} = $props();

	const getThickThumbHalfSize = () => {
		if (size === 'small') return '10px';
		if (size === 'large') return '18px';
		return '14px';
	};
	const getThickThumbSize = () => {
		if (size === 'small') return '20px';
		if (size === 'large') return '36px';
		return '28px';
	};
	const getThickEdgeInset = () => '2px';
	const getThickRangeMinimum = () =>
		`calc(${getThickThumbSize()} + ${getThickEdgeInset()} + ${getThickEdgeInset()})`;
	const getThickRangeEndOffset = () => `calc(${getThickThumbHalfSize()} + ${getThickEdgeInset()})`;
	const instructionsId = $derived(`${id}-instructions`);
	const instructions = $derived(
		slider.isRange ? t.sliderInstructionsRange : t.sliderInstructionsSingle
	);
	const shouldFillFromStart = $derived(!slider.isRange && variant === 'thick');
	const rangeStartPercentage = $derived(
		slider.isRange || !shouldFillFromStart ? slider.startPercentage : 0
	);
	const rangeEndPercentage = $derived(
		slider.isRange || !shouldFillFromStart ? slider.endPercentage : slider.valuePayload.percentage
	);
	const rangeLengthPercentage = $derived(Math.max(0, rangeEndPercentage - rangeStartPercentage));
	const getRangeLength = () => {
		if (!shouldFillFromStart) return `${rangeLengthPercentage}%`;
		return `clamp(${getThickRangeMinimum()}, calc(${rangeLengthPercentage}% + ${getThickRangeEndOffset()}), 100%)`;
	};
	const rangeStyle = $derived(
		slider.orientationValue === 'vertical'
			? `bottom: ${rangeStartPercentage}%; height: ${getRangeLength()};`
			: `left: ${rangeStartPercentage}%; width: ${getRangeLength()};`
	);
</script>

<div class={slider.orientationValue === 'vertical' ? 'relative w-auto' : 'relative w-full'}>
	<span id={instructionsId} class="sr-only">{instructions}</span>
	<div
		{@attach slider.track}
		role="group"
		class={classes.track({
			orientation: slider.orientationValue,
			size,
			color,
			variant,
			disabled: slider.disabled
		})}
		aria-label={groupLabel}
		aria-disabled={slider.disabled}
		aria-describedby={instructionsId}
	>
		<div class={classes.trackBackground({ orientation: slider.orientationValue, variant })}></div>
		<div
			{@attach slider.range}
			role="presentation"
			class={classes.range({
				orientation: slider.orientationValue,
				variant,
				size,
				dragRange: !!slider.dragRange && slider.isRange
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
				disabled={slider.disabled}
				{variant}
				{color}
				{size}
				{classes}
				attachment={slider.thumb(payload.index)}
				hitboxAttachment={slider.thumbHitbox(payload.index)}
			/>
		{/each}
	</div>

	<SliderMarks {marks} {slider} {classes} {size} />
</div>
