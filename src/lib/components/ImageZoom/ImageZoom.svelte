<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { magnifyingGlassPlusIcon } from '../Icons/magnifyingGlassPlus.js';
	import { xIcon } from '../Icons/x.js';
	import { portal } from '$lib/attachments/portal.js';
	import { ImageZoomState } from './imageZoom.state.svelte.js';
	import type { ImageZoomProps } from './imageZoom.props.js';
	import { useImageZoomTheme } from './imageZoom.theme.js';

	let {
		id: customId,
		src,
		alt,
		zoomSrc,
		open = $bindable(false),
		disabled = false,
		width,
		height,
		srcset,
		sizes,
		loading = 'lazy',
		decoding = 'async',
		zoomMargin = 32,
		transitionDuration = 240,
		closeOnClickOutside = true,
		closeOnEscape = true,
		closeOnScroll = true,
		lockScroll = false,
		buttonLabel = 'Zoom image',
		closeLabel = 'Close image zoom',
		showIndicator = true,
		indicatorPosition = 'top-right',
		class: className,
		onOpenChange,
		onOpen,
		onClose,
		theme,
		children,
		caption,
		indicator,
		...attachments
	}: ImageZoomProps = $props();

	const generatedId = $props.id();
	const id = $derived(customId || generatedId);
	const classes = $derived(useImageZoomTheme(theme));
	const state = new ImageZoomState({
		get src() {
			return src;
		},
		get alt() {
			return alt;
		},
		get zoomSrc() {
			return zoomSrc;
		},
		get isOpen() {
			return open;
		},
		set isOpen(value) {
			open = value;
		},
		get disabled() {
			return disabled;
		},
		get zoomMargin() {
			return zoomMargin;
		},
		get transitionDuration() {
			return transitionDuration;
		},
		get closeOnEscape() {
			return closeOnEscape;
		},
		get closeOnScroll() {
			return closeOnScroll;
		},
		get lockScroll() {
			return lockScroll;
		},
		get onOpenChange() {
			return onOpenChange;
		},
		get onOpen() {
			return onOpen;
		},
		get onClose() {
			return onClose;
		}
	});

	const imageRect = $derived(state.imageRect);
</script>

<div class={classes.root({ className })} {...attachments}>
	<button
		type="button"
		bind:this={state.triggerElement}
		class={classes.trigger()}
		{disabled}
		aria-label={buttonLabel}
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-controls={open ? id : undefined}
		onclick={state.open}
	>
		{#if children}
			<Slot render={children} payload={state.payload} />
		{:else if src}
			<img
				bind:this={state.thumbnailImageElement}
				{src}
				alt={alt ?? ''}
				{width}
				{height}
				{srcset}
				{sizes}
				{loading}
				{decoding}
				class={classes.image()}
			/>
		{/if}

		{#if showIndicator}
			<span aria-hidden="true" class={classes.indicator({ position: indicatorPosition })}>
				{#if indicator}
					<Slot render={indicator} payload={state.payload} />
				{:else}
					{@render magnifyingGlassPlusIcon({ size: 18 })}
				{/if}
			</span>
		{/if}
	</button>
</div>

{#if state.mounted && imageRect}
	<div
		{@attach portal()}
		{id}
		role="dialog"
		aria-modal="true"
		aria-label={state.dialogLabel}
		class={classes.portal()}
	>
		<button
			type="button"
			class={classes.overlay({ visible: state.overlayVisible })}
			aria-hidden="true"
			tabindex="-1"
			onclick={() => closeOnClickOutside && state.close()}
			style:transition-duration={`${state.animationDuration}ms`}
		></button>

		<button
			type="button"
			class={classes.modalButton({ visible: state.overlayVisible })}
			style:left={`${imageRect.left}px`}
			style:top={`${imageRect.top}px`}
			style:width={`${imageRect.width}px`}
			style:height={`${imageRect.height}px`}
			style:transition-duration={`${state.animationDuration}ms`}
			onclick={state.close}
			aria-label={closeLabel}
		>
			<img
				bind:this={state.modalImageElement}
				src={state.zoomedSrc}
				alt={state.resolvedAlt}
				class={classes.modalImage()}
				draggable="false"
				onload={state.updateTargetRect}
			/>
		</button>

		<button
			type="button"
			bind:this={state.closeButtonElement}
			class={classes.closeButton()}
			aria-label={closeLabel}
			onclick={state.close}
		>
			{@render xIcon({ size: 20 })}
		</button>

		<Slot render={caption} payload={state.payload} class={classes.caption()} />
	</div>
{/if}
