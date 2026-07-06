<script lang="ts">
	import {
		Sidebar,
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

	let open = $state(true);
	let selectedRecipeId = $state('sidebar');

	const variantRecipes: VariantRecipe[] = [
		{ id: 'sidebar', label: 'sidebar', variant: 'sidebar' },
		{ id: 'floating', label: 'floating', variant: 'floating' },
		{ id: 'inset', label: 'inset', variant: 'inset' },
		{ id: 'split', label: 'split', variant: 'split' }
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

<div class="flex h-[500px] w-full flex-col gap-3">
	<div class="flex flex-wrap items-center justify-center gap-2">
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

	<div
		class="min-h-0 flex-1 overflow-hidden rounded-lg border border-background-muted bg-background-muted"
	>
		<Sidebar
			bind:open
			{items}
			variant={selectedRecipe.variant}
			collapsible="icon"
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
