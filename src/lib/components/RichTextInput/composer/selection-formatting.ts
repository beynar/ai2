import { $insertList, $isListNode, ListNode } from '@lexical/list';
import { $isLinkNode, $toggleLink } from '@lexical/link';
import {
	$createHeadingNode,
	$createQuoteNode,
	$isHeadingNode,
	$isQuoteNode,
	type HeadingTagType
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getNearestNodeOfType } from '@lexical/utils';
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	$setSelection,
	type LexicalEditor,
	type LexicalNode,
	type RangeSelection,
	type TextFormatType
} from 'lexical';
import type { AnchoredReference } from '../anchored-reference.js';
import type { RichTextInputFormat } from '../richTextInput.props.js';
import { $isAIComposerTokenNode } from './token-node.js';

export type AIComposerSelectionFormat = Extract<
	TextFormatType,
	'bold' | 'italic' | 'code' | 'strikethrough' | 'highlight'
>;
export type AIComposerSelectionListType = 'bullet' | 'number';
export type AIComposerSelectionBlockType =
	'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'quote';

export type AIComposerSelectionFormats = {
	bold: boolean;
	italic: boolean;
	code: boolean;
	strikethrough: boolean;
	highlight: boolean;
};

export type AIComposerSelectionState = {
	anchor: AnchoredReference | null;
	selection: RangeSelection;
	signature: string;
	linkUrl: string;
	formats: AIComposerSelectionFormats;
	blockType: AIComposerSelectionBlockType;
	listType: AIComposerSelectionListType | null;
};

type ReadSelectionOptions = {
	requireText?: boolean;
	requireAnchor?: boolean;
};

export const AI_COMPOSER_DEFAULT_RICH_TEXT_FORMATS: RichTextInputFormat[] = [
	'bold',
	'italic',
	'code',
	'link',
	'bulletList',
	'orderedList'
];

export const AI_COMPOSER_ALL_RICH_TEXT_FORMATS: RichTextInputFormat[] = [
	'bold',
	'italic',
	'code',
	'strikethrough',
	'highlight',
	'link',
	'bulletList',
	'orderedList',
	'heading1',
	'heading2',
	'heading3',
	'quote'
];

export function readAIComposerSelectionState(
	rootElement: HTMLDivElement | null,
	options: ReadSelectionOptions = {}
): AIComposerSelectionState | null {
	if (!rootElement || typeof window === 'undefined') return null;
	const selection = $getSelection();
	if (!$isRangeSelection(selection)) return null;
	if (selection.isCollapsed() && options.requireText !== false) return null;
	if (options.requireText !== false && selection.getTextContent().trim().length === 0) return null;
	if (selection.getNodes().some($isAIComposerTokenNode)) return null;

	const anchor = createSelectedTextAnchor(rootElement);
	if (!anchor && options.requireAnchor !== false) return null;

	return {
		anchor,
		selection: selection.clone(),
		signature: selectionSignature(selection),
		linkUrl: getSelectedLinkUrl(selection),
		formats: {
			bold: selection.hasFormat('bold'),
			italic: selection.hasFormat('italic'),
			code: selection.hasFormat('code'),
			strikethrough: selection.hasFormat('strikethrough'),
			highlight: selection.hasFormat('highlight')
		},
		blockType: getSelectionBlockType(selection),
		listType: getSelectionListType(selection)
	};
}

export function applyAIComposerSelectionFormat(
	editor: LexicalEditor,
	selection: RangeSelection,
	format: AIComposerSelectionFormat
) {
	editor.update(() => {
		const currentSelection = restoreSelection(selection);
		if (!currentSelection) return;
		currentSelection.formatText(format);
	});
}

export function applyAIComposerSelectionList(
	editor: LexicalEditor,
	selection: RangeSelection,
	listType: AIComposerSelectionListType
) {
	editor.update(() => {
		if (!restoreSelection(selection)) return;
		$insertList(listType);
	});
}

export function applyAIComposerSelectionBlock(
	editor: LexicalEditor,
	selection: RangeSelection,
	blockType: AIComposerSelectionBlockType
) {
	editor.update(() => {
		const currentSelection = restoreSelection(selection);
		if (!currentSelection) return;
		$setBlocksType(currentSelection, () => createBlockNode(blockType));
	});
}

export function applyAIComposerSelectionLink(
	editor: LexicalEditor,
	selection: RangeSelection,
	url: string | null
) {
	editor.update(() => {
		if (!restoreSelection(selection)) return;
		const nextUrl = url?.trim() || null;
		$toggleLink(nextUrl);
	});
}

