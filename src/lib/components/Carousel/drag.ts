interface Point {
	x: number;
	y: number;
}

interface HasOverflow {
	x: boolean;
	y: boolean;
}

interface SnapPoint {
	target: HTMLElement | null;
	x: number;
	y?: number;
}

import type { CarouselState } from './carousel.state.svelte.js';

const FRICTION = 0.85;
const DAMPING = 0.8;

export class Drag {
	node: HTMLElement;
	private carousel: CarouselState;
	private snap = true;

	// Reactive getters for carousel properties
	private get axis() {
		return this.carousel.resolvedAxis;
	}
	private get dragFree() {
		return this.carousel.dragFree ?? false;
	}
	private get oneAtTime() {
		return this.carousel.oneAtTime ?? false;
	}
	private get disableNativeScroll() {
		return this.carousel.resolvedDisableNativeScroll;
	}
	private pointerStart: Point = { x: 0, y: 0 };
	private target: Point = { x: 0, y: 0 };
	private velocity: Point = { x: 0, y: 0 };
	private virtualScroll: Point = { x: 0, y: 0 };
	private distanceMovedSincePointerDown: Point = { x: 0, y: 0 };
	private hasOverflow: HasOverflow = { x: false, y: false };
	private end = 0;
	private raf: number | null = null;
	private isDragging = false;
	private scrollerScrollWidth = 0;
	private scrollerWidth = 0;
	private scrollerScrollHeight = 0;
	private scrollerHeight = 0;
	private padding = { start: 0, end: 0 };
	private scrollPadding = { start: 0, end: 0 };
	private snapPoints: SnapPoint[] = [];
	private links: NodeListOf<HTMLAnchorElement> | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private mutationObserver: MutationObserver | null = null;
	private hasSnap = false;
	private restoreScrollMethods: (() => void) | null = null;
	private dir = 1;
	private activeSnapPoint: SnapPoint = { target: null, x: 0 };
	private isTicking = false;
	private frameDelta = 0;
	private lastTick = 0;
	private rubberBandOffset = 0;
	private __scrollingInternally = false;

	constructor(node: HTMLElement, carousel: CarouselState) {
		this.node = node;
		this.carousel = carousel;
	}

	get dragging(): boolean {
		return this.isDragging;
	}

	init() {
		this.node.setAttribute('blossom-carousel', 'true');
		this.links = this.node.querySelectorAll('a[href]');
		this.links.forEach((el) => {
			el.addEventListener('click', this.onLinkClick);
		});

		window.addEventListener('keydown', this.onKeydown);

		this.resizeObserver = new ResizeObserver(() => this.onResize());
		this.resizeObserver.observe(this.node);

		this.mutationObserver = new MutationObserver(() => this.onResize());
		this.mutationObserver.observe(this.node, {
			attributes: false,
			childList: true,
			subtree: false
		});

		const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

		this.dir = this.node.closest('[dir="rtl"]') ? -1 : 1;

		const { scrollSnapType } = window.getComputedStyle(this.node);
		this.hasSnap = scrollSnapType !== 'none';
		this.node.style.setProperty('--snap-type', scrollSnapType);
		if (hasMouse) {
			this.node.style.scrollSnapType = 'none';
		}

		this.restoreScrollMethods = this.interceptScrollIntoViewCalls((target) => {
			if (target === this.node || this.node.contains(target)) {
				this.setIsTicking(false);
			}
		});

		this.onResize();
	}

	destroy() {
		this.node.removeAttribute('blossom-carousel');
		this.resizeObserver?.disconnect();
		this.mutationObserver?.disconnect();
		if (this.raf) cancelAnimationFrame(this.raf);

		window.removeEventListener('keydown', this.onKeydown);
		this.node.removeEventListener('pointerdown', this.onPointerDown);
		this.node.removeEventListener('wheel', this.onWheel);

		this.links?.forEach((el) => {
			el.removeEventListener('click', this.onLinkClick);
		});

		this.restoreScrollMethods?.();
	}

	private onLinkClick = (e: MouseEvent): void => {
		if (this.distanceMovedSincePointerDown.x > 10) {
			e.preventDefault();
		}
	};

