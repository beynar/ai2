import { bind } from '$lib/utils/state.svelte.js';
import { useBoundingClientRect } from '$lib/utils/useBoundingClientRect.svelte.js';
import { useDrag } from '$lib/utils/useDrag.svelte.js';
import { useHotKey } from '$lib/utils/useHotKey.svelte.js';
import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';
import { on } from 'svelte/events';

export interface ScrollAreaOptions {
	delay: number;
	type: 'auto' | 'always' | 'scroll' | 'hover';
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
	maxScrollY = $derived.by(() => {
		if (!this.contentElement || !this.viewportElement) {
			return 0;
		}
		return this.contentElement.scrollHeight - this.viewportElement.clientHeight;
	});
	scrollbarYEnabled = $derived(this.maxScrollY > 0);
	visible = $derived(this.scrollbarYEnabled); // or add hover/auto logic
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
		return () => offScroll();
	};

	contentAttachment = (element: HTMLElement) => {
		this.contentElement = element;
		const offWheel = on(element, 'wheel', this.handleWheel);

		return () => {
			offWheel();
		};
	};

	trackAttachment = (element: HTMLElement) => {
		const offClick = on(element, 'click', this.handleTrackClick);
		return () => {
			offClick();
		};
	};
}
