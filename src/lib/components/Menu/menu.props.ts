import type { Snippet } from 'svelte';
import type { WithAttachments } from '$lib/types/props.js';
import type { ButtonProps } from '../Button/button.props.js';
import type { MenuOptionProps } from '../MenuOption/menuOption.props.js';
import type { SeparatorProps } from '../Separator/separator.props.js';
import type { MenuThemeProps } from './menu.theme.js';

export type SubMenuItemProps = Omit<MenuOptionProps, 'onClick' | 'onEnter' | 'onLeave'> & {
	/**
	 * Array of submenu items.
	 */
	menu: MenuItem[];
	/**
	 * Open submenu on hover.
	 * @default true
	 */
	openOnHover?: boolean;
	/**
	 * Open submenu on click.
	 * @default true
	 */
	openOnClick?: boolean;
	/**
	 * Hover delay in milliseconds.
	 * @default 100
	 */
	hoverDelay?: number;
	/**
	 * Close when mouse leaves.
	 * @default true
	 */
	closeOnMouseLeave?: boolean;
};

export type MenuItem =
	| ({ type: 'button' } & ButtonProps)
	| ({ type: 'option' } & MenuOptionProps)
	| ({ type: 'separator' } & SeparatorProps)
	| ({ type: 'submenu' } & MenuOptionProps & SubMenuItemProps);

export type MenuProps = WithAttachments<{
	/**
	 * Focus first item on mount.
	 * @default false
	 */
	focusOnMount?: boolean | 'container';
	/**
	 * The class name of the menu container. First element that the component outputs in the DOM.
	 */
	class?: string;
	/**
	 * Array of menu items to render (Button, MenuOption, or Separator).
	 */
	items: MenuItem[];
	/**
	 * Custom theme overrides for the menu container and child components.
	 */
	theme?: MenuThemeProps;
	/**
	 * Optional header content rendered at the top of the menu.
	 */
	header?: Snippet;
	/**
	 * Optional footer content rendered at the bottom of the menu.
	 */
	footer?: Snippet;
}>;
