<script lang="ts" module>
	import type { HeadingProps } from './headings.js';
</script>

<script lang="ts">
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
		...rest
	}: HeadingProps = $props();
</script>

<svelte:element
	this={as || size || 'h2'}
	{...rest}
	data-level={size}
	data-underline={underline}
	data-balanced={balanced}
	data-trim={trim}
	data-muted={muted}
	data-align={align}
	data-weight={weight}
	class={`${className}`}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