	private onResize = (): void => {
		if (!this.node) return;

		const hasTouch = 'ontouchmove' in window;
		this.scrollerScrollWidth = this.node.scrollWidth;
		this.scrollerWidth = this.node.clientWidth;
		this.scrollerScrollHeight = this.node.scrollHeight;
		this.scrollerHeight = this.node.clientHeight;

		const styles = window.getComputedStyle(this.node);
		const axis = this.axis;

		this.hasOverflow.x =
			!hasTouch &&
			axis === 'x' &&
			this.scrollerScrollWidth > this.scrollerWidth &&
			['auto', 'scroll'].includes(styles.getPropertyValue('overflow-x'));
		this.hasOverflow.y =
			!hasTouch &&
			axis === 'y' &&
			this.scrollerScrollHeight > this.scrollerHeight &&
			['auto', 'scroll'].includes(styles.getPropertyValue('overflow-y'));

		this.padding.end = parseInt(styles.paddingInlineEnd) || 0;
		this.padding.start = parseInt(styles.paddingInlineStart) || 0;
		this.scrollPadding.start = parseInt(styles.scrollPaddingInlineStart) || 0;
		this.scrollPadding.end = parseInt(styles.scrollPaddingInlineEnd) || 0;
		this.dir = this.node.closest('[dir="rtl"]') ? -1 : 1;
		this.end = (this.scrollerScrollWidth - this.scrollerWidth - 4) * this.dir;

		this.snapPoints = !this.hasSnap ? [] : this.findSnapPoints(this.node);

		// Update overflow event listeners
		if (this.hasOverflow.x || this.hasOverflow.y) {
			this.node.setAttribute('has-overflow', 'true');
			this.node.addEventListener('pointerdown', this.onPointerDown);
			this.node.addEventListener('wheel', this.onWheel, { passive: false });
		} else {
			this.node.removeAttribute('has-overflow');
			this.node.removeEventListener('pointerdown', this.onPointerDown);
			this.node.removeEventListener('wheel', this.onWheel);
		}
	};

	private onMutation = (): void => {
		this.onResize();
	};

	private findSnapPoints(scroller: HTMLElement): SnapPoint[] {
		let points: { align: string; el: HTMLElement | Element }[] = [];

		let cycles = 0;
		const traverseDOM = (node: HTMLElement | Element) => {
			cycles++;
			if (cycles > 100) return;

			const styles = window.getComputedStyle(node);
			const scrollSnapAlign = styles.scrollSnapAlign;

			if (scrollSnapAlign !== 'none') {
				points.push({
					align: scrollSnapAlign,
					el: node
				});
				return;
			}

			const children = node.children;
			if (children.length === 0) return;
			for (const child of children) {
				traverseDOM(child);
			}
		};
		traverseDOM(scroller);

		const scrollerRect = scroller.getBoundingClientRect();
		const snapPointsArray: (SnapPoint | null)[] = points.map(({ el, align }) => {
			const elementRect = (el as HTMLElement).getBoundingClientRect();
			const clientWidth = (el as HTMLElement).clientWidth;
			const left = elementRect.left - scrollerRect.left + scroller.scrollLeft;

			switch (align) {
				case 'start':
					return {
						target: el as HTMLElement,
						x: left - this.scrollPadding.start
					};
				case 'end':
					return {
						target: el as HTMLElement,
						x: left + clientWidth - this.scrollerWidth + this.scrollPadding.end
					};
				case 'center':
					return {
						target: el as HTMLElement,
						x: left + clientWidth * 0.5 - this.scrollerWidth / 2
					};
				default:
					return null;
			}
		});

		const filteredSnapPoints = snapPointsArray.filter(
			(snapPoint): snapPoint is SnapPoint => snapPoint !== null
		);

		return filteredSnapPoints.reduce((acc: SnapPoint[], curr: SnapPoint) => {
			if (acc.length === 0 || acc[acc.length - 1].x !== curr.x) {
				acc.push(curr);
			}
			return acc;
		}, []);
	}

