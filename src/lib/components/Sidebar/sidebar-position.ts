import type { Placement } from '@floating-ui/dom';
import type { SidebarMenuAlign, SidebarMenuSide } from './sidebar.props.js';

export function getSidebarMenuPosition(
	side: SidebarMenuSide | undefined,
	align: SidebarMenuAlign | undefined,
	isMobile: boolean
): Placement {
	const resolvedSide = side ?? (isMobile ? 'bottom' : 'right');
	const resolvedAlign = align ?? (isMobile ? 'end' : 'start');
	if (resolvedAlign === 'center') return resolvedSide;
	return `${resolvedSide}-${resolvedAlign}` as Placement;
}
