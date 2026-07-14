<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import ChipPositionSurface from './ChipPositionSurface.svelte';

	const positions = [
		{ value: 'topLeft', label: 'Top left' },
		{ value: 'topRight', label: 'Top right' },
		{ value: 'bottomLeft', label: 'Bottom left' },
		{ value: 'bottomRight', label: 'Bottom right' }
	] as const;
</script>

<DocPage
	title="Chip"
	subtitle="Compact elements for tags, filters, selections, or positioned indicators."
	component="Chip"
	features={[
		'Auto picks div, button, or link',
		'role set per rendered element',
		'Prefix & suffix icon slots',
		'Solid, outline & soft variants',
		'Optional corner positioning'
	]}
>
	<ComponentCard code={`<Chip>Chip</Chip>`}>
		<Chip>Chip</Chip>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Positioned overlay"
			description="Set position to anchor the Chip over a corner of a relatively positioned container."
			class="!min-h-fit py-12"
			code={`<div class="relative">
	<Card title="Atlas launch" description="Product design">
		<!-- Card content -->
	</Card>
	<Chip position="topRight" color="success" variant="soft">
		On track
	</Chip>
</div>`}
		>
			<ChipPositionSurface>
				<Chip position="topRight" color="success" variant="soft">On track</Chip>
			</ChipPositionSurface>
		</ComponentCard>

		<ComponentCard
			title="Positions"
			description="Each position overlaps its selected corner by half the Chip dimensions."
			class="!min-h-fit py-12"
			code={`<div class="relative">
	<Chip position="bottomRight">Bottom right</Chip>
</div>`}
		>
			<div class="grid w-full max-w-3xl gap-10 sm:grid-cols-2">
				{#each positions as position (position.value)}
					<ChipPositionSurface title={position.label} detail="Anchored to this card corner">
						<Chip position={position.value}>{position.label}</Chip>
					</ChipPositionSurface>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Solid, outline, and soft variants.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each variants as variant (variant)}
					<Chip {variant}>{variant}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Eight semantic colors, shown here in the solid variant.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each colors as color (color)}
					<Chip {color}>{color}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Three sizes to match surrounding density.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each sizes as size (size)}
					<Chip {size}>{size}</Chip>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Prefix and suffix icon slots.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Chip prefix={eyeClosedIcon}>Prefix</Chip>
				<Chip suffix={eyeClosedIcon}>Suffix</Chip>
				<Chip prefix={eyeClosedIcon} suffix={eyeClosedIcon}>Both</Chip>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
