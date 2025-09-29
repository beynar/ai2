<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { scrollAreaTheme } from '$lib/components/ScrollArea/scrollArea.js';
	export const setScrollAreaTheme = setComponentTheme<typeof scrollAreaTheme>('scrollArea');
	export const useScrollAreaTheme = useComponentTheme('scrollArea', scrollAreaTheme);
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ScrollArea } from './scrollArea.svelte.js';
	import type { ScrollAreaProps } from './scrollArea.ts';

	let {
		class: className = '',
		children,
		delay = 0,
		type = 'hover',
		theme
	}: ScrollAreaProps = $props();

	const scrollArea = new ScrollArea({
		type,
		delay
	});

	const classes = $derived(useScrollAreaTheme(theme));
</script>

<button
	onclick={() => {
		const element = document.getElementById('test');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}}>Scroll to</button
>
<div
	data-scroll-area
	class={classes.base({ className })}
	style:position="relative"
	aria-label="Scrollable content area"
	{@attach scrollArea.keydown.reference}
	{@attach scrollArea.hoover.reference}
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

	{scrollArea.hoover.isHovered}

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
</div>

<style>
	[data-scroll-area-viewport]::-webkit-scrollbar {
		display: none;
	}

	[data-scroll-area-viewport]::-webkit-scrollbar-track {
		display: none;
	}
</style>
