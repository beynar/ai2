export type ScheduleRange = Readonly<{ start: Date; end: Date }>;
export type ScheduleSnapMode = 'floor' | 'round' | 'ceil';

export class ScheduleRangeError extends RangeError {
	readonly name = 'ScheduleRangeError';

	constructor(
		message: string,
		readonly details?: Readonly<Record<string, unknown>>
	) {
		super(message);
	}
}

export function assertScheduleInstant(value: Date, name = 'date'): void {
	if (value instanceof Date && Number.isFinite(value.getTime())) return;
	throw new ScheduleRangeError(`${name} must be a valid Date instant.`, { name });
}

export function assertScheduleRange(range: ScheduleRange, name = 'range'): void {
	if (!range || typeof range !== 'object') {
		throw new ScheduleRangeError(`${name} must be a half-open date range.`, { name });
	}
	assertScheduleInstant(range.start, `${name}.start`);
	assertScheduleInstant(range.end, `${name}.end`);
	if (range.end.getTime() >= range.start.getTime()) return;
	throw new ScheduleRangeError(`${name}.end must not precede ${name}.start.`, { name });
}

export function scheduleRangesIntersect(left: ScheduleRange, right: ScheduleRange): boolean {
	assertScheduleRange(left, 'left');
	assertScheduleRange(right, 'right');
	return left.start.getTime() < right.end.getTime() && right.start.getTime() < left.end.getTime();
}

export function intersectScheduleRanges(
	range: ScheduleRange,
	boundary: ScheduleRange
): ScheduleRange {
	assertScheduleRange(range, 'range');
	assertScheduleRange(boundary, 'boundary');
	const start = Math.max(range.start.getTime(), boundary.start.getTime());
	const end = Math.min(range.end.getTime(), boundary.end.getTime());
	if (start <= end) return { start: new Date(start), end: new Date(end) };
	const edge = range.end.getTime() <= boundary.start.getTime() ? boundary.start : boundary.end;
	return { start: new Date(edge), end: new Date(edge) };
}

export function clampScheduleInstant(instant: Date, boundary: ScheduleRange): Date {
	assertScheduleInstant(instant);
	assertScheduleRange(boundary);
	return new Date(
		Math.min(boundary.end.getTime(), Math.max(boundary.start.getTime(), instant.getTime()))
	);
}

export function snapScheduleInstant(
	instant: Date,
	anchor: Date,
	durationMs: number,
	mode: ScheduleSnapMode = 'round'
): Date {
	assertScheduleInstant(instant, 'instant');
	assertScheduleInstant(anchor, 'anchor');
	if (!Number.isFinite(durationMs) || durationMs <= 0) {
		throw new ScheduleRangeError('durationMs must be a positive finite number.', { durationMs });
	}
	const units = (instant.getTime() - anchor.getTime()) / durationMs;
	const snappedUnits =
		mode === 'floor' ? Math.floor(units) : mode === 'ceil' ? Math.ceil(units) : Math.round(units);
	return new Date(anchor.getTime() + snappedUnits * durationMs);
}
