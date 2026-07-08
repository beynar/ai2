<script lang="ts">
	import type { Slot } from '$lib/components/Slot/slot.js';
	import type { WithAttachments } from '$lib/types/props.js';
	import type { Sizes } from '$lib/types/theme.js';
	import Button from '../Button/Button.svelte';
	import { tooltip } from '../Tooltip/tooltip.svelte.js';
	import type { useAudioPlayerTheme } from './audioPlayer.theme.js';

	type AudioPlayerClasses = ReturnType<typeof useAudioPlayerTheme>;
	type Props = WithAttachments<{
		classes: AudioPlayerClasses;
		size: Sizes;
		label: string;
		icon: Slot;
		active?: boolean;
		pressed?: boolean;
		disabled?: boolean;
		play?: boolean;
		class?: string;
		href?: string;
		target?: string;
		rel?: string;
		download?: boolean | string;
		onClick?: () => void;
	}>;

	let {
		classes,
		size,
		label,
		icon,
		active = false,
		pressed,
		disabled = false,
		play = false,
		class: className,
		href,
		target,
		rel,
		download,
		onClick,
		...attachments
	}: Props = $props();
</script>

<Button
	squared
	variant={play ? 'solid' : 'ghost'}
	color={play ? 'primary' : 'background'}
	{size}
	{label}
	{disabled}
	{href}
	{target}
	{rel}
	{download}
	data-active={active ? 'true' : undefined}
	aria-pressed={pressed}
	class={play
		? classes.playButton({ size, className })
		: classes.controlButton({ size, className })}
	prefix={icon}
	{onClick}
	{@attach tooltip({ content: label, position: 'top', size: 'small' })}
	{...attachments}
/>
