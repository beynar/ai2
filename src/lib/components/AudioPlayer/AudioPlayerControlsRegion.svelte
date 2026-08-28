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
	import AudioPlayerControls from './AudioPlayerControls.svelte';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;

	let {
		player,
		classes,
		size,
		color,
		layout,
		controlsSlot,
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
		controlsSlot?: Snippet<[AudioPlayerState]>;
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

{#if controlsSlot}
	{@render controlsSlot(player)}
{:else}
	<AudioPlayerControls
		{player}
		{classes}
		{size}
		{color}
		{layout}
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
