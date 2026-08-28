import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Density } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { DataTableThemeProps } from './dataTable.theme.js';

export type DataTableInteractionMode = 'table' | 'grid';
export type DataTableProcessingMode = 'client' | 'manual';
export type DataTableSelectionMode = 'none' | 'single' | 'multiple';
export type DataTableAlignment = 'start' | 'center' | 'end';
export type DataTablePinning = 'left' | 'right' | false;

export type DataTableSorting = {
	id: string;
	desc: boolean;
};

export type DataTableColumnFilter = {
	id: string;
	value: unknown;
};

export type DataTablePaginationState = {
	/** Current page, one-based. */
	page: number;
	pageSize: number;
};

export type DataTableState = {
	sorting: DataTableSorting[];
	globalFilter: string;
	columnFilters: DataTableColumnFilter[];
	pagination: DataTablePaginationState;
	rowSelection: Record<string, boolean>;
	columnVisibility: Record<string, boolean>;
	columnOrder: string[];
	columnPinning: { left: string[]; right: string[] };
	columnSizing: Record<string, number>;
	grouping: string[];
	expanded: Record<string, boolean>;
};

export type DataTableOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type DataTableTextFilter = {
	type: 'text';
	placeholder?: string;
};

export type DataTableNumberFilter = {
	type: 'number';
	min?: number;
	max?: number;
};

export type DataTableSelectFilter = {
	type: 'select' | 'multi-select';
	options: readonly DataTableOption[];
};

export type DataTableDateFilter = {
	type: 'date';
	min?: Date;
	max?: Date;
};

export type DataTableBooleanFilter = {
	type: 'boolean';
	trueLabel?: string;
	falseLabel?: string;
};

export type DataTableFilterPayload<TData> = {
	column: DataTableColumn<TData>;
	value: unknown;
	active: boolean;
	setValue: (value: unknown) => void;
	clear: () => void;
};

export type DataTableCustomFilter<TData> = {
	type: 'custom';
	render: Snippet<[DataTableFilterPayload<TData>]>;
	predicate: (row: TData, value: unknown, columnValue: unknown) => boolean;
};

export type DataTableFilter<TData = unknown> =
	| DataTableTextFilter
	| DataTableNumberFilter
	| DataTableSelectFilter
	| DataTableDateFilter
	| DataTableBooleanFilter
	| DataTableCustomFilter<TData>;

export type DataTableTextEditor = {
	type: 'text';
	placeholder?: string;
};

export type DataTableNumberEditor = {
	type: 'number';
	min?: number;
	max?: number;
	step?: number;
};

export type DataTableSelectEditor = {
	type: 'select';
	options: readonly DataTableOption[];
};

export type DataTableDateEditor = {
	type: 'date';
	min?: Date;
	max?: Date;
};

export type DataTableSwitchEditor = {
	type: 'switch';
};

export type DataTableBuiltInEditor =
	| DataTableTextEditor
	| DataTableNumberEditor
	| DataTableSelectEditor
	| DataTableDateEditor
	| DataTableSwitchEditor;

export type DataTableCellCommit<TData> = {
	row: TData;
	rowId: string;
	columnId: string;
	previousValue: unknown;
	value: unknown;
};

export type DataTableEditorPayload<TData> = DataTableCellCommit<TData> & {
	draft: unknown;
	pending: boolean;
	error: unknown;
	setDraft: (value: unknown) => void;
	commit: () => Promise<void>;
	cancel: () => void;
};

export type DataTableCustomEditor<TData> = {
	type: 'custom';
	render: Snippet<[DataTableEditorPayload<TData>]>;
};

export type DataTableEditor<TData> = DataTableBuiltInEditor | DataTableCustomEditor<TData>;

export type DataTableAggregation<TData> =
	| 'count'
	| 'sum'
	| 'min'
	| 'max'
	| 'mean'
	| 'median'
	| 'uniqueCount'
	| ((values: unknown[], rows: TData[]) => unknown);

export type DataTableRowPayload<TData> = {
	row: TData;
	rowId: string;
	selected: boolean;
	expanded: boolean;
	depth: number;
	toggleSelected: () => void;
	toggleExpanded: () => void;
};

export type DataTableCellPayload<TData, TValue = unknown> = DataTableRowPayload<TData> & {
	columnId: string;
	value: TValue;
	aggregated: boolean;
	grouped: boolean;
	startEditing: () => void;
};

export type DataTableHeaderPayload<TData> = {
	column: DataTableColumn<TData>;
	sorted: false | 'asc' | 'desc';
	sortIndex: number;
	filtered: boolean;
	toggleSorting: (multi?: boolean) => void;
};

export type DataTableCellRenderPayload<TData> = DataTableCellPayload<TData> & {
	column: DataTableColumn<TData>;
	placeholder: boolean;
	renderDefault: Snippet;
};

