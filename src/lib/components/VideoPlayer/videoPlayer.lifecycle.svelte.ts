import { onMount } from 'svelte';
import type { VideoPlayerState } from './videoPlayer.state.svelte.js';

type VideoPlayerLifecycleOptions = {
	player: VideoPlayerState;
	sourceSignature: () => string;
	onElementsChange: (
		mediaElement: HTMLVideoElement | null,
		rootElement: HTMLDivElement | null
	) => void;
};

export function createVideoPlayerLifecycle(options: VideoPlayerLifecycleOptions) {
	let loadedSourceSignature = $state('');

	$effect(() => {
		options.onElementsChange(options.player.mediaElement, options.player.rootElement);
	});
	$effect(() => options.player.syncMediaProperties());
	$effect(() => {
		const mediaElement = options.player.mediaElement;
		const nextSourceSignature = options.sourceSignature();
		if (!mediaElement) return;
		if (!loadedSourceSignature) {
			loadedSourceSignature = nextSourceSignature;
			return;
		}
		if (loadedSourceSignature !== nextSourceSignature) {
			loadedSourceSignature = nextSourceSignature;
			options.player.resetForSourceChange();
			mediaElement.load();
		}
	});
	$effect(() => {
		const mediaElement = options.player.mediaElement;
		if (!mediaElement) return;

		mediaElement.addEventListener(
			'enterpictureinpicture',
			options.player.handlePictureInPictureEnter
		);
		mediaElement.addEventListener(
			'leavepictureinpicture',
			options.player.handlePictureInPictureLeave
		);

		return () => {
			mediaElement.removeEventListener(
				'enterpictureinpicture',
				options.player.handlePictureInPictureEnter
			);
			mediaElement.removeEventListener(
				'leavepictureinpicture',
				options.player.handlePictureInPictureLeave
			);
		};
	});
	onMount(() => {
		document.addEventListener('fullscreenchange', options.player.handleFullscreenChange);
		return () =>
			document.removeEventListener('fullscreenchange', options.player.handleFullscreenChange);
	});
}
