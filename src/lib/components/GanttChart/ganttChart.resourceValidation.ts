import { GanttChartError } from './ganttChart.error.js';
import { assertGanttIdentifier, assertGanttRecord } from './ganttChart.validationBoundary.js';
import type {
	GanttAssignment,
	GanttCalendar,
	GanttResource,
	GanttTask
} from './ganttChart.types.js';

export function validateGanttResources<TResourceFields extends object>(
	resources: readonly GanttResource<TResourceFields>[]
): ReadonlyMap<string, GanttResource<TResourceFields>> {
	const resourcesById = new Map<string, GanttResource<TResourceFields>>();
	for (const resource of resources) {
		assertGanttRecord(resource, 'Every resource must be an object.', 'duplicate-resource-id');
		assertGanttIdentifier(resource.id, 'resource');
		if (resourcesById.has(resource.id)) {
			throw new GanttChartError('duplicate-resource-id', `Duplicate resource id: ${resource.id}.`, {
				id: resource.id
			});
		}
		if (typeof resource.title !== 'string') {
			throw new GanttChartError('duplicate-resource-id', `Resource ${resource.id} needs a title.`, {
				id: resource.id
			});
		}
		if (
			resource.capacity !== undefined &&
			(!Number.isFinite(resource.capacity) || resource.capacity < 0)
		) {
			throw new GanttChartError(
				'invalid-resource-capacity',
				`Resource ${resource.id} capacity must be non-negative.`,
				{ id: resource.id, capacity: resource.capacity }
			);
		}
		resourcesById.set(resource.id, resource);
	}
	return resourcesById;
}

export function validateGanttAssignments<
	TTaskFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	assignments: readonly GanttAssignment<TAssignmentFields>[],
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>,
	resourcesById: ReadonlyMap<string, GanttResource<TResourceFields>>
): ReadonlyMap<string, GanttAssignment<TAssignmentFields>> {
	const assignmentsById = new Map<string, GanttAssignment<TAssignmentFields>>();
	for (const assignment of assignments) {
		assertGanttRecord(assignment, 'Every assignment must be an object.', 'duplicate-assignment-id');
		assertGanttIdentifier(assignment.id, 'assignment');
		if (assignmentsById.has(assignment.id)) {
			throw new GanttChartError(
				'duplicate-assignment-id',
				`Duplicate assignment id: ${assignment.id}.`,
				{ id: assignment.id }
			);
		}
		if (!tasksById.has(assignment.taskId)) {
			throw new GanttChartError(
				'missing-assignment-task',
				`Assignment ${assignment.id} references missing task ${assignment.taskId}.`,
				{ id: assignment.id, taskId: assignment.taskId }
			);
		}
		if (!resourcesById.has(assignment.resourceId)) {
			throw new GanttChartError(
				'missing-assignment-resource',
				`Assignment ${assignment.id} references missing resource ${assignment.resourceId}.`,
				{ id: assignment.id, resourceId: assignment.resourceId }
			);
		}
		if (!Number.isFinite(assignment.units) || assignment.units < 0 || assignment.units > 1) {
			throw new GanttChartError(
				'invalid-assignment-units',
				`Assignment ${assignment.id} units must be from 0 through 1.`,
				{ id: assignment.id, units: assignment.units }
			);
		}
		assignmentsById.set(assignment.id, assignment);
	}
	return assignmentsById;
}

export function validateGanttResourceCalendarReferences<TResourceFields extends object>(
	resources: readonly GanttResource<TResourceFields>[],
	calendarsById: ReadonlyMap<string, GanttCalendar>
): void {
	for (const resource of resources) {
		if (resource.calendarId === undefined || calendarsById.has(resource.calendarId)) continue;
		throw new GanttChartError(
			'missing-calendar',
			`Resource ${resource.id} references missing calendar.`,
			{ resourceId: resource.id, calendarId: resource.calendarId }
		);
	}
}
