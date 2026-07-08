<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Menu from '../Menu/Menu.svelte';
	import type { PopupMenuProps } from './popupMenu.props.js';
	import { on } from 'svelte/events';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';
	import { hasSubmenuItems } from '../Menu/menuTree.js';

	let {
		menu,
		closeOnItemClick = true,
		open = $bindable(false),
		closeOnEscape = true,
		mobileSheet,
		mobileSheetSizeTransition,
		class: className,
		...popoverProps
	}: PopupMenuProps = $props();

	// A menu-appropriate min-width so short-label menus (e.g. context menus) don't collapse to their
	// content. Overridable — a consumer `class` wins via tailwind-merge.
	const panelClass = $derived(['min-w-44', className].filter(Boolean).join(' '));
	const menuSubmenuMode = $derived(menu.submenuMode ?? 'auto');
	const usesStackedSubmenus = $derived(
		hasSubmenuItems(menu.items) &&
			(menuSubmenuMode === 'stack' || (menuSubmenuMode === 'auto' && !!mobileSheet))
	);
	const resolvedMobileSheetSizeTransition = $derived(
		usesStackedSubmenus ? false : mobileSheetSizeTransition
	);

	const closeOnClick = (popover: PopoverState) => (node: HTMLElement) => {
		if (closeOnItemClick) {
			return on(node, 'click', (e) => {
				const path = e.composedPath();
				const buttonOrLink = path.find(
					(node) => node instanceof HTMLButtonElement || node instanceof HTMLAnchorElement
				);
				const shouldKeepOpen = path.some(
					(node) =>
						node instanceof HTMLElement && node.getAttribute('data-menu-keep-open') === 'true'
				);

				if (buttonOrLink && !shouldKeepOpen) {
					popover?.close();
				}
			});
		}
	};
</script>

<Popover
	bind:open
	size="small"
	{closeOnEscape}
	{mobileSheet}
	mobileSheetSizeTransition={resolvedMobileSheetSizeTransition}
	class={panelClass}
	{...popoverProps}
>
	{#snippet children(popover)}
		<Menu focusOnMount="container" {...menu} {@attach closeOnClick(popover)} />
	{/snippet}
</Popover>
