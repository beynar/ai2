import {
	disableNativeDragPreview,
	draggable,
	dropTargetForElements,
	type ElementEventPayloadMap
} from '$lib/utils/pragmaticDragAndDrop.js';
import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import {
	assertCreatedGanttDependency,
	getGanttDependencyType,
	validateGanttDependencyCreation
} from './ganttChart.dependencyCreation.js';
import { GanttChartError } from './ganttChart.error.js';
import type { GanttChartMutations } from './ganttChart.mutations.js';
import type { ResolvedGanttSchedule } from './ganttChart.schedule.js';
import { getGanttScalePixel, type GanttTimeScale } from './ganttChart.scale.js';
import type { GanttChartStateOptions } from './ganttChart.state.svelte.js';
import type {
	GanttDependencyCreationRequest,
	GanttDependencyEndpoint,
	GanttInteractionBlockedInfo,
	GanttTask
} from './ganttChart.types.js';

/* eslint-disable svelte/prefer-svelte-reactivity -- attachment and validation caches must not invalidate rendering */

const DEPENDENCY_SOURCE_MARK = 'svelai-gantt-chart-dependency-source';
const DEPENDENCY_TARGET_MARK = 'svelai-gantt-chart-dependency-target';
let nextDependencyInteractionId = 0;

type Point = Readonly<{ x: number; y: number }>;

export type GanttTimelineInteractionContext = Readonly<{
	scale: GanttTimeScale;
	viewport: HTMLElement;
	rowHeight: number;
}>;

type DependencyBoundary<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: GanttChartStateOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>['tasks'];
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

type DependencyGesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	inputMode: 'pointer' | 'keyboard';
	sourceTaskId: string;
	sourceEndpoint: GanttDependencyEndpoint;
	sourcePoint: Point;
	pointerPoint: Point;
	targetTaskId: string | null;
	targetEndpoint: GanttDependencyEndpoint | null;
	targetPoint: Point | null;
	request: GanttDependencyCreationRequest | null;
	isValid: boolean;
	invalidReason: GanttInteractionBlockedInfo['reason'] | null;
	invalidMessage: string | null;
	scale: GanttTimeScale;
	boundary: DependencyBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
}>;

export type GanttDependencyInteractionStatus = Readonly<{
	source: 'pointer' | 'keyboard';
	sourceTaskId: string;
	sourceEndpoint: GanttDependencyEndpoint;
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
	targetTaskId: string | null;
	targetEndpoint: GanttDependencyEndpoint | null;
	type: GanttDependencyCreationRequest['type'] | null;
	isValid: boolean;
	invalidReason: GanttInteractionBlockedInfo['reason'] | null;
}>;

type DependencySource = Readonly<{
	taskId: string;
	endpoint: GanttDependencyEndpoint;
}>;

type DependencyTarget = DependencySource;

type TargetValidation = Readonly<{
	request: GanttDependencyCreationRequest;
	isValid: boolean;
	invalidReason: GanttInteractionBlockedInfo['reason'] | null;
	invalidMessage: string | null;
}>;

