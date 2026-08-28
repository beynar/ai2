<script lang="ts">
	import 'lightgallery/css/lightgallery.css';
	import 'lightgallery/css/lg-medium-zoom.css';
	import Slot from '../Slot/Slot.svelte';
	import { magnifyingGlassPlusIcon } from '../Icons/magnifyingGlassPlus.js';
	import { ImageZoomState } from './imageZoom.state.svelte.js';
	import type { ImageZoomProps } from './imageZoom.props.js';
	import { useImageZoomTheme } from './imageZoom.theme.js';

	let {
		id: customId,
		src,
		alt,
		zoomSrc,
		zoomWidth,
		zoomHeight,
		open = $bindable(false),
		disabled = false,
		width,
		height,
		srcset,
		sizes,
		loading = 'lazy',
		decoding = 'async',
		zoomMargin = 40,
		transitionDuration = 400,
		closeOnClickOutside = true,
		closeOnEscape = true,
		closeOnScroll = true,
		lockScroll = false,
		buttonLabel = 'Zoom image',
		closeLabel = 'Close image zoom',
		backgroundColor = 'var(--color-surface)',
		licenseKey = '0000-0000-000-0000',
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
		get zoomWidth() {
			return zoomWidth;
		},
		get zoomHeight() {
			return zoomHeight;
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
		get closeOnClickOutside() {
			return closeOnClickOutside;
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
		get closeLabel() {
			return closeLabel;
		},
		get backgroundColor() {
			return backgroundColor;
		},
		get licenseKey() {
			return licenseKey;
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
</script>

<div
	{@attach state.attachRoot({
		src,
		alt,
		zoomSrc,
		zoomWidth,
		zoomHeight,
		disabled,
		zoomMargin,
		transitionDuration,
		closeOnClickOutside,
		closeOnEscape,
		closeOnScroll,
		lockScroll,
		closeLabel,
		backgroundColor,
		licenseKey
	})}
	{id}
	class={classes.root({ className })}
	data-image-zoom-root
	{...attachments}
>
	<button
		type="button"
		class={classes.trigger()}
		{disabled}
		aria-label={buttonLabel}
		aria-haspopup="dialog"
		aria-expanded={open}
		data-image-zoom-trigger
		data-src={zoomSrc || src || undefined}
	>
		{#if children}
			<Slot render={children} payload={state.payload} />
		{:else if src}
			<img
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

{#if open && caption}
	<Slot render={caption} payload={state.payload} class={classes.caption()} />
{/if}
