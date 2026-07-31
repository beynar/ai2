import { addCivilDateDays } from '$lib/scheduling/civilDate.js';
import { getInstantZonedParts, resolveZonedWallTime } from '$lib/scheduling/zonedTime.js';
import {
	addWorkingMinutes,
	getTaskWorkingMinutes,
	getWorkingMinutesBetween,
	moveTaskToStart,
	subtractWorkingMinutes,
	type GanttCalendarRuntime
} from './ganttChart.calendar.js';
import { GanttChartError } from './ganttChart.error.js';
import { validateGanttTasks } from './ganttChart.taskValidation.js';
import type {
	GanttDuration,
	GanttRange,
	GanttRangeProposal,
	GanttTask,
	GanttTaskMutationKind,
	GanttTaskSegment
} from './ganttChart.types.js';

export type GanttTaskPointerOperation = 'move' | 'resize-start' | 'resize-end';

export type GanttDerivedTaskChange<TTaskFields extends object> = Readonly<{
	kind: Extract<GanttTaskMutationKind, 'move' | 'resize-start' | 'resize-end' | 'progress'>;
	task: GanttTask<TTaskFields>;
	workingDurationMinutes: number;
}>;

export function deriveGanttTaskKeyboardChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	operation: GanttTaskPointerOperation | 'progress';
	stepCount: number;
	calendar: GanttCalendarRuntime;
	snapDuration: GanttDuration;
}): GanttDerivedTaskChange<TTaskFields> {
	if (!Number.isInteger(input.stepCount)) {
		throw new GanttChartError('invalid-operation', 'Keyboard task steps must be an integer.');
	}
	if (input.operation === 'progress') {
		const { task } = input;
		if (!task.start || !task.end || task.type === 'milestone') {
			throw new GanttChartError(
				'invalid-operation',
				`Task ${task.id} has no keyboard-editable progress.`,
				{ taskId: task.id }
			);
		}
		const progress = Math.max(0, Math.min(1, (task.progress ?? 0) + input.stepCount * 0.05));
		const nextTask = Object.assign({}, task, { progress });
		return {
			kind: 'progress',
			task: nextTask,
			workingDurationMinutes: getTaskWorkingMinutes(nextTask, input.calendar) ?? 0
		};
	}
	if (!input.task.start || !input.task.end) {
		throw new GanttChartError(
			'invalid-operation',
			`Task ${input.task.id} has no keyboard-editable schedule.`,
			{ taskId: input.task.id }
		);
	}
	return deriveGanttTaskWorkingChange({
		task: input.task,
		operation: input.operation,
		calendar: input.calendar,
		workingDelta: input.stepCount * getGanttSnapMinutes(input.snapDuration, input.calendar)
	});
}

export function deriveGanttTaskPointerChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	operation: GanttTaskPointerOperation;
	originInstant: Date;
	pointerInstant: Date;
	calendar: GanttCalendarRuntime;
	snapDuration: GanttDuration;
}): GanttDerivedTaskChange<TTaskFields> {
	const { task, calendar } = input;
	if (!task.start || !task.end) {
		throw new GanttChartError(
			'invalid-operation',
			`Task ${task.id} has no pointer-editable schedule.`,
			{ taskId: task.id }
		);
	}
	// Pointer coordinates belong to the elapsed-time axis. Translating them through working
	// minutes makes a one-pixel gesture jump across every hidden night or weekend it touches.
	const elapsedDelta = getGanttPointerElapsedDelta(
		input.operation === 'resize-end' ? task.end : task.start,
		input.originInstant,
		input.pointerInstant,
		input.snapDuration,
		calendar.calendar.timeZone
	);
	return deriveGanttTaskElapsedChange({
		task,
		operation: input.operation,
		calendar,
		elapsedDelta
	});
}

function deriveGanttTaskElapsedChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	operation: GanttTaskPointerOperation;
	calendar: GanttCalendarRuntime;
	elapsedDelta: number;
}): GanttDerivedTaskChange<TTaskFields> {
	const { task, calendar, elapsedDelta } = input;
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no editable schedule.`, {
			taskId: task.id
		});
	}
	if (elapsedDelta === 0) {
		return {
			kind: input.operation,
			task,
			workingDurationMinutes: getTaskWorkingMinutes(task, calendar) ?? 0
		};
	}
	if (input.operation === 'move') {
		const movedTask = shiftGanttTaskElapsed(task, elapsedDelta);
		return {
			kind: 'move',
			task: movedTask,
			workingDurationMinutes: getTaskWorkingMinutes(movedTask, calendar) ?? 0
		};
	}
	if (task.type === 'milestone') {
		throw new GanttChartError('invalid-operation', `Milestone ${task.id} cannot be resized.`, {
			taskId: task.id
		});
	}
	const sourceEdge = input.operation === 'resize-start' ? task.start : task.end;
	const pointerEdge = new Date(sourceEdge.getTime() + elapsedDelta);
	const isStartResize =
		input.operation === 'resize-start'
			? pointerEdge.getTime() < task.end.getTime()
			: pointerEdge.getTime() < task.start.getTime();
	const start = isStartResize
		? pointerEdge
		: input.operation === 'resize-start'
			? task.end
			: task.start;
	const end = isStartResize
		? input.operation === 'resize-start'
			? task.end
			: task.start
		: pointerEdge;
	const resizedTask = resizeGanttTaskElapsed(task, start, end);
	return {
		kind: isStartResize ? 'resize-start' : 'resize-end',
		task: resizedTask,
		workingDurationMinutes: getTaskWorkingMinutes(resizedTask, calendar) ?? 0
	};
}

function deriveGanttTaskWorkingChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	operation: GanttTaskPointerOperation;
	calendar: GanttCalendarRuntime;
	workingDelta: number;
}): GanttDerivedTaskChange<TTaskFields> {
	const { task, calendar, workingDelta } = input;
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no editable schedule.`, {
			taskId: task.id
		});
	}
	if (input.operation === 'move') {
		const nextStart = addWorkingMinutes(task.start, workingDelta, calendar);
		const movedTask = moveTaskToStart(task, nextStart, calendar);
		return {
			kind: 'move',
			task: movedTask,
			workingDurationMinutes: getTaskWorkingMinutes(movedTask, calendar) ?? 0
		};
	}
	if (task.type === 'milestone') {
		throw new GanttChartError('invalid-operation', `Milestone ${task.id} cannot be resized.`, {
			taskId: task.id
		});
	}
	const sourceEdge = input.operation === 'resize-start' ? task.start : task.end;
	const workingEdge = addWorkingMinutes(sourceEdge, workingDelta, calendar);
	const isStartResize =
		input.operation === 'resize-start'
			? workingEdge.getTime() < task.end.getTime()
			: workingEdge.getTime() < task.start.getTime();
	const pointerEdge = isStartResize ? addWorkingMinutes(workingEdge, 0, calendar) : workingEdge;
	const start = isStartResize
		? pointerEdge
		: input.operation === 'resize-start'
			? task.end
			: task.start;
	const end = isStartResize
		? input.operation === 'resize-start'
			? task.end
			: task.start
		: pointerEdge;
	const resizedTask = resizeGanttTask(task, start, end, calendar);
	return {
		kind: isStartResize ? 'resize-start' : 'resize-end',
		task: resizedTask,
		workingDurationMinutes: getTaskWorkingMinutes(resizedTask, calendar) ?? 0
	};
}

export function deriveGanttProgressChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	progressDelta: number;
	calendar: GanttCalendarRuntime;
}): GanttDerivedTaskChange<TTaskFields> {
	const { task } = input;
	if (!task.start || !task.end || task.type === 'milestone') {
		throw new GanttChartError(
			'invalid-operation',
			`Task ${task.id} has no progress-editable schedule.`,
			{ taskId: task.id }
		);
	}
	if (!Number.isFinite(input.progressDelta)) {
		throw new GanttChartError('invalid-operation', 'Progress drag delta must be finite.', {
			taskId: task.id
		});
	}
	const progress = Math.max(0, Math.min(1, (task.progress ?? 0) + input.progressDelta));
	const nextTask = Object.assign({}, task, { progress });
	return {
		kind: 'progress',
		task: nextTask,
		workingDurationMinutes: getTaskWorkingMinutes(nextTask, input.calendar) ?? 0
	};
}

