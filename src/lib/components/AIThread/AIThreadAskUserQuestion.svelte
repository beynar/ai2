<script lang="ts" generics="TMessage extends AIThreadItem = AIThreadItem">
	import AIAskUserQuestion from '../AIAskUserQuestion/AIAskUserQuestion.svelte';
	import type {
		AIAskAnswers,
		AIAskUserQuestionSubmitDetail
	} from '../AIAskUserQuestion/aiAskUserQuestion.props.js';
	import type {
		AIThreadAskUserQuestion as AIThreadAskUserQuestionRequest,
		AIThreadItem,
		AIThreadProps
	} from './aiThread.props.js';

	type Props<TMessage extends AIThreadItem> = Pick<
		AIThreadProps<TMessage>,
		'askUserQuestionDisabled'
	> & {
		request: AIThreadAskUserQuestionRequest<TMessage>;
		value?: AIAskAnswers;
		class?: string;
		onChange: (request: AIThreadAskUserQuestionRequest<TMessage>, values: AIAskAnswers) => void;
		onResolve: (
			request: AIThreadAskUserQuestionRequest<TMessage>,
			state: 'completed' | 'discarded',
			detail?: AIAskUserQuestionSubmitDetail
		) => void | Promise<void>;
	};

	let {
		request,
		value,
		askUserQuestionDisabled = false,
		class: className,
		onChange,
		onResolve
	}: Props<TMessage> = $props();

	const values = $derived(value ?? request.value ?? {});
</script>

<div data-slot="ai-thread-ask-user-question" class={className}>
	<AIAskUserQuestion
		questions={request.questions}
		value={values}
		disabled={askUserQuestionDisabled}
		title={request.title ?? 'Clarify before continuing'}
		requester={request.requester}
		context={request.context}
		submitLabel={request.submitLabel}
		submittingLabel={request.submittingLabel}
		nextLabel={request.nextLabel}
		previousLabel={request.previousLabel}
		discardLabel={request.discardLabel}
		onChange={(nextValues: AIAskAnswers) => onChange(request, nextValues)}
		onSubmit={(detail: AIAskUserQuestionSubmitDetail) => onResolve(request, 'completed', detail)}
		onDiscard={() => onResolve(request, 'discarded')}
	/>
</div>
