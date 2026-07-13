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
		label: 'Layout',
		links: [
			{ href: '/components/aspect-ratio', text: 'Aspect ratio' },
			{ href: '/components/card', text: 'Card' },
			{ href: '/components/heading', text: 'Heading' },
			{ href: '/components/resizable', text: 'Resizable' },
			{ href: '/components/scroll-area', text: 'Scroll area' },
			{ href: '/components/separator', text: 'Separator' }
		]
	},
	{
		label: 'Shells',
		links: [
			{ href: '/components/app-shell', text: 'App shell' },
			{ href: '/components/page-shell', text: 'Page shell' },
			{ href: '/components/sidebar', text: 'Sidebar' }
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
		label: 'Forms',
		links: [
			{ href: '/components/calendar', text: 'Calendar' },
			{ href: '/components/checkbox', text: 'Checkbox' },
			{ href: '/components/checkboxes', text: 'Checkboxes' },
			{ href: '/components/color-input', text: 'Color input' },
			{ href: '/components/color-picker', text: 'Color picker' },
			{ href: '/components/combobox', text: 'Combobox' },
			{ href: '/components/date-input', text: 'Date input' },
			{ href: '/components/file', text: 'File' },
			{ href: '/components/form', text: 'Form' },
			{ href: '/components/key-value-input', text: 'Key value input' },
			{ href: '/components/mini-calendar', text: 'Mini calendar' },
			{ href: '/components/multi-step-form', text: 'Multi-step form' },
			{ href: '/components/number-input', text: 'Number input' },
			{ href: '/components/password', text: 'Password' },
			{ href: '/components/phone', text: 'Phone' },
			{ href: '/components/pin-input', text: 'Pin input' },
			{ href: '/components/radios', text: 'Radios' },
			{ href: '/components/rating-input', text: 'Rating input' },
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
		label: 'Data display',
		links: [
			{ href: '/components/avatar', text: 'Avatar' },
			{ href: '/components/avatar-group', text: 'Avatar group' },
			{ href: '/components/badge', text: 'Badge' },
			{ href: '/components/chip', text: 'Chip' },
			{ href: '/components/kbd', text: 'Kbd' },
			{ href: '/components/metadata-list', text: 'Metadata list' },
			{ href: '/components/rating', text: 'Rating' },
			{ href: '/components/sortable-list', text: 'Sortable list' },
			{ href: '/components/stat', text: 'Stat' },
			{ href: '/components/table', text: 'Table' },
			{ href: '/components/tree', text: 'Tree' }
		]
	},
	{
		label: 'Feedback',
		links: [
			{ href: '/components/alert', text: 'Alert' },
			{ href: '/components/confirmation', text: 'Confirmation' },
			{ href: '/components/empty', text: 'Empty' },
			{ href: '/components/meter', text: 'Meter' },
			{ href: '/components/network-indicator', text: 'Network indicator' },
			{ href: '/components/progress-circle', text: 'Progress circle' },
			{ href: '/components/skeleton', text: 'Skeleton' },
			{ href: '/components/spinner', text: 'Spinner' },
			{ href: '/components/toast', text: 'Toast' }
		]
	},
	{
		label: 'Disclosure',
		links: [
			{ href: '/components/accordion', text: 'Accordion' },
			{ href: '/components/collapsible', text: 'Collapsible' }
		]
	},
	{
		label: 'Navigation',
		links: [
			{ href: '/components/breadcrumbs', text: 'Breadcrumbs' },
			{ href: '/components/command', text: 'Command' },
			{ href: '/components/pagination', text: 'Pagination' },
			{ href: '/components/stepper', text: 'Stepper' },
			{ href: '/components/tabbar', text: 'Tabbar' },
			{ href: '/components/tabs', text: 'Tabs' }
		]
	},
	{
		label: 'Menus',
		links: [
			{ href: '/components/context-menu', text: 'Context menu' },
			{ href: '/components/menu', text: 'Menu' },
			{ href: '/components/menu-option', text: 'Menu option' },
			{ href: '/components/popup-menu', text: 'Popup menu' }
		]
	},
	{
		label: 'Overlays',
		links: [
			{ href: '/components/dialog', text: 'Dialog' },
			{ href: '/components/hover-card', text: 'Hover card' },
			{ href: '/components/link-preview', text: 'Link preview' },
			{ href: '/components/popover', text: 'Popover' },
			{ href: '/components/tooltip', text: 'Tooltip' }
		]
	},
	{
		label: 'Media',
		links: [
			{ href: '/components/audio-player', text: 'Audio player' },
			{ href: '/components/carousel', text: 'Carousel' },
			{ href: '/components/image-gallery', text: 'Image gallery' },
			{ href: '/components/image-zoom', text: 'Image zoom' },
			{ href: '/components/media-volume', text: 'Media volume' },
			{ href: '/components/pdf-viewer', text: 'PDF viewer' },
			{ href: '/components/video-player', text: 'Video player' }
		]
	},
	{
		label: 'Content & graphics',
		links: [
			{ href: '/components/code', text: 'Code' },
			{ href: '/components/diff', text: 'Diff' },
			{ href: '/components/globe', text: 'Globe' },
			{ href: '/components/map', text: 'Map' },
			{ href: '/components/markdown', text: 'Markdown' },
			{ href: '/components/marquee', text: 'Marquee' },
			{ href: '/components/mermaid', text: 'Mermaid' },
			{ href: '/components/qr-code', text: 'QR code' }
		]
	},
	{
		label: 'Utilities',
		links: [
			{ href: '/utilities/raised', text: 'Raised' },
			{ href: '/utilities/scroll-fade', text: 'Scroll fade' },
			{ href: '/utilities/shimmer', text: 'Shimmer' }
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
