<script lang="ts" generics="C extends KanbanCard">
	import { useDndList } from '$lib/utils/useDndList.svelte.js';
	import type { Snippet } from 'svelte';
	import type { useKanbanTheme } from './kanban.theme.js';
	import type { KanbanCard, KanbanCardMove, KanbanColumnData } from './kanban.props.js';

	let {
		column,
		boardId,
		classes,
		sortableColumns,
		accepts,
		getColumn,
		updateCards,
		onCardMove,
		card,
		columnHeader,
		empty
	}: {
		column: KanbanColumnData<C>;
		boardId: string;
		classes: ReturnType<typeof useKanbanTheme>;
		sortableColumns: boolean;
		accepts?: (detail: {
			card: C;
			from: KanbanColumnData<C>;
			to: KanbanColumnData<C>;
		}) => boolean;
		getColumn: (id: string) => KanbanColumnData<C> | undefined;
		updateCards: (columnId: string, cards: C[]) => void;
		onCardMove?: (detail: KanbanCardMove<C>) => void;
		card?: Snippet<[{ card: C; column: KanbanColumnData<C> }]>;
		columnHeader?: Snippet<[{ column: KanbanColumnData<C> }]>;
		empty?: Snippet<[{ column: KanbanColumnData<C> }]>;
	} = $props();

	// The column id is stable for the lifetime of this instance (the parent
	// keys each column by id), so it is safe to capture in the list id.
	// svelte-ignore state_referenced_locally
	const listId = `${boardId}:${column.id}`;
	const columnIdOf = (dndListId: string) => dndListId.slice(boardId.length + 1);

	const dnd = useDndList<C>({
		id: listId,
		items: () => column.cards,
		accepts: (source) => {
			// Only cards from this board's other columns — never other boards,
			// never the board's own column-reorder drag.
			if (!source.listId.startsWith(`${boardId}:`)) return false;
			const from = getColumn(columnIdOf(source.listId));
			if (!from) return false;
			if (column.limit !== undefined && column.cards.length >= column.limit) return false;
			return accepts?.({ card: source.item as C, from, to: column }) ?? true;
		},
		onReorder: (next, detail) => {
			updateCards(column.id, next);
			onCardMove?.({
				card: detail.item,
				from: { columnId: column.id, index: detail.from },
				to: { columnId: column.id, index: detail.to }
			});
		},
		onReceive: ({ item, index, from }) => {
			const received = item as C;
			updateCards(column.id, [
				...column.cards.slice(0, index),
				received,
				...column.cards.slice(index)
			]);
			onCardMove?.({
				card: received,
				from: { columnId: columnIdOf(from.listId), index: from.index },
				to: { columnId: column.id, index }
			});
		},
		onRemove: ({ item }) => {
			updateCards(
				column.id,
				column.cards.filter((c) => c.id !== item.id)
			);
		}
	});
</script>

<div class={classes.column()} data-color={column.color ?? 'primary'} data-kanban-column={column.id}>
	<div
		class={classes.columnHeader({ sortable: sortableColumns })}
		data-dnd-handle={sortableColumns ? '' : undefined}
	>
		{#if columnHeader}
			{@render columnHeader({ column })}
		{:else}
			{#if column.color}
				<span class={classes.columnDot()} aria-hidden="true"></span>
			{/if}
			<span class={classes.columnTitle()}>{column.title}</span>
			<span class={classes.count()}>
				{column.cards.length}{column.limit !== undefined ? ` / ${column.limit}` : ''}
			</span>
		{/if}
	</div>

	<div class={classes.list()} {@attach dnd.list}>
		{#each column.cards as item, index (item.id)}
			<div {@attach dnd.item(item, index)}>
				{#if card}
					{@render card({ card: item, column })}
				{:else}
					<div class={classes.card()}>
						<div class={classes.cardTitle()}>{item.title}</div>
						{#if item.description}
							<div class={classes.cardDescription()}>{item.description}</div>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
		{#if column.cards.length === 0}
			{#if empty}
				{@render empty({ column })}
			{:else}
				<div class={classes.empty()}>No cards</div>
			{/if}
		{/if}
	</div>
</div>
