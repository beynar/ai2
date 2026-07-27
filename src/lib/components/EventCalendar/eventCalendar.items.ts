import {
	addCivilDays,
	assertDateOnly,
	assertValidInstant,
	assertValidRange,
	assertValidTimeZone,
	getZonedDay,
	startOfZonedDay
} from './eventCalendar.date.js';
import { EventCalendarError } from './eventCalendar.error.js';
import {
	expandEventCalendarRecurrence,
	validateEventCalendarRecurrence
} from './eventCalendar.recurrence.js';
import type {
	EventCalendarDateOnly,
	EventCalendarExpandedOccurrence,
	EventCalendarItem,
	EventCalendarOccurrence,
	EventCalendarRange,
	EventCalendarRecurrenceExpander,
	EventCalendarSegment
} from './eventCalendar.types.js';

export type EventCalendarDayBucket<TItemFields extends object> = {
	all: readonly EventCalendarSegment<TItemFields>[];
	foreground: readonly EventCalendarSegment<TItemFields>[];
	background: readonly EventCalendarSegment<TItemFields>[];
	allDay: readonly EventCalendarSegment<TItemFields>[];
	timed: readonly EventCalendarSegment<TItemFields>[];
};

export type EventCalendarItemIndex<TItemFields extends object> = {
	occurrences: readonly EventCalendarOccurrence<TItemFields>[];
	foreground: readonly EventCalendarOccurrence<TItemFields>[];
	background: readonly EventCalendarOccurrence<TItemFields>[];
	segments: readonly EventCalendarSegment<TItemFields>[];
	segmentsByDay: ReadonlyMap<EventCalendarDateOnly, EventCalendarDayBucket<TItemFields>>;
	occurrencesByKey: ReadonlyMap<string, EventCalendarOccurrence<TItemFields>>;
	scheduleIdentity: object;
	getOccurrence(key: string): EventCalendarOccurrence<TItemFields> | null;
	getOccurrences(range?: EventCalendarRange): readonly EventCalendarOccurrence<TItemFields>[];
	getOccurrencesForDay(day: EventCalendarDateOnly): readonly EventCalendarOccurrence<TItemFields>[];
};

export type CreateEventCalendarItemIndexOptions<TItemFields extends object> = {
	items: readonly EventCalendarItem<TItemFields>[];
	range: EventCalendarRange;
	displayTimeZone: string;
	profileKey: string;
	visibleDays?: readonly EventCalendarDateOnly[];
	expandRecurrence?: EventCalendarRecurrenceExpander<TItemFields>;
};

type ItemSchedule = {
	id: string;
	resourceId?: string;
	allDay: boolean;
	start: Date | EventCalendarDateOnly;
	end: Date | EventCalendarDateOnly;
	display: 'auto' | 'background';
	priority: number;
	recurrence?: EventCalendarItem['recurrence'];
	recurrenceTimeZone?: string;
	recurringItemId?: string;
	originalStart?: Date | EventCalendarDateOnly;
};

type RuntimeRecurrenceIdentity = {
	recurrence?: unknown;
	recurrenceTimeZone?: unknown;
	recurringItemId?: unknown;
	originalStart?: unknown;
};

type OccurrenceSchedule = {
	key: string;
	itemId: string;
	start: number;
	end: number;
	allDay: boolean;
	isRecurring: boolean;
	originalStart: Date | EventCalendarDateOnly;
	display: 'auto' | 'background';
	priority: number;
};

type SegmentSchedule = {
	key: string;
	occurrenceKey: string;
	day: EventCalendarDateOnly;
	start: number;
	end: number;
	isStart: boolean;
	isEnd: boolean;
	continuesBefore: boolean;
	continuesAfter: boolean;
};

type CachedSchedule = {
	identity: object;
	occurrences: readonly OccurrenceSchedule[];
	segments: readonly SegmentSchedule[];
};

const exactIndexCache = new WeakMap<
	readonly object[],
	Map<string, EventCalendarItemIndex<object>>
>();
const sharedScheduleCache = new Map<string, CachedSchedule>();
const functionIdentities = new WeakMap<object, number>();
let nextFunctionIdentity = 1;
const MAX_EXACT_INDEX_CACHE_ENTRIES_PER_COLLECTION = 8;
const MAX_SHARED_SCHEDULE_CACHE_ENTRIES = 32;

