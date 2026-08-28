import type { LexicalEditor } from 'lexical';
import {
	applyAIComposerSelectionBlock,
	applyAIComposerSelectionFormat,
	applyAIComposerSelectionLink,
	applyAIComposerSelectionList,
	readAIComposerSelectionState,
	type AIComposerSelectionBlockType,
	type AIComposerSelectionFormat,
	type AIComposerSelectionFormats,
	type AIComposerSelectionListType,
	type AIComposerSelectionState
} from './composer/selection-formatting.js';

type RichTextInputFixedToolbarOptions = {
	editor: LexicalEditor | null;
	rootElement: HTMLDivElement | null;
	enabled: boolean;
};

type RichTextInputFixedToolbarOptionsSource = () => RichTextInputFixedToolbarOptions;

const emptyFormats: AIComposerSelectionFormats = {
	bold: false,
	italic: false,
	code: false,
	strikethrough: false,
	highlight: false
};

export class RichTextInputFixedToolbarController {
	private selection = $state<AIComposerSelectionState | null>(null);

	constructor(private optionsSource: RichTextInputFixedToolbarOptionsSource) {}

	get formats() {
		return this.selection?.formats ?? emptyFormats;
	}

	get blockType() {
		return this.selection?.blockType ?? 'paragraph';
	}

	get listType() {
		return this.selection?.listType ?? null;
	}

	get linkUrl() {
		return this.selection?.linkUrl ?? '';
	}

	reset() {
		this.selection = null;
	}

	update() {
		const options = this.optionsSource();
		this.selection = options.enabled
			? readAIComposerSelectionState(options.rootElement, {
					requireText: false,
					requireAnchor: false
				})
			: null;
	}

	format(format: AIComposerSelectionFormat) {
		this.withSelection((editor, selection) => {
			applyAIComposerSelectionFormat(editor, selection.selection, format);
		});
	}

	list(listType: AIComposerSelectionListType) {
		this.withSelection((editor, selection) => {
			applyAIComposerSelectionList(editor, selection.selection, listType);
		});
	}

	block(blockType: AIComposerSelectionBlockType) {
		this.withSelection((editor, selection) => {
			applyAIComposerSelectionBlock(editor, selection.selection, blockType);
		});
	}

	link(url: string | null) {
		this.withSelection((editor, selection) => {
			applyAIComposerSelectionLink(editor, selection.selection, url);
		});
	}

	private get options() {
		return this.optionsSource();
	}

	private withSelection(
		callback: (editor: LexicalEditor, selection: AIComposerSelectionState) => void
	) {
		const { editor } = this.options;
		if (!editor || !this.selection) return;
		callback(editor, this.selection);
		editor.focus();
	}
}
