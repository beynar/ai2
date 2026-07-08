import { untrack } from 'svelte';
import { bind } from '$lib/utils/state.svelte.js';
import type {
	SidebarCollapsible,
	SidebarDisplayState,
	SidebarResizable,
	SidebarResizableOptions,
	SidebarSide
} from './sidebar.props.js';

type SidebarResizeStateOptions = {
	width: string;
	resizable?: SidebarResizable;
	side: SidebarSide;
	displayState: SidebarDisplayState;
	collapsible: SidebarCollapsible;
	setWidth: (width: string) => void;
	setDisplayState: (state: SidebarDisplayState) => void;
};

const DEFAULT_MIN_WIDTH = '12rem';
const DEFAULT_MAX_WIDTH = '32rem';
const DEFAULT_KEYBOARD_STEP = 16;
const STORAGE_VERSION = 1;

export interface SidebarResizeState extends SidebarResizeStateOptions {}

export class SidebarResizeState {
	panelNode = $state<HTMLElement | null>(null);
	isDragging = $state(false);
	isKeyboardResizing = $state(false);
	private startWidth = 0;
	private startX = 0;
	private keyboardResizeTimeout: ReturnType<typeof setTimeout> | null = null;
	private activeDragCleanup: (() => void) | null = null;
	private loadedStorageKeys = new Set<string>();

	constructor(options: SidebarResizeStateOptions) {
		bind(this, options);

		$effect(() => {
			const storageKey = this.resizeOptions?.storageKey;
			const panelNode = this.panelNode;
			const enabled = this.enabled;
			untrack(() => {
				if (!enabled || !panelNode || !storageKey) return;
				this.loadStoredWidth(storageKey);
			});
		});
	}

	get enabled() {
		if (!this.resizable) return false;
		if (this.displayState === 'expanded') return true;
		return this.displayState === 'collapsed';
	}

	get isResizing() {
		return this.isDragging || this.isKeyboardResizing;
	}

	get currentWidth() {
		return Math.round(this.getCurrentWidth());
	}

	get minWidth() {
		return Math.round(this.getBounds().min);
	}

	get maxWidth() {
		return Math.round(this.getBounds().max);
	}

	handleKeydown(event: KeyboardEvent) {
		if (!this.enabled) return;

		const step = this.keyboardStep;
		const rightDelta = this.side === 'left' ? step : -step;
		const leftDelta = this.side === 'left' ? -step : step;
		const expandKey = this.side === 'left' ? 'ArrowRight' : 'ArrowLeft';
		let nextWidth: number | null = null;

		if (this.displayState === 'collapsed' && event.key === expandKey) {
			event.preventDefault();
			this.markKeyboardResizing();
			this.expandFromCollapsed(this.minWidth, true);
			return;
		}

		if (event.key === 'ArrowRight') {
			nextWidth = this.getCurrentWidth() + rightDelta;
		} else if (event.key === 'ArrowLeft') {
			nextWidth = this.getCurrentWidth() + leftDelta;
		} else if (event.key === 'Home') {
			nextWidth = this.getBounds().min;
		} else if (event.key === 'End') {
			nextWidth = this.getBounds().max;
		}

		if (nextWidth === null) return;
		event.preventDefault();
		this.markKeyboardResizing();
		this.resizeToRequestedWidth(nextWidth, true);
	}

