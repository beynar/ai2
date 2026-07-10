<script lang="ts">
	import type { Colors, Sizes } from '$lib/types/theme.js';
	import { speakerHighIcon } from '../Icons/speakerHigh.js';
	import MediaVolumeControl from '../MediaVolume/MediaVolumeControl.svelte';
	import type { AudioPlayerLayout } from './audioPlayer.props.js';
	import type { AudioPlayerState } from './audioPlayer.state.svelte.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';
	import AudioPlayerIconButton from './AudioPlayerIconButton.svelte';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;

	let {
		player,
		classes,
		size,
		color,
		layout,
		volumeStep,
		disabled = false
	}: {
		player: AudioPlayerState;
		classes: AudioPlayerClasses;
		size: Sizes;
		color: Colors;
		layout: AudioPlayerLayout;
		volumeStep: number;
		disabled?: boolean;
	} = $props();

	const sliderTheme = $derived({
		root: {
			base: 'w-auto justify-items-center gap-0'
		},
		header: {
			base: 'sr-only'
		},
		label: {
			base: 'sr-only'
		},
		inputContainer: {
			base: 'w-auto gap-0'
		},
		control: {
			base: 'w-auto flex-col items-center gap-2'
		},
		track: {
			base: 'h-36 focus-visible:ring-offset-0'
		},
		valueLabels: {
			base: 'mt-1 ml-0 justify-center'
		},
		valueLabel: {
			base: 'min-w-14 border-background-muted bg-background text-center text-foreground'
		}
	});
</script>

<MediaVolumeControl
	volume={player.volume}
	muted={player.muted}
	{size}
	{color}
	{volumeStep}
	{disabled}
	position="top"
	lowVolumeIcon={speakerHighIcon}
	class={classes.volumeControl({ layout })}
	popoverClass={classes.popoverPanel({ className: 'p-1.5 pb-2.5' })}
	panelClass={classes.volumePanel({
		size,
		className: 'w-auto justify-center gap-1.5 px-0 pt-0.5 pb-0'
	})}
	sliderClass={classes.volumeSlider({ size, className: 'h-auto' })}
	{sliderTheme}
	onToggleMuted={() => player.runInteraction(() => player.toggleMuted())}
	onVolumeChange={(nextVolume) => player.runInteraction(() => player.setVolume(nextVolume))}
>
	{#snippet trigger(context)}
		<AudioPlayerIconButton
			{classes}
			{size}
			{color}
			label={context.label}
			icon={context.icon}
			active={context.active}
			{disabled}
			aria-haspopup={context.ariaHaspopup}
			aria-expanded={context.ariaExpanded}
			onClick={context.onClick}
			{@attach context.reference}
		/>
	{/snippet}

	{#snippet toggleButton(context)}
		<AudioPlayerIconButton
			{classes}
			{size}
			{color}
			label={context.label}
			icon={context.icon}
			active={context.active}
			pressed={context.pressed}
			{disabled}
			onClick={context.onClick}
		/>
	{/snippet}
</MediaVolumeControl>
