<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import { getGanttColumnLabel } from './ganttChart.columns.js';
	import type { GanttColumnHeaderPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttColumnDefinition } from './ganttChart.types.js';
	import type { Snippet } from 'svelte';

	let {
		column,
		columnIndex,
		messages,
		density,
		color,
		disabled,
		classes,
		columnHeader,
		onToggleSort
	}: {
		column: GanttColumnDefinition<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>;
		columnIndex: number;
		messages: Messages;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		columnHeader?: Snippet<
			[GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		onToggleSort: (columnId: string, additive: boolean) => void;
	} = $props();

	const defaultLabel = $derived(column.title ?? getGanttColumnLabel(column.id, messages));
	const payload = $derived<
		GanttColumnHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>
	>({ column, defaultLabel, defaultContent });
</script>

<div
	data-gantt-chart-part="column-header"
	data-column-id={column.id}
	class={classes.columnHeader({ density, color, disabled })}
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
			{disabled}
			onclick={(event) => onToggleSort(column.id, event.shiftKey)}
		>
			<Slot render={columnHeader ?? defaultContent} {payload} />
			<span class="shrink-0 text-[0.625rem]" aria-hidden="true">
				{column.sortDirection === 'ascending'
					? '↑'
					: column.sortDirection === 'descending'
						? '↓'
						: '↕'}
			</span>
		</button>
	{:else}
		<Slot render={columnHeader ?? defaultContent} {payload} />
	{/if}
</div>

{#snippet defaultContent()}
	<span class="truncate">{defaultLabel}</span>
{/snippet}
