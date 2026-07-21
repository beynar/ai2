import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultPDFViewerContainer = cva({
	base: 'flex relative w-full',
	variants: {
		size: { small: 'gap-2', normal: 'gap-3', large: 'gap-4' },
		// The toolbar is the first DOM child; flex-direction places it around the viewer.
		position: {
			top: 'flex-col',
			bottom: 'flex-col-reverse',
			left: 'flex-row',
			right: 'flex-row-reverse'
		}
	},
	defaultVariants: { size: 'normal', position: 'top' }
});

const defaultPDFViewerToolbar = cva({
	base: 'flex items-center flex-wrap',
	variants: {
		size: { small: 'gap-1', normal: 'gap-1.5', large: 'gap-2' },
		// Left/right position stacks the controls vertically.
		position: {
			top: 'flex-row',
			bottom: 'flex-row',
			left: 'flex-col',
			right: 'flex-col'
		}
	},
	defaultVariants: { size: 'normal', position: 'top' }
});

const defaultPDFViewerPageInfo = cva({
	base: 'text-neutral/60 tabular-nums select-none px-2',
	variants: {
		size: { small: 'text-xs', normal: 'text-sm', large: 'text-base' }
	},
	defaultVariants: { size: 'normal' }
});

// Hosts the ScrollArea, so it needs a bounded height for scrolling.
const defaultPDFViewerViewer = cva({
	base: 'relative rounded border border-neutral-muted bg-surface-raised overflow-hidden h-[70vh] min-h-48'
});

// The stack of pages inside the scroll viewport (continuous mode).
const defaultPDFViewerPages = cva({
	base: 'flex gap-4 p-4',
	variants: {
		orientation: {
			vertical: 'flex-col items-center',
			horizontal: 'flex-row items-start w-max'
		}
	},
	defaultVariants: { orientation: 'vertical' }
});

// The single-page container: clips the sliding page, and centres + stacks the
// page(s) in one grid cell so consecutive pages overlap during the transition.
const defaultPDFViewerSingle = cva({
	base: 'relative h-full w-full overflow-hidden grid place-items-center p-4'
});

// One page in single mode: sized to the page itself (not the viewer), placed in
// the shared grid cell so the transition slides just the page, not the container.
// Capped to the viewport with its own scroll area so a zoomed page can be panned
// (the outer container stays overflow-hidden to clip the slide).
const defaultPDFViewerSinglePage = cva({
	base: '[grid-area:1/1] max-h-full max-w-full overflow-auto'
});

// Native scroll wrapper used for horizontal continuous scrolling.
const defaultPDFViewerScroller = cva({
	base: 'h-full w-full overflow-auto'
});

// A single page: white "paper" with the canvas + text + link layers stacked.
const defaultPDFViewerPage = cva({
	base: 'relative shrink-0 overflow-hidden bg-white shadow-sm'
});

const defaultPDFViewerCanvas = cva({
	base: 'block absolute top-0 left-0 z-[1]'
});

const defaultPDFViewerPageError = cva({
	base: 'absolute inset-0 flex items-center justify-center bg-surface-raised text-danger-readable text-sm z-[4]'
});

const defaultPDFViewerError = cva({
	base: 'flex items-center justify-center p-6 text-danger-readable text-sm w-full text-center'
});

const defaultPDFViewerSkeleton = cva({
	base: 'absolute inset-0 h-full w-full rounded-none z-10'
});

// The search UI lives in a popover (so it never disturbs the toolbar layout,
// including vertical left/right toolbars). `search` is the single-row panel:
// the input grows, with the count and prev/next buttons inline after it.
const defaultPDFViewerSearch = cva({
	base: 'flex items-center gap-1'
});

const defaultPDFViewerSearchInput = cva({
	base: 'bg-surface border border-neutral-muted rounded px-2 py-1 text-sm outline-none focus:border-primary flex-1 min-w-0',
	variants: {
		size: { small: 'text-xs py-0.5', normal: 'text-sm', large: 'text-base' }
	},
	defaultVariants: { size: 'normal' }
});

const defaultPDFViewerSearchCount = cva({
	base: 'text-neutral/60 text-xs tabular-nums px-1 select-none min-w-12 text-center'
});

export const pdfViewerTheme = {
	root: defaultPDFViewerContainer,
	toolbar: defaultPDFViewerToolbar,
	pageInfo: defaultPDFViewerPageInfo,
	viewer: defaultPDFViewerViewer,
	pages: defaultPDFViewerPages,
	single: defaultPDFViewerSingle,
	singlePage: defaultPDFViewerSinglePage,
	scroller: defaultPDFViewerScroller,
	page: defaultPDFViewerPage,
	canvas: defaultPDFViewerCanvas,
	pageError: defaultPDFViewerPageError,
	error: defaultPDFViewerError,
	skeleton: defaultPDFViewerSkeleton,
	search: defaultPDFViewerSearch,
	searchInput: defaultPDFViewerSearchInput,
	searchCount: defaultPDFViewerSearchCount
};

export type PDFViewerTheme = typeof pdfViewerTheme;
export type PDFViewerThemeProps = InferComponentTheme<PDFViewerTheme>;
export const setPDFViewerTheme = setComponentTheme<PDFViewerTheme>('pdfViewer');
export const usePDFViewerTheme = useComponentTheme<PDFViewerTheme>('pdfViewer', pdfViewerTheme);
