import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultLinkPreviewTrigger = cva({
	base: 'text-primary-readable inline-flex max-w-full items-center rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45',
	variants: {
		disabled: {
			true: 'pointer-events-none opacity-55',
			false: null
		}
	},
	defaultVariants: {
		disabled: false
	}
});

const defaultLinkPreviewCard = cva({
	base: 'max-w-[calc(100vw-2rem)] overflow-hidden gap-0! py-0!',
	variants: {
		size: {
			small: 'w-64',
			normal: 'w-80',
			large: 'w-96'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewContent = cva({
	base: 'grid min-w-0 gap-0',
	variants: {
		size: {
			small: '-mx-2',
			normal: '-mx-4',
			large: '-mx-6'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewMedia = cva({
	base: 'bg-neutral-muted overflow-hidden rounded-t-xl rounded-b-none',
	variants: {
		size: {
			small: 'aspect-[1.9/1]',
			normal: 'aspect-[1.9/1]',
			large: 'aspect-[1.9/1]'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewImage = cva({
	base: 'h-full w-full object-cover'
});

const defaultLinkPreviewBody = cva({
	base: 'grid min-w-0 gap-2',
	variants: {
		size: {
			small: 'px-2 pt-3 pb-3',
			normal: 'px-4 pt-4 pb-4',
			large: 'px-6 pt-5 pb-5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewHeader = cva({
	base: 'flex min-w-0 items-center gap-2'
});

const defaultLinkPreviewFavicon = cva({
	base: 'size-4 shrink-0 rounded-sm'
});

const defaultLinkPreviewSite = cva({
	base: 'text-neutral/60 min-w-0 truncate text-xs font-medium'
});

const defaultLinkPreviewTitle = cva({
	base: 'text-neutral line-clamp-2 font-semibold leading-snug',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-sm',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewDescription = cva({
	base: 'text-neutral/60 line-clamp-3 leading-relaxed',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLinkPreviewUrl = cva({
	base: 'text-neutral/45 truncate font-mono text-xs'
});

const defaultLinkPreviewLoading = cva({
	base: 'grid gap-0'
});

const defaultLinkPreviewError = cva({
	base: 'border-danger/20 bg-danger-muted/20 text-danger-muted-readable rounded-lg border p-3'
});

export const linkPreviewTheme = {
	trigger: defaultLinkPreviewTrigger,
	card: defaultLinkPreviewCard,
	content: defaultLinkPreviewContent,
	media: defaultLinkPreviewMedia,
	image: defaultLinkPreviewImage,
	body: defaultLinkPreviewBody,
	header: defaultLinkPreviewHeader,
	favicon: defaultLinkPreviewFavicon,
	site: defaultLinkPreviewSite,
	title: defaultLinkPreviewTitle,
	description: defaultLinkPreviewDescription,
	url: defaultLinkPreviewUrl,
	loading: defaultLinkPreviewLoading,
	error: defaultLinkPreviewError
};

export type LinkPreviewTheme = typeof linkPreviewTheme;
export type LinkPreviewThemeProps = InferComponentTheme<LinkPreviewTheme>;
export const setLinkPreviewTheme = setComponentTheme<LinkPreviewTheme>('link-preview');
export const useLinkPreviewTheme = useComponentTheme<LinkPreviewTheme>(
	'link-preview',
	linkPreviewTheme
);
