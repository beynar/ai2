import type { Attachment } from 'svelte/attachments';

type Size = {
	width: number;
	height: number;
};

export type TransitionSizeOptions = {
	/** Enables the attachment. Useful for responsive behavior such as mobile-only sheets. */
	isActive?: () => boolean;
	/** CSS properties to animate when the element's intrinsic size changes. */
	axis?: 'height' | 'width' | 'both';
	/** Animation duration in milliseconds. */
	duration?: number;
	/** CSS easing used by the Web Animations API. */
	easing?: string;
	/** Optional custom event names that should trigger a re-measure. */
	events?: string | string[];
};

const defaultOptions = {
	axis: 'height',
	duration: 220,
	easing: 'ease-in-out'
} satisfies Required<Pick<TransitionSizeOptions, 'axis' | 'duration' | 'easing'>>;

const readSize = (node: HTMLElement): Size => {
	const rect = node.getBoundingClientRect();
	return {
		width: rect.width,
		height: rect.height
	};
};

const hasSizeChanged = (previous: Size, next: Size, axis: TransitionSizeOptions['axis']) => {
	const heightChanged = Math.abs(previous.height - next.height) > 0.5;
	const widthChanged = Math.abs(previous.width - next.width) > 0.5;
	if (axis === 'height') return heightChanged;
	if (axis === 'width') return widthChanged;
	return heightChanged || widthChanged;
};

const getKeyframes = (previous: Size, next: Size, axis: TransitionSizeOptions['axis']) => {
	const from: Keyframe = {};
	const to: Keyframe = {};
	if (axis === 'height' || axis === 'both') {
		from.height = `${previous.height}px`;
		to.height = `${next.height}px`;
	}
	if (axis === 'width' || axis === 'both') {
		from.width = `${previous.width}px`;
		to.width = `${next.width}px`;
	}
	return [from, to];
};

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

const getEventNames = (events: TransitionSizeOptions['events']) => {
	if (!events) return [];
	return Array.isArray(events) ? events : [events];
};

export const transitionSize = (options: TransitionSizeOptions = {}): Attachment<HTMLElement> => {
	const axis = options.axis ?? defaultOptions.axis;
	const duration = options.duration ?? defaultOptions.duration;
	const easing = options.easing ?? defaultOptions.easing;
	const isActive = () => options.isActive?.() ?? true;
	const eventNames = getEventNames(options.events);

	return (node) => {
		if (typeof ResizeObserver === 'undefined') return;

		let previousSize = readSize(node);
		let frame: number | null = null;
		let animation: Animation | null = null;
		let animationId = 0;
		let shouldRetarget = false;
		const initialOverflow = node.style.overflow;

		const restoreOverflow = (id: number) => {
			if (id !== animationId) return;
			node.style.overflow = initialOverflow;
			animation = null;
			previousSize = readSize(node);
		};

		const cancelAnimation = () => {
			if (!animation) return;
			animationId += 1;
			const currentAnimation = animation;
			animation = null;
			currentAnimation.cancel();
		};

		const animateToCurrentSize = () => {
			frame = null;
			const shouldInterrupt = shouldRetarget;
			shouldRetarget = false;

			if (animation && !shouldInterrupt) return;

			const animationProgress = animation?.effect?.getComputedTiming().progress;
			const remainingDuration =
				typeof animationProgress === 'number' ? duration * (1 - animationProgress) : duration;
			const previousVisualSize = animation ? readSize(node) : previousSize;
			const previousTargetSize = previousSize;
			cancelAnimation();

			const nextSize = readSize(node);
			if (!isActive() || prefersReducedMotion()) {
				node.style.overflow = initialOverflow;
				previousSize = nextSize;
				return;
			}
			if (!hasSizeChanged(previousVisualSize, nextSize, axis)) {
				node.style.overflow = initialOverflow;
				previousSize = nextSize;
				return;
			}

			animationId += 1;
			const currentAnimationId = animationId;
			const animationDuration = hasSizeChanged(previousTargetSize, nextSize, axis)
				? duration
				: remainingDuration;
			node.style.overflow = 'hidden';
			animation = node.animate(getKeyframes(previousVisualSize, nextSize, axis), {
				duration: animationDuration,
				easing
			});
			previousSize = nextSize;
			animation.onfinish = () => restoreOverflow(currentAnimationId);
			animation.oncancel = () => restoreOverflow(currentAnimationId);
		};

		const schedule = (retarget = false) => {
			shouldRetarget ||= retarget;
			if (animation && !shouldRetarget) return;
			if (frame !== null) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(animateToCurrentSize);
		};

		const observer = new ResizeObserver(() => schedule());
		const mutationObserver = new MutationObserver(() => {
			schedule(true);
		});
		const handleEvent = () => schedule(true);

		observer.observe(node);
		mutationObserver.observe(node, { childList: true, characterData: true, subtree: true });
		eventNames.forEach((eventName) => node.addEventListener(eventName, handleEvent));

		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			cancelAnimation();
			observer.disconnect();
			mutationObserver.disconnect();
			eventNames.forEach((eventName) => node.removeEventListener(eventName, handleEvent));
			node.style.overflow = initialOverflow;
		};
	};
};