export function deriveGanttRangeProposal(input: {
	originInstant: Date;
	pointerInstant: Date;
	calendar: GanttCalendarRuntime;
	snapDuration: GanttDuration;
	parentId?: string;
	source?: GanttRangeProposal['source'];
}): Readonly<{ proposal: GanttRangeProposal; workingDurationMinutes: number }> {
	const elapsedDelta = getGanttPointerElapsedDelta(
		input.originInstant,
		input.originInstant,
		input.pointerInstant,
		input.snapDuration,
		input.calendar.calendar.timeZone
	);
	if (elapsedDelta === 0) {
		throw new GanttChartError(
			'invalid-operation',
			'Range pointer movement must complete at least one snap step.'
		);
	}
	const pointerEdge = new Date(input.originInstant.getTime() + elapsedDelta);
	const start = elapsedDelta > 0 ? new Date(input.originInstant) : pointerEdge;
	const end = elapsedDelta > 0 ? pointerEdge : new Date(input.originInstant);
	return {
		proposal: {
			source: input.source ?? 'pointer',
			start,
			end,
			...(input.parentId === undefined ? {} : { parentId: input.parentId })
		},
		workingDurationMinutes: getWorkingMinutesBetween(start, end, input.calendar)
	};
}

export function deriveGanttRangeKeyboardProposal(input: {
	originInstant: Date;
	stepCount: number;
	calendar: GanttCalendarRuntime;
	snapDuration: GanttDuration;
	parentId?: string;
}): Readonly<{ proposal: GanttRangeProposal; workingDurationMinutes: number }> {
	if (!Number.isInteger(input.stepCount) || input.stepCount === 0) {
		throw new GanttChartError(
			'invalid-operation',
			'Keyboard range steps must be a non-zero integer.'
		);
	}
	const step = getGanttSnapMinutes(input.snapDuration, input.calendar);
	const duration = Math.abs(input.stepCount) * step;
	const origin = addWorkingMinutes(input.originInstant, 0, input.calendar);
	const start =
		input.stepCount > 0 ? origin : subtractWorkingMinutes(origin, duration, input.calendar);
	const end = input.stepCount > 0 ? addWorkingMinutes(origin, duration, input.calendar) : origin;
	return {
		proposal: {
			source: 'keyboard',
			start,
			end,
			...(input.parentId === undefined ? {} : { parentId: input.parentId })
		},
		workingDurationMinutes: duration
	};
}

export function validateGanttTaskChange<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	validRange?: GanttRange
): void {
	validateGanttTasks([task]);
	if (!validRange || !task.start || !task.end) return;
	if (
		task.start.getTime() >= validRange.start.getTime() &&
		task.end.getTime() <= validRange.end.getTime()
	) {
		return;
	}
	throw new GanttChartError('invalid-range', `Task ${task.id} is outside validRange.`, {
		taskId: task.id,
		validRange
	});
}

export function validateGanttRangeProposal(
	proposal: GanttRangeProposal,
	validRange?: GanttRange
): void {
	if (
		!Number.isFinite(proposal.start.getTime()) ||
		!Number.isFinite(proposal.end.getTime()) ||
		proposal.start.getTime() >= proposal.end.getTime()
	) {
		throw new GanttChartError('invalid-range', 'Range proposals must be valid half-open ranges.');
	}
	if (!validRange) return;
	if (
		proposal.start.getTime() >= validRange.start.getTime() &&
		proposal.end.getTime() <= validRange.end.getTime()
	) {
		return;
	}
	throw new GanttChartError('invalid-range', 'Range proposal is outside validRange.', {
		validRange
	});
}

function getGanttPointerElapsedDelta(
	sourceEdge: Date,
	origin: Date,
	pointer: Date,
	duration: GanttDuration,
	timeZone: string
): number {
	const elapsedDelta = pointer.getTime() - origin.getTime();
	if (elapsedDelta === 0) return 0;
	assertGanttSnapDuration(duration);
	const direction = elapsedDelta < 0 ? -1 : 1;
	const stepMilliseconds = getGanttSnapNominalMilliseconds(duration);
	const estimatedStepCount = Math.floor(Math.abs(elapsedDelta) / stepMilliseconds);
	if (!Number.isSafeInteger(estimatedStepCount)) {
		throw new GanttChartError(
			'invalid-operation',
			'snapDuration produces more pointer steps than can be represented safely.',
			{ snapDuration: duration }
		);
	}
	let stepCount = direction * estimatedStepCount;
	const firstStepDelta = getGanttElapsedSnapDelta(sourceEdge, direction, duration, timeZone);
	if (stepCount === 0 && Math.abs(elapsedDelta) >= Math.abs(firstStepDelta)) {
		stepCount = direction;
	}
	let snappedDelta = getGanttElapsedSnapDelta(sourceEdge, stepCount, duration, timeZone);
	let correctionCount = 0;
	while (stepCount !== 0 && Math.abs(snappedDelta) > Math.abs(elapsedDelta)) {
		stepCount = getNextGanttSnapStepCount(stepCount, -direction);
		snappedDelta = getGanttElapsedSnapDelta(sourceEdge, stepCount, duration, timeZone);
		correctionCount += 1;
		assertGanttSnapCorrectionCount(correctionCount, duration);
	}
	let nextStepCount = getNextGanttSnapStepCount(stepCount, direction);
	let nextDelta = getGanttElapsedSnapDelta(sourceEdge, nextStepCount, duration, timeZone);
	while (Math.abs(nextDelta) <= Math.abs(elapsedDelta)) {
		stepCount = nextStepCount;
		snappedDelta = nextDelta;
		correctionCount += 1;
		assertGanttSnapCorrectionCount(correctionCount, duration);
		nextStepCount = getNextGanttSnapStepCount(stepCount, direction);
		nextDelta = getGanttElapsedSnapDelta(sourceEdge, nextStepCount, duration, timeZone);
	}
	return snappedDelta;
}

