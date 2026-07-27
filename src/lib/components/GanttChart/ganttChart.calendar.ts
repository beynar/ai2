import {
	addCivilDateDays,
	formatCivilDate,
	getCivilDateWeekday,
	parseCivilDate,
	type CivilDateOnly
} from '$lib/scheduling/civilDate.js';
import { getInstantZonedDay, resolveZonedMinuteOnDay } from '$lib/scheduling/zonedTime.js';
import { GanttChartError } from './ganttChart.error.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type {
	GanttCalendar,
	GanttDependency,
	GanttLag,
	GanttRange,
	GanttResource,
	GanttTask,
	GanttTaskSegment
} from './ganttChart.types.js';

const MINUTE_MS = 60_000;

type WorkingMinuteRange = Readonly<{ start: number; end: number }>;

export type GanttCalendarRuntime = Readonly<{
	calendar: GanttCalendar;
	workingWeekdays: ReadonlySet<number>;
	workingIntervals: readonly WorkingMinuteRange[];
	exceptions: ReadonlyMap<CivilDateOnly, readonly WorkingMinuteRange[] | null>;
	standardDayMinutes: number;
	standardWeekMinutes: number;
}>;

const runtimeCache = new WeakMap<GanttCalendar, GanttCalendarRuntime>();

export function getCalendarRuntime(calendar: GanttCalendar): GanttCalendarRuntime {
	const cached = runtimeCache.get(calendar);
	if (cached) return cached;
	const workingIntervals = calendar.workingIntervals.map(toWorkingMinuteRange);
	const exceptions = new Map<CivilDateOnly, readonly WorkingMinuteRange[] | null>();
	for (const exception of calendar.exceptions ?? []) {
		exceptions.set(
			exception.date,
			exception.type === 'non-working' ? null : exception.intervals.map(toWorkingMinuteRange)
		);
	}
	const standardDayMinutes = workingIntervals.reduce(
		(total, interval) => total + interval.end - interval.start,
		0
	);
	const runtime = {
		calendar,
		workingWeekdays: new Set(calendar.workingWeekdays),
		workingIntervals,
		exceptions,
		standardDayMinutes,
		standardWeekMinutes: standardDayMinutes * calendar.workingWeekdays.length
	};
	runtimeCache.set(calendar, runtime);
	return runtime;
}

export function getTaskCalendar<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	task: GanttTask<TTaskFields>
): GanttCalendarRuntime {
	const calendar = task.calendarId
		? model.calendarsById.get(task.calendarId)
		: model.projectCalendar;
	if (calendar) return getCalendarRuntime(calendar);
	throw new GanttChartError(
		'missing-calendar',
		`Task ${task.id} lost calendar ${task.calendarId}.`,
		{
			taskId: task.id,
			calendarId: task.calendarId
		}
	);
}

export function getResourceCalendar<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resource: GanttResource<TResourceFields>
): GanttCalendarRuntime {
	const calendar = resource.calendarId
		? model.calendarsById.get(resource.calendarId)
		: model.projectCalendar;
	if (calendar) return getCalendarRuntime(calendar);
	throw new GanttChartError(
		'missing-calendar',
		`Resource ${resource.id} lost calendar ${resource.calendarId}.`,
		{ resourceId: resource.id, calendarId: resource.calendarId }
	);
}

export function getTaskWorkingMinutes<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	calendar: GanttCalendarRuntime
): number | null {
	if (!task.start || !task.end) return null;
	if (task.type === 'milestone') return 0;
	if (task.segments) {
		return task.segments.reduce(
			(total, segment) => total + getWorkingMinutesBetween(segment.start, segment.end, calendar),
			0
		);
	}
	return getWorkingMinutesBetween(task.start, task.end, calendar);
}

export function getWorkingMinutesBetween(
	start: Date,
	end: Date,
	calendar: GanttCalendarRuntime
): number {
	const startTime = start.getTime();
	const endTime = end.getTime();
	if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
		throw new GanttChartError('invalid-date', 'Working-duration endpoints must be valid instants.');
	}
	if (startTime === endTime) return 0;
	if (startTime > endTime) return -getWorkingMinutesBetween(end, start, calendar);

	let total = 0;
	let day = getCalendarCivilDay(start, calendar);
	const finalDay = getCalendarCivilDay(end, calendar);
	while (day <= finalDay) {
		for (const interval of resolveDayIntervals(day, calendar)) {
			const overlapStart = Math.max(startTime, interval.start.getTime());
			const overlapEnd = Math.min(endTime, interval.end.getTime());
			if (overlapStart < overlapEnd) total += (overlapEnd - overlapStart) / MINUTE_MS;
		}
		if (day === finalDay) break;
		day = addDay(day, 1);
	}
	return total;
}

