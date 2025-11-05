import { untrack, type Snippet } from 'svelte';
import { bind, getSize } from './utils.js';
import { on } from 'svelte/events';
import { Drag } from './drag.js';

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';
export type ResponsiveProperty<T = number> = Partial<Record<Sizes, T>>;
type ButtonsA11y = {
	'aria-controls': string;
	'aria-label': string;
};
type DotsA11y = {
	role: string;
	'aria-label': string;
};
export interface Snippets {
	children: Snippet<[CarouselState]>;
	pagination?: Snippet<[CarouselState]>;
	prev?: Snippet<[CarouselState, ButtonsA11y]>;
	next?: Snippet<[CarouselState, ButtonsA11y]>;
	progress?: Snippet<[CarouselState]>;
	dots?: Snippet<[CarouselState, DotsA11y]>;
}

export interface CarouselProps {
	class?: string;
	withGrabCursor?: boolean;
	dragFree?: boolean;
	oneAtTime?: boolean;
	autoHeight?: boolean;
	autoPlay?: number;
	pauseOnHover?: boolean;
	axis?: ResponsiveProperty<'x' | 'y'>;
	disableNativeScroll?: ResponsiveProperty<boolean>;
	layout?: ResponsiveProperty;
	gaps?: ResponsiveProperty;
	partialDelta?: ResponsiveProperty;
}
type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type CarouselOptions = MakeRequired<
	Omit<CarouselProps, 'class'>,
	'axis' | 'disableNativeScroll' | 'layout' | 'gaps' | 'partialDelta'
>;
export interface CarouselState extends CarouselOptions {}

const resolver = <T>(
	property: ResponsiveProperty<T> | undefined,
	breakpoint: Sizes,
	defaultValue: T
): T => {
	const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'] as const;
	const activeBreakpointValue = property?.[breakpoint];
	if (activeBreakpointValue) return activeBreakpointValue;
	let lastActiveBreakpointValue: T | null = null;
	for (const bp of breakpoints) {
		if (property?.[bp] !== undefined) {
			lastActiveBreakpointValue = property?.[bp];
			break;
		}
		if (bp === breakpoint) break;
	}
	if (lastActiveBreakpointValue) return lastActiveBreakpointValue;
	return defaultValue;
};

export class CarouselState {
	container = $state<HTMLElement>();
	slides = $state<HTMLElement[]>([]);
	mounted = $state(false);
	drag: Drag | null = null;

	breakpoint = $state<Sizes>('xs');
	slideWidth = $derived(0);
	slideHeight = $derived(0);
	autoPlayPaused = $state(false);
	autoPlayTimeout = $state<number>();
	slidesInView = $state<number[]>([]);
	dots = $state<Array<{ active: boolean; a11y: any }>>([]);
	progress = $state(0);
	canScrollNext = $state(false);
	canScrollPrev = $state(false);
	currentSlide = $state(0);

	// Resolvers

	resolvedAxis = $derived(resolver(this.axis, this.breakpoint, 'x'));
	resolvedDisableNativeScroll = $derived(
		resolver(this.disableNativeScroll, this.breakpoint, false)
	);
	resolvedLayout = $derived(resolver(this.layout, this.breakpoint, 1));
	resolvedGaps = $derived(resolver(this.gaps, this.breakpoint, 20));
	resolvedPartialDelta = $derived(resolver(this.partialDelta, this.breakpoint, 0));

	constructor(
		props: CarouselOptions,
		public id: string
	) {
		bind(this, props);
	}

	/**
	 * Updates carousel state based on current scroll position
	 * Calculates: currentSlide, progress, canScrollNext/Prev, slidesInView, dots
	 * Also handles autoPlay restart if not paused
	 */
	updateStateFromScroll() {
		if (!this.container) return;

		const slideCount = this.slides.length;
		const slidesPerView = this.resolvedLayout;
		const axis = this.resolvedAxis;

		// Calculate current slide based on scroll position
		const currentSlide = this.calculateCurrentSlide(axis, slideCount, slidesPerView);

		// Update navigation state
		this.currentSlide = currentSlide;
		this.canScrollNext = currentSlide < slideCount - slidesPerView;
		this.canScrollPrev = currentSlide > 0;

		// Calculate scroll progress percentage
		this.progress = this.calculateProgress(axis);

		// Update slides in view
		this.slidesInView = Array.from({ length: slideCount }, (_, i) => i).filter(
			(slide) => slide >= currentSlide && slide < currentSlide + slidesPerView
		);

		// Update dots state
		this.dots = this.calculateDots(slideCount, slidesPerView, currentSlide);

		// Restart autoPlay if not paused
		if (!this.autoPlayPaused) {
			this.startPlay();
		}
	}