function getNextGanttSnapStepCount(stepCount: number, direction: number): number {
	const nextStepCount = stepCount + direction;
	if (Number.isSafeInteger(nextStepCount) && nextStepCount !== stepCount) return nextStepCount;
	throw new GanttChartError(
		'invalid-operation',
		'snapDuration produces more pointer steps than can be represented safely.'
	);
}

function assertGanttSnapCorrectionCount(correctionCount: number, duration: GanttDuration): void {
	if (correctionCount <= 1_024) return;
	throw new GanttChartError(
		'invalid-operation',
		'snapDuration could not be resolved within the pointer correction bound.',
		{ snapDuration: duration }
	);
}

function getGanttSnapNominalMilliseconds(duration: GanttDuration): number {
	const minute = 60_000;
	if (duration.unit === 'minute') return duration.value * minute;
	if (duration.unit === 'hour') return duration.value * 60 * minute;
	if (duration.unit === 'day') return duration.value * 24 * 60 * minute;
	return duration.value * 7 * 24 * 60 * minute;
}

function getGanttElapsedSnapDelta(
	sourceEdge: Date,
	stepCount: number,
	duration: GanttDuration,
	timeZone: string
): number {
	if (stepCount === 0) return 0;
	const minute = 60_000;
	if (duration.unit === 'minute') return stepCount * duration.value * minute;
	if (duration.unit === 'hour') return stepCount * duration.value * 60 * minute;
	try {
		const dayCount = stepCount * duration.value * (duration.unit === 'week' ? 7 : 1);
		const wholeDays = Math.trunc(dayCount);
		const partialDayMilliseconds = (dayCount - wholeDays) * 24 * 60 * minute;
		if (wholeDays === 0) return partialDayMilliseconds;
		const sourceParts = getInstantZonedParts(sourceEdge, timeZone);
		const targetDay = addCivilDateDays(sourceParts, wholeDays);
		const target = resolveZonedWallTime(
			{
				...targetDay,
				hour: sourceParts.hour,
				minute: sourceParts.minute,
				second: sourceParts.second,
				millisecond: sourceParts.millisecond
			},
			timeZone
		);
		return target.getTime() + partialDayMilliseconds - sourceEdge.getTime();
	} catch (error) {
		if (error instanceof GanttChartError) throw error;
		throw new GanttChartError(
			'invalid-operation',
			'snapDuration moves the pointer outside the supported civil-date range.',
			{
				snapDuration: duration,
				cause: error instanceof Error ? error.message : String(error)
			}
		);
	}
}

function assertGanttSnapDuration(duration: GanttDuration): void {
	if (!duration || !Number.isFinite(duration.value) || duration.value <= 0) {
		throw new GanttChartError('invalid-operation', 'snapDuration must be positive and finite.', {
			snapDuration: duration
		});
	}
	if (
		duration.unit !== 'minute' &&
		duration.unit !== 'hour' &&
		duration.unit !== 'day' &&
		duration.unit !== 'week'
	) {
		throw new GanttChartError('invalid-operation', 'snapDuration has an unsupported unit.', {
			snapDuration: duration
		});
	}
	const nominalMilliseconds = getGanttSnapNominalMilliseconds(duration);
	if (
		!Number.isFinite(nominalMilliseconds) ||
		nominalMilliseconds < 1 ||
		nominalMilliseconds > 8_640_000_000_000_000
	) {
		throw new GanttChartError(
			'invalid-operation',
			'snapDuration must resolve within the JavaScript Date range and to at least one millisecond.',
			{ snapDuration: duration }
		);
	}
}

