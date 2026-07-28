<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import GanttTreeCell from './GanttTreeCell.svelte';
	import type { GanttTaskRowPayload, GanttTreeCellPayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttAssignment,
		GanttColumnDefinition,
		GanttDependency,
		GanttResolvedTaskNode,
		GanttResource
	} from './ganttChart.types.js';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	let {
		chart,
		node,
		rowIndex,
		start,
		columns,
		dependencies,
		resources,
		assignments,
		resourceGroup,
		showResourceGroupLabel,
		messages,
		locale,
		timeZone,
		density,
		color,
		direction,
		disabled,
		loading,
		isSelected,
		activeColumnId,
		showDragHandle,
		canIndent,
		canOutdent,
		classes,
		treeCell,
		taskRow,
		rowAttachment,
		onCellFocus,
		onIndent,
		onOutdent,
		onNavigate
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		node: GanttResolvedTaskNode<TTaskFields>;
		rowIndex: number;
		start: number;
		columns: readonly GanttColumnDefinition<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>[];
		dependencies: readonly GanttDependency<TDependencyFields>[];
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		resourceGroup: GanttResource<TResourceFields> | null;
		showResourceGroupLabel: boolean;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		loading: boolean;
		isSelected: boolean;
		activeColumnId: string;
		showDragHandle: boolean;
		canIndent: boolean;
		canOutdent: boolean;
		classes: GanttChartClasses;
		treeCell?: Snippet<
			[GanttTreeCellPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		taskRow?: Snippet<[GanttTaskRowPayload<TTaskFields>]>;
		rowAttachment: Attachment<HTMLElement> | null;
		onCellFocus: (columnId: string) => void;
		onIndent: () => void;
		onOutdent: () => void;
		onNavigate: (event: KeyboardEvent, columnIndex: number) => void;
	} = $props();

	const isFocused = $derived(columns.some((column) => column.id === activeColumnId));
	const rowPayload = $derived<GanttTaskRowPayload<TTaskFields>>({
		node,
		isSelected,
		isFocused,
		defaultContent: defaultRowContent
	});
</script>

<div
	data-gantt-chart-part="row"
	data-task-id={node.taskId}
	data-index={rowIndex}
	data-grid-row={rowIndex}
	data-resource-group={resourceGroup?.id}
	data-resource-group-start={showResourceGroupLabel || undefined}
	class={classes.row({ density, color, disabled, selected: isSelected })}
	style:top={`${start}px`}
	role="row"
	aria-rowindex={rowIndex + 1}
	aria-level={node.depth + 1}
	aria-expanded={node.type === 'summary' ? node.isExpanded : undefined}
	{@attach rowAttachment}
>
	{#if taskRow}
		<div class="pointer-events-none absolute inset-0" aria-hidden="true">
			<Slot render={taskRow} payload={rowPayload} />
		</div>
	{/if}
	{#each columns as column, columnIndex (column.id)}
		<GanttTreeCell
			{chart}
			{node}
			{column}
			{rowIndex}
			{columnIndex}
			{dependencies}
			{resources}
			{assignments}
			{resourceGroup}
			showResourceGroupLabel={showResourceGroupLabel && column.id === 'title'}
			{messages}
			{locale}
			{timeZone}
			{density}
			{color}
			{direction}
			{disabled}
			{loading}
			{isSelected}
			isFocused={activeColumnId === column.id}
			showDragHandle={showDragHandle && column.id === 'title'}
			canIndent={canIndent && column.id === 'title'}
			canOutdent={canOutdent && column.id === 'title'}
			{classes}
			{treeCell}
			onFocus={() => onCellFocus(column.id)}
			{onIndent}
			{onOutdent}
			onNavigate={(event) => onNavigate(event, columnIndex)}
		/>
	{/each}
</div>

{#snippet defaultRowContent()}{/snippet}
