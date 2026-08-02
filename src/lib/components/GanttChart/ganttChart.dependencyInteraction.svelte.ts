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
import {
	acceptGanttInteraction,
	pendingGanttInteraction,
	rejectGanttInteraction,
	type GanttInteractionResolution
} from './ganttChart.interactionResolution.js';
import type { GanttChartMutations } from './ganttChart.mutations.js';
import { getGanttScalePixel, type GanttTimeScale } from './ganttChart.scale.js';
import type { GanttChartState, GanttModelBoundary } from './ganttChart.state.svelte.js';
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
type DependencyTransport = 'native' | 'pointer' | 'keyboard';

export type GanttTimelineInteractionContext = Readonly<{
	scale: GanttTimeScale;
	viewport: HTMLElement;
	rowHeight: number;
}>;

type DependencySource = Readonly<{
	taskId: string;
	endpoint: GanttDependencyEndpoint;
}>;

type DependencyPoint = Readonly<DependencySource & { point: Point }>;

type DependencyGesture<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	transport: DependencyTransport;
	source: DependencyPoint;
	pointerPoint: Point;
	target: DependencyPoint | null;
	resolution: GanttInteractionResolution<GanttDependencyCreationRequest>;
	scale: GanttTimeScale;
	boundary: GanttModelBoundary<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	pointerCapture: Readonly<{ node: HTMLElement; pointerId: number }> | null;
}>;

export type GanttDependencyInteractionStatus = Readonly<{
	transport: DependencyTransport;
	sourceTaskId: string;
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
	resolution: GanttInteractionResolution<GanttDependencyCreationRequest>;
}>;

type DependencyTarget = DependencySource;

