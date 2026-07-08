import {
	$getNodeByKey,
	$getRoot,
	$getSelection,
	$isTextNode,
	$createTextNode,
	$insertNodes,
	type LexicalEditor
} from 'lexical';
import { $createAIComposerTokenNode, type AIComposerTokenData } from './token-node.js';
import type { TriggerState } from './trigger.js';

function selectRootEndIfNeeded() {
	if ($getSelection()) return;
	$getRoot().selectEnd();
}

function insertTokenData(data: AIComposerTokenData) {
	selectRootEndIfNeeded();
	$insertNodes([$createAIComposerTokenNode(data), $createTextNode(' ')]);
}

export function insertAIComposerToken(
	editor: LexicalEditor,
	trigger: TriggerState,
	data: AIComposerTokenData
) {
	editor.update(() => {
		const node = $getNodeByKey(trigger.nodeKey);
		if (!$isTextNode(node)) return;
		node.spliceText(trigger.startOffset, trigger.endOffset - trigger.startOffset, '', true);
		node.select(trigger.startOffset, trigger.startOffset);
		insertTokenData(data);
	});
}

export function insertAIComposerTokenAtSelection(editor: LexicalEditor, data: AIComposerTokenData) {
	editor.update(() => {
		insertTokenData(data);
	});
}

export function insertAIComposerTextAtSelection(editor: LexicalEditor, text: string) {
	if (text.length === 0) return;
	editor.update(() => {
		const selection = $getSelection() ?? $getRoot().selectEnd();
		selection.insertText(text);
	});
}
