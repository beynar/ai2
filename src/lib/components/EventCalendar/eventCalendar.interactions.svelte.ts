/* eslint-disable svelte/prefer-svelte-reactivity -- DOM registries and immutable gesture snapshots do not require reactive collections. */
import {
	draggable,
	dropTargetForElements,
	monitorForElements,
	type ElementEventPayloadMap
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
	autoScrollForElements,
	autoScrollWindowForElements
} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import {
	addCivilDays,
	assertRenderableDateOnly,
	civilDayDifference,
	getCivilWeekday,
	getZonedDay,
	isSupportedDateDomainError,
	rangesIntersect,
	resolveZonedMinutesOnDay,
	snapInstant,
	startOfZonedDay
} from './eventCalendar.date.js';
import { EventCalendarError } from './eventCalendar.error.js';
import {
	createEventCalendarRecurrenceMutation,
	regenerateEventCalendarSeriesMutation,
	type CreateRecurrenceMutationOptions,
	type EventCalendarRecurrenceMutation
} from './eventCalendar.recurrenceMutation.js';
import {
	replaceEventCalendarResourceAssignment,
	setEventCalendarResourceIds
} from './eventCalendar.resources.js';
import type { EventCalendarState } from './eventCalendar.state.svelte.js';
import type {
	EventCalendarChange,
	EventCalendarBusinessHours,
	EventCalendarDateOnly,
	EventCalendarInteractionBlockedInfo,
	EventCalendarItem,
	EventCalendarMutationSource,
	EventCalendarOccurrence,
	EventCalendarProposedUpdate,
	EventCalendarSegment,
	EventCalendarSelection,
	EventCalendarSlot,
	EventCalendarUpdateAdjustment,
	EventCalendarView
} from './eventCalendar.types.js';

export type EventCalendarItemOperation = 'move' | 'resize-start' | 'resize-end';
type InvalidReason = EventCalendarInteractionBlockedInfo['reason'];

export type EventCalendarInteractionStatus<TItemFields extends object> =
	| {
			type: 'mode';
			source: 'keyboard' | 'single-pointer';
			operation: EventCalendarItemOperation;
			occurrence: EventCalendarOccurrence<TItemFields>;
	  }
	| {
			type: 'proposal';
			source: EventCalendarMutationSource;
			operation: EventCalendarItemOperation;
			occurrence: EventCalendarOccurrence<TItemFields>;
			proposal: EventCalendarProposedUpdate<TItemFields>;
	  }
	| {
			type: 'invalid';
			source: EventCalendarMutationSource | 'drag-create' | 'slot-click';
			reason: InvalidReason;
			proposal?: EventCalendarProposedUpdate<TItemFields>;
	  }
	| {
			type: 'commit' | 'revert';
			source: EventCalendarMutationSource;
			item?: EventCalendarItem<TItemFields>;
	  }
	| {
			type: 'cancel';
			source: EventCalendarMutationSource | 'drag-create';
			item?: EventCalendarItem<TItemFields>;
	  };

export type EventCalendarAssistedStep = {
	dayDelta?: number;
	minuteDelta?: number;
	resourceDirection?: -1 | 1;
};

export type EventCalendarDropTarget =
	| {
			key: string;
			view: EventCalendarView;
			allDay: true;
			day: EventCalendarDateOnly;
			resourceId?: string;
	  }
	| {
			key: string;
			view: EventCalendarView;
			allDay: false;
			start: Date;
			end: Date;
			resourceId?: string;
	  };

type EventCalendarItemGesture<TItemFields extends object> = {
	kind: EventCalendarItemOperation;
	initialKind: EventCalendarItemOperation;
	source: EventCalendarMutationSource;
	inputMode: 'pointer' | 'assisted';
	occurrence: EventCalendarOccurrence<TItemFields>;
	proposal: EventCalendarProposedUpdate<TItemFields> | null;
	targetKey: string | null;
	isValid: boolean;
	reason: InvalidReason | null;
	grabOffsetMs: number;
	grabOffsetDays: number;
	pointerX: number;
	pointerY: number;
	sourceWidth?: number;
	sourceHeight?: number;
	sourceMinHeight?: number;
	isOverflowSource?: boolean;
	sourceResourceId?: string;
};

type EventCalendarSlotGesture = {
	kind: 'slot-create';
	source: 'drag-create' | 'keyboard';
	inputMode: 'pointer' | 'assisted';
	anchor: EventCalendarSlot;
	slot: EventCalendarSlot;
	targetKey: string | null;
	isValid: boolean;
	reason: InvalidReason | null;
	pointerX: number;
	pointerY: number;
};

export type EventCalendarGesture<TItemFields extends object> =
	EventCalendarItemGesture<TItemFields> | EventCalendarSlotGesture | null;

type DragSource = {
	calendarInstanceId: string;
	occurrenceKey: string;
	operation: EventCalendarItemOperation;
	grabOffsetMs: number;
	grabOffsetDays: number;
	sourceWidth: number;
	sourceHeight: number;
	sourceMinHeight: number;
	isOverflowSource: boolean;
	view: EventCalendarView;
	sourceResourceId?: string;
};

type EventCalendarHistoryEntry<TItemFields extends object> = {
	before: EventCalendarItem<TItemFields>[];
	after: EventCalendarItem<TItemFields>[];
	beforeSignature: string;
	afterSignature: string;
};

export type EventCalendarDropIndicatorRect = Readonly<{
	left: number;
	top: number;
	width: number;
	height: number;
}>;

export type EventCalendarMonthInsertion = Readonly<{
	occurrenceKey: string;
	start: EventCalendarDateOnly;
	end: EventCalendarDateOnly;
	sortStart: number;
	sortEnd: number;
	priority: number;
}>;

const SOURCE_MARK = 'svelai-event-calendar';
const EDGE_SCROLL_DISTANCE = 56;
const EDGE_SCROLL_MAX_PX = 18;
const MINUTE_MS = 60_000;

export class EventCalendarInteractionsController<
	TItemFields extends object,
	TResourceFields extends object
