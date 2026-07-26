import { EventCalendarError } from './eventCalendar.error.js';
import { compareEventCalendarOccurrences } from './eventCalendar.items.js';
import { assertDateOnly, assertValidInstant } from './eventCalendar.date.js';
import type {
	EventCalendarDateOnly,
	EventCalendarOccurrence,
	EventCalendarSegment
} from './eventCalendar.types.js';

export type EventCalendarLanePlacement<TItemFields extends object> = {
	key: string;
	occurrence: EventCalendarOccurrence<TItemFields>;
	segments: readonly EventCalendarSegment<TItemFields>[];
	startIndex: number;
	endIndex: number;
	lane: number;
};

export type EventCalendarLaneLayout<TItemFields extends object> = {
	placements: readonly EventCalendarLanePlacement<TItemFields>[];
	laneCount: number;
	layoutIdentity: object;
};

export type EventCalendarTimedPlacement<TItemFields extends object> = {
	key: string;
	segment: EventCalendarSegment<TItemFields>;
	column: number;
	columnCount: number;
	span: number;
	visualStart: Date;
	visualEnd: Date;
	isZeroDuration: boolean;
};

export type EventCalendarTimedLayout<TItemFields extends object> = {
	placements: readonly EventCalendarTimedPlacement<TItemFields>[];
	columnCount: number;
	layoutIdentity: object;
};

type LaneSchedule = {
	key: string;
	segmentKeys: readonly string[];
	startIndex: number;
	endIndex: number;
	lane: number;
};

type TimedSchedule = {
	key: string;
	column: number;
	columnCount: number;
	span: number;
	visualStart: number;
	visualEnd: number;
	isZeroDuration: boolean;
};

type CachedLaneLayout = {
	identity: object;
	placements: readonly LaneSchedule[];
	laneCount: number;
};
type CachedTimedLayout = {
	identity: object;
	placements: readonly TimedSchedule[];
	columnCount: number;
};

const laneCache = new Map<string, CachedLaneLayout>();
const timedCache = new Map<string, CachedTimedLayout>();
const MAX_LAYOUT_CACHE_ENTRIES = 64;
const MAX_DATE_MILLISECONDS = 8_640_000_000_000_000;

/** Packs bars into the first available lane without scanning source items per day cell. */
export function packEventCalendarLanes<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	days: readonly EventCalendarDateOnly[]
): EventCalendarLaneLayout<TItemFields> {
	validateLaneInputs(segments, days);
	const scheduleKey = getLaneScheduleKey(segments, days);
	let cached = laneCache.get(scheduleKey);
	if (!cached) {
		cached = buildLaneLayout(segments, days);
		setBoundedCache(laneCache, scheduleKey, cached);
	}
	const segmentsByKey = new Map(segments.map((segment) => [segment.key, segment]));
	const placements = cached.placements.map((placement) => {
		const placementSegments = placement.segmentKeys.map((key) => {
			const segment = segmentsByKey.get(key);
			if (!segment) throwMissingLayoutSegment(key);
			return segment;
		});
		const occurrence = placementSegments[0]?.occurrence;
		if (!occurrence) throwMissingLayoutSegment(placement.key);
		return { ...placement, occurrence, segments: placementSegments };
	});
	return { placements, laneCount: cached.laneCount, layoutIdentity: cached.identity };
}

/** Packs timed intervals into overlap columns and exposes a visual minimum for point events. */
export function packEventCalendarTimedSegments<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	visualMinimumMinutes = 15
): EventCalendarTimedLayout<TItemFields> {
	if (!Array.isArray(segments)) {
		throw new EventCalendarError('invalid-item', 'Timed layout segments must be an array.');
	}
	const visualMinimumMilliseconds = visualMinimumMinutes * 60_000;
	if (
		!Number.isFinite(visualMinimumMinutes) ||
		visualMinimumMinutes <= 0 ||
		!Number.isSafeInteger(visualMinimumMilliseconds) ||
		visualMinimumMilliseconds > MAX_DATE_MILLISECONDS
	) {
		throw new EventCalendarError(
			'invalid-prop',
			'visualMinimumMinutes must resolve to a positive safe millisecond duration inside the Date domain.',
			{ visualMinimumMinutes }
		);
	}
	const segmentKeys = new Set<string>();
	const segmentDays = new Set<EventCalendarDateOnly>();
	for (const segment of segments) {
		validateLayoutSegment(segment, segmentKeys);
		segmentDays.add(segment.day);
		if (segment.occurrence.allDay) {
			throw new EventCalendarError(
				'invalid-item',
				`Timed layout cannot pack all-day segment ${segment.key}.`,
				{ key: segment.key }
			);
		}
	}
	if (segmentDays.size > 1) {
		throw new EventCalendarError('invalid-item', 'Timed layout segments must share one day.');
	}
	const scheduleKey = getTimedScheduleKey(segments, visualMinimumMinutes);
	let cached = timedCache.get(scheduleKey);
	if (!cached) {
		cached = buildTimedLayout(segments, visualMinimumMilliseconds);
		setBoundedCache(timedCache, scheduleKey, cached);
	}
	const segmentsByKey = new Map(segments.map((segment) => [segment.key, segment]));
	const placements = cached.placements.map((placement) => {
		const segment = segmentsByKey.get(placement.key);
		if (!segment) throwMissingLayoutSegment(placement.key);
		return {
			...placement,
			segment,
			visualStart: new Date(placement.visualStart),
			visualEnd: new Date(placement.visualEnd)
		};
	});
	return { placements, columnCount: cached.columnCount, layoutIdentity: cached.identity };
}

