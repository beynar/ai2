<script lang="ts">
	import type { Slot } from '$lib/components/Slot/slot.js';
	import type { Sizes } from '$lib/types/theme.js';
	import AspectRatio from '../AspectRatio/AspectRatio.svelte';
	import type { AspectRatioRatio } from '../AspectRatio/aspectRatio.props.js';
	import SlotComponent from '../Slot/Slot.svelte';
	import type {
		VideoPlayerCrossOrigin,
		VideoPlayerPreload,
		VideoPlayerSource,
		VideoPlayerTrack
	} from './videoPlayer.props.js';
	import type { VideoPlayerState } from './videoPlayer.state.svelte.js';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;

	let {
		state,
		classes,
		size,
		ratio,
		src,
		srcType,
		sources,
		tracks,
		poster,
		title,
		label,
		preload,
		crossOrigin,
		playsInline,
		autoplay,
		nativeControls,
		muted,
		loop,
		disabled,
		children
	}: {
		state: VideoPlayerState;
		classes: VideoPlayerClasses;
		size: Sizes;
		ratio: AspectRatioRatio | 'auto';
		src?: string;
		srcType?: string;
		sources: VideoPlayerSource[];
		tracks: VideoPlayerTrack[];
		poster?: string;
		title?: string;
		label: string;
		preload: VideoPlayerPreload;
		crossOrigin?: VideoPlayerCrossOrigin;
		playsInline: boolean;
		autoplay: boolean;
		nativeControls: boolean;
		muted: boolean;
		loop: boolean;
		disabled: boolean;
		children?: Slot;
	} = $props();

	const frameRatio = $derived(
		state.actualFullscreen ? 'fullscreen' : ratio === 'auto' ? 'auto' : 'fixed'
	);
	const shouldUseAspectRatio = $derived(ratio !== 'auto' && !state.actualFullscreen);
	const aspectRatio = $derived<AspectRatioRatio>(ratio === 'auto' ? '16x9' : ratio);
</script>

{#snippet media()}
	<div data-slot="video-player-frame" class={classes.frame({ ratio: frameRatio })}>
		<video
			bind:this={state.mediaElement}
			data-slot="video-player-media"
			class={classes.media({ disabled })}
			{poster}
			{preload}
			crossorigin={crossOrigin}
			playsinline={playsInline}
			{autoplay}
			controls={nativeControls && !disabled}
			{muted}
			{loop}
			{title}
			aria-label={label}
			onloadstart={state.handleLoadStart}
			onloadedmetadata={state.handleLoadedMetadata}
			onloadeddata={state.handleCanPlay}
			oncanplay={state.handleCanPlay}
			onwaiting={state.handleWaiting}
			onstalled={state.handleWaiting}
			onplay={state.handlePlay}
			onplaying={state.handlePlaying}
			onpause={state.handlePause}
			onended={state.handleEnded}
			ontimeupdate={state.handleTimeUpdate}
			onprogress={state.handleProgress}
			ondurationchange={state.handleDurationChange}
			onvolumechange={state.handleVolumeChange}
			onratechange={state.handleRateChange}
			onerror={state.handleError}
		>
			{#if src}
				<source {src} type={srcType} />
			{/if}
			{#each sources as source (source.src)}
				<source src={source.src} type={source.type} media={source.media} />
			{/each}
			{#each tracks as track (track.src)}
				<track
					id={track.id}
					src={track.src}
					kind={track.kind}
					srclang={track.srclang}
					label={track.label}
					default={track.default}
				/>
			{/each}
			<SlotComponent render={children} />
		</video>
	</div>
{/snippet}

{#if shouldUseAspectRatio}
	<AspectRatio ratio={aspectRatio} class={classes.aspectRatio({ size })}>
		{@render media()}
	</AspectRatio>
{:else}
	{@render media()}
{/if}
