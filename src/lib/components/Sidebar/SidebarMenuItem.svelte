<script lang="ts">
	import PopupMenu from '$lib/components/PopupMenu/PopupMenu.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import { dotsThreeIcon } from '$lib/components/Icons/dotsThree.js';
	import { minusIcon } from '$lib/components/Icons/minus.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarMenuEntry,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import { getSidebarMenuPosition } from './sidebar-position.js';
	import SidebarAction from './SidebarAction.svelte';
	import SidebarIcon from './SidebarIcon.svelte';
	import SidebarMenuSubItem from './SidebarMenuSubItem.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		item,
		api,
		collapseIcon,
		tooltips,
		theme
	}: {
		item: SidebarMenuEntry;
		api: SidebarApi;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		theme?: SidebarThemeProps;
	} = $props();

	let open = $state<boolean | undefined>();
	const classes = $derived(useSidebarTheme(theme));
	const t = $derived(useI18n());
	const isOpen = $derived(open ?? item.defaultOpen ?? false);
	const isIconCollapsed = $derived(api.displayState === 'collapsed' && !api.isMobile);
	const showTooltip = $derived((tooltips === 'always' || isIconCollapsed) && !api.isMobile);
	const tooltipContent = $derived(showTooltip ? (item.tooltip ?? item.label) : undefined);
	const hasSubmenu = $derived(!!item.items?.length);

	function toggleSubmenu() {
		if (item.disabled) return;
		open = !isOpen;
	}
</script>

{#snippet entryContent()}
	<SidebarIcon icon={item.icon} />
	{#if !isIconCollapsed}
		<span>{item.label}</span>
	{:else}
		<span class="sr-only">{item.label}</span>
	{/if}
{/snippet}

{#snippet indicator()}
	{#if !isIconCollapsed}
		{#if collapseIcon === 'plus-minus'}
			<SidebarIcon icon={isOpen ? minusIcon : plusIcon} class="ml-auto size-4" />
		{:else}
			<SidebarIcon
				icon={caretRightIcon}
				class="ml-auto size-4 transition-transform {isOpen ? 'rotate-90' : ''}"
			/>
		{/if}
	{/if}
{/snippet}

{#snippet leafButton()}
	{#if item.href}
		<a
			href={item.href}
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={item.size ?? 'default'}
			data-active={item.isActive ? 'true' : undefined}
			aria-current={item.isActive ? 'page' : undefined}
			aria-disabled={item.disabled || undefined}
			tabindex={item.disabled ? -1 : undefined}
			class={classes.menuButton({ variant: item.variant, size: item.size, className: item.class })}
			{@attach tooltipContent ? tooltip({ content: tooltipContent, position: 'right' }) : undefined}
			onclick={item.onClick}
		>
			{@render entryContent()}
		</a>
	{:else}
		<button
			type="button"
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={item.size ?? 'default'}
			data-active={item.isActive ? 'true' : undefined}
			aria-current={item.isActive ? 'page' : undefined}
			disabled={item.disabled || undefined}
			class={classes.menuButton({ variant: item.variant, size: item.size, className: item.class })}
			{@attach tooltipContent ? tooltip({ content: tooltipContent, position: 'right' }) : undefined}
			onclick={item.onClick}
		>
			{@render entryContent()}
		</button>
	{/if}
{/snippet}

{#snippet dropdownButton()}
	<PopupMenu
		menu={{ items: item.menu ?? [] }}
		position={getSidebarMenuPosition(item.menuSide, item.menuAlign, api.isMobile)}
		class={item.menuClass}
		fitTrigger
	>
		{#snippet trigger(popover)}
			<button
				type="button"
				data-slot="sidebar-menu-button"
				data-sidebar="menu-button"
				data-size={item.size ?? 'default'}
				disabled={item.disabled || undefined}
				class={classes.menuButton({
					variant: item.variant,
					size: item.size,
					className: ['aria-expanded:bg-background-muted', item.class]
				})}
				aria-expanded={popover.isOpen}
				aria-haspopup="menu"
				aria-controls={popover.isOpen ? popover.id : undefined}
				{@attach tooltipContent
					? tooltip({ content: tooltipContent, position: 'right' })
					: undefined}
				{@attach popover.reference}
				onclick={() => popover.toggle()}
			>
				{@render entryContent()}
				{#if !isIconCollapsed}<SidebarIcon icon={dotsThreeIcon} class="ml-auto size-4" />{/if}
			</button>
		{/snippet}
	</PopupMenu>
{/snippet}

{#snippet submenu()}
	{#if !isIconCollapsed}
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			class={classes.subMenu({ className: item.subClass })}
		>
			{#each item.items ?? [] as sub, index (sub.label + index)}
				<SidebarMenuSubItem {sub} {theme} />
			{/each}
		</ul>
	{/if}
{/snippet}

<li data-slot="sidebar-menu-item" data-sidebar="menu-item" class={classes.menuItem()}>
	{#if item.menu}
		{@render dropdownButton()}
	{:else if hasSubmenu && item.collapsible === false}
		{@render leafButton()}
		{@render submenu()}
	{:else if hasSubmenu}
		{#if item.href}
			<div class="relative">
				{@render leafButton()}
				<button
					type="button"
					class={classes.menuAction({
						className: 'left-1 right-auto bg-background-muted data-[open=true]:rotate-90'
					})}
					data-open={isOpen ? 'true' : undefined}
					aria-label={`${t.toggle} ${t.submenu}`}
					aria-expanded={isOpen}
					onclick={toggleSubmenu}
				>
					<SidebarIcon icon={caretRightIcon} />
				</button>
			</div>
		{:else}
			<button
				type="button"
				data-slot="sidebar-menu-button"
				data-sidebar="menu-button"
				data-size={item.size ?? 'default'}
				data-active={item.isActive ? 'true' : undefined}
				disabled={item.disabled || undefined}
				class={classes.menuButton({
					variant: item.variant,
					size: item.size,
					className: item.class
				})}
				aria-expanded={isOpen}
				{@attach tooltipContent
					? tooltip({ content: tooltipContent, position: 'right' })
					: undefined}
				onclick={toggleSubmenu}
			>
				{@render entryContent()}
				{@render indicator()}
			</button>
		{/if}
		{#if isOpen}
			{@render submenu()}
		{/if}
	{:else}
		{@render leafButton()}
	{/if}

	{#if item.badge != null && !isIconCollapsed}
		<div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" class={classes.badge()}>
			{item.badge}
		</div>
	{/if}
	{#if item.action}
		<div data-slot="sidebar-menu-action" data-sidebar="menu-action" class={classes.menuAction()}>
			<SidebarAction action={item.action} {api} {theme} />
		</div>
	{/if}
</li>