export type DataTableHeaderRenderPayload<TData> = DataTableHeaderPayload<TData> & {
	renderDefault: Snippet;
};

export type DataTableApi<TData> = {
	readonly state: DataTableState;
	readonly totalItems: number;
	readonly totalPages: number;
	readonly visibleRows: readonly TData[];
	readonly selectedRows: readonly TData[];
	readonly isSaving: boolean;
	setGlobalFilter: (value: string) => void;
	setColumnFilter: (columnId: string, value: unknown) => void;
	clearFilters: () => void;
	clearSelection: () => void;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
};

export type DataTableToolbarPayload<TData> = {
	state: DataTableState;
	selectedRows: TData[];
	visibleRows: TData[];
	clearFilters: () => void;
	clearSelection: () => void;
};

export type DataTableColumn<TData, TValue = unknown> = {
	id: string;
	accessor: Extract<keyof TData, string> | ((row: TData, index: number) => TValue);
	header: Slot<DataTableHeaderPayload<TData>>;
	cell?: Slot<DataTableCellPayload<TData, TValue>>;
	aggregatedCell?: Slot<DataTableCellPayload<TData, TValue>>;
	sortable?: boolean | ((left: TData, right: TData, columnId: string) => number);
	filter?: DataTableFilter<TData>;
	groupable?: boolean;
	aggregation?: DataTableAggregation<TData>;
	editor?: DataTableEditor<TData>;
	hideable?: boolean;
	resizable?: boolean;
	reorderable?: boolean;
	pinnable?: boolean;
	align?: DataTableAlignment;
	size?: number;
	minSize?: number;
	maxSize?: number;
	class?: string;
	headerClass?: string;
};

export type DataTableSearchConfig = {
	placeholder?: string;
	debounce?: number;
};

export type DataTablePaginationConfig = {
	pageSize?: number;
	pageSizes?: readonly number[];
	/** Keeps pagination processing enabled while optionally hiding the built-in footer controls. */
	showControls?: boolean;
};

type DataTableBaseProps<TData> = {
	items: readonly TData[];
	columns: readonly DataTableColumn<TData>[];
	getRowId: (row: TData, index: number, parent?: TData) => string;
	/** Scroll viewport height. Defaults to filling a parent with a definite height. */
	height?: string | number;
	state?: DataTableState;
	/** Narrow bindable facade for composing search, filters, and pagination outside the table. */
	dataTable?: DataTableApi<TData>;
	initialState?: Partial<DataTableState>;
	onStateChange?: (state: DataTableState) => void;
	interactionMode?: DataTableInteractionMode;
	selectionMode?: DataTableSelectionMode;
	pagination?: false | DataTablePaginationConfig;
	search?: boolean | DataTableSearchConfig;
	/** Shows the toolbar menu for toggling column visibility. */
	showColumnVisibilityControl?: boolean;
	density?: Density;
	stickyHeader?: boolean;
	overscan?: number;
	estimatedRowHeight?: number;
	/** Animates stable rows into their new positions after sorting or filtering. */
	animateRows?: boolean;
	disabled?: boolean;
	getSubRows?: (row: TData, index: number) => readonly TData[] | undefined;
	canExpand?: (row: TData) => boolean;
	isRowSelectable?: (row: TData) => boolean;
	onCellCommit?: (commit: DataTableCellCommit<TData>) => void | Promise<void>;
	class?: string;
	ref?: HTMLElement | null;
	theme?: DataTableThemeProps;
	caption?: Slot;
	/** Table-level renderer for public data cells. Call renderDefault to retain built-in behavior. */
	cell?: Snippet<[DataTableCellRenderPayload<TData>]>;
	/** Table-level renderer for public header content. Structural controls remain DataTable-owned. */
	header?: Snippet<[DataTableHeaderRenderPayload<TData>]>;
	toolbarPrefix?: Slot<DataTableToolbarPayload<TData>>;
	toolbarSuffix?: Slot<DataTableToolbarPayload<TData>>;
	bulkActions?: Slot<DataTableToolbarPayload<TData>>;
	rowActions?: Slot<DataTableRowPayload<TData>>;
	expandedContent?: Slot<DataTableRowPayload<TData>>;
	loading?: boolean;
	error?: unknown;
	loadingContent?: Slot<DataTableToolbarPayload<TData>>;
	empty?: Slot<DataTableToolbarPayload<TData>>;
	noResults?: Slot<DataTableToolbarPayload<TData>>;
	errorContent?: Slot<DataTableToolbarPayload<TData> & { error: unknown }>;
};

type DataTableClientProps = {
	processingMode?: 'client';
	rowCount?: never;
};

type DataTableManualProps = {
	processingMode: 'manual';
	rowCount: number;
};

export type DataTableProps<TData> = WithAttachments<
	DataTableBaseProps<TData> & (DataTableClientProps | DataTableManualProps)
>;
