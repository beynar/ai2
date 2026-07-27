import type { Colors } from '$lib/types/theme.js';

export type GanttColor = Colors | (string & {});
export type GanttDateOnly = `${number}-${number}-${number}`;
export type GanttWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type GanttRange = Readonly<{ start: Date; end: Date }>;

type GanttCustomFields<
	TFields extends object,
	TOwnedKey extends PropertyKey
> = TFields extends unknown
	? string extends keyof TFields
		? never
		: Extract<keyof TFields, TOwnedKey> extends never
			? TFields
			: never
	: never;

export type GanttLagUnit = 'minute' | 'hour' | 'day' | 'week';
export type GanttLag = Readonly<{ value: number; unit: GanttLagUnit }>;
export type GanttDuration = Readonly<{ value: number; unit: GanttLagUnit }>;

export type GanttConstraint =
	| Readonly<{ type: 'as-soon-as-possible' }>
	| Readonly<{
			type:
				| 'start-no-earlier-than'
				| 'start-no-later-than'
				| 'finish-no-earlier-than'
				| 'finish-no-later-than'
				| 'must-start-on'
				| 'must-finish-on';
			date: Date;
	  }>;

export type GanttTaskSegment = Readonly<{
	start: Date;
	end: Date;
}>;

export type GanttTaskBaseline = Readonly<{
	start: Date;
	end: Date;
}>;

type GanttTaskBase = {
	id: string;
	title: string;
	parentId?: string;
	progress?: number;
	expectedProgress?: number;
	color?: GanttColor;
	readOnly?: boolean;
	draggable?: boolean;
	resizable?: boolean;
	progressEditable?: boolean;
	dependencyEditable?: boolean;
	calendarId?: string;
	resourceIds?: string[];
	priority?: number;
	notes?: string;
	baseline?: GanttTaskBaseline;
	deadline?: Date;
	constraint?: GanttConstraint;
};

type GanttScheduledLeafTask = {
	type?: 'task';
	start: Date;
	end: Date;
	segments?: GanttTaskSegment[];
};

type GanttUnscheduledLeafTask = {
	type?: 'task';
	start?: never;
	end?: never;
	segments?: never;
};

type GanttSummaryTask = {
	type: 'summary';
	start?: never;
	end?: never;
	segments?: never;
};

type GanttMilestoneTask = {
	type: 'milestone';
	start: Date;
	end: Date;
	segments?: never;
};

type GanttOwnedTaskKey = keyof GanttTaskBase | 'type' | 'start' | 'end' | 'segments';

export type GanttTask<TTaskFields extends object = Record<never, never>> = GanttCustomFields<
	TTaskFields,
	GanttOwnedTaskKey
> &
	GanttTaskBase &
	(GanttScheduledLeafTask | GanttUnscheduledLeafTask | GanttSummaryTask | GanttMilestoneTask);

type GanttDependencyBase = {
	id: string;
	fromTaskId: string;
	toTaskId: string;
	type: 'finish-start' | 'start-start' | 'finish-finish' | 'start-finish';
	lag?: GanttLag;
	readOnly?: boolean;
};

export type GanttDependency<TDependencyFields extends object = Record<never, never>> =
	GanttCustomFields<TDependencyFields, keyof GanttDependencyBase> & GanttDependencyBase;

type GanttResourceBase = {
	id: string;
	title: string;
	parentId?: string;
	color?: GanttColor;
	capacity?: number;
	calendarId?: string;
	readOnly?: boolean;
};

export type GanttResource<TResourceFields extends object = Record<never, never>> =
	GanttCustomFields<TResourceFields, keyof GanttResourceBase> & GanttResourceBase;

type GanttAssignmentBase = {
	id: string;
	taskId: string;
	resourceId: string;
	units: number;
};

export type GanttAssignment<TAssignmentFields extends object = Record<never, never>> =
	GanttCustomFields<TAssignmentFields, keyof GanttAssignmentBase> & GanttAssignmentBase;

export type GanttWorkingInterval = Readonly<{
	/** Canonical same-day wall time, `HH:mm`. */
	start: string;
	/** Canonical same-day wall time, `HH:mm`; `24:00` is allowed only here. */
	end: string;
}>;