> {
	gesture = $state<EventCalendarGesture<TItemFields>>(null);
	private monitorCleanup: (() => void) | null = null;
	private escapeCleanup: (() => void) | null = null;
	private nativeCancelCleanup: (() => void) | null = null;
	private didNativeCancel = false;
	private autoScrollCleanups = new Set<() => void>();
	private slotScrollElement: HTMLElement | null = null;
	private slotScrollMode: 'contained' | 'page' = 'contained';
	private slotScrollFrame: number | null = null;
	private suppressedClickKey: string | null = null;
	private isSlotClickSuppressed = false;
	private singlePointerAnchor: EventCalendarSlot | null = null;
	private singlePointerBoundary: readonly unknown[] | null = null;
	private targetElements = new Map<string, HTMLElement>();
	private gestureBoundary: readonly unknown[] | null = null;
	private itemDragFrame: number | null = null;
	private lastPublishedProposalKey: string | null = null;
	private pendingItemDrag: {
		target: EventCalendarDropTarget | null;
		pointerX: number;
		pointerY: number;
	} | null = null;
	private clipboardItem: EventCalendarItem<TItemFields> | null = null;
	private historyPast: EventCalendarHistoryEntry<TItemFields>[] = [];
	private historyFuture: EventCalendarHistoryEntry<TItemFields>[] = [];
	private historyRevision = $state(0);

	constructor(
		readonly instanceId: string,
		private readonly calendar: EventCalendarState<TItemFields, TResourceFields>
	) {
		$effect.pre(() => {
			const nextBoundary = this.getBoundary();
			untrack(() => {
				if (
					this.gesture &&
					this.gestureBoundary &&
					this.hasBoundaryChanged(this.gestureBoundary, nextBoundary)
				)
					this.cancel('stale');
				if (
					this.singlePointerBoundary &&
					this.hasBoundaryChanged(this.singlePointerBoundary, nextBoundary)
				) {
					this.resetSinglePointerSlot();
				}
			});
		});
	}

	get proposal(): EventCalendarProposedUpdate<TItemFields> | null {
		return this.gesture && this.gesture.kind !== 'slot-create' ? this.gesture.proposal : null;
	}

	get slot(): EventCalendarSlot | null {
		return this.gesture?.kind === 'slot-create' ? this.gesture.slot : null;
	}

	get isValid(): boolean | null {
		return this.gesture?.isValid ?? null;
	}

	get status(): string {
		if (!this.gesture) return 'idle';
		return this.gesture.isValid ? `${this.gesture.kind}:valid` : `${this.gesture.kind}:invalid`;
	}

	get isKeyboardSlotActive(): boolean {
		return (
			this.gesture?.kind === 'slot-create' &&
			this.gesture.source === 'keyboard' &&
			this.gesture.inputMode === 'assisted'
		);
	}

	mount(): void {
		if (this.monitorCleanup) return;
		this.monitorCleanup = monitorForElements({
			canMonitor: ({ source }) =>
				this.readSource(source.data)?.calendarInstanceId === this.instanceId,
			onDragStart: (payload) => this.handleItemDragStart(payload),
			onDrag: (payload) => this.handleItemDrag(payload),
			onDropTargetChange: (payload) => this.handleItemDrag(payload),
			onDrop: (payload) => this.handleItemDrop(payload)
		});
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || (!this.gesture && !this.singlePointerAnchor)) return;
			event.preventDefault();
			if (this.gesture) this.cancel();
			this.resetSinglePointerSlot();
		};
		document.addEventListener('keydown', handleKeydown);
		this.escapeCleanup = () => document.removeEventListener('keydown', handleKeydown);
		const handleDragEnd = (event: DragEvent) => {
			if (event.dataTransfer?.dropEffect === 'none') this.didNativeCancel = true;
		};
		window.addEventListener('dragend', handleDragEnd, true);
		this.nativeCancelCleanup = () => window.removeEventListener('dragend', handleDragEnd, true);
	}

	destroy(): void {
		this.cancel();
		this.resetSinglePointerSlot();
		this.cancelItemDragFrame();
		this.monitorCleanup?.();
		this.monitorCleanup = null;
		this.escapeCleanup?.();
		this.escapeCleanup = null;
		this.nativeCancelCleanup?.();
		this.nativeCancelCleanup = null;
		for (const cleanup of this.autoScrollCleanups) cleanup();
		this.autoScrollCleanups.clear();
	}

	cancel(reason?: 'stale'): void {
		const active = this.gesture;
		this.gesture = null;
		this.gestureBoundary = null;
		this.lastPublishedProposalKey = null;
		this.cancelItemDragFrame();
		this.stopSlotAutoScroll();
		if (!active) return;
		if (!reason) {
			this.calendar.onInteractionStatus?.({
				type: 'cancel',
				source: active.source,
				item: active.kind === 'slot-create' ? undefined : active.occurrence.item
			});
			return;
		}
		this.reportBlocked({
			reason,
			source: active.source,
			proposal: active.kind === 'slot-create' ? undefined : (active.proposal ?? undefined),
			slot: active.kind === 'slot-create' ? active.slot : undefined
		});
	}

	beginKeyboardSlot(target: EventCalendarDropTarget): boolean {
		if (
			this.calendar.disabled ||
			this.calendar.loading ||
			!this.calendar.interactions.selectSlot ||
			!this.calendar.interactions.keyboard
		) {
			return false;
		}
		this.resetSinglePointerSlot();
		if (this.gesture) this.cancel();
		const anchor = this.slotFromDropTarget(target);
		const reason = this.validateSlot(anchor);
		if (reason) {
			this.reportBlocked({ reason, source: 'keyboard', slot: anchor });
			return false;
		}
		this.gestureBoundary = this.getBoundary();
		this.gesture = {
			kind: 'slot-create',
			source: 'keyboard',
			inputMode: 'assisted',
			anchor,
			slot: anchor,
			targetKey: target.key,
			isValid: true,
			reason: null,
			pointerX: 0,
			pointerY: 0
		};
		return true;
	}

	updateKeyboardSlot(target: EventCalendarDropTarget): boolean {
		const active = this.gesture;
		if (
			!active ||
			active.kind !== 'slot-create' ||
			active.source !== 'keyboard' ||
			target.allDay !== active.anchor.allDay
		) {
			return false;
		}
		const point = this.slotFromDropTarget(target);
		if (point.resourceId !== active.anchor.resourceId) {
			this.cancel();
			return true;
		}
		const slot = mergeSlots(active.anchor, point);
		const reason = this.validateSlot(slot);
		this.gesture = {
			...active,
			slot,
			targetKey: target.key,
			isValid: reason === null,
			reason
		};
		return true;
	}

	commitKeyboardSlot(): boolean {
		const active = this.gesture;
		if (!active || active.kind !== 'slot-create' || active.source !== 'keyboard') return false;
		if (this.isGestureStale()) {
			this.cancel('stale');
			return true;
		}
		this.gesture = null;
		this.gestureBoundary = null;
		if (!active.isValid) {
			this.reportBlocked({
				reason: active.reason ?? 'invalid-target',
				source: 'keyboard',
				slot: active.slot
			});
			return true;
		}
		this.calendar.select({ kind: 'slot', itemKey: null, slot: active.slot });
		this.calendar.onSlotSelect?.(active.slot);
		this.calendar.onInteractionStatus?.({ type: 'commit', source: 'keyboard' });
		return true;
	}

	selectSinglePointerSlot(slot: EventCalendarSlot): boolean {
		if (!this.calendar.interactions.singlePointer || !this.calendar.interactions.selectSlot) {
			this.resetSinglePointerSlot();
			return false;
		}
		const anchor = this.singlePointerAnchor;
		if (!anchor || !areCompatibleSlots(anchor, slot)) {
			this.singlePointerAnchor = slot;
			this.singlePointerBoundary = this.getBoundary();
			return false;
		}
		const boundary = this.singlePointerBoundary;
		this.resetSinglePointerSlot();
		if (boundary && this.hasBoundaryChanged(boundary)) {
			this.reportBlocked({ reason: 'stale', source: 'single-pointer', slot });
			return true;
		}
		const range = mergeSlots(anchor, slot);
		const reason = this.validateSlot(range);
		if (reason) {
			this.reportBlocked({ reason, source: 'single-pointer', slot: range });
			return true;
		}
		this.calendar.select({ kind: 'slot', itemKey: null, slot: range });
		this.calendar.onSlotSelect?.(range);
		return true;
	}

	resetSinglePointerSlot(): void {
		this.singlePointerAnchor = null;
		this.singlePointerBoundary = null;
	}

	shouldSuppressClick(occurrenceKey: string): boolean {
		return this.suppressedClickKey === occurrenceKey;
	}

	shouldSuppressSlotClick(): boolean {
		return this.isSlotClickSuppressed;
	}

	isDragging(occurrenceKey: string): boolean {
		return this.gesture?.kind !== 'slot-create' && this.gesture?.occurrence.key === occurrenceKey;
	}

	isDraggingFromOverflow(occurrenceKey: string): boolean {
		return (
			this.isDragging(occurrenceKey) &&
			this.gesture?.kind !== 'slot-create' &&
			this.gesture?.isOverflowSource === true
		);
	}

	canMove(occurrence: EventCalendarOccurrence<TItemFields>): boolean {
		return this.canBeginItemGesture(occurrence, 'move');
	}

	canResize(occurrence: EventCalendarOccurrence<TItemFields>): boolean {
		return this.canBeginItemGesture(occurrence, 'resize-start');
	}

	canBeginAssistedItem(
		occurrence: EventCalendarOccurrence<TItemFields>,
		operation: EventCalendarItemOperation,
		source: 'keyboard' | 'single-pointer'
	): boolean {
		const isModeEnabled =
			source === 'keyboard'
				? this.calendar.interactions.keyboard
				: this.calendar.interactions.singlePointer;
		return isModeEnabled && this.canBeginItemGesture(occurrence, operation);
	}

	beginAssistedItem(
		occurrence: EventCalendarOccurrence<TItemFields>,
		operation: EventCalendarItemOperation,
		source: 'keyboard' | 'single-pointer',
		sourceResourceId?: string
	): boolean {
		if (!this.canBeginAssistedItem(occurrence, operation, source)) return false;
		this.resetSinglePointerSlot();
		if (this.gesture) this.cancel();
		this.lastPublishedProposalKey = null;
		this.gestureBoundary = this.getBoundary();
		this.gesture = {
			kind: operation,
			initialKind: operation,
			source,
			inputMode: 'assisted',
			occurrence,
			proposal: null,
			targetKey: null,
			isValid: false,
			reason: 'invalid-target',
			grabOffsetMs: 0,
			grabOffsetDays: 0,
			pointerX: 0,
			pointerY: 0,
			sourceResourceId
		};
		this.calendar.onInteractionStatus?.({
			type: 'mode',
			source,
			operation,
			occurrence
		});
		return true;
	}

	stepAssistedItem(step: EventCalendarAssistedStep): boolean {
		const active = this.gesture;
		if (!active || active.kind === 'slot-create' || active.inputMode !== 'assisted') return false;
		if (this.isGestureStale()) {
			this.cancel('stale');
			return true;
		}
		const currentItem = active.proposal?.item ?? this.getOccurrencePlacementItem(active.occurrence);
		const resourceTarget =
			active.kind === 'move' && step.resourceDirection
				? this.getAssistedResourceTarget(
						currentItem,
						active.sourceResourceId,
						step.resourceDirection
					)
				: null;
		let item: EventCalendarItem<TItemFields>;
		try {
			item = this.applyAssistedStep(currentItem, active.kind, step, active.sourceResourceId);
		} catch (error) {
			if (!isSupportedDateDomainError(error)) throw error;
			this.gesture = { ...active, isValid: false, reason: 'invalid-target' };
			this.publishProposal(this.gesture);
			return true;
		}
		const proposal: EventCalendarProposedUpdate<TItemFields> = {
			kind: active.kind,
			source: active.source,
			occurrence: active.occurrence,
			previousItem: active.occurrence.item,
			item
		};
		const reason = this.validateAssistedProposal(active, proposal);
		this.gesture = {
			...active,
			proposal,
			isValid: reason === null,
			reason,
			...(resourceTarget ? { sourceResourceId: resourceTarget.resourceId } : {})
		};
		this.publishProposal(this.gesture);
		return true;
	}

	activateAssistedTarget(target: EventCalendarDropTarget): boolean {
		const active = this.gesture;
		if (
			!active ||
			active.kind === 'slot-create' ||
			active.inputMode !== 'assisted' ||
			active.source !== 'single-pointer'
		)
			return false;
		const proposal = this.deriveItemProposal(active, target, 0, Number.NaN);
		const reason = proposal ? this.validateAssistedProposal(active, proposal) : 'invalid-target';
		this.gesture = {
			...active,
			kind: proposal ? getProposalOperation(proposal, active.kind) : active.kind,
			proposal,
			targetKey: target.key,
			isValid: proposal !== null && reason === null,
			reason
		};
		this.publishProposal(this.gesture);
		if (this.gesture.isValid) this.commitAssistedItem();
		return true;
	}

	activateAssistedPoint(pointerX: number, pointerY: number): boolean {
		const active = this.gesture;
		if (
			!active ||
			active.kind === 'slot-create' ||
			active.inputMode !== 'assisted' ||
			active.source !== 'single-pointer'
		)
			return false;
		const target = this.getTargetAt(pointerX, pointerY);
		if (target) return this.activateAssistedTarget(target);
		this.gesture = {
			...active,
			proposal: null,
			targetKey: null,
			isValid: false,
			reason: 'invalid-target',
			pointerX,
			pointerY
		};
		this.publishProposal(this.gesture);
		return true;
	}

	commitAssistedItem(): boolean {
		const active = this.gesture;
		if (!active || active.kind === 'slot-create' || active.inputMode !== 'assisted') return false;
		if (this.isGestureStale()) {
			this.cancel('stale');
			return true;
		}
		if (!active.proposal || !active.isValid) {
			this.reportBlocked({
				reason: active.reason ?? 'invalid-target',
				source: active.source,
				proposal: active.proposal ?? undefined
			});
			return true;
		}
		const boundary = this.gestureBoundary;
		try {
			this.commitProposal(active.proposal, boundary ?? undefined);
		} finally {
			this.lastPublishedProposalKey = null;
			if (this.gestureBoundary === boundary) {
				this.gesture = null;
				this.gestureBoundary = null;
			}
		}
		return true;
	}

	isInvalidTarget(key: string): boolean {
		return Boolean(this.gesture && !this.gesture.isValid && this.gesture.targetKey === key);
	}

	getDropIndicatorRect(): EventCalendarDropIndicatorRect | null {
		const gesture = this.gesture;
		if (
			typeof document === 'undefined' ||
			!gesture ||
			gesture.kind === 'slot-create' ||
			gesture.inputMode !== 'pointer' ||
			!gesture.proposal ||
			!gesture.targetKey
		) {
			return null;
		}
		const targetElement = this.targetElements.get(gesture.targetKey);
		if (!targetElement?.isConnected) return null;
		const target = this.readElementTarget(targetElement);
		if (!target) return null;
		if (target.view === 'month' && gesture.kind === 'move' && gesture.inputMode === 'pointer') {
			return null;
		}
		const rect = target.allDay
			? this.getAllDayDropIndicatorRect(gesture, target, targetElement)
			: this.getTimedDropIndicatorRect(gesture, target, targetElement);
		return rect ? this.clipDropIndicatorRect(rect, targetElement) : null;
	}

	getMonthInsertion(): EventCalendarMonthInsertion | null {
		const gesture = this.gesture;
		if (
			typeof document === 'undefined' ||
			!gesture ||
			gesture.kind !== 'move' ||
			gesture.inputMode !== 'pointer' ||
			!gesture.proposal ||
			!gesture.targetKey
		) {
			return null;
		}
		const targetElement = this.targetElements.get(gesture.targetKey);
		if (!targetElement?.isConnected) return null;
		const target = this.readElementTarget(targetElement);
		if (!target?.allDay || target.view !== 'month') return null;
		const item = gesture.proposal.item;
		const start =
			item.allDay === true ? item.start : getZonedDay(item.start, this.calendar.timeZone);
		const end =
			item.allDay === true
				? item.end
				: addCivilDays(
						getZonedDay(
							new Date(Math.max(item.start.getTime(), item.end.getTime() - 1)),
							this.calendar.timeZone
						),
						1
					);
		const sortStart =
			item.allDay === true
				? startOfZonedDay(item.start, this.calendar.timeZone).getTime()
				: item.start.getTime();
		const sortEnd =
			item.allDay === true
				? startOfZonedDay(item.end, this.calendar.timeZone).getTime()
				: item.end.getTime();
		return {
			occurrenceKey: gesture.occurrence.key,
			start,
			end,
			sortStart,
			sortEnd,
			priority: item.priority ?? 0
		};
	}

	isSlotDraftTarget(target: EventCalendarDropTarget): boolean {
		const slot = this.slot;
		if (!slot || slot.allDay !== target.allDay) return false;
		if (slot.resourceId !== target.resourceId) return false;
		if (slot.allDay && target.allDay) return target.day >= slot.start && target.day < slot.end;
		if (!slot.allDay && !target.allDay) {
			return target.start < slot.end && slot.start < target.end;
		}
		return false;
	}

	draggableItem(
		segment: EventCalendarSegment<TItemFields>,
		operation: EventCalendarItemOperation,
		view: EventCalendarView,
		sourceResourceId?: string
	): Attachment<HTMLElement> {
		const occurrence = segment.occurrence;
		return (element) =>
			untrack(() =>
				draggable({
					element,
					canDrag: () => this.canBeginItemGesture(occurrence, operation),
					onGenerateDragPreview: ({ nativeSetDragImage }) =>
						disableNativeDragPreview({ nativeSetDragImage }),
					getInitialData: ({ input }) => {
						const rect = element.getBoundingClientRect();
						const segmentDuration = segment.end.getTime() - segment.start.getTime();
						const segmentDayCount = occurrence.allDay
							? civilDayDifference(
									getZonedDay(segment.start, this.calendar.timeZone),
									getZonedDay(segment.end, this.calendar.timeZone)
								)
							: 0;
						const inlineRatio = Math.min(
							1,
							Math.max(0, (input.clientX - rect.left) / Math.max(1, rect.width))
						);
						const logicalRatio = this.calendar.direction === 'rtl' ? 1 - inlineRatio : inlineRatio;
						const segmentDayOffset = occurrence.allDay
							? civilDayDifference(
									getZonedDay(occurrence.start, this.calendar.timeZone),
									segment.day
								)
							: 0;
						return {
							mark: SOURCE_MARK,
							calendarInstanceId: this.instanceId,
							occurrenceKey: occurrence.key,
							operation,
							grabOffsetMs:
								operation === 'move' && !occurrence.allDay
									? segment.start.getTime() -
										occurrence.start.getTime() +
										Math.max(
											0,
											Math.min(
												segmentDuration,
												((input.clientY - rect.top) / Math.max(1, rect.height)) * segmentDuration
											)
										)
									: 0,
							grabOffsetDays:
								operation === 'move'
									? segmentDayOffset +
										Math.max(
											0,
											Math.min(
												Math.max(0, segmentDayCount - 1),
												Math.floor(logicalRatio * segmentDayCount)
											)
										)
									: 0,
							sourceWidth: rect.width,
							sourceHeight: rect.height,
							sourceMinHeight: Number.parseFloat(getComputedStyle(element).minHeight) || 0,
							isOverflowSource: Boolean(element.closest('[data-event-calendar-overflow-content]')),
							view,
							...(sourceResourceId === undefined ? {} : { sourceResourceId })
						};
					}
				})
			);
	}

	dropTarget(target: EventCalendarDropTarget): Attachment<HTMLElement> {
		return (element) =>
			untrack(() => {
				this.targetElements.set(target.key, element);
				const cleanup = dropTargetForElements({
					element,
					canDrop: ({ source }) =>
						this.readSource(source.data)?.calendarInstanceId === this.instanceId &&
						!this.calendar.disabled &&
						!this.calendar.loading,
					getData: () => ({
						mark: SOURCE_MARK,
						calendarInstanceId: this.instanceId,
						target
					})
				});
				return () => {
					cleanup();
					if (this.targetElements.get(target.key) === element)
						this.targetElements.delete(target.key);
				};
			});
	}

	slotDrag(target: EventCalendarDropTarget): Attachment<HTMLElement> {
		const pointerDrag = createPointerDrag({
			disabled: () =>
				this.calendar.disabled || this.calendar.loading || !this.calendar.interactions.selectSlot,
			activation: () => this.calendar.createActivation,
			stopPropagation: true,
			onStart: (payload) => {
				const origin = payload.startTarget;
				if (origin instanceof Element && origin.closest('[data-event-calendar-part="item"]')) {
					return false;
				}
				return this.beginSlotGesture(target, payload);
			},
			onMove: (payload) => this.updateSlotGesture(payload),
			onEnd: (payload) => this.finishSlotGesture(payload),
			onCancel: () => {
				if (this.gesture?.kind === 'slot-create') this.cancel();
			}
		});
		return (element) =>
			untrack(() => {
				this.targetElements.set(target.key, element);
				const cleanup = pointerDrag(element);
				return () => {
					cleanup?.();
					if (this.targetElements.get(target.key) === element)
						this.targetElements.delete(target.key);
				};
			});
	}

	autoScroll(mode: 'contained' | 'page'): Attachment<HTMLElement> {
		return (element) =>
			untrack(() => {
				this.slotScrollElement = element;
				this.slotScrollMode = mode;
				const cleanup =
					mode === 'contained'
						? autoScrollForElements({
								element,
								canScroll: ({ source }) =>
									this.readSource(source.data)?.calendarInstanceId === this.instanceId
							})
						: autoScrollWindowForElements({
								canScroll: ({ source }) =>
									this.readSource(source.data)?.calendarInstanceId === this.instanceId
							});
				this.autoScrollCleanups.add(cleanup);
				return () => {
					cleanup();
					this.autoScrollCleanups.delete(cleanup);
					if (this.slotScrollElement === element) this.slotScrollElement = null;
				};
			});
	}

	addItem(item: EventCalendarItem<TItemFields>): void {
		if (this.blockDisabledApiMutation()) return;
		if (this.calendar.items.some((candidate) => candidate.id === item.id)) {
			throw new EventCalendarError('duplicate-item-id', `Duplicate item id: ${item.id}.`, {
				id: item.id
			});
		}
		const previousItems = this.calendar.items;
		const committedItems = [...previousItems, item];
		this.calendar.validateCandidateItems(committedItems);
		this.commitCollection(committedItems, (revert) => ({
			kind: 'add',
			source: 'api',
			item,
			revert
		}));
	}

	updateItem(item: EventCalendarItem<TItemFields>): void {
		if (this.blockDisabledApiMutation()) return;
		const previousItem = this.calendar.items.find((candidate) => candidate.id === item.id);
		if (!previousItem) this.missingTarget('item', item.id);
		this.commitProposal({ kind: 'update', source: 'api', previousItem, item });
	}

	updateOccurrence(
		key: string,
		adjustment: EventCalendarUpdateAdjustment,
		options?: { scope?: 'occurrence' | 'series' }
	): void {
		if (this.blockDisabledApiMutation()) return;
		const occurrence = this.calendar.getOccurrence(key);
		if (!occurrence) this.missingTarget('occurrence', key);
		const item = this.applyAdjustment(this.getOccurrencePlacementItem(occurrence), adjustment);
		if (occurrence.isRecurring || occurrence.item.recurringItemId !== undefined) {
			const scope = options?.scope ?? this.calendar.recurrenceEditScope;
			if (scope === 'disabled') {
				this.reportBlocked({ reason: 'disabled', source: 'api' });
				return;
			}
			this.commitRecurrenceProposal(
				{
					kind: 'update',
					source: 'api',
					occurrence,
					previousItem: occurrence.item,
					item
				},
				scope
			);
			return;
		}
		this.commitProposal({
			kind: 'update',
			source: 'api',
			occurrence,
			previousItem: occurrence.item,
			item
		});
	}

	removeItem(id: string): void {
		if (this.blockDisabledApiMutation()) return;
		const previousItem = this.calendar.items.find((candidate) => candidate.id === id);
		if (!previousItem) this.missingTarget('item', id);
		const previousItems = this.calendar.items;
		const removedItems =
			previousItem.recurrence === undefined
				? [previousItem]
				: previousItems.filter(
						(candidate) => candidate === previousItem || candidate.recurringItemId === id
					);
		const removedIds = new Set(removedItems.map((item) => item.id));
		const committedItems = previousItems.filter((candidate) => !removedIds.has(candidate.id));
		this.calendar.validateCandidateItems(committedItems);
		this.commitCollection(
			committedItems,
			(revert) => ({
				kind: 'remove',
				source: 'api',
				previousItems: removedItems,
				revert
			}),
			undefined,
			previousItem.recurrence === undefined ? undefined : previousItem.id
		);
	}

	copySelection(): boolean {
		if (!this.calendar.clipboard || this.calendar.selection.kind !== 'item') return false;
		const occurrence = this.calendar.getOccurrence(this.calendar.selection.itemKey);
		if (!occurrence || occurrence.item.display === 'background') return false;
		this.clipboardItem = this.createClipboardItem(occurrence);
		return true;
	}

	paste(): boolean {
		if (!this.calendar.clipboard || this.blockDisabledApiMutation() || !this.clipboardItem) {
			return false;
		}
		const item = this.createPastedItem(this.clipboardItem);
		const proposal: EventCalendarProposedUpdate<TItemFields> = {
			kind: 'update',
			source: 'clipboard',
			previousItem: this.clipboardItem,
			item
		};
		this.calendar.validateCandidateItems([...this.calendar.items, item]);
		const reason = this.validateProposal(proposal);
		if (reason) {
			this.reportBlocked({ reason, source: 'clipboard', proposal });
			return false;
		}
		const committedItems = [...this.calendar.items, item];
		this.commitCollection(committedItems, (revert) => ({
			kind: 'add',
			source: 'clipboard',
			item,
			revert
		}));
		const occurrence = this.calendar.itemIndex.occurrences.find(
			(candidate) => candidate.item.id === item.id
		);
		if (occurrence) this.calendar.select({ kind: 'item', itemKey: occurrence.key, slot: null });
		return true;
	}

	canUndo(): boolean {
		void this.historyRevision;
		const entry = this.historyPast.at(-1);
		return Boolean(
			entry && entry.afterSignature === getItemCollectionSignature(this.calendar.items)
		);
	}

	canRedo(): boolean {
		void this.historyRevision;
		const entry = this.historyFuture.at(-1);
		return Boolean(
			entry && entry.beforeSignature === getItemCollectionSignature(this.calendar.items)
		);
	}

	undo(): boolean {
		const entry = this.historyPast.at(-1);
		if (
			!entry ||
			entry.afterSignature !== getItemCollectionSignature(this.calendar.items) ||
			this.calendar.disabled
		)
			return false;
		if (!this.commitHistory(entry, 'undo')) return false;
		this.historyPast.pop();
		this.historyFuture.push(entry);
		this.historyRevision += 1;
		return true;
	}

	redo(): boolean {
		const entry = this.historyFuture.at(-1);
		if (
			!entry ||
			entry.beforeSignature !== getItemCollectionSignature(this.calendar.items) ||
			this.calendar.disabled
		)
			return false;
		if (!this.commitHistory(entry, 'redo')) return false;
		this.historyFuture.pop();
		this.historyPast.push(entry);
		this.historyRevision += 1;
		return true;
	}

	private createClipboardItem(
		occurrence: EventCalendarOccurrence<TItemFields>
	): EventCalendarItem<TItemFields> {
		const item = this.getOccurrencePlacementItem(occurrence) as EventCalendarItem<TItemFields> &
			Record<string, unknown>;
		const copy = { ...item };
		delete copy.recurrence;
		delete copy.recurrenceTimeZone;
		delete copy.recurringItemId;
		delete copy.originalStart;
		copy.start = item.start instanceof Date ? new Date(item.start) : item.start;
		copy.end = item.end instanceof Date ? new Date(item.end) : item.end;
		if (item.resourceIds) copy.resourceIds = [...item.resourceIds];
		return copy;
	}

	private createPastedItem(source: EventCalendarItem<TItemFields>): EventCalendarItem<TItemFields> {
		const next = {
			...source,
			id: this.getPastedItemId(source.id)
		} as EventCalendarItem<TItemFields>;
		const selection = this.calendar.selection;
		if (selection.kind !== 'slot' || selection.slot.allDay !== (source.allDay === true)) {
			return this.clonePlacement(next);
		}
		const slot = selection.slot;
		let placed: EventCalendarItem<TItemFields>;
		if (source.allDay === true && slot.allDay) {
			const duration = civilDayDifference(source.start, source.end);
			placed = replacePlacement(next, {
				allDay: true,
				start: slot.start,
				end: addCivilDays(slot.start, duration)
			});
		} else if (source.allDay !== true && !slot.allDay) {
			const duration = source.end.getTime() - source.start.getTime();
			placed = replacePlacement(next, {
				allDay: false,
				start: new Date(slot.start),
				end: new Date(slot.start.getTime() + duration)
			});
		} else {
			return this.clonePlacement(next);
		}
		if (slot.view !== 'resource') return placed;
		return setEventCalendarResourceIds(placed, slot.resourceId ? [slot.resourceId] : []);
	}

	private clonePlacement(item: EventCalendarItem<TItemFields>): EventCalendarItem<TItemFields> {
		return replacePlacement(item, {
			allDay: item.allDay === true,
			start: item.start instanceof Date ? new Date(item.start) : item.start,
			end: item.end instanceof Date ? new Date(item.end) : item.end
		});
	}

	private getPastedItemId(sourceId: string): string {
		let suffix = 1;
		let id = `${sourceId}-copy`;
		const ids = new Set(this.calendar.items.map((item) => item.id));
		while (ids.has(id)) {
			suffix += 1;
			id = `${sourceId}-copy-${suffix}`;
		}
		return id;
	}

	private handleItemDragStart(payload: ElementEventPayloadMap['onDragStart']): void {
		const source = this.readSource(payload.source.data);
		if (!source) return;
		const occurrence = this.calendar.getOccurrence(source.occurrenceKey);
		if (!occurrence || !this.canBeginItemGesture(occurrence, source.operation)) return;
		this.resetSinglePointerSlot();
		this.didNativeCancel = false;
		this.lastPublishedProposalKey = null;
		this.gestureBoundary = this.getBoundary();
		this.gesture = {
			kind: source.operation,
			initialKind: source.operation,
			source: this.operationSource(source.operation),
			inputMode: 'pointer',
			occurrence,
			proposal: null,
			targetKey: null,
			isValid: false,
			reason: 'invalid-target',
			grabOffsetMs: source.grabOffsetMs,
			grabOffsetDays: source.grabOffsetDays,
			pointerX: payload.location.current.input.clientX,
			pointerY: payload.location.current.input.clientY,
			sourceWidth: source.sourceWidth,
			sourceHeight: source.sourceHeight,
			sourceMinHeight: source.sourceMinHeight,
			isOverflowSource: source.isOverflowSource,
			sourceResourceId: source.sourceResourceId
		};
		this.updateItemGesture(payload);
	}

	private handleItemDrag(payload: ElementEventPayloadMap['onDrag']): void {
		if (!this.gesture || this.gesture.kind === 'slot-create') return;
		const input = payload.location.current.input;
		this.pendingItemDrag = {
			target:
				this.getTargetAt(input.clientX, input.clientY) ??
				this.readTarget(payload.location.current.dropTargets),
			pointerX: input.clientX,
			pointerY: input.clientY
		};
		if (this.itemDragFrame !== null) return;
		this.itemDragFrame = requestAnimationFrame(() => {
			this.itemDragFrame = null;
			const pending = this.pendingItemDrag;
			this.pendingItemDrag = null;
			if (pending) this.updateItemGestureAt(pending.target, pending.pointerX, pending.pointerY);
		});
	}

	private handleItemDrop(payload: ElementEventPayloadMap['onDrop']): void {
		this.cancelItemDragFrame();
		const active = this.gesture;
		if (!active || active.kind === 'slot-create') return;
		if (this.didNativeCancel) {
			this.lastPublishedProposalKey = null;
			this.calendar.onInteractionStatus?.({
				type: 'cancel',
				source: active.source,
				item: active.occurrence.item
			});
			this.gesture = null;
			this.gestureBoundary = null;
			this.suppressClick(active.occurrence.key);
			this.didNativeCancel = false;
			return;
		}
		this.updateItemGesture(payload);
		if (this.isGestureStale()) {
			this.cancel('stale');
			this.suppressClick(active.occurrence.key);
			return;
		}
		const proposal = this.gesture?.kind === 'slot-create' ? null : this.gesture?.proposal;
		const isValid = this.gesture?.isValid ?? false;
		const reason = this.gesture?.reason ?? 'invalid-target';
		this.suppressClick(active.occurrence.key);
		if (!proposal || !isValid) {
			this.gesture = null;
			this.gestureBoundary = null;
			this.lastPublishedProposalKey = null;
			this.reportBlocked({
				reason,
				source: active.source,
				proposal: proposal ?? undefined
			});
			return;
		}
		const boundary = this.gestureBoundary;
		try {
			this.commitProposal(proposal, boundary ?? undefined);
		} finally {
			this.lastPublishedProposalKey = null;
			if (this.gestureBoundary === boundary) {
				this.gesture = null;
				this.gestureBoundary = null;
			}
		}
	}

	private updateItemGesture(
		payload:
			| ElementEventPayloadMap['onDrag']
			| ElementEventPayloadMap['onDrop']
			| ElementEventPayloadMap['onDragStart']
	): void {
		const input = payload.location.current.input;
		const target =
			this.getTargetAt(input.clientX, input.clientY) ??
			this.readTarget(payload.location.current.dropTargets);
		this.updateItemGestureAt(target, input.clientX, input.clientY);
	}

	private updateItemGestureAt(
		target: EventCalendarDropTarget | null,
		pointerX: number,
		pointerY: number
	): void {
		const active = this.gesture;
		if (!active || active.kind === 'slot-create') return;
		if (!target) {
			this.gesture = {
				...active,
				proposal: null,
				targetKey: null,
				isValid: false,
				reason: 'invalid-target',
				pointerX,
				pointerY
			};
			this.publishProposal(this.gesture);
			return;
		}
		const proposal = this.deriveItemProposal(active, target, pointerX, pointerY);
		const reason = proposal ? this.validateProposal(proposal) : 'invalid-target';
		this.gesture = {
			...active,
			kind: proposal ? getProposalOperation(proposal, active.kind) : active.kind,
			source: proposal?.source ?? active.source,
			proposal,
			targetKey: target.key,
			isValid: proposal !== null && reason === null,
			reason,
			pointerX,
			pointerY
		};
		this.publishProposal(this.gesture);
	}

	private deriveItemProposal(
		gesture: EventCalendarItemGesture<TItemFields>,
		target: EventCalendarDropTarget,
		pointerX: number,
		pointerY: number
	): EventCalendarProposedUpdate<TItemFields> | null {
		const { occurrence } = gesture;
		const initialKind = gesture.initialKind;
		const sourceItem = occurrence.item;
		if (
			initialKind !== 'move' &&
			target.view === 'resource' &&
			!this.itemUsesResource(sourceItem, target.resourceId)
		) {
			return null;
		}
		const placementItem = this.getOccurrencePlacementItem(occurrence);
		const isTimedMonthResize =
			initialKind !== 'move' && target.allDay && target.view === 'month' && !occurrence.allDay;
		if (initialKind !== 'move' && target.allDay !== occurrence.allDay && !isTimedMonthResize) {
			return null;
		}
		let operation = initialKind;
		let item: EventCalendarItem<TItemFields>;
		try {
			if (initialKind === 'move') {
				item =
					target.allDay && target.view === 'month' && !occurrence.allDay
						? this.moveTimedToMonthDay(placementItem, occurrence, target.day)
						: target.allDay
							? this.moveToAllDay(placementItem, occurrence, target.day, gesture.grabOffsetDays)
							: this.moveToTimed(placementItem, occurrence, target, pointerY, gesture.grabOffsetMs);
			} else if (isTimedMonthResize) {
				const sourceEndpoint = initialKind === 'resize-start' ? occurrence.start : occurrence.end;
				let endpoint = resolveZonedMinutesOnDay(
					target.day,
					getWallMinutes(sourceEndpoint, this.calendar.timeZone),
					this.calendar.timeZone
				);
				let resize = this.resizeTimedAcrossEdge(placementItem, initialKind, endpoint);
				if (resize.operation !== initialKind) {
					const oppositeEndpoint =
						resize.operation === 'resize-start' ? occurrence.start : occurrence.end;
					endpoint = resolveZonedMinutesOnDay(
						target.day,
						getWallMinutes(oppositeEndpoint, this.calendar.timeZone),
						this.calendar.timeZone
					);
					resize = this.resizeTimedAcrossEdge(placementItem, initialKind, endpoint);
				}
				operation = resize.operation;
				item = resize.item;
			} else if (target.allDay) {
				const resize = this.resizeAllDayAcrossEdge(placementItem, initialKind, target.day);
				operation = resize.operation;
				item = resize.item;
			} else {
				const endpoint = this.getTimedTargetInstant(target, pointerY);
				const resize = this.resizeTimedAcrossEdge(placementItem, initialKind, endpoint);
				operation = resize.operation;
				item = resize.item;
			}
		} catch (error) {
			if (isSupportedDateDomainError(error)) return null;
			throw error;
		}
		if (initialKind === 'move') {
			item = applyTargetResource(item, target, gesture.sourceResourceId);
		}
		return {
			kind: operation,
			source: gesture.inputMode === 'pointer' ? this.operationSource(operation) : gesture.source,
			occurrence,
			previousItem: sourceItem,
			item
		};
	}

	private moveTimedToMonthDay(
		item: EventCalendarItem<TItemFields>,
		occurrence: EventCalendarOccurrence<TItemFields>,
		day: EventCalendarDateOnly
	): EventCalendarItem<TItemFields> {
		const start = resolveZonedMinutesOnDay(
			day,
			getWallMinutes(occurrence.start, this.calendar.timeZone),
			this.calendar.timeZone
		);
		return replaceSchedule(item, {
			allDay: false,
			start,
			end: new Date(start.getTime() + occurrence.end.getTime() - occurrence.start.getTime())
		});
	}

	private moveToAllDay(
		item: EventCalendarItem<TItemFields>,
		occurrence: EventCalendarOccurrence<TItemFields>,
		targetDay: EventCalendarDateOnly,
		grabOffsetDays: number
	): EventCalendarItem<TItemFields> {
		const start = addCivilDays(targetDay, -grabOffsetDays);
		const durationDays =
			occurrence.allDay && this.calendar.interactions.maintainDurationOnAllDayChange
				? Math.max(
						1,
						civilDayDifference(
							getZonedDay(occurrence.start, this.calendar.timeZone),
							getZonedDay(occurrence.end, this.calendar.timeZone)
						)
					)
				: occurrence.allDay
					? Math.max(
							1,
							civilDayDifference(
								item.start as EventCalendarDateOnly,
								item.end as EventCalendarDateOnly
							)
						)
					: this.calendar.interactions.maintainDurationOnAllDayChange
						? touchedCivilDayCount(occurrence, this.getConversionDurationTimeZone(occurrence))
						: this.calendar.defaultAllDayItemDuration;
		return replaceSchedule(item, { allDay: true, start, end: addCivilDays(start, durationDays) });
	}

	private moveToTimed(
		item: EventCalendarItem<TItemFields>,
		occurrence: EventCalendarOccurrence<TItemFields>,
		target: Extract<EventCalendarDropTarget, { allDay: false }>,
		pointerY: number,
		grabOffsetMs: number
	): EventCalendarItem<TItemFields> {
		const pointer = this.getTimedTargetInstant(target, pointerY);
		const start = snapInstant(
			new Date(pointer.getTime() - grabOffsetMs),
			this.calendar.timeZone,
			this.calendar.snapDuration
		);
		let durationMs: number;
		if (!occurrence.allDay) durationMs = occurrence.end.getTime() - occurrence.start.getTime();
		else if (!this.calendar.interactions.maintainDurationOnAllDayChange) {
			durationMs = this.calendar.defaultTimedItemDuration * MINUTE_MS;
		} else {
			const conversionTimeZone = this.getConversionDurationTimeZone(occurrence);
			const days = Math.max(
				1,
				civilDayDifference(item.start as EventCalendarDateOnly, item.end as EventCalendarDateOnly)
			);
			const endDay = addCivilDays(getZonedDay(start, conversionTimeZone), days);
			const parts = getWallMinutes(start, conversionTimeZone);
			durationMs =
				resolveZonedMinutesOnDay(endDay, parts, conversionTimeZone).getTime() - start.getTime();
		}
		return replaceSchedule(item, {
			allDay: false,
			start,
			end: new Date(start.getTime() + durationMs)
		});
	}

	private resizeAllDayAcrossEdge(
		item: EventCalendarItem<TItemFields>,
		initialKind: Exclude<EventCalendarItemOperation, 'move'>,
		targetDay: EventCalendarDateOnly
	): {
		operation: Exclude<EventCalendarItemOperation, 'move'>;
		item: EventCalendarItem<TItemFields>;
	} {
		if (item.allDay !== true) return { operation: initialKind, item };
		const crossingBoundary = initialKind === 'resize-start' ? item.end : item.start;
		const operation = targetDay < crossingBoundary ? 'resize-start' : 'resize-end';
		const start = operation === 'resize-start' ? targetDay : item.start;
		const end = operation === 'resize-end' ? addCivilDays(targetDay, 1) : item.end;
		return { operation, item: replaceSchedule(item, { allDay: true, start, end }) };
	}

	private resizeTimedAcrossEdge(
		item: EventCalendarItem<TItemFields>,
		initialKind: Exclude<EventCalendarItemOperation, 'move'>,
		endpoint: Date
	): {
		operation: Exclude<EventCalendarItemOperation, 'move'>;
		item: EventCalendarItem<TItemFields>;
	} {
		if (item.allDay === true) return { operation: initialKind, item };
		const crossingBoundary = initialKind === 'resize-start' ? item.end : item.start;
		const endpointTime = endpoint.getTime();
		const crossingTime = crossingBoundary.getTime();
		const operation =
			endpointTime < crossingTime
				? 'resize-start'
				: endpointTime > crossingTime
					? 'resize-end'
					: initialKind;
		return {
			operation,
			item: replaceSchedule(item, {
				allDay: false,
				start: operation === 'resize-start' ? endpoint : item.start,
				end: operation === 'resize-end' ? endpoint : item.end
			})
		};
	}

	private getTimedTargetInstant(
		target: Extract<EventCalendarDropTarget, { allDay: false }>,
		pointerY: number
	): Date {
		if (!Number.isFinite(pointerY)) return new Date(target.start);
		const element = this.targetElements.get(target.key);
		const rect = element?.getBoundingClientRect();
		const ratio = rect
			? Math.min(1, Math.max(0, (pointerY - rect.top) / Math.max(1, rect.height)))
			: 0;
		const instant = new Date(
			target.start.getTime() + (target.end.getTime() - target.start.getTime()) * ratio
		);
		return snapInstant(instant, this.calendar.timeZone, this.calendar.snapDuration);
	}

	private beginSlotGesture(target: EventCalendarDropTarget, payload: PointerDragPayload): boolean {
		this.resetSinglePointerSlot();
		this.gestureBoundary = this.getBoundary();
		const anchor = this.slotFromTarget(target, payload.y);
		this.gesture = {
			kind: 'slot-create',
			source: 'drag-create',
			inputMode: 'pointer',
			anchor,
			slot: anchor,
			targetKey: target.key,
			isValid: false,
			reason: 'invalid-target',
			pointerX: payload.x,
			pointerY: payload.y
		};
		const reason = this.validateSlot(anchor);
		if (this.isGestureStale()) {
			this.cancel('stale');
			return false;
		}
		this.gesture = { ...this.gesture, isValid: reason === null, reason };
		this.startSlotAutoScroll();
		return true;
	}

	private updateSlotGesture(payload: PointerDragPayload): void {
		this.suppressSlotClick();
		this.updateSlotAtPointer(payload.x, payload.y);
	}

	private updateSlotAtPointer(pointerX: number, pointerY: number): void {
		const active = this.gesture;
		if (!active || active.kind !== 'slot-create') return;
		const target = this.getTargetAt(pointerX, pointerY);
		if (
			!target ||
			target.allDay !== active.anchor.allDay ||
			target.resourceId !== active.anchor.resourceId
		) {
			this.gesture = {
				...active,
				targetKey: null,
				isValid: false,
				reason: 'invalid-target',
				pointerX,
				pointerY
			};
			return;
		}
		const point = this.slotFromTarget(target, pointerY);
		const slot = mergeSlots(active.anchor, point);
		const reason = this.validateSlot(slot);
		this.gesture = {
			...active,
			slot,
			targetKey: target.key,
			isValid: reason === null,
			reason,
			pointerX,
			pointerY
		};
	}

	private finishSlotGesture(payload: PointerDragPayload): void {
		this.updateSlotGesture(payload);
		if (this.isGestureStale()) {
			this.cancel('stale');
			return;
		}
		const active = this.gesture;
		this.gesture = null;
		this.gestureBoundary = null;
		this.stopSlotAutoScroll();
		if (!active || active.kind !== 'slot-create') return;
		if (!active.isValid) {
			this.reportBlocked({
				reason: active.reason ?? 'invalid-target',
				source: active.source,
				slot: active.slot
			});
			return;
		}
		this.calendar.select({ kind: 'slot', itemKey: null, slot: active.slot });
		this.calendar.onSlotSelect?.(active.slot);
	}

	private slotFromDropTarget(target: EventCalendarDropTarget): EventCalendarSlot {
		return target.allDay
			? {
					view: target.view,
					allDay: true,
					start: target.day,
					end: addCivilDays(target.day, 1),
					resourceId: target.resourceId
				}
			: {
					view: target.view,
					allDay: false,
					start: new Date(target.start),
					end: new Date(target.end),
					resourceId: target.resourceId
				};
	}

	private slotFromTarget(target: EventCalendarDropTarget, pointerY: number): EventCalendarSlot {
		if (target.allDay) {
			return {
				view: target.view,
				allDay: true,
				start: target.day,
				end: addCivilDays(target.day, 1),
				resourceId: target.resourceId
			};
		}
		const minimumDuration = this.calendar.snapDuration * MINUTE_MS;
		const start = new Date(
			Math.max(
				target.start.getTime(),
				Math.min(
					this.getTimedTargetInstant(target, pointerY).getTime(),
					target.end.getTime() - minimumDuration
				)
			)
		);
		return {
			view: target.view,
			allDay: false,
			start,
			end: new Date(start.getTime() + minimumDuration),
			resourceId: target.resourceId
		};
	}

	private validateProposal(
		proposal: EventCalendarProposedUpdate<TItemFields>,
		ignoredSeriesId?: string,
		skipCustomPolicy = false
	): InvalidReason | null {
		const item = proposal.item;
		if (this.calendar.disabled || this.calendar.loading) return 'disabled';
		if (proposal.source !== 'api' && (item.display === 'background' || item.readOnly))
			return 'read-only';
		if (
			proposal.source !== 'api' &&
			this.calendar.resourceModel
				.resolveItemLeafIds(item)
				.some((resourceId) => this.calendar.resourceModel.isReadOnly(resourceId))
		) {
			return 'read-only';
		}
		if (!isValidPlacement(item, this.calendar.snapDuration)) return 'invalid-target';
		if (!this.isInsideValidRange(item)) return 'valid-range';
		if (this.calendar.constrainToBusinessHours && !this.isInsideBusinessHours(item))
			return 'business-hours';
		let areConflictsAllowed = true;
		for (const conflict of this.findConflicts(item, proposal.occurrence?.key, ignoredSeriesId)) {
			if (!this.allowsConflict({ kind: 'item', proposal, conflictingOccurrence: conflict })) {
				areConflictsAllowed = false;
			}
		}
		if (!areConflictsAllowed) return 'overlap';
		if (!skipCustomPolicy && this.calendar.canUpdateItem && !this.calendar.canUpdateItem(proposal))
			return 'custom-policy';
		return null;
	}

	private validateSlot(slot: EventCalendarSlot): InvalidReason | null {
		if (this.calendar.disabled || this.calendar.loading) return 'disabled';
		if (this.calendar.resourceModel.isReadOnly(slot.resourceId)) return 'read-only';
		if (!isValidSlot(slot, this.calendar.snapDuration)) return 'invalid-target';
		if (!this.isSlotInsideValidRange(slot)) return 'valid-range';
		if (this.calendar.constrainToBusinessHours && !this.isSlotInsideBusinessHours(slot))
			return 'business-hours';
		let areConflictsAllowed = true;
		for (const conflict of this.findSlotConflicts(slot)) {
			if (!this.allowsConflict({ kind: 'slot', slot, conflictingOccurrence: conflict })) {
				areConflictsAllowed = false;
			}
		}
		if (!areConflictsAllowed) return 'overlap';
		if (this.calendar.canSelectSlot && !this.calendar.canSelectSlot(slot)) return 'custom-policy';
		return null;
	}

	private commitProposal(
		initialProposal: EventCalendarProposedUpdate<TItemFields>,
		gestureBoundary?: readonly unknown[]
	): void {
		if (
			initialProposal.occurrence?.isRecurring ||
			initialProposal.occurrence?.item.recurringItemId !== undefined
		) {
			this.commitRecurrenceProposal(
				initialProposal,
				this.calendar.recurrenceEditScope,
				gestureBoundary
			);
			return;
		}
		const initialCandidate = this.getCandidateMutation(initialProposal);
		if (!initialCandidate) {
			this.reportStaleProposal(initialProposal, gestureBoundary);
			return;
		}
		this.calendar.validateCandidateItems(initialCandidate.committedItems);
		const initialReason = this.validateProposal(initialProposal);
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (initialReason) {
			this.reportBlocked({
				reason: initialReason,
				source: initialProposal.source,
				proposal: initialProposal
			});
			return;
		}
		const onItemUpdate = this.calendar.onItemUpdate;
		const updateResult = onItemUpdate?.(initialProposal);
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (updateResult === false) {
			this.reportBlocked({
				reason: 'custom-policy',
				source: initialProposal.source,
				proposal: initialProposal
			});
			return;
		}
		const adjustment = updateResult && typeof updateResult === 'object' ? updateResult : null;
		const isAdjusted = adjustment !== null;
		const proposal = adjustment
			? { ...initialProposal, item: this.applyAdjustment(initialProposal.item, adjustment) }
			: initialProposal;
		const candidate = this.getCandidateMutation(proposal);
		if (!candidate) {
			this.reportStaleProposal(proposal, gestureBoundary);
			return;
		}
		try {
			this.calendar.validateCandidateItems(candidate.committedItems);
		} catch (error) {
			if (!isAdjusted) throw error;
			const underlyingCode =
				error instanceof EventCalendarError ? error.code : 'structural-validation';
			throw new EventCalendarError(
				'invalid-adjustment',
				'onItemUpdate returned a structurally invalid adjustment.',
				{
					reason: underlyingCode,
					underlyingCode,
					underlyingMessage: error instanceof Error ? error.message : String(error),
					id: proposal.item.id
				}
			);
		}
		const finalReason = onItemUpdate ? this.validateProposal(proposal) : null;
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (finalReason) {
			if (isAdjusted) {
				throw new EventCalendarError(
					'invalid-adjustment',
					'onItemUpdate returned an invalid adjustment.',
					{ reason: finalReason, id: proposal.item.id }
				);
			}
			this.reportBlocked({ reason: finalReason, source: proposal.source, proposal });
			return;
		}
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		const kind =
			proposal.kind === 'move' ? 'move' : proposal.kind.startsWith('resize') ? 'resize' : 'update';
		this.commitCollection(
			candidate.committedItems,
			(revert) => ({
				kind,
				source: proposal.source,
				item: proposal.item,
				previousItem: proposal.previousItem,
				revert
			}),
			undefined,
			proposal.previousItem.recurrence === undefined ? undefined : proposal.previousItem.id
		);
	}

	private commitRecurrenceProposal(
		initialProposal: EventCalendarProposedUpdate<TItemFields>,
		scope: 'occurrence' | 'series' | 'disabled',
		gestureBoundary?: readonly unknown[]
	): void {
		if (scope === 'disabled') {
			this.reportBlocked({
				reason: 'disabled',
				source: initialProposal.source,
				proposal: initialProposal
			});
			return;
		}
		const mutationOptions = this.getRecurrenceMutationOptions(initialProposal, scope);
		const previousItems = mutationOptions.items;
		let mutation = createEventCalendarRecurrenceMutation(mutationOptions);
		this.calendar.validateCandidateItems(mutation.committedItems);
		let reason = this.validateRecurrenceMutation(mutation);
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (reason) {
			this.reportBlocked({ reason, source: initialProposal.source, proposal: mutation.proposal });
			return;
		}
		const updateResult = this.calendar.onItemUpdate?.(mutation.proposal);
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (this.calendar.items !== previousItems) {
			this.reportStaleProposal(mutation.proposal, gestureBoundary);
			return;
		}
		if (updateResult === false) {
			this.reportBlocked({
				reason: 'custom-policy',
				source: initialProposal.source,
				proposal: mutation.proposal
			});
			return;
		}
		const adjustment = updateResult && typeof updateResult === 'object' ? updateResult : null;
		if (adjustment) {
			const adjustedItem = this.applyAdjustment(mutation.proposal.item, adjustment);
			try {
				mutation =
					mutation.scope === 'series'
						? regenerateEventCalendarSeriesMutation(
								mutationOptions,
								adjustedItem,
								mutation.operation
							)
						: createEventCalendarRecurrenceMutation({
								...mutationOptions,
								exceptionId: mutation.exceptionId,
								proposal: { ...mutation.proposal, item: adjustedItem }
							});
				this.calendar.validateCandidateItems(mutation.committedItems);
				reason = this.validateRecurrenceMutation(mutation);
			} catch (error) {
				throw this.invalidAdjustmentError(error, adjustedItem.id);
			}
			if (reason) {
				throw new EventCalendarError(
					'invalid-adjustment',
					'onItemUpdate returned an invalid recurring adjustment.',
					{ reason, id: adjustedItem.id }
				);
			}
		}
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		if (this.calendar.items !== previousItems) {
			this.reportStaleProposal(mutation.proposal, gestureBoundary);
			return;
		}
		this.commitCollection(
			mutation.committedItems,
			(revert) =>
				mutation.scope === 'series'
					? {
							kind: 'recurrence-series-update',
							source: initialProposal.source,
							operation: mutation.operation,
							seriesItem: mutation.seriesItem,
							previousSeriesItem: mutation.previousSeriesItem,
							exceptionItems: mutation.exceptionItems,
							previousExceptionItems: mutation.previousExceptionItems,
							revert
						}
					: mutation.previousItem
						? {
								kind: 'recurrence-exception-update',
								source: initialProposal.source,
								seriesItem: mutation.seriesItem,
								item: mutation.item,
								previousItem: mutation.previousItem,
								revert
							}
						: {
								kind: 'recurrence-exception-add',
								source: initialProposal.source,
								seriesItem: mutation.seriesItem,
								item: mutation.item,
								revert
							},
			mutation.scope === 'series'
				? {
						forward: mutation.remapOccurrenceKey,
						backward: mutation.restoreOccurrenceKey
					}
				: undefined
		);
	}

	private getRecurrenceMutationOptions(
		proposal: EventCalendarProposedUpdate<TItemFields>,
		scope: 'occurrence' | 'series'
	): CreateRecurrenceMutationOptions<TItemFields> {
		return {
			items: this.calendar.items,
			proposal,
			scope,
			displayTimeZone: this.calendar.timeZone,
			maintainDurationOnAllDayChange: this.calendar.interactions.maintainDurationOnAllDayChange,
			defaultTimedItemDuration: this.calendar.defaultTimedItemDuration,
			defaultAllDayItemDuration: this.calendar.defaultAllDayItemDuration,
			getOccurrenceExceptionId: this.calendar.getOccurrenceExceptionId
		};
	}

	private validateRecurrenceMutation(
		mutation: EventCalendarRecurrenceMutation<TItemFields>
	): InvalidReason | null {
		if (mutation.scope === 'occurrence') {
			return this.validateProposal(mutation.proposal);
		}
		const seriesId = mutation.previousSeriesItem.id;
		const interactionReason = this.validateProposal(mutation.interactedProposal, seriesId, true);
		if (interactionReason) return interactionReason;
		const occurrences = this.calendar.getCandidateOccurrences(mutation.committedItems);
		const seriesOccurrences = occurrences.filter(
			(occurrence) => getOccurrenceSeriesId(occurrence) === seriesId
		);
		for (const occurrence of seriesOccurrences) {
			const item = this.getOccurrencePlacementItem(occurrence);
			if (!isValidPlacement(item, this.calendar.snapDuration)) return 'invalid-target';
			if (!this.isInsideValidRange(item)) return 'valid-range';
			if (this.calendar.constrainToBusinessHours && !this.isInsideBusinessHours(item)) {
				return 'business-hours';
			}
			const proposal: EventCalendarProposedUpdate<TItemFields> = {
				...mutation.proposal,
				occurrence,
				item
			};
			for (const conflict of occurrences) {
				if (
					conflict.key === occurrence.key ||
					conflict.item.display === 'background' ||
					!this.itemsShareResource(conflict.item, item) ||
					!rangesIntersect(
						{ start: occurrence.start, end: occurrence.end },
						{ start: conflict.start, end: conflict.end }
					)
				)
					continue;
				if (!this.allowsConflict({ kind: 'item', proposal, conflictingOccurrence: conflict })) {
					return 'overlap';
				}
			}
		}
		if (this.calendar.canUpdateItem && !this.calendar.canUpdateItem(mutation.proposal)) {
			return 'custom-policy';
		}
		return null;
	}

	private invalidAdjustmentError(error: unknown, id: string): EventCalendarError {
		if (error instanceof EventCalendarError && error.code === 'invalid-adjustment') return error;
		return new EventCalendarError(
			'invalid-adjustment',
			'onItemUpdate returned a structurally invalid recurring adjustment.',
			{
				id,
				underlyingCode: error instanceof EventCalendarError ? error.code : 'structural-validation',
				underlyingMessage: error instanceof Error ? error.message : String(error)
			}
		);
	}

	private getCandidateMutation(proposal: EventCalendarProposedUpdate<TItemFields>): {
		committedItems: EventCalendarItem<TItemFields>[];
	} | null {
		const previousItems = this.calendar.items;
		const itemIndex = previousItems.findIndex((item) => item.id === proposal.previousItem.id);
		if (itemIndex < 0 || previousItems[itemIndex] !== proposal.previousItem) return null;
		return {
			committedItems: previousItems.map((item, index) =>
				index === itemIndex ? proposal.item : item
			)
		};
	}

	private applyAdjustment(
		item: EventCalendarItem<TItemFields>,
		adjustment: EventCalendarUpdateAdjustment
	): EventCalendarItem<TItemFields> {
		const allDay = adjustment.allDay ?? item.allDay === true;
		const start = adjustment.start ?? item.start;
		const end = adjustment.end ?? item.end;
		const adjusted = replacePlacement(item, { allDay, start, end });
		if (adjustment.resourceId !== undefined && adjustment.resourceIds !== undefined) {
			throw new EventCalendarError(
				'invalid-adjustment',
				'An adjustment cannot define both resourceId and resourceIds.'
			);
		}
		if (adjustment.resourceIds !== undefined) {
			return setEventCalendarResourceIds(adjusted, adjustment.resourceIds ?? []);
		}
		if (adjustment.resourceId === null) {
			return setEventCalendarResourceIds(adjusted, []);
		}
		return adjustment.resourceId === undefined
			? adjusted
			: setEventCalendarResourceIds(adjusted, [adjustment.resourceId]);
	}

	private getOccurrencePlacementItem(
		occurrence: EventCalendarOccurrence<TItemFields>
	): EventCalendarItem<TItemFields> {
		return replacePlacement(occurrence.item, {
			allDay: occurrence.allDay,
			start: occurrence.allDay
				? getZonedDay(occurrence.start, this.calendar.timeZone)
				: new Date(occurrence.start),
			end: occurrence.allDay
				? getZonedDay(occurrence.end, this.calendar.timeZone)
				: new Date(occurrence.end)
		});
	}

	private getConversionDurationTimeZone(occurrence: EventCalendarOccurrence<TItemFields>): string {
		const seriesId = getOccurrenceSeriesId(occurrence);
		if (!seriesId) return this.calendar.timeZone;
		const seriesItem = this.calendar.items.find((item) => item.id === seriesId);
		if (
			!seriesItem ||
			seriesItem.recurrence === undefined ||
			seriesItem.recurringItemId !== undefined
		) {
			throw new EventCalendarError(
				'invalid-recurrence',
				'The occurrence has no bound recurring source.',
				{ key: occurrence.key, seriesId }
			);
		}
		if (seriesItem.allDay === true) return this.calendar.timeZone;
		if (typeof seriesItem.recurrenceTimeZone !== 'string') {
			throw new EventCalendarError(
				'invalid-recurrence',
				'A timed recurring source requires recurrenceTimeZone.',
				{ key: occurrence.key, seriesId }
			);
		}
		return seriesItem.recurrenceTimeZone;
	}

	private validateAssistedProposal(
		gesture: EventCalendarItemGesture<TItemFields>,
		proposal: EventCalendarProposedUpdate<TItemFields>
	): InvalidReason | null {
		const baseline = this.getOccurrencePlacementItem(gesture.occurrence);
		if (this.hasSamePlacement(baseline, proposal.item)) return 'invalid-target';
		return this.validateProposal(proposal);
	}

	private hasSamePlacement(
		baseline: EventCalendarItem<TItemFields>,
		candidate: EventCalendarItem<TItemFields>
	): boolean {
		return (
			(baseline.allDay === true) === (candidate.allDay === true) &&
			isSameEndpoint(baseline.start, candidate.start) &&
			isSameEndpoint(baseline.end, candidate.end) &&
			areStringArraysEqual(
				this.calendar.resourceModel.resolveItemLeafIds(baseline),
				this.calendar.resourceModel.resolveItemLeafIds(candidate)
			)
		);
	}

	private commitCollection(
		items: EventCalendarItem<TItemFields>[],
		createChange: (revert: () => void) => EventCalendarChange<TItemFields>,
		keyRemap?: {
			forward: (key: string) => string;
			backward: (key: string) => string;
		},
		clearMissingRecurringSeriesId?: string
	): void {
		const previousItems = this.calendar.items;
		this.calendar.items = items;
		const publishedItems = this.calendar.items;
		const selectionTransaction = keyRemap
			? this.calendar.applyOccurrenceKeyRemap(keyRemap.forward)
			: clearMissingRecurringSeriesId
				? this.calendar.clearMissingRecurringSelection(
						publishedItems,
						clearMissingRecurringSeriesId
					)
				: null;
		let committedStatus: {
			source: EventCalendarMutationSource;
			item?: EventCalendarItem<TItemFields>;
		} | null = null;
		let wasReverted = false;
		let historyEntry: EventCalendarHistoryEntry<TItemFields> | null = null;
		const revert = this.createRevert(
			previousItems,
			publishedItems,
			selectionTransaction,
			keyRemap?.backward,
			() => {
				if (!committedStatus) {
					throw new EventCalendarError(
						'stale-transaction',
						'This EventCalendar transaction was not published before revert.'
					);
				}
				wasReverted = true;
				if (historyEntry) {
					const index = this.historyPast.lastIndexOf(historyEntry);
					if (index >= 0) {
						this.historyPast.splice(index, 1);
						this.historyRevision += 1;
					}
				}
				this.calendar.onInteractionStatus?.({
					type: 'revert',
					...committedStatus
				});
			}
		);
		const change = createChange(revert);
		const statusItem = getChangeStatusItem(change);
		committedStatus = {
			source: change.source,
			item: statusItem
		};
		this.calendar.onItemsChange?.(publishedItems, change);
		if (!wasReverted) {
			historyEntry = this.recordHistory(previousItems, publishedItems);
			this.calendar.onInteractionStatus?.({
				type: 'commit',
				source: change.source,
				item: statusItem
			});
		}
		if (
			selectionTransaction &&
			this.calendar.hasSelection(selectionTransaction.committedSelection)
		) {
			this.calendar.notifySelectionChange(selectionTransaction.committedSelection);
		}
	}

	private recordHistory(
		before: EventCalendarItem<TItemFields>[],
		after: EventCalendarItem<TItemFields>[]
	): EventCalendarHistoryEntry<TItemFields> | null {
		const limit = this.calendar.historyLimit;
		if (limit === 0) return null;
		const beforeSignature = getItemCollectionSignature(before);
		const afterSignature = getItemCollectionSignature(after);
		if (beforeSignature === afterSignature) return null;
		const entry = { before, after, beforeSignature, afterSignature };
		this.historyPast.push(entry);
		if (this.historyPast.length > limit)
			this.historyPast.splice(0, this.historyPast.length - limit);
		this.historyFuture = [];
		this.historyRevision += 1;
		return entry;
	}

	private commitHistory(
		entry: EventCalendarHistoryEntry<TItemFields>,
		direction: 'undo' | 'redo'
	): boolean {
		const from = direction === 'undo' ? entry.after : entry.before;
		const to = direction === 'undo' ? entry.before : entry.after;
		const fromSignature = direction === 'undo' ? entry.afterSignature : entry.beforeSignature;
		if (getItemCollectionSignature(this.calendar.items) !== fromSignature) return false;
		this.calendar.validateCandidateItems(to);
		this.calendar.items = to;
		let wasReverted = false;
		const revert = this.createRevert(from, to, null, undefined, () => {
			wasReverted = true;
			if (direction === 'undo' && this.historyFuture.at(-1) === entry) {
				this.historyFuture.pop();
				this.historyPast.push(entry);
			} else if (direction === 'redo' && this.historyPast.at(-1) === entry) {
				this.historyPast.pop();
				this.historyFuture.push(entry);
			}
			this.historyRevision += 1;
			this.calendar.onInteractionStatus?.({ type: 'revert', source: 'history' });
		});
		this.calendar.onItemsChange?.(to, { kind: 'history', source: 'history', direction, revert });
		if (wasReverted) return false;
		this.calendar.onInteractionStatus?.({ type: 'commit', source: 'history' });
		return true;
	}

	private createRevert(
		previousItems: EventCalendarItem<TItemFields>[],
		committedItems: EventCalendarItem<TItemFields>[],
		selectionTransaction: {
			previousSelection: EventCalendarSelection;
			committedSelection: EventCalendarSelection;
		} | null = null,
		restoreOccurrenceKey?: (key: string) => string,
		onRevert?: () => void
	): () => void {
		let isConsumed = false;
		const committedSignature = getItemCollectionSignature(committedItems);
		return () => {
			if (
				isConsumed ||
				getItemCollectionSignature(this.calendar.items) !== committedSignature ||
				(selectionTransaction !== null &&
					!this.calendar.hasSelection(selectionTransaction.committedSelection))
			) {
				throw new EventCalendarError(
					'stale-transaction',
					'This EventCalendar transaction can no longer be reverted.'
				);
			}
			isConsumed = true;
			this.calendar.items = previousItems;
			if (selectionTransaction || restoreOccurrenceKey) {
				this.calendar.restoreOccurrenceKeyRemap(selectionTransaction, restoreOccurrenceKey);
			}
			onRevert?.();
		};
	}

	private isInsideValidRange(item: EventCalendarItem<TItemFields>): boolean {
		if (!this.calendar.validRange) return true;
		const range = itemRange(item, this.calendar.timeZone);
		return (
			range.start >= this.calendar.validRange.start && range.end <= this.calendar.validRange.end
		);
	}

	private isSlotInsideValidRange(slot: EventCalendarSlot): boolean {
		if (!this.calendar.validRange) return true;
		const range = slotRange(slot, this.calendar.timeZone);
		return (
			range.start >= this.calendar.validRange.start && range.end <= this.calendar.validRange.end
		);
	}

	private isInsideBusinessHours(item: EventCalendarItem<TItemFields>): boolean {
		const range = itemRange(item, this.calendar.timeZone);
		const resourceIds = this.calendar.resourceModel.resolveItemLeafIds(item);
		if (resourceIds.length === 0) {
			return isRangeInsideBusinessHours(range, item.allDay === true, this.calendar);
		}
		return resourceIds.every((resourceId) =>
			isRangeInsideBusinessHours(
				range,
				item.allDay === true,
				this.calendar,
				this.calendar.resourceModel.getBusinessHours(resourceId) ?? this.calendar.businessHours
			)
		);
	}

	private isSlotInsideBusinessHours(slot: EventCalendarSlot): boolean {
		return isRangeInsideBusinessHours(
			slotRange(slot, this.calendar.timeZone),
			slot.allDay,
			this.calendar,
			this.calendar.resourceModel.getBusinessHours(slot.resourceId) ?? this.calendar.businessHours
		);
	}

	private findConflicts(
		item: EventCalendarItem<TItemFields>,
		ignoredOccurrenceKey?: string,
		ignoredSeriesId?: string
	) {
		if (item.display === 'background') return [];
		const range = itemRange(item, this.calendar.timeZone);
		return this.calendar.itemIndex.occurrences.filter(
			(occurrence) =>
				occurrence.key !== ignoredOccurrenceKey &&
				getOccurrenceSeriesId(occurrence) !== ignoredSeriesId &&
				occurrence.item.id !== item.id &&
				occurrence.item.display !== 'background' &&
				this.itemsShareResource(occurrence.item, item) &&
				rangesIntersect(range, { start: occurrence.start, end: occurrence.end })
		);
	}

	private findSlotConflicts(slot: EventCalendarSlot) {
		const range = slotRange(slot, this.calendar.timeZone);
		return this.calendar.itemIndex.occurrences.filter(
			(occurrence) =>
				occurrence.item.display !== 'background' &&
				(slot.view !== 'resource' || this.itemUsesResource(occurrence.item, slot.resourceId)) &&
				rangesIntersect(range, { start: occurrence.start, end: occurrence.end })
		);
	}

	private itemUsesResource(item: EventCalendarItem<TItemFields>, resourceId?: string): boolean {
		const ids = this.calendar.resourceModel.resolveItemLeafIds(item);
		return resourceId === undefined ? ids.length === 0 : ids.includes(resourceId);
	}

	private itemsShareResource(
		left: EventCalendarItem<TItemFields>,
		right: EventCalendarItem<TItemFields>
	): boolean {
		const leftIds = this.calendar.resourceModel.resolveItemLeafIds(left);
		const rightIds = this.calendar.resourceModel.resolveItemLeafIds(right);
		if (leftIds.length === 0 || rightIds.length === 0) return leftIds.length === rightIds.length;
		return leftIds.some((resourceId) => rightIds.includes(resourceId));
	}

	private allowsConflict(
		info: Parameters<Exclude<typeof this.calendar.allowOverlap, boolean>>[0]
	): boolean {
		if (this.calendar.allowOverlap === true) return true;
		if (this.calendar.allowOverlap === false) return false;
		return this.calendar.allowOverlap(info);
	}

	private blockDisabledApiMutation(): boolean {
		if (!this.calendar.disabled) return false;
		this.reportBlocked({ reason: 'disabled', source: 'api' });
		return true;
	}

	private canBeginItemGesture(
		occurrence: EventCalendarOccurrence<TItemFields>,
		operation: EventCalendarItemOperation
	): boolean {
		const item = occurrence.item;
		if (
			this.calendar.disabled ||
			this.calendar.loading ||
			item.display === 'background' ||
			item.readOnly ||
			this.calendar.resourceModel
				.resolveItemLeafIds(item)
				.some((resourceId) => this.calendar.resourceModel.isReadOnly(resourceId))
		)
			return false;
		if (
			(occurrence.isRecurring || item.recurringItemId !== undefined) &&
			this.calendar.recurrenceEditScope === 'disabled'
		)
			return false;
		if (operation === 'move') return this.calendar.interactions.drag && item.draggable !== false;
		return this.calendar.interactions.resize && item.resizable !== false;
	}

	private applyAssistedStep(
		item: EventCalendarItem<TItemFields>,
		operation: EventCalendarItemOperation,
		step: EventCalendarAssistedStep,
		sourceResourceId?: string
	): EventCalendarItem<TItemFields> {
		let next = item;
		const dayDelta = step.dayDelta ?? 0;
		const minuteDelta = step.minuteDelta ?? 0;
		const shouldShiftStart = operation !== 'resize-end';
		const shouldShiftEnd = operation !== 'resize-start';
		if (next.allDay === true) {
			next = replacePlacement(next, {
				allDay: true,
				start: shouldShiftStart ? addCivilDays(next.start, dayDelta) : next.start,
				end: shouldShiftEnd ? addCivilDays(next.end, dayDelta) : next.end
			});
		} else {
			if (operation === 'move') {
				const duration = next.end.getTime() - next.start.getTime();
				const start = this.shiftTimedEndpoint(next.start, dayDelta, minuteDelta);
				next = replacePlacement(next, {
					allDay: false,
					start,
					end: new Date(start.getTime() + duration)
				});
			} else {
				next = replacePlacement(next, {
					allDay: false,
					start: shouldShiftStart
						? this.shiftTimedEndpoint(next.start, dayDelta, minuteDelta)
						: next.start,
					end: shouldShiftEnd ? this.shiftTimedEndpoint(next.end, dayDelta, minuteDelta) : next.end
				});
			}
		}
		if (operation !== 'move' || !step.resourceDirection) return next;
		const columns = this.calendar.resourceModel.columns;
		const currentId =
			this.calendar.resourceModel.resolveLeafId(sourceResourceId) ??
			this.calendar.resourceModel.resolveItemLeafIds(next)[0];
		const currentIndex = columns.findIndex((column) => column.resourceId === currentId);
		const target = columns[currentIndex + step.resourceDirection];
		if (!target) return next;
		return replaceEventCalendarResourceAssignment(next, currentId, target.resourceId);
	}

	private getAssistedResourceTarget(
		item: EventCalendarItem<TItemFields>,
		sourceResourceId: string | undefined,
		direction: -1 | 1
	): { resourceId: string | undefined } | null {
		const columns = this.calendar.resourceModel.columns;
		const currentId =
			this.calendar.resourceModel.resolveLeafId(sourceResourceId) ??
			this.calendar.resourceModel.resolveItemLeafIds(item)[0];
		const currentIndex = columns.findIndex((column) => column.resourceId === currentId);
		const target = columns[currentIndex + direction];
		return target ? { resourceId: target.resourceId } : null;
	}

	private shiftTimedEndpoint(endpoint: Date, dayDelta: number, minuteDelta: number): Date {
		const shifted = new Date(endpoint.getTime() + minuteDelta * MINUTE_MS);
		if (dayDelta === 0) return shifted;
		return resolveZonedMinutesOnDay(
			addCivilDays(getZonedDay(shifted, this.calendar.timeZone), dayDelta),
			getWallMinutes(shifted, this.calendar.timeZone),
			this.calendar.timeZone
		);
	}

	private publishProposal(gesture: EventCalendarItemGesture<TItemFields>): void {
		const statusKey = this.getProposalStatusKey(gesture);
		if (statusKey === this.lastPublishedProposalKey) return;
		this.lastPublishedProposalKey = statusKey;
		if (!gesture.proposal || !gesture.isValid) {
			this.calendar.onInteractionStatus?.({
				type: 'invalid',
				source: gesture.source,
				reason: gesture.reason ?? 'invalid-target',
				proposal: gesture.proposal ?? undefined
			});
			return;
		}
		this.calendar.onInteractionStatus?.({
			type: 'proposal',
			source: gesture.source,
			operation: gesture.kind,
			occurrence: gesture.occurrence,
			proposal: gesture.proposal
		});
	}

	private getProposalStatusKey(gesture: EventCalendarItemGesture<TItemFields>): string {
		if (!gesture.proposal || !gesture.isValid) {
			return `invalid:${gesture.reason ?? 'invalid-target'}`;
		}
		const item = gesture.proposal.item;
		return [
			'proposal',
			gesture.kind,
			item.allDay === true ? 'all-day' : 'timed',
			getEndpointKey(item.start),
			getEndpointKey(item.end),
			this.calendar.resourceModel.resolveItemLeafIds(item).join(',') || 'unassigned'
		].join(':');
	}

	private operationSource(operation: EventCalendarItemOperation): EventCalendarMutationSource {
		return operation === 'move' ? 'drag' : operation;
	}

	private readSource(data: Record<string, unknown>): DragSource | null {
		if (data.mark !== SOURCE_MARK || data.calendarInstanceId !== this.instanceId) return null;
		if (typeof data.occurrenceKey !== 'string') return null;
		if (
			data.operation !== 'move' &&
			data.operation !== 'resize-start' &&
			data.operation !== 'resize-end'
		)
			return null;
		return {
			calendarInstanceId: this.instanceId,
			occurrenceKey: data.occurrenceKey,
			operation: data.operation,
			grabOffsetMs: typeof data.grabOffsetMs === 'number' ? data.grabOffsetMs : 0,
			grabOffsetDays: typeof data.grabOffsetDays === 'number' ? data.grabOffsetDays : 0,
			sourceWidth: readPositiveNumber(data.sourceWidth, 1),
			sourceHeight: readPositiveNumber(data.sourceHeight, 1),
			sourceMinHeight: readPositiveNumber(data.sourceMinHeight, 0),
			isOverflowSource: data.isOverflowSource === true,
			view: isEventCalendarView(data.view) ? data.view : this.calendar.view,
			...(typeof data.sourceResourceId === 'string'
				? { sourceResourceId: data.sourceResourceId }
				: {})
		};
	}

	private readTarget(
		dropTargets: ElementEventPayloadMap['onDrag']['location']['current']['dropTargets']
	): EventCalendarDropTarget | null {
		for (const record of dropTargets) {
			if (record.data.mark !== SOURCE_MARK || record.data.calendarInstanceId !== this.instanceId)
				continue;
			const target = deserializeTarget(record.data.target);
			if (target) return target;
		}
		return null;
	}

	private getTimedDropIndicatorRect(
		gesture: EventCalendarItemGesture<TItemFields>,
		target: Extract<EventCalendarDropTarget, { allDay: false }>,
		element: HTMLElement
	): EventCalendarDropIndicatorRect | null {
		const item = gesture.proposal?.item;
		if (!item || item.allDay === true) return null;
		const rect = element.getBoundingClientRect();
		const slotDuration = target.end.getTime() - target.start.getTime();
		const proposalDuration = item.end.getTime() - item.start.getTime();
		if (slotDuration <= 0 || proposalDuration <= 0 || rect.height <= 0 || rect.width <= 0) {
			return null;
		}
		const pixelsPerMillisecond = rect.height / slotDuration;
		const top = rect.top + (item.start.getTime() - target.start.getTime()) * pixelsPerMillisecond;
		const height = Math.max(
			gesture.sourceMinHeight ?? 0,
			proposalDuration * pixelsPerMillisecond,
			2
		);
		const width = Math.max(2, rect.width - 4);
		return {
			left: rect.left + (rect.width - width) / 2,
			top,
			width,
			height
		};
	}

	private getAllDayDropIndicatorRect(
		gesture: EventCalendarItemGesture<TItemFields>,
		target: Extract<EventCalendarDropTarget, { allDay: true }>,
		fallbackElement: HTMLElement
	): EventCalendarDropIndicatorRect | null {
		const item = gesture.proposal?.item;
		if (!item || (item.allDay !== true && target.view !== 'month')) return null;
		const anchorDay =
			item.allDay === true ? item.start : getZonedDay(item.start, this.calendar.timeZone);
		const anchorElement = this.findAllDayTargetElement(
			target.view,
			anchorDay,
			gesture.sourceResourceId ?? this.calendar.resourceModel.resolveItemLeafIds(item)[0]
		);
		const element = anchorElement ?? fallbackElement;
		const rect = element.getBoundingClientRect();
		if (rect.height <= 0 || rect.width <= 0) return null;
		const parentRect = element.parentElement?.getBoundingClientRect() ?? rect;
		const dayCount =
			item.allDay === true
				? Math.max(1, civilDayDifference(item.start, item.end))
				: touchedInstantDayCount(item.start, item.end, this.calendar.timeZone);
		const proposedWidth = Math.max(2, dayCount * rect.width - 4);
		const sourceWidth = gesture.sourceWidth ?? proposedWidth;
		const shouldPreserveSourceWidth = gesture.kind === 'move';
		const inlineInset = target.view === 'month' ? 6 : 2;
		const availableWidth = Math.max(2, parentRect.width - inlineInset * 2);
		const width = Math.min(shouldPreserveSourceWidth ? sourceWidth : proposedWidth, availableWidth);
		const height = Math.min(
			Math.max(2, gesture.sourceHeight ?? gesture.sourceMinHeight ?? 24),
			Math.max(2, rect.height - 4)
		);
		const logicalStart =
			this.calendar.direction === 'rtl'
				? rect.right - width - inlineInset
				: rect.left + inlineInset;
		const minimumLeft = parentRect.left + inlineInset;
		const maximumLeft = Math.max(minimumLeft, parentRect.right - width - inlineInset);
		const topOffset =
			target.view === 'month' ? Math.min(28, Math.max(2, rect.height - height - 2)) : 2;
		return {
			left: Math.min(maximumLeft, Math.max(minimumLeft, logicalStart)),
			top: rect.top + topOffset,
			width,
			height
		};
	}

	private clipDropIndicatorRect(
		rect: EventCalendarDropIndicatorRect,
		targetElement: HTMLElement
	): EventCalendarDropIndicatorRect | null {
		const root = targetElement.closest<HTMLElement>('[data-event-calendar-part="root"]');
		if (!root) return rect;
		const rootRect = root.getBoundingClientRect();
		const clipLeft = rootRect.left + root.clientLeft;
		const clipTop = rootRect.top + root.clientTop;
		const clipRight = clipLeft + root.clientWidth;
		const clipBottom = clipTop + root.clientHeight;
		const left = Math.max(rect.left, clipLeft);
		const top = Math.max(rect.top, clipTop);
		const right = Math.min(rect.left + rect.width, clipRight);
		const bottom = Math.min(rect.top + rect.height, clipBottom);
		if (right <= left || bottom <= top) return null;
		return { left, top, width: right - left, height: bottom - top };
	}

	private findAllDayTargetElement(
		view: EventCalendarView,
		day: EventCalendarDateOnly,
		resourceId?: string
	): HTMLElement | null {
		for (const element of this.targetElements.values()) {
			if (!element.isConnected) continue;
			const target = this.readElementTarget(element);
			if (
				target?.allDay &&
				target.view === view &&
				target.day === day &&
				(view !== 'resource' || target.resourceId === resourceId)
			) {
				return element;
			}
		}
		return null;
	}

	private readElementTarget(element: HTMLElement): EventCalendarDropTarget | null {
		const encoded = element.dataset.eventCalendarTarget;
		if (!encoded) return null;
		try {
			return deserializeTarget(JSON.parse(encoded));
		} catch {
			return null;
		}
	}

	private getTargetAt(x: number, y: number): EventCalendarDropTarget | null {
		for (const hit of document.elementsFromPoint(x, y)) {
			if (!(hit instanceof HTMLElement) || !hit.matches('[data-event-calendar-target]')) continue;
			const element = hit;
			if (element.dataset.calendarInstanceId !== this.instanceId) continue;
			const rect = element.getBoundingClientRect();
			if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;
			const target = this.readElementTarget(element);
			if (target) return target;
		}
		return null;
	}

	private getBoundary(): readonly unknown[] {
		return [
			this.calendar.items,
			this.calendar.resources,
			this.calendar.view,
			this.calendar.date,
			this.calendar.dayCount,
			this.calendar.timeZone,
			this.calendar.locale,
			this.calendar.weekStartsOn,
			this.calendar.fixedWeeks,
			this.calendar.showOutsideDays,
			this.calendar.showWeekends,
			this.calendar.weekendDays,
			this.calendar.agendaDayCount,
			this.calendar.validRange,
			this.calendar.dayStartHour,
			this.calendar.dayEndHour,
			this.calendar.interval,
			this.calendar.slotDuration,
			this.calendar.snapDuration,
			this.calendar.defaultTimedItemDuration,
			this.calendar.defaultAllDayItemDuration,
			this.calendar.createActivation,
			this.calendar.businessHours,
			this.calendar.loading,
			this.calendar.disabled,
			this.calendar.interactions,
			this.calendar.allowOverlap,
			this.calendar.constrainToBusinessHours,
			this.calendar.canUpdateItem,
			this.calendar.canSelectSlot,
			this.calendar.onItemUpdate,
			this.calendar.recurrenceEditScope,
			this.calendar.getOccurrenceExceptionId,
			this.calendar.expandRecurrence,
			this.calendar.direction
		];
	}

	private hasBoundaryChanged(boundary: readonly unknown[], next = this.getBoundary()): boolean {
		return boundary.some((value, index) => value !== next[index]);
	}

	private isGestureStale(): boolean {
		return this.gestureBoundary !== null && this.hasBoundaryChanged(this.gestureBoundary);
	}

	private cancelStaleGesture(boundary: readonly unknown[]): boolean {
		if (!this.hasBoundaryChanged(boundary)) return false;
		if (this.gesture && this.gestureBoundary === boundary) this.cancel('stale');
		return true;
	}

	private reportStaleProposal(
		proposal: EventCalendarProposedUpdate<TItemFields>,
		gestureBoundary?: readonly unknown[]
	): void {
		if (gestureBoundary && this.cancelStaleGesture(gestureBoundary)) return;
		this.reportBlocked({ reason: 'stale', source: proposal.source, proposal });
	}

	private reportBlocked(info: EventCalendarInteractionBlockedInfo<TItemFields>): void {
		this.calendar.onInteractionBlocked?.(info);
		this.calendar.onInteractionStatus?.({
			type: 'invalid',
			source: info.source,
			reason: info.reason,
			proposal: info.proposal
		});
	}

	private suppressClick(key: string): void {
		this.suppressedClickKey = key;
		window.setTimeout(() => {
			if (this.suppressedClickKey === key) this.suppressedClickKey = null;
		}, 0);
	}

	private suppressSlotClick(): void {
		this.isSlotClickSuppressed = true;
		window.setTimeout(() => {
			this.isSlotClickSuppressed = false;
		}, 0);
	}

	private cancelItemDragFrame(): void {
		if (this.itemDragFrame !== null) cancelAnimationFrame(this.itemDragFrame);
		this.itemDragFrame = null;
		this.pendingItemDrag = null;
	}

	private startSlotAutoScroll(): void {
		if (this.slotScrollFrame !== null) return;
		const tick = () => {
			this.slotScrollFrame = null;
			const active = this.gesture;
			if (!active || active.kind !== 'slot-create') return;
			const scroller =
				this.slotScrollMode === 'page' ? document.scrollingElement : this.slotScrollElement;
			if (!scroller) return;
			const rect =
				this.slotScrollMode === 'page'
					? { top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0 }
					: (scroller as HTMLElement).getBoundingClientRect();
			const topDistance = active.pointerY - rect.top;
			const bottomDistance = rect.bottom - active.pointerY;
			const leftDistance = active.pointerX - rect.left;
			const rightDistance = rect.right - active.pointerX;
			const verticalDelta =
				topDistance < EDGE_SCROLL_DISTANCE
					? -edgeScrollDelta(topDistance)
					: bottomDistance < EDGE_SCROLL_DISTANCE
						? edgeScrollDelta(bottomDistance)
						: 0;
			const horizontalDelta =
				leftDistance < EDGE_SCROLL_DISTANCE
					? -edgeScrollDelta(leftDistance)
					: rightDistance < EDGE_SCROLL_DISTANCE
						? edgeScrollDelta(rightDistance)
						: 0;
			if (verticalDelta !== 0 || horizontalDelta !== 0) {
				const previousScrollTop = scroller.scrollTop;
				const previousScrollLeft = scroller.scrollLeft;
				scroller.scrollTop += verticalDelta;
				scroller.scrollLeft += horizontalDelta;
				if (
					scroller.scrollTop !== previousScrollTop ||
					scroller.scrollLeft !== previousScrollLeft
				) {
					this.updateSlotAtPointer(active.pointerX, active.pointerY);
				}
			}
			this.slotScrollFrame = requestAnimationFrame(tick);
		};
		this.slotScrollFrame = requestAnimationFrame(tick);
	}

	private stopSlotAutoScroll(): void {
		if (this.slotScrollFrame === null) return;
		cancelAnimationFrame(this.slotScrollFrame);
		this.slotScrollFrame = null;
	}

	private missingTarget(kind: string, value: string): never {
		throw new EventCalendarError('missing-target', `Unknown EventCalendar ${kind}: ${value}.`, {
			kind,
			value
		});
	}
}

