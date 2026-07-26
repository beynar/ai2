import {
	enumerateInstantSlots,
	getCivilWeekday,
	resolveZonedMinutesOnDay
} from './eventCalendar.date.js';
import type { EventCalendarDayBucket } from './eventCalendar.items.js';
import {
	packEventCalendarTimedSegments,
	type EventCalendarTimedPlacement
} from './eventCalendar.layout.js';
import type {
	EventCalendarBusinessHours,
	EventCalendarDateOnly,
	EventCalendarSegment,
	EventCalendarWeekday
} from './eventCalendar.types.js';

export const EVENT_CALENDAR_MINUTE_MS = 60_000;

export type EventCalendarTimeSlot = {
	key: string;
	start: Date;
	end: Date;
	row: number;
};

export type EventCalendarBusinessWindow = {
	key: string;
	start: Date;
	end: Date;
};

export type EventCalendarTimeGridDayGeometry<TItemFields extends object> = {
	day: EventCalendarDateOnly;
	column: number;
	windowStart: Date;
	windowEnd: Date;
	minuteCount: number;
	slots: readonly EventCalendarTimeSlot[];
	intervalInstants: readonly Date[];
	businessWindows: readonly EventCalendarBusinessWindow[];
	backgroundSegments: readonly EventCalendarSegment<TItemFields>[];
	timedPlacements: readonly EventCalendarTimedPlacement<TItemFields>[];
};

type CreateTimeGridDayGeometryOptions<TItemFields extends object> = {
	day: EventCalendarDateOnly;
	column: number;
	timeZone: string;
	dayStartMinutes: number;
	dayEndMinutes: number;
	interval: number;
	slotDuration: number;
	snapDuration: number;
	businessHours: readonly EventCalendarBusinessHours[];
	bucket?: EventCalendarDayBucket<TItemFields>;
};

export function getEventCalendarElapsedMinutes(start: Date, instant: Date): number {
	return (instant.getTime() - start.getTime()) / EVENT_CALENDAR_MINUTE_MS;
}

export function createEventCalendarTimeGridDayGeometry<TItemFields extends object>({
	day,
	column,
	timeZone,
	dayStartMinutes,
	dayEndMinutes,
	interval,
	slotDuration,
	snapDuration,
	businessHours,
	bucket
}: CreateTimeGridDayGeometryOptions<TItemFields>): EventCalendarTimeGridDayGeometry<TItemFields> {
	const windowStart = resolveZonedMinutesOnDay(day, dayStartMinutes, timeZone);
	const windowEnd = resolveZonedMinutesOnDay(day, dayEndMinutes, timeZone);
	const slots = enumerateInstantSlots(
		day,
		timeZone,
		dayStartMinutes,
		dayEndMinutes,
		slotDuration
	).map((start, index) => ({
		key: `time-slot:${day}:${start.getTime()}`,
		start,
		end: new Date(
			Math.min(start.getTime() + slotDuration * EVENT_CALENDAR_MINUTE_MS, windowEnd.getTime())
		),
		row: index + 2
	}));
	const timedSegments = (bucket?.timed ?? [])
		.map((segment) => clipTimedSegment(segment, windowStart, windowEnd))
		.filter((segment): segment is EventCalendarSegment<TItemFields> => segment !== null);
	const foregroundSegments = timedSegments.filter(
		(segment) => segment.occurrence.item.display !== 'background'
	);
	const backgroundSegments = timedSegments.filter(
		(segment) => segment.occurrence.item.display === 'background'
	);

	return {
		day,
		column,
		windowStart,
		windowEnd,
		minuteCount: getEventCalendarElapsedMinutes(windowStart, windowEnd),
		slots,
		intervalInstants: enumerateInstantSlots(
			day,
			timeZone,
			dayStartMinutes,
			dayEndMinutes,
			interval
		),
		businessWindows: getBusinessEntries(businessHours, getCivilWeekday(day))
			.map((entry): EventCalendarBusinessWindow | null => {
				const start = resolveZonedMinutesOnDay(day, parseBusinessMinutes(entry.start), timeZone);
				const end = resolveZonedMinutesOnDay(day, parseBusinessMinutes(entry.end), timeZone);
				const clippedStart = new Date(Math.max(start.getTime(), windowStart.getTime()));
				const clippedEnd = new Date(Math.min(end.getTime(), windowEnd.getTime()));
				if (clippedStart >= clippedEnd) return null;
				return { key: `${day}:${entry.start}-${entry.end}`, start: clippedStart, end: clippedEnd };
			})
			.filter((entry): entry is EventCalendarBusinessWindow => entry !== null),
		backgroundSegments,
		timedPlacements: packEventCalendarTimedSegments(foregroundSegments, snapDuration).placements
	};
}

function parseBusinessMinutes(value: string): number {
	const [hour, minute] = value.split(':').map(Number);
	return hour * 60 + minute;
}

function getBusinessEntries(
	businessHours: readonly EventCalendarBusinessHours[],
	weekday: EventCalendarWeekday
): readonly EventCalendarBusinessHours[] {
	return businessHours.filter(
		(entry) => entry.daysOfWeek === undefined || entry.daysOfWeek.includes(weekday)
	);
}

function clipTimedSegment<TItemFields extends object>(
	segment: EventCalendarSegment<TItemFields>,
	windowStart: Date,
	windowEnd: Date
): EventCalendarSegment<TItemFields> | null {
	const start = Math.max(segment.start.getTime(), windowStart.getTime());
	const end = Math.min(segment.end.getTime(), windowEnd.getTime());
	if (start > end || (start === end && segment.start.getTime() !== segment.end.getTime()))
		return null;
	if (start === windowEnd.getTime()) return null;
	return {
		...segment,
		start: new Date(start),
		end: new Date(end),
		isStart: segment.isStart && start === segment.start.getTime(),
		isEnd: segment.isEnd && end === segment.end.getTime(),
		continuesBefore: segment.continuesBefore || start > segment.start.getTime(),
		continuesAfter: segment.continuesAfter || end < segment.end.getTime()
	};
}
