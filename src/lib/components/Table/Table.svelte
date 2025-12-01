<script lang="ts">
	import type { TableCell, TableCellValue, TableProps } from './table.props.js';
	import { useTableTheme } from './table.theme.js';
	import Slot from '../Slot/Slot.svelte';

	let {
		header,
		footer,
		rows,
		prefix,
		suffix,
		caption,
		class: className,
		theme,
		...attachments
	}: TableProps = $props();

	const classes = $derived(useTableTheme(theme));

	const headerKeys = $derived(header ? Object.keys(header) : []);

	/**
	 * Normalizes a TableCellValue to a TableCell.
	 * If it's already a TableCell (object), returns it as-is.
	 * If it's a Slot (string or Snippet), wraps it in { content: value }.
	 */
	function normalizeCell(value: TableCellValue): TableCell {
		// If it's a string or function, it's a Slot - wrap it
		if (typeof value === 'string' || typeof value === 'function') {
			return { content: value };
		}
		// Otherwise, it's already a TableCell object
		return value;
	}
</script>

{#snippet renderCell(cellValue: TableCellValue, isHeader = false)}
	{@const cell = normalizeCell(cellValue)}
	{#if isHeader}
		<th
			class={classes.head({ class: cell.class })}
			rowspan={cell.rowSpan || undefined}
			colspan={cell.colSpan || undefined}
		>
			<Slot render={cell.content} />
		</th>
	{:else}
		<td
			class={classes.cell({ class: cell.class })}
			rowspan={cell.rowSpan || undefined}
			colspan={cell.colSpan || undefined}
		>
			<Slot render={cell.content} />
		</td>
	{/if}
{/snippet}

<div class={classes.container({ className })} {...attachments}>
	<Slot render={prefix} class={classes.prefix()} />
	<table class={classes.table()}>
		<Slot render={caption} as="caption" class={classes.caption()} />

		{#if header && headerKeys.length > 0}
			<thead class={classes.thead()}>
				<tr class={classes.row()}>
					{#each headerKeys as key}
						{@render renderCell(header[key]!, true)}
					{/each}
				</tr>
			</thead>
		{/if}

		{#if rows && rows.length > 0}
			<tbody class={classes.tbody()}>
				{#each rows as row}
					<tr class={classes.row({ class: row.class })}>
						{#if row.content}
							<Slot render={row.content} />
						{:else if row.cells}
							{#if headerKeys.length > 0}
								{#each headerKeys as key}
									{#if row.cells[key]}
										{@render renderCell(row.cells[key]!, false)}
									{/if}
								{/each}
							{:else}
								{#each Object.keys(row.cells) as key}
									{@render renderCell(row.cells[key]!, false)}
								{/each}
							{/if}
						{/if}
					</tr>
				{/each}
			</tbody>
		{/if}

		{#if footer && Object.keys(footer).length > 0}
			<tfoot class={classes.tfoot()}>
				<tr class={classes.row()}>
					{#if headerKeys.length > 0}
						{#each headerKeys as key}
							{#if footer[key]}
								{@render renderCell(footer[key]!, false)}
							{/if}
						{/each}
					{:else}
						{#each Object.keys(footer) as key}
							{@render renderCell(footer[key]!, false)}
						{/each}
					{/if}
				</tr>
			</tfoot>
		{/if}
	</table>
	<Slot render={suffix} class={classes.suffix()} />
</div>
