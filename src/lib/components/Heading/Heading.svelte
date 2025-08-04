<script lang="ts">
	import type { HeadingProps } from '$lib/components/Heading/headings.js';
	let {
		class: className = '',
		underline = false,
		size = 'h2',
		children,
		as,
		weight = 'normal',
		trim = 'both',
		balanced = true,
		align = 'left',
		muted = false,
		...attachments
	}: HeadingProps = $props();
</script>

<svelte:element
	this={as || size || 'h2'}
	data-level={size}
	data-underline={underline}
	data-balanced={balanced}
	data-trim={trim}
	data-muted={muted}
	data-align={align}
	data-weight={weight}
	class={`${className}`}
	{...attachments}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
