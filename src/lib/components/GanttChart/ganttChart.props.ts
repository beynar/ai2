import type { Messages } from '$lib/i18n/en.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Colors, Density } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { GanttChartThemeProps } from './ganttChart.theme.js';
import type {
	GanttAssignment,
	GanttAssignmentProposal,
	GanttAssignmentUpdateResult,
	GanttAssignmentsChange,
	GanttCalendar,
	GanttChartApi,
	GanttColumnDefinition,
	GanttConstraintViolation,
	GanttDependency,
	GanttDependencyCreationRequest,
	GanttDependencyGeometry,
	GanttDependencyProposal,
	GanttDependencyUpdateResult,
	GanttDependenciesChange,
	GanttDuration,
	GanttHoliday,
	GanttInteractionBlockedInfo,
	GanttInteractions,
	GanttPasteIdRequest,
	GanttRange,
	GanttRangeProposal,
	GanttResolvedDependency,
	GanttResolvedTaskNode,
	GanttResource,
	GanttScaleCell,
	GanttScaleDefinition,
	GanttSelection,
	GanttTask,
	GanttTaskGeometry,
	GanttTaskProposal,
	GanttTasksChange,
	GanttTaskUpdateResult,
	GanttTouchActivation,
	GanttVisibleRangeInfo,
	GanttWorkloadBucket,
	GanttZoomLevel
} from './ganttChart.types.js';

export type { GanttChartThemeProps } from './ganttChart.theme.js';

export type GanttDisplayOptions = Readonly<{
	criticalPath: boolean;
	baselines: boolean;
	deadlines: boolean;
	constraints: boolean;
	nonWorkingTime: boolean;
	workload: boolean;
}>;

export type GanttResourceView = Readonly<{
	filterResourceIds?: readonly string[];
	groupByResource?: boolean;
	workloadHeight?: number;
}>;

export type GanttSnapshot<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	tasks: readonly GanttTask<TTaskFields>[];
	dependencies: readonly GanttDependency<TDependencyFields>[];
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	resolvedTasks: readonly GanttResolvedTaskNode<TTaskFields>[];
	expandedTaskIds: readonly string[];
	selection: GanttSelection;
	zoom: GanttZoomLevel;
	visibleRange: GanttRange;
	loading: boolean;
	disabled: boolean;
	api: GanttChartApi<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
}>;

export type GanttHeaderPayload<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<
	GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> & {
		zoomOut: Snippet;
		zoomIn: Snippet;
		fitProject: Snippet;
		today: Snippet;
		zoomControl: Snippet;
		actions: Snippet;
	}
>;

export type GanttGridHeaderPayload<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	columns: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[];
	defaultContent: Snippet;
}>;

export type GanttColumnHeaderPayload<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	column: GanttColumnDefinition<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	defaultLabel: string;
	defaultContent: Snippet;
}>;

export type GanttTreeCellPayload<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	column: GanttColumnDefinition<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
	value: unknown;
	isSelected: boolean;
	isFocused: boolean;
	isEditing: boolean;
	defaultContent: Snippet;
}>;

export type GanttTaskRowPayload<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	isSelected: boolean;
	isFocused: boolean;
	defaultContent: Snippet;
}>;

export type GanttTimeHeaderPayload = Readonly<{
	cell: GanttScaleCell;
	level: 'upper' | 'lower';
	defaultLabel: string;
	defaultContent: Snippet;
}>;

export type GanttTaskPayload<
	TTaskFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	geometry: GanttTaskGeometry;
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	isSelected: boolean;
	isFocused: boolean;
	isDragging: boolean;
	isCritical: boolean;
	defaultContent: Snippet;
}>;

export type GanttTaskLabelPayload<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	geometry: GanttTaskGeometry;
	defaultLabel: string;
	defaultContent: Snippet;
}>;

export type GanttTaskTooltipPayload<
	TTaskFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	defaultAccessibleLabel: string;
	defaultContent: Snippet;
}>;

