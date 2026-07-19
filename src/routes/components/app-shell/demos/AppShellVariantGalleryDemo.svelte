<script lang="ts">
	import {
		AppShell,
		type AppShellActions,
		type AppShellSidebarProps,
		type AppShellThemeProps
	} from '$lib/components/AppShell/index.js';
	import type { SidebarGroup, SidebarVariant } from '$lib/components/Sidebar/index.js';
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
		variant: SidebarVariant;
		contentWidth: 'full' | 'narrow' | 'normal' | 'wide' | 'prose';
		contentPadding: 'none' | 'small' | 'normal' | 'large';
		sidebar: Pick<AppShellSidebarProps, 'collapsible' | 'rail' | 'width' | 'widthIcon'>;
		items: SidebarGroup[];
	};

	let selectedRecipeId = $state('inset');
	let sidebarWidth = $state('16rem');

	const previewAppShellTheme = {
		root: {
			base: 'h-full min-h-full overflow-auto rounded-lg border border-background-muted'
		}
	} satisfies AppShellThemeProps;

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
			variant: 'admin',
			contentWidth: 'full',
			contentPadding: 'normal',
			sidebar: {
				collapsible: 'none',
				width: '16rem'
			},
			items: productGroups
		},
		{
			id: 'inset',
			name: 'Inset workspace',
			description: 'Content is inset over the dark application wall beside integrated navigation.',
			title: 'Revenue cockpit',
			variant: 'inset',
			contentWidth: 'wide',
			contentPadding: 'normal',
			sidebar: { collapsible: 'icon', rail: true, width: '16rem' },
			items: productGroups
		},
		{
			id: 'floating',
			name: 'Floating console',
			description: 'Detached navigation with dense command-style content.',
			title: 'Command center',
			variant: 'floating',
			contentWidth: 'normal',
			contentPadding: 'small',
			sidebar: { collapsible: 'icon', rail: true, width: '15rem' },
			items: productGroups
		},
		{
			id: 'split',
			name: 'Split panels',
			description: 'Detached sidebar and content surfaces share the same lower application wall.',
			title: 'Component browser',
			variant: 'split',
			contentWidth: 'normal',
			contentPadding: 'normal',
			sidebar: { collapsible: 'icon', rail: true, width: '17rem' },
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
		width: sidebarWidth,
		widthIcon: selectedRecipe.sidebar.widthIcon ?? '3.5rem',
		resizable: {
			minWidth: '12rem',
			maxWidth: '24rem',
			onWidthChange: (nextWidth) => {
				sidebarWidth = nextWidth;
			}
		},
		headerButton: {
			icon: commandIcon,
			title: selectedRecipe.name,
			subtitle: 'Workspace'
		}
	});

	function selectRecipe(recipe: VariantRecipe) {
		selectedRecipeId = recipe.id;
		sidebarWidth = recipe.sidebar.width ?? '16rem';
	}
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
				onclick={() => selectRecipe(recipe)}
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
				<code>displayState="collapsed"</code> on the inset, floating, or split variant.
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
			variant={selectedRecipe.variant}
			title={selectedRecipe.title}
			subtitle={selectedRecipe.description}
			eyebrow={`${selectedRecipe.variant} / ${selectedRecipe.sidebar.collapsible}`}
			{headerActions}
			contentPadding={selectedRecipe.contentPadding}
			contentWidth={selectedRecipe.contentWidth}
			mobileActionCount={1}
			theme={previewAppShellTheme}
		>
			{#snippet children()}
				<div class="grid gap-4">
					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground">Recipe anatomy</p>
						<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
							{#each [['Sidebar', selectedRecipe.variant], ['Collapse', selectedRecipe.sidebar.collapsible], ['Rail', selectedRecipe.sidebar.rail ? 'edge toggle' : 'none'], ['Content', selectedRecipe.contentWidth]] as detail}
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
