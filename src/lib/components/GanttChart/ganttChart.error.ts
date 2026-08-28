export type GanttChartErrorCode =
	| 'invalid-prop'
	| 'invalid-date'
	| 'invalid-range'
	| 'invalid-time-zone'
	| 'duplicate-task-id'
	| 'missing-task-parent'
	| 'task-hierarchy-cycle'
	| 'invalid-task-schedule'
	| 'invalid-summary-schedule'
	| 'invalid-milestone'
	| 'invalid-progress'
	| 'invalid-baseline'
	| 'invalid-segments'
	| 'invalid-constraint'
	| 'duplicate-dependency-id'
	| 'missing-dependency-task'
	| 'dependency-self-link'
	| 'duplicate-dependency'
	| 'dependency-cycle'
	| 'duplicate-resource-id'
	| 'missing-resource-parent'
	| 'resource-hierarchy-cycle'
	| 'invalid-resource-capacity'
	| 'duplicate-assignment-id'
	| 'missing-assignment-task'
	| 'missing-assignment-resource'
	| 'invalid-assignment-units'
	| 'duplicate-calendar-id'
	| 'missing-calendar'
	| 'invalid-calendar'
	| 'invalid-project-calendar'
	| 'invalid-zoom-level'
	| 'invalid-column'
	| 'invalid-selection'
	| 'invalid-adjustment'
	| 'invalid-operation'
	| 'read-only'
	| 'disabled'
	| 'rejected'
	| 'schedule-conflict'
	| 'constraint-violation'
	| 'clipboard-invalid'
	| 'stale-transaction'
	| 'revert-used';

/** A validation, scheduling, or controlled-state error owned by GanttChart. */
export class GanttChartError extends Error {
	readonly name = 'GanttChartError';

	constructor(
		readonly code: GanttChartErrorCode,
		message: string,
		readonly details?: Readonly<Record<string, unknown>>
	) {
		super(message);
	}
}
