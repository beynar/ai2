<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import DataTableBasicDemo from './DataTableBasicDemo.svelte';
	import DataTableEditingDemo from './DataTableEditingDemo.svelte';
	import DataTableGroupingDemo from './DataTableGroupingDemo.svelte';
	import DataTableLargeDemo from './DataTableLargeDemo.svelte';
	import DataTableManualDemo from './DataTableManualDemo.svelte';
	import {
		basicDataTableCode,
		editingDataTableCode,
		gridDataTableCode,
		groupingDataTableCode,
		manualDataTableCode
	} from './codeSnippets.js';
</script>

<DocPage
	title="Data table"
	subtitle="A typed, virtualized data surface for sorting, filtering, editing, and large datasets."
	component="DataTable"
	features={[
		'Client and manual processing contracts',
		'Rows always virtualized',
		'Sorting, filters, grouping, and aggregation',
		'Selection, expansion, and async editing',
		'Column ordering, sizing, visibility, and pinning',
		'Semantic table or keyboard grid interaction'
	]}
>
	<section class="grid gap-3">
		<h2 class="text-foreground text-xl font-semibold">Table or DataTable?</h2>
		<p class="text-foreground-muted max-w-3xl text-sm leading-6">
			Use <code>Table</code> for static tabular content. Use <code>DataTable</code> when rows need
			stable identity, processing state, virtualization, or interactive columns. DataTable requires
			both <code>getRowId</code> and a bounded <code>height</code> so neither contract is guessed.
		</p>
	</section>

	<ComponentCard
		title="Semantic client table"
		description="Native table semantics with global search, typed column filters, multi-sort, pagination, resizing, visibility, ordering, and pinning."
		code={basicDataTableCode}
		class="min-h-0 items-stretch p-3 md:p-5"
	>
		<div class="w-full">
			<DataTableBasicDemo />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Selection and async editing"
			description="Select rows, expand details, or double-click editable cells. Commits update optimistically while the table indicator tracks the request; clearing a name demonstrates rollback and the rejected state."
			code={editingDataTableCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<div class="w-full">
				<DataTableEditingDemo />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Grouping and column controls"
			description="The initial department grouping exposes disclosure rows, child counts, and configured aggregate values. Header menus control grouping, pinning, visibility, and width."
			code={groupingDataTableCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<div class="w-full">
				<DataTableGroupingDemo />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Manual server state"
			description="A simulated endpoint receives the complete state object and returns only the processed current page plus rowCount. Loading drives the table indicator, and stable rows use opt-in FLIP movement."
			code={manualDataTableCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<div class="w-full">
				<DataTableManualDemo />
			</div>
		</ComponentCard>

		<ComponentCard
			title="ARIA grid with 50,000 rows"
			description="Grid interaction adds roving cell focus and center-column virtualization. Pinned columns remain mounted while the viewport keeps the row DOM bounded."
			code={gridDataTableCode}
			class="min-h-0 items-stretch p-3 md:p-5"
		>
			<div class="w-full">
				<DataTableLargeDemo />
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
