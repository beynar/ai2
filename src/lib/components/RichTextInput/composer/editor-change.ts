import type { AIComposerTokenData } from './token-node.js';

export type AIComposerEditorChange = {
	markdown: string;
	tokens: AIComposerTokenData[];
	isEmpty: boolean;
};
