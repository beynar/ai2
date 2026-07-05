import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { MenuItem } from '$lib/components/Menu/menu.props.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { SidebarThemeProps } from './sidebar.theme.js';

export type SidebarState = 'expanded' | 'collapsed';
export type SidebarDisplayState = 'expanded' | 'collapsed' | 'hidden';
export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type SidebarMenuButtonVariant = 'default' | 'outline';
export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg';
export type SidebarCollapseIcon = 'chevron' | 'plus-minus';
export type SidebarTooltipMode = 'auto' | 'always';
export type SidebarMenuSide = 'top' | 'right' | 'bottom' | 'left';
export type SidebarMenuAlign = 'start' | 'center' | 'end';
export type SidebarIcon = Slot | string;

export type SidebarApi = {
	/** Desktop open state. */
	readonly open: boolean;
	/** Expanded or collapsed desktop state. */
	readonly state: SidebarState;
	/** Semantic desktop display state, with offcanvas collapse reported as hidden. */
	readonly displayState: SidebarDisplayState;
	/** Whether the viewport is below the mobile breakpoint. */
	readonly isMobile: boolean;
	/** Mobile drawer open state. */
	readonly openMobile: boolean;
	/** Collapse behavior used by the sidebar. */
	readonly collapsible: SidebarCollapsible;
	/** Side the sidebar is anchored to. */
	readonly side: SidebarSide;
	/** Toggle the mobile drawer or desktop sidebar depending on viewport. */
	toggle: () => void;
	/** Set the desktop open state. */
	setOpen: (open: boolean) => void;
	/** Set the mobile drawer open state. */
	setOpenMobile: (open: boolean) => void;
};

export type SidebarMenuActionDescriptor = {
	/** Trigger icon. Defaults to the horizontal dots icon. */
	icon?: SidebarIcon;
	/** Accessible label for the trigger. */
	label?: string;
	/** Menu items rendered in a PopupMenu. */
	menu?: MenuItem[];
	/** Click handler for a plain action button. */
	onClick?: (event: MouseEvent) => void;
	/** Classes applied to the popup menu surface. */
	menuClass?: string;
	/** Preferred popup side. */
	menuSide?: SidebarMenuSide;
	/** Preferred popup alignment. */
	menuAlign?: SidebarMenuAlign;
};

export type SidebarMenuSubEntry = {
	/** Visible label. */
	label: string;
	/** Link href. */
	href?: string;
	/** Click handler. */
	onClick?: (event: MouseEvent) => void;
	/** Leading icon. */
	icon?: SidebarIcon;
	/** Whether this entry represents the current page. */
	isActive?: boolean;
	/** Disable interaction. */
	disabled?: boolean;
	/** Sub-button size. */
	size?: 'sm' | 'md';
};

type SidebarMenuEntryBase = {
	/** Visible label. */
	label: string;
	/** Leading icon. */
	icon?: SidebarIcon;
	/** Whether this entry represents the current page. */
	isActive?: boolean;
	/** Trailing badge hidden in icon-collapsed mode. */
	badge?: string | number;
	/** Tooltip text for icon-collapsed mode. Defaults to label. */
	tooltip?: string;
	/** Disable interaction. */
	disabled?: boolean;
	/** Button style. */
	variant?: SidebarMenuButtonVariant;
	/** Button size. */
	size?: SidebarMenuButtonSize;
	/** Classes applied to the row button. */
	class?: string;
	/** Nested entries rendered as an inline submenu. */
	items?: SidebarMenuSubEntry[];
	/** Classes applied to the popup menu surface. */
	menuClass?: string;
	/** Preferred popup side. */
	menuSide?: SidebarMenuSide;
	/** Preferred popup alignment. */
	menuAlign?: SidebarMenuAlign;
	/** Set false to render nested items as an always-open submenu. */
	collapsible?: boolean;
	/** Classes applied to this entry's submenu. */
	subClass?: string;
	/** Whether the submenu starts open. */
	defaultOpen?: boolean;
	/** Secondary action pinned to the row edge. */
	action?: Snippet<[SidebarApi]> | SidebarMenuActionDescriptor;
};

