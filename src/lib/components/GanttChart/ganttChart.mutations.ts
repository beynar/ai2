import { GanttChartError } from './ganttChart.error.js';
import { resolveGanttSchedule, type ResolvedGanttSchedule } from './ganttChart.schedule.js';
import type { GanttChartStateOptions } from './ganttChart.state.svelte.js';
import type {
	GanttAssignment,
	GanttAssignmentMutationKind,
	GanttAssignmentProposal,
	GanttDependency,
	GanttDependencyMutationKind,
	GanttDependencyProposal,
	GanttMutationSource,
	GanttTask,
	GanttTaskMutationKind,
	GanttTaskProposal
} from './ganttChart.types.js';

type Schedule<TTaskFields extends object, TDependencyFields extends object> = Pick<
	ResolvedGanttSchedule<TTaskFields, TDependencyFields, object, object>,
	'tasks' | 'autoScheduledTaskIds' | 'analysis'
>;

export class GanttChartMutations<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	constructor(
		private readonly options: GanttChartStateOptions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) {}

	addTask(task: GanttTask<TTaskFields>, source: GanttMutationSource): boolean {
		this.assertMutationEnabled();
		const nextTask = cloneTask(task);
		return this.commitTaskMutation({
			kind: 'add',
			source,
			previousTask: null,
			task: nextTask,
			candidateTasks: [...this.options.tasks, nextTask]
		});
	}

	updateTask(task: GanttTask<TTaskFields>, source: GanttMutationSource): boolean {
		this.assertMutationEnabled();
		const previousTask = this.requireTask(task.id);
		this.assertTaskWritable(previousTask);
		const nextTask = cloneTask(task);
		return this.commitTaskMutation({
			kind: 'update',
			source,
			previousTask,
			task: nextTask,
			candidateTasks: replaceById(this.options.tasks, nextTask)
		});
	}

	removeTask(taskId: string, source: GanttMutationSource): boolean {
		this.assertMutationEnabled();
		const previousTask = this.requireTask(taskId);
		this.assertTaskWritable(previousTask);
		return this.commitTaskMutation({
			kind: 'remove',
			source,
			previousTask,
			task: null,
			candidateTasks: this.options.tasks.filter((task) => task.id !== taskId)
		});
	}

	reorderTask(taskId: string, targetTaskId: string, position: 'before' | 'after'): boolean {
		this.assertMutationEnabled();
		if (taskId === targetTaskId) return true;
		const previousTask = this.requireTask(taskId);
		const targetTask = this.requireTask(targetTaskId);
		this.assertTaskWritable(previousTask);
		if ((previousTask.parentId ?? null) !== (targetTask.parentId ?? null)) {
			return false;
		}
		const task = cloneTask(previousTask);
		const withoutTask = this.options.tasks.filter((candidate) => candidate.id !== taskId);
		const targetIndex = withoutTask.findIndex((candidate) => candidate.id === targetTaskId);
		const insertIndex = targetIndex + (position === 'after' ? 1 : 0);
		const candidateTasks = [...withoutTask];
		candidateTasks.splice(insertIndex, 0, task);
		return this.commitTaskMutation({
			kind: 'reorder',
			source: 'pointer',
			previousTask,
			task,
			candidateTasks
		});
	}

	indentTask(taskId: string, previousTaskId: string): boolean {
		this.assertMutationEnabled();
		const previousTask = this.requireTask(taskId);
		const parentTask = this.requireTask(previousTaskId);
		this.assertTaskWritable(previousTask);
		if (
			(previousTask.parentId ?? null) !== (parentTask.parentId ?? null) ||
			parentTask.type !== 'summary'
		) {
			return false;
		}
		const task = cloneTaskWithParent(previousTask, parentTask.id);
		return this.commitTaskMutation({
			kind: 'indent',
			source: 'keyboard',
			previousTask,
			task,
			candidateTasks: replaceById(this.options.tasks, task)
		});
	}

	outdentTask(taskId: string): boolean {
		this.assertMutationEnabled();
		const previousTask = this.requireTask(taskId);
		this.assertTaskWritable(previousTask);
		if (!previousTask.parentId) return false;
		const parentTask = this.requireTask(previousTask.parentId);
		const task = cloneTaskWithParent(previousTask, parentTask.parentId);
		return this.commitTaskMutation({
			kind: 'outdent',
			source: 'keyboard',
			previousTask,
			task,
			candidateTasks: replaceById(this.options.tasks, task)
		});
	}

	addDependency(
		dependency: GanttDependency<TDependencyFields>,
		source: GanttMutationSource
	): boolean {
		this.assertMutationEnabled();
		const nextDependency = cloneDependency(dependency);
		return this.commitDependencyMutation({
			kind: 'add',
			source,
			previousDependency: null,
			dependency: nextDependency,
			candidateDependencies: [...this.options.dependencies, nextDependency]
		});
	}

	updateDependency(
		dependency: GanttDependency<TDependencyFields>,
		source: GanttMutationSource
	): boolean {
		this.assertMutationEnabled();
		const previousDependency = this.requireDependency(dependency.id);
		this.assertDependencyWritable(previousDependency);
		const nextDependency = cloneDependency(dependency);
		return this.commitDependencyMutation({
			kind: 'update',
			source,
			previousDependency,
			dependency: nextDependency,
			candidateDependencies: replaceById(this.options.dependencies, nextDependency)
		});
	}

	removeDependency(dependencyId: string, source: GanttMutationSource): boolean {
		this.assertMutationEnabled();
		const previousDependency = this.requireDependency(dependencyId);
		this.assertDependencyWritable(previousDependency);
		return this.commitDependencyMutation({
			kind: 'remove',
			source,
			previousDependency,
			dependency: null,
			candidateDependencies: this.options.dependencies.filter(
				(dependency) => dependency.id !== dependencyId
			)
		});
	}

	addAssignment(
		assignment: GanttAssignment<TAssignmentFields>,
		source: GanttMutationSource
	): boolean {
		this.assertMutationEnabled();
		const nextAssignment = cloneAssignment(assignment);
		return this.commitAssignmentMutation({
			kind: 'add',
			source,
			previousAssignment: null,
			assignment: nextAssignment,
			candidateAssignments: [...this.options.assignments, nextAssignment]
		});
	}

	updateAssignment(
		assignment: GanttAssignment<TAssignmentFields>,
		source: GanttMutationSource
	): boolean {
		this.assertMutationEnabled();
		const previousAssignment = this.requireAssignment(assignment.id);
		const nextAssignment = cloneAssignment(assignment);
		return this.commitAssignmentMutation({
			kind: 'update',
			source,
			previousAssignment,
			assignment: nextAssignment,
			candidateAssignments: replaceById(this.options.assignments, nextAssignment)
		});
	}

	removeAssignment(assignmentId: string, source: GanttMutationSource): boolean {
		this.assertMutationEnabled();
		const previousAssignment = this.requireAssignment(assignmentId);
		return this.commitAssignmentMutation({
			kind: 'remove',
			source,
			previousAssignment,
			assignment: null,
			candidateAssignments: this.options.assignments.filter(
				(assignment) => assignment.id !== assignmentId
			)
		});
	}

	private commitTaskMutation(input: {
		kind: GanttTaskMutationKind;
		source: GanttMutationSource;
		previousTask: GanttTask<TTaskFields> | null;
		task: GanttTask<TTaskFields> | null;
		candidateTasks: GanttTask<TTaskFields>[];
	}): boolean {
		let candidateTasks = input.candidateTasks;
		let schedule = this.resolveSchedule(candidateTasks, this.options.dependencies);
		const proposal = this.createTaskProposal(input, schedule);
		if (this.options.canUpdateTask?.(proposal) === false) return false;
		const decision = this.options.onTaskUpdate?.(proposal);
		if (decision === false) return false;
		if (decision && typeof decision === 'object') {
			if (!input.task || decision.id !== input.task.id) {
				throw new GanttChartError(
					'invalid-adjustment',
					'Task adjustments must preserve the proposed task id.'
				);
			}
			const adjustedTask = cloneTask(decision);
			candidateTasks = replaceById(candidateTasks, adjustedTask);
			schedule = this.resolveAdjustedSchedule(candidateTasks, this.options.dependencies);
		}
		const publishedTasks = [...schedule.tasks];
		const previousTasks = this.options.tasks;
		this.options.tasks = publishedTasks;
		const committedTasks = this.options.tasks;
		const revert = createGuardedRevert(
			() => this.options.tasks === committedTasks,
			() => {
				this.options.tasks = previousTasks;
			}
		);
		const affectedTaskIds = uniqueIds([
			...(input.task ? [input.task.id] : []),
			...(input.previousTask ? [input.previousTask.id] : []),
			...schedule.autoScheduledTaskIds
		]);
		this.options.onTasksChange?.(committedTasks, {
			kind: input.kind,
			source: input.source,
			previousTasks,
			tasks: committedTasks,
			affectedTaskIds,
			violations: schedule.analysis.violations,
			revert
		});
		this.options.onScheduleViolations?.(schedule.analysis.violations, 'task-change');
		return true;
	}

	private commitDependencyMutation(input: {
		kind: GanttDependencyMutationKind;
		source: GanttMutationSource;
		previousDependency: GanttDependency<TDependencyFields> | null;
		dependency: GanttDependency<TDependencyFields> | null;
		candidateDependencies: GanttDependency<TDependencyFields>[];
	}): boolean {
		let candidateDependencies = input.candidateDependencies;
		let proposal = createDependencyProposal(input);
		if (this.options.canUpdateDependency?.(proposal) === false) return false;
		const decision = this.options.onDependencyUpdate?.(proposal);
		if (decision === false) return false;
		if (decision && typeof decision === 'object') {
			if (!input.dependency || decision.id !== input.dependency.id) {
				throw new GanttChartError(
					'invalid-adjustment',
					'Dependency adjustments must preserve the proposed dependency id.'
				);
			}
			const adjustedDependency = cloneDependency(decision);
			candidateDependencies = replaceById(candidateDependencies, adjustedDependency);
			proposal = createDependencyProposal({ ...input, dependency: adjustedDependency });
		}
		const schedule = this.resolveAdjustedSchedule(this.options.tasks, candidateDependencies);
		const previousTasks = this.options.tasks;
		const previousDependencies = this.options.dependencies;
		const publishedTasks = [...schedule.tasks];
		const publishedDependencies = [...candidateDependencies];
		this.options.tasks = publishedTasks;
		this.options.dependencies = publishedDependencies;
		const committedTasks = this.options.tasks;
		const committedDependencies = this.options.dependencies;
		const revert = createGuardedRevert(
			() =>
				this.options.tasks === committedTasks &&
				this.options.dependencies === committedDependencies,
			() => {
				this.options.tasks = previousTasks;
				this.options.dependencies = previousDependencies;
			}
		);
		if (schedule.autoScheduledTaskIds.length > 0) {
			this.options.onTasksChange?.(committedTasks, {
				kind: 'schedule',
				source: input.source,
				previousTasks,
				tasks: committedTasks,
				affectedTaskIds: schedule.autoScheduledTaskIds,
				violations: schedule.analysis.violations,
				revert
			});
		}
		this.options.onDependenciesChange?.(committedDependencies, {
			kind: input.kind,
			source: input.source,
			previousDependencies,
			dependencies: committedDependencies,
			affectedDependencyIds: uniqueIds([
				...(proposal.dependency ? [proposal.dependency.id] : []),
				...(proposal.previousDependency ? [proposal.previousDependency.id] : [])
			]),
			revert
		});
		this.options.onScheduleViolations?.(schedule.analysis.violations, 'dependency-change');
		return true;
	}

	private commitAssignmentMutation(input: {
		kind: GanttAssignmentMutationKind;
		source: GanttMutationSource;
		previousAssignment: GanttAssignment<TAssignmentFields> | null;
		assignment: GanttAssignment<TAssignmentFields> | null;
		candidateAssignments: GanttAssignment<TAssignmentFields>[];
	}): boolean {
		let candidateAssignments = input.candidateAssignments;
		let proposal = createAssignmentProposal(input);
		if (this.options.canUpdateAssignment?.(proposal) === false) return false;
		const decision = this.options.onAssignmentUpdate?.(proposal);
		if (decision === false) return false;
		if (decision && typeof decision === 'object') {
			if (!input.assignment || decision.id !== input.assignment.id) {
				throw new GanttChartError(
					'invalid-adjustment',
					'Assignment adjustments must preserve the proposed assignment id.'
				);
			}
			const adjustedAssignment = cloneAssignment(decision);
			candidateAssignments = replaceById(candidateAssignments, adjustedAssignment);
			proposal = createAssignmentProposal({ ...input, assignment: adjustedAssignment });
		}
		this.resolveSchedule(this.options.tasks, this.options.dependencies, candidateAssignments);
		const previousAssignments = this.options.assignments;
		this.options.assignments = [...candidateAssignments];
		const committedAssignments = this.options.assignments;
		const revert = createGuardedRevert(
			() => this.options.assignments === committedAssignments,
			() => {
				this.options.assignments = previousAssignments;
			}
		);
		this.options.onAssignmentsChange?.(committedAssignments, {
			kind: input.kind,
			source: input.source,
			previousAssignments,
			assignments: committedAssignments,
			affectedAssignmentIds: uniqueIds([
				...(proposal.assignment ? [proposal.assignment.id] : []),
				...(proposal.previousAssignment ? [proposal.previousAssignment.id] : [])
			]),
			revert
		});
		return true;
	}

	private createTaskProposal(
		input: {
			kind: GanttTaskMutationKind;
			source: GanttMutationSource;
			previousTask: GanttTask<TTaskFields> | null;
			task: GanttTask<TTaskFields> | null;
		},
		schedule: Schedule<TTaskFields, TDependencyFields>
	): GanttTaskProposal<TTaskFields> {
		const propagatedTasks = schedule.autoScheduledTaskIds
			.map((taskId) => schedule.tasks.find((task) => task.id === taskId))
			.filter((task): task is GanttTask<TTaskFields> => !!task);
		if (input.kind === 'add' || input.kind === 'paste') {
			if (!input.task) throw new Error('Add task proposal lost its task.');
			return {
				kind: input.kind,
				source: input.source,
				previousTask: null,
				task: input.task,
				propagatedTasks
			};
		}
		if (input.kind === 'remove') {
			if (!input.previousTask) throw new Error('Remove task proposal lost its previous task.');
			return {
				kind: 'remove',
				source: input.source,
				previousTask: input.previousTask,
				task: null,
				propagatedTasks
			};
		}
		if (!input.previousTask || !input.task) {
			throw new Error('Update task proposal lost a task endpoint.');
		}
		return {
			kind: input.kind,
			source: input.source,
			previousTask: input.previousTask,
			task: input.task,
			propagatedTasks
		};
	}

	private resolveSchedule(
		tasks: readonly GanttTask<TTaskFields>[],
		dependencies: readonly GanttDependency<TDependencyFields>[],
		assignments: readonly GanttAssignment<TAssignmentFields>[] = this.options.assignments
	): ResolvedGanttSchedule<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
		return resolveGanttSchedule({
			tasks,
			dependencies,
			resources: this.options.resources,
			assignments,
			calendars: this.options.calendars,
			projectCalendarId: this.options.projectCalendarId,
			timeZone: this.options.timeZone,
			expandedTaskIds: this.options.expandedTaskIds.filter((taskId) =>
				tasks.some((task) => task.id === taskId && task.type === 'summary')
			),
			autoSchedule: this.options.autoSchedule
		});
	}

	private resolveAdjustedSchedule(
		tasks: readonly GanttTask<TTaskFields>[],
		dependencies: readonly GanttDependency<TDependencyFields>[]
	): ResolvedGanttSchedule<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
		try {
			return this.resolveSchedule(tasks, dependencies);
		} catch (error) {
			if (!(error instanceof GanttChartError)) throw error;
			throw new GanttChartError(
				'invalid-adjustment',
				'Consumer adjustment produced an invalid Gantt model.',
				{ causeCode: error.code, cause: error.message }
			);
		}
	}

	private assertMutationEnabled(): void {
		if (this.options.disabled) throw new GanttChartError('disabled', 'GanttChart is disabled.');
		if (this.options.loading) {
			throw new GanttChartError('invalid-operation', 'GanttChart is loading.');
		}
	}

	private requireTask(taskId: string): GanttTask<TTaskFields> {
		const task = this.options.tasks.find((candidate) => candidate.id === taskId);
		if (task) return task;
		throw new GanttChartError('invalid-operation', `Unknown task ${taskId}.`, { taskId });
	}

	private requireDependency(dependencyId: string): GanttDependency<TDependencyFields> {
		const dependency = this.options.dependencies.find((candidate) => candidate.id === dependencyId);
		if (dependency) return dependency;
		throw new GanttChartError('invalid-operation', `Unknown dependency ${dependencyId}.`, {
			dependencyId
		});
	}

	private requireAssignment(assignmentId: string): GanttAssignment<TAssignmentFields> {
		const assignment = this.options.assignments.find((candidate) => candidate.id === assignmentId);
		if (assignment) return assignment;
		throw new GanttChartError('invalid-operation', `Unknown assignment ${assignmentId}.`, {
			assignmentId
		});
	}

	private assertTaskWritable(task: GanttTask<TTaskFields>): void {
		if (!task.readOnly) return;
		throw new GanttChartError('read-only', `Task ${task.id} is read-only.`, { taskId: task.id });
	}

	private assertDependencyWritable(dependency: GanttDependency<TDependencyFields>): void {
		if (!dependency.readOnly) return;
		throw new GanttChartError('read-only', `Dependency ${dependency.id} is read-only.`, {
			dependencyId: dependency.id
		});
	}
}

