import { compareScheduleValues } from '$lib/scheduling/scheduleOrder.js';
import { GanttChartError } from './ganttChart.error.js';
import { getTaskCalendar, getTaskWorkingMinutes } from './ganttChart.calendar.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type { GanttResolvedTaskNode, GanttTask } from './ganttChart.types.js';

export function resolveGanttDropParentId<TTaskFields extends object>(
	targetTask: GanttTask<TTaskFields>,
	position: 'before' | 'after'
): string | null {
	return (targetTask.type ?? 'task') === 'summary' && position === 'after'
		? targetTask.id
		: (targetTask.parentId ?? null);
}

type ResolvedAccumulator<TTaskFields extends object> = {
	task: GanttTask<TTaskFields>;
	resolvedStart: Date | null;
	resolvedEnd: Date | null;
	progress: number | null;
	elapsedDurationMs: number | null;
	workingDurationMinutes: number | null;
	progressWeight: number;
};

export type ResolveGanttHierarchyOptions<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	expandedTaskIds: readonly string[];
}>;

export function resolveGanttHierarchy<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	options: ResolveGanttHierarchyOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>
): readonly GanttResolvedTaskNode<TTaskFields>[] {
	const { model } = options;
	const expandedTaskIds = validateExpandedTaskIds(options.expandedTaskIds, model.tasksById);
	const accumulators = resolveAccumulators(model);
	const wbsById = resolveWbs(model);
	const visibilityById = resolveVisibility(model, expandedTaskIds);
	let visibleIndex = 0;

	return model.taskHierarchy.nodes.map((hierarchyNode) => {
		const accumulator = getRequiredAccumulator(accumulators, hierarchyNode.id);
		const isVisible = visibilityById.get(hierarchyNode.id) ?? false;
		const node: GanttResolvedTaskNode<TTaskFields> = {
			task: accumulator.task,
			taskId: accumulator.task.id,
			parentId: hierarchyNode.parentId,
			childIds: hierarchyNode.childIds,
			depth: hierarchyNode.depth,
			wbs: getRequiredString(wbsById, hierarchyNode.id),
			type: accumulator.task.type ?? 'task',
			isExpanded: expandedTaskIds.has(hierarchyNode.id),
			isVisible,
			visibleIndex: isVisible ? visibleIndex : null,
			resolvedStart: cloneDate(accumulator.resolvedStart),
			resolvedEnd: cloneDate(accumulator.resolvedEnd),
			progress: accumulator.progress,
			elapsedDurationMs: accumulator.elapsedDurationMs,
			workingDurationMinutes: accumulator.workingDurationMinutes,
			earliestStart: null,
			earliestEnd: null,
			latestStart: null,
			latestEnd: null,
			totalSlackMinutes: null,
			freeSlackMinutes: null,
			isCritical: false,
			violations: []
		};
		if (isVisible) visibleIndex += 1;
		return node;
	});
}

export function compareResolvedGanttTasks<TTaskFields extends object>(
	left: GanttResolvedTaskNode<TTaskFields>,
	right: GanttResolvedTaskNode<TTaskFields>
): number {
	const leftStart = left.resolvedStart?.getTime() ?? Number.POSITIVE_INFINITY;
	const rightStart = right.resolvedStart?.getTime() ?? Number.POSITIVE_INFINITY;
	const leftEnd = left.resolvedEnd?.getTime() ?? leftStart;
	const rightEnd = right.resolvedEnd?.getTime() ?? rightStart;
	return compareScheduleValues(
		leftStart,
		leftEnd,
		left.task.priority ?? 0,
		left.task.id,
		rightStart,
		rightEnd,
		right.task.priority ?? 0,
		right.task.id
	);
}

function resolveAccumulators<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
): ReadonlyMap<string, ResolvedAccumulator<TTaskFields>> {
	const accumulators = new Map<string, ResolvedAccumulator<TTaskFields>>();
	for (let index = model.taskHierarchy.nodes.length - 1; index >= 0; index -= 1) {
		const hierarchyNode = model.taskHierarchy.nodes[index];
		const task = getRequiredTask(model.tasksById, hierarchyNode.id);
		if ((task.type ?? 'task') !== 'summary') {
			const resolvedStart = task.start ? new Date(task.start) : null;
			const resolvedEnd = task.end ? new Date(task.end) : null;
			const workingDurationMinutes = getTaskWorkingMinutes(task, getTaskCalendar(model, task));
			accumulators.set(task.id, {
				task,
				resolvedStart,
				resolvedEnd,
				progress: task.progress ?? 0,
				elapsedDurationMs:
					resolvedStart && resolvedEnd ? resolvedEnd.getTime() - resolvedStart.getTime() : null,
				workingDurationMinutes,
				progressWeight: Math.max(0, workingDurationMinutes ?? 0)
			});
			continue;
		}

		const children = hierarchyNode.childIds.map((childId) =>
			getRequiredAccumulator(accumulators, childId)
		);
		const scheduledChildren = children.filter(
			(child) => child.resolvedStart !== null && child.resolvedEnd !== null
		);
		const resolvedStart = getMinimumDate(scheduledChildren.map((child) => child.resolvedStart));
		const resolvedEnd = getMaximumDate(scheduledChildren.map((child) => child.resolvedEnd));
		const weightedChildren = children.filter((child) => child.progressWeight > 0);
		const progressWeight = weightedChildren.reduce(
			(total, child) => total + child.progressWeight,
			0
		);
		const progress =
			progressWeight > 0
				? weightedChildren.reduce(
						(total, child) => total + (child.progress ?? 0) * child.progressWeight,
						0
					) / progressWeight
				: scheduledChildren.length > 0
					? scheduledChildren.reduce((total, child) => total + (child.progress ?? 0), 0) /
						scheduledChildren.length
					: null;
		accumulators.set(task.id, {
			task,
			resolvedStart,
			resolvedEnd,
			progress,
			elapsedDurationMs:
				resolvedStart && resolvedEnd ? resolvedEnd.getTime() - resolvedStart.getTime() : null,
			workingDurationMinutes:
				children.length > 0
					? children.reduce((total, child) => total + (child.workingDurationMinutes ?? 0), 0)
					: null,
			progressWeight
		});
	}
	return accumulators;
}