type SidebarMenuEntryNavigation = SidebarMenuEntryBase & {
	/** Link href. Mutually exclusive with menu. */
	href?: string;
	/** Click handler. Mutually exclusive with menu. */
	onClick?: (event: MouseEvent) => void;
	/** Popup menu rows own the whole trigger, so they cannot also navigate. */
	menu?: never;
};

type SidebarMenuEntryMenu = SidebarMenuEntryBase & {
	/** Popup menu items rendered from the whole row. Mutually exclusive with href/onClick. */
	menu: MenuItem[];
	href?: never;
	onClick?: never;
};

export type SidebarMenuEntry = SidebarMenuEntryNavigation | SidebarMenuEntryMenu;

export type SidebarSearch = {
	/** Input placeholder. */
	placeholder?: string;
	/** Accessible label. */
	label?: string;
	/** Controlled input value. */
	value?: string;
	/** Input handler. */
	onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	/** Extra classes for the input. */
	class?: string;
};

export type SidebarTreeNode = {
	/** Visible name. */
	label: string;
	/** Icon override. */
	icon?: SidebarIcon;
	/** Leaf href. */
	href?: string;
	/** Click handler. */
	onClick?: (event: MouseEvent) => void;
	/** Whether this node represents the current page. */
	isActive?: boolean;
	/** Whether this folder starts open. */
	defaultOpen?: boolean;
	/** Child nodes. */
	children?: SidebarTreeNode[];
};

export type SidebarGroup = {
	/** Group label. Hidden in icon-collapsed mode. */
	label?: string;
	/** Group action pinned to the top-right corner. */
	action?: Snippet<[SidebarApi]> | SidebarMenuActionDescriptor;
	/** Menu entries in this group. */
	items?: SidebarMenuEntry[];
	/** Recursive tree nodes rendered instead of items. */
	tree?: SidebarTreeNode[];
	/** Whether the group itself can collapse. */
	collapsible?: boolean;
	/** Whether a collapsible group starts open. */
	defaultOpen?: boolean;
	/** Render a separator before this group when it is not first. */
	separator?: boolean;
	/** Classes applied to the group wrapper. */
	class?: string;
};

type SidebarMenuButtonItemBase = {
	/** Leading logo icon. Mutually exclusive with avatar. */
	icon?: SidebarIcon;
	/** Leading avatar data. */
	avatar?: { src?: string; alt?: string; fallback?: string };
	/** Visual row style. */
	variant?: 'default' | 'brand' | 'compact';
	/** Primary line. */
	title: string;
	/** Secondary line. Ignored for compact variant. */
	subtitle?: string;
	/** Trailing icon. Defaults to a chevron when a menu is set. */
	trailing?: SidebarIcon | false;
	/** Preferred popup side. */
	menuSide?: SidebarMenuSide;
	/** Preferred popup alignment. */
	menuAlign?: SidebarMenuAlign;
	/** Classes applied to the popup menu surface. */
	menuClass?: string;
	/** Classes applied to PopupMenu option icons. */
	menuIconClass?: string;
	/** Render an identity row above menu items. */
	menuShowLabel?: boolean;
	/** Open trigger background style. */
	openStyle?: 'accent' | 'muted';
	/** Classes applied to the button, link, or trigger. */
	class?: string;
	/** Classes applied to the leading media. */
	mediaClass?: string;
};

type SidebarMenuButtonLinkItem = SidebarMenuButtonItemBase & {
	/** Link href. Mutually exclusive with menu/onClick. */
	href: string;
	menu?: never;
	onClick?: never;
};

type SidebarMenuButtonActionItem = SidebarMenuButtonItemBase & {
	/** Click handler. Mutually exclusive with menu/href. */
	onClick?: (event: MouseEvent) => void;
	href?: never;
	menu?: never;
};