/**
 * Creates the active occurrence index. Collections are controlled immutable snapshots; in-place
 * item or Date mutation is intentionally outside the observable cache contract.
 */
export function createEventCalendarItemIndex<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>
): EventCalendarItemIndex<TItemFields> {
	validateIndexOptions(options);
	const exactKey = getQueryKey(options);
	const collectionCache = exactIndexCache.get(options.items as readonly object[]);
	const exact = collectionCache?.get(exactKey);
	if (exact) {
		collectionCache?.delete(exactKey);
		collectionCache?.set(exactKey, exact);
		return exact as EventCalendarItemIndex<TItemFields>;
	}

	const itemsById = validateItems(options.items, options.expandRecurrence !== undefined);
	const scheduleSignature = getScheduleSignature(options);
	let schedule = sharedScheduleCache.get(scheduleSignature);
	if (!schedule) {
		schedule = buildSchedule(options, itemsById);
		sharedScheduleCache.set(scheduleSignature, schedule);
		trimSharedScheduleCache();
	} else {
		sharedScheduleCache.delete(scheduleSignature);
		sharedScheduleCache.set(scheduleSignature, schedule);
	}
	const index = hydrateIndex(schedule, itemsById, options.visibleDays);
	const nextCollectionCache = collectionCache ?? new Map<string, EventCalendarItemIndex<object>>();
	nextCollectionCache.set(exactKey, index as EventCalendarItemIndex<object>);
	while (nextCollectionCache.size > MAX_EXACT_INDEX_CACHE_ENTRIES_PER_COLLECTION) {
		const oldestKey = nextCollectionCache.keys().next().value;
		if (oldestKey === undefined) break;
		nextCollectionCache.delete(oldestKey);
	}
	if (!collectionCache)
		exactIndexCache.set(options.items as readonly object[], nextCollectionCache);
	return index;
}

export function createRecurringOccurrenceKey(
	seriesId: string,
	originalStart: Date | EventCalendarDateOnly
): string {
	const origin =
		originalStart instanceof Date ? `instant:${originalStart.getTime()}` : `day:${originalStart}`;
	return encodeKey('recurring', [seriesId, origin]);
}

export function decodeRecurringOccurrenceKey(
	key: string
): { seriesId: string; originalStart: Date | EventCalendarDateOnly } | null {
	const parts = decodeKey(key);
	if (!parts || parts.namespace !== 'recurring' || parts.values.length !== 2) return null;
	const [seriesId, encodedOrigin] = parts.values;
	if (encodedOrigin.startsWith('instant:')) {
		const timestamp = Number(encodedOrigin.slice('instant:'.length));
		if (!Number.isFinite(timestamp)) return null;
		const originalStart = new Date(timestamp);
		return Number.isFinite(originalStart.getTime()) ? { seriesId, originalStart } : null;
	}
	if (!encodedOrigin.startsWith('day:')) return null;
	const originalStart = encodedOrigin.slice('day:'.length);
	try {
		assertDateOnly(originalStart, 'occurrence key origin');
		return { seriesId, originalStart };
	} catch (error) {
		if (error instanceof EventCalendarError) return null;
		throw error;
	}
}

export function createEventCalendarSegmentKey(
	occurrenceKey: string,
	day: EventCalendarDateOnly,
	segmentIndex: number
): string {
	return encodeKey('segment', [occurrenceKey, day, String(segmentIndex)]);
}

export function compareEventCalendarOccurrences<TItemFields extends object>(
	left: EventCalendarOccurrence<TItemFields>,
	right: EventCalendarOccurrence<TItemFields>
): number {
	return compareOccurrenceValues(
		left.start.getTime(),
		left.end.getTime(),
		left.item.priority ?? 0,
		left.key,
		right.start.getTime(),
		right.end.getTime(),
		right.item.priority ?? 0,
		right.key
	);
}

