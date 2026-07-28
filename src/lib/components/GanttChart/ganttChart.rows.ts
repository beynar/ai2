import { getGanttColumnValue } from './ganttChart.columns.js';
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
	isFiltered: boolean;
	isSorted: boolean;
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
	const includedIds = resolveIncludedIds(options, filterColumns);
	const rows: GanttResolvedTaskNode<TTaskFields>[] = [];
	const getOrderedChildren = (
		parentId: string | null
	): readonly GanttResolvedTaskNode<TTaskFields>[] => {
		const children = childrenByParent.get(parentId) ?? [];
		if (sortColumns.length > 0) {
			children.sort((left, right) => compareRows(left, right, sortColumns, options, orderById));
		}
		return children;
	};
	const stack = [...getOrderedChildren(null)].reverse();
	while (stack.length > 0) {
		const node = stack.pop();
		if (!node || !includedIds.has(node.taskId)) continue;
		rows.push(node);
		if (filterColumns.length === 0 && !node.isExpanded) continue;
		const children = getOrderedChildren(node.taskId);
		for (let index = children.length - 1; index >= 0; index -= 1) {
			stack.push(children[index]);
		}
	}

	return {
		rows: rows.map((node, visibleIndex) => ({
			...node,
			isVisible: true,
			visibleIndex
		})),
		visibleColumns,
		isFiltered: filterColumns.length > 0,
		isSorted: sortColumns.length > 0
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
	},
	filterColumns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[]
): ReadonlySet<string> {
	if (filterColumns.length === 0) return new Set(options.nodes.map((node) => node.taskId));
	const includedIds = new Set<string>();
	for (const node of options.nodes) {
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
	},
	orderById: ReadonlyMap<string, number>
): number {
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
