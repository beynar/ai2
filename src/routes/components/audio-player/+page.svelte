<script lang="ts">
	import {
		AudioPlayer,
		type AudioPlayerControl,
		type AudioPlayerState
	} from '$lib/components/AudioPlayer/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import { Slider } from '$lib/components/Form/Slider/index.js';
	import { pauseIcon } from '$lib/components/Icons/pause.js';
	import { playIcon } from '$lib/components/Icons/play.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const sampleAudio = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
	const trackControls: AudioPlayerControl[] = ['play', 'time', 'volume'];
	const transportControls: AudioPlayerControl[] = [
		'play',
		'seekBackward',
		'seekForward',
		'time',
		'loop'
	];

	let paused = $state(true);
	let currentTime = $state(0);

	const centeredWaveform = createWaveform(11, 80);
	const histogramWaveform = createWaveform(29, 64);
	const controlledWaveform = createWaveform(47, 72);
	const customSeekTheme = {
		root: { base: 'w-full gap-0' },
		header: { base: 'sr-only' },
		label: { base: 'sr-only' },
		inputContainer: { base: 'w-full gap-0' },
		control: { base: 'w-full' },
		track: { base: 'min-w-0 focus-visible:ring-offset-0' }
	};

	const basicCode = `<AudioPlayer
	src="${sampleAudio}"
	title="Field recording"
	artist="Svelai archives"
	waveform={waveform}
/>`;

	const histogramCode = `<AudioPlayer
	src="${sampleAudio}"
	title="Histogram mode"
	waveformVariant="histogram"
	waveform={waveform}
/>`;

	const trackCode = `<AudioPlayer
	src="${sampleAudio}"
	title="Track progress"
	variant="track"
	color="info"
	controls={['play', 'time', 'volume']}
/>`;

	const slotCode = `<script lang="ts">
	import { AudioPlayer } from '$lib/components/AudioPlayer/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import { Slider } from '$lib/components/Form/Slider/index.js';
	import { pauseIcon } from '$lib/components/Icons/pause.js';
	import { playIcon } from '$lib/components/Icons/play.js';
${'</' + 'script>'}

{#snippet controlsSlot(player)}
	<Button
		squared
		color="success"
		label={player.paused || player.ended ? 'Play' : 'Pause'}
		prefix={player.paused || player.ended ? playIcon : pauseIcon}
		onClick={() => player.runInteraction(() => player.togglePlay())}
	/>
{/snippet}

{#snippet seek(player)}
	<Slider
		label="Seek"
		value={player.currentTime}
		min={0}
		max={Math.max(player.duration, 0.1)}
		step={0.1}
		color="success"
		variant="thick"
		onChange={(value) => player.runInteraction(() => player.seekTo(Array.isArray(value) ? (value[0] ?? 0) : value))}
	/>
{/snippet}

<AudioPlayer
	src="${sampleAudio}"
	title="Custom chrome"
	variant="track"
	color="success"
	{controlsSlot}
	{seek}
/>`;

	const controlledCode = `<script lang="ts">
	let paused = $state(true);
	let currentTime = $state(0);
${'</' + 'script>'}

<AudioPlayer
	src="${sampleAudio}"
	title="Controlled playback"
	bind:paused
	bind:currentTime
	controls={['play', 'seekBackward', 'seekForward', 'time', 'loop']}
/>`;

	function createWaveform(seed: number, count: number) {
		return Array.from({ length: count }, (_, index) => {
			const position = count === 1 ? 0 : index / (count - 1);
			const envelope = 0.36 + Math.sin(position * Math.PI) * 0.56;
			const carrier = Math.sin((index + 1) * seed * 0.19);
			const accent = Math.sin((index + 5) * (seed + 4) * 0.11);
			return Math.min(
				1,
				Math.max(0.08, (0.2 + Math.abs(carrier * 0.68 + accent * 0.32)) * envelope)
			);
		});
	}

	function formatTime(value: number) {
		if (!Number.isFinite(value) || value <= 0) return '0:00';
		const minutes = Math.floor(value / 60);
		const seconds = Math.floor(value % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
</script>

{#snippet customControlsSlot(player: AudioPlayerState)}
	<div
		data-slot="audio-player-controls"
		class="flex min-w-0 flex-[1_1_100%] items-center justify-between gap-2 md:flex-[0_1_auto]"
	>
		<Button
			squared
			color="success"
			label={player.paused || player.ended ? 'Play' : 'Pause'}
			prefix={player.paused || player.ended ? playIcon : pauseIcon}
			disabled={player.disabled}
			onClick={() => player.runInteraction(() => player.togglePlay())}
		/>
		<span class="text-foreground-muted shrink-0 text-xs tabular-nums">
			{formatTime(player.currentTime)} / {formatTime(player.duration)}
		</span>
	</div>
{/snippet}

{#snippet customSeek(player: AudioPlayerState)}
	<Slider
		label="Seek custom chrome"
		value={Math.min(player.currentTime, Math.max(player.duration, 0.1))}
		min={0}
		max={Math.max(player.duration, 0.1)}
		step={0.1}
		color="success"
		variant="thick"
		size="small"
		disabled={player.disabled || player.duration <= 0}
		theme={customSeekTheme}
		onChange={(value) =>
			player.runInteraction(() => player.seekTo(Array.isArray(value) ? (value[0] ?? 0) : value))}
	/>
{/snippet}

<DocPage
	title="Audio player"
	subtitle="Native audio playback with waveform or track progress, composable chrome, and bindable state."
	component="AudioPlayer"
	features={[
		'Native audio element with bindable playback state',
		'Waveform and track progress variants',
		'Centered and histogram waveform shapes',
		'Color prop for controls, volume, and progress fill',
		'Controls prop toggles transport, time, volume, loop, and download',
		'Header, controls, leading, trailing, and seek snippets receive AudioPlayerState',
		'Artwork is hidden when omitted',
		'Theme parts for chrome, waveform, controls, and metadata'
	]}
>
	<ComponentCard
		description="Default chrome with a centered waveform, transport controls, volume, loop, and download."
		class="!min-h-fit !items-stretch !justify-start"
		code={basicCode}
	>
		<AudioPlayer
			src={sampleAudio}
			title="Field recording"
			artist="Svelai archives"
			waveform={centeredWaveform}
		/>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Histogram mode uses the same waveform as the clickable progress surface."
			class="!min-h-fit !items-stretch !justify-start"
			code={histogramCode}
		>
			<AudioPlayer
				src={sampleAudio}
				title="Histogram mode"
				artist="Waveform as progress"
				waveformVariant="histogram"
				waveform={histogramWaveform}
			/>
		</ComponentCard>

		<ComponentCard
			description="Track mode swaps the waveform for a simple progress surface while keeping the same controls."
			class="!min-h-fit !items-stretch !justify-start"
			code={trackCode}
		>
			<AudioPlayer
				src={sampleAudio}
				title="Track progress"
				artist="No artwork fallback"
				variant="track"
				color="info"
				controls={trackControls}
			/>
		</ComponentCard>

		<ComponentCard
			description="Slots can replace controls and the seek surface while still receiving player state."
			class="!min-h-fit !items-stretch !justify-start"
			code={slotCode}
		>
			<AudioPlayer
				src={sampleAudio}
				title="Custom chrome"
				artist="Snippet-composed controls"
				variant="track"
				color="success"
				controlsSlot={customControlsSlot}
				seek={customSeek}
			/>
		</ComponentCard>

		<ComponentCard
			description="Playback state can be bound while keeping the waveform interactive."
			class="!min-h-fit !items-stretch !justify-start"
			code={controlledCode}
		>
			<div class="grid w-full gap-3">
				<AudioPlayer
					src={sampleAudio}
					title="Controlled playback"
					artist="Bindable state"
					bind:paused
					bind:currentTime
					controls={transportControls}
					waveform={controlledWaveform}
				/>
				<p class="text-foreground-muted text-sm">
					{paused ? 'Paused' : 'Playing'} at {currentTime.toFixed(1)}s
				</p>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
