import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import { useDndList } from '$lib/utils/useDndList.svelte.js';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import {
	acceptGanttInteraction,
	pendingGanttInteraction,
	rejectGanttInteraction,
	type GanttInteractionResolution
} from './ganttChart.interactionResolution.js';
import {
	resolveGanttRowDrop,
	type GanttRowDropProposal,
	type GanttRowDropTarget
} from './ganttChart.rowDrop.js';
import type { GanttChartState } from './ganttChart.state.svelte.js';
import type { GanttResolvedTaskNode } from './ganttChart.types.js';

/* eslint-disable svelte/prefer-svelte-reactivity -- mounted attachment registries do not drive rendering */

export type GanttRowReorderStatus = Readonly<{
	kind: 'row';
	transport: 'native' | 'pointer';
	taskId: string;
	resolution: GanttInteractionResolution<GanttRowDropProposal>;
}>;

export type GanttRowInteractionOwner = Readonly<{
	status: GanttRowReorderStatus | null;
	cancel: (announce?: boolean) => boolean;
}>;

type RowSession<TTaskFields extends object> = {
	transport: 'native' | 'pointer';
	taskId: string;
	rowModel: GanttRowOrder<TTaskFields>;
	sourceElement: HTMLElement | null;
	pointerId: number | null;
	target: GanttRowDropTarget | null;
	pointerX: number;
	pointerY: number;
};

type NativeTargetLocation = Readonly<{
	taskId: string;
	targetTaskId: string | null;
	targetIndex: number;
	targetEdge: 'top' | 'bottom' | 'left' | 'right' | null;
}>;

type GanttRowOrder<TTaskFields extends object> = Readonly<{
	rows: readonly GanttResolvedTaskNode<TTaskFields>[];
	rowIndexByTaskId: ReadonlyMap<string, number>;
	isOrderStable: boolean;
}>;

const AUTO_SCROLL_EDGE_PX = 40;
const AUTO_SCROLL_INTERVAL_MS = 90;

