import {
	BOLD_ITALIC_STAR,
	BOLD_ITALIC_UNDERSCORE,
	BOLD_STAR,
	BOLD_UNDERSCORE,
	HEADING,
	HIGHLIGHT,
	INLINE_CODE,
	ITALIC_STAR,
	ITALIC_UNDERSCORE,
	LINK,
	ORDERED_LIST,
	QUOTE,
	STRIKETHROUGH,
	UNORDERED_LIST,
	type TextMatchTransformer,
	type Transformer
} from '@lexical/markdown';
import type { TextNode } from 'lexical';
import type { RichTextInputFormat } from '../richTextInput.props.js';
import {
	$createAIComposerTokenNode,
	$isAIComposerTokenNode,
	AIComposerTokenNode,
	ensureAIComposerTokenTrailingText,
	type AIComposerTokenData
} from './token-node.js';

const TOKEN_RE = /<(File|Reference|Skill|Command)\s+([^>]*?)\s*\/>/;
const TOKEN_SHORTCUT_RE = /<(File|Reference|Skill|Command)\s+([^>]*?)\s*\/>$/;
const ATTR_RE = /(\w+)="([^"]*)"/g;

function tokenKindFromTag(tag: string): AIComposerTokenData['kind'] {
	if (tag === 'Command') return 'command';
	if (tag === 'Skill') return 'skill';
	if (tag === 'Reference') return 'reference';
	return 'file';
}

function tokenTag(kind: AIComposerTokenData['kind']) {
	if (kind === 'command') return 'Command';
	if (kind === 'skill') return 'Skill';
	if (kind === 'reference') return 'Reference';
	return 'File';
}

function cleanAttributeValue(value: string) {
	return value
		.replace(/"/g, "'")
		.replace(/[<>\n\r\t]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function attribute(name: string, value: string | undefined) {
	if (!value) return '';
	return ` ${name}="${cleanAttributeValue(value)}"`;
}

function readAttributes(input: string) {
	const attributes: Record<string, string> = {};
	for (const match of input.matchAll(ATTR_RE)) {
		attributes[match[1]] = match[2];
	}
	return attributes;
}

function parseToken(match: RegExpMatchArray): AIComposerTokenData | null {
	const attributes = readAttributes(match[2] ?? '');
	const id = attributes.id;
	const label = attributes.label;
	if (!id || !label) return null;
	const kind = tokenKindFromTag(match[1]);
	return {
		kind,
		id,
		label,
		path: kind === 'file' || kind === 'reference' ? attributes.path : undefined,
		markdown: match[0]
	};
}

export function formatAIComposerTokenMarkdown(data: AIComposerTokenData) {
	if (data.markdown) return data.markdown;
	const tag = tokenTag(data.kind);
	return `<${tag}${attribute('id', data.id)}${attribute('label', data.label)}${attribute(
		'path',
		data.kind === 'file' || data.kind === 'reference' ? data.path : undefined
	)} />`;
}

export const AI_COMPOSER_TOKEN_TRANSFORMER: TextMatchTransformer = {
	dependencies: [AIComposerTokenNode],
	export: (node) =>
		$isAIComposerTokenNode(node) ? formatAIComposerTokenMarkdown(node.getData()) : null,
	importRegExp: TOKEN_RE,
	regExp: TOKEN_SHORTCUT_RE,
	replace: (textNode: TextNode, match: RegExpMatchArray) => {
		const data = parseToken(match);
		if (!data) return;
		const tokenNode = $createAIComposerTokenNode(data);
		textNode.replace(tokenNode);
		const trailingText = ensureAIComposerTokenTrailingText(tokenNode);
		trailingText?.select(1, 1);
		return tokenNode;
	},
	trigger: '>',
	type: 'text-match'
};

export function getAIComposerMarkdownTransformers(
	formats?: readonly RichTextInputFormat[]
): Transformer[] {
	const transformers: Transformer[] = [];
	const hasBold = hasFormat(formats, 'bold');
	const hasItalic = hasFormat(formats, 'italic');

	if (hasAnyFormat(formats, ['heading1', 'heading2', 'heading3'])) transformers.push(HEADING);
	if (hasFormat(formats, 'quote')) transformers.push(QUOTE);
	if (hasFormat(formats, 'bulletList')) transformers.push(UNORDERED_LIST);
	if (hasFormat(formats, 'orderedList')) transformers.push(ORDERED_LIST);

	transformers.push(AI_COMPOSER_TOKEN_TRANSFORMER);

	if (hasFormat(formats, 'code')) transformers.push(INLINE_CODE);
	if (hasBold && hasItalic) {
		transformers.push(BOLD_ITALIC_STAR, BOLD_ITALIC_UNDERSCORE);
	}
	if (hasBold) transformers.push(BOLD_STAR, BOLD_UNDERSCORE);
	if (hasFormat(formats, 'highlight')) transformers.push(HIGHLIGHT);
	if (hasFormat(formats, 'strikethrough')) transformers.push(STRIKETHROUGH);
	if (hasItalic) transformers.push(ITALIC_STAR, ITALIC_UNDERSCORE);
	if (hasFormat(formats, 'link')) transformers.push(LINK);

	return transformers;
}

export const AI_COMPOSER_MARKDOWN_TRANSFORMERS: Transformer[] = getAIComposerMarkdownTransformers();

function hasFormat(
	formats: readonly RichTextInputFormat[] | undefined,
	format: RichTextInputFormat
) {
	return !formats || formats.includes(format);
}

function hasAnyFormat(
	formats: readonly RichTextInputFormat[] | undefined,
	nextFormats: RichTextInputFormat[]
) {
	return nextFormats.some((format) => hasFormat(formats, format));
}