function resolveWbs<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
): ReadonlyMap<string, string> {
	const wbsById = new Map<string, string>();
	const rootIndexes = new Map(model.taskHierarchy.roots.map((node, index) => [node.id, index + 1]));
	for (const node of model.taskHierarchy.nodes) {
		if (node.parentId === null) {
			wbsById.set(node.id, String(rootIndexes.get(node.id)));
			continue;
		}
		const parent = model.taskHierarchy.nodesById.get(node.parentId);
		if (!parent) {
			throw new GanttChartError(
				'invalid-operation',
				`Task hierarchy lost parent ${node.parentId}.`
			);
		}
		const siblingIndex = parent.childIds.indexOf(node.id);
		const parentWbs = getRequiredString(wbsById, parent.id);
		wbsById.set(node.id, `${parentWbs}.${siblingIndex + 1}`);
	}
	return wbsById;
}

function resolveVisibility<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	expandedTaskIds: ReadonlySet<string>
): ReadonlyMap<string, boolean> {
	const visibilityById = new Map<string, boolean>();
	for (const node of model.taskHierarchy.nodes) {
		const isVisible =
			node.parentId === null ||
			((visibilityById.get(node.parentId) ?? false) && expandedTaskIds.has(node.parentId));
		visibilityById.set(node.id, isVisible);
	}
	return visibilityById;
}

function validateExpandedTaskIds<TTaskFields extends object>(
	expandedTaskIds: readonly string[],
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>
): ReadonlySet<string> {
	if (!Array.isArray(expandedTaskIds) || new Set(expandedTaskIds).size !== expandedTaskIds.length) {
		throw new GanttChartError('invalid-prop', 'expandedTaskIds must be an ordered unique array.');
	}
	for (const taskId of expandedTaskIds) {
		const task = tasksById.get(taskId);
		if (!task || task.type !== 'summary') {
			throw new GanttChartError(
				'invalid-prop',
				`expandedTaskIds contains non-summary task ${taskId}.`,
				{ taskId }
			);
		}
	}
	return new Set(expandedTaskIds);
}

function getMinimumDate(dates: readonly (Date | null)[]): Date | null {
	let minimum = Number.POSITIVE_INFINITY;
	for (const date of dates) {
		if (date) minimum = Math.min(minimum, date.getTime());
	}
	return Number.isFinite(minimum) ? new Date(minimum) : null;
}

function getMaximumDate(dates: readonly (Date | null)[]): Date | null {
	let maximum = Number.NEGATIVE_INFINITY;
	for (const date of dates) {
		if (date) maximum = Math.max(maximum, date.getTime());
	}
	return Number.isFinite(maximum) ? new Date(maximum) : null;
}

function getRequiredTask<TTaskFields extends object>(
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>,
	taskId: string
): GanttTask<TTaskFields> {
	const task = tasksById.get(taskId);
	if (task) return task;
	throw new GanttChartError('invalid-operation', `Task index lost ${taskId}.`, { taskId });
}

function getRequiredAccumulator<TTaskFields extends object>(
	accumulators: ReadonlyMap<string, ResolvedAccumulator<TTaskFields>>,
	taskId: string
): ResolvedAccumulator<TTaskFields> {
	const accumulator = accumulators.get(taskId);
	if (accumulator) return accumulator;
	throw new GanttChartError('invalid-operation', `Task resolution lost ${taskId}.`, { taskId });
}

function getRequiredString(values: ReadonlyMap<string, string>, key: string): string {
	const value = values.get(key);
	if (value !== undefined) return value;
	throw new GanttChartError('invalid-operation', `Resolved string index lost ${key}.`, { key });
}

function cloneDate(value: Date | null): Date | null {
	return value ? new Date(value) : null;
}
