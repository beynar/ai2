import { onDestroy, untrack } from 'svelte';

/**
 * A minimal, framework-agnostic pan/zoom controller for a single DOM or SVG
 * root. It applies a CSS `translate3d + scale` transform to the attached node,
 * listens on the node's parent (the "owner" viewport) for drag / wheel / pinch,
 * and exposes imperative zoom/fit/expand controls.
 *
 * Ported from svelte-streamdown's panzoom utility and adapted to the svelai
 * conventions (attachment returns a cleanup, `untrack` around setup, options via
 * getters so reactive flags stay live).
 */
export interface PanzoomOptions {
	/** Minimum zoom scale. @default 0.1 */
	minZoom?: number;
	/** Maximum zoom scale. @default +Infinity */
	maxZoom?: number;
	/** Wheel sensitivity. @default 1 */
	zoomSpeed?: number;
	/** Zoom multiplier applied on double-click. @default 1.75 */
	doubleClickScale?: number;
	/** Initial scale / translate. */
	initialScale?: number;
	initialX?: number;
	initialY?: number;
	/**
	 * When false, wheel events are ignored (the page scrolls normally). Pass a
	 * getter so the flag can react to hover gating.
	 */
	activateMouseWheel?: boolean;
	/**
	 * Element that receives `data-expanded` and the fullscreen overlay CSS. Defaults
	 * to the event target (the panned node's parent). Pass the styled root when the
	 * fullscreen styles live on an ancestor of the event target. Getter so it can be
	 * resolved after `attach`.
	 */
	expandTarget?: HTMLElement | null;
}

