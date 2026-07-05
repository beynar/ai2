<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import AppShellActionsDemo from './demos/AppShellActionsDemo.svelte';
	import AppShellBasicDemo from './demos/AppShellBasicDemo.svelte';
	import AppShellFeatureShowcaseDemo from './demos/AppShellFeatureShowcaseDemo.svelte';
	import AppShellVariantGalleryDemo from './demos/AppShellVariantGalleryDemo.svelte';
	import rawFeatureShowcaseCode from './demos/AppShellFeatureShowcaseDemo.svelte?raw';
	import rawVariantGalleryCode from './demos/AppShellVariantGalleryDemo.svelte?raw';

	const featureShowcaseCode = toPublicExampleCode(rawFeatureShowcaseCode);
	const variantGalleryCode = toPublicExampleCode(rawVariantGalleryCode);

	function toPublicExampleCode(code: string): string {
		return code
			.replaceAll('$lib/components/AppShell/index.js', 'svelai/app-shell')
			.replaceAll('$lib/components/Breadcrumbs/index.js', 'svelai/breadcrumbs')
			.replaceAll('$lib/components/Sidebar/index.js', 'svelai/sidebar')
			.replace(/\$lib\/components\/Icons\/([A-Za-z0-9]+)\.js/g, 'svelai/icons/$1');
	}
</script>

<DocPage
	title="App shell"
	subtitle="A convenience wrapper that composes Sidebar for navigation with PageShell for page content chrome."
	component="AppShell"
	features={[
		'Wraps Sidebar and PageShell into one application frame',
		'Keeps Sidebar responsive drawer and collapse behavior',
		'Provides PageShell title, subtitle, header, and footer props',
		'Header, footer, and children snippets receive both APIs',
		'Child routes can still use setPageShell through context'
	]}
>
	<ComponentCard
		description="A complete shell surface showing sidebar navigation, breadcrumbs or eyebrow context, a back affordance, content presets, responsive action overflow, and sticky footer actions."
		class="!min-h-fit !items-start !p-4"
		code={featureShowcaseCode}
	>
		<AppShellFeatureShowcaseDemo />
	</ComponentCard>

	<ComponentCard
		description="Use AppShell when every route follows the same sidebar plus page-shell structure."
		class="!min-h-fit !items-start !p-4"
		code={`<script lang="ts">
	import { AppShell, type AppShellSidebarProps } from 'svelai/app-shell';
	import { chartBarIcon } from 'svelai/icons/chartBar';
	import { commandIcon } from 'svelai/icons/command';
	import { gearIcon } from 'svelai/icons/gear';
	import { houseIcon } from 'svelai/icons/house';
	import { sidebarIcon } from 'svelai/icons/sidebar';
	import { trayIcon } from 'svelai/icons/tray';

	let open = $state(true);

	const sidebar: AppShellSidebarProps = {
		open,
		onOpenChange: (nextOpen) => {
			open = nextOpen;
		},
		collapsible: 'icon',
		variant: 'inset',
		rail: true,
		items: [
			{
				label: 'Workspace',
				items: [
					{ label: 'Overview', href: '#overview', icon: houseIcon, isActive: true },
					{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 8 },
					{ label: 'Analytics', href: '#analytics', icon: chartBarIcon },
					{ label: 'Settings', href: '#settings', icon: gearIcon }
				]
			}
		],
		headerButton: {
			icon: commandIcon,
			title: 'Acme',
			subtitle: 'Operations'
		}
	};
${'</' + 'script>'}

<AppShell {sidebar} title="Dashboard" subtitle="Sidebar navigation with sticky page chrome">
	{#snippet headerActions({ sidebar })}
		<button type="button" aria-label="Toggle sidebar" onclick={sidebar.toggle}>
			{@render sidebarIcon({ class: 'size-4' })}
		</button>
	{/snippet}

	{#snippet footer()}
		<span>Sidebar is {open ? 'expanded' : 'collapsed'}</span>
		<span>Responsive drawer included</span>
	{/snippet}

	{#snippet children()}
		<section class="p-4">Dashboard content</section>
	{/snippet}
</AppShell>`}
	>
		<AppShellBasicDemo />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Toggle between practical AppShell variants, with notes for related states like icon rail and page-layout presets like prose width."
			class="!min-h-fit !items-start !p-4"
			code={variantGalleryCode}
		>
			<AppShellVariantGalleryDemo />
		</ComponentCard>

		<ComponentCard
			description="AppShell accepts the same PageShell action arrays, breadcrumbs, back button, and content presets."
			class="!min-h-fit !items-start !p-4"
			code={`<script lang="ts">
	import {
		AppShell,
		type AppShellActions,
		type AppShellSidebarProps
	} from 'svelai/app-shell';
	import type { BreadcrumbItem } from 'svelai/breadcrumbs';
	import { arrowClockwiseIcon } from 'svelai/icons/arrowClockwise';
	import { downloadSimpleIcon } from 'svelai/icons/downloadSimple';
	import { plusIcon } from 'svelai/icons/plus';

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Workspace', href: '#workspace' },
		{ label: 'Reports', active: true }
	];

	const headerActions = [
		{ label: 'Refresh', squared: true, variant: 'outline', prefix: arrowClockwiseIcon },
		{ content: 'Export', variant: 'outline', prefix: downloadSimpleIcon },
		{ content: 'Create', color: 'primary', prefix: plusIcon }
	] satisfies AppShellActions;

	const sidebar: AppShellSidebarProps = { items, collapsible: 'icon', variant: 'inset' };
${'</' + 'script>'}

<AppShell
	{sidebar}
	title="Reports"
	{breadcrumbs}
	back={{ href: '#workspace' }}
	{headerActions}
	contentPadding="normal"
	contentWidth="normal"
>
	{#snippet children()}
		Reports content
	{/snippet}
</AppShell>`}
		>
			<AppShellActionsDemo />
		</ComponentCard>

		<ComponentCard
			description="When child routes need their own chrome, they can call setPageShell because AppShell renders PageShell internally."
			class="!min-h-[260px]"
			code={`<script lang="ts">
	import { setPageShell } from 'svelai/page-shell';

	setPageShell({
		title: 'Customer detail',
		subtitle: 'Route-owned metadata',
		footer
	});
${'</' + 'script>'}

{#snippet footer()}
	<span>Unsaved changes</span>
{/snippet}

<section>Customer content</section>`}
		>
			<div class="max-w-xl text-sm text-foreground/70">
				AppShell does not replace PageShell. It composes it, so route-level PageShell injection
				stays available under the combined frame.
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
