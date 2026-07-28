<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { useDndList } from '$lib/utils/useDndList.svelte.js';
	import GanttColumnHeader from './GanttColumnHeader.svelte';
	import GanttTreeRow from './GanttTreeRow.svelte';
	import type {
		GanttColumnHeaderPayload,
		GanttGridHeaderPayload,
		GanttTaskRowPayload,
		GanttTreeCellPayload
	} from './ganttChart.props.js';
	import type { GanttRowModel, GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttInteractions, GanttSelection } from './ganttChart.types.js';
	import type { Snippet } from 'svelte';

	type GridSnippets = {
		gridHeader?: Snippet<
			[GanttGridHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		columnHeader?: Snippet<
			[GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		treeCell?: Snippet<
			[GanttTreeCellPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		taskRow?: Snippet<[GanttTaskRowPayload<TTaskFields>]>;
	};

	let {
		chart,
		rowModel,
		renderedRows,
		totalHeight,
		selection,
		messages,
		locale,
		timeZone,
		density,
		color,
		direction,
		disabled,
		loading,
		interactions,
		classes,
		snippets,
		onToggleSort,
		scrollToRow
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		rowModel: GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		renderedRows: readonly GanttVirtualRow[];
		totalHeight: number;
		selection: GanttSelection;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		loading: boolean;
		interactions: GanttInteractions;
		classes: GanttChartClasses;
		snippets: GridSnippets;
		onToggleSort: (columnId: string, additive: boolean) => void;
		scrollToRow: (rowIndex: number) => void;
	} = $props();

	let rootElement = $state<HTMLElement | null>(null);
	let horizontalViewport = $state<HTMLDivElement | null>(null);
	let horizontalScrollLeft = $state(0);
	let activeTaskId = $state('');
	let activeColumnId = $state('');
	const gridId = $props.id();
	const gridWidth = $derived(
		rowModel.visibleColumns.reduce((total, column) => total + (column.width ?? 160), 0)
	);
	const canReorder = $derived(
		interactions.reorderRows && !disabled && !loading && !rowModel.isFiltered && !rowModel.isSorted
	);
	const headerPayload = $derived<
		GanttGridHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	>({ columns: rowModel.visibleColumns, defaultContent: defaultGridHeader });

	const dnd = useDndList({
		id: gridId,
		items: () => [...rowModel.rows],
		itemId: (node) => node.taskId,
		handle: true,
		disabled: () => !canReorder,
		canDrag: (node) => !node.task.readOnly,
		autoScrollAxis: 'vertical',
		onReorder: (_rows, detail) => {
			const target = rowModel.rows[detail.to];
			if (!target) return;
			const accepted = chart.reorderTask(
				detail.item.taskId,
				target.taskId,
				detail.to > detail.from ? 'after' : 'before'
			);
			if (!accepted) blockHierarchyOperation(detail.item.taskId);
		}
	});

	$effect(() => {
		const rows = rowModel.rows;
		const columns = rowModel.visibleColumns;
		if (!rows.some((row) => row.taskId === activeTaskId)) {
			activeTaskId =
				selection.kind === 'cell' && rows.some((row) => row.taskId === selection.taskId)
					? selection.taskId
					: (rows[0]?.taskId ?? '');
		}
		if (!columns.some((column) => column.id === activeColumnId)) {
			activeColumnId =
				selection.kind === 'cell' && columns.some((column) => column.id === selection.cell.columnId)
					? selection.cell.columnId
					: (columns[0]?.id ?? '');
		}
	});

	function isTaskSelected(taskId: string): boolean {
		return (
			(selection.kind === 'task' && selection.taskId === taskId) ||
			(selection.kind === 'cell' && selection.taskId === taskId)
		);
	}

	function focusCell(taskId: string, columnId: string): void {
		activeTaskId = taskId;
		activeColumnId = columnId;
		chart.select({
			kind: 'cell',
			taskId,
			dependencyId: null,
			cell: { taskId, columnId }
		});
	}

	function navigateCell(event: KeyboardEvent, rowIndex: number, columnIndex: number): void {
		if (!interactions.keyboard) return;
		const hierarchyDirection = direction === 'rtl' ? -1 : 1;
		if (event.altKey && event.shiftKey && event.key === 'ArrowRight') {
			event.preventDefault();
			const logicalIndent = hierarchyDirection === 1;
			const node = rowModel.rows[rowIndex];
			if (!node) return;
			const accepted = logicalIndent
				? chart.indentTask(node.taskId, rowModel.rows[rowIndex - 1]?.taskId ?? null)
				: chart.outdentTask(node.taskId);
			if (!accepted) blockHierarchyOperation(node.taskId);
			return;
		}
		if (event.altKey && event.shiftKey && event.key === 'ArrowLeft') {
			event.preventDefault();
			const logicalIndent = hierarchyDirection === -1;
			const node = rowModel.rows[rowIndex];
			if (!node) return;
			const accepted = logicalIndent
				? chart.indentTask(node.taskId, rowModel.rows[rowIndex - 1]?.taskId ?? null)
				: chart.outdentTask(node.taskId);
			if (!accepted) blockHierarchyOperation(node.taskId);
			return;
		}
		let nextRow = rowIndex;
		let nextColumn = columnIndex;
		switch (event.key) {
			case 'ArrowUp':
				nextRow -= 1;
				break;
			case 'ArrowDown':
				nextRow += 1;
				break;
			case 'ArrowLeft':
				nextColumn += direction === 'rtl' ? 1 : -1;
				break;
			case 'ArrowRight':
				nextColumn += direction === 'rtl' ? -1 : 1;
				break;
			case 'Home':
				nextColumn = 0;
				if (event.ctrlKey || event.metaKey) nextRow = 0;
				break;
			case 'End':
				nextColumn = rowModel.visibleColumns.length - 1;
				if (event.ctrlKey || event.metaKey) nextRow = rowModel.rows.length - 1;
				break;
			default:
				return;
		}
		event.preventDefault();
		nextRow = Math.max(0, Math.min(rowModel.rows.length - 1, nextRow));
		nextColumn = Math.max(0, Math.min(rowModel.visibleColumns.length - 1, nextColumn));
		const nextTask = rowModel.rows[nextRow];
		const nextColumnDefinition = rowModel.visibleColumns[nextColumn];
		if (!nextTask || !nextColumnDefinition) return;
		focusCell(nextTask.taskId, nextColumnDefinition.id);
		scrollToRow(nextRow);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				rootElement
					?.querySelector<HTMLElement>(
						`[data-task-id="${CSS.escape(nextTask.taskId)}"] [data-column-id="${CSS.escape(nextColumnDefinition.id)}"]`
					)
					?.focus();
			});
		});
	}

	function blockHierarchyOperation(taskId: string): void {
		chart.blockInteraction({
			reason: 'invalid-target',
			source: 'keyboard',
			taskId,
			message: 'Hierarchy operations require a compatible sibling summary target.'
		});
	}

	function handleHorizontalScroll(): void {
		if (!horizontalViewport) return;
		horizontalScrollLeft = horizontalViewport.scrollLeft;
	}
