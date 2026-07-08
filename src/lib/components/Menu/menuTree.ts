import type { MenuItem } from './menu.props.js';

export const getMenuMaxDepth = (items: MenuItem[]): number => {
	let maxDepth = 0;

	for (const menuItem of items) {
		if (menuItem.type !== 'submenu') continue;
		maxDepth = Math.max(maxDepth, 1 + getMenuMaxDepth(menuItem.menu));
	}

	return maxDepth;
};

export const hasSubmenuItems = (items: MenuItem[]): boolean =>
	items.some((menuItem) => menuItem.type === 'submenu');
