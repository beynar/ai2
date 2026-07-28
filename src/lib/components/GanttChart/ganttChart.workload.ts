import {
	addCivilDateDays,
	formatCivilDate,
	parseCivilDate,
	type CivilDateOnly
} from '$lib/scheduling/civilDate.js';
import { assertScheduleRange, intersectScheduleRanges } from '$lib/scheduling/scheduleRange.js';
import { resolveZonedMinuteOnDay } from '$lib/scheduling/zonedTime.js';
import {
	getCalendarCivilDay,
	getCalendarWorkingIntervals,
	getResourceCalendar,
	getTaskCalendar
} from './ganttChart.calendar.js';
import type { ValidatedGanttModel } from './ganttChart.validation.js';
import type {
	GanttAssignment,
	GanttRange,
	GanttResolvedTaskNode,
	GanttWorkloadBucket
} from './ganttChart.types.js';

type WorkloadEvent = Readonly<{
	time: number;
	delta: number;
	taskId: string;
	kind: 'start' | 'end';
}>;

const CAPACITY_EPSILON = 1e-9;

export function calculateGanttWorkload<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	model: ValidatedGanttModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[],
	range: GanttRange
): readonly GanttWorkloadBucket[] {
	assertScheduleRange(range, 'workloadRange');
	if (range.end.getTime() === range.start.getTime()) return [];
	const resolvedById = new Map(resolvedTasks.map((node) => [node.taskId, node]));
	const assignmentsByResource = new Map<string, GanttAssignmentList<TAssignmentFields>>();
	for (const resource of model.resources) {
		assignmentsByResource.set(resource.id, []);
	}
	for (const assignment of model.assignments) {
		assignmentsByResource.get(assignment.resourceId)?.push(assignment);
	}

	const buckets: GanttWorkloadBucket[] = [];
	for (const resource of model.resources) {
		const resourceCalendar = getResourceCalendar(model, resource);
		const assignments = assignmentsByResource.get(resource.id) ?? [];
		let day = getCalendarCivilDay(range.start, resourceCalendar);
		const finalDay = getCalendarCivilDay(range.end, resourceCalendar);
		while (day <= finalDay) {
			const dayStart = resolveZonedMinuteOnDay(day, 0, resourceCalendar.calendar.timeZone);
			const dayEnd = resolveZonedMinuteOnDay(day, 1440, resourceCalendar.calendar.timeZone);
			const bucketRange = intersectScheduleRanges(range, { start: dayStart, end: dayEnd });
			if (bucketRange.start.getTime() < bucketRange.end.getTime()) {
				const events: WorkloadEvent[] = [];
				const resourceIntervals = getCalendarWorkingIntervals(bucketRange, resourceCalendar);
				for (const assignment of assignments) {
					const node = resolvedById.get(assignment.taskId);
					if (!node?.resolvedStart || !node.resolvedEnd || node.type === 'milestone') continue;
					const taskCalendar = getTaskCalendar(model, node.task);
					const taskIntervals = getTaskActiveIntervals(node, bucketRange);
					const taskWorkingIntervals = getCalendarWorkingIntervals(bucketRange, taskCalendar);
					for (const activeInterval of taskIntervals) {
						for (const taskWorkingInterval of taskWorkingIntervals) {
							const taskIntersection = intersectScheduleRanges(activeInterval, taskWorkingInterval);
							if (taskIntersection.start.getTime() >= taskIntersection.end.getTime()) continue;
							for (const resourceInterval of resourceIntervals) {
								const intersection = intersectScheduleRanges(taskIntersection, resourceInterval);
								if (intersection.start.getTime() >= intersection.end.getTime()) continue;
								events.push(
									{
										time: intersection.start.getTime(),
										delta: assignment.units,
										taskId: assignment.taskId,
										kind: 'start'
									},
									{
										time: intersection.end.getTime(),
										delta: -assignment.units,
										taskId: assignment.taskId,
										kind: 'end'
									}
								);
							}
						}
					}
				}
				const workload = sweepWorkload(events);
				const capacity = resource.capacity ?? 1;
				buckets.push({
					resourceId: resource.id,
					...bucketRange,
					assignedUnits: workload.peakUnits,
					capacity,
					isOverAllocated: workload.peakUnits - capacity > CAPACITY_EPSILON,
					taskIds: workload.taskIds
				});
			}
			if (day === finalDay) break;
			day = addDay(day, 1);
		}
	}
	return buckets;
}

function getTaskActiveIntervals<TTaskFields extends object>(
	node: GanttResolvedTaskNode<TTaskFields>,
	boundary: GanttRange
): readonly GanttRange[] {
	const definitions =
		node.task.segments ??
		(node.resolvedStart && node.resolvedEnd
			? [{ start: node.resolvedStart, end: node.resolvedEnd }]
			: []);
	return definitions
		.map((interval) => intersectScheduleRanges(interval, boundary))
		.filter((interval) => interval.start.getTime() < interval.end.getTime());
}

function sweepWorkload(
	events: readonly WorkloadEvent[]
): Readonly<{ peakUnits: number; taskIds: readonly string[] }> {
	const sorted = [...events].sort(
		(left, right) =>
			left.time - right.time ||
			(left.kind === right.kind ? 0 : left.kind === 'end' ? -1 : 1) ||
			left.taskId.localeCompare(right.taskId)
	);
	const taskIds = new Set<string>();
	let currentUnits = 0;
	let peakUnits = 0;
	for (const event of sorted) {
		currentUnits += event.delta;
		if (event.kind === 'start') taskIds.add(event.taskId);
		peakUnits = Math.max(peakUnits, currentUnits);
	}
	return { peakUnits, taskIds: [...taskIds] };
}

function addDay(day: CivilDateOnly, amount: number): CivilDateOnly {
	return formatCivilDate(addCivilDateDays(parseCivilDate(day), amount));
}

type GanttAssignmentList<TAssignmentFields extends object> = GanttAssignment<TAssignmentFields>[];
