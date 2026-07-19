import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultShell = cva({
	base: 'flex min-h-full w-full flex-col rounded-[inherit] bg-background !bg-[var(--page-shell-surface,var(--color-background))] text-foreground'
});

const defaultHeader = cva({
	base: "sticky top-[var(--page-shell-edge-inset,0px)] z-20 shrink-0 rounded-t-[inherit] bg-transparent backdrop-blur before:pointer-events-none before:absolute before:inset-y-0 before:inset-x-0 before:-z-10 before:rounded-t-[inherit] before:border-b before:border-background-muted before:bg-[var(--page-shell-chrome,var(--color-background))] before:shadow-[var(--page-shell-edge-shadow,none)] before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:top-[calc(-1*var(--page-shell-edge-inset,0px))] after:bottom-0 after:-z-20 after:bg-[var(--page-shell-underlay,var(--page-shell-chrome,var(--color-background)))] after:shadow-[var(--page-shell-gap-shadow,none)] after:content-['']",
	variants: {
		scrolled: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		scrolled: false
	}
});

const defaultHeaderInner = cva({
	base: 'flex min-h-12 items-center justify-between gap-3 px-3 py-2 md:px-4'
});

const defaultTitleStack = cva({
	base: 'grid min-w-0 gap-0.5'
});

const defaultMeta = cva({
	base: 'flex min-w-0 items-center gap-1.5 text-xs leading-4 text-foreground/55'
});

const defaultBack = cva({
	base: 'inline-flex size-5 shrink-0 items-center justify-center rounded-md'
});

const defaultBreadcrumbs = cva({
	base: 'min-w-0 gap-1.5 text-xs sm:gap-2'
});

const defaultEyebrow = cva({
	base: 'truncate text-[0.6875rem] leading-4 font-medium tracking-normal text-foreground/55 uppercase'
});

const defaultTitle = cva({
	base: 'truncate text-sm leading-5 font-semibold text-foreground'
});

const defaultSubtitle = cva({
	base: 'truncate text-xs leading-4 text-foreground/60'
});

const defaultActions = cva({
	base: 'flex shrink-0 items-center justify-end gap-1.5'
});

const defaultContent = cva({
	base: 'flex-1 shadow-[var(--page-shell-edge-shadow,none)]'
});

const defaultContentInner = cva({
	base: 'w-full',
	variants: {
		padding: {
			none: '',
			small: 'p-3',
			normal: 'p-4 md:p-6',
			large: 'p-6 md:p-8'
		},
		width: {
			full: '',
			narrow: 'mx-auto max-w-3xl',
			normal: 'mx-auto max-w-5xl',
			wide: 'mx-auto max-w-7xl',
			prose: 'mx-auto max-w-3xl'
		}
	},
	defaultVariants: {
		padding: 'none',
		width: 'full'
	}
});

const defaultFooter = cva({
	base: "sticky bottom-[var(--page-shell-edge-inset,0px)] z-20 shrink-0 rounded-b-[inherit] bg-transparent backdrop-blur before:pointer-events-none before:absolute before:inset-y-0 before:inset-x-0 before:-z-10 before:rounded-b-[inherit] before:border-t before:border-background-muted before:bg-[var(--page-shell-chrome,var(--color-background))] before:shadow-[var(--page-shell-edge-shadow,none)] before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:bottom-[calc(-1*var(--page-shell-edge-inset,0px))] after:-z-20 after:bg-[var(--page-shell-underlay,var(--page-shell-chrome,var(--color-background)))] after:shadow-[var(--page-shell-gap-shadow,none)] after:content-['']",
	variants: {
		scrolled: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		scrolled: false
	}
});

const defaultFooterInner = cva({
	base: 'flex min-h-12 items-center justify-between gap-3 px-4 py-2 text-sm text-foreground/70'
});

const defaultFooterContent = cva({
	base: 'min-w-0 flex-1'
});

const defaultInlineActions = cva({
	base: 'hidden shrink-0 items-center justify-end gap-2 md:flex'
});

const defaultMobileActions = cva({
	base: 'flex shrink-0 items-center justify-end gap-2 md:hidden'
});

const defaultOverflowTrigger = cva({
	base: 'md:hidden'
});

export const pageShellTheme = {
	root: defaultShell,
	header: defaultHeader,
	headerInner: defaultHeaderInner,
	meta: defaultMeta,
	back: defaultBack,
	breadcrumbs: defaultBreadcrumbs,
	eyebrow: defaultEyebrow,
	titleStack: defaultTitleStack,
	title: defaultTitle,
	subtitle: defaultSubtitle,
	actions: defaultActions,
	content: defaultContent,
	contentInner: defaultContentInner,
	footer: defaultFooter,
	footerInner: defaultFooterInner,
	footerContent: defaultFooterContent,
	inlineActions: defaultInlineActions,
	mobileActions: defaultMobileActions,
	overflowTrigger: defaultOverflowTrigger
};

export type PageShellTheme = typeof pageShellTheme;
export type PageShellThemeProps = InferComponentTheme<PageShellTheme>;
export const setPageShellTheme = setComponentTheme<PageShellTheme>('page-shell');
export const usePageShellTheme = useComponentTheme<PageShellTheme>('page-shell', pageShellTheme);
