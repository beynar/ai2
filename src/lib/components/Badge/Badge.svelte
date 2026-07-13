<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { BadgeProps } from './badge.props.js';
	import { useBadgeTheme } from './badge.theme.js';

	let {
		position = 'topRight',
		color = 'primary',
		size = 'normal',
		variant = 'solid',
		class: className,
		children,
		theme,
		...attachments
	}: BadgeProps = $props();

	const classes = $derived(useBadgeTheme(theme));
</script>

<div
	data-badge
	data-position={position}
	data-color={color}
	data-size={size}
	data-variant={variant}
	class={classes.root({ className, color, size, variant, position })}
	{...attachments}
>
	<Slot render={children} />
</div>
