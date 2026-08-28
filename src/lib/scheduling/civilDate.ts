const CANONICAL_CIVIL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const CIVIL_DAY_MS = 86_400_000;

export type CivilDate = Readonly<{
	year: number;
	month: number;
	day: number;
}>;

export type CivilDateOnly = `${number}-${number}-${number}`;
export type CivilWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CivilDateErrorCode =
	'invalid-format' | 'invalid-date' | 'invalid-amount' | 'outside-supported-range';

export class CivilDateError extends RangeError {
	readonly name = 'CivilDateError';

	constructor(
		readonly code: CivilDateErrorCode,
		message: string,
		readonly details?: Readonly<Record<string, unknown>>
	) {
		super(message);
	}
}

export function parseCivilDate(value: string): CivilDate {
	if (typeof value !== 'string') {
		throw new CivilDateError('invalid-format', 'Civil dates must be strings.', { value });
	}
	const match = CANONICAL_CIVIL_DATE_PATTERN.exec(value);
	if (!match) {
		throw new CivilDateError('invalid-format', 'Civil dates must use canonical YYYY-MM-DD form.', {
			value
		});
	}
	const civil = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
	assertCivilDate(civil);
	return civil;
}

export function isCivilDateOnly(value: unknown): value is CivilDateOnly {
	if (typeof value !== 'string') return false;
	try {
		parseCivilDate(value);
		return true;
	} catch (error) {
		if (error instanceof CivilDateError) return false;
		throw error;
	}
}

export function formatCivilDate(civil: CivilDate): CivilDateOnly {
	assertCivilDate(civil);
	const formatted = `${String(civil.year).padStart(4, '0')}-${String(civil.month).padStart(2, '0')}-${String(
		civil.day
	).padStart(2, '0')}`;
	if (isCivilDateOnly(formatted)) return formatted;
	throw new CivilDateError('invalid-date', 'Formatted civil date was not canonical.', { civil });
}

export function assertCivilDate(civil: CivilDate): void {
	if (
		!civil ||
		typeof civil !== 'object' ||
		!Number.isInteger(civil.year) ||
		!Number.isInteger(civil.month) ||
		!Number.isInteger(civil.day)
	) {
		throw new CivilDateError('invalid-date', 'Civil date parts must be integers.', { ...civil });
	}
	if (civil.year < 1 || civil.year > 9999) {
		throw new CivilDateError(
			'outside-supported-range',
			'Civil date years must be from 0001 through 9999.',
			{ ...civil }
		);
	}
	if (
		civil.month < 1 ||
		civil.month > 12 ||
		civil.day < 1 ||
		civil.day > getCivilDaysInMonth(civil.year, civil.month)
	) {
		throw new CivilDateError('invalid-date', 'Civil date parts must form a real Gregorian date.', {
			...civil
		});
	}
}

export function getCivilDaysInMonth(year: number, month: number): number {
	if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
		throw new CivilDateError('invalid-date', 'Month lookup requires an integer year and month.', {
			year,
			month
		});
	}
	if (month === 2) return isLeapYear(year) ? 29 : 28;
	return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
}

export function addCivilDateDays(civil: CivilDate, amount: number): CivilDate {
	assertCivilDate(civil);
	assertInteger(amount, 'amount');
	const date = civilToUtcDate(civil);
	date.setUTCDate(date.getUTCDate() + amount);
	const next = {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth() + 1,
		day: date.getUTCDate()
	};
	assertCivilDate(next);
	return next;
}

export function addCivilDateMonths(civil: CivilDate, amount: number): CivilDate {
	assertCivilDate(civil);
	assertInteger(amount, 'amount');
	const monthIndex = civil.year * 12 + civil.month - 1 + amount;
	const year = Math.floor(monthIndex / 12);
	const month = modulo(monthIndex, 12) + 1;
	const next = {
		year,
		month,
		day: Math.min(civil.day, getCivilDaysInMonth(year, month))
	};
	assertCivilDate(next);
	return next;
}

export function getCivilDateWeekday(civil: CivilDate): CivilWeekday {
	assertCivilDate(civil);
	return civilToUtcDate(civil).getUTCDay() as CivilWeekday;
}

export function startOfCivilDateWeek(civil: CivilDate, weekStartsOn: CivilWeekday): CivilDate {
	assertWeekday(weekStartsOn);
	const difference = modulo(getCivilDateWeekday(civil) - weekStartsOn, 7);
	return addCivilDateDays(civil, -difference);
}

export function getCivilDateDifference(start: CivilDate, end: CivilDate): number {
	assertCivilDate(start);
	assertCivilDate(end);
	return Math.round(
		(civilToUtcDate(end).getTime() - civilToUtcDate(start).getTime()) / CIVIL_DAY_MS
	);
}

export function compareCivilDates(left: CivilDate, right: CivilDate): number {
	assertCivilDate(left);
	assertCivilDate(right);
	return left.year - right.year || left.month - right.month || left.day - right.day;
}

export function modulo(value: number, divisor: number): number {
	if (!Number.isFinite(value) || !Number.isFinite(divisor) || divisor === 0) {
		throw new CivilDateError(
			'invalid-amount',
			'Modulo requires finite values and a non-zero divisor.',
			{
				value,
				divisor
			}
		);
	}
	return ((value % divisor) + divisor) % divisor;
}

function civilToUtcDate(civil: CivilDate): Date {
	const date = new Date(0);
	date.setUTCFullYear(civil.year, civil.month - 1, civil.day);
	date.setUTCHours(0, 0, 0, 0);
	return date;
}

function isLeapYear(year: number): boolean {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function assertInteger(value: number, name: string): void {
	if (Number.isInteger(value)) return;
	throw new CivilDateError('invalid-amount', `${name} must be an integer.`, { [name]: value });
}

function assertWeekday(value: number): asserts value is CivilWeekday {
	if (Number.isInteger(value) && value >= 0 && value <= 6) return;
	throw new CivilDateError('invalid-amount', 'Weekdays must be integers from 0 through 6.', {
		weekday: value
	});
}
