import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultMenuOption = cva({
	base: 'rounded cursor-pointer items-center inline-flex  relative transition-all duration-150 ease-in-out w-full text-left',
	variants: {
		size: {
			small: 'px-1.5 py-1 text-xs gap-1.5 min-h-6',
			normal: 'px-2 py-1.5 text-sm gap-2 min-h-7',
			large: 'px-3 py-2 text-base gap-2.5 min-h-9'
		},
		color: {
			primary: 'text-primary highlight:bg-primary-muted highlight:text-primary',
			secondary: 'text-secondary highlight:bg-secondary-muted highlight:text-secondary',
			contrast: 'text-contrast highlight:bg-contrast-muted/20 highlight:text-contrast',
			surface: 'text-contrast highlight:bg-surface-muted highlight:text-contrast',
			danger: 'text-danger highlight:bg-danger-muted highlight:text-danger',
			success: 'text-success highlight:bg-success-muted highlight:text-success',
			warning: 'text-warning highlight:bg-warning-muted highlight:text-warning',
			info: 'text-info highlight:bg-info-muted highlight:text-info'
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'primary'
	}
});

const defaultMenuOptionTitle = cva({
	base: 'font-medium  leading-none',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMenuOptionDescription = cva({
	base: 'text-contrast/70  leading-none',
	variants: {
		size: {
			small: 'text-[0.625rem]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMenuOptionPrefix = cva({
	base: 'flex-shrink-0',
	variants: {
		size: {
			small: 'w-3 h-3',
			normal: 'w-4 h-4',
			large: 'w-5 h-5'
		},
		align: {
			start: 'mb-auto',
			center: 'my-auto'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMenuOptionSuffix = cva({
	base: 'flex-shrink-0 ml-auto',
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

const defaultMenuOptionContent = cva({
	base: 'flex flex-col flex-1',
	variants: {
		size: {
			small: 'gap-0',
			normal: 'gap-0.5',
			large: 'gap-1'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const menuOptionTheme = {
	menuOption: defaultMenuOption,
	title: defaultMenuOptionTitle,
	description: defaultMenuOptionDescription,
	prefix: defaultMenuOptionPrefix,
	suffix: defaultMenuOptionSuffix,
	content: defaultMenuOptionContent
};

export type MenuOptionTheme = typeof menuOptionTheme;
export type MenuOptionThemeProps = InferComponentTheme<MenuOptionTheme>;
export const setMenuOptionTheme = setComponentTheme<MenuOptionTheme>('menuOption');
export const useMenuOptionTheme = useComponentTheme('menuOption', menuOptionTheme);
