import {
	addWorkingMinutes,
	getLagWorkingMinutes,
	getTaskCalendar,
	getWorkingMinutesBetween,
	subtractWorkingMinutes,
	type GanttCalendarRuntime
} from './ganttChart.calendar.js';
import { getTaskConstraintViolations } from './ganttChart.dependencies.js';
import { GanttChartError } from './ganttChart.error.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type {
	GanttConstraintViolation,
	GanttDependency,
	GanttRange,
	GanttResolvedDependency,
	GanttResolvedTaskNode,
	GanttScheduleAnalysis,
	GanttTask
} from './ganttChart.types.js';

const CRITICAL_EPSILON_MINUTES = 0.000_001;

type CriticalMetric = {
	earliestStart: Date;
	earliestEnd: Date;
	latestStart: Date;
	latestEnd: Date;
	totalSlackMinutes: number;
	freeSlackMinutes: number;
	isCritical: boolean;
};

export function calculateGanttCriticalPath<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[],
	existingViolations: readonly GanttConstraintViolation[] = []
): GanttScheduleAnalysis<TTaskFields, TDependencyFields> {
	const resolvedById = new Map(resolvedTasks.map((node) => [node.taskId, node]));
	const scheduledNodes = resolvedTasks.filter(
		(node) => node.resolvedStart !== null && node.resolvedEnd !== null
	);
	const projectRange = getProjectRange(scheduledNodes);
	if (!projectRange) {
		return {
			projectRange: null,
			tasks: resolvedTasks,
			dependencies: resolveDependencies(model, resolvedById, new Set()),
			criticalTaskIds: [],
			criticalDependencyIds: [],
			violations: existingViolations
		};
	}

	const metrics = calculateMetrics(model, resolvedById, projectRange);
	const violationsByTaskId = indexViolations([
		...existingViolations,
		...model.tasks.flatMap((task) => getTaskConstraintViolations(task))
	]);
	const analyzedTasks = applyMetricsToTasks(model, resolvedTasks, metrics, violationsByTaskId);
	const analyzedById = new Map(analyzedTasks.map((node) => [node.taskId, node]));
	const criticalTaskIds = analyzedTasks
		.filter((node) => node.isCritical)
		.map((node) => node.taskId);
	const criticalTaskIdSet = new Set(criticalTaskIds);
	const criticalDependencyIds = new Set<string>();
	for (const dependency of model.dependencies) {
		const predecessor = metrics.get(dependency.fromTaskId);
		const successor = metrics.get(dependency.toTaskId);
		if (!predecessor || !successor) continue;
		if (
			criticalTaskIdSet.has(dependency.fromTaskId) &&
			criticalTaskIdSet.has(dependency.toTaskId) &&
			getDependencyFreeSlack(model, dependency, predecessor, successor) <= CRITICAL_EPSILON_MINUTES
		) {
			criticalDependencyIds.add(dependency.id);
		}
	}

	const violations = analyzedTasks.flatMap((node) => node.violations);
	return {
		projectRange,
		tasks: analyzedTasks,
		dependencies: resolveDependencies(model, analyzedById, criticalDependencyIds),
		criticalTaskIds,
		criticalDependencyIds: [...criticalDependencyIds],
		violations
	};
}