export function serializeEventCalendarTarget(target: EventCalendarDropTarget): string {
	return JSON.stringify({
		...target,
		...(target.allDay ? {} : { start: target.start.toISOString(), end: target.end.toISOString() })
	});
}

function readPositiveNumber(value: unknown, fallback: number): number {
	return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : fallback;
}

function deserializeTarget(value: unknown): EventCalendarDropTarget | null {
	if (!isRecord(value)) return null;
	if (typeof value.key !== 'string' || !isEventCalendarView(value.view)) return null;
	if (value.resourceId !== undefined && typeof value.resourceId !== 'string') return null;
	const resourceId = typeof value.resourceId === 'string' ? value.resourceId : undefined;
	if (value.allDay === true) {
		try {
			assertRenderableDateOnly(value.day, 'dropTarget.day');
		} catch (error) {
			if (error instanceof EventCalendarError) return null;
			throw error;
		}
		return {
			key: value.key,
			view: value.view,
			allDay: true,
			day: value.day,
			...(resourceId === undefined ? {} : { resourceId })
		};
	}
	if (value.allDay !== false) return null;
	const start = toValidTargetInstant(value.start);
	const end = toValidTargetInstant(value.end);
	if (!start || !end || end <= start) return null;
	return {
		key: value.key,
		view: value.view,
		allDay: false,
		start,
		end,
		...(resourceId === undefined ? {} : { resourceId })
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getItemCollectionSignature<TItemFields extends object>(
	items: readonly EventCalendarItem<TItemFields>[]
): string {
	return getCalendarValueSignature(items, new Map<object, number>());
}

function getCalendarValueSignature(value: unknown, seen: Map<object, number>): string {
	if (value === null) return 'null';
	if (value instanceof Date) return `date:${value.toISOString()}`;

	const valueType = typeof value;
	if (valueType === 'string') return `string:${JSON.stringify(value)}`;
	if (valueType === 'number') return `number:${Object.is(value, -0) ? '-0' : String(value)}`;
	if (valueType === 'boolean') return `boolean:${String(value)}`;
	if (valueType === 'undefined') return 'undefined';
	if (valueType === 'bigint') return `bigint:${String(value)}`;
	if (valueType === 'symbol') return `symbol:${String(value)}`;
	if (valueType === 'function') return `function:${String(value)}`;

	const objectValue = value as object;
	const seenIndex = seen.get(objectValue);
	if (seenIndex !== undefined) return `reference:${seenIndex}`;
	seen.set(objectValue, seen.size);

	if (Array.isArray(objectValue)) {
		return `array:[${objectValue
			.map((entry) => getCalendarValueSignature(entry, seen))
			.join(',')}]`;
	}
	if (objectValue instanceof Map) {
		return `map:[${Array.from(
			objectValue.entries(),
			([key, entry]) =>
				`${getCalendarValueSignature(key, seen)}=>${getCalendarValueSignature(entry, seen)}`
		).join(',')}]`;
	}
	if (objectValue instanceof Set) {
		return `set:[${Array.from(objectValue, (entry) => getCalendarValueSignature(entry, seen)).join(
			','
		)}]`;
	}

	const record = objectValue as Record<string, unknown>;
	return `object:{${Object.keys(record)
		.sort()
		.map((key) => `${JSON.stringify(key)}:${getCalendarValueSignature(record[key], seen)}`)
		.join(',')}}`;
}

function isEventCalendarView(value: unknown): value is EventCalendarView {
	return (
		value === 'month' ||
		value === 'week' ||
		value === 'day' ||
		value === 'days' ||
		value === 'agenda' ||
		value === 'resource'
	);
}

function toValidTargetInstant(value: unknown): Date | null {
	const instant =
		value instanceof Date ? new Date(value) : typeof value === 'string' ? new Date(value) : null;
	return instant && Number.isFinite(instant.getTime()) ? instant : null;
}

function replaceSchedule<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	schedule: {
		allDay: boolean;
		start: Date | EventCalendarDateOnly;
		end: Date | EventCalendarDateOnly;
	}
): EventCalendarItem<TItemFields> {
	// Calendar-owned schedule keys are rebuilt after spreading consumer fields so conversion cannot leak incompatible keys.
	const next: Record<string, unknown> = { ...item };
	delete next.recurrence;
	delete next.recurrenceTimeZone;
	delete next.recurringItemId;
	delete next.originalStart;
	next.start = schedule.start;
	next.end = schedule.end;
	if (schedule.allDay) next.allDay = true;
	else delete next.allDay;
	return next as EventCalendarItem<TItemFields>;
}

function replacePlacement<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	schedule: {
		allDay: boolean;
		start: Date | EventCalendarDateOnly;
		end: Date | EventCalendarDateOnly;
	}
): EventCalendarItem<TItemFields> {
	const next: Record<string, unknown> = { ...item };
	next.start = schedule.start;
	next.end = schedule.end;
	if (schedule.allDay) next.allDay = true;
	else delete next.allDay;
	return next as EventCalendarItem<TItemFields>;
}

