<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { ImageZoom } from '$lib/components/ImageZoom/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let controlledOpen = $state(false);

	const mountainThumb =
		'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80';
	const mountainZoom =
		'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90';
	const architectureThumb =
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80';
	const architectureZoom =
		'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=90';
	const galleryImages = [
		{
			src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80',
			zoomSrc:
				'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=90',
			alt: 'Desert road with sandstone formations'
		},
		{
			src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
			zoomSrc:
				'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90',
			alt: 'Clear turquoise ocean water at a beach'
		},
		{
			src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80',
			zoomSrc:
				'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=90',
			alt: 'Night sky over snowy mountains'
		}
	];
</script>

<DocPage
	title="Image Zoom"
	subtitle="A thumbnail image that expands into a full-viewport zoom layer."
	component="ImageZoom"
	features={[
		'Controlled or uncontrolled open state',
		'Smooth thumbnail-to-viewport zoom animation',
		'Optional high-resolution zoom source',
		'Escape, backdrop, and close-button dismissal',
		'Scroll dismissal for page and nested scroll containers',
		'Focus restoration and reduced-motion support'
	]}
>
	<ComponentCard
		title="Basic Zoom"
		description="Click the image to zoom it into a full-viewport layer."
		class="max-w-xl"
		code={`<ImageZoom
	src="/photo-thumb.jpg"
	zoomSrc="/photo-large.jpg"
	alt="Mountain valley at sunrise"
/>`}
	>
		<ImageZoom
			src={mountainThumb}
			zoomSrc={mountainZoom}
			alt="Mountain valley at sunrise"
			width={640}
			height={420}
		/>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="High-Resolution Source"
			description="Use zoomSrc when the thumbnail should stay light but the zoomed layer needs more detail."
			class="max-w-md"
			code={`<ImageZoom
	src="/architecture-800.jpg"
	zoomSrc="/architecture-2200.jpg"
	alt="Concrete house with large glass windows"
/>`}
		>
			<ImageZoom
				src={architectureThumb}
				zoomSrc={architectureZoom}
				alt="Concrete house with large glass windows"
				width={520}
				height={640}
			/>
		</ComponentCard>

		<ComponentCard
			title="Caption"
			description="Provide a caption slot when the zoomed view needs context."
			class="max-w-xl"
			code={`<ImageZoom src="/photo.jpg" alt="Mountain valley at sunrise">
	{#snippet caption()}
		<span>Shot at first light after rain.</span>
	{/snippet}
</ImageZoom>`}
		>
			<ImageZoom
				src={mountainThumb}
				zoomSrc={mountainZoom}
				alt="Mountain valley at sunrise"
				width={640}
				height={420}
			>
				{#snippet caption()}
					<span>Shot at first light after rain.</span>
				{/snippet}
			</ImageZoom>
		</ComponentCard>

		<ComponentCard
			title="Indicator"
			description="Move the zoom indicator, hide it, or replace the default icon with slot content."
			class="max-w-xl"
			code={`<ImageZoom
	src="/photo.jpg"
	alt="Mountain valley at sunrise"
	indicatorPosition="top-left"
>
	{#snippet indicator()}
		<span>2x</span>
	{/snippet}
</ImageZoom>

<ImageZoom showIndicator={false} src="/photo.jpg" alt="Mountain valley at sunrise" />`}
		>
			<ImageZoom
				src={mountainThumb}
				zoomSrc={mountainZoom}
				alt="Mountain valley at sunrise"
				width={640}
				height={420}
				indicatorPosition="top-left"
			>
				{#snippet indicator()}
					<span>2x</span>
				{/snippet}
			</ImageZoom>
		</ComponentCard>

		<ComponentCard
			title="Controlled"
			description="Bind open when another control should open or close the zoom layer."
			class="max-w-xl"
			code={`let open = $state(false);

<Button onClick={() => (open = true)}>Open zoom</Button>
<ImageZoom bind:open src="/photo.jpg" alt="Mountain valley at sunrise" />`}
		>
			<div class="grid gap-4">
				<Button variant="outline" onClick={() => (controlledOpen = true)}>Open zoom</Button>
				<ImageZoom
					bind:open={controlledOpen}
					src={mountainThumb}
					zoomSrc={mountainZoom}
					alt="Mountain valley at sunrise"
					width={640}
					height={420}
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Child Image"
			description="When the children slot renders an image, ImageZoom can infer src and alt from it."
			class="max-w-lg"
			code={`<ImageZoom>
	{#snippet children()}
		<div class="relative overflow-hidden rounded-xl">
			<img src="/photo.jpg" alt="Mountain valley at sunrise" />
			<span>Open detail</span>
		</div>
	{/snippet}
</ImageZoom>`}
		>
			<ImageZoom>
				{#snippet children()}
					<div class="relative aspect-[4/3] w-72 overflow-hidden rounded-xl">
						<img
							src={mountainThumb}
							alt="Mountain valley at sunrise"
							class="h-full w-full object-cover"
						/>
						<span
							class="bg-background/85 text-foreground absolute right-3 bottom-3 rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md"
						>
							Open detail
						</span>
					</div>
				{/snippet}
			</ImageZoom>
		</ComponentCard>

		<ComponentCard
			title="Gallery"
			description="Multiple ImageZoom instances can live in the same grid."
			class="max-w-3xl"
			code={`<div class="grid grid-cols-3 gap-3">
	{#each images as image}
		<ImageZoom {...image} />
	{/each}
</div>`}
		>
			<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
				{#each galleryImages as image (image.src)}
					<ImageZoom {...image} width={360} height={260} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Disabled"
			description="Disabled images keep their thumbnail visible but do not open."
			class="max-w-md"
			code={`<ImageZoom
	disabled
	src="/photo.jpg"
	alt="Mountain valley at sunrise"
/>`}
		>
			<ImageZoom
				disabled
				src={mountainThumb}
				alt="Mountain valley at sunrise"
				width={520}
				height={340}
			/>
		</ComponentCard>
	{/snippet}
</DocPage>
