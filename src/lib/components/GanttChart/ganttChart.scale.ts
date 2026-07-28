import {
	addCivilDateDays,
	addCivilDateMonths,
	getCivilDateDifference,
	parseCivilDate,
	startOfCivilDateWeek,
	type CivilDate,
	type CivilWeekday
} from '$lib/scheduling/civilDate.js';
import { assertScheduleRange } from '$lib/scheduling/scheduleRange.js';
import {
	getDateTimeFormatter,
	getInstantZonedDay,
	getInstantZonedParts,
	resolveZonedWallTime
} from '$lib/scheduling/zonedTime.js';
import { GanttChartError } from './ganttChart.error.js';
import type {
	GanttBuiltInZoomLevel,
	GanttDuration,
	GanttRange,
	GanttScaleCell,
	GanttScaleDefinition,
	GanttScaleUnit,
	GanttZoomLevel
} from './ganttChart.types.js';

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const AVERAGE_MONTH_MS = 30.4375 * DAY_MS;
const AVERAGE_YEAR_MS = 365.25 * DAY_MS;
const MAX_TIMELINE_WIDTH = 16_000_000;
const ISO_WEEK_START = 1 satisfies CivilWeekday;

type BuiltInScaleConfig = Readonly<{
	unit: GanttScaleUnit;
	step: number;
	minColumnWidth: number;
	upperUnit: GanttScaleUnit;
	upperStep: number;
}>;

const BUILT_IN_SCALES: Record<GanttBuiltInZoomLevel, BuiltInScaleConfig> = {
	hour: { unit: 'hour', step: 1, minColumnWidth: 64, upperUnit: 'day', upperStep: 1 },
	day: { unit: 'day', step: 1, minColumnWidth: 72, upperUnit: 'month', upperStep: 1 },
	week: { unit: 'day', step: 1, minColumnWidth: 42, upperUnit: 'month', upperStep: 1 },
	month: { unit: 'week', step: 1, minColumnWidth: 80, upperUnit: 'month', upperStep: 1 },
	quarter: { unit: 'month', step: 1, minColumnWidth: 88, upperUnit: 'quarter', upperStep: 1 },
	year: { unit: 'quarter', step: 1, minColumnWidth: 104, upperUnit: 'year', upperStep: 1 }
};

const BUILT_IN_SNAP_DURATIONS = {
	hour: { value: 15, unit: 'minute' },
	day: { value: 1, unit: 'hour' },
	week: { value: 1, unit: 'day' },
	month: { value: 1, unit: 'day' },
	quarter: { value: 1, unit: 'week' },
	year: { value: 4, unit: 'week' }
} as const satisfies Record<GanttBuiltInZoomLevel, GanttDuration>;

export type GanttResolvedScaleDefinition = Readonly<{
	definition: GanttScaleDefinition;
	upperUnit: GanttScaleUnit;
	upperStep: number;
}>;

export type GanttTimeScale = Readonly<{
	zoom: GanttZoomLevel;
	timeZone: string;
	locale: string;
	direction: 'ltr' | 'rtl';
	definition: GanttScaleDefinition;
	upperUnit: GanttScaleUnit;
	upperStep: number;
	canvasRange: GanttRange;
	pixelsPerMillisecond: number;
	totalWidth: number;
	isCompressed: boolean;
}>;

export type GanttPositionedScaleCell = Readonly<{
	cell: GanttScaleCell;
	left: number;
	width: number;
	label: string;
}>;