function restoreSelection(selection: RangeSelection) {
	$setSelection(selection.clone());
	const currentSelection = $getSelection();
	if (!$isRangeSelection(currentSelection)) return null;
	return currentSelection;
}

function createSelectedTextAnchor(rootElement: HTMLDivElement): AnchoredReference | null {
	const domSelection = window.getSelection();
	if (!domSelection || domSelection.rangeCount === 0) return null;
	if (!domSelection.anchorNode || !domSelection.focusNode) return null;
	if (
		!rootElement.contains(domSelection.anchorNode) ||
		!rootElement.contains(domSelection.focusNode)
	) {
		return null;
	}

	const range = domSelection.getRangeAt(0).cloneRange();
	if (range.collapsed) return null;

	return {
		contextElement: rootElement,
		getBoundingClientRect: () => getRangeRect(range, rootElement),
		getClientRects: () => {
			const rects = Array.from(range.getClientRects()).filter(hasRectSize);
			return rects.length > 0 ? rects : [rootElement.getBoundingClientRect()];
		}
	};
}

function getRangeRect(range: Range, rootElement: HTMLDivElement) {
	const rects = Array.from(range.getClientRects()).filter(hasRectSize);
	if (rects.length === 0) return rootElement.getBoundingClientRect();

	const left = Math.min(...rects.map((rect) => rect.left));
	const top = Math.min(...rects.map((rect) => rect.top));
	const right = Math.max(...rects.map((rect) => rect.right));
	const bottom = Math.max(...rects.map((rect) => rect.bottom));
	return new DOMRect(left, top, right - left, bottom - top);
}

function hasRectSize(rect: DOMRect) {
	return rect.width > 0 || rect.height > 0;
}

function selectionSignature(selection: RangeSelection) {
	return [
		selection.anchor.key,
		selection.anchor.offset,
		selection.focus.key,
		selection.focus.offset,
		selection.getTextContent()
	].join(':');
}

function createBlockNode(blockType: AIComposerSelectionBlockType) {
	if (blockType === 'heading1') return $createHeadingNode('h1');
	if (blockType === 'heading2') return $createHeadingNode('h2');
	if (blockType === 'heading3') return $createHeadingNode('h3');
	if (blockType === 'quote') return $createQuoteNode();
	return $createParagraphNode();
}

function getSelectionBlockType(selection: RangeSelection): AIComposerSelectionBlockType {
	const anchorNode = selection.anchor.getNode();
	const heading = getNearestHeadingNode(anchorNode);
	if (heading) return headingTagToBlockType(heading.getTag());
	const quote = getNearestQuoteNode(anchorNode);
	if (quote) return 'quote';
	return 'paragraph';
}

function getSelectionListType(selection: RangeSelection): AIComposerSelectionListType | null {
	const list = $getNearestNodeOfType(selection.anchor.getNode(), ListNode);
	if (!$isListNode(list)) return null;
	const listType = list.getListType();
	if (listType === 'bullet' || listType === 'number') return listType;
	return null;
}

function getNearestHeadingNode(node: LexicalNode) {
	let currentNode: LexicalNode | null = node;
	while (currentNode) {
		if ($isHeadingNode(currentNode)) return currentNode;
		currentNode = currentNode.getParent();
	}
	return null;
}

function getNearestQuoteNode(node: LexicalNode) {
	let currentNode: LexicalNode | null = node;
	while (currentNode) {
		if ($isQuoteNode(currentNode)) return currentNode;
		currentNode = currentNode.getParent();
	}
	return null;
}

function headingTagToBlockType(tag: HeadingTagType): AIComposerSelectionBlockType {
	if (tag === 'h1') return 'heading1';
	if (tag === 'h2') return 'heading2';
	if (tag === 'h3') return 'heading3';
	return 'paragraph';
}

function getSelectedLinkUrl(selection: RangeSelection) {
	const urls = new Set<string>();
	for (const node of selection.getNodes()) {
		const link = getNearestLinkNode(node);
		if (link) urls.add(link.getURL());
	}
	return urls.size === 1 ? [...urls][0] : '';
}

function getNearestLinkNode(node: LexicalNode) {
	let currentNode: LexicalNode | null = node;
	while (currentNode) {
		if ($isLinkNode(currentNode)) return currentNode;
		currentNode = currentNode.getParent();
	}
	return null;
}