function validateIndexOptions<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>
): void {
	if (!options || typeof options !== 'object') {
		throw new EventCalendarError('invalid-item', 'Item index options are required.');
	}
	if (!Array.isArray(options.items)) {
		throw new EventCalendarError('invalid-item', 'items must be an array.');
	}
	assertValidRange(options.range, 'item index range');
	assertValidTimeZone(options.displayTimeZone);
	if (typeof options.profileKey !== 'string' || options.profileKey.length === 0) {
		throw new EventCalendarError('invalid-prop', 'profileKey must be a non-empty string.');
	}
	if (options.visibleDays) {
		if (!Array.isArray(options.visibleDays)) {
			throw new EventCalendarError('invalid-prop', 'visibleDays must be an array.');
		}
		const days = new Set<string>();
		for (const day of options.visibleDays) {
			assertDateOnly(day, 'visibleDays');
			if (days.has(day)) {
				throw new EventCalendarError('invalid-prop', `visibleDays contains duplicate ${day}.`);
			}
			days.add(day);
		}
	}
}

function validateItems<TItemFields extends object>(
	items: readonly EventCalendarItem<TItemFields>[],
	hasCustomExpander: boolean
): ReadonlyMap<string, EventCalendarItem<TItemFields>> {
	const itemsById = new Map<string, EventCalendarItem<TItemFields>>();
	for (const item of items) {
		if (!item || typeof item !== 'object') {
			throw new EventCalendarError('invalid-item', 'Every item must be an object.');
		}
		if (typeof item.id !== 'string' || item.id.length === 0) {
			throw new EventCalendarError('invalid-item', 'Every item must have a non-empty string id.');
		}
		if (itemsById.has(item.id)) {
			throw new EventCalendarError('duplicate-item-id', `Duplicate item id: ${item.id}.`, {
				id: item.id
			});
		}
		if (typeof item.title !== 'string') {
			throw new EventCalendarError('invalid-item', `Item ${item.id} must have a string title.`, {
				id: item.id
			});
		}
		validateItemDisplayFields(item);
		validateItemPlacement(item);
		itemsById.set(item.id, item);
	}
	validateItemIdentities(items, itemsById, hasCustomExpander);
	return itemsById;
}

function validateItemDisplayFields<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>
): void {
	if (item.display !== undefined && item.display !== 'auto' && item.display !== 'background') {
		throw new EventCalendarError('invalid-item', `Item ${item.id} has an invalid display value.`, {
			id: item.id
		});
	}
	if (item.priority !== undefined && !Number.isFinite(item.priority)) {
		throw new EventCalendarError('invalid-item', `Item ${item.id} priority must be finite.`, {
			id: item.id
		});
	}
}

function validateItemPlacement<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>
): void {
	if (item.allDay === true) {
		try {
			assertDateOnly(item.start, 'item.start');
			assertDateOnly(item.end, 'item.end');
		} catch (error) {
			if (!(error instanceof EventCalendarError)) throw error;
			throw new EventCalendarError(
				'invalid-item',
				`All-day item ${item.id} has an invalid range.`,
				{
					id: item.id
				}
			);
		}
		if (item.end <= item.start) {
			throw new EventCalendarError(
				'invalid-item',
				`All-day item ${item.id} must have a positive half-open range.`,
				{ id: item.id }
			);
		}
		return;
	}
	try {
		assertValidInstant(item.start, 'item.start');
		assertValidInstant(item.end, 'item.end');
	} catch (error) {
		if (!(error instanceof EventCalendarError)) throw error;
		throw new EventCalendarError('invalid-item', `Timed item ${item.id} has an invalid range.`, {
			id: item.id
		});
	}
	if (item.end.getTime() < item.start.getTime()) {
		throw new EventCalendarError('invalid-item', `Timed item ${item.id} ends before it starts.`, {
			id: item.id
		});
	}
}