export type GanttDependencyTooltipPayload<
	TTaskFields extends object,
	TDependencyFields extends object
> = Readonly<{
	dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>;
	geometry: GanttDependencyGeometry;
	defaultAccessibleLabel: string;
	defaultContent: Snippet;
}>;

export type GanttProgressPayload<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	progress: number;
	expectedProgress: number | null;
	defaultContent: Snippet;
}>;

export type GanttBaselinePayload<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	range: GanttRange;
	geometry: GanttTaskGeometry;
	defaultContent: Snippet;
}>;

export type GanttDeadlinePayload<TTaskFields extends object> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	deadline: Date;
	left: number;
	defaultContent: Snippet;
}>;

export type GanttNonWorkingTimePayload = Readonly<{
	range: GanttRange;
	left: number;
	width: number;
	isWeekend: boolean;
	holiday: GanttHoliday | null;
	defaultContent: Snippet;
}>;

export type GanttResourceAssignmentsPayload<
	TTaskFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = Readonly<{
	node: GanttResolvedTaskNode<TTaskFields>;
	resources: readonly GanttResource<TResourceFields>[];
	assignments: readonly GanttAssignment<TAssignmentFields>[];
	isOverAllocated: boolean;
	defaultContent: Snippet;
}>;

export type GanttWorkloadCellPayload<TResourceFields extends object> = Readonly<{
	resource: GanttResource<TResourceFields>;
	bucket: GanttWorkloadBucket;
	defaultContent: Snippet;
}>;

export type GanttDragPreviewPayload<TTaskFields extends object> = Readonly<{
	proposal: GanttTaskProposal<TTaskFields> | GanttRangeProposal;
	geometry: GanttTaskGeometry | null;
	isValid: boolean;
	invalidReason: string | null;
	defaultContent: Snippet;
}>;

export type GanttEmptyPayload = Readonly<{
	visibleRange: GanttRange;
	zoom: GanttZoomLevel;
	defaultContent: Snippet;
}>;

export type GanttLoadingPayload = Readonly<{
	visibleRange: GanttRange;
	zoom: GanttZoomLevel;
	defaultContent: Snippet;
}>;

