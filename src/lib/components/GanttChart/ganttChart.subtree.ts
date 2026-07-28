import type { GanttTask } from './ganttChart.types.js';

export function getGanttTaskSubtreeIds<TTaskFields extends object>(
	rootTaskId: string,
	tasks: readonly GanttTask<TTaskFields>[]
): ReadonlySet<string> {
	const childrenByParent = new Map<string, string[]>();
	for (const task of tasks) {
		if (!task.parentId) continue;
		const children = childrenByParent.get(task.parentId) ?? [];
		children.push(task.id);
		childrenByParent.set(task.parentId, children);
	}
	const taskIds = new Set<string>();
	const stack = [rootTaskId];
	while (stack.length > 0) {
		const taskId = stack.pop();
		if (!taskId || taskIds.has(taskId)) continue;
		taskIds.add(taskId);
		for (const childId of childrenByParent.get(taskId) ?? []) stack.push(childId);
	}
	return taskIds;
}
