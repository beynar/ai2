<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import { Slider } from '../Form/Slider/index.js';
	import { speakerHighIcon } from '../Icons/speakerHigh.js';
	import { speakerSlashIcon } from '../Icons/speakerSlash.js';
	import type { AudioPlayerState } from './audioPlayer.state.svelte.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import AudioPlayerIconButton from './AudioPlayerIconButton.svelte';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;

	let {
		player,
		classes,
		size,
		color,
		volumeStep,
		disabled = false
	}: {
		player: AudioPlayerState;
		classes: AudioPlayerClasses;
		size: Sizes;
		color: Colors;
		volumeStep: number;
		disabled?: boolean;
	} = $props();

	const volumeValue = $derived(player.muted ? 0 : player.volume * 100);
	const volumeIcon = $derived(
		player.muted || player.volume === 0 ? speakerSlashIcon : speakerHighIcon
	);
	const sliderTheme = $derived({
		root: {
			base: 'w-full gap-0'
		},
		header: {
			base: 'sr-only'
		},
		label: {
			base: 'sr-only'
		},
		inputContainer: {
			base: 'w-full gap-0'
		},
		control: {
			base: 'w-full gap-2'
		},
		track: {
			base: 'min-w-0 focus-visible:ring-offset-0'
		},
		valueLabels: {
			base: 'ml-1'
		},
		valueLabel: {
			base: 'border-background-muted bg-background text-foreground'
		}
	});

	function handleChange(nextValue: number | number[]) {
		const nextVolume = Array.isArray(nextValue) ? (nextValue[0] ?? 0) : nextValue;
		player.runInteraction(() => player.setVolume(nextVolume / 100));
	}
</script>

<div data-slot="audio-player-volume-control" class={classes.volumeControl()}>
	<AudioPlayerIconButton
		{classes}
		{size}
		{color}
		label={player.muted || player.volume === 0 ? 'Unmute' : 'Mute'}
		icon={volumeIcon}
		active={player.muted || player.volume === 0}
		pressed={player.muted || player.volume === 0}
		{disabled}
		onClick={() => player.runInteraction(() => player.toggleMuted())}
	/>

	<div data-slot="audio-player-volume-slider" class={classes.volumeSlider()}>
		<Slider
			label="Volume"
			value={volumeValue}
			min={0}
			max={100}
			step={Math.max(1, volumeStep * 100)}
			{disabled}
			showValue
			formatValue={(value) => `${Math.round(value)}%`}
			thumbLabels={['Volume']}
			{color}
			variant="thick"
			{size}
			theme={sliderTheme}
			onChange={handleChange}
		/>
	</div>
</div>
