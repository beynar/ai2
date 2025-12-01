<script lang="ts">
	import { Breadcrumbs } from '$lib/components/Breadcrumbs/index.js';
	import type { BreadcrumbItem } from '$lib/components/Breadcrumbs/breadcrumbs.props.js';
	import type { MenuItem } from '$lib/components/Menu/menu.props.js';
	import Card from '$lib/components/Card/Card.svelte';
</script>

{#snippet productsLabel()}
	<strong>Products</strong>
{/snippet}

<div class="space-y-8 p-8">
	<h1 class="mb-8 text-4xl font-bold">Breadcrumbs Component</h1>

	<!-- Basic Breadcrumbs -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Basic Breadcrumbs</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Electronics', href: '/products/electronics', active: true }
				]}
			/>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Electronics', href: '/products/electronics', active: true }
				]}
			>
				{#snippet item(britem)}
					{#if britem.label === 'Electronics'}
						<strong>{britem.label}</strong>
					{:else}
						yo
					{/if}
				{/snippet}
			</Breadcrumbs>
		</Card>
	</section>

	<!-- Breadcrumbs with Home Prop -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Breadcrumbs with Home Prop</h2>
		<Card>
			<Breadcrumbs
				home={{ label: 'Home', href: '/' }}
				items={[
					{ label: 'Products', href: '/products' },
					{ label: 'Electronics', href: '/products/electronics', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Breadcrumbs with Active State -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Breadcrumbs with Active State</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'About', href: '/about' },
					{ label: 'Team', href: '/about/team', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Breadcrumbs with Disabled Items -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Breadcrumbs with Disabled Items</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products', disabled: true },
					{ label: 'Details', href: '/products/details', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Custom Separator -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Custom Separator</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Details', href: '/products/details', active: true }
				]}
			>
				{#snippet separator()}
					<span class="text-contrast-muted">›</span>
				{/snippet}
			</Breadcrumbs>
		</Card>
	</section>

	<!-- Without Separators -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Without Separators</h2>
		<Card>
			<Breadcrumbs
				showSeparator={false}
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Details', href: '/products/details', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Breadcrumbs with Dropdown Menus -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Breadcrumbs with Dropdown Menus</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{
						label: 'Products',
						menu: [
							{ type: 'option', children: 'All Products', href: '/products' },
							{
								type: 'option',
								children: 'Electronics',
								href: '/products/electronics'
							},
							{ type: 'option', children: 'Clothing', href: '/products/clothing' }
						] as MenuItem[]
					},
					{ label: 'Electronics', href: '/products/electronics', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Long Breadcrumb Path -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Long Breadcrumb Path</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Category', href: '/category' },
					{ label: 'Subcategory', href: '/category/subcategory' },
					{ label: 'Product', href: '/category/subcategory/product' },
					{ label: 'Details', href: '/category/subcategory/product/details', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Breadcrumbs with Ellipsis -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Breadcrumbs with Ellipsis</h2>
		<div class="space-y-4">
			<Card>
				<p class="text-contrast-muted mb-2 text-sm">
					Using maxItems prop (shows first + last 2 items):
				</p>
				<Breadcrumbs
					maxItems={3}
					home={{ href: '/' }}
					items={[
						{ label: 'Category 1', href: '/cat1' },
						{ label: 'Category 2', href: '/cat2' },
						{ label: 'Category 3', href: '/cat3' },
						{ label: 'Category 4', href: '/cat4' },
						{ label: 'Current Page', href: '/current', active: true }
					]}
				/>
			</Card>
			<Card>
				<p class="text-contrast-muted mb-2 text-sm">Very long path with ellipsis:</p>
				<Breadcrumbs
					maxItems={2}
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Products', href: '/products' },
						{ label: 'Electronics', href: '/products/electronics' },
						{ label: 'Computers', href: '/products/electronics/computers' },
						{ label: 'Laptops', href: '/products/electronics/computers/laptops' },
						{ label: 'Gaming', href: '/products/electronics/computers/laptops/gaming' },
						{ label: 'Current', href: '/current', active: true }
					]}
				/>
			</Card>
			<Card>
				<p class="text-contrast-muted mb-2 text-sm">
					Edge case: maxItems >= items.length (shows all items, no ellipsis):
				</p>
				<Breadcrumbs
					maxItems={5}
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Products', href: '/products' },
						{ label: 'Electronics', href: '/products/electronics', active: true }
					]}
				/>
			</Card>
		</div>
	</section>

	<!-- Custom Item Rendering with Snippets -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Custom Item Rendering with Snippets</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{
						label: productsLabel,
						href: '/products'
					},
					{ label: 'Details', href: '/products/details', active: true }
				]}
			/>
		</Card>
	</section>

	<!-- Simple String Items -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Simple String Items</h2>

		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Electronics', href: '/products/electronics' }
				]}
			/>
		</Card>
	</section>

	<!-- Mixed Items (Strings and Configs) -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Mixed Items</h2>
		<Card>
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Electronics', href: '/products/electronics' },
					{ label: 'Details', href: '/products/details', active: true }
				]}
			/>
		</Card>
	</section>
</div>
