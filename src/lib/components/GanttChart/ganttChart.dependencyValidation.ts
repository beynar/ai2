import { GanttChartError } from './ganttChart.error.js';
import { assertGanttIdentifier, assertGanttRecord } from './ganttChart.validationBoundary.js';
import type { GanttDependency, GanttTask } from './ganttChart.types.js';

export type ValidatedDependencyDag<TDependencyFields extends object> = Readonly<{
	dependenciesById: ReadonlyMap<string, GanttDependency<TDependencyFields>>;
	incomingDependencies: ReadonlyMap<string, readonly GanttDependency<TDependencyFields>[]>;
	outgoingDependencies: ReadonlyMap<string, readonly GanttDependency<TDependencyFields>[]>;
	topologicalTaskIds: readonly string[];
}>;

export function validateGanttDependencies<
	TTaskFields extends object,
	TDependencyFields extends object
>(
	tasks: readonly GanttTask<TTaskFields>[],
	dependencies: readonly GanttDependency<TDependencyFields>[],
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>
): ValidatedDependencyDag<TDependencyFields> {
	const dependenciesById = new Map<string, GanttDependency<TDependencyFields>>();
	const semanticLinks = new Set<string>();
	for (const dependency of dependencies) {
		assertGanttRecord(dependency, 'Every dependency must be an object.', 'duplicate-dependency-id');
		assertGanttIdentifier(dependency.id, 'dependency');
		if (dependenciesById.has(dependency.id)) {
			throw new GanttChartError(
				'duplicate-dependency-id',
				`Duplicate dependency id: ${dependency.id}.`,
				{ id: dependency.id }
			);
		}
		validateDependencyReferences(dependency, tasksById);
		validateDependencyShape(dependency);
		const semanticKey = JSON.stringify([
			dependency.fromTaskId,
			dependency.toTaskId,
			dependency.type
		]);
		if (semanticLinks.has(semanticKey)) {
			throw new GanttChartError(
				'duplicate-dependency',
				`Dependency ${dependency.id} duplicates an existing semantic link.`,
				{ id: dependency.id }
			);
		}
		semanticLinks.add(semanticKey);
		dependenciesById.set(dependency.id, dependency);
	}
	return { dependenciesById, ...buildDependencyDag(tasks, dependencies) };
}

function validateDependencyReferences<TTaskFields extends object, TDependencyFields extends object>(
	dependency: GanttDependency<TDependencyFields>,
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>
): void {
	if (!tasksById.has(dependency.fromTaskId) || !tasksById.has(dependency.toTaskId)) {
		throw new GanttChartError(
			'missing-dependency-task',
			`Dependency ${dependency.id} references a missing task.`,
			{
				id: dependency.id,
				fromTaskId: dependency.fromTaskId,
				toTaskId: dependency.toTaskId
			}
		);
	}
	if (dependency.fromTaskId !== dependency.toTaskId) return;
	throw new GanttChartError(
		'dependency-self-link',
		`Dependency ${dependency.id} cannot link a task to itself.`,
		{ id: dependency.id, taskId: dependency.fromTaskId }
	);
}

function validateDependencyShape<TDependencyFields extends object>(
	dependency: GanttDependency<TDependencyFields>
): void {
	if (
		dependency.type !== 'finish-start' &&
		dependency.type !== 'start-start' &&
		dependency.type !== 'finish-finish' &&
		dependency.type !== 'start-finish'
	) {
		throw new GanttChartError(
			'duplicate-dependency',
			`Dependency ${dependency.id} has invalid type.`,
			{
				id: dependency.id,
				type: dependency.type
			}
		);
	}
	if (
		dependency.lag &&
		(!Number.isFinite(dependency.lag.value) ||
			!['minute', 'hour', 'day', 'week'].includes(dependency.lag.unit))
	) {
		throw new GanttChartError(
			'duplicate-dependency',
			`Dependency ${dependency.id} has invalid lag.`,
			{ id: dependency.id, lag: dependency.lag }
		);
	}
}

function buildDependencyDag<TTaskFields extends object, TDependencyFields extends object>(
	tasks: readonly GanttTask<TTaskFields>[],
	dependencies: readonly GanttDependency<TDependencyFields>[]
): Omit<ValidatedDependencyDag<TDependencyFields>, 'dependenciesById'> {
	const incoming = new Map<string, GanttDependency<TDependencyFields>[]>();
	const outgoing = new Map<string, GanttDependency<TDependencyFields>[]>();
	const indegree = new Map<string, number>();
	for (const task of tasks) {
		incoming.set(task.id, []);
		outgoing.set(task.id, []);
		indegree.set(task.id, 0);
	}
	for (const dependency of dependencies) {
		getRequiredArray(outgoing, dependency.fromTaskId).push(dependency);
		getRequiredArray(incoming, dependency.toTaskId).push(dependency);
		indegree.set(dependency.toTaskId, getRequiredNumber(indegree, dependency.toTaskId) + 1);
	}
	const queue = tasks
		.filter((task) => getRequiredNumber(indegree, task.id) === 0)
		.map((task) => task.id);
	const topologicalTaskIds: string[] = [];
	let queueIndex = 0;
	while (queueIndex < queue.length) {
		const taskId = queue[queueIndex];
		queueIndex += 1;
		topologicalTaskIds.push(taskId);
		for (const dependency of getRequiredArray(outgoing, taskId)) {
			const nextIndegree = getRequiredNumber(indegree, dependency.toTaskId) - 1;
			indegree.set(dependency.toTaskId, nextIndegree);
			if (nextIndegree === 0) queue.push(dependency.toTaskId);
		}
	}
	if (topologicalTaskIds.length !== tasks.length) {
		const cyclicTaskIds = tasks
			.filter((task) => getRequiredNumber(indegree, task.id) > 0)
			.map((task) => task.id);
		throw new GanttChartError('dependency-cycle', 'Dependency graph contains a cycle.', {
			taskIds: cyclicTaskIds
		});
	}
	return {
		incomingDependencies: incoming,
		outgoingDependencies: outgoing,
		topologicalTaskIds
	};
}

function getRequiredArray<T>(map: ReadonlyMap<string, T[]>, key: string): T[] {
	const value = map.get(key);
	if (value) return value;
	throw new GanttChartError('invalid-operation', `Internal dependency index lost ${key}.`, { key });
}

function getRequiredNumber(map: ReadonlyMap<string, number>, key: string): number {
	const value = map.get(key);
	if (value !== undefined) return value;
	throw new GanttChartError('invalid-operation', `Internal dependency index lost ${key}.`, { key });
}
