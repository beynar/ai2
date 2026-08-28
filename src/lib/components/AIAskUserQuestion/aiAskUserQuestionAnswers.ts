import type {
	AIAskAnswer,
	AIAskAnswers,
	AIAskQuestion,
	AIAskUserQuestionAnswer,
	AIAskUserQuestionType,
	AIFileQuestion,
	AIMultipleQuestion,
	AISingleQuestion,
	AITextQuestion
} from './aiAskUserQuestion.props.js';

export function getAIAskQuestionType(question: AIAskQuestion): AIAskUserQuestionType {
	return question.type ?? 'text';
}

export function isAIAskQuestionRequired(question: AIAskQuestion): boolean {
	return question.required ?? true;
}

export function getAIAskStringAnswer(answer: AIAskAnswer | undefined): string {
	return typeof answer === 'string' ? answer : '';
}

export function getAIAskStringArrayAnswer(answer: AIAskAnswer | undefined): string[] {
	if (!Array.isArray(answer)) return [];
	return answer.filter((entry): entry is string => typeof entry === 'string');
}

export function getAIAskFileAnswer(answer: AIAskAnswer | undefined): File[] {
	if (!Array.isArray(answer) || typeof File === 'undefined') return [];
	return answer.filter((entry): entry is File => entry instanceof File);
}

export function hasSameAIAskAnswer(
	question: AIAskQuestion,
	currentAnswer: AIAskAnswer | undefined,
	nextAnswer: AIAskAnswer
): boolean {
	const type = getAIAskQuestionType(question);
	if (type === 'text' || type === 'single') {
		return getAIAskStringAnswer(currentAnswer) === getAIAskStringAnswer(nextAnswer);
	}

	const currentValues =
		type === 'file' ? getAIAskFileAnswer(currentAnswer) : getAIAskStringArrayAnswer(currentAnswer);
	const nextValues =
		type === 'file' ? getAIAskFileAnswer(nextAnswer) : getAIAskStringArrayAnswer(nextAnswer);
	return (
		currentValues.length === nextValues.length &&
		currentValues.every((value, index) => value === nextValues[index])
	);
}

export function isAIAskQuestionAnswered(question: AIAskQuestion, values: AIAskAnswers): boolean {
	if (!isAIAskQuestionRequired(question)) return true;
	const answer = values[question.id];
	const type = getAIAskQuestionType(question);
	if (type === 'text') return getAIAskStringAnswer(answer).trim().length > 0;
	if (type === 'single') return getAIAskStringAnswer(answer).length > 0;
	if (type === 'file') return getAIAskFileAnswer(answer).length > 0;
	return getAIAskStringArrayAnswer(answer).length > 0;
}

export function getFirstMissingAIAskQuestionIndex(
	questions: readonly AIAskQuestion[],
	values: AIAskAnswers
): number {
	return questions.findIndex((question) => !isAIAskQuestionAnswered(question, values));
}

export function toAIAskAnswerList(
	questions: readonly AIAskQuestion[],
	values: AIAskAnswers
): AIAskUserQuestionAnswer[] {
	return questions.map((question) => toAnswer(question, values[question.id]));
}

function toAnswer(
	question: AIAskQuestion,
	answer: AIAskAnswer | undefined
): AIAskUserQuestionAnswer {
	if (question.type === 'single') return toSingleAnswer(question, answer);
	if (question.type === 'multiple') return toMultipleAnswer(question, answer);
	if (question.type === 'file') return toFileAnswer(question, answer);
	return toTextAnswer(question, answer);
}

function toTextAnswer(
	question: AITextQuestion,
	answer: AIAskAnswer | undefined
): AIAskUserQuestionAnswer {
	return {
		question,
		questionId: question.id,
		type: 'text',
		value: getAIAskStringAnswer(answer).trim()
	};
}

function toSingleAnswer(
	question: AISingleQuestion,
	answer: AIAskAnswer | undefined
): AIAskUserQuestionAnswer {
	return {
		question,
		questionId: question.id,
		type: 'single',
		value: getAIAskStringAnswer(answer)
	};
}

function toMultipleAnswer(
	question: AIMultipleQuestion,
	answer: AIAskAnswer | undefined
): AIAskUserQuestionAnswer {
	return {
		question,
		questionId: question.id,
		type: 'multiple',
		value: getAIAskStringArrayAnswer(answer)
	};
}

function toFileAnswer(
	question: AIFileQuestion,
	answer: AIAskAnswer | undefined
): AIAskUserQuestionAnswer {
	return {
		question,
		questionId: question.id,
		type: 'file',
		value: getAIAskFileAnswer(answer)
	};
}
