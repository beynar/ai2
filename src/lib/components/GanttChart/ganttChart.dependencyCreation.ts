import { GanttChartError } from './ganttChart.error.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type {
	GanttDependency,
	GanttDependencyCreationRequest,
	GanttDependencyEndpoint
} from './ganttChart.types.js';

export function getGanttDependencyType(
	fromEndpoint: GanttDependencyEndpoint,
	toEndpoint: GanttDependencyEndpoint
): GanttDependency['type'] {
	if (fromEndpoint === 'end') {
		return toEndpoint === 'start' ? 'finish-start' : 'finish-finish';
	}
	return toEndpoint === 'start' ? 'start-start' : 'start-finish';
}

export function validateGanttDependencyCreation<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	request: GanttDependencyCreationRequest
): void {
	const fromTask = model.tasksById.get(request.fromTaskId);
	const toTask = model.tasksById.get(request.toTaskId);
	if (!fromTask || !toTask) {
		throw new GanttChartError(
			'missing-dependency-task',
			'The dependency target no longer exists.',
			{ fromTaskId: request.fromTaskId, toTaskId: request.toTaskId }
		);
	}
	if (request.fromTaskId === request.toTaskId) {
		throw new GanttChartError('dependency-self-link', 'A task cannot depend on itself.', {
			taskId: request.fromTaskId
		});
	}
	const isDuplicate = model.dependencies.some(
		(dependency) =>
			dependency.fromTaskId === request.fromTaskId &&
			dependency.toTaskId === request.toTaskId &&
			dependency.type === request.type
	);
	if (isDuplicate) {
		throw new GanttChartError('duplicate-dependency', 'This semantic dependency already exists.', {
			fromTaskId: request.fromTaskId,
			toTaskId: request.toTaskId,
			type: request.type
		});
	}
	if (!hasDependencyPath(model.outgoingDependencies, request.toTaskId, request.fromTaskId)) return;
	throw new GanttChartError('dependency-cycle', 'This dependency would create a graph cycle.', {
		fromTaskId: request.fromTaskId,
		toTaskId: request.toTaskId
	});
}

export function assertCreatedGanttDependency<TDependencyFields extends object>(
	request: GanttDependencyCreationRequest,
	dependency: GanttDependency<TDependencyFields>
): void {
	if (!dependency || typeof dependency !== 'object' || Array.isArray(dependency)) {
		throw new GanttChartError(
			'invalid-adjustment',
			'createDependency must return a dependency object.'
		);
	}
	if (
		dependency.fromTaskId === request.fromTaskId &&
		dependency.toTaskId === request.toTaskId &&
		dependency.type === request.type
	) {
		return;
	}
	throw new GanttChartError(
		'invalid-adjustment',
		'createDependency must preserve the gesture-owned endpoints and dependency type.',
		{
			fromTaskId: request.fromTaskId,
			toTaskId: request.toTaskId,
			type: request.type
		}
	);
}

function hasDependencyPath<TDependencyFields extends object>(
	outgoingDependencies: ReadonlyMap<string, readonly GanttDependency<TDependencyFields>[]>,
	fromTaskId: string,
	toTaskId: string
): boolean {
	const pendingTaskIds = [fromTaskId];
	const visitedTaskIds = new Set<string>();
	while (pendingTaskIds.length > 0) {
		const taskId = pendingTaskIds.pop();
		if (!taskId || visitedTaskIds.has(taskId)) continue;
		if (taskId === toTaskId) return true;
		visitedTaskIds.add(taskId);
		for (const dependency of outgoingDependencies.get(taskId) ?? []) {
			pendingTaskIds.push(dependency.toTaskId);
		}
	}
	return false;
}