	// Trigger state update via carousel
	public triggerScrollUpdate = (): void => {
		if (!this.isDragging) {
			this.carousel.updateStateFromScroll();
		}
	};

	private onPointerDown = (e: PointerEvent): void => {
		if (e.button !== 0) return;
		if (!this.hasOverflow.x && !this.hasOverflow.y) return;

		this.isDragging = true;
		this.node.setAttribute('data-dragging', 'true');
		this.distanceMovedSincePointerDown.x = 0;
		this.distanceMovedSincePointerDown.y = 0;

		this.pointerStart.x = e.clientX;
		this.pointerStart.y = e.clientY;

		if (this.hasOverflow.x) {
			this.target.x = this.node.scrollLeft;
			this.virtualScroll.x = this.node.scrollLeft;
		}
		if (this.hasOverflow.y) {
			this.target.y = this.node.scrollTop;
			this.virtualScroll.y = this.node.scrollTop;
		}

		this.setIsTicking(true);

		this.node.setPointerCapture(e.pointerId);
		this.node.addEventListener('pointermove', this.onPointerMove);
		this.node.addEventListener('pointerup', this.onPointerUp);
		this.node.addEventListener('pointercancel', this.onPointerUp);
	};

	private onPointerMove = (e: PointerEvent): void => {
		if (!this.isDragging) return;

		const deltaX = e.clientX - this.pointerStart.x;
		const deltaY = e.clientY - this.pointerStart.y;

		this.distanceMovedSincePointerDown.x += Math.abs(deltaX);
		this.distanceMovedSincePointerDown.y += Math.abs(deltaY);

		if (this.hasOverflow.x) {
			this.target.x = this.virtualScroll.x - deltaX * this.dir;
			this.velocity.x = -deltaX * this.dir;
		}
		if (this.hasOverflow.y) {
			this.target.y = this.virtualScroll.y - deltaY;
			this.velocity.y = -deltaY;
		}

		this.pointerStart.x = e.clientX;
		this.pointerStart.y = e.clientY;

		if (this.hasSnap) {
			const newSnapPoint = this.snapSelect({ axis: 'x' });
			if (newSnapPoint.x !== this.activeSnapPoint.x) {
				this.activeSnapPoint = newSnapPoint;
				this.dispatchScrollSnapChangingEvent(newSnapPoint);
			}
		}
	};

	private onPointerUp = (e: PointerEvent): void => {
		if (!this.isDragging) return;

		this.isDragging = false;
		this.node.setAttribute('data-dragging', 'false');
		this.node.releasePointerCapture(e.pointerId);
		this.node.removeEventListener('pointermove', this.onPointerMove);
		this.node.removeEventListener('pointerup', this.onPointerUp);
		this.node.removeEventListener('pointercancel', this.onPointerUp);

		if (this.distanceMovedSincePointerDown.x < 10 && this.distanceMovedSincePointerDown.y < 10) {
			this.setIsTicking(false);
			return;
		}

		if (this.hasSnap && !this.dragFree) {
			const snapPoint = this.snapSelect({ axis: 'x' });
			this.target.x = snapPoint.x;
			this.velocity.x = 0;
		}

		if (this.hasOverflow.x && Math.abs(this.velocity.x) < 0.5) {
			this.velocity.x = 0;
		}
		if (this.hasOverflow.y && Math.abs(this.velocity.y) < 0.5) {
			this.velocity.y = 0;
		}
	};

	private onWheel = (e: WheelEvent): void => {
		if (!this.hasOverflow.x && !this.hasOverflow.y) return;

		e.preventDefault();

		if (this.hasOverflow.x && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
			this.target.x += e.deltaX;
			this.velocity.x = e.deltaX * 0.5;
		} else if (this.hasOverflow.y) {
			this.target.y += e.deltaY;
			this.velocity.y = e.deltaY * 0.5;
		}

		this.setIsTicking(true);
	};

