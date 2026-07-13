export const appShellDescription = `
# AppShell Component

	Convenience wrapper for the common application layout: Sidebar owns navigation and
	responsive drawer behavior, while PageShell owns the page header, scrollable content,
	footer, and route-level injection. AppShell owns the visible app wall and page host
	surfaces.

Use AppShell when every route follows the same sidebar + page shell structure. Use
Sidebar and PageShell directly when the frame needs custom composition.

## Basic Usage

\`\`\`svelte
<script lang="ts">
	import { AppShell, type AppShellSidebarProps } from 'svelai/app-shell';
	import { houseIcon } from 'svelai/icons/house';

	const sidebar: AppShellSidebarProps = {
		variant: 'inset',
		collapsible: 'icon',
		rail: true,
		items: [
			{
				label: 'Workspace',
				items: [{ label: 'Home', href: '/', icon: houseIcon, isActive: true }]
			}
		]
	};
<\/script>

<AppShell {sidebar} title="Dashboard" subtitle="Operational overview">
	{#snippet children({ sidebar })}
		<button type="button" onclick={sidebar.toggle}>Toggle sidebar</button>
	{/snippet}
</AppShell>
\`\`\`

## Route-Level Injection

AppShell renders PageShell internally, so child pages can use the PageShell context API:

\`\`\`svelte
<script lang="ts">
	import { setPageShell } from 'svelai/page-shell';

	setPageShell({
		title: 'Insights',
		subtitle: 'Revenue and retention',
		footer: pageFooter
	});
<\/script>

{#snippet pageFooter()}
	<span>Synced just now</span>
{/snippet}
\`\`\`

## Props

- **sidebar**: AppShellSidebarProps - Sidebar props except \`children\`.
- **eyebrow**: string | Snippet<[PageShellApi]> - Small metadata above the PageShell title.
- **breadcrumbs**: BreadcrumbItem[] | Snippet<[AppShellApi]> - PageShell breadcrumbs.
- **breadcrumbsMaxItems**: number - Maximum visible breadcrumb items before ellipsis. Defaults to 4.
- **back**: PageShellAction | Snippet<[AppShellApi]> - Back affordance before breadcrumbs or eyebrow.
- **title**: string | Snippet<[PageShellApi]> - Default PageShell title.
- **subtitle**: string | Snippet<[PageShellApi]> - Default PageShell subtitle.
- **header**: Snippet<[PageShellApi]> - Custom PageShell header.
- **headerActions**: Snippet<[AppShellApi]> | PageShellAction[] - Actions in the default PageShell header. Use an array for standard Button props, or a snippet when the action needs sidebar/page-shell API access.
- **footer**: Snippet<[PageShellApi]> - Sticky PageShell footer.
- **footerActions**: Snippet<[AppShellApi]> | PageShellAction[] - Sticky PageShell footer actions.
	- **children**: Snippet<[AppShellApi]> - Main content, with \`pageShell\` and \`sidebar\` APIs.
	- **contentPadding**: 'none' | 'small' | 'normal' | 'large' - PageShell content padding preset.
	- **contentWidth**: 'full' | 'narrow' | 'normal' | 'wide' | 'prose' - PageShell content width preset.
	- **frame**: 'viewport' | 'contained' - Viewport/fixed or contained/absolute Sidebar layout mechanics.
	- **pageShellTheme**: PageShellThemeProps - PageShell theme overrides.
	- **theme**: AppShellThemeProps - AppShell \`root\` wall and \`page\` host surface overrides.

## Accessibility

AppShell delegates navigation semantics to Sidebar and page landmarks to PageShell.
Use string \`title\` for the default \`h1\`, or preserve heading semantics when replacing
the PageShell header with a custom snippet.
`;

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLHNCQUFzQiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJhcHBTaGVsbC5tY3AudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGFwcFNoZWxsRGVzY3JpcHRpb24gPSBgXG4jIEFwcFNoZWxsIENvbXBvbmVudFxuXG5cdENvbnZlbmllbmNlIHdyYXBwZXIgZm9yIHRoZSBjb21tb24gYXBwbGljYXRpb24gbGF5b3V0OiBTaWRlYmFyIG93bnMgbmF2aWdhdGlvbiBhbmRcblx0cmVzcG9uc2l2ZSBkcmF3ZXIgYmVoYXZpb3IsIHdoaWxlIFBhZ2VTaGVsbCBvd25zIHRoZSBwYWdlIGhlYWRlciwgc2Nyb2xsYWJsZSBjb250ZW50LFxuXHRmb290ZXIsIGFuZCByb3V0ZS1sZXZlbCBpbmplY3Rpb24uIEFwcFNoZWxsIG93bnMgdGhlIHZpc2libGUgYXBwIHdhbGwgYW5kIHBhZ2UgaG9zdFxuXHRzdXJmYWNlcy5cblxuVXNlIEFwcFNoZWxsIHdoZW4gZXZlcnkgcm91dGUgZm9sbG93cyB0aGUgc2FtZSBzaWRlYmFyICsgcGFnZSBzaGVsbCBzdHJ1Y3R1cmUuIFVzZVxuU2lkZWJhciBhbmQgUGFnZVNoZWxsIGRpcmVjdGx5IHdoZW4gdGhlIGZyYW1lIG5lZWRzIGN1c3RvbSBjb21wb3NpdGlvbi5cblxuIyMgQmFzaWMgVXNhZ2VcblxuXFxgXFxgXFxgc3ZlbHRlXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBBcHBTaGVsbCwgdHlwZSBBcHBTaGVsbFNpZGViYXJQcm9wcyB9IGZyb20gJ3N2ZWxhaS9hcHAtc2hlbGwnO1xuXHRpbXBvcnQgeyBob3VzZUljb24gfSBmcm9tICdzdmVsYWkvaWNvbnMvaG91c2UnO1xuXG5cdGNvbnN0IHNpZGViYXI6IEFwcFNoZWxsU2lkZWJhclByb3BzID0ge1xuXHRcdHZhcmlhbnQ6ICdpbnNldCcsXG5cdFx0Y29sbGFwc2libGU6ICdpY29uJyxcblx0XHRyYWlsOiB0cnVlLFxuXHRcdGl0ZW1zOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmVsOiAnV29ya3NwYWNlJyxcblx0XHRcdFx0aXRlbXM6IFt7IGxhYmVsOiAnSG9tZScsIGhyZWY6ICcvJywgaWNvbjogaG91c2VJY29uLCBpc0FjdGl2ZTogdHJ1ZSB9XVxuXHRcdFx0fVxuXHRcdF1cblx0fTtcbjwvc2NyaXB0PlxuXG48QXBwU2hlbGwge3NpZGViYXJ9IHRpdGxlPVwiRGFzaGJvYXJkXCIgc3VidGl0bGU9XCJPcGVyYXRpb25hbCBvdmVydmlld1wiPlxuXHR7I3NuaXBwZXQgY2hpbGRyZW4oeyBzaWRlYmFyIH0pfVxuXHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9e3NpZGViYXIudG9nZ2xlfT5Ub2dnbGUgc2lkZWJhcjwvYnV0dG9uPlxuXHR7L3NuaXBwZXR9XG48L0FwcFNoZWxsPlxuXFxgXFxgXFxgXG5cbiMjIFJvdXRlLUxldmVsIEluamVjdGlvblxuXG5BcHBTaGVsbCByZW5kZXJzIFBhZ2VTaGVsbCBpbnRlcm5hbGx5LCBzbyBjaGlsZCBwYWdlcyBjYW4gdXNlIHRoZSBQYWdlU2hlbGwgY29udGV4dCBBUEk6XG5cblxcYFxcYFxcYHN2ZWx0ZVxuPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgc2V0UGFnZVNoZWxsIH0gZnJvbSAnc3ZlbGFpL3BhZ2Utc2hlbGwnO1xuXG5cdHNldFBhZ2VTaGVsbCh7XG5cdFx0dGl0bGU6ICdJbnNpZ2h0cycsXG5cdFx0c3VidGl0bGU6ICdSZXZlbnVlIGFuZCByZXRlbnRpb24nLFxuXHRcdGZvb3RlcjogcGFnZUZvb3RlclxuXHR9KTtcbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgcGFnZUZvb3RlcigpfVxuXHQ8c3Bhbj5TeW5jZWQganVzdCBub3c8L3NwYW4+XG57L3NuaXBwZXR9XG5cXGBcXGBcXGBcblxuIyMgUHJvcHNcblxuLSAqKnNpZGViYXIqKjogQXBwU2hlbGxTaWRlYmFyUHJvcHMgLSBTaWRlYmFyIHByb3BzIGV4Y2VwdCBcXGBjaGlsZHJlblxcYC5cbi0gKipleWVicm93Kio6IHN0cmluZyB8IFNuaXBwZXQ8W1BhZ2VTaGVsbEFwaV0+IC0gU21hbGwgbWV0YWRhdGEgYWJvdmUgdGhlIFBhZ2VTaGVsbCB0aXRsZS5cbi0gKipicmVhZGNydW1icyoqOiBCcmVhZGNydW1iSXRlbVtdIHwgU25pcHBldDxbQXBwU2hlbGxBcGldPiAtIFBhZ2VTaGVsbCBicmVhZGNydW1icy5cbi0gKipicmVhZGNydW1ic01heEl0ZW1zKio6IG51bWJlciAtIE1heGltdW0gdmlzaWJsZSBicmVhZGNydW1iIGl0ZW1zIGJlZm9yZSBlbGxpcHNpcy4gRGVmYXVsdHMgdG8gNC5cbi0gKipiYWNrKio6IFBhZ2VTaGVsbEFjdGlvbiB8IFNuaXBwZXQ8W0FwcFNoZWxsQXBpXT4gLSBCYWNrIGFmZm9yZGFuY2UgYmVmb3JlIGJyZWFkY3J1bWJzIG9yIGV5ZWJyb3cuXG4tICoqdGl0bGUqKjogc3RyaW5nIHwgU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBEZWZhdWx0IFBhZ2VTaGVsbCB0aXRsZS5cbi0gKipzdWJ0aXRsZSoqOiBzdHJpbmcgfCBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiAtIERlZmF1bHQgUGFnZVNoZWxsIHN1YnRpdGxlLlxuLSAqKmhlYWRlcioqOiBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiAtIEN1c3RvbSBQYWdlU2hlbGwgaGVhZGVyLlxuLSAqKmhlYWRlckFjdGlvbnMqKjogU25pcHBldDxbQXBwU2hlbGxBcGldPiB8IFBhZ2VTaGVsbEFjdGlvbltdIC0gQWN0aW9ucyBpbiB0aGUgZGVmYXVsdCBQYWdlU2hlbGwgaGVhZGVyLiBVc2UgYW4gYXJyYXkgZm9yIHN0YW5kYXJkIEJ1dHRvbiBwcm9wcywgb3IgYSBzbmlwcGV0IHdoZW4gdGhlIGFjdGlvbiBuZWVkcyBzaWRlYmFyL3BhZ2Utc2hlbGwgQVBJIGFjY2Vzcy5cbi0gKipmb290ZXIqKjogU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBTdGlja3kgUGFnZVNoZWxsIGZvb3Rlci5cbi0gKipmb290ZXJBY3Rpb25zKio6IFNuaXBwZXQ8W0FwcFNoZWxsQXBpXT4gfCBQYWdlU2hlbGxBY3Rpb25bXSAtIFN0aWNreSBQYWdlU2hlbGwgZm9vdGVyIGFjdGlvbnMuXG5cdC0gKipjaGlsZHJlbioqOiBTbmlwcGV0PFtBcHBTaGVsbEFwaV0+IC0gTWFpbiBjb250ZW50LCB3aXRoIFxcYHBhZ2VTaGVsbFxcYCBhbmQgXFxgc2lkZWJhclxcYCBBUElzLlxuXHQtICoqY29udGVudFBhZGRpbmcqKjogJ25vbmUnIHwgJ3NtYWxsJyB8ICdub3JtYWwnIHwgJ2xhcmdlJyAtIFBhZ2VTaGVsbCBjb250ZW50IHBhZGRpbmcgcHJlc2V0LlxuXHQtICoqY29udGVudFdpZHRoKio6ICdmdWxsJyB8ICduYXJyb3cnIHwgJ25vcm1hbCcgfCAnd2lkZScgfCAncHJvc2UnIC0gUGFnZVNoZWxsIGNvbnRlbnQgd2lkdGggcHJlc2V0LlxuXHQtICoqZnJhbWUqKjogJ3ZpZXdwb3J0JyB8ICdjb250YWluZWQnIC0gVmlld3BvcnQvZml4ZWQgb3IgY29udGFpbmVkL2Fic29sdXRlIFNpZGViYXIgbGF5b3V0IG1lY2hhbmljcy5cblx0LSAqKnBhZ2VTaGVsbFRoZW1lKio6IFBhZ2VTaGVsbFRoZW1lUHJvcHMgLSBQYWdlU2hlbGwgdGhlbWUgb3ZlcnJpZGVzLlxuXHQtICoqdGhlbWUqKjogQXBwU2hlbGxUaGVtZVByb3BzIC0gQXBwU2hlbGwgXFxgcm9vdFxcYCB3YWxsIGFuZCBcXGBwYWdlXFxgIGhvc3Qgc3VyZmFjZSBvdmVycmlkZXMuXG5cbiMjIEFjY2Vzc2liaWxpdHlcblxuQXBwU2hlbGwgZGVsZWdhdGVzIG5hdmlnYXRpb24gc2VtYW50aWNzIHRvIFNpZGViYXIgYW5kIHBhZ2UgbGFuZG1hcmtzIHRvIFBhZ2VTaGVsbC5cblVzZSBzdHJpbmcgXFxgdGl0bGVcXGAgZm9yIHRoZSBkZWZhdWx0IFxcYGgxXFxgLCBvciBwcmVzZXJ2ZSBoZWFkaW5nIHNlbWFudGljcyB3aGVuIHJlcGxhY2luZ1xudGhlIFBhZ2VTaGVsbCBoZWFkZXIgd2l0aCBhIGN1c3RvbSBzbmlwcGV0LlxuYDtcbiJdfQ==