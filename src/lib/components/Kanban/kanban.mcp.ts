export const kanbanDescription = `
# Kanban Component

A column board with drag-and-drop cards, built on the \`useDndList\` attachment
utility (Pragmatic drag and drop). Cards reorder within a column and move across
columns; columns themselves reorder by dragging their header. The drop indicator,
accept/reject logic, and edge math come from the utility.

## Basic Usage

\`\`\`svelte
<script>
	import { Kanban } from 'svelai/kanban';

	let columns = $state([
		{ id: 'todo', title: 'Todo', cards: [{ id: 'a', title: 'Write specs' }] },
		{ id: 'doing', title: 'Doing', cards: [] },
		{ id: 'done', title: 'Done', cards: [] }
	]);
</script>

<Kanban bind:columns />
\`\`\`

## Props

### Core Props
- **columns**: KanbanColumnData[] (bindable, required) - The board data; reassigned on every card/column move
  - KanbanColumnData: { id, title, cards, color?, limit? }
  - KanbanCard: { id, title, description? } — extend with your own fields and render them via the card snippet
- **accepts**: ({ card, from, to }) => boolean - Cross-column move policy; return false to reject (no indicator, drop ignored). Column \`limit\` is enforced on top.
- **sortableColumns**: boolean (default: true) - Columns reorder by dragging their header

### Event Props
- **onCardMove**: ({ card, from: { columnId, index }, to: { columnId, index } }) => void - Fires once per completed move, same-column reorders included
- **onColumnMove**: ({ column, from, to }) => void - Fires when a column is reordered

### Content Props (Snippets)
- **card**: Snippet<[{ card, column }]> - Custom card renderer (default: title + muted description)
- **columnHeader**: Snippet<[{ column }]> - Custom header (default: color dot + title + count, count shows "n / limit" when a limit is set)
- **empty**: Snippet<[{ column }]> - Rendered inside an empty column

### Styling Props
- **class**: string - Classes for the board container
- **theme**: KanbanThemeProps - Theme overrides

## Behavior notes

- A column with \`limit\` rejects incoming drops when full (its own reorders still work); the header count renders "n / limit".
- Cards from another Kanban instance on the same page are rejected automatically (list ids are namespaced per board).
- The dragged card dims (data-dnd-dragging), the hovered column list tints (data-dnd-over), and the shared [data-dnd-indicator] line marks the drop position.

## Examples

### Move policy and limits
\`\`\`svelte
<Kanban
	bind:columns
	accepts={({ from, to }) => forwardOnly(from.id, to.id)}
	onCardMove={(move) => console.log(move)}
/>
\`\`\`

### Custom card
\`\`\`svelte
<Kanban bind:columns>
	{#snippet card({ card })}
		<div class="rounded-lg bg-background-lighter px-3 py-2 ring-1 ring-foreground/10">
			<span class="text-sm font-medium">{card.title}</span>
			<Chip size="small" color={card.priority === 'high' ? 'danger' : 'info'}>{card.priority}</Chip>
		</div>
	{/snippet}
</Kanban>
\`\`\`

## Theme Customization

Parts: root, column, columnHeader (sortable variant), columnDot, columnTitle,
count, list, card, cardTitle, cardDescription, empty.

\`\`\`svelte
<Kanban
	bind:columns
	theme={{
		column: { base: 'w-80' },
		list: { base: 'gap-2' }
	}}
/>
\`\`\`
`;
