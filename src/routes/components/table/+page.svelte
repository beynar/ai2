<script lang="ts">
	import { Table } from '$lib/components/Table/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import { TextInput } from '$lib/components/Form/TextInput/index.js';
	import type { TableCell, TableRow } from '$lib/components/Table/index.js';

	// Simplified syntax with strings
	const basicHeader = {
		name: 'Name',
		email: 'Email',
		role: 'Role'
	};

	const basicRows: TableRow[] = [
		{
			cells: {
				name: 'John Doe',
				email: 'john@example.com',
				role: 'Admin'
			}
		},
		{
			cells: {
				name: 'Jane Smith',
				email: 'jane@example.com',
				role: 'User'
			}
		},
		{
			cells: {
				name: 'Bob Johnson',
				email: 'bob@example.com',
				role: 'Editor'
			}
		}
	];

	const salesHeader = {
		product: 'Product',
		quantity: 'Quantity',
		price: 'Price',
		total: 'Total'
	};

	const salesRows: TableRow[] = [
		{
			cells: {
				product: 'Laptop',
				quantity: '2',
				price: '$999',
				total: '$1,998'
			}
		},
		{
			cells: {
				product: 'Mouse',
				quantity: '5',
				price: '$25',
				total: '$125'
			}
		},
		{
			cells: {
				product: 'Keyboard',
				quantity: '3',
				price: '$75',
				total: '$225'
			}
		}
	];

	const salesFooter = {
		product: { content: 'Total', class: 'font-bold' },
		quantity: { content: '10', class: 'font-bold' },
		price: '',
		total: { content: '$2,348', class: 'font-bold' }
	};

	const customHeader = {
		status: { content: 'Status', class: 'w-24' },
		description: { content: 'Description' },
		date: { content: 'Date', class: 'w-32' }
	};

	const customRows: TableRow[] = [
		{
			cells: {
				status: { content: 'Active', class: 'text-success' },
				description: { content: 'System is running normally' },
				date: { content: '2024-01-15' }
			}
		},
		{
			cells: {
				status: { content: 'Warning', class: 'text-warning' },
				description: { content: 'High CPU usage detected' },
				date: { content: '2024-01-14' }
			},
			class: 'bg-warning/10'
		},
		{
			cells: {
				status: { content: 'Error', class: 'text-danger' },
				description: { content: 'Service unavailable' },
				date: { content: '2024-01-13' }
			},
			class: 'bg-danger/10'
		}
	];
</script>

<div class="mx-auto max-w-6xl space-y-12 p-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold">Table Component</h1>
		<p class="text-contrast/70 mb-8">
			A flexible table component for displaying structured data with support for headers, footers,
			and customizable rows.
		</p>
	</div>

	<!-- Basic Table -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Basic Table</h2>
			<p class="text-contrast/70 text-sm">
				Simple table with header and rows using simplified string syntax.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table header={basicHeader} rows={basicRows} />
		</div>
	</section>

	<!-- Table with Mixed Formats -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Mixed Cell Formats</h2>
			<p class="text-contrast/70 text-sm">
				Demonstrates using strings, snippets, and full objects for cells.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			{#snippet statusBadge()}
				<span class="text-success">✓ Active</span>
			{/snippet}
			<Table
				header={{
					name: 'Name',
					status: { content: statusBadge },
					date: { content: 'Date', class: 'w-32' }
				}}
				rows={[
					{
						cells: {
							name: 'John Doe',
							status: statusBadge,
							date: '2024-01-15'
						}
					}
				]}
			/>
		</div>
	</section>

	<!-- Table with Footer -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Footer</h2>
			<p class="text-contrast/70 text-sm">
				Table with header, rows, and footer for totals or summaries.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table header={salesHeader} rows={salesRows} footer={salesFooter} />
		</div>
	</section>

	<!-- Table with Caption -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Caption</h2>
			<p class="text-contrast/70 text-sm">Table with a caption for accessibility and context.</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table caption="User Management Table" header={basicHeader} rows={basicRows}></Table>
		</div>
	</section>

	<!-- Table with Prefix and Suffix -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Prefix and Suffix</h2>
			<p class="text-contrast/70 text-sm">
				Table with prefix (for search/filter) and suffix (for pagination) slots.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table header={basicHeader} rows={basicRows}>
				{#snippet prefix()}
					<div class="mb-4">
						<TextInput placeholder="Search users..." />
					</div>
				{/snippet}
				{#snippet suffix()}
					<div class="mt-4 flex items-center justify-between">
						<span class="text-contrast/70 text-sm">Showing 1-3 of 3</span>
						<div class="flex gap-2">
							<Button size="small" variant="outline">Previous</Button>
							<Button size="small" variant="outline">Next</Button>
						</div>
					</div>
				{/snippet}
			</Table>
		</div>
	</section>

	<!-- Table with Custom Row Content -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Custom Row Content</h2>
			<p class="text-contrast/70 text-sm">
				Table using custom row content slots for flexible rendering (mixing cells array and content
				slot).
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			{#snippet customRow1()}
				<td>Custom Row 1</td>
				<td>Custom Content</td>
				<td>
					<Button size="small">Action</Button>
				</td>
			{/snippet}
			<Table
				header={{
					item: 'Item',
					description: 'Description',
					actions: 'Actions'
				}}
				rows={[
					{ content: customRow1 },
					{
						cells: {
							item: 'Standard Row',
							description: 'Standard Content',
							actions: 'Standard Action'
						}
					}
				]}
			/>
		</div>
	</section>

	<!-- Table with Custom Classes -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Table with Custom Classes</h2>
			<p class="text-contrast/70 text-sm">
				Table with custom CSS classes on cells and rows for styling.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table header={customHeader} rows={customRows} />
		</div>
	</section>

	<!-- Complete Example -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Complete Example</h2>
			<p class="text-contrast/70 text-sm">
				Table with all features: header, rows, footer, caption, prefix, and suffix.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Table header={salesHeader} rows={salesRows} footer={salesFooter}>
				{#snippet caption()}
					Sales Report - January 2024
				{/snippet}
				{#snippet prefix()}
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-semibold">Sales Overview</h3>
						<Button size="small">Export</Button>
					</div>
				{/snippet}
				{#snippet suffix()}
					<div class="mt-4 flex items-center justify-between border-t pt-4">
						<span class="text-contrast/70 text-sm">Total items: 3</span>
						<div class="flex gap-2">
							<Button size="small" variant="outline">Previous</Button>
							<Button size="small" variant="outline">Next</Button>
						</div>
					</div>
				{/snippet}
			</Table>
		</div>
	</section>
</div>
