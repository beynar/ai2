<script lang="ts">
	import CheckboxesInput from '../Form/CheckboxesInput/CheckboxesInput.svelte';
	import RadioInput from '../Form/RadioInput/RadioInput.svelte';
	import TextArea from '../Form/TextArea/TextArea.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { Slot as SlotType } from '../Slot/slot.js';
	import AIAskUserQuestionFileStep from './AIAskUserQuestionFileStep.svelte';
	import {
		getAIAskFileAnswer,
		getAIAskStringAnswer,
		getAIAskStringArrayAnswer,
		isAIAskQuestionRequired
	} from './aiAskUserQuestionAnswers.js';
	import type {
		AIAskAnswer,
		AIAskQuestion,
		AIAskUserQuestionQuestionState
	} from './aiAskUserQuestion.props.js';
	import {
		useAIAskUserQuestionTheme,
		type AIAskUserQuestionThemeProps
	} from './aiAskUserQuestion.theme.js';

	let {
		question,
		value,
		errorMessage,
		disabled = false,
		renderer,
		onChange,
		onError,
		theme
	}: {
		question: AIAskQuestion;
		value: AIAskAnswer | undefined;
		errorMessage?: string;
		disabled?: boolean;
		renderer?: SlotType<AIAskUserQuestionQuestionState>;
		onChange: (value: AIAskAnswer) => void;
		onError: (message: string) => void;
		theme?: AIAskUserQuestionThemeProps;
	} = $props();

	const classes = $derived(useAIAskUserQuestionTheme(theme));
	const required = $derived(isAIAskQuestionRequired(question));
</script>

<div data-slot="ai-ask-user-question-step" class={classes.stepContent()}>
	{#if renderer}
		<Slot render={renderer} payload={{ question, value, setValue: onChange }} />
	{:else}
		<div class={classes.question()}>
			<div class={classes.questionTitle()}>{question.title}</div>
			{#if question.description}
				<div class={classes.questionDescription()}>{question.description}</div>
			{/if}
		</div>

		{#if question.type === undefined || question.type === 'text'}
			<TextArea
				value={getAIAskStringAnswer(value)}
				name={question.id}
				placeholder={question.placeholder ?? 'Type your answer...'}
				rows={question.rows ?? 4}
				aria-invalid={errorMessage ? 'true' : undefined}
				class={classes.textArea()}
				{required}
				{disabled}
				onChange={(answer: string) => onChange(answer)}
			/>
		{:else if question.type === 'single'}
			<RadioInput
				mode="card"
				value={getAIAskStringAnswer(value) || null}
				name={question.id}
				items={question.options.map((option) => ({ ...option, value: option.id }))}
				class={classes.options()}
				aria-label={question.title}
				aria-invalid={errorMessage ? 'true' : undefined}
				{required}
				{disabled}
				onChange={(answer: string) => onChange(answer)}
			/>
		{:else if question.type === 'multiple'}
			<CheckboxesInput
				mode="card"
				value={getAIAskStringArrayAnswer(value)}
				name={question.id}
				items={question.options.map((option) => ({ ...option, value: option.id }))}
				class={classes.options()}
				aria-label={question.title}
				aria-invalid={errorMessage ? 'true' : undefined}
				{required}
				{disabled}
				onChange={(answer: string[]) => onChange(answer)}
			/>
		{:else if question.type === 'file'}
			<AIAskUserQuestionFileStep
				{question}
				files={getAIAskFileAnswer(value)}
				{required}
				{disabled}
				{theme}
				{onError}
				onChange={(files) => onChange(files)}
			/>
		{/if}
	{/if}

	{#if errorMessage}
		<div role="alert" class={classes.error()}>{errorMessage}</div>
	{/if}
</div>
