import type { DataTableColumn } from './dataTable.props.js';

type DataTableColumnConfig<TData, TValue> = Omit<DataTableColumn<TData, TValue>, 'accessor'>;

export function createDataTableColumnHelper<TData>() {
	function accessor<Key extends Extract<keyof TData, string>>(
		key: Key,
		config: DataTableColumnConfig<TData, TData[Key]>
	): DataTableColumn<TData>;
	function accessor<TValue>(
		getValue: (row: TData, index: number) => TValue,
		config: DataTableColumnConfig<TData, TValue>
	): DataTableColumn<TData>;
	function accessor<TValue>(
		getValue: Extract<keyof TData, string> | ((row: TData, index: number) => TValue),
		config: DataTableColumnConfig<TData, TValue>
	): DataTableColumn<TData> {
		// Config callbacks are checked against TValue above; erase it only at the heterogeneous array boundary.
		return { ...config, accessor: getValue } as DataTableColumn<TData>;
	}

	return { accessor };
}
