<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { HStack, VStack } from '$lib/components/Stack/index.js';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { bellSimpleIcon } from '$lib/components/Icons/bellSimple.js';
	import { clockIcon } from '$lib/components/Icons/clock.js';

	const alignments = ['start', 'center', 'end', 'between'] as const;
	const filters = ['Design', 'Engineering', 'Research', 'Operations', 'Support'];
</script>

<DocPage
	title="HStack"
	subtitle="Arranges content horizontally with theme-aware spacing and axis-safe alignment."
	component="HStack"
	features={[
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
		code={`<HStack
	gap={3}
	align="center"
	padding={4}
	width="100%"
	class="rounded-lg border"
>
	<div class="icon">...</div>
	<VStack gap={0.5}>
		<strong>Deployment complete</strong>
		<span>Production is running version 2.4.0.</span>
	</VStack>
	<Chip color="success" variant="soft">Live</Chip>
</HStack>`}
	>
		<HStack
			gap={3}
			align="center"
			padding={4}
			width="100%"
			maxWidth={620}
			class="border-background-muted bg-background rounded-lg border"
		>
			<div
				class="bg-primary/12 text-primary flex size-10 shrink-0 items-center justify-center rounded-md"
			>
				{@render bellSimpleIcon({ class: 'size-5' })}
			</div>
			<VStack gap={0.5} class="min-w-0 flex-1">
				<strong class="text-foreground text-sm">Deployment complete</strong>
				<span class="text-foreground-muted truncate text-xs">
					Production is running version 2.4.0.
				</span>
			</VStack>
			<Chip color="success" variant="soft">Live</Chip>
		</HStack>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Main-axis alignment"
			description="Use justify as the readable alias for horizontal alignment."
			code={`{#each ['start', 'center', 'end', 'between'] as alignment}
	<HStack justify={alignment} gap={2} width="100%">
		<span>Alpha</span>
		<span>Beta</span>
	</HStack>
{/each}`}
		>
			<VStack gap={3} width="100%" maxWidth={720}>
				{#each alignments as alignment (alignment)}
					<VStack gap={1}>
						<span class="text-foreground-muted font-mono text-[11px]">{alignment}</span>
						<HStack
							justify={alignment}
							gap={2}
							padding={2}
							width="100%"
							class="border-background-muted bg-background/70 min-h-12 rounded-md border"
						>
							<span class="bg-primary/15 text-primary rounded px-2 py-1 text-xs">Alpha</span>
							<span class="bg-success/15 text-success rounded px-2 py-1 text-xs">Beta</span>
						</HStack>
					</VStack>
				{/each}
			</VStack>
		</ComponentCard>

		<ComponentCard
			title="Wrapping"
			description="A wrapped HStack keeps spacing consistent as available width changes."
			code={`<HStack gap={2} wrap="wrap">
	{#each filters as filter}
		<Chip variant="soft">{filter}</Chip>
	{/each}
</HStack>`}
		>
			<HStack gap={2} wrap="wrap" width="100%" maxWidth={480}>
				{#each filters as filter (filter)}
					<Chip variant="soft" color={filter === 'Research' ? 'secondary' : 'foreground'}>
						{filter}
					</Chip>
				{/each}
			</HStack>
		</ComponentCard>

		<ComponentCard
			title="Semantic navigation"
			description="Change the root element without rebuilding the flex layout."
			code={`<HStack as="nav" gap={4} align="center" aria-label="Project navigation">
	<a href="/overview">Overview</a>
	<a href="/activity">Activity</a>
	<a href="/settings">Settings</a>
</HStack>`}
		>
			<HStack
				as="nav"
				gap={5}
				align="center"
				aria-label="Project navigation"
				class="text-foreground text-sm"
			>
				<a class="hover:text-primary font-medium transition-colors" href="#overview">Overview</a>
				<a class="hover:text-primary transition-colors" href="#activity">Activity</a>
				<a class="hover:text-primary transition-colors" href="#settings">Settings</a>
				<span class="text-foreground-muted ml-2 inline-flex items-center gap-1 text-xs">
					{@render clockIcon({ class: 'size-3.5' })} Updated now
				</span>
			</HStack>
		</ComponentCard>
	{/snippet}
</DocPage>
