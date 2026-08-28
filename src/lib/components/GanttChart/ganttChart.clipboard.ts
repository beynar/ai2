import { GanttChartError } from './ganttChart.error.js';
import {
	cloneGanttAssignment,
	cloneGanttDependency,
	cloneGanttTask
} from './ganttChart.records.js';
import { getGanttValueSignature } from './ganttChart.signature.js';
import { getGanttTaskSubtreeIds } from './ganttChart.subtree.js';
import type { GanttChartState } from './ganttChart.state.svelte.js';
import type {
	GanttAssignment,
	GanttDependency,
	GanttPasteIdRequest,
	GanttTask
} from './ganttChart.types.js';

type ClipboardSnapshot<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	rootTaskId: string;
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	sourceSignature: string;
	omittedDependencyCount: number;
}>;

export type GanttPasteRecords<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	rootTaskId: string;
	tasks: GanttTask<TTaskFields>[];
	dependencies: GanttDependency<TDependencyFields>[];
	assignments: GanttAssignment<TAssignmentFields>[];
	omittedDependencyCount: number;
	copyIndex: number;
}>;

export class GanttChartClipboard<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	#snapshot: ClipboardSnapshot<TTaskFields, TDependencyFields, TAssignmentFields> | null = null;
	#copyIndex = 0;

	constructor(
		private readonly chart: GanttChartState<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) {}

	copySelection(): boolean {
		if (!this.chart.interactions.clipboard || this.chart.disabled) return false;
		const selection = this.chart.selection;
		if (selection.kind !== 'task' && selection.kind !== 'cell') return false;
		const rootTask = this.chart.schedule.model.tasksById.get(selection.taskId);
		if (!rootTask) {
			throw new GanttChartError(
				'clipboard-invalid',
				'The selected clipboard task no longer exists.',
				{
					taskId: selection.taskId
				}
			);
		}

		const taskIds = getGanttTaskSubtreeIds(rootTask.id, this.chart.tasks);
		const tasks = this.chart.tasks.filter((task) => taskIds.has(task.id)).map(cloneGanttTask);
		const dependencies = this.chart.dependencies
			.filter(
				(dependency) => taskIds.has(dependency.fromTaskId) && taskIds.has(dependency.toTaskId)
			)
			.map(cloneGanttDependency);
		const assignments = this.chart.assignments
			.filter((assignment) => taskIds.has(assignment.taskId))
			.map(cloneGanttAssignment);
		const externalDependencyCount = this.chart.dependencies.filter(
			(dependency) => taskIds.has(dependency.fromTaskId) !== taskIds.has(dependency.toTaskId)
		).length;
		this.#snapshot = {
			rootTaskId: rootTask.id,
			tasks,
			dependencies,
			assignments,
			sourceSignature: getClipboardSignature(tasks, dependencies, assignments),
			omittedDependencyCount: externalDependencyCount
		};
		this.#copyIndex = 0;
		return true;
	}

	preparePaste(): GanttPasteRecords<TTaskFields, TDependencyFields, TAssignmentFields> {
		if (!this.chart.interactions.clipboard) {
			throw new GanttChartError('clipboard-invalid', 'Clipboard interactions are disabled.');
		}
		if (this.chart.disabled) throw new GanttChartError('disabled', 'GanttChart is disabled.');
		if (this.chart.loading) {
			throw new GanttChartError('invalid-operation', 'GanttChart is loading.');
		}
		const snapshot = this.#snapshot;
		if (!snapshot) throw new GanttChartError('clipboard-invalid', 'The Gantt clipboard is empty.');
		this.assertSnapshotCurrent(snapshot);
		const getPasteId =
			this.chart.interactionOptions?.clipboard === false
				? undefined
				: this.chart.interactionOptions?.clipboard?.getId;
		if (!getPasteId) {
			throw new GanttChartError(
				'clipboard-invalid',
				'Pasting a task subtree requires the getPasteId hook.'
			);
		}

		const copyIndex = this.#copyIndex + 1;
		const taskIdMap = createIdMap(
			'task',
			snapshot.tasks.map((task) => task.id),
			new Set(this.chart.tasks.map((task) => task.id)),
			copyIndex,
			getPasteId
		);
		const dependencyIdMap = createIdMap(
			'dependency',
			snapshot.dependencies.map((dependency) => dependency.id),
			new Set(this.chart.dependencies.map((dependency) => dependency.id)),
			copyIndex,
			getPasteId
		);
		const assignmentIdMap = createIdMap(
			'assignment',
			snapshot.assignments.map((assignment) => assignment.id),
			new Set(this.chart.assignments.map((assignment) => assignment.id)),
			copyIndex,
			getPasteId
		);
		this.assertSnapshotCurrent(snapshot);

		return {
			rootTaskId: requireMappedId(taskIdMap, snapshot.rootTaskId),
			tasks: snapshot.tasks.map((task) => {
				const parentId = task.id === snapshot.rootTaskId ? undefined : task.parentId;
				return {
					...cloneGanttTask(task),
					id: requireMappedId(taskIdMap, task.id),
					parentId: parentId ? requireMappedId(taskIdMap, parentId) : undefined
				};
			}),
			dependencies: snapshot.dependencies.map((dependency) => ({
				...cloneGanttDependency(dependency),
				id: requireMappedId(dependencyIdMap, dependency.id),
				fromTaskId: requireMappedId(taskIdMap, dependency.fromTaskId),
				toTaskId: requireMappedId(taskIdMap, dependency.toTaskId)
			})),
			assignments: snapshot.assignments.map((assignment) => ({
				...cloneGanttAssignment(assignment),
				id: requireMappedId(assignmentIdMap, assignment.id),
				taskId: requireMappedId(taskIdMap, assignment.taskId)
			})),
			omittedDependencyCount: snapshot.omittedDependencyCount,
			copyIndex
		};
	}

	markPasted(copyIndex: number): void {
		if (copyIndex !== this.#copyIndex + 1) {
			throw new GanttChartError('stale-transaction', 'The prepared clipboard paste is stale.');
		}
		this.#copyIndex = copyIndex;
	}

	get copiedRootTitle(): string | null {
		const snapshot = this.#snapshot;
		return snapshot?.tasks.find((task) => task.id === snapshot.rootTaskId)?.title ?? null;
	}

	get omittedDependencyCount(): number {
		return this.#snapshot?.omittedDependencyCount ?? 0;
	}

	private assertSnapshotCurrent(
		snapshot: ClipboardSnapshot<TTaskFields, TDependencyFields, TAssignmentFields>
	): void {
		const taskIds = new Set(snapshot.tasks.map((task) => task.id));
		const currentTasks = this.chart.tasks.filter((task) => taskIds.has(task.id));
		const dependencyIds = new Set(snapshot.dependencies.map((dependency) => dependency.id));
		const currentDependencies = this.chart.dependencies.filter((dependency) =>
			dependencyIds.has(dependency.id)
		);
		const assignmentIds = new Set(snapshot.assignments.map((assignment) => assignment.id));
		const currentAssignments = this.chart.assignments.filter((assignment) =>
			assignmentIds.has(assignment.id)
		);
		if (
			getClipboardSignature(currentTasks, currentDependencies, currentAssignments) ===
			snapshot.sourceSignature
		) {
			return;
		}
		throw new GanttChartError(
			'stale-transaction',
			'The copied task subtree changed after it entered the clipboard.'
		);
	}
}

