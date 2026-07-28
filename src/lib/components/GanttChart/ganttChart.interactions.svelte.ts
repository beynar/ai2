import {
	draggable,
	dropTargetForElements,
	type ElementEventPayloadMap
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview';
import {
	autoScrollForElements,
	autoScrollWindowForElements
} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import {
	getCalendarRuntime,
	getTaskCalendar,
	type GanttCalendarRuntime
} from './ganttChart.calendar.js';
import { GanttChartError } from './ganttChart.error.js';
import type { GanttChartMutations } from './ganttChart.mutations.js';
import { getGanttScaleInstantAtPixel, type GanttTimeScale } from './ganttChart.scale.js';
import type { GanttChartStateOptions } from './ganttChart.state.svelte.js';
import {
	deriveGanttProgressChange,
	deriveGanttRangeProposal,
	deriveGanttTaskPointerChange,
	validateGanttRangeProposal,
	validateGanttTaskChange,
	type GanttDerivedTaskChange,
	type GanttTaskPointerOperation
} from './ganttChart.taskInteraction.js';
import type {
	GanttInteractionBlockedInfo,
	GanttRangeProposal,
	GanttTask,
	GanttTaskMutationKind,
	GanttTaskProposal
} from './ganttChart.types.js';
import type { ResolvedGanttSchedule } from './ganttChart.schedule.js';

/* eslint-disable svelte/prefer-svelte-reactivity -- attachment registries must not invalidate component rendering */

const SOURCE_MARK = 'svelai-gantt-chart-task';
const POINTER_EDGE_SIZE = 48;
const POINTER_MAX_SCROLL = 18;
let nextInteractionId = 0;

type PointerCoordinates = Readonly<{ clientX: number; clientY: number }>;

type GanttTimelineInteractionContext = Readonly<{
	scale: GanttTimeScale;
	viewport: HTMLElement;
	rowHeight: number;
}>;

type GestureBoundary<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>['dependencies'];
	resources: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>['resources'];
	assignments: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>['assignments'];
	calendars: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>['calendars'];
}>;

type TaskGesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = {
	type: 'task';
	initialOperation: GanttTaskPointerOperation | 'progress';
	operation: GanttTaskPointerOperation | 'progress';
	task: GanttTask<TTaskFields>;
	calendar: GanttCalendarRuntime;
	scale: GanttTimeScale;
	boundary: GestureBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	originInstant: Date;
	rowTop: number;
	pointer: PointerCoordinates;
	pointerCanvasX: number;
	proposal: GanttTaskProposal<TTaskFields> | null;
	isValid: boolean;
	invalidReason: GanttInteractionBlockedInfo['reason'] | null;
	invalidMessage: string | null;
	workingDurationMinutes: number;
};

type RangeGesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = {
	type: 'range';
	calendar: GanttCalendarRuntime;
	scale: GanttTimeScale;
	boundary: GestureBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	originInstant: Date;
	rowTop: number;
	pointer: PointerCoordinates;
	pointerCanvasX: number;
	proposal: GanttRangeProposal | null;
	isValid: boolean;
	invalidReason: GanttInteractionBlockedInfo['reason'] | null;
	invalidMessage: string | null;
	workingDurationMinutes: number;
};

type Gesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> =
	| TaskGesture<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	| RangeGesture<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;

export type GanttChartInteractionStatus<TTaskFields extends object> =
	| Readonly<{
			type: 'task';
			operation: GanttTaskPointerOperation | 'progress';
			taskId: string;
			proposal: GanttTaskProposal<TTaskFields> | null;
			rowTop: number;
			pointerCanvasX: number;
			workingDurationMinutes: number;
			isValid: boolean;
			invalidReason: string | null;
	  }>
	| Readonly<{
			type: 'range';
			operation: 'range';
			proposal: GanttRangeProposal | null;
			rowTop: number;
			pointerCanvasX: number;
			workingDurationMinutes: number;
			isValid: boolean;
			invalidReason: string | null;
	  }>;

type GanttTaskDragSource = Readonly<{
	taskId: string;
	operation: GanttTaskPointerOperation;
	rowTop: number;
}>;

