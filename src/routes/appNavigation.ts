import type { SidebarGroup } from '$lib/components/Sidebar/index.js';

export type AppNavigationLink = {
	href: string;
	text: string;
};

export const headerLinks: AppNavigationLink[] = [
	{ href: '/docs', text: 'Docs' },
	{ href: '/components/accordion', text: 'Components' },
	{ href: '/', text: 'Sections' },
	{ href: '/', text: 'Examples' },
	{ href: '/playground', text: 'Playground' },
	{ href: '/colors', text: 'Colors' }
];

const sidebarSections: Array<{ label: string; links: AppNavigationLink[] }> = [
	{
		label: 'Getting Started',
		links: [
			{ href: '/docs', text: 'Theme & setup' },
			{ href: '/docs/conventions', text: 'Conventions' },
			{ href: '/docs/i18n', text: 'Internationalization' }
		]
	},
	{
		label: 'Actions',
		links: [
			{ href: '/components/button', text: 'Button' },
			{ href: '/components/button-group', text: 'Button group' },
			{ href: '/components/toggle-button', text: 'Toggle button' },
			{ href: '/components/toggle-button-group', text: 'Toggle group' }
		]
	},
	{
		label: 'Disclosure',
		links: [
			{ href: '/components/accordion', text: 'Accordion' },
			{ href: '/components/alert', text: 'Alert' },
			{ href: '/components/collapsible', text: 'Collapsible' }
		]
	},
	{
		label: 'Display',
		links: [
			{ href: '/components/aspect-ratio', text: 'Aspect ratio' },
			{ href: '/components/audio-player', text: 'Audio player' },
			{ href: '/components/avatar', text: 'Avatar' },
			{ href: '/components/badge', text: 'Badge' },
			{ href: '/components/breadcrumbs', text: 'Breadcrumbs' },
			{ href: '/components/card', text: 'Card' },
			{ href: '/components/carousel', text: 'Carousel' },
			{ href: '/components/chip', text: 'Chip' },
			{ href: '/components/code', text: 'Code' },
			{ href: '/components/diff', text: 'Diff' },
			{ href: '/components/dialog', text: 'Dialog' },
			{ href: '/components/empty', text: 'Empty' },
			{ href: '/components/globe', text: 'Globe' },
			{ href: '/components/kbd', text: 'Kbd' },
			{ href: '/components/marquee', text: 'Marquee' },
			{ href: '/components/mermaid', text: 'Mermaid' },
			{ href: '/components/map', text: 'Map' },
			{ href: '/components/markdown', text: 'Markdown' },
			{ href: '/components/meter', text: 'Meter' },
			{ href: '/components/network-indicator', text: 'Network indicator' },
			{ href: '/components/pagination', text: 'Pagination' },
			{ href: '/components/pdf-viewer', text: 'PDF viewer' },
			{ href: '/components/progress-circle', text: 'Progress circle' },
			{ href: '/components/qr-code', text: 'QR code' },
			{ href: '/components/separator', text: 'Separator' },
			{ href: '/components/skeleton', text: 'Skeleton' },
			{ href: '/components/spinner', text: 'Spinner' },
			{ href: '/components/stepper', text: 'Stepper' },
			{ href: '/components/tabbar', text: 'Tabbar' },
			{ href: '/components/table', text: 'Table' },
			{ href: '/components/tabs', text: 'Tabs' },
			{ href: '/components/tree', text: 'Tree' },
			{ href: '/components/video-player', text: 'Video player' }
		]
	},
	{
		label: 'Form',
		links: [
			{ href: '/components/calendar', text: 'Calendar' },
			{ href: '/components/checkbox', text: 'Checkbox' },
			{ href: '/components/checkboxes', text: 'Checkboxes' },
			{ href: '/components/combobox', text: 'Combobox' },
			{ href: '/components/date-input', text: 'Date input' },
			{ href: '/components/file', text: 'File' },
			{ href: '/components/form', text: 'Form' },
			{ href: '/components/multi-step-form', text: 'Multi-step form' },
			{ href: '/components/number-input', text: 'Number input' },
			{ href: '/components/password', text: 'Password' },
			{ href: '/components/phone', text: 'Phone' },
			{ href: '/components/pin-input', text: 'Pin input' },
			{ href: '/components/radios', text: 'Radios' },
			{ href: '/components/rich-text-input', text: 'Rich text input' },
			{ href: '/components/select', text: 'Select' },
			{ href: '/components/slider', text: 'Slider' },
			{ href: '/components/switch', text: 'Switch' },
			{ href: '/components/tag-group', text: 'Tag group' },
			{ href: '/components/tags-input', text: 'Tags Input' },
			{ href: '/components/textinput', text: 'Text input' },
			{ href: '/components/textarea', text: 'Textarea' },
			{ href: '/components/time-input', text: 'Time input' }
		]
	},
	{
		label: 'Shells',
		links: [
			{ href: '/components/app-shell', text: 'App shell' },
			{ href: '/components/sidebar', text: 'Sidebar' },
			{ href: '/components/page-shell', text: 'Page shell' }
		]
	},
	{
		label: 'Menus & Navigation',
		links: [
			{ href: '/components/command', text: 'Command' },
			{ href: '/components/menu', text: 'Menu' },
			{ href: '/components/context-menu', text: 'Context menu' },
			{ href: '/components/hover-card', text: 'Hover card' },
			{ href: '/components/link-preview', text: 'Link preview' },
			{ href: '/components/menu-option', text: 'Menu option' },
			{ href: '/components/popover', text: 'Popover' },
			{ href: '/components/popup-menu', text: 'Popup menu' },
			{ href: '/components/resizable', text: 'Resizable' },
			{ href: '/components/toast', text: 'Toast' },
			{ href: '/components/tooltip', text: 'Tooltip' }
		]
	},
	{
		label: 'Utilities',
		links: [
			{ href: '/utilities/raised', text: 'Raised' },
			{ href: '/utilities/shimmer', text: 'Shimmer' },
			{ href: '/utilities/scroll-fade', text: 'Scroll fade' }
		]
	}
];

export function getSidebarGroups(routeId: string | null | undefined): SidebarGroup[] {
	return sidebarSections.map((section) => ({
		label: section.label,
		items: section.links.map((link) => ({
			label: link.text,
			href: link.href,
			isActive: routeId === link.href
		}))
	}));
}
