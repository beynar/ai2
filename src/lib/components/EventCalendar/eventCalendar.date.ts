import { TZDateMini, tzOffset, tzScan } from '@date-fns/tz';
import { EventCalendarError } from './eventCalendar.error.js';
import type {
	EventCalendarDateOnly,
	EventCalendarRange,
	EventCalendarRangeChangeInfo,
	EventCalendarView,
	EventCalendarWeekday
} from './eventCalendar.types.js';

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const FIXED_OFFSET_TIME_ZONE_PATTERN = /^[+-]\d{2}(?::?\d{2})?$/;
const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const MAX_VISIBLE_DAY_SCAN = 100_000;
const MAX_NEARBY_VISIBLE_DAY_SCAN = 8;

type CivilDate = {
	year: number;
	month: number;
	day: number;
};

export type EventCalendarWallTime = CivilDate & {
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
};

export type EventCalendarDateProfileOptions = {
	view: EventCalendarView;
	date: Date;
	timeZone: string;
	locale: string;
	weekStartsOn: EventCalendarWeekday;
	fixedWeeks: boolean;
	showOutsideDays: boolean;
	showWeekends: boolean;
	weekendDays: readonly EventCalendarWeekday[];
	dayCount: number;
	agendaDayCount: number;
	validRange?: EventCalendarRange;
};

export type EventCalendarSnapMode = 'floor' | 'round' | 'ceil';
export type EventCalendarNavigationIncrement = Readonly<
	| { unit: 'month'; amount: number }
	| { unit: 'civil-day'; amount: number }
	| { unit: 'visible-day'; amount: number }
>;

export type EventCalendarDateProfile = EventCalendarRangeChangeInfo & {
	locale: string;
	title: string;
	navigationIncrement: EventCalendarNavigationIncrement;
};

