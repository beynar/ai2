<script lang="ts">
	import { xIcon } from '../Icons/x.js';
	import type { Sizes } from '$lib/types/theme.js';
	import {
		getRichTextInputBlockControls,
		getRichTextInputInlineControls,
		getRichTextInputListControls
	} from './formatting-toolbar-controls.js';
	import type { RichTextInputFormat } from './richTextInput.props.js';
	import RichTextInputLinkForm from './RichTextInputLinkForm.svelte';
	import type { RichTextInputThemeProps } from './richTextInput.theme.js';
	import { useRichTextInputTheme } from './richTextInput.theme.js';
	import RichTextInputToolbarButton from './RichTextInputToolbarButton.svelte';
	import type {
		AIComposerSelectionBlockType,
		AIComposerSelectionFormat,
		AIComposerSelectionFormats,
		AIComposerSelectionListType
	} from './composer/selection-formatting.js';

	type Props = {
		size: Sizes;
		theme?: RichTextInputThemeProps;
		formats: AIComposerSelectionFormats;
		blockType: AIComposerSelectionBlockType;
		listType: AIComposerSelectionListType | null;
		linkUrl: string;
		availableFormats: RichTextInputFormat[];
		showDismiss?: boolean;
		onFormat: (format: AIComposerSelectionFormat) => void;
		onList: (listType: AIComposerSelectionListType) => void;
		onBlock: (blockType: AIComposerSelectionBlockType) => void;
		onLink: (url: string | null) => void;
		onLinkEditingChange?: (isEditing: boolean) => void;
		onDismiss?: () => void;
		class?: string;
	};

	let {
		size,
		theme,
		formats,
		blockType,
		listType,
		linkUrl,
		availableFormats,
		showDismiss = false,
		onFormat,
		onList,
		onBlock,
		onLink,
		onLinkEditingChange,
		onDismiss,
		class: className
	}: Props = $props();

	let root = $state<HTMLElement | null>(null);
	let isEditingLink = $state(false);

	const classes = $derived(useRichTextInputTheme(theme));
	const hasActiveLink = $derived(linkUrl.trim().length > 0);
	const hasBlocks = $derived(hasAny(['heading1', 'heading2', 'heading3', 'quote']));
	const hasInline = $derived(
		hasAny(['bold', 'italic', 'code', 'strikethrough', 'highlight', 'link'])
	);
	const hasLists = $derived(hasAny(['bulletList', 'orderedList']));
	const blockControls = $derived.by(() =>
		getRichTextInputBlockControls({ hasFormat, blockType, onBlock })
	);
	const inlineControls = $derived.by(() =>
		getRichTextInputInlineControls({
			hasFormat,
			formats,
			hasActiveLink,
			onFormat,
			onLink: beginLinkEdit
		})
	);
	const listControls = $derived.by(() =>
		getRichTextInputListControls({ hasFormat, listType, onList })
	);

	function hasFormat(format: RichTextInputFormat) {
		return availableFormats.includes(format);
	}

	function hasAny(formats: RichTextInputFormat[]) {
		return formats.some((format) => hasFormat(format));
	}

	function beginLinkEdit() {
		isEditingLink = true;
		onLinkEditingChange?.(true);
	}

	function closeLinkEdit() {
		isEditingLink = false;
		onLinkEditingChange?.(false);
	}

	function applyLink(url: string) {
		closeLinkEdit();
		onLink(url);
	}

	function removeLink() {
		closeLinkEdit();
		onLink(null);
	}

	function dismiss() {
		closeLinkEdit();
		onDismiss?.();
	}

	function handleToolbarKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showDismiss) {
				event.preventDefault();
				dismiss();
			}
			return;
		}

		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		const controls = [
			...(root?.querySelectorAll<HTMLElement>('.rich-text-input-toolbar-control') ?? [])
		];
		if (!(document.activeElement instanceof HTMLElement)) return;
		const index = controls.indexOf(document.activeElement);
		if (index === -1) return;
		event.preventDefault();
		const delta = event.key === 'ArrowRight' ? 1 : -1;
		const nextIndex = (index + delta + controls.length) % controls.length;
		controls[nextIndex]?.focus({ preventScroll: true });
	}
</script>

<div bind:this={root} class={classes.formattingToolbar({ size, class: className })}>
	{#if isEditingLink}
		<RichTextInputLinkForm
			{size}
			{theme}
			{linkUrl}
			onApply={applyLink}
			onRemove={removeLink}
			onCancel={closeLinkEdit}
		/>
	{:else}
		<div
			role="toolbar"
			aria-label="Rich text formatting"
			tabindex="-1"
			class={classes.formattingToolbar({ size })}
			onkeydown={handleToolbarKeydown}
		>
			{#if hasBlocks}
				{#each blockControls as control (control.label)}
					<RichTextInputToolbarButton {size} {theme} {...control} />
				{/each}
			{/if}
			{#if hasBlocks && hasInline}
				<span aria-hidden="true" class={classes.toolbarSeparator({ size })}></span>
			{/if}
			{#each inlineControls as control (control.label)}
				<RichTextInputToolbarButton {size} {theme} {...control} />
			{/each}
			{#if hasInline && hasLists}
				<span aria-hidden="true" class={classes.toolbarSeparator({ size })}></span>
			{/if}
			{#each listControls as control (control.label)}
				<RichTextInputToolbarButton {size} {theme} {...control} />
			{/each}
			{#if showDismiss}
				<RichTextInputToolbarButton
					{size}
					{theme}
					label="Dismiss formatting toolbar"
					icon={xIcon}
					active={false}
					onSelect={dismiss}
				/>
			{/if}
		</div>
	{/if}
</div>
