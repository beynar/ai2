import {
	addCivilDateDays,
	formatCivilDate,
	getCivilDateWeekday,
	parseCivilDate
} from '$lib/scheduling/civilDate.js';
import { intersectScheduleRanges } from '$lib/scheduling/scheduleRange.js';
import { getInstantZonedDay, startOfZonedCivilDay } from '$lib/scheduling/zonedTime.js';
import { getCalendarWorkingIntervals, type GanttCalendarRuntime } from './ganttChart.calendar.js';
import { GanttChartError } from './ganttChart.error.js';
import { getGanttScalePixel, type GanttTimeScale } from './ganttChart.scale.js';
import type {
	GanttDependencyGeometry,
	GanttHoliday,
	GanttRange,
	GanttResolvedDependency,
	GanttResolvedTaskNode,
	GanttTaskGeometry,
	GanttTaskSegment
} from './ganttChart.types.js';

const TASK_HEIGHT = 20;
const SUMMARY_HEIGHT = 8;
const MILESTONE_SIZE = 16;
const BASELINE_HEIGHT = 4;
const CONNECTOR_OFFSET = 14;

export type GanttPositionedSegment = Readonly<{
	segment: GanttTaskSegment;
	left: number;
	width: number;
	progressWidth: number;
	expectedProgressWidth: number;
}>;

export type GanttPositionedTask<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	geometry: GanttTaskGeometry;
	segments: readonly GanttPositionedSegment[];
	baselineGeometry: GanttTaskGeometry | null;
	deadlineLeft: number | null;
	constraintLeft: number | null;
	startX: number;
	endX: number;
}>;

export type GanttTimeShade = Readonly<{
	range: GanttRange;
	left: number;
	width: number;
	isWeekend: boolean;
	holiday: GanttHoliday | null;
	kind: 'calendar' | 'weekend' | 'holiday';
}>;

export function positionGanttTask<TTaskFields extends object>(input: {
	node: GanttResolvedTaskNode<TTaskFields>;
	rowTop: number;
	rowHeight: number;
	scale: GanttTimeScale;
	visibleRange: GanttRange;
	visiblePixels: Readonly<{ start: number; end: number }>;
}): GanttPositionedTask<TTaskFields> | null {
	const { node } = input;
	if (!node.resolvedStart || !node.resolvedEnd) return null;
	const taskHeight =
		node.type === 'milestone'
			? MILESTONE_SIZE
			: node.type === 'summary'
				? SUMMARY_HEIGHT
				: TASK_HEIGHT;
	const top = input.rowTop + (input.rowHeight - taskHeight) / 2;
	const geometry = createTaskGeometry({
		range: { start: node.resolvedStart, end: node.resolvedEnd },
		top,
		height: taskHeight,
		isMilestone: node.type === 'milestone',
		scale: input.scale,
		visibleRange: input.visibleRange,
		visiblePixels: input.visiblePixels
	});
	const startX = getGanttScalePixel(input.scale, node.resolvedStart);
	const endX = getGanttScalePixel(input.scale, node.resolvedEnd);
	const segments =
		node.type === 'task' && node.task.segments
			? positionSegments(
					node.task.segments,
					node.progress ?? 0,
					node.task.expectedProgress ?? 0,
					input.scale
				)
			: [];
	const baselineGeometry = node.task.baseline
		? createTaskGeometry({
				range: node.task.baseline,
				top: input.rowTop + input.rowHeight - BASELINE_HEIGHT - 2,
				height: BASELINE_HEIGHT,
				isMilestone: false,
				scale: input.scale,
				visibleRange: input.visibleRange,
				visiblePixels: input.visiblePixels
			})
		: null;

	return {
		node,
		geometry,
		segments,
		baselineGeometry,
		deadlineLeft: node.task.deadline ? getGanttScalePixel(input.scale, node.task.deadline) : null,
		constraintLeft:
			node.task.constraint && node.task.constraint.type !== 'as-soon-as-possible'
				? getGanttScalePixel(input.scale, node.task.constraint.date)
				: null,
		startX,
		endX
	};
}

export function positionGanttDependency<
	TTaskFields extends object,
	TDependencyFields extends object
