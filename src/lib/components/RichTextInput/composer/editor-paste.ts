import { $toggleLink } from '@lexical/link';
import { $convertFromMarkdownString } from '@lexical/markdown';
import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	$isParagraphNode,
	$isRangeSelection,
	$setSelection,
	COMMAND_PRIORITY_HIGH,
	PASTE_COMMAND,
	type LexicalEditor,
	type PasteCommandType,
	type RangeSelection
} from 'lexical';
import type { RichTextInputFormat } from '../richTextInput.props.js';
import { getAIComposerMarkdownTransformers } from './markdown.js';
import { $isAIComposerTokenNode } from './token-node.js';

type AIComposerPasteOptions = {
	closeMenu: () => void;
	getFormats: () => readonly RichTextInputFormat[];
};

export function registerAIComposerPaste(editor: LexicalEditor, options: AIComposerPasteOptions) {
	return editor.registerCommand(
		PASTE_COMMAND,
		(event) => handlePaste(event, options),
		COMMAND_PRIORITY_HIGH
	);
}

function handlePaste(event: PasteCommandType, options: AIComposerPasteOptions) {
	const clipboardData = getClipboardData(event);
	if (!clipboardData) return false;

	const markdown = getClipboardMarkdown(clipboardData);
	const hasMarkdown = markdown.length > 0;
	if (!hasMarkdown) return false;

	preventDefault(event);
	options.closeMenu();

	const selection = getPasteSelection();
	if (!$isRangeSelection(selection)) return true;
	const formats = options.getFormats();
	if (pasteUrlIntoSelection(selection, markdown, formats)) return true;
	insertMarkdownAtSelection(selection, markdown, formats);
	return true;
}

function getClipboardData(event: PasteCommandType) {
	if ('clipboardData' in event) return event.clipboardData;
	if ('dataTransfer' in event) return event.dataTransfer;
	return null;
}

function getClipboardMarkdown(dataTransfer: DataTransfer) {
	return (
		dataTransfer.getData('text/markdown') ||
		dataTransfer.getData('text/x-markdown') ||
		dataTransfer.getData('text/plain')
	);
}

function getPasteSelection() {
	const selection = $getSelection();
	if (selection) return selection;
	return $getRoot().selectEnd();
}

function insertMarkdownAtSelection(
	selection: RangeSelection,
	markdown: string,
	formats: readonly RichTextInputFormat[]
) {
	const nodes = parseMarkdownNodes(markdown, formats);
	if (nodes.length === 0) return;
	if ($isAIComposerTokenNode(nodes[nodes.length - 1])) nodes.push($createTextNode(' '));
	selection.insertNodes(nodes);
}

function parseMarkdownNodes(markdown: string, formats: readonly RichTextInputFormat[]) {
	const container = $createParagraphNode();
	const selection = $getSelection()?.clone() ?? null;
	$setSelection(null);
	$convertFromMarkdownString(markdown, getAIComposerMarkdownTransformers(formats), container, true);
	$setSelection(selection);

	const children = container.getChildren();
	if (children.length === 1 && $isParagraphNode(children[0])) return children[0].getChildren();
	return children;
}

function pasteUrlIntoSelection(
	selection: RangeSelection,
	markdown: string,
	formats: readonly RichTextInputFormat[]
) {
	if (!formats.includes('link')) return false;
	const url = getUrlPaste(markdown);
	if (!url || selection.isCollapsed() || selection.getTextContent().trim().length === 0)
		return false;
	$toggleLink(url);
	return true;
}

function getUrlPaste(markdown: string) {
	const value = markdown.trim();
	if (value.length === 0 || /\s/.test(value)) return null;

	try {
		const url = new URL(value);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
		return url.toString();
	} catch (error) {
		if (!(error instanceof TypeError)) throw error;
		return null;
	}
}

function preventDefault(event: PasteCommandType) {
	if ('preventDefault' in event) event.preventDefault();
}
