import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({
	base: 'flex min-h-7 w-full flex-wrap items-center gap-1 px-1 transition-opacity motion-reduce:transition-none',
	variants: {
		role: {
			user: 'justify-end',
			assistant: 'justify-start',
			system: 'justify-center',
			tool: 'justify-start'
		},
		visibility: {
			hover:
				'opacity-0 group-hover/message:opacity-100 group-focus-within/message:opacity-100 hover:opacity-100 focus-within:opacity-100',
			always: 'opacity-100',
			none: 'hidden'
		}
	},
	defaultVariants: { role: 'assistant', visibility: 'always' }
});
const defaultButton = cva({ base: 'text-foreground/60 hover:text-foreground' });
const defaultError = cva({ base: 'w-full basis-full pt-1' });
export const aiMessageActionsTheme = {
	root: defaultRoot,
	button: defaultButton,
	error: defaultError
};
export type AIMessageActionsTheme = typeof aiMessageActionsTheme;
export type AIMessageActionsThemeProps = InferComponentTheme<AIMessageActionsTheme>;
export const setAIMessageActionsTheme =
	setComponentTheme<AIMessageActionsTheme>('aiMessageActions');
export const useAIMessageActionsTheme = useComponentTheme<AIMessageActionsTheme>(
	'aiMessageActions',
	aiMessageActionsTheme
);
