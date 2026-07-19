import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({
	base: 'group/message flex w-full min-w-0 gap-3 py-2',
	variants: {
		role: {
			user: 'justify-end',
			assistant: 'justify-start',
			system: 'justify-center',
			tool: 'justify-start'
		}
	},
	defaultVariants: { role: 'assistant' }
});
const defaultBody = cva({
	base: 'flex min-w-0 max-w-[min(38rem,82%)] flex-col gap-1',
	variants: {
		role: {
			user: 'items-end',
			assistant: 'items-start',
			system: 'max-w-full items-center',
			tool: 'w-full max-w-full items-start'
		}
	},
	defaultVariants: { role: 'assistant' }
});
const defaultHeader = cva({ base: 'px-1 text-xs font-medium text-foreground/55' });
const defaultBubble = cva({
	base: 'min-w-0 max-w-full break-words text-sm leading-relaxed [&_*:first-child]:mt-0 [&_*:last-child]:mb-0',
	variants: {
		role: {
			user: 'rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-contrast [&_*]:!text-primary-contrast [&_code]:!bg-primary-contrast/15',
			assistant: 'rounded-2xl rounded-bl-md bg-background-muted px-4 py-2.5 text-foreground',
			system:
				'rounded-md border border-background-muted bg-background px-3 py-1.5 text-xs text-foreground/70 [&_*]:!text-foreground/70',
			tool: 'w-full max-w-none rounded-2xl rounded-bl-md bg-background-muted px-4 py-2.5 text-foreground'
		}
	},
	defaultVariants: { role: 'assistant' }
});
const defaultFiles = cva({ base: 'max-w-full min-w-0' });
const defaultActions = cva({
	base: 'transition-opacity motion-reduce:transition-none',
	variants: {
		visibility: {
			hover: 'opacity-0 group-hover/message:opacity-100 group-focus-within/message:opacity-100',
			always: 'opacity-100',
			none: 'hidden'
		}
	},
	defaultVariants: { visibility: 'hover' }
});
export const aiMessageTheme = {
	root: defaultRoot,
	body: defaultBody,
	header: defaultHeader,
	bubble: defaultBubble,
	files: defaultFiles,
	actions: defaultActions
};
export type AIMessageTheme = typeof aiMessageTheme;
export type AIMessageThemeProps = InferComponentTheme<AIMessageTheme>;
export const setAIMessageTheme = setComponentTheme<AIMessageTheme>('aiMessage');
export const useAIMessageTheme = useComponentTheme<AIMessageTheme>('aiMessage', aiMessageTheme);