</script>

<div
	bind:this={rootElement}
	data-gantt-chart-part="grid-pane"
	class={classes.gridPane({ density, color, disabled })}
	role="treegrid"
	aria-label={messages.ganttChartGrid}
	aria-rowcount={rowModel.rows.length}
	aria-colcount={rowModel.visibleColumns.length}
>
	<div
		class="sticky top-0 z-30 h-[var(--gantt-header-height)] overflow-x-clip bg-surface-raised/95 backdrop-blur"
		dir={direction}
	>
		<div
			style:width={`${gridWidth}px`}
			style:min-width="100%"
			style:transform={`translate3d(${-horizontalScrollLeft}px, 0, 0)`}
		>
			<div
				data-gantt-chart-part="grid-header"
				class={classes.gridHeader({ density, color, disabled })}
				role="row"
			>
				{#if snippets.gridHeader}
					<div class="pointer-events-none absolute inset-0" aria-hidden="true">
						<Slot render={snippets.gridHeader} payload={headerPayload} />
					</div>
				{/if}
				{#each rowModel.visibleColumns as column, columnIndex (column.id)}
					<GanttColumnHeader
						{column}
						{columnIndex}
						{messages}
						{density}
						{color}
						{disabled}
						{classes}
						columnHeader={snippets.columnHeader}
						{onToggleSort}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div
		bind:this={horizontalViewport}
		dir="ltr"
		data-gantt-chart-part="grid-viewport"
		class="min-w-0 overflow-x-auto overflow-y-clip"
		style:height={`${totalHeight}px`}
		onscroll={handleHorizontalScroll}
	>
		<div style:width={`${gridWidth}px`} style:min-width="100%" dir={direction}>
			<div
				data-gantt-chart-part="rows"
				class={classes.rows({ density, color, disabled })}
				style:height={`${totalHeight}px`}
				{@attach dnd.list}
			>
				{#each renderedRows as virtualRow (virtualRow.key)}
					{@const node = rowModel.rows[virtualRow.index]}
					{#if node}
						<GanttTreeRow
							{chart}
							{node}
							rowIndex={virtualRow.index}
							start={virtualRow.start}
							columns={rowModel.visibleColumns}
							dependencies={chart.schedule.model.dependencies}
							resources={chart.schedule.model.resources}
							assignments={chart.schedule.model.assignments}
							{messages}
							{locale}
							{timeZone}
							{density}
							{color}
							{disabled}
							{loading}
							isSelected={isTaskSelected(node.taskId)}
							activeColumnId={activeTaskId === node.taskId ? activeColumnId : ''}
							showDragHandle={canReorder}
							{classes}
							treeCell={snippets.treeCell}
							taskRow={snippets.taskRow}
							rowAttachment={dnd.item(node, virtualRow.index)}
							onCellFocus={(columnId) => focusCell(node.taskId, columnId)}
							onNavigate={(event, columnIndex) =>
								navigateCell(event, virtualRow.index, columnIndex)}
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

{#snippet defaultGridHeader()}{/snippet}
