import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// Vega-quiet board: columns are soft elevated surfaces, cards one surface step
// above, the drop indicator comes from useDndList. Column color accents render
// as a small dot next to the title (driven by data-color on the column).
const defaultKanban = cva({
	base: 'flex w-full items-start gap-4 overflow-x-auto scrollbar-none'
});

const defaultKanbanColumn = cva({
	base: 'bg-background-light ring-foreground/10 flex max-h-full w-72 shrink-0 flex-col rounded-xl ring-1'
});

const defaultKanbanColumnHeader = cva({
	base: 'flex items-center gap-2 px-3 py-2.5',
	variants: {
		sortable: {
			true: 'cursor-grab',
			false: ''
		}
	},
	defaultVariants: {
		sortable: false
	}
});

const defaultKanbanColumnDot = cva({
	base: 'bg-color size-2 shrink-0 rounded-full'
});

const defaultKanbanColumnTitle = cva({
	base: 'text-foreground flex-1 truncate text-sm font-medium'
});

const defaultKanbanCount = cva({
	base: 'text-foreground-muted bg-background-muted rounded-full px-1.5 py-0.5 text-xs tabular-nums'
});

const defaultKanbanList = cva({
	// data-dnd-over comes from useDndList when an accepted drag hovers the list.
	base: 'flex min-h-12 flex-1 flex-col gap-1.5 overflow-y-auto p-2 pt-0 scrollbar-none rounded-b-xl transition-colors data-[dnd-over=true]:bg-primary/5'
});

const defaultKanbanCard = cva({
	base: 'bg-background-lighter ring-foreground/10 rounded-lg px-3 py-2 text-sm shadow-xs ring-1 cursor-grab select-none'
});

const defaultKanbanCardTitle = cva({
	base: 'text-foreground font-medium leading-normal'
});

const defaultKanbanCardDescription = cva({
	base: 'text-foreground-muted mt-0.5 text-xs leading-normal'
});

const defaultKanbanEmpty = cva({
	base: 'text-foreground-muted px-2 py-4 text-center text-xs'
});

export const kanbanTheme = {
	root: defaultKanban,
	column: defaultKanbanColumn,
	columnHeader: defaultKanbanColumnHeader,
	columnDot: defaultKanbanColumnDot,
	columnTitle: defaultKanbanColumnTitle,
	count: defaultKanbanCount,
	list: defaultKanbanList,
	card: defaultKanbanCard,
	cardTitle: defaultKanbanCardTitle,
	cardDescription: defaultKanbanCardDescription,
	empty: defaultKanbanEmpty
};

export type KanbanTheme = typeof kanbanTheme;
export type KanbanThemeProps = InferComponentTheme<KanbanTheme>;
export const setKanbanTheme = setComponentTheme<KanbanTheme>('kanban');
export const useKanbanTheme = useComponentTheme<KanbanTheme>('kanban', kanbanTheme);
