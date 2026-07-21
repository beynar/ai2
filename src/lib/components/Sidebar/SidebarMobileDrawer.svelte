<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type DialogThemeProps } from '$lib/components/Dialog/index.js';
	import type { SidebarDensity, SidebarSide, SidebarSize } from './sidebar.props.js';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		open,
		close,
		side,
		widthMobile,
		dir,
		size,
		density,
		label,
		theme,
		children
	}: {
		open: boolean;
		close: () => void;
		side: SidebarSide;
		widthMobile: string;
		dir?: 'ltr' | 'rtl';
		size: SidebarSize;
		density: SidebarDensity;
		label: string;
		theme?: SidebarThemeProps;
		children: Snippet;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
	const dialogType = $derived(side === 'right' ? 'drawerRight' : 'drawerLeft');
	const dialogTheme = {
		override: true,
		content: {
			base: 'relative z-50 flex h-full max-h-full flex-col overflow-hidden rounded-none bg-surface-floating p-0 text-neutral shadow-xl will-change-transform transition-transform duration-200 ease-out [&>div]:h-full [&>div]:min-h-0'
		},
		header: {
			base: 'sr-only'
		},
		title: {
			base: 'sr-only'
		},
		closeButton: {
			base: 'hidden'
		}
	} satisfies DialogThemeProps;
</script>

<Dialog
	{open}
	onClose={close}
	type={dialogType}
	responsive={false}
	thumb={false}
	title={label}
	class="md:hidden"
	theme={dialogTheme}
>
	<div
		data-slot="sidebar"
		data-sidebar="sidebar"
		data-mobile="true"
		data-side={side}
		data-size={size}
		data-density={density}
		style:--sidebar-width-mobile={widthMobile}
		{dir}
		class={classes.mobilePanel({ side, size, density })}
	>
		{@render children()}
	</div>
</Dialog>
