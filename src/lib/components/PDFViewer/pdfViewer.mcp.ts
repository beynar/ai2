export const pdfViewerDescription = `
# PDFViewer Component

A continuous-scroll PDF reader built on pdf.js. It renders every page in a scrollable ScrollArea (lazily, only pages near the viewport), with a selectable text layer, in-document search with highlighting, clickable link annotations, zoom, fit-to-width, rotation, download and print. Inspired by svelte-pdf, rebuilt on the svelai state/theme system.

## Basic Usage

\`\`\`svelte
<PDFViewer src="/document.pdf" />
<PDFViewer src="/document.pdf" size="small" color="secondary" />
\`\`\`

## Props

### Core Props
- **src**: string | URL | Uint8Array | ArrayBuffer (required) - The document url or its binary content. Binary buffers are copied before being handed to pdf.js.
- **page**: number (default: 1, bindable) - The current page (the one nearest the middle of the viewport). Set it (or use navigation) to scroll to a page.
- **scale**: number (default: 1, bindable) - The zoom scale. Applies to every page.
- **rotation**: number (default: 0, bindable) - Rotation in degrees, added to each page's intrinsic /Rotate.
- **fit**: 'width' | 'page' | null (default: 'width', bindable) - Fit mode. When set, the scale is derived from the viewport size and kept in sync on resize (and on rotation). Zooming clears it; pass null to render at the explicit scale.
- **mode**: 'scroll' | 'single' (default: 'scroll', bindable) - 'scroll' shows every page in a continuous scroll; 'single' shows one page at a time (navigation switches pages).
- **orientation**: 'vertical' | 'horizontal' (default: 'vertical', bindable) - Direction pages flow and scroll.
- **pageTransition**: boolean (default: true) - In single mode, animate page changes as a card stack (next slides in from the right; back slides out to the right). No effect in scroll mode.
- **totalPages**: number (bindable) - Total pages of the loaded document (read-only output).
- **minScale** / **maxScale**: number (defaults: 0.5 / 3) - Zoom bounds.
- **password**: string - Password for protected documents. Load errors (including password errors) surface in the error state.
- **downloadFileName**: string - File name used by the download control.

### Toolbar Props
- **controls**: Array<'navigation' | 'pageInfo' | 'zoom' | 'fit' | 'mode' | 'orientation' | 'rotate' | 'search' | 'download' | 'print'> | false (default: all)
  - Pass a subset to show specific controls, or \`false\` to hide the toolbar. \`mode\` and \`orientation\` render toolbar toggle buttons.
- **toolbarPosition**: 'top' | 'bottom' | 'left' | 'right' (default: 'top') - Where the toolbar sits relative to the document. 'left'/'right' stack the controls into a vertical column.
- **size**: 'small' | 'normal' | 'large' (default: 'normal') - Size of the toolbar controls.
- **color**: Colors (default: 'neutral') - Theme color of the toolbar controls (neutral by default; set e.g. 'primary' to tint them).

### Event Props
- **onLoad**: (viewer: PDFViewerState) => void - Called when the document is loaded.
- **onError**: (error: Error) => void - Called when loading fails.
- **onPageChange**: (page: number) => void - Called when the current page changes (scrolling or navigation).

### Content Props (Slots)
- **toolbar**: Snippet<[PDFViewerState]> - Replaces the default toolbar. The state exposes \`page\`, \`totalPages\`, \`scale\`, \`fit\`, \`loading\`, \`matches\`, \`activeMatch\`, and methods \`previous()\`, \`next()\`, \`goTo()\`, \`zoomIn()\`, \`zoomOut()\`, \`setFit()\`, \`rotate()\`, \`search()\`, \`nextMatch()\`, \`previousMatch()\`, \`download()\`, \`print()\`.
- **error**: Snippet<[PDFViewerState]> - Replaces the default error message.

### Advanced Props
- **ref**: HTMLElement | null (bindable) - The root element.
- **class**: string - Additional CSS classes on the root element.
- **theme**: PDFViewerTheme - Theme overrides (container, toolbar, pageInfo, viewer, pages, page, canvas, pageError, error, skeleton, search, searchInput, searchCount).

## Features

- **View mode + orientation**: switch between continuous scroll and one-page-at-a-time (\`mode\`), and between vertical and horizontal flow (\`orientation\`), from the toolbar or via bindable props.
- **Continuous scroll**: all pages stack in a scrollable viewport. Only pages near the viewport render (virtualization); the rest keep a correctly-sized placeholder so scroll position is stable.
- **Text layer**: real, selectable text is overlaid on each page (copy works; screen readers can read it).
- **Search**: the search control opens a popover (anchored to the search button, so it works with any \`toolbarPosition\`, including vertical left/right toolbars). It finds every match across the document, shows \`current / total\`, highlights matches (active match distinct), and Enter / Shift+Enter (or the ▴ ▾ buttons) step between them. Escape or re-clicking the search button closes it and clears the search; clicking in the document does not, so highlights persist while you read.
- **Links**: link annotations render as clickable overlays that open in a new tab.
- **Fit to width** and **pinch / Ctrl-wheel zoom**.

## Examples

### Controlled page + fit to width
\`\`\`svelte
<script>
	let page = $state(1);
</script>

<PDFViewer src="/document.pdf" bind:page fit="width" controls={['pageInfo', 'search', 'download']} />
\`\`\`

### Custom toolbar
\`\`\`svelte
<PDFViewer src="/document.pdf">
	{#snippet toolbar(viewer)}
		<Button onClick={viewer.previous} disabled={!viewer.canGoPrevious}>Previous</Button>
		{viewer.page} / {viewer.totalPages}
		<Button onClick={viewer.next} disabled={!viewer.canGoNext}>Next</Button>
	{/snippet}
</PDFViewer>
\`\`\`

## Accessibility

- Toolbar buttons have aria-labels and are keyboard accessible; the page counter is an aria-live region.
- The text layer makes document text available to assistive technology and selection.
- The default error message uses safe, generic copy (the raw pdf.js error is available via the \`error\` slot payload and \`onError\`) and is announced with role="alert".

## Notes

- pdf.js is not bundled: it is loaded from cdnjs at runtime, on the client only. The component is SSR-safe and shows a skeleton while loading. A strict Content-Security-Policy must allow cdnjs.cloudflare.com (script-src, worker-src and connect-src).
- Pages render at the device pixel ratio for crisp output on retina displays.
- Printing uses the browser's built-in PDF plugin in a hidden iframe.
- Search matches within a single text run; phrases spanning separate text runs may not match (a common pdf.js limitation).
- Not ported from svelte-pdf: auto page-flip and reading-time estimation.
`;
