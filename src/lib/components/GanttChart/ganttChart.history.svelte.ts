import { GanttChartError } from './ganttChart.error.js';
import {
	cloneGanttAssignment,
	cloneGanttDependency,
	cloneGanttTask
} from './ganttChart.records.js';
import { getGanttValueSignature } from './ganttChart.signature.js';
import type { GanttChartState } from './ganttChart.state.svelte.js';
import type {
	GanttAssignment,
	GanttAssignmentMutationKind,
	GanttDependency,
	GanttDependencyMutationKind,
	GanttMutationSource,
	GanttSelection,
	GanttTask,
	GanttTaskMutationKind
} from './ganttChart.types.js';

export type GanttModelSnapshot<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	selection: GanttSelection;
}>;

export type GanttModelCommit<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	before: GanttModelSnapshot<TTaskFields, TDependencyFields, TAssignmentFields>;
	after: GanttModelSnapshot<TTaskFields, TDependencyFields, TAssignmentFields>;
	source: GanttMutationSource;
	title: string;
	taskKind?: GanttTaskMutationKind | 'schedule';
	dependencyKind?: GanttDependencyMutationKind;
	assignmentKind?: GanttAssignmentMutationKind;
	historyDirection?: GanttHistoryDirection;
}>;

export type GanttHistoryDirection = 'undo' | 'redo';

type HistoryEntry<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
> = GanttModelCommit<TTaskFields, TDependencyFields, TAssignmentFields> &
	Readonly<{
		beforeSignature: string;
		afterSignature: string;
		contextSignature: string;
	}>;

export class GanttChartHistory<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	#past = $state.raw<HistoryEntry<TTaskFields, TDependencyFields, TAssignmentFields>[]>([]);
	#future = $state.raw<HistoryEntry<TTaskFields, TDependencyFields, TAssignmentFields>[]>([]);

	constructor(
		private readonly chart: GanttChartState<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		private readonly restore: (
			target: GanttModelSnapshot<TTaskFields, TDependencyFields, TAssignmentFields>,
			commit: GanttModelCommit<TTaskFields, TDependencyFields, TAssignmentFields>,
			direction: GanttHistoryDirection
		) => boolean
	) {}

	record(
		commit: GanttModelCommit<TTaskFields, TDependencyFields, TAssignmentFields>
	): (() => void) | undefined {
		if (commit.source === 'history' || !this.chart.interactions.history) return undefined;
		const limit = this.getLimit();
		if (limit === 0) return undefined;
		const beforeSignature = getModelSignature(commit.before);
		const afterSignature = getModelSignature(commit.after);
		if (beforeSignature === afterSignature) return undefined;
		const previousEntry = this.#past.at(-1);
		if (previousEntry && previousEntry.afterSignature !== beforeSignature) this.#past = [];
		const entry: HistoryEntry<TTaskFields, TDependencyFields, TAssignmentFields> = {
			...commit,
			beforeSignature,
			afterSignature,
			contextSignature: this.getContextSignature()
		};
		this.#past = [...this.#past, entry].slice(-limit);
		this.#future = [];
		return () => this.forget(entry);
	}

	canUndo(): boolean {
		if (!this.chart.interactions.history || this.getLimit() === 0) return false;
		const entry = this.#past.at(-1);
		return Boolean(entry && this.isCurrent(entry, entry.afterSignature));
	}

	canRedo(): boolean {
		if (!this.chart.interactions.history || this.getLimit() === 0) return false;
		const entry = this.#future.at(-1);
		return Boolean(entry && this.isCurrent(entry, entry.beforeSignature));
	}

	undo(): boolean {
		return this.move('undo');
	}

	redo(): boolean {
		return this.move('redo');
	}

	private move(direction: GanttHistoryDirection): boolean {
		if (!this.chart.interactions.history || this.getLimit() === 0) return false;
		if (this.chart.disabled) throw new GanttChartError('disabled', 'GanttChart is disabled.');
		if (this.chart.loading) {
			throw new GanttChartError('invalid-operation', 'GanttChart is loading.');
		}
		const source = direction === 'undo' ? this.#past : this.#future;
		const entry = source.at(-1);
		if (!entry) return false;
		const expectedSignature = direction === 'undo' ? entry.afterSignature : entry.beforeSignature;
		if (!this.isCurrent(entry, expectedSignature)) {
			throw new GanttChartError(
				'stale-transaction',
				`The controlled Gantt model changed before ${direction}.`
			);
		}
		const target = direction === 'undo' ? entry.before : entry.after;
		if (!this.restore(target, entry, direction)) return false;
		if (direction === 'undo') {
			this.#past = this.#past.slice(0, -1);
			this.#future = [...this.#future, entry];
		} else {
			this.#future = this.#future.slice(0, -1);
			this.#past = [...this.#past, entry];
		}
		return true;
	}

	private isCurrent(
		entry: HistoryEntry<TTaskFields, TDependencyFields, TAssignmentFields>,
		expectedSignature: string
	): boolean {
		return (
			entry.contextSignature === this.getContextSignature() &&
			getModelSignature(this.getCurrentSnapshot()) === expectedSignature
		);
	}

	private getCurrentSnapshot(): GanttModelSnapshot<
		TTaskFields,
		TDependencyFields,
		TAssignmentFields
	> {
		return {
			tasks: this.chart.tasks,
			dependencies: this.chart.dependencies,
			assignments: this.chart.assignments,
			selection: this.chart.selection
		};
	}

	private getContextSignature(): string {
		return getGanttValueSignature({
			resources: this.chart.resources,
			calendars: this.chart.calendars,
			projectCalendarId: this.chart.projectCalendarId,
			timeZone: this.chart.timeZone
		});
	}

	private getLimit(): number {
		const limit = this.chart.historyLimit;
		if (Number.isInteger(limit) && limit >= 0) return limit;
		throw new GanttChartError('invalid-prop', 'historyLimit must be a non-negative integer.', {
			historyLimit: limit
		});
	}

	private forget(entry: HistoryEntry<TTaskFields, TDependencyFields, TAssignmentFields>): void {
		if (this.#past.at(-1) === entry) {
			this.#past = this.#past.slice(0, -1);
		} else {
			this.#past = [];
		}
		this.#future = [];
	}
}

export function getModelSignature<
	TTaskFields extends object,
	TDependencyFields extends object,
	TAssignmentFields extends object
>(snapshot: GanttModelSnapshot<TTaskFields, TDependencyFields, TAssignmentFields>): string {
	return getGanttValueSignature({
		tasks: snapshot.tasks.map(cloneGanttTask),
		dependencies: snapshot.dependencies.map(cloneGanttDependency),
		assignments: snapshot.assignments.map(cloneGanttAssignment)
	});
}
