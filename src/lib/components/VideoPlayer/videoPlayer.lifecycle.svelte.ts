import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import type { VideoPlayerState } from './videoPlayer.state.svelte.js';

type VideoPlayerLifecycleOptions = {
	player: VideoPlayerState;
	sourceSignature: () => string;
	onElementsChange: (
		mediaElement: HTMLVideoElement | null,
		rootElement: HTMLDivElement | null
	) => void;
};

type VideoPlayerLifecycle = {
	rootAttachment: Attachment<HTMLDivElement>;
	mediaAttachment: Attachment<HTMLVideoElement>;
};

export function createVideoPlayerLifecycle(
	options: VideoPlayerLifecycleOptions
): VideoPlayerLifecycle {
	let loadedSourceSignature = $state('');

	const syncElementBindings = () => {
		options.onElementsChange(options.player.mediaElement, options.player.rootElement);
	};

	const mediaAttachment: Attachment<HTMLVideoElement> = (node) =>
		untrack(() => {
			options.player.mediaElement = node;
			syncElementBindings();

			node.addEventListener('enterpictureinpicture', options.player.handlePictureInPictureEnter);
			node.addEventListener('leavepictureinpicture', options.player.handlePictureInPictureLeave);

			return () => {
				node.removeEventListener(
					'enterpictureinpicture',
					options.player.handlePictureInPictureEnter
				);
				node.removeEventListener(
					'leavepictureinpicture',
					options.player.handlePictureInPictureLeave
				);
				if (options.player.mediaElement === node) options.player.mediaElement = null;
				syncElementBindings();
			};
		});

	const rootAttachment: Attachment<HTMLDivElement> = (node) =>
		untrack(() => {
			const document = node.ownerDocument;
			options.player.rootElement = node;
			syncElementBindings();
			document.addEventListener('fullscreenchange', options.player.handleFullscreenChange);

			return () => {
				document.removeEventListener('fullscreenchange', options.player.handleFullscreenChange);
				if (options.player.rootElement === node) options.player.rootElement = null;
				syncElementBindings();
			};
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

	return {
		rootAttachment,
		mediaAttachment
	};
}
