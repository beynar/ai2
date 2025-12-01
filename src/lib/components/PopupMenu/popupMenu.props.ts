import type { PopoverProps } from '../Popover/popover.props.js';
import type { MenuProps } from '../Menu/menu.props.js';

export type PopupMenuProps = Omit<PopoverProps, 'children'> & {
	/**
	 * Menu props including items array and theme.
	 */
	menu: MenuProps;
	/**
	 * Whether to close the menu when a menu item is clicked.
	 * @default true
	 */
	closeOnItemClick?: boolean;
};