function validateLaneInputs<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	days: readonly EventCalendarDateOnly[]
): void {
	if (!Array.isArray(segments) || !Array.isArray(days)) {
		throw new EventCalendarError('invalid-item', 'Lane layout requires segment and day arrays.');
	}
	if (new Set(days).size !== days.length) {
		throw new EventCalendarError('invalid-prop', 'Lane layout days must be unique.');
	}
	for (const day of days) assertDateOnly(day, 'lane day');
	const dayIndexes = new Map(days.map((day, index) => [day, index]));
	const segmentKeys = new Set<string>();
	for (const segment of segments) {
		validateLayoutSegment(segment, segmentKeys);
		if (!dayIndexes.has(segment.day)) {
			throw new EventCalendarError(
				'invalid-item',
				`Lane segment ${segment.key} does not belong to the supplied day row.`,
				{ key: segment.key, day: segment.day }
			);
		}
	}
}

function validateLayoutSegment<TItemFields extends object>(
	segment: EventCalendarSegment<TItemFields>,
	segmentKeys: Set<string>
): void {
	if (!segment || typeof segment !== 'object' || typeof segment.key !== 'string') {
		throw new EventCalendarError('invalid-item', 'Every layout segment requires a string key.');
	}
	if (segmentKeys.has(segment.key)) {
		throw new EventCalendarError('invalid-item', `Duplicate layout segment key: ${segment.key}.`, {
			key: segment.key
		});
	}
	segmentKeys.add(segment.key);
	assertDateOnly(segment.day, 'segment.day');
	assertValidInstant(segment.start, 'segment.start');
	assertValidInstant(segment.end, 'segment.end');
	if (segment.end.getTime() < segment.start.getTime()) {
		throw new EventCalendarError('invalid-item', `Segment ${segment.key} ends before it starts.`, {
			key: segment.key
		});
	}
}

function buildLaneLayout<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	days: readonly EventCalendarDateOnly[]
): CachedLaneLayout {
	const dayIndexes = new Map(days.map((day, index) => [day, index]));
	const byOccurrence = new Map<string, EventCalendarSegment<TItemFields>[]>();
	for (const segment of segments) {
		const current = byOccurrence.get(segment.occurrence.key);
		if (current) current.push(segment);
		else byOccurrence.set(segment.occurrence.key, [segment]);
	}
	const bars = [...byOccurrence.values()]
		.map((occurrenceSegments) => {
			occurrenceSegments.sort(
				(left, right) =>
					(dayIndexes.get(left.day) as number) - (dayIndexes.get(right.day) as number)
			);
			return {
				occurrence: occurrenceSegments[0].occurrence,
				segments: occurrenceSegments,
				startIndex: dayIndexes.get(occurrenceSegments[0].day) as number,
				endIndex:
					(dayIndexes.get(occurrenceSegments.at(-1)?.day as EventCalendarDateOnly) as number) + 1
			};
		})
		.sort((left, right) => {
			if (left.startIndex !== right.startIndex) return left.startIndex - right.startIndex;
			if (left.endIndex !== right.endIndex) return right.endIndex - left.endIndex;
			return compareEventCalendarOccurrences(left.occurrence, right.occurrence);
		});
	const laneEnds: number[] = [];
	const placements: LaneSchedule[] = [];
	for (const bar of bars) {
		let lane = laneEnds.findIndex((endIndex) => endIndex <= bar.startIndex);
		if (lane < 0) {
			lane = laneEnds.length;
			laneEnds.push(bar.endIndex);
		} else {
			laneEnds[lane] = bar.endIndex;
		}
		placements.push({
			key: bar.occurrence.key,
			segmentKeys: bar.segments.map((segment) => segment.key),
			startIndex: bar.startIndex,
			endIndex: bar.endIndex,
			lane
		});
	}
	return { identity: {}, placements, laneCount: laneEnds.length };
}