function getOccurrenceSeriesId<TItemFields extends object>(
	occurrence: EventCalendarOccurrence<TItemFields>
): string | undefined {
	if (!occurrence.isRecurring && occurrence.item.recurringItemId === undefined) return undefined;
	return occurrence.item.recurringItemId ?? occurrence.item.id;
}

function getChangeStatusItem<TItemFields extends object>(
	change: EventCalendarChange<TItemFields>
): EventCalendarItem<TItemFields> | undefined {
	if ('item' in change) return change.item;
	if ('seriesItem' in change) return change.seriesItem;
	return undefined;
}

function isSameEndpoint(
	left: Date | EventCalendarDateOnly,
	right: Date | EventCalendarDateOnly
): boolean {
	if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime();
	return left === right;
}

function getEndpointKey(endpoint: Date | EventCalendarDateOnly): string {
	return endpoint instanceof Date ? `instant:${endpoint.getTime()}` : `day:${endpoint}`;
}

function areStringArraysEqual(left: readonly string[], right: readonly string[]): boolean {
	return left.length === right.length && left.every((value, index) => value === right[index]);
}

function getProposalOperation<TItemFields extends object>(
	proposal: EventCalendarProposedUpdate<TItemFields>,
	fallback: EventCalendarItemOperation
): EventCalendarItemOperation {
	return proposal.kind === 'update' ? fallback : proposal.kind;
}

