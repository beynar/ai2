import { untrack, type Snippet } from 'svelte';
import { bind, getSize } from './utils.js';
import { Blossom } from '@blossom-carousel/core';
import { on } from 'svelte/events';
import { SvelteMap } from 'svelte/reactivity';
import type { Colors } from '$lib/types/theme.js';
import type { CarouselThemeProps } from './carousel.theme.js';
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';

export type ResponsiveProperty<T = number> = Partial<Record<Sizes, T>> & { default: T };
type NavigationButton = {
	'aria-controls': string;
	'aria-label': string;
};
type Dot = {
	active: boolean;
	attributes: {
		'data-active': boolean;
		'aria-controls': string;
		'aria-label': string;
		'aria-selected': boolean;
		onclick: () => void;
	};
};

const memoizedDerived = <T>(fn: () => T) => {
	let value = $state<T | null>(fn());
	$effect(() => {
		const newValue = fn();
		untrack(() => {
			if (newValue) {
				value = newValue;
			}
		});
	});
	return {
		get current() {
			return value;
		}
	};
};

export interface CarouselProps {
	class?: string;
	dragFree?: boolean;
	children?: Snippet<[CarouselState]>;
	snapAlign?: 'start' | 'center' | 'end';
	dots?:
		| Snippet<[CarouselState, Dot[]]>
		| {
				color?: Colors;
				size?: Sizes;
		  };
	navigationButton?:
		| {
				color?: Colors;
				size?: Sizes;
		  }
		| Snippet<[CarouselState, NavigationButton, 'prev' | 'next']>;
	theme?: CarouselThemeProps;

	// autoPlay?: number;
	// pauseOnHover?: boolean;

	layout?: ResponsiveProperty;
	gaps?: ResponsiveProperty;
	partialDelta?: ResponsiveProperty;
}
type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type CarouselOptions = MakeRequired<
	Pick<CarouselProps, 'layout' | 'gaps' | 'partialDelta'>,
	'layout' | 'gaps' | 'partialDelta'
>;
export interface CarouselState extends CarouselOptions {}

const resolver = <T>(
	property: ResponsiveProperty<T> | undefined,
	breakpoint: Sizes,
	defaultValue: T
): T => {
	if (typeof property === 'object') {
		const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'] as const;
		const activeBreakpointValue = property?.[breakpoint];
		if (activeBreakpointValue) return activeBreakpointValue;
		const defaultBreakpointValue = property?.default;
		if (defaultBreakpointValue) return defaultBreakpointValue;
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
	}
	return property as T;
};

type Slide = {
	index: number;
	intersectionObserver: IntersectionObserver;
	node: HTMLElement;
	inView: boolean;
};

export class CarouselState {
	container = $state<HTMLElement>();
	scrollLeft = $state(0);
	slides = new SvelteMap<HTMLElement, Slide>();
	slideWidth = $state(0);
	slideHeight = $state(0);

	breakpoint = $state<Sizes>('xs');
	resolvedLayout = $derived(resolver(this.layout, this.breakpoint, 1));
	resolvedGaps = $derived(resolver(this.gaps, this.breakpoint, 20));
	sortedSlides = $derived(Array.from(this.slides.values()).sort((a, b) => a.index - b.index));

	currentSlide = memoizedDerived<Slide | null>(() => {
		return this.sortedSlides.find((slide) => slide?.inView) || null;
	});

	lastSlideInView = $derived(this.sortedSlides.findLast((slide) => slide?.inView));
	canScrollNext = $derived(
		this.lastSlideInView && this.lastSlideInView.index < this.sortedSlides.length - 1
	);
	canScrollPrev = $derived(this.currentSlide.current && this.currentSlide.current.index > 0);

	dots = $derived.by(() => {
		const dotCounts = Math.ceil(this.sortedSlides.length / this.resolvedLayout);
		return Array.from({ length: dotCounts }, (_, index) => {
			const startIndex = index * this.resolvedLayout;
			const endIndex = startIndex + this.resolvedLayout;
			const isLast = index === dotCounts - 1;
			const isLastSlide = this.lastSlideInView?.index === this.sortedSlides.at(-1)?.index;
			const active =
				((this.currentSlide.current?.index || 0) >= startIndex &&
					(this.currentSlide.current?.index || 0) < endIndex &&
					!isLastSlide) ||
				(isLast && isLastSlide);
			return {
				active,
				attributes: {
					'data-active': active,
					'aria-controls': `${this.id}-slide-${index + 1}`,
					'aria-label': `Slide ${index + 1}`,
					'aria-selected': active,
					onclick: () => {
						this.moveToSlide({ node: this.sortedSlides[index * this.resolvedLayout]?.node });
					}
				}
			};
		});
	});

