import type { ReferenceElement } from '@floating-ui/dom';
import { onDestroy, untrack } from 'svelte';
import { useThrottle } from './useThrottle.svelte.js';
import { on } from 'svelte/events';
import { BROWSER } from 'esm-env';

type Point = {
	x: number;
	y: number;
};

const isPointInArea = (point: Point, polygon: Point[]): boolean => {
	let isInside = false;
	const n = polygon.length;

	// Parcours chaque arête du polygon
	for (let i = 0, j = n - 1; i < n; j = i++) {
		// Vérifie si le point est sur la même hauteur que l'arête
		if (polygon[i].y > point.y !== polygon[j].y > point.y) {
			// Calcule l'abscisse où la hauteur du point croise l'arête
			const x =
				((polygon[j].x - polygon[i].x) * (point.y - polygon[i].y)) / (polygon[j].y - polygon[i].y) +
				polygon[i].x;
			// Si le point est à gauche de l'arête, on a une intersection
			if (point.x < x) {
				isInside = !isInside;
			}
		}
	}

	return isInside;
};

function drawAreaInDOM(points: Point[]): SVGSVGElement {
	// Create the SVG element
	const svgNS = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS(svgNS, 'svg');

	// Set the width and height of the SVG element
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	for (const point of points) {
		if (point.x < minX) minX = point.x;
		if (point.x > maxX) maxX = point.x;
		if (point.y < minY) minY = point.y;
		if (point.y > maxY) maxY = point.y;
	}

	const width = maxX - minX;
	const height = maxY - minY;
	svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
	svg.setAttribute('width', width.toString());
	svg.setAttribute('height', height.toString());
	svg.style.position = 'fixed';
	svg.style.top = Math.min(...points.map((p) => p.y)).toString() + 'px';
	svg.style.left = Math.min(...points.map((p) => p.x)).toString() + 'px';
	svg.style.zIndex = '900000';
	svg.id = 'polygon';
	svg.style.pointerEvents = 'none';

	// Create the polygon element
	const polygon = document.createElementNS(svgNS, 'polygon');
	// Convert the points to a space-separated string of coordinates
	const pointsAttr = points.map((p) => `${p.x},${p.y}`).join(' ');
	polygon.setAttribute('points', pointsAttr);

	// Optional: set the style of the polygon
	polygon.style.fill = 'none';
	polygon.style.stroke = 'red';
	polygon.style.strokeWidth = '2';

	// Append the polygon to the SVG element
	svg.appendChild(polygon);

	// Append the SVG to the document body (or any other container element)
	document.body.appendChild(svg);

	return svg;
}

export const useSafeArea = (opts: {
	isActive: boolean;
	callback?: () => void;
	offset?: number;
	debug?: boolean;
}) => {
	let refs = new Set<HTMLElement>();
	let offs = new Set<() => void>();
	let areas = new Map<HTMLElement, Point[]>();
	const debugs = new Map<HTMLElement, SVGSVGElement>();

	const callback = useThrottle(opts.callback, 300);

	const { offset = 10 } = opts;

	const setArea = (ref: HTMLElement) => {
		const debug = debugs.get(ref);
		if (debug) {
			debug.remove();
			debugs.delete(ref);
		}

		const rect = ref.getBoundingClientRect();
		const area = [
			{ x: rect.left - offset, y: rect.top - offset },
			{ x: rect.right + offset, y: rect.top - offset },
			{ x: rect.right + offset, y: rect.bottom + offset },
			{ x: rect.left - offset, y: rect.bottom + offset }
		];

		areas.set(ref, area);

		if (opts.debug) {
			debugs.set(ref, drawAreaInDOM(area));
		}
	};

	const onPointerMove = (e: PointerEvent) => {
		if (
			Array.from(areas.values())?.every((poly) => {
				return !isPointInArea({ x: e.clientX, y: e.clientY }, poly);
			})
		) {
			callback?.();
			destroy();
		}
	};

	const removeDebug = () => {
		opts.debug &&
			BROWSER &&
			document.querySelectorAll('#polygon')?.forEach((node) => node.remove());
	};
	const destroy = () => {
		offs.forEach((off) => off());
		removeDebug();
	};
	$effect(() => {
		const isActive = opts.isActive;
		untrack(() => {
			if (isActive) {
				refs.forEach((ref) => {
					addReference(ref);
				});
				offs.add(on(window, 'pointermove', onPointerMove));
			} else {
				destroy();
			}
		});
	});

	onDestroy(() => {
		destroy();
	});

	const addReference = (ref: HTMLElement) => {
		const resizeObserver = new ResizeObserver(() => {
			setArea(ref);
		});
		const mutationObserver = new MutationObserver(() => {
			setArea(ref);
		});
		mutationObserver.observe(ref, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['data-placement']
		});

		resizeObserver.observe(ref);
		const off = () => {
			resizeObserver.unobserve(ref);
			mutationObserver.disconnect();
			offs.delete(off);
		};
		offs.add(off);
		setArea(ref);
		return off;
	};

	return {
		reference: (ref: HTMLElement) => {
			refs.add(ref);
			const off = addReference(ref);
			return () => {
				refs.delete(ref);
				off();
			};
		},
		updateAreas: () => {
			refs.forEach((ref) => {
				setArea(ref);
			});
		}
	};
};
export class SafePolygon {
	polygon = $state<[number, number, number, number]>([0, 0, 0, 0]);
	refs: (HTMLElement | ReferenceElement | null)[];
	callback?: () => void;
	constructor(refs: (HTMLElement | null | ReferenceElement)[], callback?: () => void) {
		this.refs = refs;

		this.callback = callback;
		this.setPolygon();
		window.addEventListener('pointermove', this.onPointerMove);
	}

	setPolygon = () => {
		document.getElementById('polygon')?.remove();
		const bounds = this.refs.filter((ref) => !!ref).map((ref) => ref!.getBoundingClientRect());

		const a = (o: 'min' | 'max', k: 'left' | 'right' | 'top' | 'bottom') =>
			Math[o].apply(
				null,
				bounds.map((b) => b[k])
			);

		this.polygon = [a('min', 'left'), a('min', 'top'), a('max', 'right'), a('max', 'bottom')];
	};

	destroy = () => {
		window.removeEventListener('pointermove', this.onPointerMove);
	};
	onPointerMove = (e: PointerEvent) => {
		const inVerticalStack = e.clientX >= this.polygon[0] && e.clientX <= this.polygon[2];
		const inHorizontalStack = e.clientY >= this.polygon[1] && e.clientY <= this.polygon[3];

		if ((!inVerticalStack && inHorizontalStack) || (!inHorizontalStack && inVerticalStack)) {
			this.destroy();
			this.callback?.();
		}
	};
}
