import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
import type {
	GanttChartInteractionStatus,
	GanttChartInteractions
} from './ganttChart.interactions.svelte.js';
import type { GanttDependencyInteractionStatus } from './ganttChart.dependencyInteraction.svelte.js';
import { GanttChartError } from './ganttChart.error.js';
import type { GanttModelCommit } from './ganttChart.history.svelte.js';
import type { ResolvedGanttSchedule } from './ganttChart.schedule.js';
import { getGanttValueSignature } from './ganttChart.signature.js';
import type { GanttChartStateOptions } from './ganttChart.state.svelte.js';
import type {
	GanttDependencyEndpoint,
	GanttInteractionBlockedInfo,
	GanttSelection
} from './ganttChart.types.js';

export type GanttFocusTarget =
	| Readonly<{ kind: 'cell'; taskId: string; columnId: string }>
	| Readonly<{ kind: 'task'; taskId: string }>
	| Readonly<{ kind: 'dependency'; dependencyId: string }>;

type KeyboardMode =
	| Readonly<{
			kind: 'task';
			taskId: string;
			title: string;
			operation: 'move' | 'resize-start' | 'resize-end' | 'progress';
	  }>
	| Readonly<{
			kind: 'dependency';
			taskId: string;
			title: string;
	  }>
	| Readonly<{
			kind: 'range';
			taskId: string;
			title: string;
	  }>;

type A11yActions = Readonly<{
	select: (selection: GanttSelection) => void;
	clearSelection: () => void;
	removeTask: (taskId: string) => boolean;
	removeDependency: (dependencyId: string) => boolean;
	copySelection: () => boolean;
	paste: () => boolean;
	undo: () => boolean;
	redo: () => boolean;
	scrollToTask: (taskId: string) => boolean;
}>;

export class GanttChartA11y<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> {
	announcement = $state('');
	activeTarget = $state.raw<GanttFocusTarget | null>(null);
	keyboardMode = $state.raw<KeyboardMode | null>(null);
	readonly liveRegionId: string;
	readonly instructionsId: string;
	#root: HTMLElement | null = null;
	#rowTaskIds: readonly string[] = [];
	#columnIds: readonly string[] = [];
	#dependencyIds: readonly string[] = [];
	#rowHeight = 32;
	#announcementRevision = 0;
	#lastInteractionKey = '';
	#focusFrames: number[] = [];
	#dismissTimer: ReturnType<typeof setTimeout> | null = null;

	constructor(
		private readonly options: GanttChartStateOptions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		private readonly interaction: GanttChartInteractions<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		private readonly getSchedule: () => ResolvedGanttSchedule<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		private readonly actions: A11yActions
	) {
		this.liveRegionId = `${options.rootId}-live`;
		this.instructionsId = `${options.rootId}-instructions`;
	}

