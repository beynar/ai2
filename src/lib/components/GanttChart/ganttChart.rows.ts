import { getGanttColumnValue } from './ganttChart.columns.js';
import type { GanttResolvedResourceView } from './ganttChart.resourceView.js';
import type {
	GanttAssignment,
	GanttColumnDefinition,
	GanttColumnEditContext,
	GanttDependency,
	GanttResolvedTaskNode,
	GanttResource
} from './ganttChart.types.js';

export type GanttRowModel<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	rows: readonly GanttResolvedTaskNode<TTaskFields>[];
	visibleColumns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[];
	resourceGroupByTaskId: ReadonlyMap<string, GanttResource<TResourceFields>>;
	resourceGroupStartTaskIds: ReadonlySet<string>;
	isFiltered: boolean;
	isSorted: boolean;
	isGrouped: boolean;
}>;

export type GanttVirtualRow = Readonly<{
	key: string | number | bigint;
	index: number;
	start: number;
	end: number;
	size: number;
}>;

export function resolveGanttRows<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(options: {
	readonly nodes: readonly GanttResolvedTaskNode<TTaskFields>[];
	readonly columns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[];
	readonly dependencies: readonly GanttDependency<TDependencyFields>[];
	readonly resources: readonly GanttResource<TResourceFields>[];
	readonly assignments: readonly GanttAssignment<TAssignmentFields>[];
	readonly resourceView: GanttResolvedResourceView<TResourceFields>;
}): GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	const visibleColumns = options.columns.filter((column) => column.visible !== false);
	const filterColumns = visibleColumns.filter((column) => column.filter);
	const sortColumns = visibleColumns.filter(
		(column) => column.sortable !== false && column.sortDirection
	);
	const childrenByParent = new Map<string | null, GanttResolvedTaskNode<TTaskFields>[]>();
	const orderById = new Map<string, number>();
	for (const [index, node] of options.nodes.entries()) {
		orderById.set(node.taskId, index);
		const siblings = childrenByParent.get(node.parentId) ?? [];
		siblings.push(node);
		childrenByParent.set(node.parentId, siblings);
	}
	const resourceIdsByTaskId = indexTaskResourceIds(options.nodes, options.assignments);
	const resourceGroupIdByTaskId = new Map(
		options.nodes.map((node) => [
			node.taskId,
			resolveTaskResourceGroup(resourceIdsByTaskId.get(node.taskId), options.resourceView)
		])
	);
	const includedIds = resolveIncludedIds(options, filterColumns, resourceIdsByTaskId);
	const rows: GanttResolvedTaskNode<TTaskFields>[] = [];
	const getOrderedChildren = (
		parentId: string | null
	): readonly GanttResolvedTaskNode<TTaskFields>[] => {
		const children = childrenByParent.get(parentId) ?? [];
		if (sortColumns.length > 0 || options.resourceView.groupByResource) {
			children.sort((left, right) =>
				compareRows(left, right, sortColumns, options, orderById, resourceGroupIdByTaskId)
			);
		}
		return children;
	};
	const stack = [...getOrderedChildren(null)].reverse();
	while (stack.length > 0) {
		const node = stack.pop();
		if (!node || !includedIds.has(node.taskId)) continue;
		rows.push(node);
		if (filterColumns.length === 0 && !options.resourceView.isFiltered && !node.isExpanded) {
			continue;
		}
		const children = getOrderedChildren(node.taskId);
		for (let index = children.length - 1; index >= 0; index -= 1) {
			stack.push(children[index]);
		}
	}

	const resolvedRows = rows.map((node, visibleIndex) => ({
		...node,
		isVisible: true,
		visibleIndex
	}));
	const resourcesById = new Map(options.resources.map((resource) => [resource.id, resource]));
	const resourceGroupByTaskId = new Map<string, GanttResource<TResourceFields>>();
	for (const [taskId, resourceId] of resourceGroupIdByTaskId) {
		const resource = resourceId ? resourcesById.get(resourceId) : undefined;
		if (resource) resourceGroupByTaskId.set(taskId, resource);
	}
	const resourceGroupStartTaskIds = options.resourceView.groupByResource
		? resolveResourceGroupStarts(resolvedRows, resourceGroupIdByTaskId)
		: new Set<string>();

	return {
		rows: resolvedRows,
		visibleColumns,
		resourceGroupByTaskId,
		resourceGroupStartTaskIds,
		isFiltered: filterColumns.length > 0 || options.resourceView.isFiltered,
		isSorted: sortColumns.length > 0,
		isGrouped: options.resourceView.groupByResource
	};
}