	handlePointerdown(event: PointerEvent, node: HTMLElement) {
		if (!node || event.button !== 0 || !this.enabled) return;

		const panelNode = this.resolvePanelNode(node);
		if (!panelNode) return;

		this.activeDragCleanup?.();
		event.preventDefault();
		node.focus();
		this.startX = event.clientX;
		this.startWidth = panelNode.getBoundingClientRect().width;
		this.isDragging = true;

		const pointerId = event.pointerId;
		node.setPointerCapture(pointerId);
		const onMove = (moveEvent: PointerEvent) => {
			if (moveEvent.pointerId !== pointerId) return;
			moveEvent.preventDefault();
			this.updateDrag(moveEvent.clientX - this.startX);
		};
		const onEnd = (endEvent: PointerEvent) => {
			if (endEvent.pointerId !== pointerId) return;
			this.cleanupDrag(node, pointerId);
			this.endDrag();
		};
		const onLostPointerCapture = () => {
			this.cleanupDrag(node, pointerId);
			this.endDrag();
		};

		this.activeDragCleanup = () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerup', onEnd);
			window.removeEventListener('pointercancel', onEnd);
			node.removeEventListener('lostpointercapture', onLostPointerCapture);
		};

		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerup', onEnd);
		window.addEventListener('pointercancel', onEnd);
		node.addEventListener('lostpointercapture', onLostPointerCapture);
	}

	private resolvePanelNode(handleNode: HTMLElement) {
		if (this.panelNode) return this.panelNode;

		const panelNode = handleNode
			.closest('[data-slot="sidebar"]')
			?.querySelector<HTMLElement>('[data-slot="sidebar-container"]');
		this.panelNode = panelNode ?? null;
		return this.panelNode;
	}

	private cleanupDrag(node: HTMLElement, pointerId: number) {
		this.activeDragCleanup?.();
		this.activeDragCleanup = null;
		if (node.hasPointerCapture(pointerId)) {
			node.releasePointerCapture(pointerId);
		}
	}

	private updateDrag(deltaX: number) {
		if (!this.isDragging) return;

		const delta = this.side === 'left' ? deltaX : -deltaX;
		this.resizeToRequestedWidth(this.startWidth + delta, false);
	}

	private endDrag() {
		if (!this.isDragging) return;

		this.isDragging = false;
		this.commitWidth(true);
	}

	private setWidthPixels(width: number, commit: boolean) {
		const bounds = this.getBounds();
		const nextWidth = clamp(width, bounds.min, bounds.max);
		const widthValue = `${Math.round(nextWidth)}px`;
		if (widthValue === this.width) return;

		this.setWidth(widthValue);
		this.resizeOptions?.onWidthChange?.(widthValue);
		if (commit) {
			this.commitWidth(true);
		}
	}

	private resizeToRequestedWidth(requestedWidth: number, commit: boolean) {
		if (this.displayState === 'collapsed') {
			if (requestedWidth >= this.collapseThreshold) {
				this.expandFromCollapsed(requestedWidth, commit);
			}
			return;
		}

		if (this.displayState === 'expanded' && this.shouldCollapse(requestedWidth)) {
			this.setDisplayState('collapsed');
			this.commitWidth(true);
			return;
		}

		this.setWidthPixels(requestedWidth, commit);
	}

	private expandFromCollapsed(requestedWidth: number, commit: boolean) {
		this.setDisplayState('expanded');
		this.setWidthPixels(Math.max(requestedWidth, this.minWidth), commit);
	}

	private shouldCollapse(requestedWidth: number) {
		return this.collapsible !== 'none' && requestedWidth < this.collapseThreshold;
	}

	private commitWidth(isUserInteraction: boolean) {
		const width = this.width;
		this.resizeOptions?.onWidthChanged?.(width, { isUserInteraction });
		this.writeStoredWidth();
	}

	private getCurrentWidth() {
		return resolveLengthToPixels(this.width, this.panelNode, 'width');
	}

	private markKeyboardResizing() {
		this.isKeyboardResizing = true;
		if (this.keyboardResizeTimeout) {
			clearTimeout(this.keyboardResizeTimeout);
		}
		this.keyboardResizeTimeout = setTimeout(() => {
			this.isKeyboardResizing = false;
			this.keyboardResizeTimeout = null;
		}, 120);
	}

	private getBounds() {
		const min = resolveLengthToPixels(
			this.resizeOptions?.minWidth ?? DEFAULT_MIN_WIDTH,
			this.panelNode,
			'minWidth'
		);
		const max = resolveLengthToPixels(
			this.resizeOptions?.maxWidth ?? DEFAULT_MAX_WIDTH,
			this.panelNode,
			'maxWidth'
		);

		if (max < min) {
			throw new Error(`Sidebar resizable maxWidth ${max}px is lower than minWidth ${min}px.`);
		}

		return { min, max };
	}

	private get keyboardStep() {
		const step = this.resizeOptions?.keyboardStep;
		return isFinitePositiveNumber(step) ? step : DEFAULT_KEYBOARD_STEP;
	}

	private get collapseThreshold() {
		return Math.round(
			resolveLengthToPixels(
				this.resizeOptions?.collapseThreshold ?? this.resizeOptions?.minWidth ?? DEFAULT_MIN_WIDTH,
				this.panelNode,
				'collapseThreshold'
			)
		);
	}

	private get resizeOptions(): SidebarResizableOptions | undefined {
		return typeof this.resizable === 'object' ? this.resizable : undefined;
	}

	private loadStoredWidth(storageKey: string) {
		if (this.loadedStorageKeys.has(storageKey)) return;
		this.loadedStorageKeys.add(storageKey);

		const storedWidth = readStoredWidth(storageKey);
		if (!storedWidth) return;
		this.setWidthPixels(storedWidth, false);
		this.commitWidth(false);
	}

	private writeStoredWidth() {
		const storageKey = this.resizeOptions?.storageKey;
		if (!storageKey) return;
		writeStoredWidth(storageKey, this.getCurrentWidth());
	}
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isFinitePositiveNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value) && value > 0;

