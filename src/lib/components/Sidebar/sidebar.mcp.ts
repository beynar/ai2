export const sidebarDescription = `
# Sidebar Component

	Sidebar navigation with data-driven groups, icon collapse, mobile drawer behavior,
	recursive tree groups, header/footer rows, search, actions, and snippet escape hatches.

## Import

\`\`\`svelte
<script lang="ts">
	import { Sidebar, type SidebarGroup } from 'svelai/sidebar';
</script>
\`\`\`

## Basic Usage

\`\`\`svelte
<script lang="ts">
	import { Sidebar, type SidebarGroup } from 'svelai/sidebar';
	import { houseIcon } from 'svelai/icons/house';
	import { gearIcon } from 'svelai/icons/gear';

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Dashboard', href: '/', icon: houseIcon, isActive: true },
				{ label: 'Settings', href: '/settings', icon: gearIcon }
			]
		}
	];
</script>

<Sidebar items={items}>
	{#snippet children({ toggle })}
		<header>
			<button type="button" onclick={toggle}>Toggle</button>
		</header>
		<main>Page content</main>
	{/snippet}
</Sidebar>
\`\`\`

## AI-Safe Usage Contract

1. Use \`items\` for normal navigation. Use \`content\` only when data-driven rows cannot express the layout.
2. Use local Svelai icon snippets such as \`houseIcon\`, not Lucide component constructors.
3. Use \`MenuItem[]\` from \`svelai/menu\` for \`menu\` and action dropdowns.
4. Do not combine \`menu\` with \`href\` or \`onClick\` on the same row; use \`action\` for a trailing row menu.
5. Keep \`children\`, \`header\`, \`content\`, \`footer\`, \`banner\`, and action snippets pure; they receive \`SidebarApi\`.
6. Use \`collapsible="icon"\` for icon rail behavior, \`collapsible="offcanvas"\` for hidden desktop panels, and \`collapsible="none"\` for fixed sidebars.
7. Offcanvas sidebars reveal over the content from the screen edge by default when hidden; set \`edgeReveal={false}\` to disable that.
	8. Set \`keyboardShortcut={false}\` when embedding Sidebar inside another shortcut-heavy surface.
	9. Sidebar owns navigation and resize mechanics. Use AppShell for visible app/page surfaces.

## Data Model

### SidebarGroup
- **label**: string - Group label, hidden in icon-collapsed mode.
- **items**: SidebarMenuEntry[] - Menu rows.
- **tree**: SidebarTreeNode[] - Recursive tree rows instead of menu items.
- **action**: SidebarMenuActionDescriptor | Snippet<[SidebarApi]> - Top-right group action.
- **collapsible**: boolean - Makes the group label a toggle.
- **defaultOpen**: boolean - Initial collapsible group state.
- **separator**: boolean - Divider before the group.

### SidebarMenuEntry
- **label**: string - Visible row label.
- **icon**: SidebarIcon - Svelai icon snippet or string.
- **href**: string - Render as an anchor. Mutually exclusive with menu.
- **onClick**: (event: MouseEvent) => void - Render as a button or handle anchor clicks. Mutually exclusive with menu.
- **isActive**: boolean - Adds active styling and \`aria-current="page"\`.
- **disabled**: boolean - Disables button rows and marks anchor rows disabled.
- **badge**: string | number - Trailing count/status, hidden in icon mode.
- **tooltip**: string - Svelai Tooltip content in icon mode. Defaults to label.
- **items**: SidebarMenuSubEntry[] - Inline nested menu.
- **collapsible**: boolean - Set false for an always-open submenu.
- **defaultOpen**: boolean - Initial nested menu state.
- **menu**: MenuItem[] - Popup menu opened from the full row. Mutually exclusive with href/onClick.
- **action**: SidebarMenuActionDescriptor | Snippet<[SidebarApi]> - Hover/focus trailing action.

### SidebarMenuButtonItem
Use for \`headerButton\`, \`footerButton\`, or direct \`<SidebarMenuButton />\` rows.
- **icon**: SidebarIcon - Leading logo/icon.
- **avatar**: { src?: string; alt?: string; fallback?: string } - Leading avatar.
- **variant**: 'default' | 'brand' | 'compact'.
- **title**: string - Primary text.
- **subtitle**: string - Secondary text.
- **href** / **onClick** / **menu** - Choose link, button, or popup behavior.
- **menuIconClass**: string - Class override for option icons inside the popup menu.

## Props

### State
- **open**: boolean (bindable, default true) - Desktop expanded state.
- **onOpenChange**: (open: boolean) => void - Desktop state change callback.
- **api.displayState**: 'expanded' | 'collapsed' | 'hidden' - Semantic desktop state; hidden means closed offcanvas.
- **keyboardShortcut**: string | false (default 'b') - Ctrl/Cmd shortcut key.

### Layout
- **side**: 'left' | 'right' - Desktop and mobile side.
	- **variant**: 'sidebar' | 'floating' | 'inset' | 'split' - Sidebar geometry.
	- **collapsible**: 'offcanvas' | 'icon' | 'none' - Collapse behavior.
	- **mode**: 'layout' | 'panel' - Full resizing layout or only the visible navigation panel.
	- **frame**: 'viewport' | 'contained' - Viewport/fixed layout or contained/absolute layout for embedded previews.
	- **width**: string - Expanded width.
- **widthIcon**: string - Icon-collapsed width.
- **widthMobile**: string - Mobile drawer width.
- **rail**: boolean - Edge toggle rail.
- **edgeReveal**: boolean (default true) - Pointer/focus edge preview for hidden offcanvas sidebars. Hover reveal overlays content; toggle/click opens persistently.

### Content
- **items**: SidebarGroup[] - Data-driven body navigation.
- **headerButton** / **footerButton**: SidebarMenuButtonItem - Sticky large rows.
- **search**: SidebarSearch - Header search input.
- **headerMenu** / **footerMenu**: SidebarMenuEntry[] - Sticky quick menus.
- **header**, **content**, **footer**, **children**, **banner**: Snippet<[SidebarApi]> - Escape hatches.

	### Styling
	- **class**: string - Classes applied to the Sidebar root.
	- **theme**: SidebarThemeProps - Semantic part overrides such as \`panel\`, \`header\`, \`nav\`, \`footer\`, menu, search, rail, and mobile drawer parts.

## Accessibility

- Active links set \`aria-current="page"\`.
- Collapsible rows and groups set \`aria-expanded\`.
- Disabled buttons use \`disabled\`; disabled links use \`aria-disabled\` and \`tabindex=-1\`.
- Mobile drawer includes a backdrop button labelled "Close Sidebar".
- Icon-collapsed rows keep labels in \`sr-only\` text.

## Notes

- Dropdown menus use Svelai \`PopupMenu\` and \`MenuItem[]\`.
- The component uses semantic Svelai tokens. Do not add shadcn \`sidebar-*\` color tokens.
- Snippet icons from \`svelai/icons/*\` are the preferred icon format.
`;
