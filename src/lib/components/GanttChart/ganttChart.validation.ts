import { assertIanaTimeZone } from '$lib/scheduling/zonedTime.js';
import type { FlatHierarchy } from '$lib/scheduling/flatHierarchy.js';
import {
	resolveGanttProjectCalendar,
	validateGanttCalendars
} from './ganttChart.calendarValidation.js';
import { validateGanttDependencies } from './ganttChart.dependencyValidation.js';
import { GanttChartError } from './ganttChart.error.js';
import {
	validateGanttAssignments,
	validateGanttResourceCalendarReferences,
	validateGanttResources
} from './ganttChart.resourceValidation.js';
import { validateGanttTaskReferences, validateGanttTasks } from './ganttChart.taskValidation.js';
import { assertGanttCollection, buildGanttHierarchy } from './ganttChart.validationBoundary.js';
import type {
	GanttAssignment,
	GanttCalendar,
	GanttDependency,
	GanttResource,
	GanttTask
} from './ganttChart.types.js';

export type ValidatedGanttModel<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	calendars: readonly GanttCalendar[];
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>;
	dependenciesById: ReadonlyMap<string, GanttDependency<TDependencyFields>>;
	resourcesById: ReadonlyMap<string, GanttResource<TResourceFields>>;
	assignmentsById: ReadonlyMap<string, GanttAssignment<TAssignmentFields>>;
	calendarsById: ReadonlyMap<string, GanttCalendar>;
	taskHierarchy: FlatHierarchy;
	resourceHierarchy: FlatHierarchy;
	projectCalendar: GanttCalendar;
	incomingDependencies: ReadonlyMap<string, readonly GanttDependency<TDependencyFields>[]>;
	outgoingDependencies: ReadonlyMap<string, readonly GanttDependency<TDependencyFields>[]>;
	topologicalTaskIds: readonly string[];
}>;

export type ValidateGanttModelOptions<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	calendars: readonly GanttCalendar[];
	projectCalendarId?: string;
	timeZone: string;
}>;

export function validateGanttModel<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	options: ValidateGanttModelOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>
): ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	assertGanttCollection(options.tasks, 'tasks');
	assertGanttCollection(options.dependencies, 'dependencies');
	assertGanttCollection(options.resources, 'resources');
	assertGanttCollection(options.assignments, 'assignments');
	assertGanttCollection(options.calendars, 'calendars');
	validateDisplayTimeZone(options.timeZone);

	const tasksById = validateGanttTasks(options.tasks);
	const taskHierarchy = buildGanttHierarchy(options.tasks, 'task');
	const calendarsById = validateGanttCalendars(options.calendars);
	const projectCalendar = resolveGanttProjectCalendar(
		options.calendars,
		calendarsById,
		options.projectCalendarId,
		options.timeZone
	);
	const resourcesById = validateGanttResources(options.resources);
	const resourceHierarchy = buildGanttHierarchy(options.resources, 'resource');
	validateGanttTaskReferences(options.tasks, resourcesById, calendarsById);
	validateGanttResourceCalendarReferences(options.resources, calendarsById);
	const dependencyDag = validateGanttDependencies(options.tasks, options.dependencies, tasksById);
	const assignmentsById = validateGanttAssignments(options.assignments, tasksById, resourcesById);

	return {
		...options,
		tasksById,
		resourcesById,
		assignmentsById,
		calendarsById,
		taskHierarchy,
		resourceHierarchy,
		projectCalendar,
		...dependencyDag
	};
}

function validateDisplayTimeZone(timeZone: string): void {
	try {
		assertIanaTimeZone(timeZone);
	} catch (error) {
		throw new GanttChartError(
			'invalid-time-zone',
			'timeZone must be a supported IANA name or UTC.',
			{
				timeZone,
				cause: error instanceof Error ? error.message : String(error)
			}
		);
	}
}
