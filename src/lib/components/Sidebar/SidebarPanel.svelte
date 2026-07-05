<script lang="ts">
	import { magnifyingGlassIcon } from '$lib/components/Icons/magnifyingGlass.js';
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarGroup,
		SidebarMenuButtonItem,
		SidebarMenuEntry,
		SidebarSearch,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import SidebarGroupComponent from './SidebarGroup.svelte';
	import SidebarIcon from './SidebarIcon.svelte';
	import SidebarMenuButton from './SidebarMenuButton.svelte';
	import SidebarMenuList from './SidebarMenuList.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		api,
		items,
		headerButton,
		search,
		headerMenu,
		header,
		content,
		footerButton,
		footerMenu,
		footer,
		contentClass,
		headerClass,
		footerClass,
		menuClass,
		collapseIcon,
		tooltips,
		theme
	}: {
		api: SidebarApi;
		items?: SidebarGroup[];
		headerButton?: SidebarMenuButtonItem;
		search?: SidebarSearch;
		headerMenu?: SidebarMenuEntry[];
		header?: import('svelte').Snippet<[SidebarApi]>;
		content?: import('svelte').Snippet<[SidebarApi]>;
		footerButton?: SidebarMenuButtonItem;
		footerMenu?: SidebarMenuEntry[];
		footer?: import('svelte').Snippet<[SidebarApi]>;
		contentClass?: string;
		headerClass?: string;
		footerClass?: string;
		menuClass?: string;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		theme?: SidebarThemeProps;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
	const collapsed = $derived(
		api.collapsible === 'icon' && api.state === 'collapsed' && !api.isMobile
	);
</script>

{#if headerButton || search || headerMenu || header}
	<div
		data-slot="sidebar-header"
		data-sidebar="header"
		class={classes.header({ className: headerClass })}
	>
		{#if headerButton}
			<SidebarMenuButton
				{...headerButton}
				isMobile={api.isMobile}
				defaultAlign="start"
				{collapsed}
				{theme}
			/>
		{/if}
		{#if search && !collapsed}
			<form
				data-slot="sidebar-search"
				class="relative px-2"
				onsubmit={(event) => event.preventDefault()}
			>
				<input
					placeholder={search.placeholder}
					aria-label={search.label ?? 'Search'}
					value={search.value}
					oninput={search.onInput}
					class={classes.search({ className: search.class })}
				/>
				<SidebarIcon icon={magnifyingGlassIcon} class={classes.searchIcon()} />
			</form>
		{/if}
		{#if headerMenu}
			<SidebarMenuList items={headerMenu} {api} {menuClass} {collapseIcon} {tooltips} {theme} />
		{/if}
		{#if header}
			{@render header(api)}
		{/if}
	</div>
{/if}

<div
	data-slot="sidebar-content"
	data-sidebar="content"
	class={classes.content({ className: contentClass })}
>
	{#if content}
		{@render content(api)}
	{:else if items}
		{#each items as group, index (group.label ?? `group-${index}`)}
			{#if group.separator && index > 0}
				<div
					data-slot="sidebar-separator"
					data-sidebar="separator"
					class={classes.separator()}
				></div>
			{/if}
			<SidebarGroupComponent {group} {api} {menuClass} {collapseIcon} {tooltips} {theme} />
		{/each}
	{/if}
</div>

{#if footerButton || footerMenu || footer}
	<div
		data-slot="sidebar-footer"
		data-sidebar="footer"
		class={classes.footer({ className: footerClass })}
	>
		{#if footerButton}
			<SidebarMenuButton
				{...footerButton}
				isMobile={api.isMobile}
				defaultAlign="end"
				{collapsed}
				{theme}
			/>
		{/if}
		{#if footerMenu}
			<SidebarMenuList items={footerMenu} {api} {menuClass} {collapseIcon} {tooltips} {theme} />
		{/if}
		{#if footer}
			{@render footer(api)}
		{/if}
	</div>
{/if}
