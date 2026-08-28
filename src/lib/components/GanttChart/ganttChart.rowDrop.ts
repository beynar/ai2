import type { GanttResolvedTaskNode } from './ganttChart.types.js';

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

export function resolveGanttRowDrop<TTaskFields extends object>(
	target: GanttRowDropTarget,
	nodesById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>
): GanttRowDropProposal | null {
	if (target.taskId === target.targetTaskId) return null;
	const sourceNode = nodesById.get(target.taskId);
	const targetNode = nodesById.get(target.targetTaskId);
	if (
		!sourceNode ||
		!targetNode ||
		sourceNode.task.readOnly ||
		isDescendant(targetNode, sourceNode.taskId, nodesById)
	) {
		return null;
	}
	const parentId =
		targetNode.type === 'summary' && target.position === 'after'
			? targetNode.taskId
			: targetNode.parentId;
	const parentNode = parentId ? nodesById.get(parentId) : null;
	if (parentId && (!parentNode || parentNode.task.readOnly)) return null;
	const depth = parentNode ? parentNode.depth + 1 : 0;
	return {
		...target,
		parentId,
		depth,
		intent: resolveDropIntent(sourceNode.parentId, sourceNode.depth, parentId, depth)
	};
}

function isDescendant<TTaskFields extends object>(
	targetNode: GanttResolvedTaskNode<TTaskFields>,
	ancestorTaskId: string,
	nodesById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>
): boolean {
	let current: GanttResolvedTaskNode<TTaskFields> | undefined = targetNode;
	while (current) {
		if (current.taskId === ancestorTaskId) return true;
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
