<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import type { Attachment } from 'svelte/attachments';
	import type { SliderVariant } from './slider.props.js';
	import type { SliderOrientation, SliderValuePayload } from './slider.state.svelte.js';
	import type { useSliderTheme } from './slider.theme.js';

	type SliderClasses = ReturnType<typeof useSliderTheme>;

	let {
		id,
		payload,
		label,
		describedBy,
		orientation,
		disabled,
		variant,
		color,
		size,
		classes,
		attachment
	}: {
		id: string;
		payload: SliderValuePayload;
		label?: string;
		describedBy?: string;
		orientation: SliderOrientation;
		disabled?: boolean;
		variant: SliderVariant;
		color: Colors;
		size?: Sizes;
		classes: SliderClasses;
		attachment: Attachment<HTMLButtonElement>;
	} = $props();

	const getThumbHalfSize = () => {
		if (variant === 'thick') {
			if (size === 'small') return '10px';
			if (size === 'large') return '18px';
			return '14px';
		}
		if (size === 'small') return '7px';
		if (size === 'large') return '10px';
		return '8px';
	};

	const getThickEdgeInset = () => '2px';
	const getThumbMinPosition = () => {
		const thumbHalfSize = getThumbHalfSize();
		if (variant !== 'thick') return thumbHalfSize;
		return `calc(${thumbHalfSize} + ${getThickEdgeInset()})`;
	};
	const getThumbMaxPosition = () => {
		const thumbHalfSize = getThumbHalfSize();
		if (variant !== 'thick') return `calc(100% - ${thumbHalfSize})`;
		return `calc(100% - ${thumbHalfSize} - ${getThickEdgeInset()})`;
	};

	const thumbPositionStyle = $derived.by(() => {
		const containedPosition = `clamp(${getThumbMinPosition()}, ${payload.percentage}%, ${getThumbMaxPosition()})`;
		return orientation === 'vertical'
			? `bottom: ${containedPosition};`
			: `left: ${containedPosition};`;
	});
</script>

<button
	{@attach attachment}
	{id}
	type="button"
	role="slider"
	data-slider-thumb
	aria-label={label}
	aria-describedby={describedBy}
	aria-orientation={orientation}
	aria-valuemin={payload.thumbMin}
	aria-valuemax={payload.thumbMax}
	aria-valuenow={payload.value}
	aria-valuetext={payload.formatted}
	{disabled}
	class={classes.thumb({
		orientation,
		disabled,
		variant,
		color,
		size
	})}
	style={thumbPositionStyle}
></button>
