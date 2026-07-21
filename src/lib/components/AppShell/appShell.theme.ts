import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'relative h-[var(--window-height,100dvh)] min-h-0 w-full overflow-hidden text-neutral'
});

const defaultPage = cva({
	base: 'h-full min-h-0 [&>[data-slot=page-shell-content]]:min-h-0 [&>[data-slot=page-shell-content]]:overflow-y-auto [&>[data-slot=page-shell-content]]:overscroll-contain [&>[data-slot=page-shell-footer]]:static [&>[data-slot=page-shell-header]]:static',
	variants: {
		variant: {
			admin:
				'bg-surface [--page-shell-chrome:var(--color-surface-canvas)] [--page-shell-surface:var(--color-surface)]',
			floating:
				'bg-surface-canvas [--page-shell-chrome:var(--color-surface-raised)] [--page-shell-surface:var(--color-surface-canvas)] [--page-shell-chrome-inline-gap:0.5rem] [--page-shell-chrome-block-gap:0.5rem] [--page-shell-header-top-radius:0.75rem] [--page-shell-header-bottom-radius:0.75rem] [--page-shell-footer-top-radius:0.75rem] [--page-shell-footer-bottom-radius:0.75rem] [--page-shell-chrome-border:var(--color-neutral-muted)] [--page-shell-chrome-shadow:0_1px_2px_0_rgb(0_0_0_/_0.05)]',
			inset:
				'bg-surface [--page-shell-chrome:var(--color-surface)] [--page-shell-surface:var(--color-surface)] [--page-shell-chrome-divider:transparent] transition-[border-color,box-shadow] md:border md:border-neutral-muted md:shadow-sm md:group-data-[display-state=hidden]/sidebar-wrapper:border-transparent md:group-data-[display-state=hidden]/sidebar-wrapper:shadow-none',
			split:
				'bg-surface [--page-shell-chrome:var(--color-surface-raised)] [--page-shell-surface:var(--color-surface-raised)] [--page-shell-chrome-divider:transparent] transition-[border-color,box-shadow] md:border md:border-neutral-muted md:shadow-sm md:group-data-[display-state=hidden]/sidebar-wrapper:border-transparent md:group-data-[display-state=hidden]/sidebar-wrapper:shadow-none'
		},
		side: {
			left: '',
			right: ''
		}
	},
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
