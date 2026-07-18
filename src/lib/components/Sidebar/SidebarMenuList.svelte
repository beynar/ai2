<script lang="ts">
	import type {
		SidebarApi,
		SidebarCollapseIcon,
		SidebarDensity,
		SidebarMenuEntry,
		SidebarSize,
		SidebarTooltipMode
	} from './sidebar.props.js';
	import SidebarMenuItem from './SidebarMenuItem.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		items,
		api,
		collapseIcon,
		tooltips,
		size,
		density,
		theme
	}: {
		items: SidebarMenuEntry[];
		api: SidebarApi;
		collapseIcon: SidebarCollapseIcon;
		tooltips: SidebarTooltipMode;
		size: SidebarSize;
		density: SidebarDensity;
		theme?: SidebarThemeProps;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
</script>

<ul data-slot="sidebar-menu" data-sidebar="menu" class={classes.menu({ density })}>
	{#each items as item, index (item.label + index)}
		<SidebarMenuItem {item} {api} {collapseIcon} {tooltips} {size} {density} {theme} />
	{/each}
</ul>