const resolveLengthToPixels = (
	value: string | number,
	contextNode: HTMLElement | null,
	propertyName: string
) => {
	if (isFinitePositiveNumber(value)) return value;
	if (typeof value !== 'string') {
		throw new Error(`Sidebar resizable ${propertyName} must be a positive number or CSS length.`);
	}

	const match = value.trim().match(/^(-?\d+(?:\.\d+)?)\s*(px|rem|em|%)$/);
	if (!match) {
		throw new Error(
			`Sidebar resizable ${propertyName} must use px, rem, em, or %; received "${value}".`
		);
	}

	const amount = Number(match[1]);
	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error(`Sidebar resizable ${propertyName} must be positive; received "${value}".`);
	}

	const unit = match[2];
	if (unit === 'px') return amount;
	if (unit === 'rem') return amount * getRootFontSize();
	if (unit === 'em') return amount * getContextFontSize(contextNode);

	const containerWidth =
		contextNode?.parentElement?.getBoundingClientRect().width ||
		contextNode?.getBoundingClientRect().width ||
		0;
	return (containerWidth * amount) / 100;
};

const getRootFontSize = () => {
	if (typeof window === 'undefined') return 16;
	return Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
};

const getContextFontSize = (contextNode: HTMLElement | null) => {
	if (!contextNode || typeof window === 'undefined') return getRootFontSize();
	return Number.parseFloat(window.getComputedStyle(contextNode).fontSize) || getRootFontSize();
};

const getBrowserStorage = (): Storage | null => {
	if (typeof window === 'undefined') return null;

	try {
		return window.localStorage;
	} catch {
		return null;
	}
};

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const parseStoredWidth = (value: unknown) => {
	if (!isObject(value) || value.version !== STORAGE_VERSION) return null;
	return isFinitePositiveNumber(value.width) ? value.width : null;
};

const readStoredWidth = (storageKey: string): number | null => {
	const storage = getBrowserStorage();
	if (!storage) return null;

	let rawWidth: string | null;
	try {
		rawWidth = storage.getItem(storageKey);
	} catch {
		return null;
	}
	if (!rawWidth) return null;

	try {
		const parsedWidth: unknown = JSON.parse(rawWidth);
		return parseStoredWidth(parsedWidth);
	} catch {
		return null;
	}
};

const writeStoredWidth = (storageKey: string, width: number) => {
	const storage = getBrowserStorage();
	if (!storage) return;

	try {
		storage.setItem(storageKey, JSON.stringify({ version: STORAGE_VERSION, width }));
	} catch {
		// Persistence is optional; localStorage may be unavailable or full.
	}
};
