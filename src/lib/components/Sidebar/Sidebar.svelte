<script lang="ts">
	import { cx } from '$lib/utils/cva/index.js';
	import type { SidebarFrame, SidebarProps, SidebarSide, SidebarVariant } from './sidebar.props.js';
	import SidebarPanel from './SidebarPanel.svelte';
	import { useMobileSidebarDialog } from './sidebar-dialog.svelte.js';
	import { SidebarStateController } from './sidebar.state.svelte.js';
	import { useSidebarTheme } from './sidebar.theme.js';

	let {
		ref = $bindable(),
		open = $bindable(true),
		onOpenChange,
		side = 'left',
		variant = 'sidebar',
		collapsible = 'offcanvas',
		mode = 'layout',
		frame = 'viewport',
		dir,
		width = '16rem',
		widthIcon = '3rem',
		widthMobile = '18rem',
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

	let mobilePanelRef: HTMLElement | null = $state(null);
	let desktopPanelRef: HTMLElement | null = $state(null);
	let edgeTriggerRef: HTMLButtonElement | null = $state(null);
	let edgeRevealed = $state(false);

	function setOpen(nextOpen: boolean) {
		open = nextOpen;
		onOpenChange?.(nextOpen);
	}

	function isPointerInside(element: HTMLElement | null, event: PointerEvent) {
		if (!element) return false;
		const bounds = element.getBoundingClientRect();
		return (
			event.clientX >= bounds.left &&
			event.clientX <= bounds.right &&
			event.clientY >= bounds.top &&
			event.clientY <= bounds.bottom
		);
	}

	const controller = new SidebarStateController({
		get mode() {
			return mode;
		},
		get keyboardShortcut() {
			return keyboardShortcut;
		},
		get open() {
			return open;
		},
		get side() {
			return side;
		},
		get collapsible() {
			return collapsible;
		},
		setOpen
	});

	const api = controller.api;
	const classes = $derived(useSidebarTheme(theme));
	const collapsibleState = $derived(controller.state === 'collapsed' ? collapsible : '');
	const panelWidth = $derived(
		mode === 'panel' && controller.displayState === 'collapsed' && collapsible === 'icon'
			? widthIcon
			: width
	);
	const showEdgeTrigger = $derived(edgeReveal && controller.displayState === 'hidden');
	const withBanner = $derived(!!banner);
	const rootClass = $derived(
		cx(
			'group/sidebar-wrapper flex w-full text-foreground',
			frame === 'viewport'
				? 'min-h-svh'
				: 'relative h-full min-h-0 overflow-hidden rounded-[inherit]',
			withBanner && 'flex-col',
			className
		)
	);
	const rowClass = $derived(cx('flex w-full flex-1', !withBanner && 'contents'));

	function getGapClass(currentVariant: SidebarVariant) {
		return cx(
			'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0',
			currentVariant === 'sidebar'
				? 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
				: 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
		);
	}

	function getContainerClass(
		currentSide: SidebarSide,
		currentVariant: SidebarVariant,
		isEdgeRevealed: boolean,
		currentFrame: SidebarFrame
	) {
		return cx(
			'inset-y-0 z-10 hidden w-[var(--sidebar-width)] bg-transparent transition-[left,right,width] duration-200 ease-linear md:flex',
			currentFrame === 'viewport' ? 'fixed h-svh' : 'absolute h-full',
			currentSide === 'left'
				? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
				: 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
			currentVariant === 'sidebar'
				? 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
				: 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]',
			isEdgeRevealed && 'z-40 shadow-xl',
			currentSide === 'left' && isEdgeRevealed && '!left-0',
			currentSide === 'right' && isEdgeRevealed && '!right-0'
		);
	}

	$effect(() => {
		if (showEdgeTrigger) return;
		edgeRevealed = false;
	});

	$effect(() => {
		if (!edgeRevealed) return;

		const closeWhenPointerLeaves = (event: PointerEvent) => {
			if (isPointerInside(desktopPanelRef, event)) return;
			if (isPointerInside(edgeTriggerRef, event)) return;
			edgeRevealed = false;
		};

		window.addEventListener('pointermove', closeWhenPointerLeaves);
		return () => window.removeEventListener('pointermove', closeWhenPointerLeaves);
	});

	useMobileSidebarDialog({
		get isOpen() {
			return controller.openMobile;
		},
		get isMobile() {
			return controller.isMobile;
		},
		get panel() {
			return mobilePanelRef;
		},
		close: () => controller.setOpenMobile(false)
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
		style:--sidebar-width={width}
		style:--sidebar-width-icon={widthIcon}
		style:--sidebar-width-mobile={widthMobile}
		data-frame={frame}
		class={rootClass}
		{...attachments}
	>
		{#if banner}{@render banner(api)}{/if}
		<div class={rowClass}>
			{#if collapsible === 'none'}
				<div
					data-slot="sidebar"
					data-sidebar="sidebar"
					data-side={side}
					class={classes.panel({ variant, placement: 'static' })}
				>
					{@render panel()}
				</div>
			{:else if controller.isMobile}
				{#if controller.openMobile}
					<button
						type="button"
						class={classes.overlay()}
						aria-label="Close Sidebar"
						onclick={() => controller.setOpenMobile(false)}
					></button>
					<div
						bind:this={mobilePanelRef}
						data-slot="sidebar"
						data-sidebar="sidebar"
						data-mobile="true"
						role="dialog"
						aria-modal="true"
						aria-label="Sidebar navigation"
						tabindex="-1"
						{dir}
						class={classes.mobilePanel({ side })}
					>
						{@render panel()}
					</div>
				{/if}
			{:else}
				<div
					class="group peer relative hidden text-foreground md:block data-[side=right]:order-last"
					data-slot="sidebar"
					data-state={controller.state}
					data-display-state={controller.displayState}
					data-edge-revealed={edgeRevealed ? 'true' : undefined}
					data-collapsible={collapsibleState}
					data-variant={variant}
					data-side={side}
				>
					<div data-slot="sidebar-spacer" class={getGapClass(variant)}></div>
					<div
						bind:this={desktopPanelRef}
						data-slot="sidebar-container"
						data-side={side}
						class={getContainerClass(side, variant, edgeRevealed, frame)}
					>
						<div
							data-sidebar="sidebar"
							data-slot="sidebar-panel"
							data-side={side}
							class={classes.panel({ variant, placement: 'positioned' })}
						>
							{@render panel()}
						</div>
					</div>
					{#if rail}
						<button
							type="button"
							data-slot="sidebar-rail"
							data-sidebar="rail"
							data-side={side}
							aria-label="Toggle Sidebar"
							tabindex={-1}
							title="Toggle Sidebar"
							class={classes.rail()}
							onclick={controller.toggle}
						></button>
					{/if}
					{#if showEdgeTrigger}
						<button
							bind:this={edgeTriggerRef}
							type="button"
							data-slot="sidebar-edge-trigger"
							data-sidebar="edge-trigger"
							data-side={side}
							aria-label="Open Sidebar"
							tabindex={-1}
							title="Open Sidebar"
							class={classes.edgeTrigger()}
							onpointerenter={() => (edgeRevealed = true)}
							onfocus={() => (edgeRevealed = true)}
							onclick={() => controller.setOpen(true)}
						></button>
					{/if}
				</div>
			{/if}

			<main
				data-slot="sidebar-main"
				inert={controller.isMobile && controller.openMobile ? true : undefined}
				class="relative flex min-w-0 flex-1 flex-col bg-transparent"
			>
				{@render children?.(api)}
			</main>
		</div>
	</div>
{/if}
