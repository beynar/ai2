import { BROWSER } from 'esm-env';
import { onMount, tick, untrack } from 'svelte';
import { on } from 'svelte/events';
import { Blossom } from '@blossom-carousel/core';
import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';
import { bind } from '$lib/utils/state.svelte.js';
import type {
	ImageGalleryImage,
	ImageGalleryImageRelation,
	ImageGalleryPayload,
	ImageGalleryProps
} from './imageGallery.props.js';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type ImageGalleryRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

type DiscoveredImage = ImageGalleryImage & {
	element: HTMLImageElement;
};

type RestoredImageAttributes = {
	role: string | null;
	tabindex: string | null;
	ariaLabel: string | null;
	dataGalleryImage: string | null;
};

type ImageGalleryStateOptions = MakeRequired<
	Pick<
		ImageGalleryProps,
		| 'imageSelector'
		| 'disabled'
		| 'zoomMargin'
		| 'transitionDuration'
		| 'closeOnEscape'
		| 'lockScroll'
		| 'buttonLabel'
		| 'onOpenChange'
		| 'onIndexChange'
	>,
	| 'imageSelector'
	| 'disabled'
	| 'zoomMargin'
	| 'transitionDuration'
	| 'closeOnEscape'
	| 'lockScroll'
	| 'buttonLabel'
> & {
	isOpen: boolean;
	activeIndex: number;
};

export interface ImageGalleryState extends ImageGalleryStateOptions {}

export class ImageGalleryState {
	rootElement: HTMLElement | null = $state(null);
	scrollerElement: HTMLElement | null = $state(null);
	thumbnailScrollerElement: HTMLElement | null = $state(null);
	closeButtonElement: HTMLButtonElement | null = $state(null);
	mounted = $state(false);
	overlayVisible = $state(false);
	imageRect: ImageGalleryRect | null = $state(null);
	prefersReducedMotion = $state(false);
	discoveredImages = $state<DiscoveredImage[]>([]);
	private animationTimer: ReturnType<typeof setTimeout> | null = null;
	private previousFocus: HTMLElement | null = null;
	private openingImageElement: HTMLImageElement | null = null;
	private openingSourceRect: ImageGalleryRect | null = null;
	private enhancedImages = new Map<HTMLImageElement, RestoredImageAttributes>();
	private slideRatioByElement = new WeakMap<Element, number>();
	private hasPositionedInitialSlide = false;

	images = $derived<ImageGalleryImage[]>(
		this.discoveredImages.map(({ element: _element, ...image }) => image)
	);
	activeImage = $derived(this.images[this.activeIndex] ?? null);
	canPrevious = $derived(this.activeIndex > 0);
	canNext = $derived(this.activeIndex < this.images.length - 1);
	private activeDiscoveredImage = $derived(this.discoveredImages[this.activeIndex] ?? null);
	animationDuration = $derived(this.prefersReducedMotion ? 0 : this.transitionDuration);

