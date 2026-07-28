import {
	autoScrollForElements,
	autoScrollWindowForElements,
	disableNativeDragPreview,
	draggable,
	dropTargetForElements,
	type ElementEventPayloadMap
} from '$lib/utils/pragmaticDragAndDrop.js';
import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import {
	getCalendarRuntime,
	getTaskCalendar,
	type GanttCalendarRuntime
} from './ganttChart.calendar.js';
import {
	GanttDependencyInteraction,
	type GanttDependencyInteractionStatus,
	type GanttTimelineInteractionContext
} from './ganttChart.dependencyInteraction.svelte.js';
import { GanttChartError } from './ganttChart.error.js';
import type { GanttChartMutations } from './ganttChart.mutations.js';
import {
	getGanttScaleInstantAtPixel,
	getGanttScalePixel,
	type GanttTimeScale
} from './ganttChart.scale.js';
import type { GanttChartStateOptions } from './ganttChart.state.svelte.js';
import {
	deriveGanttProgressChange,
	deriveGanttRangeKeyboardProposal,
	deriveGanttRangeProposal,
	deriveGanttTaskKeyboardChange,
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
	inputMode: 'pointer' | 'keyboard';
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
	keyboardStepCount: number;
};

type RangeGesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = {
	type: 'range';
	inputMode: 'pointer' | 'keyboard';
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
	keyboardStepCount: number;
	parentId: string | undefined;
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
			source: 'pointer' | 'keyboard';
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
			source: 'pointer' | 'keyboard';
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
	readonly dependency: GanttDependencyInteraction<
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
		this.dependency = new GanttDependencyInteraction(
			options,
			mutations,
			getSchedule,
			() => this.#gesture === null
		);
	}

	get status(): GanttChartInteractionStatus<TTaskFields> | null {
		const gesture = this.#gesture;
		if (!gesture) return null;
		if (gesture.type === 'range') {
			return {
				type: 'range',
				source: gesture.inputMode,
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
			source: gesture.inputMode,
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
		return this.#gesture !== null || this.dependency.isActive;
	}

	get isInvalid(): boolean {
		return (this.#gesture !== null && !this.#gesture.isValid) || this.dependency.isInvalid;
	}

	get dependencyStatus(): GanttDependencyInteractionStatus | null {
		return this.dependency.status;
	}

	isTaskActive(taskId: string): boolean {
		return this.#gesture?.type === 'task' && this.#gesture.task.id === taskId;
	}

	connectTimeline(context: GanttTimelineInteractionContext): () => void {
		this.#timeline = context;
		const dependencyCleanup = this.dependency.connectTimeline(context);
		const dropTargetCleanup = dropTargetForElements({
			element: context.viewport,
			canDrop: ({ source }) =>
				this.readTaskDragSource(source.data) !== null && this.#gesture?.isValid === true,
			getDropEffect: () => 'move'
		});
		const horizontalAutoScrollCleanup = autoScrollForElements({
			element: context.viewport,
			canScroll: ({ source }) =>
				this.readTaskDragSource(source.data) !== null || this.dependency.isDragSource(source.data),
			getAllowedAxis: () => 'horizontal'
		});
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || !this.isActive) return;
			event.preventDefault();
			this.cancel();
		};
		window.addEventListener('keydown', handleKeyDown, true);
		const handleDragEnd = (event: DragEvent) => {
			if (event.dataTransfer?.dropEffect === 'none') this.#didNativeCancel = true;
		};
		window.addEventListener('dragend', handleDragEnd, true);
		return () => {
			dependencyCleanup();
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
				canScroll: ({ source }) =>
					this.readTaskDragSource(source.data) !== null ||
					this.dependency.isDragSource(source.data),
				getAllowedAxis: () => 'vertical'
			});
		}
		return autoScrollForElements({
			element,
			canScroll: ({ source }) =>
				this.readTaskDragSource(source.data) !== null || this.dependency.isDragSource(source.data),
			getAllowedAxis: () => 'vertical'
		});
	}

	beginKeyboardTask(taskId: string, operation: GanttTaskPointerOperation | 'progress'): boolean {
		const timeline = this.#timeline;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		const canBegin =
			operation === 'progress'
				? this.canBeginProgressGesture(taskId)
				: this.canBeginTaskGesture(taskId, operation);
		if (!timeline || !task || !canBegin || !task.start || !task.end) return false;
		const calendar = getTaskCalendar(this.#getSchedule().model, task);
		const originInstant = operation === 'resize-end' ? task.end : task.start;
		const pointerCanvasX = getGanttScalePixel(timeline.scale, originInstant);
		this.#gesture = {
			type: 'task',
			inputMode: 'keyboard',
			initialOperation: operation,
			operation,
			task,
			calendar,
			scale: timeline.scale,
			boundary: this.getBoundary(),
			originInstant,
			rowTop: this.#taskRowTops.get(taskId) ?? 0,
			pointer: { clientX: 0, clientY: 0 },
			pointerCanvasX,
			proposal: null,
			isValid: false,
			invalidReason: 'invalid-target',
			invalidMessage: 'Use an arrow key to create a keyboard task proposal.',
			workingDurationMinutes: 0,
			keyboardStepCount: 0
		};
		return true;
	}

	adjustKeyboardTask(stepDelta: -1 | 1): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'task' || gesture.inputMode !== 'keyboard') return false;
		if (!this.isBoundaryCurrent(gesture.boundary)) {
			this.reconcileControlledState();
			return false;
		}
		const keyboardStepCount = gesture.keyboardStepCount + stepDelta;
		try {
			const change = deriveGanttTaskKeyboardChange({
				task: gesture.task,
				operation: gesture.initialOperation,
				stepCount: keyboardStepCount,
				calendar: gesture.calendar,
				snapDuration: this.#options.snapDuration
			});
			validateGanttTaskChange(change.task, this.#options.validRange);
			const proposal: GanttTaskProposal<TTaskFields> = {
				kind: change.kind,
				source: 'keyboard',
				previousTask: gesture.task,
				task: change.task,
				propagatedTasks: []
			};
			const isValid = this.#options.canUpdateTask?.(proposal) !== false;
			this.#gesture = {
				...gesture,
				operation: change.kind,
				proposal,
				pointerCanvasX: getKeyboardTaskPointerX(change.task, change.kind, gesture.scale),
				isValid,
				invalidReason: isValid ? null : 'custom-policy',
				invalidMessage: isValid ? null : 'The consumer task policy rejected this proposal.',
				workingDurationMinutes: change.workingDurationMinutes,
				keyboardStepCount
			};
			return isValid;
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			this.#gesture = {
				...gesture,
				proposal: null,
				isValid: false,
				invalidReason: getBlockedReason(error),
				invalidMessage: error.message,
				keyboardStepCount
			};
			return false;
		}
	}

	commitKeyboardTask(): boolean {
		if (this.#gesture?.type !== 'task' || this.#gesture.inputMode !== 'keyboard') return false;
		return this.commitTaskGesture();
	}

	beginKeyboardRange(anchor: Date, rowTop: number, parentId?: string): boolean {
		const timeline = this.#timeline;
		if (
			!timeline ||
			this.#options.disabled ||
			this.#options.loading ||
			this.isActive ||
			!this.#options.interactions.createRange
		) {
			return false;
		}
		this.#gesture = {
			type: 'range',
			inputMode: 'keyboard',
			calendar: getCalendarRuntime(this.#getSchedule().model.projectCalendar),
			scale: timeline.scale,
			boundary: this.getBoundary(),
			originInstant: new Date(anchor),
			rowTop,
			pointer: { clientX: 0, clientY: 0 },
			pointerCanvasX: getGanttScalePixel(timeline.scale, anchor),
			proposal: null,
			isValid: false,
			invalidReason: 'invalid-target',
			invalidMessage: 'Use an arrow key to create a keyboard range proposal.',
			workingDurationMinutes: 0,
			keyboardStepCount: 0,
			parentId
		};
		this.adjustKeyboardRange(1);
		return true;
	}

	adjustKeyboardRange(stepDelta: -1 | 1): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'range' || gesture.inputMode !== 'keyboard') return false;
		const keyboardStepCount = gesture.keyboardStepCount + stepDelta;
		const resolvedStepCount = keyboardStepCount === 0 ? stepDelta : keyboardStepCount;
		try {
			const change = deriveGanttRangeKeyboardProposal({
				originInstant: gesture.originInstant,
				stepCount: resolvedStepCount,
				calendar: gesture.calendar,
				snapDuration: this.#options.snapDuration,
				...(gesture.parentId ? { parentId: gesture.parentId } : {})
			});
			validateGanttRangeProposal(change.proposal, this.#options.validRange);
			const isValid = this.#options.canCreateRange?.(change.proposal) !== false;
			this.#gesture = {
				...gesture,
				proposal: change.proposal,
				pointerCanvasX: getGanttScalePixel(
					gesture.scale,
					resolvedStepCount > 0 ? change.proposal.end : change.proposal.start
				),
				isValid,
				invalidReason: isValid ? null : 'custom-policy',
				invalidMessage: isValid ? null : 'The consumer range policy rejected this proposal.',
				workingDurationMinutes: change.workingDurationMinutes,
				keyboardStepCount: resolvedStepCount
			};
			return isValid;
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			this.#gesture = {
				...gesture,
				proposal: null,
				isValid: false,
				invalidReason: getBlockedReason(error),
				invalidMessage: error.message,
				keyboardStepCount: resolvedStepCount
			};
			return false;
		}
	}

	commitKeyboardRange(): boolean {
		if (this.#gesture?.type !== 'range' || this.#gesture.inputMode !== 'keyboard') return false;
		return this.commitRangeGesture();
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
				const touchDrag = createPointerDrag({
					canStart: (event) =>
						event.pointerType === 'touch' &&
						this.#options.interactions.touch &&
						(operation !== 'move' || isTaskBodyPointerTarget(event.target)),
					disabled: () => !this.canBeginTaskGesture(taskId, operation),
					activation: () => this.#options.touchActivation,
					stopPropagation: true,
					onStart: (payload) =>
						this.beginTaskPointerGesture(
							taskId,
							operation,
							this.#taskRowTops.get(taskId) ?? rowTop,
							payload
						),
					onMove: (payload) => this.queuePointerUpdate(payload),
					onEnd: (payload) => this.finishPointerGesture(payload),
					onCancel: () => this.cancel()
				});
				const touchCleanup = touchDrag(element);
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
					touchCleanup?.();
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
			canStart: (event) => event.pointerType !== 'touch' || this.#options.interactions.touch,
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
			canStart: (event) => event.pointerType !== 'touch' || this.#options.interactions.touch,
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
		this.dependency.reconcileControlledState();
		if (!this.#gesture || this.isBoundaryCurrent(this.#gesture.boundary)) return;
		this.reportBlocked({
			reason: 'stale',
			source: this.#gesture.inputMode,
			...(this.#gesture.type === 'task' ? { taskId: this.#gesture.task.id } : {}),
			message: 'The controlled Gantt collections changed during the interaction.'
		});
		this.cancel();
	}

	reconcileScale(scale: GanttTimeScale): void {
		this.dependency.reconcileScale(scale);
		if (!this.#gesture || isSameInteractionScale(this.#gesture.scale, scale)) return;
		this.reportBlocked({
			reason: 'stale',
			source: this.#gesture.inputMode,
			...(this.#gesture.type === 'task' ? { taskId: this.#gesture.task.id } : {}),
			message: 'The timeline scale changed during the interaction.'
		});
		this.cancel();
	}

	cancel(): boolean {
		const didCancelDependency = this.dependency.cancel();
		if (!this.#gesture) return didCancelDependency;
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
			inputMode: 'pointer',
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
			workingDurationMinutes: 0,
			keyboardStepCount: 0
		};
		this.updatePointerGesture(pointer);
	}

	private beginTaskPointerGesture(
		taskId: string,
		operation: GanttTaskPointerOperation,
		rowTop: number,
		payload: PointerDragPayload
	): boolean {
		const timeline = this.#timeline;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		if (!timeline || !task || !this.canBeginTaskGesture(taskId, operation)) return false;
		const pointer = { clientX: payload.x, clientY: payload.y };
		this.#gesture = {
			type: 'task',
			inputMode: 'pointer',
			initialOperation: operation,
			operation,
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
			invalidMessage: 'The task has no valid pointer proposal.',
			workingDurationMinutes: 0,
			keyboardStepCount: 0
		};
		this.updatePointerGesture(pointer);
		return true;
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
			inputMode: 'pointer',
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
			workingDurationMinutes: 0,
			keyboardStepCount: 0
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
					'[data-gantt-chart-part="task"], [data-gantt-chart-part="summary-task"], [data-gantt-chart-part="milestone"], [data-gantt-chart-part="connector-control"], [data-gantt-chart-part="resize-handle"], [data-gantt-chart-part="progress-handle"], [data-gantt-chart-part="dependency-handle"]'
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
			inputMode: 'pointer',
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
			workingDurationMinutes: 0,
			keyboardStepCount: 0,
			parentId: undefined
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
			source: gesture.inputMode,
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
				snapDuration: this.#options.snapDuration,
				source: gesture.inputMode,
				...(gesture.parentId ? { parentId: gesture.parentId } : {})
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

	private commitTaskGesture(): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'task') return false;
		if (!gesture.proposal || !gesture.isValid) {
			this.reportGestureBlocked(gesture);
			this.cancel();
			return false;
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
			return true;
		}
		let didCommit = false;
		try {
			const accepted = this.#mutations.updateTaskWithKind(
				proposal.task,
				proposal.kind,
				gesture.inputMode,
				gesture.boundary.tasks
			);
			if (!accepted) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: gesture.inputMode,
					taskId: gesture.task.id,
					message: 'The consumer task policy rejected this proposal.'
				});
			} else didCommit = true;
		} catch (error) {
			if (!(error instanceof GanttChartError) || error.code !== 'stale-transaction') throw error;
			this.reportBlocked({
				reason: 'stale',
				source: gesture.inputMode,
				taskId: gesture.task.id,
				message: error.message
			});
		} finally {
			this.cancel();
		}
		return didCommit;
	}

	private commitRangeGesture(): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.type !== 'range') return false;
		if (!gesture.proposal || !gesture.isValid) {
			this.reportGestureBlocked(gesture);
			this.cancel();
			return false;
		}
		try {
			if (this.#options.canCreateRange?.(gesture.proposal) === false) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: gesture.inputMode,
					message: 'The consumer range policy rejected this proposal.'
				});
				return false;
			}
			this.#options.onEmptyRangeSelect?.(gesture.proposal);
			return true;
		} finally {
			this.cancel();
		}
	}

	private canBeginTaskGesture(taskId: string, operation: GanttTaskPointerOperation): boolean {
		if (this.#options.disabled || this.#options.loading || this.isActive) return false;
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
		if (this.#options.disabled || this.#options.loading || this.isActive) return false;
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
			source: gesture.inputMode,
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

function getKeyboardTaskPointerX<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	kind: GanttTaskMutationKind,
	scale: GanttTimeScale
): number {
	if (!task.start || !task.end) return 0;
	if (kind === 'progress') {
		const progressInstant = new Date(
			task.start.getTime() + (task.end.getTime() - task.start.getTime()) * (task.progress ?? 0)
		);
		return getGanttScalePixel(scale, progressInstant);
	}
	return getGanttScalePixel(scale, kind === 'resize-start' ? task.start : task.end);
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

function isTaskBodyPointerTarget(target: EventTarget | null): boolean {
	if (!(target instanceof Element)) return false;
	return !target.closest(
		'[data-gantt-chart-part="resize-handle"], [data-gantt-chart-part="progress-handle"], [data-gantt-chart-part="dependency-handle"]'
	);
}