export function getCalendarWorkingIntervals(
	range: GanttRange,
	calendar: GanttCalendarRuntime
): readonly Readonly<{ start: Date; end: Date }>[] {
	if (range.end.getTime() < range.start.getTime()) {
		throw new GanttChartError('invalid-range', 'Working interval range is reversed.', { range });
	}
	if (range.start.getTime() === range.end.getTime()) return [];
	const intervals: Array<Readonly<{ start: Date; end: Date }>> = [];
	let day = getCalendarCivilDay(range.start, calendar);
	const finalDay = getCalendarCivilDay(range.end, calendar);
	while (day <= finalDay) {
		for (const interval of resolveDayIntervals(day, calendar)) {
			const start = Math.max(range.start.getTime(), interval.start.getTime());
			const end = Math.min(range.end.getTime(), interval.end.getTime());
			if (start < end) intervals.push({ start: new Date(start), end: new Date(end) });
		}
		if (day === finalDay) break;
		day = addDay(day, 1);
	}
	return intervals;
}

export function addWorkingMinutes(
	instant: Date,
	minutes: number,
	calendar: GanttCalendarRuntime
): Date {
	if (!Number.isFinite(instant.getTime()) || !Number.isFinite(minutes)) {
		throw new GanttChartError('invalid-date', 'Working-time arithmetic needs finite inputs.', {
			instant,
			minutes
		});
	}
	if (minutes < 0) return subtractWorkingMinutes(instant, -minutes, calendar);
	if (minutes === 0) return getNextWorkingInstant(instant, calendar);
	let remaining = minutes;
	let cursor = instant.getTime();
	let day = getCalendarCivilDay(instant, calendar);
	const maximumDays =
		calendar.exceptions.size + Math.ceil(minutes / calendar.standardDayMinutes) * 7 + 14;
	for (let scanned = 0; scanned <= maximumDays; scanned += 1) {
		for (const interval of resolveDayIntervals(day, calendar)) {
			const intervalStart = interval.start.getTime();
			const intervalEnd = interval.end.getTime();
			const segmentStart = Math.max(cursor, intervalStart);
			if (segmentStart > intervalEnd || (segmentStart === intervalEnd && remaining > 0)) continue;
			const available = (intervalEnd - segmentStart) / MINUTE_MS;
			if (remaining <= available) return new Date(segmentStart + remaining * MINUTE_MS);
			remaining -= available;
		}
		day = addDay(day, 1);
		cursor = resolveZonedMinuteOnDay(day, 0, calendar.calendar.timeZone).getTime();
	}
	throw new GanttChartError(
		'schedule-conflict',
		'Working-time scan could not find enough capacity.',
		{
			calendarId: calendar.calendar.id,
			instant,
			minutes
		}
	);
}

export function subtractWorkingMinutes(
	instant: Date,
	minutes: number,
	calendar: GanttCalendarRuntime
): Date {
	if (!Number.isFinite(instant.getTime()) || !Number.isFinite(minutes) || minutes < 0) {
		throw new GanttChartError(
			'invalid-date',
			'Backward working-time arithmetic needs finite inputs.',
			{
				instant,
				minutes
			}
		);
	}
	let remaining = minutes;
	let cursor = instant.getTime();
	let day = getCalendarCivilDay(instant, calendar);
	const maximumDays =
		calendar.exceptions.size + Math.ceil(minutes / calendar.standardDayMinutes) * 7 + 14;
	for (let scanned = 0; scanned <= maximumDays; scanned += 1) {
		const intervals = resolveDayIntervals(day, calendar);
		for (let index = intervals.length - 1; index >= 0; index -= 1) {
			const intervalStart = intervals[index].start.getTime();
			const intervalEnd = intervals[index].end.getTime();
			const segmentEnd = Math.min(cursor, intervalEnd);
			if (segmentEnd < intervalStart || (segmentEnd === intervalStart && remaining > 0)) continue;
			const available = (segmentEnd - intervalStart) / MINUTE_MS;
			if (remaining <= available) return new Date(segmentEnd - remaining * MINUTE_MS);
			remaining -= available;
		}
		day = addDay(day, -1);
		cursor = resolveZonedMinuteOnDay(day, 1440, calendar.calendar.timeZone).getTime();
	}
	throw new GanttChartError('schedule-conflict', 'Backward working-time scan found no capacity.', {
		calendarId: calendar.calendar.id,
		instant,
		minutes
	});
}

