<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Stack } from '$lib/components/Stack/index.js';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { bellSimpleIcon } from '$lib/components/Icons/bellSimple.js';
	import { clockIcon } from '$lib/components/Icons/clock.js';

	const alignments = ['start', 'center', 'end', 'between'] as const;
	const filters = ['Design', 'Engineering', 'Research', 'Operations', 'Support'];
</script>

<DocPage
	title="Stack"
	subtitle="Arranges content along a single flex axis with theme-aware spacing and alignment."
	component="Stack"
	features={[
		'Horizontal and vertical orientation',
		'Main and cross-axis alignment',
		'Numeric theme spacing',
		'Wrapping and native scrolling',
		'Polymorphic semantic element',
		'Semantic attributes and attachments'
	]}
>
	<ComponentCard
		description="A complete notification row composed from horizontal and vertical stacks."
		class="min-h-[360px]"
		code={`<Stack
	orientation="horizontal"
	gap={3}
	align="center"
	padding={4}
	width="100%"
	class="rounded-lg border"
>
	<div class="icon">...</div>
	<Stack gap={0.5}>
		<strong>Deployment complete</strong>
		<span>Production is running version 2.4.0.</span>
	</Stack>
	<Chip color="success" variant="soft">Live</Chip>
</Stack>`}
	>
		<Stack
			orientation="horizontal"
			gap={3}
			align="center"
			padding={4}
			width="100%"
			maxWidth={620}
			class="border-neutral-muted bg-surface rounded-lg border"
		>
			<div
				class="bg-primary/12 text-primary flex size-10 shrink-0 items-center justify-center rounded-md"
			>
				{@render bellSimpleIcon({ class: 'size-5' })}
			</div>
			<Stack gap={0.5} class="min-w-0 flex-1">
				<strong class="text-neutral text-sm">Deployment complete</strong>
				<span class="text-neutral/60 truncate text-xs"> Production is running version 2.4.0. </span>
			</Stack>
			<Chip color="success" variant="soft">Live</Chip>
		</Stack>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Main-axis alignment"
			description="Use justify as the readable alias for horizontal alignment."
			code={`{#each ['start', 'center', 'end', 'between'] as alignment}
	<Stack orientation="horizontal" justify={alignment} gap={2} width="100%">
		<span>Alpha</span>
		<span>Beta</span>
	</Stack>
{/each}`}
		>
			<Stack gap={3} width="100%" maxWidth={720}>
				{#each alignments as alignment (alignment)}
					<Stack gap={1}>
						<span class="text-neutral/60 font-mono text-[11px]">{alignment}</span>
						<Stack
							orientation="horizontal"
							justify={alignment}
							gap={2}
							padding={2}
							width="100%"
							class="border-neutral-muted bg-surface/70 min-h-12 rounded-md border"
						>
							<span class="bg-primary/15 text-primary rounded px-2 py-1 text-xs">Alpha</span>
							<span class="bg-success/15 text-success rounded px-2 py-1 text-xs">Beta</span>
						</Stack>
					</Stack>
				{/each}
			</Stack>
		</ComponentCard>

		<ComponentCard
			title="Wrapping"
			description="A wrapped horizontal Stack keeps spacing consistent as available width changes."
			code={`<Stack orientation="horizontal" gap={2} wrap="wrap">
	{#each filters as filter}
		<Chip variant="soft">{filter}</Chip>
	{/each}
</Stack>`}
		>
			<Stack orientation="horizontal" gap={2} wrap="wrap" width="100%" maxWidth={480}>
				{#each filters as filter (filter)}
					<Chip variant="soft" color={filter === 'Research' ? 'secondary' : 'neutral'}>
						{filter}
					</Chip>
				{/each}
			</Stack>
		</ComponentCard>

		<ComponentCard
			title="Semantic navigation"
			description="Change the root element without rebuilding the flex layout."
			code={`<Stack orientation="horizontal" as="nav" gap={4} align="center" aria-label="Project navigation">
	<a href="/overview">Overview</a>
	<a href="/activity">Activity</a>
	<a href="/settings">Settings</a>
</Stack>`}
		>
			<Stack
				orientation="horizontal"
				as="nav"
				gap={5}
				align="center"
				aria-label="Project navigation"
				class="text-neutral text-sm"
			>
				<a class="hover:text-primary font-medium transition-colors" href="#overview">Overview</a>
				<a class="hover:text-primary transition-colors" href="#activity">Activity</a>
				<a class="hover:text-primary transition-colors" href="#settings">Settings</a>
				<span class="text-neutral/60 ml-2 inline-flex items-center gap-1 text-xs">
					{@render clockIcon({ class: 'size-3.5' })} Updated now
				</span>
			</Stack>
		</ComponentCard>
	{/snippet}
</DocPage>