function getGanttSnapMinutes(duration: GanttDuration, calendar: GanttCalendarRuntime): number {
	assertGanttSnapDuration(duration);
	let minutes: number;
	switch (duration.unit) {
		case 'minute':
			minutes = duration.value;
			break;
		case 'hour':
			minutes = duration.value * 60;
			break;
		case 'day':
			minutes = duration.value * calendar.standardDayMinutes;
			break;
		case 'week':
			minutes = duration.value * calendar.standardWeekMinutes;
			break;
		default:
			throw new GanttChartError('invalid-operation', 'snapDuration has an unsupported unit.', {
				snapDuration: duration
			});
	}
	if (Number.isFinite(minutes) && minutes > 0) return minutes;
	throw new GanttChartError(
		'schedule-conflict',
		`Calendar ${calendar.calendar.id} cannot resolve snapDuration.`,
		{ calendarId: calendar.calendar.id, snapDuration: duration }
	);
}

function shiftGanttTaskElapsed<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	elapsedDelta: number
): GanttTask<TTaskFields> {
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no movable schedule.`, {
			taskId: task.id
		});
	}
	const shift = (instant: Date) => new Date(instant.getTime() + elapsedDelta);
	const schedule = { start: shift(task.start), end: shift(task.end) };
	if (task.type === 'milestone') return Object.assign({}, task, schedule);
	const segments = task.segments?.map((segment) => ({
		start: shift(segment.start),
		end: shift(segment.end)
	}));
	return segments
		? Object.assign({}, task, schedule, { segments })
		: Object.assign({}, task, schedule);
}

function resizeGanttTaskElapsed<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	start: Date,
	end: Date
): GanttTask<TTaskFields> {
	if (!task.start || !task.end) {
		throw new GanttChartError('invalid-operation', `Task ${task.id} has no resizable schedule.`, {
			taskId: task.id
		});
	}
	const sourceStart = task.start;
	const sourceDuration = task.end.getTime() - sourceStart.getTime();
	const nextDuration = end.getTime() - start.getTime();
	if (sourceDuration <= 0 || nextDuration <= 0) {
		throw new GanttChartError('invalid-range', `Task ${task.id} has no resizable elapsed span.`, {
			taskId: task.id
		});
	}
	const segments = task.segments?.map((segment) => ({
		start: new Date(
			Math.round(
				start.getTime() +
					((segment.start.getTime() - sourceStart.getTime()) / sourceDuration) * nextDuration
			)
		),
		end: new Date(
			Math.round(
				start.getTime() +
					((segment.end.getTime() - sourceStart.getTime()) / sourceDuration) * nextDuration
			)
		)
	}));
	const schedule = { start: new Date(start), end: new Date(end) };
	return segments
		? Object.assign({}, task, schedule, { segments })
		: Object.assign({}, task, schedule);
}

function resizeGanttTask<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	start: Date,
	end: Date,
	calendar: GanttCalendarRuntime
): GanttTask<TTaskFields> {
	const segments = task.segments ? resizeGanttSegments(task, start, end, calendar) : undefined;
	const schedule = { start: new Date(start), end: new Date(end) };
	return segments
		? Object.assign({}, task, schedule, { segments })
		: Object.assign({}, task, schedule);
}

function resizeGanttSegments<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	start: Date,
	end: Date,
	calendar: GanttCalendarRuntime
): GanttTaskSegment[] {
	if (!task.start || !task.end || !task.segments) {
		throw new GanttChartError(
			'invalid-segments',
			`Task ${task.id} lost its segmented schedule during resize.`,
			{ taskId: task.id }
		);
	}
	const sourceStart = task.start;
	const sourceDuration = getWorkingMinutesBetween(sourceStart, task.end, calendar);
	const nextDuration = getWorkingMinutesBetween(start, end, calendar);
	if (sourceDuration <= 0 || nextDuration <= 0) {
		throw new GanttChartError(
			'invalid-segments',
			`Task ${task.id} has no resizable working span.`,
			{
				taskId: task.id
			}
		);
	}
	return task.segments.map((segment) => {
		const startRatio =
			getWorkingMinutesBetween(sourceStart, segment.start, calendar) / sourceDuration;
		const endRatio = getWorkingMinutesBetween(sourceStart, segment.end, calendar) / sourceDuration;
		return {
			start: addWorkingMinutes(start, startRatio * nextDuration, calendar),
			end: addWorkingMinutes(start, endRatio * nextDuration, calendar)
		};
	});
}
