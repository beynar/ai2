import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultTableContainer = cva({
	base: 'relative w-full overflow-x-auto'
});

const defaultTable = cva({
	base: 'w-full caption-bottom text-sm'
});

const defaultTableHead = cva({
	base: '[&_tr]:border-b [&_tr]:border-surface-muted'
});

const defaultTableBody = cva({
	base: '[&_tr:last-child]:border-0'
});

const defaultTableFoot = cva({
	base: 'bg-muted/50 border-t border-surface-muted font-medium [&>tr]:last:border-b-0'
});

const defaultTableRow = cva({
	base: 'hover:bg-surface-muted/40 data-[state=selected]:bg-muted border-b border-surface-muted transition-colors py-0.5'
});

const defaultTableHeadCell = cva({
	base: 'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
});

const defaultTableCell = cva({
	base: 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
});

const defaultTableCaption = cva({
	base: 'text-muted-foreground mt-4 text-sm'
});

const defaultTablePrefix = cva({
	base: ''
});

const defaultTableSuffix = cva({
	base: ''
});

export const tableTheme = {
	container: defaultTableContainer,
	table: defaultTable,
	thead: defaultTableHead,
	tbody: defaultTableBody,
	tfoot: defaultTableFoot,
	row: defaultTableRow,
	head: defaultTableHeadCell,
	cell: defaultTableCell,
	caption: defaultTableCaption,
	prefix: defaultTablePrefix,
	suffix: defaultTableSuffix
};

export type TableTheme = typeof tableTheme;
export type TableThemeProps = InferComponentTheme<TableTheme>;
export const setTableTheme = setComponentTheme<TableTheme>('table');
export const useTableTheme = useComponentTheme('table', tableTheme);
