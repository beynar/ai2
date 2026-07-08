<script lang="ts">
	import SlotComponent from '../Slot/Slot.svelte';
	import { musicNotesIcon } from '../Icons/musicNotes.js';
	import {
		AUDIO_PLAYER_DEFAULT_CONTROLS as DEFAULT_CONTROLS,
		type AudioPlayerError,
		type AudioPlayerProps as Props,
		type AudioPlayerSnapshot
	} from './audioPlayer.props.js';
	import AudioPlayerControls from './AudioPlayerControls.svelte';
	import AudioPlayerMedia from './AudioPlayerMedia.svelte';
	import AudioPlayerWaveform from './AudioPlayerWaveform.svelte';
	import { AudioPlayerState } from './audioPlayer.state.svelte.js';
	import { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import { getAudioPlayerWaveformSamples } from './audioPlayer.waveform.js';

	let {
		src,
		srcType,
		sources = [],
		title = 'Untitled audio',
		artist,
		artwork,
		label,
		preload = 'metadata',
		crossOrigin,
		autoplay = false,
		controls = DEFAULT_CONTROLS,
		waveform,
		waveformVariant = 'centered',
		waveformBars = 72,
		timeVariant = 'elapsed',
		download = true,
		disabled = false,
		size = 'normal',
		class: className,
		ref = $bindable<HTMLAudioElement | null>(null),
		rootRef = $bindable<HTMLDivElement | null>(null),
		currentTime = $bindable(0),
		duration = $bindable(0),
		buffered = $bindable(0),
		volume = $bindable(1),
		muted = $bindable(false),
		paused = $bindable(true),
		ended = $bindable(false),
		loop = $bindable(false),
		error = $bindable<AudioPlayerError | null>(null),
		keyboardShortcuts = true,
		seekStep = 10,
		volumeStep = 0.05,
		children,
		onPlay,
		onPause,
		onEnded,
		onTimeUpdate,
		onDurationChange,
		onVolumeChange,
		onLoopChange,
		onError,
		theme,
		...attachments
	}: Props = $props();

	const callbacks = $derived({
		onPlay,
		onPause,
		onEnded,
		onTimeUpdate,
		onDurationChange,
		onVolumeChange,
		onLoopChange,
		onError
	});

	const player = new AudioPlayerState({
		get currentTime() {
			return currentTime;
		},
		set currentTime(value: number) {
			currentTime = value;
		},
		get duration() {
			return duration;
		},
		set duration(value: number) {
			duration = value;
		},
		get buffered() {
			return buffered;
		},
		set buffered(value: number) {
			buffered = value;
		},
		get volume() {
			return volume;
		},
		set volume(value: number) {
			volume = value;
		},
		get muted() {
			return muted;
		},
		set muted(value: boolean) {
			muted = value;
		},
		get paused() {
			return paused;
		},
		set paused(value: boolean) {
			paused = value;
		},
		get ended() {
			return ended;
		},
		set ended(value: boolean) {
			ended = value;
		},
		get loop() {
			return loop;
		},
		set loop(value: boolean) {
			loop = value;
		},
		get error() {
			return error;
		},
		set error(value: AudioPlayerError | null) {
			error = value;
		},
		get disabled() {
			return disabled;
		},
		get seekStep() {
			return seekStep;
		},
		get volumeStep() {
			return volumeStep;
		},
		get callbacks() {
			return callbacks;
		}
	});

	const classes = $derived(useAudioPlayerTheme(theme));
	const hasSource = $derived(Boolean(src || sources.length || children));
	const resolvedLabel = $derived(label ?? title ?? 'Audio player');
	const sourceSignature = $derived(
		JSON.stringify({ src, srcType, sources, children: Boolean(children) })
	);
	const waveformSamples = $derived(
		getAudioPlayerWaveformSamples(waveform, waveformBars, `${src ?? ''}:${title}:${artist ?? ''}`)
	);

	let previousSourceSignature = $state('');

	export function play() {
		return player.play();
	}
	export function pause() {
		player.pause();
	}
	export function togglePlay() {
		return player.togglePlay();
	}
	export function load() {
		player.load();
	}
	export function seekTo(time: number) {
		player.seekTo(time);
	}
	export function seekBy(delta: number) {
		player.seekBy(delta);
	}
	export function setVolume(nextVolume: number) {
		player.setVolume(nextVolume);
	}
	export function setMuted(nextMuted: boolean) {
		player.setMuted(nextMuted);
	}
	export function setLoop(nextLoop: boolean) {
		player.setLoop(nextLoop);
	}
	export function getSnapshot(): AudioPlayerSnapshot {
		return player.snapshot;
	}

	function handleRootKeydown(event: KeyboardEvent) {
		if (keyboardShortcuts) player.handleKeydown(event);
	}

	$effect(() => {
		ref = player.mediaElement;
		rootRef = player.rootElement;
	});

	$effect(() => {
		player.syncMediaProperties();
	});

	$effect(() => {
		if (!previousSourceSignature) {
			previousSourceSignature = sourceSignature;
			return;
		}
		if (sourceSignature === previousSourceSignature) return;
		previousSourceSignature = sourceSignature;
		player.resetForSourceChange();
		player.mediaElement?.load();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={player.rootElement}
	data-slot="audio-player"
	data-state={player.state}
	data-paused={paused ? 'true' : undefined}
	data-muted={muted ? 'true' : undefined}
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

	<div data-slot="audio-player-header" class={classes.header({ size })}>
		<div data-slot="audio-player-artwork" class={classes.artwork({ size })}>
			{#if artwork}
				<img src={artwork} alt="" class={classes.artworkImage()} />
			{:else}
				<SlotComponent render={musicNotesIcon} as="span" class="size-5" />
			{/if}
		</div>

		<div data-slot="audio-player-meta" class={classes.meta()}>
			<p data-slot="audio-player-title" class={classes.title({ size })}>{title}</p>
			{#if artist}
				<p data-slot="audio-player-artist" class={classes.artist({ size })}>{artist}</p>
			{/if}
		</div>

		<AudioPlayerControls
			{player}
			{classes}
			{size}
			{controls}
			{src}
			{sources}
			{download}
			{timeVariant}
			{seekStep}
			{volumeStep}
			{disabled}
		/>
	</div>

	<AudioPlayerWaveform
		{classes}
		{size}
		variant={waveformVariant}
		samples={waveformSamples}
		currentTime={player.currentTime}
		duration={player.duration}
		buffered={player.buffered}
		disabled={disabled || !hasSource}
		label={`Seek ${title}`}
		onSeek={(time) => player.runInteraction(() => player.seekTo(time))}
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
