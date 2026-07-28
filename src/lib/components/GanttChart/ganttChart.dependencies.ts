import { GanttChartError } from './ganttChart.error.js';
import {
	getDependencyBoundary,
	getTaskCalendar,
	getWorkingMinutesBetween,
	moveTaskToFinish,
	moveTaskToStart,
	subtractWorkingMinutes
} from './ganttChart.calendar.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type {
	GanttConstraintViolation,
	GanttDependency,
	GanttResolvedTaskNode,
	GanttTask
} from './ganttChart.types.js';

type ScheduleState = Readonly<{ start: Date | null; end: Date | null }>;

export type GanttAutoScheduleResult<TTaskFields extends object> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	changedTaskIds: readonly string[];
	violations: readonly GanttConstraintViolation[];
}>;

export type GanttDependentMoveResult<TTaskFields extends object> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	changedTaskIds: readonly string[];
	violations: readonly GanttConstraintViolation[];
}>;

export function autoScheduleGanttTasks<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[]
): GanttAutoScheduleResult<TTaskFields> {
	const tasksById = new Map(model.tasks.map((task) => [task.id, task]));
	const scheduleById = new Map<string, ScheduleState>(
		resolvedTasks.map((node) => [
			node.taskId,
			{ start: cloneDate(node.resolvedStart), end: cloneDate(node.resolvedEnd) }
		])
	);
	const changedTaskIds: string[] = [];
	const violations: GanttConstraintViolation[] = [];

	for (const taskId of model.topologicalTaskIds) {
		const task = getRequiredTask(tasksById, taskId);
		if (task.type === 'summary') continue;
		const incoming = model.incomingDependencies.get(taskId) ?? [];
		const scheduled = task.start !== undefined && task.end !== undefined;
		if (!scheduled) continue;
		const calendar = getTaskCalendar(model, task);
		let requiredStart = new Date(task.start);
		for (const dependency of incoming) {
			const predecessor = getRequiredSchedule(scheduleById, dependency.fromTaskId);
			if (!predecessor.start || !predecessor.end) continue;
			const dependencyStart = getRequiredSuccessorStart(task, dependency, predecessor, calendar);
			if (dependencyStart.getTime() > requiredStart.getTime()) requiredStart = dependencyStart;
		}

		requiredStart = applyLowerConstraint(task, requiredStart, calendar);
		if (requiredStart.getTime() > task.start.getTime()) {
			if (task.progress === 1) {
				violations.push({
					taskId,
					constraint: task.constraint,
					code: 'completed-task-blocked',
					message: `Completed task ${taskId} remains at its actual dates.`,
					requiredDate: requiredStart,
					actualDate: task.start
				});
			} else if (task.readOnly) {
				violations.push({
					taskId,
					constraint: task.constraint,
					code: 'dependency-conflict',
					message: `Read-only task ${taskId} cannot be auto-scheduled.`,
					requiredDate: requiredStart,
					actualDate: task.start
				});
			} else {
				const moved = moveTaskToStart(task, requiredStart, calendar);
				tasksById.set(taskId, moved);
				changedTaskIds.push(taskId);
				setTaskSchedule(scheduleById, moved);
				updateAncestorSchedules(model, scheduleById, taskId);
			}
		}
		const currentTask = getRequiredTask(tasksById, taskId);
		violations.push(...getTaskConstraintViolations(currentTask));
	}

	return {
		tasks: model.tasks.map((task) => getRequiredTask(tasksById, task.id)),
		changedTaskIds,
		violations
	};
}

export function moveGanttDependentTasks<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	sourceTaskId: string,
	deltaMilliseconds: number
): GanttDependentMoveResult<TTaskFields> {
	if (!Number.isFinite(deltaMilliseconds)) {
		throw new GanttChartError(
			'invalid-operation',
			'Dependent task movement requires a finite delta.',
			{
				sourceTaskId,
				deltaMilliseconds
			}
		);
	}
	if (deltaMilliseconds === 0) {
		return { tasks: model.tasks, changedTaskIds: [], violations: [] };
	}
	const dependentTaskIds = collectDependentTaskIds(model, sourceTaskId);
	const tasksById = new Map(model.tasks.map((task) => [task.id, task]));
	const changedTaskIds: string[] = [];
	const violations: GanttConstraintViolation[] = [];
	for (const taskId of model.topologicalTaskIds) {
		if (!dependentTaskIds.has(taskId)) continue;
		const task = getRequiredTask(tasksById, taskId);
		if (task.type === 'summary') continue;
		if (!task.start || !task.end) {
			violations.push({
				taskId,
				code: 'dependency-conflict',
				message: `Unscheduled dependent task ${taskId} cannot move with ${sourceTaskId}.`
			});
			continue;
		}
		const requiredStart = new Date(task.start.getTime() + deltaMilliseconds);
		if (task.progress === 1) {
			violations.push({
				taskId,
				constraint: task.constraint,
				code: 'completed-task-blocked',
				message: `Completed task ${taskId} remains at its actual dates.`,
				requiredDate: requiredStart,
				actualDate: new Date(task.start)
			});
			continue;
		}
		if (task.readOnly) {
			violations.push({
				taskId,
				constraint: task.constraint,
				code: 'dependency-conflict',
				message: `Read-only task ${taskId} cannot move with ${sourceTaskId}.`,
				requiredDate: requiredStart,
				actualDate: new Date(task.start)
			});
			continue;
		}
		const movedTask = moveTaskToStart(task, requiredStart, getTaskCalendar(model, task));
		tasksById.set(taskId, movedTask);
		changedTaskIds.push(taskId);
	}
	return {
		tasks: model.tasks.map((task) => getRequiredTask(tasksById, task.id)),
		changedTaskIds,
		violations
	};
}

