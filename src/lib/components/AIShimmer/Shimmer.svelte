<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import Slot from '../Slot/Slot.svelte';
	import type { ShimmerProps } from './aiShimmer.props.js';
	import { useAIShimmerTheme } from './aiShimmer.theme.js';

	let {
		ref = $bindable(),
		as = 'span',
		text,
		children,
		duration = 2,
		spread = 2,
		class: className,
		theme,
		...attachments
	}: ShimmerProps = $props();

	let measuredLength = $state(0);
	const textLength = $derived(text === undefined ? measuredLength : text.length);
	const classes = $derived(useAIShimmerTheme(theme));
	const measureText: Attachment<HTMLElement> = (node) => {
		const update = () => (measuredLength = node.textContent?.length ?? 0);
		update();
		const observer = new MutationObserver(update);
		observer.observe(node, { childList: true, characterData: true, subtree: true });
		return () => observer.disconnect();
	};
</script>

<svelte:element
	this={as}
	bind:this={ref}
	data-slot="ai-shimmer"
	class={classes.root({ className })}
	style:--shimmer-duration={`${Math.max(0, duration) * 1000}ms`}
	style:--shimmer-spread={`${Math.max(0, textLength * spread)}px`}
	{@attach measureText}
	{...attachments}
>
	<Slot render={children ?? text ?? ''} />
</svelte:element>
