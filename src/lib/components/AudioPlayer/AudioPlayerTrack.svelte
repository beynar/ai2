<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import { formatAudioPlayerTime } from './audioPlayer.time.js';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;

	let {
		classes,
		size,
		color,
		currentTime,
		duration,
		buffered,
		disabled = false,
		label,
		onSeek
	}: {
		classes: AudioPlayerClasses;
		size: Sizes;
		color: Colors;
		currentTime: number;
		duration: number;
		buffered: number;
		disabled?: boolean;
		label: string;
		onSeek: (time: number) => void;
	} = $props();

	const maxValue = $derived(Math.max(0, duration));
	const currentValue = $derived(clamp(currentTime, 0, maxValue));
	const progressPercentage = $derived(maxValue > 0 ? (currentValue / maxValue) * 100 : 0);
	const bufferedPercentage = $derived(
		maxValue > 0 ? (clamp(buffered, 0, maxValue) / maxValue) * 100 : 0
	);
	const disabledInput = $derived(disabled || maxValue <= 0);
	const formattedValue = $derived(formatAudioPlayerTime(currentValue, maxValue));

	function handleInput(event: Event) {
		const input = event.currentTarget;
		if (!(input instanceof HTMLInputElement)) return;
		onSeek(Number(input.value));
	}

	function clamp(value: number, min: number, max: number) {
		return Math.min(max, Math.max(min, value));
	}
</script>

<div
	data-slot="audio-player-track"
	data-color={color}
	class={classes.track({ size, disabled: disabledInput })}
>
	<span
		data-slot="audio-player-track-buffered"
		class={classes.trackBuffered({ size })}
		style={`width: ${bufferedPercentage}%;`}
	></span>
	<span
		data-slot="audio-player-track-range"
		data-color={color}
		class={classes.trackRange({ size })}
		style={`width: ${progressPercentage}%;`}
	></span>

	<input
		data-slot="audio-player-track-input"
		class={classes.trackInput()}
		type="range"
		aria-label={label}
		aria-valuetext={formattedValue}
		min={0}
		max={maxValue}
		step={0.1}
		value={currentValue}
		disabled={disabledInput}
		oninput={handleInput}
		onchange={handleInput}
	/>
</div>