>(input: {
	dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>;
	rowIndexByTaskId: ReadonlyMap<string, number>;
	rowHeight: number;
	scale: GanttTimeScale;
	visiblePixels: Readonly<{ start: number; end: number }>;
	visibleRows: Readonly<{ start: number; end: number }>;
}): GanttDependencyGeometry | null {
	const fromIndex = input.rowIndexByTaskId.get(input.dependency.fromTask.taskId);
	const toIndex = input.rowIndexByTaskId.get(input.dependency.toTask.taskId);
	if (fromIndex === undefined || toIndex === undefined) return null;
	const fromDate = getDependencyDate(
		input.dependency.fromTask,
		input.dependency.dependency.type,
		true
	);
	const toDate = getDependencyDate(
		input.dependency.toTask,
		input.dependency.dependency.type,
		false
	);
	if (!fromDate || !toDate) return null;
	const fromX = getGanttScalePixel(input.scale, fromDate);
	const toX = getGanttScalePixel(input.scale, toDate);
	const fromY = fromIndex * input.rowHeight + input.rowHeight / 2;
	const toY = toIndex * input.rowHeight + input.rowHeight / 2;
	const direction = toX >= fromX ? 1 : -1;
	const exitX = fromX + direction * CONNECTOR_OFFSET;
	const entryX = toX - direction * CONNECTOR_OFFSET;
	const middleX = direction > 0 && exitX <= entryX ? (exitX + entryX) / 2 : exitX;
	const path =
		fromY === toY
			? `M ${round(fromX)} ${round(fromY)} H ${round(toX)}`
			: `M ${round(fromX)} ${round(fromY)} H ${round(middleX)} V ${round(toY)} H ${round(toX)}`;
	const horizontalStart = Math.min(fromX, toX, middleX);
	const horizontalEnd = Math.max(fromX, toX, middleX);
	const verticalStart = Math.min(fromY, toY);
	const verticalEnd = Math.max(fromY, toY);
	const visible =
		horizontalEnd >= input.visiblePixels.start &&
		horizontalStart <= input.visiblePixels.end &&
		verticalEnd >= input.visibleRows.start &&
		verticalStart <= input.visibleRows.end;

	return { path, visible, fromX, fromY, toX, toY };
}

export function resolveGanttTimeShades(input: {
	scale: GanttTimeScale;
	visibleRange: GanttRange;
	projectCalendar: GanttCalendarRuntime;
	holidays: readonly GanttHoliday[];
	showWeekends: boolean;
	showNonWorkingTime: boolean;
}): readonly GanttTimeShade[] {
	const range = intersectScheduleRanges(input.visibleRange, input.scale.canvasRange);
	if (range.start.getTime() === range.end.getTime()) return [];
	const candidates: Array<{
		range: GanttRange;
		isWeekend: boolean;
		holiday: GanttHoliday | null;
		kind: GanttTimeShade['kind'];
	}> = [];
	const showsWorkingHours =
		input.scale.definition.unit === 'minute' || input.scale.definition.unit === 'hour';

	if (input.showNonWorkingTime && showsWorkingHours) {
		const working = getCalendarWorkingIntervals(range, input.projectCalendar);
		for (const nonWorkingRange of invertRanges(range, working)) {
			candidates.push({
				range: nonWorkingRange,
				isWeekend: isWeekendInstant(nonWorkingRange.start, input.scale.timeZone),
				holiday: null,
				kind: 'calendar'
			});
		}
	}

	const holidaysByDate = new Map(input.holidays.map((holiday) => [holiday.date, holiday]));
	let day = parseCivilDate(getInstantZonedDay(range.start, input.scale.timeZone));
	const finalDay = parseCivilDate(getInstantZonedDay(range.end, input.scale.timeZone));
	let scannedDays = 0;
	while (formatCivilDate(day) <= formatCivilDate(finalDay)) {
		const date = formatCivilDate(day);
		const civilDayRange = {
			start: startOfZonedCivilDay(date, input.scale.timeZone),
			end: startOfZonedCivilDay(formatCivilDate(addCivilDateDays(day, 1)), input.scale.timeZone)
		};
		const dayRange = intersectScheduleRanges(civilDayRange, range);
		const isWeekend = getCivilDateWeekday(day) === 0 || getCivilDateWeekday(day) === 6;
		const holiday = holidaysByDate.get(date) ?? null;
		if (
			input.showNonWorkingTime &&
			!showsWorkingHours &&
			dayRange.start.getTime() < dayRange.end.getTime() &&
			getCalendarWorkingIntervals(civilDayRange, input.projectCalendar).length === 0
		) {
			candidates.push({ range: dayRange, isWeekend, holiday: null, kind: 'calendar' });
		}
		if (input.showWeekends && isWeekend && dayRange.start.getTime() < dayRange.end.getTime()) {
			candidates.push({ range: dayRange, isWeekend: true, holiday, kind: 'weekend' });
		}
		if (holiday && dayRange.start.getTime() < dayRange.end.getTime()) {
			candidates.push({ range: dayRange, isWeekend, holiday, kind: 'holiday' });
		}
		day = addCivilDateDays(day, 1);
		scannedDays += 1;
		if (scannedDays > 20_000) {
			throw new GanttChartError(
				'invalid-operation',
				'Visible non-working-time window exceeded the 20,000-day safety bound.'
			);
		}
	}

	return deduplicateShades(candidates).map((candidate) => {
		const start = getGanttScalePixel(input.scale, candidate.range.start);
		const end = getGanttScalePixel(input.scale, candidate.range.end);
		return {
			...candidate,
			left: Math.min(start, end),
			width: Math.max(1, Math.abs(end - start))
		};
	});
}

