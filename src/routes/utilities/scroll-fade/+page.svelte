<script lang="ts">
	import Code from '$lib/components/Code/Code.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';
	import ComponentCard from '../../ComponentCard.svelte';

	const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);
	const tags = [
		'Design',
		'Engineering',
		'Marketing',
		'Product',
		'Research',
		'Sales',
		'Support',
		'Operations'
	];

	const usageCode = `<div class="overflow-hidden rounded-xl border">
	<div class="scroll-fade max-h-64 overflow-y-auto">
		<!-- content -->
	</div>
</div>`;

	const horizontalCode = `<div class="scroll-fade-x overflow-x-auto">
	<!-- horizontal content -->
</div>`;

	const edgeCode = `<div class="scroll-fade-b overflow-y-auto">
	<!-- bottom edge fade only -->
</div>`;

	const sizeCode = `<div class="scroll-fade scroll-fade-24 overflow-y-auto">
	<!-- spacing scale fade size -->
</div>

<div class="scroll-fade scroll-fade-b-8 scroll-fade-t-2 overflow-y-auto">
	<!-- per-edge fade sizes -->
</div>`;

	const utilityRows = [
		['scroll-fade', 'Adds vertical top and bottom fades to a scroll container.'],
		['scroll-fade-y', 'Alias for vertical top and bottom fades.'],
		['scroll-fade-x', 'Adds logical inline fades to a horizontal scroll container.'],
		['scroll-fade-t | scroll-fade-b', 'Adds a physical top or bottom edge fade.'],
		['scroll-fade-l | scroll-fade-r', 'Adds a physical left or right edge fade.'],
		['scroll-fade-s | scroll-fade-e', 'Adds a logical inline start or end edge fade.'],
		['scroll-fade-static', 'Keeps both fade edges visible for clipped, non-scroll containers.'],
		['scroll-fade-<number>', 'Sets fade size from the spacing scale.'],
		['scroll-fade-[<value>]', 'Sets a one-off fade size.'],
		['scroll-fade-{t,b,s,e}-<number>', 'Overrides one edge size.'],
		['scroll-fade-none', 'Disables the fade mask.']
	];
</script>

{#snippet ic(text: string)}
	<code class="bg-background-muted rounded px-1 py-0.5 text-sm">{text}</code>
{/snippet}

<article class="text-foreground mx-auto grid max-w-3xl gap-4 pb-20">
	<header class="grid gap-2">
		<h1 class="text-3xl font-semibold">Scroll fade</h1>
		<p class="text-foreground-muted text-balance">
			Tailwind utilities for fading the edges of scroll containers without overlay colors.
		</p>
	</header>

	<ComponentCard
		description="Put scroll-fade on the element that owns overflow-y-auto."
		code={usageCode}
		class="!min-h-[300px]"
	>
		<div
			class="border-background-muted bg-background mx-auto w-full max-w-xs overflow-hidden rounded-xl border"
		>
			<div class="scroll-fade max-h-64 overflow-y-auto p-2">
				{#each items as item (item)}
					<div
						class="border-background-muted bg-background-dark mb-2 rounded-md border px-3 py-2 text-sm"
					>
						{item}
					</div>
				{/each}
			</div>
		</div>
	</ComponentCard>

	<Separator class="my-2" children="Usage" />

	<p class="text-foreground-muted">
		Apply {@render ic('scroll-fade')} to the scrollable element, not the outer card. Keep backgrounds
		and borders on a wrapper so the mask dissolves the content only.
	</p>
	<Code language="html" code={usageCode} />

	<div class="border-background-muted overflow-hidden rounded-xl border">
		{#each utilityRows as [name, description], index (name)}
			<div
				class="grid gap-2 p-3 md:grid-cols-[15rem_1fr] {index % 2 === 0
					? 'bg-background'
					: 'bg-background-dark'}"
			>
				<code class="text-primary text-sm font-medium">{name}</code>
				<p class="text-foreground-muted text-sm">{description}</p>
			</div>
		{/each}
	</div>

	<Separator class="my-2" children="Examples" />

	<ComponentCard
		description="Use scroll-fade-x for horizontal scroll containers."
		code={horizontalCode}
		class="!min-h-[220px]"
	>
		<div
			class="border-background-muted bg-background mx-auto w-full max-w-sm overflow-hidden rounded-xl border"
		>
			<div class="scroll-fade-x flex gap-2 overflow-x-auto p-3">
				{#each tags as tag (tag)}
					<span
						class="bg-background-dark border-background-muted shrink-0 rounded-md border px-3 py-2 text-sm"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</ComponentCard>

	<ComponentCard
		description="Use edge utilities when only one edge should fade."
		code={edgeCode}
		class="!min-h-[260px]"
	>
		<div
			class="border-background-muted bg-background mx-auto w-full max-w-xs overflow-hidden rounded-xl border"
		>
			<div class="scroll-fade-b max-h-48 overflow-y-auto p-2">
				{#each items.slice(0, 8) as item (item)}
					<div
						class="border-background-muted bg-background-dark mb-2 rounded-md border px-3 py-2 text-sm"
					>
						{item}
					</div>
				{/each}
			</div>
		</div>
	</ComponentCard>

	<Code language="html" code={sizeCode} />
</article>
