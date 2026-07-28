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
	const workingDelta = snapGanttWorkingDelta(
		input.originInstant,
		input.pointerInstant,
		calendar,
		input.snapDuration
	);
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
}): Readonly<{ proposal: GanttRangeProposal; workingDurationMinutes: number }> {
	const step = getGanttSnapMinutes(input.snapDuration, input.calendar);
	const origin = addWorkingMinutes(input.originInstant, 0, input.calendar);
	const rawDelta = getWorkingMinutesBetween(origin, input.pointerInstant, input.calendar);
	const isForward = input.pointerInstant.getTime() >= input.originInstant.getTime();
	const duration = Math.max(step, Math.ceil(Math.abs(rawDelta) / step) * step);
	const start = isForward ? origin : subtractWorkingMinutes(origin, duration, input.calendar);
	const end = isForward ? addWorkingMinutes(origin, duration, input.calendar) : origin;
	return {
		proposal: {
			source: 'pointer',
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

function snapGanttWorkingDelta(
	origin: Date,
	pointer: Date,
	calendar: GanttCalendarRuntime,
	duration: GanttDuration
): number {
	const step = getGanttSnapMinutes(duration, calendar);
	const workingDelta = getWorkingMinutesBetween(origin, pointer, calendar);
	return Math.round(workingDelta / step) * step;
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
