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
	base: 'flex items-center gap-2',
	variants: {
		sortable: {
			true: 'cursor-grab',
			false: ''
		},
		density: {
			small: 'px-2.5 py-2',
			normal: 'px-3 py-2.5',
			large: 'px-4 py-3'
		}
	},
	defaultVariants: {
		sortable: false,
		density: 'normal'
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
	// pt keeps the first card's ring/shadow clear of the scroll container edge.
	base: 'flex min-h-12 flex-1 flex-col overflow-y-auto scrollbar-none rounded-b-xl transition-colors data-[dnd-over=true]:bg-primary/5',
	variants: {
		density: {
			small: 'gap-1 p-1.5 pt-1',
			normal: 'gap-1.5 p-2 pt-1',
			large: 'gap-2 p-2.5 pt-1.5'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

const defaultKanbanCard = cva({
	base: 'bg-background-lighter ring-foreground/10 rounded-lg text-sm shadow-xs ring-1 select-none',
	variants: {
		density: {
			small: 'px-2.5 py-1.5',
			normal: 'px-3 py-2',
			large: 'px-4 py-3'
		},
		handle: {
			// With a grip handle the card body is not the drag activator.
			true: 'flex items-start gap-2',
			false: 'cursor-grab'
		}
	},
	defaultVariants: {
		density: 'normal',
		handle: false
	}
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

// Rendered below the card list (columnFooter snippet / the `footer` param of
// the column snippet).
const defaultKanbanFooter = cva({
	base: '',
	variants: {
		density: {
			small: 'p-1.5 pt-1',
			normal: 'p-2 pt-1',
			large: 'p-2.5 pt-1.5'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

// Per-card wrapper (the dnd row). `dragging` marks the dimmed placeholder.
const defaultKanbanCardWrapper = cva({
	base: '',
	variants: {
		dragging: {
			true: 'opacity-40',
			false: ''
		}
	},
	defaultVariants: {
		dragging: false
	}
});

// Per-column wrapper (the dnd row of the board). `dragging` marks the dimmed
// placeholder while a column is dragged.
const defaultKanbanColumnWrapper = cva({
	base: 'shrink-0',
	variants: {
		dragging: {
			true: 'opacity-40',
			false: ''
		}
	},
	defaultVariants: {
		dragging: false
	}
});

// The grip rendered by the DEFAULT card when cardHandle is on.
const defaultKanbanCardHandle = cva({
	base: 'text-foreground-muted hover:text-foreground mt-0.5 inline-flex shrink-0 cursor-grab items-center justify-center'
});

export const kanbanTheme = {
	root: defaultKanban,
	column: defaultKanbanColumn,
	columnWrapper: defaultKanbanColumnWrapper,
	columnHeader: defaultKanbanColumnHeader,
	columnDot: defaultKanbanColumnDot,
	columnTitle: defaultKanbanColumnTitle,
	count: defaultKanbanCount,
	list: defaultKanbanList,
	card: defaultKanbanCard,
	cardWrapper: defaultKanbanCardWrapper,
	cardHandle: defaultKanbanCardHandle,
	cardTitle: defaultKanbanCardTitle,
	cardDescription: defaultKanbanCardDescription,
	empty: defaultKanbanEmpty,
	footer: defaultKanbanFooter
};

export type KanbanTheme = typeof kanbanTheme;
export type KanbanThemeProps = InferComponentTheme<KanbanTheme>;
export const setKanbanTheme = setComponentTheme<KanbanTheme>('kanban');
export const useKanbanTheme = useComponentTheme<KanbanTheme>('kanban', kanbanTheme);
