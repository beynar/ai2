<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { checkIcon } from '../Icons/check.js';
	import { linkBreakIcon } from '../Icons/linkBreak.js';
	import { xIcon } from '../Icons/x.js';
	import type { Sizes } from '$lib/types/theme.js';
	import type { RichTextInputThemeProps } from './richTextInput.theme.js';
	import { useRichTextInputTheme } from './richTextInput.theme.js';
	import RichTextInputToolbarButton from './RichTextInputToolbarButton.svelte';

	type Props = {
		size: Sizes;
		theme?: RichTextInputThemeProps;
		linkUrl: string;
		onApply: (url: string) => void;
		onRemove: () => void;
		onCancel: () => void;
	};

	let { size, theme, linkUrl, onApply, onRemove, onCancel }: Props = $props();

	let draftLink = $state('');

	const classes = $derived(useRichTextInputTheme(theme));
	const canRemoveLink = $derived(linkUrl.trim().length > 0);
	const autofocusLinkInput: Attachment<HTMLInputElement> = (node) => {
		const focusTimeout = setTimeout(() => {
			node.focus({ preventScroll: true });
		}, 0);
		return () => clearTimeout(focusTimeout);
	};

	$effect(() => {
		draftLink = linkUrl;
	});

	function submitLink(event: SubmitEvent) {
		event.preventDefault();
		onApply(draftLink);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		event.preventDefault();
		onCancel();
	}
</script>

<form class={classes.linkForm({ size })} onsubmit={submitLink}>
	<input
		{@attach autofocusLinkInput}
		bind:value={draftLink}
		aria-label="Link URL"
		placeholder="Paste link"
		class={classes.linkInput({ size })}
		onkeydown={handleKeydown}
	/>
	{#if canRemoveLink}
		<RichTextInputToolbarButton
			{size}
			{theme}
			label="Remove link"
			icon={linkBreakIcon}
			active={false}
			onSelect={onRemove}
		/>
	{/if}
	<RichTextInputToolbarButton
		{size}
		{theme}
		label="Apply link"
		icon={checkIcon}
		active={false}
		onSelect={() => onApply(draftLink)}
	/>
	<RichTextInputToolbarButton
		{size}
		{theme}
		label="Cancel link edit"
		icon={xIcon}
		active={false}
		onSelect={onCancel}
	/>
</form>
