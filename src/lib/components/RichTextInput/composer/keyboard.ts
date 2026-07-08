import { mergeRegister } from '@lexical/utils';
import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_HIGH,
	FORMAT_TEXT_COMMAND,
	KEY_ARROW_DOWN_COMMAND,
	KEY_ARROW_UP_COMMAND,
	KEY_BACKSPACE_COMMAND,
	KEY_ENTER_COMMAND,
	KEY_ESCAPE_COMMAND,
	KEY_TAB_COMMAND,
	type TextNode,
	type LexicalEditor
} from 'lexical';
import type { TriggerState } from './trigger.js';
import type { RichTextInputFormat, RichTextInputSubmitShortcut } from '../richTextInput.props.js';
import { $isAIComposerTokenNode } from './token-node.js';

export type AIComposerSuggestionHandle = {
	moveHighlight: (delta: number) => void;
	selectHighlighted: () => boolean;
};

type KeyboardOptions = {
	getMenu: () => TriggerState | null;
	getSuggestions: () => AIComposerSuggestionHandle | undefined;
	getSubmitShortcut: () => RichTextInputSubmitShortcut;
	closeMenu: () => void;
	onSubmitShortcut?: (event: KeyboardEvent) => void;
};

export function handleEditorFormatKeydown(
	editor: LexicalEditor | null,
	event: KeyboardEvent,
	availableFormats: RichTextInputFormat[]
) {
	if (event.defaultPrevented || event.isComposing) return;
	if (
		hasFormat(availableFormats, 'bold') &&
		(event.metaKey || event.ctrlKey) &&
		!event.altKey &&
		event.key.toLowerCase() === 'b'
	) {
		event.preventDefault();
		editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
	}
	if (
		hasFormat(availableFormats, 'italic') &&
		(event.metaKey || event.ctrlKey) &&
		!event.altKey &&
		event.key.toLowerCase() === 'i'
	) {
		event.preventDefault();
		editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
	}
}

export function registerAIComposerKeyboard(editor: LexicalEditor, options: KeyboardOptions) {
	function selectFromMenu(event: KeyboardEvent | null) {
		if (!options.getMenu()) return false;
		event?.preventDefault();
		options.getSuggestions()?.selectHighlighted();
		return true;
	}

	return mergeRegister(
		editor.registerCommand(
			KEY_ARROW_DOWN_COMMAND,
			(event) => moveMenu(1, event),
			COMMAND_PRIORITY_HIGH
		),
		editor.registerCommand(
			KEY_ARROW_UP_COMMAND,
			(event) => moveMenu(-1, event),
			COMMAND_PRIORITY_HIGH
		),
		editor.registerCommand(KEY_BACKSPACE_COMMAND, handleBackspace, COMMAND_PRIORITY_HIGH),
		editor.registerCommand(KEY_ENTER_COMMAND, handleEnter, COMMAND_PRIORITY_HIGH),
		editor.registerCommand(KEY_TAB_COMMAND, selectFromMenu, COMMAND_PRIORITY_HIGH),
		editor.registerCommand(KEY_ESCAPE_COMMAND, closeFromMenu, COMMAND_PRIORITY_HIGH)
	);

	function moveMenu(delta: number, event: KeyboardEvent | null) {
		if (!options.getMenu()) return false;
		event?.preventDefault();
		options.getSuggestions()?.moveHighlight(delta);
		return true;
	}

	function handleEnter(event: KeyboardEvent | null) {
		if (event?.isComposing) return false;
		if (selectFromMenu(event)) return true;
		if (!event || !options.onSubmitShortcut) return false;
		if (!matchesSubmitShortcut(event, options.getSubmitShortcut())) return false;
		event.preventDefault();
		options.onSubmitShortcut(event);
		return true;
	}

	function handleBackspace(event: KeyboardEvent) {
		if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return false;
		const selection = $getSelection();
		if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false;

		const anchor = selection.anchor;
		if (anchor.type === 'text') {
			const textNode = anchor.getNode();
			if ($isAIComposerTokenNode(textNode)) {
				event.preventDefault();
				textNode.remove();
				return true;
			}
			return removePreviousToken(textNode, anchor.offset, event);
		}

		const anchorNode = anchor.getNode();
		const previousNode = anchor.offset > 0 ? anchorNode.getChildAtIndex(anchor.offset - 1) : null;
		if (!$isAIComposerTokenNode(previousNode)) return false;
		event.preventDefault();
		previousNode.remove();
		return true;
	}

	function closeFromMenu(event: KeyboardEvent | null) {
		if (!options.getMenu()) return false;
		event?.preventDefault();
		options.closeMenu();
		return true;
	}
}

function removePreviousToken(anchorNode: TextNode, offset: number, event: KeyboardEvent) {
	const previousNode = anchorNode.getPreviousSibling();
	if (!$isAIComposerTokenNode(previousNode)) return false;

	const textBeforeCursor = anchorNode.getTextContent().slice(0, offset);
	if (textBeforeCursor.trim().length > 0) return false;

	event.preventDefault();
	if (offset > 0) anchorNode.spliceText(0, offset, '', true);
	previousNode.remove();
	return true;
}

function hasFormat(formats: readonly RichTextInputFormat[], format: RichTextInputFormat) {
	return formats.includes(format);
}

function matchesSubmitShortcut(event: KeyboardEvent, shortcut: RichTextInputSubmitShortcut) {
	if (shortcut === 'none' || event.altKey) return false;
	if (shortcut === 'enter') return !event.shiftKey && !event.metaKey && !event.ctrlKey;
	if (shortcut === 'shift-enter') return event.shiftKey && !event.metaKey && !event.ctrlKey;
	return event.metaKey && !event.shiftKey && !event.ctrlKey;
}
