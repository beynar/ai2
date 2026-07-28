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
	const workingDelta = getGanttPointerWorkingDelta(
		input.originInstant,
		input.pointerInstant,
		calendar,
		input.snapDuration
	);
	return deriveGanttTaskWorkingChange({
		task,
		operation: input.operation,
		calendar,
		workingDelta
	});
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
	const pointerEdge = addWorkingMinutes(sourceEdge, workingDelta, calendar);
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
	const resizedTask = resizeGanttTask(task, start, end, calendar);
	return {
		kind: isStartResize ? 'resize-start' : 'resize-end',
		task: resizedTask,
		workingDurationMinutes: getTaskWorkingMinutes(resizedTask, calendar) ?? 0
	};
}

export function deriveGanttProgressChange<TTaskFields extends object>(input: {
	task: GanttTask<TTaskFields>;
	pointerInstant: Date;
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
	const elapsedDuration = task.end.getTime() - task.start.getTime();
	const progress = Math.max(
		0,
		Math.min(1, (input.pointerInstant.getTime() - task.start.getTime()) / elapsedDuration)
	);
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
	const step = getGanttSnapMinutes(input.snapDuration, input.calendar);
	const origin = addWorkingMinutes(input.originInstant, 0, input.calendar);
	const rawDelta = input.pointerInstant.getTime() - input.originInstant.getTime();
	const isForward = input.pointerInstant.getTime() >= input.originInstant.getTime();
	const elapsedStep = getGanttSnapElapsedMilliseconds(
		input.snapDuration,
		input.originInstant,
		isForward ? 1 : -1,
		input.calendar.calendar.timeZone
	);
	const duration = Math.max(step, Math.ceil(Math.abs(rawDelta) / elapsedStep) * step);
	const start = isForward ? origin : subtractWorkingMinutes(origin, duration, input.calendar);
	const end = isForward ? addWorkingMinutes(origin, duration, input.calendar) : origin;
	return {
		proposal: {
			source: input.source ?? 'pointer',
			start,
			end,
			...(input.parentId === undefined ? {} : { parentId: input.parentId })
		},
		workingDurationMinutes: duration
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

function getGanttPointerWorkingDelta(
	origin: Date,
	pointer: Date,
	calendar: GanttCalendarRuntime,
	duration: GanttDuration
): number {
	const workingStep = getGanttSnapMinutes(duration, calendar);
	const elapsedDelta = pointer.getTime() - origin.getTime();
	const elapsedStep = getGanttSnapElapsedMilliseconds(
		duration,
		origin,
		elapsedDelta < 0 ? -1 : 1,
		calendar.calendar.timeZone
	);
	const elapsedSteps = elapsedDelta / elapsedStep;
	const stepCount = Math.sign(elapsedSteps) * Math.floor(Math.abs(elapsedSteps));
	return stepCount * workingStep;
}

function getGanttSnapElapsedMilliseconds(
	duration: GanttDuration,
	origin: Date,
	direction: -1 | 1,
	timeZone: string
): number {
	const minute = 60_000;
	if (duration.unit === 'minute') return duration.value * minute;
	if (duration.unit === 'hour') return duration.value * 60 * minute;
	if (duration.unit === 'day' || duration.unit === 'week') {
		const dayCount = duration.value * (duration.unit === 'week' ? 7 : 1);
		const wholeDays = Math.trunc(dayCount);
		const partialDayMilliseconds = (dayCount - wholeDays) * 24 * 60 * minute;
		if (wholeDays === 0) return partialDayMilliseconds;
		const originParts = getInstantZonedParts(origin, timeZone);
		const targetDay = addCivilDateDays(originParts, direction * wholeDays);
		const target = resolveZonedWallTime(
			{
				...targetDay,
				hour: originParts.hour,
				minute: originParts.minute,
				second: originParts.second,
				millisecond: originParts.millisecond
			},
			timeZone
		);
		return Math.abs(target.getTime() - origin.getTime()) + partialDayMilliseconds;
	}
	throw new GanttChartError('invalid-operation', 'snapDuration has an unsupported unit.', {
		snapDuration: duration
	});
}

function getGanttSnapMinutes(duration: GanttDuration, calendar: GanttCalendarRuntime): number {
	if (!duration || !Number.isFinite(duration.value) || duration.value <= 0) {
		throw new GanttChartError('invalid-operation', 'snapDuration must be positive and finite.', {
			snapDuration: duration
		});
	}
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
