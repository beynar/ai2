import type { FlatHierarchy } from '$lib/scheduling/flatHierarchy.js';
import { GanttChartError } from './ganttChart.error.js';
import type { GanttResourceView } from './ganttChart.props.js';
import type { GanttResource, GanttWorkloadBucket } from './ganttChart.types.js';

const DEFAULT_WORKLOAD_HEIGHT = 176;
const MINIMUM_WORKLOAD_HEIGHT = 72;

export type GanttResolvedResourceView<TResourceFields extends object> = Readonly<{
	filterResourceIds: readonly string[];
	resourceIds: ReadonlySet<string>;
	resources: readonly GanttResource<TResourceFields>[];
	depthByResourceId: ReadonlyMap<string, number>;
	orderByResourceId: ReadonlyMap<string, number>;
	isFiltered: boolean;
	groupByResource: boolean;
	workloadHeight: number;
}>;

export function resolveGanttResourceView<TResourceFields extends object>(
	input: GanttResourceView | undefined,
	resources: readonly GanttResource<TResourceFields>[],
	hierarchy: FlatHierarchy
): GanttResolvedResourceView<TResourceFields> {
	const filterResourceIds = input?.filterResourceIds ?? [];
	if (
		!Array.isArray(filterResourceIds) ||
		filterResourceIds.some(
			(resourceId) => typeof resourceId !== 'string' || resourceId.length === 0
		) ||
		new Set(filterResourceIds).size !== filterResourceIds.length
	) {
		throw new GanttChartError(
			'invalid-prop',
			'resourceView.filterResourceIds must be an ordered array of unique non-empty resource IDs.'
		);
	}
	if (input?.groupByResource !== undefined && typeof input.groupByResource !== 'boolean') {
		throw new GanttChartError('invalid-prop', 'resourceView.groupByResource must be a boolean.');
	}
	const workloadHeight = input?.workloadHeight ?? DEFAULT_WORKLOAD_HEIGHT;
	if (!Number.isFinite(workloadHeight) || workloadHeight < MINIMUM_WORKLOAD_HEIGHT) {
		throw new GanttChartError(
			'invalid-prop',
			`resourceView.workloadHeight must be at least ${MINIMUM_WORKLOAD_HEIGHT} pixels.`,
			{ workloadHeight }
		);
	}

	const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
	for (const resourceId of filterResourceIds) {
		if (resourcesById.has(resourceId)) continue;
		throw new GanttChartError(
			'invalid-prop',
			`resourceView.filterResourceIds references unknown resource ${resourceId}.`,
			{ resourceId }
		);
	}

	const resourceIds = resolveResourceScope(filterResourceIds, hierarchy);
	const groupByResource = input?.groupByResource ?? false;
	const orderedResources = (groupByResource ? hierarchy.nodes : resources)
		.filter((entry) => resourceIds.has(entry.id))
		.map((entry) => resourcesById.get(entry.id))
		.filter((resource): resource is GanttResource<TResourceFields> => resource !== undefined);
	const depthByResourceId = new Map(
		hierarchy.nodes.map((node) => [node.id, groupByResource ? node.depth : 0])
	);
	const orderByResourceId = new Map(
		orderedResources.map((resource, index) => [resource.id, index])
	);

	return {
		filterResourceIds: [...filterResourceIds],
		resourceIds,
		resources: orderedResources,
		depthByResourceId,
		orderByResourceId,
		isFiltered: filterResourceIds.length > 0,
		groupByResource,
		workloadHeight
	};
}

export function indexGanttOverAllocations(
	buckets: readonly GanttWorkloadBucket[]
): ReadonlyMap<string, ReadonlySet<string>> {
	const resourceIdsByTaskId = new Map<string, Set<string>>();
	for (const bucket of buckets) {
		if (!bucket.isOverAllocated) continue;
		for (const taskId of bucket.taskIds) {
			const resourceIds = resourceIdsByTaskId.get(taskId) ?? new Set<string>();
			resourceIds.add(bucket.resourceId);
			resourceIdsByTaskId.set(taskId, resourceIds);
		}
	}
	return resourceIdsByTaskId;
}

function resolveResourceScope(
	filterResourceIds: readonly string[],
	hierarchy: FlatHierarchy
): ReadonlySet<string> {
	if (filterResourceIds.length === 0) return new Set(hierarchy.nodes.map((node) => node.id));
	const selectedIds = new Set(filterResourceIds);
	const scopedIds = new Set<string>();
	for (const node of hierarchy.nodes) {
		let current: typeof node | undefined = node;
		while (current) {
			if (selectedIds.has(current.id)) {
				scopedIds.add(node.id);
				break;
			}
			current = current.parentId ? hierarchy.nodesById.get(current.parentId) : undefined;
		}
	}
	return scopedIds;
}