function validateItemIdentities<TItemFields extends object>(
	items: readonly EventCalendarItem<TItemFields>[],
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>,
	hasCustomExpander: boolean
): void {
	const exceptionOrigins = new Set<string>();
	for (const item of items) {
		const identity = item as unknown as RuntimeRecurrenceIdentity;
		const hasExceptionField =
			identity.recurringItemId !== undefined || identity.originalStart !== undefined;
		if (hasExceptionField) {
			validateExceptionIdentity(item, itemsById, exceptionOrigins);
			continue;
		}
		if (identity.recurrence !== undefined) {
			if (hasCustomExpander && typeof identity.recurrence === 'string') {
				if (identity.recurrence.trim().length === 0) {
					throw new EventCalendarError(
						'invalid-recurrence',
						`Item ${item.id} has an empty recurrence rule.`,
						{ id: item.id }
					);
				}
				continue;
			}
			validateEventCalendarRecurrence(item);
			continue;
		}
		if (identity.recurrenceTimeZone !== undefined) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Item ${item.id} cannot define recurrenceTimeZone without recurrence.`,
				{ id: item.id }
			);
		}
	}
}

function validateExceptionIdentity<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>,
	exceptionOrigins: Set<string>
): void {
	const identity = item as unknown as RuntimeRecurrenceIdentity;
	if (
		typeof identity.recurringItemId !== 'string' ||
		identity.recurringItemId.length === 0 ||
		identity.originalStart === undefined
	) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Exception item ${item.id} requires recurringItemId and originalStart.`,
			{ id: item.id }
		);
	}
	if (identity.recurrence !== undefined || identity.recurrenceTimeZone !== undefined) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Exception item ${item.id} cannot define recurrence fields.`,
			{ id: item.id }
		);
	}
	const source = itemsById.get(identity.recurringItemId);
	if (
		!source ||
		source === item ||
		source.id === item.id ||
		source.recurringItemId !== undefined ||
		source.recurrence === undefined
	) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Exception item ${item.id} must reference a distinct recurring source in the same collection.`,
			{ id: item.id, recurringItemId: identity.recurringItemId }
		);
	}
	if (source.allDay === true) {
		if (typeof item.originalStart !== 'string') throwOriginRepresentationError(item.id, source.id);
		try {
			assertDateOnly(item.originalStart, 'originalStart');
		} catch (error) {
			if (!(error instanceof EventCalendarError)) throw error;
			throwOriginRepresentationError(item.id, source.id);
		}
	} else if (
		!(item.originalStart instanceof Date) ||
		!Number.isFinite(item.originalStart.getTime())
	) {
		throwOriginRepresentationError(item.id, source.id);
	}
	const key = createRecurringOccurrenceKey(source.id, item.originalStart);
	if (exceptionOrigins.has(key)) {
		throw new EventCalendarError(
			'invalid-recurrence',
			`Multiple exceptions target the same origin in series ${source.id}.`,
			{ recurringItemId: source.id, originalStart: canonicalOrigin(item.originalStart) }
		);
	}
	exceptionOrigins.add(key);
}

function throwOriginRepresentationError(itemId: string, sourceId: string): never {
	throw new EventCalendarError(
		'invalid-recurrence',
		`Exception item ${itemId} has an origin representation that does not match its source.`,
		{ id: itemId, recurringItemId: sourceId }
	);
}

function buildSchedule<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>,
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>
): CachedSchedule {
	const exceptionOrigins = validateExceptionOrigins(options, itemsById);
	const occurrences: OccurrenceSchedule[] = [];

	for (const item of options.items) {
		if (item.recurringItemId !== undefined) continue;
		if (item.recurrence !== undefined) {
			for (const expanded of expandEventCalendarRecurrence({
				item,
				range: options.range,
				displayTimeZone: options.displayTimeZone,
				expandRecurrence: options.expandRecurrence
			})) {
				const key = createRecurringOccurrenceKey(item.id, expanded.originalStart);
				if (exceptionOrigins.has(key)) continue;
				occurrences.push(
					createOccurrenceSchedule(item, expanded, key, true, options.displayTimeZone)
				);
			}
			continue;
		}
		const occurrence = createDefinitionOccurrence(item, options.displayTimeZone);
		if (occurrenceIntersects(occurrence.start, occurrence.end, options.range)) {
			occurrences.push(occurrence);
		}
	}

	for (const item of options.items) {
		if (item.recurringItemId === undefined || item.originalStart === undefined) continue;
		const source = itemsById.get(item.recurringItemId) as EventCalendarItem<TItemFields>;
		const reconstructed = reconstructSourceOccurrence(
			source,
			item.originalStart,
			options.displayTimeZone
		);
		const current = createDefinitionOccurrence(item, options.displayTimeZone);
		const isRelevant =
			occurrenceIntersects(current.start, current.end, options.range) ||
			occurrenceIntersects(reconstructed.start, reconstructed.end, options.range);
		if (!isRelevant || !occurrenceIntersects(current.start, current.end, options.range)) continue;
		occurrences.push({
			...current,
			key: createRecurringOccurrenceKey(source.id, item.originalStart),
			isRecurring: true,
			originalStart: cloneOrigin(item.originalStart)
		});
	}

	occurrences.sort(compareOccurrenceSchedules);
	assertOccurrenceScheduleKeysUnique(occurrences);
	const segments = createSegmentSchedules(
		occurrences,
		options.displayTimeZone,
		options.range,
		null
	);
	return { identity: {}, occurrences, segments };
}

