import type { ResizablePanelItem, ResizableSizeValue } from './resizable.props.js';

export const DEFAULT_MIN_SIZE = 10;
export const DEFAULT_MAX_SIZE = 100;
export const TOTAL_SIZE = 100;
export const SIZE_EPSILON = 0.0001;

export type ResizableLayoutPanel = Omit<ResizablePanelItem, 'collapsedSize'> & {
	collapsedSize?: number;
};

type PanelIdResolver = (panels: ResizableLayoutPanel[], index: number) => string;

export const isFiniteNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value);

export const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export const roundSize = (value: number) => Number(value.toFixed(4));

export const areNumberArraysEqual = (left: number[], right: number[]) =>
	left.length === right.length && left.every((size, index) => size === right[index]);

export const areStringArraysEqual = (left: string[], right: string[]) =>
	left.length === right.length && left.every((value, index) => value === right[index]);

export const getSizeValuePercent = (
	value: ResizableSizeValue | undefined,
	axisSize: number,
	propertyName: string
) => {
	if (value === undefined) return undefined;
	if (isFiniteNumber(value)) return clamp(value, 0, TOTAL_SIZE);
	if (typeof value !== 'string') {
		throw new Error(`Resizable ${propertyName} must be a number, px string, or percent string.`);
	}

	const match = value.trim().match(/^(-?\d+(?:\.\d+)?)\s*(px|%)$/);
	if (!match) {
		throw new Error(
			`Resizable ${propertyName} must use a px or percent unit; received "${value}".`
		);
	}

	const amount = Number(match[1]);
	if (!Number.isFinite(amount)) {
		throw new Error(`Resizable ${propertyName} must be finite; received "${value}".`);
	}
	if (match[2] === '%') return clamp(amount, 0, TOTAL_SIZE);
	if (axisSize <= 0) return 0;

	return clamp((amount / axisSize) * TOTAL_SIZE, 0, TOTAL_SIZE);
};

export const getPanelMin = (panel?: ResizableLayoutPanel) =>
	clamp(isFiniteNumber(panel?.minSize) ? panel.minSize : DEFAULT_MIN_SIZE, 0, TOTAL_SIZE);

export const getPanelMax = (panel?: ResizableLayoutPanel) => {
	const min = getPanelMin(panel);
	return clamp(isFiniteNumber(panel?.maxSize) ? panel.maxSize : DEFAULT_MAX_SIZE, min, TOTAL_SIZE);
};

export const getCollapsedSize = (panel?: ResizableLayoutPanel) =>
	clamp(isFiniteNumber(panel?.collapsedSize) ? panel.collapsedSize : 0, 0, TOTAL_SIZE);

export const getCollapseBreakpoint = (panel?: ResizableLayoutPanel) => {
	const collapsedSize = getCollapsedSize(panel);
	const breakpoint = isFiniteNumber(panel?.collapseBreakpoint)
		? panel.collapseBreakpoint
		: collapsedSize;
	return clamp(breakpoint, collapsedSize, getPanelMax(panel));
};

export const getPanelResizeMin = (panel?: ResizableLayoutPanel) => {
	if (!panel?.collapsible) return getPanelMin(panel);
	return getCollapsedSize(panel);
};

export const getInitialSizes = (panels: ResizableLayoutPanel[]) => {
	let usedSize = 0;
	let autoCount = 0;

	for (const panel of panels) {
		if (isFiniteNumber(panel.defaultSize)) {
			usedSize += panel.defaultSize;
		} else {
			autoCount += 1;
		}
	}

	const autoSize = autoCount > 0 ? Math.max(0, TOTAL_SIZE - usedSize) / autoCount : 0;
	return panels.map((panel) => (isFiniteNumber(panel.defaultSize) ? panel.defaultSize : autoSize));
};

export const getNormalizedSizes = (
	sizes: number[],
	panels: ResizableLayoutPanel[],
	collapsedPanelIds: string[],
	getPanelId: PanelIdResolver
) => {
	if (panels.length === 0) return [];
	const collapsedSet = new Set(collapsedPanelIds);

	const normalized = panels.map((panel, index) => {
		if (collapsedSet.has(getPanelId(panels, index))) {
			return getCollapsedSize(panel);
		}
		return clamp(
			isFiniteNumber(sizes[index]) ? sizes[index] : 0,
			getPanelMin(panel),
			getPanelMax(panel)
		);
	});

	return balanceToTotal(normalized, panels, collapsedSet, getPanelId).map(roundSize);
};

