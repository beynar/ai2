<script lang="ts">
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import { fileIcon } from '$lib/components/Icons/file.js';
	import { folderIcon } from '$lib/components/Icons/folder.js';
	import type { SidebarTreeNode } from './sidebar.props.js';
	import SidebarIcon from './SidebarIcon.svelte';
	import SidebarTreeNodeComponent from './SidebarTreeNode.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let { node, theme }: { node: SidebarTreeNode; theme?: SidebarThemeProps } = $props();

	let open = $state<boolean | undefined>();
	const classes = $derived(useSidebarTheme(theme));
	const isOpen = $derived(open ?? node.defaultOpen ?? false);
	const hasChildren = $derived(!!node.children?.length);
</script>

<li data-slot="sidebar-menu-item" data-sidebar="menu-item" class={classes.menuItem()}>
	{#if hasChildren}
		<button
			type="button"
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			class={classes.menuButton()}
			aria-expanded={isOpen}
			onclick={() => (open = !isOpen)}
		>
			<SidebarIcon icon={caretRightIcon} class="transition-transform {isOpen ? 'rotate-90' : ''}" />
			<SidebarIcon icon={node.icon ?? folderIcon} />
			<span>{node.label}</span>
		</button>
		{#if isOpen}
			<ul data-slot="sidebar-menu-sub" data-sidebar="menu-sub" class={classes.subMenu()}>
				{#each node.children ?? [] as child, index (child.label + index)}
					<SidebarTreeNodeComponent node={child} {theme} />
				{/each}
			</ul>
		{/if}
	{:else if node.href}
		<a
			href={node.href}
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-active={node.isActive ? 'true' : undefined}
			aria-current={node.isActive ? 'page' : undefined}
			class={classes.menuButton()}
			onclick={node.onClick}
		>
			<SidebarIcon icon={node.icon ?? fileIcon} />
			<span>{node.label}</span>
		</a>
	{:else}
		<button
			type="button"
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-active={node.isActive ? 'true' : undefined}
			class={classes.menuButton()}
			onclick={node.onClick}
		>
			<SidebarIcon icon={node.icon ?? fileIcon} />
			<span>{node.label}</span>
		</button>
	{/if}
</li>