export type GanttCalendarException =
	| Readonly<{ date: GanttDateOnly; type: 'non-working' }>
	| Readonly<{
			date: GanttDateOnly;
			type: 'working';
			intervals: readonly [GanttWorkingInterval, ...GanttWorkingInterval[]];
	  }>;

export type GanttCalendar = Readonly<{
	id: string;
	title: string;
	timeZone: string;
	workingWeekdays: readonly GanttWeekday[];
	workingIntervals: readonly [GanttWorkingInterval, ...GanttWorkingInterval[]];
	exceptions?: readonly GanttCalendarException[];
}>;

export type GanttHoliday = Readonly<{
	date: GanttDateOnly;
	title?: string;
	color?: GanttColor;
}>;

export type GanttConstraintViolation = Readonly<{
	taskId: string;
	constraint: GanttConstraint;
	code:
		| 'completed-task-blocked'
		| 'dependency-conflict'
		| 'start-too-early'
		| 'start-too-late'
		| 'finish-too-early'
		| 'finish-too-late'
		| 'must-start-mismatch'
		| 'must-finish-mismatch';
	message: string;
	requiredDate?: Date;
	actualDate?: Date;
}>;

export type GanttResolvedTaskNode<TTaskFields extends object = Record<never, never>> = Readonly<{
	task: GanttTask<TTaskFields>;
	taskId: string;
	parentId: string | null;
	childIds: readonly string[];
	depth: number;
	wbs: string;
	type: 'task' | 'summary' | 'milestone';
	isExpanded: boolean;
	isVisible: boolean;
	visibleIndex: number | null;
	resolvedStart: Date | null;
	resolvedEnd: Date | null;
	progress: number | null;
	elapsedDurationMs: number | null;
	workingDurationMinutes: number | null;
	totalSlackMinutes: number | null;
	freeSlackMinutes: number | null;
	isCritical: boolean;
	violations: readonly GanttConstraintViolation[];
}>;

export type GanttResolvedDependency<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>
> = Readonly<{
	dependency: GanttDependency<TDependencyFields>;
	isCritical: boolean;
	fromTask: GanttResolvedTaskNode<TTaskFields>;
	toTask: GanttResolvedTaskNode<TTaskFields>;
}>;

export type GanttSelection =
	| Readonly<{ kind: null; taskId: null; dependencyId: null; cell: null }>
	| Readonly<{ kind: 'task'; taskId: string; dependencyId: null; cell: null }>
	| Readonly<{ kind: 'dependency'; taskId: null; dependencyId: string; cell: null }>
	| Readonly<{
			kind: 'cell';
			taskId: string;
			dependencyId: null;
			cell: Readonly<{ taskId: string; columnId: string }>;
	  }>;

export type GanttBuiltInZoomLevel = 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
export type GanttZoomLevel = GanttBuiltInZoomLevel | (string & {});
export type GanttScaleUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export type GanttScaleCell = Readonly<{
	start: Date;
	end: Date;
	index: number;
	zoom: GanttZoomLevel;
	timeZone: string;
	locale: string;
}>;

export type GanttScaleDefinition = Readonly<{
	id: GanttZoomLevel;
	unit: GanttScaleUnit;
	step: number;
	minColumnWidth: number;
	formatUpper: (cell: GanttScaleCell) => string;
	formatLower: (cell: GanttScaleCell) => string;
}>;

export type GanttBuiltInColumnId =
	'wbs' | 'title' | 'start' | 'end' | 'duration' | 'progress' | 'resources';
export type GanttColumnId = GanttBuiltInColumnId | (string & {});
export type GanttColumnAlignment = 'start' | 'center' | 'end';
export type GanttSortDirection = 'ascending' | 'descending';

export type GanttColumnEditContext<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	dependencies: readonly GanttDependency<TDependencyFields>[];
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
}>;

export type GanttColumnDefinition<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = Readonly<{
	id: GanttColumnId;
	title?: string;
	visible?: boolean;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	align?: GanttColumnAlignment;
	sortable?: boolean;
	sortDirection?: GanttSortDirection | null;
	editable?: boolean;
	value?: (
		context: GanttColumnEditContext<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) => unknown;
	compare?: (
		left: GanttResolvedTaskNode<TTaskFields>,
		right: GanttResolvedTaskNode<TTaskFields>
	) => number;
	applyEdit?: (
		context: GanttColumnEditContext<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>,
		value: unknown
	) => GanttTask<TTaskFields>;
	filter?: (
		context: GanttColumnEditContext<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>
	) => boolean;
}>;

