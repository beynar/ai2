import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({
	base: 'raised grid min-w-0 gap-3 rounded-lg bg-surface-raised text-sm text-neutral'
});
const defaultHeader = cva({ base: 'grid min-w-0 px-3 pt-3' });
const defaultHeaderTop = cva({ base: 'flex min-w-0 items-start justify-between gap-3' });
const defaultHeaderText = cva({ base: 'grid min-w-0 gap-1' });
const defaultRequester = cva({
	base: 'sr-only'
});
const defaultProgressGroup = cva({
	base: 'flex shrink-0 items-center'
});
const defaultSteps = cva({ base: 'flex shrink-0 items-center gap-1.5' });
const defaultStep = cva({
	base: 'state-layer size-2 rounded-full bg-neutral/20 text-neutral transition-colors disabled:pointer-events-none disabled:opacity-50',
	variants: { active: { true: 'bg-primary text-primary-contrast', false: '' } }
});
const defaultBody = cva({
	base: 'grid min-w-0 gap-3'
});
const defaultStepContent = cva({ base: 'grid w-full min-w-0 gap-3 px-3 pb-1' });
const defaultQuestion = cva({ base: 'grid min-w-0 gap-1' });
const defaultQuestionTitle = cva({
	base: 'break-words text-sm font-medium leading-snug text-neutral [overflow-wrap:anywhere]'
});
const defaultQuestionDescription = cva({
	base: 'break-words text-xs leading-relaxed text-neutral/60 [overflow-wrap:anywhere]'
});
const defaultTextArea = cva({ base: 'min-h-24 resize-none text-sm' });
const defaultOptions = cva({ base: 'grid w-full min-w-0 gap-2' });
const defaultFile = cva({ base: 'min-w-0' });
const defaultEmpty = cva({ base: 'm-3 min-w-0' });
const defaultError = cva({ base: 'mx-3 min-w-0 text-sm' });
const defaultFooter = cva({ base: 'flex min-w-0 items-center justify-between gap-2 px-3 pb-3' });
const defaultProgress = cva({ base: 'sr-only' });
const defaultTitle = cva({
	base: 'break-words text-xs font-medium leading-snug text-neutral/60 [overflow-wrap:anywhere]'
});
const defaultDescription = cva({
	base: 'break-words text-xs leading-relaxed text-neutral/60 [overflow-wrap:anywhere]'
});
export const aiAskUserQuestionTheme = {
	root: defaultRoot,
	header: defaultHeader,
	headerTop: defaultHeaderTop,
	headerText: defaultHeaderText,
	requester: defaultRequester,
	progressGroup: defaultProgressGroup,
	steps: defaultSteps,
	step: defaultStep,
	body: defaultBody,
	stepContent: defaultStepContent,
	question: defaultQuestion,
	questionTitle: defaultQuestionTitle,
	questionDescription: defaultQuestionDescription,
	textArea: defaultTextArea,
	options: defaultOptions,
	file: defaultFile,
	empty: defaultEmpty,
	error: defaultError,
	footer: defaultFooter,
	progress: defaultProgress,
	title: defaultTitle,
	description: defaultDescription
};
export type AIAskUserQuestionTheme = typeof aiAskUserQuestionTheme;
export type AIAskUserQuestionThemeProps = InferComponentTheme<AIAskUserQuestionTheme>;
export const setAIAskUserQuestionTheme =
	setComponentTheme<AIAskUserQuestionTheme>('aiAskUserQuestion');
export const useAIAskUserQuestionTheme = useComponentTheme<AIAskUserQuestionTheme>(
	'aiAskUserQuestion',
	aiAskUserQuestionTheme
);