function resolveIncludedIds<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	options: {
		readonly nodes: readonly GanttResolvedTaskNode<TTaskFields>[];
		readonly dependencies: readonly GanttDependency<TDependencyFields>[];
		readonly resources: readonly GanttResource<TResourceFields>[];
		readonly assignments: readonly GanttAssignment<TAssignmentFields>[];
		readonly resourceView: GanttResolvedResourceView<TResourceFields>;
	},
	filterColumns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[],
	resourceIdsByTaskId: ReadonlyMap<string, ReadonlySet<string>>
): ReadonlySet<string> {
	if (filterColumns.length === 0 && !options.resourceView.isFiltered) {
		return new Set(options.nodes.map((node) => node.taskId));
	}
	const includedIds = new Set<string>();
	for (const node of options.nodes) {
		if (
			options.resourceView.isFiltered &&
			!hasScopedResource(resourceIdsByTaskId.get(node.taskId), options.resourceView.resourceIds)
		) {
			continue;
		}
		const context = createColumnContext(node, options);
		if (!filterColumns.every((column) => column.filter?.(context) ?? true)) continue;
		includedIds.add(node.taskId);
	}
	for (let index = options.nodes.length - 1; index >= 0; index -= 1) {
		const node = options.nodes[index];
		if (includedIds.has(node.taskId) && node.parentId) includedIds.add(node.parentId);
	}
	return includedIds;
}

function compareRows<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	left: GanttResolvedTaskNode<TTaskFields>,
	right: GanttResolvedTaskNode<TTaskFields>,
	columns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[],
	options: {
		readonly nodes: readonly GanttResolvedTaskNode<TTaskFields>[];
		readonly dependencies: readonly GanttDependency<TDependencyFields>[];
		readonly resources: readonly GanttResource<TResourceFields>[];
		readonly assignments: readonly GanttAssignment<TAssignmentFields>[];
		readonly resourceView: GanttResolvedResourceView<TResourceFields>;
	},
	orderById: ReadonlyMap<string, number>,
	resourceGroupIdByTaskId: ReadonlyMap<string, string | null>
): number {
	if (options.resourceView.groupByResource) {
		const leftGroupId = resourceGroupIdByTaskId.get(left.taskId) ?? null;
		const rightGroupId = resourceGroupIdByTaskId.get(right.taskId) ?? null;
		const leftGroupOrder = leftGroupId
			? (options.resourceView.orderByResourceId.get(leftGroupId) ?? Number.MAX_SAFE_INTEGER)
			: Number.MAX_SAFE_INTEGER;
		const rightGroupOrder = rightGroupId
			? (options.resourceView.orderByResourceId.get(rightGroupId) ?? Number.MAX_SAFE_INTEGER)
			: Number.MAX_SAFE_INTEGER;
		if (leftGroupOrder !== rightGroupOrder) return leftGroupOrder - rightGroupOrder;
	}
	for (const column of columns) {
		const comparison = column.compare
			? column.compare(left, right)
			: compareValues(
					getGanttColumnValue(column, createColumnContext(left, options)),
					getGanttColumnValue(column, createColumnContext(right, options))
				);
		if (comparison === 0) continue;
		return column.sortDirection === 'descending' ? -comparison : comparison;
	}
	return (orderById.get(left.taskId) ?? 0) - (orderById.get(right.taskId) ?? 0);
}

