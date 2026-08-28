<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Grid } from '$lib/components/Grid/index.js';
	import { Stack } from '$lib/components/Stack/index.js';
	import { chartLineUpIcon } from '$lib/components/Icons/chartLineUp.js';
	import { clockIcon } from '$lib/components/Icons/clock.js';
	import { usersThreeIcon } from '$lib/components/Icons/usersThree.js';

	const metrics = [
		{
			label: 'Revenue',
			value: '$42.8k',
			change: '+12.4%',
			icon: chartLineUpIcon,
			color: 'primary'
		},
		{
			label: 'Active users',
			value: '8,429',
			change: '+8.1%',
			icon: usersThreeIcon,
			color: 'success'
		},
		{ label: 'Cycle time', value: '2.4d', change: '-0.6d', icon: clockIcon, color: 'warning' }
	] as const;
	const metricIconClasses = {
		primary: 'bg-primary/12 text-primary',
		success: 'bg-success/12 text-success',
		warning: 'bg-warning/12 text-warning'
	} as const;

	const panels = Array.from({ length: 6 }, (_, index) => index + 1);
</script>

<DocPage
	title="Grid"
	subtitle="Builds fixed or intrinsically responsive CSS grids without breakpoint bookkeeping."
	component="Grid"
	features={[
		'Fixed and responsive columns',
		'Auto-fill or auto-fit behavior',
		'Maximum responsive column count',
		'Independent row and column gaps',
		'Implicit row sizing for spans'
	]}
>
	<ComponentCard
		description="A responsive metric grid capped at three columns."
		class="min-h-[420px]"
		code={`<Grid columns={{ minWidth: 180, max: 3 }} gap={4} width="100%">
	{#each metrics as metric}
		<article class="rounded-lg border p-4">
			<span>{metric.label}</span>
			<strong>{metric.value}</strong>
		</article>
	{/each}
</Grid>`}
	>
		<Grid columns={{ minWidth: 180, max: 3 }} gap={4} width="100%" maxWidth={900}>
			{#each metrics as metric (metric.label)}
				<Stack gap={4} padding={4} class="border-neutral-muted bg-surface rounded-lg border">
					<Stack orientation="horizontal" align="center" justify="between">
						<span class="text-neutral/60 text-xs font-medium">{metric.label}</span>
						<span
							class="{metricIconClasses[
								metric.color
							]} flex size-8 items-center justify-center rounded-md"
						>
							{@render metric.icon({ class: 'size-4' })}
						</span>
					</Stack>
					<Stack gap={1}>
						<strong class="text-neutral text-2xl">{metric.value}</strong>
						<span class="text-success text-xs">{metric.change} this month</span>
					</Stack>
				</Stack>
			{/each}
		</Grid>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Fixed columns"
			description="Numeric columns create equal tracks with min-width protection."
			code={`<Grid columns={3} gap={3}>
	<div>One</div>
	<div>Two</div>
	<div>Three</div>
</Grid>`}
		>
			<Grid columns={3} gap={3} width="100%" maxWidth={720}>
				{#each panels.slice(0, 3) as panel (panel)}
					<div
						class="border-neutral-muted bg-surface-raised text-neutral flex min-h-24 items-center justify-center rounded-md border text-sm font-medium"
					>
						{panel}
					</div>
				{/each}
			</Grid>
		</ComponentCard>

		<ComponentCard
			title="Responsive tracks"
			description="Minimum track width determines when columns wrap; max prevents over-expansion on wide screens."
			code={`<Grid columns={{ minWidth: 140, max: 4 }} gap={3}>
	{#each items as item}
		<div>{item}</div>
	{/each}
</Grid>`}
		>
			<Grid columns={{ minWidth: 140, max: 4 }} gap={3} width="100%" maxWidth={840}>
				{#each panels as panel (panel)}
					<div
						class="border-neutral-muted bg-surface text-neutral flex min-h-20 items-center justify-center rounded-md border text-sm"
					>
						Panel {panel}
					</div>
				{/each}
			</Grid>
		</ComponentCard>

		<ComponentCard
			title="Auto-fill and auto-fit"
			description="Fill preserves empty tracks; fit collapses them so present items stretch."
			code={`<Grid columns={{ minWidth: 150, repeat: 'fill' }} gap={3}>...</Grid>
<Grid columns={{ minWidth: 150, repeat: 'fit' }} gap={3}>...</Grid>`}
		>
			<Stack gap={5} width="100%" maxWidth={780}>
				<Stack gap={2}>
					<span class="text-neutral/60 font-mono text-[11px]">fill</span>
					<Grid columns={{ minWidth: 150, repeat: 'fill' }} gap={3}>
						<div class="bg-primary/12 text-primary rounded-md p-4 text-center text-sm">Alpha</div>
						<div class="bg-secondary/12 text-secondary rounded-md p-4 text-center text-sm">
							Beta
						</div>
					</Grid>
				</Stack>
				<Stack gap={2}>
					<span class="text-neutral/60 font-mono text-[11px]">fit</span>
					<Grid columns={{ minWidth: 150, repeat: 'fit' }} gap={3}>
						<div class="bg-primary/12 text-primary rounded-md p-4 text-center text-sm">Alpha</div>
						<div class="bg-secondary/12 text-secondary rounded-md p-4 text-center text-sm">
							Beta
						</div>
					</Grid>
				</Stack>
			</Stack>
		</ComponentCard>
	{/snippet}
</DocPage>