export type GanttInteractions = Readonly<{
	moveTask: boolean;
	resizeStart: boolean;
	resizeEnd: boolean;
	resizeProgress: boolean;
	createDependency: boolean;
	reorderRows: boolean;
	indent: boolean;
	outdent: boolean;
	createRange: boolean;
	keyboard: boolean;
	touch: boolean;
	clipboard: boolean;
	history: boolean;
}>;

export type GanttTouchActivation = Readonly<{
	distancePx: number;
	touchDelayMs: number;
	touchTolerancePx: number;
}>;

export type GanttMutationSource =
	'pointer' | 'keyboard' | 'inline-edit' | 'clipboard' | 'history' | 'api';

export type GanttTaskMutationKind =
	| 'add'
	| 'update'
	| 'remove'
	| 'move'
	| 'resize-start'
	| 'resize-end'
	| 'progress'
	| 'reorder'
	| 'indent'
	| 'outdent'
	| 'paste';

type GanttTaskProposalBase<TTaskFields extends object> = Readonly<{
	kind: GanttTaskMutationKind;
	source: GanttMutationSource;
	propagatedTasks: readonly GanttTask<TTaskFields>[];
}>;

export type GanttTaskProposal<TTaskFields extends object = Record<never, never>> =
	| (GanttTaskProposalBase<TTaskFields> &
			Readonly<{
				kind: 'add' | 'paste';
				previousTask: null;
				task: GanttTask<TTaskFields>;
			}>)
	| (GanttTaskProposalBase<TTaskFields> &
			Readonly<{
				kind: 'remove';
				previousTask: GanttTask<TTaskFields>;
				task: null;
			}>)
	| (GanttTaskProposalBase<TTaskFields> &
			Readonly<{
				kind: Exclude<GanttTaskMutationKind, 'add' | 'remove' | 'paste'>;
				previousTask: GanttTask<TTaskFields>;
				task: GanttTask<TTaskFields>;
			}>);

export type GanttDependencyMutationKind = 'add' | 'update' | 'remove';
export type GanttDependencyProposal<TDependencyFields extends object = Record<never, never>> =
	Readonly<{
		kind: GanttDependencyMutationKind;
		source: GanttMutationSource;
		previousDependency: GanttDependency<TDependencyFields> | null;
		dependency: GanttDependency<TDependencyFields> | null;
	}>;

export type GanttAssignmentMutationKind = 'add' | 'update' | 'remove';
export type GanttAssignmentProposal<TAssignmentFields extends object = Record<never, never>> =
	Readonly<{
		kind: GanttAssignmentMutationKind;
		source: GanttMutationSource;
		previousAssignment: GanttAssignment<TAssignmentFields> | null;
		assignment: GanttAssignment<TAssignmentFields> | null;
	}>;

export type GanttRangeProposal = Readonly<{
	source: 'pointer' | 'keyboard';
	start: Date;
	end: Date;
	parentId?: string;
}>;

export type GanttTaskUpdateResult<TTaskFields extends object = Record<never, never>> =
	false | true | void | GanttTask<TTaskFields>;
export type GanttDependencyUpdateResult<TDependencyFields extends object = Record<never, never>> =
	false | true | void | GanttDependency<TDependencyFields>;
export type GanttAssignmentUpdateResult<TAssignmentFields extends object = Record<never, never>> =
	false | true | void | GanttAssignment<TAssignmentFields>;

export type GanttTasksChange<TTaskFields extends object = Record<never, never>> = Readonly<{
	kind: GanttTaskMutationKind | 'schedule';
	source: GanttMutationSource;
	previousTasks: readonly GanttTask<TTaskFields>[];
	tasks: readonly GanttTask<TTaskFields>[];
	affectedTaskIds: readonly string[];
	violations: readonly GanttConstraintViolation[];
	revert: () => void;
}>;

export type GanttDependenciesChange<TDependencyFields extends object = Record<never, never>> =
	Readonly<{
		kind: GanttDependencyMutationKind;
		source: GanttMutationSource;
		previousDependencies: readonly GanttDependency<TDependencyFields>[];
		dependencies: readonly GanttDependency<TDependencyFields>[];
		affectedDependencyIds: readonly string[];
		revert: () => void;
	}>;

