<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import type { VideoPlayerTimeVariant } from './videoPlayer.props.js';
	import { formatVideoPlayerTime } from './videoPlayer.time.js';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;

	let {
		classes,
		size,
		currentTime,
		duration,
		variant
	}: {
		classes: VideoPlayerClasses;
		size: Sizes;
		currentTime: number;
		duration: number;
		variant: VideoPlayerTimeVariant;
	} = $props();

	const displayedTime = $derived(
		variant === 'duration'
			? duration
			: variant === 'remaining'
				? Math.max(0, duration - currentTime)
				: currentTime
	);
</script>

<span data-slot="video-player-time" class={classes.time({ size })}>
	{formatVideoPlayerTime(displayedTime, variant)}
	{#if variant === 'elapsed'}
		<span aria-hidden="true"> / {formatVideoPlayerTime(duration, 'duration')}</span>
	{/if}
</span>
