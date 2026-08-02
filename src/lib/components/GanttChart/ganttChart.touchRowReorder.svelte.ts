import {
	createPointerDrag,
	type PointerDragPayload,
	type PointerDragOptions
} from '$lib/utils/pointerDrag.js';
import type { Attachment } from 'svelte/attachments';
import type { GanttTouchActivation } from './ganttChart.types.js';

/* eslint-disable svelte/prefer-svelte-reactivity -- attachment registry changes must not invalidate rendering */

type TouchRow = Readonly<{
	taskId: string;
	task: Readonly<{ readOnly?: boolean }>;
}>;

type TouchRowReorderOptions = Readonly<{
	getRows: () => readonly TouchRow[];
	disabled: () => boolean;
	canStart: () => boolean;
	activation: () => GanttTouchActivation;
	scrollToRow: (rowIndex: number) => void;
	onReorder: (taskId: string, targetTaskId: string, position: 'before' | 'after') => boolean;
	onBlocked: (taskId: string, reason: 'invalid-target' | 'stale') => void;
	onCancel: (taskId: string) => void;
}>;

type TouchReorderSession = Readonly<{
	taskId: string;
	rows: readonly TouchRow[];
	sourceElement: HTMLElement;
	pointerId: number;
	target: Readonly<{ taskId: string; position: 'before' | 'after' }> | null;
	pointerX: number;
	pointerY: number;
}>;

const AUTO_SCROLL_EDGE_PX = 40;
const AUTO_SCROLL_INTERVAL_MS = 90;
const IDLE_STATE = { state: 'idle' } as const;

export class GanttTouchRowReorder {
	#session = $state.raw<TouchReorderSession | null>(null);
	#autoScrollFrame: number | null = null;
	#lastAutoScrollAt = 0;
	#attachments = new Map<string, Attachment<HTMLElement>>();

	constructor(private readonly options: TouchRowReorderOptions) {}

	readonly state = $derived.by(() => {
		const session = this.#session;
		if (!session) return IDLE_STATE;
		const target = session.target
			? {
					taskId: session.taskId,
					targetTaskId: session.target.taskId,
					position: session.target.position
				}
			: null;
		return { state: 'dragging' as const, taskId: session.taskId, target };
	});

