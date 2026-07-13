<!--
	Internal per-row component. `useSortable` must run once per item, so each row lives in its own
	component instance. Not part of the public API — do not export it from index.ts.
-->
<script lang="ts" generics="T">
	import { onMount, tick } from 'svelte';
	import { useDragDropManager } from '@dnd-kit-svelte/svelte';
	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import Slot from '../Slot/Slot.svelte';
	import { dotsSixVerticalIcon } from '../Icons/dotsSixVertical.js';
	import type { Sizes } from '$lib/types/theme.js';
	import type { Slot as SlotContent } from '../Slot/slot.js';
	import type { SortableListItemPayload } from './sortableList.props.js';
	import type { SortableListClasses } from './sortableList.theme.js';

	let {
		id,
		index,
		item,
		handleMode,
		handleContent,
		disabled,
		size,
		classes,
		handleLabel,
		fallbackText,
		content
	}: {
		/** Stable drag id for this row (matches the sortable key the parent uses). */
		id: string | number;
		/** The row's live position in the list; drives the sortable's index. */
		index: number;
		/** The data item this row represents. */
		item: T;
		/** Whether handle mode is on; when true only the grip drags. */
		handleMode: boolean;
		/** Custom content for the grip handle; falls back to the default grip icon. */
		handleContent?: SlotContent<SortableListItemPayload<T>>;
		/** Disables dragging for this row. */
		disabled: boolean;
		/** Size token forwarded to the theme parts. */
		size: Sizes;
		/** Resolved theme class builders shared by every row. */
		classes: SortableListClasses;
		/** Localized aria-label for the grip handle button. */
		handleLabel: string;
		/** Default row text used when no `content` snippet is provided. */
		fallbackText: string;
		/** The `item` snippet from the parent, rendered as the row content. */
		content?: SlotContent<SortableListItemPayload<T>>;
	} = $props();

	// Every field is a getter so the sortable stays reactive as the list reorders. `ref` is the
	// draggable row; `handleRef`, when attached, makes only the grip initiate the drag. The
	// default feedback lifts the row under the pointer and keeps a placeholder in its slot,
	// like the upstream dnd-kit sortable demo.
	const { ref, handleRef, isDragging } = useSortable({
		id: () => id,
		index: () => index,
		disabled: () => disabled
	});

	// The port's renderer reports "rendered" before Svelte commits the DOM, which disables the
	// library's built-in FLIP of displaced rows. Svelte's `tick()` is exactly the contract the
	// library expects; assigning it after mount (the provider overwrites `renderer` during its
	// init) restores the upstream animations. Idempotent across rows.
	const manager = useDragDropManager();
	onMount(() => {
		const instance = manager.current;
		if (!instance) return;
		instance.renderer = {
			get rendering() {
				return tick();
			}
		};
	});

	const payload = $derived<SortableListItemPayload<T>>({
		item,
		index,
		isDragging: isDragging.current
	});

	// Grip glyph size per token.
	const gripClass = $derived(size === 'large' ? 'size-5' : 'size-4');
</script>

<li
	{@attach ref}
	class={classes.item({ size, handle: handleMode, dragging: isDragging.current, disabled })}
>
	{#if handleMode}
		<button
			type="button"
			{@attach handleRef}
			{disabled}
			aria-label={handleLabel}
			class={classes.handle({ size })}
		>
			<Slot render={handleContent} {payload}>
				{@render dotsSixVerticalIcon({ class: gripClass })}
			</Slot>
		</button>
	{/if}

	<Slot render={content} {payload} class={classes.content()}>
		{fallbackText}
	</Slot>
</li>
