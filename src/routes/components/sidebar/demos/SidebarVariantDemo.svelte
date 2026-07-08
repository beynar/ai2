<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import {
		Sidebar,
		type SidebarCollapsible,
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

	let open = $state(true);
	let selectedRecipeId = $state('sidebar');
	let collapsedState = $state<Exclude<DemoState, 'expanded'>>('icon');

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
	const sidebarState = $derived<DemoState>(open ? 'expanded' : collapsedState);
	const sidebarCollapsible = $derived<SidebarCollapsible>(
		collapsedState === 'hidden' ? 'offcanvas' : 'icon'
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
			open = true;
			return;
		}

		collapsedState = nextState;
		open = false;
	}
</script>

<div class="flex h-[500px] w-full flex-col gap-3">
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Sidebar variant">
			{#each variantRecipes as recipe}
				<Button
					variant={selectedRecipeId === recipe.id ? 'solid' : 'outline'}
					size="small"
					onClick={() => (selectedRecipeId = recipe.id)}
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

	<div
		class="min-h-0 flex-1 overflow-hidden rounded-lg border border-background-muted bg-background-muted"
	>
		<Sidebar
			bind:open
			{items}
			variant={selectedRecipe.variant}
			collapsible={sidebarCollapsible}
			frame="contained"
			rail
			width="16rem"
			widthIcon="3.5rem"
			headerButton={{
				icon: commandIcon,
				title: 'Variant Lab',
				subtitle: selectedRecipe.label
			}}
		>
			{#snippet children()}
				<div class="grid h-full min-w-0 place-items-center bg-background p-8">
					<div class="grid w-full max-w-2xl gap-3">
						<Skeleton color="primary" class="h-3 w-11/12 rounded-full" />
						<Skeleton class="h-3 w-8/12 rounded-full" />
						<Skeleton class="h-3 w-full rounded-full" />
						<Skeleton color="primary" class="h-3 w-7/12 rounded-full" />
					</div>
				</div>
			{/snippet}
		</Sidebar>
	</div>
</div>
