import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({
	base: 'group/message flex w-full min-w-0 gap-3',
	variants: {
		role: {
			user: 'justify-end',
			assistant: 'justify-start',
			system: 'justify-center',
			tool: 'justify-start'
		},
		size: {
			small: 'py-1.5',
			normal: 'py-2',
			large: 'py-2.5'
		}
	},
	defaultVariants: { role: 'assistant', size: 'normal' }
});
const defaultBody = cva({
	base: 'flex min-w-0 max-w-[min(38rem,82%)] flex-col',
	variants: {
		role: {
			user: 'items-end',
			assistant: 'items-start',
			system: 'max-w-full items-center',
			tool: 'w-full max-w-full items-start'
		},
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		},
		variant: {
			bubble: null,
			minimal: null
		}
	},
	compoundVariants: [
		{
			role: 'assistant',
			variant: 'minimal',
			class: 'max-w-[min(44rem,100%)]'
		}
	],
	defaultVariants: { role: 'assistant', size: 'normal', variant: 'bubble' }
});
const defaultHeader = cva({
	base: 'px-1 font-medium text-neutral/55',
	variants: {
		size: {
			small: 'text-[0.6875rem]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: { size: 'normal' }
});
const defaultBubble = cva({
	base: 'min-w-0 max-w-full break-words [&_*:first-child]:mt-0 [&_*:last-child]:mb-0',
	variants: {
		role: {
			user: 'rounded-2xl rounded-br-md',
			assistant: 'rounded-2xl rounded-bl-md bg-neutral-muted text-neutral',
			system:
				'rounded-md border border-neutral-muted bg-surface text-neutral/70 [&_*]:!text-neutral/70',
			tool: 'w-full max-w-none rounded-2xl rounded-bl-md bg-neutral-muted text-neutral'
		},
		size: {
			small: 'px-3 py-2 text-xs leading-normal',
			normal: 'px-4 py-2.5 text-sm leading-relaxed',
			large: 'px-5 py-3 text-base leading-relaxed'
		},
		variant: {
			bubble: null,
			minimal: null
		}
	},
	compoundVariants: [
		{
			role: 'user',
			variant: 'bubble',
			class:
				'bg-primary text-primary-contrast [&_*]:!text-primary-contrast [&_code]:!bg-primary-contrast/15'
		},
		{
			role: 'user',
			variant: 'minimal',
			class: 'bg-neutral-muted text-neutral [&_*]:!text-neutral [&_code]:!bg-neutral/10'
		},
		{ role: 'system', size: 'small', class: 'px-2.5 py-1 !text-[0.6875rem]' },
		{ role: 'system', size: 'normal', class: 'px-3 py-1.5 !text-xs' },
		{ role: 'system', size: 'large', class: 'px-4 py-2 !text-sm' },
		{
			role: ['assistant', 'tool'],
			variant: 'minimal',
			class: 'rounded-none bg-transparent p-0'
		}
	],
	defaultVariants: { role: 'assistant', size: 'normal', variant: 'bubble' }
});
const defaultMarkdown = cva({
	base: 'min-w-0',
	variants: {
		size: {
			small: '!text-xs !leading-normal',
			normal: '',
			large: ''
		}
	},
	defaultVariants: { size: 'normal' }
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
	markdown: defaultMarkdown,
	files: defaultFiles,
	actions: defaultActions
};
export type AIMessageTheme = typeof aiMessageTheme;
export type AIMessageThemeProps = InferComponentTheme<AIMessageTheme>;
export const setAIMessageTheme = setComponentTheme<AIMessageTheme>('aiMessage');
export const useAIMessageTheme = useComponentTheme<AIMessageTheme>('aiMessage', aiMessageTheme);
