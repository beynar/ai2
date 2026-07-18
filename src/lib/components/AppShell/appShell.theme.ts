import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'relative h-[var(--window-height,100dvh)] min-h-0 w-full overflow-hidden text-foreground'
});

const defaultPage = cva({
	base: 'h-full min-h-0 overflow-hidden',
	variants: {
		variant: {
			sidebar:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]',
			floating:
				'bg-background-dark [--page-shell-chrome:var(--color-background-dark)] [--page-shell-surface:var(--color-background-dark)]',
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
