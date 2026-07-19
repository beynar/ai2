<script lang="ts">
	import type { Snippet } from 'svelte';
	import { on } from 'svelte/events';
	import { useSafeArea } from '$lib/utils/safeArea.svelte.js';
	import { cx } from '$lib/utils/cva/index.js';
	import {
		type SidebarCollapsible,
		type SidebarDisplayState,
		type SidebarDensity,
		type SidebarFrame,
		type SidebarRail,
		type SidebarSide,
		type SidebarSize,
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
		size,
		density,
		rail,
		edgeReveal,
		toggleLabel,
		resizeLabel,
		collapsedResizeLabel,
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
		size: SidebarSize;
		density: SidebarDensity;
		rail: SidebarRail;
		edgeReveal: boolean;
		toggleLabel: string;
		resizeLabel: string;
		collapsedResizeLabel: string;
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
	const hasRail = $derived(rail !== false);
	const railAppearance = $derived(rail === 'thumb' ? 'thumb' : 'line');
	const resizeControlLabel = $derived(hasRail ? `${resizeLabel}; ${toggleLabel}` : resizeLabel);
	const resizeValueText = $derived(
		displayState === 'collapsed' ? collapsedResizeLabel : `${resize.displayWidth}px`
	);

	let panelRef: HTMLElement | null = $state(null);
	let resizeHandleRef: HTMLElement | null = $state(null);
	let edgeTriggerRef: HTMLButtonElement | null = $state(null);
	const revealSafeArea = useSafeArea({
		isActive: () => showEdgeTrigger && edgeRevealed && !resize.isResizing,
		callback: () => (edgeRevealed = false),
		offset: 8,
		trackPosition: true
	});

	$effect(() => {
		if (showEdgeTrigger) return;
		edgeRevealed = false;
	});

	$effect(() => {
		if (displayState === 'hidden') return;
		resize.releaseEdgeRevealSuppression();
	});

	$effect(() => {
		if (!showEdgeTrigger || !resize.isEdgeRevealSuppressed) return;

		return on(window, 'pointermove', (event) => {
			if (event.buttons !== 0) return;

			const trigger = edgeTriggerRef;
			if (!trigger) return;

			const rect = trigger.getBoundingClientRect();
			const isInside =
				event.clientX >= rect.left &&
				event.clientX <= rect.right &&
				event.clientY >= rect.top &&
				event.clientY <= rect.bottom;
			if (!isInside) resize.releaseEdgeRevealSuppression();
		});
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
		const onKeydown = (event: KeyboardEvent) => {
			if (hasRail && (event.key === 'Enter' || event.key === ' ')) {
				event.preventDefault();
				toggle();
				return;
			}
			resize.handleKeydown(event);
		};
		const onClick = () => {
			if (!hasRail || !resize.consumeClickAfterResize()) return;
			toggle();
		};
		node.addEventListener('pointerdown', onPointerDown);
		node.addEventListener('keydown', onKeydown);
		node.addEventListener('click', onClick);
		return () => {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('keydown', onKeydown);
			node.removeEventListener('click', onClick);
		};
	});
</script>

<div
	class={cx(
		'group peer relative hidden text-foreground data-[display-state=hidden]:z-20 data-[edge-revealed=true]:!z-30 md:block data-[side=right]:order-last',
		frame === 'contained' && 'sticky top-0 max-h-[var(--window-height,100dvh)]'
	)}
	data-slot="sidebar"
	data-state={sidebarState}
	data-display-state={displayState}
	data-resizing={resize.shouldSuppressTransitions ? 'true' : undefined}
	data-edge-revealed={edgeRevealed ? 'true' : undefined}
	data-collapsible={collapsibleState}
	data-variant={variant}
	data-side={side}
	data-size={size}
	data-density={density}
	data-rail={hasRail ? railAppearance : undefined}
>
	<div data-slot="sidebar-spacer" class={getSidebarGapClass(variant)}></div>
	<div
		bind:this={panelRef}
		{@attach revealSafeArea.reference}
		data-slot="sidebar-container"
		data-side={side}
		class={getSidebarContainerClass(side, variant, edgeRevealed, frame)}
	>
		<div
			data-sidebar="sidebar"
			data-slot="sidebar-panel"
			data-side={side}
			class={classes.panel({ variant, placement: 'positioned', size, density })}
		>
			{@render children()}
		</div>
	</div>
	{#if hasRail && !resize.enabled}
		<button
			type="button"
			data-slot="sidebar-rail"
			data-sidebar="rail"
			data-side={side}
			data-appearance={railAppearance}
			aria-label={toggleLabel}
			tabindex={-1}
			title={toggleLabel}
			class={classes.rail({ variant, side, appearance: railAppearance })}
			onclick={toggle}
		></button>
	{/if}
	{#if resize.enabled}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
		<div
			bind:this={resizeHandleRef}
			{@attach revealSafeArea.reference}
			role="separator"
			tabindex="0"
			aria-orientation="vertical"
			aria-valuenow={resize.displayWidth}
			aria-valuemin={resize.displayMinWidth}
			aria-valuemax={resize.maxWidth}
			aria-valuetext={resizeValueText}
			aria-label={resizeControlLabel}
			title={resizeControlLabel}
			data-slot="sidebar-resize-handle"
			data-sidebar="resize-handle"
			data-side={side}
			data-appearance={hasRail ? railAppearance : undefined}
			data-dragging={resize.isDragging ? 'true' : undefined}
			class={classes.resizeHandle({
				variant,
				side,
				dragging: resize.isDragging,
				disabled: false,
				combined: hasRail,
				appearance: railAppearance
			})}
		></div>
	{/if}
	{#if showEdgeTrigger}
		<button
			bind:this={edgeTriggerRef}
			{@attach revealSafeArea.reference}
			type="button"
			data-slot="sidebar-edge-trigger"
			data-sidebar="edge-trigger"
			data-side={side}
			aria-label={openLabel}
			tabindex={-1}
			title={openLabel}
			class={classes.edgeTrigger()}
			onpointerenter={() => {
				if (!resize.isEdgeRevealSuppressed) edgeRevealed = true;
			}}
			onfocus={() => (edgeRevealed = true)}
			onclick={open}
		></button>
	{/if}
</div>
