import { TZDateMini, tzOffset, tzScan } from '@date-fns/tz';
import {
	addCivilDateDays,
	formatCivilDate,
	parseCivilDate,
	type CivilDate,
	type CivilDateOnly
} from './civilDate.js';
import {
	assertScheduleInstant,
	snapScheduleInstant,
	type ScheduleSnapMode
} from './scheduleRange.js';

const FIXED_OFFSET_TIME_ZONE_PATTERN = /^[+-]\d{2}(?::?\d{2})?$/;
const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export type ZonedWallTime = CivilDate & {
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
};

type ResolvedWallTime = Required<ZonedWallTime>;
type ZoneTransition = Readonly<{
	instant: number;
	beforeOffset: number;
	afterOffset: number;
}>;

export class ZonedTimeError extends RangeError {
	readonly name = 'ZonedTimeError';

	constructor(
		readonly code:
			'invalid-time-zone' | 'invalid-locale' | 'invalid-wall-time' | 'unresolved-wall-time',
		message: string,
		readonly details?: Readonly<Record<string, unknown>>
	) {
		super(message);
	}
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();
const transitionCache = new Map<string, readonly ZoneTransition[]>();
const validTimeZoneCache = new Set<string>();
const localeCache = new Map<string, string>();

export function assertIanaTimeZone(timeZone: string): void {
	if (
		typeof timeZone !== 'string' ||
		timeZone.length === 0 ||
		FIXED_OFFSET_TIME_ZONE_PATTERN.test(timeZone)
	) {
		throw new ZonedTimeError(
			'invalid-time-zone',
			`Time zone must be a supported IANA name or UTC: ${String(timeZone)}.`,
			{ timeZone }
		);
	}
	if (validTimeZoneCache.has(timeZone)) return;
	try {
		new Intl.DateTimeFormat('en', { timeZone }).format(0);
		validTimeZoneCache.add(timeZone);
	} catch (error) {
		throw new ZonedTimeError(
			'invalid-time-zone',
			`Time zone must be a supported IANA name or UTC: ${timeZone}.`,
			{ timeZone, cause: error instanceof Error ? error.message : String(error) }
		);
	}
}

export function normalizeFormattingLocale(locale: string): string {
	if (typeof locale !== 'string' || locale.length === 0) {
		throw new ZonedTimeError('invalid-locale', 'Locale must be a non-empty BCP-47 tag.', {
			locale
		});
	}
	const cached = localeCache.get(locale);
	if (cached) return cached;
	try {
		const [normalized] = Intl.getCanonicalLocales(locale);
		if (!normalized) throw new RangeError('No locale was returned.');
		localeCache.set(locale, normalized);
		return normalized;
	} catch (error) {
		throw new ZonedTimeError('invalid-locale', `Locale must be a valid BCP-47 tag: ${locale}.`, {
			locale,
			cause: error instanceof Error ? error.message : String(error)
		});
	}
}

export function getInstantZonedParts(instant: Date, timeZone: string): ResolvedWallTime {
	assertScheduleInstant(instant);
	assertIanaTimeZone(timeZone);
	const zoned = new TZDateMini(instant.getTime(), timeZone);
	return {
		year: zoned.getFullYear(),
		month: zoned.getMonth() + 1,
		day: zoned.getDate(),
		hour: zoned.getHours(),
		minute: zoned.getMinutes(),
		second: zoned.getSeconds(),
		millisecond: zoned.getMilliseconds()
	};
}

export function getInstantZonedDay(instant: Date, timeZone: string): CivilDateOnly {
	return formatCivilDate(getInstantZonedParts(instant, timeZone));
}

/**
 * Resolves wall time without host-zone constructors. Repeats choose the earliest
 * matching instant; gaps use the offset before the transition.
 */
export function resolveZonedWallTime(wallTime: ZonedWallTime, timeZone: string): Date {
	assertIanaTimeZone(timeZone);
	const normalized = normalizeWallTime(wallTime);
	const localTimestamp = toUtcSurrogate(normalized);
	const transitions = getZoneTransitions(timeZone, normalized.year);
	const candidateOffsets = new Set<number>();

	for (const transition of transitions) {
		candidateOffsets.add(transition.beforeOffset);
		candidateOffsets.add(transition.afterOffset);
	}
	for (const delta of [-370, -2, -1, 0, 1, 2, 370]) {
		candidateOffsets.add(tzOffset(timeZone, new Date(localTimestamp + delta * DAY_MS)));
	}

	const matchingInstants: number[] = [];
	for (const offset of candidateOffsets) {
		if (!Number.isFinite(offset)) continue;
		const candidate = new Date(localTimestamp - offset * MINUTE_MS);
		if (wallTimesEqual(getInstantZonedParts(candidate, timeZone), normalized)) {
			matchingInstants.push(candidate.getTime());
		}
	}
	if (matchingInstants.length > 0) return new Date(Math.min(...matchingInstants));

	for (const transition of transitions) {
		if (transition.afterOffset <= transition.beforeOffset) continue;
		const localBefore = transition.instant + transition.beforeOffset * MINUTE_MS;
		const localAfter = transition.instant + transition.afterOffset * MINUTE_MS;
		if (localTimestamp >= localBefore && localTimestamp < localAfter) {
			return new Date(localTimestamp - transition.beforeOffset * MINUTE_MS);
		}
	}

	throw new ZonedTimeError('unresolved-wall-time', 'The wall time could not be resolved.', {
		timeZone,
		wallTime: normalized
	});
}

export function startOfZonedCivilDay(day: CivilDateOnly, timeZone: string): Date {
	return resolveZonedWallTime({ ...parseCivilDate(day), hour: 0 }, timeZone);
}

export function endOfZonedCivilDay(day: CivilDateOnly, timeZone: string): Date {
	return startOfZonedCivilDay(formatCivilDate(addCivilDateDays(parseCivilDate(day), 1)), timeZone);
}

/** Resolves a whole wall minute on a civil day; 1440 is the next day's boundary. */
export function resolveZonedMinuteOnDay(
	day: CivilDateOnly,
	minutes: number,
	timeZone: string
): Date {
	if (!Number.isInteger(minutes) || minutes < 0 || minutes > 1440) {
		throw new ZonedTimeError('invalid-wall-time', 'Minutes are outside the civil day.', {
			minutes
		});
	}
	const civil = parseCivilDate(day);
	return resolveZonedWallTime(
		{ ...civil, hour: Math.floor(minutes / 60), minute: minutes % 60 },
		timeZone
	);
}

export function snapInstantWithinZonedDay(
	instant: Date,
	timeZone: string,
	durationMinutes: number,
	mode: ScheduleSnapMode = 'round'
): Date {
	if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
		throw new ZonedTimeError('invalid-wall-time', 'durationMinutes must be a positive integer.', {
			durationMinutes
		});
	}
	const dayStart = startOfZonedCivilDay(getInstantZonedDay(instant, timeZone), timeZone);
	return snapScheduleInstant(instant, dayStart, durationMinutes * MINUTE_MS, mode);
}

