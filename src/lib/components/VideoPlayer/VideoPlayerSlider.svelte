<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import Slider from '../Form/Slider/Slider.svelte';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;

	let {
		classes,
		size,
		label,
		value,
		min = 0,
		max = 100,
		step = 1,
		buffered,
		disabled = false,
		showValue = false,
		format = (nextValue: number) => `${nextValue}`,
		onChange
	}: {
		classes: VideoPlayerClasses;
		size: Sizes;
		label: string;
		value: number;
		min?: number;
		max?: number;
		step?: number;
		buffered?: number;
		disabled?: boolean;
		showValue?: boolean;
		format?: (value: number) => string;
		onChange: (value: number) => void;
	} = $props();

	const maxValue = $derived(Math.max(min, max));
	const bufferedPercentage = $derived.by(() => {
		if (!buffered || maxValue <= min) return 0;
		return Math.min(100, Math.max(0, ((buffered - min) / (maxValue - min)) * 100));
	});
	const bufferedStyle = $derived(`--video-player-slider-buffered: ${bufferedPercentage}%;`);
	const sliderTheme = $derived({
		root: {
			base: 'w-full gap-0'
		},
		header: {
			base: 'sr-only'
		},
		label: {
			base: 'sr-only'
		},
		inputContainer: {
			base: 'w-full gap-0 text-white'
		},
		control: {
			base: 'w-full gap-2'
		},
		track: {
			base: 'min-w-0 text-primary focus-visible:ring-white/60 focus-visible:ring-offset-0'
		},
		trackBackground: {
			base: 'bg-white/25 [background:linear-gradient(to_right,rgba(255,255,255,0.35)_0_var(--video-player-slider-buffered),rgba(255,255,255,0.25)_var(--video-player-slider-buffered)_100%)]'
		},
		range: {
			base: 'bg-primary'
		},
		valueLabels: {
			base: 'ml-1'
		},
		valueLabel: {
			base: 'border-white/10 bg-white/10 text-white/90'
		}
	});

	function handleChange(nextValue: number | number[]) {
		onChange(Array.isArray(nextValue) ? (nextValue[0] ?? min) : nextValue);
	}
</script>

<div
	data-slot="video-player-slider"
	class={classes.slider({ size, disabled })}
	style={bufferedStyle}
>
	<Slider
		{label}
		{value}
		{min}
		max={maxValue}
		{step}
		{disabled}
		{showValue}
		formatValue={(nextValue) => format(nextValue)}
		thumbLabels={[label]}
		color="primary"
		variant="thick"
		{size}
		theme={sliderTheme}
		onChange={handleChange}
	/>
</div>
