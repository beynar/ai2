<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import type { Attachment } from 'svelte/attachments';
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
		size?: Sizes;
		classes: SliderClasses;
		attachment: Attachment<HTMLButtonElement>;
	} = $props();
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
		size
	})}
	style={orientation === 'vertical'
		? `bottom: ${payload.percentage}%;`
		: `left: ${payload.percentage}%;`}
></button>
