import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// `size` scales typography/icons only; `density` owns paddings, gaps and
// min-heights ('small' matches the old small spacing, 'large' the old
// large spacing — defaults render exactly as before the split).
const defaultMenuOption = cva({
	base: 'rounded cursor-pointer items-center inline-flex relative w-full text-left outline-none',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		density: {
			small: 'px-1.5 py-1 gap-1.5 min-h-6',
			normal: 'px-2 py-1.5 gap-2 min-h-7',
			large: 'px-3 py-2 gap-2.5 min-h-9'
		},
		color: {
			primary: 'text-primary highlight:bg-primary-muted highlight:text-primary',
			secondary: 'text-secondary highlight:bg-secondary-muted highlight:text-secondary',
			foreground: 'text-foreground highlight:bg-background-muted highlight:text-foreground',
			background: 'text-foreground highlight:bg-background-muted highlight:text-foreground',
			danger: 'text-danger highlight:bg-danger-muted highlight:text-danger',
			success: 'text-success highlight:bg-success-muted highlight:text-success',
			warning: 'text-warning highlight:bg-warning-muted highlight:text-warning',
			info: 'text-info highlight:bg-info-muted highlight:text-info'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50 pointer-events-none',
			false: ''
		},
		// Prop-driven highlight for the virtual-focus listbox family (Command/Select/Combobox):
		// a plain utility that doesn't depend on the `highlight:` attribute variant. Menus leave
		// this unset and use the `highlight:` variant (data-highlighted set imperatively by the hook).
		highlighted: {
			true: 'bg-background-muted',
			false: ''
		},
		// Persistent highlight in the item's own color — e.g. a submenu trigger while its submenu is
		// open. Unlike `highlighted`, it tracks the `color` variant via the compoundVariants below.
		active: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{ active: true, color: 'primary', class: 'bg-primary-muted text-primary' },
		{ active: true, color: 'secondary', class: 'bg-secondary-muted text-secondary' },
		{ active: true, color: 'foreground', class: 'bg-background-muted text-foreground' },
		{ active: true, color: 'background', class: 'bg-background-muted text-foreground' },
		{ active: true, color: 'danger', class: 'bg-danger-muted text-danger' },
		{ active: true, color: 'success', class: 'bg-success-muted text-success' },
		{ active: true, color: 'warning', class: 'bg-warning-muted text-warning' },
		{ active: true, color: 'info', class: 'bg-info-muted text-info' }
	],
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		color: 'primary',
		disabled: false,
		active: false
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
	base: 'text-foreground/70  leading-none',
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
	// Size the icon via the svg selector (icons default to height:1lh, which overflows a fixed box)
	// and center it in a square that tracks the row's text size.
	base: 'flex shrink-0 items-center justify-center',
	variants: {
		size: {
			small: 'size-3.5 [&_svg]:size-3.5',
			normal: 'size-4 [&_svg]:size-4',
			large: 'size-5 [&_svg]:size-5'
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
	// Sizes any trailing icon via the svg selector rather than fixing the container, so the
	// suffix can also hold text (a Command shortcut hint) or a check indicator.
	base: 'ml-auto flex shrink-0 items-center',
	variants: {
		size: {
			small: '[&_svg]:size-3',
			normal: '[&_svg]:size-4',
			large: '[&_svg]:size-5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMenuOptionContent = cva({
	base: 'flex flex-col flex-1',
	variants: {
		// Spacing between title and description follows density, not size.
		density: {
			small: 'gap-0',
			normal: 'gap-0.5',
			large: 'gap-1'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

export const menuOptionTheme = {
	root: defaultMenuOption,
	title: defaultMenuOptionTitle,
	description: defaultMenuOptionDescription,
	prefix: defaultMenuOptionPrefix,
	suffix: defaultMenuOptionSuffix,
	content: defaultMenuOptionContent
};

export type MenuOptionTheme = typeof menuOptionTheme;
export type MenuOptionThemeProps = InferComponentTheme<MenuOptionTheme>;
export const setMenuOptionTheme = setComponentTheme<MenuOptionTheme>('menuOption');
export const useMenuOptionTheme = useComponentTheme<MenuOptionTheme>('menuOption', menuOptionTheme);
