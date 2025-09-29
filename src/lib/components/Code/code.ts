import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { WithSlot } from '../Slot/slot.js';
import type { AnyLanguage, AnyTheme } from './highlighter.svelte.js';

export type CodeProps = WithSlot<
	WithAttachments<{
		class?: string;
		theme?: InferComponentTheme<typeof codeTheme>;
		language?: AnyLanguage;
		shikiTheme?: AnyTheme;
		code?: string;
	}>,
	'header' | 'footer'
>;

const defaultCode = cva({
	base: 'my-4 w-full overflow-hidden rounded-lg border border-surface-muted flex flex-col'
});

const defaultCodeHeader = cva({
	base: 'flex items-center justify-between bg-surface-muted px-2 py-1 text-contrast-muted text-xs'
});

const defaultCodeFooter = cva({
	base: 'flex items-center justify-between bg-surface-muted px-2 py-1 text-contrast-muted text-xs'
});

const defaultContainer = cva({
	base: 'h-fit w-full bg-surface p-2 font-mono text-sm'
});

const defaultPre = cva({
	base: 'overflow-x-auto font-mono p-0'
});

const defaultCodeLine = cva({
	base: 'block'
});

export const codeTheme = {
	code: defaultCode,
	header: defaultCodeHeader,
	line: defaultCodeLine,
	pre: defaultPre,
	footer: defaultCodeFooter,
	container: defaultContainer
};
