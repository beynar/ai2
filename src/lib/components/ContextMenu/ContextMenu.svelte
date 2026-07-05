<script lang="ts">
	import { tick } from 'svelte';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import type { ContextMenuProps } from './contextMenu.props.js';

	let {
		items,
		children,
		menu,
		disabled = false,
		open = $bindable(false),
		class: className,
		popup,
		...attachments
	}: ContextMenuProps = $props();

	// A floating-ui virtual element: a zero-size rect at the cursor, so the menu anchors to the
	// pointer rather than the target element.
	let reference = $state<{ getBoundingClientRect: () => DOMRect } | null>(null);

	async function onContextMenu(event: MouseEvent) {
		if (disabled) return;
		event.preventDefault();
		const x = event.clientX;
		const y = event.clientY;
		// Close first so a second right-click re-mounts the menu at the new point.
		open = false;
		await tick();
		reference = { getBoundingClientRect: () => new DOMRect(x, y, 0, 0) };
		open = true;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={className} oncontextmenu={onContextMenu} {...attachments}>
	{@render children()}
</div>

<PopupMenu
	{...popup}
	trigger={false}
	bind:open
	ref={reference}
	position="bottom-start"
	menu={{ items, ...menu }}
/>