	item(taskId: string): Attachment<HTMLElement> {
		const current = this.#attachments.get(taskId);
		if (current) return current;
		const pointerOptions: PointerDragOptions<HTMLElement> = {
			canStart: (event) =>
				event.pointerType === 'touch' &&
				event.target instanceof Element &&
				Boolean(event.target.closest('[data-dnd-handle]')),
			disabled: () =>
				this.options.disabled() ||
				(!this.#session && !this.options.canStart()) ||
				!this.canDrag(taskId),
			activation: this.options.activation,
			frameCoalesced: true,
			stopPropagation: true,
			onStart: (payload) => this.begin(taskId, payload),
			onMove: (payload) => this.update(payload),
			onEnd: (payload) => this.finish(payload),
			onCancel: () => {
				const activeTaskId = this.#session?.taskId;
				this.cancel();
				if (activeTaskId) this.options.onCancel(activeTaskId);
			}
		};
		const pointerDrag = createPointerDrag(pointerOptions);
		const attachment: Attachment<HTMLElement> = (element) => {
			const cleanup = pointerDrag(element);
			return () => {
				cleanup?.();
				if (this.#attachments.get(taskId) === attachment) this.#attachments.delete(taskId);
				if (this.#session?.taskId === taskId) this.cancel();
			};
		};
		this.#attachments.set(taskId, attachment);
		return attachment;
	}

	private canDrag(taskId: string, rows = this.options.getRows()): boolean {
		return rows.some((row) => row.taskId === taskId && !row.task.readOnly);
	}

	private begin(taskId: string, payload: PointerDragPayload<HTMLElement>): boolean {
		const rows = this.options.getRows();
		if (this.options.disabled() || !this.options.canStart() || !this.canDrag(taskId, rows)) {
			return false;
		}
		this.#session = {
			taskId,
			rows,
			sourceElement: payload.node,
			pointerId: payload.pointerId,
			target: null,
			pointerX: payload.x,
			pointerY: payload.y
		};
		this.#lastAutoScrollAt = 0;
		payload.node.dataset.ganttTouchReordering = 'true';
		this.updateTarget(payload.x, payload.y);
		this.startAutoScroll();
		return true;
	}

	private update(payload: PointerDragPayload<HTMLElement>): void {
		if (!this.#session) return;
		this.updateTarget(payload.x, payload.y);
		this.startAutoScroll();
	}

	private finish(payload: PointerDragPayload<HTMLElement>): void {
		if (!this.#session) return;
		try {
			this.update(payload);
			const session = this.#session;
			if (!session) return;
			if (session.rows !== this.options.getRows()) {
				this.options.onBlocked(session.taskId, 'stale');
				return;
			}
			if (!session.target) {
				this.options.onBlocked(session.taskId, 'invalid-target');
				return;
			}
			if (!this.options.onReorder(session.taskId, session.target.taskId, session.target.position)) {
				this.options.onBlocked(session.taskId, 'invalid-target');
			}
		} finally {
			this.cancel();
		}
	}

	private updateTarget(pointerX: number, pointerY: number): void {
		const session = this.#session;
		if (!session) return;
		const targetElement = document
			.elementFromPoint(pointerX, pointerY)
			?.closest<HTMLElement>('[data-gantt-chart-part="row"]');
		const targetTaskId = targetElement?.dataset.taskId;
		const target = session.rows.find((row) => row.taskId === targetTaskId);
		if (
			!target ||
			!targetElement ||
			target.taskId === session.taskId ||
			!session.sourceElement.parentElement?.contains(targetElement)
		) {
			this.#session = {
				...session,
				pointerX,
				pointerY,
				target: null
			};
			return;
		}
		const bounds = targetElement.getBoundingClientRect();
		const position = pointerY < bounds.top + bounds.height / 2 ? 'before' : 'after';
		this.#session = {
			...session,
			pointerX,
			pointerY,
			target: { taskId: target.taskId, position }
		};
	}

	private startAutoScroll(): void {
		if (this.#autoScrollFrame !== null) return;
		const update = (time: number) => {
			this.#autoScrollFrame = null;
			const session = this.#session;
			if (!session) return;
			const content = session.sourceElement.closest<HTMLElement>(
				'[data-gantt-chart-part="content"]'
			);
			if (!content) return;
			const bounds = content.getBoundingClientRect();
			const direction =
				session.pointerY < bounds.top + AUTO_SCROLL_EDGE_PX
					? -1
					: session.pointerY > bounds.bottom - AUTO_SCROLL_EDGE_PX
						? 1
						: 0;
			if (direction === 0) return;
			if (time - this.#lastAutoScrollAt < AUTO_SCROLL_INTERVAL_MS) {
				this.#autoScrollFrame = requestAnimationFrame(update);
				return;
			}
			const currentTaskId = session.target?.taskId ?? session.taskId;
			const currentIndex = session.rows.findIndex((row) => row.taskId === currentTaskId);
			const nextIndex = Math.max(0, Math.min(session.rows.length - 1, currentIndex + direction));
			if (nextIndex === currentIndex) return;
			this.#lastAutoScrollAt = time;
			this.options.scrollToRow(nextIndex);
			requestAnimationFrame(() => this.updateTarget(session.pointerX, session.pointerY));
			this.#autoScrollFrame = requestAnimationFrame(update);
		};
		this.#autoScrollFrame = requestAnimationFrame(update);
	}

	cancel(): void {
		const session = this.#session;
		this.#session = null;
		if (session) {
			delete session.sourceElement.dataset.ganttTouchReordering;
			if (session.sourceElement.hasPointerCapture(session.pointerId)) {
				session.sourceElement.releasePointerCapture(session.pointerId);
			}
		}
		if (this.#autoScrollFrame !== null) cancelAnimationFrame(this.#autoScrollFrame);
		this.#autoScrollFrame = null;
	}
}
