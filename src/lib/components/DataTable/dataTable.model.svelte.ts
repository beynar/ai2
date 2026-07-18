import {
	createTable,
	functionalUpdate,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type ColumnDef,
	type ExpandedState,
	type Row,
	type Table,
	type Updater
} from '@tanstack/table-core';
import { tick } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type {
	DataTableCellCommit,
	DataTableColumn,
	DataTableEditorPayload,
	DataTableProps,
	DataTableRowPayload,
	DataTableState
} from './dataTable.props.js';

export const DATA_TABLE_SELECTION_COLUMN = '__selection';
export const DATA_TABLE_ACTIONS_COLUMN = '__actions';
const INTERNAL_COLUMNS = new Set([DATA_TABLE_SELECTION_COLUMN, DATA_TABLE_ACTIONS_COLUMN]);

const DEFAULT_PAGE_SIZE = 25;

export function createDataTableState<TData>(
	columns: readonly DataTableColumn<TData>[],
	initialState: Partial<DataTableState> | undefined,
	pageSize = DEFAULT_PAGE_SIZE
): DataTableState {
	return {
		sorting: initialState?.sorting ?? [],
		globalFilter: initialState?.globalFilter ?? '',
		columnFilters: initialState?.columnFilters ?? [],
		pagination: initialState?.pagination ?? { page: 1, pageSize },
		rowSelection: initialState?.rowSelection ?? {},
		columnVisibility: initialState?.columnVisibility ?? {},
		columnOrder: initialState?.columnOrder ?? columns.map((column) => column.id),
		columnPinning: initialState?.columnPinning ?? { left: [], right: [] },
		columnSizing: initialState?.columnSizing ?? {},
		grouping: initialState?.grouping ?? [],
		expanded: initialState?.expanded ?? {}
	};
}

type EditingState<TData> = {
	row: Row<TData>;
	columnId: string;
	previousValue: unknown;
	draft: unknown;
	pending: boolean;
	error: unknown;
};

type OptimisticCell = {
	token: symbol;
	value: unknown;
};

type DataTableModelOptions<TData> = {
	get props(): DataTableProps<TData>;
	get state(): DataTableState;
	set state(value: DataTableState);
};

const asRecord = (value: ExpandedState): Record<string, boolean> => {
	if (value === true) return {};
	return value;
};

const valuesEqual = (left: readonly string[], right: readonly string[]) =>
	left.length === right.length && left.every((value, index) => value === right[index]);

const cellValuesEqual = (left: unknown, right: unknown) => {
	if (Object.is(left, right)) return true;
	return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
};

export class DataTableModel<TData> {
	readonly table: Table<TData>;
	editing = $state<EditingState<TData> | null>(null);
	focusedCell = $state({ row: 0, column: 0 });
	private optimisticCells = new SvelteMap<string, OptimisticCell>();
	private itemsSource: readonly TData[] | null = null;
	private itemsCache: TData[] = [];
	private columnsSource: readonly DataTableColumn<TData>[] | null = null;
	private columnsSelectionMode: DataTableProps<TData>['selectionMode'] = undefined;
	private columnsHaveActions = false;
	private columnDefsCache: ColumnDef<TData, unknown>[] = [];

	constructor(private readonly options: DataTableModelOptions<TData>) {
		this.table = createTable<TData>({
			renderFallbackValue: null,
			data: [],
			columns: [],
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			getFacetedRowModel: getFacetedRowModel(),
			getFacetedUniqueValues: getFacetedUniqueValues(),
			getFacetedMinMaxValues: getFacetedMinMaxValues(),
			getSortedRowModel: getSortedRowModel(),
			getGroupedRowModel: getGroupedRowModel(),
			getExpandedRowModel: getExpandedRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			getRowId: (_, index) => String(index),
			state: {},
			onStateChange: () => {}
		});
	}

	get props() {
		return this.options.props;
	}

	get state() {
		return this.options.state;
	}

	get publicColumns() {
		return this.props.columns;
	}

	get pageRows() {
		return this.table.getRowModel().rows;
	}