type SidebarMenuButtonMenuItem = SidebarMenuButtonItemBase & {
	/** Popup menu items. Mutually exclusive with href/onClick. */
	menu: MenuItem[];
	href?: never;
	onClick?: never;
};

export type SidebarMenuButtonItem =
	SidebarMenuButtonLinkItem | SidebarMenuButtonActionItem | SidebarMenuButtonMenuItem;

type SidebarOwnProps = {
	/** Bindable reference to the root wrapper or bare surface. */
	ref?: HTMLElement | null;
	/** Bindable desktop open state. */
	open?: boolean;
	/** Fires whenever the desktop open state changes. */
	onOpenChange?: (open: boolean) => void;
	/** Side the sidebar is anchored to. */
	side?: SidebarSide;
	/** Visual style. */
	variant?: SidebarVariant;
	/** Collapse behavior. */
	collapsible?: SidebarCollapsible;
	/** Render only the sidebar surface without wrapper, rail, or inset. */
	bare?: boolean;
	/** Text direction forwarded to the mobile drawer. */
	dir?: 'ltr' | 'rtl';
	/** Expanded desktop width. */
	width?: string;
	/** Width when collapsed to icons. */
	widthIcon?: string;
	/** Mobile drawer width. */
	widthMobile?: string;
	/** Ctrl/Cmd shortcut key. Set false to disable. */
	keyboardShortcut?: string | false;
	/** Render the thin edge rail that toggles the sidebar. */
	rail?: boolean;
	/** Open hidden offcanvas sidebars when the pointer reaches the screen edge. */
	edgeReveal?: boolean;
	/** Items rendered in the scrollable body. Each item is a labelled sidebar group. */
	items?: SidebarGroup[];
	/** Classes applied to the outer wrapper. */
	class?: string;
	/** Classes applied to the sidebar panel. */
	sidebarClass?: string;
	/** Classes applied to the main inset. */
	insetClass?: string;
	/** Classes applied to the scrollable nav body. */
	contentClass?: string;
	/** Classes applied to the sticky header wrapper. */
	headerClass?: string;
	/** Classes applied to the sticky footer wrapper. */
	footerClass?: string;
	/** Classes applied to each menu list. */
	menuClass?: string;
	/** Indicator style for collapsible menu items. */
	collapseIcon?: SidebarCollapseIcon;
	/** Tooltip behavior for icon rows. */
	tooltips?: SidebarTooltipMode;
	/** Sticky top large menu row. */
	headerButton?: SidebarMenuButtonItem;
	/** Search box rendered in the header. */
	search?: SidebarSearch;
	/** Pinned menu rendered in the header. */
	headerMenu?: SidebarMenuEntry[];
	/** Sticky top custom content. */
	header?: Snippet<[SidebarApi]>;
	/** Custom scrollable nav body. Overrides items. */
	content?: Snippet<[SidebarApi]>;
	/** Sticky bottom large menu row. */
	footerButton?: SidebarMenuButtonItem;
	/** Pinned menu rendered in the footer. */
	footerMenu?: SidebarMenuEntry[];
	/** Sticky bottom custom content. */
	footer?: Snippet<[SidebarApi]>;
	/** Main app content rendered in the inset. */
	children?: Snippet<[SidebarApi]>;
	/** Full-width bar rendered above sidebar and inset. */
	banner?: Snippet<[SidebarApi]>;
	/** Per-instance theme overrides. */
	theme?: SidebarThemeProps;
};

type SidebarRootAttributes = Pick<
	HTMLAttributes<HTMLDivElement>,
	'id' | 'role' | 'style' | 'title' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
> & {
	[dataAttribute: `data-${string}`]: string | number | boolean | null | undefined;
};

export type SidebarProps = WithAttachments<SidebarRootAttributes & SidebarOwnProps>;
