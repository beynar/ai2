import type { ChartScene } from '@tanstack/charts';
import { bind } from '$lib/utils/state.svelte.js';
import { untrack } from 'svelte';
import type { ChartValue } from './chart.core.js';
import type { ChartState } from './chart.state.svelte.js';
import {
	applyChartViewportDomain,
	resolveChartViewport,
	resolveChartViewportDomain,
	sameChartViewportDomain
} from './chart.viewport.js';

type ScenePoint = Readonly<{ x: number; y: number }>;

type PendingBrush<TRow extends object> = {
	readonly pointerId: number;
	readonly client: ScenePoint;
	readonly start: ScenePoint;
	readonly scene: ChartScene<TRow>;
};

const BRUSH_THRESHOLD = 6;

export interface ChartViewportState<TRow extends object> {
	readonly chart: ChartState<TRow>;
}

export class ChartViewportState<TRow extends object> {
	xDomain = $state<readonly ChartValue[] | undefined>();
	yDomain = $state<readonly ChartValue[] | undefined>();
	brushScene = $state<ChartScene<TRow> | undefined>();
	brushStart = $state<ScenePoint | undefined>();
	brushCurrent = $state<ScenePoint | undefined>();

	readonly configuration = $derived(
		resolveChartViewport(this.chart.viewport, this.chart.x, this.chart.y)
	);
	readonly axis = $derived(this.configuration?.axis);
	readonly isEnabled = $derived(this.configuration !== undefined);
	readonly isZoomed = $derived(this.xDomain !== undefined || this.yDomain !== undefined);
	readonly showReset = $derived(this.configuration?.reset === true && this.isZoomed);
	readonly animation = $derived(this.configuration?.animation);
	readonly x = $derived(applyChartViewportDomain(this.chart.x, this.xDomain, 'x'));
	readonly y = $derived(applyChartViewportDomain(this.chart.y, this.yDomain, 'y'));
	readonly brushStyle = $derived.by(() => {
		if (!this.brushScene || !this.brushStart || !this.brushCurrent || !this.axis) {
			return undefined;
		}
		const chart = this.brushScene.chart;
		const x1 = this.axis === 'y' ? chart.x : Math.min(this.brushStart.x, this.brushCurrent.x);
		const x2 =
			this.axis === 'y' ? chart.x + chart.width : Math.max(this.brushStart.x, this.brushCurrent.x);
		const y1 = this.axis === 'x' ? chart.y : Math.min(this.brushStart.y, this.brushCurrent.y);
		const y2 =
			this.axis === 'x' ? chart.y + chart.height : Math.max(this.brushStart.y, this.brushCurrent.y);
		return `left:${percent(x1, this.brushScene.width)};top:${percent(y1, this.brushScene.height)};width:${percent(x2 - x1, this.brushScene.width)};height:${percent(y2 - y1, this.brushScene.height)}`;
	});
	readonly status = $derived(
		this.isZoomed
			? `Chart zoomed on ${this.xDomain && this.yDomain ? 'both axes' : this.xDomain ? 'the x axis' : 'the y axis'}.`
			: ''
	);

	#pending: PendingBrush<TRow> | undefined;
	#surface: HTMLDivElement | undefined;
	#getChartHost: (() => HTMLDivElement | undefined) | undefined;
	#window: Window | undefined;

	constructor(chart: ChartState<TRow>) {
		bind(this, {
			get chart() {
				return chart;
			}
		});
		$effect(() => {
			const axis = this.configuration?.axis;
			untrack(() => {
				if (axis !== 'x' && axis !== 'both') this.xDomain = undefined;
				if (axis !== 'y' && axis !== 'both') this.yDomain = undefined;
			});
		});
	}

	attachment = (surface: HTMLDivElement, getChartHost: () => HTMLDivElement | undefined) => {
		this.#surface = surface;
		this.#getChartHost = getChartHost;
		this.#window = surface.ownerDocument.defaultView ?? undefined;
		surface.addEventListener('pointerdown', this.#handlePointerDown, true);
		this.#window?.addEventListener('pointermove', this.#handlePointerMove, true);
		this.#window?.addEventListener('pointerup', this.#handlePointerUp, true);
		this.#window?.addEventListener('pointercancel', this.#handlePointerCancel, true);
		return () => {
			surface.removeEventListener('pointerdown', this.#handlePointerDown, true);
			this.#window?.removeEventListener('pointermove', this.#handlePointerMove, true);
			this.#window?.removeEventListener('pointerup', this.#handlePointerUp, true);
			this.#window?.removeEventListener('pointercancel', this.#handlePointerCancel, true);
			this.#cancelBrush();
			this.#surface = undefined;
			this.#getChartHost = undefined;
			this.#window = undefined;
		};
	};

	reset = () => {
		this.xDomain = undefined;
		this.yDomain = undefined;
		this.#cancelBrush();
	};

	#handlePointerDown = (event: PointerEvent) => {
		if (!this.configuration || event.button !== 0 || !event.isPrimary) return;
		const scene = this.chart.getScene();
		const point = scene
			? clientToScene(this.#getChartHost?.(), scene, event.clientX, event.clientY)
			: undefined;
		if (!scene || !point || !contains(scene, point)) return;
		this.#pending = {
			pointerId: event.pointerId,
			client: { x: event.clientX, y: event.clientY },
			start: point,
			scene
		};
	};

	#handlePointerMove = (event: PointerEvent) => {
		const pending = this.#pending;
		if (!pending || pending.pointerId !== event.pointerId) return;
		const current = clientToScene(
			this.#getChartHost?.(),
			pending.scene,
			event.clientX,
			event.clientY
		);
		if (!current) return;
		if (!this.brushStart) {
			const distance = Math.hypot(
				event.clientX - pending.client.x,
				event.clientY - pending.client.y
			);
			if (distance < BRUSH_THRESHOLD) return;
			this.#surface?.setPointerCapture(event.pointerId);
			this.brushScene = pending.scene;
			this.brushStart = pending.start;
		}
		this.brushCurrent = clampToChart(pending.scene, current);
		event.preventDefault();
		event.stopImmediatePropagation();
	};