function hasScopedResource(
	resourceIds: ReadonlySet<string> | undefined,
	scopedResourceIds: ReadonlySet<string>
): boolean {
	if (!resourceIds) return false;
	for (const resourceId of resourceIds) {
		if (scopedResourceIds.has(resourceId)) return true;
	}
	return false;
}

function indexTaskResourceIds<TTaskFields extends object, TAssignmentFields extends object>(
	nodes: readonly GanttResolvedTaskNode<TTaskFields>[],
	assignments: readonly GanttAssignment<TAssignmentFields>[]
): ReadonlyMap<string, ReadonlySet<string>> {
	const resourceIdsByTaskId = new Map<string, Set<string>>();
	for (const node of nodes) {
		resourceIdsByTaskId.set(node.taskId, new Set(node.task.resourceIds ?? []));
	}
	for (const assignment of assignments) {
		resourceIdsByTaskId.get(assignment.taskId)?.add(assignment.resourceId);
	}
	for (let index = nodes.length - 1; index >= 0; index -= 1) {
		const node = nodes[index];
		if (!node.parentId) continue;
		const parentResourceIds = resourceIdsByTaskId.get(node.parentId);
		const resourceIds = resourceIdsByTaskId.get(node.taskId);
		if (!parentResourceIds || !resourceIds) continue;
		for (const resourceId of resourceIds) parentResourceIds.add(resourceId);
	}
	return resourceIdsByTaskId;
}

function resolveTaskResourceGroup<TResourceFields extends object>(
	resourceIds: ReadonlySet<string> | undefined,
	resourceView: GanttResolvedResourceView<TResourceFields>
): string | null {
	if (!resourceIds || resourceIds.size === 0) return null;
	for (const resource of resourceView.resources) {
		if (resourceIds.has(resource.id)) return resource.id;
	}
	return null;
}

function resolveResourceGroupStarts<TTaskFields extends object>(
	rows: readonly GanttResolvedTaskNode<TTaskFields>[],
	resourceGroupIdByTaskId: ReadonlyMap<string, string | null>
): ReadonlySet<string> {
	const lastGroupIdByParent = new Map<string | null, string | null>();
	const startTaskIds = new Set<string>();
	for (const row of rows) {
		const groupId = resourceGroupIdByTaskId.get(row.taskId) ?? null;
		if (groupId && lastGroupIdByParent.get(row.parentId) !== groupId) {
			startTaskIds.add(row.taskId);
		}
		lastGroupIdByParent.set(row.parentId, groupId);
	}
	return startTaskIds;
}

export function createGanttColumnContext<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	node: GanttResolvedTaskNode<TTaskFields>,
	dependencies: readonly GanttDependency<TDependencyFields>[],
	resources: readonly GanttResource<TResourceFields>[],
	assignments: readonly GanttAssignment<TAssignmentFields>[]
): GanttColumnEditContext<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	return { node, dependencies, resources, assignments };
}

function createColumnContext<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	node: GanttResolvedTaskNode<TTaskFields>,
	options: {
		readonly dependencies: readonly GanttDependency<TDependencyFields>[];
		readonly resources: readonly GanttResource<TResourceFields>[];
		readonly assignments: readonly GanttAssignment<TAssignmentFields>[];
	}
): GanttColumnEditContext<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> {
	return createGanttColumnContext(
		node,
		options.dependencies,
		options.resources,
		options.assignments
	);
}

function compareValues(left: unknown, right: unknown): number {
	if (Object.is(left, right)) return 0;
	if (left === null || left === undefined) return 1;
	if (right === null || right === undefined) return -1;
	if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime();
	if (typeof left === 'number' && typeof right === 'number') return left - right;
	if (typeof left === 'boolean' && typeof right === 'boolean') return Number(left) - Number(right);
	return String(left).localeCompare(String(right));
}