	get filteredRows() {
		return this.table.getFilteredRowModel().flatRows;
	}

	get selectedRows() {
		return this.table
			.getCoreRowModel()
			.flatRows.filter((row) => this.state.rowSelection[row.id])
			.map((row) => row.original);
	}

	get pendingCommitCount() {
		return this.optimisticCells.size;
	}

	getColumnConfig(columnId: string) {
		return this.publicColumns.find((column) => column.id === columnId);
	}

	getCellValue(row: Row<TData>, columnId: string) {
		const key = this.getCellKey(row.id, columnId);
		return this.optimisticCells.has(key)
			? this.optimisticCells.get(key)?.value
			: row.getValue(columnId);
	}

	getRowPayload(row: Row<TData>): DataTableRowPayload<TData> {
		return {
			row: row.original,
			rowId: row.id,
			selected: !!this.state.rowSelection[row.id],
			expanded: !!this.state.expanded[row.id],
			depth: row.depth,
			toggleSelected: () => row.toggleSelected(),
			toggleExpanded: () => row.toggleExpanded()
		};
	}

	getEditorPayload(): DataTableEditorPayload<TData> | null {
		if (!this.editing) return null;
		return {
			row: this.editing.row.original,
			rowId: this.editing.row.id,
			columnId: this.editing.columnId,
			previousValue: this.editing.previousValue,
			value: this.editing.draft,
			draft: this.editing.draft,
			pending: this.editing.pending,
			error: this.editing.error,
			setDraft: (value) => this.setDraft(value),
			commit: async () => {
				await this.commitEditing();
			},
			cancel: () => this.cancelEditing()
		};
	}

	updateOptions() {
		const props = this.props;
		const state = this.state;
		const isManual = props.processingMode === 'manual';
		const columnOrder = [
			...(props.selectionMode !== 'none' ? [DATA_TABLE_SELECTION_COLUMN] : []),
			...state.columnOrder,
			...(props.rowActions ? [DATA_TABLE_ACTIONS_COLUMN] : [])
		];
		const leftPinning = [
			...(props.selectionMode !== 'none' ? [DATA_TABLE_SELECTION_COLUMN] : []),
			...state.columnPinning.left
		];
		const rightPinning = [
			...state.columnPinning.right,
			...(props.rowActions ? [DATA_TABLE_ACTIONS_COLUMN] : [])
		];

		this.table.setOptions((previous) => ({
			...previous,
			data: this.getTableItems(),
			columns: this.getColumnDefs(),
			getRowId: (row, index, parent) => props.getRowId(row, index, parent?.original),
			getSubRows: props.getSubRows
				? (row, index) => [...(props.getSubRows?.(row, index) ?? [])]
				: undefined,
			getRowCanExpand: (row) =>
				props.canExpand?.(row.original) ?? (row.subRows.length > 0 || !!props.expandedContent),
			enableRowSelection: (row) =>
				props.selectionMode !== 'none' && (props.isRowSelectable?.(row.original) ?? true),
			enableMultiRowSelection: props.selectionMode === 'multiple',
			manualFiltering: isManual,
			manualSorting: isManual,
			manualGrouping: isManual,
			manualPagination: isManual || props.pagination === false,
			rowCount: isManual ? props.rowCount : undefined,
			pageCount:
				isManual && props.rowCount !== undefined
					? Math.ceil(props.rowCount / state.pagination.pageSize)
					: undefined,
			autoResetPageIndex: false,
			autoResetAll: false,
			columnResizeMode: 'onChange',
			state: {
				sorting: state.sorting,
				globalFilter: state.globalFilter,
				columnFilters: state.columnFilters,
				pagination: {
					pageIndex: Math.max(0, state.pagination.page - 1),
					pageSize: state.pagination.pageSize
				},
				rowSelection: state.rowSelection,
				columnVisibility: state.columnVisibility,
				columnOrder,
				columnPinning: { left: leftPinning, right: rightPinning },
				columnSizing: state.columnSizing,
				grouping: state.grouping,
				expanded: state.expanded
			},
			onSortingChange: (updater) => this.updateSlice('sorting', updater, { resetPage: true }),
			onGlobalFilterChange: (updater) =>
				this.updateSlice('globalFilter', updater, { resetPage: true }),
			onColumnFiltersChange: (updater) =>
				this.updateSlice('columnFilters', updater, { resetPage: true }),
			onPaginationChange: (updater) => {
				const current = {
					pageIndex: Math.max(0, this.state.pagination.page - 1),
					pageSize: this.state.pagination.pageSize
				};
				const next = functionalUpdate(updater, current);
				this.setState({
					...this.state,
					pagination: { page: next.pageIndex + 1, pageSize: next.pageSize }
				});
			},
			onRowSelectionChange: (updater) => this.updateSlice('rowSelection', updater),
			onColumnVisibilityChange: (updater) => this.updateSlice('columnVisibility', updater),
			onColumnOrderChange: (updater) => {
				const next = functionalUpdate(updater, columnOrder).filter(
					(columnId) => !INTERNAL_COLUMNS.has(columnId)
				);
				this.setState({ ...this.state, columnOrder: next });
			},
			onColumnPinningChange: (updater) => {
				const next = functionalUpdate(updater, { left: leftPinning, right: rightPinning });
				this.setState({
					...this.state,
					columnPinning: {
						left: (next.left ?? []).filter((columnId) => !INTERNAL_COLUMNS.has(columnId)),
						right: (next.right ?? []).filter((columnId) => !INTERNAL_COLUMNS.has(columnId))
					}
				});
			},
			onColumnSizingChange: (updater) => this.updateSlice('columnSizing', updater),
			onGroupingChange: (updater) => this.updateSlice('grouping', updater, { resetPage: true }),
			onExpandedChange: (updater: Updater<ExpandedState>) => {
				const next = functionalUpdate(updater, this.state.expanded);
				this.setState({ ...this.state, expanded: asRecord(next) });
			}
		}));
	}

