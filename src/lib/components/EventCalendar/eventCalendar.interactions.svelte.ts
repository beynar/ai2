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
import type { EventCalendarState } from './eventCalendar.state.svelte.js';
import type {
	EventCalendarChange,
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

type ItemOperation = 'move' | 'resize-start' | 'resize-end';
type InvalidReason = EventCalendarInteractionBlockedInfo['reason'];

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
	kind: ItemOperation;
	occurrence: EventCalendarOccurrence<TItemFields>;
	proposal: EventCalendarProposedUpdate<TItemFields> | null;
	targetKey: string | null;
	isValid: boolean;
	reason: InvalidReason | null;
	grabOffsetMs: number;
	grabOffsetDays: number;
	pointerX: number;
	pointerY: number;
};

type EventCalendarSlotGesture = {
	kind: 'slot-create';
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
	operation: ItemOperation;
	grabOffsetMs: number;
	grabOffsetDays: number;
};

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
	private targetElements = new Map<string, HTMLElement>();
	private gestureBoundary: readonly unknown[] | null = null;

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
			if (event.key !== 'Escape' || !this.gesture) return;
			event.preventDefault();
			this.cancel();
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
		this.stopSlotAutoScroll();
		if (!active || !reason) return;
		this.reportBlocked({
			reason,
			source: active.kind === 'slot-create' ? 'drag-create' : this.operationSource(active.kind),
			proposal: active.kind === 'slot-create' ? undefined : (active.proposal ?? undefined),
			slot: active.kind === 'slot-create' ? active.slot : undefined
		});
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

	canMove(occurrence: EventCalendarOccurrence<TItemFields>): boolean {
		return this.canBeginItemGesture(occurrence, 'move');
	}

	canResize(occurrence: EventCalendarOccurrence<TItemFields>): boolean {
		return this.canBeginItemGesture(occurrence, 'resize-start');
	}

	isInvalidTarget(key: string): boolean {
		return Boolean(this.gesture && !this.gesture.isValid && this.gesture.targetKey === key);
	}

	isSlotDraftTarget(target: EventCalendarDropTarget): boolean {
		const slot = this.slot;
		if (!slot || slot.allDay !== target.allDay) return false;
		if (slot.allDay && target.allDay) return target.day >= slot.start && target.day < slot.end;
		if (!slot.allDay && !target.allDay) {
			return target.start < slot.end && slot.start < target.end;
		}
		return false;
	}

	draggableItem(
		segment: EventCalendarSegment<TItemFields>,
		operation: ItemOperation
	): Attachment<HTMLElement> {
		const occurrence = segment.occurrence;
		return (element) =>
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
						? civilDayDifference(getZonedDay(occurrence.start, this.calendar.timeZone), segment.day)
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
								: 0
					};
				}
			});
	}

	dropTarget(target: EventCalendarDropTarget): Attachment<HTMLElement> {
		return (element) => {
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
				if (this.targetElements.get(target.key) === element) this.targetElements.delete(target.key);
			};
		};
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
		return (element) => {
			this.targetElements.set(target.key, element);
			const cleanup = pointerDrag(element);
			return () => {
				cleanup?.();
				if (this.targetElements.get(target.key) === element) this.targetElements.delete(target.key);
			};
		};
	}

	autoScroll(mode: 'contained' | 'page'): Attachment<HTMLElement> {
		return (element) => {
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
		};
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

	private handleItemDragStart(payload: ElementEventPayloadMap['onDragStart']): void {
		const source = this.readSource(payload.source.data);
		if (!source) return;
		const occurrence = this.calendar.getOccurrence(source.occurrenceKey);
		if (!occurrence || !this.canBeginItemGesture(occurrence, source.operation)) return;
		this.didNativeCancel = false;
		this.gestureBoundary = this.getBoundary();
		this.gesture = {
			kind: source.operation,
			occurrence,
			proposal: null,
			targetKey: null,
			isValid: false,
			reason: 'invalid-target',
			grabOffsetMs: source.grabOffsetMs,
			grabOffsetDays: source.grabOffsetDays,
			pointerX: payload.location.current.input.clientX,
			pointerY: payload.location.current.input.clientY
		};
		this.updateItemGesture(payload);
	}

	private handleItemDrag(payload: ElementEventPayloadMap['onDrag']): void {
		if (!this.gesture || this.gesture.kind === 'slot-create') return;
		this.updateItemGesture(payload);
	}

	private handleItemDrop(payload: ElementEventPayloadMap['onDrop']): void {
		const active = this.gesture;
		if (!active || active.kind === 'slot-create') return;
		if (this.didNativeCancel) {
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
			this.reportBlocked({
				reason,
				source: this.operationSource(active.kind),
				proposal: proposal ?? undefined
			});
			return;
		}
		const boundary = this.gestureBoundary;
		try {
			this.commitProposal(proposal, boundary ?? undefined);
		} finally {
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
		const active = this.gesture;
		if (!active || active.kind === 'slot-create') return;
		const input = payload.location.current.input;
		const target =
			this.getTargetAt(input.clientX, input.clientY) ??
			this.readTarget(payload.location.current.dropTargets);
		if (!target) {
			this.gesture = {
				...active,
				proposal: null,
				targetKey: null,
				isValid: false,
				reason: 'invalid-target',
				pointerX: input.clientX,
				pointerY: input.clientY
			};
			return;
		}
		const proposal = this.deriveItemProposal(active, target, input.clientX, input.clientY);
		const reason = proposal ? this.validateProposal(proposal) : 'invalid-target';
		this.gesture = {
			...active,
			proposal,
			targetKey: target.key,
			isValid: proposal !== null && reason === null,
			reason,
			pointerX: input.clientX,
			pointerY: input.clientY
		};
	}

	private deriveItemProposal(
		gesture: EventCalendarItemGesture<TItemFields>,
		target: EventCalendarDropTarget,
		pointerX: number,
		pointerY: number
	): EventCalendarProposedUpdate<TItemFields> | null {
		const { occurrence } = gesture;
		const sourceItem = occurrence.item;
		const placementItem = this.getOccurrencePlacementItem(occurrence);
		const isTimedMonthResize =
			gesture.kind !== 'move' && target.allDay && target.view === 'month' && !occurrence.allDay;
		if (gesture.kind !== 'move' && target.allDay !== occurrence.allDay && !isTimedMonthResize) {
			return null;
		}
		let item: EventCalendarItem<TItemFields>;
		try {
			if (gesture.kind === 'move') {
				item =
					target.allDay && target.view === 'month' && !occurrence.allDay
						? this.moveTimedToMonthDay(placementItem, occurrence, target.day)
						: target.allDay
							? this.moveToAllDay(placementItem, occurrence, target.day, gesture.grabOffsetDays)
							: this.moveToTimed(placementItem, occurrence, target, pointerY, gesture.grabOffsetMs);
			} else if (isTimedMonthResize) {
				const sourceEndpoint = gesture.kind === 'resize-start' ? occurrence.start : occurrence.end;
				const endpoint = resolveZonedMinutesOnDay(
					target.day,
					getWallMinutes(sourceEndpoint, this.calendar.timeZone),
					this.calendar.timeZone
				);
				item = this.resizeTimed(placementItem, gesture.kind, endpoint);
			} else if (target.allDay) {
				const endpoint = gesture.kind === 'resize-start' ? target.day : addCivilDays(target.day, 1);
				item = this.resizeAllDay(placementItem, gesture.kind, endpoint);
			} else {
				const endpoint = this.getTimedTargetInstant(target, pointerY);
				item = this.resizeTimed(placementItem, gesture.kind, endpoint);
			}
		} catch (error) {
			if (isSupportedDateDomainError(error)) return null;
			throw error;
		}
		if (gesture.kind === 'move') item = applyTargetResource(item, target);
		return {
			kind: gesture.kind,
			source: this.operationSource(gesture.kind),
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
						? touchedCivilDayCount(occurrence, this.calendar.timeZone)
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
			const days = Math.max(
				1,
				civilDayDifference(item.start as EventCalendarDateOnly, item.end as EventCalendarDateOnly)
			);
			const endDay = addCivilDays(getZonedDay(start, this.calendar.timeZone), days);
			const parts = getWallMinutes(start, this.calendar.timeZone);
			durationMs =
				resolveZonedMinutesOnDay(endDay, parts, this.calendar.timeZone).getTime() - start.getTime();
		}
		return replaceSchedule(item, {
			allDay: false,
			start,
			end: new Date(start.getTime() + durationMs)
		});
	}

	private resizeAllDay(
		item: EventCalendarItem<TItemFields>,
		operation: Exclude<ItemOperation, 'move'>,
		endpoint: EventCalendarDateOnly
	): EventCalendarItem<TItemFields> {
		if (item.allDay !== true) return item;
		const start = operation === 'resize-start' ? endpoint : item.start;
		const end = operation === 'resize-end' ? endpoint : item.end;
		return replaceSchedule(item, { allDay: true, start, end });
	}

	private resizeTimed(
		item: EventCalendarItem<TItemFields>,
		operation: Exclude<ItemOperation, 'move'>,
		endpoint: Date
	): EventCalendarItem<TItemFields> {
		if (item.allDay === true) return item;
		return replaceSchedule(item, {
			allDay: false,
			start: operation === 'resize-start' ? endpoint : item.start,
			end: operation === 'resize-end' ? endpoint : item.end
		});
	}

	private getTimedTargetInstant(
		target: Extract<EventCalendarDropTarget, { allDay: false }>,
		pointerY: number
	): Date {
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
		this.gestureBoundary = this.getBoundary();
		const anchor = this.slotFromTarget(target, payload.y);
		this.gesture = {
			kind: 'slot-create',
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
		if (!target || target.allDay !== active.anchor.allDay) {
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
				source: 'drag-create',
				slot: active.slot
			});
			return;
		}
		this.calendar.select({ kind: 'slot', itemKey: null, slot: active.slot });
		this.calendar.onSlotSelect?.(active.slot);
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
		const resourceId =
			adjustment.resourceId === null ? undefined : (adjustment.resourceId ?? item.resourceId);
		const adjusted = replacePlacement(item, { allDay, start, end });
		if (adjustment.resourceId === null) {
			delete adjusted.resourceId;
			return adjusted;
		}
		return adjustment.resourceId === undefined
			? adjusted
			: ({ ...adjusted, resourceId } as EventCalendarItem<TItemFields>);
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
		const change = createChange(
			this.createRevert(previousItems, publishedItems, selectionTransaction, keyRemap?.backward)
		);
		this.calendar.onItemsChange?.(publishedItems, change);
		if (
			selectionTransaction &&
			this.calendar.selection === selectionTransaction.committedSelection
		) {
			this.calendar.notifySelectionChange(selectionTransaction.committedSelection);
		}
	}

	private createRevert(
		previousItems: EventCalendarItem<TItemFields>[],
		committedItems: EventCalendarItem<TItemFields>[],
		selectionTransaction: {
			previousSelection: EventCalendarSelection;
			committedSelection: EventCalendarSelection;
		} | null = null,
		restoreOccurrenceKey?: (key: string) => string
	): () => void {
		let isConsumed = false;
		return () => {
			if (
				isConsumed ||
				this.calendar.items !== committedItems ||
				(selectionTransaction !== null &&
					this.calendar.selection !== selectionTransaction.committedSelection)
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
		return isRangeInsideBusinessHours(
			itemRange(item, this.calendar.timeZone),
			item.allDay === true,
			this.calendar
		);
	}

	private isSlotInsideBusinessHours(slot: EventCalendarSlot): boolean {
		return isRangeInsideBusinessHours(
			slotRange(slot, this.calendar.timeZone),
			slot.allDay,
			this.calendar
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
				rangesIntersect(range, { start: occurrence.start, end: occurrence.end })
		);
	}

	private findSlotConflicts(slot: EventCalendarSlot) {
		const range = slotRange(slot, this.calendar.timeZone);
		return this.calendar.itemIndex.occurrences.filter(
			(occurrence) =>
				occurrence.item.display !== 'background' &&
				rangesIntersect(range, { start: occurrence.start, end: occurrence.end })
		);
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
		operation: ItemOperation
	): boolean {
		const item = occurrence.item;
		if (
			this.calendar.disabled ||
			this.calendar.loading ||
			item.display === 'background' ||
			item.readOnly
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

	private operationSource(operation: ItemOperation): EventCalendarMutationSource {
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
			grabOffsetDays: typeof data.grabOffsetDays === 'number' ? data.grabOffsetDays : 0
		};
	}

	private readTarget(
		dropTargets: ElementEventPayloadMap['onDrag']['location']['current']['dropTargets']
	): EventCalendarDropTarget | null {
		for (const record of dropTargets) {
			if (record.data.mark !== SOURCE_MARK || record.data.calendarInstanceId !== this.instanceId)
				continue;
			const target = record.data.target;
			if (target && typeof target === 'object' && 'key' in target)
				return target as EventCalendarDropTarget;
		}
		return null;
	}

	private getTargetAt(x: number, y: number): EventCalendarDropTarget | null {
		const visited = new Set<HTMLElement>();
		for (const hit of document.elementsFromPoint(x, y)) {
			const element = hit.closest<HTMLElement>('[data-event-calendar-target]');
			if (!element || visited.has(element)) continue;
			visited.add(element);
			if (element.dataset.calendarInstanceId !== this.instanceId) continue;
			const rect = element.getBoundingClientRect();
			if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;
			const encoded = element.dataset.eventCalendarTarget;
			if (!encoded) continue;
			const target = deserializeTarget(JSON.parse(encoded) as SerializedTarget);
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

type SerializedTarget = Omit<EventCalendarDropTarget, 'start' | 'end'> & {
	start?: string;
	end?: string;
};

function deserializeTarget(target: SerializedTarget): EventCalendarDropTarget | null {
	if (target.allDay && 'day' in target) return target as EventCalendarDropTarget;
	if (!target.allDay && target.start && target.end) {
		return {
			...target,
			allDay: false,
			start: new Date(target.start),
			end: new Date(target.end)
		} as EventCalendarDropTarget;
	}
	return null;
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

function applyTargetResource<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	target: EventCalendarDropTarget
): EventCalendarItem<TItemFields> {
	if (target.view !== 'resource') return item;
	const next = { ...item };
	if (target.resourceId === undefined) delete next.resourceId;
	else next.resourceId = target.resourceId;
	return next;
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

function isRangeInsideBusinessHours<TItemFields extends object, TResourceFields extends object>(
	range: { start: Date; end: Date },
	isAllDay: boolean,
	calendar: EventCalendarState<TItemFields, TResourceFields>
): boolean {
	if (calendar.businessHours.length === 0) return false;
	const startDay = getZonedDay(range.start, calendar.timeZone);
	const inclusiveEnd = new Date(Math.max(range.start.getTime(), range.end.getTime() - 1));
	const endDay = getZonedDay(inclusiveEnd, calendar.timeZone);
	if (!isAllDay && startDay !== endDay) return false;
	if (!isAllDay) {
		return calendar.businessHours.some((window) => {
			if (window.daysOfWeek && !window.daysOfWeek.includes(getCivilWeekday(startDay))) return false;
			const start = resolveZonedMinutesOnDay(startDay, parseClock(window.start), calendar.timeZone);
			const end = resolveZonedMinutesOnDay(startDay, parseClock(window.end), calendar.timeZone);
			return range.start >= start && range.end <= end;
		});
	}
	for (let day = startDay; day <= endDay; day = addCivilDays(day, 1)) {
		if (
			!calendar.businessHours.some(
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
	const start = getZonedDay(occurrence.start, timeZone);
	const inclusiveEnd = getZonedDay(
		new Date(Math.max(occurrence.start.getTime(), occurrence.end.getTime() - 1)),
		timeZone
	);
	return Math.max(1, civilDayDifference(start, inclusiveEnd) + 1);
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