function calculateMetrics<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>,
	projectRange: GanttRange
): ReadonlyMap<string, CriticalMetric> {
	const metrics = new Map<string, CriticalMetric>();
	for (const taskId of model.topologicalTaskIds) {
		const node = resolvedById.get(taskId);
		if (!node?.resolvedStart || !node.resolvedEnd) continue;
		const task = node.task;
		const calendar = getTaskCalendar(model, task);
		const duration = getMetricDuration(node, calendar);
		let earliestStart =
			task.progress === 1 || task.type === 'summary'
				? new Date(node.resolvedStart)
				: addWorkingMinutes(projectRange.start, 0, calendar);
		for (const dependency of model.incomingDependencies.get(taskId) ?? []) {
			const predecessor = metrics.get(dependency.fromTaskId);
			if (!predecessor) continue;
			const candidate = getSuccessorStartFromMetric(dependency, predecessor, duration, calendar);
			if (candidate.getTime() > earliestStart.getTime()) earliestStart = candidate;
		}
		earliestStart = applyEarliestConstraint(task, earliestStart, duration, calendar);
		const earliestEnd =
			duration === 0
				? new Date(earliestStart)
				: addWorkingMinutes(earliestStart, duration, calendar);
		metrics.set(taskId, {
			earliestStart,
			earliestEnd,
			latestStart: new Date(earliestStart),
			latestEnd: new Date(earliestEnd),
			totalSlackMinutes: 0,
			freeSlackMinutes: 0,
			isCritical: false
		});
	}

	const projectFinish = new Date(
		Math.max(
			projectRange.end.getTime(),
			...[...metrics.values()].map((metric) => metric.earliestEnd.getTime())
		)
	);
	for (let index = model.topologicalTaskIds.length - 1; index >= 0; index -= 1) {
		const taskId = model.topologicalTaskIds[index];
		const metric = metrics.get(taskId);
		const node = resolvedById.get(taskId);
		if (!metric || !node) continue;
		const task = node.task;
		const calendar = getTaskCalendar(model, task);
		const duration = getMetricDuration(node, calendar);
		let latestStart =
			duration === 0
				? new Date(projectFinish)
				: subtractWorkingMinutes(projectFinish, duration, calendar);
		let latestEnd = new Date(projectFinish);
		const outgoing = model.outgoingDependencies.get(taskId) ?? [];
		for (const dependency of outgoing) {
			const successor = metrics.get(dependency.toTaskId);
			const successorTask = model.tasksById.get(dependency.toTaskId);
			if (!successor || !successorTask) continue;
			const successorCalendar = getTaskCalendar(model, successorTask);
			const candidateStart = getLatestPredecessorStart(
				dependency,
				successor,
				duration,
				calendar,
				successorCalendar
			);
			if (candidateStart.getTime() < latestStart.getTime()) {
				latestStart = candidateStart;
				latestEnd =
					duration === 0
						? new Date(candidateStart)
						: addWorkingMinutes(candidateStart, duration, calendar);
			}
		}
		({ latestStart, latestEnd } = applyLatestConstraint(
			task,
			latestStart,
			latestEnd,
			duration,
			calendar
		));
		const totalSlackMinutes = getWorkingMinutesBetween(metric.earliestStart, latestStart, calendar);
		const freeSlackMinutes = getFreeSlack(model, taskId, metric, metrics, calendar);
		metrics.set(taskId, {
			...metric,
			latestStart,
			latestEnd,
			totalSlackMinutes,
			freeSlackMinutes,
			isCritical: totalSlackMinutes <= CRITICAL_EPSILON_MINUTES
		});
	}
	return metrics;
}

function applyMetricsToTasks<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[],
	metrics: ReadonlyMap<string, CriticalMetric>,
	violationsByTaskId: ReadonlyMap<string, readonly GanttConstraintViolation[]>
): readonly GanttResolvedTaskNode<TTaskFields>[] {
	const analyzedById = new Map<string, GanttResolvedTaskNode<TTaskFields>>();
	for (let index = resolvedTasks.length - 1; index >= 0; index -= 1) {
		const node = resolvedTasks[index];
		const metric = metrics.get(node.taskId);
		if (node.type !== 'summary') {
			analyzedById.set(node.taskId, applyMetric(node, metric, violationsByTaskId.get(node.taskId)));
			continue;
		}
		const children =
			model.taskHierarchy.nodesById
				.get(node.taskId)
				?.childIds.map((childId) => getRequiredResolved(analyzedById, childId)) ?? [];
		const scheduledChildren = children.filter((child) => child.earliestStart && child.latestEnd);
		const totalSlackMinutes = minimumNullable(children.map((child) => child.totalSlackMinutes));
		const freeSlackMinutes = minimumNullable(children.map((child) => child.freeSlackMinutes));
		analyzedById.set(node.taskId, {
			...node,
			earliestStart: minimumDate(scheduledChildren.map((child) => child.earliestStart)),
			earliestEnd: maximumDate(scheduledChildren.map((child) => child.earliestEnd)),
			latestStart: minimumDate(scheduledChildren.map((child) => child.latestStart)),
			latestEnd: maximumDate(scheduledChildren.map((child) => child.latestEnd)),
			totalSlackMinutes,
			freeSlackMinutes,
			isCritical: children.some((child) => child.isCritical),
			violations: violationsByTaskId.get(node.taskId) ?? []
		});
	}
	return resolvedTasks.map((node) => getRequiredResolved(analyzedById, node.taskId));
}

function applyMetric<TTaskFields extends object>(
	node: GanttResolvedTaskNode<TTaskFields>,
	metric: CriticalMetric | undefined,
	violations: readonly GanttConstraintViolation[] | undefined
): GanttResolvedTaskNode<TTaskFields> {
	if (!metric) return { ...node, violations: violations ?? [] };
	return {
		...node,
		earliestStart: new Date(metric.earliestStart),
		earliestEnd: new Date(metric.earliestEnd),
		latestStart: new Date(metric.latestStart),
		latestEnd: new Date(metric.latestEnd),
		totalSlackMinutes: metric.totalSlackMinutes,
		freeSlackMinutes: metric.freeSlackMinutes,
		isCritical: metric.isCritical,
		violations: violations ?? []
	};
}

