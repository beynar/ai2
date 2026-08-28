<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import type { AudioPlayerTimeVariant } from './audioPlayer.props.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import { formatAudioPlayerTime } from './audioPlayer.time.js';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;

	let {
		classes,
		size,
		currentTime,
		duration,
		variant
	}: {
		classes: AudioPlayerClasses;
		size: Sizes;
		currentTime: number;
		duration: number;
		variant: AudioPlayerTimeVariant;
	} = $props();

	const text = $derived(formatAudioPlayerTime(currentTime, duration, variant));
</script>

<span data-slot="audio-player-time" class={classes.time({ size })}>{text}</span>