function validateExceptionOrigins<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>,
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>
): ReadonlySet<string> {
	const origins = new Set<string>();
	for (const exception of options.items) {
		if (exception.recurringItemId === undefined || exception.originalStart === undefined) continue;
		const source = itemsById.get(exception.recurringItemId) as EventCalendarItem<TItemFields>;
		let reconstructed: OccurrenceSchedule;
		try {
			reconstructed = reconstructSourceOccurrence(
				source,
				exception.originalStart,
				options.displayTimeZone
			);
		} catch (error) {
			if (!(error instanceof EventCalendarError)) throw error;
			throw new EventCalendarError(
				'invalid-recurrence',
				`Exception item ${exception.id} has an origin outside its source recurrence domain.`,
				{
					id: exception.id,
					recurringItemId: source.id,
					causeCode: error.code,
					cause: error.message
				}
			);
		}
		const verificationRange = getOriginVerificationRange(reconstructed);
		const expanded = expandEventCalendarRecurrence({
			item: source,
			range: verificationRange,
			displayTimeZone: options.displayTimeZone,
			expandRecurrence: options.expandRecurrence
		});
		const origin = canonicalOrigin(exception.originalStart);
		if (!expanded.some((occurrence) => canonicalOrigin(occurrence.originalStart) === origin)) {
			throw new EventCalendarError(
				'invalid-recurrence',
				`Exception item ${exception.id} targets an origin absent from series ${source.id}.`,
				{ id: exception.id, recurringItemId: source.id, originalStart: origin }
			);
		}
		origins.add(createRecurringOccurrenceKey(source.id, exception.originalStart));
	}
	return origins;
}

function getOriginVerificationRange(occurrence: OccurrenceSchedule): EventCalendarRange {
	if (occurrence.start === occurrence.end) {
		return { start: new Date(occurrence.start), end: new Date(occurrence.start + 1) };
	}
	return { start: new Date(occurrence.start), end: new Date(occurrence.end) };
}

function assertOccurrenceScheduleKeysUnique(occurrences: readonly OccurrenceSchedule[]): void {
	const keys = new Set<string>();
	for (const occurrence of occurrences) {
		if (keys.has(occurrence.key)) {
			throw new EventCalendarError(
				'invalid-item',
				`Occurrence key collides with another item or occurrence: ${occurrence.key}.`,
				{ key: occurrence.key }
			);
		}
		keys.add(occurrence.key);
	}
}

function reconstructSourceOccurrence<TItemFields extends object>(
	source: EventCalendarItem<TItemFields>,
	originalStart: Date | EventCalendarDateOnly,
	displayTimeZone: string
): OccurrenceSchedule {
	if (source.allDay === true) {
		const duration = civilDayDifference(source.start, source.end);
		const start = originalStart as EventCalendarDateOnly;
		const end = addCivilDays(start, duration);
		return createOccurrenceSchedule(
			source,
			{ allDay: true, start, end, originalStart: start },
			createRecurringOccurrenceKey(source.id, start),
			true,
			displayTimeZone
		);
	}
	const start = originalStart as Date;
	return createOccurrenceSchedule(
		source,
		{
			allDay: false,
			start,
			end: new Date(start.getTime() + source.end.getTime() - source.start.getTime()),
			originalStart: start
		},
		createRecurringOccurrenceKey(source.id, start),
		true,
		displayTimeZone
	);
}

function createDefinitionOccurrence<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	displayTimeZone: string
): OccurrenceSchedule {
	if (item.allDay === true) {
		return {
			key: item.id,
			itemId: item.id,
			start: startOfZonedDay(item.start, displayTimeZone).getTime(),
			end: startOfZonedDay(item.end, displayTimeZone).getTime(),
			allDay: true,
			isRecurring: item.recurringItemId !== undefined,
			originalStart: cloneOrigin(item.originalStart ?? item.start),
			display: item.display ?? 'auto',
			priority: item.priority ?? 0
		};
	}
	return {
		key: item.id,
		itemId: item.id,
		start: item.start.getTime(),
		end: item.end.getTime(),
		allDay: false,
		isRecurring: item.recurringItemId !== undefined,
		originalStart: cloneOrigin(item.originalStart ?? item.start),
		display: item.display ?? 'auto',
		priority: item.priority ?? 0
	};
}

