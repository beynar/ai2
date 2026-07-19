import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({ base: 'raised grid min-w-0 gap-3 rounded-lg p-3 text-sm' });
const defaultHeader = cva({ base: 'grid min-w-0' });
const defaultHeaderTop = cva({ base: 'flex min-w-0 items-start justify-between gap-3' });
const defaultHeaderText = cva({ base: 'grid min-w-0 gap-1' });
const defaultRequester = cva({
	base: 'break-words text-[0.6875rem] text-foreground/55 [overflow-wrap:anywhere]'
});
const defaultProgressGroup = cva({
	base: 'flex shrink-0 flex-col items-end gap-2'
});
const defaultSteps = cva({ base: 'flex shrink-0 items-center gap-1.5' });
const defaultStep = cva({
	base: 'size-2 rounded-full bg-foreground/20 transition-colors hover:bg-foreground/40 disabled:pointer-events-none disabled:opacity-50',
	variants: { active: { true: 'bg-primary hover:bg-primary', false: '' } }
});
const defaultBody = cva({
	base: 'grid min-w-0 gap-3 rounded-md border border-background-muted bg-background p-3'
});
const defaultStepContent = cva({ base: 'grid w-full min-w-0 gap-3 p-1' });
const defaultQuestion = cva({ base: 'grid min-w-0 gap-1' });
const defaultQuestionTitle = cva({
	base: 'break-words font-medium leading-snug text-foreground [overflow-wrap:anywhere]'
});
const defaultQuestionDescription = cva({
	base: 'break-words text-xs leading-relaxed text-foreground/60 [overflow-wrap:anywhere]'
});
const defaultTextArea = cva({ base: 'min-h-24 resize-none text-sm' });
const defaultOptions = cva({ base: 'grid w-full min-w-0 gap-2' });
const defaultFile = cva({ base: 'min-w-0' });
const defaultEmpty = cva({ base: 'min-w-0' });
const defaultError = cva({ base: 'min-w-0 text-sm' });
const defaultFooter = cva({ base: 'flex min-w-0 items-center justify-between gap-2' });
const defaultProgress = cva({ base: 'font-medium' });
const defaultTitle = cva({
	base: 'break-words font-medium leading-snug text-foreground [overflow-wrap:anywhere]'
});
const defaultDescription = cva({
	base: 'break-words text-xs leading-relaxed text-foreground/60 [overflow-wrap:anywhere]'
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