	nextButton = $derived.by(() => {
		return {
			disabled: !this.canScrollNext,
			'aria-controls': `${this.id}`,
			'aria-label': 'Next slide',
			onclick: () => {
				this.next();
			}
		};
	});

	prevButton = $derived.by(() => {
		return {
			disabled: !this.canScrollPrev,
			'aria-controls': `${this.id}`,
			'aria-label': 'Previous slide',
			onclick: () => {
				this.prev();
			}
		};
	});

	constructor(
		public props: CarouselOptions,
		public id: string
	) {
		bind(this, props);
	}

	private onSlide = (node: HTMLElement) => {
		if (!this.container) return;
		if (!this.slideWidth) this.slideWidth = node.clientWidth;
		if (!this.slideHeight) this.slideHeight = node.clientHeight;
		const index = Array.from(this.container.children).indexOf(node);
		node.setAttribute('id', `${this.id}-slide-${index + 1}`);
		node.setAttribute('aria-roledescription', 'slide');
		node.setAttribute('role', 'tabpanel');
		node.setAttribute('data-carousel-slide', index.toString());
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const slide = this.slides.get(entry.target as HTMLElement);
					if (slide) {
						this.slides.set(node, {
							...slide,
							inView: entry.isIntersecting
						});
						entry.target.setAttribute('data-in-view', entry.isIntersecting.toString());
					}
				});
			},
			{
				threshold: 0.9
			}
		);
		intersectionObserver.observe(node);
		this.slides.set(node, {
			index,
			node,
			intersectionObserver,
			inView: false
		});

		Array.from(this.slides.values()).forEach((slide) => {
			slide.node.setAttribute('aria-label', `Slide ${slide.index + 1} of ${this.slides.size}`);
		});
	};

	private onResize = () => {
		this.breakpoint = getSize();
	};

	private moveToSlide = (slide?: { node: HTMLElement }) => {
		slide &&
			this.container?.scrollTo({
				left: slide.node.offsetLeft,
				behavior: 'smooth'
			});
	};
	next = (count: number = this.resolvedLayout) => {
		if (!this.currentSlide.current || !this.canScrollNext) return;
		const nextSlideIndex = Math.min(this.slides.size - 1, this.currentSlide.current.index + count);
		const nextSlide = this.sortedSlides.find((slide) => slide?.index === nextSlideIndex);
		this.moveToSlide(nextSlide);
	};
	prev = (count: number = this.resolvedLayout) => {
		if (!this.currentSlide.current || !this.canScrollPrev) return;
		const prevSlideIndex = Math.max(0, this.currentSlide.current.index - count);
		const prevSlide = this.sortedSlides.find((slide) => slide?.index === prevSlideIndex);
		this.moveToSlide(prevSlide);
	};

	private observeSlides = (container: HTMLElement) => {
		const directChildrenObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node instanceof HTMLElement && node.parentElement === container) {
						this.onSlide(node);
					}
				});
				mutation.removedNodes.forEach((node) => {
					if (node instanceof HTMLElement && node.parentElement === container) {
						const slide = this.slides.get(node);
						if (slide) {
							slide.intersectionObserver.disconnect();
							this.slides.delete(node);
						}
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

		return () => {
			directChildrenObserver.disconnect();
		};
	};

	onScroll = (e: Event) => {
		this.scrollLeft = (e.target as HTMLElement).scrollLeft;
	};

	attachment = (container: HTMLElement) => {
		return untrack(() => {
			this.container = container;
			const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
			const blossom = Blossom(container);
			if (hasMouse) {
				blossom.init();
			}
			const offResize = on(window, 'resize', this.onResize);
			const offScroll = on(container, 'scroll', this.onScroll);
			this.onResize();
			const offSlides = this.observeSlides(container);
			return () => {
				if (hasMouse) {
					blossom?.destroy();
				}
				offResize();
				offSlides();
				offScroll();
			};
		});
	};
}
