<script lang="ts">
	import { AudioPlayer, type AudioPlayerControl } from '$lib/components/AudioPlayer/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const sampleAudio = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
	const compactControls: AudioPlayerControl[] = ['play', 'time', 'volume'];
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

	const compactCode = `<AudioPlayer
	src="${sampleAudio}"
	title="Compact controls"
	controls={['play', 'time', 'volume']}
	size="small"
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
</script>

<DocPage
	title="Audio player"
	subtitle="Native audio playback with a waveform seek surface, compact controls, volume, loop, and download actions."
	component="AudioPlayer"
	features={[
		'Native audio element with bindable playback state',
		'Waveform doubles as the progress and seek control',
		'Centered and histogram waveform variants',
		'Controls prop toggles transport, time, volume, loop, and download',
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
		description="Controls can be reduced to the commands a surface needs."
		class="!min-h-fit !items-stretch !justify-start"
		code={compactCode}
	>
		<AudioPlayer
			src={sampleAudio}
			title="Compact controls"
			artist="No loop or download"
			controls={compactControls}
			waveformBars={48}
			size="small"
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
</DocPage>
