<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Slot } from '$lib/components/Slot/slot.js';
	import type { Sizes } from '$lib/types/theme.js';
	import type { MenuItem } from '../Menu/menu.props.js';
	import { checkIcon } from '../Icons/check.js';
	import { closedCaptioningIcon } from '../Icons/closedCaptioning.js';
	import { cornersInIcon } from '../Icons/cornersIn.js';
	import { cornersOutIcon } from '../Icons/cornersOut.js';
	import { downloadSimpleIcon } from '../Icons/downloadSimple.js';
	import { gearIcon } from '../Icons/gear.js';
	import { pictureInPictureIcon } from '../Icons/pictureInPicture.js';
	import { repeatIcon } from '../Icons/repeat.js';
	import { speakerHighIcon } from '../Icons/speakerHigh.js';
	import { speakerLowIcon } from '../Icons/speakerLow.js';
	import { speakerSlashIcon } from '../Icons/speakerSlash.js';
	import { speedometerIcon } from '../Icons/speedometer.js';
	import { subtitlesSlashIcon } from '../Icons/subtitlesSlash.js';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import type { MenuOptionThemeProps } from '../MenuOption/menuOption.theme.js';
	import type { SeparatorThemeProps } from '../Separator/separator.theme.js';
	import type { VideoPlayerTrack } from './videoPlayer.props.js';
	import type { VideoPlayerState } from './videoPlayer.state.svelte.js';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';
	import VideoPlayerIconButton from './VideoPlayerIconButton.svelte';
	import VideoPlayerSlider from './VideoPlayerSlider.svelte';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;
	type CaptionTrackOption = {
		value: string;
		label: string;
	};
	type VideoPlayerSubmenuItem = Extract<MenuItem, { type: 'submenu' }> & {
		popoverClass?: string;
	};

	const menuOptionTheme = {
		root: {
			base: 'text-white/85 highlight:bg-white/10 highlight:text-white',
			active: {
				true: 'bg-white/10 text-white'
			},
			disabled: {
				true: 'text-white/35 opacity-100 pointer-events-none'
			}
		},
		prefix: {
			base: 'text-white/65'
		},
		suffix: {
			base: 'text-white/65'
		}
	} satisfies MenuOptionThemeProps;

	const menuSeparatorTheme = {
		root: {
			base: 'my-1 before:!border-white/[0.08] after:!border-white/[0.08]'
		}
	} satisfies SeparatorThemeProps;

	let {
		player,
		classes,
		size,
		tracks,
		playbackRates,
		volumeStep = 0.05,
		disabled,
		includeVolume = false,
		includeRate = true,
		includeLoop = true,
		includeCaptions = true,
		includePictureInPicture = false,
		includeDownload = false,
		includeFullscreen = false,
		downloadHref = '',
		label = 'Settings',
		icon = gearIcon,
		onOverlayOpenChange
	}: {
		player: VideoPlayerState;
		classes: VideoPlayerClasses;
		size: Sizes;
		tracks: VideoPlayerTrack[];
		playbackRates: number[];
		volumeStep?: number;
		disabled: boolean;
		includeVolume?: boolean;
		includeRate?: boolean;
		includeLoop?: boolean;
		includeCaptions?: boolean;
		includePictureInPicture?: boolean;
		includeDownload?: boolean;
		includeFullscreen?: boolean;
		downloadHref?: string;
		label?: string;
		icon?: Slot;
		onOverlayOpenChange: (open: boolean) => void;
	} = $props();

	let open = $state(false);
	let lastReportedOpen = false;

	const availableRates = $derived(
		playbackRates
			.filter((rate) => Number.isFinite(rate) && rate > 0)
			.filter((rate, index, rates) => rates.indexOf(rate) === index)
	);
	const captionTracks = $derived(
		tracks
			.map((track, index) => getCaptionTrackOption(track, index))
			.filter((track): track is CaptionTrackOption => track !== null)
	);
	const volumeIcon = $derived(
		player.muted || player.volume === 0
			? speakerSlashIcon
			: player.volume < 0.5
				? speakerLowIcon
				: speakerHighIcon
	);

	const menuItems = $derived.by<MenuItem[]>(() => {
		const items: MenuItem[] = [];

		if (includeRate && availableRates.length > 0) {
			const speedItem: VideoPlayerSubmenuItem = {
				type: 'submenu',
				title: 'Speed',
				prefix: speedometerIcon,
				suffix: formatPlaybackRate(player.playbackRate),
				disabled,
				popoverClass: classes.popoverPanel({ className: 'p-1' }),
				menu: availableRates.map((rate) => ({
					type: 'option',
					title: formatPlaybackRate(rate),
					disabled,
					selected: player.playbackRate === rate,
					suffix: player.playbackRate === rate ? checkIcon : undefined,
					onClick: () => runIfEnabled(() => player.setPlaybackRate(rate))
				}))
			};
			items.push(speedItem);
		}

		if (includeLoop) {
			items.push({
				type: 'option',
				title: 'Loop',
				prefix: repeatIcon,
				disabled,
				selected: player.loop,
				suffix: player.loop ? checkIcon : undefined,
				onClick: () => runIfEnabled(() => player.setLoop(!player.loop))
			});
		}

		if (includeCaptions) {
			const captionsDisabled = disabled || captionTracks.length === 0;
			const captionsItem: VideoPlayerSubmenuItem = {
				type: 'submenu',
				title: 'Captions',
				prefix: player.captionsEnabled ? closedCaptioningIcon : subtitlesSlashIcon,
				disabled: captionsDisabled,
				popoverClass: classes.popoverPanel({ className: 'p-1' }),
				menu: [
					{
						type: 'option',
						title: 'Off',
						disabled: captionsDisabled,
						selected: !player.captionsEnabled,
						suffix: !player.captionsEnabled ? checkIcon : undefined,
						onClick: () => runIfEnabled(() => player.setActiveTextTrack(null))
					},
					...captionTracks.map((track) => ({
						type: 'option' as const,
						title: track.label,
						disabled: captionsDisabled,
						selected: player.activeTextTrack === track.value,
						suffix: player.activeTextTrack === track.value ? checkIcon : undefined,
						onClick: () => runIfEnabled(() => player.setActiveTextTrack(track.value))
					}))
				]
			};
			items.push(captionsItem);
		}

		const actionItems: MenuItem[] = [];

		if (includePictureInPicture) {
			actionItems.push({
				type: 'option',
				title: player.actualPictureInPicture ? 'Exit Picture-in-Picture' : 'Picture-in-Picture',
				prefix: pictureInPictureIcon,
				disabled: disabled || !player.supportsPictureInPicture,
				selected: player.actualPictureInPicture,
				suffix: player.actualPictureInPicture ? checkIcon : undefined,
				onClick: () => runIfEnabled(() => player.togglePictureInPicture())
			});
		}

		if (includeDownload && downloadHref) {
			actionItems.push({
				type: 'option',
				title: 'Download',
				prefix: downloadSimpleIcon,
				disabled: disabled || !downloadHref,
				href: disabled ? undefined : downloadHref,
				attrs: { download: true }
			});
		}

		if (includeFullscreen) {
			actionItems.push({
				type: 'option',
				title: player.actualFullscreen ? 'Exit fullscreen' : 'Fullscreen',
				prefix: player.actualFullscreen ? cornersInIcon : cornersOutIcon,
				disabled: disabled || !player.supportsFullscreen,
				selected: player.actualFullscreen,
				suffix: player.actualFullscreen ? checkIcon : undefined,
				onClick: () => runIfEnabled(() => player.toggleFullscreen())
			});
		}

		if (actionItems.length > 0) {
			if (items.length > 0) items.push({ type: 'separator' });
			items.push(...actionItems);
		}

		return items;
	});
	const hasMenuItems = $derived(menuItems.length > 0 || includeVolume);

	function formatPlaybackRate(rate: number) {
		return rate === 1 ? 'Normal' : `${rate}x`;
	}

	function getCaptionTrackOption(track: VideoPlayerTrack, index: number) {
		const kind = track.kind ?? 'subtitles';
		if (kind !== 'captions' && kind !== 'subtitles') return null;
		const value = track.id ?? track.label ?? track.srclang ?? `${kind}:${index}`;
		return {
			value,
			label: track.label ?? track.srclang ?? `Track ${index + 1}`
		};
	}

	function runIfEnabled(action: () => void) {
		if (disabled) return;
		player.runInteraction(action);
	}

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

{#snippet volumeFooter()}
	<div data-menu-keep-open="true" class="mt-1 border-t border-white/10 pt-2">
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
	</div>
{/snippet}

{#if hasMenuItems}
	<PopupMenu
		bind:open
		position="top-end"
		offset={8}
		lockScroll={false}
		closeOnClickOutside
		closeOnEscape
		mobileSheet
		class={classes.popoverPanel({ className: 'min-w-52 p-1' })}
		menu={{
			items: menuItems,
			class: classes.menu(),
			footer: includeVolume ? volumeFooter : undefined,
			theme: {
				option: menuOptionTheme,
				separator: menuSeparatorTheme,
				submenu: menuOptionTheme
			}
		}}
	>
		{#snippet trigger(popover)}
			<VideoPlayerIconButton
				{classes}
				{size}
				{label}
				{icon}
				{disabled}
				aria-haspopup="menu"
				aria-expanded={popover.isOpen}
				onClick={() => popover.toggle()}
				{@attach popover.reference}
			/>
		{/snippet}
	</PopupMenu>
{/if}
