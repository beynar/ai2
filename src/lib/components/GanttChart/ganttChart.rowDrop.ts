import { resolveGanttDropParentId } from './ganttChart.hierarchy.js';
import type { GanttResolvedTaskNode } from './ganttChart.types.js';

export type GanttRowDropTarget = Readonly<{
	taskId: string;
	targetTaskId: string;
	position: 'before' | 'after';
}>;

export type GanttRowDropResolution = Readonly<{
	parentId: string | null;
	depth: number;
	intent: 'reorder' | 'nest' | 'outdent' | 'reparent';
}>;

export function resolveGanttRowDrop<TTaskFields extends object>(
	target: GanttRowDropTarget | null,
	nodesById: ReadonlyMap<string, GanttResolvedTaskNode<TTaskFields>>
): GanttRowDropResolution | null {
	if (!target || target.taskId === target.targetTaskId) return null;
	const sourceNode = nodesById.get(target.taskId);
	const targetNode = nodesById.get(target.targetTaskId);
	if (!sourceNode || !targetNode || isDescendant(targetNode, sourceNode.taskId, nodesById)) {
		return null;
	}
	const parentId = resolveGanttDropParentId(targetNode.task, target.position);
	const parentNode = parentId ? nodesById.get(parentId) : null;
	if (parentId && (!parentNode || parentNode.task.readOnly)) return null;
	const depth = parentNode ? parentNode.depth + 1 : 0;
	return {
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
): GanttRowDropResolution['intent'] {
	if (sourceParentId === parentId) return 'reorder';
	if (depth > sourceDepth) return 'nest';
	if (depth < sourceDepth) return 'outdent';
	return 'reparent';
}
