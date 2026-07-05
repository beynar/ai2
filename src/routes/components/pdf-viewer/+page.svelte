<script lang="ts">
	import PDFViewer from '$lib/components/PDFViewer/PDFViewer.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
</script>

<DocPage
	title="PDFViewer"
	subtitle="Continuous-scroll PDF reader with a text layer, search, links, zoom, fit, rotation, download and print. Switch between continuous / single page and vertical / horizontal navigation from the toolbar."
	component="PDFViewer"
	features={[
		'pdfjs-dist loaded from cdnjs at runtime',
		'Bindable page, scale, rotation, fit',
		'Text layer with search and links',
		'Continuous scroll or single-page mode',
		'aria-busy viewer and live page counter'
	]}
>
	<ComponentCard
		class="!min-h-fit !items-stretch !justify-start max-w-[90vw]"
		code={`<PDFViewer src="/sample.pdf" class="mx-auto max-w-[820px]" />`}
	>
		<PDFViewer src="/sample.pdf" class="mx-auto max-w-[820px]" />
	</ComponentCard>

	{#snippet examples()}
	<ComponentCard class="!min-h-fit !items-stretch !justify-start max-w-[90vw]">
		<PDFViewer src="/sample.pdf" class="mx-auto max-w-[820px]" />
	</ComponentCard>

	<ComponentCard
		description="Horizontal continuous mode, fit to page"
		class="!min-h-fit !items-stretch !justify-start max-w-[90vw]"
	>
		<PDFViewer src="/sample.pdf" orientation="horizontal" fit="page" class="mx-auto max-w-[820px]" />
	</ComponentCard>

	<ComponentCard
		description="Single-page mode with the card-stack page transition"
		class="!min-h-fit !items-stretch !justify-start max-w-[90vw]"
	>
		<PDFViewer src="/sample.pdf" mode="single" class="mx-auto max-w-[820px]" />
	</ComponentCard>

	<ComponentCard
		description="Toolbar on the left (vertical controls)"
		class="!min-h-fit !items-stretch !justify-start max-w-[90vw]"
	>
		<PDFViewer src="/sample.pdf" toolbarPosition="left" class="mx-auto max-w-[820px]" />
	</ComponentCard>
	{/snippet}
</DocPage>
