type VideoPlayerControlsVisibilityOptions = {
	hasCustomControls: () => boolean;
	autoHideControls: () => boolean;
	hideControlsDelay: () => number;
	disabled: () => boolean;
	paused: () => boolean;
};

export function createVideoPlayerControlsVisibility(options: VideoPlayerControlsVisibilityOptions) {
	let visible = $state(true);
	let openOverlayCount = $state(0);
	let hideTimeout: ReturnType<typeof setTimeout> | null = null;
	const isPinned = $derived(openOverlayCount > 0);
	const resolvedVisible = $derived(
		!options.autoHideControls() || options.paused() || visible || isPinned
	);

	function canAutoHide() {
		return options.autoHideControls() && !options.paused() && !options.disabled();
	}

	function clearHideTimeout() {
		if (!hideTimeout) return;
		clearTimeout(hideTimeout);
		hideTimeout = null;
	}

	function scheduleHide() {
		clearHideTimeout();
		if (!canAutoHide() || isPinned) return;
		hideTimeout = setTimeout(
			() => {
				visible = false;
				hideTimeout = null;
			},
			Math.max(0, options.hideControlsDelay())
		);
	}

	function show() {
		visible = true;
		scheduleHide();
	}

	function handleFocusIn() {
		visible = true;
		if (canAutoHide()) {
			scheduleHide();
			return;
		}
		clearHideTimeout();
	}

	function handleFocusOut(event: FocusEvent) {
		const rootElement = event.currentTarget;
		const nextFocusedElement = event.relatedTarget;
		if (rootElement instanceof HTMLElement && nextFocusedElement instanceof Node) {
			if (rootElement.contains(nextFocusedElement)) return;
		}
		scheduleHide();
	}

	function setOverlayOpen(open: boolean) {
		openOverlayCount = Math.max(0, openOverlayCount + (open ? 1 : -1));
		if (open) {
			visible = true;
			clearHideTimeout();
			return;
		}
		scheduleHide();
	}

	$effect(() => {
		if (!options.hasCustomControls()) return;
		if (!options.autoHideControls() || options.paused() || options.disabled()) {
			visible = true;
			clearHideTimeout();
			return;
		}
		scheduleHide();
	});

	$effect(() => clearHideTimeout);

	return {
		get visible() {
			return resolvedVisible;
		},
		show,
		scheduleHide,
		handleFocusIn,
		handleFocusOut,
		setOverlayOpen,
		clearHideTimeout
	};
}