	reconcileColumns() {
		const available = this.publicColumns.map((column) => column.id);
		const next = [
			...this.state.columnOrder.filter((columnId) => available.includes(columnId)),
			...available.filter((columnId) => !this.state.columnOrder.includes(columnId))
		];
		if (valuesEqual(next, this.state.columnOrder)) return;
		this.setState({ ...this.state, columnOrder: next });
	}

	setState(state: DataTableState) {
		this.options.state = state;
		this.props.onStateChange?.(state);
	}

	setColumnFilter(columnId: string, value: unknown) {
		const column = this.table.getColumn(columnId);
		column?.setFilterValue(value);
	}

	clearFilters() {
		this.setState({
			...this.state,
			globalFilter: '',
			columnFilters: [],
			pagination: { ...this.state.pagination, page: 1 }
		});
	}

	clearSelection() {
		this.setState({ ...this.state, rowSelection: {} });
	}

	setGlobalFilter(value: string) {
		this.table.setGlobalFilter(value);
	}

	setPage(page: number) {
		this.table.setPageIndex(Math.max(0, page - 1));
	}

	setPageSize(pageSize: number) {
		this.table.setPageSize(pageSize);
	}

	reorderColumns(columns: readonly DataTableColumn<TData>[]) {
		const reorderedIds = columns.map((column) => column.id);
		const reorderedSet = new Set(reorderedIds);
		let nextIndex = 0;
		const columnOrder = this.state.columnOrder.map((columnId) => {
			if (!reorderedSet.has(columnId)) return columnId;
			return reorderedIds[nextIndex++] ?? columnId;
		});
		this.setState({ ...this.state, columnOrder });
	}

	setColumnSize(columnId: string, size: number) {
		const column = this.table.getColumn(columnId);
		if (!column) return;
		const nextSize = Math.max(
			column.columnDef.minSize ?? 80,
			Math.min(size, column.columnDef.maxSize ?? 640)
		);
		this.setState({
			...this.state,
			columnSizing: { ...this.state.columnSizing, [columnId]: nextSize }
		});
	}

