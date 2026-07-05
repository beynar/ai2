import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultPagination = cva({
	base: 'flex w-fit max-w-full flex-wrap items-center gap-3'
});

const defaultPaginationList = cva({
	base: 'flex flex-wrap items-center',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-1.5',
			large: 'gap-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPaginationItem = cva({
	base: 'flex shrink-0 items-center',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPaginationControl = cva({
	base: 'inline-flex shrink-0 select-none items-center justify-center rounded-lg border font-medium outline-none transition-all duration-100 ease-in-out focus-visible:ring-2 focus-visible:ring-color/50 active:translate-y-px [&_svg:not([class*=size-])]:size-4',
	variants: {
		size: {
			small: 'h-7 min-w-7 px-2 text-xs',
			normal: 'h-8 min-w-8 px-2.5 text-sm',
			large: 'h-9 min-w-9 px-3 text-sm'
		},
		color: {
			background: 'text-background-readable',
			primary: 'text-primary-readable',
			secondary: 'text-secondary-readable',
			foreground: 'text-foreground-readable',
			danger: 'text-danger-readable',
			success: 'text-success-readable',
			warning: 'text-warning-readable',
			info: 'text-info-readable'
		},
		variant: {
			solid: 'border-transparent bg-color text-color-contrast hover:bg-color/90 active:bg-color/80',
			outline:
				'border-background-muted bg-background text-foreground hover:border-color hover:bg-color/10 hover:text-color-readable active:bg-color/20',
			soft: 'border-transparent bg-color-muted text-color-muted-readable hover:bg-color/30 active:bg-color/20',
			ghost:
				'border-transparent bg-transparent text-foreground hover:bg-color-muted hover:text-color-readable active:bg-color-muted/70'
		},
		active: {
			true: 'border-color bg-color text-color-contrast hover:bg-color/90 hover:text-color-contrast',
			false: null
		},
		disabled: {
			true: 'pointer-events-none cursor-not-allowed opacity-45',
			false: 'cursor-pointer'
		},
		control: {
			page: '',
			icon: 'aspect-square px-0'
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'primary',
		variant: 'outline',
		active: false,
		disabled: false,
		control: 'page'
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'outline',
			class: 'text-foreground hover:bg-background-muted hover:text-foreground'
		},
		{
			color: 'background',
			active: true,
			class: 'bg-background-dark text-foreground'
		},
		{
			color: 'foreground',
			variant: 'ghost',
			class: 'hover:bg-foreground-muted/20'
		}
	]
});

const defaultPaginationIcon = cva({
	base: 'flex shrink-0 items-center justify-center',
	variants: {
		size: {
			small: 'size-3.5',
			normal: 'size-4',
			large: 'size-4.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPaginationEllipsis = cva({
	base: 'text-foreground-muted inline-flex shrink-0 items-center justify-center',
	variants: {
		size: {
			small: 'h-7 min-w-7',
			normal: 'h-8 min-w-8',
			large: 'h-9 min-w-9'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPaginationSummary = cva({
	base: 'text-foreground-muted shrink-0 whitespace-nowrap font-medium',
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

export const paginationTheme = {
	root: defaultPagination,
	list: defaultPaginationList,
	item: defaultPaginationItem,
	control: defaultPaginationControl,
	icon: defaultPaginationIcon,
	ellipsis: defaultPaginationEllipsis,
	summary: defaultPaginationSummary
};

export type PaginationTheme = typeof paginationTheme;
export type PaginationThemeProps = InferComponentTheme<PaginationTheme>;
export const setPaginationTheme = setComponentTheme<PaginationTheme>('pagination');
export const usePaginationTheme = useComponentTheme<PaginationTheme>('pagination', paginationTheme);
