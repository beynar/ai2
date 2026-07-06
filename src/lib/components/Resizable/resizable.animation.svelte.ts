const LAYOUT_ANIMATION_MS = 300;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export class ResizableLayoutAnimation {
	active = $state(false);
	private timer: ReturnType<typeof setTimeout> | null = null;

	start() {
		if (this.prefersReducedMotion()) return;

		this.active = true;
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.active = false;
			this.timer = null;
		}, LAYOUT_ANIMATION_MS);
	}

	stop() {
		if (this.timer) clearTimeout(this.timer);
		this.timer = null;
		this.active = false;
	}

	destroy() {
		this.stop();
	}

	private prefersReducedMotion() {
		return (
			typeof window !== 'undefined' &&
			typeof window.matchMedia === 'function' &&
			window.matchMedia(REDUCED_MOTION_QUERY).matches
		);
	}
}
