import {
	draggable,
	dropTargetForElements,
	monitorForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import type { Attachment } from 'svelte/attachments';

export type DndAxis = 'vertical' | 'horizontal';
export type DndEdge = 'top' | 'bottom' | 'left' | 'right';

/** What a drag carries — enough for any list to decide and act on a drop. */
export type DndSource<T = unknown> = {
	/** Id of the list the item is dragged FROM. */
	listId: string;
	/** Stable id of the dragged item. */
	itemId: string;
	/** Index of the item in its source list at drag start. */
	index: number;
	/** The item itself (by reference, not serialized). */
	item: T;
};

export type UseDndListOptions<T> = {
	/**
	 * Unique id of this list. Other lists receive it in `accepts`/`onReceive`
	 * and use it to accept or reject the drag.
	 */
	id: string;
	/** Reactive getter for the list's items. */
	items: () => T[];
	/** Stable id for an item. Defaults to `item.id`. */
	itemId?: (item: T) => string;
	/**
	 * Called after a same-list drag with the reordered array — assign it to
	 * your state. `detail` carries the moved item and both indices.
	 */
	onReorder?: (items: T[], detail: { item: T; from: number; to: number }) => void;
	/**
	 * Accept (or reject) items dragged from OTHER lists, based on the source
	 * list id and/or the item. Rejected drags show no indicator and cannot
	 * drop. Defaults to rejecting everything external.
	 */
	accepts?: (source: DndSource) => boolean;
	/** An accepted external item was dropped here at `index` — insert it. */
	onReceive?: (detail: { item: unknown; index: number; from: DndSource }) => void;
	/** One of THIS list's items was dropped into another accepting list — remove it. */
	onRemove?: (detail: { item: T; index: number; to: { listId: string } }) => void;
	/** Orientation; drives the closest-edge math and the indicator. @default 'vertical' */
	axis?: DndAxis;
	/**
	 * When true, items only drag from a descendant marked `data-dnd-handle`
	 * instead of the whole row.
	 */
	handle?: boolean;
	/** Reactive kill-switch for the whole list. */
	disabled?: () => boolean;
};

// Marks data as belonging to this utility — element-adapter data stays
// in-memory, so a symbol key cleanly namespaces us from other pragmatic users.
const DND_MARK = Symbol('svelai-dnd');

type DragData = DndSource & { [DND_MARK]: true };
type TargetData = DragData & { edge: DndEdge };
type ContainerData = { [DND_MARK]: true; listId: string; container: true };

const isMine = (data: Record<string | symbol, unknown>): boolean => data[DND_MARK] === true;

const closestEdge = (
	element: Element,
	input: { clientX: number; clientY: number },
	axis: DndAxis
): DndEdge => {
	const rect = element.getBoundingClientRect();
	return axis === 'vertical'
		? input.clientY < rect.top + rect.height / 2
			? 'top'
			: 'bottom'
		: input.clientX < rect.left + rect.width / 2
			? 'left'
			: 'right';
};

// ---------------------------------------------------------------------------
// Drop indicator: one fixed-position line for the whole app, moved imperatively
// (no reactivity needed). Styled with the primary token; override via the
// [data-dnd-indicator] selector.
// ---------------------------------------------------------------------------
let indicatorEl: HTMLElement | null = null;

const ensureIndicator = (): HTMLElement => {
	if (indicatorEl && indicatorEl.isConnected) return indicatorEl;
	indicatorEl = document.createElement('div');
	indicatorEl.setAttribute('data-dnd-indicator', '');
	Object.assign(indicatorEl.style, {
		position: 'fixed',
		zIndex: '9999',
		pointerEvents: 'none',
		background: 'var(--color-primary)',
		borderRadius: '9999px',
		display: 'none'
	});
	document.body.appendChild(indicatorEl);
	return indicatorEl;
};

const THICKNESS = 2;

const showIndicator = (rect: DOMRect, edge: DndEdge) => {
	const el = ensureIndicator();
	el.style.display = 'block';
	if (edge === 'top' || edge === 'bottom') {
		el.style.left = `${rect.left}px`;
		el.style.width = `${rect.width}px`;
		el.style.height = `${THICKNESS}px`;
		el.style.top = `${(edge === 'top' ? rect.top : rect.bottom) - THICKNESS / 2}px`;
	} else {
		el.style.top = `${rect.top}px`;
		el.style.height = `${rect.height}px`;
		el.style.width = `${THICKNESS}px`;
		el.style.left = `${(edge === 'left' ? rect.left : rect.right) - THICKNESS / 2}px`;
	}
};

const hideIndicator = () => {
	if (indicatorEl) indicatorEl.style.display = 'none';
};

/**
 * List drag-and-drop as two attachments, built on Pragmatic drag and drop.
 *
 * ```svelte
 * const dnd = useDndList({ id: 'todo', items: () => items, onReorder: (next) => (items = next) });
 *
 * <ul {@attach dnd.list}>
 *   {#each items as item, index (item.id)}
 *     <li {@attach dnd.item(item, index)}>{item.title}</li>
 *   {/each}
 * </ul>
 * ```
 *
 * Cross-list moves: give each list its own `useDndList`, let the destination
 * opt in with `accepts`, insert in `onReceive`, and remove from the source in
 * `onRemove`. The drop indicator, edge math, and no-op suppression are handled
 * internally.
 *
 * Styling hooks: `data-dnd-dragging` on the dragged item, `data-dnd-over` on a
 * hovered container, `data-dnd-indicator` on the shared indicator line,
 * `data-dnd-handle` marks a drag handle when `handle` is set.
 */
export const useDndList = <T>(options: UseDndListOptions<T>) => {
	const listId = options.id;
	const axis = () => options.axis ?? 'vertical';
	const getId = (item: T): string =>
		options.itemId ? options.itemId(item) : String((item as { id: string | number }).id);

	let draggingId = $state<string | null>(null);
	let isOver = $state(false);

	const canAccept = (data: Record<string | symbol, unknown>): boolean => {
		if (!isMine(data) || options.disabled?.()) return false;
		const source = data as DragData;
		if (source.listId === listId) return true;
		return options.accepts?.(source) ?? false;
	};

	/** Same-list finish index for a drop on `index`/`edge`; null when a no-op. */
	const resolveReorder = (from: number, index: number, edge: DndEdge): number | null => {
		let to = index + (edge === 'bottom' || edge === 'right' ? 1 : 0);
		if (from < to) to -= 1;
		return to === from ? null : to;
	};

	// Central drop resolution. Runs in every list's monitor for every drag this
	// utility owns; each instance only acts on the part that concerns it, so a
	// cross-list drop resolves as onReceive (destination) + onRemove (source).
	const handleDrop = ({
		source,
		location
	}: {
		source: { data: Record<string | symbol, unknown> };
		location: { current: { dropTargets: Array<{ data: Record<string | symbol, unknown> }> } };
	}) => {
		hideIndicator();
		isOver = false;
		if (!isMine(source.data)) return;
		const src = source.data as DragData;
		const target = location.current.dropTargets.find((t) => isMine(t.data));
		if (!target) return;

		const targetData = target.data as TargetData | ContainerData;
		const targetListId = targetData.listId;
		if (src.listId !== listId && targetListId !== listId) return;

		const items = options.items();

		if (targetListId === listId) {
			// Dropped into this list — either a reorder or a receive.
			const to =
				'container' in targetData
					? items.length
					: Math.min(
							(targetData as TargetData).index +
								((targetData as TargetData).edge === 'bottom' ||
								(targetData as TargetData).edge === 'right'
									? 1
									: 0),
							items.length
						);

			if (src.listId === listId) {
				const finish =
					'container' in targetData
						? resolveReorder(src.index, items.length - 1, axis() === 'vertical' ? 'bottom' : 'right')
						: resolveReorder(src.index, (targetData as TargetData).index, (targetData as TargetData).edge);
				if (finish === null) return;
				const next = reorder({ list: [...items], startIndex: src.index, finishIndex: finish });
				options.onReorder?.(next, { item: items[src.index], from: src.index, to: finish });
			} else {
				options.onReceive?.({ item: src.item, index: to, from: src });
			}
		} else if (src.listId === listId) {
			// One of ours landed somewhere else.
			options.onRemove?.({ item: src.item as T, index: src.index, to: { listId: targetListId } });
		}
	};

	/** Attachment for the list container (drop zone + central monitor). */
	const list: Attachment = (element) => {
		element.setAttribute('data-dnd-list', listId);

		const terminalIndicator = () => {
			const rows = element.querySelectorAll('[data-dnd-item]');
			const last = rows[rows.length - 1];
			if (last) {
				showIndicator(
					last.getBoundingClientRect(),
					axis() === 'vertical' ? 'bottom' : 'right'
				);
			} else {
				// Empty list: a line inset at the top of the container.
				const rect = element.getBoundingClientRect();
				const inset = 6;
				showIndicator(
					new DOMRect(rect.x + inset, rect.y + inset, rect.width - inset * 2, 0),
					'bottom'
				);
			}
		};

		return combine(
			dropTargetForElements({
				element: element as HTMLElement,
				canDrop: ({ source }) => canAccept(source.data),
				getData: (): ContainerData => ({ [DND_MARK]: true, listId, container: true }),
				onDragEnter: () => {
					isOver = true;
					element.setAttribute('data-dnd-over', 'true');
				},
				onDrag: ({ location }) => {
					// Only when hovering the container's own empty space — when an item
					// is the innermost target, the item draws the indicator.
					if (location.current.dropTargets[0]?.element !== element) return;
					terminalIndicator();
				},
				onDragLeave: () => {
					isOver = false;
					element.removeAttribute('data-dnd-over');
					hideIndicator();
				},
				onDrop: () => {
					isOver = false;
					element.removeAttribute('data-dnd-over');
				}
			}),
			monitorForElements({
				canMonitor: ({ source }) => isMine(source.data),
				onDrop: handleDrop
			})
		);
	};

	/** Attachment for one list item; call with the item and its current index. */
	const item = (itemData: T, index: number): Attachment => {
		return (element) => {
			if (options.disabled?.()) return;
			const id = getId(itemData);
			element.setAttribute('data-dnd-item', id);

			const payload = (): DragData => ({
				[DND_MARK]: true,
				listId,
				itemId: id,
				index,
				item: itemData
			});

			const handleEl = options.handle
				? (element.querySelector('[data-dnd-handle]') as HTMLElement | null)
				: null;

			return combine(
				draggable({
					element: element as HTMLElement,
					dragHandle: handleEl ?? undefined,
					getInitialData: () => payload(),
					onDragStart: () => {
						draggingId = id;
						element.setAttribute('data-dnd-dragging', 'true');
						(element as HTMLElement).style.opacity = '0.4';
					},
					onDrop: () => {
						draggingId = null;
						element.removeAttribute('data-dnd-dragging');
						(element as HTMLElement).style.opacity = '';
					}
				}),
				dropTargetForElements({
					element: element as HTMLElement,
					canDrop: ({ source }) => canAccept(source.data),
					getIsSticky: () => true,
					getData: ({ input }): TargetData => ({
						...payload(),
						edge: closestEdge(element, input, axis())
					}),
					onDrag: ({ self, source }) => {
						const src = source.data as DragData;
						const edge = (self.data as TargetData).edge;
						// No indicator on the dragged row itself, nor when the drop would
						// put the item right back where it already is.
						if (src.listId === listId && src.itemId === id) {
							hideIndicator();
							return;
						}
						if (src.listId === listId && resolveReorder(src.index, index, edge) === null) {
							hideIndicator();
							return;
						}
						showIndicator(element.getBoundingClientRect(), edge);
					},
					onDragLeave: () => {
						hideIndicator();
					}
				})
			);
		};
	};

	return {
		/** Attach to the list container element. */
		list,
		/** Attach to each item element: `{@attach dnd.item(item, index)}`. */
		item,
		/** Id of the item currently dragged from this list, or null. */
		get dragging() {
			return draggingId;
		},
		/** True while an accepted drag hovers this list. */
		get isOver() {
			return isOver;
		}
	};
};
