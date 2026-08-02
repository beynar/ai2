import { calculateGanttCriticalPath } from './ganttChart.criticalPath.js';
import { autoScheduleGanttTasks } from './ganttChart.dependencies.js';
import { resolveGanttHierarchy } from './ganttChart.hierarchy.js';
import { validateGanttModel, type ValidatedGanttModel } from './ganttChart.validation.js';
import { calculateGanttWorkload } from './ganttChart.workload.js';
import type {
	GanttAssignment,
	GanttCalendar,
	GanttConstraintViolation,
	GanttDependency,
	GanttResolvedTaskNode,
	GanttResource,
	GanttScheduleAnalysis,
	GanttTask,
	GanttWorkloadBucket
} from './ganttChart.types.js';

export type ResolveGanttScheduleOptions<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies?: readonly GanttDependency<TDependencyFields>[];
	resources?: readonly GanttResource<TResourceFields>[];
	assignments?: readonly GanttAssignment<TAssignmentFields>[];
	calendars?: readonly GanttCalendar[];
	projectCalendarId?: string;
	timeZone: string;
	expandedTaskIds?: readonly string[];
	autoSchedule?: boolean;
	schedulingViolations?: readonly GanttConstraintViolation[];
}>;

export type ResolvedGanttSchedule<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	resolvedTasksById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>;
	visibleTasks: readonly GanttResolvedTaskNode<TTaskFields>[];
	analysis: GanttScheduleAnalysis<TTaskFields, TDependencyFields>;
	workload: readonly GanttWorkloadBucket[];
	autoScheduledTaskIds: readonly string[];
}>;

export function resolveGanttSchedule<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
>(
	options: ResolveGanttScheduleOptions<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>
): ResolvedGanttSchedule<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	const { schedulingViolations: initialSchedulingViolations = [], ...modelOptions } = options;
	const dependencies = options.dependencies ?? [];
	const resources = options.resources ?? [];
	const assignments = options.assignments ?? [];
	const calendars = options.calendars ?? [];
	const expandedTaskIds =
		options.expandedTaskIds ??
		options.tasks.flatMap((task) => (task.type === 'summary' ? [task.id] : []));
	let model = validateGanttModel({
		...modelOptions,
		dependencies,
		resources,
		assignments,
		calendars
	});
	let resolvedTasks = resolveGanttHierarchy({ model, expandedTaskIds });
	let autoScheduledTaskIds: readonly string[] = [];
	let schedulingViolations = initialSchedulingViolations;

	if (options.autoSchedule) {
		const scheduled = autoScheduleGanttTasks(model, resolvedTasks);
		autoScheduledTaskIds = scheduled.changedTaskIds;
		schedulingViolations = [...schedulingViolations, ...scheduled.violations];
		if (scheduled.changedTaskIds.length > 0) {
			model = validateGanttModel({
				...modelOptions,
				tasks: scheduled.tasks,
				dependencies,
				resources,
				assignments,
				calendars
			});
			resolvedTasks = resolveGanttHierarchy({ model, expandedTaskIds });
		}
	}

	const analysis = calculateGanttCriticalPath(model, resolvedTasks, schedulingViolations);
	const resolvedTasksById = new Map(analysis.tasks.map((task) => [task.taskId, task]));
	const workload = analysis.projectRange
		? calculateGanttWorkload(model, resolvedTasksById, analysis.projectRange)
		: [];
	return {
		model,
		resolvedTasksById,
		visibleTasks: analysis.tasks.filter((node) => node.isVisible),
		analysis,
		workload,
		autoScheduledTaskIds
	};
}
