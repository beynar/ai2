<script lang="ts" generics="T">
	import { DragDropProvider, type DragDropEvents } from '@dnd-kit-svelte/svelte';
	import { move } from '@dnd-kit/helpers';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import SortableListItem from './SortableListItem.svelte';
	import type { SortableListProps } from './sortableList.props.js';
	import { useSortableListTheme } from './sortableList.theme.js';

	let {
		items = $bindable([]),
		handle = false,
		disabled = false,
		size = 'normal',
		onReorder,
		i18n,
		class: className,
		ref = $bindable(null),
		theme,
		item,
		...attachments
	}: SortableListProps<T> = $props();

	const t = $derived(useI18n(i18n));
	const classes = $derived(useSortableListTheme(theme));

	// Rows are matched exactly the way `move()` matches them: objects by their `id`,
	// primitives by value.
	const idOf = (value: T): string | number =>
		typeof value === 'object' && value != null
			? (value as unknown as { id: string | number }).id
			: (value as unknown as string | number);

	// Any truthy `handle` turns on handle mode; a snippet/string additionally customizes the grip.
	const handleMode = $derived(Boolean(handle));
	const handleContent = $derived(typeof handle === 'boolean' ? undefined : handle);

	// Primitive-friendly default row label, used only when no `item` snippet is supplied.
	const defaultLabel = (value: T): string => {
		if (value == null) return '';
		if (typeof value !== 'object') return String(value);
		const record = value as Record<string, unknown>;
		return String(record.label ?? record.title ?? idOf(value));
	};

	type DragOverEvent = Parameters<DragDropEvents['dragover']>[0];
	type DragEndEvent = Parameters<DragDropEvents['dragend']>[0];

	// Snapshot of the pre-drag order, taken on drag start; used to revert on cancel and to
	// compute the `from` index. We only ever replace `items` with a fresh array, never mutate
	// in place, so this reference stays a valid snapshot.
	let orderBeforeDrag: T[] | null = null;

	const onDragStart = () => {
		orderBeforeDrag = items;
	};

	// Live reorder while dragging, exactly like the library's sortable example. `move()` is
	// typed for concrete id-bearing arrays; T is generic here, so bridge the types.
	const onDragOver = (event: DragOverEvent) => {
		items = move(items as (T & { id: string | number })[], event) as T[];
	};

	const onDragEnd = (event: DragEndEvent) => {
		const before = orderBeforeDrag;
		orderBeforeDrag = null;
		if (event.canceled) {
			// Escape / cancelled drop: undo the live reorder.
			if (before) items = before;
			return;
		}
		const sourceId = event.operation.source?.id;
		if (sourceId == null) return;
		const to = items.findIndex((value) => idOf(value) === sourceId);
		const from = before ? before.findIndex((value) => idOf(value) === sourceId) : to;
		if (to === -1 || from === -1 || from === to) return;
		onReorder?.(items, { from, to, item: items[to] });
	};
</script>

<DragDropProvider {onDragStart} {onDragOver} {onDragEnd}>
	<ul bind:this={ref} class={classes.root({ size, className })} {...attachments}>
		{#each items as value, index (idOf(value))}
			<SortableListItem
				id={idOf(value)}
				{index}
				item={value}
				{handleMode}
				{handleContent}
				{disabled}
				{size}
				{classes}
				handleLabel={t.dragToReorder}
				fallbackText={defaultLabel(value)}
				content={item}
			/>
		{/each}
	</ul>
</DragDropProvider>
