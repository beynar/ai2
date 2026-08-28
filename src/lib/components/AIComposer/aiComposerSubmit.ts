import type {
	RichTextInputItem,
	RichTextInputToken
} from '../RichTextInput/richTextInput.props.js';
import { formatAIComposerTokenMarkdown } from '../RichTextInput/composer/markdown.js';
import type {
	AIComposerAttachment,
	AIComposerCommand,
	AIComposerMentionItem,
	AIComposerSkillItem,
	AIComposerSubmitMeta,
	AIComposerSubmitState,
	AIComposerSubmitToken,
	AIComposerTriggerSource
} from './aiComposer.props.js';

type AIComposerSubmitOptions = {
	markdown: string;
	tokens: readonly RichTextInputToken[];
	files: readonly File[];
	attachments: readonly AIComposerAttachment[];
	busy: boolean;
	commands?: AIComposerTriggerSource<AIComposerCommand>;
	mentions?: AIComposerTriggerSource<AIComposerMentionItem>;
	references?: AIComposerTriggerSource<AIComposerMentionItem>;
	skills?: AIComposerTriggerSource<AIComposerSkillItem>;
};

export class AIComposerSubmitMetadata {
	private commands = new Map<string, AIComposerCommand>();
	private mentions = new Map<string, AIComposerMentionItem>();

	remember(item: RichTextInputItem, kind: RichTextInputToken['kind']): void {
		if (kind === 'command') {
			const prompt = getCommandPrompt(item);
			this.commands.set(item.id, { ...item, kind: 'command', prompt });
			return;
		}
		const mentionKind = getMentionKind(item, kind);
		this.mentions.set(`${mentionKind}:${item.id}`, { ...item, kind: mentionKind });
	}

	build(options: AIComposerSubmitOptions): AIComposerSubmitMeta {
		const mentions = [...this.mentions.values()];
		return buildAIComposerSubmitMeta({
			...options,
			commands: mergeSourceItems(options.commands, [...this.commands.values()]),
			mentions: mergeSourceItems(
				options.mentions,
				mentions.filter((item) => item.kind === 'mention' || item.kind === 'file')
			),
			references: mergeSourceItems(
				options.references,
				mentions.filter((item) => item.kind === 'reference')
			),
			skills: mergeSourceItems(
				options.skills,
				mentions
					.filter((item) => item.kind === 'skill')
					.map((item) => ({ ...item, kind: 'skill', type: 'skill' }))
			)
		});
	}

	clear(): void {
		this.commands.clear();
		this.mentions.clear();
	}
}

export function buildAIComposerSubmitMeta({
	markdown,
	tokens,
	files,
	attachments,
	busy,
	commands,
	mentions,
	references,
	skills
}: AIComposerSubmitOptions): AIComposerSubmitMeta {
	const submitState: AIComposerSubmitState = {
		value: markdown,
		files: [...files],
		attachments: [...attachments],
		isEmpty: markdown.length === 0 && files.length === 0,
		isBusy: busy
	};
	const resolvedTokens: AIComposerSubmitToken[] = tokens.map((token) => ({
		...token,
		markdown: formatAIComposerTokenMarkdown(token),
		promptText: resolvePromptText(token, submitState, commands, mentions, references, skills)
	}));
	const commandIds: string[] = [];
	const fileIds: string[] = [];
	const mentionIds: string[] = [];
	const referenceIds: string[] = [];
	const skillIds: string[] = [];

	for (const token of resolvedTokens) {
		if (token.kind === 'command') {
			commandIds.push(token.id);
			continue;
		}
		mentionIds.push(token.id);
		if (token.kind === 'file') fileIds.push(token.id);
		if (token.kind === 'reference') referenceIds.push(token.id);
		if (token.kind === 'skill') skillIds.push(token.id);
	}

	return {
		markdown,
		modelInput: buildModelInput(markdown, resolvedTokens),
		files: [...files],
		attachments: [...attachments],
		tokens: resolvedTokens,
		commandIds,
		fileIds,
		mentionIds,
		referenceIds,
		skillIds
	};
}

function resolvePromptText(
	token: RichTextInputToken,
	submitState: AIComposerSubmitState,
	commands: AIComposerTriggerSource<AIComposerCommand> | undefined,
	mentions: AIComposerTriggerSource<AIComposerMentionItem> | undefined,
	references: AIComposerTriggerSource<AIComposerMentionItem> | undefined,
	skills: AIComposerTriggerSource<AIComposerSkillItem> | undefined
): string | undefined {
	if (token.kind === 'command') {
		const command = commands?.items?.find((item) => item.id === token.id);
		if (!command?.prompt) return token.promptText;
		return typeof command.prompt === 'function' ? command.prompt(submitState) : command.prompt;
	}
	const item = getTokenSourceItems(token.kind, mentions, references, skills)?.find(
		(candidate) => candidate.id === token.id
	);
	if (!item?.promptText) return token.promptText;
	return typeof item.promptText === 'function' ? item.promptText(item) : item.promptText;
}

function getTokenSourceItems(
	kind: RichTextInputToken['kind'],
	mentions: AIComposerTriggerSource<AIComposerMentionItem> | undefined,
	references: AIComposerTriggerSource<AIComposerMentionItem> | undefined,
	skills: AIComposerTriggerSource<AIComposerSkillItem> | undefined
): RichTextInputItem[] | undefined {
	if (kind === 'reference') return references?.items;
	if (kind === 'skill') return skills?.items;
	return mentions?.items;
}

function buildModelInput(markdown: string, tokens: readonly AIComposerSubmitToken[]): string {
	let cursor = 0;
	const parts: string[] = [];
	for (const token of tokens) {
		const tokenIndex = markdown.indexOf(token.markdown, cursor);
		if (tokenIndex < 0) continue;
		parts.push(markdown.slice(cursor, tokenIndex));
		parts.push(token.promptText ?? token.markdown);
		cursor = tokenIndex + token.markdown.length;
	}
	parts.push(markdown.slice(cursor));
	return parts.join('');
}

function mergeSourceItems<Item extends RichTextInputItem>(
	source: AIComposerTriggerSource<Item> | undefined,
	items: Item[]
): AIComposerTriggerSource<Item> | undefined {
	if (!source && items.length === 0) return undefined;
	const uniqueItems = new Map<string, Item>();
	for (const item of [...(source?.items ?? []), ...items]) {
		uniqueItems.set(`${item.kind ?? 'item'}:${item.id}`, item);
	}
	return { ...source, items: [...uniqueItems.values()] };
}

function getCommandPrompt(item: RichTextInputItem): AIComposerCommand['prompt'] {
	if (!('prompt' in item)) return undefined;
	const prompt = item.prompt;
	if (typeof prompt === 'string') return prompt;
	if (typeof prompt === 'function') {
		return (state) => {
			const value = prompt(state);
			if (typeof value !== 'string') {
				throw new Error(`AIComposer command "${item.id}" returned a non-string prompt.`);
			}
			return value;
		};
	}
	return undefined;
}

function getMentionKind(
	item: RichTextInputItem,
	fallback: Exclude<RichTextInputToken['kind'], 'command'>
): Exclude<RichTextInputToken['kind'], 'command'> {
	if (item.kind && item.kind !== 'command') return item.kind;
	if (!('type' in item)) return fallback;
	if (item.type === 'file' || item.type === 'reference' || item.type === 'skill') return item.type;
	return fallback;
}
