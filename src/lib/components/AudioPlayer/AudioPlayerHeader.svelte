<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type {
		AudioPlayerControl,
		AudioPlayerLayout,
		AudioPlayerSource,
		AudioPlayerTimeVariant
	} from './audioPlayer.props.js';
	import type { AudioPlayerState } from './audioPlayer.state.svelte.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import AudioPlayerControlsRegion from './AudioPlayerControlsRegion.svelte';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;
	type AudioPlayerSlot = Snippet<[AudioPlayerState]>;

	let {
		player,
		classes,
		size,
		color,
		layout,
		showControls,
		title,
		artist,
		artwork,
		header,
		controlsSlot,
		leading,
		trailing,
		controls,
		src,
		sources,
		download,
		timeVariant,
		seekStep,
		volumeStep,
		disabled
	}: {
		player: AudioPlayerState;
		classes: AudioPlayerClasses;
		size: Sizes;
		color: Colors;
		layout: AudioPlayerLayout;
		showControls: boolean;
		title: string;
		artist?: string;
		artwork?: string | false;
		header?: AudioPlayerSlot;
		controlsSlot?: AudioPlayerSlot;
		leading?: AudioPlayerSlot;
		trailing?: AudioPlayerSlot;
		controls: AudioPlayerControl[];
		src?: string;
		sources: AudioPlayerSource[];
		download: boolean | string;
		timeVariant: AudioPlayerTimeVariant;
		seekStep: number;
		volumeStep: number;
		disabled: boolean;
	} = $props();
</script>

{#if header}
	<div data-slot="audio-player-header" class={classes.header({ size })}>
		{@render header(player)}
	</div>
{:else}
	<div data-slot="audio-player-header" class={classes.header({ size })}>
		{#if leading}
			{@render leading(player)}
		{/if}

		{#if artwork}
			<div data-slot="audio-player-artwork" class={classes.artwork({ size })}>
				<img src={artwork} alt="" class={classes.artworkImage()} />
			</div>
		{/if}

		<div data-slot="audio-player-meta" class={classes.meta()}>
			<p data-slot="audio-player-title" class={classes.title({ size })}>{title}</p>
			{#if artist}
				<p data-slot="audio-player-artist" class={classes.artist({ size })}>{artist}</p>
			{/if}
		</div>

		{#if showControls}
			<AudioPlayerControlsRegion
				{player}
				{classes}
				{size}
				{color}
				{layout}
				{controlsSlot}
				{controls}
				{src}
				{sources}
				{download}
				{timeVariant}
				{seekStep}
				{volumeStep}
				{disabled}
			/>
		{/if}

		{#if showControls && trailing}
			{@render trailing(player)}
		{/if}
	</div>
{/if}
