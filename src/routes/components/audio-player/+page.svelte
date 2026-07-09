<script lang="ts">
	import { AudioPlayer, type AudioPlayerState } from '$lib/components/AudioPlayer/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import { Slider } from '$lib/components/Form/Slider/index.js';
	import { pauseIcon } from '$lib/components/Icons/pause.js';
	import { playIcon } from '$lib/components/Icons/play.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import AudioPlayerDropDemo from './AudioPlayerDropDemo.svelte';
	import {
		basicCode,
		controlledCode,
		controlledWaveform,
		customSeekTheme,
		dropUploadCode,
		formatTime,
		histogramCode,
		histogramWaveform,
		sampleAudio,
		slotCode,
		trackCode,
		trackControls,
		transportControls
	} from './audioPlayerDemoData.js';

	let paused = $state(true);
	let currentTime = $state(0);
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
		'Block and inline layout modes',
		'Automatic waveform generation from the audio source',
		'Local MP3 drop example with object URL playback',
		'Centered and histogram waveform shapes',
		'Popover volume control with vertical slider',
		'Color prop for controls, volume, and progress fill',
		'Controls prop toggles transport, time, volume, loop, and download',
		'Header, controls, leading, trailing, and seek snippets receive AudioPlayerState',
		'Artwork is hidden when omitted',
		'Theme parts for chrome, waveform, controls, and metadata'
	]}
>
	<ComponentCard
		description="Default chrome generates waveform peaks from the audio source when samples are omitted."
		class="!min-h-fit !items-stretch !justify-start"
		code={basicCode}
	>
		<AudioPlayer src={sampleAudio} title="Field recording" artist="Svelai archives" />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Drop a local MP3 file to play it through the player and generate the waveform in the browser."
			class="!min-h-fit !items-stretch !justify-start"
			code={dropUploadCode}
		>
			<AudioPlayerDropDemo />
		</ComponentCard>

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
			description="Inline layout places controls beside the track when there is room."
			class="!min-h-fit !items-stretch !justify-start"
			code={trackCode}
		>
			<AudioPlayer
				src={sampleAudio}
				title="Track progress"
				artist="No artwork fallback"
				variant="track"
				layout="inline"
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
