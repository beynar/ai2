<script lang="ts" generics="Item extends object">
	import type { AvatarProps } from './avatar.props.js';
	import { useAvatarTheme } from './avatar.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import type { Attachment } from 'svelte/attachments';

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

	const imageLoading = $derived.by<Attachment<HTMLImageElement>>(() => {
		const revealDelay = delay;

		return (image) => {
			let revealTimer: ReturnType<typeof setTimeout> | undefined;

			const clearRevealTimer = () => {
				if (revealTimer === undefined) return;
				clearTimeout(revealTimer);
				revealTimer = undefined;
			};

			const handleLoad = () => {
				clearRevealTimer();
				revealTimer = setTimeout(() => {
					loadingState = 'success';
					revealTimer = undefined;
				}, revealDelay);
			};

			const handleError = () => {
				clearRevealTimer();
				loadingState = 'errored';
			};

			image.addEventListener('load', handleLoad);
			image.addEventListener('error', handleError);

			if (image.complete) {
				loadingState =
					image.naturalWidth === 0 || image.naturalHeight === 0 ? 'errored' : 'success';
			}

			return () => {
				clearRevealTimer();
				image.removeEventListener('load', handleLoad);
				image.removeEventListener('error', handleError);
			};
		};
	});

	const classes = $derived(useAvatarTheme(theme));

	const initials = $derived(
		user.name
			?.split(' ')
			.map((word: string) => word[0])
			.join('') || ''
	);
</script>

<div data-avatar class={classes.root({ size, className })} data-size={size} {...attachments}>
	<Slot render={prefix} class={classes.avatarPrefix({ size })} />
	{#if user.avatar}
		<img
			{@attach imageLoading}
			src={user.avatar}
			alt={user.name}
			class={classes.avatarImage({ size })}
		/>
	{/if}
	{#if loadingState !== 'success' || !user.avatar}
		<div class={classes.avatarInitials({ size })}>
			{initials}
		</div>
	{/if}
	<Slot render={suffix} class={classes.avatarSuffix({ size })} />
</div>
