<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Grid, GridSpan } from '$lib/components/Grid/index.js';
	import { Stack } from '$lib/components/Stack/index.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { checksIcon } from '$lib/components/Icons/checks.js';
	import { usersThreeIcon } from '$lib/components/Icons/usersThree.js';
</script>

<DocPage
	title="GridSpan"
	subtitle="Lets a direct grid child occupy multiple columns or implicit rows."
	component="GridSpan"
	features={[
		'Numeric column spans',
		'Full-row spanning',
		'Implicit row spans',
		'Min-width overflow protection',
		'Semantic attributes and attachments'
	]}
>
	<ComponentCard
		description="A compact dashboard using both column and row spans."
		class="min-h-[500px]"
		code={`<Grid columns={{ minWidth: 110, max: 4, repeat: 'fit' }} rowHeight={64} gap={3}>
	<GridSpan columns={2} rows={3}>Overview</GridSpan>
	<GridSpan columns={2}>Team</GridSpan>
	<GridSpan columns={2} rows={2}>Tasks</GridSpan>
	<GridSpan columns="full">Status</GridSpan>
</Grid>`}
	>
		<Grid
			columns={{ minWidth: 110, max: 4, repeat: 'fit' }}
			rowHeight={64}
			gap={3}
			width="100%"
			maxWidth={860}
		>
			<GridSpan columns={2} rows={3}>
				<Stack
					justify="between"
					padding={4}
					class="bg-primary/12 border-primary/25 h-full rounded-lg border"
				>
					<Stack orientation="horizontal" justify="between" align="center">
						<span class="text-primary text-xs font-semibold">Overview</span>
						<span class="text-primary">{@render chartBarIcon({ class: 'size-5' })}</span>
					</Stack>
					<Stack gap={1}>
						<strong class="text-neutral text-3xl">74%</strong>
						<span class="text-neutral/60 text-xs">Quarterly target</span>
					</Stack>
				</Stack>
			</GridSpan>
			<GridSpan columns={2}>
				<Stack
					orientation="horizontal"
					gap={3}
					align="center"
					padding={3}
					class="bg-success/12 border-success/25 h-full rounded-lg border"
				>
					<span class="text-success">{@render usersThreeIcon({ class: 'size-5' })}</span>
					<Stack gap={0.5}>
						<strong class="text-neutral text-sm">18 members</strong>
						<span class="text-neutral/60 text-xs">3 online now</span>
					</Stack>
				</Stack>
			</GridSpan>
			<GridSpan columns={2} rows={2}>
				<Stack
					orientation="horizontal"
					gap={3}
					align="center"
					padding={3}
					class="bg-warning/12 border-warning/25 h-full rounded-lg border"
				>
					<span class="text-warning">{@render checksIcon({ class: 'size-5' })}</span>
					<Stack gap={0.5}>
						<strong class="text-neutral text-sm">32 completed</strong>
						<span class="text-neutral/60 text-xs">8 remaining</span>
					</Stack>
				</Stack>
			</GridSpan>
			<GridSpan columns="full">
				<Stack
					orientation="horizontal"
					justify="between"
					align="center"
					paddingInline={3}
					class="border-neutral-muted bg-surface h-full rounded-lg border"
				>
					<span class="text-neutral text-xs font-medium">Systems operational</span>
					<span class="bg-success size-2 rounded-full"></span>
				</Stack>
			</GridSpan>
		</Grid>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Column spans"
			description="Mix ordinary grid children with wider featured regions."
			code={`<Grid columns={4} gap={3}>
	<GridSpan columns={2}>Two columns</GridSpan>
	<div>One</div>
	<div>One</div>
</Grid>`}
		>
			<Grid columns={4} gap={3} width="100%" maxWidth={760}>
				<GridSpan columns={2}>
					<div class="bg-primary/15 text-primary rounded-md p-5 text-center text-sm font-medium">
						Two columns
					</div>
				</GridSpan>
				<div class="bg-surface-raised text-neutral rounded-md p-5 text-center text-sm">One</div>
				<div class="bg-surface-raised text-neutral rounded-md p-5 text-center text-sm">One</div>
			</Grid>
		</ComponentCard>

		<ComponentCard
			title="Full row"
			description="Use full when an item should cross every explicit grid track."
			code={`<Grid columns={3} gap={3}>
	<GridSpan columns="full">Summary</GridSpan>
	<div>Detail</div>
	<div>Detail</div>
	<div>Detail</div>
</Grid>`}
		>
			<Grid columns={3} gap={3} width="100%" maxWidth={720}>
				<GridSpan columns="full">
					<div class="bg-secondary/12 text-secondary rounded-md p-4 text-sm font-medium">
						Summary across the complete grid
					</div>
				</GridSpan>
				{#each ['Design', 'Build', 'Ship'] as phase (phase)}
					<div class="border-neutral-muted bg-surface rounded-md border p-4 text-center text-sm">
						{phase}
					</div>
				{/each}
			</Grid>
		</ComponentCard>

		<ComponentCard
			title="Row spans"
			description="Pair rowHeight on Grid with row spans for predictable dashboard rhythm."
			code={`<Grid columns={3} rowHeight={44} gap={2}>
	<GridSpan rows={3}>Tall</GridSpan>
	<GridSpan rows={1}>Short</GridSpan>
	<GridSpan rows={2}>Medium</GridSpan>
</Grid>`}
		>
			<Grid columns={3} rowHeight={44} gap={2} width="100%" maxWidth={700}>
				<GridSpan rows={3}>
					<div
						class="bg-primary/12 text-primary flex h-full items-center justify-center rounded-md text-sm"
					>
						Tall
					</div>
				</GridSpan>
				<GridSpan rows={1}>
					<div
						class="bg-success/12 text-success flex h-full items-center justify-center rounded-md text-sm"
					>
						Short
					</div>
				</GridSpan>
				<GridSpan rows={2}>
					<div
						class="bg-warning/12 text-warning flex h-full items-center justify-center rounded-md text-sm"
					>
						Medium
					</div>
				</GridSpan>
				<GridSpan rows={2}>
					<div
						class="bg-secondary/12 text-secondary flex h-full items-center justify-center rounded-md text-sm"
					>
						Medium
					</div>
				</GridSpan>
			</Grid>
		</ComponentCard>
	{/snippet}
</DocPage>