export type GanttAssignmentsChange<TAssignmentFields extends object = Record<never, never>> =
	Readonly<{
		kind: GanttAssignmentMutationKind;
		source: GanttMutationSource;
		previousAssignments: readonly GanttAssignment<TAssignmentFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		affectedAssignmentIds: readonly string[];
		revert: () => void;
	}>;

export type GanttInteractionBlockedInfo = Readonly<{
	reason:
		| 'disabled'
		| 'loading'
		| 'read-only'
		| 'invalid-target'
		| 'valid-range'
		| 'calendar'
		| 'constraint'
		| 'cycle'
		| 'custom-policy'
		| 'stale';
	source: GanttMutationSource | 'navigation';
	taskId?: string;
	dependencyId?: string;
	message: string;
}>;

export type GanttVisibleRangeInfo = Readonly<{
	range: GanttRange;
	projectRange: GanttRange | null;
	zoom: GanttZoomLevel;
	timeZone: string;
}>;

export type GanttScheduleAnalysis<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>
> = Readonly<{
	projectRange: GanttRange | null;
	tasks: readonly GanttResolvedTaskNode<TTaskFields>[];
	dependencies: readonly GanttResolvedDependency<TTaskFields, TDependencyFields>[];
	criticalTaskIds: readonly string[];
	criticalDependencyIds: readonly string[];
	violations: readonly GanttConstraintViolation[];
}>;

export type GanttTaskGeometry = Readonly<{
	left: number;
	top: number;
	width: number;
	height: number;
	visibleLeft: number;
	visibleWidth: number;
	continuesBefore: boolean;
	continuesAfter: boolean;
}>;

export type GanttDependencyGeometry = Readonly<{
	path: string;
	visible: boolean;
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
}>;

export type GanttWorkloadBucket = Readonly<{
	resourceId: string;
	start: Date;
	end: Date;
	assignedUnits: number;
	capacity: number;
	isOverAllocated: boolean;
	taskIds: readonly string[];
}>;

export type GanttPasteIdRequest = Readonly<{
	kind: 'task' | 'dependency' | 'assignment';
	sourceId: string;
	copyIndex: number;
}>;

export type GanttChartApi<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = {
	fitProject(): boolean;
	zoomIn(anchorDate?: Date): boolean;
	zoomOut(anchorDate?: Date): boolean;
	setZoom(zoom: GanttZoomLevel, anchorDate?: Date): void;
	scrollToDate(date: Date, options?: { align?: 'start' | 'center' | 'end' }): boolean;
	scrollToTask(taskId: string, options?: { align?: 'start' | 'center' | 'end' }): boolean;
	getVisibleRange(): GanttRange;
	getTask(taskId: string): GanttTask<TTaskFields> | null;
	getResolvedTask(taskId: string): GanttResolvedTaskNode<TTaskFields> | null;
	getVisibleTasks(): readonly GanttResolvedTaskNode<TTaskFields>[];
	getDependency(dependencyId: string): GanttDependency<TDependencyFields> | null;
	getAssignment(assignmentId: string): GanttAssignment<TAssignmentFields> | null;
	getResources(): readonly GanttResource<TResourceFields>[];
	getScheduleAnalysis(): GanttScheduleAnalysis<TTaskFields, TDependencyFields>;
	getWorkload(range?: GanttRange): readonly GanttWorkloadBucket[];
	expandTask(taskId: string): void;
	collapseTask(taskId: string): void;
	toggleTask(taskId: string): void;
	expandAll(): void;
	collapseAll(): void;
	select(selection: GanttSelection): void;
	clearSelection(): void;
	addTask(task: GanttTask<TTaskFields>): void;
	updateTask(task: GanttTask<TTaskFields>): void;
	removeTask(taskId: string): void;
	addDependency(dependency: GanttDependency<TDependencyFields>): void;
	updateDependency(dependency: GanttDependency<TDependencyFields>): void;
	removeDependency(dependencyId: string): void;
	addAssignment(assignment: GanttAssignment<TAssignmentFields>): void;
	updateAssignment(assignment: GanttAssignment<TAssignmentFields>): void;
	removeAssignment(assignmentId: string): void;
	copySelection(): boolean;
	paste(): boolean;
	undo(): boolean;
	redo(): boolean;
	canUndo(): boolean;
	canRedo(): boolean;
	cancelInteraction(): void;
};