export function createGanttTimeScale(input: {
	range: GanttRange;
	zoom: GanttZoomLevel;
	timeZone: string;
	locale: string;
	direction: 'ltr' | 'rtl';
	scales: readonly GanttScaleDefinition[];
	minimumWidth: number;
	pad?: boolean;
	fitRange?: GanttRange;
}): GanttTimeScale {
	assertScheduleRange(input.range, 'timelineRange');
	if (input.fitRange) {
		assertScheduleRange(input.fitRange, 'timelineFitRange');
		if (
			input.fitRange.start.getTime() < input.range.start.getTime() ||
			input.fitRange.end.getTime() > input.range.end.getTime()
		) {
			throw new GanttChartError(
				'invalid-range',
				'Timeline fit range must be contained by the timeline range.',
				{ range: input.range, fitRange: input.fitRange }
			);
		}
	}
	if (!Number.isFinite(input.minimumWidth) || input.minimumWidth < 0) {
		throw new GanttChartError(
			'invalid-zoom-level',
			'Timeline minimum width must be a non-negative finite number.',
			{ minimumWidth: input.minimumWidth }
		);
	}
	const resolved = resolveGanttScaleDefinition(input.zoom, input.scales);
	const padding = input.pad === false ? 0 : resolved.definition.step * 2;
	const firstBoundary = alignGanttScaleInstant(
		input.range.start,
		resolved.definition.unit,
		resolved.definition.step,
		input.timeZone
	);
	let canvasStart = addGanttScaleUnits(
		firstBoundary,
		resolved.definition.unit,
		-padding,
		input.timeZone
	);
	let canvasEnd = firstBoundary;
	while (canvasEnd.getTime() < input.range.end.getTime()) {
		canvasEnd = addGanttScaleUnits(
			canvasEnd,
			resolved.definition.unit,
			resolved.definition.step,
			input.timeZone
		);
	}
	canvasEnd = addGanttScaleUnits(canvasEnd, resolved.definition.unit, padding, input.timeZone);
	if (canvasEnd.getTime() <= canvasStart.getTime()) {
		canvasStart = new Date(input.range.start);
		canvasEnd = addGanttScaleUnits(
			canvasStart,
			resolved.definition.unit,
			resolved.definition.step,
			input.timeZone
		);
	}

	const duration = canvasEnd.getTime() - canvasStart.getTime();
	const nominalCellDuration = getNominalScaleDuration(
		resolved.definition.unit,
		resolved.definition.step
	);
	const minimumPixelsPerMillisecond = resolved.definition.minColumnWidth / nominalCellDuration;
	const fillDuration = input.fitRange
		? input.fitRange.end.getTime() - input.fitRange.start.getTime()
		: duration;
	const fillPixelsPerMillisecond = input.minimumWidth > 0 ? input.minimumWidth / fillDuration : 0;
	const requestedPixelsPerMillisecond = input.fitRange
		? fillPixelsPerMillisecond || minimumPixelsPerMillisecond
		: Math.max(minimumPixelsPerMillisecond, fillPixelsPerMillisecond);
	const requestedWidth = duration * requestedPixelsPerMillisecond;
	const totalWidth = Math.min(MAX_TIMELINE_WIDTH, requestedWidth);
	const pixelsPerMillisecond = totalWidth / duration;

	return {
		zoom: input.zoom,
		timeZone: input.timeZone,
		locale: input.locale,
		direction: input.direction,
		definition: resolved.definition,
		upperUnit: resolved.upperUnit,
		upperStep: resolved.upperStep,
		canvasRange: { start: canvasStart, end: canvasEnd },
		pixelsPerMillisecond,
		totalWidth,
		isCompressed:
			requestedWidth > MAX_TIMELINE_WIDTH ||
			requestedPixelsPerMillisecond < minimumPixelsPerMillisecond
	};
}

export function resolveGanttScaleDefinition(
	zoom: GanttZoomLevel,
	scales: readonly GanttScaleDefinition[]
): GanttResolvedScaleDefinition {
	validateCustomScales(scales);
	const custom = scales.find((scale) => scale.id === zoom);
	if (custom) {
		return {
			definition: custom,
			upperUnit: getNextScaleUnit(custom.unit),
			upperStep: 1
		};
	}
	if (!isBuiltInZoom(zoom)) {
		throw new GanttChartError('invalid-zoom-level', `Unknown Gantt zoom level: ${zoom}.`, {
			zoom
		});
	}
	const config = BUILT_IN_SCALES[zoom];
	return {
		definition: {
			id: zoom,
			unit: config.unit,
			step: config.step,
			minColumnWidth: config.minColumnWidth,
			formatUpper: formatBuiltInUpperCell,
			formatLower: formatBuiltInLowerCell
		},
		upperUnit: config.upperUnit,
		upperStep: config.upperStep
	};
}

export function resolveGanttScaleSnapDuration(
	zoom: GanttZoomLevel,
	scales: readonly GanttScaleDefinition[]
): GanttDuration {
	validateCustomScales(scales);
	const custom = scales.find((scale) => scale.id === zoom);
	if (custom) return getCustomScaleSnapDuration(custom.unit, custom.step);
	if (!isBuiltInZoom(zoom)) {
		throw new GanttChartError('invalid-zoom-level', `Unknown Gantt zoom level: ${zoom}.`, {
			zoom
		});
	}
	return BUILT_IN_SNAP_DURATIONS[zoom];
}

