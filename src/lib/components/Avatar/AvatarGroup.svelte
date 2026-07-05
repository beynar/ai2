<script lang="ts" generics="Item extends object">
	import type { AvatarGroupProps } from './avatar.props.js';
	import { useAvatarGroupTheme } from './avatar.theme.js';
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
</script>

<div data-size={size || 'normal'} class={classes.root({ size, className })} {...attachments}>
	{#each items.slice(0, max) as user, index}
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
	{#if max && items.length > max}
		<div class={classes.avatarGroupCount({ size })}>
			{#if remainingCount}
				{@render remainingCount({ items, remaining: items.length - max })}
			{:else}
				+{items.length - max}
			{/if}
		</div>
	{/if}
</div>
