<script lang="ts">
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarGroup,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import SidebarAction from './SidebarAction.svelte';
	import SidebarIcon from './SidebarIcon.svelte';
	import SidebarMenuList from './SidebarMenuList.svelte';
	import SidebarTreeNode from './SidebarTreeNode.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		group,
		api,
		collapseIcon,
		tooltips,
		theme
	}: {
		group: SidebarGroup;
		api: SidebarApi;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		theme?: SidebarThemeProps;
	} = $props();

	let open = $state<boolean | undefined>();
	const classes = $derived(useSidebarTheme(theme));
	const isOpen = $derived(open ?? group.defaultOpen ?? true);
	const hiddenLabel = $derived(api.displayState === 'collapsed' && !api.isMobile);
</script>

{#snippet groupMenu()}
	<div
		data-slot="sidebar-group-content"
		data-sidebar="group-content"
		class={classes.groupContent()}
	>
		{#if group.tree}
			<ul data-slot="sidebar-menu" data-sidebar="menu" class={classes.menu()}>
				{#each group.tree as node, index (node.label + index)}
					<SidebarTreeNode {node} {theme} />
				{/each}
			</ul>
		{:else}
			<SidebarMenuList items={group.items ?? []} {api} {collapseIcon} {tooltips} {theme} />
		{/if}
	</div>
{/snippet}

{#if group.collapsible}
	<div
		data-slot="sidebar-group"
		data-sidebar="group"
		class={classes.group({ className: group.class })}
	>
		<button
			type="button"
			class={classes.groupLabel({ interactive: true })}
			aria-expanded={isOpen}
			onclick={() => (open = !isOpen)}
		>
			{#if !hiddenLabel}
				<span>{group.label}</span>
				<SidebarIcon
					icon={caretRightIcon}
					class="ml-auto size-4 transition-transform {isOpen ? 'rotate-90' : ''}"
				/>
			{:else}
				<span class="sr-only">{group.label}</span>
			{/if}
		</button>
		{#if group.action}
			<div
				data-slot="sidebar-group-action"
				data-sidebar="group-action"
				class={classes.groupAction({ className: 'right-10' })}
			>
				<SidebarAction action={group.action} {api} {theme} />
			</div>
		{/if}
		{#if isOpen}
			{@render groupMenu()}
		{/if}
	</div>
{:else}
	<div
		data-slot="sidebar-group"
		data-sidebar="group"
		class={classes.group({ className: group.class })}
	>
		{#if group.label}
			<div data-slot="sidebar-group-label" data-sidebar="group-label" class={classes.groupLabel()}>
				{group.label}
			</div>
		{/if}
		{#if group.action}
			<div
				data-slot="sidebar-group-action"
				data-sidebar="group-action"
				class={classes.groupAction()}
			>
				<SidebarAction action={group.action} {api} {theme} />
			</div>
		{/if}
		{@render groupMenu()}
	</div>
{/if}
