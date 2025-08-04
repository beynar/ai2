<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { badgeTheme } from './badge.js';
	export const setBadgeTheme = setComponentTheme<typeof badgeTheme>('badge');
	export const useBadgeTheme = useComponentTheme('badge', badgeTheme);
</script>

<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { BadgeProps } from './badge.js';

	let {
		position = 'topRight',
		color = 'contrast',
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
	class={classes.badge({ className, color, size, variant, position })}
	{...attachments}
>
	<Slot render={children} />
</div>
