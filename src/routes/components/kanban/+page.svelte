<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Kanban, type KanbanCardMove, type KanbanColumnData } from '$lib/components/Kanban/index.js';
	import Chip from '$lib/components/Chip/Chip.svelte';

	type Card = { id: string; title: string; description?: string; priority?: 'high' | 'low' };

	const makeBoard = (): KanbanColumnData<Card>[] => [
		{
			id: 'backlog',
			title: 'Backlog',
			color: 'info',
			cards: [
				{ id: 'k1', title: 'Audit color contrast', description: 'WCAG AA across themes' },
				{ id: 'k2', title: 'Write onboarding guide' },
				{ id: 'k3', title: 'Refactor form validation', description: 'Move to schema-first' }
			]
		},
		{
			id: 'progress',
			title: 'In progress',
			color: 'warning',
			cards: [{ id: 'k4', title: 'Rebuild sortable list', description: 'On the new dnd utility' }]
		},
		{
			id: 'review',
			title: 'Review',
			color: 'primary',
			limit: 2,
			cards: [{ id: 'k5', title: 'Density initiative' }]
		},
		{
			id: 'done',
			title: 'Done',
			color: 'success',
			cards: [{ id: 'k6', title: 'Vega card theme' }]
		}
	];

	let columns = $state(makeBoard());

	// Forward-only board
	let flowColumns = $state<KanbanColumnData<Card>[]>([
		{ id: 'draft', title: 'Draft', cards: [{ id: 'f1', title: 'Q3 announcement post' }] },
		{ id: 'published', title: 'Published', cards: [{ id: 'f2', title: 'Changelog #42' }] }
	]);
	const flowOrder = ['draft', 'published'];

	// Custom card board
	let priorityColumns = $state<KanbanColumnData<Card>[]>([
		{
			id: 'inbox',
			title: 'Inbox',
			cards: [
				{ id: 'p1', title: 'Fix login redirect', priority: 'high' },
				{ id: 'p2', title: 'Polish empty states', priority: 'low' }
			]
		},
		{
			id: 'sprint',
			title: 'Sprint',
			cards: [{ id: 'p3', title: 'Ship dark mode', priority: 'high' }]
		}
	]);

	let lastMove = $state<KanbanCardMove<Card> | null>(null);
</script>

<DocPage
	title="Kanban"
	subtitle="A column board with drag-and-drop cards and sortable columns, built on the useDndList attachment utility."
	component="Kanban"
	features={[
		'Cards reorder and move across columns',
		'Columns reorder by dragging their header',
		'Per-column color, limit, and accept policy',
		'Card, header, and empty snippets'
	]}
>
	<ComponentCard
		description="Drag cards within and across columns; drag a column header to reorder columns. Review is limited to 2 cards."
		code={`<Kanban bind:columns onCardMove={(move) => console.log(move)} />`}
	>
		<div class="w-full">
			<Kanban bind:columns onCardMove={(move) => (lastMove = move)} />
			<p class="text-foreground-muted mt-3 text-xs">
				{#if lastMove}
					Last move: "{lastMove.card.title}" — {lastMove.from.columnId} #{lastMove.from.index} → {lastMove
						.to.columnId} #{lastMove.to.index}
				{:else}
					Drag a card to see onCardMove.
				{/if}
			</p>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Move policy"
			description="accepts decides which cross-column moves are allowed — here cards only move forward (Draft → Published), never back."
			code={`<Kanban
	bind:columns
	accepts={({ from, to }) => order.indexOf(to.id) > order.indexOf(from.id)}
/>`}
		>
			<div class="w-full">
				<Kanban
					bind:columns={flowColumns}
					sortableColumns={false}
					accepts={({ from, to }) => flowOrder.indexOf(to.id) > flowOrder.indexOf(from.id)}
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Custom card"
			description="The card snippet replaces the default renderer — bring your own fields."
			code={`<Kanban bind:columns>
	{#snippet card({ card })}
		...
	{/snippet}
</Kanban>`}
		>
			<div class="w-full">
				<Kanban bind:columns={priorityColumns} sortableColumns={false}>
					{#snippet card({ card })}
						<div
							class="bg-background-lighter ring-foreground/10 flex items-center justify-between gap-2 rounded-lg px-3 py-2 ring-1"
						>
							<span class="text-foreground truncate text-sm font-medium">{card.title}</span>
							<Chip size="small" color={card.priority === 'high' ? 'danger' : 'info'}>
								{card.priority}
							</Chip>
						</div>
					{/snippet}
				</Kanban>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
