import type { Extension } from 'svelte-streamdown';

const inlineTokenPattern = /^<(File|Reference|Mention|Skill|Command)((?:\s+\w+="[^"]*")*)\s*\/>/;
const blockStartPattern = /(^|\n)([ \t]*)(?=<(?:File|Reference|Mention|Skill|Command)(?:\s|\/>))/g;
const attributePattern = /(\w+)="([^"]*)"/g;
const inlineSentinel = '\u200B';

function parseAttributes(input: string): Record<string, string> {
	const attributes: Record<string, string> = {};
	for (const match of input.matchAll(attributePattern)) {
		const name = match[1];
		const value = match[2];
		if (name !== undefined && value !== undefined) attributes[name] = value;
	}
	return attributes;
}

export const aiMessageInlineMdxExtension: Extension = {
	name: 'ai-message-inline-mdx',
	level: 'inline',
	tokenizer(source) {
		const match = source.match(inlineTokenPattern);
		if (!match) return undefined;
		return {
			type: 'mdx',
			raw: match[0],
			tagName: match[1],
			attributes: parseAttributes(match[2] ?? ''),
			selfClosing: true
		};
	},
	start(source) {
		const index = source.search(/<(File|Reference|Mention|Skill|Command)(?:\s|\/>)/);
		return index === -1 ? undefined : index;
	}
};

export function protectAIMessageInlineMdxBlocks(content: string): string {
	return content.replace(blockStartPattern, `$1$2${inlineSentinel}`);
}
