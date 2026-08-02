import type { FlatHierarchy, FlatHierarchyNode } from '$lib/scheduling/flatHierarchy.js';
import type { GanttTask } from './ganttChart.types.js';

export type GanttRowDropTarget = Readonly<{
	taskId: string;
	targetTaskId: string;
	position: 'before' | 'after';
}>;

export type GanttRowDropProposal = Readonly<
	GanttRowDropTarget & {
		parentId: string | null;
		depth: number;
		intent: 'reorder' | 'nest' | 'outdent' | 'reparent';
	}
>;

type GanttRowDropModel<TTaskFields extends object> = Readonly<{
	tasksById: ReadonlyMap<string, GanttTask<TTaskFields>>;
	taskHierarchy: FlatHierarchy;
}>;

export function resolveGanttRowDrop<TTaskFields extends object>(
	target: GanttRowDropTarget,
	model: GanttRowDropModel<TTaskFields>
): GanttRowDropProposal | null {
	if (target.taskId === target.targetTaskId) return null;
	const sourceTask = model.tasksById.get(target.taskId);
	const targetTask = model.tasksById.get(target.targetTaskId);
	const sourceNode = model.taskHierarchy.nodesById.get(target.taskId);
	const targetNode = model.taskHierarchy.nodesById.get(target.targetTaskId);
	if (
		!sourceTask ||
		!targetTask ||
		!sourceNode ||
		!targetNode ||
		sourceTask.readOnly ||
		isDescendant(targetNode, sourceNode.id, model.taskHierarchy.nodesById)
	) {
		return null;
	}
	const parentId =
		(targetTask.type ?? 'task') === 'summary' && target.position === 'after'
			? targetTask.id
			: targetNode.parentId;
	const parentNode = parentId ? model.taskHierarchy.nodesById.get(parentId) : null;
	const parentTask = parentId ? model.tasksById.get(parentId) : null;
	if (parentId && (!parentNode || !parentTask || parentTask.readOnly)) return null;
	const depth = parentNode ? parentNode.depth + 1 : 0;
	return {
		...target,
		parentId,
		depth,
		intent: resolveDropIntent(sourceNode.parentId, sourceNode.depth, parentId, depth)
	};
}

function isDescendant(
	targetNode: FlatHierarchyNode,
	ancestorTaskId: string,
	nodesById: ReadonlyMap<string, FlatHierarchyNode>
): boolean {
	let current: FlatHierarchyNode | undefined = targetNode;
	while (current) {
		if (current.id === ancestorTaskId) return true;
		current = current.parentId ? nodesById.get(current.parentId) : undefined;
	}
	return false;
}

function resolveDropIntent(
	sourceParentId: string | null,
	sourceDepth: number,
	parentId: string | null,
	depth: number
): GanttRowDropProposal['intent'] {
	if (sourceParentId === parentId) return 'reorder';
	if (depth > sourceDepth) return 'nest';
	if (depth < sourceDepth) return 'outdent';
	return 'reparent';
}
