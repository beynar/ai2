<!--
	Test-only harness: renders PDFViewer inside the Theme provider, matching real
	app usage. PDFViewer's search Popover needs the `sveltaiTheme` context that
	Theme supplies (for the popover stack); rendering the component bare crashes.
-->
<script lang="ts">
	import Theme from '../Theme/Theme.svelte';
	import PDFViewer from './PDFViewer.svelte';
	import type { PDFViewerProps } from './pdfViewer.props.js';

	const props: PDFViewerProps = $props();
</script>

<Theme>
	{#snippet children()}
		<PDFViewer {...props} />
	{/snippet}
</Theme>
