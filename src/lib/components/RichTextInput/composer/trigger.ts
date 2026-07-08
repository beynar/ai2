import type { AnchoredReference } from '../anchored-reference.js';
import { $getSelection, $isRangeSelection, $isTextNode, type NodeKey } from 'lexical';
import { $isAIComposerTokenNode } from './token-node.js';

export type TriggerKind = 'command' | 'mention' | 'skill' | (string & {});

export type TriggerState = {
	kind: TriggerKind;
	trigger: string;
	query: string;
	nodeKey: NodeKey;
	startOffset: number;
	endOffset: number;
};

export function createCaretAnchor(rootElement: HTMLDivElement | null): AnchoredReference | null {
	if (!rootElement || typeof window === 'undefined') return null;
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0 || !selection.anchorNode) return null;
	if (!rootElement.contains(selection.anchorNode)) return null;
	const range = selection.getRangeAt(0).cloneRange();
	range.collapse(true);
	const rect = range.getBoundingClientRect();
	const fallbackRect = rootElement.getBoundingClientRect();
	const anchorRect = rect.width || rect.height ? rect : fallbackRect;
	return {
		contextElement: rootElement,
		getBoundingClientRect: () => anchorRect,
		getClientRects: () => [anchorRect]
	};
}

export function readTriggerState(
	triggerCharacters: string[] = ['@', '/', '$']
): TriggerState | null {
	const selection = $getSelection();
	if (
		!$isRangeSelection(selection) ||
		!selection.isCollapsed() ||
		selection.anchor.type !== 'text'
	) {
		return null;
	}
	const triggers = normalizeTriggerCharacters(triggerCharacters);
	if (triggers.length === 0) return null;
	const node = selection.anchor.getNode();
	if (!$isTextNode(node)) return null;
	if ($isAIComposerTokenNode(node)) return null;
	const beforeCaret = node.getTextContent().slice(0, selection.anchor.offset);
	const triggerPattern = triggers.map(escapeRegexCharacter).join('');
	const match = beforeCaret.match(
		new RegExp(`(^|\\s)([${triggerPattern}])([^\\s${triggerPattern}]*)$`)
	);
	if (!match) return null;
	const leading = match[1] ?? '';
	const trigger = match[2];
	return {
		kind: getTriggerKind(trigger),
		trigger,
		query: match[3] ?? '',
		nodeKey: node.getKey(),
		startOffset: selection.anchor.offset - match[0].length + leading.length,
		endOffset: selection.anchor.offset
	};
}

export function isSameTriggerState(
	currentMenu: TriggerState | null,
	nextMenu: TriggerState | null
) {
	if (!currentMenu || !nextMenu) return currentMenu === nextMenu;
	return (
		currentMenu.kind === nextMenu.kind &&
		currentMenu.trigger === nextMenu.trigger &&
		currentMenu.query === nextMenu.query &&
		currentMenu.nodeKey === nextMenu.nodeKey &&
		currentMenu.startOffset === nextMenu.startOffset &&
		currentMenu.endOffset === nextMenu.endOffset
	);
}

function getTriggerKind(trigger: string): TriggerKind {
	if (trigger === '/') return 'command';
	if (trigger === '$') return 'skill';
	if (trigger === '@') return 'mention';
	return trigger;
}

function normalizeTriggerCharacters(triggerCharacters: string[]) {
	return [...new Set(triggerCharacters.filter((trigger) => trigger.length === 1))];
}

function escapeRegexCharacter(character: string) {
	return character.replace(/[\\^$.*+?()[\]{}|\-/]/g, '\\$&');
}
