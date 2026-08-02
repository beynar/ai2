<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { getGanttColumnLabel } from './ganttChart.columns.js';
	import type { GanttColumnHeaderPayload } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttColumnDefinition } from './ganttChart.types.js';

	let {
		chart,
		column,
		columnIndex,
		onToggleSort
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		column: GanttColumnDefinition<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>;
		columnIndex: number;
		onToggleSort: (columnId: string, additive: boolean) => void;
	} = $props();

	const defaultLabel = $derived(column.title ?? getGanttColumnLabel(column.id, chart.messages));
	const payload = $derived<
		GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	>({ column, defaultLabel, defaultContent });
</script>

<div
	data-gantt-chart-part="column-header"
	data-column-id={column.id}
	class={chart.classes.columnHeader(chart.themeVariants)}
	style:width={`${column.width}px`}
	style:min-width={`${column.minWidth}px`}
	style:max-width={`${column.maxWidth}px`}
	role="columnheader"
	aria-colindex={columnIndex + 1}
	aria-sort={column.sortDirection === 'ascending'
		? 'ascending'
		: column.sortDirection === 'descending'
			? 'descending'
			: column.sortable
				? 'none'
				: undefined}
>
	{#if column.sortable}
		<button
			type="button"
			class="flex min-w-0 flex-1 items-center gap-1 truncate text-start outline-none focus-visible:underline"
			disabled={chart.disabled}
			onclick={(event) => onToggleSort(column.id, event.shiftKey)}
		>
			<Slot render={chart.renderers?.columnHeader ?? defaultContent} {payload} />
			<span class="shrink-0 text-[0.625rem]" aria-hidden="true">
				{column.sortDirection === 'ascending'
					? '↑'
					: column.sortDirection === 'descending'
						? '↓'
						: '↕'}
			</span>
		</button>
	{:else}
		<Slot render={chart.renderers?.columnHeader ?? defaultContent} {payload} />
	{/if}
</div>

{#snippet defaultContent()}
	<span class="truncate">{defaultLabel}</span>
{/snippet}