export class GanttChartInteractions<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	readonly #instanceId = `gantt-chart-interaction-${++nextInteractionId}`;
	readonly #options: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	readonly #mutations: GanttChartMutations<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	readonly #getSchedule: () => ResolvedGanttSchedule<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>;
	#gesture = $state.raw<Gesture<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> | null>(null);
	#timeline: GanttTimelineInteractionContext | null = null;
	#pendingPointer: PointerCoordinates | null = null;
	#pointerFrame: number | null = null;
	#pointerAutoScrollFrame: number | null = null;
	#didNativeCancel = false;
	#taskRowTops = new Map<string, number>();
	#taskDragAttachments = new Map<string, Attachment<HTMLElement>>();
	#progressDragAttachments = new Map<string, Attachment<HTMLElement>>();
	#rangeDragAttachment: Attachment<HTMLElement> | null = null;

	constructor(
		options: GanttChartStateOptions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		mutations: GanttChartMutations<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		getSchedule: () => ResolvedGanttSchedule<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) {
		this.#options = options;
		this.#mutations = mutations;
		this.#getSchedule = getSchedule;
	}

	get status(): GanttChartInteractionStatus<TTaskFields> | null {
		const gesture = this.#gesture;
		if (!gesture) return null;
		if (gesture.type === 'range') {
			return {
				type: 'range',
				operation: 'range',
				proposal: gesture.proposal,
				rowTop: gesture.rowTop,
				pointerCanvasX: gesture.pointerCanvasX,
				workingDurationMinutes: gesture.workingDurationMinutes,
				isValid: gesture.isValid,
				invalidReason: gesture.invalidReason
			};
		}
		return {
			type: 'task',
			operation: gesture.operation,
			taskId: gesture.task.id,
			proposal: gesture.proposal,
			rowTop: gesture.rowTop,
			pointerCanvasX: gesture.pointerCanvasX,
			workingDurationMinutes: gesture.workingDurationMinutes,
			isValid: gesture.isValid,
			invalidReason: gesture.invalidReason
		};
	}

	get isActive(): boolean {
		return this.#gesture !== null;
	}

	get isInvalid(): boolean {
		return this.#gesture !== null && !this.#gesture.isValid;
	}

	isTaskActive(taskId: string): boolean {
		return this.#gesture?.type === 'task' && this.#gesture.task.id === taskId;
	}

	connectTimeline(context: GanttTimelineInteractionContext): () => void {
		this.#timeline = context;
		const dropTargetCleanup = dropTargetForElements({
			element: context.viewport,
			canDrop: ({ source }) =>
				this.readTaskDragSource(source.data) !== null && this.#gesture?.isValid === true,
			getDropEffect: () => 'move'
		});
		const horizontalAutoScrollCleanup = autoScrollForElements({
			element: context.viewport,
			canScroll: ({ source }) => this.readTaskDragSource(source.data) !== null,
			getAllowedAxis: () => 'horizontal'
		});
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || !this.#gesture) return;
			event.preventDefault();
			this.cancel();
		};
		window.addEventListener('keydown', handleKeyDown, true);
		const handleDragEnd = (event: DragEvent) => {
			if (event.dataTransfer?.dropEffect === 'none') this.#didNativeCancel = true;
		};
		window.addEventListener('dragend', handleDragEnd, true);
		return () => {
			dropTargetCleanup();
			horizontalAutoScrollCleanup();
			window.removeEventListener('keydown', handleKeyDown, true);
			window.removeEventListener('dragend', handleDragEnd, true);
			if (this.#timeline === context) {
				this.cancel();
				this.#timeline = null;
			}
		};
	}

	connectVerticalScrollOwner(element: HTMLElement, mode: 'contained' | 'page'): () => void {
		if (mode === 'page' && element === document.documentElement) {
			return autoScrollWindowForElements({
				canScroll: ({ source }) => this.readTaskDragSource(source.data) !== null,
				getAllowedAxis: () => 'vertical'
			});
		}
		return autoScrollForElements({
			element,
			canScroll: ({ source }) => this.readTaskDragSource(source.data) !== null,
			getAllowedAxis: () => 'vertical'
		});
	}

	taskDrag(
		taskId: string,
		operation: GanttTaskPointerOperation,
		rowTop: number
	): Attachment<HTMLElement> {
		this.#taskRowTops.set(taskId, rowTop);
		const key = `${taskId}:${operation}`;
		const current = this.#taskDragAttachments.get(key);
		if (current) return current;
		const attachment: Attachment<HTMLElement> = (element) =>
			untrack(() => {
				const cleanup = draggable({
					element,
					canDrag: () => this.canBeginTaskGesture(taskId, operation),
					onGenerateDragPreview: ({ nativeSetDragImage }) => {
						disableNativeDragPreview({ nativeSetDragImage });
					},
					getInitialData: () => ({
						mark: SOURCE_MARK,
						instanceId: this.#instanceId,
						taskId,
						operation,
						rowTop: this.#taskRowTops.get(taskId) ?? rowTop
					}),
					onDragStart: (payload) => this.handleTaskDragStart(payload),
					onDrag: (payload) => this.handleTaskDrag(payload),
					onDrop: (payload) => this.handleTaskDrop(payload)
				});
				return () => {
					cleanup();
					if (this.#taskDragAttachments.get(key) === attachment) {
						this.#taskDragAttachments.delete(key);
					}
					if (operation === 'move') this.#taskRowTops.delete(taskId);
				};
			});
		this.#taskDragAttachments.set(key, attachment);
		return attachment;
	}

	progressDrag(taskId: string, rowTop: number): Attachment<HTMLElement> {
		this.#taskRowTops.set(taskId, rowTop);
		const current = this.#progressDragAttachments.get(taskId);
		if (current) return current;
		const pointerDrag = createPointerDrag({
			disabled: () => !this.canBeginProgressGesture(taskId),
			activation: () => this.#options.touchActivation,
			stopPropagation: true,
			onStart: (payload) =>
				this.beginProgressGesture(taskId, this.#taskRowTops.get(taskId) ?? rowTop, payload),
			onMove: (payload) => this.queuePointerUpdate(payload),
			onEnd: (payload) => this.finishPointerGesture(payload),
			onCancel: () => this.cancel()
		});
		const attachment: Attachment<HTMLElement> = (element) =>
			untrack(() => {
				const cleanup = pointerDrag(element);
				return () => {
					cleanup?.();
					if (this.#progressDragAttachments.get(taskId) === attachment) {
						this.#progressDragAttachments.delete(taskId);
					}
				};
			});
		this.#progressDragAttachments.set(taskId, attachment);
		return attachment;
	}

	rangeDrag(): Attachment<HTMLElement> {
		if (this.#rangeDragAttachment) return this.#rangeDragAttachment;
		const pointerDrag = createPointerDrag({
			disabled: () =>
				this.#options.disabled || this.#options.loading || !this.#options.interactions.createRange,
			activation: () => this.#options.touchActivation,
			stopPropagation: true,
			onStart: (payload) => this.beginRangeGesture(payload),
			onMove: (payload) => this.queuePointerUpdate(payload),
			onEnd: (payload) => this.finishPointerGesture(payload),
			onCancel: () => this.cancel()
		});
		const attachment: Attachment<HTMLElement> = (element) =>
			untrack(() => {
				const cleanup = pointerDrag(element);
				return () => {
					cleanup?.();
					if (this.#rangeDragAttachment === attachment) this.#rangeDragAttachment = null;
				};
			});
		this.#rangeDragAttachment = attachment;
		return attachment;
	}

	reconcileControlledState(): void {
		if (!this.#gesture || this.isBoundaryCurrent(this.#gesture.boundary)) return;
		this.reportBlocked({
			reason: 'stale',
			source: 'pointer',
			...(this.#gesture.type === 'task' ? { taskId: this.#gesture.task.id } : {}),
			message: 'The controlled Gantt collections changed during the interaction.'
		});
		this.cancel();
	}

	reconcileScale(scale: GanttTimeScale): void {
		if (!this.#gesture || isSameInteractionScale(this.#gesture.scale, scale)) return;
		this.reportBlocked({
			reason: 'stale',
			source: 'pointer',
			...(this.#gesture.type === 'task' ? { taskId: this.#gesture.task.id } : {}),
			message: 'The timeline scale changed during the interaction.'
		});
		this.cancel();
	}

	cancel(): boolean {
		if (!this.#gesture) return false;
		this.#gesture = null;
		this.cancelPointerFrames();
		return true;
	}

	private handleTaskDragStart(payload: ElementEventPayloadMap['onDragStart']): void {
		const source = this.readTaskDragSource(payload.source.data);
		const timeline = this.#timeline;
		if (!source || !timeline || !this.canBeginTaskGesture(source.taskId, source.operation)) return;
		const task = this.#options.tasks.find((candidate) => candidate.id === source.taskId);
		if (!task) return;
		this.#didNativeCancel = false;
		const pointer = payload.location.current.input;
		const schedule = this.#getSchedule();
		this.#gesture = {
			type: 'task',
			initialOperation: source.operation,
			operation: source.operation,
			task,
			calendar: getTaskCalendar(schedule.model, task),
			scale: timeline.scale,
			boundary: this.getBoundary(),
			originInstant: this.getPointerInstant(pointer, timeline.scale, timeline.viewport),
			rowTop: source.rowTop,
			pointer,
			pointerCanvasX: this.getPointerCanvasX(pointer, timeline.viewport),
			proposal: null,
			isValid: false,
			invalidReason: 'invalid-target',
			invalidMessage: 'The task has no valid pointer proposal.',
			workingDurationMinutes: 0
		};
		this.updatePointerGesture(pointer);
	}

	private handleTaskDrag(payload: ElementEventPayloadMap['onDrag']): void {
		if (!this.#gesture || this.#gesture.type !== 'task') return;
		this.queuePointerUpdate(payload.location.current.input);
	}

	private handleTaskDrop(payload: ElementEventPayloadMap['onDrop']): void {
		if (!this.#gesture || this.#gesture.type !== 'task') return;
		if (this.#didNativeCancel) {
			this.#didNativeCancel = false;
			if (!this.#gesture.isValid) this.reportGestureBlocked(this.#gesture);
			this.cancel();
			return;
		}
		this.flushPointerUpdate(payload.location.current.input);
		this.commitTaskGesture();
	}

	private beginProgressGesture(
		taskId: string,
		rowTop: number,
		payload: PointerDragPayload
	): boolean {
		const timeline = this.#timeline;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		if (!timeline || !task || !this.canBeginProgressGesture(taskId)) return false;
		const pointer = toPointerCoordinates(payload);
		this.#gesture = {
			type: 'task',
			initialOperation: 'progress',
			operation: 'progress',
			task,
			calendar: getTaskCalendar(this.#getSchedule().model, task),
			scale: timeline.scale,
			boundary: this.getBoundary(),
			originInstant: this.getPointerInstant(pointer, timeline.scale, timeline.viewport),
			rowTop,
			pointer,
			pointerCanvasX: this.getPointerCanvasX(pointer, timeline.viewport),
			proposal: null,
			isValid: false,
			invalidReason: 'invalid-target',
			invalidMessage: 'The task has no valid progress proposal.',
			workingDurationMinutes: 0
		};
		this.updatePointerGesture(pointer);
		this.startPointerAutoScroll();
		return true;
	}

	private beginRangeGesture(payload: PointerDragPayload): boolean {
		const timeline = this.#timeline;
		const startTarget = payload.startTarget;
		if (
			!timeline ||
			(startTarget instanceof Element &&
				startTarget.closest(
					'[data-gantt-chart-part="task"], [data-gantt-chart-part="summary-task"], [data-gantt-chart-part="milestone"], [data-gantt-chart-part="connector-control"], [data-gantt-chart-part="resize-handle"], [data-gantt-chart-part="progress-handle"]'
				))
		) {
			return false;
		}
		const pointer = toPointerCoordinates(payload);
		const canvasBounds = payload.node.getBoundingClientRect();
		const rowTop =
			Math.max(0, Math.floor((pointer.clientY - canvasBounds.top) / timeline.rowHeight)) *
			timeline.rowHeight;
		this.#gesture = {
			type: 'range',
			calendar: getCalendarRuntime(this.#getSchedule().model.projectCalendar),
			scale: timeline.scale,
			boundary: this.getBoundary(),
			originInstant: this.getPointerInstant(pointer, timeline.scale, timeline.viewport),
			rowTop,
			pointer,
			pointerCanvasX: this.getPointerCanvasX(pointer, timeline.viewport),
			proposal: null,
			isValid: false,
			invalidReason: 'invalid-target',
			invalidMessage: 'The range has no valid proposal.',
			workingDurationMinutes: 0
		};
		this.updatePointerGesture(pointer);
		this.startPointerAutoScroll();
		return true;
	}

	private finishPointerGesture(payload: PointerDragPayload): void {
		this.flushPointerUpdate(toPointerCoordinates(payload));
		if (this.#gesture?.type === 'range') this.commitRangeGesture();
		else this.commitTaskGesture();
	}

	private queuePointerUpdate(pointer: PointerCoordinates | PointerDragPayload): void {
		this.#pendingPointer = isPointerDragPayload(pointer) ? toPointerCoordinates(pointer) : pointer;
		if (this.#pointerFrame !== null) return;
		this.#pointerFrame = requestAnimationFrame(() => {
			this.#pointerFrame = null;
			const pending = this.#pendingPointer;
			this.#pendingPointer = null;
			if (pending) this.updatePointerGesture(pending);
		});
	}

	private flushPointerUpdate(pointer: PointerCoordinates): void {
		if (this.#pointerFrame !== null) cancelAnimationFrame(this.#pointerFrame);
		this.#pointerFrame = null;
		this.#pendingPointer = null;
		this.updatePointerGesture(pointer);
	}

	private updatePointerGesture(pointer: PointerCoordinates): void {
		const gesture = this.#gesture;
		const timeline = this.#timeline;
		if (!gesture || !timeline) return;
		if (!this.isBoundaryCurrent(gesture.boundary)) {
			this.reconcileControlledState();
			return;
		}
		if (!isSameInteractionScale(gesture.scale, timeline.scale)) {
			this.reconcileScale(timeline.scale);
			return;
		}
		const bounds = timeline.viewport.getBoundingClientRect();
		const isInside =
			pointer.clientX >= bounds.left &&
			pointer.clientX <= bounds.right &&
			pointer.clientY >= bounds.top &&
			pointer.clientY <= bounds.bottom;
		const pointerCanvasX = this.getPointerCanvasX(pointer, timeline.viewport);
		if (!isInside) {
			this.#gesture = {
				...gesture,
				pointer,
				pointerCanvasX,
				isValid: false,
				invalidReason: 'invalid-target',
				invalidMessage: 'The pointer is outside the timeline viewport.'
			};
			return;
		}
		const pointerInstant = this.getPointerInstant(pointer, gesture.scale, timeline.viewport);
		if (gesture.type === 'range') {
			this.updateRangeProposal(gesture, pointer, pointerCanvasX, pointerInstant);
			return;
		}
		this.updateTaskProposal(gesture, pointer, pointerCanvasX, pointerInstant);
	}

	private updateTaskProposal(
		gesture: TaskGesture<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
		pointer: PointerCoordinates,
		pointerCanvasX: number,
		pointerInstant: Date
	): void {
		let change: GanttDerivedTaskChange<TTaskFields>;
		try {
			change =
				gesture.initialOperation === 'progress'
					? deriveGanttProgressChange({
							task: gesture.task,
							pointerInstant,
							calendar: gesture.calendar
						})
					: deriveGanttTaskPointerChange({
							task: gesture.task,
							operation: gesture.initialOperation,
							originInstant: gesture.originInstant,
							pointerInstant,
							calendar: gesture.calendar,
							snapDuration: this.#options.snapDuration
						});
			validateGanttTaskChange(change.task, this.#options.validRange);
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			this.#gesture = {
				...gesture,
				pointer,
				pointerCanvasX,
				proposal: null,
				isValid: false,
				invalidReason: getBlockedReason(error),
				invalidMessage: error.message,
				workingDurationMinutes: 0
			};
			return;
		}
		const proposal: GanttTaskProposal<TTaskFields> = {
			kind: change.kind,
			source: 'pointer',
			previousTask: gesture.task,
			task: change.task,
			propagatedTasks: []
		};
		const invalidReason =
			this.#options.canUpdateTask?.(proposal) === false ? 'custom-policy' : null;
		this.#gesture = {
			...gesture,
			operation: change.kind,
			pointer,
			pointerCanvasX,
			proposal,
			isValid: invalidReason === null,
			invalidReason,
			invalidMessage:
				invalidReason === null ? null : 'The consumer task policy rejected this proposal.',
			workingDurationMinutes: change.workingDurationMinutes
		};
	}

	private updateRangeProposal(
		gesture: RangeGesture<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
		pointer: PointerCoordinates,
		pointerCanvasX: number,
		pointerInstant: Date
	): void {
		let change: ReturnType<typeof deriveGanttRangeProposal>;
		try {
			change = deriveGanttRangeProposal({
				originInstant: gesture.originInstant,
				pointerInstant,
				calendar: gesture.calendar,
				snapDuration: this.#options.snapDuration
			});
			validateGanttRangeProposal(change.proposal, this.#options.validRange);
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			this.#gesture = {
				...gesture,
				pointer,
				pointerCanvasX,
				proposal: null,
				isValid: false,
				invalidReason: getBlockedReason(error),
				invalidMessage: error.message,
				workingDurationMinutes: 0
			};
			return;
		}
		const invalidReason =
			this.#options.canCreateRange?.(change.proposal) === false ? 'custom-policy' : null;
		this.#gesture = {
			...gesture,
			pointer,
			pointerCanvasX,
			proposal: change.proposal,
			isValid: invalidReason === null,
			invalidReason,
			invalidMessage:
				invalidReason === null ? null : 'The consumer range policy rejected this proposal.',
			workingDurationMinutes: change.workingDurationMinutes
		};
	}

	private commitTaskGesture(): void {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'task') return;
		if (!gesture.proposal || !gesture.isValid) {
			this.reportGestureBlocked(gesture);
			this.cancel();
			return;
		}
		const proposal = gesture.proposal;
		if (!isTaskChangeProposal(proposal)) {
			throw new GanttChartError(
				'invalid-operation',
				'Pointer interaction produced a non-update task proposal.'
			);
		}
		if (isNoopTaskProposal(proposal)) {
			this.cancel();
			return;
		}
		try {
			const accepted = this.#mutations.updateTaskWithKind(
				proposal.task,
				proposal.kind,
				'pointer',
				gesture.boundary.tasks
			);
			if (!accepted) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: 'pointer',
					taskId: gesture.task.id,
					message: 'The consumer task policy rejected this proposal.'
				});
			}
		} catch (error) {
			if (!(error instanceof GanttChartError) || error.code !== 'stale-transaction') throw error;
			this.reportBlocked({
				reason: 'stale',
				source: 'pointer',
				taskId: gesture.task.id,
				message: error.message
			});
		} finally {
			this.cancel();
		}
	}

	private commitRangeGesture(): void {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'range') return;
		if (!gesture.proposal || !gesture.isValid) {
			this.reportGestureBlocked(gesture);
			this.cancel();
			return;
		}
		try {
			if (this.#options.canCreateRange?.(gesture.proposal) === false) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: 'pointer',
					message: 'The consumer range policy rejected this proposal.'
				});
				return;
			}
			this.#options.onEmptyRangeSelect?.(gesture.proposal);
		} finally {
			this.cancel();
		}
	}

	private canBeginTaskGesture(taskId: string, operation: GanttTaskPointerOperation): boolean {
		if (this.#options.disabled || this.#options.loading || this.#gesture) return false;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		if (!task || task.readOnly || !task.start || !task.end) return false;
		if (operation === 'move') {
			return this.#options.interactions.moveTask && task.draggable !== false;
		}
		if (task.type === 'milestone' || task.resizable === false) return false;
		return operation === 'resize-start'
			? this.#options.interactions.resizeStart
			: this.#options.interactions.resizeEnd;
	}

	private canBeginProgressGesture(taskId: string): boolean {
		if (this.#options.disabled || this.#options.loading || this.#gesture) return false;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		return Boolean(
			task &&
			task.type !== 'summary' &&
			task.type !== 'milestone' &&
			task.start &&
			task.end &&
			!task.readOnly &&
			task.progressEditable !== false &&
			this.#options.interactions.resizeProgress
		);
	}

	private getBoundary(): GestureBoundary<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> {
		return {
			tasks: this.#options.tasks,
			dependencies: this.#options.dependencies,
			resources: this.#options.resources,
			assignments: this.#options.assignments,
			calendars: this.#options.calendars
		};
	}

	private isBoundaryCurrent(
		boundary: GestureBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	): boolean {
		return (
			boundary.tasks === this.#options.tasks &&
			boundary.dependencies === this.#options.dependencies &&
			boundary.resources === this.#options.resources &&
			boundary.assignments === this.#options.assignments &&
			boundary.calendars === this.#options.calendars
		);
	}

	private getPointerInstant(
		pointer: PointerCoordinates,
		scale: GanttTimeScale,
		viewport: HTMLElement
	): Date {
		return getGanttScaleInstantAtPixel(scale, this.getPointerCanvasX(pointer, viewport));
	}

	private getPointerCanvasX(pointer: PointerCoordinates, viewport: HTMLElement): number {
		const bounds = viewport.getBoundingClientRect();
		return Math.max(
			0,
			Math.min(viewport.scrollWidth, pointer.clientX - bounds.left + viewport.scrollLeft)
		);
	}

	private startPointerAutoScroll(): void {
		if (this.#pointerAutoScrollFrame !== null) return;
		const step = () => {
			this.#pointerAutoScrollFrame = null;
			const gesture = this.#gesture;
			const timeline = this.#timeline;
			if (
				!gesture ||
				(gesture.type === 'task' && gesture.initialOperation !== 'progress') ||
				!timeline
			) {
				return;
			}
			const bounds = timeline.viewport.getBoundingClientRect();
			const startDistance = gesture.pointer.clientX - bounds.left;
			const endDistance = bounds.right - gesture.pointer.clientX;
			const delta =
				startDistance < POINTER_EDGE_SIZE
					? -getPointerScrollDelta(startDistance)
					: endDistance < POINTER_EDGE_SIZE
						? getPointerScrollDelta(endDistance)
						: 0;
			if (delta !== 0) {
				const previous = timeline.viewport.scrollLeft;
				timeline.viewport.scrollLeft += delta;
				if (timeline.viewport.scrollLeft !== previous) this.updatePointerGesture(gesture.pointer);
			}
			this.#pointerAutoScrollFrame = requestAnimationFrame(step);
		};
		this.#pointerAutoScrollFrame = requestAnimationFrame(step);
	}

	private cancelPointerFrames(): void {
		if (this.#pointerFrame !== null) cancelAnimationFrame(this.#pointerFrame);
		if (this.#pointerAutoScrollFrame !== null) cancelAnimationFrame(this.#pointerAutoScrollFrame);
		this.#pointerFrame = null;
		this.#pointerAutoScrollFrame = null;
		this.#pendingPointer = null;
	}

	private reportGestureBlocked(
		gesture: Gesture<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	): void {
		this.reportBlocked({
			reason: gesture.invalidReason ?? 'invalid-target',
			source: 'pointer',
			...(gesture.type === 'task' ? { taskId: gesture.task.id } : {}),
			message: gesture.invalidMessage ?? 'The interaction proposal is invalid.'
		});
	}

	private reportBlocked(info: GanttInteractionBlockedInfo): void {
		this.#options.onInteractionBlocked?.(info);
	}

	private readTaskDragSource(data: Record<string, unknown>): GanttTaskDragSource | null {
		if (
			data.mark !== SOURCE_MARK ||
			data.instanceId !== this.#instanceId ||
			typeof data.taskId !== 'string' ||
			(data.operation !== 'move' &&
				data.operation !== 'resize-start' &&
				data.operation !== 'resize-end') ||
			typeof data.rowTop !== 'number' ||
			!Number.isFinite(data.rowTop)
		) {
			return null;
		}
		return { taskId: data.taskId, operation: data.operation, rowTop: data.rowTop };
	}
}

function toPointerCoordinates(payload: PointerDragPayload): PointerCoordinates {
	return { clientX: payload.x, clientY: payload.y };
}

function isPointerDragPayload(
	pointer: PointerCoordinates | PointerDragPayload
): pointer is PointerDragPayload {
	return 'x' in pointer && 'y' in pointer;
}

function getBlockedReason(error: GanttChartError): GanttInteractionBlockedInfo['reason'] {
	if (error.code === 'invalid-range') return 'valid-range';
	if (error.code === 'read-only') return 'read-only';
	if (error.code === 'invalid-constraint') return 'constraint';
	if (
		error.code === 'missing-calendar' ||
		error.code === 'invalid-calendar' ||
		error.code === 'schedule-conflict'
	) {
		return 'calendar';
	}
	return 'invalid-target';
}

type GanttUpdateTaskProposal<TTaskFields extends object> = GanttTaskProposal<TTaskFields> &
	Readonly<{
		kind: Exclude<GanttTaskMutationKind, 'add' | 'remove' | 'paste'>;
		previousTask: GanttTask<TTaskFields>;
		task: GanttTask<TTaskFields>;
	}>;

function isTaskChangeProposal<TTaskFields extends object>(
	proposal: GanttTaskProposal<TTaskFields>
): proposal is GanttUpdateTaskProposal<TTaskFields> {
	return (
		proposal.kind !== 'add' &&
		proposal.kind !== 'remove' &&
		proposal.kind !== 'paste' &&
		proposal.previousTask !== null &&
		proposal.task !== null
	);
}

function isNoopTaskProposal<TTaskFields extends object>(
	proposal: GanttTaskProposal<TTaskFields>
): boolean {
	if (!proposal.previousTask || !proposal.task) return false;
	const previous = proposal.previousTask;
	const task = proposal.task;
	if (proposal.kind === 'progress') return previous.progress === task.progress;
	if (!previous.start || !previous.end || !task.start || !task.end) return false;
	return (
		previous.start.getTime() === task.start.getTime() &&
		previous.end.getTime() === task.end.getTime() &&
		segmentsEqual(previous.segments, task.segments)
	);
}

function segmentsEqual(
	left: readonly { start: Date; end: Date }[] | undefined,
	right: readonly { start: Date; end: Date }[] | undefined
): boolean {
	if (left === right) return true;
	if (!left || !right || left.length !== right.length) return false;
	return left.every(
		(segment, index) =>
			segment.start.getTime() === right[index].start.getTime() &&
			segment.end.getTime() === right[index].end.getTime()
	);
}

function getPointerScrollDelta(distance: number): number {
	const ratio = Math.max(0, Math.min(1, (POINTER_EDGE_SIZE - distance) / POINTER_EDGE_SIZE));
	return Math.max(1, Math.round(POINTER_MAX_SCROLL * ratio));
}

function isSameInteractionScale(left: GanttTimeScale, right: GanttTimeScale): boolean {
	return (
		left.zoom === right.zoom &&
		left.timeZone === right.timeZone &&
		left.direction === right.direction &&
		left.definition.id === right.definition.id &&
		left.definition.unit === right.definition.unit &&
		left.definition.step === right.definition.step &&
		left.definition.minColumnWidth === right.definition.minColumnWidth &&
		left.canvasRange.start.getTime() === right.canvasRange.start.getTime() &&
		left.canvasRange.end.getTime() === right.canvasRange.end.getTime() &&
		left.pixelsPerMillisecond === right.pixelsPerMillisecond &&
		left.totalWidth === right.totalWidth
	);
}