	startEditing(row: Row<TData>, columnId: string) {
		const column = this.getColumnConfig(columnId);
		if (
			!column?.editor ||
			this.props.disabled ||
			row.getIsGrouped() ||
			this.optimisticCells.has(this.getCellKey(row.id, columnId))
		)
			return;
		const previousValue = this.getCellValue(row, columnId);
		this.editing = {
			row,
			columnId,
			previousValue,
			draft: previousValue,
			pending: false,
			error: null
		};
	}

	setDraft(value: unknown) {
		if (!this.editing || this.editing.pending) return;
		this.editing.draft = value;
		this.editing.error = null;
	}

	async commitEditing(): Promise<boolean> {
		if (!this.editing || this.editing.pending) return false;
		const editing = this.editing;
		if (cellValuesEqual(editing.previousValue, editing.draft)) {
			this.editing = null;
			return true;
		}
		const commit: DataTableCellCommit<TData> = {
			row: editing.row.original,
			rowId: editing.row.id,
			columnId: editing.columnId,
			previousValue: editing.previousValue,
			value: editing.draft
		};
		const key = this.getCellKey(editing.row.id, editing.columnId);
		const token = Symbol(key);
		editing.pending = true;
		editing.error = null;
		this.optimisticCells.set(key, { token, value: editing.draft });
		this.editing = null;
		try {
			await this.props.onCellCommit?.(commit);
			await tick();
			if (this.optimisticCells.get(key)?.token === token) this.optimisticCells.delete(key);
			return true;
		} catch (error) {
			if (this.optimisticCells.get(key)?.token === token) this.optimisticCells.delete(key);
			editing.pending = false;
			editing.error = error;
			if (!this.editing) this.editing = editing;
			return false;
		}
	}

	moveEditing(row: Row<TData>, columnId: string, direction: 1 | -1) {
		const editableCells = this.pageRows.flatMap((pageRow) => {
			if (pageRow.getIsGrouped()) return [];
			return pageRow
				.getVisibleCells()
				.filter((cell) => !!this.getColumnConfig(cell.column.id)?.editor)
				.map((cell) => ({ row: pageRow, columnId: cell.column.id }));
		});
		const currentIndex = editableCells.findIndex(
			(cell) => cell.row.id === row.id && cell.columnId === columnId
		);
		if (currentIndex < 0) return;
		const next = editableCells[currentIndex + direction];
		if (next) this.startEditing(next.row, next.columnId);
	}

	cancelEditing() {
		if (this.editing?.pending) return;
		this.editing = null;
	}

	private getCellKey(rowId: string, columnId: string) {
		return JSON.stringify([rowId, columnId]);
	}

	moveFocusedCell(row: number, column: number) {
		const rowCount = this.pageRows.length;
		const columnCount = this.table.getVisibleLeafColumns().length;
		this.focusedCell = {
			row: Math.max(0, Math.min(row, Math.max(0, rowCount - 1))),
			column: Math.max(0, Math.min(column, Math.max(0, columnCount - 1)))
		};
	}

	private updateSlice<Key extends keyof DataTableState>(
		key: Key,
		updater: Updater<DataTableState[Key]>,
		options: { resetPage?: boolean } = {}
	) {
		const nextValue = functionalUpdate(updater, this.state[key]);
		this.setState({
			...this.state,
			[key]: nextValue,
			pagination: options.resetPage ? { ...this.state.pagination, page: 1 } : this.state.pagination
		});
	}

	private getTableItems() {
		if (this.itemsSource === this.props.items) return this.itemsCache;
		this.itemsSource = this.props.items;
		this.itemsCache = [...this.props.items];
		return this.itemsCache;
	}

	private getColumnDefs() {
		const hasRowActions = !!this.props.rowActions;
		if (
			this.columnsSource === this.publicColumns &&
			this.columnsSelectionMode === this.props.selectionMode &&
			this.columnsHaveActions === hasRowActions
		) {
			return this.columnDefsCache;
		}
		this.columnsSource = this.publicColumns;
		this.columnsSelectionMode = this.props.selectionMode;
		this.columnsHaveActions = hasRowActions;
		this.columnDefsCache = this.createColumnDefs();
		return this.columnDefsCache;
	}