type ZoneTransition = {
	instant: number;
	beforeOffset: number;
	afterOffset: number;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();
const transitionCache = new Map<string, readonly ZoneTransition[]>();
const validTimeZoneCache = new Set<string>();
const localeCache = new Map<string, string>();

export function assertValidInstant(value: Date, name = 'date'): void {
	if (value instanceof Date && Number.isFinite(value.getTime())) return;
	throw new EventCalendarError('invalid-prop', `${name} must be a valid Date instant.`, {
		prop: name
	});
}

export function assertValidTimeZone(timeZone: string): void {
	if (typeof timeZone !== 'string' || timeZone.length === 0) {
		throw new EventCalendarError('invalid-time-zone', 'timeZone must be a non-empty string.', {
			timeZone
		});
	}
	if (FIXED_OFFSET_TIME_ZONE_PATTERN.test(timeZone)) {
		throw new EventCalendarError(
			'invalid-time-zone',
			`timeZone must be a supported IANA name or UTC: ${timeZone}.`,
			{ timeZone }
		);
	}
	if (validTimeZoneCache.has(timeZone)) return;

	try {
		new Intl.DateTimeFormat('en', { timeZone }).format(0);
		validTimeZoneCache.add(timeZone);
	} catch (error) {
		throw new EventCalendarError(
			'invalid-time-zone',
			`timeZone must be a supported IANA name or UTC: ${timeZone}.`,
			{ timeZone, cause: error instanceof Error ? error.message : String(error) }
		);
	}
}

export function normalizeLocale(locale: string): string {
	if (typeof locale !== 'string' || locale.length === 0) {
		throw new EventCalendarError('invalid-prop', 'locale must be a non-empty BCP-47 tag.', {
			prop: 'locale',
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
		throw new EventCalendarError('invalid-prop', `locale must be a valid BCP-47 tag: ${locale}.`, {
			prop: 'locale',
			locale,
			cause: error instanceof Error ? error.message : String(error)
		});
	}
}

export function parseDateOnly(value: string, name = 'date'): CivilDate {
	const match = DATE_ONLY_PATTERN.exec(value);
	if (!match) {
		throw new EventCalendarError('invalid-prop', `${name} must use canonical YYYY-MM-DD form.`, {
			prop: name,
			value
		});
	}

	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	if (year === 0 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
		throw new EventCalendarError('invalid-prop', `${name} must be a real Gregorian date.`, {
			prop: name,
			value
		});
	}
	return { year, month, day };
}

export function assertDateOnly(
	value: unknown,
	name = 'date'
): asserts value is EventCalendarDateOnly {
	if (typeof value !== 'string') {
		throw new EventCalendarError('invalid-prop', `${name} must be a YYYY-MM-DD string.`, {
			prop: name,
			value
		});
	}
	parseDateOnly(value, name);
}

export function isDateOnly(value: unknown): value is EventCalendarDateOnly {
	if (typeof value !== 'string') return false;
	try {
		parseDateOnly(value);
		return true;
	} catch (error) {
		if (error instanceof EventCalendarError) return false;
		throw error;
	}
}

export function toDateOnly(parts: CivilDate): EventCalendarDateOnly {
	if (
		!Number.isInteger(parts.year) ||
		!Number.isInteger(parts.month) ||
		!Number.isInteger(parts.day) ||
		parts.year < 1 ||
		parts.year > 9999 ||
		parts.month < 1 ||
		parts.month > 12 ||
		parts.day < 1 ||
		parts.day > daysInMonth(parts.year, parts.month)
	) {
		throw new EventCalendarError('invalid-prop', 'Civil parts must form a real Gregorian date.', {
			...parts
		});
	}
	const value = `${String(parts.year).padStart(4, '0')}-${String(parts.month).padStart(2, '0')}-${String(
		parts.day
	).padStart(2, '0')}`;
	assertDateOnly(value);
	return value;
}

export function getZonedParts(instant: Date, timeZone: string): Required<EventCalendarWallTime> {
	assertValidInstant(instant);
	assertValidTimeZone(timeZone);
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

export function getZonedDay(instant: Date, timeZone: string): EventCalendarDateOnly {
	return toDateOnly(getZonedParts(instant, timeZone));
}

/**
 * Resolve an RFC 5545 wall time without relying on host-zone constructor behavior.
 * Repeats choose the earliest matching instant; gaps apply the offset before the transition.
 */
export function resolveZonedDateTime(wallTime: EventCalendarWallTime, timeZone: string): Date {
	assertValidTimeZone(timeZone);
	const normalized = normalizeWallTime(wallTime);
	const localTimestamp = toUtcSurrogate(normalized);
	const transitions = getZoneTransitions(timeZone, normalized.year);
	const candidateOffsets = new Set<number>();

	for (const transition of transitions) {
		candidateOffsets.add(transition.beforeOffset);
		candidateOffsets.add(transition.afterOffset);
	}
	for (const delta of [-370, -2, -1, 0, 1, 2, 370]) {
		candidateOffsets.add(tzOffset(timeZone, new Date(localTimestamp + delta * 24 * HOUR_MS)));
	}

	const matchingInstants: number[] = [];
	for (const offset of candidateOffsets) {
		if (!Number.isFinite(offset)) continue;
		const candidate = new Date(localTimestamp - offset * MINUTE_MS);
		if (wallTimesEqual(getZonedParts(candidate, timeZone), normalized)) {
			matchingInstants.push(candidate.getTime());
		}
	}

	if (matchingInstants.length > 0) {
		return new Date(Math.min(...matchingInstants));
	}

	for (const transition of transitions) {
		if (transition.afterOffset <= transition.beforeOffset) continue;
		const localBefore = transition.instant + transition.beforeOffset * MINUTE_MS;
		const localAfter = transition.instant + transition.afterOffset * MINUTE_MS;
		if (localTimestamp >= localBefore && localTimestamp < localAfter) {
			return new Date(localTimestamp - transition.beforeOffset * MINUTE_MS);
		}
	}

	throw new EventCalendarError('invalid-prop', 'The wall time could not be resolved.', {
		timeZone,
		wallTime: normalized
	});
}

export function startOfZonedDay(day: EventCalendarDateOnly, timeZone: string): Date {
	const civil = parseDateOnly(day);
	return resolveZonedDateTime({ ...civil, hour: 0 }, timeZone);
}

export function endOfZonedDay(day: EventCalendarDateOnly, timeZone: string): Date {
	return startOfZonedDay(addCivilDays(day, 1), timeZone);
}

export function addCivilDays(day: EventCalendarDateOnly, amount: number): EventCalendarDateOnly {
	assertInteger(amount, 'amount');
	const civil = parseDateOnly(day);
	const date = civilToUtcDate(civil);
	date.setUTCDate(date.getUTCDate() + amount);
	return toDateOnly({
		year: date.getUTCFullYear(),
		month: date.getUTCMonth() + 1,
		day: date.getUTCDate()
	});
}

export function addCivilMonths(day: EventCalendarDateOnly, amount: number): EventCalendarDateOnly {
	assertInteger(amount, 'amount');
	const { year, month, day: dayOfMonth } = parseDateOnly(day);
	const monthIndex = year * 12 + month - 1 + amount;
	const nextYear = Math.floor(monthIndex / 12);
	const nextMonth = modulo(monthIndex, 12) + 1;
	return toDateOnly({
		year: nextYear,
		month: nextMonth,
		day: Math.min(dayOfMonth, daysInMonth(nextYear, nextMonth))
	});
}

export function getCivilWeekday(day: EventCalendarDateOnly): EventCalendarWeekday {
	const weekday = civilToUtcDate(parseDateOnly(day)).getUTCDay();
	assertWeekday(weekday, 'weekday');
	return weekday;
}

export function startOfCivilWeek(
	day: EventCalendarDateOnly,
	weekStartsOn: EventCalendarWeekday
): EventCalendarDateOnly {
	const difference = modulo(getCivilWeekday(day) - weekStartsOn, 7);
	return addCivilDays(day, -difference);
}

export function enumerateInstantSlots(
	day: EventCalendarDateOnly,
	timeZone: string,
	startMinutes: number,
	endMinutes: number,
	intervalMinutes: number
): readonly Date[] {
	assertMinuteOfDay(startMinutes, 'startMinutes', true);
	assertMinuteOfDay(endMinutes, 'endMinutes', true);
	assertPositiveInteger(intervalMinutes, 'intervalMinutes');
	if (startMinutes >= endMinutes) {
		throw new EventCalendarError('invalid-prop', 'startMinutes must be before endMinutes.', {
			startMinutes,
			endMinutes
		});
	}

	const start = resolveMinutesOnDay(day, startMinutes, timeZone);
	const end = resolveMinutesOnDay(day, endMinutes, timeZone);
	const slots: Date[] = [];
	for (
		let instant = start.getTime();
		instant < end.getTime();
		instant += intervalMinutes * MINUTE_MS
	) {
		slots.push(new Date(instant));
	}
	return slots;
}

export function rangesIntersect(left: EventCalendarRange, right: EventCalendarRange): boolean {
	assertValidRange(left);
	assertValidRange(right);
	return left.start.getTime() < right.end.getTime() && right.start.getTime() < left.end.getTime();
}

export function intersectRanges(
	range: EventCalendarRange,
	boundary: EventCalendarRange
): EventCalendarRange {
	assertValidRange(range);
	assertValidRange(boundary);
	const start = Math.max(range.start.getTime(), boundary.start.getTime());
	const end = Math.min(range.end.getTime(), boundary.end.getTime());
	if (start <= end) return { start: new Date(start), end: new Date(end) };
	const edge = range.end.getTime() <= boundary.start.getTime() ? boundary.start : boundary.end;
	return { start: new Date(edge), end: new Date(edge) };
}

export function assertValidRange(range: EventCalendarRange, name = 'range'): void {
	if (!range || typeof range !== 'object') {
		throw new EventCalendarError('invalid-prop', `${name} must be a half-open date range.`, {
			prop: name
		});
	}
	assertValidInstant(range.start, `${name}.start`);
	assertValidInstant(range.end, `${name}.end`);
	if (range.end.getTime() < range.start.getTime()) {
		throw new EventCalendarError('invalid-prop', `${name}.end must not precede ${name}.start.`, {
			prop: name
		});
	}
}

export function generateVisibleDays(
	start: EventCalendarDateOnly,
	end: EventCalendarDateOnly,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>
): readonly EventCalendarDateOnly[] {
	parseDateOnly(start, 'start');
	parseDateOnly(end, 'end');
	if (start > end) {
		throw new EventCalendarError('invalid-prop', 'Visible-day start must not follow its end.', {
			start,
			end
		});
	}
	assertSomeWeekdayVisible(hiddenWeekdays);

	const days: EventCalendarDateOnly[] = [];
	let day = start;
	let scanned = 0;
	while (day < end) {
		if (!hiddenWeekdays.has(getCivilWeekday(day))) days.push(day);
		day = addCivilDays(day, 1);
		scanned += 1;
		if (scanned > MAX_VISIBLE_DAY_SCAN) {
			throw new EventCalendarError(
				'invalid-prop',
				'Visible-day generation exceeded its safe bound.',
				{
					start,
					end
				}
			);
		}
	}
	return days;
}

export function generateVisibleDayCount(
	start: EventCalendarDateOnly,
	count: number,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>
): readonly EventCalendarDateOnly[] {
	parseDateOnly(start, 'start');
	assertPositiveInteger(count, 'count');
	assertSomeWeekdayVisible(hiddenWeekdays);
	if (hiddenWeekdays.has(getCivilWeekday(start))) {
		throw new EventCalendarError('invalid-prop', 'The first rendered day cannot be hidden.', {
			start
		});
	}

	const days: EventCalendarDateOnly[] = [];
	let day = start;
	let scanned = 0;
	while (days.length < count) {
		if (!hiddenWeekdays.has(getCivilWeekday(day))) days.push(day);
		day = addCivilDays(day, 1);
		scanned += 1;
		if (scanned > MAX_VISIBLE_DAY_SCAN) {
			throw new EventCalendarError(
				'invalid-prop',
				'Visible-day generation exceeded its safe bound.',
				{
					start,
					count
				}
			);
		}
	}
	return days;
}

export function moveVisibleDays(
	day: EventCalendarDateOnly,
	amount: number,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>
): EventCalendarDateOnly {
	assertInteger(amount, 'amount');
	assertSomeWeekdayVisible(hiddenWeekdays);
	if (amount === 0) return day;
	const direction = Math.sign(amount);
	let remaining = Math.abs(amount);
	let candidate = day;
	while (remaining > 0) {
		candidate = addCivilDays(candidate, direction);
		if (!hiddenWeekdays.has(getCivilWeekday(candidate))) remaining -= 1;
	}
	return candidate;
}

export function snapInstant(
	instant: Date,
	timeZone: string,
	durationMinutes: number,
	mode: EventCalendarSnapMode = 'round'
): Date {
	assertValidInstant(instant);
	assertPositiveInteger(durationMinutes, 'durationMinutes');
	const dayStart = startOfZonedDay(getZonedDay(instant, timeZone), timeZone).getTime();
	const duration = durationMinutes * MINUTE_MS;
	const units = (instant.getTime() - dayStart) / duration;
	return new Date(dayStart + applySnap(units, mode) * duration);
}

export function getWeekNumber(
	day: EventCalendarDateOnly,
	weekStartsOn: EventCalendarWeekday = 1,
	firstWeekContainsDate = 4
): number {
	if (
		!Number.isInteger(firstWeekContainsDate) ||
		firstWeekContainsDate < 1 ||
		firstWeekContainsDate > 7
	) {
		throw new EventCalendarError(
			'invalid-prop',
			'firstWeekContainsDate must be from 1 through 7.',
			{
				firstWeekContainsDate
			}
		);
	}
	const { year } = parseDateOnly(day);
	const currentWeek = startOfCivilWeek(day, weekStartsOn);
	const firstWeek = startOfCivilWeek(
		toDateOnly({ year, month: 1, day: firstWeekContainsDate }),
		weekStartsOn
	);
	if (currentWeek < firstWeek) {
		return getWeekNumber(
			toDateOnly({ year: year - 1, month: 12, day: 31 }),
			weekStartsOn,
			firstWeekContainsDate
		);
	}
	const nextFirstWeek = startOfCivilWeek(
		toDateOnly({ year: year + 1, month: 1, day: firstWeekContainsDate }),
		weekStartsOn
	);
	if (currentWeek >= nextFirstWeek) return 1;
	return civilDayDifference(firstWeek, currentWeek) / 7 + 1;
}

export function getCachedDateTimeFormatter(
	locale: string,
	timeZone: string,
	options: Intl.DateTimeFormatOptions = {}
): Intl.DateTimeFormat {
	assertValidTimeZone(timeZone);
	const normalizedLocale = normalizeLocale(locale);
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

export function createDateProfile(
	options: EventCalendarDateProfileOptions
): EventCalendarDateProfile {
	const locale = assertDateProfileOptions(options);
	const hiddenWeekdays = getHiddenWeekdays(options);
	const anchorDay = getZonedDay(options.date, options.timeZone);
	const profileDays = getProfileDays(options, anchorDay, hiddenWeekdays);
	const currentRange = civilRangeToInstantRange(
		profileDays.currentStart,
		profileDays.currentEnd,
		options.timeZone
	);
	const renderRange = civilRangeToInstantRange(
		profileDays.renderStart,
		profileDays.renderEnd,
		options.timeZone
	);
	const activeSource =
		options.view === 'month' && options.showOutsideDays ? renderRange : currentRange;
	const activeRange = options.validRange
		? intersectRanges(activeSource, options.validRange)
		: cloneRange(activeSource);
	const visibleDays =
		profileDays.count === undefined
			? generateVisibleDays(profileDays.visibleStart, profileDays.visibleEnd, hiddenWeekdays)
			: generateVisibleDayCount(profileDays.visibleStart, profileDays.count, hiddenWeekdays);

	if (visibleDays.length === 0) {
		throw new EventCalendarError('invalid-prop', 'The active profile has no visible day.', {
			view: options.view
		});
	}

	return {
		view: options.view,
		date: new Date(options.date),
		timeZone: options.timeZone,
		locale,
		currentRange,
		renderRange,
		activeRange,
		fetchRange: cloneRange(activeRange),
		visibleDays,
		title: getProfileTitle(options, profileDays),
		navigationIncrement: getNavigationIncrement(options)
	};
}

export function reconcileAnchorDay(
	day: EventCalendarDateOnly,
	timeZone: string,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>,
	validRange?: EventCalendarRange
): EventCalendarDateOnly {
	parseDateOnly(day);
	assertValidTimeZone(timeZone);
	assertSomeWeekdayVisible(hiddenWeekdays);
	if (validRange) assertValidRange(validRange, 'validRange');
	if (isSelectableDay(day, timeZone, hiddenWeekdays, validRange)) return day;
	if (validRange && validRange.start.getTime() === validRange.end.getTime()) {
		throwNoSelectableDay(day, timeZone);
	}

	let next = getNextReconciliationDay(day, timeZone, validRange);
	for (let index = 0; next && index < MAX_NEARBY_VISIBLE_DAY_SCAN; index += 1) {
		if (isSelectableDay(next, timeZone, hiddenWeekdays, validRange)) return next;
		if (validRange && startOfZonedDay(next, timeZone).getTime() >= validRange.end.getTime()) break;
		next = addCivilDays(next, 1);
	}

	let previous = getPreviousReconciliationDay(day, timeZone, validRange);
	for (let index = 0; previous && index < MAX_NEARBY_VISIBLE_DAY_SCAN; index += 1) {
		if (isSelectableDay(previous, timeZone, hiddenWeekdays, validRange)) return previous;
		if (validRange && endOfZonedDay(previous, timeZone).getTime() <= validRange.start.getTime()) {
			break;
		}
		previous = addCivilDays(previous, -1);
	}

	throwNoSelectableDay(day, timeZone);
}

export function getNavigationDate(
	profile: EventCalendarDateProfile,
	direction: -1 | 1,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>
): Date {
	const day = getZonedDay(profile.date, profile.timeZone);
	const amount = direction * profile.navigationIncrement.amount;
	const target =
		profile.navigationIncrement.unit === 'month'
			? addCivilMonths(day, amount)
			: profile.navigationIncrement.unit === 'civil-day'
				? addCivilDays(day, amount)
				: moveVisibleDays(day, amount, hiddenWeekdays);
	return startOfZonedDay(target, profile.timeZone);
}

export function getHiddenWeekdays(options: {
	showWeekends: boolean;
	weekendDays: readonly EventCalendarWeekday[];
}): ReadonlySet<EventCalendarWeekday> {
	return new Set(options.showWeekends ? [] : options.weekendDays);
}

function getProfileDays(
	options: EventCalendarDateProfileOptions,
	anchorDay: EventCalendarDateOnly,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>
): {
	currentStart: EventCalendarDateOnly;
	currentEnd: EventCalendarDateOnly;
	renderStart: EventCalendarDateOnly;
	renderEnd: EventCalendarDateOnly;
	visibleStart: EventCalendarDateOnly;
	visibleEnd: EventCalendarDateOnly;
	count?: number;
} {
	if (options.view === 'month') {
		const civil = parseDateOnly(anchorDay);
		const monthStart = toDateOnly({ year: civil.year, month: civil.month, day: 1 });
		const monthEnd = addCivilMonths(monthStart, 1);
		const renderStart = startOfCivilWeek(monthStart, options.weekStartsOn);
		const renderEnd = options.fixedWeeks
			? addCivilDays(renderStart, 42)
			: addCivilDays(startOfCivilWeek(addCivilDays(monthEnd, -1), options.weekStartsOn), 7);
		return {
			currentStart: monthStart,
			currentEnd: monthEnd,
			renderStart,
			renderEnd,
			visibleStart: options.showOutsideDays ? renderStart : monthStart,
			visibleEnd: options.showOutsideDays ? renderEnd : monthEnd
		};
	}

	if (options.view === 'week') {
		const weekStart = startOfCivilWeek(anchorDay, options.weekStartsOn);
		const weekEnd = addCivilDays(weekStart, 7);
		return {
			currentStart: weekStart,
			currentEnd: weekEnd,
			renderStart: weekStart,
			renderEnd: weekEnd,
			visibleStart: weekStart,
			visibleEnd: weekEnd
		};
	}

	if (hiddenWeekdays.has(getCivilWeekday(anchorDay))) {
		throw new EventCalendarError('invalid-prop', 'The active view anchor falls on a hidden day.', {
			view: options.view,
			anchorDay
		});
	}

	const count =
		options.view === 'days'
			? options.dayCount
			: options.view === 'agenda'
				? options.agendaDayCount
				: 1;
	const visibleDays = generateVisibleDayCount(anchorDay, count, hiddenWeekdays);
	const currentEnd = addCivilDays(visibleDays[visibleDays.length - 1], 1);
	return {
		currentStart: anchorDay,
		currentEnd,
		renderStart: anchorDay,
		renderEnd: currentEnd,
		visibleStart: anchorDay,
		visibleEnd: currentEnd,
		count
	};
}

function getProfileTitle(
	options: EventCalendarDateProfileOptions,
	profileDays: ReturnType<typeof getProfileDays>
): string {
	const start = startOfZonedDay(profileDays.currentStart, options.timeZone);
	if (options.view === 'month') {
		return getCachedDateTimeFormatter(options.locale, options.timeZone, {
			year: 'numeric',
			month: 'long'
		}).format(start);
	}

	const endDay = addCivilDays(profileDays.currentEnd, -1);
	const end = startOfZonedDay(endDay, options.timeZone);
	const formatter = getCachedDateTimeFormatter(options.locale, options.timeZone, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		...(options.view === 'day' || options.view === 'resource' ? { weekday: 'long' as const } : {})
	});
	return start.getTime() === end.getTime()
		? formatter.format(start)
		: formatter.formatRange(start, end);
}

function getNavigationIncrement(
	options: EventCalendarDateProfileOptions
): EventCalendarNavigationIncrement {
	if (options.view === 'month') return { unit: 'month', amount: 1 };
	if (options.view === 'week') return { unit: 'civil-day', amount: 7 };
	if (options.view === 'days') return { unit: 'visible-day', amount: options.dayCount };
	if (options.view === 'agenda') {
		return { unit: 'visible-day', amount: options.agendaDayCount };
	}
	return { unit: 'visible-day', amount: 1 };
}

function assertDateProfileOptions(options: EventCalendarDateProfileOptions): string {
	assertValidInstant(options.date);
	assertValidTimeZone(options.timeZone);
	const locale = normalizeLocale(options.locale);
	assertWeekday(options.weekStartsOn, 'weekStartsOn');
	assertPositiveInteger(options.dayCount, 'dayCount');
	assertPositiveInteger(options.agendaDayCount, 'agendaDayCount');
	if (options.validRange) assertValidRange(options.validRange, 'validRange');
	const seen = new Set<EventCalendarWeekday>();
	for (const weekday of options.weekendDays) {
		assertWeekday(weekday, 'weekendDays');
		if (seen.has(weekday)) {
			throw new EventCalendarError('invalid-prop', 'weekendDays must not contain duplicates.', {
				weekday
			});
		}
		seen.add(weekday);
	}
	assertSomeWeekdayVisible(getHiddenWeekdays(options));
	return locale;
}

function getNextReconciliationDay(
	day: EventCalendarDateOnly,
	timeZone: string,
	validRange?: EventCalendarRange
): EventCalendarDateOnly | null {
	if (!validRange) return addCivilDays(day, 1);
	const dayStart = startOfZonedDay(day, timeZone).getTime();
	const dayEnd = endOfZonedDay(day, timeZone).getTime();
	if (dayStart >= validRange.end.getTime()) return null;
	if (dayEnd <= validRange.start.getTime()) return getZonedDay(validRange.start, timeZone);
	return addCivilDays(day, 1);
}

function getPreviousReconciliationDay(
	day: EventCalendarDateOnly,
	timeZone: string,
	validRange?: EventCalendarRange
): EventCalendarDateOnly | null {
	if (!validRange) return addCivilDays(day, -1);
	const dayStart = startOfZonedDay(day, timeZone).getTime();
	const dayEnd = endOfZonedDay(day, timeZone).getTime();
	if (dayEnd <= validRange.start.getTime()) return null;
	if (dayStart >= validRange.end.getTime()) {
		let rangeEndDay = getZonedDay(validRange.end, timeZone);
		if (startOfZonedDay(rangeEndDay, timeZone).getTime() >= validRange.end.getTime()) {
			rangeEndDay = addCivilDays(rangeEndDay, -1);
		}
		return rangeEndDay;
	}
	return addCivilDays(day, -1);
}

function throwNoSelectableDay(day: EventCalendarDateOnly, timeZone: string): never {
	throw new EventCalendarError('invalid-prop', 'No valid visible day exists for this profile.', {
		day,
		timeZone
	});
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

function normalizeWallTime(wallTime: EventCalendarWallTime): Required<EventCalendarWallTime> {
	const hour = wallTime.hour ?? 0;
	const minute = wallTime.minute ?? 0;
	const second = wallTime.second ?? 0;
	const millisecond = wallTime.millisecond ?? 0;
	const day = toDateOnly(wallTime);
	parseDateOnly(day);
	for (const [name, value, maximum] of [
		['hour', hour, 24],
		['minute', minute, 59],
		['second', second, 59],
		['millisecond', millisecond, 999]
	] as const) {
		if (!Number.isInteger(value) || value < 0 || value > maximum) {
			throw new EventCalendarError(
				'invalid-prop',
				`${name} is outside its valid wall-time range.`,
				{
					[name]: value
				}
			);
		}
	}
	if (hour === 24) {
		if (minute !== 0 || second !== 0 || millisecond !== 0) {
			throw new EventCalendarError('invalid-prop', '24:00 cannot include smaller time units.');
		}
		const next = parseDateOnly(addCivilDays(day, 1));
		return { ...next, hour: 0, minute: 0, second: 0, millisecond: 0 };
	}
	return { ...parseDateOnly(day), hour, minute, second, millisecond };
}

function wallTimesEqual(
	left: Required<EventCalendarWallTime>,
	right: Required<EventCalendarWallTime>
): boolean {
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

function resolveMinutesOnDay(day: EventCalendarDateOnly, minutes: number, timeZone: string): Date {
	const civil = parseDateOnly(day);
	return resolveZonedDateTime(
		{
			...civil,
			hour: Math.floor(minutes / 60),
			minute: minutes % 60
		},
		timeZone
	);
}

function civilRangeToInstantRange(
	start: EventCalendarDateOnly,
	end: EventCalendarDateOnly,
	timeZone: string
): EventCalendarRange {
	return { start: startOfZonedDay(start, timeZone), end: startOfZonedDay(end, timeZone) };
}

function isSelectableDay(
	day: EventCalendarDateOnly,
	timeZone: string,
	hiddenWeekdays: ReadonlySet<EventCalendarWeekday>,
	validRange?: EventCalendarRange
): boolean {
	if (hiddenWeekdays.has(getCivilWeekday(day))) return false;
	if (!validRange) return true;
	return rangesIntersect(
		{ start: startOfZonedDay(day, timeZone), end: endOfZonedDay(day, timeZone) },
		validRange
	);
}

function cloneRange(range: EventCalendarRange): EventCalendarRange {
	return { start: new Date(range.start), end: new Date(range.end) };
}

function assertSomeWeekdayVisible(hiddenWeekdays: ReadonlySet<EventCalendarWeekday>): void {
	if (hiddenWeekdays.size < 7) return;
	throw new EventCalendarError('invalid-prop', 'At least one weekday must remain visible.');
}

function assertWeekday(value: number, name: string): asserts value is EventCalendarWeekday {
	if (Number.isInteger(value) && value >= 0 && value <= 6) return;
	throw new EventCalendarError(
		'invalid-prop',
		`${name} must contain weekday numbers from 0 to 6.`,
		{
			prop: name,
			value
		}
	);
}

function assertPositiveInteger(value: number, name: string): void {
	if (Number.isInteger(value) && value > 0) return;
	throw new EventCalendarError('invalid-prop', `${name} must be a positive integer.`, {
		prop: name,
		value
	});
}

function assertInteger(value: number, name: string): void {
	if (Number.isInteger(value)) return;
	throw new EventCalendarError('invalid-prop', `${name} must be an integer.`, {
		prop: name,
		value
	});
}

function assertMinuteOfDay(value: number, name: string, allowEnd: boolean): void {
	const maximum = allowEnd ? 24 * 60 : 24 * 60 - 1;
	if (Number.isInteger(value) && value >= 0 && value <= maximum) return;
	throw new EventCalendarError('invalid-prop', `${name} is outside the civil day.`, {
		prop: name,
		value
	});
}

function applySnap(value: number, mode: EventCalendarSnapMode): number {
	if (mode === 'floor') return Math.floor(value);
	if (mode === 'ceil') return Math.ceil(value);
	return Math.round(value);
}

function civilDayDifference(start: EventCalendarDateOnly, end: EventCalendarDateOnly): number {
	const startDate = civilToUtcDate(parseDateOnly(start));
	const endDate = civilToUtcDate(parseDateOnly(end));
	let difference = 0;
	while (startDate < endDate) {
		startDate.setUTCDate(startDate.getUTCDate() + 1);
		difference += 1;
	}
	while (startDate > endDate) {
		startDate.setUTCDate(startDate.getUTCDate() - 1);
		difference -= 1;
	}
	return difference;
}

function daysInMonth(year: number, month: number): number {
	const date = utcDate({ year, month: month + 1, day: 0 }, 0, 0, 0, 0);
	return date.getUTCDate();
}

function civilToUtcDate(civil: CivilDate): Date {
	return utcDate(civil, 0, 0, 0, 0);
}

function toUtcSurrogate(wallTime: Required<EventCalendarWallTime>): number {
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

function modulo(value: number, divisor: number): number {
	return ((value % divisor) + divisor) % divisor;
}
