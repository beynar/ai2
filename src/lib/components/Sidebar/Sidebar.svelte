<script lang="ts">
	import type { SidebarProps } from './sidebar.props.js';
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
		bare = false,
		dir,
		width = '16rem',
		widthIcon = '3rem',
		widthMobile = '18rem',
		keyboardShortcut = 'b',
		rail = false,
		edgeReveal = true,
		items,
		class: className,
		sidebarClass,
		insetClass,
		contentClass,
		headerClass,
		footerClass,
		menuClass,
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
		get bare() {
			return bare;
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
	const showEdgeTrigger = $derived(edgeReveal && controller.displayState === 'hidden');
	const withBanner = $derived(!!banner);

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
		{contentClass}
		{headerClass}
		{footerClass}
		{menuClass}
		{collapseIcon}
		{tooltips}
		{theme}
	/>
{/snippet}

{#if bare}
	<div
		bind:this={ref}
		data-slot="sidebar"
		class={classes.surface({ variant, className: sidebarClass })}
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
		class={classes.root({ withBanner, variant, className })}
		{...attachments}
	>
		{#if banner}{@render banner(api)}{/if}
		<div class={classes.row({ withBanner })}>
			{#if collapsible === 'none'}
				<div data-slot="sidebar" class={classes.surface({ variant, className: sidebarClass })}>
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
						class={classes.mobilePanel({ side, className: sidebarClass })}
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
					<div data-slot="sidebar-gap" class={classes.gap({ variant })}></div>
					<div
						bind:this={desktopPanelRef}
						data-slot="sidebar-container"
						data-side={side}
						class={classes.container({ side, variant, edgeRevealed, className: sidebarClass })}
					>
						<div
							data-sidebar="sidebar"
							data-slot="sidebar-inner"
							class={classes.inner({ variant })}
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
				data-slot="sidebar-inset"
				inert={controller.isMobile && controller.openMobile ? true : undefined}
				class={classes.inset({ variant, className: insetClass })}
			>
				{@render children?.(api)}
			</main>
		</div>
	</div>
{/if}
