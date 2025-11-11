<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Menu from '../Menu/Menu.svelte';
	import type { PopupMenuProps } from './popupMenu.props.js';
	import { on } from 'svelte/events';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';

	let {
		menu,
		closeOnItemClick = true,
		isOpen = $bindable(false),
		closeOnEscape = true,
		...popoverProps
	}: PopupMenuProps = $props();

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

<Popover bind:isOpen size="small" {closeOnEscape} {...popoverProps}>
	{#snippet children(popover)}
		<Menu focusOnMount="container" {...menu} {@attach closeOnClick(popover)} />
	{/snippet}
</Popover>
