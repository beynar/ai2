<script lang="ts">
	import Badge from '$lib/components/Badge/Badge.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import BadgeSurface from './BadgeSurface.svelte';

	const positions = [
		{ value: 'topLeft', label: 'Top left' },
		{ value: 'topRight', label: 'Top right' },
		{ value: 'bottomLeft', label: 'Bottom left' },
		{ value: 'bottomRight', label: 'Bottom right' }
	] as const;

	const variantLabels = {
		solid: 'Solid',
		outline: 'Outline',
		soft: 'Soft'
	};
</script>

<DocPage
	title="Badge"
	subtitle="Positioned labels for status, counts, and compact metadata."
	component="Badge"
	features={[
		'Chip-aligned shape and size scale',
		'Four corner positions',
		'Solid, outline, and soft variants',
		'Eight semantic colors',
		'Attachment-friendly root element'
	]}
>
	<ComponentCard
		description="Place Badge inside a relatively positioned surface to attach status to its edge."
		code={`<div class="relative">
	<Card
		title="Atlas launch"
		description="Product design - Updated 12 min ago"
	>
		<!-- Card content -->
	</Card>
	<Badge color="success" variant="soft">On track</Badge>
</div>`}
	>
		<BadgeSurface>
			<Badge color="success" variant="soft">On track</Badge>
		</BadgeSurface>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Variants"
			description="Badge uses the same solid, outline, and soft treatments as Chip."
			class="!min-h-fit py-12"
			code={`{#each ['solid', 'outline', 'soft'] as variant}
	<div class="relative">
		<Badge {variant}>{variant}</Badge>
	</div>
{/each}`}
		>
			<div class="grid w-full max-w-5xl gap-8 md:grid-cols-3">
				{#each variants as variant (variant)}
					<BadgeSurface
						title={`${variantLabels[variant]} badge`}
						detail="Shared Chip visual language"
					>
						<Badge {variant}>{variantLabels[variant]}</Badge>
					</BadgeSurface>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Positions"
			description="The badge overlaps the selected corner by half its own dimensions."
			class="!min-h-fit py-12"
			code={`<div class="relative">
	<Badge position="topLeft">Top left</Badge>
</div>`}
		>
			<div class="grid w-full max-w-3xl gap-10 sm:grid-cols-2">
				{#each positions as position (position.value)}
					<BadgeSurface title={position.label} detail="Anchored to this card corner">
						<Badge position={position.value}>{position.label}</Badge>
					</BadgeSurface>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Height, padding, spacing, and text size match the Chip size scale."
			class="!min-h-fit py-14"
			code={`{#each ['small', 'normal', 'large'] as size}
	<div class="relative">
		<Badge {size}>{size}</Badge>
	</div>
{/each}`}
		>
			<div class="flex flex-wrap items-center justify-center gap-12">
				{#each sizes as size (size)}
					<div
						class="border-background-muted bg-background-lighter relative flex size-20 items-center justify-center rounded-lg border"
					>
						<span class="text-foreground-muted text-xs">{size}</span>
						<Badge {size}>{size}</Badge>
					</div>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Semantic Colors"
			description="Every theme color supports the same readable foreground behavior as Chip."
			class="!min-h-fit py-14"
			code={`{#each colors as color}
	<div class="relative">
		<Badge {color}>{color}</Badge>
	</div>
{/each}`}
		>
			<div class="grid w-full max-w-3xl grid-cols-2 gap-10 sm:grid-cols-4">
				{#each colors as color (color)}
					<div
						class="border-background-muted bg-background-lighter relative flex h-20 items-center justify-center rounded-lg border"
					>
						<span class="text-foreground-muted text-xs">{color}</span>
						<Badge {color}>{color}</Badge>
					</div>
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
