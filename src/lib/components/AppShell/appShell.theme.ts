import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'min-h-svh w-full bg-background-muted text-foreground'
});

const defaultPage = cva({
	base: 'h-full min-h-0 overflow-hidden',
	variants: {
		variant: {
			sidebar:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]',
			floating:
				'bg-background-muted [--page-shell-chrome:var(--color-background-muted)] [--page-shell-surface:var(--color-background-muted)]',
			inset:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]',
			split:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]'
		},
		side: {
			left: '',
			right: ''
		}
	},
	compoundVariants: [
		{
			variant: 'inset',
			side: 'left',
			class:
				'md:my-2 md:mr-2 md:ml-0 md:rounded-xl md:border md:border-background-muted md:shadow-sm'
		},
		{
			variant: 'inset',
			side: 'right',
			class:
				'md:my-2 md:mr-0 md:ml-2 md:rounded-xl md:border md:border-background-muted md:shadow-sm'
		},
		{
			variant: 'split',
			side: 'left',
			class: 'md:rounded-l-xl md:border-y md:border-r md:border-background-muted md:shadow-sm'
		},
		{
			variant: 'split',
			side: 'right',
			class: 'md:rounded-r-xl md:border-y md:border-l md:border-background-muted md:shadow-sm'
		}
	],
	defaultVariants: {
		variant: 'sidebar',
		side: 'left'
	}
});

export const appShellTheme = {
	root: defaultRoot,
	page: defaultPage
};

export type AppShellTheme = typeof appShellTheme;
export type AppShellThemeProps = InferComponentTheme<AppShellTheme>;
export const setAppShellTheme = setComponentTheme<AppShellTheme>('app-shell');
export const useAppShellTheme = useComponentTheme<AppShellTheme>('app-shell', appShellTheme);
