import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';

const defaultBreadcrumbsContainer = cva({
	base: 'text-contrast-muted flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-4.5',
	variants: {},
	defaultVariants: {}
});

const defaultBreadcrumbsItem = cva({
	base: 'inline-flex items-center gap-1.5',
	variants: {
		disabled: {
			true: 'text-contrast-muted/50 cursor-not-allowed *:pointer-events-none',
			false: 'cursor-pointer'
		},
		active: {
			true: 'text-contrast font-normal cursor-auto',
			false: 'hover:text-contrast'
		}
	},
	defaultVariants: {}
});

const defaultBreadcrumbsLink = cva({
	base: 'px-2 py-0.5  outline-none focus-visible:ring-1 focus-visible:ring-contrast focus-visible:ring-offset-1 ring-offset-surface rounded',
	variants: {
		disabled: {
			true: '',
			false: ''
		},
		active: {
			true: 'text-contrast font-normal',
			false: ''
		}
	},
	defaultVariants: {
		disabled: false
	}
});

const defaultBreadcrumbsPage = cva({
	base: '  px-2 py-0.5',
	variants: {},
	defaultVariants: {}
});

const defaultBreadcrumbsSeparator = cva({
	base: 'flex items-center text-contrast-muted [&>svg]:size-3.5',
	variants: {},
	defaultVariants: {}
});

const defaultBreadcrumbsEllipsis = cva({
	base: 'flex items-end justify-center',
	variants: {},
	defaultVariants: {}
});

const defaultBreadcrumbsIcon = cva({
	base: 'flex-shrink-0',
	variants: {
		size: {
			small: 'w-3 h-3',
			normal: 'w-4 h-4',
			large: 'w-5 h-5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const breadcrumbsTheme = {
	container: defaultBreadcrumbsContainer,
	item: defaultBreadcrumbsItem,
	link: defaultBreadcrumbsLink,

	separator: defaultBreadcrumbsSeparator,
	ellipsis: defaultBreadcrumbsEllipsis,
	icon: defaultBreadcrumbsIcon
};

export type BreadcrumbsTheme = typeof breadcrumbsTheme;
export type BreadcrumbsThemeProps = InferComponentTheme<BreadcrumbsTheme>;
export const setBreadcrumbsTheme = setComponentTheme<BreadcrumbsTheme>('breadcrumbs');
export const useBreadcrumbsTheme = useComponentTheme('breadcrumbs', breadcrumbsTheme);