function createIdMap(
	kind: GanttPasteIdRequest['kind'],
	sourceIds: readonly string[],
	existingIds: ReadonlySet<string>,
	copyIndex: number,
	getPasteId: (request: GanttPasteIdRequest) => string
): ReadonlyMap<string, string> {
	const generatedIds = new Set<string>();
	const idMap = new Map<string, string>();
	for (const sourceId of sourceIds) {
		const id = getPasteId({ kind, sourceId, copyIndex });
		if (typeof id !== 'string' || id.length === 0) {
			throw new GanttChartError('clipboard-invalid', 'getPasteId returned an empty ID.', {
				kind,
				sourceId,
				copyIndex
			});
		}
		if (existingIds.has(id) || generatedIds.has(id)) {
			throw new GanttChartError('clipboard-invalid', `getPasteId returned duplicate ID ${id}.`, {
				kind,
				sourceId,
				copyIndex,
				id
			});
		}
		generatedIds.add(id);
		idMap.set(sourceId, id);
	}
	return idMap;
}

function requireMappedId(idMap: ReadonlyMap<string, string>, sourceId: string): string {
	const id = idMap.get(sourceId);
	if (id) return id;
	throw new GanttChartError('clipboard-invalid', `Clipboard record ${sourceId} lost its ID map.`, {
		sourceId
	});
}

function getClipboardSignature<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
>(
	tasks: readonly GanttTask<TTaskFields>[],
	dependencies: readonly GanttDependency<TDependencyFields>[],
	assignments: readonly GanttAssignment<TAssignmentFields>[]
): string {
	return getGanttValueSignature({
		tasks: tasks.map(cloneGanttTask),
		dependencies: dependencies.map(cloneGanttDependency),
		assignments: assignments.map(cloneGanttAssignment)
	});
}