	private calculateCurrentSlide(
		axis: 'x' | 'y',
		slideCount: number,
		slidesPerView: number
	): number {
		if (!this.container) return 0;

		let currentSlide = 0;

		if (axis === 'x') {
			const scrollLeft = this.container.scrollLeft;
			if (scrollLeft < this.slideWidth / 2) {
				currentSlide = 0;
			} else if (
				scrollLeft >
				this.container.scrollWidth - this.container.clientWidth - this.slideWidth / 2
			) {
				currentSlide = Math.max(0, slideCount - slidesPerView);
			} else {
				currentSlide = Math.ceil((scrollLeft - this.slideWidth / 3) / this.slideWidth);
			}
		} else {
			currentSlide = Math.floor(this.container.scrollTop / this.slideHeight);
		}

		return Math.max(0, Math.min(currentSlide, slideCount - slidesPerView));
	}

	private calculateProgress(axis: 'x' | 'y'): number {
		if (!this.container) return 0;

		if (axis === 'x') {
			const maxScroll = this.container.scrollWidth - this.container.clientWidth;
			return maxScroll > 0 ? (this.container.scrollLeft / maxScroll) * 100 : 0;
		} else {
			const maxScroll = this.container.scrollHeight - this.container.clientHeight;
			return maxScroll > 0 ? (this.container.scrollTop / maxScroll) * 100 : 0;
		}
	}

	private calculateDots(slideCount: number, slidesPerView: number, currentSlide: number) {
		return Array.from({ length: slideCount - (slidesPerView - 1) }, (_, index) => ({
			active: index === currentSlide,
			a11y: {
				'aria-controls': `${this.id}-slide-${index + 1}`,
				'aria-label': `Slide ${index + 1}`,
				'aria-selected': index === currentSlide,
				id: `${this.id}-tab-${index + 1}`,
				role: 'tab',
				tabIndex: index === currentSlide ? undefined : -1
			}
		}));
	}

	navigate = (slide: number) => {
		if (!this.container) return;
		if (this.resolvedAxis === 'x') {
			const targetLeft = slide * this.slideWidth;
			this.container.scrollLeft = targetLeft;
		} else {
			const targetTop = slide * this.slideHeight + slide;
			this.container.scrollTop = targetTop;
		}
		this.updateStateFromScroll();
	};
	startPlay = () => {
		if (this.autoPlay) {
			if (this.autoPlayTimeout) {
				clearInterval(this.autoPlayTimeout);
			}
			this.autoPlayTimeout = setInterval(() => {
				this.next();
			}, this.autoPlay * 1000);
		}
	};

	pauseAutoPlay = () => {
		if (this.autoPlayTimeout) {
			this.autoPlayPaused = true;
			clearInterval(this.autoPlayTimeout);
		}
	};
	resumePlay = () => {
		if (this.autoPlayPaused) {
			this.autoPlayPaused = false;
			this.startPlay();
		}
	};

	next = () => this.canScrollNext && this.navigate(this.currentSlide + 1);
	prev = () => this.canScrollPrev && this.navigate(this.currentSlide - 1);

	onSlide = (node: HTMLElement) => {
		if (!this.container) return;
		if (!this.slideWidth) this.slideWidth = node.clientWidth;
		if (!this.slideHeight) this.slideHeight = node.clientHeight;
		const index = Array.from(this.container.children).indexOf(node);
		node.setAttribute('id', `${this.id}-slide-${index + 1}`);
		node.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length} `);
		node.setAttribute('aria-roledescription', 'slide');
		node.setAttribute('role', 'tabpanel');
		node.setAttribute('data-carousel-slide', index.toString());
		this.slides.push(node);
	};

	attachment = (container: HTMLElement) => {
		return untrack(() => {
			this.container = container;

			const directChildrenObserver = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					mutation.addedNodes.forEach((node) => {
						if (node instanceof HTMLElement && node.parentElement === container) {
							this.onSlide(node);
						}
					});
				});
			});
			// Initialize existing slides
			Array.from(container.children).forEach((node) => {
				if (node instanceof HTMLElement) {
					this.onSlide(node);
				}
			});
			directChildrenObserver.observe(container, {
				childList: true,
				subtree: false
			});
			const offResize = on(window, 'resize', this.onResize);
			this.onResize();

			// Initialize drag system with carousel instance
			this.drag = new Drag(container, this);
			this.drag.init();

			// Update state on scroll - single handler
			const offScroll = on(container, 'scroll', () => {
				this.drag?.triggerScrollUpdate();
			});

			return () => {
				directChildrenObserver.disconnect();
				offResize();
				offScroll();
				this.drag?.destroy();
				this.drag = null;
			};
		});
	};

	onResize = () => {
		this.breakpoint = getSize();
	};
}
