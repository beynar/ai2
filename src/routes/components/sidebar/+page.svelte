<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import SidebarBasicDemo from './demos/SidebarBasicDemo.svelte';
	import SidebarIconDemo from './demos/SidebarIconDemo.svelte';
	import SidebarTreeDemo from './demos/SidebarTreeDemo.svelte';
	import SidebarVariantDemo from './demos/SidebarVariantDemo.svelte';
</script>

<DocPage
	title="Sidebar"
	subtitle="Application shell sidebars with responsive collapse, data-driven navigation, menus, search, and recursive tree groups."
	component="Sidebar"
	features={[
		'Desktop icon and offcanvas collapse modes',
		'Hidden offcanvas sidebars reveal from the screen edge',
		'Mobile drawer state through the same API',
		'Header, footer, search, menu, and action rows',
		'Recursive tree groups and nested submenus',
		'Keyboard shortcut and snippet escape hatches'
	]}
>
	<ComponentCard
		description="Compose a full app shell from typed groups, search, account menus, badges, and row actions."
		class="!min-h-fit !items-start !p-4"
		code={`<script lang="ts">
	import { Sidebar, type SidebarGroup } from 'svelai/sidebar';
	import { commandIcon } from 'svelai/icons/command';
	import { houseIcon } from 'svelai/icons/house';
	import { trayIcon } from 'svelai/icons/tray';

	let open = $state(true);

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '/overview', icon: houseIcon, isActive: true },
				{ label: 'Inbox', href: '/inbox', icon: trayIcon, badge: 12 }
			]
		}
	];
${'</' + 'script>'}

<Sidebar
	bind:open
	items={items}
	collapsible="icon"
	variant="inset"
	rail
	headerButton={{
		icon: commandIcon,
		title: 'Acme',
		subtitle: 'Operations'
	}}
	search={{ placeholder: 'Search workspace' }}
>
	{#snippet children(api)}
		<button type="button" onclick={() => api.toggle()}>Toggle sidebar</button>
	{/snippet}
</Sidebar>`}
	>
		<SidebarBasicDemo />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Switch between the sidebar, floating, inset, and split visual recipes with the same navigation data."
			class="!min-h-fit !items-start !p-4"
			code={`<script lang="ts">
	import { Sidebar, type SidebarGroup, type SidebarThemeProps, type SidebarVariant } from 'svelai/sidebar';
	import { chartBarIcon } from 'svelai/icons/chartBar';
	import { commandIcon } from 'svelai/icons/command';
	import { gearIcon } from 'svelai/icons/gear';
	import { houseIcon } from 'svelai/icons/house';
	import { sidebarIcon } from 'svelai/icons/sidebar';
	import { usersIcon } from 'svelai/icons/users';

	type VariantRecipe = {
		id: string;
		label: string;
		variant: SidebarVariant;
		theme: SidebarThemeProps;
	};

	let open = $state(true);
	let selectedRecipeId = $state('sidebar');

	const standardTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const splitTheme = {
		root: {
			base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted bg-background-muted'
		},
		container: { base: '!absolute !inset-y-0 !h-full !p-0' },
		gap: { base: 'h-full shrink-0' },
		inner: {
			variant: {
				inset: '!rounded-none !border-0 !bg-transparent !shadow-none'
			}
		},
		inset: {
			base: 'min-w-0',
			variant: {
				inset:
					'md:!m-2 md:!ml-0 md:!overflow-hidden md:!rounded-xl md:!border md:!border-background-muted md:!bg-background md:!shadow-none md:!peer-data-[state=collapsed]:ml-2'
			}
		},
		rail: {
			base: 'data-[side=left]:right-0'
		}
	} satisfies SidebarThemeProps;

	const variantRecipes: VariantRecipe[] = [
		{ id: 'sidebar', label: 'sidebar', variant: 'sidebar', theme: standardTheme },
		{ id: 'floating', label: 'floating', variant: 'floating', theme: standardTheme },
		{ id: 'inset', label: 'inset', variant: 'inset', theme: standardTheme },
		{ id: 'split', label: 'split', variant: 'inset', theme: splitTheme }
	];

	const selectedRecipe = $derived(
		variantRecipes.find((recipe) => recipe.id === selectedRecipeId) ?? variantRecipes[0]
	);

	const items: SidebarGroup[] = [
		{
			label: 'Navigation',
			items: [
				{ label: 'Home', href: '#home', icon: houseIcon, isActive: true },
				{ label: 'Analytics', href: '#analytics', icon: chartBarIcon },
				{ label: 'Customers', href: '#customers', icon: usersIcon },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];
${'</' + 'script>'}

<div class="h-[500px] w-full">
	<Sidebar
		bind:open
		{items}
		variant={selectedRecipe.variant}
		collapsible="icon"
		rail
		width="16rem"
		widthIcon="3.5rem"
		theme={selectedRecipe.theme}
		headerButton={{
			icon: commandIcon,
			title: 'Variant Lab',
			subtitle: selectedRecipe.label
		}}
	>
		{#snippet children(api)}
			<div class="flex h-full min-w-0 flex-1 flex-col bg-background">
				<header class="flex h-14 items-center justify-between px-4">
					<div>
						<p class="text-sm font-medium text-foreground">Sidebar variant</p>
						<p class="text-xs text-foreground/60">Switch the visual shell without changing data.</p>
					</div>
					<button
						type="button"
						class="border-background-muted hover:bg-background-muted inline-flex size-8 items-center justify-center rounded-md border text-foreground"
						aria-label="Toggle sidebar"
						onclick={() => api.toggle()}
					>
						{@render sidebarIcon({ class: 'size-4' })}
					</button>
				</header>

				<div class="flex flex-wrap items-center gap-2 px-4 pb-3">
					{#each variantRecipes as recipe}
						<button
							type="button"
							class="border-background-muted inline-flex h-8 items-center rounded-md border px-3 text-sm font-medium transition {selectedRecipeId === recipe.id
								? 'bg-primary text-primary-contrast'
								: 'bg-background text-foreground hover:bg-background-muted'}"
							aria-pressed={selectedRecipeId === recipe.id}
							onclick={() => (selectedRecipeId = recipe.id)}
						>
							{recipe.label}
						</button>
					{/each}
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>`}
		>
			<SidebarVariantDemo />
		</ComponentCard>

		<ComponentCard
			description="Icon collapse keeps rows accessible with sr-only labels and native title tooltips."
			class="!min-h-fit !items-start !p-4"
			code={`<Sidebar
	items={items}
	collapsible="icon"
	tooltips="always"
	variant="floating"
	headerButton={{ icon: commandIcon, title: 'Control', variant: 'brand' }}
>
	{#snippet children(api)}
		<button type="button" onclick={() => api.toggle()}>Toggle sidebar</button>
	{/snippet}
</Sidebar>`}
		>
			<SidebarIconDemo />
		</ComponentCard>

		<ComponentCard
			description="Tree groups render recursive folder structures. With offcanvas collapse, hiding the sidebar exposes a screen-edge preview over the content."
			class="!min-h-fit !items-start !p-4"
			code={`<script lang="ts">
	import { Sidebar, type SidebarGroup, type SidebarThemeProps } from 'svelai/sidebar';
	import { commandIcon } from 'svelai/icons/command';
	import { fileIcon } from 'svelai/icons/file';
	import { folderIcon } from 'svelai/icons/folder';
	import { mapPinIcon } from 'svelai/icons/mapPin';
	import { plusIcon } from 'svelai/icons/plus';
	import { sidebarIcon } from 'svelai/icons/sidebar';
	import { terminalIcon } from 'svelai/icons/terminal';

	let open = $state(true);

	const previewTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const items: SidebarGroup[] = [
		{
			label: 'Files',
			action: {
				label: 'Add file',
				icon: plusIcon,
				menu: [
					{ type: 'option', title: 'New file', prefix: fileIcon },
					{ type: 'option', title: 'New folder', prefix: folderIcon }
				]
			},
			tree: [
				{
					label: 'src',
					icon: folderIcon,
					defaultOpen: true,
					children: [
						{
							label: 'lib',
							icon: folderIcon,
							defaultOpen: true,
							children: [
								{
									label: 'components',
									icon: folderIcon,
									defaultOpen: true,
									children: [
										{ label: 'Sidebar.svelte', href: '#sidebar', icon: fileIcon, isActive: true },
										{ label: 'SidebarGroup.svelte', href: '#group', icon: fileIcon }
									]
								}
							]
						},
						{ label: 'routes', href: '#routes', icon: folderIcon }
					]
				},
				{ label: 'package.json', href: '#package', icon: fileIcon }
			]
		}
	];
${'</' + 'script>'}

<div class="h-[460px] w-full">
	<Sidebar
		bind:open
		items={items}
		collapsible="offcanvas"
		edgeReveal
		variant="sidebar"
		width="18rem"
		theme={previewTheme}
		headerButton={{
			icon: commandIcon,
			title: 'Repository',
			subtitle: 'svelai'
		}}
	>
		{#snippet children(api)}
			<div class="flex h-full min-w-0 flex-1 flex-col bg-background-light">
				<header class="border-background-muted flex h-14 items-center justify-between border-b px-4">
					<div>
						<p class="text-sm font-medium text-foreground">Repository browser</p>
						<p class="text-xs text-foreground/60">Recursive tree groups share sidebar tokens.</p>
					</div>
					<button
						type="button"
						class="border-background-muted hover:bg-background-muted inline-flex size-8 items-center justify-center rounded-md border text-foreground"
						aria-label="Toggle sidebar"
						onclick={() => api.toggle()}
					>
						{@render sidebarIcon({ class: 'size-4' })}
					</button>
				</header>
				<div class="grid flex-1 gap-4 p-4 md:grid-cols-2">
					<div class="border-background-muted bg-background rounded-lg border p-4">
						<div class="mb-3 flex items-center gap-2 text-primary">
							{@render terminalIcon({ class: 'size-4' })}
							<span class="text-sm font-medium">Selected file</span>
						</div>
						<code class="text-sm text-foreground">
							src/lib/components/Sidebar/Sidebar.svelte
						</code>
					</div>
					<div class="border-background-muted bg-background rounded-lg border p-4">
						<div class="mb-3 flex items-center gap-2 text-primary">
							{@render mapPinIcon({ class: 'size-4' })}
							<span class="text-sm font-medium">Current route</span>
						</div>
						<p class="text-sm text-foreground/70">/components/sidebar</p>
					</div>
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>`}
		>
			<SidebarTreeDemo />
		</ComponentCard>
	{/snippet}
</DocPage>
