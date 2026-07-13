<script lang="ts" generics="Item extends object">
	import type { AvatarGroupProps } from './avatarGroup.props.js';
	import { useAvatarGroupTheme } from './avatarGroup.theme.js';
	import Avatar from './Avatar.svelte';

	let {
		items,
		max,
		class: className,
		remainingCount,
		avatar,
		theme,
		size,
		delay,
		loadingState,
		prefix,
		suffix,
		...attachments
	}: AvatarGroupProps<Item> = $props();

	const classes = $derived(useAvatarGroupTheme(theme));
	const visibleCount = $derived(
		max === undefined || !Number.isFinite(max) ? items.length : Math.max(0, Math.floor(max))
	);
	const visibleItems = $derived(items.slice(0, visibleCount));
	const remaining = $derived(Math.max(0, items.length - visibleItems.length));
</script>

<div data-size={size || 'normal'} class={classes.root({ size, className })} {...attachments}>
	{#each visibleItems as user, index}
		{#if avatar}
			{@render avatar({
				user,
				index,
				avatarProps: {
					delay,
					size,
					loadingState,
					prefix,
					suffix,
					theme
				}
			})}
		{:else}
			<Avatar {delay} {size} {loadingState} {prefix} {suffix} {theme} {user} />
		{/if}
	{/each}
	{#if remaining > 0}
		<div class={classes.avatarGroupCount({ size })}>
			{#if remainingCount}
				{@render remainingCount({ items, remaining })}
			{:else}
				+{remaining}
			{/if}
		</div>
	{/if}
</div>
