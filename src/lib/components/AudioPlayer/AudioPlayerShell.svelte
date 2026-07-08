<script lang="ts">
	import type { Slot } from '$lib/components/Slot/slot.js';
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type {
		AudioPlayerControl,
		AudioPlayerCrossOrigin,
		AudioPlayerPreload,
		AudioPlayerSource,
		AudioPlayerTimeVariant,
		AudioPlayerVariant,
		AudioPlayerWaveformVariant
	} from './audioPlayer.props.js';
	import type { AudioPlayerState } from './audioPlayer.state.svelte.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import AudioPlayerHeader from './AudioPlayerHeader.svelte';
	import AudioPlayerMedia from './AudioPlayerMedia.svelte';
	import AudioPlayerSeek from './AudioPlayerSeek.svelte';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;
	type AudioPlayerSlot = Snippet<[AudioPlayerState]>;

	let {
		player,
		classes,
		size,
		color,
		disabled,
		className,
		attachments,
		keyboardShortcuts,
		hasSource,
		resolvedLabel,
		src,
		srcType,
		sources,
		preload,
		crossOrigin,
		autoplay,
		muted,
		loop,
		children,
		title,
		artist,
		artwork,
		header,
		controlsSlot,
		leading,
		trailing,
		controls,
		download,
		timeVariant,
		seekStep,
		volumeStep,
		variant,
		waveformVariant,
		waveformSamples,
		seek
	}: {
		player: AudioPlayerState;
		classes: AudioPlayerClasses;
		size: Sizes;
		color: Colors;
		disabled: boolean;
		className?: string;
		attachments: Record<string, unknown>;
		keyboardShortcuts: boolean;
		hasSource: boolean;
		resolvedLabel: string;
		src?: string;
		srcType?: string;
		sources: AudioPlayerSource[];
		preload: AudioPlayerPreload;
		crossOrigin?: AudioPlayerCrossOrigin;
		autoplay: boolean;
		muted: boolean;
		loop: boolean;
		children?: Slot;
		title: string;
		artist?: string;
		artwork?: string | false;
		header?: AudioPlayerSlot;
		controlsSlot?: AudioPlayerSlot;
		leading?: AudioPlayerSlot;
		trailing?: AudioPlayerSlot;
		controls: AudioPlayerControl[];
		download: boolean | string;
		timeVariant: AudioPlayerTimeVariant;
		seekStep: number;
		volumeStep: number;
		variant: AudioPlayerVariant;
		waveformVariant: AudioPlayerWaveformVariant;
		waveformSamples: number[];
		seek?: AudioPlayerSlot;
	} = $props();

	function handleRootKeydown(event: KeyboardEvent) {
		if (keyboardShortcuts) player.handleKeydown(event);
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={player.rootElement}
	data-slot="audio-player"
	data-color={color}
	data-state={player.state}
	data-paused={player.paused ? 'true' : undefined}
	data-muted={player.muted ? 'true' : undefined}
	role="region"
	aria-label={resolvedLabel}
	tabindex={keyboardShortcuts && !disabled ? 0 : undefined}
	class={classes.root({ size, disabled, className })}
	onkeydown={handleRootKeydown}
	{...attachments}
>
	<AudioPlayerMedia
		{player}
		{src}
		{srcType}
		{sources}
		{preload}
		{crossOrigin}
		{autoplay}
		{muted}
		{loop}
		label={resolvedLabel}
		{children}
	/>

	<AudioPlayerHeader
		{player}
		{classes}
		{size}
		{color}
		{title}
		{artist}
		{artwork}
		{header}
		{controlsSlot}
		{leading}
		{trailing}
		{controls}
		{src}
		{sources}
		{download}
		{timeVariant}
		{seekStep}
		{volumeStep}
		{disabled}
	/>

	<AudioPlayerSeek
		{player}
		{classes}
		{size}
		{color}
		{variant}
		{waveformVariant}
		{waveformSamples}
		disabled={disabled || !hasSource}
		{title}
		{seek}
	/>

	{#if player.state === 'loading' && hasSource}
		<p data-slot="audio-player-status" class={classes.status({ size, tone: 'loading' })}>
			Loading audio...
		</p>
	{:else if player.state === 'error'}
		<p data-slot="audio-player-status" class={classes.status({ size, tone: 'error' })}>
			{player.errorMessage}
		</p>
	{/if}
</div>