	private onKeydown = (e: KeyboardEvent): void => {
		if (e.target !== this.node && !this.node.contains(e.target as Node)) return;

		const axis = this.axis;
		const isX = axis === 'x';

		switch (e.key) {
			case 'ArrowLeft':
				if (isX) {
					e.preventDefault();
					this.target.x -= this.scrollerWidth * 0.75;
					this.setIsTicking(true);
				}
				break;
			case 'ArrowRight':
				if (isX) {
					e.preventDefault();
					this.target.x += this.scrollerWidth * 0.75;
					this.setIsTicking(true);
				}
				break;
			case 'ArrowUp':
				if (!isX) {
					e.preventDefault();
					this.target.y -= this.scrollerHeight * 0.75;
					this.setIsTicking(true);
				}
				break;
			case 'ArrowDown':
				if (!isX) {
					e.preventDefault();
					this.target.y += this.scrollerHeight * 0.75;
					this.setIsTicking(true);
				}
				break;
		}
	};

	private setIsTicking(bool: boolean): void {
		if (!this.node) return;

		if (bool && !this.isTicking) {
			this.lastTick = performance.now();
			if (this.hasOverflow.x) this.target.x = this.node.scrollLeft;
			if (this.hasOverflow.y) this.target.y = this.node.scrollTop;

			this.node.addEventListener('scrollend', this.onScrollEnd, {
				capture: true,
				passive: false
			});

			if (!this.raf) {
				this.raf = requestAnimationFrame(this.tick);
			}
		} else if (!bool) {
			if (this.raf) cancelAnimationFrame(this.raf);
			this.raf = null;
			this.node.removeEventListener('scrollend', this.onScrollEnd);
		}

		this.isTicking = bool;
		this.snap = !bool;
		this.node.setAttribute('has-snap', this.snap ? 'true' : 'false');
	}

	private onScrollEnd = (): void => {
		this.setIsTicking(false);
	};

	private tick = (t: number): void => {
		if (!this.isTicking) return; // Guard against race condition

		this.raf = requestAnimationFrame(this.tick);
		this.frameDelta = t - this.lastTick;

		if (!this.node) return;

		if (this.hasOverflow.x) {
			this.velocity.x *= FRICTION;
			if (!this.isDragging) {
				this.target.x += this.velocity.x;
				this.virtualScroll.x = this.damp(
					this.virtualScroll.x,
					this.target.x,
					DAMPING,
					this.frameDelta
				);
			} else {
				this.virtualScroll.x = this.damp(
					this.virtualScroll.x,
					this.target.x,
					FRICTION,
					this.frameDelta
				);
			}
		}

		if (this.hasOverflow.y) {
			this.velocity.y *= FRICTION;
			if (!this.isDragging) {
				this.target.y += this.velocity.y;
				this.virtualScroll.y = this.damp(
					this.virtualScroll.y,
					this.target.y,
					DAMPING,
					this.frameDelta
				);
			} else {
				this.virtualScroll.y = this.damp(
					this.virtualScroll.y,
					this.target.y,
					FRICTION,
					this.frameDelta
				);
			}
		}

		this.__scrollingInternally = true;
		this.node.scrollTo({
			left: this.virtualScroll.x,
			top: this.virtualScroll.y,
			behavior: 'instant' as ScrollBehavior
		});

		if (this.isDragging) {
			if (this.hasSnap) {
				const newSnapPoint = this.snapSelect({ axis: 'x' });
				if (newSnapPoint.x !== this.activeSnapPoint.x) {
					this.activeSnapPoint = newSnapPoint;
					this.dispatchScrollSnapChangingEvent(newSnapPoint);
				}
			}
		}

		if (
			!this.isDragging &&
			this.round(this.velocity.x, 8) === 0 &&
			this.round(this.velocity.y, 8) === 0
		) {
			this.setIsTicking(false);
			this.dispatchScrollEndEvent();
			if (this.hasSnap) {
				this.dispatchScrollSnapChangeEvent();
			}
		}

		this.applyRubberBanding(this.round(this.virtualScroll.x, 2));

		this.lastTick = t;
	};

