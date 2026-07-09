import { BROWSER } from 'esm-env';
import { onMount, tick, untrack } from 'svelte';
import { on } from 'svelte/events';
import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';
import { bind } from '$lib/utils/state.svelte.js';
import type { ImageZoomPayload, ImageZoomProps } from './imageZoom.props.js';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type ImageZoomRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

type ImageZoomStateOptions = MakeRequired<
	Pick<
		ImageZoomProps,
		| 'src'
		| 'alt'
		| 'zoomSrc'
		| 'open'
		| 'disabled'
		| 'zoomMargin'
		| 'transitionDuration'
		| 'closeOnEscape'
		| 'lockScroll'
		| 'onOpenChange'
		| 'onOpen'
		| 'onClose'
	>,
	'open' | 'disabled' | 'zoomMargin' | 'transitionDuration' | 'closeOnEscape' | 'lockScroll'
>;

export interface ImageZoomState extends ImageZoomStateOptions {}

export class ImageZoomState {
	triggerElement: HTMLButtonElement | null = $state(null);
	thumbnailImageElement: HTMLImageElement | null = $state(null);
	modalImageElement: HTMLImageElement | null = $state(null);
	closeButtonElement: HTMLButtonElement | null = $state(null);
	mounted = $state(false);
	overlayVisible = $state(false);
	imageRect: ImageZoomRect | null = $state(null);
	prefersReducedMotion = $state(false);
	private animationTimer: ReturnType<typeof setTimeout> | null = null;
	private previousFocus: HTMLElement | null = null;

	zoomedSrc = $derived(this.zoomSrc || this.src);
	animationDuration = $derived(this.prefersReducedMotion ? 0 : this.transitionDuration);
	payload = $derived<ImageZoomPayload>({
		src: this.src,
		zoomSrc: this.zoomedSrc,
		alt: this.alt,
		isOpen: this.isOpen,
		open: this.open,
		close: this.close,
		toggle: this.toggle
	});

	constructor(options: ImageZoomStateOptions) {
		bind(this, options);

		useScrollLock({
			isActive: () => this.mounted && this.lockScroll
		});

		useKeyDown({
			isActive: () => this.mounted && this.closeOnEscape,
			onWindow: () => true,
			keys: ['Escape'],
			callback: this.close
		});

		$effect(() => {
			const isOpen = this.isOpen;
			untrack(() => {
				if (isOpen) {
					void this.show();
				} else {
					this.hide();
				}
			});
		});

		onMount(() => {
			const media = window.matchMedia('(prefers-reduced-motion: reduce)');
			const updateMotionPreference = () => {
				this.prefersReducedMotion = media.matches;
			};
			updateMotionPreference();
			media.addEventListener('change', updateMotionPreference);
			const offResize = on(window, 'resize', this.updateTargetRect);

			return () => {
				media.removeEventListener('change', updateMotionPreference);
				offResize();
			};
		});
	}

	open = () => {
		this.setOpen(true);
	};

	close = () => {
		this.setOpen(false);
	};

	toggle = () => {
		this.setOpen(!this.isOpen);
	};

	setOpen = (nextOpen: boolean) => {
		if (this.disabled && nextOpen) return;
		if (this.isOpen === nextOpen) return;
		this.isOpen = nextOpen;
		this.onOpenChange?.(nextOpen, this.payload);
	};

	show = async () => {
		if (!BROWSER || this.disabled) return;
		this.clearAnimationTimer();
		this.previousFocus =
			document.activeElement instanceof HTMLElement ? document.activeElement : this.triggerElement;
		const sourceRect = this.getSourceRect();
		this.imageRect = sourceRect;
		this.overlayVisible = false;
		this.mounted = true;

		await tick();
		const targetRect = this.getTargetRect(sourceRect);
		this.runNextFrame(() => {
			this.imageRect = targetRect;
			this.overlayVisible = true;
		});

		this.animationTimer = setTimeout(() => {
			if (!this.isOpen) return;
			this.closeButtonElement?.focus();
			this.onOpen?.(this.payload);
		}, this.animationDuration);
	};

	hide = () => {
		if (!this.mounted) return;
		this.clearAnimationTimer();
		this.overlayVisible = false;
		this.imageRect = this.getSourceRect();

		this.animationTimer = setTimeout(() => {
			if (this.isOpen) return;
			this.mounted = false;
			this.imageRect = null;
			this.restoreFocus();
			this.onClose?.(this.payload);
		}, this.animationDuration);
	};

	updateTargetRect = () => {
		if (!this.mounted || !this.isOpen) return;
		this.imageRect = this.getTargetRect(this.getSourceRect());
	};

	private getSourceRect(): ImageZoomRect {
		const source = this.thumbnailImageElement ?? this.triggerElement;
		if (!source) {
			return this.getFallbackRect();
		}

		const rect = source.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) {
			return this.getFallbackRect();
		}

		return {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height
		};
	}

	private getTargetRect(sourceRect: ImageZoomRect): ImageZoomRect {
		const margin = Math.max(0, this.zoomMargin);
		const availableWidth = Math.max(window.innerWidth - margin * 2, 1);
		const availableHeight = Math.max(window.innerHeight - margin * 2, 1);
		const naturalSize = this.getNaturalSize(sourceRect);
		const aspectRatio = naturalSize.width / naturalSize.height;

		let width = Math.min(naturalSize.width, availableWidth);
		let height = width / aspectRatio;

		if (height > availableHeight) {
			height = availableHeight;
			width = height * aspectRatio;
		}

		return {
			left: (window.innerWidth - width) / 2,
			top: (window.innerHeight - height) / 2,
			width,
			height
		};
	}

	private getNaturalSize(sourceRect: ImageZoomRect) {
		const modalImage = this.modalImageElement;
		const thumbnailImage = this.thumbnailImageElement;
		const width = modalImage?.naturalWidth || thumbnailImage?.naturalWidth || sourceRect.width || 1;
		const height =
			modalImage?.naturalHeight || thumbnailImage?.naturalHeight || sourceRect.height || 1;

		return { width, height };
	}

	private getFallbackRect(): ImageZoomRect {
		if (!BROWSER) {
			return { left: 0, top: 0, width: 1, height: 1 };
		}

		return {
			left: window.innerWidth / 2,
			top: window.innerHeight / 2,
			width: 1,
			height: 1
		};
	}

	private restoreFocus() {
		if (!this.previousFocus) return;
		if (!document.contains(this.previousFocus)) return;
		this.previousFocus.focus();
		this.previousFocus = null;
	}

	private clearAnimationTimer() {
		if (!this.animationTimer) return;
		clearTimeout(this.animationTimer);
		this.animationTimer = null;
	}

	private runNextFrame(callback: () => void) {
		if (this.animationDuration === 0) {
			callback();
			return;
		}

		requestAnimationFrame(() => {
			requestAnimationFrame(callback);
		});
	}
}
