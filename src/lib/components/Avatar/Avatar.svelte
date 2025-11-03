<script lang="ts" generics="Item extends object">
	import type { AvatarProps } from './avatar.props.js';
	import { useAvatarTheme } from './avatar.theme.js';
	import Slot from '../Slot/Slot.svelte';

	let {
		user,
		size = 'normal',
		loadingState = $bindable('waiting'),
		suffix,
		prefix,
		delay = 0,
		class: className,
		theme,
		...attachments
	}: AvatarProps<Item> = $props();

	const complete = (image: HTMLImageElement) => {
		if (image.complete) {
			loadingState = image.naturalWidth === 0 || image.naturalHeight === 0 ? 'errored' : 'success';
		}
		image.onload = () => {
			setTimeout(() => {
				loadingState = 'success';
			}, delay);
		};
		image.onerror = () => {
			loadingState = 'errored';
		};
	};

	const classes = $derived(useAvatarTheme(theme));

	const initials = $derived(
		user.name
			?.split(' ')
			.map((word) => word[0])
			.join('') || ''
	);
</script>

<div data-avatar class={classes.avatar({ size, className })} data-size={size} {...attachments}>
	<Slot payload={user} render={prefix} class={classes.avatarPrefix({ size })} />
	{#if user.avatar}
		<img use:complete src={user.avatar} alt={user.name} class={classes.avatarImage({ size })} />
	{/if}
	{#if loadingState !== 'success' || !user.avatar}
		<div class={classes.avatarInitials({ size })}>
			{initials}
		</div>
	{/if}
	<Slot payload={user} render={suffix} class={classes.avatarSuffix({ size })} />
</div>