function buildTimedLayout<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	visualMinimumMilliseconds: number
): CachedTimedLayout {
	const intervals = segments
		.map((segment) => {
			const start = segment.start.getTime();
			const end = segment.end.getTime();
			const visualEnd = end === start ? start + visualMinimumMilliseconds : end;
			if (!Number.isFinite(visualEnd) || Math.abs(visualEnd) > MAX_DATE_MILLISECONDS) {
				throw new EventCalendarError(
					'invalid-prop',
					`The visual minimum for zero-duration segment ${segment.key} exceeds the Date domain.`,
					{ key: segment.key, visualMinimumMilliseconds }
				);
			}
			return {
				key: segment.key,
				start,
				end,
				visualEnd,
				occurrence: segment.occurrence
			};
		})
		.sort((left, right) => {
			if (left.start !== right.start) return left.start - right.start;
			if (left.visualEnd !== right.visualEnd) return right.visualEnd - left.visualEnd;
			return compareEventCalendarOccurrences(left.occurrence, right.occurrence);
		});
	const schedules: Array<TimedSchedule & { cluster: number }> = [];
	const clusters: Array<{ start: number; end: number; columns: number[][] }> = [];
	let active: Array<{ end: number; column: number }> = [];
	let freeColumns: number[] = [];
	let cluster = -1;

	for (const interval of intervals) {
		active = active.filter((entry) => {
			if (entry.end > interval.start) return true;
			insertSorted(freeColumns, entry.column);
			return false;
		});
		if (active.length === 0) {
			cluster += 1;
			freeColumns = [];
			clusters.push({ start: schedules.length, end: schedules.length, columns: [] });
		}
		const column = freeColumns.shift() ?? active.length;
		active.push({ end: interval.visualEnd, column });
		active.sort((left, right) => left.end - right.end || left.column - right.column);
		const clusterRecord = clusters[cluster];
		const columnIntervals = clusterRecord.columns[column] ?? [];
		columnIntervals.push(schedules.length);
		clusterRecord.columns[column] = columnIntervals;
		clusterRecord.end = schedules.length + 1;
		schedules.push({
			key: interval.key,
			column,
			columnCount: 0,
			span: 1,
			visualStart: interval.start,
			visualEnd: interval.visualEnd,
			isZeroDuration: interval.start === interval.end,
			cluster
		});
	}

	for (let clusterIndex = 0; clusterIndex < clusters.length; clusterIndex += 1) {
		const clusterRecord = clusters[clusterIndex];
		const columnCount = clusterRecord.columns.length;
		const columnMaximumEnds = clusterRecord.columns.map((indexes) =>
			getColumnMaximumEnds(schedules, indexes)
		);
		for (let index = clusterRecord.start; index < clusterRecord.end; index += 1) {
			const schedule = schedules[index];
			schedule.columnCount = columnCount;
			for (let column = schedule.column + 1; column < columnCount; column += 1) {
				if (
					columnHasOverlap(
						schedules,
						clusterRecord.columns[column],
						columnMaximumEnds[column],
						schedule
					)
				)
					break;
				schedule.span += 1;
			}
		}
	}
	const columnCount = clusters.reduce(
		(maximum, clusterRecord) => Math.max(maximum, clusterRecord.columns.length),
		0
	);
	return {
		identity: {},
		placements: schedules.map((schedule) => ({
			key: schedule.key,
			column: schedule.column,
			columnCount: schedule.columnCount,
			span: schedule.span,
			visualStart: schedule.visualStart,
			visualEnd: schedule.visualEnd,
			isZeroDuration: schedule.isZeroDuration
		})),
		columnCount
	};
}

function columnHasOverlap(
	schedules: readonly (TimedSchedule & { cluster: number })[],
	indexes: readonly number[],
	maximumEnds: readonly number[],
	target: TimedSchedule
): boolean {
	let low = 0;
	let high = indexes.length;
	while (low < high) {
		const middle = Math.floor((low + high) / 2);
		if (schedules[indexes[middle]].visualStart < target.visualEnd) low = middle + 1;
		else high = middle;
	}
	return low > 0 && maximumEnds[low - 1] > target.visualStart;
}

function getColumnMaximumEnds(
	schedules: readonly (TimedSchedule & { cluster: number })[],
	indexes: readonly number[]
): readonly number[] {
	const maximumEnds: number[] = [];
	let maximum = Number.NEGATIVE_INFINITY;
	for (const index of indexes) {
		maximum = Math.max(maximum, schedules[index].visualEnd);
		maximumEnds.push(maximum);
	}
	return maximumEnds;
}

function getLaneScheduleKey<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	days: readonly EventCalendarDateOnly[]
): string {
	return JSON.stringify([
		days,
		segments.map((segment) => [
			segment.key,
			segment.day,
			segment.start.getTime(),
			segment.end.getTime(),
			segment.occurrence.item.priority ?? 0
		])
	]);
}

function getTimedScheduleKey<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[],
	visualMinimumMinutes: number
): string {
	return JSON.stringify([
		visualMinimumMinutes,
		segments.map((segment) => [
			segment.key,
			segment.start.getTime(),
			segment.end.getTime(),
			segment.occurrence.item.priority ?? 0
		])
	]);
}

function setBoundedCache<T>(cache: Map<string, T>, key: string, value: T): void {
	cache.set(key, value);
	while (cache.size > MAX_LAYOUT_CACHE_ENTRIES) {
		const oldest = cache.keys().next().value;
		if (oldest === undefined) return;
		cache.delete(oldest);
	}
}

function insertSorted(values: number[], value: number): void {
	let index = 0;
	while (index < values.length && values[index] < value) index += 1;
	values.splice(index, 0, value);
}

function throwMissingLayoutSegment(key: string): never {
	throw new EventCalendarError('invalid-item', `Layout references missing segment ${key}.`, {
		key
	});
}