export const validatePanelConstraints = (panels: ResizableLayoutPanel[]) => {
	if (panels.length === 0) return;

	const constraints = panels.map((panel, index) => {
		const min = getPanelMin(panel);
		const max = isFiniteNumber(panel.maxSize)
			? clamp(panel.maxSize, 0, TOTAL_SIZE)
			: DEFAULT_MAX_SIZE;
		if (max < min) {
			throw new Error(
				`Resizable panel ${index + 1} has maxSize ${max}, which is lower than minSize ${min}.`
			);
		}
		return { min, max };
	});
	const minTotal = constraints.reduce((sum, constraint) => sum + constraint.min, 0);
	const maxTotal = constraints.reduce((sum, constraint) => sum + constraint.max, 0);

	if (minTotal > TOTAL_SIZE) {
		throw new Error(
			`Resizable panel minSize values must sum to ${TOTAL_SIZE} or less; received ${roundSize(minTotal)}.`
		);
	}
	if (maxTotal < TOTAL_SIZE) {
		throw new Error(
			`Resizable panel maxSize values must sum to ${TOTAL_SIZE} or more; received ${roundSize(maxTotal)}.`
		);
	}
};

export const getAllowedCollapsedPanelIds = (
	panels: ResizableLayoutPanel[],
	panelIds: string[],
	getPanelId: PanelIdResolver
) => {
	const requestedIds = new Set(panelIds);
	const nextPanelIds = panels
		.map((panel, index) => ({ id: getPanelId(panels, index), panel }))
		.filter(({ id, panel }) => panel.collapsible && requestedIds.has(id))
		.map(({ id }) => id);

	if (nextPanelIds.length >= panels.length && panels.length > 0) {
		nextPanelIds.pop();
	}
	while (nextPanelIds.length > 0 && !canUseCollapsedPanelIds(panels, nextPanelIds, getPanelId)) {
		nextPanelIds.pop();
	}
	return nextPanelIds;
};

const balanceToTotal = (
	sizes: number[],
	panels: ResizableLayoutPanel[],
	collapsedPanelIds: Set<string>,
	getPanelId: PanelIdResolver
) => {
	const nextSizes = [...sizes];
	let delta = TOTAL_SIZE - nextSizes.reduce((sum, size) => sum + size, 0);
	let guard = panels.length * 2;

	while (Math.abs(delta) > SIZE_EPSILON && guard > 0) {
		guard -= 1;
		const growing = delta > 0;
		const candidates = nextSizes
			.map((size, index) => {
				const panel = panels[index];
				const panelId = getPanelId(panels, index);
				const min = collapsedPanelIds.has(panelId) ? getCollapsedSize(panel) : getPanelMin(panel);
				const max = collapsedPanelIds.has(panelId) ? getCollapsedSize(panel) : getPanelMax(panel);
				const capacity = growing ? max - size : size - min;
				return { index, capacity: Math.max(0, capacity) };
			})
			.filter((item) => item.capacity > 0);

		if (candidates.length === 0) break;

		const share = delta / candidates.length;
		let consumed = 0;
		for (const candidate of candidates) {
			const adjustment = growing
				? Math.min(candidate.capacity, share)
				: Math.max(-candidate.capacity, share);
			nextSizes[candidate.index] += adjustment;
			consumed += adjustment;
		}
		delta -= consumed;
	}

	return nextSizes;
};

const canUseCollapsedPanelIds = (
	panels: ResizableLayoutPanel[],
	panelIds: string[],
	getPanelId: PanelIdResolver
) => {
	const collapsedPanelIds = new Set(panelIds);
	const range = panels.reduce(
		(total, panel, index) => {
			const collapsed = collapsedPanelIds.has(getPanelId(panels, index));
			const size = collapsed ? getCollapsedSize(panel) : null;
			return {
				min: total.min + (size ?? getPanelMin(panel)),
				max: total.max + (size ?? getPanelMax(panel))
			};
		},
		{ min: 0, max: 0 }
	);

	return range.min <= TOTAL_SIZE && range.max >= TOTAL_SIZE;
};