	connectRoot(root: HTMLElement): () => void {
		this.#root = root;
		return () => {
			if (this.#root === root) this.#root = null;
			this.cancelFocusFrames();
			if (this.#dismissTimer !== null) clearTimeout(this.#dismissTimer);
			this.#dismissTimer = null;
		};
	}

	setNavigationModel(
		rowTaskIds: readonly string[],
		columnIds: readonly string[],
		dependencyIds: readonly string[],
		rowHeight: number
	): void {
		const previousRowTaskIds = this.#rowTaskIds;
		const previousColumnIds = this.#columnIds;
		const previousDependencyIds = this.#dependencyIds;
		this.#rowTaskIds = [...rowTaskIds];
		this.#columnIds = [...columnIds];
		this.#dependencyIds = [...dependencyIds];
		this.#rowHeight = rowHeight;
		this.reconcileFocus(previousRowTaskIds, previousColumnIds, previousDependencyIds);
	}

	setCellTarget(taskId: string, columnId: string): void {
		this.activeTarget = { kind: 'cell', taskId, columnId };
	}

	setTaskTarget(taskId: string): void {
		this.activeTarget = { kind: 'task', taskId };
		if (this.options.selection.kind !== 'task' || this.options.selection.taskId !== taskId) {
			this.actions.select({
				kind: 'task',
				taskId,
				dependencyId: null,
				cell: null
			});
		}
	}

	setDependencyTarget(dependencyId: string): void {
		this.activeTarget = { kind: 'dependency', dependencyId };
		if (
			this.options.selection.kind !== 'dependency' ||
			this.options.selection.dependencyId !== dependencyId
		) {
			this.actions.select({
				kind: 'dependency',
				taskId: null,
				dependencyId,
				cell: null
			});
		}
	}

	syncSelection(selection: GanttSelection): void {
		this.activeTarget = getSelectionTarget(
			selection,
			this.#rowTaskIds,
			this.#columnIds,
			this.#dependencyIds
		);
	}

	isCellTabStop(taskId: string, columnId: string): boolean {
		const target = this.activeTarget;
		if (target?.kind === 'cell') return target.taskId === taskId && target.columnId === columnId;
		if (target) return false;
		return this.#rowTaskIds[0] === taskId && this.#columnIds[0] === columnId;
	}

	isTaskTabStop(taskId: string): boolean {
		return this.activeTarget?.kind === 'task' && this.activeTarget.taskId === taskId;
	}

	isDependencyTabStop(dependencyId: string): boolean {
		return (
			this.activeTarget?.kind === 'dependency' && this.activeTarget.dependencyId === dependencyId
		);
	}

	isTaskGrabbed(taskId: string): boolean {
		return Boolean(this.keyboardMode && this.keyboardMode.taskId === taskId);
	}

	focusCell(taskId: string, columnId = this.#columnIds[0] ?? 'title'): boolean {
		if (!this.#rowTaskIds.includes(taskId) || !this.#columnIds.includes(columnId)) return false;
		this.setCellTarget(taskId, columnId);
		const selection = this.options.selection;
		if (
			selection.kind !== 'cell' ||
			selection.taskId !== taskId ||
			selection.cell.columnId !== columnId
		) {
			this.actions.select({
				kind: 'cell',
				taskId,
				dependencyId: null,
				cell: { taskId, columnId }
			});
		}
		this.actions.scrollToTask(taskId);
		this.scheduleFocus(
			(element) =>
				element.dataset.ganttChartPart === 'tree-cell' &&
				element.closest<HTMLElement>('[data-task-id]')?.dataset.taskId === taskId &&
				element.dataset.columnId === columnId
		);
		return true;
	}

	focusTask(taskId: string): boolean {
		if (!this.#rowTaskIds.includes(taskId)) return false;
		this.setTaskTarget(taskId);
		this.actions.scrollToTask(taskId);
		this.scheduleFocus(
			(element) => isTaskPart(element.dataset.ganttChartPart) && element.dataset.taskId === taskId
		);
		return true;
	}

	focusDependency(dependencyId: string): boolean {
		if (!this.#dependencyIds.includes(dependencyId)) return false;
		this.setDependencyTarget(dependencyId);
		const dependency = this.getSchedule().analysis.dependencies.find(
			(candidate) => candidate.dependency.id === dependencyId
		);
		if (dependency) this.actions.scrollToTask(dependency.fromTask.taskId);
		this.scheduleFocus(
			(element) =>
				element.dataset.ganttChartPart === 'connector-control' &&
				element.dataset.dependencyId === dependencyId
		);
		return true;
	}

	handleRootKeydown(event: KeyboardEvent): void {
		if (!this.options.interactions.keyboard || isEditableTarget(event.target)) return;
		if (this.handleModifierShortcut(event)) return;
		if (this.keyboardMode) {
			this.handleModeKeydown(event);
			return;
		}
		if (event.key === 'Delete' || event.key === 'Backspace') {
			this.handleDelete(event);
			return;
		}
		const target = this.activeTarget;
		if (target?.kind === 'task') this.handleTaskNavigation(event, target.taskId);
		else if (target?.kind === 'dependency') {
			this.handleDependencyNavigation(event, target.dependencyId);
		}
	}

	private dismissFocus(): void {
		const mode = this.keyboardMode;
		this.interaction.cancel();
		this.keyboardMode = null;
		this.actions.clearSelection();
		this.activeTarget = null;
		this.cancelFocusFrames();
		if (mode) this.announce(this.options.messages.ganttChartMutationCancelled(mode.title));

		const root = this.#root;
		if (!root) return;
		queueMicrotask(() => {
			if (this.#root !== root) return;
			const activeElement = root.ownerDocument.activeElement;
			if (
				activeElement &&
				root.contains(activeElement) &&
				'blur' in activeElement &&
				typeof activeElement.blur === 'function'
			) {
				activeElement.blur();
			}
		});
	}

	scheduleDismissFocus(): void {
		const root = this.#root;
		if (!root) return;
		if (this.#dismissTimer !== null) clearTimeout(this.#dismissTimer);
		this.#dismissTimer = setTimeout(() => {
			this.#dismissTimer = null;
			if (this.#root === root) this.dismissFocus();
		}, 0);
	}

	syncInteractionStatus(
		status: GanttChartInteractionStatus<TTaskFields> | null,
		dependencyStatus: GanttDependencyInteractionStatus | null
	): void {
		if (dependencyStatus) {
			this.announceDependencyStatus(dependencyStatus);
			return;
		}
		if (!status) {
			this.#lastInteractionKey = '';
			return;
		}
		const key = getInteractionStatusKey(status);
		if (key === this.#lastInteractionKey) return;
		this.#lastInteractionKey = key;
		if (!status.proposal || !status.isValid) {
			this.announce(
				this.options.messages.ganttChartInvalidTarget(status.invalidReason ?? 'invalid proposal')
			);
			return;
		}
		const formatter = this.getDateFormatter();
		if (status.type === 'range') {
			const proposal = status.proposal;
			this.announce(
				`${this.options.messages.ganttChartRangeAction}: ${formatter.format(proposal.start)} – ${formatter.format(proposal.end)}`
			);
			return;
		}
		const proposal = status.proposal;
		if (!proposal.task?.start || !proposal.task.end) return;
		this.announce(
			this.options.messages.ganttChartProposedSchedule(
				proposal.task.title,
				formatter.format(proposal.task.start),
				formatter.format(proposal.task.end),
				`${Math.round((proposal.task.progress ?? 0) * 100)}%`
			)
		);
	}

	announceCommit(
		commit: GanttModelCommit<TTaskFields, TDependencyFields, TAssignmentFields>
	): void {
		this.announce(
			commit.source === 'history' && commit.historyDirection === 'undo'
				? this.options.messages.ganttChartMutationReverted(commit.title)
				: this.options.messages.ganttChartMutationCommitted(commit.title)
		);
		const propagatedCount = Math.max(
			0,
			getChangedTaskCount(commit.before.tasks, commit.after.tasks) - 1
		);
		if (propagatedCount > 0) {
			this.announce(this.options.messages.ganttChartSchedulePropagated(propagatedCount));
		}
	}

	announceRevert(title: string): void {
		this.announce(this.options.messages.ganttChartMutationReverted(title));
	}

	announce(message: string): void {
		const revision = ++this.#announcementRevision;
		this.announcement = '';
		queueMicrotask(() => {
			if (revision === this.#announcementRevision) this.announcement = message;
		});
	}

	cancelKeyboardMode(): boolean {
		const mode = this.keyboardMode;
		if (!mode) return false;
		this.interaction.cancel();
		this.keyboardMode = null;
		this.announce(this.options.messages.ganttChartMutationCancelled(mode.title));
		this.focusTask(mode.taskId);
		return true;
	}

	private handleModifierShortcut(event: KeyboardEvent): boolean {
		if (!(event.metaKey || event.ctrlKey) || event.altKey) return false;
		const key = event.key.toLowerCase();
		let handled: boolean;
		try {
			if (key === 'c' && !event.shiftKey) handled = this.actions.copySelection();
			else if (key === 'v' && !event.shiftKey) handled = this.actions.paste();
			else if (key === 'z' && event.shiftKey) handled = this.actions.redo();
			else if (key === 'z' && !event.shiftKey) handled = this.actions.undo();
			else if (key === 'y' && !event.shiftKey) handled = this.actions.redo();
			else return false;
		} catch (error) {
			this.reportKeyboardError(error);
			handled = true;
		}
		if (handled) event.preventDefault();
		return handled;
	}

	private handleModeKeydown(event: KeyboardEvent): void {
		const mode = this.keyboardMode;
		if (!mode) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			this.cancelKeyboardMode();
			return;
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			const committed =
				mode.kind === 'task'
					? this.interaction.commitKeyboardTask()
					: mode.kind === 'range'
						? this.interaction.commitKeyboardRange()
						: this.interaction.dependency.commitKeyboard();
			if (committed) {
				this.keyboardMode = null;
				this.focusTask(mode.taskId);
			}
			return;
		}
		const physicalStep = getPhysicalTimeStep(event.key, this.options.direction);
		if (mode.kind === 'task' && physicalStep) {
			event.preventDefault();
			this.interaction.adjustKeyboardTask(physicalStep);
			return;
		}
		if (mode.kind === 'range' && physicalStep) {
			event.preventDefault();
			this.interaction.adjustKeyboardRange(physicalStep);
			return;
		}
		if (mode.kind !== 'dependency') return;
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			this.interaction.dependency.moveKeyboardTarget(
				event.key === 'ArrowUp' ? -1 : 1,
				this.#rowTaskIds
			);
			return;
		}
		const endpoint = getPhysicalEndpoint(event.key, this.options.direction);
		if (!endpoint) return;
		event.preventDefault();
		this.interaction.dependency.setKeyboardTargetEndpoint(endpoint, this.#rowTaskIds);
	}

	private handleTaskNavigation(event: KeyboardEvent, taskId: string): void {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			this.focusAdjacentTask(taskId, event.key === 'ArrowUp' ? -1 : 1);
			return;
		}
		const inlineStartKey = this.options.direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
		if (event.key === inlineStartKey) {
			event.preventDefault();
			this.focusCell(taskId, this.#columnIds.at(-1));
			return;
		}
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		const key = event.key.toLowerCase();
		const operation =
			key === 'm'
				? 'move'
				: key === 's'
					? 'resize-start'
					: key === 'e'
						? 'resize-end'
						: key === 'p'
							? 'progress'
							: null;
		if (operation) {
			event.preventDefault();
			this.beginTaskMode(taskId, operation);
			return;
		}
		if (key === 'd') {
			event.preventDefault();
			this.beginDependencyMode(taskId, event.shiftKey ? 'start' : 'end');
			return;
		}
		if (key === 'r') {
			event.preventDefault();
			this.beginRangeMode(taskId);
		}
	}

	private handleDependencyNavigation(event: KeyboardEvent, dependencyId: string): void {
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
		event.preventDefault();
		const index = this.#dependencyIds.indexOf(dependencyId);
		const next = this.#dependencyIds[index + (event.key === 'ArrowUp' ? -1 : 1)];
		if (next) this.focusDependency(next);
	}

	private handleDelete(event: KeyboardEvent): void {
		const selection = this.options.selection;
		if (selection.kind !== 'task' && selection.kind !== 'cell' && selection.kind !== 'dependency') {
			return;
		}
		event.preventDefault();
		try {
			const accepted =
				selection.kind === 'dependency'
					? this.actions.removeDependency(selection.dependencyId)
					: this.actions.removeTask(selection.taskId);
			if (!accepted) {
				this.announce(
					this.options.messages.ganttChartInvalidTarget('consumer policy rejected deletion')
				);
			}
		} catch (error) {
			this.reportKeyboardError(error);
		}
	}

	private beginTaskMode(
		taskId: string,
		operation: 'move' | 'resize-start' | 'resize-end' | 'progress'
	): void {
		const task = this.getSchedule().model.tasksById.get(taskId);
		if (!task || !this.interaction.beginKeyboardTask(taskId, operation)) {
			this.announce(this.options.messages.ganttChartInvalidTarget(operation));
			return;
		}
		this.keyboardMode = { kind: 'task', taskId, title: task.title, operation };
		this.announce(this.options.messages.ganttChartKeyboardMode(operation, task.title));
	}

	private beginDependencyMode(taskId: string, endpoint: GanttDependencyEndpoint): void {
		const task = this.getSchedule().model.tasksById.get(taskId);
		if (!task || !this.interaction.dependency.beginKeyboard(taskId, endpoint, this.#rowTaskIds)) {
			this.announce(this.options.messages.ganttChartInvalidTarget('dependency'));
			return;
		}
		this.keyboardMode = { kind: 'dependency', taskId, title: task.title };
		this.announce(
			this.options.messages.ganttChartKeyboardMode(
				this.options.messages.ganttChartDependencyAction,
				task.title
			)
		);
	}

	private beginRangeMode(taskId: string): void {
		const task = this.getSchedule().model.tasksById.get(taskId);
		if (!task) return;
		const anchor = task.end ?? task.start ?? this.getSchedule().analysis.projectRange?.start;
		if (!anchor) {
			this.announce(this.options.messages.ganttChartInvalidTarget('unscheduled task'));
			return;
		}
		const rowIndex = Math.max(0, this.#rowTaskIds.indexOf(taskId));
		if (!this.interaction.beginKeyboardRange(anchor, rowIndex * this.#rowHeight, task.parentId)) {
			this.announce(this.options.messages.ganttChartInvalidTarget('range'));
			return;
		}
		this.keyboardMode = { kind: 'range', taskId, title: task.title };
		this.announce(
			this.options.messages.ganttChartKeyboardMode(
				this.options.messages.ganttChartRangeAction,
				task.title
			)
		);
	}

	private announceDependencyStatus(status: GanttDependencyInteractionStatus): void {
		const key = `${status.source}:${status.sourceTaskId}:${status.targetTaskId}:${status.sourceEndpoint}:${status.targetEndpoint}:${status.isValid}:${status.invalidReason}`;
		if (key === this.#lastInteractionKey) return;
		this.#lastInteractionKey = key;
		if (!status.targetTaskId || !status.targetEndpoint || !status.type) return;
		if (!status.isValid) {
			this.announce(
				this.options.messages.ganttChartInvalidTarget(status.invalidReason ?? 'invalid dependency')
			);
			return;
		}
		const schedule = this.getSchedule();
		const from = schedule.model.tasksById.get(status.sourceTaskId);
		const to = schedule.model.tasksById.get(status.targetTaskId);
		if (!from || !to) return;
		this.announce(
			this.options.messages.ganttChartDependencyDescription(from.title, to.title, status.type)
		);
	}

	private focusAdjacentTask(taskId: string, delta: -1 | 1): void {
		const index = this.#rowTaskIds.indexOf(taskId);
		const nextTaskId = this.#rowTaskIds[index + delta];
		if (nextTaskId) this.focusTask(nextTaskId);
	}

	private reconcileFocus(
		previousRowTaskIds: readonly string[],
		previousColumnIds: readonly string[],
		previousDependencyIds: readonly string[]
	): void {
		const target = this.activeTarget;
		const controlledTarget = getSelectionTarget(
			this.options.selection,
			this.#rowTaskIds,
			this.#columnIds,
			this.#dependencyIds
		);
		if (controlledTarget && !isSameFocusTarget(target, controlledTarget)) {
			this.activeTarget = controlledTarget;
			this.focusTarget(controlledTarget);
			return;
		}
		if (!target) {
			this.activeTarget = controlledTarget;
			return;
		}
		const isCurrent =
			target.kind === 'dependency'
				? this.#dependencyIds.includes(target.dependencyId)
				: this.#rowTaskIds.includes(target.taskId);
		if (isCurrent && (target.kind !== 'cell' || this.#columnIds.includes(target.columnId))) return;
		if (target.kind === 'dependency' && this.#dependencyIds.length > 0) {
			const previousIndex = Math.max(0, previousDependencyIds.indexOf(target.dependencyId));
			const dependencyId =
				this.#dependencyIds[Math.min(previousIndex, this.#dependencyIds.length - 1)];
			if (dependencyId) {
				this.activeTarget = { kind: 'dependency', dependencyId };
				this.focusDependency(dependencyId);
				this.announceFocusRestored(dependencyId);
				return;
			}
		}
		const previousTaskId = target.kind === 'dependency' ? null : target.taskId;
		const previousRowIndex = Math.max(0, previousRowTaskIds.indexOf(previousTaskId ?? ''));
		const taskId = this.#rowTaskIds[Math.min(previousRowIndex, this.#rowTaskIds.length - 1)];
		if (!taskId) {
			this.activeTarget = null;
			return;
		}
		if (target.kind === 'task') {
			this.focusTask(taskId);
			this.announceFocusRestored(taskId);
			return;
		}
		const previousColumnIndex =
			target.kind === 'cell' ? Math.max(0, previousColumnIds.indexOf(target.columnId)) : 0;
		const columnId =
			this.#columnIds[Math.min(previousColumnIndex, this.#columnIds.length - 1)] ?? 'title';
		this.focusCell(taskId, columnId);
		this.announceFocusRestored(taskId);
	}

	private focusTarget(target: GanttFocusTarget): void {
		if (target.kind === 'task') this.focusTask(target.taskId);
		else if (target.kind === 'dependency') this.focusDependency(target.dependencyId);
		else this.focusCell(target.taskId, target.columnId);
	}

	private announceFocusRestored(id: string): void {
		const task = this.getSchedule().model.tasksById.get(id);
		this.announce(this.options.messages.ganttChartFocusRestored(task?.title ?? id));
	}

	private scheduleFocus(predicate: (element: HTMLElement) => boolean): void {
		const root = this.#root;
		if (!root) return;
		this.cancelFocusFrames();
		const getElement = () =>
			Array.from(root.querySelectorAll<HTMLElement>('[data-gantt-chart-part]')).find(predicate);
		const currentElement = getElement();
		if (currentElement) {
			currentElement.focus({ preventScroll: true });
			return;
		}
		let attempts = 0;
		const tryFocus = () => {
			const frame = requestAnimationFrame(() => {
				if (this.#root !== root) return;
				const element = getElement();
				if (element) {
					this.#focusFrames = [];
					element.focus({ preventScroll: true });
					return;
				}
				attempts += 1;
				if (attempts < 8) tryFocus();
				else this.#focusFrames = [];
			});
			this.#focusFrames = [frame];
		};
		tryFocus();
	}

	private cancelFocusFrames(): void {
		for (const frame of this.#focusFrames) cancelAnimationFrame(frame);
		this.#focusFrames = [];
	}

	private getDateFormatter(): Intl.DateTimeFormat {
		return getDateTimeFormatter(this.options.locale, this.options.timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	private reportKeyboardError(error: unknown): void {
		if (!(error instanceof GanttChartError)) throw error;
		this.announce(this.options.messages.ganttChartInvalidTarget(error.message));
		const info: GanttInteractionBlockedInfo = {
			reason: getBlockedReason(error),
			source: 'keyboard',
			message: error.message
		};
		this.options.onInteractionBlocked?.(info);
	}
}

function isTaskPart(part: string | undefined): boolean {
	return part === 'task' || part === 'summary-task' || part === 'milestone';
}

function getSelectionTarget(
	selection: GanttSelection,
	rowTaskIds: readonly string[],
	columnIds: readonly string[],
	dependencyIds: readonly string[]
): GanttFocusTarget | null {
	if (selection.kind === 'task' && rowTaskIds.includes(selection.taskId)) {
		return { kind: 'task', taskId: selection.taskId };
	}
	if (selection.kind === 'dependency' && dependencyIds.includes(selection.dependencyId)) {
		return { kind: 'dependency', dependencyId: selection.dependencyId };
	}
	if (
		selection.kind === 'cell' &&
		rowTaskIds.includes(selection.taskId) &&
		columnIds.includes(selection.cell.columnId)
	) {
		return {
			kind: 'cell',
			taskId: selection.taskId,
			columnId: selection.cell.columnId
		};
	}
	return null;
}

function isSameFocusTarget(left: GanttFocusTarget | null, right: GanttFocusTarget): boolean {
	if (!left || left.kind !== right.kind) return false;
	if (left.kind === 'dependency' && right.kind === 'dependency') {
		return left.dependencyId === right.dependencyId;
	}
	if (left.kind === 'task' && right.kind === 'task') return left.taskId === right.taskId;
	return (
		left.kind === 'cell' &&
		right.kind === 'cell' &&
		left.taskId === right.taskId &&
		left.columnId === right.columnId
	);
}

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	return (
		target.isContentEditable ||
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement
	);
}

function getPhysicalTimeStep(key: string, direction: 'ltr' | 'rtl'): -1 | 1 | null {
	if (key === 'ArrowLeft') return direction === 'rtl' ? 1 : -1;
	if (key === 'ArrowRight') return direction === 'rtl' ? -1 : 1;
	return null;
}

function getPhysicalEndpoint(
	key: string,
	direction: 'ltr' | 'rtl'
): GanttDependencyEndpoint | null {
	if (key === 'ArrowLeft') return direction === 'rtl' ? 'end' : 'start';
	if (key === 'ArrowRight') return direction === 'rtl' ? 'start' : 'end';
	return null;
}

function getChangedTaskCount(
	before: readonly { id: string }[],
	after: readonly { id: string }[]
): number {
	const beforeById = new Map(before.map((task) => [task.id, task]));
	const afterById = new Map(after.map((task) => [task.id, task]));
	return [...new Set([...beforeById.keys(), ...afterById.keys()])].filter((taskId) => {
		const previous = beforeById.get(taskId);
		const task = afterById.get(taskId);
		return !previous || !task || getGanttValueSignature(previous) !== getGanttValueSignature(task);
	}).length;
}

function getInteractionStatusKey<TTaskFields extends object>(
	status: GanttChartInteractionStatus<TTaskFields>
): string {
	if (!status.proposal) return `${status.type}:invalid:${status.invalidReason}`;
	if (status.type === 'range') {
		return `${status.type}:${status.isValid}:${status.proposal.start.getTime()}:${status.proposal.end.getTime()}`;
	}
	const task = status.proposal.task;
	return task?.start && task.end
		? `${status.type}:${status.isValid}:${task.start.getTime()}:${task.end.getTime()}:${task.progress ?? ''}`
		: `${status.type}:${status.isValid}:unscheduled`;
}

function getBlockedReason(error: GanttChartError): GanttInteractionBlockedInfo['reason'] {
	if (error.code === 'disabled') return 'disabled';
	if (error.code === 'read-only') return 'read-only';
	if (error.code === 'stale-transaction') return 'stale';
	if (error.code === 'dependency-cycle') return 'cycle';
	if (error.code === 'invalid-range') return 'valid-range';
	if (error.code === 'invalid-constraint' || error.code === 'constraint-violation') {
		return 'constraint';
	}
	if (
		error.code === 'missing-calendar' ||
		error.code === 'invalid-calendar' ||
		error.code === 'schedule-conflict'
	) {
		return 'calendar';
	}
	return 'invalid-target';
}
