<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Sizes } from '$lib/types/theme.js';
	import { speakerHighIcon } from '../Icons/speakerHigh.js';
	import { speakerLowIcon } from '../Icons/speakerLow.js';
	import { speakerSlashIcon } from '../Icons/speakerSlash.js';
	import Popover from '../Popover/Popover.svelte';
	import type { VideoPlayerState } from './videoPlayer.state.svelte.js';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';
	import VideoPlayerIconButton from './VideoPlayerIconButton.svelte';
	import VideoPlayerSlider from './VideoPlayerSlider.svelte';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;

	let {
		player,
		classes,
		size,
		disabled,
		volumeStep,
		onOverlayOpenChange
	}: {
		player: VideoPlayerState;
		classes: VideoPlayerClasses;
		size: Sizes;
		disabled: boolean;
		volumeStep: number;
		onOverlayOpenChange: (open: boolean) => void;
	} = $props();

	let open = $state(false);
	let lastReportedOpen = false;

	const volumeLabel = $derived(
		player.muted || player.volume === 0 ? 'Unmute' : `Volume ${Math.round(player.volume * 100)}%`
	);
	const volumeIcon = $derived(
		player.muted || player.volume === 0
			? speakerSlashIcon
			: player.volume < 0.5
				? speakerLowIcon
				: speakerHighIcon
	);

	$effect(() => {
		if (disabled) open = false;
	});
	$effect(() => {
		if (lastReportedOpen === open) return;
		lastReportedOpen = open;
		onOverlayOpenChange(open);
	});
	onDestroy(() => {
		if (lastReportedOpen) onOverlayOpenChange(false);
	});
</script>

<Popover
	bind:open
	position="top"
	offset={8}
	lockScroll={false}
	closeOnClickOutside
	closeOnEscape
	mobileSheet
	class={classes.popoverPanel({ className: 'p-2' })}
>
	{#snippet trigger(popover)}
		<VideoPlayerIconButton
			{classes}
			{size}
			label={volumeLabel}
			icon={volumeIcon}
			active={player.muted || player.volume === 0}
			{disabled}
			aria-haspopup="dialog"
			aria-expanded={popover.isOpen}
			onClick={() => popover.toggle()}
			{@attach popover.reference}
		/>
	{/snippet}

	{#snippet children()}
		<div class={classes.volumePanel()}>
			<VideoPlayerIconButton
				{classes}
				{size}
				label={player.muted || player.volume === 0 ? 'Unmute' : 'Mute'}
				icon={volumeIcon}
				active={player.muted || player.volume === 0}
				pressed={player.muted || player.volume === 0}
				{disabled}
				onClick={() => player.runInteraction(() => player.toggleMuted())}
			/>
			<VideoPlayerSlider
				{classes}
				{size}
				label="Volume"
				value={player.muted ? 0 : player.volume * 100}
				min={0}
				max={100}
				step={Math.max(1, volumeStep * 100)}
				{disabled}
				showValue
				format={(value) => `${Math.round(value)}%`}
				onChange={(value) => player.runInteraction(() => player.setVolume(value / 100))}
			/>
		</div>
	{/snippet}
</Popover>
