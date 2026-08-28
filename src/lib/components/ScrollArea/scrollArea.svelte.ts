import { bind } from '$lib/utils/state.svelte.js';
import { useBoundingClientRect } from '$lib/utils/useBoundingClientRect.svelte.js';
import { useDrag } from '$lib/utils/useDrag.svelte.js';
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
	scrollY = $state(0);
	scrollX = $state(0);
	dragOffset = $state(0);
	// Force recalculation when resize happens
	viewportDimensions = $state<{ width: number; height: number }>({ width: 0, height: 0 });
	contentDimensions = $state<{ width: number; height: number }>({ width: 0, height: 0 });

	// Measured from the viewport itself (the scroll container): with `overflow: scroll` its
	// scrollWidth/scrollHeight are always defined and reflect overflow. Live reads, re-evaluated
	// whenever the observed dimensions change — the ResizeObservers bump
	// `viewportDimensions`/`contentDimensions` (the display:table content wrapper makes horizontal
	// content changes observable), which invalidates these deriveds.
	maxScrollY = $derived.by(() => {
		if (!this.viewportElement) return 0;
		this.viewportDimensions;
		this.contentDimensions;
		return Math.max(0, this.viewportElement.scrollHeight - this.viewportElement.clientHeight);
	});
	scrollbarYEnabled = $derived(this.maxScrollY > 0);

	maxScrollX = $derived.by(() => {
		if (!this.viewportElement) return 0;
		this.viewportDimensions;
		this.contentDimensions;
		return Math.max(0, this.viewportElement.scrollWidth - this.viewportElement.clientWidth);
	});
	scrollbarXEnabled = $derived(this.maxScrollX > 0);

	visible = $derived(this.scrollbarYEnabled);
	visibleX = $derived(this.scrollbarXEnabled);
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
		const thumbYRatio = this.viewportElement.clientHeight / this.viewportElement.scrollHeight;
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

	thumbXSize = $derived.by(() => {
		if (
			!this.scrollbarXEnabled ||
			!this.scrollbarXElement ||
			!this.viewportElement ||
			!this.contentElement
		) {
			return 0;
		}
		const scrollbarXWidth = this.scrollbarXElement.clientWidth;
		const thumbXRatio = this.viewportElement.clientWidth / this.viewportElement.scrollWidth;
		return Math.max(thumbXRatio * scrollbarXWidth, 18);
	});

	dragX = useDrag({
		isActive: true,
		onDragStart: ({ clientX, target }) => {
			const thumbRect = (target! as HTMLElement).getBoundingClientRect();
			this.dragOffset = clientX - thumbRect.left;
		},
		onDrag: ({ clientX }) => {
			if (!this.scrollbarXElement) return;
			const trackRect = this.scrollbarXElement.getBoundingClientRect();
			const maxThumbPos = Math.max(0, trackRect.width - this.thumbXSize);
			let newThumbLeft = clientX - this.dragOffset - trackRect.left;
			newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbPos));
			const scrollPercentage = maxThumbPos > 0 ? newThumbLeft / maxThumbPos : 0;
			this.viewportElement!.scrollLeft = scrollPercentage * this.maxScrollX;
		}
	});
	isDraggingX = $derived(this.dragX.isDragging);

	// The viewport is the focusable scroll region — but only when it actually overflows, so an
	// idle ScrollArea (e.g. a dropdown whose items fit) adds no phantom tab stop. Native
	// `overflow: auto` then handles all keyboard scrolling (arrows, PageUp/Down, Home/End, Space).
	viewportTabindex = $derived(this.scrollbarYEnabled || this.scrollbarXEnabled ? 0 : -1);

	// Warning : non reactive.
	hoover = $derived(
		useHoverAction({
			delay: this.delay,
			isActive: () => this.type === 'hover'
		})
	);

	thumbYPosition = $derived.by(() => {
		if (this.maxScrollY <= 0 || !this.scrollbarYElement) return 0;
		const trackHeight = this.scrollbarYElement.clientHeight;
		return (this.scrollY / this.maxScrollY) * (trackHeight - this.thumbYSize);
	});

	thumbXPosition = $derived.by(() => {
		if (this.maxScrollX <= 0 || !this.scrollbarXElement) return 0;
		const trackWidth = this.scrollbarXElement.clientWidth;
		return (this.scrollX / this.maxScrollX) * (trackWidth - this.thumbXSize);
	});

	// Wheel / touch / trackpad / momentum scrolling is fully NATIVE via the viewport's
	// `overflow: auto` — no custom handlers needed. This class only reads the native scroll
	// offset (handleScroll) to position the custom thumbs, and drives programmatic scroll for
	// thumb-drag, track-click, keyboard, and edge auto-scroll.

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
			this.scrollX = this.viewportElement.scrollLeft;
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

	handleTrackClickX = (event: MouseEvent) => {
		if (!this.viewportElement || !this.scrollbarXElement) return;
		if (event.composedPath().some((el) => el instanceof HTMLElement && el.dataset.thumb === ''))
			return;
		const trackRect = this.scrollbarXElement.getBoundingClientRect();
		const clickX = event.clientX - trackRect.left;
		const maxThumbPos = Math.max(0, trackRect.width - this.thumbXSize);
		const targetThumbPos = clickX - this.thumbXSize / 2;
		const clampedThumbPos = Math.max(0, Math.min(targetThumbPos, maxThumbPos));
		const scrollPercentage = maxThumbPos > 0 ? clampedThumbPos / maxThumbPos : 0;
		this.viewportElement.scrollLeft = scrollPercentage * this.maxScrollX;
	};

	viewportAttachment = (element: HTMLElement) => {
		this.viewportElement = element;
		const offScroll = on(element, 'scroll', this.handleScroll);
		// Hide the native scrollbars cross-browser (WebKit handled via the component <style>).
		element.style.scrollbarWidth = 'none'; // Firefox + standard
		element.style.setProperty('-ms-overflow-style', 'none'); // old Edge/IE

		// Observe viewport resize; bumping the dimension state invalidates the live-read deriveds.
		const resizeObserver = useResizeObserver({
			isActive: () => true,
			callback: () => {
				this.viewportDimensions = { width: element.clientWidth, height: element.clientHeight };
			}
		});
		const offResize = resizeObserver.reference?.(element);

		return () => {
			offScroll();
			offResize?.();
		};
	};

	contentAttachment = (element: HTMLElement) => {
		this.contentElement = element;

		// Observe content resize (thumb sizing + overflow detection). With the content wrapper's
		// display:table, its border-box tracks the true content width, so this fires on horizontal
		// content changes too.
		const resizeObserver = useResizeObserver({
			isActive: () => true,
			callback: () => {
				this.contentDimensions = { width: element.scrollWidth, height: element.scrollHeight };
			}
		});
		const offResize = resizeObserver.reference?.(element);

		return () => {
			offResize?.();
		};
	};

	// Forward a wheel over the (overlaid) custom scrollbar to the viewport, so wheeling on the
	// thin bar scrolls the content just like wheeling on the viewport does.
	private forwardWheelToViewport = (event: WheelEvent) => {
		if (!this.viewportElement) return;
		this.viewportElement.scrollTop += event.deltaY;
		this.viewportElement.scrollLeft += event.deltaX;
		event.preventDefault();
	};

	trackAttachment = (element: HTMLElement) => {
		const offClick = on(element, 'click', this.handleTrackClick);
		const offWheel = on(element, 'wheel', this.forwardWheelToViewport, { passive: false });
		return () => {
			offClick();
			offWheel();
		};
	};

	trackAttachmentX = (element: HTMLElement) => {
		const offClick = on(element, 'click', this.handleTrackClickX);
		const offWheel = on(element, 'wheel', this.forwardWheelToViewport, { passive: false });
		return () => {
			offClick();
			offWheel();
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
