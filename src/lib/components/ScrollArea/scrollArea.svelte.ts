import { bind } from '$lib/utils/state.svelte.js';
import { useBoundingClientRect } from '$lib/utils/useBoundingClientRect.svelte.js';
import { useDrag } from '$lib/utils/useDrag.svelte.js';
import { useHotKey } from '$lib/utils/useHotKey.svelte.js';
import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';
import { useResizeObserver } from '$lib/utils/useResizeObserver.svelte.js';
import { on } from 'svelte/events';

export interface ScrollAreaOptions {
	delay: number;
	type: 'auto' | 'always' | 'scroll' | 'hover';
	scrollOnEdges: boolean;
}

export interface ScrollArea extends ScrollAreaOptions {}

export class ScrollArea {
	constructor(props: ScrollAreaOptions) {
		bind(this, props);
	}

	viewportElement = $state<HTMLElement>();
	contentElement = $state<HTMLElement>();
	scrollbarXElement = $state<HTMLElement>();
	scrollbarYElement = $state<HTMLElement>();
	scrollbarXDimensions = $state<DOMRectReadOnly>();
	scrollbarYDimensions = $state<DOMRectReadOnly>();
	scrollbarXEnabled = $state(false);
	scrollY = $state(0);
	dragOffset = $state(0);
	// Force recalculation when resize happens
	viewportDimensions = $state<{ width: number; height: number }>({ width: 0, height: 0 });
	contentDimensions = $state<{ width: number; height: number }>({ width: 0, height: 0 });

	maxScrollY = $derived.by(() => {
		if (!this.contentElement || !this.viewportElement) {
			return 0;
		}
		// Access reactive state to ensure recalculation
		this.viewportDimensions;
		this.contentDimensions;
		return this.contentElement.scrollHeight - this.viewportElement.clientHeight;
	});
	scrollbarYEnabled = $derived(this.maxScrollY > 0);
	visible = $derived(this.scrollbarYEnabled); // or add hover/auto logic
	canScrollUp = $derived(this.maxScrollY > 0 && this.scrollY > 0);
	canScrollDown = $derived(this.maxScrollY > 0 && this.scrollY < this.maxScrollY);
	thumbRect = useBoundingClientRect();
	trackRect = useBoundingClientRect();
	thumbYSize = $derived.by(() => {
		if (
			!this.scrollbarYEnabled ||
			!this.scrollbarYElement ||
			!this.viewportElement ||
			!this.contentElement
		) {
			return 0;
		}
		const scrollbarYHeight = this.scrollbarYElement.clientHeight;
		const thumbYRatio = this.viewportElement.clientHeight / this.contentElement.scrollHeight;
		return Math.max(thumbYRatio * scrollbarYHeight, 18);
	});

