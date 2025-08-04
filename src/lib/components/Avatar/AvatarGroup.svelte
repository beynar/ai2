<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { avatarGroupTheme } from './avatar.js';
	export const setAvatarGroupTheme = setComponentTheme<typeof avatarGroupTheme>('avatarGroup');
	export const useAvatarGroupTheme = useComponentTheme('avatarGroup', avatarGroupTheme);
</script>

<script lang="ts" generics="Item extends object">
	import type { AvatarGroupProps } from './avatar.js';
	import Avatar from './Avatar.svelte';

	let {
		users,
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

<div data-size={size || 'normal'} class={classes.avatarGroup({ size, className })} {...attachments}>
	{#each users.slice(0, max) as user, index}
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
	{#if max && users.length > max}
		<div class={classes.avatarGroupCount({ size })}>
			{#if remainingCount}
				{@render remainingCount({ users, remaining: users.length - max })}
			{:else}
				+{users.length - max}
			{/if}
		</div>
	{/if}
</div>