export function getGanttScaleCells(
	scale: GanttTimeScale,
	level: 'upper' | 'lower',
	visiblePixels: Readonly<{ start: number; end: number }>,
	overscanPixels: number
): readonly GanttPositionedScaleCell[] {
	const boundedStart = Math.max(0, visiblePixels.start - overscanPixels);
	const boundedEnd = Math.min(scale.totalWidth, visiblePixels.end + overscanPixels);
	const firstInstant = getGanttScaleInstantAtPixel(scale, boundedStart);
	const lastInstant = getGanttScaleInstantAtPixel(scale, boundedEnd);
	const windowStart = new Date(Math.min(firstInstant.getTime(), lastInstant.getTime()));
	const windowEnd = new Date(Math.max(firstInstant.getTime(), lastInstant.getTime()));
	const unit = level === 'upper' ? scale.upperUnit : scale.definition.unit;
	const step = level === 'upper' ? scale.upperStep : scale.definition.step;
	let cursor = alignGanttScaleInstant(windowStart, unit, step, scale.timeZone);
	const cells: GanttPositionedScaleCell[] = [];
	let guard = 0;

	while (cursor.getTime() < windowEnd.getTime() && guard < 20_000) {
		const end = addGanttScaleUnits(cursor, unit, step, scale.timeZone);
		if (end.getTime() <= cursor.getTime()) {
			throw new GanttChartError('invalid-zoom-level', 'Scale cells must advance in time.', {
				zoom: scale.zoom,
				unit,
				step
			});
		}
		const startPixel = getGanttScalePixel(scale, cursor);
		const endPixel = getGanttScalePixel(scale, end);
		const cell: GanttScaleCell = {
			start: new Date(cursor),
			end: new Date(end),
			index: getGanttScaleCellIndex(cursor, unit, step, scale.timeZone),
			zoom: scale.zoom,
			timeZone: scale.timeZone,
			locale: scale.locale
		};
		cells.push({
			cell,
			left: Math.min(startPixel, endPixel),
			width: Math.max(1, Math.abs(endPixel - startPixel)),
			label:
				level === 'upper' ? scale.definition.formatUpper(cell) : scale.definition.formatLower(cell)
		});
		cursor = end;
		guard += 1;
	}
	if (guard === 20_000) {
		throw new GanttChartError(
			'invalid-zoom-level',
			'Visible scale window exceeded the 20,000-cell safety bound.',
			{ zoom: scale.zoom, unit, step }
		);
	}
	return cells;
}

export function getGanttScalePixel(scale: GanttTimeScale, instant: Date): number {
	const logical =
		(instant.getTime() - scale.canvasRange.start.getTime()) * scale.pixelsPerMillisecond;
	return scale.direction === 'rtl' ? scale.totalWidth - logical : logical;
}

export function getGanttScaleInstantAtPixel(scale: GanttTimeScale, pixel: number): Date {
	const boundedPixel = Math.min(scale.totalWidth, Math.max(0, pixel));
	const logical = scale.direction === 'rtl' ? scale.totalWidth - boundedPixel : boundedPixel;
	return new Date(scale.canvasRange.start.getTime() + logical / scale.pixelsPerMillisecond);
}

export function getGanttVisibleRange(
	scale: GanttTimeScale,
	scrollLeft: number,
	viewportWidth: number
): GanttRange {
	const first = getGanttScaleInstantAtPixel(scale, scrollLeft);
	const last = getGanttScaleInstantAtPixel(scale, scrollLeft + viewportWidth);
	return first.getTime() <= last.getTime()
		? { start: first, end: last }
		: { start: last, end: first };
}

export function getGanttScrollLeft(
	scale: GanttTimeScale,
	instant: Date,
	viewportWidth: number,
	align: 'start' | 'center' | 'end' = 'center'
): number {
	const pixel = getGanttScalePixel(scale, instant);
	const offset = align === 'start' ? 0 : align === 'end' ? viewportWidth : viewportWidth / 2;
	return Math.max(0, Math.min(scale.totalWidth - viewportWidth, pixel - offset));
}