export class GanttDependencyInteraction<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	readonly #instanceId = `gantt-chart-dependency-${++nextDependencyInteractionId}`;
	readonly #chart: GanttChartState<
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
	readonly #canStart: () => boolean;
	readonly #onTransportCancel: () => void;
	#gesture = $state.raw<DependencyGesture<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	> | null>(null);
	#timeline: GanttTimelineInteractionContext | null = null;
	#handlePoints = new Map<string, Point>();
	#handleAttachments = new Map<string, Attachment<HTMLElement>>();
	#targetValidation = new Map<string, GanttInteractionResolution<GanttDependencyCreationRequest>>();

	constructor(
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
		mutations: GanttChartMutations<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		canStart: () => boolean,
		onTransportCancel: () => void
	) {
		this.#chart = chart;
		this.#mutations = mutations;
		this.#canStart = canStart;
		this.#onTransportCancel = onTransportCancel;
	}

	readonly status: GanttDependencyInteractionStatus | null = $derived.by(() => {
		const gesture = this.#gesture;
		if (!gesture) return null;
		const targetPoint = gesture.target?.point ?? gesture.pointerPoint;
		return {
			transport: gesture.transport,
			sourceTaskId: gesture.source.taskId,
			fromX: gesture.source.point.x,
			fromY: gesture.source.point.y,
			toX: targetPoint.x,
			toY: targetPoint.y,
			resolution: gesture.resolution
		};
	});

	get isActive(): boolean {
		return this.#gesture !== null;
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
					canStart: (event) => event.pointerType === 'touch' && this.#chart.interactions.touch,
					disabled: () => !this.canBegin(taskId),
					activation: () => this.#chart.touchActivation,
					frameCoalesced: true,
					stopPropagation: true,
					onStart: (payload) => this.beginTouch({ taskId, endpoint }, payload),
					onMove: (payload) => this.updateTouch({ taskId, endpoint }, payload),
					onEnd: (payload) => this.finishTouch({ taskId, endpoint }, payload),
					onCancel: () => this.cancelTransport()
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
						const dependencySource = this.readActiveNativeSource(source.data);
						return Boolean(
							dependencySource &&
							this.validateTarget(dependencySource, { taskId, endpoint }).state === 'accepted'
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
					if (
						this.#gesture?.source.taskId === taskId &&
						this.#gesture.source.endpoint === endpoint
					) {
						this.cancel();
					}
				};
			});
		this.#handleAttachments.set(key, attachment);
		return attachment;
	}

	canCreateForTask(taskId: string): boolean {
		if (!this.#chart.createDependency || !this.#chart.interactions.createDependency) return false;
		const task = this.#chart.tasks.find((candidate) => candidate.id === taskId);
		return isDependencyEditableTask(task);
	}

	isDragSource(data: Record<string, unknown>): boolean {
		return this.readActiveNativeSource(data) !== null;
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
			transport: 'keyboard',
			source: { taskId, endpoint: sourceEndpoint, point: sourcePoint },
			pointerPoint: sourcePoint,
			target: null,
			resolution: pendingGanttInteraction,
			scale: timeline.scale,
			boundary: this.#chart.modelBoundary,
			pointerCapture: null
		};
		if (this.moveKeyboardTarget(1, orderedTaskIds)) return true;
		if (this.moveKeyboardTarget(-1, orderedTaskIds)) return true;
		this.cancel();
		return false;
	}

	moveKeyboardTarget(step: -1 | 1, orderedTaskIds: readonly string[]): boolean {
		const gesture = this.#gesture;
		if (!gesture || gesture.transport !== 'keyboard') return false;
		const currentTaskId = gesture.target?.taskId ?? gesture.source.taskId;
		let index = orderedTaskIds.indexOf(currentTaskId);
		if (index < 0) index = orderedTaskIds.indexOf(gesture.source.taskId);
		for (let candidateIndex = index + step; ; candidateIndex += step) {
			const taskId = orderedTaskIds[candidateIndex];
			if (!taskId) return false;
			if (taskId === gesture.source.taskId) continue;
			const endpoint = gesture.target?.endpoint ?? 'start';
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
		if (!gesture || gesture.transport !== 'keyboard' || !gesture.target) return false;
		const point = this.getKeyboardPoint(gesture.target.taskId, endpoint, orderedTaskIds);
		if (!point) return false;
		return this.setKeyboardTarget(gesture.target.taskId, endpoint, point);
	}

	commitKeyboard(): boolean {
		if (this.#gesture?.transport !== 'keyboard') return false;
		return this.commitGesture();
	}

	reconcileControlledState(): void {
		const gesture = this.#gesture;
		if (!gesture || this.#chart.isModelBoundaryCurrent(gesture.boundary)) return;
		this.cancel();
		this.reportBlocked({
			reason: 'stale',
			source: getDependencyMutationSource(gesture.transport),
			taskId: gesture.source.taskId,
			message: 'The controlled Gantt collections changed during dependency creation.'
		});
	}

	reconcileScale(scale: GanttTimeScale): void {
		const gesture = this.#gesture;
		if (!gesture || isSameScale(gesture.scale, scale)) return;
		this.cancel();
		this.reportBlocked({
			reason: 'stale',
			source: getDependencyMutationSource(gesture.transport),
			taskId: gesture.source.taskId,
			message: 'The timeline scale changed during dependency creation.'
		});
	}

	cancel(): boolean {
		const gesture = this.#gesture;
		if (!gesture) return false;
		this.#gesture = null;
		this.#targetValidation.clear();
		const capture = gesture.pointerCapture;
		if (capture?.node.hasPointerCapture(capture.pointerId)) {
			capture.node.releasePointerCapture(capture.pointerId);
		}
		return true;
	}

	private canBegin(taskId: string): boolean {
		return (
			!this.#chart.disabled &&
			!this.#chart.loading &&
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
			transport: 'native',
			source: { ...source, point: sourcePoint },
			pointerPoint: this.getPointerPoint(payload.location.current.input),
			target: null,
			resolution: pendingGanttInteraction,
			scale: timeline.scale,
			boundary: this.#chart.modelBoundary,
			pointerCapture: null
		};
		this.update(payload);
	}

	private beginTouch(source: DependencySource, payload: PointerDragPayload): boolean {
		const timeline = this.#timeline;
		const sourcePoint = this.#handlePoints.get(getHandleKey(source.taskId, source.endpoint));
		if (!timeline || !sourcePoint || !this.canBegin(source.taskId)) return false;
		this.#targetValidation.clear();
		this.#gesture = {
			transport: 'pointer',
			source: { ...source, point: sourcePoint },
			pointerPoint: this.getPointerPoint({ clientX: payload.x, clientY: payload.y }),
			target: null,
			resolution: pendingGanttInteraction,
			scale: timeline.scale,
			boundary: this.#chart.modelBoundary,
			pointerCapture: { node: payload.node, pointerId: payload.pointerId }
		};
		const input = { clientX: payload.x, clientY: payload.y };
		this.updateFromPointer(source, input, this.readPointerTarget(input));
		return true;
	}

	private update(
		payload: ElementEventPayloadMap['onDrag'] | ElementEventPayloadMap['onDrop']
	): void {
		const source = this.readActiveNativeSource(payload.source.data);
		if (!source) return;
		const input = payload.location.current.input;
		this.updateFromPointer(
			source,
			input,
			this.readCurrentTarget(payload.location.current.dropTargets) ?? this.readPointerTarget(input)
		);
	}

	private updateTouch(source: DependencySource, payload: PointerDragPayload): void {
		const input = { clientX: payload.x, clientY: payload.y };
		this.updateFromPointer(source, input, this.readPointerTarget(input));
	}

	private updateFromPointer(
		source: DependencySource,
		input: Readonly<{ clientX: number; clientY: number }>,
		target: DependencyTarget | null
	): void {
		const gesture = this.#gesture;
		if (!gesture) return;
		if (!this.#chart.isModelBoundaryCurrent(gesture.boundary)) {
			this.reconcileControlledState();
			return;
		}
		const pointerPoint = this.getPointerPoint(input);
		if (!target) {
			this.#gesture = {
				...gesture,
				pointerPoint,
				target: null,
				resolution: pendingGanttInteraction
			};
			return;
		}
		const resolution = this.validateTarget(source, target);
		this.#gesture = {
			...gesture,
			pointerPoint,
			target: {
				...target,
				point: this.#handlePoints.get(getHandleKey(target.taskId, target.endpoint)) ?? pointerPoint
			},
			resolution
		};
	}

	private finish(payload: ElementEventPayloadMap['onDrop']): void {
		if (this.#gesture?.transport !== 'native') return;
		const source = this.readActiveNativeSource(payload.source.data);
		if (!source) {
			this.cancelTransport();
			return;
		}
		const input = payload.location.current.input;
		const dropTarget = this.readCurrentTarget(payload.location.current.dropTargets);
		const pointerTarget = dropTarget ?? this.readPointerTarget(input);
		this.finishFromPointer(source, input, pointerTarget, dropTarget !== null);
	}

	private finishTouch(source: DependencySource, payload: PointerDragPayload): void {
		if (this.#gesture?.transport !== 'pointer') return;
		const input = { clientX: payload.x, clientY: payload.y };
		this.finishFromPointer(source, input, this.readPointerTarget(input));
	}

	private finishFromPointer(
		source: DependencySource,
		input: Readonly<{ clientX: number; clientY: number }>,
		target: DependencyTarget | null,
		canCommitAccepted = true
	): void {
		try {
			this.updateFromPointer(source, input, target);
			if (!this.#gesture) return;
			if (!target) {
				this.cancelTransport();
				return;
			}
			if (!canCommitAccepted && this.#gesture.resolution.state === 'accepted') {
				this.cancelTransport();
				return;
			}
			this.commitGesture();
		} catch (error) {
			this.cancel();
			throw error;
		}
	}

	private cancelTransport(): void {
		if (!this.#gesture) return;
		try {
			this.#onTransportCancel();
		} finally {
			this.cancel();
		}
	}

	private commitGesture(): boolean {
		const gesture = this.#gesture;
		if (!gesture) return false;
		if (gesture.resolution.state !== 'accepted') {
			if (gesture.target) {
				const rejection = gesture.resolution.state === 'rejected' ? gesture.resolution : null;
				this.cancel();
				this.reportBlocked({
					reason: rejection?.reason ?? 'invalid-target',
					source: getDependencyMutationSource(gesture.transport),
					taskId: gesture.source.taskId,
					message: rejection?.message ?? 'The dependency target is invalid.'
				});
				return false;
			}
			this.cancel();
			return false;
		}
		const request = gesture.resolution.proposal;
		let didCommit = false;
		try {
			const createDependency = this.#chart.createDependency;
			if (!createDependency) {
				throw new GanttChartError(
					'invalid-operation',
					'Dependency creation requires createDependency.'
				);
			}
			const dependency = createDependency(request);
			assertCreatedGanttDependency(request, dependency);
			const mutationSource = getDependencyMutationSource(gesture.transport);
			const accepted = this.#mutations.addDependency(dependency, mutationSource);
			if (!accepted) {
				this.reportBlocked({
					reason: 'custom-policy',
					source: mutationSource,
					dependencyId: dependency.id,
					message: 'The consumer dependency policy rejected this proposal.'
				});
			} else didCommit = true;
		} catch (error) {
			if (!isExpectedDependencyRejection(error)) throw error;
			this.reportBlocked({
				reason: getBlockedReason(error),
				source: getDependencyMutationSource(gesture.transport),
				taskId: gesture.source.taskId,
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
		if (!gesture || gesture.transport !== 'keyboard') return false;
		const source = { taskId: gesture.source.taskId, endpoint: gesture.source.endpoint };
		const resolution = this.validateTarget(source, { taskId, endpoint });
		this.#gesture = {
			...gesture,
			pointerPoint: point,
			target: { taskId, endpoint, point },
			resolution
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
		const task = this.#chart.schedule.resolvedTasks.find((node) => node.taskId === taskId);
		const instant = endpoint === 'start' ? task?.resolvedStart : task?.resolvedEnd;
		if (!gestureScale || !rowHeight || rowIndex < 0 || !instant) return null;
		return {
			x: getGanttScalePixel(gestureScale, instant),
			y: rowIndex * rowHeight + rowHeight / 2
		};
	}

	private validateTarget(
		source: DependencySource,
		target: DependencyTarget
	): GanttInteractionResolution<GanttDependencyCreationRequest> {
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
		let resolution: GanttInteractionResolution<GanttDependencyCreationRequest>;
		try {
			const targetTask = this.#chart.tasks.find((task) => task.id === target.taskId);
			if (!isDependencyEditableTask(targetTask)) {
				throw new GanttChartError('read-only', 'The target task does not allow dependencies.', {
					taskId: target.taskId
				});
			}
			validateGanttDependencyCreation(this.#chart.schedule.model, request);
			resolution = acceptGanttInteraction(request);
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			resolution = rejectGanttInteraction(getBlockedReason(error), error.message, request);
		}
		this.#targetValidation.set(cacheKey, resolution);
		return resolution;
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

	private readActiveNativeSource(data: Record<string, unknown>): DependencySource | null {
		const source = this.readSource(data);
		const gesture = this.#gesture;
		if (
			!source ||
			gesture?.transport !== 'native' ||
			gesture.source.taskId !== source.taskId ||
			gesture.source.endpoint !== source.endpoint
		) {
			return null;
		}
		return source;
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
		const timeline = this.#timeline;
		const element = document
			.elementFromPoint(input.clientX, input.clientY)
			?.closest<HTMLElement>('[data-gantt-chart-part="dependency-handle"]');
		if (!element || !timeline?.viewport.contains(element)) return null;
		const taskId = element.dataset.taskId;
		const endpoint = element.dataset.endpoint;
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

	private reportBlocked(info: GanttInteractionBlockedInfo): void {
		this.#chart.onInteractionBlocked?.(info);
	}
}

function getHandleKey(taskId: string, endpoint: GanttDependencyEndpoint): string {
	return `${taskId}:${endpoint}`;
}

function getDependencyMutationSource(transport: DependencyTransport): 'pointer' | 'keyboard' {
	return transport === 'keyboard' ? 'keyboard' : 'pointer';
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
