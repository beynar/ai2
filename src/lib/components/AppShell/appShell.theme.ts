import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'relative min-h-[var(--window-height,100dvh)] w-full text-foreground'
});

const defaultPage = cva({
	base: 'min-h-full [--page-shell-edge-shadow:none] [--page-shell-gap-shadow:none]',
	variants: {
		variant: {
			admin:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)] [--page-shell-underlay:var(--color-background)]',
			floating:
				'bg-background-dark [--page-shell-chrome:var(--color-background-dark)] [--page-shell-surface:var(--color-background-dark)] [--page-shell-underlay:var(--color-background-dark)]',
			inset:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)] [--page-shell-underlay:var(--color-background-dark)]',
			split:
				'bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)] [--page-shell-underlay:var(--color-background-dark)]'
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
				'[--page-shell-edge-shadow:-2px_0_4px_-2px_rgb(0_0_0_/_0.12)] [--page-shell-gap-shadow:-0.5rem_0_0_0_var(--page-shell-underlay)]'
		},
		{
			variant: 'inset',
			side: 'right',
			class:
				'[--page-shell-edge-shadow:2px_0_4px_-2px_rgb(0_0_0_/_0.12)] [--page-shell-gap-shadow:0.5rem_0_0_0_var(--page-shell-underlay)]'
		},
		{
			variant: 'split',
			class:
				'[--page-shell-edge-shadow:-2px_0_4px_-2px_rgb(0_0_0_/_0.12),2px_0_4px_-2px_rgb(0_0_0_/_0.12)] [--page-shell-gap-shadow:-0.5rem_0_0_0_var(--page-shell-underlay),0.5rem_0_0_0_var(--page-shell-underlay)]'
		}
	],
	defaultVariants: {
		variant: 'admin',
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
