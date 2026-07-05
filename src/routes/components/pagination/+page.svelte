<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import type {
		PaginationItemAriaLabel,
		PaginationPageItemPayload,
		PaginationSummaryPayload
	} from '$lib/components/Pagination/pagination.props.js';
	import { colors, sizes } from '$lib/utils/tokens.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const variants = ['solid', 'outline', 'soft', 'ghost'] as const;
	const invoiceHeader = {
		id: 'Invoice',
		customer: 'Customer',
		status: 'Status'
	};
	const invoiceRows = [
		{
			cells: {
				id: 'INV-1048',
				customer: 'Ada Lovelace',
				status: 'Paid'
			}
		},
		{
			cells: {
				id: 'INV-1049',
				customer: 'Grace Hopper',
				status: 'Pending'
			}
		},
		{
			cells: {
				id: 'INV-1050',
				customer: 'Katherine Johnson',
				status: 'Paid'
			}
		}
	];

	let page = $state(6);
	let compactPage = $state(18);
	let tablePage = $state(2);
	let linkedPage = $state(3);
	let itemCountPage = $state(4);

	const getHref = (nextPage: number) => `/components/pagination?page=${nextPage}`;
	const getFrenchPaginationLabel = (item: PaginationItemAriaLabel) => {
		if (item.type === 'page') {
			return item.active ? `Page ${item.page}, page courante` : `Aller a la page ${item.page}`;
		}

		const labelByType: Record<Exclude<PaginationItemAriaLabel['type'], 'page'>, string> = {
			first: 'Aller a la premiere page',
			previous: 'Aller a la page precedente',
			next: 'Aller a la page suivante',
			last: 'Aller a la derniere page'
		};

		return labelByType[item.type];
	};
</script>

<DocPage
	title="Pagination"
	subtitle="Accessible page navigation for lists, tables, and routed result pages."
	component="Pagination"
	features={[
		'Bindable one-based page',
		'Ellipsis windowing',
		'Button or anchor controls',
		'Localized aria labels'
	]}
>
	<ComponentCard
		description="A controlled pagination bar with previous and next controls."
		code={`<Pagination bind:page totalPages={20} />`}
	>
		<div class="flex w-full flex-col items-center justify-center gap-4">
			<Pagination bind:page totalPages={20} />
			<Chip color="background" variant="soft">Page {page} of 20</Chip>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Size tokens adjust control dimensions." class="!min-h-fit">
			<div class="flex flex-col items-center gap-5">
				{#each sizes as size}
					<Pagination {size} page={3} totalPages={8} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Variants keep pagination aligned with nearby controls."
			class="!min-h-fit"
		>
			<div class="flex flex-col items-center gap-5">
				{#each variants as variant}
					<Pagination {variant} color="primary" page={4} totalPages={9} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Semantic colors use the active page and hover token."
			class="!min-h-fit"
		>
			<div class="grid gap-4">
				{#each colors as color}
					<Pagination {color} page={2} totalPages={5} siblingCount={0} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Compact mode hides siblings but preserves boundaries."
			class="!min-h-fit"
		>
			<div class="flex flex-col items-center gap-4">
				<Pagination
					bind:page={compactPage}
					totalPages={40}
					siblingCount={0}
					boundaryCount={1}
					size="small"
				/>
				<Chip color="background" variant="soft">Page {compactPage} of 40</Chip>
			</div>
		</ComponentCard>

		<ComponentCard
			description="First and last controls can be enabled when the page count is high."
		>
			<Pagination page={12} totalPages={80} showFirstLast />
		</ComponentCard>

		<ComponentCard
			description="Totals can derive page count and render a range summary."
			class="!min-h-fit"
		>
			<Pagination bind:page={itemCountPage} totalItems={96} pageSize={10} showSummary>
				{#snippet summary(range: PaginationSummaryPayload)}
					<Chip color="background" variant="soft">
						{range.startItem}-{range.endItem} of {range.totalItems} invoices
					</Chip>
				{/snippet}
			</Pagination>
		</ComponentCard>

		<ComponentCard
			description="Page item content can be customized through the pageItem slot."
			class="!min-h-fit"
		>
			<Pagination page={8} totalPages={14}>
				{#snippet pageItem(item: PaginationPageItemPayload)}
					<span class="tabular-nums">{item.active ? 'p.' : ''}{item.page}</span>
				{/snippet}
			</Pagination>
		</ComponentCard>

		<ComponentCard
			description="A default child snippet can replace the renderer while reusing pagination state."
			class="!min-h-fit"
		>
			<Pagination bind:page={itemCountPage} totalPages={10}>
				{#snippet children(pagination)}
					<div class="flex items-center gap-3">
						<button
							type="button"
							class="text-foreground-muted hover:text-foreground text-sm font-medium disabled:opacity-45"
							disabled={pagination.isPreviousDisabled}
							onclick={pagination.previous}
						>
							Previous
						</button>
						<Chip color="background" variant="soft">
							Page {pagination.currentPage} of {pagination.pageCount}
						</Chip>
						<button
							type="button"
							class="text-foreground-muted hover:text-foreground text-sm font-medium disabled:opacity-45"
							disabled={pagination.isNextDisabled}
							onclick={pagination.next}
						>
							Next
						</button>
					</div>
				{/snippet}
			</Pagination>
		</ComponentCard>

		<ComponentCard
			description="Controls can render as anchors for routed pagination."
			class="!min-h-fit"
		>
			<div class="flex flex-col items-center gap-4">
				<Pagination bind:page={linkedPage} totalPages={10} {getHref} />
				<Chip color="background" variant="soft">
					Next links point at {getHref(Math.min(linkedPage + 1, 10))}
				</Chip>
			</div>
		</ComponentCard>

		<ComponentCard description="aria labels can be localized without changing visible content.">
			<Pagination
				page={3}
				totalPages={9}
				ariaLabel="Pagination des factures"
				getItemAriaLabel={getFrenchPaginationLabel}
			/>
		</ComponentCard>

		<ComponentCard description="Composable inside a Table suffix without table-specific coupling.">
			<Table header={invoiceHeader} items={invoiceRows}>
				{#snippet suffix()}
					<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
						<Pagination
							bind:page={tablePage}
							totalItems={72}
							pageSize={9}
							size="small"
							siblingCount={0}
							showSummary
						>
							{#snippet summary(range: PaginationSummaryPayload)}
								<Chip color="background" variant="soft">
									Showing {range.startItem}-{range.endItem} of {range.totalItems}
								</Chip>
							{/snippet}
						</Pagination>
					</div>
				{/snippet}
			</Table>
		</ComponentCard>
	{/snippet}
</DocPage>