export function getTaskConstraintViolations<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	schedule: ScheduleState = {
		start: task.start ? new Date(task.start) : null,
		end: task.end ? new Date(task.end) : null
	}
): readonly GanttConstraintViolation[] {
	if (
		!task.constraint ||
		task.constraint.type === 'as-soon-as-possible' ||
		!schedule.start ||
		!schedule.end
	) {
		return [];
	}
	const expected = task.constraint.date.getTime();
	const start = schedule.start.getTime();
	const end = schedule.end.getTime();
	const violation = (
		code: GanttConstraintViolation['code'],
		message: string,
		actualDate: Date
	): readonly GanttConstraintViolation[] => [
		{
			taskId: task.id,
			constraint: task.constraint,
			code,
			message,
			requiredDate: new Date(expected),
			actualDate: new Date(actualDate)
		}
	];
	if (task.constraint.type === 'start-no-earlier-than' && start < expected) {
		return violation(
			'start-too-early',
			`Task ${task.id} starts before its constraint.`,
			schedule.start
		);
	}
	if (task.constraint.type === 'start-no-later-than' && start > expected) {
		return violation(
			'start-too-late',
			`Task ${task.id} starts after its constraint.`,
			schedule.start
		);
	}
	if (task.constraint.type === 'finish-no-earlier-than' && end < expected) {
		return violation(
			'finish-too-early',
			`Task ${task.id} finishes before its constraint.`,
			schedule.end
		);
	}
	if (task.constraint.type === 'finish-no-later-than' && end > expected) {
		return violation(
			'finish-too-late',
			`Task ${task.id} finishes after its constraint.`,
			schedule.end
		);
	}
	if (task.constraint.type === 'must-start-on' && start !== expected) {
		return violation(
			'must-start-mismatch',
			`Task ${task.id} does not start on its constraint.`,
			schedule.start
		);
	}
	if (task.constraint.type === 'must-finish-on' && end !== expected) {
		return violation(
			'must-finish-mismatch',
			`Task ${task.id} does not finish on its constraint.`,
			schedule.end
		);
	}
	return [];
}

export function getGanttDependencyViolations<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[]
): readonly GanttConstraintViolation[] {
	const resolvedById = new Map(resolvedTasks.map((node) => [node.taskId, node]));
	const violations: GanttConstraintViolation[] = [];
	for (const dependency of model.dependencies) {
		const predecessor = resolvedById.get(dependency.fromTaskId);
		const successor = resolvedById.get(dependency.toTaskId);
		if (!predecessor || !successor) {
			throw new GanttChartError(
				'invalid-operation',
				`Dependency analysis lost an endpoint for ${dependency.id}.`,
				{ dependencyId: dependency.id }
			);
		}
		const predecessorBoundary =
			dependency.type === 'finish-start' || dependency.type === 'finish-finish'
				? predecessor.resolvedEnd
				: predecessor.resolvedStart;
		const successorBoundary =
			dependency.type === 'finish-start' || dependency.type === 'start-start'
				? successor.resolvedStart
				: successor.resolvedEnd;
		if (!predecessorBoundary || !successorBoundary) {
			violations.push({
				taskId: dependency.toTaskId,
				code: 'dependency-conflict',
				message: `Dependency ${dependency.id} cannot be evaluated because an endpoint is unscheduled.`
			});
			continue;
		}
		const successorTask = model.tasksById.get(dependency.toTaskId);
		if (!successorTask) {
			throw new GanttChartError(
				'invalid-operation',
				`Dependency analysis lost successor ${dependency.toTaskId}.`,
				{ dependencyId: dependency.id, taskId: dependency.toTaskId }
			);
		}
		const requiredDate = getDependencyBoundary(
			predecessorBoundary,
			dependency,
			getTaskCalendar(model, successorTask)
		);
		if (successorBoundary.getTime() >= requiredDate.getTime()) continue;
		const boundaryName =
			dependency.type === 'finish-start' || dependency.type === 'start-start' ? 'start' : 'finish';
		violations.push({
			taskId: dependency.toTaskId,
			code: 'dependency-conflict',
			message: `Dependency ${dependency.id} requires task ${dependency.toTaskId} to ${boundaryName} no earlier than ${requiredDate.toISOString()}.`,
			requiredDate,
			actualDate: new Date(successorBoundary)
		});
	}
	return violations;
}

