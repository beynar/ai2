import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultPanel = cva({
	base: 'flex h-full flex-col text-foreground',
	variants: {
		variant: {
			sidebar:
				'border-background-muted bg-background-muted data-[side=left]:border-r data-[side=right]:border-l',
			floating: 'rounded-xl border border-background-muted bg-background shadow-sm',
			inset: 'rounded-xl border border-background-muted bg-background shadow-sm',
			split: 'border-0 bg-transparent shadow-none'
		},
		placement: {
			panel: 'w-[var(--sidebar-width)]',
			static: 'w-[var(--sidebar-width)]',
			positioned: 'w-full'
		}
	},
	compoundVariants: [
		{ variant: ['floating', 'inset', 'split'], placement: 'static', class: 'm-2' }
	],
	defaultVariants: {
		variant: 'sidebar',
		placement: 'positioned'
	}
});

const defaultStackSection = cva({
	base: 'flex flex-col gap-2 p-2'
});

const defaultNav = cva({
	base: 'scrollbar scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden'
});

const defaultGroup = cva({
	base: 'relative flex w-full min-w-0 flex-col p-2'
});

const defaultGroupLabel = cva({
	base: 'text-foreground/65 flex h-8 shrink-0 items-center rounded-md px-3 text-xs font-medium outline-none transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0',
	variants: {
		interactive: {
			true: 'hover:bg-background-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40',
			false: null
		}
	},
	defaultVariants: {
		interactive: false
	}
});

const defaultGroupAction = cva({
	base: 'text-foreground hover:bg-background-muted hover:text-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition group-data-[collapsible=icon]:hidden focus-visible:ring-2 focus-visible:ring-primary/40 [&>svg]:size-4 [&>svg]:shrink-0'
});

const defaultMenu = cva({
	base: 'flex w-full min-w-0 flex-col gap-0.5'
});

const defaultMenuButton = cva({
	base: 'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-left text-sm outline-none transition-[background,color,width,height,padding] hover:bg-background-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-primary/10 data-active:text-primary data-active:font-medium group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
	variants: {
		variant: {
			default: '',
			outline:
				'border border-background-muted bg-background hover:border-primary/30 hover:bg-background-muted'
		},
		size: {
			default: 'h-9',
			sm: 'h-8 text-xs',
			lg: 'h-14'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

const defaultSubMenu = cva({
	base: 'border-background-muted mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden'
});

const defaultSubButton = cva({
	base: 'text-foreground/80 hover:bg-background-muted hover:text-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-primary/10 data-active:text-primary [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
	variants: {
		size: {
			sm: 'text-xs',
			md: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

const defaultMenuAction = cva({
	base: 'text-foreground hover:bg-background-muted hover:text-foreground peer-hover/menu-button:text-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 opacity-100 outline-none transition group-data-[collapsible=icon]:hidden focus-visible:ring-2 focus-visible:ring-primary/40 md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 has-[[aria-expanded=true]]:opacity-100 peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 [&>svg]:size-4 [&>svg]:shrink-0'
});

const defaultActionTrigger = cva({
	base: 'flex size-full items-center justify-center rounded-md bg-transparent outline-none [&>svg]:size-4 [&>svg]:shrink-0'
});

const defaultBadge = cva({
	base: 'text-foreground/70 peer-hover/menu-button:text-foreground peer-data-active/menu-button:text-primary pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1'
});

const defaultSearch = cva({
	base: 'border-background-muted bg-background-light text-foreground placeholder:text-foreground/45 h-8 w-full rounded-md border px-8 text-sm shadow-none outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
});

const defaultSearchIcon = cva({
	base: 'pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-foreground/45 select-none'
});

const defaultSeparator = cva({
	base: 'bg-background-muted mx-2 h-px w-auto shrink-0'
});

const defaultRail = cva({
	base: 'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:start-1/2 after:w-px after:bg-transparent hover:after:bg-background-muted sm:flex data-[side=left]:right-0 data-[side=right]:left-0 data-[side=left]:cursor-w-resize data-[side=right]:cursor-e-resize'
});

const defaultEdgeTrigger = cva({
	base: 'absolute inset-y-0 z-50 hidden w-3 bg-transparent outline-none transition-all md:block after:absolute after:inset-y-0 after:w-px after:bg-transparent hover:after:bg-primary/45 focus-visible:ring-2 focus-visible:ring-primary/40 data-[side=left]:left-0 data-[side=left]:cursor-e-resize data-[side=left]:after:left-0 data-[side=right]:right-0 data-[side=right]:cursor-w-resize data-[side=right]:after:right-0'
});

const defaultOverlay = cva({
	base: 'fixed inset-0 z-40 bg-foreground/35 md:hidden'
});

const defaultMobilePanel = cva({
	base: 'fixed inset-y-0 z-50 flex w-[var(--sidebar-width-mobile)] flex-col bg-background text-foreground shadow-xl md:hidden',
	variants: {
		side: {
			left: 'left-0',
			right: 'right-0'
		}
	},
	defaultVariants: {
		side: 'left'
	}
});

const defaultMedia = cva({
	base: 'bg-primary text-primary-contrast flex aspect-square shrink-0 items-center justify-center rounded-md',
	variants: {
		size: {
			default: 'size-8',
			compact: 'size-5 text-xs'
		}
	},
	defaultVariants: {
		size: 'default'
	}
});

const defaultAvatar = cva({
	base: 'bg-background-muted text-foreground flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md text-xs font-medium'
});

export const sidebarTheme = {
	panel: defaultPanel,
	header: defaultStackSection,
	nav: defaultNav,
	footer: defaultStackSection,
	group: defaultGroup,
	groupLabel: defaultGroupLabel,
	groupAction: defaultGroupAction,
	groupContent: cva({ base: 'w-full text-sm' }),
	menu: defaultMenu,
	menuItem: cva({ base: 'group/menu-item relative' }),
	menuButton: defaultMenuButton,
	subMenu: defaultSubMenu,
	subButton: defaultSubButton,
	menuAction: defaultMenuAction,
	actionTrigger: defaultActionTrigger,
	badge: defaultBadge,
	search: defaultSearch,
	searchIcon: defaultSearchIcon,
	separator: defaultSeparator,
	rail: defaultRail,
	edgeTrigger: defaultEdgeTrigger,
	overlay: defaultOverlay,
	mobilePanel: defaultMobilePanel,
	media: defaultMedia,
	avatar: defaultAvatar
};

export type SidebarTheme = typeof sidebarTheme;
export type SidebarThemeProps = InferComponentTheme<SidebarTheme>;
export const setSidebarTheme = setComponentTheme<SidebarTheme>('sidebar');
export const useSidebarTheme = useComponentTheme<SidebarTheme>('sidebar', sidebarTheme);
