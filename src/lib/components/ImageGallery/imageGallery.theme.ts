import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultImageGalleryRoot = cva({
	base: 'contents'
});

const defaultImageGalleryPortal = cva({
	base: 'fixed inset-0 z-[900] overflow-hidden'
});

const defaultImageGalleryOverlay = cva({
	base: 'absolute inset-0 bg-background/85 backdrop-blur-md transition-opacity motion-reduce:transition-none',
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

const defaultImageGalleryViewport = cva({
	base: 'fixed m-0 max-w-none overflow-visible rounded-none bg-transparent outline-none transition-[top,left,width,height,opacity] ease-out will-change-[top,left,width,height] motion-reduce:transition-none',
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

const defaultImageGalleryScroller = cva({
	base: 'grid h-full w-screen auto-cols-[72%] grid-flow-col grid-rows-[100%] items-center gap-8 overflow-x-auto overflow-y-visible px-[14%] py-8 scroll-smooth snap-x snap-mandatory scroll-px-[14%] overscroll-x-contain [margin-left:calc((100%_-_100vw)_/_2)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
});

const defaultImageGallerySlide = cva({
	base: 'relative flex h-full min-h-0 snap-center items-center justify-center [perspective:1000px]',
	variants: {
		relation: {
			previous: 'z-0',
			active: 'z-[2]',
			next: 'z-0',
			distant: 'z-0'
		}
	},
	defaultVariants: {
		relation: 'distant'
	}
});

const defaultImageGallerySlideInner = cva({
	base: 'flex h-full w-full items-center justify-center rounded-xl transition-[opacity,transform,filter] duration-300 ease-out will-change-transform motion-reduce:transition-none',
	variants: {
		relation: {
			previous: 'opacity-55 blur-[0.2px] [transform:translateX(-1rem)_scale(.78)_rotateY(-28deg)]',
			active: 'opacity-100 blur-0 [transform:translateX(0)_scale(1)_rotateY(0deg)]',
			next: 'opacity-55 blur-[0.2px] [transform:translateX(1rem)_scale(.78)_rotateY(28deg)]',
			distant: 'opacity-20 [transform:scale(.62)]'
		}
	},
	defaultVariants: {
		relation: 'distant'
	}
});

const defaultImageGalleryNavigation = cva({
	base: 'pointer-events-none fixed inset-x-0 top-1/2 z-[1] flex -translate-y-1/2 items-center justify-between px-4'
});

const defaultImageGalleryImage = cva({
	base: 'block max-h-full w-full select-none rounded-xl object-contain shadow-2xl'
});

const defaultImageGalleryCloseButton = cva({
	base: 'bg-foreground/70 text-background fixed top-4 right-4 z-[1] inline-flex size-10 cursor-pointer items-center justify-center rounded-full border-0 p-0 shadow-sm outline-none transition-colors hover:bg-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/55 [&_svg]:size-5'
});

const defaultImageGalleryNavigationButton = cva({
	base: 'bg-foreground/70 text-background pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-0 p-0 shadow-sm outline-none transition-colors hover:bg-foreground/80 focus-visible:ring-2 focus-visible:ring-primary/55 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5',
	variants: {
		direction: {
			previous: null,
			next: null
		}
	}
});

const defaultImageGalleryThumbnails = cva({
	base: 'fixed bottom-4 left-1/2 z-[1] flex max-w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 snap-x items-center gap-2 overflow-x-auto rounded-2xl bg-background/85 p-2 shadow-sm backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
});

const defaultImageGalleryThumbnail = cva({
	base: 'size-14 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent bg-transparent p-0 opacity-55 outline-none transition-[border-color,opacity,transform] snap-center hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary/55',
	variants: {
		active: {
			true: 'scale-105 border-primary opacity-100',
			false: null
		}
	},
	defaultVariants: {
		active: false
	}
});

const defaultImageGalleryThumbnailImage = cva({
	base: 'h-full w-full object-cover'
});

const defaultImageGalleryCaption = cva({
	base: 'text-foreground bg-background/85 fixed bottom-24 left-1/2 z-[1] max-w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 rounded-full px-4 py-2 text-center text-sm shadow-sm backdrop-blur-md'
});

export const imageGalleryTheme = {
	root: defaultImageGalleryRoot,
	portal: defaultImageGalleryPortal,
	overlay: defaultImageGalleryOverlay,
	viewport: defaultImageGalleryViewport,
	scroller: defaultImageGalleryScroller,
	slide: defaultImageGallerySlide,
	slideInner: defaultImageGallerySlideInner,
	navigation: defaultImageGalleryNavigation,
	image: defaultImageGalleryImage,
	closeButton: defaultImageGalleryCloseButton,
	navigationButton: defaultImageGalleryNavigationButton,
	thumbnails: defaultImageGalleryThumbnails,
	thumbnail: defaultImageGalleryThumbnail,
	thumbnailImage: defaultImageGalleryThumbnailImage,
	caption: defaultImageGalleryCaption
};

export type ImageGalleryTheme = typeof imageGalleryTheme;
export type ImageGalleryThemeProps = InferComponentTheme<ImageGalleryTheme>;
export const setImageGalleryTheme = setComponentTheme<ImageGalleryTheme>('image-gallery');
export const useImageGalleryTheme = useComponentTheme<ImageGalleryTheme>(
	'image-gallery',
	imageGalleryTheme
);
