<script lang="ts">
	import { AppShell, type AppShellSidebarProps } from '$lib/components/AppShell/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import {
		type SidebarCollapsible,
		type SidebarDisplayState,
		type SidebarGroup,
		type SidebarVariant
	} from '$lib/components/Sidebar/index.js';
	import { Skeleton } from '$lib/components/Skeleton/index.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	type VariantRecipe = {
		id: string;
		label: string;
		variant: SidebarVariant;
	};
	type DemoState = 'expanded' | 'icon' | 'hidden';

	let sidebarDisplayState = $state<SidebarDisplayState>('expanded');
	let selectedRecipeId = $state('sidebar');
	let sidebarCollapsedDisplayState = $state<Exclude<SidebarDisplayState, 'expanded'>>('collapsed');
	let sidebarWidth = $state('16rem');

	const variantRecipes: VariantRecipe[] = [
		{ id: 'sidebar', label: 'sidebar', variant: 'sidebar' },
		{ id: 'floating', label: 'floating', variant: 'floating' },
		{ id: 'inset', label: 'inset', variant: 'inset' },
		{ id: 'split', label: 'split', variant: 'split' }
	];
	const demoStates: DemoState[] = ['expanded', 'icon', 'hidden'];

	const selectedRecipe = $derived(
		variantRecipes.find((recipe) => recipe.id === selectedRecipeId) ?? variantRecipes[0]
	);
	const sidebarState = $derived<DemoState>(
		sidebarDisplayState === 'collapsed' ? 'icon' : sidebarDisplayState
	);
	const sidebarCollapsible = $derived<SidebarCollapsible>(
		sidebarCollapsedDisplayState === 'hidden' ? 'offcanvas' : 'icon'
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

	function setSidebarState(nextState: DemoState) {
		if (nextState === 'expanded') {
			sidebarDisplayState = 'expanded';
			return;
		}

		const nextDisplayState = nextState === 'icon' ? 'collapsed' : 'hidden';
		sidebarCollapsedDisplayState = nextDisplayState;
		sidebarDisplayState = nextDisplayState;
	}

	function handleSidebarDisplayStateChange(nextDisplayState: SidebarDisplayState) {
		sidebarDisplayState = nextDisplayState;
		if (nextDisplayState !== 'expanded') {
			sidebarCollapsedDisplayState = nextDisplayState;
		}
	}

	function selectRecipe(recipe: VariantRecipe) {
		selectedRecipeId = recipe.id;
		sidebarWidth =
			recipe.variant === 'floating' ? '15rem' : recipe.variant === 'split' ? '17rem' : '16rem';
	}

	const sidebar = $derived<AppShellSidebarProps>({
		items,
		displayState: sidebarDisplayState,
		onDisplayStateChange: handleSidebarDisplayStateChange,
		variant: selectedRecipe.variant,
		collapsible: sidebarCollapsible,
		rail: true,
		width: sidebarWidth,
		widthIcon: '3.5rem',
		resizable: {
			minWidth: '12rem',
			maxWidth: '24rem',
			collapseThreshold: '10.5rem',
			onWidthChange: (nextWidth) => {
				sidebarWidth = nextWidth;
			}
		},
		headerButton: {
			icon: commandIcon,
			title: 'Variant Lab',
			subtitle: selectedRecipe.label
		}
	});
</script>

<div class="flex h-[560px] w-full flex-col gap-3">
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Sidebar variant">
			{#each variantRecipes as recipe}
				<Button
					variant={selectedRecipeId === recipe.id ? 'solid' : 'outline'}
					size="small"
					onClick={() => selectRecipe(recipe)}
				>
					{recipe.label}
				</Button>
			{/each}
		</div>

		<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Sidebar state">
			{#each demoStates as state}
				<Button
					variant={sidebarState === state ? 'solid' : 'outline'}
					size="small"
					onClick={() => setSidebarState(state)}
				>
					{state}
				</Button>
			{/each}
		</div>
	</div>

	<div class="min-h-0 flex-1">
		<AppShell
			{sidebar}
			title="Variant Lab"
			subtitle="The page host and wall are painted by AppShell defaults."
			eyebrow={`${selectedRecipe.label} / ${sidebarState}`}
			contentPadding="normal"
			contentWidth="normal"
			frame="contained"
			theme={{
				root: {
					base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted'
				}
			}}
		>
			{#snippet children()}
				<div class="grid min-h-[22rem] place-items-center">
					<div class="grid w-full max-w-2xl gap-3">
						<Skeleton color="primary" class="h-3 w-11/12 rounded-full" />
						<Skeleton class="h-3 w-8/12 rounded-full" />
						<Skeleton class="h-3 w-full rounded-full" />
						<Skeleton color="primary" class="h-3 w-7/12 rounded-full" />
					</div>
				</div>
			{/snippet}
		</AppShell>
	</div>
</div>
