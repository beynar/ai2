import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultImageZoomRoot = cva({
	base: 'relative inline-block max-w-full'
});

const defaultImageZoomTrigger = cva({
	base: 'group/image-zoom relative m-0 block max-w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55'
});

const defaultImageZoomImage = cva({
	base: 'block max-w-full rounded-inherit object-cover'
});

const defaultImageZoomIndicator = cva({
	base: 'bg-foreground/70 text-background pointer-events-none absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-full opacity-0 shadow-sm transition-opacity group-hover/image-zoom:opacity-100 group-focus-visible/image-zoom:opacity-100 [&_svg]:size-4'
});

const defaultImageZoomPortal = cva({
	base: 'fixed inset-0 z-[900] overflow-hidden'
});

const defaultImageZoomOverlay = cva({
	base: 'absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity motion-reduce:transition-none',
	variants: {
		visible: {
			true: 'opacity-100',
			false: 'opacity-0'
		}
	},
	defaultVariants: {
		visible: false
	}
});

const defaultImageZoomModalImage = cva({
	base: 'fixed max-w-none cursor-zoom-out select-none rounded-xl object-contain shadow-2xl transition-[top,left,width,height,opacity] ease-out will-change-[top,left,width,height] motion-reduce:transition-none',
	variants: {
		visible: {
			true: 'opacity-100',
			false: 'opacity-0'
		}
	},
	defaultVariants: {
		visible: false
	}
});

const defaultImageZoomCloseButton = cva({
	base: 'bg-foreground/70 text-background fixed top-4 right-4 z-[1] inline-flex size-10 cursor-zoom-out items-center justify-center rounded-full border-0 p-0 shadow-sm outline-none transition-colors hover:bg-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/55 [&_svg]:size-5'
});

const defaultImageZoomCaption = cva({
	base: 'text-foreground bg-background/85 fixed bottom-4 left-1/2 z-[1] max-w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 rounded-full px-4 py-2 text-center text-sm shadow-sm backdrop-blur-md'
});

export const imageZoomTheme = {
	root: defaultImageZoomRoot,
	trigger: defaultImageZoomTrigger,
	image: defaultImageZoomImage,
	indicator: defaultImageZoomIndicator,
	portal: defaultImageZoomPortal,
	overlay: defaultImageZoomOverlay,
	modalImage: defaultImageZoomModalImage,
	closeButton: defaultImageZoomCloseButton,
	caption: defaultImageZoomCaption
};

export type ImageZoomTheme = typeof imageZoomTheme;
export type ImageZoomThemeProps = InferComponentTheme<ImageZoomTheme>;
export const setImageZoomTheme = setComponentTheme<ImageZoomTheme>('image-zoom');
export const useImageZoomTheme = useComponentTheme<ImageZoomTheme>('image-zoom', imageZoomTheme);
