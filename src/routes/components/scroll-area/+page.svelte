<script lang="ts">
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const paragraphs = Array.from({ length: 12 }, (_, i) => i + 1);
	const types = ['hover', 'always', 'scroll', 'auto'] as const;
</script>

<DocPage
	title="Scroll area"
	subtitle="A custom scroll container with overlay scrollbars, replacing the native ones."
	component="ScrollArea"
	features={[
		'Custom overlay scrollbars, native ones hidden',
		'Vertical and horizontal thumbs with drag',
		'hover, always, scroll, and auto visibility modes',
		'Optional scroll fade via the shared utility',
		'Keyboard-focusable region only when it overflows (WCAG SCR34)'
	]}
>
	<ComponentCard
		code={`<ScrollArea type="hover" scrollFade class="raised h-52 w-full max-w-md">
	<div class="flex flex-col gap-3 p-4">
		<!-- long content -->
	</div>
</ScrollArea>`}
	>
		<ScrollArea type="hover" scrollFade class="raised h-52 w-full max-w-md">
			<div class="flex flex-col gap-3 p-4">
				{#each paragraphs as p}
					<p class="text-foreground/80 text-sm">
						Paragraph {p}. The quick brown fox jumps over the lazy dog. Scroll to see the custom
						overlay scrollbar appear on hover.
					</p>
				{/each}
			</div>
		</ScrollArea>
	</ComponentCard>

	{#snippet examples()}
		{#each types as type}
			<ComponentCard description={`type="${type}"`}>
				<ScrollArea {type} class="raised h-52 w-full max-w-md">
					<div class="flex flex-col gap-3 p-4">
						{#each paragraphs as p}
							<p class="text-foreground/80 text-sm">
								Paragraph {p}. The quick brown fox jumps over the lazy dog.
							</p>
						{/each}
					</div>
				</ScrollArea>
			</ComponentCard>
		{/each}

		<ComponentCard description="Horizontal overflow: a wide child produces a horizontal scrollbar.">
			<ScrollArea type="always" scrollFade class="raised h-40 w-full max-w-md">
				<div class="flex gap-3 p-4">
					{#each paragraphs as p}
						<div
							class="bg-background-muted text-foreground/80 grid aspect-square w-40 shrink-0 place-items-center rounded text-sm"
						>
							Card {p}
						</div>
					{/each}
				</div>
			</ScrollArea>
		</ComponentCard>
	{/snippet}
</DocPage>
