import { SvelteSet } from 'svelte/reactivity';
import { useKeyDown } from './useKeyDown.svelte.js';
import { on } from 'svelte/events';
import { onDestroy, tick, untrack } from 'svelte';
import { usePointerDown } from './usePointerDown.svelte.js';

type NavigationOptions = {
	enabled?: () => boolean;
	orientation?: 'horizontal' | 'vertical' | (() => 'horizontal' | 'vertical');
	loop?: boolean;
	id?: string;
	enableHoverFocus?: boolean;
	onChange?: (index: number | null) => void;
	defaultFocusedIndex?: () => number | null;
	preventKeyboardDefault?: boolean;
};

export const useNavigation = (opts: NavigationOptions) => {
	const itemsSet = new SvelteSet<HTMLElement>();
	let containerRef: HTMLElement | null = $state(null);
	let focusedIndex = $state<number | null>(null);
	let focusSource = $state<'keyboard' | 'pointer' | null>(null);
	let isHovering = $state(false);
	let isFocused = $state(false);
	let lastFocusedIndex = $state<number | null>(null);

	$effect(() => {
		if (focusedIndex && focusedIndex !== -1) {
			lastFocusedIndex = focusedIndex;
		}
	});
	// Generate ID if not provided
	const baseId = opts.id ?? `nav-${Math.random().toString(36).slice(2, 11)}`;

	// Get current orientation
	const getOrientation = () => {
		if (typeof opts.orientation === 'function') {
			return opts.orientation();
		}
		return opts.orientation || 'horizontal';
	};
	$effect(() => {
		if (!focusedIndex) return;
		const newFocusedIndex = focusedIndex;
		untrack(() => {
			opts.onChange?.(newFocusedIndex);
		});
	});

	const cleanUp = () => {
		itemsSet.clear();
		containerRef = null;
		focusedIndex = null;
		focusSource = null;
		isHovering = false;
		isFocused = false;
		lastFocusedIndex = null;
	};

	onDestroy(() => {
		cleanUp();
	});
	const focusContainer = () => {
		if (containerRef) {
			console.log('focusContainer', containerRef);
			focusedIndex = -1;
			containerRef.focus();
		}
	};

	// Derived: Get ordered items by DOM position
	const items = $derived.by(() => {
		if (itemsSet.size === 0) return [];
		if (containerRef === null) return [];
		const itemsArray = Array.from(itemsSet);
		// Sort by DOM position using compareDocumentPosition
		return itemsArray.sort((a, b) => {
			const position = a.compareDocumentPosition(b);
			if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
				return -1; // a comes before b
			} else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
				return 1; // b comes before a
			}
			return 0;
		});
	});

	// Check if item is disabled
	const isItemDisabled = (item: HTMLElement) => {
		return (
			item.hasAttribute('disabled') ||
			item.getAttribute('aria-disabled') === 'true' ||
			item.hasAttribute('data-disabled')
		);
	};

	// Find next non-disabled index
	const findNextIndex = (currentIndex: number, direction: 1 | -1): number => {
		const { loop = true } = opts;
		const total = items.length;
		let nextIndex = currentIndex + direction;

		// Handle looping
		if (loop) {
			if (nextIndex >= total) nextIndex = 0;
			if (nextIndex < 0) nextIndex = total - 1;
		} else {
			if (nextIndex >= total) nextIndex = total - 1;
			if (nextIndex < 0) nextIndex = 0;
		}

		// If same as current, we've wrapped around completely
		if (nextIndex === currentIndex) return currentIndex;

		// Skip disabled items
		if (isItemDisabled(items[nextIndex])) {
			return findNextIndex(nextIndex, direction);
		}

		return nextIndex;
	};

	// Find first non-disabled index
	const findFirstIndex = (): number => {
		for (let i = 0; i < items.length; i++) {
			if (!isItemDisabled(items[i])) return i;
		}
		return -1; // No enabled items
	};

	// Find last non-disabled index
	const findLastIndex = (): number => {
		for (let i = items.length - 1; i >= 0; i--) {
			if (!isItemDisabled(items[i])) return i;
		}
		return -1; // No enabled items
	};

	// Update ARIA attributes on all items
	const updateAriaAttributes = (focusIdx: number | null) => {
		items.forEach((item, index) => {
			const isFocused = index === focusIdx;
			const itemId = `${baseId}-item-${index}`;

			// Set ID
			if (!item.id) {
				item.id = itemId;
			}

			// Set tabindex (roving tabindex pattern - follows focus)
			item.setAttribute('tabindex', isFocused ? '0' : '-1');

			// Set data-highlighted for keyboard focus
			if (isFocused) {
				item.setAttribute('data-highlighted', 'true');
			} else {
				item.removeAttribute('data-highlighted');
			}
		});

		// Update container's aria-activedescendant to focused item
		if (containerRef && focusIdx !== null && items[focusIdx]) {
			containerRef.setAttribute('aria-activedescendant', items[focusIdx].id);
		} else if (containerRef) {
			containerRef.removeAttribute('aria-activedescendant');
		}
	};

	// Move focus to specific index (arrow key navigation)
	const moveFocusTo = (index: number) => {
		if (items.length === 0) return;
		if (index < 0 || index >= items.length) return;
		if (isItemDisabled(items[index])) return;

		focusSource = 'keyboard';
		focusedIndex = index;
		updateAriaAttributes(index);

		if (items[index]) {
			const item = items[index];
			item.focus();
			// Scroll the item into view if needed
			item.scrollIntoView({
				block: 'nearest',
				inline: 'nearest',
				behavior: 'smooth'
			});
		}
	};

	// Click the currently focused item (Enter/Space key)
	const clickFocused = () => {
		if (focusedIndex === null || focusedIndex < 0 || focusedIndex >= items.length) return;
		if (isItemDisabled(items[focusedIndex])) return;

		// Trigger click event on the focused element
		items[focusedIndex].click();
	};

	// Clear focus state when container loses focus
	const clearFocus = () => {
		// Set focusedIndex to null
		focusedIndex = null;
		focusSource = null;

		// Clear all focus attributes
		items.forEach((item) => {
			item.setAttribute('tabindex', '-1');
			item.removeAttribute('data-highlighted');
		});

		// Clear aria-activedescendant from container
		if (containerRef) {
			containerRef.removeAttribute('aria-activedescendant');
		}
	};

	// Handle item hover - only set visual focus (no DOM focus yet)
	const handleItemHover = (itemElement: HTMLElement) => {
		// Find the index of the hovered item
		const index = items.findIndex((item) => item === itemElement);
		if (index === -1) return;
		if (isItemDisabled(items[index])) return;

		// Set visual focus on hovered item (don't manipulate DOM focus)
		focusSource = 'pointer';
		focusedIndex = index;
		updateAriaAttributes(index);
	};

	// Handle keyboard events

	// Batch update ARIA attributes when items or focusedIndex change
	$effect(() => {
		if (items.length > 0) {
			updateAriaAttributes(focusedIndex);
		}
	});

	const pointerDown = usePointerDown({
		isActive: () => true
	});

	// Use the existing useKeyDown hook - pass all possible keys, filter in handleKeyboard
	const keyDown = useKeyDown({
		isActive: () => {
			// return false;
			const enabled = opts.enabled?.();
			if (!enabled) return false;
			if (isHovering && opts.enableHoverFocus) {
				return true;
			}
			return enabled;
		},
		preventDefault: opts.preventKeyboardDefault,
		onWindow: () => {
			// return false;
			return isHovering && !isFocused && opts.enableHoverFocus ? true : false;
		},
		callback: (event: KeyboardEvent) => {
			// If hovering but container not focused, focus it first on arrow key
			if (
				isHovering &&
				opts.enableHoverFocus &&
				containerRef &&
				document.activeElement !== containerRef &&
				!containerRef.contains(document.activeElement)
			) {
				containerRef.focus();
			}

			const orientation = getOrientation();

			if (!opts.preventKeyboardDefault && event.key !== 'Escape') {
				event.preventDefault();
			}
			switch (event.key) {
				case 'ArrowLeft':
					if (orientation === 'horizontal') {
						const currentIdx = focusedIndex ?? findFirstIndex();
						if (currentIdx !== -1) {
							moveFocusTo(findNextIndex(currentIdx, -1));
						}
					} else if (focusedIndex !== null) {
						const node = items[focusedIndex];
						if ((node as any).onPrevious) {
							(node as any).onPrevious();
						}
					}
					break;
				case 'ArrowRight':
					if (orientation === 'horizontal') {
						const currentIdx = focusedIndex ?? findFirstIndex();
						if (currentIdx !== -1) {
							moveFocusTo(findNextIndex(currentIdx, 1));
						}
					} else if (focusedIndex !== null) {
						const node = items[focusedIndex];
						if ((node as any).onNext) {
							(node as any).onNext();
						}
					}
					break;
				case 'ArrowUp':
					if (orientation === 'vertical') {
						const currentIdx = focusedIndex ?? findFirstIndex();
						if (currentIdx !== -1) {
							moveFocusTo(findNextIndex(currentIdx, -1));
						} else {
							moveFocusTo(findLastIndex());
						}
					}
					break;
				case 'ArrowDown':
					if (orientation === 'vertical') {
						const currentIdx = focusedIndex ?? findFirstIndex();
						if (currentIdx !== -1) {
							moveFocusTo(findNextIndex(currentIdx, 1));
						} else {
							moveFocusTo(findFirstIndex());
						}
					}
					break;
				case 'Home': {
					const firstIndex = findFirstIndex();
					if (firstIndex !== -1) {
						moveFocusTo(firstIndex);
					}
					break;
				}
				case 'End': {
					const lastIndex = findLastIndex();
					if (lastIndex !== -1) {
						moveFocusTo(lastIndex);
					}
					break;
				}
				case 'Escape': {
					if (containerRef?.contains(document.activeElement)) {
						clearFocus();
					}
					break;
				}

				case 'Enter':
				case ' ':
					clickFocused();
					break;
			}
		},
		keys: ['Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' ']
	});

	return {
		containerReference: (node: HTMLElement) => {
			if (!opts.enabled?.()) return;
			return untrack(() => {
				containerRef = node;

				// Make container focusable for keyboard navigation
				if (!node.hasAttribute('tabindex')) {
					node.setAttribute('tabindex', '0');
				}

				// Apply keydown reference
				const keyDownCleanup = keyDown.reference?.(node);

				// Handle focus event - set focus to first item when container receives focus
				const handleFocus = () => {
					isFocused = true;

					if (focusedIndex === null && !pointerDown.isDown) {
						const firstIndex = opts.defaultFocusedIndex?.() ?? findFirstIndex();
						if (firstIndex !== -1) {
							moveFocusTo(firstIndex);
						}
					}
				};

				const focusCleanup = on(node, 'focusin', handleFocus);

				// Handle blur event - reset focus when container loses focus
				const handleBlur = (event: FocusEvent) => {
					isFocused = false;
					// Check if focus moved outside the container
					const relatedTarget = event.relatedTarget as HTMLElement | null;
					if (!relatedTarget || !node.contains(relatedTarget)) {
						// Focus moved outside, clear focus state
						clearFocus();
					}
				};

				const blurCleanup = on(node, 'focusout', handleBlur);

				// Handle container pointer enter - track hovering state
				const handleContainerEnter = () => {
					isHovering = true;
				};

				const containerEnterCleanup = on(node, 'pointerenter', handleContainerEnter);

				// Handle pointer leave - clear focus only if it was set by pointer
				const handlePointerLeave = () => {
					isHovering = false;

					if (focusSource === 'pointer') {
						clearFocus();
					}
				};

				const pointerLeaveCleanup = on(node, 'pointerleave', handlePointerLeave);
				const pointerDownCleanup = pointerDown.reference?.(node);
				if (opts.defaultFocusedIndex) {
					const defaultFocusedIndex = opts.defaultFocusedIndex();
					if (defaultFocusedIndex && defaultFocusedIndex !== -1) {
						moveFocusTo(defaultFocusedIndex);
					}
				}
				return () => {
					cleanUp();
					keyDownCleanup?.();
					focusCleanup();
					blurCleanup();
					containerEnterCleanup();
					pointerLeaveCleanup();
					pointerDownCleanup?.();
				};
			});
		},
		itemReference: (node: HTMLElement) => {
			return;
			const enabled = opts.enabled?.();
			if (!enabled) return;
			return untrack(() => {
				// Add item to set
				itemsSet.add(node);

				// ARIA attributes are now batch-updated via $effect

				// Handle hover - only move focus if enabled
				const handleHover = () => {
					if (opts.enableHoverFocus !== false && !isItemDisabled(node)) {
						handleItemHover(node);
					}
				};

				const hoverCleanup = on(node, 'pointerenter', handleHover);

				return () => {
					// Remove item from set
					itemsSet.delete(node);
					hoverCleanup();
				};
			});
		},
		// Expose focused index for external use
		get focusedIndex() {
			return focusedIndex;
		},
		// Expose control methods
		focusItem: (index: number) => {
			if (index >= 0 && index < items.length) {
				moveFocusTo(index);
			}
		},
		focusFirst: () => {
			const firstIndex = findFirstIndex();
			if (firstIndex !== -1) {
				moveFocusTo(firstIndex);
			}
		},
		focusLast: () => {
			const lastIndex = findLastIndex();
			if (lastIndex !== -1) {
				moveFocusTo(lastIndex);
			}
		},
		clearFocus: () => {
			clearFocus();
		},
		get lastFocusedIndex() {
			return lastFocusedIndex;
		},
		focusContainer: focusContainer
	};
};
