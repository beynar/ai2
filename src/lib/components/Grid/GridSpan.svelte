<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { GridSpanProps } from './gridSpan.props.js';
	import { useGridSpanTheme } from './gridSpan.theme.js';

	let {
		ref = $bindable(null),
		class: className,
		style,
		columns,
		rows,
		theme,
		children,
		...attributes
	}: GridSpanProps = $props();

	const classes = $derived(useGridSpanTheme(theme));
	const positiveInteger = (value: number | undefined) => {
		if (value === undefined || !Number.isFinite(value)) return undefined;
		const integer = Math.floor(value);
		return integer > 0 ? integer : undefined;
	};
	const normalizedColumns = $derived(
		typeof columns === 'number' ? positiveInteger(columns) : columns
	);
	const normalizedRows = $derived(positiveInteger(rows));
	const columnSpan = $derived(
		normalizedColumns === 'full'
			? '1 / -1'
			: normalizedColumns === undefined
				? undefined
				: `span ${normalizedColumns}`
	);
	const rowSpan = $derived(normalizedRows === undefined ? undefined : `span ${normalizedRows}`);
</script>

<div
	bind:this={ref}
	data-slot="grid-span"
	data-columns={columns}
	data-rows={rows}
	{style}
	style:grid-column={columnSpan}
	style:grid-row={rowSpan}
	class={classes.root({ className })}
	{...attributes}
>
	<Slot render={children} />
</div>
