<script lang="ts" generics="C extends KanbanCard">
	import { useDndList } from '$lib/utils/useDndList.svelte.js';
	import { useKanbanTheme } from './kanban.theme.js';
	import KanbanColumn from './KanbanColumn.svelte';
	import type { KanbanCard, KanbanColumnData, KanbanProps } from './kanban.props.js';

	let {
		columns = $bindable([]),
		accepts,
		onCardMove,
		onColumnMove,
		sortableColumns = true,
		card,
		columnHeader,
		empty,
		class: className,
		theme,
		...attachments
	}: KanbanProps<C> = $props();

	const uid = $props.id();
	const classes = $derived(useKanbanTheme(theme));

	const updateCards = (columnId: string, cards: C[]) => {
		columns = columns.map((column) =>
			column.id === columnId ? { ...column, cards } : column
		);
	};
	const getColumn = (id: string) => columns.find((column) => column.id === id);

	// Column reordering: a horizontal list over the columns themselves, dragged
	// by the column header (marked data-dnd-handle inside KanbanColumn). Card
	// lists reject this drag automatically (different list id namespace).
	const columnsDnd = useDndList<KanbanColumnData<C>>({
		id: `${uid}-columns`,
		items: () => columns,
		axis: 'horizontal',
		handle: true,
		disabled: () => !sortableColumns,
		onReorder: (next, detail) => {
			columns = next;
			onColumnMove?.({ column: detail.item, from: detail.from, to: detail.to });
		}
	});
</script>

<div class={classes.root({ className })} data-kanban={uid} {@attach columnsDnd.list} {...attachments}>
	{#each columns as column, index (column.id)}
		<div class="shrink-0" {@attach columnsDnd.item(column, index)}>
			<KanbanColumn
				{column}
				boardId={uid}
				{classes}
				{sortableColumns}
				{accepts}
				{getColumn}
				{updateCards}
				{onCardMove}
				{card}
				{columnHeader}
				{empty}
			/>
		</div>
	{/each}
</div>
