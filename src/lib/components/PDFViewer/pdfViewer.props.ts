import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Colors, Sizes } from '../../types/index.js';
import type {
	FitMode,
	PDFOrientation,
	PDFViewMode,
	PDFViewerState
} from './pdfViewer.state.svelte.js';
import type { PDFViewerThemeProps } from './pdfViewer.theme.js';

export type { FitMode, PDFViewMode, PDFOrientation } from './pdfViewer.state.svelte.js';

/** Where the toolbar sits relative to the document. */
export type PDFToolbarPosition = 'top' | 'bottom' | 'left' | 'right';

/** The PDF document source: a url or the binary content of the document. */
export type PDFSource = string | URL | Uint8Array | ArrayBuffer;

export type PDFViewerControl =
	| 'navigation'
	| 'pageInfo'
	| 'zoom'
	| 'fit'
	| 'mode'
	| 'orientation'
	| 'rotate'
	| 'search'
	| 'download'
	| 'print';

export type PDFViewerProps = WithAttachments<
	WithSlot<
		{
			/**
			 * Bindable reference to the root element of the viewer.
			 */
			ref?: HTMLElement | null;
			/**
			 * The PDF document to display: a url or the binary content of the document.
			 */
			src: PDFSource;
			/**
			 * The current page number. Bindable.
			 * @default 1
			 */
			page?: number;
			/**
			 * The zoom scale of the rendered page. Bindable.
			 * @default 1
			 */
			scale?: number;
			/**
			 * The rotation of the rendered page in degrees (multiples of 90). Bindable.
			 * @default 0
			 */
			rotation?: number;
			/**
			 * The total number of pages of the loaded document. Bindable (read-only output).
			 * @default 0
			 */
			totalPages?: number;
			/**
			 * The minimum zoom scale.
			 * @default 0.5
			 */
			minScale?: number;
			/**
			 * The maximum zoom scale.
			 * @default 3
			 */
			maxScale?: number;
			/**
			 * The fit mode. When set, the scale is derived from the viewport size
			 * and kept in sync on resize: `'width'` fits the page width, `'page'`
			 * fits the whole page. Zooming clears it. Pass `null` to render at the
			 * explicit `scale`. Bindable.
			 * @default 'width'
			 */
			fit?: FitMode;
			/**
			 * The view mode: `'scroll'` shows every page in a continuous
			 * scroll, `'single'` shows one page at a time (navigation switches
			 * pages). Bindable.
			 * @default 'scroll'
			 */
			mode?: PDFViewMode;
			/**
			 * The direction pages flow and scroll: `'vertical'` (top to bottom)
			 * or `'horizontal'` (left to right). Bindable.
			 * @default 'vertical'
			 */
			orientation?: PDFOrientation;
			/**
			 * In `'single'` mode, animate page changes as a card stack: the next
			 * page slides in from the right over the current one, and going back
			 * slides the current page off to the right. No effect in scroll mode.
			 * @default true
			 */
			pageTransition?: boolean;
			/**
			 * The password used to open protected documents. When the document
			 * requires a password and none (or a wrong one) is provided, the
			 * viewer surfaces the error state.
			 */
			password?: string;
			/**
			 * The file name used when downloading the document.
			 * @default the url file name, or 'download.pdf'
			 */
			downloadFileName?: string;
			/**
			 * The toolbar controls to display, in a fixed order. Pass `false` to
			 * hide the toolbar entirely.
			 * @default ['navigation', 'pageInfo', 'zoom', 'fit', 'mode', 'orientation', 'rotate', 'search', 'download', 'print']
			 */
			controls?: PDFViewerControl[] | false;
			/**
			 * Where to place the toolbar relative to the document. `'left'` and
			 * `'right'` stack the controls into a vertical column.
			 * @default 'top'
			 */
			toolbarPosition?: PDFToolbarPosition;
			/**
			 * The size of the toolbar controls.
			 * @default 'normal'
			 */
			size?: Sizes;
			/**
			 * The theme color of the toolbar controls.
			 * @default 'neutral'
			 */
			color?: Colors;
			/**
			 * Called when the document is loaded.
			 */
			onLoad?: (viewer: PDFViewerState) => void;
			/**
			 * Called when the document fails to load or render.
			 */
			onError?: (error: Error) => void;
			/**
			 * Called when the current page changes.
			 */
			onPageChange?: (page: number) => void;
			/**
			 * The class name of the viewer. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * Theme overrides for the viewer parts.
			 */
			theme?: PDFViewerThemeProps;
		},
		'toolbar' | 'error',
		PDFViewerState
	>
>;
