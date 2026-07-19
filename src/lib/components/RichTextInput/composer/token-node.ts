import {
	$applyNodeReplacement,
	$createTextNode,
	TextNode,
	type EditorConfig,
	type LexicalUpdateJSON,
	type NodeKey,
	type SerializedTextNode
} from 'lexical';
import type { RichTextInputTokenKind } from '../richTextInput.props.js';

export type AIComposerTokenKind = RichTextInputTokenKind;

export type AIComposerTokenData = {
	kind: AIComposerTokenKind;
	id: string;
	label: string;
	path?: string;
	markdown?: string;
	promptText?: string;
};

export type SerializedAIComposerTokenNode = SerializedTextNode & AIComposerTokenData;

function setTokenAttributes(dom: HTMLElement, data: AIComposerTokenData) {
	dom.className =
		'cn-ai-composer-token inline-flex max-w-full select-none items-center gap-1 rounded-md border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground align-baseline';
	dom.setAttribute('data-ai-token', data.kind);
	dom.setAttribute('data-ai-token-id', data.id);
	dom.setAttribute('contenteditable', 'false');
}

export class AIComposerTokenNode extends TextNode {
	__kind: AIComposerTokenKind;
	__id: string;
	__label: string;
	__path?: string;
	__markdown?: string;
	__promptText?: string;

	static getType(): string {
		return 'ai-composer-token';
	}

	static clone(node: AIComposerTokenNode): AIComposerTokenNode {
		return new AIComposerTokenNode(node.getData(), node.__key);
	}

	static importJSON(serializedNode: SerializedAIComposerTokenNode): AIComposerTokenNode {
		return $createAIComposerTokenNode(serializedNode).updateFromJSON(serializedNode);
	}

	constructor(data: AIComposerTokenData, key?: NodeKey) {
		super(data.label, key);
		this.__kind = data.kind;
		this.__id = data.id;
		this.__label = data.label;
		this.__path = data.path;
		this.__markdown = data.markdown;
		this.__promptText = data.promptText;
	}

	afterCloneFrom(prevNode: this): void {
		super.afterCloneFrom(prevNode);
		this.__kind = prevNode.__kind;
		this.__id = prevNode.__id;
		this.__label = prevNode.__label;
		this.__path = prevNode.__path;
		this.__markdown = prevNode.__markdown;
		this.__promptText = prevNode.__promptText;
	}

	getData(): AIComposerTokenData {
		const node = this.getLatest();
		return {
			kind: node.__kind,
			id: node.__id,
			label: node.__label,
			path: node.__path,
			markdown: node.__markdown,
			promptText: node.__promptText
		};
	}

	createDOM(config: EditorConfig): HTMLElement {
		const dom = super.createDOM(config);
		setTokenAttributes(dom, this.getData());
		return dom;
	}

	updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
		if (super.updateDOM(prevNode, dom, config)) return true;
		setTokenAttributes(dom, this.getData());
		return false;
	}

	updateFromJSON(serializedNode: LexicalUpdateJSON<SerializedAIComposerTokenNode>): this {
		const self = super.updateFromJSON(serializedNode).getWritable();
		self.__kind = serializedNode.kind;
		self.__id = serializedNode.id;
		self.__label = serializedNode.label;
		self.__path = serializedNode.path;
		self.__markdown = serializedNode.markdown;
		self.__promptText = serializedNode.promptText;
		return self;
	}

	exportJSON(): SerializedAIComposerTokenNode {
		return {
			...super.exportJSON(),
			...this.getData(),
			type: 'ai-composer-token'
		};
	}

	canInsertTextBefore(): boolean {
		return false;
	}

	canInsertTextAfter(): boolean {
		return false;
	}

	isTextEntity(): true {
		return true;
	}
}

export function $createAIComposerTokenNode(data: AIComposerTokenData): AIComposerTokenNode {
	return $applyNodeReplacement(new AIComposerTokenNode(data).setMode('token').toggleUnmergeable());
}

export function $isAIComposerTokenNode(node: unknown): node is AIComposerTokenNode {
	return node instanceof AIComposerTokenNode;
}

export function ensureAIComposerTokenTrailingText(node: AIComposerTokenNode): TextNode | null {
	if (node.getNextSibling() !== null) return null;
	const textNode = $createTextNode(' ');
	node.insertAfter(textNode);
	return textNode;
}
