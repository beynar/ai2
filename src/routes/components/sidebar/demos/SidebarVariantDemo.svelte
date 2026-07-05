<script lang="ts">
	import {
		Sidebar,
		type SidebarGroup,
		type SidebarThemeProps,
		type SidebarVariant
	} from '$lib/components/Sidebar/index.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { sidebarIcon } from '$lib/components/Icons/sidebar.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

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
</script>

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
							class="border-background-muted inline-flex h-8 items-center rounded-md border px-3 text-sm font-medium transition {selectedRecipeId ===
							recipe.id
								? 'bg-primary text-primary-contrast'
								: 'bg-background text-foreground hover:bg-background-muted'}"
							aria-pressed={selectedRecipeId === recipe.id}
							onclick={() => (selectedRecipeId = recipe.id)}
						>
							{recipe.label}
						</button>
					{/each}
				</div>

				<div class="grid flex-1 gap-4 p-4 md:grid-cols-3">
					{#each ['Shell', 'Content', 'Chrome'] as label}
						<div class="border-background-muted bg-background rounded-lg border p-4">
							<p class="text-sm font-medium text-foreground">{label}</p>
							<p class="mt-2 text-sm text-foreground/60">
								Current variant: <span class="font-medium text-primary">{selectedRecipe.label}</span
								>
							</p>
						</div>
					{/each}
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>