export function addGanttScaleUnits(
	instant: Date,
	unit: GanttScaleUnit,
	amount: number,
	timeZone: string
): Date {
	if (!Number.isInteger(amount)) {
		throw new GanttChartError(
			'invalid-zoom-level',
			'Scale arithmetic requires an integer amount.',
			{
				unit,
				amount
			}
		);
	}
	if (unit === 'minute') return new Date(instant.getTime() + amount * MINUTE_MS);
	if (unit === 'hour') return new Date(instant.getTime() + amount * HOUR_MS);
	const day = parseCivilDate(getInstantZonedDay(instant, timeZone));
	if (unit === 'day') return resolveCivilDay(addCivilDateDays(day, amount), timeZone);
	if (unit === 'week') return resolveCivilDay(addCivilDateDays(day, amount * 7), timeZone);
	const months = unit === 'month' ? amount : unit === 'quarter' ? amount * 3 : amount * 12;
	return resolveCivilDay(addCivilDateMonths(day, months), timeZone);
}

function alignGanttScaleInstant(
	instant: Date,
	unit: GanttScaleUnit,
	step: number,
	timeZone: string
): Date {
	if (unit === 'minute') {
		const duration = step * MINUTE_MS;
		return new Date(Math.floor(instant.getTime() / duration) * duration);
	}
	if (unit === 'hour') {
		const duration = step * HOUR_MS;
		return new Date(Math.floor(instant.getTime() / duration) * duration);
	}
	const parts = getInstantZonedParts(instant, timeZone);
	const civil = { year: parts.year, month: parts.month, day: parts.day };
	if (unit === 'day') {
		const epoch = { year: 1970, month: 1, day: 1 };
		const difference = getCivilDateDifference(epoch, civil);
		return resolveCivilDay(addCivilDateDays(civil, -modulo(difference, step)), timeZone);
	}
	if (unit === 'week') {
		const weekStart = startOfCivilDateWeek(civil, ISO_WEEK_START);
		const epochWeek = startOfCivilDateWeek({ year: 1970, month: 1, day: 1 }, ISO_WEEK_START);
		const weekIndex = Math.floor(getCivilDateDifference(epochWeek, weekStart) / 7);
		return resolveCivilDay(addCivilDateDays(weekStart, -modulo(weekIndex, step) * 7), timeZone);
	}
	const monthIndex = civil.year * 12 + civil.month - 1;
	const unitMonths = unit === 'month' ? step : unit === 'quarter' ? step * 3 : step * 12;
	const alignedMonthIndex = monthIndex - modulo(monthIndex, unitMonths);
	return resolveCivilDay(
		{
			year: Math.floor(alignedMonthIndex / 12),
			month: modulo(alignedMonthIndex, 12) + 1,
			day: 1
		},
		timeZone
	);
}

function getGanttScaleCellIndex(
	instant: Date,
	unit: GanttScaleUnit,
	step: number,
	timeZone: string
): number {
	if (unit === 'minute') return Math.floor(instant.getTime() / (MINUTE_MS * step));
	if (unit === 'hour') return Math.floor(instant.getTime() / (HOUR_MS * step));
	const civil = parseCivilDate(getInstantZonedDay(instant, timeZone));
	if (unit === 'day') {
		return Math.floor(getCivilDateDifference({ year: 1970, month: 1, day: 1 }, civil) / step);
	}
	if (unit === 'week') {
		const start = startOfCivilDateWeek(civil, ISO_WEEK_START);
		const epoch = startOfCivilDateWeek({ year: 1970, month: 1, day: 1 }, ISO_WEEK_START);
		return Math.floor(getCivilDateDifference(epoch, start) / 7 / step);
	}
	const monthIndex = civil.year * 12 + civil.month - 1;
	if (unit === 'month') return Math.floor(monthIndex / step);
	if (unit === 'quarter') return Math.floor(monthIndex / (3 * step));
	return Math.floor(civil.year / step);
}