function applyTargetResource<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	target: EventCalendarDropTarget,
	sourceResourceId?: string
): EventCalendarItem<TItemFields> {
	if (target.view !== 'resource') return item;
	return replaceEventCalendarResourceAssignment(item, sourceResourceId, target.resourceId);
}

function isValidPlacement<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	minimumMinutes: number
): boolean {
	if (item.allDay === true)
		return typeof item.start === 'string' && typeof item.end === 'string' && item.start < item.end;
	return (
		item.start instanceof Date &&
		item.end instanceof Date &&
		Number.isFinite(item.start.getTime()) &&
		item.end.getTime() - item.start.getTime() >= minimumMinutes * MINUTE_MS
	);
}

function isValidSlot(slot: EventCalendarSlot, minimumMinutes: number): boolean {
	return slot.allDay
		? slot.start < slot.end
		: slot.end.getTime() - slot.start.getTime() >= minimumMinutes * MINUTE_MS;
}

function itemRange<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	timeZone: string
) {
	return item.allDay === true
		? { start: startOfZonedDay(item.start, timeZone), end: startOfZonedDay(item.end, timeZone) }
		: { start: item.start, end: item.end };
}

function slotRange(slot: EventCalendarSlot, timeZone: string) {
	return slot.allDay
		? { start: startOfZonedDay(slot.start, timeZone), end: startOfZonedDay(slot.end, timeZone) }
		: { start: slot.start, end: slot.end };
}