export class GanttDependencyInteraction<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	readonly #instanceId = `gantt-chart-dependency-${++nextDependencyInteractionId}`;
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
	readonly #canStart: () => boolean;
	#gesture = $state.raw<DependencyGesture<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> | null>(null);
	#timeline: GanttTimelineInteractionContext | null = null;
	#handlePoints = new Map<string, Point>();
	#handleAttachments = new Map<string, Attachment<HTMLElement>>();
	#targetValidation = new Map<string, TargetValidation>();

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
		>,
		canStart: () => boolean
	) {
		this.#options = options;
		this.#mutations = mutations;
		this.#getSchedule = getSchedule;
		this.#canStart = canStart;
	}

	get status(): GanttDependencyInteractionStatus | null {
		const gesture = this.#gesture;
		if (!gesture) return null;
		const targetPoint = gesture.targetPoint ?? gesture.pointerPoint;
		return {
			source: gesture.inputMode,
			sourceTaskId: gesture.sourceTaskId,
			sourceEndpoint: gesture.sourceEndpoint,
			fromX: gesture.sourcePoint.x,
			fromY: gesture.sourcePoint.y,
			toX: targetPoint.x,
			toY: targetPoint.y,
			targetTaskId: gesture.targetTaskId,
			targetEndpoint: gesture.targetEndpoint,
			type: gesture.request?.type ?? null,
			isValid: gesture.isValid,
			invalidReason: gesture.invalidReason
		};
	}

	get isActive(): boolean {
		return this.#gesture !== null;
	}

	get isInvalid(): boolean {
		return this.#gesture?.targetTaskId !== null && this.#gesture?.isValid === false;
	}

	connectTimeline(context: GanttTimelineInteractionContext): () => void {
		this.#timeline = context;
		return () => {
			if (this.#timeline !== context) return;
			this.cancel();
			this.#timeline = null;
		};
	}

	dependencyHandle(
		taskId: string,
		endpoint: GanttDependencyEndpoint,
		point: Point
	): Attachment<HTMLElement> {
		const key = getHandleKey(taskId, endpoint);
		this.#handlePoints.set(key, point);
		const current = this.#handleAttachments.get(key);
		if (current) return current;
		const attachment: Attachment<HTMLElement> = (element) =>
			untrack(() => {
				const touchDrag = createPointerDrag({
					canStart: (event) => event.pointerType === 'touch' && this.#options.interactions.touch,
					disabled: () => !this.canBegin(taskId),
					activation: () => this.#options.touchActivation,
					stopPropagation: true,
					onStart: (payload) => this.beginTouch({ taskId, endpoint }, payload),
					onMove: (payload) => this.updateTouch({ taskId, endpoint }, payload),
					onEnd: (payload) => this.finishTouch({ taskId, endpoint }, payload),
					onCancel: () => this.cancel()
				});
				const touchCleanup = touchDrag(element);
				const draggableCleanup = draggable({
					element,
					canDrag: () => this.canBegin(taskId),
					getInitialData: () => ({
						mark: DEPENDENCY_SOURCE_MARK,
						instanceId: this.#instanceId,
						taskId,
						endpoint
					}),
					onGenerateDragPreview: ({ nativeSetDragImage }) => {
						disableNativeDragPreview({ nativeSetDragImage });
					},
					onDragStart: (payload) => this.begin(payload, element),
					onDrag: (payload) => this.update(payload),
					onDrop: (payload) => this.finish(payload)
				});
				const dropTargetCleanup = dropTargetForElements({
					element,
					canDrop: ({ source }) => {
						const dependencySource = this.readSource(source.data);
						return Boolean(
							dependencySource &&
							this.validateTarget(dependencySource, { taskId, endpoint }).isValid
						);
					},
					getData: () => ({
						mark: DEPENDENCY_TARGET_MARK,
						instanceId: this.#instanceId,
						taskId,
						endpoint
					}),
					getDropEffect: () => 'link'
				});
				return () => {
					touchCleanup?.();
					draggableCleanup();
					dropTargetCleanup();
					if (this.#handleAttachments.get(key) === attachment) {
						this.#handleAttachments.delete(key);
						this.#handlePoints.delete(key);
					}
					if (this.#gesture?.sourceTaskId === taskId && this.#gesture.sourceEndpoint === endpoint) {
						this.cancel();
					}
				};
			});
		this.#handleAttachments.set(key, attachment);
		return attachment;
	}

	canCreateForTask(taskId: string): boolean {
		if (!this.#options.createDependency || !this.#options.interactions.createDependency)
			return false;
		const task = this.#options.tasks.find((candidate) => candidate.id === taskId);
		return isDependencyEditableTask(task);
	}

	isTarget(taskId: string, endpoint: GanttDependencyEndpoint): boolean {
		return this.#gesture?.targetTaskId === taskId && this.#gesture.targetEndpoint === endpoint;
	}

	isValidTarget(taskId: string, endpoint: GanttDependencyEndpoint): boolean {
		return this.isTarget(taskId, endpoint) && this.#gesture?.isValid === true;
	}

	isDragSource(data: Record<string, unknown>): boolean {
		return this.readSource(data) !== null;
	}

	beginKeyboard(
		taskId: string,
		sourceEndpoint: GanttDependencyEndpoint,
		orderedTaskIds: readonly string[]
	): boolean {
		const timeline = this.#timeline;
		if (!timeline || !this.canBegin(taskId)) return false;
		const sourcePoint = this.getKeyboardPoint(taskId, sourceEndpoint, orderedTaskIds);
		if (!sourcePoint) return false;
		this.#targetValidation.clear();
		this.#gesture = {
			inputMode: 'keyboard',
			sourceTaskId: taskId,
			sourceEndpoint,
			sourcePoint,
			pointerPoint: sourcePoint,
			targetTaskId: null,
			targetEndpoint: null,
			targetPoint: null,
			request: null,
			isValid: false,
			invalidReason: null,
			invalidMessage: null,
			scale: timeline.scale,
			boundary: this.getBoundary()
		};
		return this.moveKeyboardTarget(1, orderedTaskIds);
	}

	moveKeyboardTarget(step: -1 | 1, orderedTaskIds: readonly string[]): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.inputMode !== 'keyboard') return false;
		const currentTaskId = gesture.targetTaskId ?? gesture.sourceTaskId;
		let index = orderedTaskIds.indexOf(currentTaskId);
		if (index < 0) index = orderedTaskIds.indexOf(gesture.sourceTaskId);
		for (let candidateIndex = index + step; ; candidateIndex += step) {
			const taskId = orderedTaskIds[candidateIndex];
			if (!taskId) return false;
			if (taskId === gesture.sourceTaskId) continue;
			const endpoint = gesture.targetEndpoint ?? 'start';
			const point = this.getKeyboardPoint(taskId, endpoint, orderedTaskIds);
			if (!point) continue;
			return this.setKeyboardTarget(taskId, endpoint, point);
		}
	}

	setKeyboardTargetEndpoint(
		endpoint: GanttDependencyEndpoint,
		orderedTaskIds: readonly string[]
	): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.inputMode !== 'keyboard' || !gesture.targetTaskId) return false;
		const point = this.getKeyboardPoint(gesture.targetTaskId, endpoint, orderedTaskIds);
		if (!point) return false;
		return this.setKeyboardTarget(gesture.targetTaskId, endpoint, point);
	}

	commitKeyboard(): boolean {
		if (this.#gesture?.inputMode !== 'keyboard') return false;
		return this.commitGesture();
	}

	reconcileControlledState(): void {
		if (!this.#gesture || this.isBoundaryCurrent(this.#gesture.boundary)) return;
		this.reportBlocked({
			reason: 'stale',
			source: this.#gesture.inputMode,
			taskId: this.#gesture.sourceTaskId,
			message: 'The controlled Gantt collections changed during dependency creation.'
		});
		this.cancel();
	}

	reconcileScale(scale: GanttTimeScale): void {
		if (!this.#gesture || isSameScale(this.#gesture.scale, scale)) return;
		this.reportBlocked({
			reason: 'stale',
			source: this.#gesture.inputMode,
			taskId: this.#gesture.sourceTaskId,
			message: 'The timeline scale changed during dependency creation.'
		});
		this.cancel();
	}

	cancel(): boolean {
		if (!this.#gesture) return false;
		this.#gesture = null;
		this.#targetValidation.clear();
		return true;
	}

	private canBegin(taskId: string): boolean {
		return (
			!this.#options.disabled &&
			!this.#options.loading &&
			!this.#gesture &&
			this.#canStart() &&
			this.canCreateForTask(taskId)
		);
	}

	private begin(payload: ElementEventPayloadMap['onDragStart'], element: HTMLElement): void {
		const source = this.readSource(payload.source.data);
		const timeline = this.#timeline;
		if (!source || !timeline || !this.canBegin(source.taskId)) return;
		const sourcePoint = this.#handlePoints.get(getHandleKey(source.taskId, source.endpoint));
		if (!sourcePoint || !element.isConnected) return;
		this.#targetValidation.clear();
		this.#gesture = {
			inputMode: 'pointer',
			sourceTaskId: source.taskId,
			sourceEndpoint: source.endpoint,
			sourcePoint,
			pointerPoint: this.getPointerPoint(payload.location.current.input),
			targetTaskId: null,
			targetEndpoint: null,
			targetPoint: null,
			request: null,
			isValid: false,
			invalidReason: null,
			invalidMessage: null,
			scale: timeline.scale,
			boundary: this.getBoundary()
		};
		this.update(payload);
	}

	private beginTouch(source: DependencySource, payload: PointerDragPayload): boolean {
		const timeline = this.#timeline;
		const sourcePoint = this.#handlePoints.get(getHandleKey(source.taskId, source.endpoint));
		if (!timeline || !sourcePoint || !this.canBegin(source.taskId)) return false;
		this.#targetValidation.clear();
		this.#gesture = {
			inputMode: 'pointer',
			sourceTaskId: source.taskId,
			sourceEndpoint: source.endpoint,
			sourcePoint,
			pointerPoint: this.getPointerPoint({ clientX: payload.x, clientY: payload.y }),
			targetTaskId: null,
			targetEndpoint: null,
			targetPoint: null,
			request: null,
			isValid: false,
			invalidReason: null,
			invalidMessage: null,
			scale: timeline.scale,
			boundary: this.getBoundary()
		};
		this.updateFromPointer(source, { clientX: payload.x, clientY: payload.y }, []);
		return true;
	}

	private update(
		payload: ElementEventPayloadMap['onDrag'] | ElementEventPayloadMap['onDrop']
	): void {
		const source = this.readSource(payload.source.data);
		if (!source) return;
		this.updateFromPointer(
			source,
			payload.location.current.input,
			payload.location.current.dropTargets
		);
	}

	private updateTouch(source: DependencySource, payload: PointerDragPayload): void {
		this.updateFromPointer(source, { clientX: payload.x, clientY: payload.y }, []);
	}

	private updateFromPointer(
		source: DependencySource,
		input: Readonly<{ clientX: number; clientY: number }>,
		dropTargets: readonly { data: Record<string, unknown> }[]
	): void {
		const gesture = this.#gesture;
		if (!gesture) return;
		if (!this.isBoundaryCurrent(gesture.boundary)) {
			this.reconcileControlledState();
			return;
		}
		const target = this.readPointerTarget(input) ?? this.readCurrentTarget(dropTargets);
		const pointerPoint = this.getPointerPoint(input);
		if (!target) {
			this.#gesture = {
				...gesture,
				pointerPoint,
				targetTaskId: null,
				targetEndpoint: null,
				targetPoint: null,
				request: null,
				isValid: false,
				invalidReason: null,
				invalidMessage: null
			};
			return;
		}
		const validation = this.validateTarget(source, target);
		this.#gesture = {
			...gesture,
			pointerPoint,
			targetTaskId: target.taskId,
			targetEndpoint: target.endpoint,
			targetPoint: this.#handlePoints.get(getHandleKey(target.taskId, target.endpoint)) ?? null,
			request: validation.request,
			isValid: validation.isValid,
			invalidReason: validation.invalidReason,
			invalidMessage: validation.invalidMessage
		};
	}

	private finish(payload: ElementEventPayloadMap['onDrop']): void {
		if (!this.#gesture) return;
		this.update(payload);
		this.commitGesture();
	}

	private finishTouch(source: DependencySource, payload: PointerDragPayload): void {
		if (!this.#gesture) return;
		this.updateTouch(source, payload);
		this.commitGesture();
	}

	private commitGesture(): boolean {
		const gesture = this.#gesture;
		if (!gesture) return false;
		if (!gesture.request || !gesture.isValid) {
			if (gesture.targetTaskId) {
				this.reportBlocked({
					reason: gesture.invalidReason ?? 'invalid-target',
					source: gesture.inputMode,
					taskId: gesture.sourceTaskId,
					message: gesture.invalidMessage ?? 'The dependency target is invalid.'
				});
			}
			this.cancel();
			return false;
		}
		const request = gesture.request;
		let didCommit = false;
		try {
			const createDependency = this.#options.createDependency;
			if (!createDependency) {
				throw new GanttChartError(
					'invalid-operation',
					'Dependency creation requires createDependency.'
				);
			}
			const dependency = createDependency(request);
			assertCreatedGanttDependency(request, dependency);
			const accepted = this.#mutations.addDependency(dependency, gesture.inputMode, true);
			if (!accepted) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: gesture.inputMode,
					dependencyId: dependency.id,
					message: 'The consumer dependency policy rejected this proposal.'
				});
			} else didCommit = true;
		} catch (error) {
			if (!isExpectedDependencyRejection(error)) throw error;
			this.reportBlocked({
				reason: getBlockedReason(error),
				source: gesture.inputMode,
				taskId: gesture.sourceTaskId,
				message: error.message
			});
		} finally {
			this.cancel();
		}
		return didCommit;
	}

	private setKeyboardTarget(
		taskId: string,
		endpoint: GanttDependencyEndpoint,
		point: Point
	): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.inputMode !== 'keyboard') return false;
		const source = { taskId: gesture.sourceTaskId, endpoint: gesture.sourceEndpoint };
		const validation = this.validateTarget(source, { taskId, endpoint });
		this.#gesture = {
			...gesture,
			pointerPoint: point,
			targetTaskId: taskId,
			targetEndpoint: endpoint,
			targetPoint: point,
			request: validation.request,
			isValid: validation.isValid,
			invalidReason: validation.invalidReason,
			invalidMessage: validation.invalidMessage
		};
		return true;
	}

	private getKeyboardPoint(
		taskId: string,
		endpoint: GanttDependencyEndpoint,
		orderedTaskIds: readonly string[]
	): Point | null {
		const gestureScale = this.#gesture?.scale ?? this.#timeline?.scale;
		const rowHeight = this.#timeline?.rowHeight;
		const rowIndex = orderedTaskIds.indexOf(taskId);
		const task = this.#getSchedule().resolvedTasks.find((node) => node.taskId === taskId);
		const instant = endpoint === 'start' ? task?.resolvedStart : task?.resolvedEnd;
		if (!gestureScale || !rowHeight || rowIndex < 0 || !instant) return null;
		return {
			x: getGanttScalePixel(gestureScale, instant),
			y: rowIndex * rowHeight + rowHeight / 2
		};
	}

	private validateTarget(source: DependencySource, target: DependencyTarget): TargetValidation {
		const cacheKey = `${source.taskId}:${source.endpoint}:${target.taskId}:${target.endpoint}`;
		const cached = this.#targetValidation.get(cacheKey);
		if (cached) return cached;
		const request: GanttDependencyCreationRequest = {
			fromTaskId: source.taskId,
			fromEndpoint: source.endpoint,
			toTaskId: target.taskId,
			toEndpoint: target.endpoint,
			type: getGanttDependencyType(source.endpoint, target.endpoint)
		};
		let validation: TargetValidation;
		try {
			const targetTask = this.#options.tasks.find((task) => task.id === target.taskId);
			if (!isDependencyEditableTask(targetTask)) {
				throw new GanttChartError('read-only', 'The target task does not allow dependencies.', {
					taskId: target.taskId
				});
			}
			validateGanttDependencyCreation(this.#getSchedule().model, request);
			validation = {
				request,
				isValid: true,
				invalidReason: null,
				invalidMessage: null
			};
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			validation = {
				request,
				isValid: false,
				invalidReason: getBlockedReason(error),
				invalidMessage: error.message
			};
		}
		this.#targetValidation.set(cacheKey, validation);
		return validation;
	}

	private readSource(data: Record<string, unknown>): DependencySource | null {
		if (
			data.mark !== DEPENDENCY_SOURCE_MARK ||
			data.instanceId !== this.#instanceId ||
			typeof data.taskId !== 'string' ||
			(data.endpoint !== 'start' && data.endpoint !== 'end')
		) {
			return null;
		}
		return { taskId: data.taskId, endpoint: data.endpoint };
	}

	private readCurrentTarget(
		dropTargets: readonly { data: Record<string, unknown> }[]
	): DependencyTarget | null {
		for (const dropTarget of dropTargets) {
			const data = dropTarget.data;
			if (
				data.mark === DEPENDENCY_TARGET_MARK &&
				data.instanceId === this.#instanceId &&
				typeof data.taskId === 'string' &&
				(data.endpoint === 'start' || data.endpoint === 'end')
			) {
				return { taskId: data.taskId, endpoint: data.endpoint };
			}
		}
		return null;
	}

	private readPointerTarget(
		input: Readonly<{ clientX: number; clientY: number }>
	): DependencyTarget | null {
		const element = document
			.elementFromPoint(input.clientX, input.clientY)
			?.closest<HTMLElement>('[data-gantt-chart-part="dependency-handle"]');
		const taskId = element?.dataset.taskId;
		const endpoint = element?.dataset.endpoint;
		if (!taskId || (endpoint !== 'start' && endpoint !== 'end')) return null;
		return { taskId, endpoint };
	}

	private getPointerPoint(input: Readonly<{ clientX: number; clientY: number }>): Point {
		const timeline = this.#timeline;
		if (!timeline) return { x: 0, y: 0 };
		const bounds = timeline.viewport.getBoundingClientRect();
		return {
			x: Math.max(
				0,
				Math.min(
					timeline.viewport.scrollWidth,
					input.clientX - bounds.left + timeline.viewport.scrollLeft
				)
			),
			y: Math.max(0, Math.min(bounds.height, input.clientY - bounds.top))
		};
	}

	private getBoundary(): DependencyBoundary<
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
		boundary: DependencyBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	): boolean {
		return (
			boundary.tasks === this.#options.tasks &&
			boundary.dependencies === this.#options.dependencies &&
			boundary.resources === this.#options.resources &&
			boundary.assignments === this.#options.assignments &&
			boundary.calendars === this.#options.calendars
		);
	}

	private reportBlocked(info: GanttInteractionBlockedInfo): void {
		this.#options.onInteractionBlocked?.(info);
	}
}

