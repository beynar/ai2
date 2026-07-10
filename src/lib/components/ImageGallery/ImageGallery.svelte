<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { caretLeftIcon } from '../Icons/caretLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import { xIcon } from '../Icons/x.js';
	import { portal } from '$lib/attachments/portal.js';
	import { ImageGalleryState } from './imageGallery.state.svelte.js';
	import type { ImageGalleryProps } from './imageGallery.props.js';
	import { useImageGalleryTheme } from './imageGallery.theme.js';

	let {
		id: customId,
		open = $bindable(false),
		activeIndex = $bindable(0),
		imageSelector = 'img',
		disabled = false,
		zoomMargin = 32,
		transitionDuration = 240,
		closeOnClickOutside = true,
		closeOnEscape = true,
		lockScroll = true,
		buttonLabel = 'Open image gallery',
		closeLabel = 'Close image gallery',
		previousLabel = 'Previous image',
		nextLabel = 'Next image',
		class: className,
		onOpenChange,
		onIndexChange,
		theme,
		children,
		caption,
		...attachments
	}: ImageGalleryProps = $props();

	const generatedId = $props.id();
	const id = $derived(customId || generatedId);
	const classes = $derived(useImageGalleryTheme(theme));
	const state = new ImageGalleryState({
		get imageSelector() {
			return imageSelector;
		},
		get isOpen() {
			return open;
		},
		set isOpen(value) {
			open = value;
		},
		get activeIndex() {
			return activeIndex;
		},
		set activeIndex(value) {
			activeIndex = value;
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
		get buttonLabel() {
			return buttonLabel;
		},
		get onOpenChange() {
			return onOpenChange;
		},
		get onIndexChange() {
			return onIndexChange;
		}
	});

	const imageRect = $derived(state.imageRect);
</script>

<div bind:this={state.rootElement} class={classes.root({ className })} {...attachments}>
	<Slot render={children} payload={state.payload} />
</div>

{#if state.mounted && imageRect}
	<div
		{@attach portal()}
		{id}
		role="dialog"
		aria-modal="true"
		aria-label={state.activeImage?.alt || 'Image gallery'}
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

		<div
			class={classes.viewport({ visible: state.overlayVisible })}
			style:left={`${imageRect.left}px`}
			style:top={`${imageRect.top}px`}
			style:width={`${imageRect.width}px`}
			style:height={`${imageRect.height}px`}
			style:transition-duration={`${state.animationDuration}ms`}
		>
			<div bind:this={state.scrollerElement} class={classes.scroller()}>
				{#each state.images as image (image.src)}
					<div class={classes.slide({ relation: state.getImageRelation(image.index) })}>
						<div class={classes.slideInner({ relation: state.getImageRelation(image.index) })}>
							<img src={image.src} alt={image.alt} class={classes.image()} draggable="false" />
						</div>
					</div>
				{/each}
			</div>

			{#if state.images.length > 1}
				<div bind:this={state.thumbnailScrollerElement} class={classes.thumbnails()}>
					{#each state.images as image}
						<button
							type="button"
							aria-label={`Open image ${image.index + 1}`}
							aria-current={state.activeIndex === image.index ? 'true' : undefined}
							class={classes.thumbnail({ active: state.activeIndex === image.index })}
							onclick={() => state.setActiveIndex(image.index)}
						>
							<img src={image.src} alt="" class={classes.thumbnailImage()} draggable="false" />
						</button>
					{/each}
				</div>
			{/if}

			{#if state.images.length > 1}
				<div class={classes.navigation()}>
					<button
						type="button"
						aria-controls={id}
						aria-label={previousLabel}
						disabled={!state.canPrevious}
						class={classes.navigationButton({ direction: 'previous' })}
						onclick={state.previous}
					>
						{@render caretLeftIcon({ size: 20 })}
					</button>

					<button
						type="button"
						aria-controls={id}
						aria-label={nextLabel}
						disabled={!state.canNext}
						class={classes.navigationButton({ direction: 'next' })}
						onclick={state.next}
					>
						{@render caretRightIcon({ size: 20 })}
					</button>
				</div>
			{/if}
		</div>

		<button
			type="button"
			bind:this={state.closeButtonElement}
			class={classes.closeButton()}
			aria-label={closeLabel}
			onclick={state.close}
		>
			{@render xIcon({ size: 20 })}
		</button>

		{#if caption}
			<Slot render={caption} payload={state.payload} class={classes.caption()} />
		{:else if state.activeImage?.caption}
			<div class={classes.caption()}>{state.activeImage.caption}</div>
		{/if}
	</div>
{/if}