function createDependencyProposal<TDependencyFields extends object>(input: {
	kind: GanttDependencyMutationKind;
	source: GanttMutationSource;
	previousDependency: GanttDependency<TDependencyFields> | null;
	dependency: GanttDependency<TDependencyFields> | null;
}): GanttDependencyProposal<TDependencyFields> {
	return {
		kind: input.kind,
		source: input.source,
		previousDependency: input.previousDependency,
		dependency: input.dependency
	};
}

function createAssignmentProposal<TAssignmentFields extends object>(input: {
	kind: GanttAssignmentMutationKind;
	source: GanttMutationSource;
	previousAssignment: GanttAssignment<TAssignmentFields> | null;
	assignment: GanttAssignment<TAssignmentFields> | null;
}): GanttAssignmentProposal<TAssignmentFields> {
	return {
		kind: input.kind,
		source: input.source,
		previousAssignment: input.previousAssignment,
		assignment: input.assignment
	};
}

function createGuardedRevert(isCurrent: () => boolean, restore: () => void): () => void {
	let isConsumed = false;
	return () => {
		if (isConsumed) {
			throw new GanttChartError('revert-used', 'This GanttChart revert was already used.');
		}
		if (!isCurrent()) {
			throw new GanttChartError(
				'stale-transaction',
				'This GanttChart transaction can no longer be reverted.'
			);
		}
		isConsumed = true;
		restore();
	};
}