export function getDateTimeFormatter(
	locale: string,
	timeZone: string,
	options: Intl.DateTimeFormatOptions = {}
): Intl.DateTimeFormat {
	assertIanaTimeZone(timeZone);
	const normalizedLocale = normalizeFormattingLocale(locale);
	const normalizedOptions = Object.entries(options).sort(([left], [right]) =>
		left.localeCompare(right)
	);
	const key = JSON.stringify([normalizedLocale, timeZone, normalizedOptions]);
	let formatter = formatterCache.get(key);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(normalizedLocale, { ...options, timeZone });
		formatterCache.set(key, formatter);
	}
	return formatter;
}

function getZoneTransitions(timeZone: string, year: number): readonly ZoneTransition[] {
	const cacheKey = `${timeZone}:${year}`;
	const cached = transitionCache.get(cacheKey);
	if (cached) return cached;
	const start = utcDate({ year: year - 1, month: 12, day: 1 }, 0, 0, 0, 0);
	const end = utcDate({ year: year + 1, month: 2, day: 1 }, 0, 0, 0, 0);
	const transitions = tzScan(timeZone, { start, end }).map((change) => {
		const beforeOffset = change.offset - change.change;
		return {
			instant: refineTransition(timeZone, change.date.getTime(), beforeOffset, change.offset),
			beforeOffset,
			afterOffset: change.offset
		};
	});
	transitionCache.set(cacheKey, transitions);
	return transitions;
}

function refineTransition(
	timeZone: string,
	approximate: number,
	beforeOffset: number,
	afterOffset: number
): number {
	let low = approximate - 6 * HOUR_MS;
	let high = approximate + 6 * HOUR_MS;
	while (tzOffset(timeZone, new Date(low)) !== beforeOffset) low -= 6 * HOUR_MS;
	while (tzOffset(timeZone, new Date(high)) !== afterOffset) high += 6 * HOUR_MS;
	while (high - low > 1) {
		const middle = Math.floor((low + high) / 2);
		if (tzOffset(timeZone, new Date(middle)) === beforeOffset) low = middle;
		else high = middle;
	}
	return high;
}

function normalizeWallTime(wallTime: ZonedWallTime): ResolvedWallTime {
	const hour = wallTime.hour ?? 0;
	const minute = wallTime.minute ?? 0;
	const second = wallTime.second ?? 0;
	const millisecond = wallTime.millisecond ?? 0;
	for (const [name, value, maximum] of [
		['hour', hour, 24],
		['minute', minute, 59],
		['second', second, 59],
		['millisecond', millisecond, 999]
	] as const) {
		if (Number.isInteger(value) && value >= 0 && value <= maximum) continue;
		throw new ZonedTimeError('invalid-wall-time', `${name} is outside its valid wall-time range.`, {
			[name]: value
		});
	}
	const civil = parseCivilDate(formatCivilDate(wallTime));
	if (hour !== 24) return { ...civil, hour, minute, second, millisecond };
	if (minute !== 0 || second !== 0 || millisecond !== 0) {
		throw new ZonedTimeError('invalid-wall-time', '24:00 cannot include smaller time units.');
	}
	return {
		...addCivilDateDays(civil, 1),
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	};
}

function wallTimesEqual(left: ResolvedWallTime, right: ResolvedWallTime): boolean {
	return (
		left.year === right.year &&
		left.month === right.month &&
		left.day === right.day &&
		left.hour === right.hour &&
		left.minute === right.minute &&
		left.second === right.second &&
		left.millisecond === right.millisecond
	);
}

function toUtcSurrogate(wallTime: ResolvedWallTime): number {
	return utcDate(
		wallTime,
		wallTime.hour,
		wallTime.minute,
		wallTime.second,
		wallTime.millisecond
	).getTime();
}

function utcDate(
	civil: CivilDate,
	hour: number,
	minute: number,
	second: number,
	millisecond: number
): Date {
	const date = new Date(0);
	date.setUTCFullYear(civil.year, civil.month - 1, civil.day);
	date.setUTCHours(hour, minute, second, millisecond);
	return date;
}
