export const pageShellDescription = `
# PageShell Component

Content shell for pages rendered inside an application frame. PageShell provides a
sticky header, scrollable content region, sticky footer, title/subtitle props, and a
context API for child routes to inject shell content.

Use PageShell inside \`Sidebar.children\` when Sidebar owns navigation and responsive
drawer behavior.

## Basic Usage

\`\`\`svelte
<script lang="ts">
	import { PageShell, type PageShellAction } from 'svelai/page-shell';
	import { downloadSimpleIcon } from 'svelai/icons/downloadSimple';

	const headerActions = [
		{
			content: 'Export',
			color: 'primary',
			prefix: downloadSimpleIcon
		}
	] satisfies PageShellAction[];
<\/script>

<PageShell title="Insights" subtitle="Live account health" {headerActions}>
	{#snippet footer()}
		<span>Updated just now</span>
	{/snippet}

	{#snippet children()}
		<section class="p-6">Page content</section>
	{/snippet}
</PageShell>
\`\`\`

## Route-Level Injection

Child pages can set header and footer content through context. Use \`setPageShell\`
during component initialization for automatic cleanup.

\`\`\`svelte
<script lang="ts">
	import { setPageShell } from 'svelai/page-shell';

	setPageShell({
		title: 'Revenue',
		subtitle: 'Segment breakdown',
		headerActions: revenueActions,
		footer: revenueFooter
	});
<\/script>

{#snippet revenueActions()}
	<button type="button">Refresh</button>
{/snippet}

{#snippet revenueFooter()}
	<span>Synced 2 minutes ago</span>
{/snippet}
\`\`\`

## Props

- **eyebrow**: string | Snippet<[PageShellApi]> - Small metadata above the title. Ignored when breadcrumbs are set.
- **breadcrumbs**: BreadcrumbItem[] | Snippet<[PageShellApi]> - Default-header breadcrumbs.
- **breadcrumbsMaxItems**: number - Maximum visible breadcrumb items before ellipsis. Defaults to 4.
- **back**: PageShellAction | Snippet<[PageShellApi]> - Back affordance before breadcrumbs or eyebrow.
- **title**: string | Snippet<[PageShellApi]> - Default header title.
- **subtitle**: string | Snippet<[PageShellApi]> - Default header subtitle.
- **header**: Snippet<[PageShellApi]> - Custom sticky header content.
- **headerActions**: Snippet<[PageShellApi]> | PageShellAction[] - Actions on the right side of the default header. Use an array for standard Button props, or a snippet when the action needs shell API access.
- **footer**: Snippet<[PageShellApi]> - Custom sticky footer content.
- **footerActions**: Snippet<[PageShellApi]> | PageShellAction[] - Actions on the right side of the sticky footer.
	- **children**: Snippet<[PageShellApi]> - Scrollable page content.
	- **contentPadding**: 'none' | 'small' | 'normal' | 'large' - Padding applied to the content inner wrapper.
	- **contentWidth**: 'full' | 'narrow' | 'normal' | 'wide' | 'prose' - Max-width preset for the content inner wrapper.
	- **actionOverflow**: 'auto' | 'never' - Mobile overflow behavior for action arrays.
	- **mobileActionCount**: 0 | 1 | 2 - Number of action-array buttons kept inline on mobile.
	- **theme**: PageShellThemeProps - Per-instance theme overrides.

## API

- **usePageShell()** returns the current PageShell API and throws when no PageShell exists.
- **setPageShell(config)** registers a scoped config override and removes it on component destroy.
- **api.set(config)** pushes a manual override and returns a cleanup function.
- **api.setFooterActions(actions)** pushes scoped sticky footer actions.
- **api.reset()** clears all scoped overrides.

## Header Action Arrays

\`\`\`svelte
<script lang="ts">
	import { PageShell, type PageShellAction } from 'svelai/page-shell';
	import { arrowClockwiseIcon } from 'svelai/icons/arrowClockwise';

	const headerActions = [
		{
			label: 'Refresh',
			squared: true,
			variant: 'outline',
			prefix: arrowClockwiseIcon
		},
		{
			content: 'Create report',
			color: 'primary'
		}
	] satisfies PageShellAction[];
<\/script>

<PageShell title="Reports" {headerActions}>
	{#snippet children()}
		Page content
	{/snippet}
</PageShell>
\`\`\`

## Content Presets And Footer Actions

\`\`\`svelte
<PageShell
	eyebrow="Settings"
	title="Billing profile"
	contentPadding="normal"
	contentWidth="narrow"
	footerActions={[
		{ content: 'Cancel', variant: 'outline' },
		{ content: 'Save changes', color: 'primary' }
	]}
>
	{#snippet footer()}
		<span>2 unsaved changes</span>
	{/snippet}

	{#snippet children()}
		<form>...</form>
	{/snippet}
</PageShell>
\`\`\`

## Accessibility

PageShell renders semantic \`header\`, \`main\`, and \`footer\` regions. The title is an
\`h1\` when provided as a string. Custom snippets are responsible for preserving
equivalent semantics when replacing the default header.
`;

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLHVCQUF1QiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJwYWdlU2hlbGwubWNwLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBwYWdlU2hlbGxEZXNjcmlwdGlvbiA9IGBcbiMgUGFnZVNoZWxsIENvbXBvbmVudFxuXG5Db250ZW50IHNoZWxsIGZvciBwYWdlcyByZW5kZXJlZCBpbnNpZGUgYW4gYXBwbGljYXRpb24gZnJhbWUuIFBhZ2VTaGVsbCBwcm92aWRlcyBhXG5zdGlja3kgaGVhZGVyLCBzY3JvbGxhYmxlIGNvbnRlbnQgcmVnaW9uLCBzdGlja3kgZm9vdGVyLCB0aXRsZS9zdWJ0aXRsZSBwcm9wcywgYW5kIGFcbmNvbnRleHQgQVBJIGZvciBjaGlsZCByb3V0ZXMgdG8gaW5qZWN0IHNoZWxsIGNvbnRlbnQuXG5cblVzZSBQYWdlU2hlbGwgaW5zaWRlIFxcYFNpZGViYXIuY2hpbGRyZW5cXGAgd2hlbiBTaWRlYmFyIG93bnMgbmF2aWdhdGlvbiBhbmQgcmVzcG9uc2l2ZVxuZHJhd2VyIGJlaGF2aW9yLlxuXG4jIyBCYXNpYyBVc2FnZVxuXG5cXGBcXGBcXGBzdmVsdGVcbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IFBhZ2VTaGVsbCwgdHlwZSBQYWdlU2hlbGxBY3Rpb24gfSBmcm9tICdzdmVsYWkvcGFnZS1zaGVsbCc7XG5cdGltcG9ydCB7IGRvd25sb2FkU2ltcGxlSWNvbiB9IGZyb20gJ3N2ZWxhaS9pY29ucy9kb3dubG9hZFNpbXBsZSc7XG5cblx0Y29uc3QgaGVhZGVyQWN0aW9ucyA9IFtcblx0XHR7XG5cdFx0XHRjb250ZW50OiAnRXhwb3J0Jyxcblx0XHRcdGNvbG9yOiAncHJpbWFyeScsXG5cdFx0XHRwcmVmaXg6IGRvd25sb2FkU2ltcGxlSWNvblxuXHRcdH1cblx0XSBzYXRpc2ZpZXMgUGFnZVNoZWxsQWN0aW9uW107XG48L3NjcmlwdD5cblxuPFBhZ2VTaGVsbCB0aXRsZT1cIkluc2lnaHRzXCIgc3VidGl0bGU9XCJMaXZlIGFjY291bnQgaGVhbHRoXCIge2hlYWRlckFjdGlvbnN9PlxuXHR7I3NuaXBwZXQgZm9vdGVyKCl9XG5cdFx0PHNwYW4+VXBkYXRlZCBqdXN0IG5vdzwvc3Bhbj5cblx0ey9zbmlwcGV0fVxuXG5cdHsjc25pcHBldCBjaGlsZHJlbigpfVxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicC02XCI+UGFnZSBjb250ZW50PC9zZWN0aW9uPlxuXHR7L3NuaXBwZXR9XG48L1BhZ2VTaGVsbD5cblxcYFxcYFxcYFxuXG4jIyBSb3V0ZS1MZXZlbCBJbmplY3Rpb25cblxuQ2hpbGQgcGFnZXMgY2FuIHNldCBoZWFkZXIgYW5kIGZvb3RlciBjb250ZW50IHRocm91Z2ggY29udGV4dC4gVXNlIFxcYHNldFBhZ2VTaGVsbFxcYFxuZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbiBmb3IgYXV0b21hdGljIGNsZWFudXAuXG5cblxcYFxcYFxcYHN2ZWx0ZVxuPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgc2V0UGFnZVNoZWxsIH0gZnJvbSAnc3ZlbGFpL3BhZ2Utc2hlbGwnO1xuXG5cdHNldFBhZ2VTaGVsbCh7XG5cdFx0dGl0bGU6ICdSZXZlbnVlJyxcblx0XHRzdWJ0aXRsZTogJ1NlZ21lbnQgYnJlYWtkb3duJyxcblx0XHRoZWFkZXJBY3Rpb25zOiByZXZlbnVlQWN0aW9ucyxcblx0XHRmb290ZXI6IHJldmVudWVGb290ZXJcblx0fSk7XG48L3NjcmlwdD5cblxueyNzbmlwcGV0IHJldmVudWVBY3Rpb25zKCl9XG5cdDxidXR0b24gdHlwZT1cImJ1dHRvblwiPlJlZnJlc2g8L2J1dHRvbj5cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IHJldmVudWVGb290ZXIoKX1cblx0PHNwYW4+U3luY2VkIDIgbWludXRlcyBhZ288L3NwYW4+XG57L3NuaXBwZXR9XG5cXGBcXGBcXGBcblxuIyMgUHJvcHNcblxuLSAqKmV5ZWJyb3cqKjogc3RyaW5nIHwgU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBTbWFsbCBtZXRhZGF0YSBhYm92ZSB0aGUgdGl0bGUuIElnbm9yZWQgd2hlbiBicmVhZGNydW1icyBhcmUgc2V0LlxuLSAqKmJyZWFkY3J1bWJzKio6IEJyZWFkY3J1bWJJdGVtW10gfCBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiAtIERlZmF1bHQtaGVhZGVyIGJyZWFkY3J1bWJzLlxuLSAqKmJyZWFkY3J1bWJzTWF4SXRlbXMqKjogbnVtYmVyIC0gTWF4aW11bSB2aXNpYmxlIGJyZWFkY3J1bWIgaXRlbXMgYmVmb3JlIGVsbGlwc2lzLiBEZWZhdWx0cyB0byA0LlxuLSAqKmJhY2sqKjogUGFnZVNoZWxsQWN0aW9uIHwgU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBCYWNrIGFmZm9yZGFuY2UgYmVmb3JlIGJyZWFkY3J1bWJzIG9yIGV5ZWJyb3cuXG4tICoqdGl0bGUqKjogc3RyaW5nIHwgU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBEZWZhdWx0IGhlYWRlciB0aXRsZS5cbi0gKipzdWJ0aXRsZSoqOiBzdHJpbmcgfCBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiAtIERlZmF1bHQgaGVhZGVyIHN1YnRpdGxlLlxuLSAqKmhlYWRlcioqOiBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiAtIEN1c3RvbSBzdGlja3kgaGVhZGVyIGNvbnRlbnQuXG4tICoqaGVhZGVyQWN0aW9ucyoqOiBTbmlwcGV0PFtQYWdlU2hlbGxBcGldPiB8IFBhZ2VTaGVsbEFjdGlvbltdIC0gQWN0aW9ucyBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgZGVmYXVsdCBoZWFkZXIuIFVzZSBhbiBhcnJheSBmb3Igc3RhbmRhcmQgQnV0dG9uIHByb3BzLCBvciBhIHNuaXBwZXQgd2hlbiB0aGUgYWN0aW9uIG5lZWRzIHNoZWxsIEFQSSBhY2Nlc3MuXG4tICoqZm9vdGVyKio6IFNuaXBwZXQ8W1BhZ2VTaGVsbEFwaV0+IC0gQ3VzdG9tIHN0aWNreSBmb290ZXIgY29udGVudC5cbi0gKipmb290ZXJBY3Rpb25zKio6IFNuaXBwZXQ8W1BhZ2VTaGVsbEFwaV0+IHwgUGFnZVNoZWxsQWN0aW9uW10gLSBBY3Rpb25zIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBzdGlja3kgZm9vdGVyLlxuXHQtICoqY2hpbGRyZW4qKjogU25pcHBldDxbUGFnZVNoZWxsQXBpXT4gLSBTY3JvbGxhYmxlIHBhZ2UgY29udGVudC5cblx0LSAqKmNvbnRlbnRQYWRkaW5nKio6ICdub25lJyB8ICdzbWFsbCcgfCAnbm9ybWFsJyB8ICdsYXJnZScgLSBQYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGNvbnRlbnQgaW5uZXIgd3JhcHBlci5cblx0LSAqKmNvbnRlbnRXaWR0aCoqOiAnZnVsbCcgfCAnbmFycm93JyB8ICdub3JtYWwnIHwgJ3dpZGUnIHwgJ3Byb3NlJyAtIE1heC13aWR0aCBwcmVzZXQgZm9yIHRoZSBjb250ZW50IGlubmVyIHdyYXBwZXIuXG5cdC0gKiphY3Rpb25PdmVyZmxvdyoqOiAnYXV0bycgfCAnbmV2ZXInIC0gTW9iaWxlIG92ZXJmbG93IGJlaGF2aW9yIGZvciBhY3Rpb24gYXJyYXlzLlxuXHQtICoqbW9iaWxlQWN0aW9uQ291bnQqKjogMCB8IDEgfCAyIC0gTnVtYmVyIG9mIGFjdGlvbi1hcnJheSBidXR0b25zIGtlcHQgaW5saW5lIG9uIG1vYmlsZS5cblx0LSAqKnRoZW1lKio6IFBhZ2VTaGVsbFRoZW1lUHJvcHMgLSBQZXItaW5zdGFuY2UgdGhlbWUgb3ZlcnJpZGVzLlxuXG4jIyBBUElcblxuLSAqKnVzZVBhZ2VTaGVsbCgpKiogcmV0dXJucyB0aGUgY3VycmVudCBQYWdlU2hlbGwgQVBJIGFuZCB0aHJvd3Mgd2hlbiBubyBQYWdlU2hlbGwgZXhpc3RzLlxuLSAqKnNldFBhZ2VTaGVsbChjb25maWcpKiogcmVnaXN0ZXJzIGEgc2NvcGVkIGNvbmZpZyBvdmVycmlkZSBhbmQgcmVtb3ZlcyBpdCBvbiBjb21wb25lbnQgZGVzdHJveS5cbi0gKiphcGkuc2V0KGNvbmZpZykqKiBwdXNoZXMgYSBtYW51YWwgb3ZlcnJpZGUgYW5kIHJldHVybnMgYSBjbGVhbnVwIGZ1bmN0aW9uLlxuLSAqKmFwaS5zZXRGb290ZXJBY3Rpb25zKGFjdGlvbnMpKiogcHVzaGVzIHNjb3BlZCBzdGlja3kgZm9vdGVyIGFjdGlvbnMuXG4tICoqYXBpLnJlc2V0KCkqKiBjbGVhcnMgYWxsIHNjb3BlZCBvdmVycmlkZXMuXG5cbiMjIEhlYWRlciBBY3Rpb24gQXJyYXlzXG5cblxcYFxcYFxcYHN2ZWx0ZVxuPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgUGFnZVNoZWxsLCB0eXBlIFBhZ2VTaGVsbEFjdGlvbiB9IGZyb20gJ3N2ZWxhaS9wYWdlLXNoZWxsJztcblx0aW1wb3J0IHsgYXJyb3dDbG9ja3dpc2VJY29uIH0gZnJvbSAnc3ZlbGFpL2ljb25zL2Fycm93Q2xvY2t3aXNlJztcblxuXHRjb25zdCBoZWFkZXJBY3Rpb25zID0gW1xuXHRcdHtcblx0XHRcdGxhYmVsOiAnUmVmcmVzaCcsXG5cdFx0XHRzcXVhcmVkOiB0cnVlLFxuXHRcdFx0dmFyaWFudDogJ291dGxpbmUnLFxuXHRcdFx0cHJlZml4OiBhcnJvd0Nsb2Nrd2lzZUljb25cblx0XHR9LFxuXHRcdHtcblx0XHRcdGNvbnRlbnQ6ICdDcmVhdGUgcmVwb3J0Jyxcblx0XHRcdGNvbG9yOiAncHJpbWFyeSdcblx0XHR9XG5cdF0gc2F0aXNmaWVzIFBhZ2VTaGVsbEFjdGlvbltdO1xuPC9zY3JpcHQ+XG5cbjxQYWdlU2hlbGwgdGl0bGU9XCJSZXBvcnRzXCIge2hlYWRlckFjdGlvbnN9PlxuXHR7I3NuaXBwZXQgY2hpbGRyZW4oKX1cblx0XHRQYWdlIGNvbnRlbnRcblx0ey9zbmlwcGV0fVxuPC9QYWdlU2hlbGw+XG5cXGBcXGBcXGBcblxuIyMgQ29udGVudCBQcmVzZXRzIEFuZCBGb290ZXIgQWN0aW9uc1xuXG5cXGBcXGBcXGBzdmVsdGVcbjxQYWdlU2hlbGxcblx0ZXllYnJvdz1cIlNldHRpbmdzXCJcblx0dGl0bGU9XCJCaWxsaW5nIHByb2ZpbGVcIlxuXHRjb250ZW50UGFkZGluZz1cIm5vcm1hbFwiXG5cdGNvbnRlbnRXaWR0aD1cIm5hcnJvd1wiXG5cdGZvb3RlckFjdGlvbnM9e1tcblx0XHR7IGNvbnRlbnQ6ICdDYW5jZWwnLCB2YXJpYW50OiAnb3V0bGluZScgfSxcblx0XHR7IGNvbnRlbnQ6ICdTYXZlIGNoYW5nZXMnLCBjb2xvcjogJ3ByaW1hcnknIH1cblx0XX1cbj5cblx0eyNzbmlwcGV0IGZvb3RlcigpfVxuXHRcdDxzcGFuPjIgdW5zYXZlZCBjaGFuZ2VzPC9zcGFuPlxuXHR7L3NuaXBwZXR9XG5cblx0eyNzbmlwcGV0IGNoaWxkcmVuKCl9XG5cdFx0PGZvcm0+Li4uPC9mb3JtPlxuXHR7L3NuaXBwZXR9XG48L1BhZ2VTaGVsbD5cblxcYFxcYFxcYFxuXG4jIyBBY2Nlc3NpYmlsaXR5XG5cblBhZ2VTaGVsbCByZW5kZXJzIHNlbWFudGljIFxcYGhlYWRlclxcYCwgXFxgbWFpblxcYCwgYW5kIFxcYGZvb3RlclxcYCByZWdpb25zLiBUaGUgdGl0bGUgaXMgYW5cblxcYGgxXFxgIHdoZW4gcHJvdmlkZWQgYXMgYSBzdHJpbmcuIEN1c3RvbSBzbmlwcGV0cyBhcmUgcmVzcG9uc2libGUgZm9yIHByZXNlcnZpbmdcbmVxdWl2YWxlbnQgc2VtYW50aWNzIHdoZW4gcmVwbGFjaW5nIHRoZSBkZWZhdWx0IGhlYWRlci5cbmA7XG4iXX0=