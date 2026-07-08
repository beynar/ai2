<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		type SidebarCollapsible,
		type SidebarDisplayState,
		type SidebarFrame,
		type SidebarSide,
		type SidebarState,
		type SidebarVariant
	} from './sidebar.props.js';
	import { getSidebarContainerClass, getSidebarGapClass } from './sidebar-layout.js';
	import type { SidebarResizeState } from './sidebar.resize.svelte.js';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	let {
		sidebarState,
		displayState,
		collapsibleState,
		variant,
		side,
		frame,
		rail,
		edgeReveal,
		toggleLabel,
		openLabel,
		toggle,
		open,
		edgeRevealed = $bindable(false),
		resize,
		theme,
		children
	}: {
		sidebarState: SidebarState;
		displayState: SidebarDisplayState;
		collapsibleState: SidebarCollapsible | '';
		variant: SidebarVariant;
		side: SidebarSide;
		frame: SidebarFrame;
		rail: boolean;
		edgeReveal: boolean;
		toggleLabel: string;
		openLabel: string;
		toggle: () => void;
		open: () => void;
		edgeRevealed?: boolean;
		resize: SidebarResizeState;
		theme?: SidebarThemeProps;
		children: Snippet;
	} = $props();

	const classes = $derived(useSidebarTheme(theme));
	const showEdgeTrigger = $derived(edgeReveal && displayState === 'hidden');

	let panelRef: HTMLElement | null = $state(null);
	let resizeHandleRef: HTMLElement | null = $state(null);
	let edgeTriggerRef: HTMLButtonElement | null = $state(null);

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

	$effect(() => {
		if (showEdgeTrigger) return;
		edgeRevealed = false;
	});

	$effect(() => {
		const node = panelRef;
		resize.panelNode = node;
		return () => {
			if (resize.panelNode === node) {
				resize.panelNode = null;
			}
		};
	});

	$effect(() => {
		const node = resizeHandleRef;
		if (!node) return;

		const onPointerDown = (event: PointerEvent) => resize.handlePointerdown(event, node);
		const onKeydown = (event: KeyboardEvent) => resize.handleKeydown(event);
		node.addEventListener('pointerdown', onPointerDown);
		node.addEventListener('keydown', onKeydown);
		return () => {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('keydown', onKeydown);
		};
	});

	$effect(() => {
		if (!edgeRevealed) return;

		const closeWhenPointerLeaves = (event: PointerEvent) => {
			if (isPointerInside(panelRef, event)) return;
			if (isPointerInside(edgeTriggerRef, event)) return;
			edgeRevealed = false;
		};

		window.addEventListener('pointermove', closeWhenPointerLeaves);
		return () => window.removeEventListener('pointermove', closeWhenPointerLeaves);
	});
</script>

<div
	class="group peer relative hidden text-foreground md:block data-[side=right]:order-last"
	data-slot="sidebar"
	data-state={sidebarState}
	data-display-state={displayState}
	data-resizing={resize.isResizing ? 'true' : undefined}
	data-edge-revealed={edgeRevealed ? 'true' : undefined}
	data-collapsible={collapsibleState}
	data-variant={variant}
	data-side={side}
>
	<div data-slot="sidebar-spacer" class={getSidebarGapClass(variant)}></div>
	<div
		bind:this={panelRef}
		data-slot="sidebar-container"
		data-side={side}
		class={getSidebarContainerClass(side, variant, edgeRevealed, frame)}
	>
		<div
			data-sidebar="sidebar"
			data-slot="sidebar-panel"
			data-side={side}
			class={classes.panel({ variant, placement: 'positioned' })}
		>
			{@render children()}
		</div>
	</div>
	{#if rail}
		<button
			type="button"
			data-slot="sidebar-rail"
			data-sidebar="rail"
			data-side={side}
			aria-label={toggleLabel}
			tabindex={-1}
			title={toggleLabel}
			class={classes.rail({ variant, side })}
			onclick={toggle}
		></button>
	{/if}
	{#if resize.enabled}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
		<div
			bind:this={resizeHandleRef}
			role="separator"
			tabindex="0"
			aria-orientation="vertical"
			aria-valuenow={resize.currentWidth}
			aria-valuemin={resize.minWidth}
			aria-valuemax={resize.maxWidth}
			aria-valuetext={`${resize.currentWidth}px`}
			aria-label="Resize sidebar"
			data-slot="sidebar-resize-handle"
			data-sidebar="resize-handle"
			data-side={side}
			data-dragging={resize.isDragging ? 'true' : undefined}
			class={classes.resizeHandle({
				variant,
				side,
				dragging: resize.isDragging,
				disabled: false
			})}
		></div>
	{/if}
	{#if showEdgeTrigger}
		<button
			bind:this={edgeTriggerRef}
			type="button"
			data-slot="sidebar-edge-trigger"
			data-sidebar="edge-trigger"
			data-side={side}
			aria-label={openLabel}
			tabindex={-1}
			title={openLabel}
			class={classes.edgeTrigger()}
			onpointerenter={() => (edgeRevealed = true)}
			onfocus={() => (edgeRevealed = true)}
			onclick={open}
		></button>
	{/if}
</div>
