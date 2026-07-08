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
	duration: 180,
	easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
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
		const initialOverflow = node.style.overflow;

		const restoreOverflow = (id: number) => {
			if (id !== animationId) return;
			node.style.overflow = initialOverflow;
			animation = null;
			previousSize = readSize(node);
		};

		const animateToCurrentSize = () => {
			frame = null;

			const nextSize = readSize(node);
			if (!isActive() || prefersReducedMotion()) {
				previousSize = nextSize;
				return;
			}
			if (!hasSizeChanged(previousSize, nextSize, axis)) return;

			animationId += 1;
			animation?.cancel();
			const currentAnimationId = animationId;
			node.style.overflow = 'hidden';
			animation = node.animate(getKeyframes(previousSize, nextSize, axis), {
				duration,
				easing
			});
			previousSize = nextSize;
			animation.onfinish = () => restoreOverflow(currentAnimationId);
			animation.oncancel = () => restoreOverflow(currentAnimationId);
		};

		const schedule = () => {
			if (animation) return;
			if (frame !== null) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(animateToCurrentSize);
		};

		const observer = new ResizeObserver(schedule);
		observer.observe(node);
		eventNames.forEach((eventName) => node.addEventListener(eventName, schedule));

		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			animationId += 1;
			animation?.cancel();
			observer.disconnect();
			eventNames.forEach((eventName) => node.removeEventListener(eventName, schedule));
			node.style.overflow = initialOverflow;
		};
	};
};