	private createColumnDefs(): ColumnDef<TData, unknown>[] {
		const definitions: ColumnDef<TData, unknown>[] = [];
		if (this.props.selectionMode !== 'none') {
			definitions.push({
				id: DATA_TABLE_SELECTION_COLUMN,
				size: 36,
				minSize: 36,
				maxSize: 36,
				enableHiding: false,
				enablePinning: false,
				enableResizing: false,
				enableSorting: false,
				enableGrouping: false
			});
		}

		for (const column of this.publicColumns) {
			const sorting = typeof column.sortable === 'function' ? column.sortable : null;
			const accessor = column.accessor;
			const accessorFn = typeof accessor === 'function' ? accessor : (row: TData) => row[accessor];
			definitions.push({
				id: column.id,
				accessorFn,
				size: column.size ?? 180,
				minSize: column.minSize ?? 80,
				maxSize: column.maxSize ?? 640,
				enableHiding: column.hideable !== false,
				enablePinning: column.pinnable !== false,
				enableResizing: column.resizable !== false,
				enableSorting: !!column.sortable,
				enableColumnFilter: !!column.filter,
				enableGlobalFilter: true,
				enableGrouping: !!column.groupable,
				sortingFn: sorting
					? (left, right) => sorting(left.original, right.original, column.id)
					: 'auto',
				filterFn: this.createFilterFn(column),
				aggregationFn: this.createAggregationFn(column)
			});
		}

		if (this.props.rowActions) {
			definitions.push({
				id: DATA_TABLE_ACTIONS_COLUMN,
				size: 36,
				minSize: 36,
				maxSize: 36,
				enableHiding: false,
				enablePinning: false,
				enableResizing: false,
				enableSorting: false,
				enableGrouping: false
			});
		}
		return definitions;
	}

	private createFilterFn(column: DataTableColumn<TData>): ColumnDef<TData>['filterFn'] {
		const filter = column.filter;
		if (!filter) return 'auto';
		return (row, columnId, filterValue) => {
			const value = row.getValue(columnId);
			switch (filter.type) {
				case 'text':
					return String(value ?? '')
						.toLocaleLowerCase()
						.includes(String(filterValue ?? '').toLocaleLowerCase());
				case 'number': {
					const numericValue = Number(value);
					const range = filterValue as { min?: number; max?: number } | undefined;
					if (!Number.isFinite(numericValue)) return false;
					if (range?.min !== undefined && numericValue < range.min) return false;
					if (range?.max !== undefined && numericValue > range.max) return false;
					return true;
				}
				case 'select':
					return !filterValue || String(value) === String(filterValue);
				case 'multi-select':
					return !Array.isArray(filterValue) || filterValue.length === 0
						? true
						: filterValue.map(String).includes(String(value));
				case 'date': {
					if (!filterValue) return true;
					const candidate = value instanceof Date ? value : new Date(String(value));
					const range = filterValue as { start?: Date; end?: Date };
					if (Number.isNaN(candidate.getTime())) return false;
					if (range.start && candidate < range.start) return false;
					if (range.end) {
						const end = new Date(range.end);
						end.setHours(23, 59, 59, 999);
						if (candidate > end) return false;
					}
					return true;
				}
				case 'boolean':
					return filterValue === undefined || filterValue === null || value === filterValue;
			}
		};
	}

	private createAggregationFn(column: DataTableColumn<TData>): ColumnDef<TData>['aggregationFn'] {
		if (!column.aggregation) return undefined;
		if (typeof column.aggregation === 'string') return column.aggregation;
		const aggregate = column.aggregation;
		return (columnId, leafRows) =>
			aggregate(
				leafRows.map((row) => row.getValue(columnId)),
				leafRows.map((row) => row.original)
			);
	}
}
