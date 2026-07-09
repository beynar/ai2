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
		lockScroll = true,
		buttonLabel = 'Zoom image',
		closeLabel = 'Close image zoom',
		class: className,
		onOpenChange,
		onOpen,
		onClose,
		theme,
		children,
		caption,
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
		{:else}
			<img
				bind:this={state.thumbnailImageElement}
				{src}
				{alt}
				{width}
				{height}
				{srcset}
				{sizes}
				{loading}
				{decoding}
				class={classes.image()}
			/>
		{/if}

		<span aria-hidden="true" class={classes.indicator()}>
			{@render magnifyingGlassPlusIcon({ size: 18 })}
		</span>
	</button>
</div>

{#if state.mounted && imageRect}
	<div
		{@attach portal()}
		{id}
		role="dialog"
		aria-modal="true"
		aria-label={alt}
		class={classes.portal()}
	>
		<button
			type="button"
			class={classes.overlay({ visible: state.overlayVisible })}
			aria-label={closeLabel}
			tabindex="-1"
			onclick={() => closeOnClickOutside && state.close()}
			style:transition-duration={`${state.animationDuration}ms`}
		></button>

		<img
			bind:this={state.modalImageElement}
			src={state.zoomedSrc}
			{alt}
			class={classes.modalImage({ visible: state.overlayVisible })}
			style:left={`${imageRect.left}px`}
			style:top={`${imageRect.top}px`}
			style:width={`${imageRect.width}px`}
			style:height={`${imageRect.height}px`}
			style:transition-duration={`${state.animationDuration}ms`}
			draggable="false"
			onload={state.updateTargetRect}
			onclick={state.close}
		/>

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
