<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import { AspectRatio } from '$lib/components/AspectRatio/index.js';
	import Card from '$lib/components/Card/Card.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
</script>

<DocPage
	title="Aspect ratio"
	subtitle="Constrains content to a fixed width-to-height ratio."
	component="AspectRatio"
	features={[
		'Bindable ref to container element',
		'Nine preset ratios (16x9, 1x1, …)',
		'Padding-bottom ratio technique',
		'Absolutely positioned content slot'
	]}
>
	<ComponentCard
		description="16:9 aspect ratio container."
		class="max-w-4xl"
		code={`<AspectRatio ratio="16x9">
	{#snippet children()}
		<div
			class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
		>
			<span class="text-primary-contrast text-2xl font-bold">16:9 Aspect Ratio</span>
		</div>
	{/snippet}
</AspectRatio>`}
	>
		<AspectRatio ratio="16x9">
			{#snippet children()}
				<div
					class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-primary-contrast text-2xl font-bold">16:9 Aspect Ratio</span>
				</div>
			{/snippet}
		</AspectRatio>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="16:9 (Video)" class="max-w-4xl">
			<AspectRatio ratio="16x9">
				{#snippet children()}
					<div
						class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-primary-contrast text-2xl font-bold">16:9 Aspect Ratio</span>
					</div>
				{/snippet}
			</AspectRatio>
		</ComponentCard>

		<ComponentCard description="1:1 (Square)" class="max-w-md">
			<AspectRatio ratio="1x1">
				{#snippet children()}
					<div
						class="from-success to-info flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-success-contrast text-xl font-bold">1:1 Square</span>
					</div>
				{/snippet}
			</AspectRatio>
		</ComponentCard>

		<ComponentCard description="4:3 (Traditional)" class="max-w-2xl">
			<AspectRatio ratio="4x3">
				{#snippet children()}
					<div
						class="from-warning to-danger flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-warning-contrast text-xl font-bold">4:3 Aspect Ratio</span>
					</div>
				{/snippet}
			</AspectRatio>
		</ComponentCard>

		<ComponentCard description="3:4 (Portrait)" class="max-w-sm">
			<AspectRatio ratio="3x4">
				{#snippet children()}
					<div
						class="from-info to-primary flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-info-contrast text-xl font-bold">3:4 Portrait</span>
					</div>
				{/snippet}
			</AspectRatio>
		</ComponentCard>

		<ComponentCard description="9:16 (Vertical Video)" class="max-w-xs">
			<AspectRatio ratio="9x16">
				{#snippet children()}
					<div
						class="from-secondary to-success flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-secondary-contrast text-lg font-bold">9:16 Vertical</span>
					</div>
				{/snippet}
			</AspectRatio>
		</ComponentCard>

		<ComponentCard description="Grid of Different Ratios" class="max-w-4xl">
			<div class="grid grid-cols-3 gap-4">
				<AspectRatio ratio="1x1">
					{#snippet children()}
						<div class="bg-primary flex h-full w-full items-center justify-center">
							<span class="text-primary-contrast text-sm font-semibold">1:1</span>
						</div>
					{/snippet}
				</AspectRatio>
				<AspectRatio ratio="16x9">
					{#snippet children()}
						<div class="bg-secondary flex h-full w-full items-center justify-center">
							<span class="text-secondary-contrast text-sm font-semibold">16:9</span>
						</div>
					{/snippet}
				</AspectRatio>
				<AspectRatio ratio="4x3">
					{#snippet children()}
						<div class="bg-success flex h-full w-full items-center justify-center">
							<span class="text-success-contrast text-sm font-semibold">4:3</span>
						</div>
					{/snippet}
				</AspectRatio>
			</div>
		</ComponentCard>

		<ComponentCard description="Card with Aspect Ratio" class="max-w-md">
			<Card>
				<AspectRatio ratio="16x9">
					{#snippet children()}
						<div
							class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
						>
							<span class="text-primary-contrast text-xl font-bold">Card Image</span>
						</div>
					{/snippet}
				</AspectRatio>
			</Card>
		</ComponentCard>

		<ComponentCard description="All Available Ratios" class="max-w-4xl">
			<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
				{#each ['2x1', '2x3', '16x9', '4x3', '1x1', '3x4', '3x2', '9x16', '1x2'] as ratio}
					<div class="flex flex-col gap-2">
						<AspectRatio ratio={ratio as any}>
							{#snippet children()}
								<div class="bg-background-muted flex h-full w-full items-center justify-center">
									<span class="text-foreground text-xs font-semibold">{ratio}</span>
								</div>
							{/snippet}
						</AspectRatio>
						<p class="text-foreground-muted text-center text-xs">{ratio}</p>
					</div>
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