export const usePanzoom = (opts: PanzoomOptions = {}) => {
	// transform state
	let x = opts.initialX ?? 0;
	let y = opts.initialY ?? 0;
	let scale = opts.initialScale ?? 1;

	const minZoom = opts.minZoom ?? 0.1;
	const maxZoom = opts.maxZoom ?? Number.POSITIVE_INFINITY;
	const zoomSpeed = opts.zoomSpeed ?? 1;
	const doubleClickScale = opts.doubleClickScale ?? 1.75;

	let node: HTMLElement | SVGSVGElement | null = null;
	let eventTarget: HTMLElement | null = null;
	// The scroll/touch surface (== eventTarget); kept so expand() can toggle touchAction.
	let surface: HTMLElement | null = null;
	const listeners = new Set<() => void>();

	// drag state
	let dragging = false;
	let lastClientX = 0;
	let lastClientY = 0;
	let dragOffMove: (() => void) | null = null;
	let dragOffUp: (() => void) | null = null;

	// touch state
	let touchMode: 'none' | 'pan' | 'pinch' = 'none';
	let pinchDistance = 0;

	// expand/collapse state
	let isExpanded = $state(false);
	let animating = false;

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && isExpanded && !animating) void expand(false);
	};

	const destroy = () => {
		listeners.forEach((off) => off());
		listeners.clear();
		if (dragOffMove) dragOffMove();
		if (dragOffUp) dragOffUp();
		// Don't leave the page scroll-locked if we're torn down mid-fullscreen.
		if (isExpanded && typeof document !== 'undefined') document.body.style.overflow = '';
	};

	onDestroy(destroy);

	const clampScale = (s: number) => Math.min(Math.max(s, minZoom), maxZoom);

	const apply = () => {
		if (!node) return;
		scale = clampScale(scale);
		const r = (v: number) => Math.round(v * 1000) / 1000;
		x = r(x);
		y = r(y);
		scale = r(scale);
		const el = node as HTMLElement;
		el.style.transformOrigin = '0 0';
		el.style.willChange = 'transform';
		el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
	};

	const zoomAt = (clientX: number, clientY: number, factor: number) => {
		if (!node || !Number.isFinite(factor) || factor === 1) return;
		const nextScale = clampScale(scale * factor);
		const ratio = nextScale / scale;
		if (ratio === 1) return;
		const owner = (eventTarget ?? node.parentElement ?? (node as HTMLElement)) as HTMLElement;
		const ownerRect = owner.getBoundingClientRect();
		const ox = clientX - ownerRect.left;
		const oy = clientY - ownerRect.top;
		// Keep (ox, oy) stationary in owner space while scaling.
		x = ratio * x + (1 - ratio) * ox;
		y = ratio * y + (1 - ratio) * oy;
		scale = nextScale;
		apply();
	};

	const kineticWheel = (deltaY: number) => {
		const sign = Math.sign(deltaY);
		const step = Math.min(0.25, Math.abs((zoomSpeed * deltaY) / 128));
		return 1 - sign * step;
	};

	const onWheel = (e: WheelEvent) => {
		if (!opts.activateMouseWheel || !node) return;
		e.preventDefault();
		e.stopPropagation();
		if (animating) return;
		zoomAt(e.clientX, e.clientY, kineticWheel(e.deltaY * (e.deltaMode ? 100 : 1)));
	};

	const isInteractive = (el: Element) => {
		const tag = el.tagName.toLowerCase();
		return (
			el.closest('[data-panzoom-ignore]') !== null ||
			['button', 'a', 'input', 'textarea', 'select', 'label', 'summary', 'details'].includes(tag) ||
			(el as HTMLElement).isContentEditable
		);
	};

	const onDblClick = (e: MouseEvent) => {
		const t = e.target as Element | null;
		if (node && t && !(t === (node as Element) || (node as Element).contains(t))) return;
		if (t && isInteractive(t)) return;
		e.preventDefault();
		const baseEl = (eventTarget ?? node?.parentElement ?? (node as HTMLElement)) as HTMLElement;
		const base = baseEl.getBoundingClientRect();
		zoomAt(base.left + base.width / 2, base.top + base.height / 2, doubleClickScale);
	};

	const startDrag = (e: MouseEvent) => {
		if (animating) return void e.preventDefault();
		if (e.button !== 0) return;
		const t = e.target as Element | null;
		// Don't start a pan from a control (buttons carry data-panzoom-ignore).
		if (t && t.closest('[data-panzoom-ignore]')) return;
		dragging = true;
		lastClientX = e.clientX;
		lastClientY = e.clientY;
		e.preventDefault();
		if (node) (node as HTMLElement).style.cursor = 'grabbing';
		dragOffMove = () => window.removeEventListener('mousemove', onDragMove);
		dragOffUp = () => window.removeEventListener('mouseup', endDrag);
		window.addEventListener('mousemove', onDragMove, { passive: false });
		window.addEventListener('mouseup', endDrag, { passive: true });
		listeners.add(dragOffMove);
		listeners.add(dragOffUp);
	};

	const onDragMove = (e: MouseEvent) => {
		if (!dragging) return;
		x += e.clientX - lastClientX;
		y += e.clientY - lastClientY;
		lastClientX = e.clientX;
		lastClientY = e.clientY;
		apply();
	};

	const endDrag = () => {
		dragging = false;
		if (node) (node as HTMLElement).style.cursor = 'grab';
		if (dragOffMove) {
			dragOffMove();
			listeners.delete(dragOffMove);
		}
		if (dragOffUp) {
			dragOffUp();
			listeners.delete(dragOffUp);
		}
		dragOffMove = dragOffUp = null;
	};

	const onTouchStart = (e: TouchEvent) => {
		if (!node || animating) return;
		// Inline (not fullscreen), a single-finger touch must fall through to native
		// page scroll — otherwise the diagram traps the user's swipe. Only capture
		// touch panning once expanded; pinch-zoom still needs two fingers.
		if (!isExpanded) return;
		const t0 = e.target as Element | null;
		if (t0 && t0.closest('[data-panzoom-ignore]')) return;
		if (e.touches.length === 1) {
			touchMode = 'pan';
			lastClientX = e.touches[0].clientX;
			lastClientY = e.touches[0].clientY;
		} else if (e.touches.length >= 2) {
			touchMode = 'pinch';
			const [t1, t2] = [e.touches[0], e.touches[1]];
			pinchDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
		}
		e.preventDefault();
		const offMove = () => window.removeEventListener('touchmove', onTouchMove);
		const offEnd = () => window.removeEventListener('touchend', onTouchEnd);
		const offCancel = () => window.removeEventListener('touchcancel', onTouchEnd);
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		window.addEventListener('touchcancel', onTouchEnd, { passive: true });
		listeners.add(offMove);
		listeners.add(offEnd);
		listeners.add(offCancel);
	};

	const onTouchMove = (e: TouchEvent) => {
		if (!node) return;
		if (touchMode === 'pan' && e.touches.length === 1) {
			const t = e.touches[0];
			x += t.clientX - lastClientX;
			y += t.clientY - lastClientY;
			lastClientX = t.clientX;
			lastClientY = t.clientY;
			apply();
			e.preventDefault();
		} else if (touchMode === 'pinch' && e.touches.length >= 2) {
			const [t1, t2] = [e.touches[0], e.touches[1]];
			const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
			const factor = dist / (pinchDistance || dist);
			zoomAt((t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2, factor);
			pinchDistance = dist;
			e.preventDefault();
		}
	};

	const onTouchEnd = () => {
		touchMode = 'none';
		pinchDistance = 0;
	};

	const attach = (target: HTMLElement | SVGSVGElement) => {
		return untrack(() => {
			node = target;
			const isSVG = typeof SVGSVGElement !== 'undefined' && target instanceof SVGSVGElement;
			eventTarget = (target.parentElement as HTMLElement | null) ?? (target as HTMLElement);
			apply();

			const add = (type: string, handler: (e: any) => void, options?: AddEventListenerOptions) => {
				const n = (eventTarget ?? (node as HTMLElement)) as HTMLElement;
				n.addEventListener(type, handler as EventListener, options);
				const off = () => n.removeEventListener(type, handler as EventListener, options);
				listeners.add(off);
			};

			add('mousedown', startDrag, { passive: false });
			add('wheel', onWheel, { passive: false, capture: true });
			add('dblclick', onDblClick, { passive: false });
			add('touchstart', onTouchStart, { passive: false });
			window.addEventListener('keydown', onKeyDown, { passive: true });
			listeners.add(() => window.removeEventListener('keydown', onKeyDown));

			surface = (eventTarget ?? node) as HTMLElement;
			surface.style.userSelect = 'none';
			// Leave native scroll intact inline; expand() sets 'none' when fullscreen.
			surface.style.touchAction = isExpanded ? 'none' : '';
			surface.style.cursor = 'grab';
			surface.style.overscrollBehavior = 'contain';
			if (isSVG) (node.style as CSSStyleDeclaration).transformBox = 'fill-box';

			return () => destroy();
		});
	};

	const zoomToFit = (padding = 0.05) => {
		if (!node) return;
		const parent = node.parentElement;
		if (!parent) return;
		const parentRect = parent.getBoundingClientRect();
		const rect = node.getBoundingClientRect();
		const naturalWidth = rect.width / scale || 0;
		const naturalHeight = rect.height / scale || 0;
		const targetWidth = parentRect.width * (1 - 2 * padding);
		const targetHeight = parentRect.height * (1 - 2 * padding);
		if (naturalWidth <= 0 || naturalHeight <= 0 || targetWidth <= 0 || targetHeight <= 0) return;
		scale = clampScale(Math.min(targetWidth / naturalWidth, targetHeight / naturalHeight));
		x = 0;
		y = 0;
		apply();
		// Re-measure at the new scale, then centre within the parent.
		const newRect = node.getBoundingClientRect();
		x = parentRect.left + (parentRect.width - newRect.width) / 2 - newRect.left;
		y = parentRect.top + (parentRect.height - newRect.height) / 2 - newRect.top;
		apply();
	};

	const zoomBy = (factor: number) => {
		if (!node) return;
		const owner = (eventTarget ?? node.parentElement ?? (node as HTMLElement)) as HTMLElement;
		const ownerRect = owner.getBoundingClientRect();
		zoomAt(ownerRect.left + ownerRect.width / 2, ownerRect.top + ownerRect.height / 2, factor);
	};

	const zoomIn = (factor = 1.25) => zoomBy(factor);
	const zoomOut = (factor = 1.25) => {
		if (factor > 0) zoomBy(1 / factor);
	};

	// Toggle the fullscreen overlay. `data-expanded` + the fixed-overlay CSS live on
	// `expandTarget` (defaults to the eventTarget, but for nested layouts the styled
	// root is an ancestor). FLIP-animates the change.
	const expand = (next: boolean) => {
		const target = (opts.expandTarget ?? eventTarget) as HTMLElement | null;
		if (!target || animating) return;
		const first = target.getBoundingClientRect();
		animating = true;

		if (next) {
			// Reserve the collapsed height on the parent so the page doesn't jump when
			// the target leaves flow, and lock body scroll behind the overlay.
			const parent = target.parentElement;
			if (parent) parent.style.height = getComputedStyle(target).getPropertyValue('height');
			if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
			target.dataset.expanded = 'true';
			isExpanded = true;
			if (surface) surface.style.touchAction = 'none';
			zoomToFit();
		} else {
			target.dataset.expanded = 'false';
			isExpanded = false;
			if (surface) surface.style.touchAction = '';
			if (typeof document !== 'undefined') document.body.style.overflow = '';
			const parent = target.parentElement;
			if (parent) parent.style.height = '';
		}

		const last = target.getBoundingClientRect();
		const deltaX = first.left - last.left;
		const deltaY = first.top - last.top;
		const deltaW = last.width ? first.width / last.width : 1;
		const deltaH = last.height ? first.height / last.height : 1;

		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

		const animation = target.animate(
			[
				{
					transformOrigin: '0 0',
					transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
				},
				{ transformOrigin: '0 0', transform: 'translate(0px, 0px) scale(1, 1)' }
			],
			{ duration: reduce ? 0 : 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
		);
		animation.finished
			.then(() => animation.cancel())
			.finally(() => {
				animating = false;
				zoomToFit();
			});
	};

	const toggleExpand = () => expand(!isExpanded);

	return {
		attach,
		zoomToFit,
		zoomIn,
		zoomOut,
		zoomBy,
		expand,
		toggleExpand,
		get transform() {
			return { x, y, scale } as const;
		},
		get expanded() {
			return isExpanded;
		}
	};
};
