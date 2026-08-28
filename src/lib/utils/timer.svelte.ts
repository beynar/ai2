export class Timer {
	private rafId: number | null = null;
	private startTime: number = 0;
	private pausedTime: number = 0;
	private callback: () => void;
	private isPaused: boolean = false;

	delay = $state(0);
	remaining = $state(0);
	elapsed = $state(0);
	elapsedInSeconds = $derived(Math.round(Math.min(this.elapsed / 1000, this.delay / 1000)));
	elapsedInPercent = $derived(Math.round(Math.min((this.elapsed / this.delay) * 100, 100)));

	constructor(callback: () => void, delay: number) {
		this.callback = callback;
		this.delay = delay;
		this.remaining = delay;
		if (delay > 0) {
			this.start();
		}
	}

	start = () => {
		this.startTime = performance.now();
		this.rafId = requestAnimationFrame(this.scheduleFrame);
	};

	pause = () => {
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
		this.isPaused = true;
		this.pausedTime = this.elapsed;
	};

	resume = () => {
		if (this.isPaused) {
			this.startTime = performance.now() - this.pausedTime;
			this.isPaused = false;
			this.rafId = requestAnimationFrame(this.scheduleFrame);
		}
	};

	destroy = () => {
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
	};

	update = (delay: number) => {
		this.destroy();
		this.delay = delay;
		this.remaining = delay;
		this.elapsed = 0;
		this.pausedTime = 0;
		this.isPaused = false;
		if (delay > 0) {
			this.start();
		}
	};

	private scheduleFrame = (timestamp: number): void => {
		if (this.isPaused) return;

		this.elapsed = timestamp - this.startTime;
		this.remaining = Math.max(0, this.delay - this.elapsed);

		if (this.elapsed >= this.delay) {
			this.callback();
			this.rafId = null;
		} else {
			this.rafId = requestAnimationFrame(this.scheduleFrame);
		}
	};
}
