import type { HTMLAttributes } from 'svelte/elements';
import type { Sizes } from '$lib/types/theme.js';
import type { Messages } from '$lib/i18n/en.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { SortableListThemeProps } from './sortableList.theme.js';

/** Payload passed to the `item` and `handle` snippets for each rendered row. */
export type SortableListItemPayload<T> = {
	/** The item this row represents. */
	item: T;
	/** The item's current position in the list (0-based, updates live while dragging). */
	index: number;
	/** Whether this row is the one currently being dragged. */
	isDragging: boolean;
};

/** Details passed to `onReorder` describing a completed drag. */
export type SortableListReorderDetails<T> = {
	/** The index the item was dragged from (its position before the drag started). */
	from: number;
	/** The index the item was dropped at (its final position). */
	to: number;
	/** The item that moved. */
	item: T;
};

export type SortableListProps<T> = WithAttachments<
	WithSlot<
		HTMLAttributes<HTMLUListElement> & {
			/** The list items, in display order. Reordered live as the user drags. Objects need a stable unique `id`; primitives are matched by value. Bindable. */
			items: T[];
			/** Drag mode and handle content in one prop. `false` (default): the whole row initiates the drag. `true`: only a grip handle drags, so the row text stays selectable. A snippet/string turns on handle mode and customizes what renders inside the handle (payload `{ item, index, isDragging }`). */
			handle?: boolean | Slot<SortableListItemPayload<T>>;
			/** Disables all dragging; rows still render but cannot be reordered. */
			disabled?: boolean;
			/** Size token controlling row padding, gaps and typography. */
			size?: Sizes;
			/** Called once when a drag ends and the order changed, with the reordered array and `{ from, to, item }`. */
			onReorder?: (items: T[], details: SortableListReorderDetails<T>) => void;
			/** Per-instance i18n overrides merged over the global catalog (used for the default handle's aria-label). */
			i18n?: Partial<Messages>;
			/** The class name of the root `<ul>` container. First element the component outputs in the DOM. */
			class?: string;
			/** Bindable reference to the root `<ul>` element. */
			ref?: HTMLElement | null;
			/** Theme overrides for the root, item, content and handle parts. */
			theme?: SortableListThemeProps;
		},
		'item',
		SortableListItemPayload<T>
	>
>;