	private applyRubberBanding(left: number): void {
		if (!this.node) return;

		const edge = this.end;

		let targetOffset = 0;
		if (left * this.dir <= 0) {
			targetOffset = this.isDragging ? left * -0.2 : 0;
		} else if (left * this.dir > edge * this.dir) {
			targetOffset = this.isDragging ? (left - edge) * -0.2 : 0;
		}
		this.rubberBandOffset = this.damp(
			this.rubberBandOffset,
			targetOffset,
			this.isDragging ? 0.8 : DAMPING,
			this.frameDelta
		);

		if (Math.abs(this.rubberBandOffset) > 0.01) {
			const evt = this.dispatchOverscrollEvent(this.rubberBandOffset);
			if (evt.defaultPrevented) return;
			this.node.style.transform = `translateX(${this.round(this.rubberBandOffset, 3)}px)`;
			return;
		}

		this.node.style.transform = '';
		this.rubberBandOffset = 0;
	}

	private dispatchOverscrollEvent(left: number): CustomEvent<{ left: number }> {
		const overscrollEvent = new CustomEvent('overscroll', {
			bubbles: true,
			cancelable: true,
			detail: { left }
		});
		this.node?.dispatchEvent(overscrollEvent);
		return overscrollEvent;
	}

	private dispatchScrollEndEvent(): Event {
		const scrollEndEvent = new Event('scrollend', {
			bubbles: true,
			cancelable: true
		});
		this.node?.dispatchEvent(scrollEndEvent);
		return scrollEndEvent;
	}

	private dispatchScrollSnapChangeEvent(): Event {
		const scrollSnapChangeEvent = new CustomEvent('scrollsnapchange', {
			bubbles: true,
			cancelable: true,
			detail: {
				snapTargetInline: this.activeSnapPoint.target,
				snapTargetBlock: this.activeSnapPoint.target
			}
		});
		this.node?.dispatchEvent(scrollSnapChangeEvent);
		return scrollSnapChangeEvent;
	}

	private dispatchScrollSnapChangingEvent(snapPoint: SnapPoint): Event {
		const scrollSnapChangingEvent = new CustomEvent('scrollsnapchanging', {
			bubbles: true,
			cancelable: true,
			detail: {
				snapTargetInline: (snapPoint || this.activeSnapPoint).target,
				snapTargetBlock: (snapPoint || this.activeSnapPoint).target
			}
		});
		this.node?.dispatchEvent(scrollSnapChangingEvent);
		return scrollSnapChangingEvent;
	}

	private interceptScrollIntoViewCalls(onExternalScroll: (target: Element) => void): () => void {
		const stopFns: Array<() => void> = [];

		const originalScrollIntoView = Element.prototype.scrollIntoView;
		if (originalScrollIntoView) {
			Element.prototype.scrollIntoView = function (arg?: boolean | ScrollIntoViewOptions): void {
				onExternalScroll(this);
				return originalScrollIntoView.call(this, arg);
			};
			stopFns.push(() => {
				Element.prototype.scrollIntoView = originalScrollIntoView;
			});
		}

		return () => stopFns.forEach((fn) => fn());
	}

	private project({ axis = 'x' }: { axis?: 'x' | 'y' }): number {
		return this.target[axis] + this.velocity[axis] / (1 - FRICTION);
	}

	private snapSelect({ axis = 'x' }: { axis?: 'x' | 'y' }): SnapPoint {
		const restingX = this.project({ axis });
		return this.snapPoints.length
			? this.snapPoints.reduce((prev, curr) =>
					Math.abs(curr.x - restingX) < Math.abs(prev.x - restingX) ? curr : prev
				)
			: {
					target: null,
					x: this.clamp(restingX, Math.min(this.end, 0), Math.max(this.end, 0))
				};
	}

	private lerp(x: number, y: number, t: number): number {
		return (1 - t) * x + t * y;
	}

	private damp(x: number, y: number, lambda: number, delta: number): number {
		return this.lerp(x, y, 1 - Math.exp(Math.log(1 - lambda) * (delta / (1000 / 60))));
	}

	private clamp(value: number, min: number, max: number): number {
		if (value < min) {
			return min;
		} else if (value > max) {
			return max;
		}
		return value;
	}

	private round(value: number, precision: number = 0): number {
		const multiplier = Math.pow(10, precision);
		return Math.round(value * multiplier) / multiplier;
	}
}
