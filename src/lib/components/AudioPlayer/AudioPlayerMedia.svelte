<script lang="ts">
	import SlotComponent from '../Slot/Slot.svelte';
	import type { Slot } from '../Slot/slot.js';
	import type {
		AudioPlayerCrossOrigin,
		AudioPlayerPreload,
		AudioPlayerSource
	} from './audioPlayer.props.js';
	import type { AudioPlayerState } from './audioPlayer.state.svelte.js';

	let {
		player,
		src,
		srcType,
		sources,
		preload,
		crossOrigin,
		autoplay,
		muted,
		loop,
		label,
		children
	}: {
		player: AudioPlayerState;
		src?: string;
		srcType?: string;
		sources: AudioPlayerSource[];
		preload: AudioPlayerPreload;
		crossOrigin?: AudioPlayerCrossOrigin;
		autoplay: boolean;
		muted: boolean;
		loop: boolean;
		label: string;
		children?: Slot;
	} = $props();
</script>

<audio
	bind:this={player.mediaElement}
	data-slot="audio-player-media"
	class="hidden"
	{preload}
	crossorigin={crossOrigin}
	{autoplay}
	{muted}
	{loop}
	aria-label={label}
	onloadstart={player.handleLoadStart}
	onloadedmetadata={player.handleLoadedMetadata}
	onloadeddata={player.handleCanPlay}
	oncanplay={player.handleCanPlay}
	onwaiting={player.handleWaiting}
	onstalled={player.handleWaiting}
	onplay={player.handlePlay}
	onplaying={player.handlePlaying}
	onpause={player.handlePause}
	onended={player.handleEnded}
	ontimeupdate={player.handleTimeUpdate}
	onprogress={player.handleProgress}
	ondurationchange={player.handleDurationChange}
	onvolumechange={player.handleVolumeChange}
	onerror={player.handleError}
>
	{#if src}
		<source {src} type={srcType} />
	{/if}
	{#each sources as source (source.src)}
		<source src={source.src} type={source.type} />
	{/each}
	<SlotComponent render={children} />
</audio>
