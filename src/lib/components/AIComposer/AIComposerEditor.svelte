<script lang="ts">
	import RichTextInput from '../RichTextInput/RichTextInput.svelte';
	import type {
		RichTextInputChange,
		RichTextInputFormat,
		RichTextInputHandle,
		RichTextInputSubmitShortcut,
		RichTextInputSuggestionLifecycleState,
		RichTextInputToolbar,
		RichTextInputTriggers
	} from '../RichTextInput/richTextInput.props.js';
	import type { RichTextInputThemeProps } from '../RichTextInput/richTextInput.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import type { Slot as SlotType } from '../Slot/slot.js';
	import type { AIComposerSuggestionLifecycleCallback } from './aiComposer.props.js';
	import { notifyAIComposerSuggestion } from './aiComposerSourceAdapter.js';
	import { useAIComposerTheme, type AIComposerThemeProps } from './aiComposer.theme.js';

	let {
		handle = $bindable<RichTextInputHandle>(),
		value = $bindable(''),
		toolbar,
		formats,
		autoresize,
		triggers,
		placeholder,
		disabled,
		submitShortcut,
		prefix,
		suffix,
		onSubmit,
		onChange,
		onSuggestionOpen,
		onSuggestionClose,
		onSuggestionQueryChange,
		onSuggestionHighlightChange,
		theme
	}: {
		handle?: RichTextInputHandle;
		value?: string;
		toolbar: RichTextInputToolbar;
		formats?: RichTextInputFormat[];
		autoresize: boolean;
		triggers: RichTextInputTriggers;
		placeholder: string;
		disabled: boolean;
		submitShortcut: RichTextInputSubmitShortcut;
		prefix?: SlotType;
		suffix?: SlotType;
		onSubmit: (event: KeyboardEvent) => void;
		onChange: (change: RichTextInputChange) => void;
		onSuggestionOpen?: AIComposerSuggestionLifecycleCallback;
		onSuggestionClose?: AIComposerSuggestionLifecycleCallback;
		onSuggestionQueryChange?: AIComposerSuggestionLifecycleCallback;
		onSuggestionHighlightChange?: AIComposerSuggestionLifecycleCallback;
		theme?: AIComposerThemeProps;
	} = $props();

	const classes = $derived(useAIComposerTheme(theme));
	const embeddedEditorTheme = {
		scrollArea: { base: '!min-h-0' },
		editorShell: { base: 'px-2 py-0' },
		editor: { base: '!min-h-10' },
		placeholder: { base: 'left-2 top-0' }
	} satisfies RichTextInputThemeProps;
</script>

<div data-slot="ai-composer-editor" class={classes.body()}>
	{#if prefix}<Slot render={prefix} />{/if}
	<RichTextInput
		bind:this={handle}
		bind:value
		standalone
		{toolbar}
		{formats}
		maxHeight={autoresize ? 200 : 96}
		{triggers}
		{placeholder}
		{disabled}
		{submitShortcut}
		theme={embeddedEditorTheme}
		toolbarClass={classes.toolbar()}
		onSubmitShortcut={onSubmit}
		onSuggestionOpen={(state: RichTextInputSuggestionLifecycleState) =>
			notifyAIComposerSuggestion(onSuggestionOpen, state)}
		onSuggestionClose={(state: RichTextInputSuggestionLifecycleState) =>
			notifyAIComposerSuggestion(onSuggestionClose, state)}
		onSuggestionQueryChange={(state: RichTextInputSuggestionLifecycleState) =>
			notifyAIComposerSuggestion(onSuggestionQueryChange, state)}
		onSuggestionHighlightChange={(state: RichTextInputSuggestionLifecycleState) =>
			notifyAIComposerSuggestion(onSuggestionHighlightChange, state)}
		onValueChange={onChange}
		class={classes.editor({ autoresize })}
	/>
	{#if suffix}<Slot render={suffix} />{/if}
</div>