function createOccurrenceSchedule<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	expanded: EventCalendarExpandedOccurrence,
	key: string,
	isRecurring: boolean,
	displayTimeZone: string
): OccurrenceSchedule {
	return {
		key,
		itemId: item.id,
		start: expanded.allDay
			? startOfZonedDay(expanded.start, displayTimeZone).getTime()
			: expanded.start.getTime(),
		end: expanded.allDay
			? startOfZonedDay(expanded.end, displayTimeZone).getTime()
			: expanded.end.getTime(),
		allDay: expanded.allDay,
		isRecurring,
		originalStart: cloneOrigin(expanded.originalStart),
		display: item.display ?? 'auto',
		priority: item.priority ?? 0
	};
}

function createSegmentSchedules(
	occurrences: readonly OccurrenceSchedule[],
	displayTimeZone: string,
	range: EventCalendarRange,
	visibleDays: ReadonlySet<EventCalendarDateOnly> | null
): readonly SegmentSchedule[] {
	const segments: SegmentSchedule[] = [];
	for (const occurrence of occurrences) {
		const projectedStart = Math.max(occurrence.start, range.start.getTime());
		const projectedEnd = Math.min(occurrence.end, range.end.getTime());
		const startDay = getZonedDay(new Date(projectedStart), displayTimeZone);
		const finalDay = getFinalOccurrenceDay(
			{ ...occurrence, start: projectedStart, end: projectedEnd },
			displayTimeZone
		);
		let segmentIndex = 0;
		for (let day = startDay; day <= finalDay; day = addCivilDays(day, 1)) {
			const dayStart = startOfZonedDay(day, displayTimeZone).getTime();
			const dayEnd = startOfZonedDay(addCivilDays(day, 1), displayTimeZone).getTime();
			const start = Math.max(occurrence.start, dayStart);
			const end = Math.min(occurrence.end, dayEnd);
			if (visibleDays === null || visibleDays.has(day)) {
				segments.push({
					key: createEventCalendarSegmentKey(occurrence.key, day, segmentIndex),
					occurrenceKey: occurrence.key,
					day,
					start,
					end,
					isStart: occurrence.start >= dayStart,
					isEnd: occurrence.end <= dayEnd,
					continuesBefore: occurrence.start < dayStart,
					continuesAfter: occurrence.end > dayEnd
				});
			}
			segmentIndex += 1;
		}
	}
	return segments;
}

function getFinalOccurrenceDay(
	occurrence: OccurrenceSchedule,
	displayTimeZone: string
): EventCalendarDateOnly {
	if (occurrence.start === occurrence.end) {
		return getZonedDay(new Date(occurrence.start), displayTimeZone);
	}
	return getZonedDay(new Date(occurrence.end - 1), displayTimeZone);
}

function hydrateIndex<TItemFields extends object>(
	schedule: CachedSchedule,
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>,
	visibleDays: readonly EventCalendarDateOnly[] | undefined
): EventCalendarItemIndex<TItemFields> {
	const occurrences = schedule.occurrences.map((occurrence) =>
		hydrateOccurrence(occurrence, itemsById)
	);
	const occurrencesByKey = new Map(occurrences.map((occurrence) => [occurrence.key, occurrence]));
	const semanticSegments = schedule.segments.map((segment) => {
		const occurrence = occurrencesByKey.get(segment.occurrenceKey);
		if (!occurrence) {
			throw new EventCalendarError('invalid-item', 'A segment references a missing occurrence.', {
				occurrenceKey: segment.occurrenceKey
			});
		}
		return {
			key: segment.key,
			occurrence,
			day: segment.day,
			start: new Date(segment.start),
			end: new Date(segment.end),
			isStart: segment.isStart,
			isEnd: segment.isEnd,
			continuesBefore: segment.continuesBefore,
			continuesAfter: segment.continuesAfter
		};
	});
	const visibleDaySet = visibleDays ? new Set(visibleDays) : null;
	const segments = visibleDaySet
		? semanticSegments.filter((segment) => visibleDaySet.has(segment.day))
		: semanticSegments;
	const segmentsByDay = bucketSegments(segments);
	const semanticSegmentsByDay = bucketSegments(semanticSegments);
	const foreground = occurrences.filter((occurrence) => occurrence.item.display !== 'background');
	const background = occurrences.filter((occurrence) => occurrence.item.display === 'background');
	return {
		occurrences,
		foreground,
		background,
		segments,
		segmentsByDay,
		occurrencesByKey,
		scheduleIdentity: schedule.identity,
		getOccurrence: (key) => occurrencesByKey.get(key) ?? null,
		getOccurrences: (range) => {
			if (!range) return occurrences;
			assertValidRange(range, 'occurrence query range');
			return occurrences.filter((occurrence) =>
				occurrenceIntersects(occurrence.start.getTime(), occurrence.end.getTime(), range)
			);
		},
		getOccurrencesForDay: (day) => {
			assertDateOnly(day, 'day');
			const bucket = semanticSegmentsByDay.get(day);
			if (!bucket) return [];
			const dayOccurrences: EventCalendarOccurrence<TItemFields>[] = [];
			const keys = new Set<string>();
			for (const segment of bucket.all) {
				if (keys.has(segment.occurrence.key)) continue;
				keys.add(segment.occurrence.key);
				dayOccurrences.push(segment.occurrence);
			}
			return dayOccurrences;
		}
	};
}