function createTaskGeometry(input: {
	range: GanttRange;
	top: number;
	height: number;
	isMilestone: boolean;
	scale: GanttTimeScale;
	visibleRange: GanttRange;
	visiblePixels: Readonly<{ start: number; end: number }>;
}): GanttTaskGeometry {
	const start = getGanttScalePixel(input.scale, input.range.start);
	const end = getGanttScalePixel(input.scale, input.range.end);
	const left = input.isMilestone ? start - input.height / 2 : Math.min(start, end);
	const width = input.isMilestone ? input.height : Math.max(1, Math.abs(end - start));
	const visibleLeft = Math.max(left, input.visiblePixels.start);
	const visibleEnd = Math.min(left + width, input.visiblePixels.end);
	return {
		left,
		top: input.top,
		width,
		height: input.height,
		visibleLeft,
		visibleWidth: Math.max(0, visibleEnd - visibleLeft),
		continuesBefore: input.range.start.getTime() < input.visibleRange.start.getTime(),
		continuesAfter: input.range.end.getTime() > input.visibleRange.end.getTime()
	};
}

function positionSegments(
	segments: readonly GanttTaskSegment[],
	progress: number,
	expectedProgress: number,
	scale: GanttTimeScale
): readonly GanttPositionedSegment[] {
	const positioned = segments.map((segment) => {
		const start = getGanttScalePixel(scale, segment.start);
		const end = getGanttScalePixel(scale, segment.end);
		return { segment, left: Math.min(start, end), width: Math.max(1, Math.abs(end - start)) };
	});
	const totalWidth = positioned.reduce((sum, segment) => sum + segment.width, 0);
	let progressRemaining = totalWidth * progress;
	let expectedRemaining = totalWidth * expectedProgress;
	return positioned.map((segment) => {
		const progressWidth = Math.min(segment.width, Math.max(0, progressRemaining));
		const expectedProgressWidth = Math.min(segment.width, Math.max(0, expectedRemaining));
		progressRemaining -= segment.width;
		expectedRemaining -= segment.width;
		return { ...segment, progressWidth, expectedProgressWidth };
	});
}

function getDependencyDate<TTaskFields extends object>(
	node: GanttResolvedTaskNode<TTaskFields>,
	type: GanttResolvedDependency<TTaskFields, object>['dependency']['type'],
	isSource: boolean
): Date | null {
	const usesFinish = isSource ? type.startsWith('finish') : type.endsWith('finish');
	return usesFinish ? node.resolvedEnd : node.resolvedStart;
}

function invertRanges(range: GanttRange, working: readonly GanttRange[]): readonly GanttRange[] {
	const gaps: GanttRange[] = [];
	let cursor = range.start.getTime();
	for (const interval of working) {
		const start = Math.max(range.start.getTime(), interval.start.getTime());
		const end = Math.min(range.end.getTime(), interval.end.getTime());
		if (start > cursor) gaps.push({ start: new Date(cursor), end: new Date(start) });
		cursor = Math.max(cursor, end);
	}
	if (cursor < range.end.getTime()) {
		gaps.push({ start: new Date(cursor), end: new Date(range.end) });
	}
	return gaps;
}

function deduplicateShades(
	candidates: readonly {
		range: GanttRange;
		isWeekend: boolean;
		holiday: GanttHoliday | null;
		kind: GanttTimeShade['kind'];
	}[]
): readonly Omit<GanttTimeShade, 'left' | 'width'>[] {
	const byRange = new Map<string, Omit<GanttTimeShade, 'left' | 'width'>>();
	for (const candidate of candidates) {
		const key = `${candidate.range.start.getTime()}:${candidate.range.end.getTime()}`;
		const previous = byRange.get(key);
		if (!previous || getShadePriority(candidate.kind) > getShadePriority(previous.kind)) {
			byRange.set(key, candidate);
		}
	}
	return [...byRange.values()].sort(
		(left, right) => left.range.start.getTime() - right.range.start.getTime()
	);
}

function getShadePriority(kind: GanttTimeShade['kind']): number {
	return kind === 'holiday' ? 3 : kind === 'weekend' ? 2 : 1;
}

function isWeekendInstant(instant: Date, timeZone: string): boolean {
	const weekday = getCivilDateWeekday(parseCivilDate(getInstantZonedDay(instant, timeZone)));
	return weekday === 0 || weekday === 6;
}

function round(value: number): number {
	return Math.round(value * 10) / 10;
}
