import { civilDayDifference } from './eventCalendar.date.js';
import type { EventCalendarMonthInsertion } from './eventCalendar.interactions.svelte.js';
import { compareEventCalendarScheduleValues } from './eventCalendar.items.js';
import type { EventCalendarLaneLayout } from './eventCalendar.layout.js';
import type { EventCalendarDateOnly } from './eventCalendar.types.js';

export type EventCalendarMonthRowInsertion = EventCalendarMonthInsertion & {
	startIndex: number;
	endIndex: number;
	lane: number;
};

export function getEventCalendarMonthRowInsertion(
	days: readonly EventCalendarDateOnly[],
	insertion: EventCalendarMonthInsertion | null
): Omit<EventCalendarMonthRowInsertion, 'lane'> | null {
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

export function createEventCalendarMonthInsertionLayout<TItemFields extends object>(
	layout: EventCalendarLaneLayout<TItemFields>,
	insertion: Omit<EventCalendarMonthRowInsertion, 'lane'>
): { layout: EventCalendarLaneLayout<TItemFields>; insertion: EventCalendarMonthRowInsertion } {
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
	].sort(compareMonthSchedules);
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

type MonthSchedule = {
	key: string;
	isInsertion: boolean;
	startIndex: number;
	endIndex: number;
	sortStart: number;
	sortEnd: number;
	priority: number;
};

function compareMonthSchedules(left: MonthSchedule, right: MonthSchedule): number {
	if (left.startIndex !== right.startIndex) return left.startIndex - right.startIndex;
	if (left.endIndex !== right.endIndex) return right.endIndex - left.endIndex;
	return compareEventCalendarScheduleValues(
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