function hydrateOccurrence<TItemFields extends object>(
	schedule: OccurrenceSchedule,
	itemsById: ReadonlyMap<string, EventCalendarItem<TItemFields>>
): EventCalendarOccurrence<TItemFields> {
	const item = itemsById.get(schedule.itemId);
	if (!item) {
		throw new EventCalendarError(
			'invalid-item',
			`Occurrence references missing item ${schedule.itemId}.`
		);
	}
	return {
		key: schedule.key,
		item,
		start: new Date(schedule.start),
		end: new Date(schedule.end),
		allDay: schedule.allDay,
		isRecurring: schedule.isRecurring,
		originalStart: cloneOrigin(schedule.originalStart)
	};
}

function bucketSegments<TItemFields extends object>(
	segments: readonly EventCalendarSegment<TItemFields>[]
): ReadonlyMap<EventCalendarDateOnly, EventCalendarDayBucket<TItemFields>> {
	type MutableBucket = {
		all: EventCalendarSegment<TItemFields>[];
		foreground: EventCalendarSegment<TItemFields>[];
		background: EventCalendarSegment<TItemFields>[];
		allDay: EventCalendarSegment<TItemFields>[];
		timed: EventCalendarSegment<TItemFields>[];
	};
	const buckets = new Map<EventCalendarDateOnly, MutableBucket>();
	for (const segment of segments) {
		let bucket = buckets.get(segment.day);
		if (!bucket) {
			bucket = { all: [], foreground: [], background: [], allDay: [], timed: [] };
			buckets.set(segment.day, bucket);
		}
		bucket.all.push(segment);
		if (segment.occurrence.item.display === 'background') bucket.background.push(segment);
		else bucket.foreground.push(segment);
		if (segment.occurrence.allDay) bucket.allDay.push(segment);
		else bucket.timed.push(segment);
	}
	return buckets;
}

function getScheduleSignature<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>
): string {
	const schedules = options.items.map(getItemSchedule);
	const expanderIdentity = options.expandRecurrence
		? getFunctionIdentity(options.expandRecurrence)
		: 0;
	return stableSerialize([
		options.profileKey,
		options.range.start.getTime(),
		options.range.end.getTime(),
		options.displayTimeZone,
		expanderIdentity,
		schedules
	]);
}

function getItemSchedule<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>
): ItemSchedule {
	return {
		id: item.id,
		resourceId: item.resourceId,
		allDay: item.allDay === true,
		start: cloneOrigin(item.start),
		end: cloneOrigin(item.end),
		display: item.display ?? 'auto',
		priority: item.priority ?? 0,
		recurrence: item.recurrence,
		recurrenceTimeZone: item.recurrenceTimeZone,
		recurringItemId: item.recurringItemId,
		originalStart: item.originalStart ? cloneOrigin(item.originalStart) : undefined
	};
}

function getQueryKey<TItemFields extends object>(
	options: CreateEventCalendarItemIndexOptions<TItemFields>
): string {
	const expanderIdentity = options.expandRecurrence
		? getFunctionIdentity(options.expandRecurrence)
		: 0;
	return JSON.stringify([
		options.profileKey,
		options.range.start.getTime(),
		options.range.end.getTime(),
		options.displayTimeZone,
		options.visibleDays ?? null,
		expanderIdentity
	]);
}

