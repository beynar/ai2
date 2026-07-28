import type {
	GanttAssignment,
	GanttDependency,
	GanttSelection,
	GanttTask
} from './ganttChart.types.js';

export function cloneGanttTask<TTaskFields extends object>(
	task: GanttTask<TTaskFields>
): GanttTask<TTaskFields> {
	const schedule =
		task.start && task.end
			? { start: new Date(task.start), end: new Date(task.end) }
			: { start: undefined, end: undefined };
	const ownedCopies = {
		...schedule,
		resourceIds: task.resourceIds ? [...task.resourceIds] : undefined,
		baseline: task.baseline
			? { start: new Date(task.baseline.start), end: new Date(task.baseline.end) }
			: undefined,
		deadline: task.deadline ? new Date(task.deadline) : undefined,
		constraint:
			task.constraint?.type === 'as-soon-as-possible'
				? { type: 'as-soon-as-possible' as const }
				: task.constraint
					? { type: task.constraint.type, date: new Date(task.constraint.date) }
					: undefined,
		segments: task.segments?.map((segment) => ({
			start: new Date(segment.start),
			end: new Date(segment.end)
		}))
	};
	// The discriminated schedule remains identical; Object.assign preserves consumer fields.
	return Object.assign({}, task, ownedCopies) as GanttTask<TTaskFields>;
}

export function cloneGanttDependency<TDependencyFields extends object>(
	dependency: GanttDependency<TDependencyFields>
): GanttDependency<TDependencyFields> {
	return {
		...dependency,
		lag: dependency.lag ? { ...dependency.lag } : undefined
	};
}

export function cloneGanttAssignment<TAssignmentFields extends object>(
	assignment: GanttAssignment<TAssignmentFields>
): GanttAssignment<TAssignmentFields> {
	return { ...assignment };
}

export function cloneGanttSelection(selection: GanttSelection): GanttSelection {
	if (selection.kind !== 'cell') return { ...selection };
	return { ...selection, cell: { ...selection.cell } };
}
