<script lang="ts">
	import type { AnchoredReference } from './anchored-reference.js';
	import Popover from '../Popover/Popover.svelte';
	import type { Sizes } from '$lib/types/theme.js';
	import type { RichTextInputFormat } from './richTextInput.props.js';
	import RichTextInputFormattingToolbar from './RichTextInputFormattingToolbar.svelte';
	import type { RichTextInputThemeProps } from './richTextInput.theme.js';
	import { useRichTextInputTheme } from './richTextInput.theme.js';
	import type {
		AIComposerSelectionBlockType,
		AIComposerSelectionFormat,
		AIComposerSelectionFormats,
		AIComposerSelectionListType
	} from './composer/selection-formatting.js';

	type Props = {
		size: Sizes;
		theme?: RichTextInputThemeProps;
		open: boolean;
		anchor: AnchoredReference | null;
		linkUrl: string;
		formats: AIComposerSelectionFormats;
		blockType: AIComposerSelectionBlockType;
		listType: AIComposerSelectionListType | null;
		availableFormats: RichTextInputFormat[];
		onFormat: (format: AIComposerSelectionFormat) => void;
		onList: (listType: AIComposerSelectionListType) => void;
		onBlock: (blockType: AIComposerSelectionBlockType) => void;
		onLink: (url: string | null) => void;
		onLinkEditingChange: (isEditing: boolean) => void;
		onDismiss: () => void;
	};

	let {
		size,
		theme,
		open,
		anchor,
		linkUrl,
		formats,
		blockType,
		listType,
		availableFormats,
		onFormat,
		onList,
		onBlock,
		onLink,
		onLinkEditingChange,
		onDismiss
	}: Props = $props();

	let popup = $state<HTMLElement | null>(null);
	let popoverOpen = $state(false);

	const classes = $derived(useRichTextInputTheme(theme));

	$effect(() => {
		popoverOpen = open && anchor !== null;
	});

	export function focusFirst() {
		popup?.querySelector<HTMLElement>('.rich-text-input-toolbar-control')?.focus({
			preventScroll: true
		});
	}

	function handlePopoverClose() {
		if (open) onDismiss();
	}
</script>

<Popover
	bind:open={popoverOpen}
	ref={anchor}
	position="top"
	offset={8}
	lockScroll={false}
	directedTransition={false}
	closeOnClickOutside
	closeOnEscape
	class={classes.floatingPanel({ size, width: 'toolbar', class: 'p-1' })}
	onClose={handlePopoverClose}
>
	{#snippet children()}
		<div bind:this={popup}>
			<RichTextInputFormattingToolbar
				{size}
				{theme}
				{formats}
				{blockType}
				{listType}
				{linkUrl}
				{availableFormats}
				showDismiss
				{onFormat}
				{onList}
				{onBlock}
				{onLink}
				{onLinkEditingChange}
				{onDismiss}
			/>
		</div>
	{/snippet}
</Popover>
