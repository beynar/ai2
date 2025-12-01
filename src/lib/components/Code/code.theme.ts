import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

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

export type CodeTheme = typeof codeTheme;
export type CodeThemeProps = InferComponentTheme<CodeTheme>;
export const setCodeTheme = setComponentTheme<CodeTheme>('code');
export const useCodeTheme = useComponentTheme('code', codeTheme);

