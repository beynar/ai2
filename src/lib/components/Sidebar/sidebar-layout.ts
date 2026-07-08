import { cx } from '$lib/utils/cva/index.js';
import type { SidebarFrame, SidebarSide, SidebarVariant } from './sidebar.props.js';

export function getSidebarGapClass(variant: SidebarVariant) {
	return cx(
		'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[resizing=true]:!transition-none group-data-[collapsible=offcanvas]:w-0',
		variant === 'sidebar'
			? 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
			: 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
	);
}

export function getSidebarContainerClass(
	side: SidebarSide,
	variant: SidebarVariant,
	isEdgeRevealed: boolean,
	frame: SidebarFrame
) {
	const overlaysContent = isEdgeRevealed && variant !== 'inset' && variant !== 'split';

	return cx(
		'inset-y-0 z-10 hidden w-[var(--sidebar-width)] bg-transparent transition-[left,right,width] duration-200 ease-linear group-data-[resizing=true]:!transition-none md:flex',
		frame === 'viewport' ? 'fixed h-svh' : 'absolute h-full',
		side === 'left'
			? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
			: 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
		variant === 'sidebar'
			? 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
			: 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]',
		overlaysContent && 'z-40 shadow-xl',
		side === 'left' && isEdgeRevealed && '!left-0',
		side === 'right' && isEdgeRevealed && '!right-0'
	);
}
