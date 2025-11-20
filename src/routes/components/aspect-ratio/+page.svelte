<script lang="ts">
	import { AspectRatio } from '$lib/components/AspectRatio/index.js';
	import Card from '$lib/components/Card/Card.svelte';
</script>

<div class="grid gap-10">
	<!-- 16:9 Video Aspect Ratio -->
	<div class="border-surface-muted w-full max-w-4xl rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">16:9 (Video)</h2>
		<AspectRatio ratio="16x9">
			{#snippet children()}
				<div
					class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-primary-fg text-2xl font-bold">16:9 Aspect Ratio</span>
				</div>
			{/snippet}
		</AspectRatio>
	</div>

	<!-- Square 1:1 -->
	<div class="border-surface-muted w-full max-w-md rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">1:1 (Square)</h2>
		<AspectRatio ratio="1x1">
			{#snippet children()}
				<div
					class="from-success to-info flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-success-fg text-xl font-bold">1:1 Square</span>
				</div>
			{/snippet}
		</AspectRatio>
	</div>

	<!-- 4:3 Traditional -->
	<div class="border-surface-muted w-full max-w-2xl rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">4:3 (Traditional)</h2>
		<AspectRatio ratio="4x3">
			{#snippet children()}
				<div
					class="from-warning to-danger flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-warning-fg text-xl font-bold">4:3 Aspect Ratio</span>
				</div>
			{/snippet}
		</AspectRatio>
	</div>

	<!-- 3:4 Portrait -->
	<div class="border-surface-muted w-full max-w-sm rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">3:4 (Portrait)</h2>
		<AspectRatio ratio="3x4">
			{#snippet children()}
				<div
					class="from-info to-primary flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-info-fg text-xl font-bold">3:4 Portrait</span>
				</div>
			{/snippet}
		</AspectRatio>
	</div>

	<!-- 9:16 Vertical Video -->
	<div class="border-surface-muted w-full max-w-xs rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">9:16 (Vertical Video)</h2>
		<AspectRatio ratio="9x16">
			{#snippet children()}
				<div
					class="from-secondary to-success flex h-full w-full items-center justify-center bg-gradient-to-br"
				>
					<span class="text-secondary-fg text-lg font-bold">9:16 Vertical</span>
				</div>
			{/snippet}
		</AspectRatio>
	</div>

	<!-- Grid of Different Ratios -->
	<div class="border-surface-muted w-full max-w-4xl rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">Grid of Different Ratios</h2>
		<div class="grid grid-cols-3 gap-4">
			<AspectRatio ratio="1x1">
				{#snippet children()}
					<div class="bg-primary flex h-full w-full items-center justify-center">
						<span class="text-primary-fg text-sm font-semibold">1:1</span>
					</div>
				{/snippet}
			</AspectRatio>
			<AspectRatio ratio="16x9">
				{#snippet children()}
					<div class="bg-secondary flex h-full w-full items-center justify-center">
						<span class="text-secondary-fg text-sm font-semibold">16:9</span>
					</div>
				{/snippet}
			</AspectRatio>
			<AspectRatio ratio="4x3">
				{#snippet children()}
					<div class="bg-success flex h-full w-full items-center justify-center">
						<span class="text-success-fg text-sm font-semibold">4:3</span>
					</div>
				{/snippet}
			</AspectRatio>
		</div>
	</div>

	<!-- Card with Aspect Ratio -->
	<div class="w-full max-w-md">
		<Card>
			<AspectRatio ratio="16x9">
				{#snippet children()}
					<div
						class="from-primary to-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
					>
						<span class="text-primary-fg text-xl font-bold">Card Image</span>
					</div>
				{/snippet}
			</AspectRatio>
		</Card>
	</div>

	<!-- All Ratios Showcase -->
	<div class="border-surface-muted w-full max-w-4xl rounded border p-6">
		<h2 class="mb-4 text-xl font-semibold">All Available Ratios</h2>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
			{#each ['2x1', '2x3', '16x9', '4x3', '1x1', '3x4', '3x2', '9x16', '1x2'] as ratio}
				<div class="flex flex-col gap-2">
					<AspectRatio ratio={ratio as any}>
						{#snippet children()}
							<div class="bg-surface-muted flex h-full w-full items-center justify-center">
								<span class="text-contrast text-xs font-semibold">{ratio}</span>
							</div>
						{/snippet}
					</AspectRatio>
					<p class="text-contrast-muted text-center text-xs">{ratio}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
