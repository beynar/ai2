import { compareScheduleValues } from '$lib/scheduling/scheduleOrder.js';
import { civilDayDifference } from './eventCalendar.date.js';
import type { EventCalendarAllDayInsertion } from './eventCalendar.interactions.svelte.js';
import { packEventCalendarLanes, type EventCalendarLaneLayout } from './eventCalendar.layout.js';
import type { EventCalendarDateOnly, EventCalendarSegment } from './eventCalendar.types.js';

export type EventCalendarAllDayRowInsertion = EventCalendarAllDayInsertion & {
	startIndex: number;
	endIndex: number;
	lane: number;
};

export function createEventCalendarAllDayPreviewLayout<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	days: readonly EventCalendarDateOnly[],
	insertion: EventCalendarAllDayInsertion | null
): {
	layout: EventCalendarLaneLayout<TItemFields>;
	insertion: EventCalendarAllDayRowInsertion | null;
	draggingOccurrenceKey: string | null;
} {
	const sourceLayout = packEventCalendarLanes(segments, days);
	const rowInsertion = getEventCalendarAllDayRowInsertion(days, insertion);
	if (!insertion || !rowInsertion) {
		return { layout: sourceLayout, insertion: null, draggingOccurrenceKey: null };
	}
	const sourcePlacement = sourceLayout.placements.find(
		(placement) => placement.occurrence.key === insertion.occurrenceKey
	);
	const baseLayout = packEventCalendarLanes(
		segments.filter((segment) => segment.occurrence.key !== insertion.occurrenceKey),
		days
	);
	const preview = createEventCalendarAllDayInsertionLayout(baseLayout, rowInsertion);
	return {
		layout: sourcePlacement
			? {
					...preview.layout,
					placements: [...preview.layout.placements, sourcePlacement]
				}
			: preview.layout,
		insertion: preview.insertion,
		draggingOccurrenceKey: insertion.occurrenceKey
	};
}

function getEventCalendarAllDayRowInsertion(
	days: readonly EventCalendarDateOnly[],
	insertion: EventCalendarAllDayInsertion | null
): Omit<EventCalendarAllDayRowInsertion, 'lane'> | null {
	if (!insertion) return null;
	const startIndex = days.indexOf(insertion.start);
	if (startIndex < 0) return null;
	const dayCount = Math.max(1, civilDayDifference(insertion.start, insertion.end));
	return {
		...insertion,
		startIndex,
		endIndex: Math.min(days.length, startIndex + dayCount)
	};
}

function createEventCalendarAllDayInsertionLayout<TItemFields extends object>(
	layout: EventCalendarLaneLayout<TItemFields>,
	insertion: Omit<EventCalendarAllDayRowInsertion, 'lane'>
): { layout: EventCalendarLaneLayout<TItemFields>; insertion: EventCalendarAllDayRowInsertion } {
	const schedules = [
		...layout.placements.map((placement) => ({
			key: placement.key,
			isInsertion: false,
			startIndex: placement.startIndex,
			endIndex: placement.endIndex,
			sortStart: placement.occurrence.start.getTime(),
			sortEnd: placement.occurrence.end.getTime(),
			priority: placement.occurrence.item.priority ?? 0
		})),
		{ key: insertion.occurrenceKey, isInsertion: true, ...insertion }
	].sort(compareAllDaySchedules);
	const laneEnds: number[] = [];
	const placementLanes: Record<string, number> = {};
	let insertionLane = 0;
	for (const schedule of schedules) {
		let lane = laneEnds.findIndex((endIndex) => endIndex <= schedule.startIndex);
		if (lane < 0) {
			lane = laneEnds.length;
			laneEnds.push(schedule.endIndex);
		} else {
			laneEnds[lane] = schedule.endIndex;
		}
		if (schedule.isInsertion) insertionLane = lane;
		else placementLanes[schedule.key] = lane;
	}
	return {
		layout: {
			...layout,
			placements: layout.placements.map((placement) => ({
				...placement,
				lane: placementLanes[placement.key]
			})),
			laneCount: laneEnds.length
		},
		insertion: { ...insertion, lane: insertionLane }
	};
}

type AllDaySchedule = {
	key: string;
	isInsertion: boolean;
	startIndex: number;
	endIndex: number;
	sortStart: number;
	sortEnd: number;
	priority: number;
};

function compareAllDaySchedules(left: AllDaySchedule, right: AllDaySchedule): number {
	if (left.startIndex !== right.startIndex) return left.startIndex - right.startIndex;
	if (left.endIndex !== right.endIndex) return right.endIndex - left.endIndex;
	return compareScheduleValues(
		left.sortStart,
		left.sortEnd,
		left.priority,
		left.key,
		right.sortStart,
		right.sortEnd,
		right.priority,
		right.key
	);
}
