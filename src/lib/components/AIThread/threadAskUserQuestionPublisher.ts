import type { AIThreadAskUserQuestion, AIThreadItem } from './aiThread.props.js';

type AskUserQuestionProvider<TMessage extends AIThreadItem> = {
	activeAskUserQuestion: AIThreadAskUserQuestion<TMessage> | null;
	setActiveAskUserQuestion: (
		request: AIThreadAskUserQuestion<TMessage> | null
	) => AIThreadAskUserQuestion<TMessage> | null;
};

type PublishedAskUserQuestion<TMessage extends AIThreadItem> = {
	provider: AskUserQuestionProvider<TMessage>;
	request: AIThreadAskUserQuestion<TMessage>;
};

export class AIThreadAskUserQuestionPublisher<TMessage extends AIThreadItem> {
	private published: PublishedAskUserQuestion<TMessage> | undefined;

	sync(
		provider: AskUserQuestionProvider<TMessage> | null,
		detected: AIThreadAskUserQuestion<TMessage> | null,
		hasDirectRequest: boolean
	): void {
		this.releaseReplacedRequest();
		if (!provider || hasDirectRequest) {
			this.clear();
			return;
		}
		if (!detected) {
			this.clear();
			return;
		}
		if (provider.activeAskUserQuestion) return;

		const publication = { provider, request: detected };
		this.published = publication;
		provider.setActiveAskUserQuestion(detected);
		if (this.published === publication && provider.activeAskUserQuestion !== publication.request) {
			this.published = undefined;
		}
	}

	destroy(): void {
		this.clear();
	}

	private releaseReplacedRequest(): void {
		if (
			this.published &&
			this.published.provider.activeAskUserQuestion !== this.published.request
		) {
			this.published = undefined;
		}
	}

	private clear(): void {
		const publication = this.published;
		this.published = undefined;
		if (publication && publication.provider.activeAskUserQuestion === publication.request) {
			publication.provider.setActiveAskUserQuestion(null);
		}
	}
}
