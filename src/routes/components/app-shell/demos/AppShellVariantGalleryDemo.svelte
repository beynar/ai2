<script lang="ts">
	import {
		AppShell,
		type AppShellActions,
		type AppShellSidebarProps
	} from '$lib/components/AppShell/index.js';
	import type { PageShellThemeProps } from '$lib/components/PageShell/index.js';
	import type { SidebarGroup, SidebarThemeProps } from '$lib/components/Sidebar/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { downloadSimpleIcon } from '$lib/components/Icons/downloadSimple.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import { trayIcon } from '$lib/components/Icons/tray.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	type VariantRecipe = {
		id: string;
		name: string;
		description: string;
		title: string;
		contentWidth: 'full' | 'narrow' | 'normal' | 'wide' | 'prose';
		contentPadding: 'none' | 'small' | 'normal' | 'large';
		sidebar: Pick<
			AppShellSidebarProps,
			'variant' | 'collapsible' | 'rail' | 'width' | 'widthIcon' | 'sidebarClass'
		>;
		sidebarTheme?: SidebarThemeProps;
		pageShellTheme?: PageShellThemeProps;
		items: SidebarGroup[];
	};

	let selectedRecipeId = $state('inset');

	const previewSidebarTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const splitSidebarTheme = {
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

	const splitPageShellTheme = {
		header: {
			base: 'bg-background/95 supports-[backdrop-filter]:bg-background/85'
		},
		footer: {
			base: 'bg-background/95 supports-[backdrop-filter]:bg-background/85'
		}
	} satisfies PageShellThemeProps;

	const productGroups: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '#overview', icon: houseIcon },
				{ label: 'Analytics', href: '#analytics', icon: chartBarIcon, isActive: true },
				{ label: 'Customers', href: '#customers', icon: usersIcon, badge: 24 },
				{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 6 },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];

	const variantRecipes: VariantRecipe[] = [
		{
			id: 'classic',
			name: 'Classic admin',
			description: 'Full-width workspace with a fixed, tinted navigation column.',
			title: 'Operations',
			contentWidth: 'full',
			contentPadding: 'normal',
			sidebar: {
				variant: 'sidebar',
				collapsible: 'none',
				width: '16rem',
				sidebarClass: '!bg-background-muted/35'
			},
			items: productGroups
		},
		{
			id: 'inset',
			name: 'Inset product app',
			description: 'Rounded inset frame with collapsible navigation and an invisible edge rail.',
			title: 'Revenue cockpit',
			contentWidth: 'wide',
			contentPadding: 'normal',
			sidebar: { variant: 'inset', collapsible: 'icon', rail: true, width: '16rem' },
			items: productGroups
		},
		{
			id: 'floating',
			name: 'Floating console',
			description: 'Detached navigation with dense command-style content.',
			title: 'Command center',
			contentWidth: 'normal',
			contentPadding: 'small',
			sidebar: { variant: 'floating', collapsible: 'icon', rail: true, width: '15rem' },
			items: productGroups
		},
		{
			id: 'split',
			name: 'Rounded content split',
			description:
				'Contrasting sidebar well with an inset content panel rounded against the navigation edge.',
			title: 'Component browser',
			contentWidth: 'normal',
			contentPadding: 'normal',
			sidebar: { variant: 'inset', collapsible: 'icon', rail: true, width: '17rem' },
			sidebarTheme: splitSidebarTheme,
			pageShellTheme: splitPageShellTheme,
			items: productGroups
		}
	];

	const headerActions = [
		{ label: 'Refresh', squared: true, variant: 'outline', prefix: arrowClockwiseIcon },
		{ content: 'Export', variant: 'outline', prefix: downloadSimpleIcon },
		{ content: 'Create', color: 'primary', prefix: plusIcon }
	] satisfies AppShellActions;

	const selectedRecipe = $derived(
		variantRecipes.find((recipe) => recipe.id === selectedRecipeId) ?? variantRecipes[0]
	);

	const sidebar = $derived<AppShellSidebarProps>({
		...selectedRecipe.sidebar,
		items: selectedRecipe.items,
		widthIcon: selectedRecipe.sidebar.widthIcon ?? '3.5rem',
		theme: selectedRecipe.sidebarTheme ?? previewSidebarTheme,
		headerButton: {
			icon: commandIcon,
			title: selectedRecipe.name,
			subtitle: 'Workspace'
		}
	});
