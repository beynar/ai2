<script lang="ts">
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarDensity,
		SidebarGroup,
		SidebarSize,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import { slide } from 'svelte/transition';
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
		size,
		density,
		theme
	}: {
		group: SidebarGroup;
		api: SidebarApi;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		size: SidebarSize;
		density: SidebarDensity;
		theme?: SidebarThemeProps;
	} = $props();

	let open = $state<boolean | undefined>();
	let labelRef = $state<HTMLButtonElement | null>(null);
	let actionRef = $state<HTMLElement | null>(null);
	let contentRef = $state<HTMLElement | null>(null);
	const classes = $derived(useSidebarTheme(theme));
	const isOpen = $derived(open ?? group.defaultOpen ?? true);
	const isIconCollapsed = $derived(api.displayState === 'collapsed' && !api.isMobile);
	const showGroupContent = $derived(!group.collapsible || isIconCollapsed || isOpen);

	function focusFirstMenuRow() {
		const fallback = Array.from(
			contentRef?.querySelectorAll<HTMLElement>('[data-sidebar="menu-button"]') ?? []
		).find(
			(element) =>
				!element.hasAttribute('disabled') &&
				element.getAttribute('aria-disabled') !== 'true' &&
				!element.closest('[inert]')
		);
		if (fallback) {
			fallback.focus();
			return;
		}
		if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
	}

	$effect(() => {
		const activeElement = document.activeElement;
		if (!(activeElement instanceof HTMLElement)) return;

		if (isIconCollapsed && (activeElement === labelRef || actionRef?.contains(activeElement))) {
			focusFirstMenuRow();
			return;
		}

		if (!showGroupContent && contentRef?.contains(activeElement)) {
			labelRef?.focus();
		}
	});
</script>

{#snippet groupMenu()}
	<div
		bind:this={contentRef}
		data-slot="sidebar-group-content"
		data-sidebar="group-content"
		inert={showGroupContent ? undefined : true}
		aria-hidden={showGroupContent ? undefined : 'true'}
		class={classes.groupContent({ size })}
		transition:slide={{ duration: 180 }}
	>
		{#if group.tree}
			<ul data-slot="sidebar-menu" data-sidebar="menu" class={classes.menu({ density })}>
				{#each group.tree as node, index (node.label + index)}
					<SidebarTreeNode {node} {api} {tooltips} {size} {density} {theme} />
				{/each}
			</ul>
		{:else}
			<SidebarMenuList
				items={group.items ?? []}
				{api}
				{collapseIcon}
				{tooltips}
				{size}
				{density}
				{theme}
			/>
		{/if}
	</div>
{/snippet}

{#if group.collapsible}
	<div
		data-slot="sidebar-group"
		data-sidebar="group"
		class={classes.group({ density, className: group.class })}
	>
		<button
			bind:this={labelRef}
			type="button"
			class={classes.groupLabel({ interactive: true, componentSize: size, density })}
			disabled={isIconCollapsed || undefined}
			inert={isIconCollapsed ? true : undefined}
			aria-hidden={isIconCollapsed ? 'true' : undefined}
			aria-expanded={isOpen}
			onclick={() => (open = !isOpen)}
		>
			<span>{group.label}</span>
			<SidebarIcon
				icon={caretRightIcon}
				class="ml-auto transition-transform {isOpen ? 'rotate-90' : ''}"
			/>
		</button>
		{#if group.action}
			<div
				bind:this={actionRef}
				data-slot="sidebar-group-action"
				data-sidebar="group-action"
				inert={isIconCollapsed ? true : undefined}
				aria-hidden={isIconCollapsed ? 'true' : undefined}
				class={classes.groupAction({
					componentSize: size,
					density,
					hasToggle: true
				})}
			>
				<SidebarAction action={group.action} {api} {size} {theme} />
			</div>
		{/if}
		{#if showGroupContent}
			{@render groupMenu()}
		{/if}
	</div>
{:else}
	<div
		data-slot="sidebar-group"
		data-sidebar="group"
		class={classes.group({ density, className: group.class })}
	>
		{#if group.label}
			<div
				data-slot="sidebar-group-label"
				data-sidebar="group-label"
				aria-hidden={isIconCollapsed ? 'true' : undefined}
				class={classes.groupLabel({ componentSize: size, density })}
			>
				{group.label}
			</div>
		{/if}
		{#if group.action}
			<div
				bind:this={actionRef}
				data-slot="sidebar-group-action"
				data-sidebar="group-action"
				inert={isIconCollapsed ? true : undefined}
				aria-hidden={isIconCollapsed ? 'true' : undefined}
				class={classes.groupAction({ componentSize: size, density, hasToggle: false })}
			>
				<SidebarAction action={group.action} {api} {size} {theme} />
			</div>
		{/if}
		{@render groupMenu()}
	</div>
{/if}
