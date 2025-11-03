<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ScrollArea } from './scrollArea.svelte.js';
	import type { ScrollAreaProps } from './scrollArea.props.js';
	import { useScrollAreaTheme } from './scrollArea.theme.js';
	import { caretUpDownIcon } from '../Icons/caretUpDown.js';
	import { caretUpIcon } from '../Icons/caretUp.js';
	import { caretDownIcon } from '../Icons/caretDown.js';

	let {
		class: className = '',
		children,
		delay = 0,
		type = 'hover',
		scrollOnEdges = false,
		theme
	}: ScrollAreaProps = $props();

	const scrollArea = new ScrollArea({
		get type() {
			return type;
		},
		get delay() {
			return delay;
		},
		get scrollOnEdges() {
			return scrollOnEdges;
		}
	});

	const classes = $derived(useScrollAreaTheme(theme));
</script>

<div
	data-scroll-area
	class={classes.base({ className })}
	style:position="relative"
	aria-label="Scrollable content area"
	{@attach scrollArea.keydown.reference}
	{@attach scrollArea.hoover.reference}
	{@attach scrollArea.scrollOnEdgesAttachment}
>
	<div
		id="scroll-area-viewport"
		data-scroll-area-viewport
		class={classes.viewport()}
		{@attach scrollArea.viewportAttachment}
		style:position="relative"
		style:overflow="hidden"
		style:width="100%"
		style:height="100%"
	>
		<div
			{@attach scrollArea.contentAttachment}
			style:min-width="100%"
			style:display="table"
			style:position="relative"
		>
			{@render children?.()}
		</div>
	</div>

	{#if (type === 'hover' && scrollArea.visible && scrollArea.hoover.isHovered) || scrollArea.isDraggingY || type === 'always' || (type === 'scroll' && scrollArea.isScrolling)}
		<div
			transition:fade={{ duration: 200 }}
			bind:this={scrollArea.scrollbarYElement}
			class={classes.scrollbar()}
			style="bottom: 0px"
			style:display="flex"
			style:user-select="none"
			style:opacity={scrollArea.visible ? 1 : 0}
			style:transition="opacity 0.2s ease"
			role="scrollbar"
			aria-controls="scroll-area-viewport"
			aria-valuenow={scrollArea.scrollY}
			aria-valuemin="0"
			aria-valuemax={scrollArea.maxScrollY}
			{@attach scrollArea.trackAttachment}
			{@attach scrollArea.trackRect.reference}
		>
			<div
				data-thumb
				class={classes.scrollbarThumb()}
				style:height={scrollArea.thumbYSize + 'px'}
				style:width="100%"
				style:transform={`translateY(${scrollArea.thumbYPosition}px)`}
				{@attach scrollArea.dragY.reference}
				{@attach scrollArea.thumbRect.reference}
			></div>
		</div>
	{/if}
	{#if scrollArea.scrollOnEdgesAttachment}
		{#if scrollArea.canScrollUp}
			<div
				class="absolute top-0 left-0 flex w-full items-center justify-center"
				style:pointer-events="none"
			>
				{@render caretUpIcon({ size: 10 })}
			</div>
		{/if}

		{#if scrollArea.canScrollDown}
			<div
				class="absolute bottom-0 left-0 flex w-full items-center justify-center"
				style:pointer-events="none"
			>
				{@render caretDownIcon({ size: 10 })}
			</div>
		{/if}
	{/if}
</div>

<style>
	[data-scroll-area-viewport]::-webkit-scrollbar {
		display: none;
	}

	[data-scroll-area-viewport]::-webkit-scrollbar-track {
		display: none;
	}
</style>
