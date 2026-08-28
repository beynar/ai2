import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Colors, Sizes } from '../../types/index.js';
import type { DocumentViewerAssetsOverride } from './documentViewer.assets.js';
import type { DocumentViewerState } from './documentViewer.state.svelte.js';
import type { DocumentViewerThemeProps } from './documentViewer.theme.js';

export type DocumentFormat =
	'pdf' | 'docx' | 'doc' | 'xlsx' | 'xls' | 'csv' | 'pptx' | 'ppt' | 'pages';

export type DocumentSource = string | URL | Blob | Uint8Array | ArrayBuffer;
export type DocumentUnit = 'page' | 'slide' | 'sheet' | 'flow';
export type DocumentFitMode = 'width' | 'page' | null;
export type DocumentViewMode = 'scroll' | 'single';
export type DocumentOrientation = 'vertical' | 'horizontal';
export type DocumentToolbarPosition = 'top' | 'bottom' | 'left' | 'right';

export type DocumentViewerControl =
	| 'sidebar'
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

export interface DocumentViewerCapabilities {
	sidebar: boolean;
	navigation: boolean;
	pageInfo: boolean;
	zoom: boolean;
	fit: boolean;
	mode: boolean;
	orientation: boolean;
	rotate: boolean;
	search: boolean;
	download: boolean;
	print: boolean;
	sheetTabs: boolean;
}

export interface DocumentSearchMatch {
	/** One-based page, slide, or sheet number. */
	unit: number;
	text: string;
	row?: number;
	column?: number;
}

export interface DocumentThumbnailPayload {
	viewer: DocumentViewerState;
	index: number;
}

export type DocumentViewerProps = WithAttachments<
	WithSlot<
		{
			ref?: HTMLElement | null;
			src: DocumentSource;
			format?: DocumentFormat;
			fileName?: string;
			page?: number;
			sheet?: number;
			scale?: number;
			rotation?: number;
			totalPages?: number;
			minScale?: number;
			maxScale?: number;
			fit?: DocumentFitMode;
			mode?: DocumentViewMode;
			orientation?: DocumentOrientation;
			pageTransition?: boolean;
			password?: string;
			downloadFileName?: string;
			controls?: DocumentViewerControl[] | false;
			toolbarPosition?: DocumentToolbarPosition;
			sidebar?: boolean;
			sheetTabs?: boolean;
			assets?: DocumentViewerAssetsOverride;
			size?: Sizes;
			color?: Colors;
			onLoad?: (viewer: DocumentViewerState) => void;
			onError?: (error: Error) => void;
			onWarning?: (warning: string) => void;
			onPageChange?: (page: number) => void;
			onSheetChange?: (sheet: number) => void;
			thumbnail?: Slot<DocumentThumbnailPayload>;
			class?: string;
			theme?: DocumentViewerThemeProps;
		},
		'toolbar' | 'error',
		DocumentViewerState
	>
>;
