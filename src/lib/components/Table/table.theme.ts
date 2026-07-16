import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultTableContainer = cva({
	base: 'relative w-full overflow-x-auto'
});

const defaultTable = cva({
	base: 'w-full caption-bottom text-sm'
});

const defaultTableHead = cva({
	base: '[&_tr]:border-b [&_tr]:border-background-muted'
});

const defaultTableBody = cva({
	base: '[&_tr:last-child]:border-0'
});

const defaultTableFoot = cva({
	base: 'bg-muted/50 border-t border-background-muted font-medium [&>tr]:last:border-b-0'
});

// `density` owns paddings and row heights only ('normal' keeps today's exact
// values; small is one step tighter, large one step roomier).
const defaultTableRow = cva({
	base: 'hover:bg-background-muted/40 data-[state=selected]:bg-muted border-b border-background-muted transition-colors',
	variants: {
		density: {
			small: 'py-0',
			normal: 'py-0.5',
			large: 'py-1'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

const defaultTableHeadCell = cva({
	base: 'text-foreground text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
	variants: {
		density: {
			small: 'h-8 px-1.5',
			normal: 'h-10 px-2',
			large: 'h-12 px-3'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

const defaultTableCell = cva({
	base: 'align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
	variants: {
		density: {
			small: 'px-1.5 py-1',
			normal: 'p-2',
			large: 'p-3'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

const defaultTableCaption = cva({
	base: 'text-muted-foreground text-sm',
	variants: {
		density: {
			small: 'mt-3',
			normal: 'mt-4',
			large: 'mt-6'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

const defaultTablePrefix = cva({
	base: ''
});

const defaultTableSuffix = cva({
	base: ''
});

export const tableTheme = {
	root: defaultTableContainer,
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
export const useTableTheme = useComponentTheme<TableTheme>('table', tableTheme);
