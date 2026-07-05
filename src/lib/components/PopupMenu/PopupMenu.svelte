<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Menu from '../Menu/Menu.svelte';
	import type { PopupMenuProps } from './popupMenu.props.js';
	import { on } from 'svelte/events';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';

	let {
		menu,
		closeOnItemClick = true,
		open = $bindable(false),
		closeOnEscape = true,
		class: className,
		...popoverProps
	}: PopupMenuProps = $props();

	// A menu-appropriate min-width so short-label menus (e.g. context menus) don't collapse to their
	// content. Overridable — a consumer `class` wins via tailwind-merge.
	const panelClass = $derived(['min-w-44', className].filter(Boolean).join(' '));

	const closeOnClick = (popover: PopoverState) => (node: HTMLElement) => {
		if (closeOnItemClick) {
			return on(node, 'click', (e) => {
				const buttonOrLink = e
					.composedPath()
					.find((node) => node instanceof HTMLButtonElement || node instanceof HTMLAnchorElement);

				if (buttonOrLink && !(buttonOrLink as any).onNext) {
					popover?.close();
				}
			});
		}
	};
</script>

<Popover bind:open size="small" {closeOnEscape} class={panelClass} {...popoverProps}>
	{#snippet children(popover)}
		<Menu focusOnMount="container" {...menu} {@attach closeOnClick(popover)} />
	{/snippet}
</Popover>
