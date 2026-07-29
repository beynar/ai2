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
	import {
		resolveGanttRowDrop,
		type GanttRowDropResolution,
		type GanttRowDropTarget
	} from './ganttChart.rowDrop.js';
	import type { GanttRowModel, GanttVirtualRow } from './ganttChart.rows.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import { GanttTouchRowReorder } from './ganttChart.touchRowReorder.js';
	import type {
		GanttInteractions,
		GanttSelection,
		GanttTouchActivation
	} from './ganttChart.types.js';
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

	type RowDropPreview = Readonly<{
		parentId: string | null;
		intent: GanttRowDropResolution['intent'];
		top: number;
		inlineStart: number;
	}>;

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
		touchActivation,
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
		touchActivation: GanttTouchActivation;
		classes: GanttChartClasses;
		snippets: GridSnippets;
		onToggleSort: (columnId: string, additive: boolean) => void;
		scrollToRow: (rowIndex: number) => void;
	} = $props();

	let horizontalViewport = $state<HTMLDivElement | null>(null);
	let horizontalScrollLeft = $state(0);
	let activeTaskId = $state('');
	let activeColumnId = $state('');
	let touchDropTarget = $state<GanttRowDropTarget | null>(null);
	const gridId = $props.id();
	const nodesByTaskId = $derived(new Map(rowModel.rows.map((node) => [node.taskId, node])));
	const rowIndexByTaskId = $derived(
		new Map(rowModel.rows.map((node, index) => [node.taskId, index]))
	);
	const virtualRowByIndex = $derived(new Map(renderedRows.map((row) => [row.index, row])));
	const gridWidth = $derived(
		rowModel.visibleColumns.reduce((total, column) => total + (column.width ?? 160), 0)
	);
	const canReorder = $derived(
		interactions.reorderRows &&
			!disabled &&
			!loading &&
			!rowModel.isFiltered &&
			!rowModel.isSorted &&
			!rowModel.isGrouped
	);
	const canChangeHierarchy = $derived(
		!disabled && !loading && !rowModel.isFiltered && !rowModel.isSorted && !rowModel.isGrouped
	);
	const headerPayload = $derived<
		GanttGridHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	>({ columns: rowModel.visibleColumns, defaultContent: defaultGridHeader });

	const dnd = useDndList({
		id: gridId,
		items: () => [...rowModel.rows],
		itemId: (node) => node.taskId,
		handle: true,
		indicator: 'custom',
		disabled: () => !canReorder,
		canDrag: (node) => !node.task.readOnly,
		autoScrollAxis: 'vertical',
		onReorder: (_rows, detail) => {
			const target = detail.targetItemId
				? rowModel.rows.find((row) => row.taskId === detail.targetItemId)
				: rowModel.rows[detail.to];
			if (!target) return;
			let position: 'before' | 'after' = detail.to > detail.from ? 'after' : 'before';
			if (detail.targetEdge === 'top') position = 'before';
			if (detail.targetEdge === 'bottom') position = 'after';
			const accepted = chart.reorderTask(detail.item.taskId, target.taskId, position);
			if (!accepted) blockHierarchyOperation(detail.item.taskId);
		}
	});
	const touchRowReorder = new GanttTouchRowReorder({
		getRows: () => rowModel.rows,
		disabled: () => !canReorder || !interactions.touch,
		activation: () => touchActivation,
		scrollToRow: (rowIndex) => scrollToRow(rowIndex),
		onTargetChange: (target) => (touchDropTarget = target),
		onReorder: (taskId, targetTaskId, position) =>
			chart.reorderTask(taskId, targetTaskId, position, 'pointer'),
		onBlocked: (taskId, reason) => {
			chart.blockInteraction({
				reason,
				source: 'pointer',
				taskId,
				message:
					reason === 'stale'
						? 'The controlled task rows changed during touch reordering.'
						: 'Touch reordering requires a compatible sibling target.'
			});
		}
	});
	const nativeDropTarget = $derived.by((): GanttRowDropTarget | null => {
		const over = dnd.over;
		if (!over || !dnd.dragging) return null;
		const targetTaskId = over.targetItemId ?? rowModel.rows[over.index]?.taskId;
		if (!targetTaskId || targetTaskId === over.source.itemId) return null;
		let position: 'before' | 'after' = over.index > over.source.index ? 'after' : 'before';
		if (over.targetEdge === 'top') position = 'before';
		if (over.targetEdge === 'bottom') position = 'after';
		return { taskId: over.source.itemId, targetTaskId, position };
	});
	const rowDropPreview = $derived(resolveRowDropPreview(touchDropTarget ?? nativeDropTarget));

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
		chart.a11y.setCellTarget(taskId, columnId);
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
		const node = rowModel.rows[rowIndex];
		const column = rowModel.visibleColumns[columnIndex];
		if (!node || !column) return;
		const isHierarchyForward =
			column.id === 'title' &&
			!event.altKey &&
			!event.shiftKey &&
			event.key === (direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
		const isHierarchyBackward =
			column.id === 'title' &&
			!event.altKey &&
			!event.shiftKey &&
			event.key === (direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft');
		if (isHierarchyForward && node.type === 'summary') {
			event.preventDefault();
			if (!node.isExpanded) {
				chart.expandTask(node.taskId);
				return;
			}
			const childIndex = rowModel.rows.findIndex(
				(candidate, index) => index > rowIndex && candidate.parentId === node.taskId
			);
			const child = rowModel.rows[childIndex];
			if (child) {
				focusCell(child.taskId, column.id);
				scrollAndFocusCell(childIndex, columnIndex);
			}
			return;
		}
		if (isHierarchyBackward) {
			if (node.type === 'summary' && node.isExpanded) {
				event.preventDefault();
				chart.collapseTask(node.taskId);
				return;
			}
			if (node.parentId) {
				event.preventDefault();
				const parentIndex = rowModel.rows.findIndex(
					(candidate) => candidate.taskId === node.parentId
				);
				if (parentIndex >= 0) {
					focusCell(node.parentId, column.id);
					scrollAndFocusCell(parentIndex, columnIndex);
				}
				return;
			}
		}
		if (event.altKey && event.shiftKey && event.key === 'ArrowRight') {
			event.preventDefault();
			const logicalIndent = hierarchyDirection === 1;
			const indentTargetIndex = findIndentTargetRowIndex(rowIndex);
			const accepted = logicalIndent
				? chart.indentTask(node.taskId, rowModel.rows[indentTargetIndex]?.taskId ?? null)
				: chart.outdentTask(node.taskId);
			if (!accepted) blockHierarchyOperation(node.taskId);
			return;
		}
		if (event.altKey && event.shiftKey && event.key === 'ArrowLeft') {
			event.preventDefault();
			const logicalIndent = hierarchyDirection === -1;
			const indentTargetIndex = findIndentTargetRowIndex(rowIndex);
			const accepted = logicalIndent
				? chart.indentTask(node.taskId, rowModel.rows[indentTargetIndex]?.taskId ?? null)
				: chart.outdentTask(node.taskId);
			if (!accepted) blockHierarchyOperation(node.taskId);
			return;
		}
		if (event.altKey && event.shiftKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
			event.preventDefault();
			const siblingIndex = findSiblingRowIndex(
				rowIndex,
				event.key === 'ArrowUp' ? -1 : 1,
				node.parentId
			);
			const target = rowModel.rows[siblingIndex];
			const accepted = Boolean(
				target &&
				chart.reorderTask(
					node.taskId,
					target.taskId,
					event.key === 'ArrowUp' ? 'before' : 'after',
					'keyboard'
				)
			);
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
		const inlineEndOverflow =
			(event.key === 'ArrowRight' &&
				direction === 'ltr' &&
				nextColumn >= rowModel.visibleColumns.length) ||
			(event.key === 'ArrowLeft' &&
				direction === 'rtl' &&
				nextColumn >= rowModel.visibleColumns.length);
		if (inlineEndOverflow && chart.a11y.focusTask(node.taskId)) return;
		nextRow = Math.max(0, Math.min(rowModel.rows.length - 1, nextRow));
		nextColumn = Math.max(0, Math.min(rowModel.visibleColumns.length - 1, nextColumn));
		const nextTask = rowModel.rows[nextRow];
		const nextColumnDefinition = rowModel.visibleColumns[nextColumn];
		if (!nextTask || !nextColumnDefinition) return;
		focusCell(nextTask.taskId, nextColumnDefinition.id);
		scrollAndFocusCell(nextRow, nextColumn);
	}

	function scrollAndFocusCell(rowIndex: number, columnIndex: number): void {
		const task = rowModel.rows[rowIndex];
		const column = rowModel.visibleColumns[columnIndex];
		if (!task || !column) return;
		chart.a11y.focusCell(task.taskId, column.id);
	}

	function findSiblingRowIndex(rowIndex: number, delta: -1 | 1, parentId: string | null): number {
		for (let index = rowIndex + delta; index >= 0 && index < rowModel.rows.length; index += delta) {
			if (rowModel.rows[index]?.parentId === parentId) return index;
		}
		return -1;
	}

	function canIndentRow(rowIndex: number): boolean {
		if (!canChangeHierarchy || !interactions.indent) return false;
		const node = rowModel.rows[rowIndex];
		const previousNode = rowModel.rows[findIndentTargetRowIndex(rowIndex)];
		return Boolean(
			node &&
			previousNode &&
			!node.task.readOnly &&
			!previousNode.task.readOnly &&
			previousNode.type === 'summary' &&
			(node.parentId ?? null) === (previousNode.parentId ?? null)
		);
	}

	function canOutdentRow(rowIndex: number): boolean {
		if (!canChangeHierarchy || !interactions.outdent) return false;
		const node = rowModel.rows[rowIndex];
		return Boolean(node && node.parentId && !node.task.readOnly);
	}

	function indentRow(rowIndex: number): void {
		const node = rowModel.rows[rowIndex];
		const previousNode = rowModel.rows[findIndentTargetRowIndex(rowIndex)];
		if (
			!node ||
			!previousNode ||
			!canIndentRow(rowIndex) ||
			!chart.indentTask(node.taskId, previousNode.taskId, 'pointer')
		) {
			if (node) blockHierarchyOperation(node.taskId, 'pointer');
		}
	}

	function findIndentTargetRowIndex(rowIndex: number): number {
		const node = rowModel.rows[rowIndex];
		return node ? findSiblingRowIndex(rowIndex, -1, node.parentId) : -1;
	}

	function outdentRow(rowIndex: number): void {
		const node = rowModel.rows[rowIndex];
		if (!node || !canOutdentRow(rowIndex) || !chart.outdentTask(node.taskId, 'pointer')) {
			if (node) blockHierarchyOperation(node.taskId, 'pointer');
		}
	}

	function blockHierarchyOperation(
		taskId: string,
		source: 'keyboard' | 'pointer' = 'keyboard'
	): void {
		chart.blockInteraction({
			reason: 'invalid-target',
			source,
			taskId,
			message: 'Hierarchy operations require a compatible sibling summary target.'
		});
	}

	function resolveRowDropPreview(target: GanttRowDropTarget | null): RowDropPreview | null {
		const resolution = resolveGanttRowDrop(target, nodesByTaskId);
		const targetRowIndex = target ? rowIndexByTaskId.get(target.targetTaskId) : undefined;
		const virtualRow =
			targetRowIndex === undefined ? undefined : virtualRowByIndex.get(targetRowIndex);
		if (!resolution || !target || !virtualRow) return null;
		const titleOffset = getTitleColumnOffset();
		return {
			parentId: resolution.parentId,
			intent: resolution.intent,
			top: target.position === 'before' ? virtualRow.start : virtualRow.end,
			inlineStart: titleOffset + 8 + resolution.depth * 16
		};
	}

	function getTitleColumnOffset(): number {
		let offset = 0;
		for (const column of rowModel.visibleColumns) {
			if (column.id === 'title') return offset;
			offset += column.width ?? 160;
		}
		return 0;
	}

	function handleHorizontalScroll(): void {
		if (!horizontalViewport) return;
		horizontalScrollLeft = horizontalViewport.scrollLeft;
	}
</script>

<div
	data-gantt-chart-part="grid-pane"
	class={classes.gridPane({ density, color, disabled })}
	role="treegrid"
	aria-label={messages.ganttChartGrid}
	aria-rowcount={rowModel.rows.length + 1}
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
				aria-rowindex="1"
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
							resourceGroup={rowModel.resourceGroupByTaskId.get(node.taskId) ?? null}
							showResourceGroupLabel={rowModel.resourceGroupStartTaskIds.has(node.taskId)}
							{messages}
							{locale}
							{timeZone}
							{density}
							{color}
							{direction}
							{disabled}
							{loading}
							isSelected={isTaskSelected(node.taskId)}
							isDropParent={rowDropPreview?.parentId === node.taskId &&
								rowDropPreview.intent !== 'reorder'}
							showDragHandle={canReorder}
							canIndent={canIndentRow(virtualRow.index)}
							canOutdent={canOutdentRow(virtualRow.index)}
							{classes}
							treeCell={snippets.treeCell}
							taskRow={snippets.taskRow}
							rowAttachment={dnd.item(node, virtualRow.index)}
							touchRowAttachment={touchRowReorder.item(node.taskId)}
							onCellFocus={(columnId) => focusCell(node.taskId, columnId)}
							onIndent={() => indentRow(virtualRow.index)}
							onOutdent={() => outdentRow(virtualRow.index)}
							onNavigate={(event, columnIndex) =>
								navigateCell(event, virtualRow.index, columnIndex)}
						/>
					{/if}
				{/each}
				{#if rowDropPreview}
					<div
						data-gantt-row-drop-indicator
						data-gantt-reorder-intent={rowDropPreview.intent}
						class={classes.rowDropIndicator({ density, color, disabled })}
						style:top={`${rowDropPreview.top}px`}
						style:inset-inline-start={`${rowDropPreview.inlineStart}px`}
						aria-hidden="true"
					>
						<span
							class="absolute -start-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-color bg-surface"
						></span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

{#snippet defaultGridHeader()}{/snippet}
