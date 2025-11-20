import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultCollapsibleContainer = cva({
	base: 'flex w-full flex-col',
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

const defaultCollapsibleTrigger = cva({
	base: 'flex items-center justify-between cursor-pointer transition-all hover:opacity-80 bg-transparent border-0 text-left w-full gap-2',
	variants: {
		size: {
			small: 'px-1.5 py-1.5 text-sm ',
			normal: 'px-2 py-2 text-sm ',
			large: 'px-3 py-3 text-base'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: null
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultCollapsibleContent = cva({
	base: 'overflow-hidden flex flex-col',
	variants: {
		size: {
			small: 'gap-1.5 mt-1',
			normal: 'gap-2 mt-2',
			large: 'gap-3 mt-3'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCollapsibleIcon = cva({
	base: 'size-4 transition-transform flex-shrink-0',
	variants: {
		size: {
			small: 'size-3',
			normal: 'size-4',
			large: 'size-5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const collapsibleTheme = {
	container: defaultCollapsibleContainer,
	trigger: defaultCollapsibleTrigger,
	content: defaultCollapsibleContent,
	icon: defaultCollapsibleIcon
};

export type CollapsibleTheme = typeof collapsibleTheme;
export type CollapsibleThemeProps = InferComponentTheme<CollapsibleTheme>;
export const setCollapsibleTheme = setComponentTheme<CollapsibleTheme>('collapsible');
export const useCollapsibleTheme = useComponentTheme('collapsible', collapsibleTheme);
