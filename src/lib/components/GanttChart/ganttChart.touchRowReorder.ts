import {
	createPointerDrag,
	type PointerDragPayload,
	type PointerDragOptions
} from '$lib/utils/pointerDrag.js';
import type { Attachment } from 'svelte/attachments';
import type { GanttTouchActivation } from './ganttChart.types.js';

type TouchRow = Readonly<{
	taskId: string;
	parentId: string | null;
	task: Readonly<{ readOnly?: boolean }>;
}>;

type TouchRowReorderOptions = Readonly<{
	getRows: () => readonly TouchRow[];
	disabled: () => boolean;
	activation: () => GanttTouchActivation;
	scrollToRow: (rowIndex: number) => void;
	onTargetChange: (
		target: Readonly<{
			taskId: string;
			targetTaskId: string;
			position: 'before' | 'after';
		}> | null
	) => void;
	onReorder: (taskId: string, targetTaskId: string, position: 'before' | 'after') => boolean;
	onBlocked: (taskId: string, reason: 'invalid-target' | 'stale') => void;
}>;

type TouchReorderSession = {
	taskId: string;
	rows: readonly TouchRow[];
	sourceElement: HTMLElement;
	targetTaskId: string | null;
	position: 'before' | 'after' | null;
	pointerX: number;
	pointerY: number;
	lastAutoScrollAt: number;
};

const AUTO_SCROLL_EDGE_PX = 40;
const AUTO_SCROLL_INTERVAL_MS = 90;

export class GanttTouchRowReorder {
	#session: TouchReorderSession | null = null;
	#autoScrollFrame: number | null = null;
	#attachments = new Map<string, Attachment<HTMLElement>>();

	constructor(private readonly options: TouchRowReorderOptions) {}

	item(taskId: string): Attachment<HTMLElement> {
		const current = this.#attachments.get(taskId);
		if (current) return current;
		const pointerOptions: PointerDragOptions<HTMLElement> = {
			canStart: (event) =>
				event.pointerType === 'touch' &&
				event.target instanceof Element &&
				Boolean(event.target.closest('[data-dnd-handle]')),
			disabled: () => this.options.disabled() || !this.canDrag(taskId),
			activation: this.options.activation,
			frameCoalesced: true,
			stopPropagation: true,
			onStart: (payload) => this.begin(taskId, payload),
			onMove: (payload) => this.update(payload),
			onEnd: (payload) => this.finish(payload),
			onCancel: () => this.cancel()
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

	private canDrag(taskId: string): boolean {
		return this.options.getRows().some((row) => row.taskId === taskId && !row.task.readOnly);
	}

	private begin(taskId: string, payload: PointerDragPayload<HTMLElement>): boolean {
		const rows = this.options.getRows();
		if (this.options.disabled() || !rows.some((row) => row.taskId === taskId)) return false;
		this.#session = {
			taskId,
			rows,
			sourceElement: payload.node,
			targetTaskId: null,
			position: null,
			pointerX: payload.x,
			pointerY: payload.y,
			lastAutoScrollAt: 0
		};
		payload.node.dataset.ganttTouchReordering = 'true';
		this.updateTarget(payload.x, payload.y);
		this.startAutoScroll();
		return true;
	}

	private update(payload: PointerDragPayload<HTMLElement>): void {
		const session = this.#session;
		if (!session) return;
		session.pointerX = payload.x;
		session.pointerY = payload.y;
		this.updateTarget(payload.x, payload.y);
		this.startAutoScroll();
	}

	private finish(payload: PointerDragPayload<HTMLElement>): void {
		const session = this.#session;
		if (!session) return;
		this.update(payload);
		const targetTaskId = session.targetTaskId;
		const position = session.position;
		if (session.rows !== this.options.getRows()) {
			this.options.onBlocked(session.taskId, 'stale');
			this.cancel();
			return;
		}
		if (!targetTaskId || !position) {
			this.options.onBlocked(session.taskId, 'invalid-target');
			this.cancel();
			return;
		}
		if (!this.options.onReorder(session.taskId, targetTaskId, position)) {
			this.options.onBlocked(session.taskId, 'invalid-target');
		}
		this.cancel();
	}

	private updateTarget(pointerX: number, pointerY: number): void {
		const session = this.#session;
		if (!session) return;
		const targetElement = document
			.elementFromPoint(pointerX, pointerY)
			?.closest<HTMLElement>('[data-gantt-chart-part="row"]');
		const targetTaskId = targetElement?.dataset.taskId;
		const source = session.rows.find((row) => row.taskId === session.taskId);
		const target = session.rows.find((row) => row.taskId === targetTaskId);
		if (
			!source ||
			!target ||
			!targetElement ||
			target.taskId === source.taskId ||
			!session.sourceElement.parentElement?.contains(targetElement)
		) {
			if (session.targetTaskId) this.options.onTargetChange(null);
			session.targetTaskId = null;
			session.position = null;
			return;
		}
		const bounds = targetElement.getBoundingClientRect();
		const position = pointerY < bounds.top + bounds.height / 2 ? 'before' : 'after';
		const hasChanged = session.targetTaskId !== target.taskId || session.position !== position;
		session.targetTaskId = target.taskId;
		session.position = position;
		if (hasChanged) {
			this.options.onTargetChange({
				taskId: session.taskId,
				targetTaskId: target.taskId,
				position
			});
		}
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
			if (time - session.lastAutoScrollAt < AUTO_SCROLL_INTERVAL_MS) {
				this.#autoScrollFrame = requestAnimationFrame(update);
				return;
			}
			const currentTaskId = session.targetTaskId ?? session.taskId;
			const currentIndex = session.rows.findIndex((row) => row.taskId === currentTaskId);
			const nextIndex = Math.max(0, Math.min(session.rows.length - 1, currentIndex + direction));
			if (nextIndex === currentIndex) return;
			session.lastAutoScrollAt = time;
			this.options.scrollToRow(nextIndex);
			requestAnimationFrame(() => this.updateTarget(session.pointerX, session.pointerY));
			this.#autoScrollFrame = requestAnimationFrame(update);
		};
		this.#autoScrollFrame = requestAnimationFrame(update);
	}

	private cancel(): void {
		const session = this.#session;
		if (session) {
			delete session.sourceElement.dataset.ganttTouchReordering;
			if (session.targetTaskId) this.options.onTargetChange(null);
		}
		this.#session = null;
		if (this.#autoScrollFrame !== null) cancelAnimationFrame(this.#autoScrollFrame);
		this.#autoScrollFrame = null;
	}
}