function mergeSlots(anchor: EventCalendarSlot, point: EventCalendarSlot): EventCalendarSlot {
	if (anchor.allDay && point.allDay) {
		return {
			view: point.view,
			allDay: true,
			start: anchor.start < point.start ? anchor.start : point.start,
			end: anchor.end > point.end ? anchor.end : point.end,
			resourceId: point.resourceId
		};
	}
	if (!anchor.allDay && !point.allDay) {
		return {
			view: point.view,
			allDay: false,
			start: anchor.start < point.start ? anchor.start : point.start,
			end: anchor.end > point.end ? anchor.end : point.end,
			resourceId: point.resourceId
		};
	}
	return anchor;
}

function areCompatibleSlots(anchor: EventCalendarSlot, point: EventCalendarSlot): boolean {
	return (
		anchor.view === point.view &&
		anchor.allDay === point.allDay &&
		anchor.resourceId === point.resourceId
	);
}

function isRangeInsideBusinessHours<TItemFields extends object, TResourceFields extends object>(
	range: { start: Date; end: Date },
	isAllDay: boolean,
	calendar: EventCalendarState<TItemFields, TResourceFields>,
	businessHours: readonly EventCalendarBusinessHours[] = calendar.businessHours
): boolean {
	if (businessHours.length === 0) return false;
	const startDay = getZonedDay(range.start, calendar.timeZone);
	const inclusiveEnd = new Date(Math.max(range.start.getTime(), range.end.getTime() - 1));
	const endDay = getZonedDay(inclusiveEnd, calendar.timeZone);
	if (!isAllDay && startDay !== endDay) return false;
	if (!isAllDay) {
		return businessHours.some((window) => {
			if (window.daysOfWeek && !window.daysOfWeek.includes(getCivilWeekday(startDay))) return false;
			const start = resolveZonedMinutesOnDay(startDay, parseClock(window.start), calendar.timeZone);
			const end = resolveZonedMinutesOnDay(startDay, parseClock(window.end), calendar.timeZone);
			return range.start >= start && range.end <= end;
		});
	}
	for (let day = startDay; day <= endDay; day = addCivilDays(day, 1)) {
		if (
			!businessHours.some(
				(window) => !window.daysOfWeek || window.daysOfWeek.includes(getCivilWeekday(day))
			)
		)
			return false;
		if (day === endDay) break;
	}
	return true;
}

function parseClock(value: string): number {
	const [hours, minutes] = value.split(':').map(Number);
	return hours * 60 + minutes;
}

function touchedCivilDayCount<TItemFields extends object>(
	occurrence: EventCalendarOccurrence<TItemFields>,
	timeZone: string
): number {
	return touchedInstantDayCount(occurrence.start, occurrence.end, timeZone);
}

function touchedInstantDayCount(start: Date, end: Date, timeZone: string): number {
	const startDay = getZonedDay(start, timeZone);
	const inclusiveEndDay = getZonedDay(
		new Date(Math.max(start.getTime(), end.getTime() - 1)),
		timeZone
	);
	return Math.max(1, civilDayDifference(startDay, inclusiveEndDay) + 1);
}

function getWallMinutes(instant: Date, timeZone: string): number {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hour: 'numeric',
		minute: 'numeric',
		hourCycle: 'h23'
	}).formatToParts(instant);
	const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
	const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
	return hour * 60 + minute;
}

function edgeScrollDelta(distance: number): number {
	return Math.ceil(EDGE_SCROLL_MAX_PX * (1 - Math.max(0, distance) / EDGE_SCROLL_DISTANCE));
}