	dragY = useDrag({
		isActive: true,
		onDragStart: ({ clientY, target }) => {
			// Calculate offset from mouse to thumb top using fresh rects
			const thumbRect = (target! as HTMLElement).getBoundingClientRect();
			this.dragOffset = clientY - thumbRect.top;
		},
		onDrag: ({ clientY }) => {
			if (!this.scrollbarYElement) return;

			// Get fresh track rect at drag time
			const trackRect = this.scrollbarYElement.getBoundingClientRect();
			const maxThumbPos = Math.max(0, trackRect.height - this.thumbYSize);

			// Calculate new thumb position relative to track
			let newThumbTop = clientY - this.dragOffset - trackRect.top;
			newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbPos));

			const scrollPercentage = maxThumbPos > 0 ? newThumbTop / maxThumbPos : 0;
			this.viewportElement!.scrollTop = scrollPercentage * this.maxScrollY;
		}
	});
	isDraggingY = $derived(this.dragY.isDragging);

	lineHeight = 20;
	get pageSize() {
		return this.viewportElement?.clientHeight || 0;
	}
	get newScrollTop() {
		return this.viewportElement?.scrollTop || 0;
	}

	// Warning : non reactive.
	hoover = $derived(
		useHoverAction({
			delay: this.delay,
			isActive: this.type === 'hover'
		})
	);

	keydown = useHotKey({
		isActive: true,
		onWindow: false,
		hotKeys: {
			arrowup: () => {
				this.viewportElement!.scrollTo({
					top: Math.max(0, this.newScrollTop - this.lineHeight),
					behavior: 'smooth'
				});
			},

			arrowdown: () => {
				this.viewportElement!.scrollTo({
					top: Math.min(this.maxScrollY, this.newScrollTop + this.lineHeight),
					behavior: 'smooth'
				});
			},

			'alt+arrowup': () => {
				this.viewportElement!.scrollTo({
					top: Math.max(0, this.newScrollTop - this.pageSize),
					behavior: 'smooth'
				});
			},

			'alt+arrowdown': () => {
				this.viewportElement!.scrollTo({
					top: Math.min(this.maxScrollY, this.newScrollTop + this.pageSize),
					behavior: 'smooth'
				});
			},
			'mod+arrowup': () => {
				this.viewportElement!.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			},

			'mod+arrowdown': () => {
				this.viewportElement!.scrollTo({
					top: this.maxScrollY,
					behavior: 'smooth'
				});
			}
		}
	});

	thumbYPosition = $derived.by(() => {
		if (this.maxScrollY <= 0 || !this.scrollbarYElement) return 0;
		const trackHeight = this.scrollbarYElement.clientHeight;
		return (this.scrollY / this.maxScrollY) * (trackHeight - this.thumbYSize);
	});

	private handleWheel = (event: WheelEvent) => {
		if (!this.contentElement || !this.viewportElement) return;
		event.preventDefault();
		event.stopPropagation();
		this.viewportElement.scrollTop = this.viewportElement.scrollTop + event.deltaY;
	};

	isScrolling = $state<ReturnType<typeof setTimeout> | null>(null);

	private handleScroll = (event: Event) => {
		if (this.isScrolling) {
			clearTimeout(this.isScrolling);
		}
		this.isScrolling = setTimeout(() => {
			this.isScrolling = null;
		}, 400);
		if (this.viewportElement) {
			this.scrollY = this.viewportElement.scrollTop;
		}
	};

	handleTrackClick = (event: MouseEvent) => {
		if (!this.viewportElement || !this.scrollbarYElement) return;

		// Don't handle clicks on the thumb itself
		if (event.composedPath().some((el) => el instanceof HTMLElement && el.dataset.thumb === ''))
			return;

		// Get click position relative to the track element
		const trackElement = this.scrollbarYElement;
		const trackRect = trackElement.getBoundingClientRect();
		const clickY = event.clientY - trackRect.top;

		// Calculate the maximum thumb position (track height minus thumb height)
		const maxThumbPos = Math.max(0, trackRect.height - this.thumbYSize);

		// Center the thumb on the click position
		const targetThumbPos = clickY - this.thumbYSize / 2;
		const clampedThumbPos = Math.max(0, Math.min(targetThumbPos, maxThumbPos));

		// Convert thumb position to scroll position
		const scrollPercentage = maxThumbPos > 0 ? clampedThumbPos / maxThumbPos : 0;
		this.viewportElement.scrollTop = scrollPercentage * this.maxScrollY;
	};

	viewportAttachment = (element: HTMLElement) => {
		this.viewportElement = element;
		const offScroll = on(element, 'scroll', this.handleScroll);
		element.style.scrollbarWidth = 'none';

		// Observe viewport resize to update scroll state
		const resizeObserver = useResizeObserver({
			isActive: true,
			callback: () => {
				this.viewportDimensions = {
					width: element.clientWidth,
					height: element.clientHeight
				};
			}
		});
		const offResize = resizeObserver.attachment?.(element);

		return () => {
			offScroll();
			offResize?.();
		};
	};

	contentAttachment = (element: HTMLElement) => {
		this.contentElement = element;
		const offWheel = on(element, 'wheel', this.handleWheel);

		// Observe content resize to update scroll state
		const resizeObserver = useResizeObserver({
			isActive: true,
			callback: () => {
				this.contentDimensions = {
					width: element.scrollWidth,
					height: element.scrollHeight
				};
			}
		});
		const offResize = resizeObserver.attachment?.(element);

		return () => {
			offWheel();
			offResize?.();
		};
	};

	trackAttachment = (element: HTMLElement) => {
		const offClick = on(element, 'click', this.handleTrackClick);
		return () => {
			offClick();
		};
	};

	private scrollAnimationFrame = $state<number | null>(null);
	private edgeScrollSpeed = $state(0);

	get scrollOnEdgesAttachment() {
		if (!this.scrollOnEdges) return null;
		return (element: HTMLElement) => {
			const edgeThreshold = 10; // pixels from edge to trigger scroll
			const maxScrollSpeed = 3; // pixels per frame

			const handlePointerMove = (event: PointerEvent) => {
				if (!this.viewportElement || !this.scrollbarYEnabled) {
					this.stopEdgeScroll();
					return;
				}

				const rect = element.getBoundingClientRect();
				const pointerY = event.clientY - rect.top;
				const elementHeight = rect.height;

				// Check if pointer is near top edge
				if (pointerY < edgeThreshold && pointerY >= 0) {
					const intensity = 1 - pointerY / edgeThreshold;
					this.edgeScrollSpeed = -maxScrollSpeed * intensity;
					this.startEdgeScroll();
				}
				// Check if pointer is near bottom edge
				else if (pointerY > elementHeight - edgeThreshold && pointerY <= elementHeight) {
					const distanceFromBottom = elementHeight - pointerY;
					const intensity = 1 - distanceFromBottom / edgeThreshold;
					this.edgeScrollSpeed = maxScrollSpeed * intensity;
					this.startEdgeScroll();
				}
				// Not near any edge
				else {
					this.stopEdgeScroll();
				}
			};

			const handlePointerLeave = () => {
				this.stopEdgeScroll();
			};

			const offMove = on(element, 'pointermove', handlePointerMove);
			const offLeave = on(element, 'pointerleave', handlePointerLeave);

			return () => {
				this.stopEdgeScroll();
				offMove();
				offLeave();
			};
		};
	}

	private startEdgeScroll() {
		if (this.scrollAnimationFrame !== null) return;

		const scroll = () => {
			if (!this.viewportElement || this.edgeScrollSpeed === 0) {
				this.stopEdgeScroll();
				return;
			}

			const newScrollTop = this.viewportElement.scrollTop + this.edgeScrollSpeed;
			const clampedScrollTop = Math.max(0, Math.min(newScrollTop, this.maxScrollY));

			// Stop if we've reached the limit
			if (
				(this.edgeScrollSpeed < 0 && clampedScrollTop === 0) ||
				(this.edgeScrollSpeed > 0 && clampedScrollTop === this.maxScrollY)
			) {
				this.stopEdgeScroll();
				return;
			}

			this.viewportElement.scrollTop = clampedScrollTop;
			this.scrollAnimationFrame = requestAnimationFrame(scroll);
		};

		this.scrollAnimationFrame = requestAnimationFrame(scroll);
	}

	private stopEdgeScroll() {
		if (this.scrollAnimationFrame !== null) {
			cancelAnimationFrame(this.scrollAnimationFrame);
			this.scrollAnimationFrame = null;
		}
		this.edgeScrollSpeed = 0;
	}
}