function getRequiredSuccessorStart<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	dependency: GanttDependency,
	predecessor: ScheduleState,
	calendar: ReturnType<typeof getTaskCalendar>
): Date {
	if (!task.start || !task.end || !predecessor.start || !predecessor.end) {
		throw new GanttChartError('schedule-conflict', 'Dependency scheduling lost an endpoint.', {
			taskId: task.id,
			dependencyId: dependency.id
		});
	}
	if (dependency.type === 'finish-start') {
		return getDependencyBoundary(predecessor.end, dependency, calendar);
	}
	if (dependency.type === 'start-start') {
		return getDependencyBoundary(predecessor.start, dependency, calendar);
	}
	const predecessorBoundary =
		dependency.type === 'finish-finish' ? predecessor.end : predecessor.start;
	const requiredFinish = getDependencyBoundary(predecessorBoundary, dependency, calendar);
	const duration = getWorkingMinutesBetween(task.start, task.end, calendar);
	return subtractWorkingMinutes(requiredFinish, duration, calendar);
}

function applyLowerConstraint<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	requiredStart: Date,
	calendar: ReturnType<typeof getTaskCalendar>
): Date {
	if (
		!task.constraint ||
		task.constraint.type === 'as-soon-as-possible' ||
		!task.start ||
		!task.end
	) {
		return requiredStart;
	}
	if (
		task.constraint.type === 'start-no-earlier-than' ||
		task.constraint.type === 'must-start-on'
	) {
		return task.constraint.date.getTime() > requiredStart.getTime()
			? new Date(task.constraint.date)
			: requiredStart;
	}
	if (
		task.constraint.type === 'finish-no-earlier-than' ||
		task.constraint.type === 'must-finish-on'
	) {
		const constrained = moveTaskToFinish(task, task.constraint.date, calendar);
		if (!constrained.start) return requiredStart;
		return constrained.start.getTime() > requiredStart.getTime()
			? new Date(constrained.start)
			: requiredStart;
	}
	return requiredStart;
}

function updateAncestorSchedules<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	scheduleById: Map<string, ScheduleState>,
	taskId: string
): void {
	let parentId = model.taskHierarchy.nodesById.get(taskId)?.parentId ?? null;
	while (parentId) {
		const parent = model.taskHierarchy.nodesById.get(parentId);
		if (!parent) throw new GanttChartError('invalid-operation', `Task hierarchy lost ${parentId}.`);
		const children = parent.childIds.map((childId) => getRequiredSchedule(scheduleById, childId));
		const starts = children.flatMap((child) => (child.start ? [child.start.getTime()] : []));
		const ends = children.flatMap((child) => (child.end ? [child.end.getTime()] : []));
		scheduleById.set(parentId, {
			start: starts.length > 0 ? new Date(Math.min(...starts)) : null,
			end: ends.length > 0 ? new Date(Math.max(...ends)) : null
		});
		parentId = parent.parentId;
	}
}

function setTaskSchedule<TTaskFields extends object>(
	scheduleById: Map<string, ScheduleState>,
	task: GanttTask<TTaskFields>
): void {
	scheduleById.set(task.id, {
		start: task.start ? new Date(task.start) : null,
		end: task.end ? new Date(task.end) : null
	});
}

function getRequiredTask<TTaskFields extends object>(
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>,
	taskId: string
): GanttTask<TTaskFields> {
	const task = tasksById.get(taskId);
	if (task) return task;
	throw new GanttChartError('invalid-operation', `Task index lost ${taskId}.`, { taskId });
}

function getRequiredSchedule(
	scheduleById: ReadonlyMap<string, ScheduleState>,
	taskId: string
): ScheduleState {
	const schedule = scheduleById.get(taskId);
	if (schedule) return schedule;
	throw new GanttChartError('invalid-operation', `Schedule index lost ${taskId}.`, { taskId });
}

function collectDependentTaskIds<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	sourceTaskId: string
): ReadonlySet<string> {
	if (!model.tasksById.has(sourceTaskId)) {
		throw new GanttChartError('invalid-operation', `Unknown dependency source ${sourceTaskId}.`, {
			sourceTaskId
		});
	}
	const dependentTaskIds = new Set<string>();
	const pendingTaskIds = [sourceTaskId];
	while (pendingTaskIds.length > 0) {
		const taskId = pendingTaskIds.pop();
		if (!taskId) continue;
		for (const dependency of model.outgoingDependencies.get(taskId) ?? []) {
			if (dependentTaskIds.has(dependency.toTaskId)) continue;
			dependentTaskIds.add(dependency.toTaskId);
			pendingTaskIds.push(dependency.toTaskId);
		}
	}
	return dependentTaskIds;
}

function cloneDate(date: Date | null): Date | null {
	return date ? new Date(date) : null;
}
