<script lang="ts">
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { cx } from '$lib/utils/cva/index.js';
	import type { SidebarDisplayState, SidebarProps } from './sidebar.props.js';
	import SidebarDesktopShell from './SidebarDesktopShell.svelte';
	import SidebarMobileDrawer from './SidebarMobileDrawer.svelte';
	import SidebarPanel from './SidebarPanel.svelte';
	import { SidebarDisplayStateBridge } from './sidebar.display-state.svelte.js';
	import { SidebarResizeState } from './sidebar.resize.svelte.js';
	import { SidebarStateController } from './sidebar.state.svelte.js';
	import { useSidebarTheme } from './sidebar.theme.js';
	let {
		ref = $bindable(),
		open = $bindable(true),
		onOpenChange,
		displayState = $bindable<SidebarDisplayState | undefined>(undefined),
		onDisplayStateChange,
		side = 'left',
		variant = 'sidebar',
		collapsible = 'offcanvas',
		mode = 'layout',
		frame = 'viewport',
		dir,
		width = $bindable('16rem'),
		widthIcon = '3rem',
		widthMobile = '18rem',
		resizable,
		keyboardShortcut = 'b',
		rail = false,
		edgeReveal = true,
		items,
		class: className,
		collapseIcon = 'chevron',
		tooltips = 'auto',
		headerButton,
		search,
		headerMenu,
		header,
		content,
		footerButton,
		footerMenu,
		footer,
		children,
		banner,
		theme,
		...attachments
	}: SidebarProps = $props();
	let edgeRevealed = $state(false);
	function setOpen(nextOpen: boolean) {
		open = nextOpen;
		onOpenChange?.(nextOpen);
	}
	function setWidth(nextWidth: string) {
		width = nextWidth;
	}
	const t = $derived(useI18n());
	const classes = $derived(useSidebarTheme(theme));
	const displayStateBridge = new SidebarDisplayStateBridge({
		get open() {
			return open;
		},
		get displayState() {
			return displayState;
		},
		get collapsible() {
			return collapsible;
		},
		setOpen,
		setDisplayStateProp: (nextDisplayState) => {
			displayState = nextDisplayState;
		},
		get onDisplayStateChange() {
			return onDisplayStateChange;
		}
	});
	const controller = new SidebarStateController({
		get mode() {
			return mode;
		},
		get keyboardShortcut() {
			return keyboardShortcut;
		},
		get displayState() {
			return displayStateBridge.displayState;
		},
		get side() {
			return side;
		},
		get collapsible() {
			return collapsible;
		},
		setDisplayState: displayStateBridge.setDisplayState
	});
	const resize = new SidebarResizeState({
		get width() {
			return width;
		},
		get resizable() {
			return resizable;
		},
		get side() {
			return side;
		},
		get displayState() {
			return controller.displayState;
		},
		get collapsible() {
			return collapsible;
		},
		setWidth,
		setDisplayState: displayStateBridge.setDisplayState
	});
	const api = controller.api;
	const collapsibleState = $derived(controller.collapsibleState);
	const panelWidth = $derived(
		mode === 'panel' && controller.displayState === 'collapsed' ? widthIcon : width
	);
	const withBanner = $derived(!!banner);
	const rootClass = $derived(
		cx(
			'group/sidebar-wrapper flex w-full text-foreground',
			frame === 'viewport'
				? 'h-svh min-h-0 overflow-hidden'
				: 'relative h-full min-h-0 overflow-hidden rounded-[inherit]',
			withBanner && 'flex-col',
			className
		)
	);
	const rowClass = $derived(cx('flex w-full flex-1 min-h-0', !withBanner && 'contents'));
	$effect(() => {
		if (!controller.isMobile) {
			controller.setOpenMobile(false);
		}
	});
</script>

{#snippet panel()}
	<SidebarPanel
		{api}
		{items}
		{headerButton}
		{search}
		{headerMenu}
		{header}
		{content}
		{footerButton}
		{footerMenu}
		{footer}
		{collapseIcon}
		{tooltips}
		{theme}
	/>
{/snippet}
{#if mode === 'panel'}
	<div
		bind:this={ref}
		data-slot="sidebar"
		data-sidebar="sidebar"
		data-state={controller.state}
		data-display-state={controller.displayState}
		data-collapsible={collapsibleState}
		data-variant={variant}
		data-side={side}
		style:--sidebar-width={panelWidth}
		style:--sidebar-width-icon={widthIcon}
		style:--sidebar-width-mobile={widthMobile}
		class={cx('group', classes.panel({ variant, placement: 'panel', className }))}
		{...attachments}
	>
		{@render panel()}
	</div>
{:else}
	<div
		bind:this={ref}
		data-slot="sidebar-wrapper"
		data-state={controller.state}
		data-display-state={controller.displayState}
		data-collapsible={collapsibleState}
		data-variant={variant}
		data-side={side}
		data-frame={frame}
		style:--sidebar-width={width}
		style:--sidebar-width-icon={widthIcon}
		style:--sidebar-width-mobile={widthMobile}
		class={rootClass}
		{...attachments}
	>
		{#if banner}{@render banner(api)}{/if}
		<div class={rowClass}>
			{#if controller.isMobile}
				<SidebarMobileDrawer
					open={controller.openMobile}
					close={() => controller.setOpenMobile(false)}
					{side}
					{widthMobile}
					{dir}
					label={`${t.sidebar} ${t.navigation}`}
					{theme}
				>
					{@render panel()}
				</SidebarMobileDrawer>
			{:else if collapsible === 'none'}
				<div
					data-slot="sidebar"
					data-sidebar="sidebar"
					data-side={side}
					class={classes.panel({ variant, placement: 'static' })}
				>
					{@render panel()}
				</div>
			{:else}
				<SidebarDesktopShell
					sidebarState={controller.state}
					displayState={controller.displayState}
					{collapsibleState}
					{variant}
					{side}
					{frame}
					{rail}
					{edgeReveal}
					toggleLabel={`${t.toggle} ${t.sidebar}`}
					openLabel={`${t.open} ${t.sidebar}`}
					toggle={controller.toggle}
					open={() => controller.setDisplayState('expanded')}
					{resize}
					{theme}
					bind:edgeRevealed
				>
					{@render panel()}
				</SidebarDesktopShell>
			{/if}
			<main
				data-slot="sidebar-main"
				inert={controller.isMobile && controller.openMobile ? true : undefined}
				class={classes.main({
					variant,
					side,
					displayState: controller.displayState,
					edgeRevealed
				})}
			>
				{@render children?.(api)}
			</main>
		</div>
	</div>
{/if}
