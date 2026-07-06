<script lang="ts">
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarMenuEntry,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import SidebarMenuItem from './SidebarMenuItem.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		items,
		api,
		collapseIcon,
		tooltips,
		theme
	}: {
		items: SidebarMenuEntry[];
		api: SidebarApi;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		theme?: SidebarThemeProps;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
</script>

<ul data-slot="sidebar-menu" data-sidebar="menu" class={classes.menu()}>
	{#each items as item, index (item.label + index)}
		<SidebarMenuItem {item} {api} {collapseIcon} {tooltips} {theme} />
	{/each}
</ul>