function getSuccessorStartFromMetric(
	dependency: GanttDependency,
	predecessor: CriticalMetric,
	duration: number,
	calendar: GanttCalendarRuntime
): Date {
	if (dependency.type === 'finish-start') {
		return shiftByLag(predecessor.earliestEnd, dependency, calendar);
	}
	if (dependency.type === 'start-start') {
		return shiftByLag(predecessor.earliestStart, dependency, calendar);
	}
	const predecessorBoundary =
		dependency.type === 'finish-finish' ? predecessor.earliestEnd : predecessor.earliestStart;
	const requiredFinish = shiftByLag(predecessorBoundary, dependency, calendar);
	return duration === 0
		? requiredFinish
		: subtractWorkingMinutes(requiredFinish, duration, calendar);
}

function getLatestPredecessorStart(
	dependency: GanttDependency,
	successor: CriticalMetric,
	duration: number,
	predecessorCalendar: GanttCalendarRuntime,
	successorCalendar: GanttCalendarRuntime
): Date {
	const successorBoundary =
		dependency.type === 'finish-start' || dependency.type === 'start-start'
			? successor.latestStart
			: successor.latestEnd;
	const allowedPredecessorBoundary = shiftByLag(
		successorBoundary,
		{
			...dependency,
			lag: dependency.lag ? { ...dependency.lag, value: -dependency.lag.value } : undefined
		},
		successorCalendar
	);
	if (dependency.type === 'start-start' || dependency.type === 'start-finish') {
		return allowedPredecessorBoundary;
	}
	return duration === 0
		? allowedPredecessorBoundary
		: subtractWorkingMinutes(allowedPredecessorBoundary, duration, predecessorCalendar);
}

function getFreeSlack<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	taskId: string,
	metric: CriticalMetric,
	metrics: ReadonlyMap<string, CriticalMetric>,
	calendar: GanttCalendarRuntime
): number {
	const outgoing = model.outgoingDependencies.get(taskId) ?? [];
	if (outgoing.length === 0) return metric.totalSlackMinutes;
	let freeSlack = Number.POSITIVE_INFINITY;
	for (const dependency of outgoing) {
		const successor = metrics.get(dependency.toTaskId);
		if (!successor) continue;
		freeSlack = Math.min(
			freeSlack,
			getDependencyFreeSlack(model, dependency, metric, successor, calendar)
		);
	}
	return Number.isFinite(freeSlack) ? freeSlack : metric.totalSlackMinutes;
}

function getDependencyFreeSlack<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	dependency: GanttDependency<TDependencyFields>,
	predecessor: CriticalMetric,
	successor: CriticalMetric,
	predecessorCalendar?: GanttCalendarRuntime
): number {
	const predecessorTask = model.tasksById.get(dependency.fromTaskId);
	const successorTask = model.tasksById.get(dependency.toTaskId);
	if (!predecessorTask || !successorTask) return Number.POSITIVE_INFINITY;
	const calendar = predecessorCalendar ?? getTaskCalendar(model, predecessorTask);
	const successorCalendar = getTaskCalendar(model, successorTask);
	const successorBoundary =
		dependency.type === 'finish-start' || dependency.type === 'start-start'
			? successor.earliestStart
			: successor.earliestEnd;
	const allowedPredecessorBoundary = shiftByLag(
		successorBoundary,
		{
			...dependency,
			lag: dependency.lag ? { ...dependency.lag, value: -dependency.lag.value } : undefined
		},
		successorCalendar
	);
	const predecessorBoundary =
		dependency.type === 'finish-start' || dependency.type === 'finish-finish'
			? predecessor.earliestEnd
			: predecessor.earliestStart;
	return getWorkingMinutesBetween(predecessorBoundary, allowedPredecessorBoundary, calendar);
}

function shiftByLag(
	instant: Date,
	dependency: Pick<GanttDependency, 'lag'>,
	calendar: GanttCalendarRuntime
): Date {
	const lagMinutes = getLagWorkingMinutes(dependency.lag, calendar);
	if (lagMinutes === 0) return new Date(instant);
	return lagMinutes > 0
		? addWorkingMinutes(instant, lagMinutes, calendar)
		: subtractWorkingMinutes(instant, -lagMinutes, calendar);
}

function applyEarliestConstraint<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	earliestStart: Date,
	duration: number,
	calendar: GanttCalendarRuntime
): Date {
	const constraint = task.constraint;
	if (!constraint || constraint.type === 'as-soon-as-possible') return earliestStart;
	if (constraint.type === 'start-no-earlier-than' || constraint.type === 'must-start-on') {
		return constraint.date.getTime() > earliestStart.getTime()
			? new Date(constraint.date)
			: earliestStart;
	}
	if (constraint.type === 'finish-no-earlier-than' || constraint.type === 'must-finish-on') {
		const candidate =
			duration === 0
				? new Date(constraint.date)
				: subtractWorkingMinutes(constraint.date, duration, calendar);
		return candidate.getTime() > earliestStart.getTime() ? candidate : earliestStart;
	}
	return earliestStart;
}