function getHandleKey(taskId: string, endpoint: GanttDependencyEndpoint): string {
	return `${taskId}:${endpoint}`;
}

function isDependencyEditableTask<TTaskFields extends object>(
	task: GanttTask<TTaskFields> | undefined
): boolean {
	return Boolean(task && !task.readOnly && task.dependencyEditable !== false);
}

function getBlockedReason(error: GanttChartError): GanttInteractionBlockedInfo['reason'] {
	if (error.code === 'dependency-cycle') return 'cycle';
	if (error.code === 'read-only') return 'read-only';
	if (error.code === 'stale-transaction') return 'stale';
	if (error.code === 'constraint-violation') return 'constraint';
	return 'invalid-target';
}

function isExpectedDependencyRejection(error: unknown): error is GanttChartError {
	return (
		error instanceof GanttChartError &&
		(error.code === 'dependency-cycle' ||
			error.code === 'dependency-self-link' ||
			error.code === 'duplicate-dependency' ||
			error.code === 'duplicate-dependency-id' ||
			error.code === 'missing-dependency-task' ||
			error.code === 'read-only' ||
			error.code === 'stale-transaction' ||
			error.code === 'schedule-conflict' ||
			error.code === 'constraint-violation')
	);
}

function isSameScale(left: GanttTimeScale, right: GanttTimeScale): boolean {
	return (
		left.zoom === right.zoom &&
		left.timeZone === right.timeZone &&
		left.direction === right.direction &&
		left.definition.id === right.definition.id &&
		left.canvasRange.start.getTime() === right.canvasRange.start.getTime() &&
		left.canvasRange.end.getTime() === right.canvasRange.end.getTime() &&
		left.pixelsPerMillisecond === right.pixelsPerMillisecond &&
		left.totalWidth === right.totalWidth
	);
}