export type GanttSnippetProps<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = {
	header?: Snippet<
		[GanttHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
	>;
	actions?: Snippet<
		[GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
	>;
	gridHeader?: Snippet<
		[GanttGridHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
	>;
	columnHeader?: Snippet<
		[GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
	>;
	treeCell?: Snippet<
		[GanttTreeCellPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
	>;
	taskRow?: Snippet<[GanttTaskRowPayload<TTaskFields>]>;
	timeHeaderUpper?: Snippet<[GanttTimeHeaderPayload]>;
	timeHeaderLower?: Snippet<[GanttTimeHeaderPayload]>;
	task?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
	summaryTask?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
	milestone?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
	taskLabel?: Snippet<[GanttTaskLabelPayload<TTaskFields>]>;
	taskTooltip?: Snippet<[GanttTaskTooltipPayload<TTaskFields, TResourceFields, TAssignmentFields>]>;
	dependencyTooltip?: Snippet<[GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>]>;
	progress?: Snippet<[GanttProgressPayload<TTaskFields>]>;
	baseline?: Snippet<[GanttBaselinePayload<TTaskFields>]>;
	deadline?: Snippet<[GanttDeadlinePayload<TTaskFields>]>;
	nonWorkingTime?: Snippet<[GanttNonWorkingTimePayload]>;
	resourceAssignments?: Snippet<
		[GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>]
	>;
	workloadCell?: Snippet<[GanttWorkloadCellPayload<TResourceFields>]>;
	dragPreview?: Snippet<[GanttDragPreviewPayload<TTaskFields>]>;
	empty?: Snippet<[GanttEmptyPayload]>;
	loadingContent?: Snippet<[GanttLoadingPayload]>;
};

export type GanttCallbackProps<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = {
	onTasksChange?: (tasks: GanttTask<TTaskFields>[], change: GanttTasksChange<TTaskFields>) => void;
	onDependenciesChange?: (
		dependencies: GanttDependency<TDependencyFields>[],
		change: GanttDependenciesChange<TDependencyFields>
	) => void;
	onAssignmentsChange?: (
		assignments: GanttAssignment<TAssignmentFields>[],
		change: GanttAssignmentsChange<TAssignmentFields>
	) => void;
	onSelectionChange?: (selection: GanttSelection) => void;
	onExpansionChange?: (expandedTaskIds: string[]) => void;
	onZoomChange?: (zoom: GanttZoomLevel) => void;
	onVisibleRangeChange?: (info: GanttVisibleRangeInfo) => void;
	onTaskClick?: (task: GanttResolvedTaskNode<TTaskFields>, event: MouseEvent) => void;
	onTaskDoubleClick?: (task: GanttResolvedTaskNode<TTaskFields>, event: MouseEvent) => void;
	onDependencyClick?: (
		dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
		event: MouseEvent
	) => void;
	onEmptyRangeSelect?: (proposal: GanttRangeProposal) => void;
	onInteractionBlocked?: (info: GanttInteractionBlockedInfo) => void;
	onScheduleViolations?: (
		violations: readonly GanttConstraintViolation[],
		source: 'validation' | 'task-change' | 'dependency-change' | 'calendar-change'
	) => void;
};

type GanttOwnProps<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
> = GanttSnippetProps<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields> &
	GanttCallbackProps<TTaskFields, TDependencyFields, TAssignmentFields> & {
		/** Bindable immutable task definitions. Defaults to `[]`. */
		tasks?: GanttTask<TTaskFields>[];
		/** Bindable immutable dependency definitions. Defaults to `[]`. */
		dependencies?: GanttDependency<TDependencyFields>[];
		/** Immutable resource definitions. Defaults to `[]`. */
		resources?: GanttResource<TResourceFields>[];
		/** Bindable immutable assignment definitions. Defaults to `[]`. */
		assignments?: GanttAssignment<TAssignmentFields>[];
		/** Immutable explicit-zone working calendars. Defaults to the built-in all-time project calendar. */
		calendars?: GanttCalendar[];
		/** Bindable ordered unique expanded summary IDs. Defaults to summary definitions with `expanded` omitted, initially expanded. */
		expandedTaskIds?: string[];
		/** Bindable task, dependency, tree-cell, or empty selection. */
		selection?: GanttSelection;
		/** Bindable active built-in or custom zoom level. Defaults to `week`. */
		zoom?: GanttZoomLevel;
		/** Required IANA display time zone or `UTC`. */
		timeZone: string;
		/** BCP-47 formatting locale. Defaults to the active Svelai locale. */
		locale?: string;
		/** Per-instance Svelai message overrides. */
		i18n?: Partial<Messages>;
		/** Explicit reading direction; otherwise inherits ambient direction. */
		dir?: 'ltr' | 'rtl';
		/** Chrome and row density, independent of zoom. Defaults to `normal`. */
		density?: Density;
		/** Default focus and task accent. Defaults to `primary`. */
		color?: Colors;
		/** Root classes; contained scrolling requires an explicit height. */
		class?: string;
		/** Bindable root element reference. */
		ref?: HTMLElement | null;
		/** Per-instance stable-part theme overrides. */
		theme?: GanttChartThemeProps;
		/** Blocks content mutation while preserving safe navigation. */
		loading?: boolean;
		/** Disables navigation, selection, and mutation. */
		disabled?: boolean;
		/** Calendar used when a task has no override. */
		projectCalendarId?: string;
		/** Half-open navigation and mutation boundary. */
		validRange?: GanttRange;
		/** Ordered enabled built-in/custom zoom IDs. */
		zoomLevels?: GanttZoomLevel[];
		/** Custom scale definitions supplementing built-ins. */
		scales?: GanttScaleDefinition[];
		/** Initial timeline anchor applied once after mount. */
		initialScrollDate?: Date;
		/** Shows the current-instant line. Defaults to true. */
		showTodayIndicator?: boolean;
		/** Highlights configured weekend weekdays. Defaults to true. */
		showWeekends?: boolean;
		/** Project holidays rendered independently of calendar exceptions. */
		holidays?: GanttHoliday[];
		/** Move, resize, and range granularity. Defaults to one day. */
		snapDuration?: GanttDuration;
		/** Shared logical row height in pixels. */
		rowHeight?: number;
		/** Virtual rows/cells rendered beyond the visible window. */
		overscan?: number;
		/** Internal or page scrolling. Defaults to `contained`. */
		scrollMode?: 'contained' | 'page';
		/** Svelai or browser scrollbars. Defaults to `custom`. */
		scrollbars?: 'custom' | 'native';
		/** Makes default headers sticky in page-scroll mode. */
		stickyHeader?: boolean;
		/** Renders the default action header. Defaults to true. */
		showHeader?: boolean;
		/** Renders the tree grid pane. Defaults to true. */
		showGrid?: boolean;
		/** Bindable initial/current grid width in pixels. */
		gridWidth?: number;
		/** Minimum splitter-constrained grid width. */
		minGridWidth?: number;
		/** Maximum splitter-constrained grid width. */
		maxGridWidth?: number;
		/** Ordered built-in/custom tree columns. */
		columns?: GanttColumnDefinition<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>[];
		/** Fine-grained interaction policy. */
		interactions?: Partial<GanttInteractions>;
		/** Materializes pointer-created dependency IDs and required consumer fields. */
		createDependency?: (
			request: GanttDependencyCreationRequest
		) => GanttDependency<TDependencyFields>;
		/** Pointer/touch activation thresholds. */
		touchActivation?: Partial<GanttTouchActivation>;
		/** Forward-schedules successors after accepted changes. Defaults to false. */
		autoSchedule?: boolean;
		/** Moves dependent successors with a task while auto-scheduling is disabled. */
		moveDependencies?: boolean;
		/** Display toggles for schedule diagnostics and project elements. */
		display?: Partial<GanttDisplayOptions>;
		/** Resource filtering, grouping, and workload geometry. */
		resourceView?: GanttResourceView;
		/** Synchronous live task-proposal policy. */
		canUpdateTask?: (proposal: GanttTaskProposal<TTaskFields>) => boolean;
		/** Synchronous task accept/reject/adjust hook. */
		onTaskUpdate?: (proposal: GanttTaskProposal<TTaskFields>) => GanttTaskUpdateResult<TTaskFields>;
		/** Synchronous live dependency-proposal policy. */
		canUpdateDependency?: (proposal: GanttDependencyProposal<TDependencyFields>) => boolean;
		/** Synchronous dependency accept/reject/adjust hook. */
		onDependencyUpdate?: (
			proposal: GanttDependencyProposal<TDependencyFields>
		) => GanttDependencyUpdateResult<TDependencyFields>;
		/** Synchronous live assignment-proposal policy. */
		canUpdateAssignment?: (proposal: GanttAssignmentProposal<TAssignmentFields>) => boolean;
		/** Synchronous assignment accept/reject/adjust hook. */
		onAssignmentUpdate?: (
			proposal: GanttAssignmentProposal<TAssignmentFields>
		) => GanttAssignmentUpdateResult<TAssignmentFields>;
		/** Synchronous empty-range proposal policy. */
		canCreateRange?: (proposal: GanttRangeProposal) => boolean;
		/** Maximum immutable history entries. Defaults to 50. */
		historyLimit?: number;
		/** Generates collision-free IDs for copied tasks and their internal records. */
		getPasteId?: (request: GanttPasteIdRequest) => string;
	};

export type GanttChartProps<
	TTaskFields extends object = Record<never, never>,
	TDependencyFields extends object = Record<never, never>,
	TResourceFields extends object = Record<never, never>,
	TAssignmentFields extends object = Record<never, never>
> = WithAttachments<
	Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
		GanttOwnProps<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
>;