	constructor(options: ImageGalleryStateOptions) {
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

		useKeyDown({
			isActive: () => this.mounted,
			onWindow: () => true,
			keys: ['ArrowLeft', 'ArrowRight'],
			callback: (event) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					this.previous();
					return;
				}
				event.preventDefault();
				this.next();
			}
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

		$effect(() => {
			const root = this.rootElement;
			const selector = this.imageSelector;
			const disabled = this.disabled;
			untrack(() => {
				this.cleanupEnhancedImages();
			});
			if (!root || disabled) return;

			return untrack(() => this.attachToRoot(root, selector));
		});

		$effect(() => {
			const activeIndex = this.activeIndex;
			untrack(() => {
				if (!this.mounted || !this.isOpen || activeIndex < 0) return;
				this.updateTargetRect();
				this.scrollThumbnailIntoView(activeIndex);
			});
		});

		$effect(() => {
			const scroller = this.scrollerElement;
			const imageCount = this.images.length;
			if (!scroller || imageCount === 0) return;
			return untrack(() => this.attachMainScroller(scroller));
		});

		$effect(() => {
			const scroller = this.thumbnailScrollerElement;
			if (!scroller) return;
			return untrack(() => this.attachBlossom(scroller));
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
				this.cleanupEnhancedImages();
			};
		});
	}

	setOpen = (nextOpen: boolean) => {
		if (this.disabled && nextOpen) return;
		if (this.isOpen === nextOpen) return;
		this.isOpen = nextOpen;
		this.onOpenChange?.(nextOpen, this.payload);
	};

	open = (index: number = this.activeIndex) => {
		this.openAt(index);
	};

	openAt = (index: number, imageElement?: HTMLImageElement) => {
		if (this.disabled) return;
		if (this.discoveredImages.length === 0) {
			this.refreshImages();
		}
		if (this.discoveredImages.length === 0) return;
		const nextIndex = this.getBoundedIndex(index);
		this.openingImageElement = imageElement ?? this.discoveredImages[nextIndex]?.element ?? null;
		this.openingSourceRect = this.getElementRect(this.openingImageElement);
		this.hasPositionedInitialSlide = false;
		this.setActiveIndex(nextIndex, { scroll: false });
		this.setOpen(true);
	};

	close = () => {
		this.setOpen(false);
	};

	setActiveIndex = (
		index: number,
		options: {
			scroll?: boolean;
		} = {}
	) => {
		const nextIndex = this.getBoundedIndex(index);
		if (this.activeIndex === nextIndex) return;
		this.activeIndex = nextIndex;
		if (options.scroll !== false) {
			this.scrollToIndex(nextIndex);
		}
		this.onIndexChange?.(nextIndex, this.payload);
	};

	previous = () => {
		if (!this.canPrevious) return;
		this.setActiveIndex(this.activeIndex - 1);
	};

	next = () => {
		if (!this.canNext) return;
		this.setActiveIndex(this.activeIndex + 1);
	};

	getImageRelation = (index: number): ImageGalleryImageRelation => {
		if (index === this.activeIndex) return 'active';
		if (index === this.activeIndex - 1) return 'previous';
		if (index === this.activeIndex + 1) return 'next';
		return 'distant';
	};

	payload = $derived<ImageGalleryPayload>({
		images: this.images,
		activeImage: this.activeImage,
		activeIndex: this.activeIndex,
		isOpen: this.isOpen,
		open: this.open,
		close: this.close,
		setActiveIndex: this.setActiveIndex,
		previous: this.previous,
		next: this.next,
		canPrevious: this.canPrevious,
		canNext: this.canNext
	});

	show = async () => {
		if (!BROWSER || this.disabled) return;
		if (this.discoveredImages.length === 0) {
			this.refreshImages();
		}
		if (this.discoveredImages.length === 0) {
			this.setOpen(false);
			return;
		}

		this.clearAnimationTimer();
		this.previousFocus =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: this.openingImageElement;
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
			this.openingImageElement = null;
			this.openingSourceRect = null;
			this.restoreFocus();
		}, this.animationDuration);
	};

	updateTargetRect = () => {
		if (!this.mounted || !this.isOpen) return;
		this.imageRect = this.getTargetRect(this.getSourceRect());
	};

	scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
		const slide = this.getSlideElement(index);
		if (!slide) return;
		slide.scrollIntoView({
			behavior,
			block: 'nearest',
			inline: 'center'
		});
		this.scrollThumbnailIntoView(index);
	};

	private attachMainScroller(scroller: HTMLElement) {
		const offBlossom = this.attachBlossom(scroller);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					this.slideRatioByElement.set(
						entry.target,
						entry.isIntersecting ? entry.intersectionRatio : 0
					);
				}
				this.updateActiveIndexFromSlides(scroller);
			},
			{
				root: scroller,
				threshold: [0, 0.4, 0.7, 1]
			}
		);

		Array.from(scroller.children).forEach((slide) => {
			observer.observe(slide);
		});

		this.positionInitialSlide();

		return () => {
			observer.disconnect();
			this.slideRatioByElement = new WeakMap<Element, number>();
			offBlossom();
		};
	}

	private attachBlossom(scroller: HTMLElement) {
		const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const blossom = Blossom(scroller, {});
		if (hasMouse) {
			blossom.init();
		}

		return () => {
			if (hasMouse) {
				blossom.destroy();
			}
		};
	}

	private positionInitialSlide() {
		if (this.hasPositionedInitialSlide) return;
		this.hasPositionedInitialSlide = true;
		this.scrollToIndex(this.activeIndex, 'auto');
		requestAnimationFrame(() => {
			this.scrollToIndex(this.activeIndex, 'auto');
		});
	}

	private updateActiveIndexFromSlides(scroller: HTMLElement) {
		const slides = Array.from(scroller.children);
		const mostVisible = slides.reduce(
			(current, slide, index) => {
				const ratio = this.slideRatioByElement.get(slide) ?? 0;
				if (ratio <= current.ratio) return current;
				return { index, ratio };
			},
			{ index: this.activeIndex, ratio: 0 }
		);
		if (mostVisible.ratio <= 0) return;
		this.setActiveIndex(mostVisible.index, { scroll: false });
	}

	private getSlideElement(index: number) {
		const boundedIndex = this.getBoundedIndex(index);
		const slide = this.scrollerElement?.children[boundedIndex];
		return slide instanceof HTMLElement ? slide : null;
	}

	private scrollThumbnailIntoView(index: number) {
		const boundedIndex = this.getBoundedIndex(index);
		const thumbnail = this.thumbnailScrollerElement?.children[boundedIndex];
		if (!(thumbnail instanceof HTMLElement)) return;
		thumbnail.scrollIntoView({
			behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
			block: 'nearest',
			inline: 'center'
		});
	}

	private attachToRoot(root: HTMLElement, selector: string) {
		this.refreshImages();
		const offClick = on(root, 'click', this.onRootClick);
		const offKeydown = on(root, 'keydown', this.onRootKeydown);
		const observer = new MutationObserver(() => {
			this.refreshImages();
		});
		observer.observe(root, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['src', 'srcset', 'sizes', 'alt', 'title']
		});

		return () => {
			observer.disconnect();
			offClick();
			offKeydown();
			this.cleanupEnhancedImages();
			this.discoveredImages = [];
		};
	}

	private refreshImages = () => {
		if (!this.rootElement) return;
		const imageElements = Array.from(this.rootElement.querySelectorAll(this.imageSelector)).filter(
			(element): element is HTMLImageElement => element instanceof HTMLImageElement
		);
		const activeElements = new Set(imageElements);
		Array.from(this.enhancedImages.keys()).forEach((imageElement) => {
			if (!activeElements.has(imageElement)) {
				this.restoreImageAttributes(imageElement);
			}
		});

		this.discoveredImages = imageElements.map((imageElement, index) => {
			this.enhanceImage(imageElement);
			const src =
				imageElement.currentSrc || imageElement.src || imageElement.getAttribute('src') || '';
			const alt = imageElement.alt || '';
			return {
				element: imageElement,
				src,
				alt,
				caption: imageElement.title || alt,
				index
			};
		});

		this.setActiveIndex(this.activeIndex);
	};

	private enhanceImage(imageElement: HTMLImageElement) {
		if (!this.enhancedImages.has(imageElement)) {
			this.enhancedImages.set(imageElement, {
				role: imageElement.getAttribute('role'),
				tabindex: imageElement.getAttribute('tabindex'),
				ariaLabel: imageElement.getAttribute('aria-label'),
				dataGalleryImage: imageElement.getAttribute('data-image-gallery-image')
			});
		}

		const label = imageElement.alt ? `${this.buttonLabel}: ${imageElement.alt}` : this.buttonLabel;
		imageElement.setAttribute('role', 'button');
		imageElement.setAttribute('tabindex', '0');
		imageElement.setAttribute('aria-label', label);
		imageElement.setAttribute('data-image-gallery-image', '');
	}

	private cleanupEnhancedImages() {
		Array.from(this.enhancedImages.keys()).forEach((imageElement) => {
			this.restoreImageAttributes(imageElement);
		});
	}

	private restoreImageAttributes(imageElement: HTMLImageElement) {
		const previousAttributes = this.enhancedImages.get(imageElement);
		if (!previousAttributes) return;
		this.restoreAttribute(imageElement, 'role', previousAttributes.role);
		this.restoreAttribute(imageElement, 'tabindex', previousAttributes.tabindex);
		this.restoreAttribute(imageElement, 'aria-label', previousAttributes.ariaLabel);
		this.restoreAttribute(
			imageElement,
			'data-image-gallery-image',
			previousAttributes.dataGalleryImage
		);
		this.enhancedImages.delete(imageElement);
	}

	private restoreAttribute(element: HTMLElement, name: string, value: string | null) {
		if (value === null) {
			element.removeAttribute(name);
			return;
		}
		element.setAttribute(name, value);
	}

	private onRootClick = (event: MouseEvent) => {
		const imageElement = this.getImageFromEventTarget(event.target);
		if (!imageElement) return;
		event.preventDefault();
		this.openAt(this.getImageIndex(imageElement), imageElement);
	};

	private onRootKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		const imageElement = this.getImageFromEventTarget(event.target);
		if (!imageElement) return;
		event.preventDefault();
		this.openAt(this.getImageIndex(imageElement), imageElement);
	};

	private getImageFromEventTarget(target: EventTarget | null) {
		if (!(target instanceof Element) || !this.rootElement) return null;
		const imageElement = target.closest(this.imageSelector);
		if (!(imageElement instanceof HTMLImageElement)) return null;
		if (!this.rootElement.contains(imageElement)) return null;
		return imageElement;
	}

	private getImageIndex(imageElement: HTMLImageElement) {
		return Math.max(
			0,
			this.discoveredImages.findIndex((image) => image.element === imageElement)
		);
	}

	private getBoundedIndex(index: number) {
		if (this.discoveredImages.length === 0) return 0;
		const requestedIndex = Number.isFinite(index) ? Math.trunc(index) : 0;
		return Math.max(0, Math.min(this.discoveredImages.length - 1, requestedIndex));
	}

	private getSourceRect(): ImageGalleryRect {
		return this.openingSourceRect ?? this.getElementRect(this.activeDiscoveredImage?.element);
	}

	private getElementRect(element: HTMLElement | null | undefined): ImageGalleryRect {
		if (!element) return this.getFallbackRect();
		const rect = element.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) return this.getFallbackRect();

		return {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height
		};
	}

	private getTargetRect(sourceRect: ImageGalleryRect): ImageGalleryRect {
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

	private getNaturalSize(sourceRect: ImageGalleryRect) {
		const imageElement = this.activeDiscoveredImage?.element;
		const width = imageElement?.naturalWidth || sourceRect.width || 1;
		const height = imageElement?.naturalHeight || sourceRect.height || 1;

		return { width, height };
	}

	private getFallbackRect(): ImageGalleryRect {
		if (!BROWSER) return { left: 0, top: 0, width: 1, height: 1 };
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
