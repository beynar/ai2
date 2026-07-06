import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultShell = cva({
	base: 'flex h-full min-h-0 w-full flex-col rounded-[inherit] bg-background text-foreground'
});

const defaultHeader = cva({
	base: 'border-background-muted sticky top-0 z-10 shrink-0 rounded-t-[inherit] border-b bg-background/95 backdrop-blur transition-shadow supports-[backdrop-filter]:bg-background/80',
	variants: {
		scrolled: {
			true: 'shadow-sm',
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
	base: 'min-h-0 flex-1 overflow-auto'
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
	base: 'border-background-muted sticky bottom-0 z-10 shrink-0 rounded-b-[inherit] border-t bg-background/95 backdrop-blur transition-shadow supports-[backdrop-filter]:bg-background/80',
	variants: {
		scrolled: {
			true: 'shadow-[0_-1px_4px_rgba(0,0,0,0.04)]',
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
