import type { Snippet } from 'svelte';
import type { Colors } from '$lib/types/theme.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { KanbanThemeProps } from './kanban.theme.js';

/** Minimal card shape; extend it with your own fields and render them via the card snippet. */
export type KanbanCard = {
	/** Stable unique id of the card (across the whole board). */
	id: string;
	/** Title rendered by the default card. */
	title: string;
	/** Muted second line rendered by the default card. */
	description?: string;
};

export type KanbanColumnData<C extends KanbanCard = KanbanCard> = {
	/** Stable unique id of the column. */
	id: string;
	/** Column title. */
	title: string;
	/** Cards in the column, in order. */
	cards: C[];
	/** Optional color accent (dot next to the title, driven by tokens). */
	color?: Colors;
	/** Maximum number of cards; a full column rejects incoming drops. */
	limit?: number;
};

export type KanbanCardMove<C extends KanbanCard = KanbanCard> = {
	card: C;
	from: { columnId: string; index: number };
	to: { columnId: string; index: number };
};

export type KanbanColumnMove<C extends KanbanCard = KanbanCard> = {
	column: KanbanColumnData<C>;
	from: number;
	to: number;
};

export type KanbanProps<C extends KanbanCard = KanbanCard> = WithAttachments<{
	/**
	 * The board data. Bindable — the component reassigns it on card and
	 * column moves.
	 */
	columns: KanbanColumnData<C>[];
	/**
	 * Move policy for cards crossing columns. Return false to reject (no
	 * indicator, drop ignored). Column `limit` is enforced on top of this.
	 * Defaults to allowing every move.
	 */
	accepts?: (detail: { card: C; from: KanbanColumnData<C>; to: KanbanColumnData<C> }) => boolean;
	/** Called once per completed card move (same-column reorders included). */
	onCardMove?: (detail: KanbanCardMove<C>) => void;
	/** Called when a column is reordered by dragging its header. */
	onColumnMove?: (detail: KanbanColumnMove<C>) => void;
	/**
	 * Columns can be reordered by dragging their header.
	 * @default true
	 */
	sortableColumns?: boolean;
	/** Custom card renderer; the default renders title + description. */
	card?: Snippet<[{ card: C; column: KanbanColumnData<C> }]>;
	/** Custom column header; the default renders dot + title + count. */
	columnHeader?: Snippet<[{ column: KanbanColumnData<C> }]>;
	/** Rendered inside an empty column's list. */
	empty?: Snippet<[{ column: KanbanColumnData<C> }]>;
	/** Additional classes for the board container. */
	class?: string;
	/** Theme overrides for the board parts. */
	theme?: KanbanThemeProps;
}>;
