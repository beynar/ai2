<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { SkeletonProps } from './skeleton.props.js';
	import { useSkeletonTheme } from './skeleton.theme.js';

	let {
		class: className,
		color = 'contrast',
		children,
		theme,
		...attachments
	}: SkeletonProps = $props();

	const classes = $derived(useSkeletonTheme(theme));
</script>

<div
	data-slot="skeleton"
	data-color={color}
	class={classes.skeleton({ className, color })}
	{...attachments}
>
	<Slot render={children} />
</div>