function getFunctionIdentity(callback: object): number {
	let identity = functionIdentities.get(callback);
	if (identity) return identity;
	identity = nextFunctionIdentity;
	nextFunctionIdentity += 1;
	functionIdentities.set(callback, identity);
	return identity;
}

function trimSharedScheduleCache(): void {
	while (sharedScheduleCache.size > MAX_SHARED_SCHEDULE_CACHE_ENTRIES) {
		const oldest = sharedScheduleCache.keys().next().value;
		if (oldest === undefined) return;
		sharedScheduleCache.delete(oldest);
	}
}

function occurrenceIntersects(start: number, end: number, range: EventCalendarRange): boolean {
	if (start === end) return start >= range.start.getTime() && start < range.end.getTime();
	return start < range.end.getTime() && range.start.getTime() < end;
}

function compareOccurrenceSchedules(left: OccurrenceSchedule, right: OccurrenceSchedule): number {
	return compareOccurrenceValues(
		left.start,
		left.end,
		left.priority,
		left.key,
		right.start,
		right.end,
		right.priority,
		right.key
	);
}

function compareOccurrenceValues(
	leftStart: number,
	leftEnd: number,
	leftPriority: number,
	leftKey: string,
	rightStart: number,
	rightEnd: number,
	rightPriority: number,
	rightKey: string
): number {
	if (leftStart !== rightStart) return leftStart - rightStart;
	const leftDuration = leftEnd - leftStart;
	const rightDuration = rightEnd - rightStart;
	if (leftDuration !== rightDuration) return rightDuration - leftDuration;
	if (leftPriority !== rightPriority) return rightPriority - leftPriority;
	return leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
}

function encodeKey(namespace: string, parts: readonly string[]): string {
	return `${namespace.length}:${namespace}${parts.map((part) => `${part.length}:${part}`).join('')}`;
}

function decodeKey(key: string): { namespace: string; values: string[] } | null {
	let cursor = 0;
	const readPart = (): string | null => {
		const separator = key.indexOf(':', cursor);
		if (separator < 0) return null;
		const length = Number(key.slice(cursor, separator));
		if (!Number.isInteger(length) || length < 0) return null;
		const start = separator + 1;
		const end = start + length;
		if (end > key.length) return null;
		cursor = end;
		return key.slice(start, end);
	};
	const namespace = readPart();
	if (namespace === null) return null;
	const values: string[] = [];
	while (cursor < key.length) {
		const value = readPart();
		if (value === null) return null;
		values.push(value);
	}
	return { namespace, values };
}

function canonicalOrigin(origin: Date | EventCalendarDateOnly): string {
	return origin instanceof Date ? `instant:${origin.getTime()}` : `day:${origin}`;
}

function cloneOrigin<T extends Date | EventCalendarDateOnly>(origin: T): T {
	return (origin instanceof Date ? new Date(origin) : origin) as T;
}

function civilDayDifference(start: EventCalendarDateOnly, end: EventCalendarDateOnly): number {
	return civilSerial(end) - civilSerial(start);
}

function civilSerial(day: EventCalendarDateOnly): number {
	const [yearValue, monthValue, dayValue] = day.split('-').map(Number);
	let year = yearValue;
	let month = monthValue;
	if (month <= 2) {
		year -= 1;
		month += 12;
	}
	const era = Math.floor(year / 400);
	const yearOfEra = year - era * 400;
	const dayOfYear = Math.floor((153 * (month - 3) + 2) / 5) + dayValue - 1;
	return (
		era * 146097 +
		yearOfEra * 365 +
		Math.floor(yearOfEra / 4) -
		Math.floor(yearOfEra / 100) +
		dayOfYear
	);
}

function stableSerialize(value: unknown): string {
	if (value instanceof Date) return `date:${value.getTime()}`;
	if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
	if (value && typeof value === 'object') {
		const entries = Object.entries(value)
			.filter(([, entry]) => entry !== undefined)
			.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
		return `{${entries
			.map(([key, entry]) => `${JSON.stringify(key)}:${stableSerialize(entry)}`)
			.join(',')}}`;
	}
	return JSON.stringify(value);
}
