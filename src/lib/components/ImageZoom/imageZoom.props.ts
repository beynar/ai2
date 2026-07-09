import type { Slot, WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ImageZoomThemeProps } from './imageZoom.theme.js';

export type ImageZoomPayload = {
	/** Thumbnail image source. */
	src: string;
	/** Full-size image source used in the zoomed layer. */
	zoomSrc: string;
	/** Accessible image description. */
	alt: string;
	/** Whether the zoomed layer is open. */
	isOpen: boolean;
	/** Opens the zoomed layer. */
	open: () => void;
	/** Closes the zoomed layer. */
	close: () => void;
	/** Toggles the zoomed layer. */
	toggle: () => void;
};

type ImageLoading = 'eager' | 'lazy';
type ImageDecoding = 'sync' | 'async' | 'auto';

export type ImageZoomProps = WithAttachments<
	WithSlot<
		{
			/** Stable DOM id for the zoom dialog root; falls back to a generated id. */
			id?: string;
			/** Thumbnail image source. */
			src: string;
			/** Accessible image description. */
			alt: string;
			/** Full-size image source. Defaults to `src`. */
			zoomSrc?: string;
			/** Controls whether the zoomed layer is open; bindable for two-way control. */
			open?: boolean;
			/** When true, prevents opening and marks the trigger disabled. */
			disabled?: boolean;
			/** Image width attribute forwarded to the thumbnail. */
			width?: number | string;
			/** Image height attribute forwarded to the thumbnail. */
			height?: number | string;
			/** Thumbnail `srcset` attribute. */
			srcset?: string;
			/** Thumbnail `sizes` attribute. */
			sizes?: string;
			/** Thumbnail loading strategy. */
			loading?: ImageLoading;
			/** Thumbnail decode strategy. */
			decoding?: ImageDecoding;
			/** Viewport margin, in pixels, kept around the zoomed image. */
			zoomMargin?: number;
			/** Zoom animation duration in milliseconds. */
			transitionDuration?: number;
			/** When true, clicking the backdrop closes the zoomed layer. */
			closeOnClickOutside?: boolean;
			/** When true, pressing Escape closes the zoomed layer. */
			closeOnEscape?: boolean;
			/** When true, page scroll is locked while the zoomed layer is mounted. */
			lockScroll?: boolean;
			/** Accessible label for the thumbnail trigger. Defaults to `Zoom image`. */
			buttonLabel?: string;
			/** Accessible label for the close button. Defaults to `Close image zoom`. */
			closeLabel?: string;
			/** Additional CSS classes merged onto the root element. */
			class?: string;
			/** Callback fired when user interaction requests a new open state. */
			onOpenChange?: (open: boolean, payload: ImageZoomPayload) => void;
			/** Callback fired after the open animation starts. */
			onOpen?: (payload: ImageZoomPayload) => void;
			/** Callback fired after the close animation finishes. */
			onClose?: (payload: ImageZoomPayload) => void;
			/** Per-instance theme overrides for image zoom parts. */
			theme?: ImageZoomThemeProps;
		},
		'children' | 'caption',
		ImageZoomPayload
	>
>;

export type ImageZoomCaption = Slot<ImageZoomPayload>;