export class GanttRowReorder<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	readonly #dnd: ReturnType<typeof useDndList<GanttResolvedTaskNode<TTaskFields>>>;
	#session = $state.raw<RowSession<TTaskFields> | null>(null);
	#autoScrollFrame: number | null = null;
	#lastAutoScrollAt = 0;
	#attachments = new Map<string, Attachment<HTMLElement>>();
	readonly list: Attachment;

	constructor(
		private readonly chart: GanttChartState<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		private readonly getRowModel: () => GanttRowOrder<TTaskFields>,
		private readonly scrollToRow: (rowIndex: number) => void,
		listId: string
	) {
		this.#dnd = useDndList({
			id: listId,
			items: () => [...this.getRowModel().rows],
			itemId: (node) => node.taskId,
			handle: true,
			indicator: 'custom',
			disabled: () => !this.canReorder,
			canDrag: (node) => this.canBegin(node.taskId),
			autoScrollAxis: 'vertical',
			onDragStart: ({ item }) => {
				this.#session = {
					transport: 'native',
					taskId: item.taskId,
					rowModel: this.getRowModel(),
					sourceElement: null,
					pointerId: null,
					target: null,
					pointerX: 0,
					pointerY: 0
				};
			},
			onReorder: (_rows, detail) => {
				const target = this.resolveNativeTarget({
					taskId: detail.item.taskId,
					targetTaskId: detail.targetItemId,
					targetIndex: detail.to,
					targetEdge: detail.targetEdge
				});
				if (target) this.commit(target);
				else this.block(detail.item.taskId, 'invalid-target');
			},
			onDragEnd: ({ item, dropped }) => {
				const session = this.#session;
				if (!session || session.transport !== 'native' || session.taskId !== item.taskId) return;
				if (dropped) this.clearSession();
				else this.cancel(true);
			}
		});
		this.list = this.#dnd.list;

		$effect(() => {
			const disconnect = this.chart.interaction.connectRowInteraction(this);
			return () => {
				this.cancel();
				disconnect();
			};
		});
		$effect(() => {
			const rowModel = this.getRowModel();
			untrack(() => {
				const session = this.#session;
				if (!session || session.rowModel === rowModel) return;
				this.cancel();
				this.block(session.taskId, 'stale');
			});
		});
	}

	private readonly blockedReason = $derived.by(() => {
		if (this.chart.disabled) return 'disabled' as const;
		if (this.chart.loading) return 'loading' as const;
		if (!this.chart.interactions.reorderRows || !this.getRowModel().isOrderStable) {
			return 'invalid-target' as const;
		}
		return null;
	});

	readonly canReorder = $derived(this.blockedReason === null);

	readonly status: GanttRowReorderStatus | null = $derived.by(() => {
		const session = this.#session;
		if (!session) return null;
		let resolution: GanttInteractionResolution<GanttRowDropProposal> = pendingGanttInteraction;
		if (!this.isCurrent(session)) {
			resolution = rejectGanttInteraction(
				'stale',
				'The controlled task rows changed during row reordering.'
			);
		} else if (this.blockedReason) {
			resolution = rejectGanttInteraction(
				this.blockedReason,
				this.getBlockedMessage(this.blockedReason)
			);
		} else {
			const over = this.#dnd.over;
			let target = session.target;
			if (session.transport === 'native') {
				target =
					over?.source.itemId === session.taskId
						? this.resolveNativeTarget({
								taskId: session.taskId,
								targetTaskId: over.targetItemId,
								targetIndex: over.index,
								targetEdge: over.targetEdge
							})
						: null;
			}
			if (target) {
				const proposal = resolveGanttRowDrop(target, this.chart.schedule.resolvedTasksById);
				resolution = proposal
					? acceptGanttInteraction(proposal)
					: rejectGanttInteraction(
							'invalid-target',
							'The row target does not preserve a valid hierarchy.'
						);
			}
		}
		return {
			kind: 'row',
			transport: session.transport,
			taskId: session.taskId,
			resolution
		};
	});

	readonly preview: GanttRowDropProposal | null = $derived(
		this.status?.resolution.state === 'accepted' ? this.status.resolution.proposal : null
	);

	readonly isInvalid = $derived(this.status?.resolution.state === 'rejected');

	item(node: GanttResolvedTaskNode<TTaskFields>): Attachment<HTMLElement> {
		const current = this.#attachments.get(node.taskId);
		if (current) return current;
		const nativeAttachment = this.#dnd.item(node);
		const pointerAttachment = createPointerDrag({
			canStart: (event) =>
				event.pointerType === 'touch' &&
				event.target instanceof Element &&
				Boolean(event.target.closest('[data-dnd-handle]')),
			disabled: () => !this.chart.interactions.touch || !this.canBegin(node.taskId),
			activation: () => this.chart.touchActivation,
			frameCoalesced: true,
			stopPropagation: true,
			onStart: (payload) => this.beginPointer(node.taskId, payload),
			onMove: (payload) => this.updatePointer(payload),
			onEnd: (payload) => this.finishPointer(payload),
			onCancel: () => this.cancel(true)
		});
		const attachment: Attachment<HTMLElement> = (element) => {
			const nativeCleanup = nativeAttachment(element);
			const pointerCleanup = pointerAttachment(element);
			return () => {
				pointerCleanup?.();
				nativeCleanup?.();
				if (this.#attachments.get(node.taskId) === attachment) {
					this.#attachments.delete(node.taskId);
				}
			};
		};
		this.#attachments.set(node.taskId, attachment);
		return attachment;
	}

	cancel(announce = false): boolean {
		const session = this.#session;
		if (!session) return false;
		const status = this.status;
		if (session.transport === 'native') this.#dnd.cancel();
		this.clearSession();
		if (announce && status) {
			this.chart.a11y.announceInteractionCancelled(status);
			this.chart.a11y.scheduleDismissFocus();
		}
		return true;
	}

	private canBegin(taskId: string): boolean {
		const task = this.chart.schedule.model.tasksById.get(taskId);
		return (
			this.canReorder && this.chart.interaction.active === null && Boolean(task && !task.readOnly)
		);
	}

	private beginPointer(taskId: string, payload: PointerDragPayload<HTMLElement>): boolean {
		if (!this.canBegin(taskId)) return false;
		this.#session = {
			transport: 'pointer',
			taskId,
			rowModel: this.getRowModel(),
			sourceElement: payload.node,
			pointerId: payload.pointerId,
			target: null,
			pointerX: payload.x,
			pointerY: payload.y
		};
		this.#lastAutoScrollAt = 0;
		this.updatePointerTarget(payload.x, payload.y);
		this.startAutoScroll();
		return true;
	}

	private updatePointer(payload: PointerDragPayload<HTMLElement>): void {
		if (this.#session?.transport !== 'pointer') return;
		this.updatePointerTarget(payload.x, payload.y);
		this.startAutoScroll();
	}

	private finishPointer(payload: PointerDragPayload<HTMLElement>): void {
		if (this.#session?.transport !== 'pointer') return;
		this.updatePointer(payload);
		const session = this.#session;
		if (!session || session.transport !== 'pointer') return;
		if (!session.target) {
			this.clearSession();
			this.block(session.taskId, 'invalid-target');
			return;
		}
		this.commit(session.target);
	}

	private resolveNativeTarget(location: NativeTargetLocation): GanttRowDropTarget | null {
		const rowModel = this.getRowModel();
		const rows = rowModel.rows;
		const sourceIndex = rowModel.rowIndexByTaskId.get(location.taskId);
		const targetTaskId =
			location.targetTaskId ?? rows[Math.min(location.targetIndex, rows.length - 1)]?.taskId;
		if (sourceIndex === undefined || !targetTaskId || targetTaskId === location.taskId) return null;
		let position: GanttRowDropTarget['position'] =
			location.targetIndex > sourceIndex ? 'after' : 'before';
		if (location.targetEdge === 'top') position = 'before';
		if (location.targetEdge === 'bottom') position = 'after';
		return { taskId: location.taskId, targetTaskId, position };
	}

	private updatePointerTarget(pointerX: number, pointerY: number): void {
		const session = this.#session;
		if (!session || session.transport !== 'pointer') return;
		const targetElement = document
			.elementFromPoint(pointerX, pointerY)
			?.closest<HTMLElement>('[data-gantt-chart-part="row"]');
		const targetTaskId = targetElement?.dataset.taskId;
		const isSameList =
			targetElement?.closest('[data-dnd-list]') ===
			session.sourceElement?.closest('[data-dnd-list]');
		if (!targetElement || !targetTaskId || targetTaskId === session.taskId || !isSameList) {
			this.#session = { ...session, pointerX, pointerY, target: null };
			return;
		}
		const bounds = targetElement.getBoundingClientRect();
		this.#session = {
			...session,
			pointerX,
			pointerY,
			target: {
				taskId: session.taskId,
				targetTaskId,
				position: pointerY < bounds.top + bounds.height / 2 ? 'before' : 'after'
			}
		};
	}

	private commit(target: GanttRowDropTarget): boolean {
		const session = this.#session;
		if (!session || session.taskId !== target.taskId) return false;
		if (!this.isCurrent(session)) {
			this.cancel();
			this.block(session.taskId, 'stale');
			return false;
		}
		const unavailableReason = this.blockedReason;
		if (unavailableReason) {
			this.cancel();
			this.block(session.taskId, unavailableReason);
			return false;
		}
		this.clearSession();
		const accepted = this.chart.reorderTask(target, 'pointer');
		if (!accepted) this.block(target.taskId, 'invalid-target');
		return accepted;
	}

	private isCurrent(session: RowSession<TTaskFields>): boolean {
		return session.rowModel === this.getRowModel();
	}

	private block(taskId: string, reason: 'disabled' | 'loading' | 'invalid-target' | 'stale'): void {
		this.chart.blockInteraction({
			reason,
			source: 'pointer',
			taskId,
			message: this.getBlockedMessage(reason)
		});
		this.chart.a11y.scheduleDismissFocus();
	}

	private getBlockedMessage(reason: 'disabled' | 'loading' | 'invalid-target' | 'stale'): string {
		if (reason === 'disabled') return 'GanttChart became disabled during row reordering.';
		if (reason === 'loading') return 'GanttChart started loading during row reordering.';
		if (reason === 'stale') {
			return 'The controlled task rows changed during row reordering.';
		}
		return 'Row reordering requires a compatible hierarchy target.';
	}

	private clearSession(): void {
		const session = this.#session;
		this.#session = null;
		if (
			session?.sourceElement &&
			session.pointerId !== null &&
			session.sourceElement.hasPointerCapture(session.pointerId)
		) {
			session.sourceElement.releasePointerCapture(session.pointerId);
		}
		if (this.#autoScrollFrame !== null) cancelAnimationFrame(this.#autoScrollFrame);
		this.#autoScrollFrame = null;
	}

	private startAutoScroll(): void {
		if (this.#autoScrollFrame !== null) return;
		const update = (time: number) => {
			this.#autoScrollFrame = null;
			const session = this.#session;
			if (!session || session.transport !== 'pointer' || !session.sourceElement) return;
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
			const rowModel = this.getRowModel();
			const rows = rowModel.rows;
			const currentTaskId = session.target?.targetTaskId ?? session.taskId;
			const currentIndex = rowModel.rowIndexByTaskId.get(currentTaskId) ?? -1;
			const nextIndex = Math.max(0, Math.min(rows.length - 1, currentIndex + direction));
			if (nextIndex === currentIndex) return;
			this.#lastAutoScrollAt = time;
			this.scrollToRow(nextIndex);
			requestAnimationFrame(() => this.updatePointerTarget(session.pointerX, session.pointerY));
			this.#autoScrollFrame = requestAnimationFrame(update);
		};
		this.#autoScrollFrame = requestAnimationFrame(update);
	}
}
