<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { AspectRatioProps, AspectRatioRatio } from './aspectRatio.props.js';
	import { useAspectRatioTheme } from './aspectRatio.theme.js';

	let {
		ref = $bindable(),
		class: className,
		ratio = '2x1',
		theme,
		children,
		...attachments
	}: AspectRatioProps = $props();

	const classes = $derived(useAspectRatioTheme(theme));

	/**
	 * Converts ratio string (e.g., "16x9") to numeric ratio and calculates padding-bottom percentage
	 */
	const getPaddingBottom = (ratio: AspectRatioRatio): string => {
		const [width, height] = ratio.split('x').map(Number);
		const numericRatio = width / height;
		return `${(100 / numericRatio).toFixed(6)}%`;
	};

	const paddingBottom = $derived(getPaddingBottom(ratio));
</script>

<div
	bind:this={ref}
	class={classes.container({ className })}
	style:padding-bottom={paddingBottom}
	{...attachments}
>
	<Slot class={classes.content()} render={children} />
</div>
