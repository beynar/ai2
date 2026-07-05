<script lang="ts">
	import type { SidebarMenuSubEntry } from './sidebar.props.js';
	import SidebarIcon from './SidebarIcon.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let { sub, theme }: { sub: SidebarMenuSubEntry; theme?: SidebarThemeProps } = $props();

	const classes = $derived(useSidebarTheme(theme));
</script>

<li
	data-slot="sidebar-menu-sub-item"
	data-sidebar="menu-sub-item"
	class="group/menu-sub-item relative"
>
	{#if sub.href}
		<a
			href={sub.href}
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={sub.size ?? 'md'}
			data-active={sub.isActive ? 'true' : undefined}
			aria-current={sub.isActive ? 'page' : undefined}
			aria-disabled={sub.disabled || undefined}
			tabindex={sub.disabled ? -1 : undefined}
			class={classes.subButton({ size: sub.size })}
			onclick={sub.onClick}
		>
			<SidebarIcon icon={sub.icon} />
			<span>{sub.label}</span>
		</a>
	{:else}
		<button
			type="button"
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={sub.size ?? 'md'}
			data-active={sub.isActive ? 'true' : undefined}
			disabled={sub.disabled || undefined}
			class={classes.subButton({ size: sub.size })}
			onclick={sub.onClick}
		>
			<SidebarIcon icon={sub.icon} />
			<span>{sub.label}</span>
		</button>
	{/if}
</li>