function applyLatestConstraint<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	latestStart: Date,
	latestEnd: Date,
	duration: number,
	calendar: GanttCalendarRuntime
): Readonly<{ latestStart: Date; latestEnd: Date }> {
	const constraint = task.constraint;
	if (!constraint || constraint.type === 'as-soon-as-possible') return { latestStart, latestEnd };
	if (constraint.type === 'start-no-later-than' || constraint.type === 'must-start-on') {
		if (constraint.date.getTime() >= latestStart.getTime()) return { latestStart, latestEnd };
		return {
			latestStart: new Date(constraint.date),
			latestEnd:
				duration === 0
					? new Date(constraint.date)
					: addWorkingMinutes(constraint.date, duration, calendar)
		};
	}
	if (constraint.type === 'finish-no-later-than' || constraint.type === 'must-finish-on') {
		if (constraint.date.getTime() >= latestEnd.getTime()) return { latestStart, latestEnd };
		return {
			latestStart:
				duration === 0
					? new Date(constraint.date)
					: subtractWorkingMinutes(constraint.date, duration, calendar),
			latestEnd: new Date(constraint.date)
		};
	}
	return { latestStart, latestEnd };
}

function getMetricDuration<TTaskFields extends object>(
	node: GanttResolvedTaskNode<TTaskFields>,
	calendar: GanttCalendarRuntime
): number {
	if (!node.resolvedStart || !node.resolvedEnd) return 0;
	return getWorkingMinutesBetween(node.resolvedStart, node.resolvedEnd, calendar);
}

function resolveDependencies<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>,
	criticalDependencyIds: ReadonlySet<string>
): readonly GanttResolvedDependency<TTaskFields, TDependencyFields>[] {
	return model.dependencies.map((dependency) => ({
		dependency,
		isCritical: criticalDependencyIds.has(dependency.id),
		fromTask: getRequiredResolved(resolvedById, dependency.fromTaskId),
		toTask: getRequiredResolved(resolvedById, dependency.toTaskId)
	}));
}

function getProjectRange<TTaskFields extends object>(
	nodes: readonly GanttResolvedTaskNode<TTaskFields>[]
): GanttRange | null {
	const starts = nodes.flatMap((node) =>
		node.resolvedStart ? [node.resolvedStart.getTime()] : []
	);
	const ends = nodes.flatMap((node) => (node.resolvedEnd ? [node.resolvedEnd.getTime()] : []));
	if (starts.length === 0 || ends.length === 0) return null;
	return { start: new Date(Math.min(...starts)), end: new Date(Math.max(...ends)) };
}

function indexViolations(
	violations: readonly GanttConstraintViolation[]
): ReadonlyMap<string, readonly GanttConstraintViolation[]> {
	const byTaskId = new Map<string, GanttConstraintViolation[]>();
	const identities = new Set<string>();
	for (const violation of violations) {
		const identity = JSON.stringify([
			violation.taskId,
			violation.code,
			violation.requiredDate?.getTime() ?? null,
			violation.actualDate?.getTime() ?? null,
			violation.message
		]);
		if (identities.has(identity)) continue;
		identities.add(identity);
		const taskViolations = byTaskId.get(violation.taskId) ?? [];
		taskViolations.push(violation);
		byTaskId.set(violation.taskId, taskViolations);
	}
	return byTaskId;
}

function minimumNullable(values: readonly (number | null)[]): number | null {
	const finite = values.filter(
		(value): value is number => value !== null && Number.isFinite(value)
	);
	return finite.length > 0 ? Math.min(...finite) : null;
}

function minimumDate(values: readonly (Date | null)[]): Date | null {
	const times = values.flatMap((date) => (date ? [date.getTime()] : []));
	return times.length > 0 ? new Date(Math.min(...times)) : null;
}

function maximumDate(values: readonly (Date | null)[]): Date | null {
	const times = values.flatMap((date) => (date ? [date.getTime()] : []));
	return times.length > 0 ? new Date(Math.max(...times)) : null;
}

function getRequiredResolved<TTaskFields extends object>(
	resolvedById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>,
	taskId: string
): GanttResolvedTaskNode<TTaskFields> {
	const node = resolvedById.get(taskId);
	if (node) return node;
	throw new GanttChartError('invalid-operation', `Resolved task index lost ${taskId}.`, { taskId });
}