function validateCustomScales(scales: readonly GanttScaleDefinition[]): void {
	const ids = new Set<string>();
	for (const scale of scales) {
		if (
			typeof scale.id !== 'string' ||
			scale.id.length === 0 ||
			ids.has(scale.id) ||
			!Number.isInteger(scale.step) ||
			scale.step <= 0 ||
			!Number.isFinite(scale.minColumnWidth) ||
			scale.minColumnWidth <= 0 ||
			typeof scale.formatUpper !== 'function' ||
			typeof scale.formatLower !== 'function'
		) {
			throw new GanttChartError(
				'invalid-zoom-level',
				'Custom scales need a unique id, positive integer step, positive minimum width, and both formatters.',
				{ scaleId: scale.id }
			);
		}
		ids.add(scale.id);
	}
}

function isBuiltInZoom(zoom: GanttZoomLevel): zoom is GanttBuiltInZoomLevel {
	return Object.prototype.hasOwnProperty.call(BUILT_IN_SCALES, zoom);
}

function getNextScaleUnit(unit: GanttScaleUnit): GanttScaleUnit {
	if (unit === 'minute') return 'hour';
	if (unit === 'hour') return 'day';
	if (unit === 'day') return 'week';
	if (unit === 'week') return 'month';
	if (unit === 'month') return 'quarter';
	if (unit === 'quarter') return 'year';
	return 'year';
}

function getCustomScaleSnapDuration(unit: GanttScaleUnit, step: number): GanttDuration {
	if (unit === 'minute') return { value: step, unit: 'minute' };
	if (unit === 'hour') return { value: step, unit: 'hour' };
	if (unit === 'day') return { value: step, unit: 'day' };
	if (unit === 'week') return { value: step, unit: 'day' };
	if (unit === 'month') return { value: step, unit: 'week' };
	if (unit === 'quarter') return { value: step * 4, unit: 'week' };
	return { value: step * 13, unit: 'week' };
}

function getNominalScaleDuration(unit: GanttScaleUnit, step: number): number {
	if (unit === 'minute') return MINUTE_MS * step;
	if (unit === 'hour') return HOUR_MS * step;
	if (unit === 'day') return DAY_MS * step;
	if (unit === 'week') return DAY_MS * 7 * step;
	if (unit === 'month') return AVERAGE_MONTH_MS * step;
	if (unit === 'quarter') return AVERAGE_MONTH_MS * 3 * step;
	return AVERAGE_YEAR_MS * step;
}

function formatBuiltInUpperCell(cell: GanttScaleCell): string {
	if (cell.zoom === 'hour') {
		return getDateTimeFormatter(cell.locale, cell.timeZone, {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		}).format(cell.start);
	}
	if (cell.zoom === 'day' || cell.zoom === 'week' || cell.zoom === 'month') {
		return getDateTimeFormatter(cell.locale, cell.timeZone, {
			month: 'long',
			year: 'numeric'
		}).format(cell.start);
	}
	if (cell.zoom === 'quarter') {
		const parts = getInstantZonedParts(cell.start, cell.timeZone);
		return `Q${Math.floor((parts.month - 1) / 3) + 1} ${parts.year}`;
	}
	return getDateTimeFormatter(cell.locale, cell.timeZone, { year: 'numeric' }).format(cell.start);
}

function formatBuiltInLowerCell(cell: GanttScaleCell): string {
	if (cell.zoom === 'hour') {
		return getDateTimeFormatter(cell.locale, cell.timeZone, {
			hour: 'numeric',
			minute: '2-digit'
		}).format(cell.start);
	}
	if (cell.zoom === 'day' || cell.zoom === 'week') {
		return getDateTimeFormatter(cell.locale, cell.timeZone, {
			weekday: 'short',
			day: 'numeric'
		}).format(cell.start);
	}
	if (cell.zoom === 'month') {
		const formatter = getDateTimeFormatter(cell.locale, cell.timeZone, {
			month: 'short',
			day: 'numeric'
		});
		return formatter.formatRange(cell.start, new Date(cell.end.getTime() - 1));
	}
	if (cell.zoom === 'quarter') {
		return getDateTimeFormatter(cell.locale, cell.timeZone, { month: 'short' }).format(cell.start);
	}
	const parts = getInstantZonedParts(cell.start, cell.timeZone);
	return `Q${Math.floor((parts.month - 1) / 3) + 1}`;
}

function resolveCivilDay(civil: CivilDate, timeZone: string): Date {
	return resolveZonedWallTime({ ...civil, hour: 0 }, timeZone);
}

function modulo(value: number, divisor: number): number {
	return ((value % divisor) + divisor) % divisor;
}