</script>

<div class="grid gap-4">
	<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
		{#each variantRecipes as recipe}
			<button
				type="button"
				class="rounded-lg border p-3 text-left transition {selectedRecipeId === recipe.id
					? 'border-primary bg-primary/10 text-foreground'
					: 'border-background-muted bg-background-light text-foreground/70 hover:border-primary/50 hover:text-foreground'}"
				aria-pressed={selectedRecipeId === recipe.id}
				onclick={() => (selectedRecipeId = recipe.id)}
			>
				<span class="block text-sm font-semibold">{recipe.name}</span>
				<span class="mt-1 block text-xs leading-5">{recipe.description}</span>
			</button>
		{/each}
	</div>

	<div class="grid gap-2 md:grid-cols-2">
		<div class="rounded-lg border border-background-muted bg-background-light p-3">
			<p class="text-sm font-semibold text-foreground">Icon rail is a state</p>
			<p class="mt-1 text-xs leading-5 text-foreground/65">
				Use <code>collapsible="icon"</code>, <code>rail</code>, and optionally
				<code>open={false}</code> on the inset or floating variant.
			</p>
		</div>
		<div class="rounded-lg border border-background-muted bg-background-light p-3">
			<p class="text-sm font-semibold text-foreground">Docs prose is page layout</p>
			<p class="mt-1 text-xs leading-5 text-foreground/65">
				It is mainly <code>contentWidth="prose"</code> plus larger PageShell padding, not a separate AppShell
				shape.
			</p>
		</div>
	</div>

	<div class="h-[620px] w-full">
		<AppShell
			{sidebar}
			title={selectedRecipe.title}
			subtitle={selectedRecipe.description}
			eyebrow={`${selectedRecipe.sidebar.variant} / ${selectedRecipe.sidebar.collapsible}`}
			{headerActions}
			contentPadding={selectedRecipe.contentPadding}
			contentWidth={selectedRecipe.contentWidth}
			mobileActionCount={1}
			pageShellClass="h-full"
			pageShellTheme={selectedRecipe.pageShellTheme}
			theme={{ root: { base: 'h-full !min-h-0 overflow-hidden' } }}
		>
			{#snippet children()}
				<div class="grid gap-4">
					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground">Recipe anatomy</p>
						<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
							{#each [['Sidebar', selectedRecipe.sidebar.variant], ['Collapse', selectedRecipe.sidebar.collapsible], ['Rail', selectedRecipe.sidebar.rail ? 'edge toggle' : 'none'], ['Content', selectedRecipe.contentWidth]] as detail}
								<div class="rounded-md border border-background-muted bg-background p-3">
									<p class="text-xs font-medium uppercase tracking-normal text-foreground/50">
										{detail[0]}
									</p>
									<p class="mt-2 text-sm font-semibold text-foreground">{detail[1]}</p>
								</div>
							{/each}
						</div>
					</section>

					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground">Primary surface</p>
						<p class="mt-3 text-sm leading-6 text-foreground/70">
							{selectedRecipe.description} This preview keeps the same AppShell component and only switches
							Sidebar and PageShell props.
						</p>
						<div class="mt-5 grid gap-3 sm:grid-cols-3">
							{#each ['Pipeline', 'Quality', 'Velocity'] as metric, index}
								<div class="rounded-md border border-background-muted bg-background p-3">
									<p class="text-sm text-foreground/60">{metric}</p>
									<p class="mt-2 text-2xl font-semibold text-foreground">{82 + index * 6}%</p>
								</div>
							{/each}
						</div>
					</section>
				</div>
			{/snippet}
		</AppShell>
	</div>
</div>
