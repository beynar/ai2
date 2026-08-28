export const sidebarDescription = `
# Sidebar Component

	Sidebar navigation with data-driven groups, icon collapse, mobile drawer behavior,
	recursive tree groups, header/footer rows, search, actions, and snippet escape hatches.

## Import

\`\`\`svelte
<script lang="ts">
	import { Sidebar, type SidebarGroup } from 'svelai/sidebar';
<\/script>
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
<\/script>

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

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLHFCQUFxQiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJzaWRlYmFyLm1jcC50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2lkZWJhckRlc2NyaXB0aW9uID0gYFxuIyBTaWRlYmFyIENvbXBvbmVudFxuXG5cdFNpZGViYXIgbmF2aWdhdGlvbiB3aXRoIGRhdGEtZHJpdmVuIGdyb3VwcywgaWNvbiBjb2xsYXBzZSwgbW9iaWxlIGRyYXdlciBiZWhhdmlvcixcblx0cmVjdXJzaXZlIHRyZWUgZ3JvdXBzLCBoZWFkZXIvZm9vdGVyIHJvd3MsIHNlYXJjaCwgYWN0aW9ucywgYW5kIHNuaXBwZXQgZXNjYXBlIGhhdGNoZXMuXG5cbiMjIEltcG9ydFxuXG5cXGBcXGBcXGBzdmVsdGVcbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IFNpZGViYXIsIHR5cGUgU2lkZWJhckdyb3VwIH0gZnJvbSAnc3ZlbGFpL3NpZGViYXInO1xuPC9zY3JpcHQ+XG5cXGBcXGBcXGBcblxuIyMgQmFzaWMgVXNhZ2VcblxuXFxgXFxgXFxgc3ZlbHRlXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTaWRlYmFyLCB0eXBlIFNpZGViYXJHcm91cCB9IGZyb20gJ3N2ZWxhaS9zaWRlYmFyJztcblx0aW1wb3J0IHsgaG91c2VJY29uIH0gZnJvbSAnc3ZlbGFpL2ljb25zL2hvdXNlJztcblx0aW1wb3J0IHsgZ2Vhckljb24gfSBmcm9tICdzdmVsYWkvaWNvbnMvZ2Vhcic7XG5cblx0Y29uc3QgaXRlbXM6IFNpZGViYXJHcm91cFtdID0gW1xuXHRcdHtcblx0XHRcdGxhYmVsOiAnV29ya3NwYWNlJyxcblx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdHsgbGFiZWw6ICdEYXNoYm9hcmQnLCBocmVmOiAnLycsIGljb246IGhvdXNlSWNvbiwgaXNBY3RpdmU6IHRydWUgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1NldHRpbmdzJywgaHJlZjogJy9zZXR0aW5ncycsIGljb246IGdlYXJJY29uIH1cblx0XHRcdF1cblx0XHR9XG5cdF07XG48L3NjcmlwdD5cblxuPFNpZGViYXIgaXRlbXM9e2l0ZW1zfT5cblx0eyNzbmlwcGV0IGNoaWxkcmVuKHsgdG9nZ2xlIH0pfVxuXHRcdDxoZWFkZXI+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPXt0b2dnbGV9PlRvZ2dsZTwvYnV0dG9uPlxuXHRcdDwvaGVhZGVyPlxuXHRcdDxtYWluPlBhZ2UgY29udGVudDwvbWFpbj5cblx0ey9zbmlwcGV0fVxuPC9TaWRlYmFyPlxuXFxgXFxgXFxgXG5cbiMjIEFJLVNhZmUgVXNhZ2UgQ29udHJhY3RcblxuMS4gVXNlIFxcYGl0ZW1zXFxgIGZvciBub3JtYWwgbmF2aWdhdGlvbi4gVXNlIFxcYGNvbnRlbnRcXGAgb25seSB3aGVuIGRhdGEtZHJpdmVuIHJvd3MgY2Fubm90IGV4cHJlc3MgdGhlIGxheW91dC5cbjIuIFVzZSBsb2NhbCBTdmVsYWkgaWNvbiBzbmlwcGV0cyBzdWNoIGFzIFxcYGhvdXNlSWNvblxcYCwgbm90IEx1Y2lkZSBjb21wb25lbnQgY29uc3RydWN0b3JzLlxuMy4gVXNlIFxcYE1lbnVJdGVtW11cXGAgZnJvbSBcXGBzdmVsYWkvbWVudVxcYCBmb3IgXFxgbWVudVxcYCBhbmQgYWN0aW9uIGRyb3Bkb3ducy5cbjQuIERvIG5vdCBjb21iaW5lIFxcYG1lbnVcXGAgd2l0aCBcXGBocmVmXFxgIG9yIFxcYG9uQ2xpY2tcXGAgb24gdGhlIHNhbWUgcm93OyB1c2UgXFxgYWN0aW9uXFxgIGZvciBhIHRyYWlsaW5nIHJvdyBtZW51LlxuNS4gS2VlcCBcXGBjaGlsZHJlblxcYCwgXFxgaGVhZGVyXFxgLCBcXGBjb250ZW50XFxgLCBcXGBmb290ZXJcXGAsIFxcYGJhbm5lclxcYCwgYW5kIGFjdGlvbiBzbmlwcGV0cyBwdXJlOyB0aGV5IHJlY2VpdmUgXFxgU2lkZWJhckFwaVxcYC5cbjYuIFVzZSBcXGBjb2xsYXBzaWJsZT1cImljb25cIlxcYCBmb3IgaWNvbiByYWlsIGJlaGF2aW9yLCBcXGBjb2xsYXBzaWJsZT1cIm9mZmNhbnZhc1wiXFxgIGZvciBoaWRkZW4gZGVza3RvcCBwYW5lbHMsIGFuZCBcXGBjb2xsYXBzaWJsZT1cIm5vbmVcIlxcYCBmb3IgZml4ZWQgc2lkZWJhcnMuXG43LiBPZmZjYW52YXMgc2lkZWJhcnMgcmV2ZWFsIG92ZXIgdGhlIGNvbnRlbnQgZnJvbSB0aGUgc2NyZWVuIGVkZ2UgYnkgZGVmYXVsdCB3aGVuIGhpZGRlbjsgc2V0IFxcYGVkZ2VSZXZlYWw9e2ZhbHNlfVxcYCB0byBkaXNhYmxlIHRoYXQuXG5cdDguIFNldCBcXGBrZXlib2FyZFNob3J0Y3V0PXtmYWxzZX1cXGAgd2hlbiBlbWJlZGRpbmcgU2lkZWJhciBpbnNpZGUgYW5vdGhlciBzaG9ydGN1dC1oZWF2eSBzdXJmYWNlLlxuXHQ5LiBTaWRlYmFyIG93bnMgbmF2aWdhdGlvbiBhbmQgcmVzaXplIG1lY2hhbmljcy4gVXNlIEFwcFNoZWxsIGZvciB2aXNpYmxlIGFwcC9wYWdlIHN1cmZhY2VzLlxuXG4jIyBEYXRhIE1vZGVsXG5cbiMjIyBTaWRlYmFyR3JvdXBcbi0gKipsYWJlbCoqOiBzdHJpbmcgLSBHcm91cCBsYWJlbCwgaGlkZGVuIGluIGljb24tY29sbGFwc2VkIG1vZGUuXG4tICoqaXRlbXMqKjogU2lkZWJhck1lbnVFbnRyeVtdIC0gTWVudSByb3dzLlxuLSAqKnRyZWUqKjogU2lkZWJhclRyZWVOb2RlW10gLSBSZWN1cnNpdmUgdHJlZSByb3dzIGluc3RlYWQgb2YgbWVudSBpdGVtcy5cbi0gKiphY3Rpb24qKjogU2lkZWJhck1lbnVBY3Rpb25EZXNjcmlwdG9yIHwgU25pcHBldDxbU2lkZWJhckFwaV0+IC0gVG9wLXJpZ2h0IGdyb3VwIGFjdGlvbi5cbi0gKipjb2xsYXBzaWJsZSoqOiBib29sZWFuIC0gTWFrZXMgdGhlIGdyb3VwIGxhYmVsIGEgdG9nZ2xlLlxuLSAqKmRlZmF1bHRPcGVuKio6IGJvb2xlYW4gLSBJbml0aWFsIGNvbGxhcHNpYmxlIGdyb3VwIHN0YXRlLlxuLSAqKnNlcGFyYXRvcioqOiBib29sZWFuIC0gRGl2aWRlciBiZWZvcmUgdGhlIGdyb3VwLlxuXG4jIyMgU2lkZWJhck1lbnVFbnRyeVxuLSAqKmxhYmVsKio6IHN0cmluZyAtIFZpc2libGUgcm93IGxhYmVsLlxuLSAqKmljb24qKjogU2lkZWJhckljb24gLSBTdmVsYWkgaWNvbiBzbmlwcGV0IG9yIHN0cmluZy5cbi0gKipocmVmKio6IHN0cmluZyAtIFJlbmRlciBhcyBhbiBhbmNob3IuIE11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIG1lbnUuXG4tICoqb25DbGljayoqOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQgLSBSZW5kZXIgYXMgYSBidXR0b24gb3IgaGFuZGxlIGFuY2hvciBjbGlja3MuIE11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIG1lbnUuXG4tICoqaXNBY3RpdmUqKjogYm9vbGVhbiAtIEFkZHMgYWN0aXZlIHN0eWxpbmcgYW5kIFxcYGFyaWEtY3VycmVudD1cInBhZ2VcIlxcYC5cbi0gKipkaXNhYmxlZCoqOiBib29sZWFuIC0gRGlzYWJsZXMgYnV0dG9uIHJvd3MgYW5kIG1hcmtzIGFuY2hvciByb3dzIGRpc2FibGVkLlxuLSAqKmJhZGdlKio6IHN0cmluZyB8IG51bWJlciAtIFRyYWlsaW5nIGNvdW50L3N0YXR1cywgaGlkZGVuIGluIGljb24gbW9kZS5cbi0gKip0b29sdGlwKio6IHN0cmluZyAtIFN2ZWxhaSBUb29sdGlwIGNvbnRlbnQgaW4gaWNvbiBtb2RlLiBEZWZhdWx0cyB0byBsYWJlbC5cbi0gKippdGVtcyoqOiBTaWRlYmFyTWVudVN1YkVudHJ5W10gLSBJbmxpbmUgbmVzdGVkIG1lbnUuXG4tICoqY29sbGFwc2libGUqKjogYm9vbGVhbiAtIFNldCBmYWxzZSBmb3IgYW4gYWx3YXlzLW9wZW4gc3VibWVudS5cbi0gKipkZWZhdWx0T3BlbioqOiBib29sZWFuIC0gSW5pdGlhbCBuZXN0ZWQgbWVudSBzdGF0ZS5cbi0gKiptZW51Kio6IE1lbnVJdGVtW10gLSBQb3B1cCBtZW51IG9wZW5lZCBmcm9tIHRoZSBmdWxsIHJvdy4gTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggaHJlZi9vbkNsaWNrLlxuLSAqKmFjdGlvbioqOiBTaWRlYmFyTWVudUFjdGlvbkRlc2NyaXB0b3IgfCBTbmlwcGV0PFtTaWRlYmFyQXBpXT4gLSBIb3Zlci9mb2N1cyB0cmFpbGluZyBhY3Rpb24uXG5cbiMjIyBTaWRlYmFyTWVudUJ1dHRvbkl0ZW1cblVzZSBmb3IgXFxgaGVhZGVyQnV0dG9uXFxgLCBcXGBmb290ZXJCdXR0b25cXGAsIG9yIGRpcmVjdCBcXGA8U2lkZWJhck1lbnVCdXR0b24gLz5cXGAgcm93cy5cbi0gKippY29uKio6IFNpZGViYXJJY29uIC0gTGVhZGluZyBsb2dvL2ljb24uXG4tICoqYXZhdGFyKio6IHsgc3JjPzogc3RyaW5nOyBhbHQ/OiBzdHJpbmc7IGZhbGxiYWNrPzogc3RyaW5nIH0gLSBMZWFkaW5nIGF2YXRhci5cbi0gKip2YXJpYW50Kio6ICdkZWZhdWx0JyB8ICdicmFuZCcgfCAnY29tcGFjdCcuXG4tICoqdGl0bGUqKjogc3RyaW5nIC0gUHJpbWFyeSB0ZXh0LlxuLSAqKnN1YnRpdGxlKio6IHN0cmluZyAtIFNlY29uZGFyeSB0ZXh0LlxuLSAqKmhyZWYqKiAvICoqb25DbGljayoqIC8gKiptZW51KiogLSBDaG9vc2UgbGluaywgYnV0dG9uLCBvciBwb3B1cCBiZWhhdmlvci5cbi0gKiptZW51SWNvbkNsYXNzKio6IHN0cmluZyAtIENsYXNzIG92ZXJyaWRlIGZvciBvcHRpb24gaWNvbnMgaW5zaWRlIHRoZSBwb3B1cCBtZW51LlxuXG4jIyBQcm9wc1xuXG4jIyMgU3RhdGVcbi0gKipvcGVuKio6IGJvb2xlYW4gKGJpbmRhYmxlLCBkZWZhdWx0IHRydWUpIC0gRGVza3RvcCBleHBhbmRlZCBzdGF0ZS5cbi0gKipvbk9wZW5DaGFuZ2UqKjogKG9wZW46IGJvb2xlYW4pID0+IHZvaWQgLSBEZXNrdG9wIHN0YXRlIGNoYW5nZSBjYWxsYmFjay5cbi0gKiphcGkuZGlzcGxheVN0YXRlKio6ICdleHBhbmRlZCcgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nIC0gU2VtYW50aWMgZGVza3RvcCBzdGF0ZTsgaGlkZGVuIG1lYW5zIGNsb3NlZCBvZmZjYW52YXMuXG4tICoqa2V5Ym9hcmRTaG9ydGN1dCoqOiBzdHJpbmcgfCBmYWxzZSAoZGVmYXVsdCAnYicpIC0gQ3RybC9DbWQgc2hvcnRjdXQga2V5LlxuXG4jIyMgTGF5b3V0XG4tICoqc2lkZSoqOiAnbGVmdCcgfCAncmlnaHQnIC0gRGVza3RvcCBhbmQgbW9iaWxlIHNpZGUuXG5cdC0gKip2YXJpYW50Kio6ICdzaWRlYmFyJyB8ICdmbG9hdGluZycgfCAnaW5zZXQnIHwgJ3NwbGl0JyAtIFNpZGViYXIgZ2VvbWV0cnkuXG5cdC0gKipjb2xsYXBzaWJsZSoqOiAnb2ZmY2FudmFzJyB8ICdpY29uJyB8ICdub25lJyAtIENvbGxhcHNlIGJlaGF2aW9yLlxuXHQtICoqbW9kZSoqOiAnbGF5b3V0JyB8ICdwYW5lbCcgLSBGdWxsIHJlc2l6aW5nIGxheW91dCBvciBvbmx5IHRoZSB2aXNpYmxlIG5hdmlnYXRpb24gcGFuZWwuXG5cdC0gKipmcmFtZSoqOiAndmlld3BvcnQnIHwgJ2NvbnRhaW5lZCcgLSBWaWV3cG9ydC9maXhlZCBsYXlvdXQgb3IgY29udGFpbmVkL2Fic29sdXRlIGxheW91dCBmb3IgZW1iZWRkZWQgcHJldmlld3MuXG5cdC0gKip3aWR0aCoqOiBzdHJpbmcgLSBFeHBhbmRlZCB3aWR0aC5cbi0gKip3aWR0aEljb24qKjogc3RyaW5nIC0gSWNvbi1jb2xsYXBzZWQgd2lkdGguXG4tICoqd2lkdGhNb2JpbGUqKjogc3RyaW5nIC0gTW9iaWxlIGRyYXdlciB3aWR0aC5cbi0gKipyYWlsKio6IGJvb2xlYW4gLSBFZGdlIHRvZ2dsZSByYWlsLlxuLSAqKmVkZ2VSZXZlYWwqKjogYm9vbGVhbiAoZGVmYXVsdCB0cnVlKSAtIFBvaW50ZXIvZm9jdXMgZWRnZSBwcmV2aWV3IGZvciBoaWRkZW4gb2ZmY2FudmFzIHNpZGViYXJzLiBIb3ZlciByZXZlYWwgb3ZlcmxheXMgY29udGVudDsgdG9nZ2xlL2NsaWNrIG9wZW5zIHBlcnNpc3RlbnRseS5cblxuIyMjIENvbnRlbnRcbi0gKippdGVtcyoqOiBTaWRlYmFyR3JvdXBbXSAtIERhdGEtZHJpdmVuIGJvZHkgbmF2aWdhdGlvbi5cbi0gKipoZWFkZXJCdXR0b24qKiAvICoqZm9vdGVyQnV0dG9uKio6IFNpZGViYXJNZW51QnV0dG9uSXRlbSAtIFN0aWNreSBsYXJnZSByb3dzLlxuLSAqKnNlYXJjaCoqOiBTaWRlYmFyU2VhcmNoIC0gSGVhZGVyIHNlYXJjaCBpbnB1dC5cbi0gKipoZWFkZXJNZW51KiogLyAqKmZvb3Rlck1lbnUqKjogU2lkZWJhck1lbnVFbnRyeVtdIC0gU3RpY2t5IHF1aWNrIG1lbnVzLlxuLSAqKmhlYWRlcioqLCAqKmNvbnRlbnQqKiwgKipmb290ZXIqKiwgKipjaGlsZHJlbioqLCAqKmJhbm5lcioqOiBTbmlwcGV0PFtTaWRlYmFyQXBpXT4gLSBFc2NhcGUgaGF0Y2hlcy5cblxuXHQjIyMgU3R5bGluZ1xuXHQtICoqY2xhc3MqKjogc3RyaW5nIC0gQ2xhc3NlcyBhcHBsaWVkIHRvIHRoZSBTaWRlYmFyIHJvb3QuXG5cdC0gKip0aGVtZSoqOiBTaWRlYmFyVGhlbWVQcm9wcyAtIFNlbWFudGljIHBhcnQgb3ZlcnJpZGVzIHN1Y2ggYXMgXFxgcGFuZWxcXGAsIFxcYGhlYWRlclxcYCwgXFxgbmF2XFxgLCBcXGBmb290ZXJcXGAsIG1lbnUsIHNlYXJjaCwgcmFpbCwgYW5kIG1vYmlsZSBkcmF3ZXIgcGFydHMuXG5cbiMjIEFjY2Vzc2liaWxpdHlcblxuLSBBY3RpdmUgbGlua3Mgc2V0IFxcYGFyaWEtY3VycmVudD1cInBhZ2VcIlxcYC5cbi0gQ29sbGFwc2libGUgcm93cyBhbmQgZ3JvdXBzIHNldCBcXGBhcmlhLWV4cGFuZGVkXFxgLlxuLSBEaXNhYmxlZCBidXR0b25zIHVzZSBcXGBkaXNhYmxlZFxcYDsgZGlzYWJsZWQgbGlua3MgdXNlIFxcYGFyaWEtZGlzYWJsZWRcXGAgYW5kIFxcYHRhYmluZGV4PS0xXFxgLlxuLSBNb2JpbGUgZHJhd2VyIGluY2x1ZGVzIGEgYmFja2Ryb3AgYnV0dG9uIGxhYmVsbGVkIFwiQ2xvc2UgU2lkZWJhclwiLlxuLSBJY29uLWNvbGxhcHNlZCByb3dzIGtlZXAgbGFiZWxzIGluIFxcYHNyLW9ubHlcXGAgdGV4dC5cblxuIyMgTm90ZXNcblxuLSBEcm9wZG93biBtZW51cyB1c2UgU3ZlbGFpIFxcYFBvcHVwTWVudVxcYCBhbmQgXFxgTWVudUl0ZW1bXVxcYC5cbi0gVGhlIGNvbXBvbmVudCB1c2VzIHNlbWFudGljIFN2ZWxhaSB0b2tlbnMuIERvIG5vdCBhZGQgc2hhZGNuIFxcYHNpZGViYXItKlxcYCBjb2xvciB0b2tlbnMuXG4tIFNuaXBwZXQgaWNvbnMgZnJvbSBcXGBzdmVsYWkvaWNvbnMvKlxcYCBhcmUgdGhlIHByZWZlcnJlZCBpY29uIGZvcm1hdC5cbmA7XG4iXX0=