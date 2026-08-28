<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Stack } from '$lib/components/Stack/index.js';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { checkCircleIcon } from '$lib/components/Icons/checkCircle.js';
	import { userCircleIcon } from '$lib/components/Icons/userCircle.js';

	const verticalAlignments = ['start', 'center', 'end', 'between'] as const;
	const activity = [
		'Workspace created',
		'Brand tokens imported',
		'Four collaborators invited',
		'Production theme published',
		'Accessibility audit completed'
	];
</script>

<DocPage
	title="Stack — Vertical"
	subtitle="Arranges content vertically while keeping spacing, sizing, and alignment explicit."
	component="Stack"
	features={[
		'Vertical main-axis alignment',
		'Independent inline and block padding',
		'Bindable root reference',
		'Optional bounded scrolling',
		'Shared Stack theme'
	]}
>
	<ComponentCard
		description="A compact account panel built entirely from Stack composition."
		class="min-h-[440px]"
		code={`<Stack gap={4} padding={4} width="100%" maxWidth={440}>
	<Stack orientation="horizontal" gap={3} align="center">
		<div class="avatar">...</div>
		<Stack gap={0.5}>
			<strong>Arnaud</strong>
			<span>Product workspace</span>
		</Stack>
	</Stack>
	<div class="summary">...</div>
	<Stack orientation="horizontal" gap={2} wrap="wrap">...</Stack>
</Stack>`}
	>
		<Stack
			gap={4}
			padding={4}
			width="100%"
			maxWidth={440}
			class="border-neutral-muted bg-surface rounded-lg border"
		>
			<Stack orientation="horizontal" gap={3} align="center">
				<div
					class="bg-secondary/12 text-secondary flex size-11 shrink-0 items-center justify-center rounded-full"
				>
					{@render userCircleIcon({ class: 'size-6' })}
				</div>
				<Stack gap={0.5} class="min-w-0">
					<strong class="text-neutral text-sm">Arnaud</strong>
					<span class="text-neutral/60 text-xs">Product workspace</span>
				</Stack>
			</Stack>
			<div class="border-neutral-muted border-t"></div>
			<Stack gap={2}>
				<span class="text-neutral text-sm font-medium">Workspace health</span>
				<Stack orientation="horizontal" gap={2} align="center">
					<span class="text-success">{@render checkCircleIcon({ class: 'size-4' })}</span>
					<span class="text-neutral/60 text-xs">All checks are passing</span>
				</Stack>
			</Stack>
			<Stack orientation="horizontal" gap={2} wrap="wrap">
				<Chip color="primary" variant="soft">Design system</Chip>
				<Chip color="success" variant="soft">Synced</Chip>
			</Stack>
		</Stack>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Main-axis alignment"
			description="Vertical justification becomes visible whenever the stack has a stable height."
			code={`<Stack height={180} justify="between">
	<span>Top</span>
	<span>Bottom</span>
</Stack>`}
		>
			<Stack orientation="horizontal" gap={3} wrap="wrap" justify="center" width="100%">
				{#each verticalAlignments as alignment (alignment)}
					<Stack gap={1}>
						<span class="text-neutral/60 text-center font-mono text-[11px]">{alignment}</span>
						<Stack
							height={180}
							width={128}
							justify={alignment}
							align="center"
							padding={2}
							class="border-neutral-muted bg-surface/70 rounded-md border"
						>
							<span class="bg-primary/15 text-primary rounded px-2 py-1 text-xs">One</span>
							<span class="bg-warning/15 text-warning rounded px-2 py-1 text-xs">Two</span>
						</Stack>
					</Stack>
				{/each}
			</Stack>
		</ComponentCard>

		<ComponentCard
			title="Axis-specific padding"
			description="Block and inline padding can be tuned independently while preserving theme density."
			code={`<Stack gap={2} paddingInline={6} paddingBlock={3}>
	<strong>Release notes</strong>
	<span>Spacing follows the active Svelai theme.</span>
</Stack>`}
		>
			<Stack
				gap={2}
				paddingInline={6}
				paddingBlock={3}
				maxWidth={480}
				class="border-primary/30 bg-primary/8 rounded-md border"
			>
				<strong class="text-neutral text-sm">Release notes</strong>
				<span class="text-neutral/60 text-xs">
					Spacing follows the active Svelai theme without custom inline values.
				</span>
			</Stack>
		</ComponentCard>

		<ComponentCard
			title="Scrollable stack"
			description="Bound the height and opt into native scrolling without changing child markup."
			code={`<Stack height={180} gap={2} padding={2} isScrollable>
	{#each activity as event}
		<div>{event}</div>
	{/each}
</Stack>`}
		>
			<Stack
				height={190}
				width="100%"
				maxWidth={500}
				gap={2}
				padding={2}
				isScrollable
				class="border-neutral-muted bg-surface rounded-md border"
			>
				{#each activity as event, index (event)}
					<Stack
						orientation="horizontal"
						gap={3}
						align="center"
						padding={3}
						class="bg-surface-raised rounded-md"
					>
						<span
							class="bg-neutral/8 text-neutral flex size-6 items-center justify-center rounded text-xs"
						>
							{index + 1}
						</span>
						<span class="text-neutral text-sm">{event}</span>
					</Stack>
				{/each}
			</Stack>
		</ComponentCard>
	{/snippet}
</DocPage>
