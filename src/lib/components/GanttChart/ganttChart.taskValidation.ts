import { GanttChartError } from './ganttChart.error.js';
import {
	assertGanttIdentifier,
	assertGanttInstant,
	assertGanttRecord
} from './ganttChart.validationBoundary.js';
import type {
	GanttCalendar,
	GanttConstraint,
	GanttResource,
	GanttTask
} from './ganttChart.types.js';

const CONSTRAINT_TYPES = new Set<GanttConstraint['type']>([
	'as-soon-as-possible',
	'start-no-earlier-than',
	'start-no-later-than',
	'finish-no-earlier-than',
	'finish-no-later-than',
	'must-start-on',
	'must-finish-on'
]);

export function validateGanttTasks<TTaskFields extends object>(
	tasks: readonly GanttTask<TTaskFields>[]
): ReadonlyMap<string, GanttTask<TTaskFields>> {
	const tasksById = new Map<string, GanttTask<TTaskFields>>();
	for (const task of tasks) {
		assertGanttRecord(task, 'Every task must be an object.', 'invalid-task-schedule');
		assertGanttIdentifier(task.id, 'task');
		if (tasksById.has(task.id)) {
			throw new GanttChartError('duplicate-task-id', `Duplicate task id: ${task.id}.`, {
				id: task.id
			});
		}
		if (typeof task.title !== 'string') {
			throw new GanttChartError('invalid-task-schedule', `Task ${task.id} needs a title.`, {
				id: task.id
			});
		}
		validateTaskSchedule(task);
		validateRatio(task.progress, 'progress', task.id);
		validateRatio(task.expectedProgress, 'expectedProgress', task.id);
		if (task.priority !== undefined && !Number.isFinite(task.priority)) {
			throw new GanttChartError('invalid-task-schedule', `Task ${task.id} has invalid priority.`, {
				id: task.id,
				priority: task.priority
			});
		}
		if (task.baseline) validateBaseline(task.id, task.baseline);
		if (task.deadline !== undefined) {
			assertGanttInstant(task.deadline, `Task ${task.id} deadline`, 'invalid-task-schedule');
		}
		if (task.constraint) validateConstraint(task.id, task.constraint);
		tasksById.set(task.id, task);
	}
	return tasksById;
}

export function validateGanttTaskReferences<
	TTaskFields extends object,
	TResourceFields extends object
>(
	tasks: readonly GanttTask<TTaskFields>[],
	resourcesById: ReadonlyMap<string, GanttResource<TResourceFields>>,
	calendarsById: ReadonlyMap<string, GanttCalendar>
): void {
	for (const task of tasks) {
		if (task.calendarId !== undefined && !calendarsById.has(task.calendarId)) {
			throw new GanttChartError(
				'missing-calendar',
				`Task ${task.id} references missing calendar.`,
				{
					taskId: task.id,
					calendarId: task.calendarId
				}
			);
		}
		if (task.resourceIds === undefined) continue;
		if (
			!Array.isArray(task.resourceIds) ||
			new Set(task.resourceIds).size !== task.resourceIds.length
		) {
			throw new GanttChartError(
				'missing-assignment-resource',
				`Task ${task.id} resourceIds must be unique.`,
				{ taskId: task.id }
			);
		}
		for (const resourceId of task.resourceIds) {
			if (resourcesById.has(resourceId)) continue;
			throw new GanttChartError(
				'missing-assignment-resource',
				`Task ${task.id} references missing resource ${resourceId}.`,
				{ taskId: task.id, resourceId }
			);
		}
	}
}