	#handlePointerUp = (event: PointerEvent) => {
		const pending = this.#pending;
		if (!pending || pending.pointerId !== event.pointerId) return;
		const hasBrush = this.brushStart !== undefined && this.brushCurrent !== undefined;
		if (hasBrush) {
			this.#commitBrush(pending.scene);
			event.preventDefault();
			event.stopImmediatePropagation();
		}
		this.#releasePointer(event.pointerId);
		this.#cancelBrush();
	};

	#handlePointerCancel = (event: PointerEvent) => {
		if (this.#pending?.pointerId !== event.pointerId) return;
		this.#releasePointer(event.pointerId);
		this.#cancelBrush();
	};

	#commitBrush(scene: ChartScene<TRow>) {
		if (!this.configuration || !this.brushStart || !this.brushCurrent) return;
		const { axis } = this.configuration;
		if (axis === 'x' || axis === 'both') {
			const selected = resolveChartViewportDomain(
				this.chart.x,
				scene.scales.x,
				this.brushStart.x,
				this.brushCurrent.x,
				'viewport.x'
			);
			if (selected && !sameChartViewportDomain(selected, scene.scales.x?.domain)) {
				this.xDomain = selected;
			}
		}
		if (axis === 'y' || axis === 'both') {
			const selected = resolveChartViewportDomain(
				this.chart.y,
				scene.scales.y,
				this.brushStart.y,
				this.brushCurrent.y,
				'viewport.y'
			);
			if (selected && !sameChartViewportDomain(selected, scene.scales.y?.domain)) {
				this.yDomain = selected;
			}
		}
	}

	#releasePointer(pointerId: number) {
		if (this.#surface?.hasPointerCapture(pointerId)) this.#surface.releasePointerCapture(pointerId);
	}

	#cancelBrush() {
		this.#pending = undefined;
		this.brushScene = undefined;
		this.brushStart = undefined;
		this.brushCurrent = undefined;
	}
}

function clientToScene<TRow extends object>(
	host: HTMLDivElement | undefined,
	scene: ChartScene<TRow>,
	clientX: number,
	clientY: number
): ScenePoint | undefined {
	const svg = host?.querySelector<SVGSVGElement>('svg.ts-chart');
	if (!svg) return undefined;
	const matrix = svg.getScreenCTM();
	if (matrix) {
		const determinant = matrix.a * matrix.d - matrix.b * matrix.c;
		if (Number.isFinite(determinant) && Math.abs(determinant) > Number.EPSILON) {
			const x = clientX - matrix.e;
			const y = clientY - matrix.f;
			return {
				x: (matrix.d * x - matrix.c * y) / determinant,
				y: (-matrix.b * x + matrix.a * y) / determinant
			};
		}
	}
	const bounds = svg.getBoundingClientRect();
	if (!bounds.width || !bounds.height) return undefined;
	return {
		x: ((clientX - bounds.left) / bounds.width) * scene.width,
		y: ((clientY - bounds.top) / bounds.height) * scene.height
	};
}

function contains<TRow extends object>(scene: ChartScene<TRow>, point: ScenePoint): boolean {
	return (
		point.x >= scene.chart.x &&
		point.x <= scene.chart.x + scene.chart.width &&
		point.y >= scene.chart.y &&
		point.y <= scene.chart.y + scene.chart.height
	);
}

function clampToChart<TRow extends object>(scene: ChartScene<TRow>, point: ScenePoint): ScenePoint {
	return {
		x: Math.max(scene.chart.x, Math.min(scene.chart.x + scene.chart.width, point.x)),
		y: Math.max(scene.chart.y, Math.min(scene.chart.y + scene.chart.height, point.y))
	};
}

function percent(value: number, total: number): string {
	return `${Math.max(0, Math.min(100, (value / total) * 100))}%`;
}