function replaceById<T extends { id: string }>(records: readonly T[], record: T): T[] {
	const index = records.findIndex((candidate) => candidate.id === record.id);
	if (index < 0) {
		throw new GanttChartError('invalid-operation', `Unknown record ${record.id}.`, {
			id: record.id
		});
	}
	const nextRecords = [...records];
	nextRecords[index] = record;
	return nextRecords;
}

function uniqueIds(ids: readonly string[]): readonly string[] {
	return [...new Set(ids)];
}

function cloneTask<TTaskFields extends object>(
	task: GanttTask<TTaskFields>
): GanttTask<TTaskFields> {
	return { ...task };
}

function cloneTaskWithParent<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	parentId: string | undefined
): GanttTask<TTaskFields> {
	const clonedTask = cloneTask(task);
	if (parentId) return { ...clonedTask, parentId };
	return { ...clonedTask, parentId: undefined };
}

function cloneDependency<TDependencyFields extends object>(
	dependency: GanttDependency<TDependencyFields>
): GanttDependency<TDependencyFields> {
	return {
		...dependency,
		lag: dependency.lag ? { ...dependency.lag } : undefined
	};
}

function cloneAssignment<TAssignmentFields extends object>(
	assignment: GanttAssignment<TAssignmentFields>
): GanttAssignment<TAssignmentFields> {
	return { ...assignment };
}
