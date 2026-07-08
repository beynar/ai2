<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type DialogThemeProps } from '$lib/components/Dialog/index.js';
	import type { SidebarSide } from './sidebar.props.js';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		open,
		close,
		side,
		widthMobile,
		dir,
		label,
		theme,
		children
	}: {
		open: boolean;
		close: () => void;
		side: SidebarSide;
		widthMobile: string;
		dir?: 'ltr' | 'rtl';
		label: string;
		theme?: SidebarThemeProps;
		children: Snippet;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
	const dialogType = $derived(side === 'right' ? 'drawerRight' : 'drawerLeft');
	const dialogTheme = {
		override: true,
		content: {
			base: 'relative z-50 flex h-full max-h-full flex-col overflow-hidden rounded-none bg-background p-0 text-foreground shadow-xl will-change-transform transition-transform duration-200 ease-out'
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
		style:--sidebar-width-mobile={widthMobile}
		{dir}
		class={classes.mobilePanel({ side })}
	>
		{@render children()}
	</div>
</Dialog>