export function getLagWorkingMinutes(
	lag: GanttLag | undefined,
	calendar: GanttCalendarRuntime
): number {
	if (!lag) return 0;
	if (lag.unit === 'minute') return lag.value;
	if (lag.unit === 'hour') return lag.value * 60;
	if (lag.unit === 'day') return lag.value * calendar.standardDayMinutes;
	return lag.value * calendar.standardWeekMinutes;
}

export function getDependencyBoundary(
	base: Date,
	dependency: Pick<GanttDependency, 'lag'>,
	calendar: GanttCalendarRuntime
): Date {
	const lagMinutes = getLagWorkingMinutes(dependency.lag, calendar);
	return lagMinutes >= 0
		? addWorkingMinutes(base, lagMinutes, calendar)
		: subtractWorkingMinutes(base, -lagMinutes, calendar);
}

export function moveTaskToStart<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	start: Date,
	calendar: GanttCalendarRuntime
): GanttTask<TTaskFields> {
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no movable schedule.`, {
			taskId: task.id
		});
	}
	if (task.type === 'milestone') return { ...task, start: new Date(start), end: new Date(start) };
	const offsets = task.segments?.map((segment) => ({
		start: getWorkingMinutesBetween(task.start, segment.start, calendar),
		end: getWorkingMinutesBetween(task.start, segment.end, calendar)
	}));
	const endOffset = getWorkingMinutesBetween(task.start, task.end, calendar);
	const movedStart = addWorkingMinutes(start, 0, calendar);
	const movedSegments = offsets?.map<GanttTaskSegment>((offset) => ({
		start: addWorkingMinutes(movedStart, offset.start, calendar),
		end: addWorkingMinutes(movedStart, offset.end, calendar)
	}));
	return {
		...task,
		start: movedStart,
		end: addWorkingMinutes(movedStart, endOffset, calendar),
		...(movedSegments ? { segments: movedSegments } : {})
	};
}

export function moveTaskToFinish<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	finish: Date,
	calendar: GanttCalendarRuntime
): GanttTask<TTaskFields> {
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no movable schedule.`, {
			taskId: task.id
		});
	}
	if (task.type === 'milestone') return { ...task, start: new Date(finish), end: new Date(finish) };
	const duration = getWorkingMinutesBetween(task.start, task.end, calendar);
	return moveTaskToStart(task, subtractWorkingMinutes(finish, duration, calendar), calendar);
}

function resolveDayIntervals(
	day: CivilDateOnly,
	calendar: GanttCalendarRuntime
): readonly Readonly<{ start: Date; end: Date }>[] {
	const exception = calendar.exceptions.get(day);
	const minuteRanges =
		exception !== undefined
			? (exception ?? [])
			: calendar.workingWeekdays.has(getCivilDateWeekday(parseCivilDate(day)))
				? calendar.workingIntervals
				: [];
	return minuteRanges.map((interval) => ({
		start: resolveZonedMinuteOnDay(day, interval.start, calendar.calendar.timeZone),
		end: resolveZonedMinuteOnDay(day, interval.end, calendar.calendar.timeZone)
	}));
}

export function getCalendarCivilDay(instant: Date, calendar: GanttCalendarRuntime): CivilDateOnly {
	return getInstantZonedDay(instant, calendar.calendar.timeZone);
}

function getNextWorkingInstant(instant: Date, calendar: GanttCalendarRuntime): Date {
	let cursor = instant.getTime();
	let day = getCalendarCivilDay(instant, calendar);
	for (let scanned = 0; scanned <= calendar.exceptions.size + 14; scanned += 1) {
		for (const interval of resolveDayIntervals(day, calendar)) {
			const start = interval.start.getTime();
			const end = interval.end.getTime();
			if (cursor < start) return new Date(start);
			if (cursor >= start && cursor < end) return new Date(cursor);
		}
		day = addDay(day, 1);
		cursor = resolveZonedMinuteOnDay(day, 0, calendar.calendar.timeZone).getTime();
	}
	throw new GanttChartError('schedule-conflict', 'Calendar has no reachable working instant.', {
		calendarId: calendar.calendar.id,
		instant
	});
}

function addDay(day: CivilDateOnly, amount: number): CivilDateOnly {
	return formatCivilDate(addCivilDateDays(parseCivilDate(day), amount));
}

function toWorkingMinuteRange(
	interval: GanttCalendar['workingIntervals'][number]
): WorkingMinuteRange {
	return { start: parseClock(interval.start), end: parseClock(interval.end) };
}

function parseClock(value: string): number {
	const [hours, minutes] = value.split(':').map(Number);
	return hours * 60 + minutes;
}