function validateTaskSchedule<TTaskFields extends object>(task: GanttTask<TTaskFields>): void {
	const taskId = task.id;
	const type = task.type ?? 'task';
	if (type !== 'task' && type !== 'summary' && type !== 'milestone') {
		throw new GanttChartError('invalid-task-schedule', `Task ${task.id} has invalid type.`, {
			id: task.id,
			type
		});
	}
	if (type === 'summary') {
		if (task.start !== undefined || task.end !== undefined || task.segments !== undefined) {
			throw new GanttChartError(
				'invalid-summary-schedule',
				`Summary ${task.id} cannot own schedule fields.`,
				{ id: task.id }
			);
		}
		return;
	}
	const hasStart = task.start !== undefined;
	const hasEnd = task.end !== undefined;
	if (type === 'milestone') {
		validateMilestone(task, hasStart, hasEnd);
		return;
	}
	if (!hasStart && !hasEnd) {
		if (task.segments !== undefined) {
			throw new GanttChartError(
				'invalid-segments',
				`Unscheduled task ${taskId} cannot have segments.`,
				{ id: taskId }
			);
		}
		return;
	}
	if (!hasStart || !hasEnd) {
		throw new GanttChartError(
			'invalid-task-schedule',
			`Task ${taskId} must provide both start and end or neither.`,
			{ id: taskId }
		);
	}
	assertGanttInstant(task.start, `Task ${task.id} start`, 'invalid-task-schedule');
	assertGanttInstant(task.end, `Task ${task.id} end`, 'invalid-task-schedule');
	if (task.start.getTime() >= task.end.getTime()) {
		throw new GanttChartError('invalid-task-schedule', `Task ${task.id} start must precede end.`, {
			id: task.id
		});
	}
	validateSegments(task);
}

function validateMilestone<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	hasStart: boolean,
	hasEnd: boolean
): void {
	if (!hasStart || !hasEnd || !task.start || !task.end) {
		throw new GanttChartError('invalid-milestone', `Milestone ${task.id} needs both endpoints.`, {
			id: task.id
		});
	}
	assertGanttInstant(task.start, `Milestone ${task.id} start`, 'invalid-milestone');
	assertGanttInstant(task.end, `Milestone ${task.id} end`, 'invalid-milestone');
	if (task.start.getTime() === task.end.getTime()) return;
	throw new GanttChartError('invalid-milestone', `Milestone ${task.id} endpoints must be equal.`, {
		id: task.id
	});
}

function validateSegments<TTaskFields extends object>(task: GanttTask<TTaskFields>): void {
	if (task.segments === undefined) return;
	if (!Array.isArray(task.segments) || task.segments.length === 0 || !task.start || !task.end) {
		throw new GanttChartError('invalid-segments', `Task ${task.id} has invalid segments.`, {
			id: task.id
		});
	}
	let previousEnd = task.start.getTime();
	for (const segment of task.segments) {
		assertGanttRecord(segment, `Task ${task.id} segment must be an object.`, 'invalid-segments');
		assertGanttInstant(segment.start, `Task ${task.id} segment.start`, 'invalid-segments');
		assertGanttInstant(segment.end, `Task ${task.id} segment.end`, 'invalid-segments');
		const start = segment.start.getTime();
		const end = segment.end.getTime();
		if (
			start >= end ||
			start < task.start.getTime() ||
			end > task.end.getTime() ||
			start < previousEnd
		) {
			throw new GanttChartError(
				'invalid-segments',
				`Task ${task.id} segments must be ordered, non-overlapping, and contained by the task.`,
				{ id: task.id }
			);
		}
		previousEnd = end;
	}
}

function validateBaseline(taskId: string, baseline: { start: Date; end: Date }): void {
	assertGanttInstant(baseline.start, `Task ${taskId} baseline.start`, 'invalid-baseline');
	assertGanttInstant(baseline.end, `Task ${taskId} baseline.end`, 'invalid-baseline');
	if (baseline.start.getTime() < baseline.end.getTime()) return;
	throw new GanttChartError(
		'invalid-baseline',
		`Task ${taskId} baseline must be a non-empty half-open range.`,
		{ id: taskId }
	);
}

function validateConstraint(taskId: string, constraint: GanttConstraint): void {
	if (!CONSTRAINT_TYPES.has(constraint.type)) {
		throw new GanttChartError('invalid-constraint', `Task ${taskId} has invalid constraint.`, {
			taskId,
			constraint
		});
	}
	if (constraint.type === 'as-soon-as-possible') return;
	assertGanttInstant(constraint.date, `Task ${taskId} constraint date`, 'invalid-constraint');
}

function validateRatio(value: number | undefined, name: string, taskId: string): void {
	if (value === undefined || (Number.isFinite(value) && value >= 0 && value <= 1)) return;
	throw new GanttChartError(
		'invalid-progress',
		`Task ${taskId} ${name} must be from 0 through 1.`,
		{
			taskId,
			[name]: value
		}
	);
}
